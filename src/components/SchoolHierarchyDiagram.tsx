import React from 'react';
import { UserCheck, ShieldCheck, ArrowDown, ArrowLeft, ExternalLink, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface Props {
  lang: Language;
}

export const SchoolHierarchyDiagram: React.FC<Props> = ({ lang }) => {
  const steps = [
    {
      num: 1,
      title_ar: 'المعلم / المينتور (Mentor)',
      title_sv: 'Lärare / Mentor',
      badge_ar: 'الخطوة الأولى',
      badge_sv: 'Steg 1',
      desc_ar: 'هو المسؤول المباشر والمطلع على يوميات الطالب في الصف. تواصل معه أولاً عبر منصة المدرسة لطلب استفسار أو حل أي مشكلة بسيطة.',
      desc_sv: 'Första kontakten för dagliga skolfrågor, studier och trivsel.',
      color: 'border-[#185C7A] bg-[#185C7A]/5'
    },
    {
      num: 2,
      title_ar: 'مدير المدرسة (Rektor)',
      title_sv: 'Rektor',
      badge_ar: 'الخطوة الثانية',
      badge_sv: 'Steg 2',
      desc_ar: 'في حال عدم التوصل لحل مع المعلم، أو إذا كانت القضية خطيرة مثل حالات التنمر، الغياب القسري، أو رفض إعداد خطة دعم دراسي.',
      desc_sv: 'Vid utebliven lösning, trygghetsfrågor, mobbning eller åtgärdsprogram.',
      color: 'border-[#2F8F83] bg-[#2F8F83]/5'
    },
    {
      num: 3,
      title_ar: 'الجهة المسؤولة (Huvudman)',
      title_sv: 'Huvudman (Kommun / Styrelse)',
      badge_ar: 'الخطوة الثالثة',
      badge_sv: 'Steg 3',
      desc_ar: 'إذا لم تقم إدارة المدرسة بمسؤوليتها القانونية، يمكنك التواصل مع إدارة التعليم بالبلدية (للمدارس الحكومية) أو مجلس إدارة المدرسة الخاصة (Friskola).',
      desc_sv: 'Kommunens utbildningsförvaltning eller friskolans styrelse.',
      color: 'border-[#F2C86B] bg-[#F2C86B]/10'
    },
    {
      num: 4,
      title_ar: 'التفتيش المدرسي (Skolinspektionen)',
      title_sv: 'Skolinspektionen',
      badge_ar: 'الجهة الرقابية الرسمية العليا',
      badge_sv: 'Statlig tillsynsmyndighet',
      desc_ar: 'الجهة الحكومية العليا للتقدم بشكوى رسمية عند استنفاد الخطوات المدرسية السابقة وعدم تطبيق المدرسة لقانون Skollagen.',
      desc_sv: 'Statlig myndighet för formell anmälan om skolan brustit i sitt uppdrag.',
      color: 'border-rose-500 bg-rose-50'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#185C7A]/20 shadow-md space-y-6">
      <div className="border-b border-[#185C7A]/10 pb-4">
        <div className="flex items-center gap-2 text-[#185C7A] mb-1">
          <UserCheck className="w-5 h-5 text-[#2F8F83]" />
          <h3 className="text-lg font-bold">
            {getTranslation(lang, 'schoolDiagramTitle')}
          </h3>
        </div>
        <p className="text-xs text-[#123B4A]/80">
          {getTranslation(lang, 'schoolDiagramDesc')}
        </p>
      </div>

      {/* Visual Flow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col relative">
            <div className={`p-4 rounded-xl border-2 ${step.color} h-full flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#185C7A] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/80 text-[#123B4A] border border-[#185C7A]/10">
                    {lang === 'ar' ? step.badge_ar : step.badge_sv}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#185C7A] mb-2">
                  {lang === 'ar' ? step.title_ar : step.title_sv}
                </h4>
                <p className="text-xs text-[#123B4A]/80 leading-relaxed">
                  {lang === 'ar' ? step.desc_ar : step.desc_sv}
                </p>
              </div>
            </div>

            {/* Down Arrow for mobile / Left Arrow for Desktop RTL */}
            {idx < steps.length - 1 && (
              <div className="flex justify-center py-2 md:hidden">
                <ArrowDown className="w-5 h-5 text-[#185C7A]/50" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Important Note Disclaimer */}
      <div className="bg-[#F7F5EF] p-4 rounded-xl border border-[#185C7A]/15 text-xs text-[#123B4A] flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#185C7A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-[#185C7A]">
            {lang === 'ar' ? 'ملاحظة هامة حول خطوات التصعيد:' : 'Viktig anmärkning om eskaleringssteg:'}
          </p>
          <p className="leading-relaxed opacity-90">
            {lang === 'ar'
              ? 'هذا التسلسل هو الإطار الاسترشادي العام. قد تختلف سرعة وطبيعة الخطوات حسب طبيعة المشكلة ومدى خطورتها. يُنصح دائمًا بتوثيق كافة المراسلات كتابيًا.'
              : 'Denna kedja är en allmän vägledning. Stegens ordning beror på ärendets art.'}
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="https://www.skolverket.se/regler-och-ansvar/ansvar-i-skolfragan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#185C7A] font-bold hover:underline"
            >
              <span>{lang === 'ar' ? 'دليل Skolverket لتوزيع المسؤوليات' : 'Skolverkets ansvarsguide'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.skolinspektionen.se/rad-och-vagledning/anmalan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-rose-600 font-bold hover:underline"
            >
              <span>{lang === 'ar' ? 'كيف تقدم شكوى لـ Skolinspektionen؟' : 'Anmälan till Skolinspektionen'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
