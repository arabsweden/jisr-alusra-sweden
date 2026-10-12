import React, { useState } from 'react';
import { Language, SurveyResponse } from '../types';
import { DataService } from '../services/dataService';
import { HeartHandshake, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Facebook, Globe, Share2 } from 'lucide-react';

interface Props {
  lang: Language;
  onFinished?: () => void;
}

export const SurveyForm: React.FC<Props> = ({ lang, onFinished }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<SurveyResponse>>({
    consent_given: false,
    age_group: '',
    family_role: '',
    residence_duration: '',
    preferred_lang: 'العربية',
    municipality_optional: '',
    needed_topics: [],
    school_challenges: '',
    social_services_understanding: '',
    family_topics_needed: [],
    preferred_format: [],
    user_suggestions: ''
  });

  const totalSteps = 4;

  const handleCheckboxToggle = (field: 'needed_topics' | 'family_topics_needed' | 'preferred_format', value: string) => {
    const current = (formData[field] as string[]) || [];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    DataService.submitSurvey(formData as Omit<SurveyResponse, 'id' | 'timestamp'>);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-[#185C7A]/20 shadow-lg text-center max-w-2xl mx-auto space-y-6">
        <div className="w-16 h-16 bg-[#2F8F83]/10 text-[#2F8F83] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-black text-[#185C7A]">
          شكرًا جزيلاً لمساهمتك القيمة في تطوير "جسر الأسرة"!
        </h2>

        <p className="text-sm text-[#123B4A]/90 leading-relaxed max-w-lg mx-auto">
          إجاباتك وسيلة أساسية لنا لتطوير المحتوى والنماذج العملية وتسهيل وصول المعلومة الصحيحة لجميع الأسر العربية في السويد.
        </p>

        <div className="bg-[#F7F5EF] p-4 rounded-xl border border-[#185C7A]/15 text-xs text-[#123B4A] space-y-3">
          <p className="font-bold text-[#185C7A]">
            شارك التطبيق مع أسرة قد تستفيد منه وتابع تحديثات المشروع:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href="[FACEBOOK_PAGE_URL]"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#185C7A] hover:bg-[#124259] text-white px-4 py-2 rounded-xl font-bold text-xs transition"
            >
              <Facebook className="w-4 h-4 text-[#F2C86B]" />
              <span>متابعة صفحة الفيسبوك [FACEBOOK_PAGE_URL]</span>
            </a>

            <a
              href="[WEBSITE_URL]"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#2F8F83] hover:bg-[#236e65] text-white px-4 py-2 rounded-xl font-bold text-xs transition"
            >
              <Globe className="w-4 h-4" />
              <span>زيارة الموقع الرسمي [WEBSITE_URL]</span>
            </a>
          </div>
        </div>

        {onFinished && (
          <button
            onClick={onFinished}
            className="bg-[#185C7A] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#124259] transition cursor-pointer"
          >
            العودة للصفحة الرئيسية
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#185C7A]/20 shadow-md max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-[#185C7A]/10 pb-4">
        <div className="flex items-center gap-2 text-[#185C7A] mb-1">
          <HeartHandshake className="w-5 h-5 text-[#2F8F83]" />
          <span className="text-xs font-bold bg-[#185C7A]/10 px-2.5 py-0.5 rounded-full">
            استبيان وطني مستقل
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[#185C7A]">
          ماذا تحتاج الأسرة العربية في السويد؟
        </h2>
        <p className="text-xs text-[#123B4A]/80 mt-1">
          جميع الإجابات اختيارية وسرية تمامًا. لا نطلب رقمًا شخصياً (Personnummer) أو اسمًا أو عنوانًا.
        </p>

        {/* Progress Bar */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#185C7A] h-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#185C7A]">
            {step} / {totalSteps}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Consent & Demographics */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="bg-[#185C7A]/5 p-4 rounded-xl border border-[#185C7A]/15 space-y-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent_given}
                  onChange={(e) => setFormData({ ...formData, consent_given: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#185C7A] rounded"
                  required
                />
                <span className="text-xs font-semibold text-[#123B4A] leading-relaxed">
                  أوافق على المشاركة التطوعية في هذا الاستبيان لاستخدام النتائج الإحصائية المجمعة لتحسين الخدمات التوعوية للأسرة العربية في السويد.
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#123B4A] mb-1.5">
                  الفئة العمرية (اختياري):
                </label>
                <select
                  value={formData.age_group}
                  onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                >
                  <option value="">اختر الفئة العمرية...</option>
                  <option value="18-29 سنة">18-29 سنة</option>
                  <option value="30-45 سنة">30-45 سنة</option>
                  <option value="46-60 سنة">46-60 سنة</option>
                  <option value="أكثر من 60 سنة">أكثر من 60 سنة</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#123B4A] mb-1.5">
                  الدور داخل الأسرة (اختياري):
                </label>
                <select
                  value={formData.family_role}
                  onChange={(e) => setFormData({ ...formData, family_role: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                >
                  <option value="">اختر الدور...</option>
                  <option value="أب / أبوه">أب / أبوه</option>
                  <option value="أم / أمومة">أم / أمومة</option>
                  <option value="شاب / مراهق">شاب / مراهق</option>
                  <option value="أخصائي / عامل مجتمعي">أخصائي / عامل مجتمعي</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#123B4A] mb-1.5">
                  مدة الإقامة في السويد:
                </label>
                <select
                  value={formData.residence_duration}
                  onChange={(e) => setFormData({ ...formData, residence_duration: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                >
                  <option value="">اختر مدة الإقامة...</option>
                  <option value="أقل من سنة">أقل من سنة</option>
                  <option value="1-3 سنوات">1-3 سنوات</option>
                  <option value="3-5 سنوات">3-5 سنوات</option>
                  <option value="أكثر من 5 سنوات">أكثر من 5 سنوات</option>
                  <option value="مولود في السويد">مولود في السويد</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#123B4A] mb-1.5">
                  المحافظة / البلدية (اختياري بدون عنوان دقيق):
                </label>
                <input
                  type="text"
                  placeholder="مثلاً: Stockholm, Göteborg, Malmö..."
                  value={formData.municipality_optional}
                  onChange={(e) => setFormData({ ...formData, municipality_optional: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Topics & School Challenges */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-[#185C7A] mb-2">
                ما هي الموضوعات التي تحتاج أسرتك لمعلومات أو أدوات إضافية عنها؟ (يمكن اختيار أكثر من خيار):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'الأسرة والمدرسة',
                  'الخدمات الاجتماعية – السوسيال',
                  'حقوق الطفل',
                  'التربية والحوار الأسري',
                  'الزواج والانفصال',
                  'القوانين والحقوق الأسرية',
                  'الصحة والدعم النفسي BUP',
                  'نماذج ورسائل سويدية جاهزة'
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2 p-2.5 rounded-lg border border-[#185C7A]/15 bg-[#F7F5EF] cursor-pointer hover:bg-[#185C7A]/5">
                    <input
                      type="checkbox"
                      checked={(formData.needed_topics || []).includes(item)}
                      onChange={() => handleCheckboxToggle('needed_topics', item)}
                      className="w-4 h-4 text-[#185C7A] rounded"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#185C7A] mb-1.5">
                ما هي أكبر التحديات التي تواجهونها مع المدرسة؟
              </label>
              <textarea
                rows={3}
                placeholder="مثلاً: صعوبة التواصل بلغة غير سويدية، متابعة التقدم الدراسي، حالات التنمر، الغياب..."
                value={formData.school_challenges}
                onChange={(e) => setFormData({ ...formData, school_challenges: e.target.value })}
                className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-3 text-xs text-[#123B4A] focus:outline-none focus:ring-2 focus:ring-[#185C7A]"
              />
            </div>
          </div>
        )}

        {/* Step 3: Social Services & Parenting */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-[#185C7A] mb-1.5">
                كيف تقيّم مستوى فهمك لدور الخدمات الاجتماعية (السوسيال) وحقوقك القانونية أثناء التواصل؟
              </label>
              <select
                value={formData.social_services_understanding}
                onChange={(e) => setFormData({ ...formData, social_services_understanding: e.target.value })}
                className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-3 text-xs text-[#123B4A]"
              >
                <option value="">اختر التقييم...</option>
                <option value="فهم ضعيف وأحتاج معلومات طمأنة وتوضيح حقوق">فهم ضعيف وأحتاج معلومات طمأنة وتوضيح حقوق</option>
                <option value="فهم متوسط وأعرف بعض الحقوق الأساسية كالمترجم">فهم متوسط وأعرف بعض الحقوق الأساسية كالمترجم</option>
                <option value="فهم جيد جدًا لدور الدعم الطوعي والتحقيق">فهم جيد جدًا لدور الدعم الطوعي والتحقيق</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#185C7A] mb-2">
                ما نوع المحتوى المفضل لديك للحصول على هذه المعلومات؟
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'مقالات مكتوبة مبسطة',
                  'مقاطع فيديو توضيحية قصيرة',
                  'نماذج ورسائل جاهزة للنسخ',
                  'مساعد ذكي للإجابة المباشرة',
                  'لقاءات وورش عمل أونلاين'
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2 p-2.5 rounded-lg border border-[#185C7A]/15 bg-[#F7F5EF] cursor-pointer hover:bg-[#185C7A]/5">
                    <input
                      type="checkbox"
                      checked={(formData.preferred_format || []).includes(item)}
                      onChange={() => handleCheckboxToggle('preferred_format', item)}
                      className="w-4 h-4 text-[#185C7A] rounded"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Suggestions */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-[#185C7A] mb-1.5">
                اقتراحاتكم لتطوير "جسر الأسرة في السويد" (اختياري):
              </label>
              <textarea
                rows={4}
                placeholder="اكتب أي موضوعات أو أدوات تراها نافعة للأسر العربية في السويد..."
                value={formData.user_suggestions}
                onChange={(e) => setFormData({ ...formData, user_suggestions: e.target.value })}
                className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-3 text-xs text-[#123B4A] focus:outline-none focus:ring-2 focus:ring-[#185C7A]"
              />
            </div>

            <div className="bg-[#2F8F83]/10 p-3.5 rounded-xl border border-[#2F8F83]/20 text-xs text-[#123B4A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2F8F83] shrink-0" />
              <span>نؤكد مجددًا: إجاباتك سرية وتستخدم فقط لمقاصد التطوير المعرفي.</span>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-4 border-t border-[#185C7A]/10 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-[#123B4A] px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>
          ) : <div />}

          {step < totalSteps ? (
            <button
              type="button"
              disabled={!formData.consent_given}
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1 bg-[#185C7A] hover:bg-[#124259] disabled:opacity-50 text-white px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <span>التالي</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-1 bg-[#2F8F83] hover:bg-[#236e65] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
            >
              <span>إرسال الاستبيان</span>
              <CheckCircle2 className="w-4 h-4 text-[#F2C86B]" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
