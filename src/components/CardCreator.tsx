import React, { useState, useRef, useEffect } from 'react';
import { Download, Sparkles, Copy, Check, Palette, Type, RefreshCw, Feather } from 'lucide-react';
import { POETS } from '../data/poetsData';
import { FAMOUS_ASHAAR } from '../data/poetryDatabase';

interface CardCreatorProps {
  initialMisra1?: string;
  initialMisra2?: string;
  initialPoet?: string;
  initialTranslation?: string;
  fontPreference: string;
}

export const CardCreator: React.FC<CardCreatorProps> = ({
  initialMisra1 = 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
  initialMisra2 = 'بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
  initialPoet = 'مرزا اسد اللہ خاں غالب',
  initialTranslation = 'Thousands of desires, each so overpowering that every desire would take one’s breath away; countless were fulfilled, yet so few they still seem.',
  fontPreference
}) => {
  const [misra1, setMisra1] = useState(initialMisra1);
  const [misra2, setMisra2] = useState(initialMisra2);
  const [poetName, setPoetName] = useState(initialPoet);
  const [translation, setTranslation] = useState(initialTranslation);
  const [selectedTheme, setSelectedTheme] = useState<'gold' | 'midnight' | 'emerald' | 'crimson' | 'parchment'>('gold');
  const [selectedFont, setSelectedFont] = useState<'nastaliq' | 'gulzar' | 'amiri'>(fontPreference as 'nastaliq' | 'gulzar' | 'amiri');
  const [showTranslation, setShowTranslation] = useState(true);
  const [showOrnaments, setShowOrnaments] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<'square' | 'story' | 'landscape'>('square');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Update if props change
  useEffect(() => {
    if (initialMisra1) setMisra1(initialMisra1);
    if (initialMisra2) setMisra2(initialMisra2);
    if (initialPoet) setPoetName(initialPoet);
    if (initialTranslation) setTranslation(initialTranslation);
  }, [initialMisra1, initialMisra2, initialPoet, initialTranslation]);

  const themes = [
    {
      id: 'gold',
      name: 'Mughal Imperial Gold (شاہی زریں)',
      bgStart: '#140c02',
      bgEnd: '#291804',
      border: '#d97706',
      accent: '#fbbf24',
      textPrimary: '#fef3c7',
      textSecondary: '#d97706',
      subText: '#fde68a'
    },
    {
      id: 'midnight',
      name: 'Midnight Velvet (شبِ سیاہ)',
      bgStart: '#090d16',
      bgEnd: '#131b2e',
      border: '#38bdf8',
      accent: '#7dd3fc',
      textPrimary: '#f8fafc',
      textSecondary: '#38bdf8',
      subText: '#cbd5e1'
    },
    {
      id: 'emerald',
      name: 'Emerald Palace (زمردیں دیوان)',
      bgStart: '#04160d',
      bgEnd: '#092b1a',
      border: '#10b981',
      accent: '#34d399',
      textPrimary: '#ecfdf5',
      textSecondary: '#10b981',
      subText: '#a7f3d0'
    },
    {
      id: 'crimson',
      name: 'Rose & Wine (گل و بادہ)',
      bgStart: '#1b060d',
      bgEnd: '#330c19',
      border: '#f43f5e',
      accent: '#fb7185',
      textPrimary: '#fff1f2',
      textSecondary: '#f43f5e',
      subText: '#fecdd3'
    },
    {
      id: 'parchment',
      name: 'Antique Parchment (قدیم بیاض)',
      bgStart: '#f7f2e7',
      bgEnd: '#e6dcce',
      border: '#78350f',
      accent: '#92400e',
      textPrimary: '#1c1917',
      textSecondary: '#78350f',
      subText: '#44403c'
    }
  ];

  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0];

  // Draw on Canvas for download
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions based on aspect ratio
    let width = 1200;
    let height = 1200;
    if (aspectRatio === 'story') {
      width = 1080;
      height = 1920;
    } else if (aspectRatio === 'landscape') {
      width = 1600;
      height = 900;
    }

    canvas.width = width;
    canvas.height = height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, currentTheme.bgStart);
    grad.addColorStop(1, currentTheme.bgEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Borders
    if (showOrnaments) {
      ctx.strokeStyle = currentTheme.border;
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      ctx.strokeStyle = currentTheme.accent;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(55, 55, width - 110, height - 110);

      // Corner ornaments
      const corners = [
        [75, 75],
        [width - 75, 75],
        [75, height - 75],
        [width - 75, height - 75]
      ];
      ctx.fillStyle = currentTheme.accent;
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      corners.forEach(([cx, cy]) => {
        ctx.fillText('✤', cx, cy + 10);
      });
    }

    // Header Title
    ctx.fillStyle = currentTheme.textSecondary;
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('قصۂ ذہن — QISSA-E-ZEHAN', width / 2, 110);

    // Font selection for canvas text
    const fontName = selectedFont === 'nastaliq' 
      ? '"Noto Nastaliq Urdu", serif'
      : selectedFont === 'gulzar'
      ? '"Gulzar", serif'
      : '"Amiri", serif';

    // Center vertical spacing
    const centerY = height / 2;
    const fontSize = aspectRatio === 'story' ? 56 : 52;
    ctx.font = `${fontSize}px ${fontName}`;
    ctx.fillStyle = currentTheme.textPrimary;
    ctx.textAlign = 'center';
    ctx.direction = 'rtl';

    // Render Misra 1
    ctx.fillText(misra1, width / 2, centerY - (showTranslation ? 100 : 60));

    // Decorative divider
    ctx.direction = 'ltr';
    ctx.fillStyle = currentTheme.accent;
    ctx.font = '24px serif';
    ctx.fillText('✦  ✦  ✦', width / 2, centerY - (showTranslation ? 20 : 0));

    // Render Misra 2
    ctx.direction = 'rtl';
    ctx.font = `${fontSize}px ${fontName}`;
    ctx.fillStyle = currentTheme.accent;
    ctx.fillText(misra2, width / 2, centerY + (showTranslation ? 60 : 70));

    // Poet Attribution
    ctx.direction = 'rtl';
    ctx.font = `34px ${fontName}`;
    ctx.fillStyle = currentTheme.textSecondary;
    ctx.fillText(`— ${poetName}`, width / 2, centerY + (showTranslation ? 160 : 160));

    // English Translation
    if (showTranslation && translation) {
      ctx.direction = 'ltr';
      ctx.font = 'italic 24px "Playfair Display", Georgia, serif';
      ctx.fillStyle = currentTheme.subText;
      
      // Simple word wrap for translation
      const maxWidth = width - 240;
      const words = translation.split(' ');
      let line = '';
      let ty = centerY + 240;
      
      words.forEach(word => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== '') {
          ctx.fillText(`"${line.trim()}"`, width / 2, ty);
          line = word + ' ';
          ty += 34;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(`"${line.trim()}"`, width / 2, ty);
    }

    // Footer Watermark
    ctx.direction = 'ltr';
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = currentTheme.border;
    ctx.fillText('QISSA-E-ZEHAN • کلاسیکی شاعری، زندہ سوالات، وقت سے ماورا گفتگو', width / 2, height - 70);
  };

  useEffect(() => {
    renderCanvas();
  }, [misra1, misra2, poetName, translation, selectedTheme, selectedFont, showTranslation, showOrnaments, aspectRatio]);

  const handleDownload = () => {
    setIsExporting(true);
    renderCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;

    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `urdu-poetry-${poetName.replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setIsExporting(false);
    }, 150);
  };

  const handleCopyText = () => {
    const text = `${misra1}\n${misra2}\n\n— ${poetName}\n\n"${translation}"\n(قصۂ ذہن — QISSA-E-ZEHAN)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadRandomSher = () => {
    const random = FAMOUS_ASHAAR[Math.floor(Math.random() * FAMOUS_ASHAAR.length)];
    setMisra1(random.misra1);
    setMisra2(random.misra2);
    setPoetName(random.poet);
    setTranslation(random.translation);
  };

  const fontClass = 
    selectedFont === 'nastaliq' ? 'font-nastaliq' :
    selectedFont === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-medium mb-1">
            <Sparkles className="w-4 h-4" />
            <span>خوش خطی و کارڈ ساز</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-stone-100 font-normal">
            فنِ خطاطی کارڈ اسٹوڈیو — Urdu Poetry Card Studio
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Compose, stylize, and download high-resolution Urdu calligraphy cards for social media, lock screens, or personal diaries.
          </p>
        </div>

        <button
          onClick={loadRandomSher}
          className="self-start md:self-auto px-3.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-700/60 text-xs text-stone-300 hover:text-amber-300 flex items-center gap-2 transition-all shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>نیا شعر لوڈ کریں (Random Couplet)</span>
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Control Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Couplet Input Form */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
              <Feather className="w-4 h-4" />
              <span>شعر اور کلام درج کریں (Verse Editor)</span>
            </h3>

            <div>
              <label className="block text-xs text-stone-400 mb-1 text-right font-nastaliq">مصرعِ اوّل (First Line)</label>
              <input
                type="text"
                dir="rtl"
                value={misra1}
                onChange={(e) => setMisra1(e.target.value)}
                className={`w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-2 text-lg text-amber-100 focus:outline-none ${fontClass}`}
              />
            </div>

            <div>
              <label className="block text-xs text-stone-400 mb-1 text-right font-nastaliq">مصرعِ ثانی (Second Line)</label>
              <input
                type="text"
                dir="rtl"
                value={misra2}
                onChange={(e) => setMisra2(e.target.value)}
                className={`w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-2 text-lg text-amber-200 focus:outline-none ${fontClass}`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-stone-400 mb-1">شاعر (Poet Name)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={poetName}
                  onChange={(e) => setPoetName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-1.5 text-sm text-stone-200 focus:outline-none font-nastaliq"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-400 mb-1">اسلوب (Font Script)</label>
                <div className="flex bg-stone-950 border border-stone-700 rounded-xl p-0.5">
                  {(['nastaliq', 'gulzar', 'amiri'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFont(f)}
                      className={`flex-1 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                        selectedFont === f ? 'bg-amber-700 text-amber-100 font-bold' : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {f === 'nastaliq' ? 'نستعلیق' : f === 'gulzar' ? 'گلزار' : 'امیری'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-stone-400 mb-1">English Translation Subtitle</label>
              <textarea
                rows={2}
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl p-2.5 text-xs text-stone-300 focus:outline-none font-serif"
              />
            </div>
          </div>

          {/* Theme Palette Picker */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
              <Palette className="w-4 h-4" />
              <span>رنگ و وضع (Aesthetic Theme Palette)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id as typeof selectedTheme)}
                  style={{
                    background: `linear-gradient(135deg, ${t.bgStart}, ${t.bgEnd})`,
                    borderColor: selectedTheme === t.id ? t.border : 'rgba(255,255,255,0.1)'
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedTheme === t.id ? 'ring-2 ring-amber-500 shadow-md scale-102' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <p style={{ color: t.textPrimary }} className="font-medium text-xs">
                    {t.name}
                  </p>
                  <div className="flex gap-1.5 mt-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.accent }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.border }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.textPrimary }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Ratio & Card Toggles */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-300">نسبتِ حجم (Aspect Ratio):</span>
              <div className="flex bg-stone-950 border border-stone-800 rounded-lg p-0.5 text-xs">
                {(['square', 'story', 'landscape'] as const).map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-3 py-1 rounded capitalize transition-colors ${
                      aspectRatio === ratio ? 'bg-amber-800 text-amber-100' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {ratio === 'square' ? '1:1 Square' : ratio === 'story' ? '9:16 Story' : '16:9 Banner'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-800">
              <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOrnaments}
                  onChange={(e) => setShowOrnaments(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
                <span>تذہیب و نقاشی (Tezhib Border Ornaments)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTranslation}
                  onChange={(e) => setShowTranslation(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
                <span>Include English Translation</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Live Preview Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          <div className="w-full flex items-center justify-between mb-3 text-xs text-stone-400">
            <span>پیش نظارہ (Live High-Res Canvas Card)</span>
            <span>{aspectRatio.toUpperCase()} FORMAT</span>
          </div>

          {/* Interactive Live Card Display */}
          <div 
            style={{
              background: `linear-gradient(135deg, ${currentTheme.bgStart}, ${currentTheme.bgEnd})`,
              borderColor: currentTheme.border,
              aspectRatio: aspectRatio === 'square' ? '1/1' : aspectRatio === 'story' ? '9/16' : '16/9'
            }}
            className="w-full max-w-lg rounded-2xl border-2 p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 gold-glow"
          >
            {/* Tezhib ornaments in live DOM preview */}
            {showOrnaments && (
              <>
                <div 
                  style={{ borderColor: currentTheme.accent }}
                  className="absolute inset-3 border rounded-xl pointer-events-none opacity-60" 
                />
                <div style={{ color: currentTheme.accent }} className="absolute top-4 left-4 text-sm select-none">✤</div>
                <div style={{ color: currentTheme.accent }} className="absolute top-4 right-4 text-sm select-none">✤</div>
                <div style={{ color: currentTheme.accent }} className="absolute bottom-4 left-4 text-sm select-none">✤</div>
                <div style={{ color: currentTheme.accent }} className="absolute bottom-4 right-4 text-sm select-none">✤</div>
              </>
            )}

            {/* Header branding */}
            <div className="text-center">
              <span 
                style={{ color: currentTheme.textSecondary }}
                className="text-[10px] tracking-widest uppercase font-mono font-semibold"
              >
                قصۂ ذہن • QISSA-E-ZEHAN
              </span>
            </div>

            {/* Center Couplet Verses */}
            <div className="py-6 text-center my-auto">
              <p 
                dir="rtl"
                style={{ color: currentTheme.textPrimary }}
                className={`${fontClass} text-2xl sm:text-3xl leading-loose drop-shadow-md`}
              >
                {misra1}
              </p>

              <div className="my-2 flex items-center justify-center gap-2">
                <span style={{ color: currentTheme.accent }} className="text-xs">✦ ✦ ✦</span>
              </div>

              <p 
                dir="rtl"
                style={{ color: currentTheme.accent }}
                className={`${fontClass} text-2xl sm:text-3xl leading-loose drop-shadow-md`}
              >
                {misra2}
              </p>

              <p 
                dir="rtl"
                style={{ color: currentTheme.textSecondary }}
                className={`${fontClass} text-xl sm:text-2xl mt-4 font-semibold`}
              >
                — {poetName}
              </p>

              {showTranslation && translation && (
                <p 
                  style={{ color: currentTheme.subText }}
                  className="font-serif italic text-xs sm:text-sm mt-4 max-w-sm mx-auto leading-relaxed opacity-90"
                >
                  "{translation}"
                </p>
              )}
            </div>

            {/* Footer watermark */}
            <div className="text-center">
              <span 
                style={{ color: currentTheme.border }}
                className="text-[9px] uppercase tracking-widest font-mono opacity-80"
              >
                کلاسیکی شاعری، زندہ سوالات، وقت سے ماورا گفتگو
              </span>
            </div>
          </div>

          {/* Hidden Canvas used for high resolution rendering */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Action Export Buttons */}
          <div className="w-full max-w-lg mt-5 flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'تیار ہو رہا ہے...' : 'تصویر ڈاؤنلوڈ کریں (Download HD Card)'}</span>
            </button>

            <button
              onClick={handleCopyText}
              className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-sm font-medium flex items-center gap-2 transition-colors"
              title="Copy formatted verse to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copied ? 'کاپی ہو گیا!' : 'متن کاپی کریں'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
