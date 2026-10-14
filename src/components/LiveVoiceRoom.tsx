import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  PhoneCall, 
  PhoneOff, 
  Flame, 
  Sparkles, 
  AlertCircle, 
  MessageSquare,
  RefreshCw,
  Compass
} from 'lucide-react';

interface LiveVoiceRoomProps {
  fontPreference: string;
}

interface TranscriptEntry {
  sender: 'user' | 'model';
  text: string;
  time: string;
}

export const LiveVoiceRoom: React.FC<LiveVoiceRoomProps> = ({ fontPreference }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [conversationStatus, setConversationStatus] = useState<string>('غیر فعال (Ready to connect)');
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([
    {
      sender: 'model',
      text: 'خوش آمدید! میں بزمِ سخن لائیو ہوں۔ آپ مرزا غالب، علامہ اقبال، فیض، یا وجودی فلسفے اور بیت بازی کے بارے میں مجھ سے روبرو گفتگو کر سکتے ہیں۔',
      time: 'ابھی'
    }
  ]);

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  // Helper: Float32Array PCM to Base64 16-bit Int16 PCM
  const floatTo16BitPCM = (float32Array: Float32Array): string => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Helper: Base64 24kHz PCM to AudioBuffer for playback
  const playAudioChunk = (base64Audio: string) => {
    if (!outputAudioCtxRef.current) return;
    const ctx = outputAudioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    try {
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const audioBuffer = ctx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      const startTime = Math.max(currentTime, nextPlayTimeRef.current);
      source.start(startTime);
      nextPlayTimeRef.current = startTime + audioBuffer.duration;

      activeSourcesRef.current.push(source);
      source.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter(s => s !== source);
      };

      setConversationStatus('استادِ سخن کلام فرما رہے ہیں (Speaking...)');
    } catch (e) {
      console.error('Audio chunk decoding error:', e);
    }
  };

  // Stop playback when interrupted
  const handleInterruption = () => {
    activeSourcesRef.current.forEach(src => {
      try { src.stop(); } catch {}
    });
    activeSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      nextPlayTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
    setConversationStatus('آپ کی بات سنی جا رہی ہے (Listening...)');
  };

  // Start Live Session
  const startLiveConversation = async () => {
    setIsConnecting(true);
    setErrorMsg(null);

    try {
      // 1. Microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      mediaStreamRef.current = stream;

      // 2. Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });
      inputAudioCtxRef.current = inputCtx;
      outputAudioCtxRef.current = outputCtx;

      // 3. Connect WebSocket to /live
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to Gemini Live WebSocket');
        setIsConnected(true);
        setIsConnecting(false);
        setConversationStatus('محفل قائم ہو گئی! کلام شروع کریں (Connected)');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.error) {
            setErrorMsg(data.error);
            stopLiveConversation();
            return;
          }

          if (data.interrupted) {
            handleInterruption();
          }

          if (data.audio) {
            playAudioChunk(data.audio);
          }

          if (data.text) {
            setTranscripts(prev => [
              ...prev,
              { sender: 'model', text: data.text, time: new Date().toLocaleTimeString() }
            ]);
          }

          if (data.turnComplete) {
            setConversationStatus('آپ کی باری ہے (Listening to you...)');
          }
        } catch (e) {
          console.error('Error handling WebSocket message:', e);
        }
      };

      ws.onerror = (err) => {
        console.error('Live WebSocket error:', err);
        setErrorMsg('Live audio session connection error');
        stopLiveConversation();
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
        setConversationStatus('محفل ختم ہوئی (Disconnected)');
      };

      // 4. Capture and stream mic audio
      const micSource = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        if (isMuted) return;

        const channelData = e.inputBuffer.getChannelData(0);

        // Calculate audio level for animated flame visualizer
        let sum = 0;
        for (let i = 0; i < channelData.length; i++) {
          sum += channelData[i] * channelData[i];
        }
        const rms = Math.sqrt(sum / channelData.length);
        setAudioLevel(Math.min(100, Math.floor(rms * 400)));

        // Send PCM chunk
        const base64Pcm = floatTo16BitPCM(channelData);
        ws.send(JSON.stringify({ audio: base64Pcm }));
      };

      micSource.connect(processor);
      processor.connect(inputCtx.destination);

    } catch (err: any) {
      console.error('Failed to start Live Voice:', err);
      setErrorMsg(err.message || 'Microphone access or connection failed');
      setIsConnecting(false);
      setIsConnected(false);
    }
  };

  const stopLiveConversation = () => {
    if (wsRef.current) {
      try { wsRef.current.close(); } catch {}
      wsRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    if (processorRef.current) {
      try { processorRef.current.disconnect(); } catch {}
      processorRef.current = null;
    }

    if (inputAudioCtxRef.current) {
      try { inputAudioCtxRef.current.close(); } catch {}
      inputAudioCtxRef.current = null;
    }

    if (outputAudioCtxRef.current) {
      try { outputAudioCtxRef.current.close(); } catch {}
      outputAudioCtxRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setAudioLevel(0);
    setConversationStatus('محفل موقوف ہے (Disconnected)');
  };

  // Quick conversation prompts
  const quickPrompts = [
    'میرزا غالب کے فلسفۂ غم پر کچھ فرمائیے',
    'علامہ اقبال کے تصورِ خودی کی آسان وضاحت کریں',
    'میر تقی میر کا کوئی دل پذیر شعر سنائیں',
    'میرے ساتھ بیت بازی کا ایک دور کھیلیں'
  ];

  const handleSendPromptText = (prompt: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text: prompt }));
      setTranscripts(prev => [
        ...prev,
        { sender: 'user', text: prompt, time: new Date().toLocaleTimeString() }
      ]);
    }
  };

  useEffect(() => {
    return () => {
      stopLiveConversation();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-medium mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>ریئل ٹائم صوتی مکالمہ • Real-Time Voice Live API (gemini-3.8-live)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-stone-100 font-normal">
          بزمِ سخن لائیو — Live Voice Literary Companion
        </h2>
        <p className="text-stone-400 text-sm mt-1 max-w-3xl">
          Engage in bidirectional, ultra low-latency voice conversations powered by <strong className="text-amber-300">gemini-3.8-live</strong>. Discuss Urdu poetry, debate existential philosophy, recite ash'aar, and exchange live verses with the literary companion.
        </p>
      </div>

      {errorMsg && (
        <div className="mt-6 p-4 rounded-2xl bg-rose-950/70 border border-rose-700 text-rose-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Interactive Stage */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visualizer Stage & Live Controls (7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-stone-900/90 via-[#14100a] to-stone-950 border-2 border-amber-800/60 rounded-3xl p-8 sm:p-12 shadow-2xl gold-glow flex flex-col items-center justify-between min-h-[500px] relative overflow-hidden">
          
          {/* Subtle Ambient Candle Glow */}
          <div 
            style={{ transform: `scale(${1 + audioLevel * 0.015})` }}
            className={`w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-amber-600/30 via-yellow-500/20 to-transparent blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-150 ${
              isConnected ? 'opacity-100' : 'opacity-20'
            }`}
          />

          {/* Top Session Status Ribbon */}
          <div className="w-full flex items-center justify-between text-xs text-stone-400 z-10">
            <span className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-ping' : 'bg-stone-600'}`} />
              <span className="font-mono text-stone-300">{conversationStatus}</span>
            </span>

            <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/50 text-[10px] text-amber-300 font-mono">
              Model: gemini-3.8-live
            </span>
          </div>

          {/* Centerpiece: Animated Flame & Medallion Visualizer */}
          <div className="my-10 flex flex-col items-center relative z-10">
            
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-amber-500/50 p-2 flex items-center justify-center bg-stone-950/80 shadow-[0_0_50px_rgba(217,119,6,0.35)]">
              
              {/* Outer pulsing acoustic ring */}
              <div 
                style={{ transform: `scale(${1 + audioLevel * 0.008})`, opacity: isConnected ? 0.7 : 0.2 }}
                className="absolute inset-0 rounded-full border border-amber-400/60 animate-pulse pointer-events-none" 
              />

              {/* Central Glowing Lantern Artwork / Logo */}
              <img
                src="/logo.svg"
                alt="Qissa-e-Zehan Live Voice Companion"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_4px_16px_rgba(245,158,11,0.5)]"
              />

              {/* Flame Overlay that pulses dynamically with microphone/speaker audio */}
              <div 
                style={{ transform: `scale(${1 + audioLevel * 0.02})` }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] transition-transform duration-100"
              >
                <Flame className={`w-7 h-7 ${isConnected ? 'fill-amber-400 animate-bounce' : 'text-stone-600'}`} />
              </div>

            </div>

            <h3 className="font-nastaliq text-2xl sm:text-3xl text-amber-200 mt-6 font-bold leading-relaxed">
              بزمِ سخن — ہم کلامی برائے ادب
            </h3>
            <p className="text-xs text-stone-400 font-serif italic mt-1 text-center max-w-sm">
              Speak naturally into your microphone. Discuss classical poetry, meters, and thoughts with Gemini Live API in real-time.
            </p>
          </div>

          {/* Bottom Live Action Bar */}
          <div className="w-full flex flex-wrap items-center justify-center gap-4 z-10 pt-4 border-t border-amber-900/40">
            
            {!isConnected ? (
              <button
                onClick={startLiveConversation}
                disabled={isConnecting}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm shadow-xl shadow-amber-950/60 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4 fill-stone-950" />
                <span>{isConnecting ? 'محفل جڑ رہی ہے...' : 'آواز کی محفل شروع کریں (Start Voice Call)'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    isMuted
                      ? 'bg-rose-950 border-rose-600 text-rose-300'
                      : 'bg-stone-900 border-amber-700/60 text-amber-300 hover:bg-stone-800'
                  }`}
                  title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  onClick={stopLiveConversation}
                  className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>محفل ختم کریں (End Call)</span>
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Live Transcript & Quick Voice Starters (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Voice Prompt Starters */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 flex items-center gap-2 font-mono">
              <Compass className="w-4 h-4" />
              <span>فکری مکالمے کے موضوعات (Conversation Starters)</span>
            </h4>
            <div className="space-y-2">
              {quickPrompts.map((p, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendPromptText(p)}
                  className="w-full text-right p-3 rounded-xl bg-stone-950/80 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-700/60 transition-all text-xs text-stone-300 hover:text-amber-200"
                >
                  <span dir="rtl" className="font-nastaliq text-sm block leading-loose">
                    "{p}"
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Transcript Thread */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 flex flex-col h-[380px]">
            <h4 className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3 pb-2 border-b border-stone-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>مکالمے کا متن (Live Transcript)</span>
              </span>
              <span className="text-[10px] text-stone-500 font-mono">ریئل ٹائم لاگ</span>
            </h4>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {transcripts.map((t, idx) => {
                const isModel = t.sender === 'model';
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border ${
                      isModel
                        ? 'bg-stone-950/80 border-amber-900/40 text-right'
                        : 'bg-amber-950/30 border-amber-700/50 text-right'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-stone-500 mb-1">
                      <span className="font-mono">{t.time}</span>
                      <span className={`font-semibold ${isModel ? 'text-amber-400' : 'text-stone-300'}`}>
                        {isModel ? 'بزمِ سخن (Companion)' : 'آپ (You)'}
                      </span>
                    </div>
                    <p dir="rtl" className="font-nastaliq text-sm text-stone-200 leading-loose">
                      {t.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
