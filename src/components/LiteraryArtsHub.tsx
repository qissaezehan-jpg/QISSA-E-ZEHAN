import React, { useState } from 'react';
import { POETIC_DEVICES, ASNAF_E_SUKHAN, LITERARY_FIGURES } from '../data/literaryArtsData';
import { Layers, Sparkles, BookOpen, Volume2 } from 'lucide-react';
import { ambienceEngine } from '../utils/audioAmbience';

interface LiteraryArtsHubProps {
  fontPreference: string;
}

export const LiteraryArtsHub: React.FC<LiteraryArtsHubProps> = ({ fontPreference }) => {
  const [activeSubTab, setActiveSubTab] = useState<'genres' | 'devices' | 'prose'>('genres');

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const subTabs = [
    { id: 'genres', labelUrdu: 'اصنافِ سخن', labelEn: 'Poetic Genres', icon: Layers },
    { id: 'devices', labelUrdu: 'صنائع و بدائع', labelEn: 'Poetic Devices', icon: Sparkles },
    { id: 'prose', labelUrdu: 'داستان گوئی و افسانہ', labelEn: 'Prose Masters', icon: BookOpen },
  ];

  const handleReciteExample = (sher: { misra1: string; misra2: string }) => {
    const text = `${sher.misra1} ... ${sher.misra2}`;
    ambienceEngine.reciteText(text, 'ur');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-medium mb-1">
          <Sparkles className="w-4 h-4" />
          <span>فنونِ بلاغت، اصناف و ادبی روایات</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-stone-100 font-normal">
          ادبی اصناف و فنونِ سخن — Poetic Genres & Literary Arts
        </h2>
        <p className="text-stone-400 text-sm mt-1 max-w-3xl">
          Explore the architectural anatomy of the Ghazal, the mastery of figures of speech (Sanaye Badaye), and the iconic traditions of Urdu fiction and Dastangoi.
        </p>
      </div>

      {/* Navigation Subtabs */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-stone-800/80 pb-4">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-800 text-amber-100 shadow-lg shadow-amber-950/60 border border-amber-600/50'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-850'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
              <span className="font-nastaliq text-base leading-none pt-0.5">{tab.labelUrdu}</span>
              <span className="text-xs text-stone-400 hidden sm:inline">({tab.labelEn})</span>
            </button>
          );
        })}
      </div>

      {/* 1. POETIC GENRES (ASNAF-E-SUKHAN) */}
      {activeSubTab === 'genres' && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ASNAF_E_SUKHAN.map((genre, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 hover:border-amber-700/60 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-amber-950/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <h3 className="font-nastaliq text-2xl text-amber-300 leading-none">
                      {genre.nameUrdu}
                    </h3>
                    <span className="text-xs text-stone-500 font-mono">
                      {genre.nameEnglish}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-amber-400/90 font-medium">
                    ماخذ: {genre.origin}
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 text-xs text-stone-300 leading-relaxed">
                    <span className="font-semibold text-amber-400 block mb-1">ساخت و ارکان:</span>
                    {genre.structure}
                  </div>

                  <div className="mt-4 text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
                    {genre.essence}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800/80 text-[11px] text-stone-500 flex items-center justify-between">
                  <span>اصنافِ شعر و ادب</span>
                  <span className="text-amber-500">✦</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Ghazal Anatomy Infographic */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border-2 border-amber-800/60">
            <h3 className="font-nastaliq text-2xl sm:text-3xl text-amber-200 text-center mb-4">
              غزل کی جامع ساخت — Anatomy of the Classical Ghazal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-300">
              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
                <span className="font-nastaliq text-lg text-amber-300 block mb-1">مطلع (Matla)</span>
                <p className="text-stone-400">The opening couplet where both hemistichs (misras) strictly rhyme with each other (ہم قافیہ و ہم ردیف).</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
                <span className="font-nastaliq text-lg text-amber-300 block mb-1">قافیہ و ردیف (Qafia & Radif)</span>
                <p className="text-stone-400">Qafia is the rhyming word preceding the Radif; Radif is the unchanging refraining word or phrase repeated at the end.</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
                <span className="font-nastaliq text-lg text-amber-300 block mb-1">بحر (Meter / Wazn)</span>
                <p className="text-stone-400">The rhythmic meter (Urooz) governed by poetic feet (Afayeel), giving each ghazal its musical heartbeat.</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
                <span className="font-nastaliq text-lg text-amber-300 block mb-1">مقطع (Maqta)</span>
                <p className="text-stone-400">The concluding couplet where the poet weaves their pen name (تخلص - Takhallus), sealing the ghazal with personal flair.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. POETIC DEVICES (SANAYE BADAYE) */}
      {activeSubTab === 'devices' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {POETIC_DEVICES.map((device, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 border border-stone-800 hover:border-amber-700/60 rounded-2xl p-6 sm:p-8 transition-all hover:shadow-xl hover:shadow-amber-950/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <h3 className="font-nastaliq text-2xl sm:text-3xl text-amber-200 leading-tight">
                    {device.nameUrdu}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-stone-950 border border-amber-800/40 text-[11px] text-amber-300 font-mono">
                    {device.nameEnglish}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-stone-300">
                  <p dir="rtl" className="font-nastaliq text-base text-stone-200 leading-loose text-right">
                    {device.explanationUrdu}
                  </p>
                  <p className="font-serif italic text-stone-400 pt-1">
                    {device.explanationEnglish}
                  </p>
                </div>

                {/* Example Couplet */}
                <div className="mt-5 p-4 rounded-xl bg-stone-950/80 border border-amber-900/40 text-center relative group">
                  <div className="text-[10px] uppercase tracking-wider text-amber-500/80 mb-1 font-mono">
                    مثال / Example Sher — {device.exampleSher.poet}
                  </div>
                  <p 
                    dir="rtl" 
                    className={`${fontClass} text-lg sm:text-xl text-amber-200 leading-loose`}
                  >
                    {device.exampleSher.misra1}
                  </p>
                  <p 
                    dir="rtl" 
                    className={`${fontClass} text-lg sm:text-xl text-amber-300 leading-loose`}
                  >
                    {device.exampleSher.misra2}
                  </p>

                  <div className="mt-3 pt-2 border-t border-stone-800 text-xs text-stone-400 text-left">
                    <span className="text-amber-400 font-medium">تجزیہ (Analysis): </span>
                    {device.exampleSher.explanation}
                  </div>

                  <button
                    onClick={() => handleReciteExample(device.exampleSher)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-300 transition-colors"
                    title="Recite example"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-500 flex items-center justify-between">
                <span>صنائعِ {device.category === 'Lafzi' ? 'لفظی (Verbal)' : 'معنوی (Conceptual)'}</span>
                <span className="text-amber-400">✦</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. PROSE MASTERS & DASTANGOI */}
      {activeSubTab === 'prose' && (
        <div className="mt-8 space-y-8">
          
          {/* Dastangoi spotlight banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/70 via-stone-900 to-amber-950/40 border-2 border-amber-700/50 gold-glow">
            <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>قدیم فنِ داستان گوئی — The Art of Dastangoi</span>
            </div>
            <h3 className="font-nastaliq text-2xl sm:text-3xl text-amber-100 mb-2">
              طلسمِ ہوش ربا اور داستانِ امیر حمزہ کی سحر انگیزی
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
              Dastangoi is the 16th-century oral storytelling tradition of Urdu, performed by a solitary narrator in white muslin robes who transports the audience to realms of sorcery (Tilism), heroic duels (Razm), romance (Bazm), and trickery (Ayyari). Reaching its legendary zenith in the 46 volumes of Tilism-e-Hoshruba, it remains one of humanity’s greatest oral epics.
            </p>
          </div>

          {/* Modern Afsana (Short Story) Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LITERARY_FIGURES.map((figure, fIdx) => (
              <div
                key={fIdx}
                className="bg-stone-900/70 border border-stone-800 hover:border-amber-700/60 rounded-2xl p-6 transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between pb-3 border-b border-stone-800">
                    <div>
                      <h4 className="font-nastaliq text-2xl text-amber-200 leading-none pb-1">
                        {figure.nameUrdu}
                      </h4>
                      <p className="text-xs text-stone-400 font-sans">{figure.nameEnglish}</p>
                    </div>
                    <span className="text-[11px] font-mono text-stone-500">{figure.era}</span>
                  </div>

                  <div className="mt-3 text-xs text-amber-400 font-medium">
                    {figure.field}
                  </div>

                  <div className="mt-3 p-3 rounded-xl bg-stone-950 border border-stone-800/80 text-xs text-stone-300">
                    <span className="text-stone-500 block">شاہکار تصانیف:</span>
                    <span className="font-nastaliq text-amber-300 text-sm block">{figure.masterpieceUrdu}</span>
                    <span className="text-stone-400 font-serif italic text-[11px]">{figure.masterpieceEnglish}</span>
                  </div>

                  <p className="mt-4 text-xs text-stone-400 leading-relaxed font-sans">
                    {figure.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-500">
                  اردو افسانہ و نثری روایت
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
