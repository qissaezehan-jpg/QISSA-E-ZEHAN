export type PoeticGenre = 'Ghazal' | 'Nazm' | 'Rubai' | 'Qat\'a' | 'Marsiya';

export type PoeticTheme = 
  | 'Ishq-o-Muhabbat' // Love & Devotion
  | 'Tasawwuf'         // Mysticism & Spirituality
  | 'Falsafa-o-Hayaat' // Philosophy & Life
  | 'Inqilab-o-Baghaawat' // Revolution & Resistance
  | 'Hijr-o-Firaaq'    // Separation & Melancholy
  | 'Yaas-o-Tanhaee'   // Despair & Solitude
  | 'Watan-o-Qawm';    // Homeland & Nation

export type PoeticMoodId = 
  | 'all'
  | 'gham'      // غم - Grief & Sorrow
  | 'ishq'      // عشق - Love & Longing
  | 'falsafa'   // فلسفہ - Philosophy & Life
  | 'inqilab'   // انقلاب - Revolution & Defiance
  | 'tasawwuf'  // تصوف - Mysticism & Spirituality
  | 'tanhaee';  // تنہائی - Solitude & Nostalgia

export interface VocabularyWord {
  word: string; // Urdu
  roman: string;
  meaning: string; // English
  urduMeaning?: string;
}

export interface Couplet {
  misra1: string; // First line (Urdu)
  misra2: string; // Second line (Urdu)
  roman1: string;
  roman2: string;
  englishTranslation: string;
  tashreeh: string; // Deep literary explanation
  vocab?: VocabularyWord[];
}

export interface Poem {
  id: string;
  title: string;
  titleUrdu: string;
  poetId: string;
  genre: PoeticGenre;
  theme: PoeticTheme;
  themeUrdu: string;
  mood?: PoeticMoodId;
  moods?: PoeticMoodId[];
  moodUrdu?: string;
  raga?: string; // e.g. 'Raga Bhairavi'
  ragaUrdu?: string; // e.g. 'راگ بھیرویں'
  ragas?: string[]; // Multiple raga associations
  customTags?: string[];
  meter?: string; // e.g. بحرِ ہزج مثمن سالم
  radif?: string; // ردیف
  qafia?: string; // قافیہ
  couplets: Couplet[];
  historicalContext?: string;
  year?: string;
  featured?: boolean;
  sentiment?: PoemSentimentAnalysis;
}

export interface MusicalRaga {
  id: string;
  nameUrdu: string;
  nameEnglish: string;
  praharUrdu: string; // وقت: صبح، شام، نیم شب
  praharEnglish: string;
  moodEthosUrdu: string;
  moodEthosEnglish: string;
  colorHex: string;
}

export interface Poet {
  id: string;
  nameUrdu: string;
  nameEnglish: string;
  takhallus: string; // Pen name (Urdu)
  takhallusEnglish: string;
  era: string; // e.g. 1797 – 1869
  birthPlace: string;
  restingPlace: string;
  school: 'Dabistan-e-Delhi' | 'Dabistan-e-Lucknow' | 'Modern & Progressive' | 'Classical Renaissance';
  schoolUrdu: string;
  bioUrdu: string;
  bioEnglish: string;
  avatarColor: string;
  quoteUrdu: string;
  quoteEnglish: string;
  tags: string[];
}

export interface PoeticDevice {
  nameUrdu: string;
  nameEnglish: string;
  category: 'Lafzi' | 'Ma\'nawi';
  explanationUrdu: string;
  explanationEnglish: string;
  exampleSher: {
    misra1: string;
    misra2: string;
    poet: string;
    explanation: string;
  };
}

export interface CalligraphyStyle {
  id: string;
  nameUrdu: string;
  nameEnglish: string;
  originEra: string;
  originRegion: string;
  description: string;
  features: string[];
  visualSpecimen: string;
  significanceInUrdu: string;
}

export interface LiteraryFigure {
  nameUrdu: string;
  nameEnglish: string;
  field: 'Afsana (Short Story)' | 'Tanqeed (Criticism)' | 'Inshaiya (Essay)' | 'Dastangoi (Epic Oratory)';
  era: string;
  masterpieceUrdu: string;
  masterpieceEnglish: string;
  description: string;
}

