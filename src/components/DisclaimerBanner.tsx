import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface Props {
  lang: Language;
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<Props> = ({ lang, compact = false }) => {
  return (
    <div className={`bg-[#185C7A]/5 border-s-4 border-[#185C7A] rounded-r-lg p-4 ${compact ? 'text-xs' : 'text-sm'} text-[#123B4A]`}>
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#185C7A] shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-[#185C7A] mb-1">
            {lang === 'ar' ? 'تنبيه إخلاء مسؤولية هامة' : 'Viktig ansvarsfriskrivning'}
          </p>
          <p className="leading-relaxed opacity-90">
            {getTranslation(lang, 'independentProjectDisclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
};
