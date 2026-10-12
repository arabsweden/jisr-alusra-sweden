import React from 'react';
import { Language } from '../types';
import { X, PhoneCall, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

interface Props {
  lang: Language;
  onClose: () => void;
}

export const EmergencyModal: React.FC<Props> = ({ lang, onClose }) => {
  const contacts = [
    {
      name_ar: 'الطوارئ العاجلة الخطر المباشر',
      name_sv: 'Nödnummer vid akuta fall',
      number: '112',
      desc_ar: 'اتصل فورا في حالات الخطر المباشر أو الإصابات البليغة (الشرطة، الإسعاف، المطافئ).',
      desc_sv: 'För akuta nödsituationer.',
      badge: 'طوارئ 24/7'
    },
    {
      name_ar: 'الرعاية الصحية والمشورة الطبية',
      name_sv: '1177 Sjukvårdsrådgivningen',
      number: '1177',
      desc_ar: 'استشارات صحية وطبية مجانية على مدار الساعة وتوجيه للمراكز الصحية.',
      desc_sv: 'Sjukvårdsrådgivning dygnet runt.',
      badge: 'صحة'
    },
    {
      name_ar: 'خط حقوق وحماية الأطفال BRIS',
      name_sv: 'BRIS – Barnens rätt i samhället',
      number: '116 111',
      desc_ar: 'خط لدعم الأطفال واليافعين حتى سن 18 عامًا، وخط خاص لدعم أولياء الأمور (0771-50 50 50).',
      desc_sv: 'Stödlinje för barn och föräldrar.',
      badge: 'أطفال وأسر'
    },
    {
      name_ar: 'خط حماية النساء من العنف Kvinnofridslinjen',
      name_sv: 'Kvinnofridslinjen',
      number: '020-50 50 50',
      desc_ar: 'دعم وحماية للنساء اللاتي يتعرضن للتهديد أو العنف، متوفر بلغات متعددة وسري.',
      desc_sv: 'Nationell stödtelefon för kvinnofrid.',
      badge: 'حماية ودعم'
    },
    {
      name_ar: 'خط الدعم النفسي والوقاية Mind',
      name_sv: 'Självmordslinjen Mind',
      number: '90101',
      desc_ar: 'دعم نفسي هاتفياً أو عبر الشات لمن يمر بضائقة أو أزمة نفسية شاقة.',
      desc_sv: 'Stöd vid psykisk ohälsa.',
      badge: 'دعم نفسي'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#185C7A]/20 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#123B4A] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-[#185C7A]/10 pb-4 mb-4">
          <div className="flex items-center gap-2 text-rose-600 mb-1">
            <PhoneCall className="w-5 h-5" />
            <span className="text-xs font-bold bg-rose-100 px-2.5 py-0.5 rounded-full text-rose-700">
              أرقام الطوارئ والدعم المباشر في السويد
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#185C7A]">
            {lang === 'ar' ? 'أرقام الخطوط الساخنة والدعم الرسمي' : 'Nödnummer och stödlinjer'}
          </h2>
          <p className="text-xs text-[#123B4A]/80 mt-1">
            جميع هذه الخطوط مجانية وتعمل وفق الضوابط السويدية لحماية السرية الخصوصية.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {contacts.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#185C7A]/15 bg-[#F7F5EF] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#185C7A]">{lang === 'ar' ? item.name_ar : item.name_sv}</span>
                  <span className="bg-[#185C7A]/10 text-[#185C7A] text-[10px] font-bold px-2 py-0.2 rounded">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-[#123B4A]/80">{lang === 'ar' ? item.desc_ar : item.desc_sv}</p>
              </div>

              <a
                href={`tel:${item.number.replace(/\s+/g, '')}`}
                className="bg-[#185C7A] hover:bg-[#124259] text-[#F2C86B] font-extrabold px-3.5 py-2 rounded-xl text-sm shrink-0 flex items-center gap-1.5 transition dir-ltr shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{item.number}</span>
              </a>
            </div>
          ))}
        </div>

        <div className="bg-[#185C7A]/5 p-3.5 rounded-xl border border-[#185C7A]/15 text-xs text-[#123B4A] flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#185C7A] shrink-0" />
          <span>
            المصدر الرسمي لأرقام الدعم: Sos Alarm و Socialstyrelsen و Polisen.
          </span>
        </div>
      </div>
    </div>
  );
};
