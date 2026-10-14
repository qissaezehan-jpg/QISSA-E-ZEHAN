import React, { useState } from 'react';
import { Sparkles, Volume2, Share2, RefreshCw, Heart, Moon, Flame, BookOpen, Compass, HelpCircle, Feather } from 'lucide-react';
import { FAMOUS_ASHAAR, FeaturedSher } from '../data/poetryDatabase';
import { ambienceEngine } from '../utils/audioAmbience';

interface HeroSectionProps {
  fontPreference: string;
  onExploreTheme: (theme: string) => void;
  onOpenCardStudioWithSher: (sher: FeaturedSher) => void;
  onToggleFavorite: (sher: FeaturedSher) => void;
  isFavorite: (id: string) => boolean;
  onOpenReflectionsWithSher?: (sher: FeaturedSher) => void;
}

// Living existential questions from Urdu poetry heritage
const ZINDA_SAWALAAT = [
  {
    sawalUrdu: 'کیا درد کی دوا تلاش کرنا ہی انسانی بے چینی کا مقدر ہے؟',
    sawalEn: 'Is seeking a cure for grief the eternal predicament of human longing?',
    sherRef: 'دلِ ناداں تجھے ہوا کیا ہے • آخر اس درد کی دوا کیا ہے',
    poet: 'مرزا اسد اللہ خاں غالب',
    themeId: 'Falsafa-o-Hayaat'
  },
  {
    sawalUrdu: 'کیا کائنات انسان کے لیے محدود ہے یا شعور کی پرواز لامتناہی ہے؟',
    sawalEn: 'Is the universe finite for humanity, or is the flight of consciousness boundless?',
    sherRef: 'ستاروں سے آگے جہاں اور بھی ہیں • ابھی عشق کے امتحان اور بھی ہیں',
    poet: 'علامہ محمد اقبال',
    themeId: 'Tasawwuf'
  },
  {
    sawalUrdu: 'جب ظلم کی زنجیریں بھاری ہوں تو کلمۂ حق کی کیا قیمت ہے؟',
    sawalEn: 'When the shackles of oppression weigh heavy, what is the true price of speaking truth?',
    sherRef: 'بول کہ لب آزاد ہیں تیرے • بول زباں اب تک تیری ہے',
    poet: 'فیض احمد فیض',
    themeId: 'Inqilab-o-Baghaawat'
  },
  {
    sawalUrdu: 'کیا قربت میں بھی دوری کا احساس محبت کا ازلی المیہ ہے؟',
    sawalEn: 'Is feeling solitude even within intimacy the tragic paradox of modern love?',
    sherRef: 'عجیب ہے کہ وہ پاس ہو تو خوشی نہیں ہوتی • اور دور چلا جائے تو جیا نہیں جاتا',
    poet: 'جون ایلیا',
    themeId: 'Yaas-o-Tanhaee'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  fontPreference,
  onExploreTheme,
  onOpenCardStudioWithSher,
  onToggleFavorite,
  isFavorite,
  onOpenReflectionsWithSher
}) => {
  const [currentSherIndex, setCurrentSherIndex] = useState(0);
  const [activeSawalIndex, setActiveSawalIndex] = useState(0);
  const [daadFlourishes, setDaadFlourishes] = useState<{ id: number; text: string; x: number }[]>([]);
  const [isReciting, setIsReciting] = useState(false);
  const [lanternGlow, setLanternGlow] = useState(true);

  const sher = FAMOUS_ASHAAR[currentSherIndex];
  const activeSawal = ZINDA_SAWALAAT[activeSawalIndex];

  const handleNextSher = () => {
    setCurrentSherIndex((prev) => (prev + 1) % FAMOUS_ASHAAR.length);
  };

  const handleDaad = () => {
    ambienceEngine.playDaadChime();
    const praises = ['واہ واہ! سبحان اللہ!', 'مکرر ارشاد!', 'کیا کہنے جناب!', 'لاجواب سخن!', 'آہا! کیا بات ہے!'];
    const chosen = praises[Math.floor(Math.random() * praises.length)];
    const newFlourish = {
      id: Date.now(),
      text: chosen,
      x: Math.random() * 60 - 30
    };

    setDaadFlourishes((prev) => [...prev, newFlourish]);
    setTimeout(() => {
      setDaadFlourishes((prev) => prev.filter((item) => item.id !== newFlourish.id));
    }, 1800);
  };

  const handleRecite = () => {
    setIsReciting(true);
    const fullText = `${sher.misra1} ... ${sher.misra2} ... کلام ${sher.poet}`;
    ambienceEngine.reciteText(fullText, 'ur');
    setTimeout(() => setIsReciting(false), 5000);
  };

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const themes = [
    { id: 'Ishq-o-Muhabbat', label: 'عشق (Love)', en: 'Love & Passion' },
    { id: 'Hijr-o-Firaaq', label: 'غم (Grief)', en: 'Grief & Pathos' },
    { id: 'Falsafa-o-Hayaat', label: 'فلسفہ (Philosophy)', en: 'Existential Mind' },
    { id: 'Inqilab-o-Baghaawat', label: 'انقلاب (Revolution)', en: 'Defiance & Hope' },
    { id: 'Tasawwuf', label: 'تصوف (Mysticism)', en: 'Cosmic Soul' },
    { id: 'Yaas-o-Tanhaee', label: 'تنہائی (Solitude)', en: 'Silence & Solitude' }
  ];

  return (
    <div className="relative overflow-hidden bg-black text-stone-100 pt-8 pb-16 md:pt-14 md:pb-24 border-b border-stone-900">
      
      {/* Deep Radial Vignette Base in Pure Black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a0a0a] via-[#040404] to-[#000000] pointer-events-none" />

      {/* Subtle Mughal Damask Geometric Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.025] pointer-events-none" />

      {/* ============================================================== */}
      {/* ATMOSPHERIC BACKGROUND SCENERY (Mughal Archway, Moon & Lantern) */}
      {/* ============================================================== */}
      
      {/* Soft Moon Glow (Right side sky) with layered ethereal indigo-slate radial */}
      <div className="absolute top-2 right-8 sm:right-24 w-60 h-60 sm:w-96 sm:h-96 rounded-full bg-slate-300/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-10 right-16 sm:right-32 w-32 h-32 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      
      {/* Full Moon Orb Graphic */}
      <div className="absolute top-10 right-10 sm:right-28 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 opacity-90 shadow-[0_0_60px_rgba(241,245,249,0.45)] pointer-events-none hidden md:block">
        {/* Subtle lunar craters texture */}
        <div className="absolute top-2 left-3 w-4 h-3 rounded-full bg-slate-300/40" />
        <div className="absolute bottom-3 right-4 w-5 h-4 rounded-full bg-slate-300/30" />
        <div className="absolute inset-0 rounded-full border border-white/40" />
      </div>

      {/* Mughal Scalloped Archway Silhouette (Right Side) */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block overflow-hidden">
        <svg viewBox="0 0 600 800" className="w-full h-full text-amber-500 fill-current" preserveAspectRatio="none">
          <path d="M 600 0 L 200 0 C 200 120, 260 180, 260 260 C 260 300, 240 330, 270 380 C 290 410, 310 440, 310 500 C 310 600, 200 700, 200 800 L 600 800 Z" opacity="0.4" />
          <path d="M 320 200 Q 400 120 480 200 Q 560 280 600 240 L 600 800 L 320 800 Z" opacity="0.25" />
        </svg>
      </div>

      {/* Golden Lantern Warm Glow (Left Side scholar desk ambiance) */}
      <div 
        className={`absolute top-12 left-6 sm:left-20 w-80 h-80 sm:w-[32rem] sm:h-[32rem] rounded-full bg-gradient-to-br from-amber-500/20 via-amber-700/10 to-transparent blur-[110px] pointer-events-none transition-opacity duration-1000 ${
          lanternGlow ? 'opacity-100' : 'opacity-20'
        }`} 
      />
      
      {/* Warm desk amber bloom centered on card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[30rem] rounded-full bg-amber-600/[0.05] blur-[120px] pointer-events-none" />

      {/* ============================================================== */}
      {/* MAIN CONTAINER CONTENT */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Floating Utility: Lantern Glow Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs text-amber-400/80 bg-black/90 border border-stone-800 px-3 py-1 rounded-full">
            <Moon className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-serif">شبینہ مطالعہ گاہ • Nocturnal Sanctum</span>
          </div>

          <button
            onClick={() => setLanternGlow(!lanternGlow)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950 border border-stone-800 text-amber-300 text-xs hover:bg-stone-900 transition-all shadow-sm"
            title="Toggle Lantern Candlelight Flame"
          >
            <Flame className={`w-3.5 h-3.5 ${lanternGlow ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-stone-500'}`} />
            <span>{lanternGlow ? 'قندیل روشن ہے' : 'قندیل کی لو مدہم کریں'}</span>
          </button>
        </div>

        {/* Official brand banner — displayed in its original proportions without cropping */}
        <div className="my-5 sm:my-7 overflow-hidden rounded-2xl border border-amber-700/40 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.95)]">
          <img
            src="/qissa-e-zehan-banner.jpg"
            alt="قصۂ ذہن — Qissa-e-Zehan official banner"
            className="block h-auto w-full object-contain"
          />
        </div>

        {/* ============================================================== */}
        {/* THE SCHOLAR'S DESK: Illuminated Couplet & Antique Lantern Visual */}
        {/* ============================================================== */}
        <div className="mt-10 max-w-4xl mx-auto relative">
          
          {/* Subtle Damask / Velvet Paper Border with deep dark black color */}
          <div className="bg-gradient-to-br from-[#0d0d0d] via-[#060606] to-[#000000] border-2 border-amber-600/50 hover:border-amber-500/70 rounded-3xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,1)] gold-glow-lg relative overflow-hidden transition-all">
            
            {/* Top Ornamental Filigree Strip */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-850 text-xs text-amber-400/90">
              <div className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                <span>کلامِ خاص • Masterpiece Couplet</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-black border border-stone-800 text-amber-300 font-nastaliq text-xs">
                  {sher.theme}
                </span>
              </div>
            </div>

            {/* The Couplet Verses in Rich Nastaliq */}
            <div className="py-8 sm:py-12 text-center relative">
              <p 
                dir="rtl" 
                className={`${fontClass} text-2xl sm:text-4xl md:text-5xl text-amber-100 leading-loose transition-all duration-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]`}
              >
                {sher.misra1}
              </p>

              {/* Ornamental Center Divider */}
              <div className="my-4 flex items-center justify-center gap-4">
                <div className="h-px w-20 sm:w-28 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
                <span className="text-amber-400 text-sm">✦ ❖ ✦</span>
                <div className="h-px w-20 sm:w-28 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
              </div>

              <p 
                dir="rtl" 
                className={`${fontClass} text-2xl sm:text-4xl md:text-5xl text-amber-300 leading-loose transition-all duration-300 drop-shadow-[0_2px_12px_rgba(245,158,11,0.4)]`}
              >
                {sher.misra2}
              </p>

              {/* Floating Daad animation flourishes */}
              {daadFlourishes.map((f) => (
                <div
                  key={f.id}
                  style={{ transform: `translateX(${f.x}px)` }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-nastaliq text-2xl sm:text-4xl font-bold text-amber-300 pointer-events-none animate-bounce drop-shadow-[0_4px_16px_rgba(245,158,11,0.8)]"
                >
                  {f.text}
                </div>
              ))}
            </div>

            {/* Poet Attribution */}
            <div className="text-center pb-4">
              <span className="text-[11px] uppercase tracking-widest text-amber-500/70 font-mono">کلام و سخن</span>
              <p className="font-nastaliq text-2xl sm:text-3xl text-amber-300 font-bold mt-1">
                {sher.poet}
              </p>
            </div>

            {/* English translation & brief Tashreeh */}
            <div className="pt-4 border-t border-stone-850 text-stone-300 text-center">
              <p className="font-serif italic text-sm sm:text-base text-stone-200/90 leading-relaxed max-w-2xl mx-auto">
                "{sher.translation}"
              </p>
              <p className="text-xs text-amber-400/90 mt-2 font-sans max-w-xl mx-auto">
                <span className="font-semibold text-amber-300">تشریح: </span>
                {sher.tashreeh}
              </p>
            </div>

            {/* Interactive Card Action Controls */}
            <div className="mt-6 pt-5 border-t border-stone-850 flex flex-wrap items-center justify-between gap-3">
              
              {/* Left: Daad Button (داد دیں!) */}
              <button
                onClick={handleDaad}
                className="group relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-bold text-sm shadow-lg shadow-black/80 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                title="Express Daad (واہ واہ!)"
              >
                <Sparkles className="w-4 h-4 text-stone-950 group-hover:rotate-12 transition-transform" />
                <span className="font-nastaliq text-lg leading-none pt-0.5">داد دیں (واہ واہ!)</span>
              </button>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRecite}
                  disabled={isReciting}
                  className={`p-2.5 rounded-lg border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-700 hover:bg-stone-900 transition-colors ${
                    isReciting ? 'text-amber-400 animate-pulse border-amber-600' : ''
                  }`}
                  title="Recite aloud (تحت اللفظ)"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {onOpenReflectionsWithSher && (
                  <button
                    onClick={() => onOpenReflectionsWithSher(sher)}
                    className="px-3.5 py-2 rounded-lg border border-amber-800/60 bg-stone-950 text-amber-200 hover:text-amber-100 hover:border-amber-600 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    title="Write personal reflection on this verse (اس شعر پر تاثرات لکھیں)"
                  >
                    <Feather className="w-3.5 h-3.5 text-amber-400" />
                    <span>تاثرات لکھیں</span>
                  </button>
                )}

                <button
                  onClick={() => onOpenCardStudioWithSher(sher)}
                  className="px-3.5 py-2 rounded-lg border border-amber-800/60 bg-stone-950 text-amber-200 hover:text-amber-100 hover:border-amber-600 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  title="Create downloadable calligraphy card"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>کارڈ اسٹوڈیو</span>
                </button>

                <button
                  onClick={() => onToggleFavorite(sher)}
                  className={`p-2.5 rounded-lg border border-stone-800 transition-colors ${
                    isFavorite(sher.id)
                      ? 'text-rose-500 border-rose-800/80 bg-rose-950/40'
                      : 'text-stone-400 hover:text-rose-400 hover:border-stone-700'
                  }`}
                  title="Bookmark verse"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(sher.id) ? 'fill-rose-500' : ''}`} />
                </button>

                <button
                  onClick={handleNextSher}
                  className="p-2.5 rounded-lg border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-700 hover:bg-stone-900 transition-colors"
                  title="Next verse (اگلا کلام)"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* "زندہ سوالات" (LIVING QUESTIONS & TIMELESS CONVERSATIONS)       */}
        {/* Directly inspired by the image's tagline                        */}
        {/* ============================================================== */}
        <div className="mt-14 max-w-4xl mx-auto">
          
          <div className="flex items-center justify-between pb-3 border-b border-stone-850">
            <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-semibold">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>زندہ سوالات اور وقت سے ماورا گفتگو</span>
            </div>
            <span className="text-[11px] text-stone-500 font-mono">
              فکری و وجودی مباحث
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {ZINDA_SAWALAAT.map((item, idx) => {
              const isSelected = activeSawalIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveSawalIndex(idx);
                    onExploreTheme(item.themeId);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#141208] via-[#090805] to-[#000000] border-amber-500/80 shadow-xl'
                      : 'bg-black/90 border-stone-850 hover:border-amber-800/60 hover:bg-[#080808]'
                  }`}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-500 font-mono block mb-1">
                      سوالِ زندہ #{idx + 1}
                    </span>
                    <h4 dir="rtl" className="font-nastaliq text-lg sm:text-xl text-stone-100 leading-loose text-right">
                      {item.sawalUrdu}
                    </h4>
                    <p className="text-xs text-stone-400 font-serif italic mt-1">
                      {item.sawalEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-850 flex items-center justify-between text-xs">
                    <span className="text-amber-400/90 font-nastaliq text-sm">
                      کلام: {item.poet}
                    </span>
                    <span className="text-[11px] text-amber-500 hover:underline">
                      کلام پڑھیں ➔
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Theme Exploration Strip */}
        <div className="mt-12 text-center">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-3 font-mono">
            موضوعات کے اعتبار سے بیاض کی تلاش • EXPLORE BY THEME
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => onExploreTheme(t.id)}
                className="px-4 py-2 rounded-xl bg-black hover:bg-[#121212] border border-stone-850 hover:border-amber-600/60 text-stone-300 hover:text-amber-200 transition-all text-xs flex items-center gap-2 shadow-sm"
              >
                <span className="font-nastaliq text-base leading-none text-amber-400">
                  {t.label}
                </span>
                <span className="text-[11px] text-stone-500 font-sans">
                  ({t.en})
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
