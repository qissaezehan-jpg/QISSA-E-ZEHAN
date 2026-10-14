import React, { useState } from 'react';
import { 
  Feather, 
  Plus, 
  Search, 
  Filter, 
  Heart, 
  Trash2, 
  Edit3, 
  Copy, 
  Check, 
  Lock, 
  Calendar, 
  Clock, 
  Share2, 
  Quote, 
  Star, 
  BookOpen, 
  Sparkles, 
  Download, 
  X,
  Sun,
  CloudRain,
  Compass,
  Moon,
  Flame,
  ArrowRight
} from 'lucide-react';
import { DailyReflection, ReflectionMood } from '../types/poetry';
import { useDailyReflections } from '../hooks/useDailyReflections';
import { 
  REFLECTION_MOODS, 
  getMoodConfig 
} from '../utils/reflectionsStorage';
import { DailyReflectionsComposer } from './DailyReflectionsComposer';
import { ambienceEngine } from '../utils/audioAmbience';
import { QissaZehanLogo } from './QissaZehanLogo';

interface DailyReflectionsHubProps {
  fontPreference: string;
  onOpenCardStudioWithCouplet?: (misra1: string, misra2: string, poet: string) => void;
  composerPrefill?: {
    misra1: string;
    misra2: string;
    poet: string;
    poemTitle?: string;
    poemId?: string;
  } | null;
  isComposerOpenExternal?: boolean;
  onCloseExternalComposer?: () => void;
}

