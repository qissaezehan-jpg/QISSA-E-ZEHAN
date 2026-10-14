import React, { useState, useEffect } from 'react';
import { Poem, PoeticMoodId, MusicalRaga } from '../types/poetry';
import { MUSICAL_RAGAS, getPoemRagas, getPoemMoods, getPoemCustomTags, updatePoemTags } from '../data/ragasData';
import { POETIC_MOODS } from '../data/moodsData';
import { 
  X, 
  Music, 
  Heart, 
  Plus, 
  Check, 
  Sparkles, 
  Tag, 
  Clock, 
  CloudRain, 
  Compass, 
  Flame, 
  Moon, 
  Layers,
  RotateCcw
} from 'lucide-react';

interface PoemTaggingModalProps {
  isOpen: boolean;
  onClose: () => void;
  poem: Poem | null;
  onTagsUpdated: () => void;
}

export const PoemTaggingModal: React.FC<PoemTaggingModalProps> = ({
  isOpen,
  onClose,
  poem,
  onTagsUpdated
}) => {
  const [selectedRagaIds, setSelectedRagaIds] = useState<string[]>([]);
  const [selectedMoodIds, setSelectedMoodIds] = useState<PoeticMoodId[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState<string>('');
  const [customRagaInput, setCustomRagaInput] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (poem && isOpen) {
      const currentRagas = getPoemRagas(poem).map(r => r.id);
      const currentMoods = getPoemMoods(poem);
      const currentCustom = getPoemCustomTags(poem);
      setSelectedRagaIds(currentRagas);
      setSelectedMoodIds(currentMoods);
      setCustomTags(currentCustom);
      setSavedSuccess(false);
    }
  }, [poem?.id, isOpen]);

  if (!isOpen || !poem) return null;

  const toggleRaga = (ragaId: string) => {
    setSelectedRagaIds(prev => 
      prev.includes(ragaId) 
        ? prev.filter(id => id !== ragaId) 
        : [...prev, ragaId]
    );
  };

  const toggleMood = (moodId: PoeticMoodId) => {
    if (moodId === 'all') return;
    setSelectedMoodIds(prev => 
      prev.includes(moodId) 
        ? prev.filter(id => id !== moodId) 
        : [...prev, moodId]
    );
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = customTagInput.trim();
    if (tag && !customTags.includes(tag)) {
      setCustomTags(prev => [...prev, tag]);
      setCustomTagInput('');
    }
  };

  const removeCustomTag = (tagToRemove: string) => {
    setCustomTags(prev => prev.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    updatePoemTags(poem.id, {
      ragas: selectedRagaIds,
      moods: selectedMoodIds,
      customTags
    });
    setSavedSuccess(true);
    onTagsUpdated();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const renderMoodIcon = (moodId: PoeticMoodId) => {
    switch (moodId) {
      case 'gham': return <CloudRain className="w-3.5 h-3.5" />;
      case 'ishq': return <Heart className="w-3.5 h-3.5" />;
      case 'falsafa': return <Compass className="w-3.5 h-3.5" />;
      case 'inqilab': return <Flame className="w-3.5 h-3.5" />;
      case 'tasawwuf': return <Sparkles className="w-3.5 h-3.5" />;
      case 'tanhaee': return <Moon className="w-3.5 h-3.5" />;
      default: return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#090806] border-2 border-amber-600/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#171109] via-[#1f160c] to-[#120d07] border-b border-amber-900/40 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Tag className="w-3.5 h-3.5" />
            <span>نشان دہی و ٹیگنگ • Raga & Mood Tagging</span>
          </div>
          
          <h3 className="font-nastaliq text-xl sm:text-2xl text-amber-200 font-bold leading-normal">
            {poem.titleUrdu}
          </h3>
          <p className="text-xs text-stone-400 font-serif italic">
            {poem.title} — Tag with Hindustani classical musical Ragas & emotional moods
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Section 1: Musical Ragas */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  موسیقی و راگ کی نسبت (Musical Raga Associations)
                </h4>
              </div>
              <span className="text-[11px] text-stone-400 font-mono">
                {selectedRagaIds.length} منتخب
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mb-3">
              Select one or more classical Hindustani Ragas whose melody, time of day, and emotional ethos suit this poem:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MUSICAL_RAGAS.map((raga) => {
                const isSelected = selectedRagaIds.includes(raga.id);
                return (
                  <button
                    key={raga.id}
                    type="button"
                    onClick={() => toggleRaga(raga.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-amber-950/70 border-amber-500 shadow-md ring-1 ring-amber-500/40 text-amber-100'
                        : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:border-amber-800 hover:bg-stone-900'
                    }`}
                  >
                    <div 
                      className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center border text-[9px] ${
                        isSelected ? 'bg-amber-500 border-amber-400 text-stone-950 font-bold' : 'border-stone-700 bg-stone-950'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-nastaliq text-base text-amber-200 font-bold">
                          {raga.nameUrdu}
                        </span>
                        <span className="text-[10px] text-stone-400 font-serif">
                          {raga.nameEnglish}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mt-0.5">
                        <Clock className="w-3 h-3 text-stone-500" />
                        <span>{raga.praharUrdu}</span>
                      </div>

                      <p className="text-[10px] text-stone-400/90 font-sans truncate mt-0.5">
                        {raga.moodEthosUrdu}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Emotional Moods */}
          <div className="pt-4 border-t border-stone-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                  کیفیت و جذباتی رنگ (Emotional Moods)
                </h4>
              </div>
              <span className="text-[11px] text-stone-400 font-mono">
                {selectedMoodIds.length} منتخب
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mb-3">
              Tag the prevailing emotional themes present in the verses:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {POETIC_MOODS.filter(m => m.id !== 'all').map((mood) => {
                const isSelected = selectedMoodIds.includes(mood.id);
                return (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => toggleMood(mood.id)}
                    className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? `${mood.activeBg} ${mood.activeBorder} text-white shadow-md font-bold ring-1 ring-white/20`
                        : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-md bg-stone-950/60 text-stone-300">
                        {renderMoodIcon(mood.id)}
                      </span>
                      <div className="text-right sm:text-left">
                        <span className="font-nastaliq text-base block leading-none">
                          {mood.labelUrdu}
                        </span>
                        <span className="text-[10px] opacity-80 block mt-0.5 font-sans">
                          {mood.labelEnglish}
                        </span>
                      </div>
                    </div>

                    <div 
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] border ${
                        isSelected ? 'bg-white text-stone-950 border-white' : 'border-stone-700 bg-stone-950'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Custom Tags */}
          <div className="pt-4 border-t border-stone-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>خصوصی ٹیگز (Custom Literary Tags)</span>
            </h4>
            
            <form onSubmit={handleAddCustomTag} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="مثلاً: بزمِ یار، یادِ وطن، سوز و گداز، سحر خیزی..."
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-600"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs text-amber-300 font-medium flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>شامل کریں</span>
              </button>
            </form>

            {customTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {customTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-stone-900 border border-amber-900/50 text-amber-200 text-xs flex items-center gap-1.5"
                  >
                    <span className="font-nastaliq">{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeCustomTag(tag)}
                      className="hover:text-rose-400 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-900/90 border-t border-stone-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setSelectedRagaIds([]);
              setSelectedMoodIds([]);
              setCustomTags([]);
            }}
            className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>تمام صاف کریں (Reset)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
            >
              منسوخ (Cancel)
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-950/60 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
                  <span>محفوظ کر لیا گیا!</span>
                </>
              ) : (
                <>
                  <Tag className="w-3.5 h-3.5" />
                  <span>ٹیگز محفوظ کریں (Save Tags)</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
