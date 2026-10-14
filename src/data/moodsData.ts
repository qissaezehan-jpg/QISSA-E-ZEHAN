import { PoeticMoodId } from '../types/poetry';

export interface MoodConfig {
  id: PoeticMoodId;
  labelUrdu: string;
  labelEnglish: string;
  descriptionUrdu: string;
  descriptionEnglish: string;
  taglineUrdu: string;
  colorName: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  activeBg: string;
  activeBorder: string;
  activeGlow: string;
  accentHex: string;
}

export const POETIC_MOODS: MoodConfig[] = [
  {
    id: 'all',
    labelUrdu: 'سب کیفیات',
    labelEnglish: 'All Moods',
    taglineUrdu: 'تمام دلی جذبات اور قلبی کیفیات',
    descriptionUrdu: 'تمام موضوعات اور وجدانی کیفیات کا جامع انتخاب',
    descriptionEnglish: 'Browse the entire archive across all emotional spectra',
    colorName: 'amber',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-800/50',
    badgeText: 'text-amber-300',
    activeBg: 'bg-amber-950/80',
    activeBorder: 'border-amber-500',
    activeGlow: 'shadow-amber-900/30 ring-1 ring-amber-500/50',
    accentHex: '#d97706'
  },
  {
    id: 'gham',
    labelUrdu: 'غم',
    labelEnglish: 'Grief',
    taglineUrdu: 'ہجر، اداسی اور شکستِ دل',
    descriptionUrdu: 'حزن و ملال، ہجر و فراق، دل کی شکستگی اور دلی واردات',
    descriptionEnglish: 'Heartbreak, poignant melancholy, bereavement & unhealed sorrow',
    colorName: 'rose',
    badgeBg: 'bg-rose-950/70',
    badgeBorder: 'border-rose-800/50',
    badgeText: 'text-rose-300',
    activeBg: 'bg-rose-950/80',
    activeBorder: 'border-rose-500',
    activeGlow: 'shadow-rose-900/30 ring-1 ring-rose-500/50',
    accentHex: '#f43f5e'
  },
  {
    id: 'ishq',
    labelUrdu: 'عشق',
    labelEnglish: 'Love',
    taglineUrdu: 'وارفتگی، وصال و تمنا',
    descriptionUrdu: 'محبت کا نشہ، محبوب کی دید، وارفتگی اور لازوال کشش',
    descriptionEnglish: 'Passionate devotion, romantic ecstasy, longing & eternal adoration',
    colorName: 'red',
    badgeBg: 'bg-red-950/70',
    badgeBorder: 'border-red-800/50',
    badgeText: 'text-red-300',
    activeBg: 'bg-red-950/80',
    activeBorder: 'border-red-500',
    activeGlow: 'shadow-red-900/30 ring-1 ring-red-500/50',
    accentHex: '#ef4444'
  },
  {
    id: 'falsafa',
    labelUrdu: 'فلسفہ',
    labelEnglish: 'Philosophy',
    taglineUrdu: 'وجودی سوالات و گہرا تفکر',
    descriptionUrdu: 'کائنات، جبر و قدر، بے ثباتیِ حیات اور وجود کے سربستہ راز',
    descriptionEnglish: 'Existential metaphysics, transient mortality & profound contemplation',
    colorName: 'indigo',
    badgeBg: 'bg-indigo-950/70',
    badgeBorder: 'border-indigo-800/50',
    badgeText: 'text-indigo-300',
    activeBg: 'bg-indigo-950/80',
    activeBorder: 'border-indigo-500',
    activeGlow: 'shadow-indigo-900/30 ring-1 ring-indigo-500/50',
    accentHex: '#6366f1'
  },
  {
    id: 'inqilab',
    labelUrdu: 'انقلاب',
    labelEnglish: 'Revolution',
    taglineUrdu: 'مزاحمت، آزادی و للکار',
    descriptionUrdu: 'ظلم کے خلاف بغاوت، جبر کے کوہِ گراں اور خلقِ خدا کی حاکمیت',
    descriptionEnglish: 'Defiance against oppression, socialist liberty & revolutionary dawn',
    colorName: 'emerald',
    badgeBg: 'bg-emerald-950/70',
    badgeBorder: 'border-emerald-800/50',
    badgeText: 'text-emerald-300',
    activeBg: 'bg-emerald-950/80',
    activeBorder: 'border-emerald-500',
    activeGlow: 'shadow-emerald-900/30 ring-1 ring-emerald-500/50',
    accentHex: '#10b981'
  },
  {
    id: 'tasawwuf',
    labelUrdu: 'تصوف',
    labelEnglish: 'Mysticism',
    taglineUrdu: 'خودی، وحدت اور کائناتی پرواز',
    descriptionUrdu: 'معرفتِ الٰہی، خودی کی بیداری اور کائناتی منزلوں کا عرفان',
    descriptionEnglish: 'Spiritual transcendence, selfhood (Khudi) & divine oneness',
    colorName: 'purple',
    badgeBg: 'bg-purple-950/70',
    badgeBorder: 'border-purple-800/50',
    badgeText: 'text-purple-300',
    activeBg: 'bg-purple-950/80',
    activeBorder: 'border-purple-500',
    activeGlow: 'shadow-purple-900/30 ring-1 ring-purple-500/50',
    accentHex: '#a855f7'
  },
  {
    id: 'tanhaee',
    labelUrdu: 'تنہائی',
    labelEnglish: 'Solitude',
    taglineUrdu: 'رات کا سکوت و یادِ رفتگاں',
    descriptionUrdu: 'گوشۂ تنہائی، خاموش راتیں اور دل کی ویرانیاں',
    descriptionEnglish: 'Quiet midnight contemplation, exile, isolation & nostalgic twilight',
    colorName: 'sky',
    badgeBg: 'bg-sky-950/70',
    badgeBorder: 'border-sky-800/50',
    badgeText: 'text-sky-300',
    activeBg: 'bg-sky-950/80',
    activeBorder: 'border-sky-500',
    activeGlow: 'shadow-sky-900/30 ring-1 ring-sky-500/50',
    accentHex: '#0284c7'
  }
];

export const getMoodById = (id: PoeticMoodId | string): MoodConfig => {
  const found = POETIC_MOODS.find(m => m.id === id);
  return found || POETIC_MOODS[0];
};
