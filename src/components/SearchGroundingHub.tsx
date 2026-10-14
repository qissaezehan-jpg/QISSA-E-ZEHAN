import React, { useState } from 'react';
import { Search, Globe, ExternalLink, Sparkles, CheckCircle2, AlertCircle, BookOpen, HelpCircle } from 'lucide-react';

interface GroundedSource {
  title: string;
  uri: string;
}

interface SearchGroundingResult {
  text: string;
  sources: GroundedSource[];
  searchQueries: string[];
  model: string;
}

interface SearchGroundingHubProps {
  fontPreference: string;
}

export const SearchGroundingHub: React.FC<SearchGroundingHubProps> = ({ fontPreference }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'attribution' | 'biography' | 'history' | 'criticism'>('attribution');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchGroundingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  const presetQueries = [
    { label: 'شعر کی اصل نسبت (Attribution Check)', q: 'کیا یہ شعر غالب کا ہے: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے" یا کسی اور کا؟' },
    { label: 'فیض کا لینن امن انعام (Historical Context)', q: 'فیض احمد فیض کو لینن امن انعام کب اور کیوں دیا گیا تھا؟' },
    { label: 'میر تقی میر اور سودا کی معرکہ آرائی', q: 'میر تقی میر اور مرزا محمد رفیع سودا کے مابین دبستانِ دہلی کے ادبی مباحث کی تاریخ' },
    { label: 'جدید اردو نظم و ترقی پسند تحریک', q: 'ترقی پسند مصنفین کی پہلی کانفرنس لکھنؤ ۱۹۳۶ کے اہم فیصلے اور منشی پریم چند کا خطبہ' }
  ];

  const handleSearch = async (targetQuery?: string) => {
    const q = targetQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/literary-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, searchType })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Search grounding request failed');
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to retrieve grounded literary information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-medium mb-1">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>گوگل سرچ گراؤنڈنگ • Google Search Grounded Intelligence</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-stone-100 font-normal">
          ادبی تحقیق و تصدیق — Real-Time Literary Research
        </h2>
        <p className="text-stone-400 text-sm mt-1 max-w-3xl">
          Query Google Search data in real time via <strong className="text-amber-300">gemini-3.5-flash</strong> to verify couplet attributions, trace manuscript records, and research historical literary milestones with authentic citations.
        </p>
      </div>

      {/* Query Input Section */}
      <div className="mt-8 bg-stone-900/80 border-2 border-amber-800/40 rounded-2xl p-6 shadow-xl gold-glow">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-stone-500 font-sans">تحقیق کا دائرہ:</span>
          {[
            { id: 'attribution', label: 'صحتِ انتساب (Attribution)' },
            { id: 'biography', label: 'سوانح و تاریخی کوائف (Biography)' },
            { id: 'history', label: 'ادبی تحریکات (Literary Movements)' },
            { id: 'criticism', label: 'تنقید و معاصر تحقیق (Modern Criticism)' },
          ].map(type => (
            <button
              key={type.id}
              onClick={() => setSearchType(type.id as typeof searchType)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                searchType === type.id
                  ? 'bg-amber-800 text-amber-100 border border-amber-600'
                  : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Search Input Field */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="شعر کی نسبت، شاعر کی زندگی یا تاریخی واقعے کے بارے میں دریافت کریں..."
              className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'گوگل سرچ جاری ہے...' : 'تحقیق کریں (Search Grounded)'}</span>
          </button>
        </form>

        {/* Preset Prompt Suggestions */}
        <div className="mt-4 pt-3 border-t border-stone-800/80">
          <span className="text-[11px] text-stone-500 block mb-2 font-mono">
            تجویز کردہ فکری و تحقیقی سوالات:
          </span>
          <div className="flex flex-wrap gap-2">
            {presetQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(item.q);
                  handleSearch(item.q);
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-stone-950/70 hover:bg-amber-950/50 border border-stone-800 hover:border-amber-700/60 text-stone-300 hover:text-amber-200 transition-colors text-left"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-8 p-12 text-center bg-stone-900/40 rounded-2xl border border-amber-800/40 animate-pulse">
          <Globe className="w-8 h-8 text-amber-400 mx-auto mb-3 animate-spin" />
          <h3 className="font-nastaliq text-2xl text-amber-200 mb-1">
            گوگل سرچ کے مستند ماخذات سے معلومات جمع کی جا رہی ہیں...
          </h3>
          <p className="text-xs text-stone-400 font-mono">
            Querying Google Search Grounding with gemini-3.5-flash...
          </p>
        </div>
      )}

      {/* Error Notice */}
      {error && (
        <div className="mt-8 p-4 rounded-2xl bg-rose-950/60 border border-rose-700 text-rose-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grounded Results Display */}
      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          
          <div className="bg-stone-900/90 border-2 border-amber-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl gold-glow space-y-6">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider font-mono">
                  Grounded with Google Search
                </span>
                <span className="text-[11px] text-stone-500 font-mono">
                  • {result.model}
                </span>
              </div>

              {result.searchQueries.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <span>سرچ کے سوالات:</span>
                  {result.searchQueries.map((sq, sqIdx) => (
                    <span key={sqIdx} className="px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-amber-300 font-mono text-[10px]">
                      "{sq}"
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Answer Content */}
            <div className="prose prose-invert max-w-none">
              <div 
                dir="rtl"
                className={`${fontClass} text-base sm:text-lg text-amber-100 leading-loose whitespace-pre-line text-right`}
              >
                {result.text}
              </div>
            </div>

            {/* Verified Google Search Web Sources */}
            {result.sources && result.sources.length > 0 && (
              <div className="pt-6 border-t border-stone-800/90">
                <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 flex items-center gap-2 font-mono">
                  <Globe className="w-3.5 h-3.5" />
                  <span>تصدیق شدہ ویب ماخذات و حوالہ جات (Google Search Sources)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {result.sources.map((source, sIdx) => (
                    <a
                      key={sIdx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-stone-950/80 hover:bg-amber-950/30 border border-stone-800 hover:border-amber-700/60 text-xs text-stone-300 hover:text-amber-200 transition-all flex items-start justify-between gap-2 group"
                    >
                      <div className="overflow-hidden">
                        <span className="font-medium text-stone-200 group-hover:text-amber-300 line-clamp-1 block">
                          {source.title}
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono truncate block mt-0.5">
                          {source.uri.replace(/^https?:\/\//, '').split('/')[0]}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 flex-shrink-0 mt-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
