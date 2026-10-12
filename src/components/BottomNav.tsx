import React from 'react';
import { Home, BookOpen, Sparkles, Scale, Grid } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface BottomNavProps {
  lang: Language;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMoreMenu: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  lang,
  activeTab,
  setActiveTab,
  onOpenMoreMenu
}) => {
  const items = [
    { id: 'home', labelKey: 'navHome', icon: Home },
    { id: 'child-report', labelKey: 'navReportGuide', icon: Scale },
    { id: 'assistant', labelKey: 'navAsk', icon: Sparkles, highlight: true },
    { id: 'guide', labelKey: 'navGuide', icon: BookOpen },
    { id: 'more', labelKey: 'navMore', icon: Grid, isMore: true },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 start-0 end-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#185C7A]/20 shadow-lg px-2 py-1.5 no-print">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isHighlight = item.highlight;

          if (item.isMore) {
            return (
              <button
                key={item.id}
                onClick={onOpenMoreMenu}
                className="flex flex-col items-center justify-center p-1 text-[#123B4A]/80 hover:text-[#185C7A] transition cursor-pointer"
              >
                <Icon className="w-5 h-5 text-[#185C7A]" />
                <span className="text-[10px] font-medium mt-0.5">
                  {getTranslation(lang, 'navMore')}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1 relative transition cursor-pointer ${
                isActive
                  ? 'text-[#185C7A] font-bold'
                  : 'text-[#123B4A]/70 hover:text-[#185C7A]'
              }`}
            >
              {isHighlight ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#185C7A] to-[#2F8F83] text-white flex items-center justify-center shadow-md -mt-2">
                  <Icon className="w-4 h-4 text-[#F2C86B]" />
                </div>
              ) : (
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#185C7A]' : 'text-[#123B4A]/60'}`} />
              )}
              <span className={`text-[10px] ${isActive ? 'font-bold text-[#185C7A]' : 'font-medium mt-0.5'}`}>
                {getTranslation(lang, item.labelKey as any)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
