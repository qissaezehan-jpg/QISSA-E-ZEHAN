import React from 'react';
import { X, Heart, Share2, Volume2, Trash2 } from 'lucide-react';
import { Couplet, Poet, Poem } from '../types/poetry';
import { ambienceEngine } from '../utils/audioAmbience';

export interface SavedFavorite {
  id: string;
  misra1: string;
  misra2: string;
  poet: string;
  translation: string;
  tashreeh?: string;
}

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: SavedFavorite[];
  onRemoveFavorite: (id: string) => void;
  onOpenCardWithFavorite: (fav: SavedFavorite) => void;
  fontPreference: string;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onOpenCardWithFavorite,
  fontPreference
}) => {
  if (!isOpen) return null;

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-stone-950 border-2 border-amber-800/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden gold-glow">
        
        {/* Header */}
        <div className="bg-stone-900 p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400">
            <Heart className="w-5 h-5 fill-rose-500" />
            <h3 className="font-serif text-lg font-semibold text-stone-100">
              پسندیدہ اشعار — Saved Couplets ({favorites.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 text-stone-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {favorites.length === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <Heart className="w-8 h-8 text-stone-600 mx-auto mb-2" />
              <p className="font-nastaliq text-xl text-amber-300/60">کوئی پسندیدہ شعر محفوظ نہیں ہے</p>
              <p className="text-xs text-stone-500 mt-1">
                Click the heart icon on any couplet to save it to your personal collection in Qissa-e-Zehan.
              </p>
            </div>
          ) : (
            favorites.map((fav) => (
              <div
                key={fav.id}
                className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-700/60 transition-all flex flex-col justify-between"
              >
                <div className="text-center">
                  <p dir="rtl" className={`${fontClass} text-xl text-amber-100 leading-loose`}>
                    {fav.misra1}
                  </p>
                  <p dir="rtl" className={`${fontClass} text-xl text-amber-300 leading-loose`}>
                    {fav.misra2}
                  </p>
                  <p className="font-nastaliq text-sm text-amber-400 mt-2 font-medium">
                    — {fav.poet}
                  </p>
                  {fav.translation && (
                    <p className="text-xs text-stone-400 font-serif italic mt-1">
                      "{fav.translation}"
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => onRemoveFavorite(fav.id)}
                    className="text-stone-500 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف کریں</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => ambienceEngine.reciteText(`${fav.misra1} ... ${fav.misra2}`, 'ur')}
                      className="p-1.5 rounded-lg border border-stone-800 text-stone-300 hover:text-amber-300 transition-colors"
                      title="Recite aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onOpenCardWithFavorite(fav);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-950 border border-amber-700/60 text-xs text-amber-200 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>کارڈ بنائیں</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
