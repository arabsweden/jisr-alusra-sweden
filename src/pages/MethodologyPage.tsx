import React from 'react';
import { Language } from '../types';
import { CheckCircle2, ShieldCheck, BookOpen, RefreshCw } from 'lucide-react';

interface Props {
  lang: Language;
}

export const MethodologyPage: React.FC<Props> = ({ lang }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-[#185C7A] text-white p-8 rounded-3xl shadow-md space-y-3">
        <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs">
          <BookOpen className="w-4 h-4" />
          <span>منهجية التوثيق والمعلومات</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          منهجية إعداد المحتوى والتأكد من المصادر
        </h1>
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl">
          كيف نضمن تقديم معلومات رصينة ومطابقة تماماً للتشريعات والقوانين السويدية الحالية.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 text-xs text-[#123B4A] leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#185C7A]/15 space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#185C7A] text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h3 className="font-bold text-[#185C7A]">الاستناد للمصادر الحكومية</h3>
            <p className="text-[11px] opacity-80">لا يتم كتابة أي بند دون وجود مرجعية سويدية رسمية من Skolverket أو Socialstyrelsen أو 1177.</p>
          </div>

          <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#185C7A]/15 space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#2F8F83] text-white flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h3 className="font-bold text-[#185C7A]">اللغة المبسطة الهادئة</h3>
            <p className="text-[11px] opacity-80">صياغة بأسلوب عربي واضح، متوازن، ومطمئن مع إبراز المصطلحات السويدية الرسمية.</p>
          </div>

          <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#185C7A]/15 space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#F2C86B] text-[#123B4A] flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h3 className="font-bold text-[#185C7A]">المراجعة والتحديث التلقائي</h3>
            <p className="text-[11px] opacity-80">تتبع القوانين والتغييرات التنفيذية الصادرة وإعادة مراجعة المقالات والروابط بانتظام.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
