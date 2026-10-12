import React, { useState } from 'react';
import { Search, Sparkles, ShieldCheck, ArrowLeft, HeartHandshake, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface HeroProps {
  lang: Language;
  onSearch: (query: string) => void;
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onSearch, setActiveTab }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="space-y-0 relative mb-8">
      {/* Hero Banner with #2F8F83 Muted Teal Background */}
      <section className="bg-[#2F8F83] text-white px-6 py-10 sm:py-12 rounded-3xl shadow-md relative overflow-hidden flex flex-col items-center text-center">
        {/* Subtle Decorative Accents */}
        <div className="absolute -top-16 -end-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -start-16 w-64 h-64 rounded-full bg-[#F2C86B]/20 blur-2xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          {/* Official Verification Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            <ShieldCheck className="w-4 h-4 text-[#F2C86B]" />
            <span>
              {lang === 'ar'
                ? 'معلومات عربية موثوقة مستندة للمصادر السويدية الرسمية'
                : 'Tillförlitlig information baserad på officiella svenska källor'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
            {getTranslation(lang, 'heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/95 max-w-2xl mx-auto leading-relaxed font-normal">
            {getTranslation(lang, 'heroSubtitle')}
          </p>

          {/* Action Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setActiveTab('guide')}
              className="bg-[#F2C86B] hover:bg-[#e0b85a] text-[#123B4A] px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition transform hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>{getTranslation(lang, 'btnStartHere')}</span>
              <ArrowLeft className={`w-4 h-4 ${lang === 'sv' ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2.5 rounded-full font-bold text-sm transition cursor-pointer flex items-center gap-2 border border-white/20"
            >
              <BookOpen className="w-4 h-4" />
              <span>{getTranslation(lang, 'btnBrowseGuide')}</span>
            </button>

            <button
              onClick={() => setActiveTab('survey')}
              className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-full font-bold text-sm transition cursor-pointer flex items-center gap-2 border border-white/20"
            >
              <HeartHandshake className="w-4 h-4 text-[#F2C86B]" />
              <span>{getTranslation(lang, 'btnTakeSurvey')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Overlapping Gold-Bordered Pill Search Bar */}
      <div className="flex justify-center -mt-6 relative z-20 px-4">
        <div className="w-full max-w-2xl bg-white rounded-full p-1.5 sm:p-2 border-2 border-[#F2C86B] shadow-xl flex items-center">
          <form onSubmit={handleSubmit} className="flex items-center w-full">
            <Search className="w-5 h-5 text-[#185C7A] ms-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={getTranslation(lang, 'searchPlaceholder')}
              className="w-full bg-transparent px-3 py-1.5 text-sm text-[#123B4A] focus:outline-none placeholder:text-[#123B4A]/50 font-medium"
            />
            <button
              type="submit"
              className="bg-[#185C7A] hover:bg-[#124259] text-white px-5 py-2 rounded-full font-bold text-xs shrink-0 transition cursor-pointer shadow-xs"
            >
              {getTranslation(lang, 'btnSearch')}
            </button>
          </form>
        </div>
      </div>

      {/* Quick Search Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-[#123B4A]/70">
        <span className="font-semibold">{lang === 'ar' ? 'الأكثر بحثاً:' : 'Populära sökningar:'}</span>
        {['التسجيل بالمدرسة', 'السوسيال', 'حقوق الوالدين', 'اجتماع EVK', 'إجازة الوالدين'].map((chip, idx) => (
          <button
            key={idx}
            onClick={() => {
              setQuery(chip);
              onSearch(chip);
            }}
            className="bg-white hover:bg-[#185C7A]/10 border border-[#185C7A]/15 px-3 py-1 rounded-full text-[11px] font-semibold text-[#185C7A] transition cursor-pointer shadow-2xs"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};
