import React from 'react';
import { Language } from '../types';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

interface Props {
  lang: Language;
}

export const PrivacyPage: React.FC<Props> = ({ lang }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-[#185C7A] text-white p-8 rounded-3xl shadow-md space-y-3">
        <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs">
          <Lock className="w-4 h-4" />
          <span>سياسة الخصوصية وحماية البيانات</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          سياسة الخصوصية والأمان في "جسر الأسرة في السويد"
        </h1>
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
          نحن نلتزم بأعلى معايير حماية الخصوصية ومبدأ استخدام أدنى قدر ممكن من البيانات.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#185C7A]/20 shadow-xs space-y-5 text-xs text-[#123B4A] leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-[#185C7A] flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-[#2F8F83]" />
            <span>عدم جمع البيانات الشخصية الحساسة</span>
          </h2>
          <p>
            تطبيق "جسر الأسرة في السويد" لا يطلب ولا يجمع تحت أي ظرف من الظروف الرقم الشخصي السويدي (Personnummer)، أو الأسماء الكاملة، أو العناوين السكنية المفصلة، أو التفاصيل الصحية أو القضائية الخاصة بطفلك أو أسرتك.
          </p>
        </div>

        <div className="space-y-2 pt-3 border-t border-[#185C7A]/10">
          <h2 className="text-base font-bold text-[#185C7A]">الاستبيانات والمفضلة المحلية</h2>
          <p>
            - قائمة المقالات المحفوظة في المفضلة تُحفظ محليًا فقط على جهازك المتصفح (LocalStorage) ولا يتم رفعها أو تتبعها.
          </p>
          <p>
            - إجابات الاستبيانات مجمعة ومجهولة الهوية بالكامل (Anonymized) وتُستخدم فقط لمقاصد الإحصاء العام وتطوير محتوى المنصة.
          </p>
        </div>

        <div className="bg-[#185C7A]/5 p-4 rounded-2xl border border-[#185C7A]/15 text-[#185C7A] font-semibold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>التطبيق متوافق تمامًا مع لائحة حماية البيانات العامة الأوروبية (GDPR).</span>
        </div>
      </div>
    </div>
  );
};
