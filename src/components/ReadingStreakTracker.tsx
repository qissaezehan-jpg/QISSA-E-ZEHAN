import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  BookOpen, 
  Award, 
  Target, 
  Calendar, 
  ChevronRight, 
  X, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Plus, 
  Feather, 
  Volume2, 
  Lightbulb,
  TrendingUp,
  Info
} from 'lucide-react';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { READING_RANKS, getLocalDateString } from '../utils/readingTracker';

interface ReadingStreakTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  fontPreference?: string;
}

export const ReadingStreakTracker: React.FC<ReadingStreakTrackerProps> = ({
  isOpen,
  onClose,
  fontPreference = 'nastaliq'
}) => {
  const { progress, rankInfo, logVerses, setGoal, resetProgress } = useReadingProgress();
  const [activeTab, setActiveTab] = useState<'overview' | 'ranks' | 'achievements' | 'activity'>('overview');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [justLogged, setJustLogged] = useState(false);

  // Compute 14-day calendar history
  const historyDays = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = getLocalDateString(d);
      const count = progress.history[dateStr] || 0;
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const isToday = i === 0;
      days.push({
        dateStr,
        count,
        dayName,
        dayNum,
        isToday
      });
    }
    return days;
  }, [progress.history]);

  if (!isOpen) return null;

  const fontClass = fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const todayStr = getLocalDateString();
  const isStreakActiveToday = progress.lastActiveDate === todayStr && progress.versesExploredToday > 0;
  const goalPercent = Math.min(100, Math.round((progress.versesExploredToday / progress.dailyGoal) * 100));

  const handleQuickLog = () => {
    logVerses({ count: 1 });
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-stone-950 border border-amber-600/40 rounded-3xl shadow-2xl shadow-amber-950/60 overflow-hidden flex flex-col max-h-[92vh] text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-amber-900/40 bg-gradient-to-b from-[#1b140b] to-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Flame className="w-6 h-6 animate-pulse text-amber-400 fill-amber-400/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`${fontClass} text-2xl sm:text-3xl text-amber-200 font-bold leading-tight`}>
                  سفرِ مطالعہ و تسلسل
                </h2>
                <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono hidden sm:inline">
                  · Reading Journey
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans mt-0.5">
                ہر روز اشعار کے مطالعے کا تسلسل اور ادبی مدارج کی پیش رفت
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-100 border border-stone-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-6 pt-3 bg-stone-950 border-b border-stone-800/80 gap-2 overflow-x-auto text-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 font-medium transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>خلاصۂ پیش رفت (Overview)</span>
          </button>

          <button
            onClick={() => setActiveTab('ranks')}
            className={`pb-3 px-3 font-medium transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ranks'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>مراتبِ سخن (Literary Ranks)</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`pb-3 px-3 font-medium transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'achievements'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>تمغہ ہائے اعزاز (Badges)</span>
          </button>

          <button
            onClick={() => setActiveTab('activity')}
            className={`pb-3 px-3 font-medium transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'activity'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>روزنامچہ (Activity)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Primary Metric Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* 1. Consecutive Streak */}
                <div className="bg-gradient-to-br from-[#1c1308] to-stone-900 border border-amber-600/40 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-amber-400">
                    <span className="font-medium">تسلسلِ مطالعہ · Daily Streak</span>
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </div>

                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-amber-200 font-mono">
                      {progress.streakDays}
                    </span>
                    <span className={`${fontClass} text-xl text-amber-400`}>
                      دن
                    </span>
                  </div>

                  <div className="text-xs text-stone-300 flex items-center justify-between pt-2 border-t border-amber-900/30">
                    <span>
                      {isStreakActiveToday ? '✓ آج کا تسلسل برقرار' : '⚡ آج کا شعر پڑھیں'}
                    </span>
                    <span className="text-stone-400 font-mono text-[11px]">
                      ریکارڈ: {progress.longestStreak} دن
                    </span>
                  </div>
                </div>

                {/* 2. Total Verses Read */}
                <div className="bg-gradient-to-br from-[#0c1815] to-stone-900 border border-emerald-700/40 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-emerald-400">
                    <span className="font-medium">کل مطالعہ شدہ اشعار · Total Verses</span>
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-emerald-200 font-mono">
                      {progress.totalVersesExplored}
                    </span>
                    <span className={`${fontClass} text-xl text-emerald-400`}>
                      اشعار
                    </span>
                  </div>

                  <div className="text-xs text-stone-300 flex items-center justify-between pt-2 border-t border-emerald-900/30">
                    <span>
                      {progress.exploredPoemIds.length} کلام · {progress.exploredPoetIds.length} شعراء
                    </span>
                    <span className="text-stone-400 font-mono text-[11px]">
                      {progress.tashreehReadCount} تشریحات
                    </span>
                  </div>
                </div>

                {/* 3. Literary Rank */}
                <div className="bg-gradient-to-br from-[#12131d] to-stone-900 border border-indigo-700/40 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-indigo-400">
                    <span className="font-medium">ادبی مرتبہ · Literary Rank</span>
                    <Trophy className="w-4 h-4 text-indigo-400" />
                  </div>

                  <div className="my-2">
                    <div className={`${fontClass} text-2xl font-bold text-indigo-200`}>
                      {rankInfo.currentRank.titleUrdu}
                    </div>
                    <div className="text-xs text-indigo-300/80 font-sans">
                      {rankInfo.currentRank.titleEn}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-indigo-900/30 text-xs">
                    {rankInfo.nextRank ? (
                      <div className="flex items-center justify-between text-stone-400">
                        <span>اگلا مرتبہ: {rankInfo.nextRank.titleUrdu}</span>
                        <span className="font-mono text-indigo-300">{rankInfo.versesRemaining} باقی</span>
                      </div>
                    ) : (
                      <span className="text-amber-400 font-medium">کامل مرتبہ حاصل ہے!</span>
                    )}
                  </div>
                </div>

              </div>

              {/* Today's Daily Goal & Progress */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-amber-400" />
                      <h3 className={`${fontClass} text-xl text-stone-100 font-bold`}>
                        آج کا روزانہ ہدف: {progress.versesExploredToday} / {progress.dailyGoal} اشعار
                      </h3>
                    </div>
                    <p className="text-xs text-stone-400 mt-1">
                      {goalPercent >= 100 
                        ? '🎉 مبارک ہو! آپ نے آج کا مقررہ ہدف مکمل کر لیا ہے۔' 
                        : `ہدف مکمل کرنے کے لیے مزید ${Math.max(0, progress.dailyGoal - progress.versesExploredToday)} اشعار پڑھیں۔`}
                    </p>
                  </div>

                  {/* Goal Setter Buttons */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto bg-stone-950 border border-stone-800 p-1 rounded-xl">
                    <span className="text-[11px] text-stone-400 px-2 font-mono">ہدف:</span>
                    {[5, 10, 15, 25].map(target => (
                      <button
                        key={target}
                        onClick={() => setGoal(target)}
                        className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-colors ${
                          progress.dailyGoal === target
                            ? 'bg-amber-600 text-white font-bold'
                            : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                        }`}
                      >
                        {target}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="h-3 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800 p-0.5">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        goalPercent >= 100 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                          : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400'
                      }`}
                      style={{ width: `${goalPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-stone-400 mt-1.5 font-mono">
                    <span>0 اشعار</span>
                    <span className="text-amber-300 font-bold">{goalPercent}% مکمل</span>
                    <span>{progress.dailyGoal} اشعار</span>
                  </div>
                </div>

                {/* Quick Interactive Verse Action */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/60">
                  <span className="text-xs text-stone-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>کلام یا شعر پڑھنے پر پیش رفت خودکار طور پر محفوظ ہوتی ہے۔</span>
                  </span>

                  <button
                    onClick={handleQuickLog}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-600/40 text-xs font-medium transition-all active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className={`${fontClass} text-sm pt-0.5`}>ایک شعر کا مطالعہ درج کریں</span>
                    {justLogged && <span className="text-emerald-400 font-mono">+1 ✓</span>}
                  </button>
                </div>
              </div>

              {/* Next Rank Progress Card */}
              {rankInfo.nextRank && (
                <div className="bg-gradient-to-r from-[#17130b] via-stone-900 to-[#10121a] border border-amber-800/40 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      <span className={`${fontClass} text-lg text-amber-200 font-bold`}>
                        اگلا ادبی زینہ: {rankInfo.nextRank.titleUrdu} ({rankInfo.nextRank.titleEn})
                      </span>
                    </div>
                    <span className="text-xs text-stone-400 font-mono">
                      {progress.totalVersesExplored} / {rankInfo.nextRank.minVerses} اشعار
                    </span>
                  </div>

                  <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-600 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${rankInfo.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-400 mt-2">
                    <p className={`${fontClass} text-stone-300 text-sm`}>
                      «{rankInfo.nextRank.quoteUrdu}»
                    </p>
                    <span className="font-mono text-amber-400 text-xs font-bold">
                      {rankInfo.versesRemaining} مزید اشعار درکار
                    </span>
                  </div>
                </div>
              )}

              {/* 14-Day Streak Strip Preview */}
              <div className="bg-stone-900/70 border border-stone-800/80 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>گزشتہ دو ہفتوں کا ادبی ریاض (14-Day Activity)</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-0.5"
                  >
                    <span>تفصیل دیکھیں</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5 text-center">
                  {historyDays.map((d) => {
                    const hasActivity = d.count > 0;
                    return (
                      <div 
                        key={d.dateStr}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-between transition-all ${
                          d.isToday 
                            ? 'border-amber-500 bg-amber-950/40 shadow-sm'
                            : hasActivity 
                              ? 'border-amber-900/60 bg-amber-950/20' 
                              : 'border-stone-800 bg-stone-950/40 text-stone-600'
                        }`}
                        title={`${d.dateStr}: ${d.count} verses`}
                      >
                        <span className="text-[10px] text-stone-400">{d.dayName}</span>
                        <div className={`w-3.5 h-3.5 rounded-full my-1 ${
                          hasActivity ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-stone-800'
                        }`} />
                        <span className={`text-[10px] font-mono ${hasActivity ? 'text-amber-200 font-bold' : 'text-stone-500'}`}>
                          {d.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: RANKS & LEVELS */}
          {activeTab === 'ranks' && (
            <div className="space-y-4">
              <div className="text-center max-w-lg mx-auto mb-4">
                <h3 className={`${fontClass} text-2xl text-amber-200 font-bold`}>
                  مراتبِ فہم و ادراک
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  کلاسیکی کلام کا گہرا مطالعہ انسان کے ادبی ذوق کو نئے مراتب پر فائز کرتا ہے۔
                </p>
              </div>

              <div className="space-y-3">
                {READING_RANKS.map((rank) => {
                  const isCurrent = rank.level === rankInfo.currentRank.level;
                  const isUnlocked = progress.totalVersesExplored >= rank.minVerses;

                  return (
                    <div
                      key={rank.level}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'border-amber-500 bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-950 shadow-lg shadow-amber-950/40'
                          : isUnlocked
                            ? 'border-stone-800 bg-stone-900/60'
                            : 'border-stone-900 bg-stone-950/40 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm border ${
                            isCurrent 
                              ? 'bg-amber-500 text-stone-950 border-amber-400' 
                              : isUnlocked
                                ? 'bg-stone-800 text-amber-400 border-amber-900/40'
                                : 'bg-stone-900 text-stone-600 border-stone-800'
                          }`}>
                            L{rank.level}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`${fontClass} text-xl sm:text-2xl font-bold ${
                                isCurrent ? 'text-amber-200' : isUnlocked ? 'text-stone-200' : 'text-stone-500'
                              }`}>
                                {rank.titleUrdu}
                              </span>
                              <span className="text-xs text-stone-400 font-sans">
                                · {rank.titleEn}
                              </span>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500 text-stone-950 font-bold uppercase tracking-wider">
                                  موجودہ مرتبہ
                                </span>
                              )}
                            </div>
                            <p className={`${fontClass} text-xs text-stone-400 mt-1`}>
                              {rank.descriptionUrdu}
                            </p>
                          </div>
                        </div>

                        <div className="text-left sm:text-right flex-shrink-0">
                          <div className="text-xs font-mono text-amber-400">
                            {rank.minVerses} {rank.maxVerses < 900000 ? `– ${rank.maxVerses}` : '+'} اشعار
                          </div>
                          <p className={`${fontClass} text-[11px] text-stone-500 italic mt-0.5`}>
                            «{rank.quoteUrdu}»
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ACHIEVEMENTS & BADGES */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`${fontClass} text-2xl text-amber-200 font-bold`}>
                    تمغہ ہائے کلام و مطالعہ
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    مختلف ادبی سنگ میل عبور کرنے پر ملنے والے اعزازی تمغے
                  </p>
                </div>
                <div className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-amber-300">
                  {progress.achievements.filter(a => a.unlocked).length} / {progress.achievements.length} حاصل شدہ
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {progress.achievements.map((ach) => {
                  const isUnlocked = ach.unlocked;
                  return (
                    <div
                      key={ach.id}
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                        isUnlocked
                          ? 'border-amber-600/50 bg-gradient-to-br from-[#1a140b] to-stone-900 shadow-md'
                          : 'border-stone-800/80 bg-stone-950/60'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center border ${
                        isUnlocked
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-stone-900 text-stone-600 border-stone-800'
                      }`}>
                        {ach.iconName === 'Flame' && <Flame className="w-5 h-5" />}
                        {ach.iconName === 'Target' && <Target className="w-5 h-5" />}
                        {ach.iconName === 'Award' && <Award className="w-5 h-5" />}
                        {ach.iconName === 'BookOpen' && <BookOpen className="w-5 h-5" />}
                        {ach.iconName === 'Footprints' && <Sparkles className="w-5 h-5" />}
                        {ach.iconName === 'Lightbulb' && <Lightbulb className="w-5 h-5" />}
                        {ach.iconName === 'Volume2' && <Volume2 className="w-5 h-5" />}
                        {ach.iconName === 'Feather' && <Feather className="w-5 h-5" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`${fontClass} text-lg font-bold ${
                            isUnlocked ? 'text-amber-200' : 'text-stone-400'
                          }`}>
                            {ach.titleUrdu}
                          </h4>
                          {isUnlocked ? (
                            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              حاصل ہوا
                            </span>
                          ) : (
                            <span className="text-[10px] text-stone-500 font-mono">
                              {ach.progress} / {ach.maxProgress}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-stone-300 font-sans mt-0.5 leading-snug">
                          {ach.descriptionUrdu}
                        </p>
                        <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                          {ach.descriptionEn}
                        </p>

                        {!isUnlocked && (
                          <div className="mt-2 h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ACTIVITY LOG & STATS */}
          {activeTab === 'activity' && (
            <div className="space-y-5">
              <div>
                <h3 className={`${fontClass} text-2xl text-amber-200 font-bold`}>
                  روزنامہ و تاریخچۂ ریاضت
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  تمام تاریخوں پر پڑھے گئے اشعار کی تفصیلی شماریات
                </p>
              </div>

              {/* Stat Boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-xl text-center">
                  <div className="text-[11px] text-stone-400">طویل ترین تسلسل</div>
                  <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
                    {progress.longestStreak} دن
                  </div>
                </div>

                <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-xl text-center">
                  <div className="text-[11px] text-stone-400">منفرد کلام پڑھے گئے</div>
                  <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
                    {progress.exploredPoemIds.length}
                  </div>
                </div>

                <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-xl text-center">
                  <div className="text-[11px] text-stone-400">شعراء کا احاطہ</div>
                  <div className="text-2xl font-bold font-mono text-sky-300 mt-1">
                    {progress.exploredPoetIds.length}
                  </div>
                </div>

                <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-xl text-center">
                  <div className="text-[11px] text-stone-400">صوتی قرأت سنی</div>
                  <div className="text-2xl font-bold font-mono text-indigo-300 mt-1">
                    {progress.recitationListenedCount}
                  </div>
                </div>
              </div>

              {/* 14-Day Visual Timeline */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5">
                <h4 className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-4">
                  گزشتہ 14 ایام کی سرگرمی (Activity Chart)
                </h4>

                <div className="flex items-end justify-between gap-1.5 h-36 pt-4 pb-2 border-b border-stone-800">
                  {historyDays.map((d) => {
                    const maxCount = Math.max(5, ...historyDays.map(h => h.count));
                    const heightPercent = Math.max(8, Math.round((d.count / maxCount) * 100));
                    return (
                      <div key={d.dateStr} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                        {/* Hover Tooltip */}
                        <div className="absolute -top-8 bg-stone-950 border border-amber-700/60 text-[10px] px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 text-amber-200">
                          {d.dateStr}: {d.count} اشعار
                        </div>

                        <div 
                          className={`w-full rounded-t transition-all ${
                            d.isToday 
                              ? 'bg-amber-400 hover:bg-amber-300' 
                              : d.count > 0 
                                ? 'bg-amber-600/70 hover:bg-amber-500' 
                                : 'bg-stone-800'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className="text-[10px] text-stone-500 mt-2 font-mono">{d.dayNum}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reset Data Option */}
              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400">پیش رفت اور شماریات دوبارہ ترتیب دیں؟</span>
                  <p className="text-[11px] text-stone-500">
                    یہ آپ کا تمام لوکل ڈیٹا اور ریکارڈ ری سیٹ کر دے گا۔
                  </p>
                </div>

                {showResetConfirm ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { resetProgress(); setShowResetConfirm(false); }}
                      className="px-3 py-1 text-xs bg-rose-700 hover:bg-rose-600 text-white rounded-lg font-medium"
                    >
                      ہاں، ری سیٹ کریں
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-3 py-1 text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg"
                    >
                      منسوخ
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-rose-400 border border-stone-800 text-xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ڈیٹا ری سیٹ</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-amber-900/40 bg-stone-950 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>لوکل اسٹوریج (localStorage) میں خودکار محفوظ</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold transition-colors ml-auto"
          >
            بند کریں (Close)
          </button>
        </div>
      </div>
    </div>
  );
};

// Compact Reading Streak & Progress Banner component for embedding on Home / Poetry pages
interface ReadingJourneyBannerProps {
  onOpenTracker: () => void;
  fontPreference?: string;
}

export const ReadingJourneyBanner: React.FC<ReadingJourneyBannerProps> = ({
  onOpenTracker,
  fontPreference = 'nastaliq'
}) => {
  const { progress, rankInfo, logVerses } = useReadingProgress();
  const fontClass = fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const todayStr = getLocalDateString();
  const isStreakActiveToday = progress.lastActiveDate === todayStr && progress.versesExploredToday > 0;
  const goalPercent = Math.min(100, Math.round((progress.versesExploredToday / progress.dailyGoal) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="bg-gradient-to-r from-[#0d0d0d] via-black to-[#060606] border border-stone-850 hover:border-amber-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl shadow-black/90 transition-all">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Left: Streak Icon & Rank Info */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div 
              onClick={onOpenTracker}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 cursor-pointer hover:scale-105 transition-transform flex-shrink-0"
              title="Click to view full Reading Journey"
            >
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse text-amber-400 fill-amber-400/20" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`${fontClass} text-xl sm:text-2xl text-amber-200 font-bold leading-tight`}>
                  {progress.streakDays} دن کا تسلسلِ مطالعہ
                </span>
                <span className="text-xs font-mono text-amber-400/80 hidden sm:inline">
                  ({progress.streakDays}-Day Streak)
                </span>
                {isStreakActiveToday && (
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    آج جاری
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-300 mt-1">
                <span className={`${fontClass} text-stone-200 font-semibold text-sm`}>
                  مرتبہ: {rankInfo.currentRank.titleUrdu}
                </span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span className="font-mono text-stone-400">
                  کل {progress.totalVersesExplored} اشعار پڑھے گئے
                </span>
              </div>
            </div>
          </div>

          {/* Right: Daily Goal Progress Bar & Action */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="w-full sm:w-48">
              <div className="flex items-center justify-between text-xs mb-1 font-mono">
                <span className="text-stone-400 text-[11px]">آج کا ہدف</span>
                <span className="text-amber-300 font-bold">
                  {progress.versesExploredToday} / {progress.dailyGoal}
                </span>
              </div>
              <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    goalPercent >= 100 ? 'bg-emerald-400' : 'bg-amber-500'
                  }`}
                  style={{ width: `${goalPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={onOpenTracker}
              className="px-3.5 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-600/40 text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>پیش رفت کا جائزہ</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
