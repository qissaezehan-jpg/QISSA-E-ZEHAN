import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Volume2, 
  RefreshCw, 
  Heart, 
  Calendar, 
  Send,
  MessageCircle,
  Twitter,
  Palette,
  Flame,
  Feather
} from 'lucide-react';
import { FAMOUS_ASHAAR, FeaturedSher } from '../data/poetryDatabase';
import { ambienceEngine } from '../utils/audioAmbience';
import { recordVersesExplored } from '../utils/readingTracker';

interface DailySherProps {
  fontPreference: string;
  onOpenCardStudioWithSher: (sher: FeaturedSher) => void;
  onToggleFavorite: (sher: FeaturedSher) => void;
  isFavorite: (id: string) => boolean;
  onOpenReflectionsWithSher?: (sher: FeaturedSher) => void;
}

export const DailySher: React.FC<DailySherProps> = ({
  fontPreference,
  onOpenCardStudioWithSher,
  onToggleFavorite,
  isFavorite,
  onOpenReflectionsWithSher
}) => {
  // Deterministic daily index based on current date
  const todayIndex = useMemo(() => {
    const today = new Date();
    // Use day of year so it stays consistent throughout the day
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % FAMOUS_ASHAAR.length;
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(todayIndex);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyFeedbackText, setCopyFeedbackText] = useState<string>('');
  const [isReciting, setIsReciting] = useState<boolean>(false);
  const [daadFlourishes, setDaadFlourishes] = useState<{ id: number; text: string; x: number }[]>([]);

  const sher = FAMOUS_ASHAAR[currentIndex];
  const isOfficialDaily = currentIndex === todayIndex;

  // Formatted date string
  const formattedDate = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, []);

  // Automatically record exploring the daily couplet towards user streak
  useEffect(() => {
    if (sher) {
      recordVersesExplored({
        poemId: `daily-${sher.id}`,
        coupletIndex: 0,
        poetId: sher.poet,
        count: 1,
        type: 'read'
      });
    }
  }, [sher?.id]);

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  // Construct social media sharing template
  const getSocialShareText = () => {
    return `✨ قصۂ ذہن — شعرِ روزانہ ✨\n\n« ${sher.misra1} »\n« ${sher.misra2} »\n\n— کلام: ${sher.poet}\n\n"${sher.translation}"\n\n#قصۂ_ذہن #شعر_روزانہ #اردو_شاعری #UrduPoetry\nhttps://qissa-e-zehan.adab`;
  };

  const handleCopyToClipboard = async () => {
    const textToCopy = getSocialShareText();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setCopyFeedbackText('شعر کاپی ہو گیا! سوشل میڈیا پر شیئر کریں');
      setTimeout(() => {
        setCopied(false);
        setCopyFeedbackText('');
      }, 3000);
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  };

  const handleNativeShare = async () => {
    const shareText = getSocialShareText();
    if (navigator && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `قصۂ ذہن — شعرِ روزانہ (${sher.poet})`,
          text: shareText
        });
        return;
      } catch {
        // User cancelled or unsupported
      }
    }
    // Fallback to copy
    handleCopyToClipboard();
  };

  const handleShareWhatsApp = () => {
    const shareText = encodeURIComponent(getSocialShareText());
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const handleShareTwitter = () => {
    const tweet = encodeURIComponent(
      `« ${sher.misra1} »\n« ${sher.misra2} »\n\n— ${sher.poet}\n\n#UrduPoetry #قصۂ_ذہن`
    );
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
  };

  const handleRandomSher = () => {
    let nextIdx = Math.floor(Math.random() * FAMOUS_ASHAAR.length);
    if (nextIdx === currentIndex && FAMOUS_ASHAAR.length > 1) {
      nextIdx = (nextIdx + 1) % FAMOUS_ASHAAR.length;
    }
    setCurrentIndex(nextIdx);
  };

  const handleRestoreDaily = () => {
    setCurrentIndex(todayIndex);
  };

  const handleRecite = () => {
    setIsReciting(true);
    const fullText = `${sher.misra1} ... ${sher.misra2} ... کلام ${sher.poet}`;
    ambienceEngine.reciteText(fullText, 'ur');
    setTimeout(() => setIsReciting(false), 5000);
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

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 my-10">
      
      {/* Container with illuminated border and pure dark black backdrop */}
      <div className="bg-gradient-to-br from-[#0d0d0d] via-[#060606] to-[#000000] border-2 border-amber-600/50 hover:border-amber-500/70 rounded-3xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,1)] gold-glow-lg relative overflow-hidden transition-all">
        
        {/* Subtle decorative damask texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.025] pointer-events-none" />

        {/* Top Header Badge & Date */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-stone-850 text-xs">
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full relative flex-shrink-0">
              <img
                src="/logo.svg"
                alt="قصۂ ذہن Logo"
                className="w-full h-full object-contain drop-shadow-[0_1px_4px_rgba(217,119,6,0.5)]"
              />
            </div>
            <div>
              <span className="font-nastaliq text-base sm:text-lg text-amber-300 font-bold leading-none block">
                شعرِ روزانہ • Daily Poetic Couplet
              </span>
              <span className="text-[10px] text-amber-500/80 font-mono tracking-widest uppercase">
                QISSA-E-ZEHAN
              </span>
            </div>
            {isOfficialDaily && (
              <span className="px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-[10px] text-amber-300 font-mono">
                آج کا انتخاب
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-stone-400">
            <div className="flex items-center gap-1.5 text-stone-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[11px]">{formattedDate}</span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-black border border-stone-800 text-amber-400/90 font-nastaliq text-xs">
              {sher.theme}
            </span>
          </div>

        </div>

        {/* The Poetic Couplet Presentation */}
        <div className="py-8 sm:py-12 text-center relative">
          
          {/* First Misra */}
          <p 
            dir="rtl" 
            className={`${fontClass} text-2xl sm:text-4xl md:text-5xl text-amber-100 leading-loose transition-all duration-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)] select-text`}
          >
            {sher.misra1}
          </p>

          {/* Golden Center Flourish */}
          <div className="my-4 flex items-center justify-center gap-4">
            <div className="h-px w-20 sm:w-28 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
            <span className="text-amber-400 text-sm">✦ ❖ ✦</span>
            <div className="h-px w-20 sm:w-28 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
          </div>

          {/* Second Misra */}
          <p 
            dir="rtl" 
            className={`${fontClass} text-2xl sm:text-4xl md:text-5xl text-amber-300 leading-loose transition-all duration-300 drop-shadow-[0_2px_12px_rgba(245,158,11,0.4)] select-text`}
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
          <span className="text-[10px] uppercase tracking-widest text-amber-500/70 font-mono">کلام و سخن</span>
          <p className="font-nastaliq text-2xl sm:text-3xl text-amber-300 font-bold mt-0.5">
            — {sher.poet}
          </p>
        </div>

        {/* English Translation & Poetic Tashreeh */}
        <div className="pt-4 border-t border-amber-900/40 text-stone-300 text-center space-y-2">
          <p className="font-serif italic text-sm sm:text-base text-stone-200/90 leading-relaxed max-w-2xl mx-auto">
            "{sher.translation}"
          </p>
          <p className="text-xs text-amber-400/90 font-sans max-w-xl mx-auto">
            <span className="font-semibold text-amber-300">مفہوم و تشریح: </span>
            {sher.tashreeh}
          </p>
        </div>

        {/* ============================================================== */}
        {/* SOCIAL MEDIA COPY & SHARING SECTION                            */}
        {/* ============================================================== */}
        <div className="mt-8 pt-6 border-t border-amber-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Primary Action: Copy to Clipboard for Social Media */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            
            <button
              onClick={handleCopyToClipboard}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400'
                  : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold hover:scale-102 active:scale-98'
              }`}
              title="Copy formatted verse to clipboard for social sharing"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>کاپی ہو گیا! (Copied)</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-950" />
                  <span>سوشل میڈیا کے لیے کاپی کریں</span>
                </>
              )}
            </button>

            {/* Quick Share Icons (WhatsApp, X/Twitter, Native Share) */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShareWhatsApp}
                className="p-2.5 rounded-xl bg-stone-900/90 hover:bg-emerald-950 border border-stone-800 hover:border-emerald-600/60 text-stone-300 hover:text-emerald-400 transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>

              <button
                onClick={handleShareTwitter}
                className="p-2.5 rounded-xl bg-stone-900/90 hover:bg-sky-950 border border-stone-800 hover:border-sky-600/60 text-stone-300 hover:text-sky-400 transition-colors"
                title="Share on X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>

              <button
                onClick={handleNativeShare}
                className="p-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-amber-300 transition-colors"
                title="System Share Dialog"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Secondary Actions: Card Maker, Daad, Recite, Shuffle */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            
            {/* Write Reflection on this Sher */}
            {onOpenReflectionsWithSher && (
              <button
                onClick={() => onOpenReflectionsWithSher(sher)}
                className="px-3 py-2 rounded-xl bg-stone-900/90 hover:bg-amber-950/80 border border-amber-800/50 hover:border-amber-500 text-amber-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Write a personal reflection on how this verse moved your soul (اس شعر پر تاثرات لکھیں)"
              >
                <Feather className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">تاثرات لکھیں</span>
              </button>
            )}

            {/* Create Picture Card in Card Studio */}
            <button
              onClick={() => onOpenCardStudioWithSher(sher)}
              className="px-3 py-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-amber-900/60 hover:border-amber-600 text-amber-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Design and download an image card"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">کارڈ بنائیں</span>
            </button>

            {/* Express Daad */}
            <button
              onClick={handleDaad}
              className="px-3 py-2 rounded-xl bg-amber-950/70 hover:bg-amber-900/90 border border-amber-700/60 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Give Daad (واہ واہ!)"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>داد دیں</span>
            </button>

            {/* Audio Recitation */}
            <button
              onClick={handleRecite}
              disabled={isReciting}
              className={`p-2 rounded-xl border border-stone-800 text-stone-300 hover:text-amber-300 hover:bg-stone-800 transition-colors ${
                isReciting ? 'text-amber-400 animate-pulse border-amber-600' : ''
              }`}
              title="Recite verse aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Bookmark / Favorite */}
            <button
              onClick={() => onToggleFavorite(sher)}
              className={`p-2 rounded-xl border border-stone-800 transition-colors ${
                isFavorite(sher.id)
                  ? 'text-rose-500 border-rose-800/80 bg-rose-950/30'
                  : 'text-stone-400 hover:text-rose-400 hover:bg-stone-800'
              }`}
              title="Save to Favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite(sher.id) ? 'fill-rose-500' : ''}`} />
            </button>

            {/* Shuffle / Random Sher */}
            <button
              onClick={handleRandomSher}
              className="p-2 rounded-xl border border-stone-800 text-stone-300 hover:text-amber-300 hover:bg-stone-800 transition-colors"
              title="Random Couplet (نیا شعر)"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* Copy Feedback notification */}
        {copyFeedbackText && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-600/80 text-emerald-200 text-xs text-center flex items-center justify-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{copyFeedbackText}</span>
          </div>
        )}

        {/* Non-daily alert to restore today's sher */}
        {!isOfficialDaily && (
          <div className="mt-3 text-center">
            <button
              onClick={handleRestoreDaily}
              className="text-[11px] text-amber-400/80 hover:text-amber-300 underline font-mono"
            >
              ↩ آج کا سرکاری شعرِ روزانہ دیکھیں (Return to Today's Couplet)
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
