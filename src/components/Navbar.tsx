import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  Feather, 
  PenTool, 
  Swords, 
  Info, 
  Search, 
  Heart, 
  Globe, 
  Mic, 
  Flame, 
  Menu, 
  X, 
  Shuffle, 
  ChevronDown, 
  Compass, 
  ChevronRight,
  Bookmark,
  Layers,
  Sparkle
} from 'lucide-react';
import { ambienceEngine } from '../utils/audioAmbience';
import { POETS } from '../data/poetsData';
import { POETIC_MOODS } from '../data/moodsData';
import { POEMS } from '../data/poetryDatabase';
import { Poem } from '../types/poetry';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fontPreference: 'nastaliq' | 'gulzar' | 'amiri';
  setFontPreference: (font: 'nastaliq' | 'gulzar' | 'amiri') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenStreakTracker: () => void;
  streakDays: number;
  totalVerses: number;
  reflectionsCount?: number;
  onOpenReflections?: () => void;
  onSelectPoem?: (poem: Poem) => void;
  onSelectMood?: (moodId: string) => void;
  onSelectPoet?: (poetId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  fontPreference,
  setFontPreference,
  searchQuery,
  setSearchQuery,
  favoritesCount,
  onOpenFavorites,
  onOpenStreakTracker,
  streakDays,
  totalVerses,
  reflectionsCount = 0,
  onOpenReflections,
  onSelectPoem,
  onSelectMood,
  onSelectPoet
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Quick Explorer Dropdowns
  const [openDropdown, setOpenDropdown] = useState<'moods' | 'poets' | 'more' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleAmbience = () => {
    const playing = ambienceEngine.toggle();
    setIsAudioPlaying(playing);
  };

  // Pick a random poem and trigger reader modal
  const handleRandomPoem = () => {
    if (POEMS.length === 0) return;
    const randomIndex = Math.floor(Math.random() * POEMS.length);
    const random = POEMS[randomIndex];
    if (onSelectPoem) {
      onSelectPoem(random);
    } else {
      setActiveTab('poetry');
    }
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'daily-sher', labelUrdu: 'شعرِ روزانہ', labelEn: 'Daily Sher', icon: Sparkles, badge: 'تازہ' },
    { id: 'reflections', labelUrdu: 'روزنامچۂ دل', labelEn: 'Reflections', icon: Feather, badge: 'ڈائری' },
    { id: 'poetry', labelUrdu: 'دیوان و کلام', labelEn: 'Poetry Archive', icon: BookOpen },
    { id: 'search-grounding', labelUrdu: 'تحقیقِ کلام', labelEn: 'Search Grounding', icon: Globe, aiBadge: 'AI 3.5' },
    { id: 'live-voice', labelUrdu: 'بزمِ آواز', labelEn: 'Live Voice', icon: Mic, aiBadge: 'Live' },
    { id: 'poets', labelUrdu: 'شعرائے کرام', labelEn: 'Poets Gallery', icon: Feather },
    { id: 'card-maker', labelUrdu: 'کارڈ ساز', labelEn: 'Card Studio', icon: PenTool },
    { id: 'bait-bazi', labelUrdu: 'بیت بازی', labelEn: 'Bait Bazi', icon: Swords },
    { id: 'arts', labelUrdu: 'اصناف و بلاغت', labelEn: 'Literary Arts', icon: Layers },
    { id: 'urooz', labelUrdu: 'عروض و تشریح', labelEn: 'Prosody AI', icon: Info },
  ];

  return (
    <header className="qe-navbar sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-stone-850 text-stone-100 shadow-2xl transition-all">
      {/* Top ornamental golden accent line with subtle shimmer */}
      <div className="h-1 bg-gradient-to-r from-amber-800 via-amber-400 via-yellow-300 via-amber-500 to-amber-900 shadow-sm" />

      {/* Main Bar */}
      <div className="qe-navbar-inner max-w-7xl mx-auto px-3 sm:px-6 lg:px-8" ref={dropdownRef}>
        <div className="qe-navbar-primary flex items-center justify-between h-[72px] gap-2 sm:gap-4">
          
          {/* Left: Brand Logo & Title: Qissa-e-Zehan */}
          <div 
            onClick={() => { setActiveTab('poetry'); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none flex-shrink-0"
          >
            {/* Emblem with glow */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full relative flex-shrink-0 group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md group-hover:bg-amber-500/35 transition-all" />
              <img
                src="/qissa-e-zehan-logo.jpg"
                alt="قصۂ ذہن — Qissa-e-Zehan Logo"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_2px_10px_rgba(217,119,6,0.55)]"
              />
            </div>

            <div>
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="font-nastaliq text-2xl sm:text-3xl text-amber-300 font-bold tracking-normal group-hover:text-amber-200 transition-colors drop-shadow-sm">
                  قصۂ ذہن
                </span>
                <span className="hidden md:inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-amber-400/80 font-mono font-medium">
                  QISSA-E-ZEHAN
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 font-nastaliq leading-none hidden sm:block">
                کلاسیکی شاعری، زندہ سوالات، وقت سے ماورا گفتگو
              </p>
            </div>
          </div>

          {/* Desktop Primary Navigation Items */}
          <nav className="qe-nav-list hidden xl:flex items-center gap-1">
            {navItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`qe-nav-button px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'text-amber-300 bg-amber-950/70 border border-amber-600/50 shadow-inner'
                      : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span className="font-nastaliq text-base leading-none pt-0.5">{item.labelUrdu}</span>
                  {item.aiBadge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-amber-900/60 text-amber-300 font-mono border border-amber-700/40">
                      {item.aiBadge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* "More" / باقیات Mega Dropdown for remaining features */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(prev => prev === 'more' ? null : 'more')}
                className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  ['bait-bazi', 'arts', 'urooz'].includes(activeTab) || openDropdown === 'more'
                    ? 'text-amber-300 bg-amber-950/70 border border-amber-600/50'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/70'
                }`}
                title="مزید ادبی شعبے (More Literary Sections)"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-nastaliq text-base leading-none pt-0.5">مزید بزم</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === 'more' ? 'rotate-180 text-amber-400' : 'text-stone-400'}`} />
              </button>

              {openDropdown === 'more' && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-stone-900/95 border border-amber-700/50 backdrop-blur-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase text-amber-400/70 border-b border-stone-800 tracking-wider">
                    ادبی شعبے و تجربات
                  </div>
                  {navItems.slice(6).map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = activeTab === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          setActiveTab(subItem.id);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors ${
                          isSubActive ? 'bg-amber-950/60 text-amber-300' : 'text-stone-300 hover:bg-stone-850 hover:text-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <SubIcon className="w-4 h-4 text-amber-400" />
                          <div>
                            <div className="font-nastaliq text-sm text-stone-100">{subItem.labelUrdu}</div>
                            <div className="text-[10px] text-stone-400 font-sans">{subItem.labelEn}</div>
                          </div>
                        </div>
                        {isSubActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Quick Filter Pill Buttons (Moods & Poets Quick Jumper) */}
          <div className="hidden lg:flex items-center gap-1.5">
            {/* Quick Mood Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(prev => prev === 'moods' ? null : 'moods')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium transition-all ${
                  openDropdown === 'moods'
                    ? 'bg-amber-950/70 border-amber-500 text-amber-300 ring-1 ring-amber-500/30'
                    : 'bg-stone-900/80 border-stone-800/90 text-stone-300 hover:text-amber-300 hover:border-amber-700/60'
                }`}
                title="کیفیات و موڈ کے مطابق کلام (Filter poems by emotional mood)"
              >
                <Sparkle className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-nastaliq text-sm pt-0.5">کیفیات</span>
                <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${openDropdown === 'moods' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'moods' && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-stone-900/95 border border-amber-700/50 backdrop-blur-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2 py-1 text-[11px] font-mono text-amber-400/80 border-b border-stone-800 pb-1.5 mb-1.5 flex items-center justify-between">
                    <span>کیفیت منتخب کریں</span>
                    <span className="text-[10px] text-stone-500">Poetic Moods</span>
                  </div>
                  <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                    {POETIC_MOODS.map(mood => (
                      <button
                        key={mood.id}
                        onClick={() => {
                          setActiveTab('poetry');
                          if (onSelectMood) onSelectMood(mood.id);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-800/90 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            mood.id === 'gham' ? 'bg-rose-500' :
                            mood.id === 'ishq' ? 'bg-red-500' :
                            mood.id === 'falsafa' ? 'bg-emerald-500' :
                            mood.id === 'inqilab' ? 'bg-amber-500' :
                            mood.id === 'tasawwuf' ? 'bg-indigo-500' :
                            mood.id === 'tanhaee' ? 'bg-cyan-500' : 'bg-stone-400'
                          }`} />
                          <div>
                            <span className="font-nastaliq text-sm text-stone-100 group-hover:text-amber-200">
                              {mood.labelUrdu}
                            </span>
                            <span className="text-[10px] text-stone-400 font-sans ml-2">
                              {mood.labelEnglish}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-stone-500 font-nastaliq hidden group-hover:inline">
                          {mood.taglineUrdu}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Poet Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(prev => prev === 'poets' ? null : 'poets')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium transition-all ${
                  openDropdown === 'poets'
                    ? 'bg-amber-950/70 border-amber-500 text-amber-300 ring-1 ring-amber-500/30'
                    : 'bg-stone-900/80 border-stone-800/90 text-stone-300 hover:text-amber-300 hover:border-amber-700/60'
                }`}
                title="شعرائے کرام کے دیوان (Quick Poets Selector)"
              >
                <Feather className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-nastaliq text-sm pt-0.5">شاعر</span>
                <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${openDropdown === 'poets' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'poets' && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-stone-900/95 border border-amber-700/50 backdrop-blur-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2 py-1 text-[11px] font-mono text-amber-400/80 border-b border-stone-800 pb-1.5 mb-1.5 flex items-center justify-between">
                    <span>دیوانِ شعراء</span>
                    <span className="text-[10px] text-stone-500">Master Poets</span>
                  </div>
                  <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                    {POETS.map(poet => (
                      <button
                        key={poet.id}
                        onClick={() => {
                          if (onSelectPoet) {
                            onSelectPoet(poet.id);
                          } else {
                            setActiveTab('poets');
                          }
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-800/90 transition-colors flex items-center justify-between group"
                      >
                        <div className="text-right flex-1" dir="rtl">
                          <span className="font-nastaliq text-sm text-stone-100 group-hover:text-amber-200">
                            {poet.nameUrdu}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-400 font-sans ml-2">
                          {poet.takhallusEnglish}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Random Poem / استخارہ کلام button */}
            <button
              onClick={handleRandomPoem}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-stone-900/80 hover:bg-stone-850 border border-stone-800 text-stone-300 hover:text-amber-300 transition-colors text-xs"
              title="اتفاقی غزل / قرعۂ فال (Discover a Random Poem)"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-nastaliq text-sm pt-0.5 hidden xl:inline">اتفاقی غزل</span>
            </button>
          </div>

          {/* Right Action Tools: Search, Font Switcher, Tanpura Drone, Streak, Favorites, Mobile Menu */}
          <div className="qe-nav-tools flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* Search Input Toggle */}
            <div className="relative">
              {showSearch ? (
                <div className="flex items-center bg-stone-900 border border-amber-600/70 rounded-lg px-2.5 py-1 w-48 sm:w-64 shadow-xl animate-in fade-in">
                  <Search className="w-4 h-4 text-amber-400 mr-1.5 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="تلاش / Search poem, poet..."
                    className="w-full bg-transparent text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                    className="text-stone-400 hover:text-stone-200 text-xs px-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 transition-colors"
                  title="Search Poetry Library (تلاشِ کلام)"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Font Style Switcher */}
            <div className="hidden sm:flex items-center bg-stone-900/90 border border-amber-900/40 rounded-lg p-0.5 text-xs shadow-sm">
              <button
                onClick={() => setFontPreference('nastaliq')}
                className={`px-2 py-1 rounded transition-colors font-nastaliq text-sm ${
                  fontPreference === 'nastaliq' ? 'bg-amber-700 text-amber-50 font-bold shadow-sm' : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Nastaliq Script (خطِ نستعلیق)"
              >
                نستعلیق
              </button>
              <button
                onClick={() => setFontPreference('gulzar')}
                className={`px-2 py-1 rounded transition-colors font-gulzar text-sm ${
                  fontPreference === 'gulzar' ? 'bg-amber-700 text-amber-50 font-bold shadow-sm' : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Gulzar Script (خطِ گلزار)"
              >
                گلزار
              </button>
              <button
                onClick={() => setFontPreference('amiri')}
                className={`px-2 py-1 rounded transition-colors font-amiri text-xs ${
                  fontPreference === 'amiri' ? 'bg-amber-700 text-amber-50 font-bold shadow-sm' : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Amiri Naskh Script (خطِ نسخ امیری)"
              >
                امیری
              </button>
            </div>

            {/* Tanpura Mushaira Ambience Drone */}
            <button
              onClick={toggleAmbience}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                isAudioPlaying
                  ? 'bg-amber-600/30 border-amber-500 text-amber-300 shadow-md shadow-amber-950/60 animate-pulse'
                  : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-800/60'
              }`}
              title={isAudioPlaying ? 'تنبورہ بند کریں (Stop Tanpura Ambience)' : 'تنبورہ ماحول چلائیں (Play Tanpura Mushaira Drone)'}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden md:inline font-nastaliq text-xs pt-0.5">
                {isAudioPlaying ? 'تنبورہ جاری' : 'ماحول'}
              </span>
            </button>

            {/* Reading Streak & Progress Counter */}
            <button
              onClick={onOpenStreakTracker}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-900/90 hover:bg-stone-850 border border-amber-600/40 hover:border-amber-500 text-xs text-amber-300 transition-all hover:shadow-md hover:shadow-amber-950/40 active:scale-95"
              title="سفرِ مطالعہ و تسلسل (Reading Streak & Verses Counter)"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30 animate-pulse" />
              <span className="font-mono font-bold text-amber-200">{streakDays}</span>
              <span className="text-[10px] text-stone-400 font-sans hidden sm:inline">دن</span>
              <span className="text-stone-600 hidden lg:inline">·</span>
              <span className="font-mono text-[11px] text-stone-300 hidden lg:inline">{totalVerses} اشعار</span>
            </button>

            {/* Daily Reflections Journal Icon */}
            <button
              onClick={onOpenReflections || (() => setActiveTab('reflections'))}
              className={`relative p-2 rounded-lg transition-colors border ${
                activeTab === 'reflections'
                  ? 'bg-amber-950/70 text-amber-300 border-amber-600/60 shadow-inner'
                  : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800'
              }`}
              title="روزنامچۂ دل • Daily Poetic Reflections Journal"
            >
              <Feather className="w-4 h-4 text-amber-400" />
              {reflectionsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-stone-950 text-[10px] flex items-center justify-center font-bold shadow-md shadow-black font-mono">
                  {reflectionsCount}
                </span>
              )}
            </button>

            {/* Favorites Icon */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-rose-400 border border-stone-800 transition-colors"
              title="محفوظ شدہ اشعار (Saved Couplets & Favorites)"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold shadow-md shadow-rose-950">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="xl:hidden p-2 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 transition-colors"
              title="بزم مینیو (Menu)"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-amber-400" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Secondary Navigation Ribbon (Desktop / Tablet): Horizontal scroll bar for full category discovery */}
        <div className="hidden lg:flex xl:hidden items-center justify-start py-2 border-t border-stone-800/80 overflow-x-auto gap-1 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-900/60 text-amber-200 border border-amber-700/60 font-semibold'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-nastaliq text-sm">{item.labelUrdu}</span>
                <span className="text-[10px] text-stone-500 font-sans hidden md:inline">({item.labelEn})</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Full Expanded Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-amber-900/40 bg-stone-950/98 py-3 px-2 space-y-3 animate-in fade-in slide-in-from-top-2">
            
            {/* Quick Actions Row in Mobile Menu */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-900/90 border border-stone-800 text-xs">
              <span className="text-stone-400 font-nastaliq">خطِ تحریر:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFontPreference('nastaliq')}
                  className={`px-2 py-0.5 rounded text-xs font-nastaliq ${fontPreference === 'nastaliq' ? 'bg-amber-700 text-white font-bold' : 'text-stone-400'}`}
                >
                  نستعلیق
                </button>
                <button
                  onClick={() => setFontPreference('gulzar')}
                  className={`px-2 py-0.5 rounded text-xs font-gulzar ${fontPreference === 'gulzar' ? 'bg-amber-700 text-white font-bold' : 'text-stone-400'}`}
                >
                  گلزار
                </button>
                <button
                  onClick={() => setFontPreference('amiri')}
                  className={`px-2 py-0.5 rounded text-xs font-amiri ${fontPreference === 'amiri' ? 'bg-amber-700 text-white font-bold' : 'text-stone-400'}`}
                >
                  امیری
                </button>
              </div>

              {/* Random Poem Mobile */}
              <button
                onClick={handleRandomPoem}
                className="flex items-center gap-1 px-2 py-1 rounded bg-amber-950/70 border border-amber-700/60 text-amber-300 text-[11px]"
              >
                <Shuffle className="w-3 h-3" />
                <span className="font-nastaliq">اتفاقی</span>
              </button>
            </div>

            {/* Primary Navigation Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isActive
                        ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md shadow-amber-950/50'
                        : 'bg-stone-900/70 border-stone-800 text-stone-300 hover:bg-stone-850'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {item.badge}
                        </span>
                      )}
                      {item.aiBadge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-700/40 font-mono">
                          {item.aiBadge}
                        </span>
                      )}
                    </div>
                    <div className="font-nastaliq text-base text-right leading-snug" dir="rtl">
                      {item.labelUrdu}
                    </div>
                    <div className="text-[10px] text-stone-400 font-sans">
                      {item.labelEn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Emotional Moods Picker in Mobile Menu */}
            <div className="pt-2 border-t border-stone-800">
              <div className="text-[11px] text-amber-400/80 font-mono mb-1.5 flex items-center justify-between">
                <span>انتخابِ کیفیات (Mood Themes)</span>
                <span className="text-[10px] text-stone-500">6 کیفیات</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POETIC_MOODS.map(mood => (
                  <button
                    key={mood.id}
                    onClick={() => {
                      setActiveTab('poetry');
                      if (onSelectMood) onSelectMood(mood.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-700 text-stone-300 hover:text-amber-200 text-xs flex items-center gap-1 font-nastaliq"
                  >
                    <span className="pt-0.5">{mood.labelUrdu}</span>
                    <span className="text-[9px] text-stone-500 font-sans">({mood.labelEnglish})</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </header>
  );
};
