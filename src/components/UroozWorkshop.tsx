import React, { useState } from 'react';
import { Sparkles, Search, BookOpen, Layers, Feather, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { generatePoeticTashreeh, findQafiaAndRadif, TashreehResult, RhymeRecommendation } from '../services/geminiService';

interface UroozWorkshopProps {
  fontPreference: string;
}

export const UroozWorkshop: React.FC<UroozWorkshopProps> = ({ fontPreference }) => {
  const [activeTab, setActiveTab] = useState<'tashreeh' | 'qafia' | 'urooz-guide'>('tashreeh');

  // Tashreeh state
  const [tashreehM1, setTashreehM1] = useState('دلِ ناداں تجھے ہوا کیا ہے');
  const [tashreehM2, setTashreehM2] = useState('آخر اس درد کی دوا کیا ہے');
  const [tashreehPoet, setTashreehPoet] = useState('مرزا غالب');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<TashreehResult | null>(null);

  // Qafia state
  const [baseWord, setBaseWord] = useState('بہار');
  const [themeInput, setThemeInput] = useState('Ishq & Nature');
  const [isFindingRhyme, setIsFindingRhyme] = useState(false);
  const [rhymeResult, setRhymeResult] = useState<RhymeRecommendation | null>(null);

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const handleRunTashreeh = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tashreehM1.trim() || !tashreehM2.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await generatePoeticTashreeh(tashreehM1, tashreehM2, tashreehPoet);
      setAnalysisResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRunQafia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseWord.trim()) return;
    setIsFindingRhyme(true);
    try {
      const res = await findQafiaAndRadif(baseWord, themeInput);
      setRhymeResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFindingRhyme(false);
    }
  };

  const classicalBahoor = [
    {
      name: 'بحرِ ہزج (Bahr-e-Hazaj)',
      arkaan: 'مَفَاعِیْلُنْ مَفَاعِیْلُنْ مَفَاعِیْلُنْ مَفَاعِیْلُنْ',
      cadence: 'U - - - | U - - - | U - - - | U - - -',
      example: 'دلِ ناداں تجھے ہوا کیا ہے / آخر اس درد کی دوا کیا ہے (مسدس محذوف)',
      mood: 'Lyrical, emotionally intimate, conversational, romantic'
    },
    {
      name: 'بحرِ رمل (Bahr-e-Ramal)',
      arkaan: 'فَاعِلَاتُنْ فَاعِلَاتُنْ فَاعِلَاتُنْ فَاعِلُنْ',
      cadence: '- U - - | - U - - | - U - - | - U -',
      example: 'ستاروں سے آگے جہاں اور بھی ہیں / ابھی عشق کے امتحاں اور بھی ہیں',
      mood: 'Majestic, soaring, grand, contemplative'
    },
    {
      name: 'بحرِ متقارب (Bahr-e-Mutaqarib)',
      arkaan: 'فَعُوْلُنْ فَعُوْلُنْ فَعُوْلُنْ فَعُوْلُنْ',
      cadence: 'U - - | U - - | U - - | U - -',
      example: 'شہنامہ فردوسی اور اکثر سحر انگیز داستانیں اسی بحر میں ہیں',
      mood: 'Epic, swift, galloping, energetic storytelling'
    },
    {
      name: 'بحرِ رجز (Bahr-e-Rajaz)',
      arkaan: 'مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ',
      cadence: '- - U - | - - U - | - - U - | - - U -',
      example: 'کلاسیکی مرثیہ نگاری اور رجز خوانی کا مخصوص ترنم',
      mood: 'Martial, bold, declamatory, resolute'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-medium mb-1">
          <BookOpen className="w-4 h-4" />
          <span>علمِ عروض، اوزان و تشریح</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-stone-100 font-normal">
          کارگاہِ سخن — Poetic Prosody & Tashreeh Studio
        </h2>
        <p className="text-stone-400 text-sm mt-1 max-w-3xl">
          Deep literary analysis of classical verses, rhyming dictionary (Qafia & Radif finder), and guides to the rhythmic meters (Bahoor) of Urdu poetry.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-stone-800 pb-3">
        <button
          onClick={() => setActiveTab('tashreeh')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'tashreeh'
              ? 'bg-amber-800 text-amber-100 shadow-md border border-amber-600/50'
              : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-nastaliq text-base leading-none">ادبی تشریح و تجزیہ</span>
          <span className="text-xs text-stone-400 hidden sm:inline">(Tashreeh Studio)</span>
        </button>

        <button
          onClick={() => setActiveTab('qafia')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'qafia'
              ? 'bg-amber-800 text-amber-100 shadow-md border border-amber-600/50'
              : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          <Search className="w-4 h-4 text-amber-400" />
          <span className="font-nastaliq text-base leading-none">قافیہ و ردیف شناسی</span>
          <span className="text-xs text-stone-400 hidden sm:inline">(Rhyme Finder)</span>
        </button>

        <button
          onClick={() => setActiveTab('urooz-guide')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'urooz-guide'
              ? 'bg-amber-800 text-amber-100 shadow-md border border-amber-600/50'
              : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="font-nastaliq text-base leading-none">علمِ عروض و اوزان</span>
          <span className="text-xs text-stone-400 hidden sm:inline">(Prosody Guide)</span>
        </button>
      </div>

      {/* 1. TASHREEH STUDIO */}
      {activeTab === 'tashreeh' && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form (5 cols) */}
          <div className="lg:col-span-5 bg-stone-900/80 border border-stone-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
              <Feather className="w-4 h-4" />
              <span>شعر کا تجزیہ کریں (Enter Couplet)</span>
            </h3>

            <form onSubmit={handleRunTashreeh} className="space-y-4">
              <div>
                <label className="block text-xs text-stone-400 mb-1 text-right font-nastaliq">مصرعِ اوّل</label>
                <input
                  type="text"
                  dir="rtl"
                  value={tashreehM1}
                  onChange={(e) => setTashreehM1(e.target.value)}
                  className={`w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-2 text-base text-amber-100 ${fontClass} focus:outline-none`}
                />
              </div>

              <div>
                <label className="block text-xs text-stone-400 mb-1 text-right font-nastaliq">مصرعِ ثانی</label>
                <input
                  type="text"
                  dir="rtl"
                  value={tashreehM2}
                  onChange={(e) => setTashreehM2(e.target.value)}
                  className={`w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-2 text-base text-amber-200 ${fontClass} focus:outline-none`}
                />
              </div>

              <div>
                <label className="block text-xs text-stone-400 mb-1">شاعر (Poet)</label>
                <input
                  type="text"
                  value={tashreehPoet}
                  onChange={(e) => setTashreehPoet(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? 'تجزیہ و تشریح جاری ہے...' : 'تشریح حاصل کریں (Generate Tashreeh)'}</span>
              </button>
            </form>
          </div>

          {/* Result Display (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {!analysisResult && !isAnalyzing ? (
              <div className="p-12 text-center bg-stone-900/40 rounded-2xl border border-dashed border-stone-800">
                <Sparkles className="w-8 h-8 text-amber-500/50 mx-auto mb-3" />
                <h4 className="font-nastaliq text-2xl text-amber-300/80 mb-2">ادبی تشریح و بلاغت کا آئینہ</h4>
                <p className="text-stone-400 text-xs max-w-md mx-auto">
                  Click "Generate Tashreeh" to uncover philosophical layers, literary devices, and prosodic nuances of the verse.
                </p>
              </div>
            ) : isAnalyzing ? (
              <div className="p-12 text-center bg-stone-900/40 rounded-2xl border border-amber-900/40 animate-pulse">
                <p className="font-nastaliq text-2xl text-amber-300 mb-2">کلام کا نقد و تجزیہ جاری ہے...</p>
                <p className="text-stone-400 text-xs">Unraveling metaphors, meter, and philosophical context...</p>
              </div>
            ) : (
              analysisResult && (
                <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/20 border-2 border-amber-800/60 rounded-2xl p-6 sm:p-8 space-y-6 gold-glow animate-fade-in">
                  
                  {/* Urdu Tashreeh */}
                  <div className="pb-4 border-b border-stone-800">
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-2">
                      اردو شرح و مفہوم (Literary Urdu Tashreeh)
                    </span>
                    <p dir="rtl" className="font-nastaliq text-base sm:text-lg text-amber-100 leading-loose text-right">
                      {analysisResult.urduTashreeh}
                    </p>
                  </div>

                  {/* English Analysis */}
                  <div className="pb-4 border-b border-stone-800">
                    <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold block mb-2">
                      English Literary Analysis & Metaphoric Subtext
                    </span>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                      {analysisResult.englishTashreeh}
                    </p>
                  </div>

                  {/* Meter & Rhyme */}
                  <div className="pb-4 border-b border-stone-800">
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-2">
                      وزن، بحر اور صوتی آہنگ (Meter Analysis)
                    </span>
                    <p className="text-xs sm:text-sm text-amber-200 font-mono">
                      {analysisResult.poeticMeterAnalysis}
                    </p>
                  </div>

                  {/* Detected Devices & Philosophy */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                      <span className="text-xs text-stone-400 font-semibold block mb-2">
                        صنائع و بدائع (Poetic Devices Detected)
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.poeticDevices.map((d, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800/50 text-[11px] text-amber-300 font-nastaliq"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                      <span className="text-xs text-stone-400 font-semibold block mb-1">
                        فلسفیانہ پس منظر (Philosophy)
                      </span>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {analysisResult.philosophicalContext}
                      </p>
                    </div>
                  </div>

                </div>
              )
            )}
          </div>

        </div>
      )}

      {/* 2. QAFIA & RADIF FINDER */}
      {activeTab === 'qafia' && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 bg-stone-900/80 border border-stone-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>ہم قافیہ الفاظ تلاش کریں (Find Rhymes)</span>
            </h3>

            <form onSubmit={handleRunQafia} className="space-y-4">
              <div>
                <label className="block text-xs text-stone-400 mb-1 text-right font-nastaliq">
                  بنیادی لفظ (مثال: بہار، وفا، دل، خواب، نشاں)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={baseWord}
                  onChange={(e) => setBaseWord(e.target.value)}
                  className={`w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-2 text-xl text-amber-200 ${fontClass} focus:outline-none`}
                />
              </div>

              <div>
                <label className="block text-xs text-stone-400 mb-1">موضوع (Theme Context)</label>
                <input
                  type="text"
                  value={themeInput}
                  onChange={(e) => setThemeInput(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-stone-300 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isFindingRhyme}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{isFindingRhyme ? 'تلاش جاری ہے...' : 'ہم قافیہ الفاظ دریافت کریں'}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7">
            {rhymeResult ? (
              <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
                    لفظ "{baseWord}" کے ہم قافیہ الفاظ (Qafia Words)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {rhymeResult.qafiaWords.map((q, qIdx) => (
                      <div
                        key={qIdx}
                        className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-nastaliq text-2xl text-amber-300 leading-none pb-1">{q.urdu}</p>
                          <p className="text-xs text-stone-400 font-serif italic">{q.roman}</p>
                        </div>
                        <span className="text-xs text-stone-300 font-sans text-right max-w-[140px]">{q.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {rhymeResult.radifSuggestions.length > 0 && (
                  <div className="pt-4 border-t border-stone-800">
                    <h4 className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2">
                      تجویز کردہ ردیفیں (Suggested Radif Phrases)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {rhymeResult.radifSuggestions.map((r, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-3 py-1 rounded-lg bg-amber-950/70 border border-amber-800/40 text-amber-300 font-nastaliq text-base"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-stone-800 p-4 rounded-xl bg-stone-950/60 text-xs text-stone-300 leading-relaxed">
                  <span className="text-amber-400 font-semibold block mb-1">عروضی رہنمائی:</span>
                  {rhymeResult.meterGuidance}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-stone-900/40 rounded-2xl border border-dashed border-stone-800">
                <Search className="w-8 h-8 text-amber-500/50 mx-auto mb-3" />
                <h4 className="font-nastaliq text-2xl text-amber-300/80 mb-2">قافیہ شناس</h4>
                <p className="text-stone-400 text-xs">
                  Enter a root word to instantly discover rhyming companions with meanings and radif ideas.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 3. UROOZ PROSODY GUIDE */}
      {activeTab === 'urooz-guide' && (
        <div className="mt-8 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/50 via-stone-900 to-amber-950/40 border border-amber-800/50">
            <h3 className="font-nastaliq text-2xl text-amber-200 mb-2">
              علمِ عروض کا تعارف اور تقطیع کے اصول
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
              علمِ عروض (Urdu Prosody) شاعری کے اوزان اور بحروں کی پہچان کا وہ فن ہے جس کی بنیاد خلیل ابن احمد الفراہیدی نے رکھی۔ اس میں کسی بھی شعر کے حروف کے صوتی تلفظ (حرکات و سکنات) کو ناپ کر بحر کے ارکان (جیسے فعولن، مفاعیلن، فاعلاتن) کے مطابق جانچا جاتا ہے۔
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classicalBahoor.map((bahr, bIdx) => (
              <div
                key={bIdx}
                className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 space-y-4 hover:border-amber-700/60 transition-all"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <h4 className="font-nastaliq text-2xl text-amber-300">{bahr.name}</h4>
                  <span className="text-xs font-mono text-stone-500">مقبول بحر</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-amber-900/30 text-center">
                  <span className="text-[10px] text-stone-500 uppercase block font-mono mb-1">ارکان و وزن (Scansion)</span>
                  <p className="font-nastaliq text-lg text-amber-200">{bahr.arkaan}</p>
                  <p className="font-mono text-xs text-amber-400/80 mt-1">{bahr.cadence}</p>
                </div>

                <div className="text-xs text-stone-300">
                  <span className="text-stone-500 block mb-1">نمونۂ کلام (Example Couplet):</span>
                  <p dir="rtl" className="font-nastaliq text-base text-stone-200 text-right leading-loose">
                    {bahr.example}
                  </p>
                </div>

                <div className="text-xs text-stone-400 pt-2 border-t border-stone-800/80">
                  <span className="text-amber-400 font-medium">شاعرانہ مزاج: </span>
                  {bahr.mood}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
