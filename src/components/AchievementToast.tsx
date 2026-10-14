import React, { useEffect } from 'react';
import { Award, Flame, X, Trophy } from 'lucide-react';

interface AchievementToastProps {
  celebration: {
    type: 'goal' | 'achievement' | 'rank';
    title: string;
    description: string;
  } | null;
  onClose: () => void;
  fontPreference?: string;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  celebration,
  onClose,
  fontPreference = 'nastaliq'
}) => {
  useEffect(() => {
    if (!celebration) return;
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [celebration, onClose]);

  if (!celebration) return null;

  const fontClass = fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-bounce-short">
      <div className="bg-gradient-to-r from-[#1e1509] via-stone-900 to-[#171207] border-2 border-amber-500 rounded-2xl p-4 shadow-2xl shadow-amber-950/80 flex items-start gap-3.5 text-stone-100">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-300 flex-shrink-0">
          {celebration.type === 'goal' ? (
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
          ) : (
            <Trophy className="w-5 h-5 text-amber-400" />
          )}
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400">
              ادبی اعزاز · Literary Milestone
            </span>
            <button 
              onClick={onClose}
              className="text-stone-400 hover:text-stone-200 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <h4 className={`${fontClass} text-lg text-amber-200 font-bold leading-tight mt-0.5`}>
            {celebration.title}
          </h4>

          <p className="text-xs text-stone-300 mt-1 font-sans">
            {celebration.description}
          </p>
        </div>
      </div>
    </div>
  );
};
