import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { HelpfulFeedbackWidget } from './HelpfulFeedbackWidget';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Scale,
  AlertTriangle,
  Building2,
  Clock,
  HelpCircle,
  Award,
  Users,
  FileText,
  Volume2,
  Headphones,
  Play,
  Pause,
  Square,
  Type,
  ChevronRight,
  ChevronLeft,
  Share2,
  Printer,
  Sparkles,
  PhoneCall,
  Heart,
  RotateCcw,
  BookOpen,
  Info
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigateToAssistant?: () => void;
  onNavigateToReport?: () => void;
}

export const SocialFactsGuide: React.FC<Props> = ({
  lang,
  onNavigateToAssistant,
  onNavigateToReport
}) => {
  // Font Size state for "خط واضح كبير"
  const [fontSizeClass, setFontSizeClass] = useState<'text-lg' | 'text-xl' | 'text-2xl'>('text-xl');

  // Slide Navigator State (1 to 15)
  const [activeSlide, setActiveSlide] = useState<number>(1);

  // Audio Reader States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Myth vs Fact Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Share Toast
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // 15 Visual Slides Data extracted directly from the attached PDF guide
  const slidesData = [
    {
      id: 1,
      title: 'السوسيال والأطفال في السويد: حقائق تهمك',
      subtitle: 'دليل مبسط للأهل لفهم القانون وحقوق العائلة وتجنب المفاهيم المغلوطة',
      badge: 'المدخل والتوعية',
      color: 'from-[#123B4A] via-[#185C7A] to-[#2F8F83]',
      icon: ShieldCheck,
      content: `يقدم هذا الدليل المبسط الجوانب القانونية والإجراءات العملية المتعلقة بدور الخدمات الاجتماعية (السوسيال) في السويد. الهدف هو تمكين العائلات والجاليات العربية بالمعرفة الموثوقة، وتفكيك الشائعات التي تخيف الأهالي، وضمان حماية أطفالكم وفق القانون.`,
      highlight: 'المعرفة هي حمايتك الأولى؛ فهم النظام القانوني يسهم في بناء بيئة أسرية آمنة ومستقرة.'
    },
    {
      id: 2,
      title: 'خرافة vs حقيقة: هدف السوسيال في السويد',
      subtitle: 'تفكيك الشائعة الأكثر انتشاراً بين العائلات العربية',
      badge: 'خرافة وحقيقة',
      color: 'from-amber-800 to-[#123B4A]',
      icon: Scale,
      myth: 'خرافة: السوسيال يهدف لخطف الأطفال وسحبهم من أسرهم.',
      fact: 'حقيقة: القانون السويدي يحمي الطفل ولا يعاقب الأهل. التدخل يهدف حصراً لضمان سلامة ورعاية الطفل ضمن بيئة عائلية داعمة ومستقرة.',
      content: `معظم الإجراءات التي تقوم بها الخدمات الاجتماعية هي خدمات طوعية ومساعدات للمنزل. لا يلجأ السوسيال لسحب الأطفال إلا في الحالات الاستثنائية جداً التي يوجد فيها خطر حقيقي وداهم على حياة الطفل أو سلامته البدنية والنفسية.`
    },
    {
      id: 3,
      title: 'الفرق الجوهري بين قانون SoL وقانون LVU',
      subtitle: 'التدرج القانوني بين المساعدة الطوعية والتدخل القسري',
      badge: 'المقارنة القانونية',
      color: 'from-[#185C7A] to-[#2F8F83]',
      icon: Scale,
      content: `القانون السويدي يفرق بشكل حاسم بين نوعين من التدخل:`,
      points: [
        'SoL (طوعي): مساعدة ودعم بموافقة الأهل الكاملة. هذا هو الأصل والأساس في معظم الحالات (مثل الدعم النفسي، الاستشارات التربوية، العائلة المساعدة).',
        'LVU (قسري): تدخل استثنائي لحماية الطفل عند وجود خطر حقيقي وجسيم يهدد صحته أو نموه، ووجود رفض قاطع من الأهل لتلقي المساعدة الطوعية.'
      ]
    },
    {
      id: 4,
      title: 'كيف يبدأ الملف؟ بلاغ القلق (Orosanmälan)',
      subtitle: 'الجهات الملزمة قانونياً وواجب الإبلاغ لحماية الطفل',
      badge: 'بداية الإجراءات',
      color: 'from-[#123B4A] to-amber-900',
      icon: AlertTriangle,
      content: `تبدأ معظم القضايا بتلقي السوسيال لـ "بلاغ قلق" بشأن طفل معين:`,
      points: [
        'المدرسة، الموظفون الصحيون، والشرطة ملزمون قانونياً بالإبلاغ عند وجود أي شك في تعرض الطفل لأذى أو إهمال.',
        'يمكن لأي شخص آخر (كالجار أو الأقارب) تقديم بلاغ قلق إذا ساورهم الخوف على سلامة الطفل.',
        'تقديم البلاغ لا يعني صدور قرار ضد العائلة، بل يعني بدء مرحلة التقييم المبدئي.'
      ]
    },
    {
      id: 5,
      title: 'ماذا يحدث بعد البلاغ؟ التحقيق الاجتماعي',
      subtitle: 'خطوات التحقيق والاستماع لجميع الأطراف',
      badge: 'مرحلة التحقيق',
      color: 'from-[#185C7A] to-[#123B4A]',
      icon: Users,
      content: `عند فتح تحقيق اجتماعي (Utredning)، تقوم دائرة السوسيال بالخطوات التالية:`,
      points: [
        'الحديث المباشر مع الأهل ومع الطفل بشكل فردي ومناسب لعمره.',
        'جمع البيانات والمعلومات الميدانية من المدرسة والمؤسسات الصحية والأقارب.',
        'الهدف الرئيسي للتحقيق هو تقييم وضع الطفل واحتياجاته، وليس سحب الطفل فوراً كما يظن البعض.'
      ]
    },
    {
      id: 6,
      title: 'متى يتدخل القانون قسرياً بموجب LVU؟',
      subtitle: 'الحالات الحصرية المحددة في التشريع السويدي',
      badge: 'شروط LVU',
      color: 'from-rose-900 to-[#123B4A]',
      icon: AlertTriangle,
      content: `ينص قانون LVU على تطبيق الرعاية القسرية حصراً في الحالات التالية:`,
      points: [
        'تعرض الطفل لعنف جسدي أو نفسي داخل الأسرة.',
        'وجود إهمال شديد ومستمر في رعاية الطفل واحتياجاته الأساسية.',
        'سلوك خطر صادم من الطفل نفسه (مثل إدمان المخدرات، الانخراط في الجريمة المنظمة).',
        'تأكيد حاسم: "الدين والمعتقد ليس سبباً إطلاقاً لسحب الأطفال؛ القانون يحمي جميع الأطفال بغض النظر عن خلفيتهم الثقافية أو الدينية."'
      ]
    },
    {
      id: 7,
      title: 'من يتخذ القرار النهائي في الرعاية القسرية؟',
      subtitle: 'دليل استقلالية القضاء السويدي (المحكمة الإدارية)',
      badge: 'القرار القضائي',
      color: 'from-[#123B4A] to-[#185C7A]',
      icon: Building2,
      content: `السوسيال ليس هو الجهة التي تتخذ قرار الرعاية القسرية بشكل منفرد:`,
      points: [
        'المحكمة الإدارية (Förvaltningsrätten) هي الجهة القضائية المستقلة التي تصدر القرار النهائي.',
        'السوسيال يكتفي بتقديم الطلب والأدلة للمحكمة، والمحكمة هي التي تقرر بناءً على الأدلة وحجج الطرفين.',
        'لست وحدك أمام الموظف؛ يحق لك محامٍ يمثلك ويدافع عن موقفك أمام القاضي.'
      ]
    },
    {
      id: 8,
      title: 'الرعاية الفورية (الطارئة - Omedelbart omhändertagande)',
      subtitle: 'الخط الزمني والحماية القضائية للحالات الحادة',
      badge: 'الحالات الطارئة',
      color: 'from-amber-900 via-rose-900 to-[#123B4A]',
      icon: Clock,
      content: `في الحالات الخطرة جداً والداهمة، يمكن اتخاذ قرار سحب فوري لحماية الطفل:`,
      points: [
        'القرار الفوري: يتخذه رئيس لجنة الرعاية الاجتماعية عند وجود خطر عاجل لا يحتمل الانتظار.',
        'مراجعة المحكمة خلال أسبوع: تلتزم المحكمة الإدارية بمراجعة القرار الفوري وتثبيته أو إلغائه خلال أسبوع واحد.',
        'القرار النهائي خلال 4 أسابيع: يجب تقديم القضية كاملة للمحكمة للبت النهائي خلال 4 أسابيع كحد أقصى.'
      ]
    },
    {
      id: 9,
      title: 'حقوقك كوالد أمام المحكمة والسوسيال',
      subtitle: 'الضمانات القانونية المكفولة لجميع الأسر في السويد',
      badge: 'حقوق الوالدين',
      color: 'from-[#2F8F83] to-[#123B4A]',
      icon: ShieldCheck,
      content: `يكفل القانون السويدي للأهل أربعة حقوق رئيسية لا يمكن حرمانهما منها:`,
      points: [
        'محامٍ مجاني (Offentligt biträde): تدفع الدولة تكاليف محامٍ متخصص يختاره الوالد بنفسه.',
        'مترجم فوري محترف (Tolk): حق الحصول على ترجمة فورية معتمدة بلغتك الأم في كل الجلسات والتحقيقات.',
        'الاطلاع الكامل على الوثائق: الحق في قراءة وقائع التحقيق والتقارير المكتوبة قبل الجلسة.',
        'حق الاستئناف: الحق الكامل في الطعن بالقرار أمام المحكمة الإدارية العليا (Kammarrätten).'
      ]
    },
    {
      id: 10,
      title: 'أين يعيش الطفل أثناء فترة الرعاية؟',
      subtitle: 'خيارات الإيداع وأولوية البحث في شبكة الأقارب',
      badge: 'مكان الرعاية',
      color: 'from-[#185C7A] to-[#123B4A]',
      icon: BookOpen,
      content: `عند قرار الرعاية، يُنقل الطفل إلى إحدى البيئات التالية:`,
      points: [
        'عائلة بديلة (Familjehem): يعيش الطفل في بيئة منزلية دافئة وعادية مع عائلة مرخصة.',
        'دار رعاية وعلاج (HVB): مخصصة للمراهقين أو الحالات التي تحتاج لعناية ورعاية سلوكية متخصصة.',
        'أولوية الأقارب: يلتزم السوسيال ببحث إمكانية إيداع الطفل لدى الأقارب (كالجد أو العم) أولاً إذا كانت بيئتهم آمنة ومناسبة.'
      ]
    },
    {
      id: 11,
      title: 'هل أستطيع رؤية طفلي أثناء الرعاية؟',
      subtitle: 'حقوق التواصل والتزيارات الأسرية',
      badge: 'التواصل والزيارة',
      color: 'from-[#2F8F83] via-[#185C7A] to-[#123B4A]',
      icon: Heart,
      content: `نعم، في أغلب الحالات يحافظ الوالدان على حق الاتصال بطفلهما:`,
      points: [
        'يتم وضع خطة منتظمة للزيارات والاتصالات الهاتفية والمصورة.',
        'لا يُمنع التواصل إلا في حالات استثنائية إذا كان يسبب خطراً مباشراً على الطفل.',
        'يحق للوالدين استئناف قرار تقييد الزيارات أو منع التواصل أمام المحكمة.'
      ]
    },
    {
      id: 12,
      title: 'الهدف النهائي: العودة للمنزل ولمّ الشمل',
      subtitle: 'الرعاية القسرية ليست دائمة والمراجعة كل 6 أشهر',
      badge: 'لمّ الشمل',
      color: 'from-[#123B4A] to-[#2F8F83]',
      icon: RotateCcw,
      content: `الرعاية القسرية ليست قراراً نهائياً أو سحباً أبدياً للحضانة:`,
      points: [
        'التزام المراجعة الدورية: يلتزم السوسيال بمراجعة قرار الرعاية كل 6 أشهر كحد أقصى.',
        'هدف إعادة الطفل: الهدف الرئيسي لجميع المؤسسات السويدية هو إعادة الطفل لأسرته بمجرد زوال أسباب الخطر وتحسن البيئة الأسرية.'
      ]
    },
    {
      id: 13,
      title: 'النصيحة الذهبية للأهل: تعاون ولا تهرب!',
      subtitle: 'الموقف القانوني والسلوكي الأفضل لإعادة الطفل سريعا',
      badge: 'نصيحة ذهبية',
      color: 'from-amber-800 to-[#2F8F83]',
      icon: Award,
      content: `إظهار الرغبة الصادقة في التغيير والتعاون البناء مع السوسيال هو المفتاح الأقوى:`,
      points: [
        'التعاون والمشاركة في البرامج التدريبية والاستشارات الأسرية يقوي موقفك القانوني أمام المحكمة.',
        'الهروب أو التصادم والانفعال يعقد موقف الأسرة ويزيد من تقييم الخطر.',
        'الاستفادة من المساعدة الطوعية تعبر عن "بصيرة والدية عالية" (Föräldrainsikt).'
      ]
    },
    {
      id: 14,
      title: 'أين تجد المساعدة القانونية والرسمية؟',
      subtitle: 'قنوات التواصل والمؤسسات الداعمة لحقوق الأسرة',
      badge: 'جهات المساعدة',
      color: 'from-[#185C7A] to-[#123B4A]',
      icon: PhoneCall,
      content: `يمكنك التواصل مع الجهات الرسمية التالية للحصول على الدعم والشكاوى:`,
      points: [
        'محاميك الخاص (مجاني في قضايا LVU وتدفعه الدولة).',
        'مفتشية الصحة والرعاية (IVO): الجهة الحكومية المستقلة لتلقي الشكاوى ضد قرارات السوسيال.',
        'منظمات حقوق الطفل والمساعدة مثل BRIS (هاتف 116 111).',
        'مؤسسة MFoF (Myndigheten för familjerätt och föräldraskapsstöd) لدعم العلاقات الأسرية.'
      ]
    },
    {
      id: 15,
      title: 'المعرفة هي حمايتك: شارك الدليل مع غيرك',
      subtitle: 'التوعية القانونية والمسؤولية المجتمعية للجاليات',
      badge: 'الخاتمة والتوعية',
      color: 'from-[#123B4A] via-[#185C7A] to-[#2F8F83]',
      icon: Sparkles,
      content: `لا تتردد في طلب المساعدة القانونية فوراً عند الحاجة. الوعي والقراءة المباشرة من المصادر الرسمية يحميك وحمي أطفالك من الانسياق وراء للشائعات والخوف.`,
      highlight: 'شارك هذه الحقائق الموثقة لتوعية الأسر والعائلات الأخرى من حولك!'
    }
  ];

  // 6 Interactive Quiz Questions for Myth vs Fact Test
  const quizItems = [
    {
      id: 1,
      question: 'هل يهدف السوسيال في السويد إلى سحب الأطفال وخطفهم من أسرهم؟',
      correctIsFact: false,
      mythText: 'خرافة غير صحيحة. الهدف هو حماية الطفل وتأهيل الأسرة، والأصل هو تقديم الخدمات الطوعية والاحتفاظ بالطفل مع أسرته.',
      factText: 'حقيقة: السوسيال يسعى لدعم الأسرة، والتدخل القسري استثناء حرج فقط عند وجود خطر حقيقي داهم.'
    },
    {
      id: 2,
      question: 'هل يمكن للموظف الاجتماعي (السوسيال) اتخاذ قرار سحب الطفل بشكل نهائي بمفرده؟',
      correctIsFact: false,
      mythText: 'خرافة. الموظف الاجتماعي يقدم الطلب فقط، بينما المحكمة الإدارية المستقلة (Förvaltningsrätten) هي التي تتخذ القرار بناءً على الأدلة والقانون.',
      factText: 'حقيقة: القرار النهائي بيد القضاء والمحكمة الإدارية وليس بيد الموظف الاجتماعي.'
    },
    {
      id: 3,
      question: 'هل يُعتبر الدين أو المعتقد الإسلامي سبباً قانونياً لسحب الأطفال بالسويد؟',
      correctIsFact: false,
      mythText: 'خرافة مطلقة. الدين والمعتقد محمي بحكم الدستور السويدي واتفاقية الأمم المتحدة، ولا يُشكل أي سبب لسحب الأطفال.',
      factText: 'حقيقة: الأسباب تنحصر فقط في العنف الجسدي/النفسي، الإهمال الشديد، أو السلوك الخطير كالإنحراف والمخدرات.'
    },
    {
      id: 4,
      question: 'هل تحرم الدولة السويدية الوالدين من محامٍ أو مترجم أثناء جلسات المحكمة؟',
      correctIsFact: false,
      mythText: 'خرافة. يحق لكل والد محامٍ مجاني تدفع الدولة تكاليفه ومترجم فوري بلغته الأم في كل الجلسات والتحقيقات.',
      factText: 'حقيقة: المحامي والمترجم الفوري حق مكفول ومستقل مجاناً لجميع الأسر.'
    },
    {
      id: 5,
      question: 'هل قرار الرعاية القسرية (LVU) قرار أبدي ودائم لا يمكن التراجع عنه؟',
      correctIsFact: false,
      mythText: 'خرافة. الرعاية مؤقتة وتخضع لمراجعة دورية إلزامية كل 6 أشهر من السوسيال بهدف إعادة الطفل فور تحسن الوضع.',
      factText: 'حقيقة: الهدف الأسمى هو إعادة الشمل فور زوال الخطر.'
    },
    {
      id: 6,
      question: 'هل التعاون مع السوسيال وإظهار الرغبة في التغيير يقوي الموقف القانوني للأهل؟',
      correctIsFact: true,
      mythText: 'خطأ. التعاون إيجابي جداً.',
      factText: 'حقيقة مؤكدة! إظهار البصيرة الوالدية والتعاون في برامج الدعم يسرع من إغلاق الملف وإعادة الطفل.'
    }
  ];

  const handleSpeechSlide = (textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('عذراً، متصفحك لا يدعم القراءة الصوتية.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
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

  const currentSlideObj = slidesData.find(s => s.id === activeSlide) || slidesData[0];

  return (
    <div className="space-y-8 pb-16 dir-rtl">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#123B4A] via-[#185C7A] to-[#2F8F83] text-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2 bg-[#F2C86B] text-[#123B4A] font-black text-xs px-3.5 py-1 rounded-full shadow-2xs">
            <ShieldCheck className="w-4 h-4" />
            <span>الدليل الموثق والمبسط للأسر والعائلات العربية في السويد</span>
          </div>

          <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
            مستوحى من الدليل الرسمي: السوسيال والأطفال في السويد
          </span>
        </div>

        <div className="space-y-3 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            السوسيال والأطفال في السويد: حقائق تهمك
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed font-medium">
            عرض تفاعلي مباشر لـ 15 حقيقة وقاعدة قانونية تفكك الخرافات والشائعات، توضح حقوق الوالدين، وتبسط إجراءات المحكمة والرعاية الفورية والأهداف النهائية للمّ الشمل.
          </p>
        </div>

        {/* Font Control & Action Bar */}
        <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 relative z-10 no-print">
          {/* Font Selector for Clear Large Typography */}
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20">
            <span className="text-xs font-bold text-[#F2C86B] flex items-center gap-1 px-2">
              <Type className="w-4 h-4" />
              <span>حجم الخط:</span>
            </span>
            <button
              onClick={() => setFontSizeClass('text-lg')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                fontSizeClass === 'text-lg' ? 'bg-white text-[#123B4A] shadow-xs' : 'text-white/80'
              }`}
            >
              كبير (18px)
            </button>
            <button
              onClick={() => setFontSizeClass('text-xl')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                fontSizeClass === 'text-xl' ? 'bg-[#F2C86B] text-[#123B4A] shadow-xs' : 'text-white/80'
              }`}
            >
              واضح جداً (20px)
            </button>
            <button
              onClick={() => setFontSizeClass('text-2xl')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                fontSizeClass === 'text-2xl' ? 'bg-[#2F8F83] text-white shadow-xs' : 'text-white/80'
              }`}
            >
              عملاق (24px)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-white/20"
            >
              <Printer className="w-4 h-4 text-[#F2C86B]" />
              <span>طباعة / PDF</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-white/20"
            >
              <Share2 className="w-4 h-4 text-[#F2C86B]" />
              <span>{copiedLink ? 'تم النسخ!' : 'مشاركة الدليل'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Carousel Visual Presentation */}
      <div className="space-y-4">
        {/* Slide Counter Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#185C7A]/20 shadow-2xs">
          <div className="flex items-center gap-2 text-[#185C7A] font-extrabold text-sm sm:text-base">
            <BookOpen className="w-5 h-5 text-[#2F8F83]" />
            <span>الشريحة {currentSlideObj.id} من 15: {currentSlideObj.badge}</span>
          </div>

          {/* Quick Audio Read for this slide */}
          <button
            onClick={() => handleSpeechSlide(`${currentSlideObj.title}. ${currentSlideObj.subtitle}. ${currentSlideObj.content || ''} ${currentSlideObj.fact || ''}`)}
            className="flex items-center gap-1.5 bg-[#185C7A] hover:bg-[#123B4A] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <Headphones className="w-4 h-4 text-[#F2C86B]" />
            <span>{isPlaying ? 'إيقاف القراءة' : 'استمع للشريحة'}</span>
          </button>
        </div>

        {/* Featured Interactive Slide Box */}
        <div className={`bg-gradient-to-br ${currentSlideObj.color} text-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-6 relative overflow-hidden transition-all duration-300`}>
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <span className="bg-white/20 text-[#F2C86B] font-black text-xs px-3 py-1 rounded-full border border-white/20">
              {currentSlideObj.badge}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSlide(prev => Math.max(1, prev - 1))}
                disabled={activeSlide === 1}
                className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-xl cursor-pointer"
                title="الشريحة السابقة"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <span className="text-xs font-bold text-white/80">{activeSlide} / 15</span>
              <button
                onClick={() => setActiveSlide(prev => Math.min(15, prev + 1))}
                disabled={activeSlide === 15}
                className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-xl cursor-pointer"
                title="الشريحة التالية"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-3xl font-black leading-tight text-white">{currentSlideObj.title}</h2>
            <p className="text-xs sm:text-sm text-white/80 font-medium">{currentSlideObj.subtitle}</p>
          </div>

          {/* Myth vs Fact Specific Display if available */}
          {currentSlideObj.myth && (
            <div className="space-y-3 pt-2">
              <div className="bg-rose-950/70 border border-rose-500/40 p-4 rounded-2xl flex items-start gap-3">
                <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                <p className={`font-bold text-rose-200 leading-relaxed ${fontSizeClass}`}>{currentSlideObj.myth}</p>
              </div>

              <div className="bg-emerald-950/70 border border-emerald-500/40 p-4 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <p className={`font-black text-emerald-200 leading-relaxed ${fontSizeClass}`}>{currentSlideObj.fact}</p>
              </div>
            </div>
          )}

          {/* General Slide Text Content */}
          {currentSlideObj.content && (
            <p className={`text-white/95 leading-relaxed font-normal ${fontSizeClass}`}>
              {currentSlideObj.content}
            </p>
          )}

          {/* Points List */}
          {currentSlideObj.points && (
            <div className="space-y-2.5 pt-2">
              {currentSlideObj.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl border border-white/15">
                  <span className="w-6 h-6 rounded-full bg-[#F2C86B] text-[#123B4A] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className={`text-white font-medium leading-relaxed ${fontSizeClass}`}>{pt}</p>
                </div>
              ))}
            </div>
          )}

          {/* Highlight Note */}
          {currentSlideObj.highlight && (
            <div className="bg-[#F2C86B] text-[#123B4A] p-4 rounded-2xl font-black text-sm sm:text-base shadow-md flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#123B4A] shrink-0" />
              <span>{currentSlideObj.highlight}</span>
            </div>
          )}
        </div>

        {/* Slide Thumbnail Grid Selector */}
        <div className="bg-white p-4 rounded-2xl border border-[#185C7A]/20 space-y-3">
          <span className="text-xs font-bold text-[#185C7A] block">انقر للانتقال المباشر لأي شريحة (1 - 15):</span>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
            {slidesData.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSlide(s.id)}
                className={`p-2 rounded-xl text-xs font-extrabold transition cursor-pointer border text-center ${
                  activeSlide === s.id
                    ? 'bg-[#185C7A] text-white border-[#185C7A] shadow-xs scale-105'
                    : 'bg-[#F7F5EF] text-[#123B4A] border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className="block text-[10px] text-gray-400"># {s.id}</span>
                <span className="truncate block font-black">{s.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Widget for current active slide */}
        <HelpfulFeedbackWidget
          itemId={`social-slide-${currentSlideObj.id}`}
          itemTitle={`شريحة ${currentSlideObj.id}: ${currentSlideObj.title}`}
          lang={lang}
        />
      </div>

      {/* SECTION: INTERACTIVE MYTH VS REALITY QUIZ (خرافة أم حقيقة) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#185C7A]/10 pb-4">
          <div className="flex items-center gap-3 text-[#185C7A]">
            <Award className="w-7 h-7 text-[#F2C86B]" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black">اختبار سريع: خرافة أم حقيقة حول السوسيال السويدي؟</h2>
              <p className="text-xs text-[#123B4A]/70 mt-1">اختبر معلوماتك لتمييز الشائعات المغلوطة عن الحقائق القانونية المعتمدة</p>
            </div>
          </div>

          {quizSubmitted && (
            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="flex items-center gap-1.5 bg-[#185C7A] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#F2C86B]" />
              <span>إعادة الاختبار</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizItems.map((item) => {
            const userChoice = quizAnswers[item.id]; // true for Fact, false for Myth
            const hasAnswered = userChoice !== undefined;
            const isCorrect = userChoice === item.correctIsFact;

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition space-y-3 ${
                  hasAnswered
                    ? isCorrect
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-rose-50/70 border-rose-300'
                    : 'bg-[#F7F5EF] border-[#185C7A]/15'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`font-black text-[#123B4A] leading-relaxed ${fontSizeClass}`}>{item.question}</h3>
                  <span className="w-6 h-6 rounded-full bg-[#185C7A] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {item.id}
                  </span>
                </div>

                {/* Choice Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setQuizAnswers(prev => ({ ...prev, [item.id]: false }))}
                    className={`p-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                      userChoice === false
                        ? 'bg-rose-800 text-white border-rose-900 shadow-xs'
                        : 'bg-white text-rose-800 border-rose-200 hover:bg-rose-50'
                    }`}
                  >
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>خرافة مغلوطة</span>
                  </button>

                  <button
                    onClick={() => setQuizAnswers(prev => ({ ...prev, [item.id]: true }))}
                    className={`p-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                      userChoice === true
                        ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                        : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>حقيقة موثقة</span>
                  </button>
                </div>

                {/* Explanation Card */}
                {hasAnswered && (
                  <div className={`p-3 rounded-xl text-xs font-medium space-y-1 border ${isCorrect ? 'bg-emerald-100 text-emerald-950 border-emerald-300' : 'bg-rose-100 text-rose-950 border-rose-300'}`}>
                    <div className="font-bold flex items-center gap-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>إجابة صحيحة!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>إجابة غير دقيقة:</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed font-semibold">
                      {item.correctIsFact ? item.factText : item.mythText}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION: EMERGENCY & COURT TIMELINE VISUALIZER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6">
        <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
          <Clock className="w-7 h-7 text-[#F2C86B]" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black">الخط الزمني الإجرائي: من البلاغ إلى المحكمة والإعادة</h2>
            <p className="text-xs text-[#123B4A]/70 mt-1">الخطوات المنظمة والمهل القانونية المحددة في النظام التشريعي السويدي</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#185C7A]/5 border border-[#185C7A]/20 p-4 rounded-2xl space-y-2 relative">
            <span className="w-7 h-7 rounded-xl bg-[#185C7A] text-white flex items-center justify-center font-black text-xs">1</span>
            <h3 className="font-extrabold text-[#185C7A] text-sm">بلاغ القلق والتقييم</h3>
            <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">
              تلقي بلاغ من المدرسة أو المشفى أو الجار ← تقييم أولي خلال 14 يوماً لفتح تحقيق اجتماعي أم حفظ الملف.
            </p>
          </div>

          <div className="bg-[#2F8F83]/5 border border-[#2F8F83]/20 p-4 rounded-2xl space-y-2 relative">
            <span className="w-7 h-7 rounded-xl bg-[#2F8F83] text-white flex items-center justify-center font-black text-xs">2</span>
            <h3 className="font-extrabold text-[#2F8F83] text-sm">التحقيق والدعم الطوعي</h3>
            <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">
              مقابلات مع الأهل والطفل ← عرض خدمات مساعدة طوعية (SoL) كالعائلة المساعدة ودعم الأبوين.
            </p>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl space-y-2 relative">
            <span className="w-7 h-7 rounded-xl bg-rose-800 text-white flex items-center justify-center font-black text-xs">3</span>
            <h3 className="font-extrabold text-rose-900 text-sm">المحكمة الإدارية (LVU)</h3>
            <p className="text-xs text-rose-950 leading-relaxed font-medium">
              عند الخطر الداهم ورفض المساعدة ← رفع القضية للمحكمة مع محامٍ مجاني ومترجم للبت القضائي.
            </p>
          </div>

          <div className="bg-[#F2C86B]/15 border border-[#F2C86B]/40 p-4 rounded-2xl space-y-2 relative">
            <span className="w-7 h-7 rounded-xl bg-[#123B4A] text-[#F2C86B] flex items-center justify-center font-black text-xs">4</span>
            <h3 className="font-extrabold text-[#123B4A] text-sm">مراجعة كل 6 أشهر ولمّ الشمل</h3>
            <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">
              مراجعة دورية إلزامية كل 6 أشهر لإنهائها فور زوال أسباب الخطر وإعادة الطفل لأسرته.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: WHERE TO GET HELP & PARENT RIGHTS */}
      <div className="bg-gradient-to-r from-[#185C7A]/10 to-[#2F8F83]/10 border border-[#185C7A]/20 p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex items-center gap-3 text-[#185C7A]">
          <PhoneCall className="w-7 h-7 text-[#F2C86B]" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black">أين تجد المساعدة القانونية والاستشارية الفورية؟</h2>
            <p className="text-xs text-[#123B4A]/80">مؤسسات وهيئات رسمية ومجانية متاحة لكافة السكان في السويد</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#185C7A]/20 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-[#185C7A] font-bold text-sm">
              <Scale className="w-5 h-5 text-[#2F8F83]" />
              <span>محاميك في LVU</span>
            </div>
            <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">
              تغطي الدولة السويدية تكاليف المحامي بالكامل (Offentligt biträde). يحق لك اختيار محامٍ متخصص ترغبه بنفسك.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#185C7A]/20 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-[#185C7A] font-bold text-sm">
              <Building2 className="w-5 h-5 text-[#2F8F83]" />
              <span>مفتشية IVO</span>
            </div>
            <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">
              مفتشية الصحة والرعاية (Inspektionen för vård och omsorg): الجهة الحكومية المسؤولة عن التحقيق في الشكاوى ضد أخطاء السوسيال.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#185C7A]/20 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-[#185C7A] font-bold text-sm">
              <Heart className="w-5 h-5 text-[#2F8F83]" />
              <span>منظمة BRIS</span>
            </div>
            <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">
              منظمة حقوق الطفل بالسويد تقدم خطوط استشارة للأطفال وللأباء عبر الرقم المجاني 116 111.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#185C7A]/20 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-[#185C7A] font-bold text-sm">
              <Users className="w-5 h-5 text-[#2F8F83]" />
              <span>مؤسسة MFoF</span>
            </div>
            <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">
              الهيئة الحكومية لدعم قانون الأسرة والأبوية، تقدم توجيهات واستشارات تربوية مجانية للأبوين.
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#185C7A]/20">
          <div className="space-y-1 text-center sm:text-start">
            <h3 className="font-black text-[#185C7A] text-sm sm:text-base">هل لديك استفسار محدد أو ترغب في استشارة ذكية؟</h3>
            <p className="text-xs text-[#123B4A]/80">تواصل مع المساعد الذكي الموثق باللائحة الحكومية للحصول على إجابات فورية.</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onNavigateToAssistant && (
              <button
                onClick={onNavigateToAssistant}
                className="bg-[#185C7A] hover:bg-[#123B4A] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#F2C86B]" />
                <span>اسأل المساعد الذكي</span>
              </button>
            )}

            {onNavigateToReport && (
              <button
                onClick={onNavigateToReport}
                className="bg-white text-[#185C7A] hover:bg-gray-100 border border-[#185C7A]/30 px-5 py-2.5 rounded-xl text-xs font-black shadow-2xs cursor-pointer transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#185C7A]" />
                <span>تقرير حماية الطفل الشامل</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Global Guide Feedback Widget */}
      <HelpfulFeedbackWidget
        itemId="guide-social-facts-overall"
        itemTitle="دليل حقائق السوسيال والأطفال الكامل (15 شريحة)"
        lang={lang}
      />
    </div>
  );
};