export const DailyReflectionsHub: React.FC<DailyReflectionsHubProps> = ({
  fontPreference,
  onOpenCardStudioWithCouplet,
  composerPrefill,
  isComposerOpenExternal = false,
  onCloseExternalComposer
}) => {
  const {
    reflections,
    filteredReflections,
    filterMood,
    setFilterMood,
    searchQuery,
    setSearchQuery,
    filterBookmarkedOnly,
    setFilterBookmarkedOnly,
    stats,
    addReflection,
    updateReflection,
    deleteReflection,
    toggleBookmark
  } = useDailyReflections();

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingReflection, setEditingReflection] = useState<DailyReflection | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedKeepsakeReflection, setSelectedKeepsakeReflection] = useState<DailyReflection | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fontClass = fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const isModalActive = isComposerOpen || isComposerOpenExternal;

  const handleOpenNewComposer = () => {
    setEditingReflection(null);
    setIsComposerOpen(true);
    ambienceEngine.playDaadChime();
  };

  const handleCloseComposer = () => {
    setIsComposerOpen(false);
    setEditingReflection(null);
    if (onCloseExternalComposer) {
      onCloseExternalComposer();
    }
  };

  const handleEdit = (refl: DailyReflection) => {
    setEditingReflection(refl);
    setIsComposerOpen(true);
  };

  const handleCopyReflection = (refl: DailyReflection) => {
    const text = `📖 روزنامچۂ دل — قصۂ ذہن\n\n« ${refl.misra1} »\n« ${refl.misra2} »\n— کلام: ${refl.poetName}\n\nکیفیت: ${refl.moodLabelUrdu} (${refl.moodLabelEnglish})\nعنوان: ${refl.title}\n\n"${refl.content}"\n\n#شاعری #روزنامچہ #قصۂ_ذہن\nتاریخ: ${refl.dateDisplay}`;
    
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(refl.id);
    ambienceEngine.playDaadChime();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderMoodIcon = (moodId: ReflectionMood, className = 'w-3.5 h-3.5') => {
    switch (moodId) {
      case 'musarrat': return <Sun className={className} />;
      case 'gham': return <CloudRain className={className} />;
      case 'sukoon': return <Feather className={className} />;
      case 'falsafa': return <Compass className={className} />;
      case 'tanhaee': return <Moon className={className} />;
      case 'josh': return <Flame className={className} />;
      case 'shukr': return <Heart className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-stone-100 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Container Max Width */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* HERO HEADER: ROZNAMCHA-E-DIL (DAILY REFLECTIONS)                          */}
        {/* ========================================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d0d0d] via-[#060606] to-[#000000] border-2 border-amber-600/40 p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,1)] gold-glow-lg">
          
          {/* Subtle background damask glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 text-xs text-amber-300 font-mono flex items-center gap-1.5 shadow-sm">
                  <Feather className="w-3.5 h-3.5 text-amber-400" />
                  <span>روزنامچۂ دل • Daily Poetic Journal</span>
                </span>
                
                <span className="px-3 py-1 rounded-full bg-stone-900 border border-emerald-600/50 text-[11px] text-emerald-300 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>100% نجی و محفوظ (Private localStorage)</span>
                </span>
              </div>

              <h1 className="font-nastaliq text-3xl sm:text-5xl text-amber-100 font-bold leading-relaxed drop-shadow-sm">
                روزنامچۂ دل — شاعری، احساسات اور تاثرات
              </h1>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Every verse touches the heart differently. Record your personal reflections on how classical poetry shifts your mood, unburdens your thoughts, or gives voice to silent longings. Kept entirely private within your device's browser storage.
              </p>
            </div>

            {/* Right: New Reflection CTA Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleOpenNewComposer}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-bold text-sm shadow-xl shadow-black/80 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5 text-stone-950 stroke-[3]" />
                <span className="font-nastaliq text-lg leading-none pt-0.5">نیا تاثر لکھیں (Write Reflection)</span>
              </button>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* STATS TILES STRIP                                                       */}
          {/* ======================================================================= */}
          <div className="mt-8 pt-6 border-t border-stone-850 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Tile 1: Total Reflections */}
            <div className="p-3.5 rounded-2xl bg-black/80 border border-stone-850">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block">
                کل تاثرات (Total Entries)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono">
                  {stats.total}
                </span>
                <span className="text-xs text-stone-400 font-nastaliq">تحاریر</span>
              </div>
            </div>

            {/* Tile 2: Dominant Mood */}
            <div className="p-3.5 rounded-2xl bg-black/80 border border-stone-850">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block">
                غالب کیفیت (Dominant Mood)
              </span>
              <div className="flex items-center gap-2 mt-1">
                {stats.topMood ? (
                  <>
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: getMoodConfig(stats.topMood.mood as ReflectionMood).colorHex }}
                    />
                    <span className="font-nastaliq text-base sm:text-lg text-amber-200 font-bold">
                      {getMoodConfig(stats.topMood.mood as ReflectionMood).labelUrdu}
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-stone-500 font-sans">کوئی نہیں</span>
                )}
              </div>
            </div>

            {/* Tile 3: Top Poet Reflected */}
            <div className="p-3.5 rounded-2xl bg-black/80 border border-stone-850">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block">
                پسندیدہ شاعر (Frequent Poet)
              </span>
              <div className="mt-1">
                <span className="font-nastaliq text-base sm:text-lg text-amber-300 font-bold truncate block">
                  {stats.topPoet ? stats.topPoet.poet : 'کلامِ خاص'}
                </span>
              </div>
            </div>

            {/* Tile 4: Bookmarked Entries */}
            <div className="p-3.5 rounded-2xl bg-black/80 border border-stone-850">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block">
                محفوظ شدہ (Favorited)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-bold text-rose-400 font-mono">
                  {stats.bookmarksCount}
                </span>
                <span className="text-xs text-stone-400 font-nastaliq">خاص اوراق</span>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* SEARCH & MOOD FILTERS BAR                                                 */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a0a0a] border border-stone-850">
          
          {/* Mood Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setFilterMood('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                filterMood === 'all'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              تمام کیفیات ({reflections.length})
            </button>

            {REFLECTION_MOODS.map((m) => {
              const isSelected = filterMood === m.id;
              const count = stats.moodCounts[m.id] || 0;
              return (
                <button
                  key={m.id}
                  onClick={() => setFilterMood(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? `${m.bgClass} ${m.borderClass} ${m.textClass} font-bold border shadow-sm`
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent'
                  }`}
                >
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: m.colorHex }}
                  />
                  <span className="font-nastaliq text-sm leading-none">{m.labelUrdu}</span>
                  {count > 0 && (
                    <span className="text-[10px] font-mono opacity-80">({count})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search & Favorites Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="تلاش / Search reflections..."
                className="w-full bg-[#050505] border border-stone-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Bookmarks Filter Button */}
            <button
              onClick={() => setFilterBookmarkedOnly(!filterBookmarkedOnly)}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
                filterBookmarkedOnly
                  ? 'bg-rose-950/80 border-rose-600 text-rose-300'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
              title="Show only bookmarked reflections"
            >
              <Heart className={`w-3.5 h-3.5 ${filterBookmarkedOnly ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden sm:inline font-sans">محفوظ</span>
            </button>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* REFLECTIONS GRID / TIMELINE CARDS                                         */}
        {/* ========================================================================= */}
        {filteredReflections.length === 0 ? (
          /* Empty State */
          <div className="p-12 sm:p-16 text-center rounded-3xl bg-[#080808] border border-stone-850 shadow-inner">
            <div className="w-16 h-16 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-amber-400 mb-4 shadow-md">
              <Feather className="w-8 h-8" />
            </div>
            
            <h3 className="font-nastaliq text-2xl sm:text-3xl text-amber-200">
              کوئی تاثر درج نہیں ہوا
            </h3>
            
            <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
              {searchQuery || filterMood !== 'all' || filterBookmarkedOnly
                ? 'موجودہ فلٹرز پر کوئی تاثر نہیں ملا۔ فلٹرز صاف کر کے دیکھیں۔'
                : 'کسی بھی شعر کو پڑھنے کے بعد اپنے قلبی تاثرات کو یہاں قلمبند کریں اور اپنی نجی ادبی بیاض تشکیل دیں۔'}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {(searchQuery || filterMood !== 'all' || filterBookmarkedOnly) && (
                <button
                  onClick={() => {
                    setFilterMood('all');
                    setSearchQuery('');
                    setFilterBookmarkedOnly(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 text-xs transition-colors"
                >
                  فلٹرز ختم کریں (Reset Filters)
                </button>
              )}

              <button
                onClick={handleOpenNewComposer}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-black/80"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>پہلا تاثر تحریر کریں</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReflections.map((refl) => {
              const moodConfig = getMoodConfig(refl.mood);
              const isDeletingThis = deleteConfirmId === refl.id;

              return (
                <div
                  key={refl.id}
                  className="group bg-gradient-to-br from-[#0c0c0c] via-[#060606] to-[#000000] border border-stone-850 hover:border-amber-600/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-black/90 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Subtle top ambient glow */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ backgroundColor: moodConfig.colorHex }}
                  />

                  <div>
                    {/* Card Header: Mood Badge, Date, and Bookmark */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-stone-850 gap-2">
                      <div className="flex items-center gap-2">
                        <span 
                          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${moodConfig.bgClass} ${moodConfig.borderClass} ${moodConfig.textClass} border`}
                        >
                          {renderMoodIcon(refl.mood)}
                          <span className="font-nastaliq">{refl.moodLabelUrdu}</span>
                          <span className="text-[10px] opacity-75 font-serif hidden sm:inline">({refl.moodLabelEnglish})</span>
                        </span>

                        {refl.intensity && (
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {Array.from({ length: refl.intensity }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-stone-400 text-xs">
                        <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400">
                          <Calendar className="w-3 h-3 text-stone-500" />
                          <span>{refl.dateDisplay}</span>
                        </div>

                        <button
                          onClick={() => toggleBookmark(refl.id)}
                          className={`p-1.5 rounded-lg border border-stone-800 transition-colors ${
                            refl.isBookmarked
                              ? 'text-rose-500 border-rose-800/80 bg-rose-950/40'
                              : 'text-stone-500 hover:text-rose-400 hover:border-stone-700'
                          }`}
                          title="Bookmark this reflection"
                        >
                          <Heart className={`w-3.5 h-3.5 ${refl.isBookmarked ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Associated Verse Quotation Box */}
                    <div className="my-4 p-4 rounded-2xl bg-[#030303] border border-amber-900/30 shadow-inner text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-amber-500/80 font-mono">
                          مصرعِ الہام • کلام: {refl.poetName}
                        </span>
                      </div>
                      <p dir="rtl" className={`${fontClass} text-lg sm:text-xl text-amber-100 leading-relaxed drop-shadow-sm`}>
                        {refl.misra1}
                      </p>
                      <p dir="rtl" className={`${fontClass} text-lg sm:text-xl text-amber-300 leading-relaxed drop-shadow-sm mt-0.5`}>
                        {refl.misra2}
                      </p>
                    </div>

                    {/* Reflection Title */}
                    {refl.title && (
                      <h4 className="text-base sm:text-lg font-semibold text-stone-100 font-sans mt-3 group-hover:text-amber-200 transition-colors">
                        {refl.title}
                      </h4>
                    )}

                    {/* Reflection Body Prose */}
                    <p className={`text-sm sm:text-base text-stone-300/95 leading-loose mt-2.5 whitespace-pre-line ${fontClass}`} dir="auto">
                      {refl.content}
                    </p>

                    {/* Tags */}
                    {refl.tags && refl.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-4">
                        {refl.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-[11px] text-stone-400"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-6 pt-4 border-t border-stone-850 flex items-center justify-between text-xs">
                    
                    <div className="flex items-center gap-1.5">
                      {/* Copy Action */}
                      <button
                        onClick={() => handleCopyReflection(refl)}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 hover:text-amber-300 text-xs flex items-center gap-1 transition-colors"
                        title="Copy reflection to clipboard"
                      >
                        {copiedId === refl.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-mono text-[11px]">کاپی ہو گیا</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-stone-400" />
                            <span>کاپی کریں</span>
                          </>
                        )}
                      </button>

                      {/* View Keepsake Card */}
                      <button
                        onClick={() => setSelectedKeepsakeReflection(refl)}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 hover:text-amber-300 text-xs flex items-center gap-1 transition-colors"
                        title="View & Export Keepsake Card"
                      >
                        <Share2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>یادگار کارڈ</span>
                      </button>
                    </div>

                    {/* Right: Edit & Delete */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleEdit(refl)}
                        className="p-1.5 rounded-lg border border-stone-800 text-stone-400 hover:text-amber-300 hover:bg-stone-900 transition-colors"
                        title="Edit reflection"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {isDeletingThis ? (
                        <div className="flex items-center gap-1 animate-fadeIn">
                          <button
                            onClick={() => {
                              deleteReflection(refl.id);
                              setDeleteConfirmId(null);
                            }}
                            className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold"
                          >
                            حذف کریں
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-1.5 py-1 rounded bg-stone-800 text-stone-400 text-[10px]"
                          >
                            منسوخ
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(refl.id)}
                          className="p-1.5 rounded-lg border border-stone-800 text-stone-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                          title="Delete reflection"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* COMPOSER MODAL                                                            */}
      {/* ========================================================================= */}
      <DailyReflectionsComposer
        isOpen={isModalActive}
        onClose={handleCloseComposer}
        onSave={(entry) => {
          addReflection(entry);
          handleCloseComposer();
        }}
        initialVerse={composerPrefill || undefined}
        fontPreference={fontPreference}
        editReflection={editingReflection}
        onUpdate={(id, updates) => {
          updateReflection(id, updates);
          handleCloseComposer();
        }}
      />

      {/* ========================================================================= */}
      {/* KEEPSAKE PARCHMENT PREVIEW MODAL                                          */}
      {/* ========================================================================= */}
      {selectedKeepsakeReflection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-xl bg-[#090909] border-2 border-amber-600/60 rounded-3xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,1)] text-stone-100 gold-glow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-850 mb-6">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5" />
                <span>یادگارِ ادب • Poetic Keepsake Memo</span>
              </span>
              <button
                onClick={() => setSelectedKeepsakeReflection(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Keepsake Visual Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#111111] via-[#080808] to-[#020202] border border-amber-500/40 shadow-2xl text-center space-y-4">
              <div className="w-10 h-10 rounded-full mx-auto mb-2">
                <img src="/logo.svg" alt="قصۂ ذہن" className="w-full h-full object-contain drop-shadow" />
              </div>

              <div className="py-2 border-y border-amber-900/40 space-y-1">
                <p dir="rtl" className={`${fontClass} text-xl sm:text-2xl text-amber-200 leading-loose`}>
                  {selectedKeepsakeReflection.misra1}
                </p>
                <p dir="rtl" className={`${fontClass} text-xl sm:text-2xl text-amber-300 leading-loose`}>
                  {selectedKeepsakeReflection.misra2}
                </p>
                <p className="text-xs text-amber-400/80 font-nastaliq pt-1">
                  کلام: {selectedKeepsakeReflection.poetName}
                </p>
              </div>

              {selectedKeepsakeReflection.title && (
                <h5 className="font-semibold text-amber-100 text-sm">
                  {selectedKeepsakeReflection.title}
                </h5>
              )}

              <p className={`text-stone-300 text-sm leading-relaxed max-w-md mx-auto ${fontClass}`} dir="auto">
                "{selectedKeepsakeReflection.content}"
              </p>

              <div className="pt-3 border-t border-stone-850 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>کیفیت: {selectedKeepsakeReflection.moodLabelUrdu}</span>
                <span>{selectedKeepsakeReflection.dateDisplay}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                <span>محفوظ نجی یادداشت</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyReflection(selectedKeepsakeReflection)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>متن کاپی کریں</span>
                </button>
                <button
                  onClick={() => setSelectedKeepsakeReflection(null)}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-300 text-xs"
                >
                  بند کریں
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
