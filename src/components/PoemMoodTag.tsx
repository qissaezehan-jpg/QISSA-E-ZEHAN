import React, { useMemo } from 'react';
import { Poem, PoemSentimentAnalysis } from '../types/poetry';
import { getPoemSentiment, getMoodVisualConfig } from '../utils/sentimentAnalysis';
import { 
  CloudRain, 
  Sun, 
  Heart, 
  Compass, 
  Flame, 
  Feather, 
  HeartCrack, 
  Clock, 
  Sparkles 
} from 'lucide-react';

interface PoemMoodTagProps {
  poem: Poem;
  sentiment?: PoemSentimentAnalysis;
  onClick?: (e: React.MouseEvent, sentiment: PoemSentimentAnalysis) => void;
  size?: 'sm' | 'md' | 'lg';
  showUrdu?: boolean;
  showAiBadge?: boolean;
  className?: string;
  interactive?: boolean;
}

export const PoemMoodTag: React.FC<PoemMoodTagProps> = ({
  poem,
  sentiment: customSentiment,
  onClick,
  size = 'md',
  showUrdu = true,
  showAiBadge = true,
  className = '',
  interactive = true
}) => {
  const sentiment = useMemo(() => {
    return customSentiment || getPoemSentiment(poem);
  }, [poem, customSentiment]);

  const visualConfig = useMemo(() => {
    return getMoodVisualConfig(sentiment.primaryMood);
  }, [sentiment.primaryMood]);

  const renderIcon = (iconClass: string) => {
    switch (visualConfig.iconName) {
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

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-[11px] px-2.5 py-1 gap-1.5',
    lg: 'text-xs px-3 py-1.5 gap-2'
  };

  const iconSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (interactive && onClick) {
      e.stopPropagation();
      onClick(e, sentiment);
    }
  };

  return (
    <span
      role={interactive && onClick ? 'button' : undefined}
      tabIndex={interactive && onClick ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
          handleClick(e as any);
        }
      }}
      title={`AI Emotional Sentiment: ${sentiment.primaryMood} (${sentiment.primaryMoodUrdu || visualConfig.labelUrdu}) • Confidence: ${sentiment.confidenceScore}%\nClick for deep literary sentiment analysis.`}
      className={`inline-flex items-center rounded-full border transition-all duration-200 select-none ${
        visualConfig.bgClass
      } ${visualConfig.borderClass} ${visualConfig.textClass} ${
        interactive && onClick 
          ? 'cursor-pointer hover:scale-105 hover:brightness-125 focus:outline-none focus:ring-1 focus:ring-amber-400' 
          : ''
      } ${sizeClasses[size]} ${className}`}
    >
      {/* Mood Icon */}
      {renderIcon(iconSizes[size])}

      {/* Mood Label in English */}
      <span className="font-sans font-medium tracking-wide">
        {sentiment.primaryMood}
      </span>

      {/* Mood Label in Nastaliq */}
      {showUrdu && (
        <span className="font-nastaliq opacity-90 text-[1.05em] leading-none pt-0.5" dir="rtl">
          {sentiment.primaryMoodUrdu || visualConfig.labelUrdu}
        </span>
      )}

      {/* AI Sparkle Indicator */}
      {showAiBadge && (
        <span 
          className="flex items-center justify-center rounded-full bg-black/40 px-1 py-0.2 text-[8px] font-mono tracking-tighter opacity-80"
          title="Analyzed with Gemini 3.8 Flash AI"
        >
          AI
        </span>
      )}
    </span>
  );
};
