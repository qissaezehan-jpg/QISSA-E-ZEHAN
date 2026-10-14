// Literary Reading Progress & Streak Tracking System
// Manages verse exploration, streaks, ranks, and badges with localStorage persistence

export interface ReadingRank {
  level: number;
  titleUrdu: string;
  titleEn: string;
  minVerses: number;
  maxVerses: number;
  badgeColor: string;
  gradient: string;
  descriptionUrdu: string;
  quoteUrdu: string;
}

export const READING_RANKS: ReadingRank[] = [
  {
    level: 1,
    titleUrdu: 'طالبِ علم',
    titleEn: 'Novice Scholar',
    minVerses: 0,
    maxVerses: 15,
    badgeColor: 'text-amber-400 border-amber-700/50',
    gradient: 'from-stone-900 to-amber-950/40',
    descriptionUrdu: 'شاعری کے دبستان میں پہلا قدم، علم کی پیاس',
    quoteUrdu: 'ہر چند کہ مکتب سے دور ہیں، ذوق کے پابند ہیں'
  },
  {
    level: 2,
    titleUrdu: 'شائقِ ادب',
    titleEn: 'Poetry Enthusiast',
    minVerses: 15,
    maxVerses: 45,
    badgeColor: 'text-emerald-400 border-emerald-700/50',
    gradient: 'from-stone-900 to-emerald-950/40',
    descriptionUrdu: 'الفاظ کے سحر اور کلام کے حسن کا پرجوش قدردان',
    quoteUrdu: 'شوق کا کوئی پیمانہ نہیں ہوتا'
  },
  {
    level: 3,
    titleUrdu: 'صاحبِ ذوق',
    titleEn: 'Connoisseur of Taste',
    minVerses: 45,
    maxVerses: 90,
    badgeColor: 'text-sky-400 border-sky-700/50',
    gradient: 'from-stone-900 to-sky-950/40',
    descriptionUrdu: 'اچھے اور برے شعر میں تمیز رکھنے والا باذوق قاری',
    quoteUrdu: 'کلامِ پاکیزہ روح کی غذا ہے'
  },
  {
    level: 4,
    titleUrdu: 'سخن شناس',
    titleEn: 'Verse Discerner',
    minVerses: 90,
    maxVerses: 160,
    badgeColor: 'text-indigo-400 border-indigo-700/50',
    gradient: 'from-stone-900 to-indigo-950/40',
    descriptionUrdu: 'بحر و وزن اور الفاظ کے باطنی مفاہیم سے آشنا',
    quoteUrdu: 'جانتا ہے جو سخن کے رموز کو'
  },
  {
    level: 5,
    titleUrdu: 'سخن فہم',
    titleEn: 'Insightful Master of Poesy',
    minVerses: 160,
    maxVerses: 250,
    badgeColor: 'text-fuchsia-400 border-fuchsia-700/50',
    gradient: 'from-stone-900 to-fuchsia-950/40',
    descriptionUrdu: 'شعر کی تہہ داری اور غالب و میر کی گہرائیوں کا ادراک',
    quoteUrdu: 'شعر فہمی خود ایک تخلیق ہے'
  },
  {
    level: 6,
    titleUrdu: 'استادِ سخن',
    titleEn: 'Grand Master of Verses',
    minVerses: 250,
    maxVerses: 999999,
    badgeColor: 'text-amber-300 border-amber-500',
    gradient: 'from-amber-950/60 to-stone-900',
    descriptionUrdu: 'شعر و ادب کی کائنات کا کامل شناور اور رہبر',
    quoteUrdu: 'ہوئے تم دوست جس کے دشمن اس کا آسماں کیوں ہو'
  }
];

export interface ReadingAchievement {
  id: string;
  titleUrdu: string;
  titleEn: string;
  descriptionUrdu: string;
  descriptionEn: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  category: 'verses' | 'streak' | 'exploration' | 'tashreeh';
}

