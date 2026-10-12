import React from 'react';
import { Language } from '../types';
import { FileText, AlertTriangle } from 'lucide-react';

interface Props {
  lang: Language;
}

export const TermsPage: React.FC<Props> = ({ lang }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-[#185C7A] text-white p-8 rounded-3xl shadow-md space-y-3">
        <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs">
          <FileText className="w-4 h-4" />
          <span>شروط الاستخدام والإطار القانوني</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          شروط استخدام تطبيق "جسر الأسرة في السويد"
        </h1>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#185C7A]/20 shadow-xs space-y-5 text-xs text-[#123B4A] leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-[#185C7A]">1. الطبيعة التوعوية للمحتوى</h2>
          <p>
            المحتوى والأدوات والمساعد الذكي المقدمة في هذا التطبيق هي لغرض التوعية والمعرفة العامة والمساندة الأسرية، ولا تشكل استشارة قانونية رسمية أو تشخيصًا طبيًا أو قرارًا قضائيًا.
          </p>
        </div>

        <div className="space-y-2 pt-3 border-t border-[#185C7A]/10">
          <h2 className="text-base font-bold text-[#185C7A]">2. الاستقلالية وعدم التبعية الحكومية</h2>
          <p>
            "جسر الأسرة في السويد" هو مشروع معرفي مستقل وغير حكومي. نعتمد على استقاء المعلومات من التشريعات المفتوحة الصادرة عن المصادر السويدية الرسمية (Skolverket, Socialstyrelsen, 1177, MFOF) ولكننا لا نمثل هذه المؤسسات رسمياً.
          </p>
        </div>

        <div className="space-y-2 pt-3 border-t border-[#185C7A]/10">
          <h2 className="text-base font-bold text-[#185C7A]">3. ملكية واستخدام النماذج الجاهزة</h2>
          <p>
            النماذج والرسائل السويدية المتاحة في التطبيق مجانية ومتاحة للاستخدام الشخصي المباشر لأولياء الأمور لتسهيل المراسلات مع المدارس والجهات الرسمية.
          </p>
        </div>
      </div>
    </div>
  );
};
