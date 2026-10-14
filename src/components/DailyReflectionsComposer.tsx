import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Lock, 
  Heart, 
  Tag as TagIcon, 
  HelpCircle, 
  Check, 
  BookOpen, 
  Feather, 
  Smile, 
  CloudRain, 
  Compass, 
  Moon, 
  Flame, 
  Sun,
  Star,
  Quote
} from 'lucide-react';
import { DailyReflection, ReflectionMood } from '../types/poetry';
import { 
  REFLECTION_MOODS, 
  REFLECTIVE_PROMPTS, 
  MoodConfig, 
  getMoodConfig 
} from '../utils/reflectionsStorage';
import { ambienceEngine } from '../utils/audioAmbience';

interface DailyReflectionsComposerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: Omit<DailyReflection, 'id' | 'createdAt' | 'dateDisplay' | 'timeDisplay'>) => void;
  initialVerse?: {
    misra1: string;
    misra2: string;
    poet: string;
    poemTitle?: string;
    poemId?: string;
  };
  fontPreference?: string;
  editReflection?: DailyReflection | null;
  onUpdate?: (id: string, updates: Partial<DailyReflection>) => void;
}

const COMMON_TAGS = ['سکون', 'یادیں', 'تنہائی', 'محبت', 'غم', 'فلسفہ', 'امید', 'حیرت', 'شبِ تاریک', 'غالب', 'اقبال'];

