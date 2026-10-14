import React, { useState, useEffect, useRef } from 'react';
import { Poem, Couplet, Poet } from '../types/poetry';
import { POETS } from '../data/poetsData';
import { 
  X, 
  Volume2, 
  Sparkles, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  Info,
  Play,
  Pause,
  Square,
  Music,
  Settings,
  Globe,
  Sliders,
  VolumeX,
  CheckCircle2,
  BookOpen,
  Check,
  Flame,
  Eye,
  Feather
} from 'lucide-react';
import { ambienceEngine } from '../utils/audioAmbience';
import { recordVersesExplored } from '../utils/readingTracker';
import { MetaphorInsightDrawer } from './MetaphorInsightDrawer';
import { getPoemRagas } from '../data/ragasData';

interface PoemDetailModalProps {
  poem: Poem | null;
  onClose: () => void;
  fontPreference: string;
  onOpenCardStudioWithCouplet: (couplet: Couplet, poet: Poet, poem: Poem) => void;
  onToggleFavoriteCouplet: (couplet: Couplet, poet: Poet) => void;
  isCoupletFavorited: (key: string) => boolean;
  onOpenReflectionsWithCouplet?: (couplet: Couplet, poet: Poet, poem: Poem) => void;
}

export const PoemDetailModal: React.FC<PoemDetailModalProps> = ({
  poem,
  onClose,
  fontPreference,
  onOpenCardStudioWithCouplet,
  onToggleFavoriteCouplet,
  isCoupletFavorited,
  onOpenReflectionsWithCouplet
}) => {
  const [expandedTashreehIndex, setExpandedTashreehIndex] = useState<number | null>(0);
  
  // Speech Synthesis state
  const [playbackState, setPlaybackState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [activeRecitingIndex, setActiveRecitingIndex] = useState<number | null>(null);
  const [reciteLanguage, setReciteLanguage] = useState<'ur' | 'en'>('ur');
  const [speechRate, setSpeechRate] = useState<number>(0.82); // Deliberate poetic pace
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [isTanpuraDroneActive, setIsTanpuraDroneActive] = useState<boolean>(false);
  const [showAudioSettings, setShowAudioSettings] = useState<boolean>(false);
  const [isMetaphorDrawerOpen, setIsMetaphorDrawerOpen] = useState<boolean>(false);

  const coupletRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isSequenceRef = useRef<boolean>(false);
  const currentIndexRef = useRef<number>(0);

  // Initialize and load SpeechSynthesis voices
  useEffect(() => {
    const updateVoices = () => {
      const voices = ambienceEngine.getVoices();
      setAvailableVoices(voices);

      // Auto-select preferred voice if not set
      if (!selectedVoiceName && voices.length > 0) {
        const urVoice = voices.find(v => 
          v.lang.toLowerCase().startsWith('ur') || 
          v.name.toLowerCase().includes('urdu')
        ) || voices.find(v => 
          v.lang.toLowerCase().startsWith('hi') || 
          v.name.toLowerCase().includes('hindi')
        );
        if (urVoice) {
          setSelectedVoiceName(urVoice.name);
        }
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedVoiceName]);

  // Clean up audio when modal closes or unmounts
  useEffect(() => {
    return () => {
      isSequenceRef.current = false;
      ambienceEngine.stopRecitation();
      if (isTanpuraDroneActive) {
        ambienceEngine.stopDrone();
      }
    };
  }, [isTanpuraDroneActive]);

  // Track read couplets in this modal session
  const [readCoupletIndices, setReadCoupletIndices] = useState<number[]>([0]);

  // Record initial verse read when poem opened
  useEffect(() => {
    if (poem) {
      setReadCoupletIndices([0]);
      recordVersesExplored({
        poemId: poem.id,
        coupletIndex: 0,
        poetId: poem.poetId,
        count: 1,
        type: 'read'
      });
    }
  }, [poem?.id]);

  if (!poem) return null;

  const poet = POETS.find(p => p.id === poem.poetId);
  const poemRagas = getPoemRagas(poem);

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const toggleTashreeh = (index: number) => {
    const isOpening = expandedTashreehIndex !== index;
    setExpandedTashreehIndex(prev => prev === index ? null : index);
    if (isOpening && poem) {
      if (!readCoupletIndices.includes(index)) {
        setReadCoupletIndices(prev => [...prev, index]);
      }
      recordVersesExplored({
        poemId: poem.id,
        coupletIndex: index,
        poetId: poem.poetId,
        count: 1,
        type: 'tashreeh'
      });
    }
  };

  const markCoupletAsRead = (index: number) => {
    if (!poem) return;
    if (!readCoupletIndices.includes(index)) {
      setReadCoupletIndices(prev => [...prev, index]);
    }
    recordVersesExplored({
      poemId: poem.id,
      coupletIndex: index,
      poetId: poem.poetId,
      count: 1,
      type: 'read'
    });
  };

  const markAllCoupletsAsRead = () => {
    if (!poem) return;
    const allIndices = poem.couplets.map((_, i) => i);
    const unreadCount = allIndices.filter(i => !readCoupletIndices.includes(i)).length;
    setReadCoupletIndices(allIndices);
    recordVersesExplored({
      poemId: poem.id,
      poetId: poem.poetId,
      count: Math.max(1, unreadCount || 1),
      type: 'read'
    });
  };

  // Recite single couplet
  const handleReciteSingleCouplet = (couplet: Couplet, index: number) => {
    // If currently reciting this couplet, stop it
    if (activeRecitingIndex === index && playbackState === 'playing') {
      handleStopRecitation();
      return;
    }

    if (!readCoupletIndices.includes(index)) {
      setReadCoupletIndices(prev => [...prev, index]);
    }
    recordVersesExplored({
      poemId: poem.id,
      coupletIndex: index,
      poetId: poem.poetId,
      count: 1,
      type: 'recite'
    });

    isSequenceRef.current = false;
    setActiveRecitingIndex(index);
    setPlaybackState('playing');

    const textToSpeak = reciteLanguage === 'ur'
      ? `${couplet.misra1} ... ${couplet.misra2}`
      : `${couplet.englishTranslation}`;

    ambienceEngine.reciteWithEvents({
      text: textToSpeak,
      lang: reciteLanguage,
      rate: speechRate,
      voiceName: selectedVoiceName,
      onStart: () => {
        setPlaybackState('playing');
        setActiveRecitingIndex(index);
      },
      onEnd: () => {
        setPlaybackState('idle');
        setActiveRecitingIndex(null);
      },
      onError: () => {
        setPlaybackState('idle');
        setActiveRecitingIndex(null);
      }
    });
  };

  // Recite full poem sequentially
  const handleStartFullRecitation = () => {
    isSequenceRef.current = true;
    currentIndexRef.current = 0;
    setPlaybackState('playing');
    playCoupletAtIndex(0);
  };

  const playCoupletAtIndex = (index: number) => {
    if (!isSequenceRef.current || index >= poem.couplets.length) {
      handleStopRecitation();
      return;
    }

    currentIndexRef.current = index;
    setActiveRecitingIndex(index);

    // Auto-scroll to active couplet smoothly
    if (coupletRefs.current[index]) {
      coupletRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const couplet = poem.couplets[index];
    const textToSpeak = reciteLanguage === 'ur'
      ? `${couplet.misra1} ... ${couplet.misra2}`
      : `${couplet.englishTranslation}`;

    ambienceEngine.reciteWithEvents({
      text: textToSpeak,
      lang: reciteLanguage,
      rate: speechRate,
      voiceName: selectedVoiceName,
      onStart: () => {
        setPlaybackState('playing');
        setActiveRecitingIndex(index);
      },
      onEnd: () => {
        if (!isSequenceRef.current) return;
        // Poetic pause between ash'aar (1.2 seconds)
        setTimeout(() => {
          if (isSequenceRef.current) {
            playCoupletAtIndex(index + 1);
          }
        }, 1200);
      },
      onError: () => {
        handleStopRecitation();
      }
    });
  };

  const handlePauseRecitation = () => {
    ambienceEngine.pauseRecitation();
    setPlaybackState('paused');
  };

  const handleResumeRecitation = () => {
    ambienceEngine.resumeRecitation();
    setPlaybackState('playing');
  };

  const handleStopRecitation = () => {
    isSequenceRef.current = false;
    ambienceEngine.stopRecitation();
    setPlaybackState('idle');
    setActiveRecitingIndex(null);
  };

  const handleToggleTanpuraAccompaniment = () => {
    if (isTanpuraDroneActive) {
      ambienceEngine.stopDrone();
      setIsTanpuraDroneActive(false);
    } else {
      ambienceEngine.startDrone('tanpura');
      setIsTanpuraDroneActive(true);
    }
  };

  const handleCloseModal = () => {
    handleStopRecitation();
    if (isTanpuraDroneActive) {
      ambienceEngine.stopDrone();
      setIsTanpuraDroneActive(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Container Box */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-stone-950 border-2 border-amber-800/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto gold-glow">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950/70 to-stone-900 p-5 sm:p-6 border-b border-amber-900/40 relative">
          
          {/* Header Action Buttons */}
          <div className="absolute top-4 sm:top-5 right-4 sm:right-5 flex items-center gap-2 z-20">
            <button
              onClick={() => {
                setIsMetaphorDrawerOpen(true);
                recordVersesExplored({
                  poemId: poem.id,
                  poetId: poem.poetId,
                  count: 1,
                  type: 'tashreeh'
                });
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-950/60 hover:scale-102 transition-all border border-amber-400/60"
              title="Metaphorical Insight • علامتی و استعاراتی بصیرت (Gemini AI)"
            >
              <Eye className="w-3.5 h-3.5 fill-stone-950" />
              <span className="font-nastaliq text-xs sm:text-sm font-bold">بصیرتِ استعارہ</span>
              <span className="text-[10px] font-sans opacity-85 hidden md:inline">(Metaphors)</span>
              <Sparkles className="w-3 h-3 text-stone-950 fill-stone-950" />
            </button>

            <button
              onClick={handleCloseModal}
              className="p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 transition-colors"
              title="Close (بند کریں)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pr-28 sm:pr-48">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium mb-1">
              <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800/60">
                {poem.genre}
              </span>
              {(poem.mood || poem.moodUrdu) && (
                <span className="px-2 py-0.5 rounded bg-stone-900/90 border border-amber-700/50 text-amber-200 flex items-center gap-1 font-sans">
                  <span>کیفیت:</span>
                  <span className="font-nastaliq text-xs text-amber-300">{poem.moodUrdu || poem.mood}</span>
                </span>
              )}
              <span>•</span>
              <span className="font-nastaliq text-sm">{poem.themeUrdu}</span>
              {poem.year && <span>• {poem.year}</span>}
            </div>

            <h2 className="font-nastaliq text-2xl sm:text-4xl text-amber-200 font-bold leading-relaxed">
              {poem.titleUrdu}
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-stone-300">
              {poem.title} — <span className="text-amber-400 font-semibold">{poet?.nameEnglish}</span> ({poet?.nameUrdu})
            </p>
          </div>

          {/* Prosodic Metadata Banner */}
          <div className="mt-4 pt-3 border-t border-amber-900/30 flex flex-wrap items-center gap-2.5 text-xs text-stone-300">
            {poem.meter && (
              <div className="flex items-center gap-1.5 bg-stone-900/80 px-2.5 py-1 rounded-lg border border-stone-800">
                <span className="text-stone-500">بحر:</span>
                <span className="text-amber-300 font-nastaliq text-sm">{poem.meter}</span>
              </div>
            )}
            {poem.radif && (
              <div className="flex items-center gap-1.5 bg-stone-900/80 px-2.5 py-1 rounded-lg border border-stone-800">
                <span className="text-stone-500">ردیف:</span>
                <span className="text-amber-300 font-nastaliq text-sm font-semibold">{poem.radif}</span>
              </div>
            )}
            {poem.qafia && (
              <div className="flex items-center gap-1.5 bg-stone-900/80 px-2.5 py-1 rounded-lg border border-stone-800">
                <span className="text-stone-500">قافیہ:</span>
                <span className="text-amber-300 font-nastaliq text-sm">{poem.qafia}</span>
              </div>
            )}
            {poemRagas.length > 0 && (
              <div className="flex items-center gap-1.5 bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-800/40 text-amber-300">
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-stone-400">راگ:</span>
                {poemRagas.map(r => (
                  <span key={r.id} className="font-nastaliq text-sm font-semibold">
                    {r.nameUrdu}
                  </span>
                ))}
              </div>
            )}
          </div>

          {poem.historicalContext && (
            <div className="mt-3 p-2.5 rounded-lg bg-stone-950/60 border border-stone-800 text-xs text-stone-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{poem.historicalContext}</span>
            </div>
          )}

        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE WEB SPEECH SYNTHESIS RECITER CONTROL BAR           */}
        {/* ============================================================== */}
        <div className="bg-[#110d07] border-b border-amber-900/60 px-4 py-3 sm:px-6 relative z-10 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Playback Controls & Status */}
            <div className="flex items-center gap-2">
              
              {/* Play / Resume / Start Button */}
              {playbackState === 'idle' ? (
                <button
                  onClick={handleStartFullRecitation}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-950/40 hover:scale-102 transition-all"
                  title="Recite Entire Poem (مکمل کلام سنیں)"
                >
                  <Play className="w-3.5 h-3.5 fill-stone-950" />
                  <span>تحت اللفظ سنیں (Play All)</span>
                </button>
              ) : playbackState === 'playing' ? (
                <button
                  onClick={handlePauseRecitation}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  title="Pause (وقفہ)"
                >
                  <Pause className="w-3.5 h-3.5 fill-stone-950" />
                  <span>وقفہ (Pause)</span>
                </button>
              ) : (
                <button
                  onClick={handleResumeRecitation}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  title="Resume (جاری رکھیں)"
                >
                  <Play className="w-3.5 h-3.5 fill-stone-950" />
                  <span>جاری رکھیں (Resume)</span>
                </button>
              )}

              {/* Stop Button */}
              {playbackState !== 'idle' && (
                <button
                  onClick={handleStopRecitation}
                  className="p-1.5 rounded-xl bg-stone-900 hover:bg-rose-950 border border-stone-800 hover:border-rose-700 text-stone-300 hover:text-rose-300 transition-colors"
                  title="Stop Recitation (تلاوت بند کریں)"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                </button>
              )}

              {/* Recitation Status & Current Sher progress */}
              <div className="flex items-center gap-2 pl-2 border-l border-amber-900/40 text-xs">
                {playbackState === 'playing' ? (
                  <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>تحت اللفظ جاری ہے</span>
                    {activeRecitingIndex !== null && (
                      <span className="text-[11px] text-stone-400 font-mono">
                        (شعر #{activeRecitingIndex + 1}/{poem.couplets.length})
                      </span>
                    )}
                  </span>
                ) : playbackState === 'paused' ? (
                  <span className="text-amber-400/90 italic">آواز موقوف ہے (Paused)</span>
                ) : (
                  <span className="text-stone-400 hidden sm:inline">
                    تلاوت و تحت اللفظ اسٹوڈیو • Speech Synthesis
                  </span>
                )}
              </div>

            </div>

            {/* Right Tools: Language, Tanpura Drone Accompaniment, Settings */}
            <div className="flex items-center gap-2">
              
              {/* Language Switcher (Urdu / English) */}
              <button
                onClick={() => {
                  const nextLang = reciteLanguage === 'ur' ? 'en' : 'ur';
                  setReciteLanguage(nextLang);
                  if (playbackState === 'playing') {
                    handleStopRecitation();
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-700/60 text-xs text-stone-300 flex items-center gap-1.5 transition-colors"
                title="Switch Recitation Language"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{reciteLanguage === 'ur' ? 'اردو تحت اللفظ' : 'English Recitation'}</span>
              </button>

              {/* Tanpura Drone Accompaniment Toggle */}
              <button
                onClick={handleToggleTanpuraAccompaniment}
                className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isTanpuraDroneActive
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-sm animate-pulse'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-800'
                }`}
                title={isTanpuraDroneActive ? 'Stop Tanpura Drone' : 'Play Background Classical Tanpura Drone'}
              >
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">
                  {isTanpuraDroneActive ? 'تنبورہ سنگت جاری' : 'تنبورہ سنگت (Drone)'}
                </span>
              </button>

              {/* Settings Toggle Button */}
              <button
                onClick={() => setShowAudioSettings(!showAudioSettings)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  showAudioSettings
                    ? 'bg-amber-900/60 border-amber-600 text-amber-200'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-amber-300 hover:border-stone-700'
                }`}
                title="Audio Reciter Settings (رفتار و آواز)"
              >
                <Sliders className="w-4 h-4" />
              </button>

            </div>

          </div>

          {/* Expandable Speech Settings Drawer */}
          {showAudioSettings && (
            <div className="mt-3 pt-3 border-t border-amber-900/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-fade-in bg-stone-950/60 p-3 rounded-xl border border-stone-800/80">
              
              {/* Pace / Speed control */}
              <div>
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span>رفتارِ ادائیگی (Recitation Pace):</span>
                  <span className="font-mono text-amber-400">{speechRate}x</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-stone-500">دھیما (Slow)</span>
                  <input
                    type="range"
                    min="0.6"
                    max="1.2"
                    step="0.05"
                    value={speechRate}
                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    className="flex-1 accent-amber-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-stone-500">تیز (Fast)</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[0.75, 0.82, 1.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        speechRate === rate
                          ? 'bg-amber-700 text-amber-100 font-bold'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {rate === 0.75 ? '0.75x (ترنم)' : rate === 0.82 ? '0.82x (معمول)' : '1.0x (عام)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Selection */}
              <div>
                <label className="block text-stone-400 mb-1">
                  آواز کا انتخاب (Device Speech Voice):
                </label>
                <select
                  value={selectedVoiceName}
                  onChange={(e) => setSelectedVoiceName(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-stone-200 text-xs focus:outline-none focus:border-amber-600"
                >
                  <option value="">خودکار اردو / علاقائی آواز (Default)</option>
                  {availableVoices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-stone-500 mt-1">
                  Urdu and Hindi phonetic synthesizers deliver optimal cadence and pronunciation.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Poem Reading Progress Banner */}
        <div className="bg-stone-900/95 border-b border-amber-900/40 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-stone-300 font-sans">
              پیش رفتِ مطالعہ: <strong className="text-amber-300 font-mono text-sm">{readCoupletIndices.length}</strong> / <span className="font-mono text-stone-400">{poem.couplets.length}</span> اشعار
            </span>
            {readCoupletIndices.length >= poem.couplets.length ? (
              <span className="text-emerald-400 font-medium flex items-center gap-1 font-mono text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                مکمل کلام پڑھ لیا
              </span>
            ) : (
              <span className="text-stone-500 font-mono text-[11px] hidden sm:inline">
                ({poem.couplets.length - readCoupletIndices.length} اشعار باقی)
              </span>
            )}
          </div>

          {readCoupletIndices.length < poem.couplets.length && (
            <button
              onClick={markAllCoupletsAsRead}
              className="px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-600/40 text-[11px] font-medium flex items-center gap-1.5 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>تمام کلام پڑھ لیا (+{poem.couplets.length - readCoupletIndices.length} اشعار)</span>
            </button>
          )}
        </div>

        {/* Couplets Reader Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {poem.couplets.map((couplet, idx) => {
            const isRecitingThis = activeRecitingIndex === idx && playbackState !== 'idle';
            const isTashreehOpen = expandedTashreehIndex === idx;
            const coupletKey = `${poem.id}-${idx}`;

            return (
              <div
                key={idx}
                ref={(el) => { coupletRefs.current[idx] = el; }}
                className={`p-6 rounded-2xl border transition-all duration-300 relative ${
                  isRecitingThis
                    ? 'bg-amber-950/40 border-amber-500 shadow-xl shadow-amber-950/50 ring-2 ring-amber-500/50 scale-[1.01]'
                    : 'bg-stone-900/60 border-stone-800/80 hover:border-amber-900/50'
                }`}
              >
          {/* Couplet Header */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-stone-400">شعر #{idx + 1}</span>
                    {isRecitingThis && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] animate-pulse flex items-center gap-1">
                        <Volume2 className="w-3 h-3" />
                        <span>زیرِ سماعت</span>
                      </span>
                    )}
                    {readCoupletIndices.includes(idx) && (
                      <span className="text-[10px] text-emerald-400 font-mono hidden sm:flex items-center gap-0.5">
                        <Check className="w-3 h-3" />
                        <span>مطالعہ شدہ</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Mark as Read Button */}
                    <button
                      onClick={() => markCoupletAsRead(idx)}
                      className={`px-2 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1 transition-all ${
                        readCoupletIndices.includes(idx)
                          ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-700'
                      }`}
                      title={readCoupletIndices.includes(idx) ? 'شعر پڑھا جا چکا ہے' : 'اس شعر کو مطالعہ شدہ نشان زد کریں'}
                    >
                      <Check className="w-3 h-3" />
                      <span className="hidden sm:inline">{readCoupletIndices.includes(idx) ? 'پڑھ لیا' : 'نشان زد'}</span>
                    </button>
                    {/* Individual Couplet Recite / Listen Button */}
                    <button
                      onClick={() => handleReciteSingleCouplet(couplet, idx)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                        isRecitingThis
                          ? 'bg-amber-600 border-amber-500 text-stone-950 font-bold'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-700'
                      }`}
                      title={isRecitingThis ? 'Stop speaking this verse' : 'Listen to this verse (تحت اللفظ سنیں)'}
                    >
                      {isRecitingThis ? (
                        <>
                          <Square className="w-3 h-3 fill-stone-950" />
                          <span>بند کریں</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>سنیں</span>
                        </>
                      )}
                    </button>

                    {poet && (
                      <button
                        onClick={() => onOpenCardStudioWithCouplet(couplet, poet, poem)}
                        className="p-1.5 rounded-lg border border-stone-800 text-stone-400 hover:text-amber-300 hover:border-stone-700 transition-colors"
                        title="Design Calligraphy Card"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {poet && onOpenReflectionsWithCouplet && (
                      <button
                        onClick={() => onOpenReflectionsWithCouplet(couplet, poet, poem)}
                        className="p-1.5 rounded-lg border border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-600/50 hover:bg-stone-900 transition-colors"
                        title="Write a personal reflection on this verse (اس شعر پر تاثرات لکھیں)"
                      >
                        <Feather className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    )}

                    {poet && (
                      <button
                        onClick={() => onToggleFavoriteCouplet(couplet, poet)}
                        className="p-1.5 rounded-lg border border-stone-800 text-stone-400 hover:text-rose-400 hover:border-stone-700 transition-colors"
                        title="Bookmark verse"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isCoupletFavorited(coupletKey) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>

                {/* The Couplet Lines in Nastaliq */}
                <div className="text-center py-2">
                  <p 
                    dir="rtl" 
                    className={`${fontClass} text-2xl sm:text-3xl ${isRecitingThis ? 'text-amber-50 drop-shadow-md font-medium' : 'text-amber-100'} leading-loose`}
                  >
                    {couplet.misra1}
                  </p>
                  <p 
                    dir="rtl" 
                    className={`${fontClass} text-2xl sm:text-3xl ${isRecitingThis ? 'text-amber-300 drop-shadow-md font-medium' : 'text-amber-200'} leading-loose mt-1`}
                  >
                    {couplet.misra2}
                  </p>
                </div>

                {/* Roman Transliteration */}
                <div className="mt-3 pt-3 border-t border-stone-800/80 text-center">
                  <p className="text-xs sm:text-sm font-serif italic text-stone-400">
                    {couplet.roman1}
                  </p>
                  <p className="text-xs sm:text-sm font-serif italic text-stone-400">
                    {couplet.roman2}
                  </p>
                </div>

                {/* Poetic English Translation */}
                <div className="mt-2 text-center">
                  <p className="text-xs sm:text-sm font-sans text-stone-300/90 italic">
                    "{couplet.englishTranslation}"
                  </p>
                </div>

                {/* Vocabulary (Farhang) Badges */}
                {couplet.vocab && couplet.vocab.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-stone-800/60 flex flex-wrap items-center justify-center gap-2">
                    <span className="text-[11px] text-stone-500 font-sans">لغت و فرہنگ:</span>
                    {couplet.vocab.map((v, vIdx) => (
                      <span
                        key={vIdx}
                        className="px-2 py-0.5 rounded-md bg-stone-950 border border-amber-900/40 text-[11px] text-amber-300 flex items-center gap-1"
                        title={v.meaning}
                      >
                        <span className="font-nastaliq">{v.word}</span>
                        <span className="text-stone-400 font-serif">({v.roman})</span>
                        <span className="text-stone-300 font-sans">= {v.meaning}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Expandable Literary Tashreeh */}
                <div className="mt-4">
                  <button
                    onClick={() => toggleTashreeh(idx)}
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-stone-950/70 border border-stone-800 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>ادبی تشریح و مفہوم (Literary Tashreeh)</span>
                    </span>
                    {isTashreehOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isTashreehOpen && (
                    <div className="mt-2 p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs sm:text-sm text-stone-300 leading-relaxed animate-fade-in">
                      <p className="font-sans text-stone-200">
                        {couplet.tashreeh}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-stone-900/90 p-4 border-t border-stone-800 flex items-center justify-between">
          <p className="text-xs text-stone-400 font-serif italic">
            قصۂ ذہن • صوتی تحت اللفظ اور مستند کلام
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMetaphorDrawerOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900/80 border border-amber-700/60 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>بصیرتِ استعارہ (Metaphor Drawer)</span>
            </button>
            <button
              onClick={handleCloseModal}
              className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
            >
              بند کریں (Close)
            </button>
          </div>
        </div>

        {/* Metaphorical Insight Dedicated Drawer */}
        <MetaphorInsightDrawer
          isOpen={isMetaphorDrawerOpen}
          onClose={() => setIsMetaphorDrawerOpen(false)}
          poem={poem}
          poet={poet}
          fontPreference={fontPreference}
          onJumpToCouplet={(idx) => {
            if (coupletRefs.current[idx]) {
              coupletRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setExpandedTashreehIndex(idx);
            }
          }}
        />

      </div>
    </div>
  );
};
