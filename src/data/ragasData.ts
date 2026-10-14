import { MusicalRaga, Poem, PoeticMoodId } from '../types/poetry';

export const MUSICAL_RAGAS: MusicalRaga[] = [
  {
    id: 'bhairavi',
    nameUrdu: 'راگ بھیرویں',
    nameEnglish: 'Raga Bhairavi',
    praharUrdu: 'صبحِ کاذب / اختتامی سدا بہار',
    praharEnglish: 'Morning / Universal Concluding',
    moodEthosUrdu: 'سوز و گداز، الوداع، دردِ دل اور تسلیم و رضا',
    moodEthosEnglish: 'Pathos, yearning, bittersweet melancholy, and spiritual surrender',
    colorHex: '#e11d48' // Rose crimson
  },
  {
    id: 'darbari',
    nameUrdu: 'راگ درباری',
    nameEnglish: 'Raga Darbari Kanada',
    praharUrdu: 'نیم شب (آدھی رات)',
    praharEnglish: 'Midnight (Solemn)',
    moodEthosUrdu: 'جلال، وقار، گہرا تفکر اور کائناتی فلسفہ',
    moodEthosEnglish: 'Majesty, gravity, philosophical contemplation, and cosmic awe',
    colorHex: '#6366f1' // Indigo
  },
  {
    id: 'yaman',
    nameUrdu: 'راگ یمن',
    nameEnglish: 'Raga Yaman (Kalyan)',
    praharUrdu: 'اوّل شب (شام)',
    praharEnglish: 'First Watch of Night (Evening)',
    moodEthosUrdu: 'سکونِ قلب، پاکیزہ عشق اور شام کی دلکشی',
    moodEthosEnglish: 'Serenity, romantic devotion, tranquil beauty, and prayerful peace',
    colorHex: '#f59e0b' // Amber gold
  },
  {
    id: 'bageshri',
    nameUrdu: 'راگ باگیشری',
    nameEnglish: 'Raga Bageshri',
    praharUrdu: 'پچھلی رات (دیر گئے)',
    praharEnglish: 'Late Night',
    moodEthosUrdu: 'محبوب کے انتظار کی تڑپ اور والہانہ محبت',
    moodEthosEnglish: 'Deep longing, romantic yearning of separated lovers, tender devotion',
    colorHex: '#ec4899' // Pink magenta
  },
  {
    id: 'khamaj',
    nameUrdu: 'راگ کھماج',
    nameEnglish: 'Raga Khamaj',
    praharUrdu: 'دوسرا پہر شب',
    praharEnglish: 'Second Watch of Night',
    moodEthosUrdu: 'شوخی، حسن و ادا، نیم حسرت اور دلفریب رومان',
    moodEthosEnglish: 'Flirtatious elegance, aesthetic longing, delicate romantic charm',
    colorHex: '#d97706' // Warm ochre
  },
  {
    id: 'pilu',
    nameUrdu: 'راگ پیلو',
    nameEnglish: 'Raga Pilu',
    praharUrdu: 'تیسرا پہر / شام',
    praharEnglish: 'Late Afternoon / Dusk',
    moodEthosUrdu: 'دیسی مٹھاس، یادِ ماضی، معصوم حسرت اور ملال',
    moodEthosEnglish: 'Folk nostalgia, tender melancholy, memory of lost love, rustic warmth',
    colorHex: '#10b981' // Emerald
  },
  {
    id: 'kafi',
    nameUrdu: 'راگ کافی',
    nameEnglish: 'Raga Kafi',
    praharUrdu: 'برکھا رت / درمیانی رات',
    praharEnglish: 'Monsoon / Midnight Season',
    moodEthosUrdu: 'صوفیانہ وجد، ساون کی رم جھم اور مستیِ عشق',
    moodEthosEnglish: 'Sufi ecstatic trance, monsoon rain, bohemian devotion, soul dance',
    colorHex: '#06b6d4' // Cyan
  },
  {
    id: 'pahadi',
    nameUrdu: 'راگ پہاڑی',
    nameEnglish: 'Raga Pahadi',
    praharUrdu: 'سدا بہار نغمگی',
    praharEnglish: 'Anytime / Evergreen Evening',
    moodEthosUrdu: 'کوہستانی فضا، آزادی، سرشاری اور نغمۂ فطرت',
    moodEthosEnglish: 'Mountain breeze, lyrical freedom, joyful nostalgia, pastoral melody',
    colorHex: '#84cc16' // Lime green
  },
  {
    id: 'desh',
    nameUrdu: 'راگ دیس',
    nameEnglish: 'Raga Desh',
    praharUrdu: 'دوسرا پہر شب / ساون',
    praharEnglish: 'Night / Rainy Season',
    moodEthosUrdu: 'وطن کی محبت، برکھا کی پکار اور انقلابی تڑپ',
    moodEthosEnglish: 'Patriotic sentiment, yearning for homeland, rain-soaked longing',
    colorHex: '#3b82f6' // Blue
  },
  {
    id: 'tilang',
    nameUrdu: 'راگ تلنگ',
    nameEnglish: 'Raga Tilang',
    praharUrdu: 'سہ پہر',
    praharEnglish: 'Afternoon',
    moodEthosUrdu: 'شوق، اضطراب اور دھیما دھیما رنج',
    moodEthosEnglish: 'Crisp romantic yearning, subtle restlessness, poetic cadence',
    colorHex: '#8b5cf6' // Violet
  },
  {
    id: 'marwa',
    nameUrdu: 'راگ ماروا',
    nameEnglish: 'Raga Marwa',
    praharUrdu: 'غروبِ آفتاب (شفق)',
    praharEnglish: 'Sunset Twilight (Sandhya)',
    moodEthosUrdu: 'اضطراب، شفق کا سناٹا، وجودی تنہائی اور بے چینی',
    moodEthosEnglish: 'Twilight tension, existential restlessness, impending void, angst',
    colorHex: '#f97316' // Sunset orange
  },
  {
    id: 'malkauns',
    nameUrdu: 'راگ مالکونس',
    nameEnglish: 'Raga Malkauns',
    praharUrdu: 'گہری آدھی رات',
    praharEnglish: 'Deep Midnight',
    moodEthosUrdu: 'گہرا مراقبہ، تپسیا، باطنی خاموشی اور جلال',
    moodEthosEnglish: 'Meditative austerity, mystical trance, profound introspective calm',
    colorHex: '#a855f7' // Purple
  }
];

