import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// =========================================================================
// FEATURE 1: Search Grounding via gemini-3.5-flash (with googleSearch tool)
// =========================================================================
app.post('/api/literary-search', async (req, res) => {
  try {
    const { query, searchType } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
        fallback: true
      });
    }

    const systemInstruction = 
      `You are an authoritative Urdu literature research scholar, historian, and critic for "Qissa-e-Zehan". ` +
      `Your goal is to provide deep, accurate, grounded information about Urdu poetry, poet biographies, attribution verifications, ` +
      `historical mushairas, books, awards, and literary traditions. ` +
      `Use Google Search to retrieve current, authentic literary facts, critical articles, book details, and verified attributions. ` +
      `Provide an insightful, eloquent response in Urdu (Nastaliq friendly) with English summary notes where helpful.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Search query regarding Urdu literature and poetry: "${query}" (Category: ${searchType || 'general'}). ` +
        `Verify the facts, attribution, or historical context using Google Search.`,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      }
    });

    const candidate = response.candidates?.[0];
    const text = response.text || '';
    
    // Extract search grounding metadata
    const groundingMetadata = candidate?.groundingMetadata;
    const searchQueries = groundingMetadata?.webSearchQueries || [];
    const searchChunks = groundingMetadata?.groundingChunks || [];
    const searchSupports = groundingMetadata?.groundingSupports || [];

    // Parse sources
    const sources = searchChunks
      .filter((chunk: any) => chunk.web?.uri)
      .map((chunk: any) => ({
        title: chunk.web?.title || 'Web Source',
        uri: chunk.web?.uri || ''
      }));

    res.json({
      text,
      sources,
      searchQueries,
      groundingSupports: searchSupports,
      model: 'gemini-3.5-flash'
    });
  } catch (error: any) {
    console.error('Search grounding error:', error);
    res.status(500).json({
      error: error.message || 'Failed to perform grounded literary search'
    });
  }
});

