import { DailyReflection, ReflectionMood } from '../types/poetry';

export const REFLECTIONS_STORAGE_KEY = 'qissa_zehan_reflections';
export const REFLECTIONS_EVENT_NAME = 'qissa_zehan_reflections_changed';

export interface MoodConfig {
  id: ReflectionMood;
  labelUrdu: string;
  labelEnglish: string;
  colorHex: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  descriptionUrdu: string;
  iconName: string;
}

export const REFLECTION_MOODS: MoodConfig[] = [
  {
    id: 'musarrat',
    labelUrdu: 'خوشی و انبساط',
    labelEnglish: 'Joy & Delight',
    colorHex: '#f59e0b',
    bgClass: 'bg-amber-950/70',
    borderClass: 'border-amber-500/60',
    textClass: 'text-amber-300',
    descriptionUrdu: 'دل کی کلی کھل جانا، مسرت اور تازگی کا احساس',
    iconName: 'Sun'
  },
  {
    id: 'gham',
    labelUrdu: 'غم و رنج',
    labelEnglish: 'Melancholy & Pathos',
    colorHex: '#f43f5e',
    bgClass: 'bg-rose-950/70',
    borderClass: 'border-rose-500/60',
    textClass: 'text-rose-300',
    descriptionUrdu: 'جدائی کا کرب، دل کی اداسی اور چشمِ تر کا اضطراب',
    iconName: 'CloudRain'
  },
  {
    id: 'sukoon',
    labelUrdu: 'سکون و طمانیت',
    labelEnglish: 'Serenity & Solace',
    colorHex: '#10b981',
    bgClass: 'bg-emerald-950/70',
    borderClass: 'border-emerald-500/60',
    textClass: 'text-emerald-300',
    descriptionUrdu: 'قلب و روح کا قرار، دنیا کے ہنگاموں سے دور عافیت',
    iconName: 'Feather'
  },
  {
    id: 'falsafa',
    labelUrdu: 'تفکر و شعور',
    labelEnglish: 'Contemplation & Insight',
    colorHex: '#0284c7',
    bgClass: 'bg-sky-950/70',
    borderClass: 'border-sky-500/60',
    textClass: 'text-sky-300',
    descriptionUrdu: 'ہستی و نیستی کے راز، کائنات اور حیات پر گہری سوچ',
    iconName: 'Compass'
  },
  {
    id: 'tanhaee',
    labelUrdu: 'تنہائی و خاموشی',
    labelEnglish: 'Solitude & Quietude',
    colorHex: '#a855f7',
    bgClass: 'bg-purple-950/70',
    borderClass: 'border-purple-500/60',
    textClass: 'text-purple-300',
    descriptionUrdu: 'خلوت کی گہری رات، اپنے وجود سے تنہا مکالمہ',
    iconName: 'Moon'
  },
  {
    id: 'josh',
    labelUrdu: 'جوش و ولولہ',
    labelEnglish: 'Passion & Resolve',
    colorHex: '#ea580c',
    bgClass: 'bg-orange-950/70',
    borderClass: 'border-orange-500/60',
    textClass: 'text-orange-300',
    descriptionUrdu: 'بے باکی، مقصد کا عزم اور حق گوئی کا جذبہ',
    iconName: 'Flame'
  },
  {
    id: 'shukr',
    labelUrdu: 'شکر گزاری و رضا',
    labelEnglish: 'Gratitude & Grace',
    colorHex: '#14b8a6',
    bgClass: 'bg-teal-950/70',
    borderClass: 'border-teal-500/60',
    textClass: 'text-teal-300',
    descriptionUrdu: 'نعمتِ احساس پر شکر، تقدیر اور حال سے اطمینان',
    iconName: 'Heart'
  }
];