// Initial authentic classical Raga mappings for known poems
export const DEFAULT_POEM_RAGAS: Record<string, string[]> = {
  'ghalib-ghazal-01': ['bhairavi', 'yaman'],      // دلِ ناداں تجھے ہوا کیا ہے
  'ghalib-ghazal-02': ['darbari', 'marwa'],        // ہزاروں خواہشیں ایسی
  'faiz-nazm-01': ['desh', 'kafi'],                // ہم دیکھیں گے
  'mir-ghazal-01': ['bageshri', 'pilu'],           // دکھائی دیے یوں کہ بے خود کیا
  'jaun-ghazal-01': ['marwa', 'bhairavi'],         // بے دلی کیا یوں ہی دن گزر جائیں گے
  'iqbal-ghazal-01': ['darbari', 'malkauns'],      // خودی کو کر بلند اتنا
  'nasir-ghazal-01': ['pilu', 'khamaj'],           // دل میں اک لہر سی اٹھی ہے ابھی
  'parveen-ghazal-01': ['yaman', 'pahadi'],        // کو بہ کو پھیل گئی بات شناسائی کی
  'faraz-ghazal-01': ['bageshri', 'bhairavi'],      // رنجش ہی سہی دل ہی دکھانے کے لیے آ
  'dagh-ghazal-01': ['khamaj', 'tilang']           // غضب کیا ترے وعدے پہ اعتبار کیا
};

export interface UserPoemTagData {
  ragas: string[];
  moods: PoeticMoodId[];
  customTags: string[];
}

const STORAGE_KEY = 'qissa_zehan_poem_tags_v1';

export function getStoredUserTags(): Record<string, UserPoemTagData> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('Failed to parse user poem tags from localStorage:', e);
    return {};
  }
}

export function saveUserTagsToStorage(allTags: Record<string, UserPoemTagData>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allTags));
  } catch (e) {
    console.warn('Failed to save user poem tags to localStorage:', e);
  }
}

export function getPoemRagas(poem: Poem): MusicalRaga[] {
  const stored = getStoredUserTags();
  const userRagaIds = stored[poem.id]?.ragas;
  
  const ragaIdsToUse = (userRagaIds && userRagaIds.length > 0)
    ? userRagaIds
    : (poem.ragas && poem.ragas.length > 0)
      ? poem.ragas
      : (DEFAULT_POEM_RAGAS[poem.id] || ['bhairavi']);

  return ragaIdsToUse
    .map(id => MUSICAL_RAGAS.find(r => r.id === id || r.nameEnglish.toLowerCase() === id.toLowerCase()))
    .filter((r): r is MusicalRaga => Boolean(r));
}

export function getPoemMoods(poem: Poem): PoeticMoodId[] {
  const stored = getStoredUserTags();
  const userMoods = stored[poem.id]?.moods;
  if (userMoods && userMoods.length > 0) {
    return userMoods;
  }
  if (poem.moods && poem.moods.length > 0) {
    return poem.moods;
  }
  if (poem.mood) {
    return [poem.mood];
  }
  // Heuristic based on theme
  if (poem.theme === 'Ishq-o-Muhabbat') return ['ishq'];
  if (poem.theme === 'Hijr-o-Firaaq' || poem.theme === 'Yaas-o-Tanhaee') return ['gham'];
  if (poem.theme === 'Falsafa-o-Hayaat') return ['falsafa'];
  if (poem.theme === 'Inqilab-o-Baghaawat') return ['inqilab'];
  if (poem.theme === 'Tasawwuf') return ['tasawwuf'];
  return ['falsafa'];
}

export function getPoemCustomTags(poem: Poem): string[] {
  const stored = getStoredUserTags();
  const userTags = stored[poem.id]?.customTags;
  if (userTags && userTags.length > 0) {
    return userTags;
  }
  return poem.customTags || [];
}

export function updatePoemTags(
  poemId: string, 
  data: { ragas: string[]; moods: PoeticMoodId[]; customTags: string[] }
): void {
  const stored = getStoredUserTags();
  stored[poemId] = data;
  saveUserTagsToStorage(stored);
}
