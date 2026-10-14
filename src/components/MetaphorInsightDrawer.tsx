import React, { useState, useEffect } from 'react';
import { Poem, Poet, MetaphoricalInsightResult, MetaphorSymbolItem } from '../types/poetry';
import { generateMetaphoricalInsight } from '../services/geminiService';
import { 
  Sparkles, 
  X, 
  RotateCw, 
  Copy, 
  Check, 
  BookOpen, 
  Feather, 
  Compass, 
  Layers, 
  HelpCircle, 
  Volume2, 
  ExternalLink,
  ChevronRight,
  Flame,
  ArrowRight,
  Eye,
  Scroll,
  Info
} from 'lucide-react';
import { ambienceEngine } from '../utils/audioAmbience';

interface MetaphorInsightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  poem: Poem | null;
  poet: Poet | undefined;
  fontPreference: string;
  onJumpToCouplet?: (index: number) => void;
}

export const MetaphorInsightDrawer: React.FC<MetaphorInsightDrawerProps> = ({
  isOpen,
  onClose,
  poem,
  poet,
  fontPreference,
  onJumpToCouplet
}) => {
  const [insight, setInsight] = useState<MetaphoricalInsightResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'urdu' | 'english'>('all');
  const [selectedSymbolIndex, setSelectedSymbolIndex] = useState<number | null>(null);
  const [expandedCoupletIndex, setExpandedCoupletIndex] = useState<number | null>(null);
  const [speakingSection, setSpeakingSection] = useState<string | null>(null);

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  // Load insight when drawer opens or poem changes
  useEffect(() => {
    if (isOpen && poem) {
      loadInsight();
    }
  }, [isOpen, poem?.id]);

  const loadInsight = async () => {
    if (!poem) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateMetaphoricalInsight(
        poem,
        poet?.nameEnglish,
        poet?.nameUrdu
      );
      setInsight(result);
    } catch (err: any) {
      console.error('Failed to generate metaphorical insight:', err);
      setError(err?.message || 'تجزیہ حاصل کرنے میں دشواری پیش آئی۔');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyInsight = () => {
    if (!insight || !poem) return;
    const textToCopy = `=== بصیرتِ استعارہ (Metaphorical Insight) ===
کلام: ${poem.titleUrdu} (${poem.title})
شاعر: ${poet?.nameUrdu || ''} (${poet?.nameEnglish || ''})

[تمثیلی محور / Central Allegory]
${insight.centralAllegoryUrdu}
${insight.centralAllegoryEnglish}

[کلیدی علامات و استعارات / Key Archetypes]
${insight.primaryArchetypes.map(a => `• ${a.symbolUrdu} (${a.symbolRoman}): ${a.metaphoricalMeaningUrdu} | ${a.metaphoricalMeaningEnglish}`).join('\n')}

[عرفانی و فلسفیانہ پیغام / Philosophical Subtext]
${insight.philosophicalSubtextUrdu}
${insight.philosophicalSubtextEnglish}

[نکتۂ تفکر / Reflective Takeaway]
"${insight.reflectiveTakeaway}"

تجزیہ کار: Qissa-e-Zehan (Powered by Gemini AI)`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSpeakText = (text: string, sectionId: string, lang: 'ur' | 'en' = 'ur') => {
    if (speakingSection === sectionId) {
      ambienceEngine.stopRecitation();
      setSpeakingSection(null);
      return;
    }

    setSpeakingSection(sectionId);
    ambienceEngine.reciteWithEvents({
      text,
      lang,
      rate: 0.84,
      onEnd: () => setSpeakingSection(null),
      onError: () => setSpeakingSection(null)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-y-0 right-0 z-40 w-full max-w-xl md:max-w-2xl bg-[#080705] border-l-2 border-amber-600/50 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      
      {/* Drawer Header */}
      <div className="bg-gradient-to-r from-[#140f09] via-[#1c140b] to-[#120e08] p-4 sm:p-5 border-b border-amber-900/50 relative">
        <div className="flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-600/60 flex items-center justify-center text-amber-300 shadow-md">
              <Eye className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-nastaliq text-lg sm:text-xl text-amber-200 font-bold leading-tight">
                  بصیرتِ استعارہ
                </h3>
                <span className="text-[11px] font-sans font-semibold tracking-wider text-amber-400/90 uppercase px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-800/60 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Gemini Insight
                </span>
              </div>
              <p className="text-xs text-stone-400 font-serif italic">
                Metaphorical & Symbolic Hermeneutics
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1.5">
            {insight && (
              <button
                onClick={handleCopyInsight}
                className="p-2 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-700/60 text-stone-400 hover:text-amber-200 transition-colors"
                title="Copy Full Metaphorical Insight"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={loadInsight}
              disabled={loading}
              className={`p-2 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-700/60 text-stone-400 hover:text-amber-200 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Re-analyze with Gemini API"
            >
              <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-rose-800 text-stone-400 hover:text-rose-300 transition-colors"
              title="Close Drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Language Focus Tabs */}
        <div className="mt-3 pt-3 border-t border-amber-900/30 flex items-center justify-between gap-2">
          <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
            <Scroll className="w-3.5 h-3.5 text-amber-500" />
            <span>کلام: <strong className="text-stone-200">{poem?.title}</strong></span>
          </div>

          <div className="flex items-center gap-1 bg-stone-950/80 p-0.5 rounded-lg border border-stone-800/80 text-[11px]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2 py-0.5 rounded-md transition-colors ${activeTab === 'all' ? 'bg-amber-700/80 text-amber-100 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            >
              جامع (All)
            </button>
            <button
              onClick={() => setActiveTab('urdu')}
              className={`px-2 py-0.5 rounded-md transition-colors ${activeTab === 'urdu' ? 'bg-amber-700/80 text-amber-100 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            >
              اردو بصیرت
            </button>
            <button
              onClick={() => setActiveTab('english')}
              className={`px-2 py-0.5 rounded-md transition-colors ${activeTab === 'english' ? 'bg-amber-700/80 text-amber-100 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Body Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gradient-to-b from-[#0a0805] via-[#080705] to-[#040403]">
        
        {/* Loading State */}
        {loading && (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-amber-600/30 border-t-amber-400 animate-spin flex items-center justify-center" />
              <div className="absolute inset-0 flex items-center justify-center text-amber-400">
                <Feather className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <h4 className="font-nastaliq text-xl text-amber-200 font-bold">
                تحلیلِ استعارات و رموز جاری ہے...
              </h4>
              <p className="text-xs text-stone-400 font-sans mt-1">
                Gemini 3.8 Flash is deciphering classical metaphors, archetypes, and poetic allegories.
              </p>
            </div>
            <div className="max-w-xs text-[11px] text-stone-500 italic">
              "استعارہ محض لفظ کا التباس نہیں، بلکہ باطن کی کھلی کھڑکی ہے۔"
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && !insight && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-200">
              <Info className="w-4 h-4" />
              <span>تجزیہ میں رکاوٹ</span>
            </div>
            <p>{error}</p>
            <button
              onClick={loadInsight}
              className="px-3 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-white font-medium text-xs mt-2"
            >
              دوبارہ کوشش کریں (Retry)
            </button>
          </div>
        )}

        {/* Insight Content */}
        {!loading && insight && (
          <>
            {/* 1. CENTRAL ALLEGORY (تمثیلی محور) */}
            <div className="rounded-2xl bg-gradient-to-br from-[#18120b] via-[#120e08] to-[#0a0805] border-2 border-amber-600/40 p-5 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 text-xs font-nastaliq">
                    تمثیلی محور و اساس
                  </span>
                  <span className="text-xs text-stone-400 font-sans hidden sm:inline">
                    Central Allegorical Core
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSpeakText(insight.centralAllegoryUrdu, 'central-allegory')}
                    className={`p-1.5 rounded-lg border text-xs transition-colors ${
                      speakingSection === 'central-allegory' 
                        ? 'bg-amber-600 border-amber-400 text-stone-950 font-bold' 
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-amber-300'
                    }`}
                    title="Listen to explanation (سنیں)"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Urdu Allegory */}
              {(activeTab === 'all' || activeTab === 'urdu') && (
                <p 
                  dir="rtl" 
                  className={`${fontClass} text-base sm:text-lg text-amber-100 leading-relaxed text-right font-medium mb-3`}
                >
                  {insight.centralAllegoryUrdu}
                </p>
              )}

              {/* English Allegory */}
              {(activeTab === 'all' || activeTab === 'english') && (
                <div className={`text-xs sm:text-sm text-stone-300 font-serif leading-relaxed italic ${activeTab === 'all' ? 'pt-3 border-t border-amber-900/30' : ''}`}>
                  "{insight.centralAllegoryEnglish}"
                </div>
              )}

              {insight.dominantTheme && (
                <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center gap-2 text-xs">
                  <span className="text-stone-500">موضوعی پہلو:</span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-amber-300 font-nastaliq text-sm">
                    {insight.dominantTheme}
                  </span>
                </div>
              )}
            </div>

            {/* 2. PRIMARY ARCHETYPES & SYMBOLS (کلیدی علامات و استعارات) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>کلیدی استعارات و علامات (Poetic Archetypes)</span>
                </h4>
                <span className="text-[11px] text-stone-500">
                  {insight.primaryArchetypes.length} علامات دریافت ہوئیں
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {insight.primaryArchetypes.map((symbol, idx) => {
                  const isSelected = selectedSymbolIndex === idx;
                  const categoryBadgeColor = 
                    symbol.category === 'mystical' ? 'bg-purple-950/80 border-purple-800/60 text-purple-300' :
                    symbol.category === 'sociopolitical' ? 'bg-red-950/80 border-red-800/60 text-red-300' :
                    symbol.category === 'romantic' ? 'bg-rose-950/80 border-rose-800/60 text-rose-300' :
                    symbol.category === 'existential' ? 'bg-blue-950/80 border-blue-800/60 text-blue-300' :
                    'bg-amber-950/80 border-amber-800/60 text-amber-300';

                  const categoryLabelUrdu = 
                    symbol.category === 'mystical' ? 'تصوف و عرفان' :
                    symbol.category === 'sociopolitical' ? 'سیاسی و انقلابی' :
                    symbol.category === 'romantic' ? 'عشق و حسن' :
                    symbol.category === 'existential' ? 'وجود و حیات' :
                    'صنعتِ بیان';

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedSymbolIndex(isSelected ? null : idx)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#1a140d] border-amber-500 shadow-md ring-1 ring-amber-500/50'
                          : 'bg-stone-900/60 border-stone-800/80 hover:border-amber-700/60 hover:bg-stone-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-nastaliq text-base sm:text-lg text-amber-200 font-bold">
                            {symbol.symbolUrdu}
                          </span>
                          <span className="text-xs text-stone-400 font-serif italic">
                            ({symbol.symbolRoman})
                          </span>
                        </div>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${categoryBadgeColor}`}>
                          {categoryLabelUrdu}
                        </span>
                      </div>

                      <div className="text-[11px] text-stone-400 mb-1">
                        ظاہری معنی: <span className="text-stone-300 font-sans">{symbol.literalMeaning}</span>
                      </div>

                      {/* Deeper Meaning preview */}
                      {(activeTab === 'all' || activeTab === 'urdu') && (
                        <p dir="rtl" className={`${fontClass} text-xs text-amber-300 leading-relaxed mt-1 text-right`}>
                          {symbol.metaphoricalMeaningUrdu}
                        </p>
                      )}

                      {(activeTab === 'all' || activeTab === 'english') && (
                        <p className={`text-[11px] text-stone-300 font-serif italic leading-relaxed ${activeTab === 'all' ? 'mt-1' : ''}`}>
                          {symbol.metaphoricalMeaningEnglish}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. VERSE-BY-VERSE SYMBOLIC DECODING (اشعار کی علامتی تشریح) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>اشعار میں پوشیدہ علامتی رموز (Couplet-by-Couplet Subtext)</span>
                </h4>
                <span className="text-[11px] text-stone-500 font-mono">
                  {insight.coupletInsights.length} اشعار
                </span>
              </div>

              <div className="space-y-3">
                {insight.coupletInsights.map((cInsight, idx) => {
                  const isExpanded = expandedCoupletIndex === idx || expandedCoupletIndex === null;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-stone-900/50 border border-stone-800/90 hover:border-amber-900/60 transition-all space-y-2.5"
                    >
                      {/* Couplet Header */}
                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-amber-400 font-bold">شعر #{idx + 1}</span>
                          {cInsight.symbolsHighlighted && cInsight.symbolsHighlighted.length > 0 && (
                            <div className="flex items-center gap-1">
                              {cInsight.symbolsHighlighted.map((s, sIdx) => (
                                <span key={sIdx} className="px-1.5 py-0.2 rounded bg-amber-950/80 border border-amber-800/40 text-[10px] text-amber-300 font-nastaliq">
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {onJumpToCouplet && (
                          <button
                            onClick={() => onJumpToCouplet(idx)}
                            className="px-2 py-0.5 rounded-md bg-stone-950 border border-stone-800 hover:border-amber-600 text-[10px] text-stone-300 hover:text-amber-200 flex items-center gap-1 transition-colors"
                            title="Scroll to this verse in main modal"
                          >
                            <span>کلام میں دیکھیں</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Couplet Lines */}
                      <div className="text-center py-1 bg-black/40 rounded-lg p-2.5 border border-stone-800/60">
                        <p dir="rtl" className={`${fontClass} text-sm sm:text-base text-amber-100 leading-relaxed font-medium`}>
                          {cInsight.misra1}
                        </p>
                        <p dir="rtl" className={`${fontClass} text-sm sm:text-base text-amber-200 leading-relaxed font-medium mt-0.5`}>
                          {cInsight.misra2}
                        </p>
                      </div>

                      {/* Subtext Analysis */}
                      <div className="space-y-1.5 pt-1">
                        {(activeTab === 'all' || activeTab === 'urdu') && (
                          <div className="bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/40">
                            <span className="text-[10px] text-stone-400 block mb-0.5">باطنی و استعاراتی مفہوم:</span>
                            <p dir="rtl" className={`${fontClass} text-xs sm:text-sm text-stone-200 leading-relaxed text-right font-medium`}>
                              {cInsight.metaphoricalSubtextUrdu}
                            </p>
                          </div>
                        )}

                        {(activeTab === 'all' || activeTab === 'english') && (
                          <div className="text-xs text-stone-300 font-serif italic bg-stone-950/50 p-2.5 rounded-lg border border-stone-800/60">
                            <span className="text-[10px] text-stone-500 font-sans block not-italic mb-0.5">Allegorical Reading:</span>
                            "{cInsight.metaphoricalSubtextEnglish}"
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. LITERARY & RHETORICAL DEVICES (صنائع بدائع) */}
            {insight.literaryDevices && insight.literaryDevices.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5" />
                  <span>صنائع بدائع و محاسنِ کلام (Rhetorical Devices)</span>
                </h4>

                <div className="space-y-2">
                  {insight.literaryDevices.map((device, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-nastaliq text-sm text-amber-300 font-bold">
                          {device.deviceNameUrdu}
                        </span>
                        <span className="text-[11px] text-stone-400 font-serif italic">
                          {device.deviceNameEnglish}
                        </span>
                      </div>
                      <p className="text-stone-300 font-sans leading-relaxed text-[11px]">
                        {device.explanation}
                      </p>
                      {device.exampleFromPoem && (
                        <div className="pt-1 text-[11px] text-amber-200/90 font-nastaliq text-right" dir="rtl">
                          مثال: «{device.exampleFromPoem}»
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PHILOSOPHICAL SUBTEXT & REFLECTIVE TAKEAWAY */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1c1409] to-[#0c0905] border border-amber-600/40 text-xs space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>فلسفیانہ و وجودی پیام (Philosophical Subtext)</span>
                </span>
                <button
                  onClick={() => handleSpeakText(insight.philosophicalSubtextUrdu, 'philosophical-subtext')}
                  className="p-1 rounded-md text-stone-400 hover:text-amber-300"
                  title="Listen"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {(activeTab === 'all' || activeTab === 'urdu') && (
                <p dir="rtl" className={`${fontClass} text-sm text-stone-200 leading-relaxed text-right font-medium`}>
                  {insight.philosophicalSubtextUrdu}
                </p>
              )}

              {(activeTab === 'all' || activeTab === 'english') && (
                <p className="text-stone-300 font-serif italic leading-relaxed">
                  "{insight.philosophicalSubtextEnglish}"
                </p>
              )}

              {insight.reflectiveTakeaway && (
                <div className="pt-2 border-t border-amber-900/40 text-center">
                  <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                    نکتۂ غور و فکر • Contemplative Aphorism
                  </div>
                  <blockquote className="font-nastaliq text-base sm:text-lg text-amber-300 leading-relaxed font-semibold">
                    « {insight.reflectiveTakeaway} »
                  </blockquote>
                </div>
              )}
            </div>

            {/* Footer Attribution */}
            <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-2">
              <span className="flex items-center gap-1">
                <span>ماڈل:</span>
                <span className="text-amber-400 font-mono font-semibold">{insight.modelUsed || 'gemini-3.8-flash'}</span>
              </span>
              <span>قصۂ ذہن • ادبی و علامتی تجزیہ</span>
            </div>
          </>
        )}

      </div>

    </div>
  );
};
