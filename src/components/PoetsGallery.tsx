import React, { useState } from 'react';
import { Poet } from '../types/poetry';
import { POETS } from '../data/poetsData';
import { Feather, MapPin, Calendar, BookOpen, Volume2, Quote } from 'lucide-react';
import { ambienceEngine } from '../utils/audioAmbience';

interface PoetsGalleryProps {
  fontPreference: string;
  onSelectPoetForPoetry: (poetId: string) => void;
}

export const PoetsGallery: React.FC<PoetsGalleryProps> = ({
  fontPreference,
  onSelectPoetForPoetry
}) => {
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [activePoetDetail, setActivePoetDetail] = useState<Poet | null>(null);

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const schools = [
    { id: 'all', label: 'تمام مکاتبِ فکر (All Schools)' },
    { id: 'Dabistan-e-Delhi', label: 'دبستانِ دہلی (Delhi School)' },
    { id: 'Classical Renaissance', label: 'احیائے نو و فکرِ اقبال' },
    { id: 'Modern & Progressive', label: 'ترقی پسند و جدید شعراء' },
  ];

  const filteredPoets = selectedSchool === 'all'
    ? POETS
    : POETS.filter(p => p.school === selectedSchool);

  const handleReciteQuote = (e: React.MouseEvent, quote: string) => {
    e.stopPropagation();
    ambienceEngine.reciteText(quote, 'ur');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-medium mb-1">
          <Feather className="w-4 h-4" />
          <span>تذکرۂ شعرائے کرام</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-stone-100 font-normal">
          عظیم شعرائے اردو — The Masters of Urdu Verse
        </h2>
        <p className="text-stone-400 text-sm mt-1 max-w-3xl">
          From the classical melancholy of Mir and philosophical brilliance of Ghalib, to Iqbal’s cosmic revival and Faiz’s revolutionary anthems.
        </p>
      </div>

      {/* School Filter Tabs */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {schools.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedSchool(s.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedSchool === s.id
                ? 'bg-amber-800 text-amber-100 shadow-md shadow-amber-950/50 border border-amber-600/50'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Poets Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPoets.map((poet) => {
          return (
            <div
              key={poet.id}
              className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 rounded-2xl border border-stone-800 hover:border-amber-600/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/20 flex flex-col justify-between relative group"
            >
              <div>
                
                {/* Poet Header Info */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${poet.avatarColor} border border-amber-500/40 flex items-center justify-center text-amber-200 font-bold text-xl shadow-lg`}>
                      <span className="font-nastaliq">{poet.takhallus.slice(0, 4)}</span>
                    </div>
                    <div>
                      <h3 className="font-nastaliq text-2xl sm:text-3xl text-amber-200 group-hover:text-amber-100 transition-colors leading-relaxed">
                        {poet.nameUrdu}
                      </h3>
                      <p className="text-sm text-stone-300 font-serif font-medium">
                        {poet.nameEnglish}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-800/50 text-[11px] text-amber-300 whitespace-nowrap">
                    {poet.schoolUrdu}
                  </span>
                </div>

                {/* Lifetime & Origins */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{poet.era}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>پیدائش: {poet.birthPlace}</span>
                  </span>
                  <span className="text-stone-500">
                    مدفن: {poet.restingPlace}
                  </span>
                </div>

                {/* Urdu Biography snippet */}
                <div className="mt-4 p-4 rounded-xl bg-stone-950/70 border border-stone-800/80">
                  <p dir="rtl" className="font-nastaliq text-sm sm:text-base text-stone-200 leading-loose text-right">
                    {poet.bioUrdu}
                  </p>
                  <p className="mt-2 pt-2 border-t border-stone-800 text-xs text-stone-400 font-serif italic">
                    {poet.bioEnglish}
                  </p>
                </div>

                {/* Signature Sher Quote */}
                <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/20 border border-amber-900/40 relative">
                  <Quote className="absolute top-2 left-2 w-4 h-4 text-amber-500/30" />
                  <div className="text-center px-4">
                    <p 
                      dir="rtl" 
                      className={`${fontClass} text-lg sm:text-xl text-amber-300 leading-loose whitespace-pre-line`}
                    >
                      {poet.quoteUrdu}
                    </p>
                    <p className="mt-1 text-xs text-stone-400 font-serif italic">
                      "{poet.quoteEnglish}"
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleReciteQuote(e, poet.quoteUrdu)}
                    className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-700 transition-colors"
                    title="Recite signature couplet"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {poet.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-[10px] text-stone-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectPoetForPoetry(poet.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-200 hover:text-amber-100 border border-amber-700/60 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>کلام پڑھیں</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
