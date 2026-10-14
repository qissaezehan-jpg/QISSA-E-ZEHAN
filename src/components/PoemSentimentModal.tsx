import React, { useState } from 'react';
import { Poem, Poet, PoemSentimentAnalysis } from '../types/poetry';
import { getMoodVisualConfig, MoodVisualConfig } from '../utils/sentimentAnalysis';
import { analyzePoemSentiment } from '../services/geminiService';
import { 
  X, 
  Sparkles, 
  RefreshCw, 
  CloudRain, 
  Sun, 
  Heart, 
  Compass, 
  Flame, 
  Feather, 
  HeartCrack, 
  Clock, 
  Brain, 
  PenTool, 
  BookOpen, 
  TrendingUp, 
  CheckCircle2,
  Tag as TagIcon,
  Quote
} from 'lucide-react';

interface PoemSentimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  poem: Poem | null;
  poet?: Poet;
  sentiment: PoemSentimentAnalysis | null;
  onUpdateSentiment?: (newSentiment: PoemSentimentAnalysis) => void;
  onOpenReflectionsWithPoem?: (poem: Poem, moodSentiment?: PoemSentimentAnalysis) => void;
  fontPreference?: string;
}

export const PoemSentimentModal: React.FC<PoemSentimentModalProps> = ({
  isOpen,
  onClose,
  poem,
  poet,
  sentiment: initialSentiment,
  onUpdateSentiment,
  onOpenReflectionsWithPoem,
  fontPreference = 'nastaliq'
}) => {
  const [currentSentiment, setCurrentSentiment] = useState<PoemSentimentAnalysis | null>(initialSentiment);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisSuccess, setAnalysisSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync with prop when opened
  React.useEffect(() => {
    setCurrentSentiment(initialSentiment);
    setAnalysisSuccess(false);
    setErrorMessage(null);
  }, [initialSentiment, isOpen]);

  if (!isOpen || !poem || !currentSentiment) return null;

  const visualConfig: MoodVisualConfig = getMoodVisualConfig(currentSentiment.primaryMood);

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const renderMoodIcon = (iconName: string, iconClass: string) => {
    switch (iconName) {
      case 'CloudRain':
        return <CloudRain className={iconClass} />;
      case 'Sun':
        return <Sun className={iconClass} />;
      case 'Heart':
        return <Heart className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Feather':
        return <Feather className={iconClass} />;
      case 'HeartCrack':
        return <HeartCrack className={iconClass} />;
      case 'Clock':
        return <Clock className={iconClass} />;
      case 'Sparkles':
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const handleReanalyze = async () => {
    if (!poem || isAnalyzing) return;
    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisSuccess(false);

    try {
      const updated = await analyzePoemSentiment(poem, poet?.nameEnglish, poet?.nameUrdu);
      setCurrentSentiment(updated);
      if (onUpdateSentiment) {
        onUpdateSentiment(updated);
      }
      setAnalysisSuccess(true);
      setTimeout(() => setAnalysisSuccess(false), 4000);
    } catch (err: any) {
      console.error('Re-analysis error:', err);
      setErrorMessage('تجزیہ میں عارضی رکاوٹ پیش آئی۔ محفوظ شدہ بنیادی کیفیات برقرار ہیں۔');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOpenReflection = () => {
    if (onOpenReflectionsWithPoem && poem) {
      onOpenReflectionsWithPoem(poem, currentSentiment);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#090909] border-2 border-stone-800 hover:border-amber-600/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto transition-all">
        
        {/* Top Gradient Banner */}
        <div className={`p-6 border-b border-stone-850 relative bg-gradient-to-r from-black via-[#111111] to-black`}>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-100 border border-stone-800 transition-colors z-10"
            title="Close (بند کریں)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* AI Header Tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-[11px] font-sans font-medium">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>AI جذباتی کیفیت و نفسیات (Emotional Sentiment Analysis)</span>
            </span>
            <span className="text-[10px] text-stone-500 font-mono hidden sm:inline">
              gemini-3.8-flash
            </span>
          </div>

          {/* Poem & Poet Heading */}
          <div className="pr-10">
            <h2 className="font-nastaliq text-2xl sm:text-3xl text-amber-100 leading-relaxed text-right" dir="rtl">
              {poem.titleUrdu}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-serif italic mt-0.5">
              {poem.title} — <span className="text-amber-400 font-medium">{poet?.nameEnglish || poem.poetId}</span> {poet?.nameUrdu && `(${poet.nameUrdu})`}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Main Visual Mood Card */}
          <div className={`p-5 rounded-2xl border ${visualConfig.bgClass} ${visualConfig.borderClass} ${visualConfig.glowClass} relative overflow-hidden transition-all`}>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Left: Icon & Mood Name */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-black/60 border ${visualConfig.borderClass} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  {renderMoodIcon(visualConfig.iconName, `w-7 h-7 ${visualConfig.textClass}`)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-stone-400 font-sans">
                      مرکزی کیفیت (Primary Mood)
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/50 ${visualConfig.textClass} border ${visualConfig.borderClass}`}>
                      {currentSentiment.confidenceScore}% یقین (Confidence)
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mt-1">
                    <h3 className={`text-2xl font-bold font-sans ${visualConfig.textClass}`}>
                      {currentSentiment.primaryMood}
                    </h3>
                    <span className="font-nastaliq text-xl text-stone-200">
                      {currentSentiment.primaryMoodUrdu || visualConfig.labelUrdu}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Emotional Valence Pill */}
              <div className="flex flex-col sm:items-end">
                <span className="text-[11px] text-stone-400 font-sans">جذباتی رخ (Emotional Valence)</span>
                <span className="mt-1 px-3 py-1 rounded-full bg-black/60 border border-stone-700/60 text-xs font-semibold text-stone-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: visualConfig.colorHex }} />
                  <span>{currentSentiment.emotionalValence}</span>
                  <span className="font-nastaliq text-stone-300">({currentSentiment.emotionalValenceUrdu})</span>
                </span>
              </div>

            </div>

            {/* Mood Short Descriptions */}
            <div className="mt-4 pt-3 border-t border-stone-850/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <p className="text-stone-300/90 font-sans leading-relaxed">
                {visualConfig.shortDescription}
              </p>
              <p className="font-nastaliq text-stone-300 text-sm leading-relaxed text-right" dir="rtl">
                {visualConfig.shortDescriptionUrdu}
              </p>
            </div>

            {/* Confidence Gauge Bar */}
            <div className="mt-3">
              <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden border border-stone-800">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ 
                    width: `${currentSentiment.confidenceScore}%`,
                    backgroundColor: visualConfig.colorHex 
                  }}
                />
              </div>
            </div>

          </div>

          {/* Secondary Mood & Tone Arc Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Secondary Mood Card */}
            <div className="p-4 rounded-xl bg-black border border-stone-850">
              <div className="flex items-center gap-2 text-stone-400 text-xs font-sans mb-1.5">
                <Brain className="w-3.5 h-3.5 text-amber-400" />
                <span>ثانوی کیفیت (Secondary Emotional Layer)</span>
              </div>
              <p className="text-stone-100 font-medium text-sm">
                {currentSentiment.secondaryMood || 'Poetic Undertone'}
              </p>
              {currentSentiment.secondaryMoodUrdu && (
                <p className="font-nastaliq text-amber-200/90 text-sm mt-0.5" dir="rtl">
                  {currentSentiment.secondaryMoodUrdu}
                </p>
              )}
            </div>

            {/* Emotional Arc / Tone Journey */}
            <div className="p-4 rounded-xl bg-black border border-stone-850">
              <div className="flex items-center gap-2 text-stone-400 text-xs font-sans mb-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>جذباتی ارتقاء و سفر (Tone Arc)</span>
              </div>
              <p className="text-stone-300 text-xs font-sans leading-relaxed">
                {currentSentiment.toneArc}
              </p>
              {currentSentiment.toneArcUrdu && (
                <p className="font-nastaliq text-stone-300 text-xs leading-relaxed mt-1 text-right" dir="rtl">
                  {currentSentiment.toneArcUrdu}
                </p>
              )}
            </div>

          </div>

          {/* Key Emotive Keywords (الفاظِ جذبات) */}
          {currentSentiment.keyEmotiveKeywords && currentSentiment.keyEmotiveKeywords.length > 0 && (
            <div className="p-4 rounded-xl bg-black border border-stone-850">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-stone-400 text-xs font-sans">
                  <TagIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>کلیدی الفاظِ جذبات (Key Emotive Lexicon)</span>
                </div>
                <span className="text-[10px] text-stone-500 font-sans">
                  اشعار میں سے جذباتی اثر رکھنے والے الفاظ
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {currentSentiment.keyEmotiveKeywords.map((word, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-amber-200 text-sm font-nastaliq shadow-sm hover:border-amber-600/50 transition-colors"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI Scholarly & Psychological Insight Note */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-stone-950 via-black to-stone-950 border border-stone-850">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-sans font-medium mb-2">
              <Quote className="w-3.5 h-3.5" />
              <span>ادبی و نفسیاتی نکتہ (AI Literary Insight Note)</span>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed mb-2.5">
              {currentSentiment.aiInsightNote}
            </p>

            <p className="font-nastaliq text-stone-200 text-sm sm:text-base leading-relaxed text-right border-t border-stone-850 pt-2" dir="rtl">
              {currentSentiment.aiInsightNoteUrdu}
            </p>
          </div>

          {/* Success or Error banners */}
          {analysisSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Gemini 3.8 Flash نے کلام کے تازہ ترین اشعار کا جذباتی و نفسیاتی تجزیہ کامیابی سے مکمل کر لیا ہے۔</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs">
              {errorMessage}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-black border-t border-stone-850 flex flex-wrap items-center justify-between gap-3">
          
          {/* Re-analyze with Gemini button */}
          <button
            type="button"
            onClick={handleReanalyze}
            disabled={isAnalyzing}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
              isAnalyzing
                ? 'bg-stone-900 border-stone-800 text-stone-500 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-amber-950/80 border-stone-800 hover:border-amber-600/60 text-stone-200 hover:text-amber-200 shadow-md'
            }`}
            title="Perform fresh real-time emotional analysis with Gemini 3.8 Flash"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'تجزیہ ہو رہا ہے...' : 'Gemini AI سے دوبارہ تجزیہ کریں'}</span>
          </button>

          {/* Action buttons on the right */}
          <div className="flex items-center gap-2">
            {onOpenReflectionsWithPoem && (
              <button
                type="button"
                onClick={handleOpenReflection}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-black/80 transition-all border border-amber-400/60"
                title="Write a personal journal entry about how this mood touched your soul"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span className="font-nastaliq text-xs">اس کیفیت پر روزنامچہ لکھیں</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-stone-100 text-xs font-sans transition-colors border border-stone-800"
            >
              بند کریں (Close)
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
