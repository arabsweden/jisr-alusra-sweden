import React from 'react';
import { ShieldCheck, Heart, Facebook, Globe, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface FooterProps {
  lang: Language;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setActiveTab }) => {
  return (
    <footer className="bg-[#123B4A] text-white pt-12 pb-24 lg:pb-12 border-t-4 border-[#185C7A]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#185C7A] flex items-center justify-center text-[#F2C86B] font-bold shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18C6 11 18 11 21 18" stroke="#F2C86B" strokeWidth="2.5" />
                  <circle cx="9" cy="8" r="2" fill="white" />
                  <circle cx="15" cy="8" r="2" fill="white" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-none">
                  {getTranslation(lang, 'appName')}
                </h2>
                <p className="text-xs text-[#F2C86B] mt-1 font-medium">
                  {getTranslation(lang, 'appSubName')}
                </p>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed">
              {getTranslation(lang, 'footerDesc')}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white/90">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F2C86B] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  {getTranslation(lang, 'independentProjectDisclaimer')}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Nav */}
          <div>
            <h3 className="text-sm font-bold text-[#F2C86B] mb-3 border-b border-white/10 pb-2">
              {getTranslation(lang, 'footerQuickLinks')}
            </h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button onClick={() => setActiveTab('guide')} className="hover:text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'navGuide')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('school')} className="hover:text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'navSchool')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('social-services')} className="hover:text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'navSocialServices')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('faq')} className="hover:text-[#F2C86B] font-bold text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'navFaq')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('assistant')} className="hover:text-[#F2C86B] flex items-center gap-1 transition cursor-pointer">
                  <Sparkles className="w-3 h-3 text-[#F2C86B]" />
                  <span>{getTranslation(lang, 'navAsk')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('survey')} className="hover:text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'navSurvey')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('templates')} className="hover:text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'navTemplates')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Bodies */}
          <div>
            <h3 className="text-sm font-bold text-[#F2C86B] mb-3 border-b border-white/10 pb-2">
              {getTranslation(lang, 'footerOfficialBodies')}
            </h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <a href="https://www.skolverket.se/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2C86B] transition">
                  Skolverket - مصلحة المدارس
                </a>
              </li>
              <li>
                <a href="https://www.skolinspektionen.se/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2C86B] transition">
                  Skolinspektionen - مفتشية المدارس
                </a>
              </li>
              <li>
                <a href="https://www.socialstyrelsen.se/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2C86B] transition">
                  Socialstyrelsen - الخدمات الاجتماعية
                </a>
              </li>
              <li>
                <a href="https://www.1177.se/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2C86B] transition">
                  1177 Vårdguiden - الرعاية الصحية
                </a>
              </li>
              <li>
                <a href="https://www.barnombudsmannen.se/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2C86B] transition">
                  Barnombudsmannen - أمين مظالم الأطفال
                </a>
              </li>
              <li>
                <a href="https://www.mfof.se/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2C86B] transition">
                  MFOF - مصلحة حقوق الأسرة
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#F2C86B] mb-3 border-b border-white/10 pb-2">
              {getTranslation(lang, 'footerLegal')}
            </h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'navAbout')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="hover:text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'privacyPolicyLink')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('terms')} className="hover:text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'termsOfUseLink')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('methodology')} className="hover:text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'methodologyLink')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-[#F2C86B] transition cursor-pointer">
                  {getTranslation(lang, 'navContact')}
                </button>
              </li>
            </ul>

            {/* Social Share & Links */}
            <div className="pt-2 border-t border-white/10">
              <p className="text-xs font-semibold text-white/90 mb-2">تابع ونشر الصفحة:</p>
              <div className="flex items-center gap-2 text-xs">
                <a
                  href="https://www.facebook.com/Familjebron.Sverige"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-white/10 hover:bg-[#185C7A] text-white px-2.5 py-1 rounded transition"
                  title="صفحة الفيسبوك"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#F2C86B]" />
                  <span>فيسبوك</span>
                </a>
                <a
                  href="https://familjebron-sverige.a-abushihab.chatgpt.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-white/10 hover:bg-[#185C7A] text-white px-2.5 py-1 rounded transition"
                  title="رابط الاستبيان"
                >
                  <Globe className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>الاستبيان</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col items-center justify-center text-center text-xs text-white/70 gap-2">
          <div className="font-mono text-sm tracking-widest font-black text-[#F2C86B] uppercase">
            RAED SHIHAB
          </div>
          <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-white/90 border border-white/15">
            تطبيق بالذكاء الاصطناعي لا نتحمل اي مسوولية
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-3 pt-3 border-t border-white/5 text-[11px] text-white/60 gap-2">
            <p>© 2026 {getTranslation(lang, 'appName')}. جميع الحقوق محفوظة. مشروع معرفي مستقل.</p>
            <div className="flex items-center gap-1 text-[#F2C86B]">
              <span>بُني بمحبة لخدمة الأسرة والمجتمع</span>
              <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