export const DEFAULT_ACHIEVEMENTS: ReadingAchievement[] = [
  {
    id: 'first-step',
    titleUrdu: 'پہلا قدم',
    titleEn: 'First Footstep',
    descriptionUrdu: 'اپنے ادبی سفر میں پہلے 5 اشعار کا مطالعہ کیا',
    descriptionEn: 'Explored your first 5 poetic verses',
    iconName: 'Footprints',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'verses'
  },
  {
    id: 'daily-riwaz',
    titleUrdu: 'روزانہ ریاض',
    titleEn: 'Daily Commitment',
    descriptionUrdu: 'ایک دن کا مقررہ ادبی ہدف کامیابی سے مکمل کیا',
    descriptionEn: 'Achieved your daily verse reading goal',
    iconName: 'Target',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'streak'
  },
  {
    id: 'streak-3',
    titleUrdu: 'سہ روزہ تسلسل',
    titleEn: '3-Day Poetic Streak',
    descriptionUrdu: 'مسلسل 3 دن کلام و اشعار کا مطالعہ کیا',
    descriptionEn: 'Maintained a 3-day consecutive reading streak',
    iconName: 'Flame',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'streak'
  },
  {
    id: 'streak-7',
    titleUrdu: 'ہفتہ وار ریاضت',
    titleEn: 'Week-long Riyaz',
    descriptionUrdu: 'مسلسل 7 دن تک ادب کے چشمے سے فیضیاب ہوئے',
    descriptionEn: 'Achieved a 7-day reading streak milestone',
    iconName: 'Award',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    category: 'streak'
  },
  {
    id: 'verses-50',
    titleUrdu: 'نیم صد سالہ اشعار',
    titleEn: 'Half-Century of Couplets',
    descriptionUrdu: '50 منتخب اشعار کا عمیق مطالعہ کیا',
    descriptionEn: 'Explored 50 classic couplets in the archive',
    iconName: 'BookOpen',
    unlocked: false,
    progress: 0,
    maxProgress: 50,
    category: 'verses'
  },
  {
    id: 'tashreeh-seeker',
    titleUrdu: 'نکتہ سنجِ معانی',
    titleEn: 'Seeker of Meaning',
    descriptionUrdu: '10 مختلف اشعار کی تفصیلی تشریح کا مطالعہ کیا',
    descriptionEn: 'Read literary commentaries (tashreeh) for 10 couplets',
    iconName: 'Lightbulb',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    category: 'tashreeh'
  },
  {
    id: 'recitation-listener',
    titleUrdu: 'گوش بر آواز',
    titleEn: 'Attentive Ear',
    descriptionUrdu: '5 نظموں یا اشعار کی صوتی قرأت سنی',
    descriptionEn: 'Listened to voice recitations of 5 poems or verses',
    iconName: 'Volume2',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'exploration'
  },
  {
    id: 'poets-explorer',
    titleUrdu: 'محفل کا سیاح',
    titleEn: 'Mushaira Wanderer',
    descriptionUrdu: '4 مختلف اساتذہ کے کلام کا مطالعہ کیا',
    descriptionEn: 'Explored poetry from 4 distinct classical masters',
    iconName: 'Feather',
    unlocked: false,
    progress: 0,
    maxProgress: 4,
    category: 'exploration'
  }
];

export interface ReadingProgressState {
  totalVersesExplored: number;
  versesExploredToday: number;
  streakDays: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyGoal: number; // default 10
  history: Record<string, number>; // date -> count
  exploredVerseIds: string[]; // poemId:index
  exploredPoemIds: string[];
  exploredPoetIds: string[];
  tashreehReadCount: number;
  recitationListenedCount: number;
  achievements: ReadingAchievement[];
  lastStreakUpdatedDate?: string;
}

const STORAGE_KEY = 'qissa_reading_progress_v2';
const EVENT_NAME = 'qissa_reading_progress_updated';