export const REFLECTIVE_PROMPTS = [
  {
    urdu: 'اس شعر نے آج کے دن آپ کے دل کی کس چھپی ہوئی کیفیت کو زبان دی؟',
    english: 'Which hidden feeling did this verse give voice to today?'
  },
  {
    urdu: 'ان مصرعوں کو پڑھ کر ماضی کا کون سا لمحہ یا شخص یاد آیا؟',
    english: 'Which past moment or memory resurfaced upon reading these words?'
  },
  {
    urdu: 'کیا اس شعر کی تشریح آپ کی روزمرہ زندگی کے کسی الجھاؤ کو سلجھاتی ہے؟',
    english: 'How does the underlying philosophy of this couplet illuminate your day?'
  },
  {
    urdu: 'شاعر کے اس خیال سے آپ کو کیا روحانی سکون یا نیا حوصلہ ملا؟',
    english: 'What solace or renewed courage did you discover within this poetry?'
  }
];

// Initial starter reflection so the user immediately experiences the journal
const INITIAL_STARTER_REFLECTIONS: DailyReflection[] = [
  {
    id: 'refl-starter-1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    dateDisplay: new Date(Date.now() - 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    timeDisplay: '21:15',
    poemId: 'ghalib-1',
    poemTitle: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
    poetName: 'مرزا اسد اللہ خاں غالب',
    misra1: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
    misra2: 'بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
    mood: 'falsafa',
    moodLabelUrdu: 'تفکر و شعور',
    moodLabelEnglish: 'Contemplation & Insight',
    moodColorHex: '#0284c7',
    title: 'خواہشات کی لامتناہی وسعت اور غالب کی حقیقت پسندی',
    content: 'آج ایک کام میں دیر ہونے پر دل بہت بے چین تھا، لیکن جب غالب کا یہ شعر پڑھا تو یوں لگا جیسے ساری بے قراری ایک مسکراہٹ میں ڈھل گئی۔ انسان ہمیشہ مزید کی طلب میں رہتا ہے، مگر زندگی کا اصل حسن اسی تڑپ اور نا تمامی میں پنہاں ہے۔ غالب نے سچ کہا کہ ارماں نکلتے بھی رہیں تو دل مطمئن نہیں ہوتا۔',
    tags: ['خواہش', 'صبر', 'غالب', 'شام'],
    intensity: 4,
    isBookmarked: true
  }
];

export function getMoodConfig(mood: ReflectionMood): MoodConfig {
  return REFLECTION_MOODS.find(m => m.id === mood) || REFLECTION_MOODS[0];
}

export function loadReflections(): DailyReflection[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REFLECTIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REFLECTIONS_STORAGE_KEY, JSON.stringify(INITIAL_STARTER_REFLECTIONS));
      return INITIAL_STARTER_REFLECTIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.error('Error loading daily reflections from localStorage:', err);
  }
  return INITIAL_STARTER_REFLECTIONS;
}

export function saveReflections(reflections: DailyReflection[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REFLECTIONS_STORAGE_KEY, JSON.stringify(reflections));
    window.dispatchEvent(new CustomEvent(REFLECTIONS_EVENT_NAME, { detail: reflections }));
  } catch (err) {
    console.error('Error saving daily reflections to localStorage:', err);
  }
}

export function addReflection(reflection: Omit<DailyReflection, 'id' | 'createdAt' | 'dateDisplay' | 'timeDisplay'>): DailyReflection {
  const current = loadReflections();
  const now = new Date();
  const newEntry: DailyReflection = {
    ...reflection,
    id: `refl-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    createdAt: now.toISOString(),
    dateDisplay: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    timeDisplay: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  };

  const updated = [newEntry, ...current];
  saveReflections(updated);
  return newEntry;
}

export function updateReflection(id: string, updates: Partial<DailyReflection>): DailyReflection[] {
  const current = loadReflections();
  const updated = current.map(item => {
    if (item.id === id) {
      return { ...item, ...updates };
    }
    return item;
  });
  saveReflections(updated);
  return updated;
}

export function deleteReflection(id: string): DailyReflection[] {
  const current = loadReflections();
  const updated = current.filter(item => item.id !== id);
  saveReflections(updated);
  return updated;
}

export function toggleBookmarkReflection(id: string): DailyReflection[] {
  const current = loadReflections();
  const updated = current.map(item => {
    if (item.id === id) {
      return { ...item, isBookmarked: !item.isBookmarked };
    }
    return item;
  });
  saveReflections(updated);
  return updated;
}
