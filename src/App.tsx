import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DailySher } from './components/DailySher';
import { PoetryExplorer } from './components/PoetryExplorer';
import { PoemDetailModal } from './components/PoemDetailModal';
import { PoetsGallery } from './components/PoetsGallery';
import { LiteraryArtsHub } from './components/LiteraryArtsHub';
import { CardCreator } from './components/CardCreator';
import { BaitBaziArena } from './components/BaitBaziArena';
import { UroozWorkshop } from './components/UroozWorkshop';
import { SearchGroundingHub } from './components/SearchGroundingHub';
import { LiveVoiceRoom } from './components/LiveVoiceRoom';
import { FavoritesModal, SavedFavorite } from './components/FavoritesModal';
import { ReadingStreakTracker, ReadingJourneyBanner } from './components/ReadingStreakTracker';
import { AchievementToast } from './components/AchievementToast';
import { Footer } from './components/Footer';
import { useReadingProgress } from './hooks/useReadingProgress';
import { DailyReflectionsHub } from './components/DailyReflectionsHub';
import { useDailyReflections } from './hooks/useDailyReflections';

import { POEMS } from './data/poetryDatabase';
import { POETS } from './data/poetsData';
import { Poem, Couplet, Poet } from './types/poetry';
import { FeaturedSher } from './data/poetryDatabase';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('poetry');
  const [fontPreference, setFontPreference] = useState<'nastaliq' | 'gulzar' | 'amiri'>('nastaliq');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string | undefined>(undefined);

  // Reading progress and streak system (persisted to localStorage)
  const { progress, rankInfo, recentCelebration, clearCelebration } = useReadingProgress();
  const [isStreakTrackerOpen, setIsStreakTrackerOpen] = useState(false);

  // Selected poem for modal reader
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

  // Card creator prefill state
  const [cardPrefill, setCardPrefill] = useState<{
    misra1: string;
    misra2: string;
    poet: string;
    translation: string;
  }>({
    misra1: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
    misra2: 'بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
    poet: 'مرزا اسد اللہ خاں غالب',
    translation: 'Thousands of desires, each so overpowering that every desire would take one’s breath away...'
  });

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<SavedFavorite[]>(() => {
    try {
      const saved = localStorage.getItem('qissa_zehan_favorites') || localStorage.getItem('diwan_adab_favorites');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'ghalib-fav-1',
        misra1: 'دلِ ناداں تجھے ہوا کیا ہے',
        misra2: 'آخر اس درد کی دوا کیا ہے',
        poet: 'مرزا اسد اللہ خاں غالب',
        translation: 'O foolish heart, what has befallen you? What ultimate cure exists for this enduring ache?'
      }
    ];
  });

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('qissa_zehan_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavoriteSher = (sher: FeaturedSher) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === sher.id);
      if (exists) {
        return prev.filter(f => f.id !== sher.id);
      } else {
        return [
          ...prev,
          {
            id: sher.id,
            misra1: sher.misra1,
            misra2: sher.misra2,
            poet: sher.poet,
            translation: sher.translation,
            tashreeh: sher.tashreeh
          }
        ];
      }
    });
  };

  const toggleFavoriteCouplet = (couplet: Couplet, poet: Poet) => {
    const id = `${poet.id}-${couplet.misra1.slice(0, 10)}`;
    setFavorites(prev => {
      const exists = prev.some(f => f.id === id);
      if (exists) {
        return prev.filter(f => f.id !== id);
      } else {
        return [
          ...prev,
          {
            id,
            misra1: couplet.misra1,
            misra2: couplet.misra2,
            poet: poet.nameUrdu,
            translation: couplet.englishTranslation,
            tashreeh: couplet.tashreeh
          }
        ];
      }
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some(f => f.id === id);
  };

  const isCoupletFavorited = (key: string) => {
    return favorites.some(f => f.id.includes(key));
  };

  const handleOpenCardStudioWithSher = (sher: FeaturedSher) => {
    setCardPrefill({
      misra1: sher.misra1,
      misra2: sher.misra2,
      poet: sher.poet,
      translation: sher.translation
    });
    setActiveTab('card-maker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCardStudioWithCouplet = (couplet: Couplet, poet: Poet) => {
    setCardPrefill({
      misra1: couplet.misra1,
      misra2: couplet.misra2,
      poet: poet.nameUrdu,
      translation: couplet.englishTranslation
    });
    setSelectedPoem(null);
    setActiveTab('card-maker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Daily Reflections state & hook
  const { reflections } = useDailyReflections();
  const [reflectionPrefill, setReflectionPrefill] = useState<{
    misra1: string;
    misra2: string;
    poet: string;
    poemTitle?: string;
    poemId?: string;
  } | null>(null);
  const [isReflectionComposerOpen, setIsReflectionComposerOpen] = useState(false);

  const handleOpenReflectionsWithSher = (sher: FeaturedSher) => {
    setReflectionPrefill({
      misra1: sher.misra1,
      misra2: sher.misra2,
      poet: sher.poet,
      poemTitle: sher.misra1
    });
    setActiveTab('reflections');
    setIsReflectionComposerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReflectionsWithCouplet = (couplet: Couplet, poet: Poet, poem: Poem) => {
    setReflectionPrefill({
      misra1: couplet.misra1,
      misra2: couplet.misra2,
      poet: poet.nameUrdu,
      poemTitle: poem.titleUrdu,
      poemId: poem.id
    });
    setSelectedPoem(null);
    setActiveTab('reflections');
    setIsReflectionComposerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCardWithFavorite = (fav: SavedFavorite) => {
    setCardPrefill({
      misra1: fav.misra1,
      misra2: fav.misra2,
      poet: fav.poet,
      translation: fav.translation
    });
    setActiveTab('card-maker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreTheme = (themeId: string) => {
    setSelectedThemeFilter(themeId);
    setActiveTab('poetry');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleSelectPoetForPoetry = (poetId: string) => {
    setActiveTab('poetry');
    const poem = POEMS.find(p => p.poetId === poetId);
    if (poem) {
      setSelectedPoem(poem);
    }
  };

  return (
    <div className="qe-shell min-h-screen bg-black text-stone-100 flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200 manuscript-vignette relative">
      
      {/* Deep black atmospheric base backdrop */}
      <div className="fixed inset-0 bg-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.02),rgba(0,0,0,0))] pointer-events-none" />
      <div className="fixed inset-0 damask-pattern opacity-30 pointer-events-none" />
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fontPreference={fontPreference}
        setFontPreference={setFontPreference}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        reflectionsCount={reflections.length}
        onOpenReflections={() => { setActiveTab('reflections'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenStreakTracker={() => setIsStreakTrackerOpen(true)}
        streakDays={progress.streakDays}
        totalVerses={progress.totalVersesExplored}
        onSelectPoem={(poem) => {
          setSelectedPoem(poem);
        }}
        onSelectMood={(moodId) => {
          setSelectedThemeFilter(moodId);
          setActiveTab('poetry');
        }}
        onSelectPoet={(poetId) => {
          handleSelectPoetForPoetry(poetId);
        }}
      />

      {/* Main Body Content */}
      <main className="qe-main flex-1">
        
        {/* Dedicated Daily Sher Tab */}
        {activeTab === 'daily-sher' && (
          <div className="py-8">
            <DailySher
              fontPreference={fontPreference}
              onOpenCardStudioWithSher={handleOpenCardStudioWithSher}
              onToggleFavorite={toggleFavoriteSher}
              isFavorite={isFavorite}
              onOpenReflectionsWithSher={handleOpenReflectionsWithSher}
            />

            {/* Reading Streak Banner */}
            <ReadingJourneyBanner
              onOpenTracker={() => setIsStreakTrackerOpen(true)}
              fontPreference={fontPreference}
            />
          </div>
        )}

        {/* Hero Section shown on Poetry view */}
        {activeTab === 'poetry' && (
          <>
            <HeroSection
              fontPreference={fontPreference}
              onExploreTheme={handleExploreTheme}
              onOpenCardStudioWithSher={handleOpenCardStudioWithSher}
              onToggleFavorite={toggleFavoriteSher}
              isFavorite={isFavorite}
              onOpenReflectionsWithSher={handleOpenReflectionsWithSher}
            />
            
            {/* Reading Streak & Literary Journey Banner */}
            <ReadingJourneyBanner
              onOpenTracker={() => setIsStreakTrackerOpen(true)}
              fontPreference={fontPreference}
            />

            {/* Daily Sher Featured Section on Home Page */}
            <DailySher
              fontPreference={fontPreference}
              onOpenCardStudioWithSher={handleOpenCardStudioWithSher}
              onToggleFavorite={toggleFavoriteSher}
              isFavorite={isFavorite}
              onOpenReflectionsWithSher={handleOpenReflectionsWithSher}
            />

            {/* AI Capabilities Spotlight: Live Voice (gemini-3.8-live) & Google Search Grounding (gemini-3.5-flash) */}
            <div className="qe-feature-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Card 1: Live Voice Conversation (gemini-3.8-live) */}
                <div 
                  onClick={() => { setActiveTab('live-voice'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="qe-feature-card group bg-gradient-to-br from-[#191107] via-[#080604] to-[#000000] border border-amber-600/40 hover:border-amber-400/80 rounded-3xl p-6 sm:p-8 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer flex flex-col justify-between gold-glow relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform blur-sm" />
                  
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-stone-850 mb-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-900 border border-amber-500/50 text-[10px] text-amber-300 font-mono shadow-sm">
                        gemini-3.8-live (Live API)
                      </span>
                      <span className="text-xs text-amber-400 font-medium">ریئل ٹائم آواز</span>
                    </div>

                    <h3 className="font-nastaliq text-2xl sm:text-3xl text-amber-200 group-hover:text-amber-100 leading-relaxed text-right drop-shadow-sm" dir="rtl">
                      بزمِ سخن لائیو — ہم کلامی برائے ادب
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed font-sans mt-2">
                      Have a natural, real-time voice conversation with the literary companion. Recite verses, discuss Ghalib’s philosophy, and receive verbal feedback instantly.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-850 flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-serif italic">Zero-latency WebSocket Voice</span>
                    <span className="text-xs text-amber-400 group-hover:text-amber-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>محفل میں شامل ہوں</span>
                      <span>➔</span>
                    </span>
                  </div>
                </div>

                {/* Card 2: Google Search Grounding (gemini-3.5-flash) */}
                <div 
                  onClick={() => { setActiveTab('search-grounding'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="qe-feature-card group bg-gradient-to-br from-[#091722] via-[#04090d] to-[#000000] border border-sky-600/40 hover:border-sky-400/80 rounded-3xl p-6 sm:p-8 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform blur-sm" />

                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-stone-850 mb-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-900 border border-sky-500/50 text-[10px] text-sky-300 font-mono shadow-sm">
                        gemini-3.5-flash (Google Search Grounded)
                      </span>
                      <span className="text-xs text-sky-400 font-medium">گوگل سرچ تصدیق</span>
                    </div>

                    <h3 className="font-nastaliq text-2xl sm:text-3xl text-sky-200 group-hover:text-sky-100 leading-relaxed text-right drop-shadow-sm" dir="rtl">
                      ادبی تحقیق و تصدیقِ انتساب
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed font-sans mt-2">
                      Verify couplet attributions, explore rare historical mushaira records, and research poet biographies backed by real-time Google Search data and source citations.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-850 flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-serif italic">Verified with Google Web Sources</span>
                    <span className="text-xs text-sky-400 group-hover:text-sky-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>تحقیق شروع کریں</span>
                      <span>➔</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

        {/* Tab 0: Daily Reflections & Poetic Journal (روزنامچۂ دل) */}
        {activeTab === 'reflections' && (
          <DailyReflectionsHub
            fontPreference={fontPreference}
            onOpenCardStudioWithCouplet={(m1, m2, poet) => {
              setCardPrefill({
                misra1: m1,
                misra2: m2,
                poet,
                translation: ''
              });
              setActiveTab('card-maker');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            composerPrefill={reflectionPrefill}
            isComposerOpenExternal={isReflectionComposerOpen}
            onCloseExternalComposer={() => {
              setIsReflectionComposerOpen(false);
              setReflectionPrefill(null);
            }}
          />
        )}

        {/* Tab 1: Poetry Library */}
        {activeTab === 'poetry' && (
          <PoetryExplorer
            poems={POEMS}
            fontPreference={fontPreference}
            onSelectPoem={setSelectedPoem}
            selectedThemeFilter={selectedThemeFilter}
            onClearThemeFilter={() => setSelectedThemeFilter(undefined)}
            searchQuery={searchQuery}
          />
        )}

        {/* Tab 2: Poets Hall of Fame */}
        {activeTab === 'poets' && (
          <PoetsGallery
            fontPreference={fontPreference}
            onSelectPoetForPoetry={handleSelectPoetForPoetry}
          />
        )}

        {/* Tab 3: Literary Arts & Calligraphy */}
        {activeTab === 'arts' && (
          <LiteraryArtsHub
            fontPreference={fontPreference}
          />
        )}

        {/* Tab 4: Calligraphy Card Studio */}
        {activeTab === 'card-maker' && (
          <CardCreator
            initialMisra1={cardPrefill.misra1}
            initialMisra2={cardPrefill.misra2}
            initialPoet={cardPrefill.poet}
            initialTranslation={cardPrefill.translation}
            fontPreference={fontPreference}
          />
        )}

        {/* Tab 5: Bait Bazi Duel */}
        {activeTab === 'bait-bazi' && (
          <BaitBaziArena
            fontPreference={fontPreference}
          />
        )}

        {/* Tab 6: Ilm-e-Urooz & Poetic Tashreeh AI */}
        {activeTab === 'urooz' && (
          <UroozWorkshop
            fontPreference={fontPreference}
          />
        )}

        {/* Feature 1: Google Search Grounding with gemini-3.5-flash */}
        {activeTab === 'search-grounding' && (
          <SearchGroundingHub
            fontPreference={fontPreference}
          />
        )}

        {/* Feature 2: Real-Time Live API Voice Conversation with gemini-3.8-live */}
        {activeTab === 'live-voice' && (
          <LiveVoiceRoom
            fontPreference={fontPreference}
          />
        )}

      </main>

      {/* Full Poem Reader Modal */}
      <PoemDetailModal
        poem={selectedPoem}
        onClose={() => setSelectedPoem(null)}
        fontPreference={fontPreference}
        onOpenCardStudioWithCouplet={handleOpenCardStudioWithCouplet}
        onToggleFavoriteCouplet={toggleFavoriteCouplet}
        isCoupletFavorited={isCoupletFavorited}
        onOpenReflectionsWithCouplet={handleOpenReflectionsWithCouplet}
      />

      {/* Saved Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={(id) => setFavorites(prev => prev.filter(f => f.id !== id))}
        onOpenCardWithFavorite={handleOpenCardWithFavorite}
        fontPreference={fontPreference}
      />

      {/* Reading Progress & Streak Tracker Modal */}
      <ReadingStreakTracker
        isOpen={isStreakTrackerOpen}
        onClose={() => setIsStreakTrackerOpen(false)}
        fontPreference={fontPreference}
      />

      {/* Literary Milestone Celebration Toast */}
      <AchievementToast
        celebration={recentCelebration}
        onClose={clearCelebration}
        fontPreference={fontPreference}
      />

      {/* Footer */}
      <Footer onNavigateTab={setActiveTab} />

    </div>
  );
}