// Helper to get formatted current local date string: YYYY-MM-DD
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Calculate days difference between two YYYY-MM-DD dates
function getDaysDiff(dateStr1: string, dateStr2: string): number {
  if (!dateStr1 || !dateStr2) return 999;
  const d1 = new Date(dateStr1 + 'T00:00:00');
  const d2 = new Date(dateStr2 + 'T00:00:00');
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

// Get the current rank for a given total verses count
export function getRankForVerses(verses: number): ReadingRank {
  for (let i = READING_RANKS.length - 1; i >= 0; i--) {
    if (verses >= READING_RANKS[i].minVerses) {
      return READING_RANKS[i];
    }
  }
  return READING_RANKS[0];
}

// Get the next rank and remaining verses
export function getNextRankProgress(verses: number): {
  currentRank: ReadingRank;
  nextRank: ReadingRank | null;
  progressPercent: number;
  versesRemaining: number;
} {
  const currentRank = getRankForVerses(verses);
  const currentIndex = READING_RANKS.findIndex(r => r.level === currentRank.level);
  
  if (currentIndex === READING_RANKS.length - 1) {
    return {
      currentRank,
      nextRank: null,
      progressPercent: 100,
      versesRemaining: 0
    };
  }

  const nextRank = READING_RANKS[currentIndex + 1];
  const versesInTier = nextRank.minVerses - currentRank.minVerses;
  const versesEarnedInTier = Math.max(0, verses - currentRank.minVerses);
  const progressPercent = Math.min(100, Math.round((versesEarnedInTier / versesInTier) * 100));
  const versesRemaining = Math.max(0, nextRank.minVerses - verses);

  return {
    currentRank,
    nextRank,
    progressPercent,
    versesRemaining
  };
}

// Default initial state
function createInitialState(): ReadingProgressState {
  const today = getLocalDateString();
  return {
    totalVersesExplored: 8, // starting initial encouragement
    versesExploredToday: 4,
    streakDays: 1,
    longestStreak: 1,
    lastActiveDate: today,
    dailyGoal: 10,
    history: {
      [today]: 4
    },
    exploredVerseIds: ['ghalib-dil-e-nadan:0', 'ghalib-dil-e-nadan:1', 'iqbal-shikwa:0', 'momin-asar-us-ko:0'],
    exploredPoemIds: ['ghalib-dil-e-nadan', 'iqbal-shikwa'],
    exploredPoetIds: ['ghalib', 'iqbal'],
    tashreehReadCount: 2,
    recitationListenedCount: 1,
    achievements: DEFAULT_ACHIEVEMENTS.map(a => {
      if (a.id === 'first-step') {
        return { ...a, progress: 5, unlocked: true, unlockedAt: today };
      }
      return a;
    }),
    lastStreakUpdatedDate: today
  };
}

// Load state safely from localStorage
export function loadReadingProgress(): ReadingProgressState {
  if (typeof window === 'undefined') {
    return createInitialState();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialState();
      saveReadingProgress(initial);
      return initial;
    }

    const parsed: ReadingProgressState = JSON.parse(raw);
    const today = getLocalDateString();

    // Check if day rolled over
    if (parsed.lastActiveDate !== today) {
      const diff = getDaysDiff(parsed.lastActiveDate, today);
      
      // If inactive for more than 1 day, reset current streak to 0 until reading today
      if (diff > 1) {
        parsed.streakDays = 0;
      }
      // Reset today's count
      parsed.versesExploredToday = 0;
    }

    // Merge missing achievements from defaults
    const achievementMap = new Map((parsed.achievements || []).map(a => [a.id, a]));
    const mergedAchievements = DEFAULT_ACHIEVEMENTS.map(def => {
      const existing = achievementMap.get(def.id);
      return existing ? { ...def, ...existing } : def;
    });
    parsed.achievements = mergedAchievements;

    return parsed;
  } catch (err) {
    console.error('Error loading reading progress from localStorage:', err);
    return createInitialState();
  }
}

// Save state to localStorage and broadcast update
export function saveReadingProgress(state: ReadingProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: state }));
  } catch (err) {
    console.error('Error saving reading progress:', err);
  }
}

// Update achievements based on current state metrics
function checkAndUpdateAchievements(
  state: ReadingProgressState, 
  today: string
): { updatedAchievements: ReadingAchievement[]; newlyUnlocked: ReadingAchievement[] } {
  const newlyUnlocked: ReadingAchievement[] = [];

  const updatedAchievements = state.achievements.map(ach => {
    let currentProgress = ach.progress;
    let shouldUnlock = ach.unlocked;

    if (ach.id === 'first-step') {
      currentProgress = Math.min(ach.maxProgress, state.totalVersesExplored);
    } else if (ach.id === 'daily-riwaz') {
      currentProgress = state.versesExploredToday >= state.dailyGoal ? 1 : 0;
    } else if (ach.id === 'streak-3') {
      currentProgress = Math.min(ach.maxProgress, state.streakDays);
    } else if (ach.id === 'streak-7') {
      currentProgress = Math.min(ach.maxProgress, state.streakDays);
    } else if (ach.id === 'verses-50') {
      currentProgress = Math.min(ach.maxProgress, state.totalVersesExplored);
    } else if (ach.id === 'tashreeh-seeker') {
      currentProgress = Math.min(ach.maxProgress, state.tashreehReadCount);
    } else if (ach.id === 'recitation-listener') {
      currentProgress = Math.min(ach.maxProgress, state.recitationListenedCount);
    } else if (ach.id === 'poets-explorer') {
      currentProgress = Math.min(ach.maxProgress, state.exploredPoetIds.length);
    }

    if (!shouldUnlock && currentProgress >= ach.maxProgress) {
      shouldUnlock = true;
      const unlockedItem = {
        ...ach,
        progress: currentProgress,
        unlocked: true,
        unlockedAt: today
      };
      newlyUnlocked.push(unlockedItem);
      return unlockedItem;
    }

    return {
      ...ach,
      progress: currentProgress,
      unlocked: shouldUnlock
    };
  });

  return { updatedAchievements, newlyUnlocked };
}