export interface MetaphorSymbolItem {
  symbolUrdu: string;
  symbolRoman: string;
  literalMeaning: string;
  metaphoricalMeaningUrdu: string;
  metaphoricalMeaningEnglish: string;
  category: 'mystical' | 'romantic' | 'sociopolitical' | 'existential' | 'rhetorical';
}

export interface CoupletMetaphorInsight {
  coupletIndex: number;
  misra1: string;
  misra2: string;
  surfaceMeaning: string;
  metaphoricalSubtextUrdu: string;
  metaphoricalSubtextEnglish: string;
  symbolsHighlighted: string[];
}

export interface MetaphoricalInsightResult {
  centralAllegoryUrdu: string;
  centralAllegoryEnglish: string;
  dominantTheme: string;
  primaryArchetypes: MetaphorSymbolItem[];
  coupletInsights: CoupletMetaphorInsight[];
  literaryDevices: {
    deviceNameUrdu: string;
    deviceNameEnglish: string;
    explanation: string;
    exampleFromPoem?: string;
  }[];
  philosophicalSubtextUrdu: string;
  philosophicalSubtextEnglish: string;
  reflectiveTakeaway: string;
  modelUsed?: string;
}

// Daily Reflections (روزنامچۂ دل) Types
export type ReflectionMood = 
  | 'musarrat'   // خوشی و انبساط - Joy & Delight
  | 'gham'       // غم و رنج - Melancholy & Pathos
  | 'sukoon'     // سکون و طمانیت - Serenity & Peace
  | 'falsafa'    // تفکر و شعور - Philosophical Contemplation
  | 'tanhaee'    // تنہائی و یاس - Solitude & Quietude
  | 'josh'       // جوش و ولولہ - Passion & Resolve
  | 'shukr';     // شکر گزاری - Gratitude & Grace

export interface DailyReflection {
  id: string;
  createdAt: string;       // ISO timestamp
  dateDisplay: string;     // e.g. "13 October 2026" / "۱۳ اکتوبر ۲۰۲۶"
  timeDisplay: string;     // e.g. "14:30"
  poemId?: string;
  poemTitle?: string;
  poetName: string;
  misra1: string;
  misra2: string;
  mood: ReflectionMood;
  moodLabelUrdu: string;
  moodLabelEnglish: string;
  moodColorHex: string;
  title: string;
  content: string;         // Personal journal reflections
  tags: string[];
  intensity?: number;      // Emotional depth rating (1-5)
  isBookmarked?: boolean;
}

// AI Emotional Sentiment Analysis & Mood Indicator Types
export type PoemSentimentMood = 
  | 'Melancholy'       // غم و اندوہ (Grief, sorrow, bittersweet ache)
  | 'Hopeful'          // پر امید و رجائیت (Hope, renewal, faith in dawn)
  | 'Ecstatic Love'    // وارفتگی و عشق (Sublime ecstasy, romantic surrender)
  | 'Existential'      // تفکر و وجود (Deep inquiry, cosmic questioning)
  | 'Defiant'          // انقلابی و سرکش (Courage, revolution, resilience)
  | 'Serene'           // سکون و طمانیت (Peace, spiritual stillness)
  | 'Heartbroken'      // شکستہ دل (Grief of betrayal or loss)
  | 'Longing'          // اشتیاق و انتظار (Yearning, eager anticipation)
  | 'Transcendent';    // ماورائی و صوفیانہ (Mystical union, timeless trance)

export interface PoemSentimentAnalysis {
  poemId: string;
  primaryMood: PoemSentimentMood;
  primaryMoodUrdu: string;
  confidenceScore: number; // 0 - 100%
  secondaryMood?: string;
  secondaryMoodUrdu?: string;
  emotionalValence: 'Positive' | 'Negative' | 'Bittersweet' | 'Contemplative' | 'Cathartic';
  emotionalValenceUrdu: string;
  toneArc: string;         // e.g. "Begins in grief, transfiguring into transcendent dignity"
  toneArcUrdu: string;
  keyEmotiveKeywords: string[]; // e.g. ["درد", "دوا", "ناداں", "وفا"]
  aiInsightNote: string;   // 1-2 sentence AI literary rationale
  aiInsightNoteUrdu: string;
  colorHex: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  analyzedAt: string;
  modelUsed?: string;
}


