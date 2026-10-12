import React, { useState } from 'react';
import { Search, Globe, Menu, X, Shield, PhoneCall, Sparkles, BookOpen, GraduationCap, Users, FileText, HelpCircle, HeartHandshake, Scale, Heart, Building2, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { FontSizeControl } from './FontSizeControl';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchSubmit?: (query: string) => void;
  onOpenEmergency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  activeTab,
  setActiveTab,
  onSearchSubmit,
  onOpenEmergency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  const navItems = [
    { id: 'home', labelKey: 'navHome', icon: BookOpen },
    { id: 'child-report', labelKey: 'navReportGuide', icon: Scale, badge: true },
    { id: 'child-restoration', labelKey: 'navChildRestoration', icon: RotateCcw, badge: true },
    { id: 'familjebron', labelKey: 'navFamiljebron', icon: Building2, badge: true },
    { id: 'family-advice', labelKey: 'navFamilyAdvice', icon: Heart },
    { id: 'guide', labelKey: 'navGuide', icon: BookOpen },
    { id: 'school', labelKey: 'navSchool', icon: GraduationCap },
    { id: 'social-services', labelKey: 'navSocialServices', icon: Users },
    { id: 'faq', labelKey: 'navFaq', icon: Scale },
    { id: 'assistant', labelKey: 'navAsk', icon: Sparkles, badge: true },
    { id: 'templates', labelKey: 'navTemplates', icon: FileText },
    { id: 'quizzes', labelKey: 'navQuizzes', icon: HelpCircle },
    { id: 'sources', labelKey: 'navSources', icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#185C7A]/10 shadow-xs">
      {/* Top Banner Line */}
      <div className="bg-[#185C7A] text-white py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F2C86B] animate-pulse"></span>
            <span>
              {lang === 'ar'
                ? 'مشروع معرفي مستقل يساند الأسرة العربية في السويد بالمعلومات الرسمية'
                : 'Oberoende kunskapsprojekt som stödjer den arabiska familjen i Sverige'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Font Size Toolbar in Top Header */}
            <FontSizeControl lang={lang} compact />

            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 text-[#F2C86B] hover:underline font-semibold cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'طوارئ ودعم' : 'Nödnummer'}</span>
            </button>
            <button
              onClick={() => onLanguageChange(lang === 'ar' ? 'sv' : 'ar')}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-xs transition cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#F2C86B]" />
              <span>{lang === 'ar' ? 'Svenska' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Title Area */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Familjebron Logo Graphic Placeholder Icon */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#185C7A] to-[#2F8F83] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Bridge Arc */}
                <path d="M3 18C6 11 18 11 21 18" stroke="#F2C86B" strokeWidth="2.5" />
                {/* Family Figures */}
                <circle cx="9" cy="8" r="2" fill="white" />
                <path d="M7 14c0-2 1-3 2-3s2 1 2 3" stroke="white" strokeWidth="1.5" />
                <circle cx="15" cy="8" r="2" fill="white" />
                <path d="M13 14c0-2 1-3 2-3s2 1 2 3" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-[#185C7A] tracking-tight leading-none group-hover:text-[#2F8F83] transition-colors">
                {getTranslation(lang, 'appName')}
              </h1>
              <p className="text-xs text-[#2F8F83] font-semibold mt-1">
                {getTranslation(lang, 'appSubName')} • <span className="text-[#123B4A]/70 font-normal">{getTranslation(lang, 'tagline')}</span>
              </p>
            </div>
          </div>

          {/* Quick Header Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-sm relative mx-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getTranslation(lang, 'searchPlaceholder')}
              className="w-full bg-white border border-[#185C7A]/20 rounded-full py-2 ps-10 pe-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#185C7A] text-[#123B4A] shadow-xs"
            />
            <Search className="w-4 h-4 text-[#185C7A]/60 absolute start-3 top-2.5" />
          </form>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Ask AI Accent Button */}
            <button
              onClick={() => setActiveTab('assistant')}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-[#185C7A] to-[#2F8F83] hover:from-[#124259] hover:to-[#247067] text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F2C86B] animate-spin-slow" />
              <span>{getTranslation(lang, 'navAsk')}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#185C7A] hover:bg-[#185C7A]/10 transition cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-between border-t border-[#185C7A]/10 mt-3 pt-2">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#185C7A] text-white shadow-xs'
                      : 'text-[#123B4A] hover:bg-[#185C7A]/10 hover:text-[#185C7A]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F2C86B]' : 'text-[#185C7A]'}`} />
                  <span>{getTranslation(lang, item.labelKey as any)}</span>
                  {item.badge && (
                    <span className="bg-[#F2C86B] text-[#123B4A] text-[10px] px-1.5 py-0.2 rounded-full font-bold ms-0.5">
                      جديد
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveTab('about')}
              className={`hover:underline font-medium cursor-pointer ${
                activeTab === 'about' ? 'text-[#185C7A] font-bold' : 'text-[#123B4A]/80'
              }`}
            >
              {getTranslation(lang, 'navAbout')}
            </button>
            <span className="text-[#185C7A]/20">•</span>
            <button
              onClick={() => setActiveTab('contact')}
              className={`hover:underline font-medium cursor-pointer ${
                activeTab === 'contact' ? 'text-[#185C7A] font-bold' : 'text-[#123B4A]/80'
              }`}
            >
              {getTranslation(lang, 'navContact')}
            </button>
            <span className="text-[#185C7A]/20">•</span>
            <button
              onClick={() => setActiveTab('admin')}
              className="text-[#2F8F83] font-bold hover:underline cursor-pointer"
            >
              {getTranslation(lang, 'navAdmin')}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#185C7A]/20 p-4 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <FontSizeControl lang={lang} />

          <form onSubmit={handleSearch} className="flex items-center relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getTranslation(lang, 'searchPlaceholder')}
              className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-lg py-2 ps-9 pe-3 text-xs text-[#123B4A]"
            />
            <Search className="w-4 h-4 text-[#185C7A]/60 absolute start-2.5 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-start transition cursor-pointer ${
                    isActive
                      ? 'bg-[#185C7A] text-white'
                      : 'bg-[#F7F5EF] text-[#123B4A] hover:bg-[#185C7A]/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F2C86B]' : 'text-[#185C7A]'}`} />
                  <span>{getTranslation(lang, item.labelKey as any)}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#185C7A]/10 flex items-center justify-between text-xs text-[#123B4A]/80">
            <button
              onClick={() => {
                setActiveTab('about');
                setMobileMenuOpen(false);
              }}
              className="hover:underline font-medium"
            >
              {getTranslation(lang, 'navAbout')}
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                setMobileMenuOpen(false);
              }}
              className="hover:underline font-medium"
            >
              {getTranslation(lang, 'navContact')}
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="text-[#2F8F83] font-bold"
            >
              {getTranslation(lang, 'navAdmin')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