// Endpoint for deep literary Tashreeh
app.post('/api/tashreeh', async (req, res) => {
  try {
    const { misra1, misra2, poetName } = req.body;
    if (!misra1 || !misra2) {
      return res.status(400).json({ error: 'Misra 1 and Misra 2 are required' });
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY missing' });
    }

    const prompt = `Analyze this Urdu couplet by ${poetName || 'unknown'}:
مصرعِ اوّل: "${misra1}"
مصرعِ ثانی: "${misra2}"
Return valid JSON:
{
  "urduTashreeh": "Detailed literary Urdu explanation",
  "englishTashreeh": "Nuanced English literary analysis",
  "poeticMeterAnalysis": "Meter, Qafia, Radif analysis",
  "poeticDevices": ["List of Sanaye Badaye used"],
  "philosophicalContext": "Existential or mystical context"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const jsonText = response.text?.trim() || '{}';
    const parsed = JSON.parse(jsonText.replace(/^```json\s*/i, '').replace(/```$/i, ''));
    res.json(parsed);
  } catch (error: any) {
    console.error('Tashreeh error:', error);
    res.status(500).json({ error: error.message || 'Tashreeh generation failed' });
  }
});

// =========================================================================
// FEATURE: Metaphorical Insight (بصیرتِ استعارہ) via gemini-3.8-flash
// =========================================================================
app.post('/api/metaphor-insight', async (req, res) => {
  try {
    const { title, titleUrdu, poetName, poetNameUrdu, couplets, genre, theme } = req.body;
    
    if (!couplets || !Array.isArray(couplets) || couplets.length === 0) {
      return res.status(400).json({ error: 'Couplets array is required for metaphor analysis' });
    }

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'GEMINI_API_KEY missing on server',
        fallback: true 
      });
    }

    const coupletsFormatted = couplets.map((c: any, i: number) => 
      `شعر #${i + 1}:\nمصرع اول: "${c.misra1}"\nمصرع ثانی: "${c.misra2}"`
    ).join('\n\n');

    const prompt = `You are an eminent authority on classical Urdu poetics, hermeneutics, and literary symbolism (شارح و محققِ استعارات و علامات) for "Qissa-e-Zehan".
Perform a deep, illuminating literary analysis of the underlying metaphors (استعارات), allegories (تمثیل), symbols (علامات), and rhetorical devices (صنائع بدائع) in this ${genre || 'Ghazal'}:

عنوان: "${titleUrdu || title}" (${title || ''})
شاعر: ${poetNameUrdu || poetName || 'نامعلوم'} (${poetName || ''})
موضوع / کیفیت: ${theme || 'کلاسیکی'}

کلام کے اشعار:
${coupletsFormatted}

Provide a deep, nuanced, scholarly analysis exploring the layers of meaning (literal vs. allegorical vs. mystical/sociopolitical). Return ONLY valid JSON adhering strictly to this schema:
{
  "centralAllegoryUrdu": "جامع تمثیلی و استعاراتی جائزہ اردو میں (3-4 sentences revealing the central metaphorical core and tension)",
  "centralAllegoryEnglish": "Detailed English explanation of the central allegory, core conflict, and overarching literary motif (3-4 sentences)",
  "dominantTheme": "Short theme descriptor (e.g. وجودی کشمکش، عشقِ حقیقی، سیاسی جبر و آزادی)",
  "primaryArchetypes": [
    {
      "symbolUrdu": "اردو لفظ (e.g. شمع / قفس / صیاد / رقیب / جام / خار)",
      "symbolRoman": "Roman Urdu",
      "literalMeaning": "Literal English meaning",
      "metaphoricalMeaningUrdu": "اس علامت کا عمیق اردو مفہوم",
      "metaphoricalMeaningEnglish": "Deeper allegorical and symbolic significance in English",
      "category": "mystical" | "romantic" | "sociopolitical" | "existential" | "rhetorical"
    }
  ],
  "coupletInsights": [
    {
      "coupletIndex": 0,
      "misra1": "مصرع اول",
      "misra2": "مصرع ثانی",
      "surfaceMeaning": "Surface/literal reading in English",
      "metaphoricalSubtextUrdu": "اس شعر کے استعاراتی و باطنی معانی اردو میں",
      "metaphoricalSubtextEnglish": "Hidden subtext and allegorical resonance in English",
      "symbolsHighlighted": ["علامت 1", "علامت 2"]
    }
  ],
  "literaryDevices": [
    {
      "deviceNameUrdu": "صنعت کا نام (e.g. استعارہ مصرحہ / مراعاۃ النظیر / حسنِ تعلیل / تلمیح / ایہام)",
      "deviceNameEnglish": "English poetic device name",
      "explanation": "Brief explanation of how it is used here",
      "exampleFromPoem": "شعر یا مصرعہ جہاں یہ صنعت برتی گئی"
    }
  ],
  "philosophicalSubtextUrdu": "کلام کا گہرا فلسفیانہ، عرفانی یا عصری پیغام اردو میں",
  "philosophicalSubtextEnglish": "Profound philosophical and mystical context in English",
  "reflectiveTakeaway": "A single poignant, evocative reflective quote or question for the literary reader"
}
Ensure primaryArchetypes has 3 to 6 key symbols, and coupletInsights has an entry for each provided couplet.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const jsonText = response.text?.trim() || '{}';
    const cleanJson = jsonText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(cleanJson);
    parsed.modelUsed = 'gemini-3.8-flash';
    res.json(parsed);
  } catch (error: any) {
    console.error('Metaphorical Insight error:', error);
    res.status(500).json({ error: error.message || 'Metaphorical Insight generation failed' });
  }
});

// =========================================================================
// FEATURE: AI Emotional Sentiment & Mood Analysis via gemini-3.8-flash
// =========================================================================
app.post('/api/poem-sentiment', async (req, res) => {
  try {
    const { poemId, title, titleUrdu, poetName, poetNameUrdu, couplets, genre } = req.body;

    if (!couplets || !Array.isArray(couplets) || couplets.length === 0) {
      return res.status(400).json({ error: 'Couplets array is required for sentiment analysis' });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY missing on server',
        fallback: true
      });
    }

    const coupletsFormatted = couplets.slice(0, 5).map((c: any, i: number) => 
      `شعر #${i + 1}:\n"${c.misra1}"\n"${c.misra2}"`
    ).join('\n\n');

    const prompt = `You are a master of classical Urdu poetics, emotional sentiment analysis, and literary psychology (ماہرِ نفسیات و کیفیاتِ کلام).
Analyze the emotional sentiment and affective mood of this Urdu poetry:
عنوان: "${titleUrdu || title}" (${title || ''})
شاعر: ${poetNameUrdu || poetName || 'نامعلوم'} (${poetName || ''})
صنف: ${genre || 'Ghazal'}

کلام کے اشعار:
${coupletsFormatted}

Classify the primary emotional sentiment and psychological mood into one of these exact primary categories:
['Melancholy', 'Hopeful', 'Ecstatic Love', 'Existential', 'Defiant', 'Serene', 'Heartbroken', 'Longing', 'Transcendent'].

Return ONLY valid JSON adhering strictly to this schema without markdown wrappers:
{
  "poemId": "${poemId || ''}",
  "primaryMood": "One of: Melancholy, Hopeful, Ecstatic Love, Existential, Defiant, Serene, Heartbroken, Longing, Transcendent",
  "primaryMoodUrdu": "Eloquent Urdu title for this mood (e.g. غم و اندوہ، پر امید و رجائیت، وارفتگی و عشق، تفکر و وجود، انقلابی و سرکش، سکون و طمانیت، شکستہ دل، اشتیاق و انتظار، ماورائی و صوفیانہ)",
  "confidenceScore": 88,
  "secondaryMood": "Secondary emotional layer (e.g. Nostalgic Solitude, Spiritual Resolve, Quiet Resignation)",
  "secondaryMoodUrdu": "ثانوی کیفیت اردو میں",
  "emotionalValence": "Positive | Negative | Bittersweet | Contemplative | Cathartic",
  "emotionalValenceUrdu": "مثبت | حزنیہ | تلخ و شیریں | فکری | تزکیۂ قلب",
  "toneArc": "1 sentence describing the emotional arc from the opening couplet to the conclusion",
  "toneArcUrdu": "ایک جملے میں کلام کا جذباتی سفر",
  "keyEmotiveKeywords": ["3 to 5 key Urdu words from the poem carrying the heaviest emotional weight"],
  "aiInsightNote": "1-2 concise sentences in English explaining why this sentiment was identified based on rhetorical devices and diction",
  "aiInsightNoteUrdu": "ایک یا دو پر اثر جملوں میں اردو میں ادبی نکتہ"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const jsonText = response.text?.trim() || '{}';
    const cleanJson = jsonText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(cleanJson);
    parsed.modelUsed = 'gemini-3.8-flash';
    parsed.analyzedAt = new Date().toISOString();
    res.json(parsed);
  } catch (error: any) {
    console.error('Poem sentiment analysis error:', error);
    res.status(500).json({ error: error.message || 'Poem sentiment analysis failed' });
  }
});

// =========================================================================
// FEATURE 2: Live API Voice Conversation (gemini-3.8-live) via WebSocket
// =========================================================================
const wss = new WebSocketServer({ server, path: '/live' });

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('Client connected to Live Voice WebSocket (/live)');

  if (!apiKey) {
    clientWs.send(JSON.stringify({
      error: 'GEMINI_API_KEY is not configured on the server. Live voice requires an API key.'
    }));
    clientWs.close();
    return;
  }

  let session: any = null;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // Prebuilt voices: 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
            prebuiltVoiceConfig: { voiceName: 'Zephyr' }
          }
        },
        systemInstruction: 
          'You are "Bazm-e-Sukhan" (بزمِ سخن), a warm, cultured, poetic Urdu literary conversational companion for Qissa-e-Zehan. ' +
          'You speak in fluent, refined Urdu (with occasional English translation if asked). ' +
          'You love discussing classical ghazals (Ghalib, Iqbal, Faiz, Mir, Jaun Elia), analyzing couplets, exchanging verses in Bait Bazi, ' +
          'and exploring existential questions with poetic depth, warmth, and melodious cadence. ' +
          'Keep your verbal answers concise, lyrical, and conversational.',
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          // Model audio output
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          const textPart = message.serverContent?.modelTurn?.parts?.find(p => p.text)?.text;

          if (audio) {
            clientWs.send(JSON.stringify({ audio, text: textPart || null }));
          }

          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }

          if (message.serverContent?.turnComplete) {
            clientWs.send(JSON.stringify({ turnComplete: true }));
          }
        },
        onerror: (err: any) => {
          console.error('Gemini Live session error:', err);
          clientWs.send(JSON.stringify({ error: err.message || 'Live session error' }));
        },
        onclose: () => {
          console.log('Gemini Live session closed');
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ sessionClosed: true }));
          }
        }
      }
    });

    clientWs.send(JSON.stringify({ connected: true, model: 'gemini-3.8-live' }));
  } catch (err: any) {
    console.error('Failed to establish Live session with gemini-3.8-live:', err);
    clientWs.send(JSON.stringify({ error: err.message || 'Failed to initialize Gemini Live session' }));
    clientWs.close();
    return;
  }

  // Receive microphone audio chunks from client
  clientWs.on('message', (data: any) => {
    try {
      const parsed = JSON.parse(data.toString());

      // Audio stream payload
      if (parsed.audio && session) {
        session.sendRealtimeInput({
          audio: {
            data: parsed.audio,
            mimeType: 'audio/pcm;rate=16000'
          }
        });
      }

      // Text input or prompt payload
      if (parsed.text && session) {
        session.send({
          clientContent: {
            turns: [
              {
                role: 'user',
                parts: [{ text: parsed.text }]
              }
            ],
            turnComplete: true
          }
        });
      }
    } catch (e) {
      console.error('Error handling client message:', e);
    }
  });

  clientWs.on('close', () => {
    console.log('Client disconnected from Live WebSocket');
    try {
      if (session?.close) session.close();
    } catch {
      // ignore
    }
  });
});

// =========================================================================
// Vite Dev Middleware or Production Static Serve
// =========================================================================
async function setupServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`- Google Search Grounding: gemini-3.5-flash`);
    console.log(`- Live Voice API: gemini-3.8-live on ws://localhost:${port}/live`);
  });
}

setupServer();
