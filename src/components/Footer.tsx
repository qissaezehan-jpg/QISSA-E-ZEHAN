import React from 'react';
import { BookOpen, Heart, Feather, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-black border-t border-stone-850 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand & Mission: Qissa-e-Zehan */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full relative flex-shrink-0">
                <img
                  src="/logo.svg"
                  alt="قصۂ ذہن — Qissa-e-Zehan Logo"
                  className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.4)]"
                />
              </div>
              <div>
                <span className="font-nastaliq text-2xl text-amber-300 font-bold block leading-none">قصۂ ذہن</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-500/80 font-mono">QISSA-E-ZEHAN</span>
              </div>
            </div>
            <p className="font-nastaliq text-sm text-amber-200/90 leading-loose">
              کلاسیکی شاعری، زندہ سوالات، وقت سے ماورا گفتگو
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An authentic sanctuary dedicated to classical Urdu poetry, existential inquiries, deep literary discourse, calligraphy, and timeless verses.
            </p>
            <p className="font-nastaliq text-sm text-amber-400/90 leading-loose">
              اردو ہے جس کا نام ہمیں جانتے ہیں داغؔ • سارے جہاں میں دھوم ہماری زباں کی ہے
            </p>
          </div>

          {/* Quick Sections */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-300 font-semibold mb-3">
              ادبی شعبے (Sections)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTab('daily-sher')} className="hover:text-amber-300 transition-colors text-amber-400 font-medium">
                  شعرِ روزانہ (Daily Sher)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('reflections')} className="hover:text-amber-300 transition-colors text-amber-300 font-medium">
                  روزنامچۂ دل (Daily Reflections)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('poetry')} className="hover:text-amber-300 transition-colors">
                  دیوان و کلام (Poetry Library)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('search-grounding')} className="hover:text-amber-300 transition-colors">
                  تحقیق و تصدیق (Google Search Grounding)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('live-voice')} className="hover:text-amber-300 transition-colors">
                  بزمِ آواز لائیو (Live Voice Companion)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('poets')} className="hover:text-amber-300 transition-colors">
                  شعرائے کرام (Masters of Verse)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('arts')} className="hover:text-amber-300 transition-colors">
                  اصناف و فنونِ بلاغت (Poetic Devices & Genres)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('card-maker')} className="hover:text-amber-300 transition-colors">
                  کارڈ اسٹوڈیو (Card Creator Studio)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('bait-bazi')} className="hover:text-amber-300 transition-colors">
                  بیت بازی (Bait Bazi Game)
                </button>
              </li>
            </ul>
          </div>

          {/* Literary Heritage */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-300 font-semibold mb-3">
              کلاسیکی روایات (Traditions)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>دبستانِ دہلی و لکھنؤ</li>
              <li>ترقی پسند تحریک (Progressive Writers)</li>
              <li>فنِ داستان گوئی (Dastangoi Tradition)</li>
              <li>صنائع و بدائع (Poetic Rhetoric)</li>
              <li>علمِ عروض و تقطیع</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & appreciation */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} قصۂ ذہن (QISSA-E-ZEHAN) — Dedicated to the Lovers of Urdu Literature Worldwide.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Classical Urdu Poetry & Literary Arts</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
