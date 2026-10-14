import React from 'react';

interface QissaZehanLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  emblemOnly?: boolean;
  className?: string;
}

export const QissaZehanLogo: React.FC<QissaZehanLogoProps> = ({
  size = 'md',
  showTagline = true,
  emblemOnly = false,
  className = ''
}) => {
  const emblemSizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52',
    xl: 'w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72'
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl md:text-5xl',
    xl: 'text-4xl sm:text-6xl md:text-7xl'
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-xs tracking-[0.25em]',
    lg: 'text-xs sm:text-sm tracking-[0.35em]',
    xl: 'text-sm sm:text-base tracking-[0.4em]'
  };

  if (emblemOnly) {
    return (
      <div className={`relative ${emblemSizes[size]} group cursor-pointer ${className}`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/30 via-yellow-500/20 to-amber-700/30 blur-md group-hover:blur-xl transition-all" />
        <img
          src="/qissa-e-zehan-logo.jpg"
          alt="قصۂ ذہن — Qissa-e-Zehan Logo"
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_8px_24px_rgba(217,119,6,0.45)] group-hover:scale-102 transition-transform duration-300"
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      
      {/* Upper Logo Area: Master Emblem + Calligraphic Name */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
        
        {/* The Exact Circular Emblem Image */}
        <div className={`relative ${emblemSizes[size]} flex-shrink-0 group`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/35 via-yellow-500/25 to-amber-700/35 blur-lg group-hover:blur-2xl transition-all" />
          <img
            src="/qissa-e-zehan-logo.jpg"
            alt="قصۂ ذہن — Qissa-e-Zehan Official Logo Emblem"
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_8px_32px_rgba(217,119,6,0.55)] group-hover:scale-102 transition-transform duration-300"
          />
        </div>

        {/* Brand Name Typography */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          
          {/* Main Urdu Calligraphic Title */}
          <div className="relative">
            <h1 
              dir="rtl"
              className={`font-nastaliq ${titleSizes[size]} font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 leading-[1.8] drop-shadow-[0_2px_14px_rgba(245,158,11,0.5)] select-none`}
            >
              قصۂ ذہن
            </h1>
          </div>

          {/* English Subtitle with Filigree Divider */}
          <div className="flex items-center gap-2 sm:gap-3 my-0.5 sm:my-1">
            <span className="text-amber-500/60 text-xs select-none">❧</span>
            <div className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
            <h2 className={`font-serif uppercase ${subtitleSizes[size]} text-amber-300/90 font-semibold tracking-[0.28em]`}>
              QISSA-E-ZEHAN
            </h2>
            <div className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
            <span className="text-amber-500/60 text-xs select-none">❧</span>
          </div>

        </div>

      </div>

      {/* Persian / Urdu Floral Divider */}
      {showTagline && (
        <div className="mt-4 flex items-center justify-center gap-2 text-amber-500/70 text-xs">
          <span className="select-none">❖</span>
          <div className="h-px w-16 sm:w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <span className="select-none">✦</span>
          <div className="h-px w-16 sm:w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <span className="select-none">❖</span>
        </div>
      )}

      {/* The Iconic Tagline */}
      {showTagline && (
        <p 
          dir="rtl" 
          className="mt-2 font-nastaliq text-base sm:text-lg md:text-xl text-amber-200/90 leading-loose drop-shadow-sm"
        >
          کلاسیکی شاعری، زندہ سوالات، وقت سے ماورا گفتگو
        </p>
      )}

    </div>
  );
};
