import React, { useState, useMemo, useEffect } from 'react';
import { Poem, Poet, PoeticMoodId, MusicalRaga, PoemSentimentMood, PoemSentimentAnalysis } from '../types/poetry';
import { POETS } from '../data/poetsData';
import { POETIC_MOODS, getMoodById } from '../data/moodsData';
import { 
  MUSICAL_RAGAS, 
  getPoemRagas, 
  getPoemMoods, 
  getPoemCustomTags 
} from '../data/ragasData';
import { 
  MOOD_VISUAL_CONFIGS, 
  getPoemSentiment, 
  SENTIMENT_UPDATED_EVENT 
} from '../utils/sentimentAnalysis';
import { PoemMoodTag } from './PoemMoodTag';
import { PoemSentimentModal } from './PoemSentimentModal';
import { PoemTaggingModal } from './PoemTaggingModal';
import { 
  BookOpen, 
  User, 
  Tag, 
  Sparkles, 
  Volume2, 
  ArrowRight, 
  Heart, 
  CloudRain, 
  Compass, 
  Flame, 
  Moon, 
  Layers,
  X,
  Filter,
  Music,
  Clock,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  ListFilter,
  Brain,
  Smile,
  Sun,
  Feather,
  HeartCrack
} from 'lucide-react';
import { ambienceEngine } from '../utils/audioAmbience';

interface PoetryExplorerProps {
  poems: Poem[];
  fontPreference: string;
  onSelectPoem: (poem: Poem) => void;
  selectedThemeFilter?: string;
  onClearThemeFilter?: () => void;
  searchQuery: string;
  onOpenReflectionsWithPoem?: (poem: Poem, moodSentiment?: PoemSentimentAnalysis) => void;
}