export interface RecordVersesParams {
  count?: number;
  poemId?: string;
  coupletIndex?: number;
  poetId?: string;
  type?: 'read' | 'tashreeh' | 'recite';
}

export interface RecordVersesResult {
  state: ReadingProgressState;
  newlyUnlocked: ReadingAchievement[];
  isNewStreakDay: boolean;
  achievedDailyGoal: boolean;
}

// Primary action to record verses exploration
export function recordVersesExplored(params: RecordVersesParams = {}): RecordVersesResult {
  const currentState = loadReadingProgress();
  const today = getLocalDateString();
  const countToAdd = Math.max(1, params.count ?? 1);

  // Determine verse key if provided
  let isNewVerse = true;
  const exploredVerseIds = [...currentState.exploredVerseIds];
  if (params.poemId !== undefined && params.coupletIndex !== undefined) {
    const key = `${params.poemId}:${params.coupletIndex}`;
    if (exploredVerseIds.includes(key)) {
      isNewVerse = false;
    } else {
      exploredVerseIds.push(key);
    }
  }

  // Determine poem/poet exploration
  const exploredPoemIds = [...currentState.exploredPoemIds];
  if (params.poemId && !exploredPoemIds.includes(params.poemId)) {
    exploredPoemIds.push(params.poemId);
  }

  const exploredPoetIds = [...currentState.exploredPoetIds];
  if (params.poetId && !exploredPoetIds.includes(params.poetId)) {
    exploredPoetIds.push(params.poetId);
  }

  // Tashreeh / Recitation counts
  let tashreehCount = currentState.tashreehReadCount;
  if (params.type === 'tashreeh') {
    tashreehCount += 1;
  }

  let recitationCount = currentState.recitationListenedCount;
  if (params.type === 'recite') {
    recitationCount += 1;
  }

  // Update today's count and total count
  const newTodayCount = currentState.lastActiveDate === today
    ? currentState.versesExploredToday + countToAdd
    : countToAdd;

  const newTotalCount = currentState.totalVersesExplored + countToAdd;

  // Streak logic
  let newStreak = currentState.streakDays;
  let isNewStreakDay = false;

  if (currentState.lastActiveDate !== today) {
    const diff = getDaysDiff(currentState.lastActiveDate, today);
    if (diff === 1) {
      // Consecutive day!
      newStreak += 1;
      isNewStreakDay = true;
    } else if (diff > 1) {
      // Broken streak, restart at 1
      newStreak = 1;
      isNewStreakDay = true;
    }
  } else {
    // If today is the active day and streak was 0 (e.g. freshly visited today), set to 1
    if (newStreak === 0) {
      newStreak = 1;
      isNewStreakDay = true;
    }
  }

  const longestStreak = Math.max(currentState.longestStreak, newStreak);

  // History mapping (last 30 days)
  const history = { ...currentState.history };
  history[today] = (history[today] || 0) + countToAdd;

  // Daily goal achieved check
  const previousToday = currentState.lastActiveDate === today ? currentState.versesExploredToday : 0;
  const achievedDailyGoal = previousToday < currentState.dailyGoal && newTodayCount >= currentState.dailyGoal;

  const nextState: ReadingProgressState = {
    ...currentState,
    totalVersesExplored: newTotalCount,
    versesExploredToday: newTodayCount,
    streakDays: newStreak,
    longestStreak,
    lastActiveDate: today,
    history,
    exploredVerseIds,
    exploredPoemIds,
    exploredPoetIds,
    tashreehReadCount: tashreehCount,
    recitationListenedCount: recitationCount,
    achievements: currentState.achievements
  };

  // Evaluate achievements
  const { updatedAchievements, newlyUnlocked } = checkAndUpdateAchievements(nextState, today);
  nextState.achievements = updatedAchievements;

  saveReadingProgress(nextState);

  return {
    state: nextState,
    newlyUnlocked,
    isNewStreakDay,
    achievedDailyGoal
  };
}

// Update user daily goal
export function updateDailyGoal(goal: number): ReadingProgressState {
  const current = loadReadingProgress();
  const next = { ...current, dailyGoal: Math.max(3, Math.min(100, goal)) };
  saveReadingProgress(next);
  return next;
}

// Reset reading progress (optional for testing/reset)
export function resetReadingProgress(): ReadingProgressState {
  const initial = createInitialState();
  saveReadingProgress(initial);
  return initial;
}