export const DailyReflectionsComposer: React.FC<DailyReflectionsComposerProps> = ({
  isOpen,
  onClose,
  onSave,
  initialVerse,
  fontPreference = 'nastaliq',
  editReflection,
  onUpdate
}) => {
  const [misra1, setMisra1] = useState(initialVerse?.misra1 || 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے');
  const [misra2, setMisra2] = useState(initialVerse?.misra2 || 'بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے');
  const [poetName, setPoetName] = useState(initialVerse?.poet || 'مرزا اسد اللہ خاں غالب');
  const [poemTitle, setPoemTitle] = useState(initialVerse?.poemTitle || '');
  const [selectedMood, setSelectedMood] = useState<ReflectionMood>('sukoon');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>(['سکون']);
  const [newTagInput, setNewTagInput] = useState('');
  const [intensity, setIntensity] = useState<number>(4);
  const [activePromptIndex, setActivePromptIndex] = useState<number | null>(null);
  const [showPromptList, setShowPromptList] = useState(false);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  // Sync when initialVerse or editReflection changes
  useEffect(() => {
    if (editReflection) {
      setMisra1(editReflection.misra1);
      setMisra2(editReflection.misra2);
      setPoetName(editReflection.poetName);
      setPoemTitle(editReflection.poemTitle || '');
      setSelectedMood(editReflection.mood);
      setTitle(editReflection.title);
      setContent(editReflection.content);
      setTags(editReflection.tags || []);
      setIntensity(editReflection.intensity || 4);
    } else if (initialVerse) {
      setMisra1(initialVerse.misra1);
      setMisra2(initialVerse.misra2);
      setPoetName(initialVerse.poet);
      setPoemTitle(initialVerse.poemTitle || '');
      setTitle('');
      setContent('');
      setTags(['شعر', 'احساس']);
    }
  }, [initialVerse, editReflection, isOpen]);

  if (!isOpen) return null;

  const fontClass = fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const currentMoodConfig = getMoodConfig(selectedMood);

  const handleSelectPrompt = (prompt: typeof REFLECTIVE_PROMPTS[0], idx: number) => {
    setActivePromptIndex(idx);
    setShowPromptList(false);
    if (!title) {
      setTitle(prompt.urdu);
    }
    ambienceEngine.playDaadChime();
  };

  const handleAddTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim().replace(/^#/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const moodObj = getMoodConfig(selectedMood);

    if (editReflection && onUpdate) {
      onUpdate(editReflection.id, {
        misra1,
        misra2,
        poetName,
        poemTitle,
        mood: selectedMood,
        moodLabelUrdu: moodObj.labelUrdu,
        moodLabelEnglish: moodObj.labelEnglish,
        moodColorHex: moodObj.colorHex,
        title: title.trim() || 'تاثراتِ سخن',
        content: content.trim(),
        tags,
        intensity
      });
    } else {
      onSave({
        poemId: initialVerse?.poemId,
        poemTitle,
        poetName,
        misra1,
        misra2,
        mood: selectedMood,
        moodLabelUrdu: moodObj.labelUrdu,
        moodLabelEnglish: moodObj.labelEnglish,
        moodColorHex: moodObj.colorHex,
        title: title.trim() || 'تاثراتِ سخن',
        content: content.trim(),
        tags,
        intensity,
        isBookmarked: false
      });
    }

    ambienceEngine.playDaadChime();
    setIsSavedFeedback(true);
    setTimeout(() => {
      setIsSavedFeedback(false);
      onClose();
    }, 1200);
  };

  const renderMoodIcon = (moodId: ReflectionMood, className = 'w-4 h-4') => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-amber-600/40 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[92vh] text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 pb-4 border-b border-stone-850 bg-gradient-to-b from-[#141414] to-[#0a0a0a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
              <Feather className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`${fontClass} text-xl sm:text-2xl text-amber-200 font-bold leading-none`}>
                  {editReflection ? 'تاثر میں ترمیم کریں' : 'روزنامچۂ دل • Daily Reflection'}
                </h3>
              </div>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Record how this couplet resonated with your thoughts and emotional mood today.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy Assurance Banner */}
        <div className="bg-stone-950 px-4 sm:px-6 py-2 border-b border-stone-850 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-stone-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>
              <strong className="text-emerald-400">100% نجی و محفوظ:</strong> یہ تحریر صرف آپ کے براؤزر کے لوکل اسٹوریج میں رہے گی۔
            </span>
          </div>
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider hidden sm:inline">
            Local Storage Only
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Associated Verse Presentation Box */}
          <div className="p-4 rounded-2xl bg-[#050505] border border-amber-900/40 shadow-inner relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-850 text-xs">
              <span className="text-amber-400 font-medium flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-amber-400 rotate-180" />
                <span>کلام و مصرعِ خاص</span>
              </span>
              <span className="text-stone-400 font-nastaliq text-sm">
                کلام: <strong className="text-amber-300">{poetName}</strong>
              </span>
            </div>

            <div className="text-center py-2 space-y-1">
              <p dir="rtl" className={`${fontClass} text-lg sm:text-xl text-amber-100 leading-relaxed`}>
                {misra1}
              </p>
              <p dir="rtl" className={`${fontClass} text-lg sm:text-xl text-amber-300 leading-relaxed`}>
                {misra2}
              </p>
            </div>
          </div>

          {/* 1. Mood / Kaifiyat Picker */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              کیفیت و موڈ منتخب کریں (Emotional Mood Impact)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {REFLECTION_MOODS.map((m) => {
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedMood(m.id);
                      ambienceEngine.playDaadChime();
                    }}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all flex items-center gap-2 ${
                      isSelected
                        ? `${m.bgClass} ${m.borderClass} ${m.textClass} font-bold shadow-md shadow-black/80 scale-[1.02]`
                        : 'bg-[#0f0f0f] border-stone-850 text-stone-400 hover:text-stone-200 hover:bg-[#141414]'
                    }`}
                  >
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${m.colorHex}25`, color: m.colorHex }}
                    >
                      {renderMoodIcon(m.id)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-nastaliq text-sm leading-tight block truncate">
                        {m.labelUrdu}
                      </div>
                      <div className="text-[10px] opacity-70 font-sans truncate">
                        {m.labelEnglish}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-stone-400 mt-1.5 font-nastaliq">
              {currentMoodConfig.descriptionUrdu}
            </p>
          </div>

          {/* 2. Reflective Prompts Helper */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>وجد کے سوالات (Inspiration Prompts)</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPromptList(!showPromptList)}
                className="text-[11px] text-amber-400 hover:text-amber-300 underline"
              >
                {showPromptList ? 'چھپائیں (Hide)' : 'رہنمائی لیں (View Prompts)'}
              </button>
            </div>

            {showPromptList && (
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-2 animate-fadeIn mb-3">
                {REFLECTIVE_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPrompt(p, idx)}
                    className={`w-full p-2 rounded-lg text-left text-xs transition-colors border flex items-start gap-2 ${
                      activePromptIndex === idx
                        ? 'bg-amber-950/70 border-amber-600/60 text-amber-200'
                        : 'bg-stone-900/60 border-stone-850 text-stone-300 hover:bg-stone-850 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-nastaliq text-sm leading-relaxed">{p.urdu}</p>
                      <p className="text-[10px] text-stone-400 italic font-serif">{p.english}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Reflection Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
              عنوان / احساس (Reflection Title or Thought)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: آج شام اس شعر نے دل کو گہرا سکون دیا..."
              className="w-full bg-[#050505] border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:outline-none transition-colors"
            />
          </div>

          {/* 4. Reflection Journal Content Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                آپ کے ذاتی تاثرات و قلبی واردات (Your Personal Reflection)
              </label>
              <span className="text-[10px] text-stone-500 font-mono">
                {content.trim() ? `${content.trim().split(/\s+/).length} الفاظ` : '0 الفاظ'}
              </span>
            </div>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="یہاں کھل کر لکھیں کہ اس شعر نے آپ پر کیا اثر کیا، کس یاد کو تازہ کیا، یا زندگی کی کس کشمکش میں تسلی بخشی..."
              className={`w-full bg-[#050505] border border-stone-800 focus:border-amber-500 rounded-2xl p-4 text-base text-stone-100 placeholder-stone-600 focus:outline-none leading-relaxed transition-colors ${fontClass}`}
              dir="auto"
              required
            />
          </div>

          {/* 5. Emotional Intensity Depth Rating */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-stone-850">
            <div>
              <span className="text-xs font-medium text-stone-300 block">
                تاثر کی شدت (Emotional Resonance):
              </span>
              <span className="text-[10px] text-stone-500">
                How deeply did this poem move you today?
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setIntensity(lvl)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    intensity >= lvl
                      ? 'text-amber-400 scale-110'
                      : 'text-stone-700 hover:text-stone-500'
                  }`}
                >
                  <Star className={`w-4 h-4 ${intensity >= lvl ? 'fill-amber-400' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* 6. Tags Builder */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
              ٹیگز و نسبتیں (Tags)
            </label>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-stone-900 border border-amber-900/40 text-amber-300 text-xs flex items-center gap-1"
                >
                  <span>#{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="hover:text-rose-400 ml-0.5 text-stone-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(newTagInput);
                  }
                }}
                placeholder="ٹیگ لکھیں اور انٹر دبائیں (e.g. امید)..."
                className="flex-1 bg-[#050505] border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-600"
              />
              <button
                type="button"
                onClick={() => handleAddTag(newTagInput)}
                className="px-3 py-1.5 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-300 text-xs font-medium border border-stone-800"
              >
                شامل کریں
              </button>
            </div>

            {/* Quick suggested tag chips */}
            <div className="flex flex-wrap items-center gap-1 mt-2">
              <span className="text-[10px] text-stone-500 mr-1">تجویز کردہ:</span>
              {COMMON_TAGS.map((ct) => (
                <button
                  key={ct}
                  type="button"
                  onClick={() => handleAddTag(ct)}
                  className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                    tags.includes(ct)
                      ? 'bg-amber-950/60 border-amber-700/60 text-amber-300'
                      : 'bg-stone-900/60 border-stone-850 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                  }`}
                >
                  #{ct}
                </button>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-stone-850 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-300 text-xs font-medium border border-stone-800 transition-colors"
            >
              منسوخ کریں (Cancel)
            </button>

            <button
              type="submit"
              disabled={!content.trim() || isSavedFeedback}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm shadow-xl shadow-black/80 flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSavedFeedback ? (
                <>
                  <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
                  <span>محفوظ ہو گیا!</span>
                </>
              ) : (
                <>
                  <Feather className="w-4 h-4 text-stone-950" />
                  <span>{editReflection ? 'تبدیلی محفوظ کریں' : 'ڈائری میں محفوظ کریں (Save Reflection)'}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
