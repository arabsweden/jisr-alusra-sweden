import React from 'react';
import { Language } from '../types';
import { DataService } from '../services/dataService';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { ShieldCheck, ExternalLink, FileCheck, Info } from 'lucide-react';

interface Props {
  lang: Language;
}

export const SourcesPage: React.FC<Props> = ({ lang }) => {
  const sources = DataService.getOfficialSources();

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="bg-[#185C7A] text-white p-8 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>المصادر والجهات الرسمية السويدية المعتمدة</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          دليل الجهات الرسمية السويدية وشريكتنا المعرفية
        </h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
          جميع المقالات والنصائح والإرشادات في منصة "جسر الأسرة في السويد" مستمدة مباشرة وبشكل حقيقي من التشريعات والجهات الحكومية الرسمية التالية.
        </p>
      </div>

      <DisclaimerBanner lang={lang} />

      {/* Verification Methodology Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#185C7A]/20 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-[#185C7A]">
          <FileCheck className="w-5 h-5 text-[#2F8F83]" />
          <h2 className="text-base font-bold">منهجية التوثيق والاعتماد المعرفي</h2>
        </div>
        <p className="text-xs text-[#123B4A]/90 leading-relaxed">
          نلتزم بالسياسة الصارمة: «لا تخترع مصادر أو روابط أو نصوصًا قانونية». يتم مراجعة كل مقال ونموذج بانتظام لمطابقة التحديثات الصادرة عن مصلحة المدارس (Skolverket)، الخدمات الاجتماعية (Socialstyrelsen)، وأمناء مظالم الأطفال (Barnombudsmannen).
        </p>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sources.map((src) => (
          <div
            key={src.id}
            className="bg-white rounded-2xl p-6 border border-[#185C7A]/15 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-[#185C7A]/10 text-[#185C7A] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {src.category === 'school' && 'التعليم والمدارس'}
                  {src.category === 'social-services' && 'الخدمات الاجتماعية والمجتمع'}
                  {src.category === 'health' && 'الرعاية الصحية'}
                  {src.category === 'rights' && 'الحقوق والعدالة'}
                  {src.category === 'benefits' && 'التأمينات والمالية'}
                </span>

                <span className="text-xs font-bold text-[#2F8F83]">{src.name_sv}</span>
              </div>

              <h3 className="text-base font-bold text-[#185C7A]">
                {src.name_ar}
              </h3>

              <p className="text-xs text-[#123B4A]/80 leading-relaxed">
                {src.description_ar}
              </p>
            </div>

            <div className="pt-3 border-t border-[#185C7A]/10 flex items-center justify-between">
              <span className="text-[10px] text-[#123B4A]/60 font-semibold">
                الموقع الرسمي الموثق
              </span>

              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#185C7A] hover:bg-[#124259] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs"
              >
                <span>زيارة الموقع الرسمي</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F2C86B]" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
