import React, { useState } from 'react';
import { Language } from '../types';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { HelpfulFeedbackWidget } from '../components/HelpfulFeedbackWidget';
import {
  RotateCcw,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
  Home,
  MessageCircle,
  HelpCircle,
  BookOpen,
  Send,
  Calendar,
  AlertCircle,
  Award,
  ChevronLeft
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigateToAssistant?: () => void;
  onNavigateToTemplates?: () => void;
  onNavigateToReport?: () => void;
}

export const ChildRestorationPage: React.FC<Props> = ({
  lang = 'ar',
  onNavigateToAssistant,
  onNavigateToTemplates,
  onNavigateToReport
}) => {
  const [activeTab, setActiveTab] = useState<'legal' | 'eligibility' | 'pathway' | 'obstacles' | 'tips' | 'checklist'>('legal');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const isAr = lang === 'ar';

  const toggleChecklist = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checklistItems = [
    {
      id: 'req_lawyer',
      titleAr: 'توكيل محامٍ حكومي متخصص في LVU',
      titleSv: 'Offentligt biträde specialiserad på LVU',
      descAr: 'طلب تعيين محامٍ مجاني من الدولة متمرس في القانون الاجتماعي (Socialrätt) للترافع أمام المحكمة الإدارية.'
    },
    {
      id: 'req_request',
      titleAr: 'تقديم طلب رسمياً لإنهاء الرعاية (Begäran om vårdens upphörande)',
      titleSv: 'Begäran om vårdens upphörande',
      descAr: 'تقديم طلب كتابي رسمي لمجلس الخدمات الاجتماعية يوضح زوال أسباب السحب مع الأدلة الموثقة.'
    },
    {
      id: 'req_parenting',
      titleAr: 'الحصول على شهادة دورة تربوية (مثل ABC / COPE)',
      titleSv: 'Intyg om föräldrautbildning (ABC/COPE)',
      descAr: 'الالتحاق ببرامج التربية الإيجابية المعترف بها بالسويد وتقديم تقرير تقييم إيجابي من الميسرين.'
    },
    {
      id: 'req_drugtest',
      titleAr: 'فحوصات الخلو من المواد المخدرة (إن انطبق)',
      titleSv: 'Regelbundna drogtester om tillämpligt',
      descAr: 'تقديم نتائج تحاليل عينات دورية سلبيّة تُثبت التعافي الكامل واستقرار السلوك لفترة كافية.'
    },
    {
      id: 'req_housing',
      titleAr: 'تأمين بيئة معيشية وسكن مناسب ودخل مستقر',
      titleSv: 'Stabil bostad och försörjning',
      descAr: 'إثبات توفر غرفة مناسبة للطفل وعقد إيجار ثابت ودخل مالي يغطي الاحتياجات الأساسية.'
    },
    {
      id: 'req_translator',
      titleAr: 'طلب الاستعانة بمترجم رسمي محلف في كل الاجتماعات',
      titleSv: 'Begär auktoriserad tolk i alla möten',
      descAr: 'التمسك بحق استخدام مترجم رسمي لتفادي أي سوء فهم أو صياغة خاطئة في تقارير السوسيال.'
    },
    {
      id: 'req_umgangessratt',
      titleAr: 'تقديم طلب توسيع نطاق الزيارات (Umgängesrätt)',
      titleSv: 'Begäran om utökat umgänge',
      descAr: 'المطالبة بتوسيع الزيارات تدريجياً لتصبح غير مشرفة ثم الانتقال للمبيت المؤقت (Provboende).'
    },
    {
      id: 'req_logs',
      titleAr: 'توثيق جميع المراسلات والاجتماعات كتابياً',
      titleSv: 'Skriftlig dokumentation av alla kontakter',
      descAr: 'احتفاظ بسجل دقيق للتواريخ، الإيميلات، والرسائل الصادرة والواردة لتقديمها كأدلة للمحكمة.'
    }
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / checklistItems.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-br from-[#123B4A] via-[#185C7A] to-[#2F8F83] text-white p-6 sm:p-8 rounded-3xl shadow-md relative overflow-hidden space-y-4">
        <div className="absolute -end-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 bg-[#F2C86B] text-[#123B4A] px-3 py-1 rounded-full text-xs font-black shadow-xs">
            <RotateCcw className="w-3.5 h-3.5 text-[#123B4A]" />
            <span>{isAr ? 'إعادة الطفل إلى المنزل (Hemtagning)' : 'Återgång till hemmet (Hemtagning)'}</span>
          </span>

          <span className="text-xs bg-white/10 text-white/90 px-3 py-1 rounded-full font-bold border border-white/15">
            {isAr ? 'قانون LVU السويدي • إنهاء الرعاية Vårdens upphörande' : 'LVU • Vårdens upphörande'}
          </span>
        </div>

        <div className="space-y-2 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            {isAr ? 'خطوات واستراتيجية استرجاع الطفل من السوسيال' : 'Steg för att få tillbaka sitt barn från socialtjänsten'}
          </h1>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
            {isAr
              ? 'تعتمد عملية استرجاع الأطفال قانونياً في السويد على إثبات زوال الأسباب والمخاطر التي أدت لسحب الطفل بموجب قانون LVU، حيث إن الهدف القانوني للرعاية البديلة هو إعادة لم شمل الأسرة بمجرد توفر بيئة آمنة.'
              : 'Processen för hemtagning bygger på att visa att de omständigheter som föranledde vård enligt LVU har upphört och att barnet kan få en trygg uppväxtmiljö.'}
          </p>
        </div>

        {/* Quick Statutory Key Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-white/10 border border-white/15 p-3 rounded-2xl flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-[#F2C86B] shrink-0" />
            <div>
              <div className="font-extrabold text-white">{isAr ? 'الهدف القانوني' : 'Rättsligt mål'}</div>
              <div className="text-white/80 text-[11px]">{isAr ? 'لم شمل الأسرة (Återförening)' : 'Familjeåterförening'}</div>
            </div>
          </div>

          <div className="bg-white/10 border border-white/15 p-3 rounded-2xl flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-[#F2C86B] shrink-0" />
            <div>
              <div className="font-extrabold text-white">{isAr ? 'المراجعة الإلزامية' : 'Obligatorisk övervägande'}</div>
              <div className="text-white/80 text-[11px]">{isAr ? 'كل 6 أشهر على الأقل (Övervägande)' : 'Minst var 6:e månad'}</div>
            </div>
          </div>

          <div className="bg-white/10 border border-white/15 p-3 rounded-2xl flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#F2C86B] shrink-0" />
            <div>
              <div className="font-extrabold text-white">{isAr ? 'حق التمثيل القانوني' : 'Offentligt biträde'}</div>
              <div className="text-white/80 text-[11px]">{isAr ? 'محامٍ مجاني تدفعه الدولة' : 'Kostnadsfri advokat'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('legal')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer border ${
            activeTab === 'legal'
              ? 'bg-[#185C7A] text-white border-[#185C7A] shadow-xs'
              : 'bg-white text-[#123B4A] border-gray-200 hover:bg-gray-100'
          }`}
        >
          <Scale className="w-4 h-4 text-[#F2C86B]" />
          <span>{isAr ? '1. الإجراءات القانونية المباشرة' : '1. Rättsliga åtgärder'}</span>
        </button>

        <button
          onClick={() => setActiveTab('eligibility')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer border ${
            activeTab === 'eligibility'
              ? 'bg-[#185C7A] text-white border-[#185C7A] shadow-xs'
              : 'bg-white text-[#123B4A] border-gray-200 hover:bg-gray-100'
          }`}
        >
          <Award className="w-4 h-4 text-[#F2C86B]" />
          <span>{isAr ? '2. شروط الأهلية (Lex Lilla Hjärtat)' : '2. Krav & Förutsättningar'}</span>
        </button>

        <button
          onClick={() => setActiveTab('pathway')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer border ${
            activeTab === 'pathway'
              ? 'bg-[#185C7A] text-white border-[#185C7A] shadow-xs'
              : 'bg-white text-[#123B4A] border-gray-200 hover:bg-gray-100'
          }`}
        >
          <RotateCcw className="w-4 h-4 text-[#F2C86B]" />
          <span>{isAr ? '3. مسار العودة التدريجية' : '3. Stegvis återgång'}</span>
        </button>

        <button
          onClick={() => setActiveTab('obstacles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer border ${
            activeTab === 'obstacles'
              ? 'bg-[#185C7A] text-white border-[#185C7A] shadow-xs'
              : 'bg-white text-[#123B4A] border-gray-200 hover:bg-gray-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-[#F2C86B]" />
          <span>{isAr ? '4. العقبات والحذر القانوني' : '4. Hinder & Varningar'}</span>
        </button>

        <button
          onClick={() => setActiveTab('tips')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer border ${
            activeTab === 'tips'
              ? 'bg-[#185C7A] text-white border-[#185C7A] shadow-xs'
              : 'bg-white text-[#123B4A] border-gray-200 hover:bg-gray-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#F2C86B]" />
          <span>{isAr ? '5. نصائح استراتيجية للأسر' : '5. Strategiska råd'}</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer border ${
            activeTab === 'checklist'
              ? 'bg-[#2F8F83] text-white border-[#2F8F83] shadow-xs'
              : 'bg-white text-[#123B4A] border-gray-200 hover:bg-gray-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-[#F2C86B]" />
          <span>{isAr ? '6. قائمة التقييم والجاهزية (Checklist)' : '6. Checklista'}</span>
        </button>
      </div>

      {/* SECTION TAB 1: LEGAL ACTIONS */}
      {activeTab === 'legal' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-white border border-[#185C7A]/20 p-5 sm:p-6 rounded-3xl shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#185C7A]">
              <Scale className="w-6 h-6 text-[#2F8F83]" />
              <h2 className="text-lg sm:text-xl font-black">
                {isAr ? '1. الإجراءات القانونية المباشرة' : 'Direkta rättsliga åtgärder'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#123B4A] leading-relaxed font-normal">
              {isAr
                ? 'يتطلب مسار إعادة الطفل أسلوباً إجرائياً منظماً يعتمد على القانون والمستندات الكتابية، والابتعاد الكامل عن المواجهات الشفهية غير التوثيقية.'
                : 'Processen kräver ett strukturerat tillvägagångssätt baserat på skriftliga framställningar och juridisk representation.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Card 1 */}
              <div className="bg-[#F7F5EF] p-4 sm:p-5 rounded-2xl border border-[#185C7A]/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-[#185C7A] text-white px-2.5 py-1 rounded-lg">
                    {isAr ? 'طلب رسمياً' : 'Formell begäran'}
                  </span>
                  <span className="text-xs font-mono text-[#185C7A] font-bold">11 kap. SoL / LVU</span>
                </div>
                <h3 className="text-base font-bold text-[#185C7A]">
                  {isAr ? 'تقديم طلب رسمي لإنهاء الرعاية (Begäran om vårdens upphörande)' : 'Begäran om vårdens upphörande'}
                </h3>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'يحق للأوصياء (أو الطفل إذا تجاوز 15 عاماً) تقديم طلب كتابي في أي وقت إلى دائرة الخدمات الاجتماعية أو المحكمة الإدارية لطلب إنهاء الرعاية القسرية وإعادة الطفل.'
                    : 'Vårdnadshavare har rätt att när som helst begära att vården ska upphöra.'}
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#F7F5EF] p-4 sm:p-5 rounded-2xl border border-[#185C7A]/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-[#2F8F83] text-white px-2.5 py-1 rounded-lg">
                    {isAr ? 'واجب قانوني' : 'Lagstadgad plikt'}
                  </span>
                  <span className="text-xs font-mono text-[#2F8F83] font-bold">كل 6 أشهر</span>
                </div>
                <h3 className="text-base font-bold text-[#185C7A]">
                  {isAr ? 'تفعيل المراجعة الدورية الإلزامية (Övervägande)' : 'Obligatorisk övervägande'}
                </h3>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'يلتزم السوسيال بموجب القانون بمراجعة قرار الرعاية القسرية كل 6 أشهر على الأقل لتقييم ما إذا كانت دواعي السحب لا تزال قائمة أم زالت.'
                    : 'Socialnämnden är skyldig att överväga om vården fortfarande behövs minst en gång var sjätte månad.'}
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#F7F5EF] p-4 sm:p-5 rounded-2xl border border-[#185C7A]/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-[#123B4A] text-white px-2.5 py-1 rounded-lg">
                    {isAr ? 'تمثيل مجاني' : 'Kostnadsfri advokat'}
                  </span>
                  <span className="text-xs font-mono text-[#185C7A] font-bold">Offentligt biträde</span>
                </div>
                <h3 className="text-base font-bold text-[#185C7A]">
                  {isAr ? 'توكيل محامٍ متخصص (Offentligt biträde)' : 'Offentligt biträde'}
                </h3>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'يحق للوالدين الحصول على تمثيل قانوني مجاني تدفع الدولة أتعابه. يُنصح باختيار محامٍ متخصص في القانون الاجتماعي (Socialrätt) وقضايا LVU ليتولى تقديم الأدلة ودحض تقارير السوسيال أمام المحكمة الإدارية.'
                    : 'Rätt till kostnadsfritt offentligt biträde som föräldrarnas talan i förvaltningsrätten.'}
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#F7F5EF] p-4 sm:p-5 rounded-2xl border border-[#185C7A]/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-rose-700 text-white px-2.5 py-1 rounded-lg">
                    {isAr ? 'المسار القضائي' : 'Domstolsprocess'}
                  </span>
                  <span className="text-xs font-mono text-rose-700 font-bold">Överklagan</span>
                </div>
                <h3 className="text-base font-bold text-[#185C7A]">
                  {isAr ? 'الاستئناف أمام القضاء الإداري (Överklagan)' : 'Överklagan till domstol'}
                </h3>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'في حال رفض اللجنة الاجتماعية لطلب إعادة الطفل، يحق للأهل استئناف القرار أمام المحكمة الإدارية (Förvaltningsrätten)، وفي حال الرفض يتم الاستئناف أمام محكمة الاستئناف الإدارية (Kammarrätten).'
                    : 'Om socialnämnden avslår begäran kan beslutet överklagas till Förvaltningsrätten och därefter Kammarrätten.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION TAB 2: ELIGIBILITY & LEX LILLA HJÄRTAT */}
      {activeTab === 'eligibility' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-white border border-[#185C7A]/20 p-5 sm:p-6 rounded-3xl shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#185C7A]">
              <Award className="w-6 h-6 text-[#2F8F83]" />
              <h2 className="text-lg sm:text-xl font-black">
                {isAr ? '2. الشروط ومتطلبات الأهلية (تعديلات Lex Lilla Hjärtat)' : '2. Krav & Förutsättningar (Lex Lilla Hjärtat)'}
              </h2>
            </div>

            <div className="bg-[#F7F5EF] border-s-4 border-[#F2C86B] p-4 rounded-xl text-xs sm:text-sm text-[#123B4A] leading-relaxed">
              <strong>{isAr ? 'تنبيه قانوني هدم الشكوك:' : 'Viktig juridisk princip:'}</strong>{' '}
              {isAr
                ? 'وفقاً لتعديلات قانون "ليكس ليلا يرتات" (Lex Lilla Hjärtat) والقواعد القضائية السائدة، لا يُعاد الطفل لمجرد رغبة الوالدين، بل يجب إثبات الشروط التالية بدقة أمام المحكمة.'
                : 'Efter lagändringarna (Lex Lilla Hjärtat) krävs att förhållandena i hemmet har förändrats på ett varaktigt och genomgripande sätt.'}
            </div>

            <div className="space-y-4">
              {/* Requirement 1 */}
              <div className="bg-[#185C7A]/5 border border-[#185C7A]/20 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 font-black text-[#185C7A] text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#2F8F83]" />
                  <span>{isAr ? 'التغيير الجوهري والمستدام (Varaktig och genomgripande förändring)' : 'Varaktig och genomgripande förändring'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'يجب إثبات أن الظروف التي أدت إلى السحب قد تغيرت جذرياً وبشكل دائم ومستقر وليس حلاً مؤقتاً أو شكلياً.'
                    : 'Det måste bevisas att missförhållandena har upphört varaktigt och inte bara tillfälligt.'}
                </p>
              </div>

              {/* Requirement 2 */}
              <div className="bg-[#185C7A]/5 border border-[#185C7A]/20 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 font-black text-[#185C7A] text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#2F8F83]" />
                  <span>{isAr ? 'معالجة أسباب السحب المباشرة حسب الحالة:' : 'Åtgärda de specifika grunderna för vård:'}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1">
                    <span className="font-extrabold text-[#185C7A] block">{isAr ? 'العنف أو سوء المعاملة:' : 'Vid brister i omsorg:'}</span>
                    <p className="text-[#123B4A]/80 leading-relaxed">
                      {isAr
                        ? 'الالتحاق ببرامج تأهيل الوالدية (مثل ABC أو COPE) وتقديم شهادات رسمية تتضمن تقييماً إيجابياً من الأخصائيين النفسيين.'
                        : 'Genomgå föräldrautbildning och visa dokumenterade framsteg.'}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1">
                    <span className="font-extrabold text-[#185C7A] block">{isAr ? 'الإدمان والمواد المخدرة:' : 'Vid missbruk:'}</span>
                    <p className="text-[#123B4A]/80 leading-relaxed">
                      {isAr
                        ? 'الخضوع لفحوصات تحليل المخدرات الدورية (Drogtest) وإثبات التعافي الكامل لفترة زمنية كافية.'
                        : 'Lämna regelbundna drogtester och visa långvarig drogfrihet.'}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1">
                    <span className="font-extrabold text-[#185C7A] block">{isAr ? 'الخلافات والعنف الأسري:' : 'Vid konflikter:'}</span>
                    <p className="text-[#123B4A]/80 leading-relaxed">
                      {isAr
                        ? 'إثبات الانفصال الفعلي أو الخضوع لعلاج نفسي واستشارات أسرية أدت لإنهاء النزاعات وتأمين سكن ودخل مستقر.'
                        : 'Visa stabil livssituation, trygg bostad och konfliktfri miljö.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirement 3 */}
              <div className="bg-[#185C7A]/5 border border-[#185C7A]/20 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 font-black text-[#185C7A] text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#2F8F83]" />
                  <span>{isAr ? 'إظهار "البصيرة والقدرة على التغيير" (Förändringsbenägenhet)' : 'Förändringsbenägenhet och insikt'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'يُعد الاعتراف بالمشكلات السابقة والتعاون مع السوسيال دليلاً لدى المحكمة على "البصيرة التربوية"، في حين أن الإنكار المطبق أو اتهام المؤسسات المباشر يُفسَّر غالباً كـ "انعدام البصيرة" (Bristande insikt) مما يعرقل العودة.'
                    : 'Att visa insikt i barnets behov och vilja att samarbeta väger tungt i bedömningen.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION TAB 3: STEPVIS ÅTERGÅNG */}
      {activeTab === 'pathway' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-white border border-[#185C7A]/20 p-5 sm:p-6 rounded-3xl shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#185C7A]">
              <RotateCcw className="w-6 h-6 text-[#2F8F83]" />
              <h2 className="text-lg sm:text-xl font-black">
                {isAr ? '3. مسار العودة التدريجية (Stegvis återgång)' : '3. Stegvis återgång till hemmet'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#123B4A] leading-relaxed font-normal">
              {isAr
                ? 'عادة لا تتم إعادة الطفل دفعة واحدة، بل عبر خطة عودة متدرجة ومدروسة تضمن استقراره النفسي وعدم صدمته.'
                : 'Återgången sker gradvis för att säkerställa barnets trygghet och anpassning.'}
            </p>

            <div className="relative border-s-2 border-[#185C7A]/20 ms-4 space-y-6 pt-2">
              {/* Step 1 */}
              <div className="relative ps-6 space-y-1">
                <span className="absolute -start-3.5 top-0.5 w-7 h-7 rounded-full bg-[#185C7A] text-white text-xs font-black flex items-center justify-center border-2 border-white">
                  1
                </span>
                <div className="font-extrabold text-[#185C7A] text-base">
                  {isAr ? 'توسيع نطاق الزيارات (Umgängesrätt)' : 'Utökat umgänge'}
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'الانتقال التدريجي من اللقاءات المشرفة (Övervakat umgänge) داخل مكاتب السوسيال إلى لقاءات غير مشرفة خارج المكتب وفي منزل الوالدين.'
                    : 'Från övervakat umgänge på socialkontoret till oövervakat umgänge i hemmet.'}
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative ps-6 space-y-1">
                <span className="absolute -start-3.5 top-0.5 w-7 h-7 rounded-full bg-[#2F8F83] text-white text-xs font-black flex items-center justify-center border-2 border-white">
                  2
                </span>
                <div className="font-extrabold text-[#185C7A] text-base">
                  {isAr ? 'المبيت المؤقت التجريبي (Provboende)' : 'Provboende'}
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'السماح للطفل بقضاء عطلات نهاية الأسبوع أو أيام محددة متصلة في منزل الوالدين لتقييم مدى نجاح واستقرار التجربة.'
                    : 'Barnet övernattar helger eller längre perioder i föräldrahemmet.'}
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative ps-6 space-y-1">
                <span className="absolute -start-3.5 top-0.5 w-7 h-7 rounded-full bg-[#123B4A] text-white text-xs font-black flex items-center justify-center border-2 border-white">
                  3
                </span>
                <div className="font-extrabold text-[#185C7A] text-base">
                  {isAr ? 'العودة الكاملة مع المتابعة (Uppföljning)' : 'Slutlig hemtagning med uppföljning'}
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'بعد صدور قرار إنهاء الرعاية رسمياً، يلتزم السوسيال بمتابعة وضع الطفل في منزل والديه لمدة تترواح بين 6 أشهر إلى سنة لضمان استقرار البيئة المنزلية والدعم المستمر.'
                    : 'Nämnden beslutar om vårdens upphörande och följer upp situationen i hemmet under 6-12 månader.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION TAB 4: OBSTACLES */}
      {activeTab === 'obstacles' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-white border border-rose-200 p-5 sm:p-6 rounded-3xl shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-rose-800">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-black">
                {isAr ? '4. العقبات والتحديات القانونية التي يجب الحذر منها' : '4. Juridiska hinder att vara uppmärksam på'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Obstacle 1 */}
              <div className="bg-rose-50/70 border border-rose-200 p-4 sm:p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-rose-700 text-white px-2.5 py-1 rounded-lg">
                    {isAr ? 'قرار حظر النقل' : 'Flyttningsförbud'}
                  </span>
                  <span className="text-xs font-mono text-rose-800 font-bold">24 § LVU</span>
                </div>
                <h3 className="text-base font-bold text-rose-900">
                  {isAr ? 'قرار حظر النقل (Flyttningsförbud)' : 'Flyttningsförbud'}
                </h3>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'إذا عاش الطفل لسنوات طويلة لدى عائلة بديلة وأصبح يعتبرها بيئته الأساسية، قد تفرض السلطات "حظر نقل" حتى لو تحسنت ظروف الوالدين البيولوجيين، مراعاةً لمبدأ "ارتباط الطفل" واحتياجه للاستقرار النفسي.'
                    : 'Om barnet har bott länge i ett familjehem kan flyttningsförbud meddelas om en flytt riskerar barnets hälsa eller utveckling.'}
                </p>
              </div>

              {/* Obstacle 2 */}
              <div className="bg-rose-50/70 border border-rose-200 p-4 sm:p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-rose-700 text-white px-2.5 py-1 rounded-lg">
                    {isAr ? 'رأي الطفل' : 'Barnets inställning'}
                  </span>
                  <span className="text-xs font-mono text-rose-800 font-bold">36 § LVU</span>
                </div>
                <h3 className="text-base font-bold text-rose-900">
                  {isAr ? 'رأي ورغبة الطفل (Barnets inställning)' : 'Barnets inställning'}
                </h3>
                <p className="text-xs sm:text-sm text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'إذا كان الطفل كبيراً (عادة فوق 15 عاماً، أو أصغر ولديه نضج كافٍ) وعبر عن رفضه للعودة إلى منزل والديه، يُؤخذ رأيه بوزن قانوني حاسم أمام المحكمة.'
                    : 'Barnets egen inställning väger mycket tungt, särskilt om barnet uppnått en viss ålder och mognad (vanligen från 15 år).'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION TAB 5: STRATEGIC TIPS */}
      {activeTab === 'tips' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-white border border-[#185C7A]/20 p-5 sm:p-6 rounded-3xl shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#185C7A]">
              <Sparkles className="w-6 h-6 text-[#F2C86B]" />
              <h2 className="text-lg sm:text-xl font-black">
                {isAr ? '5. نصائح استراتيجية وقانونية للأسر' : '5. Strategiska och praktiska råd till familjen'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#185C7A]/15 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#185C7A] text-[#F2C86B] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-sm font-bold text-[#185C7A]">{isAr ? 'التوثيق الدقيق للمستندات' : 'Noggrann dokumentation'}</h3>
                <p className="text-xs text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'الاحتفاظ بجميع الشهادات الطبية، وتقارير الدورات التربوية، ونتائج التحاليل، ورسائل البريد الإلكترونية التي تثبت حسن التعاون والالتزام.'
                    : 'Spara alla intyg, kursintyg, provresultat och skriftlig korrespondens.'}
                </p>
              </div>

              <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#185C7A]/15 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#2F8F83] text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-sm font-bold text-[#185C7A]">{isAr ? 'تسجيل الجلسات والاجتماعات' : 'Inspelning av möten'}</h3>
                <p className="text-xs text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'يُتيح القانون السويدي للفرد تسجيل جلساته الخاصة التي يكون طرفاً فيها مع الموظفين الحكوميين، وهو ما يمكن استخدامه لضمان نقل التصريحات بدقة في حال وجود أخطاء في الترجمة.'
                    : 'Det är lagligt i Sverige att spela in samtal man själv deltar i.'}
                </p>
              </div>

              <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#185C7A]/15 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#123B4A] text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-sm font-bold text-[#185C7A]">{isAr ? 'المطالبة بمترجم محلف رسمي' : 'Begär auktoriserad tolk'}</h3>
                <p className="text-xs text-[#123B4A] leading-relaxed">
                  {isAr
                    ? 'عدم خوض أي جلسة تحقيق أو محكمة دون مترجم محلف رسمي لضمان الفهم الدقيق لجميع الطلبات والتقارير القانونية.'
                    : 'Genomför inga viktiga möten utan en auktoriserad tolk.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION TAB 6: READINESS CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-white border border-[#2F8F83]/30 p-5 sm:p-6 rounded-3xl shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[#185C7A]">
                <CheckCircle2 className="w-6 h-6 text-[#2F8F83]" />
                <h2 className="text-lg sm:text-xl font-black">
                  {isAr ? '6. قائمة التقييم والتجهيز لاسترجاع الطفل (Checklist)' : '6. Checklista för beredskap'}
                </h2>
              </div>

              <div className="flex items-center gap-2 bg-[#2F8F83]/10 px-3.5 py-1.5 rounded-2xl border border-[#2F8F83]/20 text-xs font-extrabold text-[#185C7A]">
                <span>{isAr ? 'الجاهزية:' : 'Framsteg:'}</span>
                <span className="text-sm text-[#2F8F83]">{checkedCount} / {checklistItems.length}</span>
                <span>({progressPercent}%)</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#185C7A] to-[#2F8F83] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-xs sm:text-sm text-[#123B4A]/80 leading-relaxed font-medium">
              {isAr
                ? 'استخدم هذه القائمة لتتبع تحضير ملفك القانوني قبل تقديم طلب إنهاء الرعاية القسرية أو التوجه للمحكمة الإدارية:'
                : 'Använd denna checklista för att kontrollera att din ansökan och ditt ärende är väl förberett:'}
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {checklistItems.map((item) => {
                const isDone = !!checklist[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                      isDone
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-2xs'
                        : 'bg-white border-gray-200 hover:border-[#185C7A]/40 text-[#123B4A]'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                          isDone
                            ? 'bg-[#2F8F83] border-[#2F8F83] text-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className={`text-sm font-black ${isDone ? 'line-through text-emerald-800' : 'text-[#185C7A]'}`}>
                          {isAr ? item.titleAr : item.titleSv}
                        </span>
                        <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono font-bold">
                          {item.titleSv}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#123B4A]/80 font-medium">
                        {item.descAr}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Navigation Buttons Banner */}
      <div className="bg-gradient-to-r from-[#185C7A]/10 via-[#2F8F83]/10 to-[#F7F5EF] border border-[#185C7A]/20 p-5 rounded-3xl space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#2F8F83]" />
          <h3 className="text-base font-black text-[#123B4A]">
            {isAr ? 'أدوات مساعدة إضافية في المنصة:' : 'Hjälpsamma verktyg i plattformen:'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {onNavigateToTemplates && (
            <button
              onClick={onNavigateToTemplates}
              className="flex items-center justify-between p-3.5 bg-white border border-[#185C7A]/20 rounded-2xl hover:bg-[#185C7A] hover:text-white transition text-xs font-extrabold text-[#185C7A] cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2F8F83] group-hover:text-[#F2C86B]" />
                <span>{isAr ? 'تحميل النماذج والرسائل السويدية' : 'Ladda ner mallar'}</span>
              </div>
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {onNavigateToAssistant && (
            <button
              onClick={onNavigateToAssistant}
              className="flex items-center justify-between p-3.5 bg-white border border-[#185C7A]/20 rounded-2xl hover:bg-[#185C7A] hover:text-white transition text-xs font-extrabold text-[#185C7A] cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F2C86B]" />
                <span>{isAr ? 'استشارة المساعد الذكي القانوني' : 'Fråga AI-assistenten'}</span>
              </div>
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {onNavigateToReport && (
            <button
              onClick={onNavigateToReport}
              className="flex items-center justify-between p-3.5 bg-white border border-[#185C7A]/20 rounded-2xl hover:bg-[#185C7A] hover:text-white transition text-xs font-extrabold text-[#185C7A] cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#185C7A] group-hover:text-white" />
                <span>{isAr ? 'تقرير حماية الطفل الشامل' : 'Barnskyddsrapporten'}</span>
              </div>
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Helpful Feedback Widget */}
      <HelpfulFeedbackWidget
        itemId="child-restoration-page-overall"
        itemTitle="قسم خطوات استرجاع الطفل من السوسيال (Hemtagning / LVU)"
        lang={lang}
      />

      <DisclaimerBanner lang={lang} compact />
    </div>
  );
};
