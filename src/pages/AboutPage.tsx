import React from 'react';
import { Language } from '../types';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { ShieldCheck, Heart, Target, Users, BookOpen } from 'lucide-react';

interface Props {
  lang: Language;
}

export const AboutPage: React.FC<Props> = ({ lang }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-[#185C7A] text-white p-8 rounded-3xl shadow-md space-y-3 relative">
        <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs">
          <Heart className="w-4 h-4" />
          <span>عن مشروع جسر الأسرة في السويد</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          Familjebron Sverige - نربط الأسرة بالمعلومة الصحيحة
        </h1>
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl">
          مشروع معرفي وتفاعلي مستقل موجّه للأسرة العربية المقيمة في السويد، لبناء الوعي وتيسير التواصل مع المدارس والخدمات الرسمية.
        </p>
      </div>

      <DisclaimerBanner lang={lang} />

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 text-xs text-[#123B4A] leading-relaxed">
        <div className="space-y-3">
          <h2 className="text-base font-bold text-[#185C7A] flex items-center gap-2">
            <Target className="w-5 h-5 text-[#2F8F83]" />
            <span>رؤيتنا وهدفنا الأساسي</span>
          </h2>
          <p>
            تعد عملية الاستقرار والاندماج في المجتمع السويدي تجربة غنية بآفاق جديدة، ولكنها تفرض في الوقت ذاته تحديات معرفية أمام العديد من الأسر العربية في استيعاب طريقة عمل المؤسسات التعليمية، الخدمات الاجتماعية، والأنظمة القانونية الأسرية.
          </p>
          <p>
            هدفنا في "جسر الأسرة في السويد" هو سد هذه الفجوة المعرفية من خلال تقديم معلومات مبسطة وموثوقة خالية من التعقيد أو التهويل، ومصاغة بأسلوب هادئ وداعم يستند حصريًا لأحدث التشريعات السويدية الصادرة عن Skolverket و Socialstyrelsen والجهات ذات الصلة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#185C7A]/10">
          <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#185C7A]/15 space-y-2">
            <h3 className="text-xs font-bold text-[#185C7A] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#2F8F83]" />
              <span>من نخدم؟</span>
            </h3>
            <p>
              الأسر العربية، الآباء والأمهات، اليافعون، والمعلمون والعاملون الاجتماعيون الذين يرغبون في جسر التواصل الإيجابي مع العائلات المقيمة.
            </p>
          </div>

          <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#185C7A]/15 space-y-2">
            <h3 className="text-xs font-bold text-[#185C7A] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2F8F83]" />
              <span>استقلالية تامة</span>
            </h3>
            <p>
              مشروعنا غير حكومي وغير مرتبط بأي أيديولوجيا أو تحزب، ويهدف بالكامل لتقديم الخدمة المعرفية والتوعوية العامة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