export const PoetryExplorer: React.FC<PoetryExplorerProps> = ({
  poems,
  fontPreference,
  onSelectPoem,
  selectedThemeFilter,
  onClearThemeFilter,
  searchQuery,
  onOpenReflectionsWithPoem
}) => {
  const [selectedMood, setSelectedMood] = useState<PoeticMoodId>('all');
  const [selectedAiMood, setSelectedAiMood] = useState<PoemSentimentMood | 'all'>('all');
  const [selectedRaga, setSelectedRaga] = useState<string>('all');
  const [selectedPoetId, setSelectedPoetId] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [showRoman, setShowRoman] = useState<boolean>(true);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState<boolean>(false);
  const [taggingPoem, setTaggingPoem] = useState<Poem | null>(null);
  const [tagsVersion, setTagsVersion] = useState<number>(0);

  // AI Sentiment Modal state
  const [sentimentModalPoem, setSentimentModalPoem] = useState<Poem | null>(null);
  const [activeSentiment, setActiveSentiment] = useState<PoemSentimentAnalysis | null>(null);
  const [sentimentVersion, setSentimentVersion] = useState<number>(0);

  // Listen to external sentiment updates
  useEffect(() => {
    const handleSentimentUpdate = () => {
      setSentimentVersion(v => v + 1);
    };
    window.addEventListener(SENTIMENT_UPDATED_EVENT, handleSentimentUpdate);
    return () => window.removeEventListener(SENTIMENT_UPDATED_EVENT, handleSentimentUpdate);
  }, []);

  // Sync external theme filter if it corresponds to a known mood
  useEffect(() => {
    if (selectedThemeFilter) {
      const lower = selectedThemeFilter.toLowerCase();
      if (lower.includes('ishq') || lower.includes('muhabbat') || selectedThemeFilter.includes('عشق') || selectedThemeFilter.includes('محبت')) {
        setSelectedMood('ishq');
      } else if (lower.includes('hijr') || lower.includes('firaaq') || lower.includes('gham') || selectedThemeFilter.includes('غم') || selectedThemeFilter.includes('ہجر')) {
        setSelectedMood('gham');
      } else if (lower.includes('falsafa') || lower.includes('hayaat') || selectedThemeFilter.includes('فلسفہ')) {
        setSelectedMood('falsafa');
      } else if (lower.includes('inqilab') || lower.includes('baghaawat') || selectedThemeFilter.includes('انقلاب')) {
        setSelectedMood('inqilab');
      } else if (lower.includes('tasawwuf') || selectedThemeFilter.includes('تصوف')) {
        setSelectedMood('tasawwuf');
      } else if (lower.includes('yaas') || lower.includes('tanhaee') || selectedThemeFilter.includes('تنہائی')) {
        setSelectedMood('tanhaee');
      }
    }
  }, [selectedThemeFilter]);

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  // Calculate live poem counts per Raga (re-calculated on tagsVersion change)
  const ragaCounts = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _v = tagsVersion;
    const counts: Record<string, number> = { all: poems.length };
    MUSICAL_RAGAS.forEach(r => {
      counts[r.id] = poems.filter(p => {
        const pRagas = getPoemRagas(p);
        return pRagas.some(pr => pr.id === r.id);
      }).length;
    });
    return counts;
  }, [poems, tagsVersion]);

  // Calculate live poem counts per Mood
  const moodCounts = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _v = tagsVersion;
    const counts: Record<string, number> = { all: poems.length };
    POETIC_MOODS.forEach(mood => {
      counts[mood.id] = poems.filter(p => {
        if (mood.id === 'all') return true;
        const pMoods = getPoemMoods(p);
        return pMoods.includes(mood.id);
      }).length;
    });
    return counts;
  }, [poems, tagsVersion]);

  // Calculate live poem counts per AI Mood Indicator
  const aiMoodCounts = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _v = tagsVersion + sentimentVersion;
    const counts: Record<string, number> = { all: poems.length };
    Object.keys(MOOD_VISUAL_CONFIGS).forEach((moodKey) => {
      counts[moodKey] = poems.filter(p => {
        const sent = getPoemSentiment(p);
        return sent.primaryMood === moodKey;
      }).length;
    });
    return counts;
  }, [poems, tagsVersion, sentimentVersion]);

  // Filter poems based on AI Mood, Raga, Mood, Poet, Genre, Theme, Search query
  const filteredPoems = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _v = tagsVersion + sentimentVersion;
    return poems.filter((poem) => {
      // 0. AI Emotional Sentiment Mood filter
      if (selectedAiMood !== 'all') {
        const sent = getPoemSentiment(poem);
        if (sent.primaryMood !== selectedAiMood) {
          return false;
        }
      }

      // 1. Musical Raga filter
      if (selectedRaga !== 'all') {
        const poemRagas = getPoemRagas(poem);
        if (!poemRagas.some(r => r.id === selectedRaga)) {
          return false;
        }
      }

      // 2. Emotional Mood filter
      if (selectedMood !== 'all') {
        const poemMoods = getPoemMoods(poem);
        if (!poemMoods.includes(selectedMood)) {
          return false;
        }
      }

      // 3. Poet filter
      if (selectedPoetId !== 'all' && poem.poetId !== selectedPoetId) {
        return false;
      }

      // 4. Genre filter
      if (selectedGenre !== 'all' && poem.genre !== selectedGenre) {
        return false;
      }

      // 5. External Theme filter
      if (selectedThemeFilter && poem.theme !== selectedThemeFilter) {
        return false;
      }

      // 6. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = poem.title.toLowerCase().includes(q) || poem.titleUrdu.includes(q);
        const matchesTheme = poem.theme.toLowerCase().includes(q) || poem.themeUrdu.includes(q);
        const matchesMood = (poem.moodUrdu && poem.moodUrdu.includes(q)) || (poem.mood && poem.mood.includes(q));
        const poemRagas = getPoemRagas(poem);
        const matchesRaga = poemRagas.some(r => r.nameEnglish.toLowerCase().includes(q) || r.nameUrdu.includes(q));
        const customTags = getPoemCustomTags(poem);
        const matchesCustom = customTags.some(t => t.toLowerCase().includes(q));
        const sent = getPoemSentiment(poem);
        const matchesAiMood = sent.primaryMood.toLowerCase().includes(q) || sent.primaryMoodUrdu.includes(q);
        const matchesLines = poem.couplets.some(c => 
          c.misra1.includes(q) || c.misra2.includes(q) ||
          c.roman1.toLowerCase().includes(q) || c.roman2.toLowerCase().includes(q) ||
          c.englishTranslation.toLowerCase().includes(q)
        );
        const poetObj = POETS.find(p => p.id === poem.poetId);
        const matchesPoet = poetObj && (poetObj.nameEnglish.toLowerCase().includes(q) || poetObj.nameUrdu.includes(q));

        if (!matchesTitle && !matchesTheme && !matchesMood && !matchesRaga && !matchesCustom && !matchesAiMood && !matchesLines && !matchesPoet) {
          return false;
        }
      }

      return true;
    });
  }, [poems, selectedAiMood, selectedRaga, selectedMood, selectedPoetId, selectedGenre, selectedThemeFilter, searchQuery, tagsVersion, sentimentVersion]);

  const poetMap = useMemo(() => {
    const map = new Map<string, Poet>();
    POETS.forEach(p => map.set(p.id, p));
    return map;
  }, []);

  const genres = ['all', 'Ghazal', 'Nazm', 'Rubai'];

  const handleQuickRecite = (e: React.MouseEvent, poem: Poem) => {
    e.stopPropagation();
    if (poem.couplets.length > 0) {
      const c = poem.couplets[0];
      const text = `${c.misra1} ... ${c.misra2}`;
      ambienceEngine.reciteText(text, 'ur');
    }
  };

  const handleOpenTagging = (e: React.MouseEvent, poem: Poem) => {
    e.stopPropagation();
    setTaggingPoem(poem);
  };

  const activeFiltersCount = 
    (selectedAiMood !== 'all' ? 1 : 0) +
    (selectedRaga !== 'all' ? 1 : 0) +
    (selectedMood !== 'all' ? 1 : 0) +
    (selectedPoetId !== 'all' ? 1 : 0) +
    (selectedGenre !== 'all' ? 1 : 0) +
    (selectedThemeFilter ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedAiMood('all');
    setSelectedRaga('all');
    setSelectedMood('all');
    setSelectedPoetId('all');
    setSelectedGenre('all');
    if (onClearThemeFilter) onClearThemeFilter();
  };

  const selectedRagaConfig = MUSICAL_RAGAS.find(r => r.id === selectedRaga);
  const selectedMoodConfig = getMoodById(selectedMood);

  const renderMoodIcon = (moodId: PoeticMoodId, className: string = 'w-3.5 h-3.5') => {
    switch (moodId) {
      case 'gham': return <CloudRain className={className} />;
      case 'ishq': return <Heart className={className} />;
      case 'falsafa': return <Compass className={className} />;
      case 'inqilab': return <Flame className={className} />;
      case 'tasawwuf': return <Sparkles className={className} />;
      case 'tanhaee': return <Moon className={className} />;
      default: return <Layers className={className} />;
    }
  };

  const renderAiMoodIcon = (iconName: string, iconClass: string = 'w-3.5 h-3.5') => {
    switch (iconName) {
      case 'CloudRain': return <CloudRain className={iconClass} />;
      case 'Sun': return <Sun className={iconClass} />;
      case 'Heart': return <Heart className={iconClass} />;
      case 'Compass': return <Compass className={iconClass} />;
      case 'Flame': return <Flame className={iconClass} />;
      case 'Feather': return <Feather className={iconClass} />;
      case 'HeartCrack': return <HeartCrack className={iconClass} />;
      case 'Clock': return <Clock className={iconClass} />;
      case 'Sparkles':
      default: return <Sparkles className={iconClass} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-medium mb-1">
            <BookOpen className="w-4 h-4" />
            <span>دیوان و انتخابِ کلام • Poetry Archives</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-100 font-normal">
            گنجینۂ غزل و نظم — Explore & Tag Verses
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Browse poetry by classical musical <strong className="text-amber-300">Raga associations</strong> (راگ و سر) and <strong className="text-rose-300">emotional moods</strong> (کیفیت و جذبات), or tag any poem with your own musical and lyrical reflections.
          </p>
        </div>

        {/* View toggles & Mobile filter button */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-600/50 text-amber-200 text-xs font-medium shadow-md"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>فلٹرز و راگ (Filters)</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center justify-center font-mono">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg hover:border-amber-700/50">
            <input
              type="checkbox"
              checked={showRoman}
              onChange={(e) => setShowRoman(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            <span>Show Roman Urdu (رومن)</span>
          </label>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2-COLUMN LAYOUT: SIDEBAR (FILTERS) + MAIN POETRY ARCHIVES                 */}
      {/* ========================================================================= */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* ======================================================================= */}
        {/* SIDEBAR: MUSICAL RAGAS, EMOTIONAL MOODS, POETS, & GENRES               */}
        {/* ======================================================================= */}
        <aside 
          className={`w-full lg:w-80 flex-shrink-0 space-y-6 ${
            isSidebarOpenMobile ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0c0c0c] via-[#070707] to-[#020202] border border-stone-850 shadow-2xl space-y-6 sticky top-20">
            
            {/* Sidebar Title */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/30">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                <ListFilter className="w-4 h-4 text-amber-400" />
                <span>فہرستِ فلٹرز و نسبتیں</span>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-amber-400 hover:text-white underline font-medium flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>صاف کریں ({activeFiltersCount})</span>
                </button>
              )}
            </div>

            {/* 1. MUSICAL RAGAS (موسیقی و راگ) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" />
                  <span>موسیقی و راگ (Musical Ragas)</span>
                </label>
                <span className="text-[10px] text-stone-500 font-mono">
                  {MUSICAL_RAGAS.length} راگ
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-tight">
                Filter poetry by classical Hindustani Raga composition and melody:
              </p>

              {/* Ragas List */}
              <div className="space-y-1 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                {/* All Ragas option */}
                <button
                  onClick={() => setSelectedRaga('all')}
                  className={`w-full p-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                    selectedRaga === 'all'
                      ? 'bg-amber-600/90 text-stone-950 font-bold shadow-md'
                      : 'text-stone-300 hover:bg-stone-900/80 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>تمام راگ (All Ragas)</span>
                  </span>
                  <span className="text-[10px] opacity-80 font-mono">
                    {ragaCounts.all || poems.length}
                  </span>
                </button>

                {/* Individual Ragas */}
                {MUSICAL_RAGAS.map((raga) => {
                  const isSelected = selectedRaga === raga.id;
                  const count = ragaCounts[raga.id] || 0;

                  return (
                    <button
                      key={raga.id}
                      onClick={() => setSelectedRaga(raga.id)}
                      className={`w-full p-2 rounded-xl text-xs transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'bg-amber-950/90 border border-amber-500 text-amber-100 font-bold shadow-sm'
                          : 'text-stone-300 hover:bg-stone-900/60 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: raga.colorHex }}
                        />
                        <div className="text-left min-w-0">
                          <span className="font-nastaliq text-sm block leading-tight text-amber-200">
                            {raga.nameUrdu}
                          </span>
                          <span className="text-[10px] text-stone-400 font-serif block truncate">
                            {raga.nameEnglish}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isSelected ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400'
                        }`}>
                          {count}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. EMOTIONAL MOODS (کیفیات و جذبات) */}
            <div className="pt-4 border-t border-stone-800/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  <span>کیفیت و جذبات (Emotional Moods)</span>
                </label>
                <span className="text-[10px] text-stone-500 font-mono">
                  {POETIC_MOODS.length - 1} کیفیات
                </span>
              </div>

              <div className="space-y-1">
                {POETIC_MOODS.map((mood) => {
                  const isSelected = selectedMood === mood.id;
                  const count = moodCounts[mood.id] || 0;

                  return (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`w-full p-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? `${mood.activeBg} ${mood.activeBorder} text-white font-bold border shadow-sm`
                          : 'text-stone-300 hover:bg-stone-900/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-stone-950/60 text-stone-400">
                          {renderMoodIcon(mood.id)}
                        </span>
                        <div className="text-left">
                          <span className="font-nastaliq text-sm block leading-tight">
                            {mood.labelUrdu}
                          </span>
                          <span className="text-[10px] opacity-80 block font-sans">
                            {mood.labelEnglish}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-white text-stone-950 font-bold' : 'bg-stone-900 text-stone-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. AI EMOTIONAL SENTIMENT MOODS (جذباتی کیفیات - AI) */}
            <div className="pt-4 border-t border-stone-800/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI جذباتی کیفیات (AI Moods)</span>
                </label>
                {selectedAiMood !== 'all' && (
                  <button
                    onClick={() => setSelectedAiMood('all')}
                    className="text-[10px] text-amber-400 hover:text-amber-200"
                  >
                    صاف کریں (Clear)
                  </button>
                )}
              </div>

              <div className="space-y-1">
                {/* All AI Moods Button */}
                <button
                  onClick={() => setSelectedAiMood('all')}
                  className={`w-full p-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                    selectedAiMood === 'all'
                      ? 'bg-amber-600 text-stone-950 font-bold border border-amber-400 shadow-sm'
                      : 'text-stone-300 hover:bg-stone-900/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-stone-950/60 text-amber-400">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-nastaliq text-sm">تمام کیفیات (All AI Moods)</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-stone-900 text-stone-400">
                    {poems.length}
                  </span>
                </button>

                {/* Individual AI Moods */}
                {Object.entries(MOOD_VISUAL_CONFIGS).map(([moodKey, config]) => {
                  const isSelected = selectedAiMood === moodKey;
                  const count = aiMoodCounts[moodKey] || 0;

                  return (
                    <button
                      key={moodKey}
                      onClick={() => setSelectedAiMood(isSelected ? 'all' : (moodKey as PoemSentimentMood))}
                      className={`w-full p-2 rounded-xl text-xs transition-all flex items-center justify-between group ${
                        isSelected
                          ? `${config.bgClass} ${config.borderClass} ${config.textClass} font-bold border shadow-sm`
                          : 'text-stone-300 hover:bg-stone-900/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="p-1 rounded-md bg-black/60 flex-shrink-0">
                          {renderAiMoodIcon(config.iconName, `w-3.5 h-3.5 ${config.textClass}`)}
                        </span>
                        <div className="text-left min-w-0">
                          <span className="font-nastaliq text-sm block leading-tight">
                            {config.labelUrdu}
                          </span>
                          <span className="text-[10px] opacity-80 block font-sans truncate">
                            {config.labelEnglish}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-white text-stone-950 font-bold' : 'bg-stone-900 text-stone-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. POETS (شعراء) */}
            <div className="pt-4 border-t border-stone-800/80 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>شاعر کا انتخاب (Poet)</span>
              </label>
              <select
                value={selectedPoetId}
                onChange={(e) => setSelectedPoetId(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-600"
              >
                <option value="all">تمام شعراء (All Poets)</option>
                {POETS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nameUrdu} ({p.nameEnglish})
                  </option>
                ))}
              </select>
            </div>

            {/* 4. GENRE (صنفِ شاعری) */}
            <div className="pt-4 border-t border-stone-800/80 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>صنفِ کلام (Genre)</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {genres.map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedGenre === g
                        ? 'bg-amber-700 text-amber-100 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {g === 'all' ? 'تمام اصناف' : g}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* ======================================================================= */}
        {/* MAIN COLUMN: ACTIVE FILTERS BANNER + POEMS GRID                         */}
        {/* ======================================================================= */}
        <main className="flex-1 min-w-0 space-y-6 w-full">
          
          {/* Active Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-stone-900/60 border border-stone-800/80 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-stone-500 font-sans">فعال فلٹرز:</span>

              {selectedAiMood !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-amber-600/60 text-amber-300 flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="font-nastaliq">{MOOD_VISUAL_CONFIGS[selectedAiMood]?.labelUrdu}</span>
                  <span className="text-[10px] text-stone-300 font-sans">({selectedAiMood})</span>
                  <button onClick={() => setSelectedAiMood('all')} className="hover:text-white ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedRaga !== 'all' && selectedRagaConfig && (
                <span className="px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-600/60 text-amber-300 flex items-center gap-1.5 shadow-sm">
                  <Music className="w-3 h-3 text-amber-400" />
                  <span className="font-nastaliq">{selectedRagaConfig.nameUrdu}</span>
                  <span className="text-[10px] text-stone-400 font-serif">({selectedRagaConfig.nameEnglish})</span>
                  <button onClick={() => setSelectedRaga('all')} className="hover:text-white ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedMood !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-600/60 text-rose-300 flex items-center gap-1.5 shadow-sm">
                  {renderMoodIcon(selectedMood, 'w-3 h-3')}
                  <span className="font-nastaliq">{selectedMoodConfig.labelUrdu}</span>
                  <span className="text-[10px] text-stone-400 font-sans">({selectedMoodConfig.labelEnglish})</span>
                  <button onClick={() => setSelectedMood('all')} className="hover:text-white ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedPoetId !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-stone-800 border border-stone-700 text-stone-200 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-amber-400" />
                  <span>{poetMap.get(selectedPoetId)?.nameUrdu || selectedPoetId}</span>
                  <button onClick={() => setSelectedPoetId('all')} className="hover:text-white ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedGenre !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-stone-800 border border-stone-700 text-stone-200 flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-amber-400" />
                  <span>{selectedGenre}</span>
                  <button onClick={() => setSelectedGenre('all')} className="hover:text-white ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedThemeFilter && (
                <span className="px-2.5 py-1 rounded-full bg-amber-900/60 border border-amber-600 text-amber-200 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{selectedThemeFilter}</span>
                  {onClearThemeFilter && (
                    <button onClick={onClearThemeFilter} className="hover:text-white ml-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              )}

              {activeFiltersCount === 0 && (
                <span className="text-stone-400 italic">تمام کلام بغیر کسی پابندی کے ظاہر ہے</span>
              )}
            </div>

            <div className="text-xs text-stone-400 font-mono ml-auto">
              <strong className="text-amber-400">{filteredPoems.length}</strong> {filteredPoems.length === 1 ? 'کلام دستیاب' : 'اشعار و کلام'}
            </div>
          </div>

          {/* Active Raga Ethos Card Banner (if a specific raga is filtered) */}
          {selectedRaga !== 'all' && selectedRagaConfig && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d0d0d] via-[#070707] to-[#020202] border border-stone-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fadeIn">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{ backgroundColor: `${selectedRagaConfig.colorHex}25`, color: selectedRagaConfig.colorHex }}
                >
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-nastaliq text-lg text-amber-200 font-bold">
                      {selectedRagaConfig.nameUrdu}
                    </span>
                    <span className="text-stone-400 font-serif">
                      ({selectedRagaConfig.nameEnglish})
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-[10px] text-amber-400">
                      {selectedRagaConfig.praharUrdu}
                    </span>
                  </div>
                  <p className="text-stone-300 text-[11px] mt-0.5">
                    {selectedRagaConfig.moodEthosUrdu} — <span className="text-stone-400 italic">{selectedRagaConfig.moodEthosEnglish}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredPoems.length === 0 ? (
            <div className="text-center py-16 bg-stone-900/40 rounded-2xl border border-dashed border-stone-800">
              <Music className="w-10 h-10 text-amber-500/40 mx-auto mb-3" />
              <p className="font-nastaliq text-2xl text-amber-300/70 mb-2">کوئی کلام نہیں ملا</p>
              <p className="text-stone-400 text-sm max-w-md mx-auto">
                No poetry matches your selected Raga association or emotional mood combination. Try selecting another category or tag poems yourself!
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-2 rounded-xl bg-amber-900/40 hover:bg-amber-900/70 border border-amber-700/50 text-amber-200 text-xs transition-colors"
                >
                  تمام فلٹرز ختم کریں (Reset Filters)
                </button>
              </div>
            </div>
          ) : (
            /* Poems Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredPoems.map((poem) => {
                const poet = poetMap.get(poem.poetId);
                const firstCouplet = poem.couplets[0];
                const poemRagas = getPoemRagas(poem);
                const poemMoods = getPoemMoods(poem);
                const customTags = getPoemCustomTags(poem);

                return (
                  <div
                    key={poem.id}
                    onClick={() => onSelectPoem(poem)}
                    className="group bg-gradient-to-br from-[#0c0c0c] via-[#060606] to-[#000000] hover:to-[#0f0b06] border border-stone-850 hover:border-amber-600/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-black/90 cursor-pointer flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Corner accent glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

                    <div>
                      {/* Card Header: Poet + Tag Button */}
                      <div className="flex items-center justify-between pb-3 border-b border-stone-800/80 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-stone-800 border border-amber-600/30 flex items-center justify-center text-amber-300 font-serif text-xs font-bold flex-shrink-0">
                            {poet ? poet.takhallus.slice(0, 2) : 'ش'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-nastaliq text-base text-amber-300 group-hover:text-amber-200 transition-colors leading-none truncate">
                              {poet?.nameUrdu}
                            </p>
                            <p className="text-[11px] text-stone-400 font-sans truncate">
                              {poet?.nameEnglish}
                            </p>
                          </div>
                        </div>

                        {/* Direct Tagging Button */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handleOpenTagging(e, poem)}
                            className="px-2.5 py-1 rounded-lg bg-stone-950/80 hover:bg-amber-950/80 border border-stone-800 hover:border-amber-600/60 text-[11px] text-stone-300 hover:text-amber-200 flex items-center gap-1 transition-all"
                            title="Tag this poem with Ragas & Moods (راگ یا کیفیت کا ٹیگ لگائیں)"
                          >
                            <Tag className="w-3 h-3 text-amber-400" />
                            <span className="hidden sm:inline font-sans">ٹیگ کریں</span>
                            <span className="sm:hidden font-sans">+</span>
                          </button>

                          {/* Genre Pill */}
                          <span className="px-2 py-0.5 rounded-full bg-stone-800/80 border border-stone-700/50 text-[10px] text-stone-300 font-medium">
                            {poem.genre}
                          </span>
                        </div>
                      </div>

                      {/* Poem Title in Nastaliq and English with visual AI Mood Indicator tag */}
                      <div className="mt-4">
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-end gap-2 flex-wrap">
                              <h3 className="font-nastaliq text-xl text-stone-100 group-hover:text-amber-100 leading-relaxed text-right" dir="rtl">
                                {poem.titleUrdu}
                              </h3>
                              {/* Visual Mood Indicator tag next to Urdu Title */}
                              <PoemMoodTag
                                poem={poem}
                                size="sm"
                                onClick={(e, sent) => {
                                  e.stopPropagation();
                                  setSentimentModalPoem(poem);
                                  setActiveSentiment(sent);
                                }}
                              />
                            </div>
                            <p className="text-xs text-stone-400 font-serif italic mt-0.5">
                              {poem.title}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Ragas & Moods Badges */}
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        {/* Musical Ragas */}
                        {poemRagas.map((raga) => (
                          <button
                            key={raga.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRaga(raga.id);
                            }}
                            className={`px-2 py-0.5 rounded-full border text-[10px] font-medium transition-all flex items-center gap-1 ${
                              selectedRaga === raga.id
                                ? 'bg-amber-600 text-stone-950 border-amber-400 font-bold'
                                : 'bg-amber-950/50 border-amber-800/50 text-amber-300 hover:border-amber-500'
                            }`}
                            title={`راگ: ${raga.nameUrdu} (${raga.nameEnglish}) - Filter by this Raga`}
                          >
                            <Music className="w-3 h-3 text-amber-400" />
                            <span className="font-nastaliq">{raga.nameUrdu}</span>
                          </button>
                        ))}

                        {/* Emotional Moods */}
                        {poemMoods.map((mId) => {
                          const mConfig = getMoodById(mId);
                          return (
                            <button
                              key={mId}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMood(mId);
                              }}
                              className={`px-2 py-0.5 rounded-full border text-[10px] font-medium transition-all flex items-center gap-1 ${
                                selectedMood === mId
                                  ? `${mConfig.activeBg} ${mConfig.activeBorder} text-white font-bold`
                                  : `${mConfig.badgeBg} ${mConfig.badgeBorder} ${mConfig.badgeText} hover:scale-105`
                              }`}
                              title={`کیفیت: ${mConfig.labelUrdu} (${mConfig.labelEnglish}) - Filter by this mood`}
                            >
                              {renderMoodIcon(mId, 'w-2.5 h-2.5')}
                              <span className="font-nastaliq">{mConfig.labelUrdu}</span>
                            </button>
                          );
                        })}

                        {/* Custom Tags */}
                        {customTags.map((cTag, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-[10px] text-stone-300 font-nastaliq"
                          >
                            #{cTag}
                          </span>
                        ))}
                      </div>

                      {/* First Couplet Preview */}
                      {firstCouplet && (
                        <div className="mt-4 p-4 rounded-xl bg-stone-950/60 border border-stone-800/60 group-hover:border-amber-900/40 transition-colors">
                          <p 
                            dir="rtl" 
                            className={`${fontClass} text-lg text-amber-200/90 text-center leading-loose`}
                          >
                            {firstCouplet.misra1}
                          </p>
                          <p 
                            dir="rtl" 
                            className={`${fontClass} text-lg text-amber-300 text-center leading-loose`}
                          >
                            {firstCouplet.misra2}
                          </p>

                          {showRoman && (
                            <div className="mt-2 pt-2 border-t border-stone-800/60 text-center">
                              <p className="text-[11px] text-stone-400 font-serif italic">
                                {firstCouplet.roman1}
                              </p>
                              <p className="text-[11px] text-stone-400 font-serif italic">
                                {firstCouplet.roman2}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Meter / Radif metadata */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-stone-400">
                        {poem.radif && (
                          <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                            ردیف: <span className="text-amber-300 font-nastaliq">{poem.radif}</span>
                          </span>
                        )}
                        {poem.couplets.length > 0 && (
                          <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                            {poem.couplets.length} اشعار
                          </span>
                        )}
                        <span className="text-stone-500 truncate max-w-[150px]">
                          {poem.themeUrdu}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer: Action button & Quick recite */}
                    <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                      <button
                        onClick={(e) => handleQuickRecite(e, poem)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition-colors"
                        title="Quick Recitation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <span className="text-xs text-amber-400 group-hover:text-amber-300 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>مطالعہ و بصیرتِ استعارہ</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>

      {/* Interactive Tagging Modal */}
      <PoemTaggingModal
        isOpen={Boolean(taggingPoem)}
        onClose={() => setTaggingPoem(null)}
        poem={taggingPoem}
        onTagsUpdated={() => setTagsVersion(v => v + 1)}
      />

    </div>
  );
};
