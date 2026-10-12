import React, { useState, useEffect } from 'react';
import { Type, Check } from 'lucide-react';
import { Language } from '../types';

export type FontSizeLevel = 'small' | 'medium' | 'large' | 'huge';

interface Props {
  lang?: Language;
  compact?: boolean;
  className?: string;
}

export const applyFontSize = (size: FontSizeLevel) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('font-scale-small', 'font-scale-medium', 'font-scale-large', 'font-scale-huge');
  root.classList.add(`font-scale-${size}`);
  try {
    localStorage.setItem('familjebron_font_size', size);
  } catch (e) {
    console.error('Error saving font size:', e);
  }
};

export const getSavedFontSize = (): FontSizeLevel => {
  if (typeof localStorage === 'undefined') return 'medium';
  try {
    const saved = localStorage.getItem('familjebron_font_size');
    if (saved === 'small' || saved === 'medium' || saved === 'large' || saved === 'huge') {
      return saved as FontSizeLevel;
    }
  } catch (e) {
    console.error('Error reading font size:', e);
  }
  return 'medium';
};

export const FontSizeControl: React.FC<Props> = ({
  lang = 'ar',
  compact = false,
  className = ''
}) => {
  const [currentSize, setCurrentSize] = useState<FontSizeLevel>('medium');

  useEffect(() => {
    const initial = getSavedFontSize();
    setCurrentSize(initial);
    applyFontSize(initial);
  }, []);

  const handleSelect = (size: FontSizeLevel) => {
    setCurrentSize(size);
    applyFontSize(size);
  };

  const isAr = lang === 'ar';

  const options: { id: FontSizeLevel; labelAr: string; labelSv: string; badge: string }[] = [
    { id: 'small', labelAr: 'صغير', labelSv: 'Liten', badge: '15px' },
    { id: 'medium', labelAr: 'متوسط', labelSv: 'Mellan', badge: '18px' },
    { id: 'large', labelAr: 'كبير', labelSv: 'Stor', badge: '21px' },
    { id: 'huge', labelAr: 'كبير جداً', labelSv: 'Jättestor', badge: '24px' }
  ];

  if (compact) {
    return (
      <div className={`flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/20 ${className}`}>
        <span className="text-[11px] font-bold text-[#F2C86B] flex items-center gap-1 px-1.5">
          <Type className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isAr ? 'حجم الخط:' : 'Text:'}</span>
        </span>
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            title={isAr ? `تغيير الخط إلى ${opt.labelAr}` : opt.labelSv}
            className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition cursor-pointer ${
              currentSize === opt.id
                ? 'bg-[#F2C86B] text-[#123B4A] shadow-2xs font-extrabold'
                : 'text-white/80 hover:bg-white/15'
            }`}
          >
            {isAr ? opt.labelAr : opt.labelSv}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`bg-white border border-[#185C7A]/20 p-3.5 rounded-2xl shadow-2xs space-y-2 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-black text-[#123B4A] flex items-center gap-1.5">
          <Type className="w-4 h-4 text-[#2F8F83]" />
          <span>{isAr ? 'حجم خط النصوص والفقرات:' : 'Textstorlek för appen:'}</span>
        </span>
        <span className="text-[10px] bg-[#F2C86B]/20 text-[#123B4A] px-2 py-0.5 rounded-full font-black">
          {isAr ? 'يحفظ تلقائياً' : 'Sparas'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer border ${
              currentSize === opt.id
                ? 'bg-[#185C7A] text-white border-[#185C7A] shadow-2xs'
                : 'bg-[#F7F5EF] text-[#123B4A] border-gray-200 hover:bg-gray-100'
            }`}
          >
            <span>{isAr ? opt.labelAr : opt.labelSv}</span>
            <span className="text-[10px] opacity-80 bg-black/10 px-1.5 py-0.5 rounded font-mono">
              {opt.badge}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
