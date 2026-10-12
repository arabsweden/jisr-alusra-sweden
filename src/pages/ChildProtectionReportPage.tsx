import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { SocialFactsGuide } from '../components/SocialFactsGuide';
import { HelpfulFeedbackWidget } from '../components/HelpfulFeedbackWidget';
import {
  FileText,
  ShieldCheck,
  Scale,
  BookOpen,
  Home,
  GraduationCap,
  HeartHandshake,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Printer,
  Headphones,
  Volume2,
  Play,
  Pause,
  Square,
  Type,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  Share2,
  RotateCcw,
  Award,
  BookMarked,
  Info,
  Calendar,
  Baby,
  Building2,
  Check
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigateToAssistant?: () => void;
  onNavigateToTemplates?: () => void;
}

export const ChildProtectionReportPage: React.FC<Props> = ({
  lang,
  onNavigateToAssistant,
  onNavigateToTemplates
}) => {
  const [activeSection, setActiveSection] = useState<
    'social-facts' | 'overview' | 'laws-matrix' | 'rights-support' | 'home-rules' | 'school-skolplikt' | 'culture-identity' | 'orosanmalan-guide' | 'official-faq' | 'quiz'
  >('social-facts');

  // FontSize State for "خط واضح كبير" (Large Clear Font)
  const [fontSizeClass, setFontSizeClass] = useState<'text-base' | 'text-lg' | 'text-xl'>('text-lg');

  // Text-To-Speech States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechLang, setSpeechLang] = useState<Language>('ar');

  // Interactive Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Age Calculator Tool State
  const [selectedChildAge, setSelectedChildAge] = useState<number>(7);

  // FAQ Accordion State
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(1);

  // Share link copy confirmation
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-to-Speech Handler
  const handlePlayTTS = (textSnippet?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('عذراً، متصفحك لا يدعم القراءة الصوتية (Web Speech API).');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = textSnippet || `
      دليل ونظام الرعاية الاجتماعية السويدي: حجر الزاوية في حماية الطفل وتمكين الأسرة.
      فهم شامل للأسس القانونية (SoL, LVU, LIV)، الإجراءات، وآليات الدعم في السويد لضمان مستقبل آمن للأطفال وتمكين الجاليات العربية.
    `;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = speechLang === 'ar' ? 'ar-SA' : 'sv-SE';
    utterance.rate = 0.92;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePauseTTS = () => {
    if (isPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStopTTS = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Comprehensive 10 Quiz Questions from both PDF sources
  const quizQuestions = [
    {
      id: 1,
      question: 'ما هو المبدأ المحوري والأساسي الأول الذي ترتكز عليه جميع قرارات وتدخلات رعاية الطفل بالسويد؟',
      options: [
        'معاقبة الأهل فورياً وتطبيق أقصى العقوبات.',
        'مبدأ "مصلحة الطفل الفضلى" (Barnets bästa) وفق اتفاقية الأمم المتحدة لحقوق الطفل (CRC).',
        'نقل الأطفال تلقائياً للأسر البديلة دون أسباب.'
      ],
      correct: 1,
      explanation: 'تعتبر "مصلحة الطفل الفضلى" المحور الأساسي لجميع التدخلات والقرارات بجميع الجهات والمحاكم السويدية.'
    },
    {
      id: 2,
      question: 'ما المبدأ الجوهري الذي يرتكز عليه قانون الخدمات الاجتماعية الجديد (SoL 2025:400)؟',
      options: [
        'التدخل القسري الفوري وسحب الحضانة دون تحقيقات.',
        'مبدأ الطواعية المطلقة، الوقاية المبكرة وتسهيل طلب الدعم دون تعقيدات إجرائية.',
        'فرض عقوبات وغرامات مالية فورية على جميع الأسر.'
      ],
      correct: 1,
      explanation: 'قانون SoL الجديد يركز على تقديم الخدمات الطوعية والوقاية المبكرة وتسهيل الوصول للدعم دون الحاجة لتقييمات معقدة.'
    },
    {
      id: 3,
      question: 'متى يُسمح قانوناً باللجوء إلى الرعاية الإجبارية وإزالة الطفل من أسرته بموجب قانون LVU (1990:52)؟',
      options: [
        'في أي وقت يرغبه الأخصائي الاجتماعي بدون أدلة.',
        'فقط عندما يكون هناك خطر حقيقي وجسيم يهدد صحة الطفل أو نموه البدني/النفسي، وبعد استنفاد حلول الدعم الطوعي.',
        'بمجرد وقوع خلاف عادي بين الأبوين حول مصروف المنزل.'
      ],
      correct: 1,
      explanation: 'قانون LVU هو أداة استثنائية لا تُطبق إلا عند وجود خطر داهم وجسيم وإصرار الأوصياء على رفض الدعم الطوعي.'
    },
    {
      id: 4,
      question: 'وفق القواعد القانونية والتوجيهات الإدارية في السويد، ما هو الحكم في ترك طفل عمره دون 8 سنوات بمفرده في المنزل؟',
      options: [
        'مسموح لعدة ساعات إذا تم إغلاق الأبواب جيداً.',
        'يُمنع تماماً تركه بمفردهم تحت أي ظرف ولو لدقائق معدودة، ويشترط حضور دائم للوالدين أو مقدم رعاية.',
        'مسموح بشرط ترك هاتف ذكي بين يديه.'
      ],
      correct: 1,
      explanation: 'الأطفال دون سن 8 سنوات يُحظر قانوناً وإدارياً تركهم بمفردهم في المنزل تحت أي ظرف لضمان حمايتهم وسلامتهم البدنية.'
    },
    {
      id: 5,
      question: 'كم يبلغ عدد أيام الإجازة الأبوية مدفوعة الأجر الشاملة التي يكفلها النظام السويدي لكل طفل؟',
      options: [
        '30 يوماً فقط.',
        '480 يوماً مدفوعة الأجر (تقسم عادة 240 يوماً لكل والد) لدعم التوازن بين العمل ورعاية الطفل.',
        'سنة كاملة لأحد الوالدين دون الآخر.'
      ],
      correct: 1,
      explanation: 'يكفل النظام السويدي 480 يوماً إجازة أبوية مدفوعة الأجر لتعزيز مشاركة الأبوين في الرعاية والتربية.'
    },
    {
      id: 6,
      question: 'ما هي أقصى مدة إجازة مدرسية قصيرة يحق لمدير المدرسة (Rektor) تقييمها بدون شروط استثنائية مشددة جداً؟',
      options: [
        'تصل إلى 10 أيام دراسية في العام الدراسي.',
        'تصل إلى شهرين في أي وقت يختاره الأهل.',
        'لا يحق للمدير إعطاء أي يوم إجازة إطلاقاً.'
      ],
      correct: 0,
      explanation: 'يحق لمدير المدرسة حصراً تقييم طلبات الإجازة القصيرة التي لا تتجاوز 10 أيام في العام الدراسي للأسباب الشخصية القوية.'
    },
    {
      id: 7,
      question: 'ما هو التصنيف القانوني لسفر التلميذ لخارج السويد أثناء أوقات الدوام المدرسي دون موافقة كتابية رسمية؟',
      options: [
        'غياب اختياري لا يؤثر على السجل المدرسي.',
        'غياب غير قانوني (Ogiltig frånvaro) يوجب فتح تحقيق فوراً ورفع بلاغ قلق عاجل للسوسيال.',
        'إجازة مفتوحة تلقائية.'
      ],
      correct: 1,
      explanation: 'سفر الطفل دون إذن كتابي رسمي يُصنف كغياب غير قانوني، ويلتزم مدير المدرسة قانوناً بفتح تحقيق فوراً وإبلاغ الخدمات الاجتماعية.'
    },
    {
      id: 8,
      question: 'ماذا يمثل مشروع قانون التدخل الوقائي الإجباري (LIV) المقترح لعامي 2026 و 2027؟',
      options: [
        'إلغاء المدارس الحكومية.',
        'حلقة وصل بين SoL و LVU تمنح السوسيال صلاحية اتخاذ قرارات وقائية ملزمة (مثل برامج التأهيل والغرامات) حتى عند عدم موافقة الأوصياء.',
        'توفير رحلات مجانية لكافة العائلات.'
      ],
      correct: 1,
      explanation: 'قانون LIV (Mellantvång) يمنح لجان الرعاية الاجتماعية صلاحية اتخاذ تدابير وقائية ملزمة للأوصياء واليافعين لتفادي وصول الخطر لمرحلة التدخل القسري الكامل.'
    },
    {
      id: 9,
      question: 'ما هي إحدى الحقوق الإجرائية الأساسية للوالدين أثناء المقابلات والتحقيقات مع السوسيال؟',
      options: [
        'استخدام الأطفال أو الأقارب كوسطاء في الترجمة.',
        'المطالبة بمترجم فوري رسمي معتمد (Tolk)، واستصحاب شخص داعم أو محامٍ متخصص، وتسجيل اللقاءات قانونياً.',
        'عدم التحدث إطلاقاً مع أي جهة.'
      ],
      correct: 1,
      explanation: 'كفل القانون للأهل الحق في مترجم رسمي معتمد، استصحاب شخص داعم أو محامٍ (Socialrätt)، وتسجيل جلسات التحقيق ضماناً للدقة.'
    },
    {
      id: 10,
      question: 'هل يمكن للوالدين استئناف قرار الرعاية الإجبارية أمام القضاء السويدي؟',
      options: [
        'لا، قرار السوسيال نهائي ولا يمكن الطعن فيه.',
        'نعم، يحق للوالدين استئناف قرار الرعاية الإجبارية أمام المحاكم الإدارية السويدية (Förvaltningsrätten) وتتم مراجعته بانتظام.',
        'نعم، ولكن فقط بعد مرور 10 سنوات.'
      ],
      correct: 1,
      explanation: 'قرارات LVU تخضع للطعن والرقابة القضائية أمام المحكمة الإدارية المستقلة وتراجع دورياً كل 6 أشهر.'
    }
  ];

  // Official FAQ Data from Document
  const officialFaqs = [
    {
      id: 1,
      question: 'ما هو الدور الرئيسي للخدمات الاجتماعية (السوسيال) في السويد؟',
      answer: 'الدور الرئيسي للخدمات الاجتماعية هو ضمان نمو كل طفل في بيئة آمنة ومستقرة، من خلال تقديم الدعم والمساعدة المباشرة للأسر، مع التركيز التام على الإجراءات الطوعية أولاً وفقاً لقانون الخدمات الاجتماعية (Social Services Act - SoL).'
    },
    {
      id: 2,
      question: 'متى يُسمح بإزالة الطفل من أسرته بموجب القانون السويدي (LVU)؟',
      answer: 'يُسمح بإزالة الطفل (الرعاية الإجبارية) فقط إذا كان هناك خطر حقيقي وجسيم يهدد صحته أو نموه، وفقاً لقانون رعاية الشباب (Care of Young Persons Act - LVU)، وبعد استنفاد كافة خيارات الدعم والحلول الطوعية وتوفر رفض قاطع من الأوصياء.'
    },
    {
      id: 3,
      question: 'ما هي حقوق الطفل والأسرة بموجب اتفاقية الأمم المتحدة لحقوق الطفل (UNCRC) في السويد؟',
      answer: 'يحق للطفل النمو في بيئة آمنة خالية من العنف، والتعبير عن رأيه وسماعه في كافة القرارات التي تمسه مع إعطاء الأولوية لمصلحته الفضلى. كما تحمي التشريعات السويدية حقوق الأسرة بالدعم المستمر، والحق في الاتصال بالطفل ومساعدتها للحفاظ على الروابط الأسرية وإعادة لم الشمل.'
    },
    {
      id: 4,
      question: 'ما هي آليات الدعم المتاحة للأسر لمنع الوصول لإزالة الطفل؟',
      answer: 'تشمل آليات الدعم: الاتفاقات العائلية، الدعم والتدريب التربوي للآباء، الاستشارات الأسرية، مساعدة العائلات في النزاعات، توفير شخص أو عائلة تواصل (Kontaktfamilj)، برامج الدعم الصحي مثل "بيئة آمنة لكل طفل" (Safe Environment for Every Kid)، بالإضافة للإجازة الأبوية الشاملة والدعم المالي والسكني.'
    },
    {
      id: 5,
      question: 'هل يمكن للوالدين استئناف قرار الرعاية الإجبارية الصادر بحق طفلهم؟',
      answer: 'نعم، يحق للوالدين استئناف قرار الرعاية الإجبارية أمام المحكمة الإدارية السويدية المستقلة (Förvaltningsrätten). وتلتزم دائرة الخدمات الاجتماعية بمراجعة قرار الرعاية دورياً كل 6 أشهر كحد أقصى لإنهائه فور زوال أسباب الخطر.'
    }
  ];

  const handleOptionSelect = (qId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  // Age Rules Info Helper
  const getAgeRuleInfo = (age: number) => {
    if (age < 8) {
      return {
        title: 'دون 8 سنوات (حظر تام للترك بمفردهم)',
        badge: 'حظر قانوني وإداري صارم',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        supervision: 'حضور مستمر ومباشر للأوصياء أو مقدم رعاية مرخص.',
        rule: 'يُمنع منعاً باتاً ترك الطفل بمفرده في المنزل تحت أي ظرف من الظروف، ولو لدقائق معدودة.',
        legalRef: 'Föräldrabalken (FB Cap 6) & Tillsyn Guideline'
      };
    } else if (age >= 8 && age <= 12) {
      return {
        title: 'من 9 إلى 12 سنة (فترات قصيرة ومحدودة جداً)',
        badge: 'فترات قصيرة ومشروطة',
        badgeColor: 'bg-[#F2C86B]/40 text-[#123B4A] border-[#F2C86B]',
        supervision: 'يشترط نضج الطفل، وقدرته على التواصل الهاتفي السريع عند الطوارئ.',
        rule: 'يمكن تركهم لفترات قصيرة ومحدودة جداً (لا تتجاوز ساعتين كحد أقصى بالنهار). يُحظر تركهم لرعاية أشقائهم الأصغر سناً لفترات طويلة لمنع نقل عبء المسؤولية الكلية.',
        legalRef: 'Tillsyn Assessment Standard'
      };
    } else if (age >= 13 && age <= 14) {
      return {
        title: 'من 13 إلى 14 سنة (فترات نهارية أطول)',
        badge: 'مستقل جزئياً بمهام خفيفة',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        supervision: 'التحقق من التقييم الذاتي والنضج السلوكي وتأمين هاتف طوارئ.',
        rule: 'يمكن تركهم بمفردهم لفترات أطول خلال النهار (تصل إلى 12 ساعة) مع تفويضهم بمهام رعاية خفيفة. يُمنع التكليف الدوري برعاية الأشقاء الأصغر بدلاً من الوالدين.',
        legalRef: 'Föräldrabalken'
      };
    } else {
      return {
        title: 'من 15 إلى 18 سنة (استقلالية ومبيت مشروط)',
        badge: 'استقلالية واسعة مع متابعة دورية',
        badgeColor: 'bg-[#185C7A] text-white border-[#185C7A]',
        supervision: 'الحفاظ على قنوات تواصل دورية، وتأمين شخص بالغ مرجعي ومتاح عند الحاجة.',
        rule: 'يمكن تركهم لفترات أطول تشمل المبيت ليلاً، شريطة التقييم الدقيق لنضجهم وسلوكهم الاجتماعي واستقرارهم النفسي.',
        legalRef: 'FB Chapter 6 - Tillsyn'
      };
    }
  };

  const selectedAgeInfo = getAgeRuleInfo(selectedChildAge);

  return (
    <div className="space-y-8 pb-16 dir-rtl">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-br from-[#123B4A] via-[#185C7A] to-[#2F8F83] text-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-5 relative overflow-hidden">
        {/* Pattern accent */}
        <div className="absolute top-0 end-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
          <Scale className="w-96 h-96" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2 bg-[#F2C86B] text-[#123B4A] font-black text-xs px-3.5 py-1 rounded-full shadow-2xs">
            <ShieldCheck className="w-4 h-4" />
            <span>نظام ودليل الرعاية الاجتماعية والتشريعات المعتمدة (2026/2027)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-white/15 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs border border-white/20">
              مخصص وميسّر للجاليات العربية بخط واضح كبير
            </span>
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
            نظام الرعاية الاجتماعية السويدي: حجر الزاوية في حماية الطفل وتمكين الأسرة
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed font-medium">
            فهم شامل للأسس القانونية (SoL, LVU, LIV)، حقوق الطفل والوالدين بموجب اتفاقية UNCRC، آليات الدعم لمنع انتزاع الأطفال، ضوابط السلامة المنزلية والمدرسية، واختبارات معرفية تفاعلية.
          </p>
        </div>

        {/* Global Toolbar Controls: Font Size Switcher, Audio Reader, Print & Share */}
        <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 relative z-10 no-print">
          {/* Font Size Selector (خط واضح كبير) */}
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl backdrop-blur-xs border border-white/20">
            <span className="text-xs font-bold text-[#F2C86B] flex items-center gap-1 px-2">
              <Type className="w-4 h-4" />
              <span>حجم الخط:</span>
            </span>
            <button
              onClick={() => setFontSizeClass('text-base')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                fontSizeClass === 'text-base'
                  ? 'bg-white text-[#123B4A] shadow-xs'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              عادي (16px)
            </button>
            <button
              onClick={() => setFontSizeClass('text-lg')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                fontSizeClass === 'text-lg'
                  ? 'bg-[#F2C86B] text-[#123B4A] shadow-xs'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              كبير مريح (18px)
            </button>
            <button
              onClick={() => setFontSizeClass('text-xl')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                fontSizeClass === 'text-xl'
                  ? 'bg-[#2F8F83] text-white shadow-xs'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              كبير جداً (20px)
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Audio Reader */}
            {!isPlaying ? (
              <button
                onClick={() => handlePlayTTS()}
                className="flex items-center gap-2 bg-[#2F8F83] hover:bg-[#236e65] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer border border-white/20"
              >
                <Headphones className="w-4 h-4 text-[#F2C86B]" />
                <span>استمع للتقرير الصوتي</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 bg-[#2F8F83] text-white px-3 py-1.5 rounded-xl text-xs font-bold">
                <button onClick={handlePauseTTS} className="p-1 hover:bg-black/20 rounded cursor-pointer" title="إيقاف مؤقت">
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
                <button onClick={handleStopTTS} className="p-1 hover:bg-black/20 rounded cursor-pointer" title="إنهاء">
                  <Square className="w-4 h-4 text-rose-300" />
                </button>
                <span className="text-[10px] text-[#F2C86B] font-bold px-1 animate-pulse">جاري القراءة...</span>
              </div>
            )}

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-white/20"
            >
              <Printer className="w-4 h-4 text-[#F2C86B]" />
              <span>طباعة / PDF</span>
            </button>

            {/* Share Link Button */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-white/20"
            >
              <Share2 className="w-4 h-4 text-[#F2C86B]" />
              <span>{copiedLink ? 'تم نسخ الرابط!' : 'مشاركة الدليل'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs Inside Report */}
      <div className="flex items-center gap-2 border-b border-[#185C7A]/20 pb-3 overflow-x-auto no-scrollbar no-print">
        <button
          onClick={() => setActiveSection('social-facts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeSection === 'social-facts'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#F2C86B]" />
          <span>حقائق تهمك (الدليل المصور 15 شريحة)</span>
          <span className="bg-[#F2C86B] text-[#123B4A] text-[9px] px-2 py-0.5 rounded-full font-black">جديد</span>
        </button>

        <button
          onClick={() => setActiveSection('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeSection === 'overview'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#F2C86B]" />
          <span>المقدمة والرؤية الوطنية</span>
        </button>

        <button
          onClick={() => setActiveSection('laws-matrix')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeSection === 'laws-matrix'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <Scale className="w-4 h-4 text-[#F2C86B]" />
          <span>مقارنة القوانين (SoL / LVU / LIV)</span>
        </button>

        <button
          onClick={() => setActiveSection('rights-support')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeSection === 'rights-support'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#F2C86B]" />
          <span>حقوق الطفل والأسرة والدعم</span>
        </button>

        <button
          onClick={() => setActiveSection('home-rules')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeSection === 'home-rules'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <Home className="w-4 h-4 text-[#F2C86B]" />
          <span>قواعد المنزل وحساب العمر</span>
        </button>

        <button
          onClick={() => setActiveSection('school-skolplikt')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeSection === 'school-skolplikt'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-[#F2C86B]" />
          <span>التعليم الإلزامي والإجازات</span>
        </button>

        <button
          onClick={() => setActiveSection('culture-identity')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeSection === 'culture-identity'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-[#F2C86B]" />
          <span>الهوية والتربية والوسائط</span>
        </button>

        <button
          onClick={() => setActiveSection('orosanmalan-guide')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeSection === 'orosanmalan-guide'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-[#F2C86B]" />
          <span>بلاغات القلق (Orosanmälan)</span>
        </button>

        <button
          onClick={() => setActiveSection('official-faq')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeSection === 'official-faq'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-[#F2C86B]" />
          <span>الأسئلة الشائعة الموثقة</span>
        </button>

        <button
          onClick={() => setActiveSection('quiz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeSection === 'quiz'
              ? 'bg-[#2F8F83] text-white shadow-md'
              : 'bg-white text-[#2F8F83] hover:bg-gray-100 border border-[#2F8F83]/30'
          }`}
        >
          <Award className="w-4 h-4 text-[#F2C86B]" />
          <span>اختبار الفهم (10 أسئلة)</span>
        </button>
      </div>

      {/* SECTION 0: SOCIAL FACTS INFOGRAPHIC GUIDE (PDF Source) */}
      {activeSection === 'social-facts' && (
        <SocialFactsGuide
          lang={lang}
          onNavigateToAssistant={onNavigateToAssistant}
          onNavigateToReport={() => setActiveSection('overview')}
        />
      )}

      {/* SECTION 1: OVERVIEW */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-5 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <BookMarked className="w-7 h-7 text-[#F2C86B]" />
              <h2 className="text-xl sm:text-2xl font-black">المدخل التشريعي ونظام الرعاية الاجتماعية السويدي</h2>
            </div>

            <p className="leading-relaxed font-normal">
              يمثل نظام الرعاية الاجتماعية في السويد نموذجاً متطوراً ودولة رفاهية حديثة يهدف إلى إيجاد بيئة آمنة ومستقرة لكل طفل، مع <strong className="text-[#185C7A]">الحفاظ الكامل على وحدة الأسرة وتمكين الأبوين في دورهم التربوي قدر الإمكان</strong>. يُعامل كل طفل كمواطن كامل الحقوق والسيادة القانونية، منفصلاً عن مفهوم الحيازة التابعة للأهل.
            </p>

            {/* Quote Box from Swedish State Secretary Maja Fjaestad */}
            <div className="bg-gradient-to-r from-[#185C7A]/10 to-[#2F8F83]/10 p-5 rounded-2xl border-s-4 border-[#185C7A] space-y-2">
              <div className="flex items-center gap-2 font-black text-[#185C7A] text-sm">
                <Building2 className="w-5 h-5 text-[#2F8F83]" />
                <span>رؤية وزارة الصحة والشؤون الاجتماعية السويدية:</span>
              </div>
              <p className="text-[#123B4A]/90 leading-relaxed font-medium text-sm sm:text-base italic">
                "تؤكد د. مايا فياستاد (وزيرة الدولة السويدية للصحة والشؤون الاجتماعية) على أن الرعاية الاجتماعية والعدالة والمساواة بين الجنسين تهدف للارتقاء بالطفل ودعم الوالدين معاً وتوزيع مسؤوليات المنزل والرعاية التربوية بحرية وأمان للجميع."
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#185C7A]/5 p-5 rounded-2xl border border-[#185C7A]/15 space-y-2">
                <div className="text-xl font-black text-[#185C7A] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F2C86B]" />
                  <span>أولوية مصلحة الطفل</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/80 leading-relaxed">
                  تُعد "المصلحة الفضلى للطفل" (Barnets bästa) المحور الأساسي لكافة القرارات الإدارية والقضائية، مع الالتزام التام باتفاقية الأمم المتحدة (UNCRC).
                </p>
              </div>

              <div className="bg-[#2F8F83]/5 p-5 rounded-2xl border border-[#2F8F83]/20 space-y-2">
                <div className="text-xl font-black text-[#2F8F83] flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-[#2F8F83]" />
                  <span>الدعم والحلول الطوعية</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/80 leading-relaxed">
                  تركز الخدمات الاجتماعية بشكل أساسي على تقديم الاستشارات والاتفاقات الطوعية والمساعدات المنزلية قبل اللجوء لأي إجراء إجباري.
                </p>
              </div>

              <div className="bg-[#F2C86B]/15 p-5 rounded-2xl border border-[#F2C86B]/40 space-y-2">
                <div className="text-xl font-black text-[#123B4A] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#185C7A]" />
                  <span>اللامركزية والشفافية</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/80 leading-relaxed">
                  تدار الخدمات الاجتماعية محلياً عبر 290 بلدية سويدية، وتخضع القرارات لمراجعة قضائية دورية وإتاحة الاستئناف لكافة الأسر.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: LAWS MATRIX TABLE (SoL vs LVU vs LIV) */}
      {activeSection === 'laws-matrix' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Scale className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">جدول المقارنة التشريعية التفصيلي (SoL vs LVU vs LIV)</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">الفلسفة التشريعية للرعاية الاجتماعية والتدرج بين الدعم الطوعي والتدخل القسري</p>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto border border-[#185C7A]/20 rounded-2xl shadow-2xs">
              <table className="w-full text-start border-collapse dir-rtl">
                <thead>
                  <tr className="bg-[#185C7A] text-white font-bold text-xs sm:text-sm">
                    <th className="p-4 text-start border-e border-white/20">وجه المقارنة</th>
                    <th className="p-4 text-start border-e border-white/20 bg-[#2F8F83]">قانون الخدمات الاجتماعية (SoL 2025:400)</th>
                    <th className="p-4 text-start border-e border-white/20 bg-rose-800">قانون رعاية القاصرين (LVU 1990:52)</th>
                    <th className="p-4 text-start bg-[#123B4A]">التخل الوقائي الجديد (LIV 2026/2027)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-[#185C7A] bg-gray-50 border-e border-gray-200">الطبيعة الإجرائية</td>
                    <td className="p-4 border-e border-gray-200">طوعي وتشاركي بالكامل، يتطلب موافقة الأوصياء الحرة.</td>
                    <td className="p-4 border-e border-gray-200 text-rose-900 font-semibold bg-rose-50/50">قسري وإلزامي، يُفرض بقوة القانون وموافقة القضاء.</td>
                    <td className="p-4 bg-amber-50/40 font-semibold text-amber-900">تدخل وقائي ملزم (Mellantvång) عند غياب موافقة الأوصياء لتفادي الخطر.</td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-[#185C7A] bg-gray-50 border-e border-gray-200">الفلسفة الأساسية</td>
                    <td className="p-4 border-e border-gray-200">الوقاية المبكرة، بناء الثقة، وتقديم الخدمات الدعمية المباشرة.</td>
                    <td className="p-4 border-e border-gray-200 bg-rose-50/50">حماية الطفل الفورية من خطر داهم أو سلوك مدمّر.</td>
                    <td className="p-4 bg-amber-50/40">سد الفجوة بين الدعم الطوعي والتدخل القسري الكامل لمواجهة الانزلاق الجرمي.</td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-[#185C7A] bg-gray-50 border-e border-gray-200">سلطة اتخاذ القرار</td>
                    <td className="p-4 border-e border-gray-200">اللجنة الاجتماعية في البلدية بالتوافق والتشاور مع الأسرة.</td>
                    <td className="p-4 border-e border-gray-200 bg-rose-50/50 font-bold text-rose-800">المحكمة الإدارية السويدية المستقلة (Förvaltningsrätten).</td>
                    <td className="p-4 bg-amber-50/40">لجنة الرعاية الاجتماعية بالبلدية بإلزام الأوصياء واليافعين.</td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-[#185C7A] bg-gray-50 border-e border-gray-200">خطط الرعاية والدعم</td>
                    <td className="p-4 border-e border-gray-200">خدمات دعم منزلية، استشارات أسرية، شخص أو عائلة تواصل (Kontaktfamilj).</td>
                    <td className="p-4 border-e border-gray-200 bg-rose-50/50">الإيداع في عائلات بديلة (Familjehem) أو دور الرعاية المتخصصة (HVB/SiS).</td>
                    <td className="p-4 bg-amber-50/40">إلزام بحضور برامج تأهيل الوالدية، العلاج السلوكي، والرقابة الإلكترونية (övervakning).</td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-[#185C7A] bg-gray-50 border-e border-gray-200">آلية المراجعة والتنفيذ</td>
                    <td className="p-4 border-e border-gray-200">خطط مرنة تخضع للتقييم المستمر لمدى تلبية رغبات الأسرة.</td>
                    <td className="p-4 border-e border-gray-200 bg-rose-50/50 font-semibold">مراجعة دورية إلزامية من السوسيال كل 6 أشهر كحد أقصى.</td>
                    <td className="p-4 bg-amber-50/40 font-semibold">ربط القرارات بغرامات مالية دورية (Vite) وتخويل الشرطة بالتدخل الفوري عند الامتناع.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note on LVU & Removal Procedures */}
            <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 text-xs sm:text-sm text-rose-950">
              <h3 className="font-bold text-rose-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>إجراءات التدخل والقرارات المؤقتة بموجب LVU:</span>
              </h3>
              <p className="leading-relaxed font-medium">
                في الحالات الطارئة جداً، يُسمح بإزالة الطفل المؤقتة لمدة تصل إلى 14 يوماً فقط تحت مراجعة قضائية فورية من المحكمة الإدارية. وتلتزم دائرة السوسيال بتبني خيار البحث أولاً في شبكة أقارب وأصدقاء الطفل للحفاظ على بيئته الثقافية واللغوية وتجنب النقل للخارج.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: RIGHTS & PREVENTIVE SUPPORT */}
      {activeSection === 'rights-support' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <ShieldCheck className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">حقوق الطفل والأسرة وآليات الدعم الوقائي الشامل</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">المكاسب القانونية، الإجازة الأبوية (480 يوماً)، وبرامج حماية الأسرة</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Children Rights Column */}
              <div className="bg-[#185C7A]/5 border border-[#185C7A]/20 p-5 rounded-2xl space-y-3">
                <h3 className="font-black text-[#185C7A] text-base flex items-center gap-2">
                  <Baby className="w-5 h-5 text-[#2F8F83]" />
                  <span>حقوق الطفل الأساسية بموجب UNCRC:</span>
                </h3>
                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#123B4A]/90 font-medium leading-relaxed">
                  <li><strong>النمو في بيئة آمنة:</strong> حماية الطفل التامة من كافة أشكال العنف والإهمال والبدني والنفسي (المادتان 6 و 19).</li>
                  <li><strong>المصلحة الفضلى للطفل:</strong> إعطاء الأولوية المباشرة لاحتياجات الطفل في كل قرار قضائي أو إداري.</li>
                  <li><strong>الحق في التعبير عن الرأي:</strong> سماع صوت الطفل وإشراكه في القرارات بحسب عمره ونضجه (المادة 12).</li>
                  <li><strong>التعليم والرعاية الصحية:</strong> ضمان الحصول على خدمات طبية وتدريسية متكاملة ومجانية.</li>
                </ul>
              </div>

              {/* Family Rights Column */}
              <div className="bg-[#2F8F83]/5 border border-[#2F8F83]/20 p-5 rounded-2xl space-y-3">
                <h3 className="font-black text-[#2F8F83] text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#2F8F83]" />
                  <span>حقوق الأسرة والحفاظ على الروابط:</span>
                </h3>
                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#123B4A]/90 font-medium leading-relaxed">
                  <li><strong>الدعم التربوي المستمر:</strong> توفير استشارات ومساعدات منزلية مجانية لتطوير مهارات الأبوين.</li>
                  <li><strong>الحق في الاتصال والتواصل:</strong> التزام السوسيال بتيسير التواصل بين الأهل والطفل حتى أثناء الرعاية الإجبارية.</li>
                  <li><strong>إعادة لم الشمل:</strong> تسعى الخدمات الاجتماعية لإعادة الطفل لأسرته فور زوال أسباب الخطر.</li>
                  <li><strong>المساعدة المالية والسكني:</strong> تقديم بدلات الأطفال والإعانة السكنية والرعاية النهارية المجانية.</li>
                </ul>
              </div>
            </div>

            {/* Parental Leave Banner */}
            <div className="bg-gradient-to-r from-[#F2C86B]/20 via-[#185C7A]/10 to-[#2F8F83]/20 p-5 rounded-2xl border border-[#F2C86B]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-[#123B4A] text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#185C7A]" />
                  <span>الإجازة الأبوية الشاملة (Föräldraledighet) - 480 يوماً مدفوعة الأجر</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#123B4A]/80 font-medium leading-relaxed">
                  يمنح النظام السويدي الوالدين 480 يوماً لكل طفل (عادة 240 يوماً لكل والد) لدعم التوازن بين العمل ورعاية الطفل وتشجيع التشارك الوالدي الكامل في المنزل.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: HOME RULES & LEAVING CHILDREN ALONE */}
      {activeSection === 'home-rules' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Home className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">القواعد القانونية لترك الأطفال بمفردهم في المنزل</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">تفكيك قانون الوالدين والأطفال (Föräldrabalken FB) والرقابة الكافية (Tillsyn)</p>
              </div>
            </div>

            <p className="leading-relaxed">
              خلافاً للشائع، لا يحتوي القانون الجنائي السويدي على نص صريح يحدد سناً قانونية معينة يُمنع قبلها ترك الأطفال بمفردهم في المنزل. ومع ذلك، يفرض قانون الوالدين والأطفال (FB Chapter 6) مسؤولية قانونية مطلقة على الأوصياء لتوفير الرعاية البدنية والنفسية والتفتيش والرقابة الكافية (Tillsyn) لحماية الأبناء بما يتناسب مع سنهم ونضجهم الإدراكي والجسدي.
            </p>

            {/* Interactive Age Selector Tool */}
            <div className="bg-[#F7F5EF] p-6 rounded-2xl border border-[#185C7A]/20 space-y-4">
              <h3 className="text-base font-bold text-[#185C7A] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2F8F83]" />
                <span>أداة استكشاف السن القانوني والنضج لترك الأطفال بالمنزل:</span>
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-[#123B4A]">اختر عمر طفلك الحالي:</span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((age) => (
                    <button
                      key={age}
                      onClick={() => setSelectedChildAge(age)}
                      className={`w-9 h-9 rounded-xl font-bold text-xs transition cursor-pointer shrink-0 ${
                        selectedChildAge === age
                          ? 'bg-[#185C7A] text-white shadow-md scale-105'
                          : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/20'
                      }`}
                    >
                      {age} سنة
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Age Rules Result Card */}
              <div className="bg-white p-5 rounded-xl border border-[#185C7A]/15 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#185C7A]/10 pb-2">
                  <h4 className="text-base font-extrabold text-[#185C7A]">{selectedAgeInfo.title}</h4>
                  <span className={`text-xs font-black px-3 py-1 rounded-full border ${selectedAgeInfo.badgeColor}`}>
                    {selectedAgeInfo.badge}
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <strong className="text-[#185C7A]">مستوى الرعاية المطلوبة: </strong>
                    <span>{selectedAgeInfo.supervision}</span>
                  </div>

                  <div>
                    <strong className="text-[#185C7A]">التوجيه القانوني والإداري: </strong>
                    <span className="leading-relaxed">{selectedAgeInfo.rule}</span>
                  </div>

                  <div className="text-[11px] text-gray-400 font-mono pt-1">
                    المرجع القانوني الرسمي: {selectedAgeInfo.legalRef}
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Age Groups Summary Table */}
            <div className="overflow-x-auto border border-[#185C7A]/20 rounded-2xl">
              <table className="w-full text-start text-xs sm:text-sm dir-rtl">
                <thead>
                  <tr className="bg-[#185C7A] text-white font-bold">
                    <th className="p-3 text-start border-e border-white/20">الفئة العمرية</th>
                    <th className="p-3 text-start border-e border-white/20">التوجيهات الإدارية والرقابية</th>
                    <th className="p-3 text-start">مستوى الرعاية والتفتيش المطلوب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-rose-50/40">
                    <td className="p-3 font-bold text-rose-900 border-e border-gray-200">دون 8 سنوات</td>
                    <td className="p-3 border-e border-gray-200">يُمنع تماماً تركهم بمفردهم تحت أي ظرف من الظروف ولو لدقائق معدودة.</td>
                    <td className="p-3 font-semibold text-rose-800">حضور مستمر لأحد الأبوين أو مقدم رعاية مرخص.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-bold text-[#185C7A] border-e border-gray-200">من 9 إلى 12 سنة</td>
                    <td className="p-3 border-e border-gray-200">يمكن تركهم بمفردهم لفترات قصيرة ومحدودة جداً (لا تتجاوز ساعتين كحد أقصى).</td>
                    <td className="p-3 font-semibold">يُشترط امتلاك الطفل نضجاً كافياً والقدرة على استخدام الهاتف للتواصل الفوري للطوارئ.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-bold text-[#185C7A] border-e border-gray-200">فوق 13 سنة</td>
                    <td className="p-3 border-e border-gray-200">يمكن تركهم بمفردهم لفترات أطول خلال النهار (تصل إلى 12 ساعة) مع تفويضهم بمهام خفيفة.</td>
                    <td className="p-3 font-semibold">يُمنع تركهم لرعاية أشقائهم الأصغر سناً لفترات طويلة وبشكل دوري لمنع نقل عبء المسؤولية الكلية.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-bold text-[#185C7A] border-e border-gray-200">من 15 إلى 18 سنة</td>
                    <td className="p-3 border-e border-gray-200">يمكن تركهم بمفردهم لفترات أطول تشمل المبيت ليلاً، شريطة التقييم الدقيق لنضجهم.</td>
                    <td className="p-3 font-semibold">الحفاظ على قنوات تواصل دورية وتأمين وجود شخص بالغ مرجعي عند الحاجة.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: SCHOOL & SKOLPLIKT */}
      {activeSection === 'school-skolplikt' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <GraduationCap className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">قانون التعليم الإلزامي (Skolplikt) وضوابط الإجازات المدرسية</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">فهم خطورة السفر بدون إذن رسمي وغياب التلميذ غير القانوني (Ogiltig frånvaro)</p>
              </div>
            </div>

            <p className="leading-relaxed">
              تفرض القوانين السويدية واجباً صارماً يُعرف بـ <strong className="text-[#185C7A]">التعليم الإلزامي (Skolplikt)</strong> يبدأ من سن الصف التمهيدي (الصف صفر) وحتى نهاية الصف التاسع. يلتزم جميع الأطفال المقيمين بالحضور اليومي والمنتظم لكافة أيام العام الدراسي بموجب قانون التعليم (Skollagen).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-3">
                <h3 className="font-extrabold text-rose-900 text-base flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>خطورة السفر الترفيهي بدون إذن أثناء الدوام:</span>
                </h3>
                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                  <li>الغياب غير المبرر أو السفر الترفيهي خارج أوقات العطل الرسمية يُعد من أخطر روافد بلاغات القلق للسوسيال.</li>
                  <li>لا يمتلك الأهل أي حق قانوني في تقرير غياب أطفالهم للسفر دون موافقة كتابية رسمية من المدرسة.</li>
                  <li>يتم تصنيف الغياب كـ "غياب غير قانوني" (Ogiltig frånvaro)، ويلتزم مدير المدرسة قانوناً بفتح تحقيق وإبلاغ السوسيال فوراً.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <h3 className="font-extrabold text-emerald-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>ضوابط طلب الإجازات الرسمية الصحيحة:</span>
                </h3>
                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                  <li><strong>الإجازات القصيرة (دون 10 أيام):</strong> يحق لمدير المدرسة (Rektor) تقييمها حصراً للأسباب الشخصية القوية والمبررة.</li>
                  <li><strong>الإجازات الطويلة (فوق 10 أيام):</strong> لا تُمنح إلا بموافقة المدير وتحت شروط استثنائية للغاية (Synnerliga skäl) كالظروف الطبية الطارئة المعززة بتقارير رسمية.</li>
                  <li>تقديم الطلب مبكراً وتوقيع خطة الدراسة الذاتية يقلل من احتمالية الرفض.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CULTURE & LANGUAGE IDENTITY */}
      {activeSection === 'culture-identity' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <HeartHandshake className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">صيانة الهوية اللغوية والتربية والوسائط الرقمية</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">البيانات الإحصائية والتوصيات الاستراتيجية للأسر العربية في السويد</p>
              </div>
            </div>

            <p className="leading-relaxed">
              تشير الدراسات السوسيولسانية إلى أن الأغلبية الساحقة من الآباء العرب في السويد (90%) يتواصلون بالعربية فيما بينهم، و79% منهم يتحدثون بها مع أطفالهم. إلا أن الأطفال يتحدثون بالسويدية بين الأشقاء بنسبة 18% و36% بمزيج من اللغتين، مما يحتم تفعيل استراتيجيات تربوية متوازنة لتثبيت اللغة الأم والقيم الأسرية.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#185C7A]/5 border border-[#185C7A]/20 p-5 rounded-2xl space-y-3">
                <h3 className="font-extrabold text-[#185C7A] text-base">دروس اللغة الأم (Modersmålsundervisning)</h3>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed">
                  يصل التسجيل في دروس اللغة الأم إلى 65% من الأطفال وترتفع إلى 92% عند سن التاسعة. الاستفادة من هذا الحق القانوني المجاني بالمدارس البلدية يسهم في تطوير الذكاء اللغوي والارتباط الثقافي الإيجابي.
                </p>
              </div>

              <div className="bg-[#2F8F83]/5 border border-[#2F8F83]/20 p-5 rounded-2xl space-y-3">
                <h3 className="font-extrabold text-[#2F8F83] text-base">استراتيجيات "التعلم المصغر" الرقمي (Micro-learning)</h3>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed">
                  استخدام مقاطع فيديو قصيرة باللغة السويدية للتعريف بالقيم الأسرية والأخلاقية مثل المسؤولية (Ansvar)، الرحمة (Barmhärtighet)، والصدق (Ärlighet) بطرق محببة وتفاعلية تبتعد عن لغة الأوامر.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: OROSANMÄLAN GUIDE */}
      {activeSection === 'orosanmalan-guide' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <AlertTriangle className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">الدليل الاستراتيجي للأسر: كيفية التعامل المنهجي مع بلاغات القلق (Orosanmälan)</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">خطوات عملية وقانونية ذكية لإدارة اللقاءات بمهنية وضمان حماية الأسرة</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2 text-amber-950">
              <h3 className="font-bold text-base flex items-center gap-2 text-amber-900">
                <Info className="w-5 h-5 text-amber-600" />
                <span>تنبيه أولي هام جداً:</span>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                في حال تلقي العائلة إشعاراً من السوسيال بوجود بلاغ قلق بشأن أحد الأطفال، يتعين الابتعاد الكامل عن ردود الفعل الدفاعية أو التصادمية. يُنصح باتباع الخطوات القانونية التالية:
              </p>
            </div>

            {/* 3 Steps Process Cards */}
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="bg-[#185C7A]/5 border border-[#185C7A]/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#185C7A] text-white flex items-center justify-center font-black text-sm">1</span>
                  <h3 className="text-base font-extrabold text-[#185C7A]">الاستعداد المعرفي وتحديد محاور التحقيق الاجتماعي:</h3>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#123B4A]/90 font-medium ps-2 leading-relaxed">
                  <li>التواصل كتابياً أو هاتفياً مع السكرتير الاجتماعي المسؤول لطلب تفاصيل واضحة ومحددة حول البلاغ.</li>
                  <li>السؤال عن الحدث أو السلوك الملموس الذي استند إليه بلاغ القلق.</li>
                  <li>التحقق مما إذا كان البلاغ مرسلاً من جهة مهنية ملزمة (المدرسة، المستشفى) أم من جهة غير معلومة.</li>
                  <li>طلب الحصول على كافة الوثائق والتقارير المكتوبة لدراستها مسبقاً قبل الاجتماع.</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="bg-[#2F8F83]/5 border border-[#2F8F83]/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#2F8F83] text-white flex items-center justify-center font-black text-sm">2</span>
                  <h3 className="text-base font-extrabold text-[#2F8F83]">التمسك بالحقوق القانونية الإجرائية أثناء المقابلة:</h3>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#123B4A]/90 font-medium ps-2 leading-relaxed">
                  <li><strong>المطالبة بمترجم فوري رسمي معتمد (Tolk):</strong> حظر استخدام الأطفال أو الأقارب كوسطاء في الترجمة لضمان الدقة القانونية.</li>
                  <li><strong>استصحاب شخص داعم أو محامٍ متخصص:</strong> يحق للأوصياء اصطحاب شخص موثوق أو توكيل محامٍ متخصص في قانون الاجتماع (Socialrätt).</li>
                  <li><strong>تسجيل اللقاءات قانونياً:</strong> يسمح القانون السويدي للفرد بتسجيل لقاءاته واجتماعاته الخاصة لضمان مطابقة التقارير المكتوبة.</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="bg-[#F2C86B]/10 border border-[#F2C86B]/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#123B4A] text-[#F2C86B] flex items-center justify-center font-black text-sm">3</span>
                  <h3 className="text-base font-extrabold text-[#123B4A]">إظهار "البصيرة الوالدية" (Föräldrainsikt) وصياغة الاستجابة الموضوعية:</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  في حال وجود مشكلة حقيقية (مثل صعوبة السيطرة على غضب الطفل أو الخلافات الأسرية)، يجب الاعتراف بها بحكمة وإظهار الرغبة الكاملة في تلقي الدعم والخدمات الطوعية. هذا السلوك يُصنف قانونياً كـ "بصيرة عالية وأهلية والدية متكاملة" تمنع تحويل القضية لتدابير قسرية.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: OFFICIAL FAQ */}
      {activeSection === 'official-faq' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <HelpCircle className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">الأسئلة الأكثر تكراراً الموثقة رسمياً حول الرعاية الاجتماعية</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">إجابات قانونية واضحة ومستندة للوائح الحكومية الرسمية بالسويد</p>
              </div>
            </div>

            <div className="space-y-3">
              {officialFaqs.map((faq) => {
                const isOpen = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-[#185C7A]/20 rounded-2xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                      className="w-full p-4 sm:p-5 bg-[#F7F5EF] hover:bg-[#185C7A]/10 text-start font-black text-[#185C7A] flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base leading-snug">{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-5 h-5 text-[#2F8F83] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#185C7A] shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 sm:p-5 bg-white border-t border-[#185C7A]/15 text-xs sm:text-sm text-[#123B4A]/90 font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: INTERACTIVE QUIZ & SELF ASSESSMENT */}
      {activeSection === 'quiz' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#2F8F83]/30 shadow-md space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2F8F83]/20 pb-4">
              <div className="flex items-center gap-3 text-[#2F8F83]">
                <Award className="w-7 h-7 text-[#F2C86B]" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#185C7A]">اختبار الفهم التفاعلي لقوانين حماية الطفل بالسويد</h2>
                  <p className="text-xs text-[#123B4A]/70 mt-1">اختبر حصيلتك المعرفية والقانونية بناءً على نتائج التقارير الرسمية الشاملة (10 أسئلة)</p>
                </div>
              </div>

              {quizSubmitted && (
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="flex items-center gap-1.5 bg-[#185C7A] hover:bg-[#124259] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#F2C86B]" />
                  <span>إعادة الاختبار</span>
                </button>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {quizQuestions.map((q, idx) => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correct;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition ${
                      quizSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50/60 border-emerald-300'
                          : 'bg-rose-50/60 border-rose-300'
                        : 'bg-[#F7F5EF]/60 border-[#185C7A]/15'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-xl bg-[#185C7A] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-3 flex-1">
                        <h3 className="font-extrabold text-base text-[#185C7A] leading-snug">{q.question}</h3>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isThisSelected = selected === optIdx;
                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleOptionSelect(q.id, optIdx)}
                                disabled={quizSubmitted}
                                className={`w-full text-start p-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-between cursor-pointer ${
                                  isThisSelected
                                    ? 'bg-[#185C7A] text-white shadow-2xs'
                                    : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
                                }`}
                              >
                                <span>{opt}</span>
                                {isThisSelected && <CheckCircle2 className="w-4 h-4 text-[#F2C86B] shrink-0" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation on Submission */}
                        {quizSubmitted && (
                          <div className={`p-3 rounded-xl text-xs font-medium border ${isCorrect ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-rose-100 text-rose-900 border-rose-300'}`}>
                            <strong className="block font-bold mb-0.5">{isCorrect ? 'إجابة صحيحة!' : 'التوضيح القانوني الموثق:'}</strong>
                            <span>{q.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Submit Bar */}
            {!quizSubmitted ? (
              <div className="pt-4 border-t border-[#2F8F83]/20 flex items-center justify-between">
                <span className="text-xs font-bold text-[#123B4A]/70">
                  تمت إجابة {Object.keys(quizAnswers).length} من أصل 10 أسئلة
                </span>
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < 10}
                  className="bg-[#2F8F83] hover:bg-[#236e65] disabled:bg-gray-300 text-white px-6 py-2.5 rounded-xl text-xs font-black transition shadow-md cursor-pointer"
                >
                  عرض النتيجة والتقييم القانوني
                </button>
              </div>
            ) : (
              <div className="p-6 bg-[#185C7A] text-white rounded-2xl text-center space-y-3 shadow-lg">
                <Award className="w-12 h-12 text-[#F2C86B] mx-auto animate-bounce" />
                <h3 className="text-2xl font-black">
                  درجتك في الاختبار: {calculateQuizScore()} من أصل 10
                </h3>
                <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto leading-relaxed">
                  {calculateQuizScore() >= 8
                    ? 'ممتاز جداً! لديك فهم عميق ووعي قانوني ممتاز بالأطر التشريعية وضوابط السلامة الأسرية بالسويد.'
                    : 'حاصلك المعرفي جيد، ونوصي بمراجعة أقسام المقارنة التشريعية ودليل بلاغات القلق لمزيد من الإلمام.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom CTA and Disclaimer Banner */}
      <div className="bg-[#185C7A]/5 border border-[#185C7A]/20 p-6 rounded-3xl space-y-4 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-[#185C7A] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2F8F83]" />
              <span>هل لديك حالة خاصة أو استفسار قانوني حول طفلك؟</span>
            </h3>
            <p className="text-xs text-[#123B4A]/80 font-medium">
              يمكنك استخدام المساعد الذكي الموثق باللائحة الرسمية أو استعراض الرسائل والنماذج المكتوبة بالسويدية.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateToAssistant && (
              <button
                onClick={onNavigateToAssistant}
                className="bg-[#185C7A] hover:bg-[#104359] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#F2C86B]" />
                <span>اسأل المساعد الذكي</span>
              </button>
            )}

            {onNavigateToTemplates && (
              <button
                onClick={onNavigateToTemplates}
                className="bg-white hover:bg-gray-100 text-[#123B4A] border border-[#185C7A]/20 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#185C7A]" />
                <span>النماذج العملية</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Feedback Widget */}
        <HelpfulFeedbackWidget
          itemId={`child-protection-${activeSection}`}
          itemTitle="قسم تقرير دليل الحماية القانونية للطفل"
          lang={lang}
        />

        <DisclaimerBanner lang={lang} compact />
      </div>
    </div>
  );
};
