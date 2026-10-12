import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { HelpfulFeedbackWidget } from '../components/HelpfulFeedbackWidget';
import {
  ShieldCheck,
  Heart,
  BookOpen,
  GraduationCap,
  Users,
  Scale,
  Building2,
  Sparkles,
  Printer,
  Share2,
  Headphones,
  Play,
  Pause,
  Square,
  Type,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Clock,
  Zap,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  PhoneCall,
  Compass,
  Award,
  Check,
  Info,
  Shield,
  FileText,
  AlertCircle
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigateToAssistant?: () => void;
  onNavigateToReport?: () => void;
  onNavigateToGuide?: () => void;
}

export const FamiljebronPage: React.FC<Props> = ({
  lang,
  onNavigateToAssistant,
  onNavigateToReport,
  onNavigateToGuide
}) => {
  const [activeTab, setActiveTab] = useState<
    'vision' | 'four-pillars' | 'topics-matrix' | 'red-lines' | 'quiz' | 'pilot-program'
  >('vision');

  // Large Clear Font Switcher (خط واضح كبير)
  const [fontSizeClass, setFontSizeClass] = useState<'text-base' | 'text-lg' | 'text-xl'>('text-lg');

  // Text-To-Speech States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Copy share link confirmation
  const [copiedLink, setCopiedLink] = useState(false);

  // Quiz "Från oro till dialog" States
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Topic Accordion Expansion
  const [expandedTopicId, setExpandedTopicId] = useState<number | null>(1);

  // Cleanup Speech Synthesis
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
      برنامج جسر الأسرة السويدي. Familjebron Sverige.
      برنامج عربي سويدي للوقاية الأسرية، دعم الوالدين، وبناء الثقة مع المدرسة والخدمات الاجتماعية.
      يهدف المشروع إلى تحويل الخوف والشائعات إلى حوار موثوق وشراكة حقيقية بين العائلات العربية والمؤسسات السويدية.
    `;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'sv-SE';
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

  // Quiz Questions from PDF: "من الخوف إلى الحوار" (Från oro till dialog)
  const quizQuestions = [
    {
      id: 1,
      question: 'كيف تنظر عائلتك إلى دور الخدمات الاجتماعية (السوسيال) عند مواجهة صعوبة تربوية أو أسرية؟',
      options: [
        { label: 'خوف شديد وتجنب تام للتواصل بسبب الشائعات والمخاوف.', points: 1 },
        { label: 'تردد وارتباك مع الرغبة في الفهم ولكن دون معرفة آليات الدعم الطوعي.', points: 2 },
        { label: 'وعي وثقة بأن السوسيال يقدم خدمات وقائية طوعية (SoL) لدعم الأسرة قبل حدوث أزمة.', points: 3 }
      ],
      explanation: 'ينص قانون الخدمات الاجتماعية السويدي الجديد (SoL 2025:400) على أن الدعم الوقائي الطوعي وسهل الوصول هو الأصل لمساعدة الأسر وتمكين الوالدين.'
    },
    {
      id: 2,
      question: 'عندما يواجه طفلك صعوبة في المدرسة أو غياباً متكرراً، كيف تبدأ التواصل مع المدرسة؟',
      options: [
        { label: 'الانتظار والقلق دون مبادرة، خوفاً من رفع بلاغ قلق تلقائي.', points: 1 },
        { label: 'التواصل فقط عند استدعاء المدرسة بشكل رسمي.', points: 2 },
        { label: 'مبادرة سريعة وبناء حوار مباشر مع معلم الفصل والارتقاء بشراكة موثوقة مع المدرسة.', points: 3 }
      ],
      explanation: 'التواصل المبكر والمباشر مع المدرسة يحمي الطفل من تراكم صعوبات التعلم ويمنع تحول الغياب إلى مشكلة قانونية (Skolplikt).'
    },
    {
      id: 3,
      question: 'كيف تدير الحوار والتوجيه مع أبنائك المراهقين المتأثرين بالثقافة السويدية داخل وخارج المنزل؟',
      options: [
        { label: 'المنع والشدة المطلقة ورفض أي حوار حول الاختلافات الثقافية.', points: 1 },
        { label: 'الارتباك وترك الأمور دون توجيه واضح، مما يسبب تشتتاً للمراهق.', points: 2 },
        { label: 'حوار مفتوح يعزز الهوية الثنائية (Bikulturell) باعتزاز ويكفل الاحترام المتبادل بين الأجيال.', points: 3 }
      ],
      explanation: 'بناء الهوية المزدوجة باعتزاز يمنح المراهق الأمان النفسي ويمنع الصراع بين قيم البيت والمجتمع.'
    },
    {
      id: 4,
      question: 'في حال حدوث خلافات أسرية أو زوجية، كيف تحمي أبناءك من الآثار النفسية؟',
      options: [
        { label: 'إقحام الأطفال في منتصف النزاع واستخدامهم كطرف في الخلاف.', points: 1 },
        { label: 'محاولة التكتم التام مع وجود توتر مشحون يلاحظه الأطفال باستمرار.', points: 2 },
        { label: 'عزل الأطفال تماماً عن النزاع وطلب استشارة أسرية مبكرة (Familjerådgivning) قبل تفاقم الأزمة.', points: 3 }
      ],
      explanation: 'إبعاد الأطفال عن النزاعات الزوجية واستشارة المختصين مبكراً يحمي السلامة النفسية للأبناء ويمنع تدخلات السوسيال الإجبارية.'
    },
    {
      id: 5,
      question: 'كيف تتعامل مع استخدام الأبناء للشاشات ووسائل التواصل الاجتماعي في المنزل؟',
      options: [
        { label: 'سحب الأجهزة بصدام مفاجئ وصراخ متكرر.', points: 1 },
        { label: 'ترك الشاشات مفتوحة بلا حدود أو رقابة بسبب الانشغال.', points: 2 },
        { label: 'اتفاقية أسرية واضحة ومحددة مسبقاً لأوقات الشاشات مع الحوار حول السلامة الرقمية.', points: 3 }
      ],
      explanation: 'الاتفاقيات الأسرية المسبقة تمنح الطفل التوقع والمسؤولية وتمنع نوبات الغضب والمواجهات المفاجئة.'
    },
    {
      id: 6,
      question: 'ما مدى معرفتك بمصادر الإحالة والدعم الرسمي والاهلي المتاحة في بلد يتك؟',
      options: [
        { label: 'لا أعرف أي جهة ولا أثق في الخدمات المتاحة.', points: 1 },
        { label: 'أعرف بعض الأسماء العامة فقط ولكن لا أعرف طريقة التواصل المباشرة.', points: 2 },
        { label: 'أعرف مراكز الأسرة (Familjecentralen)، خطوط الاستشارة المباشرة، ودورات ABC المجانية.', points: 3 }
      ],
      explanation: 'المعرفة الدقيقة بجهات الدعم المباشرة تحول المعرفة النظرية إلى أفعال وقائية آمنة تساند الأسرة.'
    }
  ];

  const handleSelectAnswer = (qId: number, points: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: points }));
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(quizAnswers).forEach((val) => {
      if (typeof val === 'number') {
        score += val;
      }
    });
    return score;
  };

  // Topics Matrix from PDF
  const topicsMatrix = [
    {
      id: 1,
      title: 'السوسيال والدعم المبكر (Tidigt stöd)',
      subtitle: 'ماذا يفعل السوسيال فعلاً وكيف نطلب المساعدة قبل الأزمة؟',
      icon: Building2,
      color: 'border-[#185C7A] text-[#185C7A] bg-[#185C7A]/5',
      content: 'شرح مفصل للدعم الوقائي الطوعي بموجب قانون الخدمات الاجتماعية الجديد (SoL). يبين البرنامج كيف يبدأ الحوار مع أخصائي السوسيال بثقة، وما هي المساعدات المنزلية (Hemmaplan) وشخص التواصل (Kontaktperson) التي تقدم للأسر مجاناً دون الحاجة لتحقيقات معقدة.'
    },
    {
      id: 2,
      title: 'التعاون مع المدرسة (Skolsamverkan)',
      subtitle: 'حقوق الطفل، الغياب المبرر، والتعامل مع صعوبات التعلم والتنمر',
      icon: GraduationCap,
      color: 'border-[#2F8F83] text-[#2F8F83] bg-[#2F8F83]/5',
      content: 'توضيح دور المدرسة السويدية، كيفية التحضير لاجتماعات التطوير (Utvecklingssamtal)، فهم قوانين إلزامية التعليم (Skolplikt)، وطرق التعامل مع الغياب الممتد أو التنمر بالتعاون مع فريق الصحة المدرسية (Elevhälsan).'
    },
    {
      id: 3,
      title: 'المراهقة بين ثقافتين (Bikulturell mognad)',
      subtitle: 'الحدود، الحوار، وبناء الاحترام المتبادل بين الأجيال',
      icon: Users,
      color: 'border-[#123B4A] text-[#123B4A] bg-[#123B4A]/5',
      content: 'أدوات تربوية مساندة للأبوين لمرافقة الأبناء المراهقين الموزعين بين ثقافة البيت العربية والقيم السويدية، تحويل الصراع الثقافي إلى اعتزاز بالهوية المزدوجة، ووضع حدود أسرية محترمة دون صدام.'
    },
    {
      id: 4,
      title: 'الخلافات الزوجية والأسرية (Familjefrid)',
      subtitle: 'إدارة الانفصال أو النزاعات دون وضع الطفل في المنتصف',
      icon: Heart,
      color: 'border-rose-700 text-rose-800 bg-rose-50',
      content: 'إرشادات عملية لحماية الأبناء من آثار النزاعات الأبوية، الاستفادة من محادثات التعاون الرسمي بالبلدية (Samarbetssamtal)، وتجنب السلوكيات التي قد تثير قلق المدرسة أو السوسيال.'
    },
    {
      id: 5,
      title: 'الحياة الرقمية والسلامة (Digital trygghet)',
      subtitle: 'الشاشات، الخصوصية، والسلامة على الإنترنت',
      icon: ShieldCheck,
      color: 'border-[#F2C86B] text-[#123B4A] bg-[#F2C86B]/15',
      content: 'قواعد أسرية متوازنة لضبط استخدام الشاشات، حماية الأطفال من المخاطر الرقمية والتنمر الإلكتروني (Nätmobbning)، والاتفاق على بدائل تفاعلية صحية داخل الأسرة.'
    },
    {
      id: 6,
      title: 'الإحالة المهنية والتوجيه (Signposting)',
      subtitle: 'متى وكيف نطلب مستشاراً أسرياً أو مختصاً نفسياً؟',
      icon: Compass,
      color: 'border-[#185C7A] text-[#185C7A] bg-[#185C7A]/5',
      content: 'خريطة طريق واضحة توجه الأسرة إلى الجهة المناسبة بالضبط (مراكز الرعاية BUP، المستشار الأسري، الرعاية الصحية Vårdcentralen، أو الجمعيات الأهلية الموثوقة) في الوقت المناسب.'
    }
  ];

  return (
    <div className="space-y-8 pb-16 dir-rtl">
      {/* Disclaimer Banner */}
      <DisclaimerBanner
        type="guide"
        title="محتوى توعوي موثوق - برنامج جسر الأسرة السويدي (Familjebron Sverige)"
        description="هذا القسم يمثل إطار عمل برنامج 'جسر الأسرة' (مؤسس المشروع: رائد شهاب - Raed Shihab) المخصص لبناء الثقة والوقاية الأسرية بين العائلات العربية والمؤسسات السويدية. المعلومات لأغراض التوعية والإرشاد الوالدي ولا تُغني عن الاستشارات القانونية أو السريرية المتخصصة."
      />

      {/* Main Page Header Banner */}
      <div className="bg-gradient-to-br from-[#123B4A] via-[#185C7A] to-[#2F8F83] text-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-5 relative overflow-hidden">
        {/* Background Decorative Graphic */}
        <div className="absolute top-0 end-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
          <Building2 className="w-96 h-96" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2 bg-[#F2C86B] text-[#123B4A] font-black text-xs px-3.5 py-1 rounded-full shadow-2xs">
            <Sparkles className="w-4 h-4" />
            <span>Familjebron Sverige | جسر الأسرة - خريف 2026/2027</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-white/15 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs border border-white/20">
              برنامج عربي-سويدي للوقاية الأسرية ودعم الوالدين
            </span>
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
            جسر الأسرة (Familjebron Sverige): من الخوف إلى الحوار
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed font-medium">
            مبادرة وممنهجة تتضمن 4 أعمدة رئيسية لبناء الثقة والشراكة الحقيقية بين العائلات العربية والمؤسسات السويدية (المدرسة، السوسيال، والمجتمع)، وتوفير الإرشاد الوقائي الموثوق بخَط واضح كبير.
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
                <span>استمع لملخص البرنامج</span>
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
              <span>{copiedLink ? 'تم نسخ الرابط!' : 'مشاركة البرنامج'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#185C7A]/20 pb-3 overflow-x-auto no-scrollbar no-print">
        <button
          onClick={() => setActiveTab('vision')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'vision'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#F2C86B]" />
          <span>الرؤية والفجوة المجتمعية</span>
        </button>

        <button
          onClick={() => setActiveTab('four-pillars')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'four-pillars'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#F2C86B]" />
          <span>الأعمدة الأربعة للجسر</span>
        </button>

        <button
          onClick={() => setActiveTab('topics-matrix')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'topics-matrix'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <FileText className="w-4 h-4 text-[#F2C86B]" />
          <span>مواضيع الحوار الموثوق (6 محاور)</span>
        </button>

        <button
          onClick={() => setActiveTab('red-lines')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'red-lines'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <Shield className="w-4 h-4 text-[#F2C86B]" />
          <span>الحماية المهنية والخطوط الحمراء</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-[#2F8F83] text-white shadow-md'
              : 'bg-white text-[#2F8F83] hover:bg-gray-100 border border-[#2F8F83]/30'
          }`}
        >
          <Award className="w-4 h-4 text-[#F2C86B]" />
          <span>اختبار "من الخوف إلى الحوار"</span>
        </button>

        <button
          onClick={() => setActiveTab('pilot-program')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'pilot-program'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <Clock className="w-4 h-4 text-[#F2C86B]" />
          <span>النموذج التجريبي (12 أسبوعاً)</span>
        </button>
      </div>

      {/* TAB 1: VISION & SOCIAL GAP */}
      {activeTab === 'vision' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <BookOpen className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">الخلاصة التنفيذية والفجوة المجتمعية</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">مؤسس المشروع: رائد شهاب (Raed Shihab) - ستوكهولم، السويد</p>
              </div>
            </div>

            <p className="leading-relaxed font-normal">
              يهدف برنامج <strong className="text-[#185C7A]">جسور الأسرة (Familjebron Sverige)</strong> إلى تحويل الخوف الشديد والشائعات المنتشرة حول حماية الطفل والسوسيال إلى <strong className="text-[#2F8F83]">حوار موثوق وشراكة حقيقية</strong> بين العائلات العربية والمؤسسات السويدية (المدرسة، خدمات الرعاية الاجتماعية، ومراكز الأسرة).
            </p>

            {/* Gap Analysis Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="p-5 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
                <div className="text-base font-black text-rose-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-rose-600" />
                  <span>تحديات العائلات العربية</span>
                </div>
                <ul className="text-xs sm:text-sm text-rose-950/80 space-y-1.5 font-medium list-disc list-inside">
                  <li>حاجز اللغة وأوقات البرامج غير المرنة.</li>
                  <li>الخوف والشائعات حول حماية الطفل (LVU).</li>
                  <li>غياب الثقة في القنوات الرسمية السويدية.</li>
                </ul>
              </div>

              <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <div className="text-base font-black text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>الفجوة المجتمعية القائمة</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950/80 font-medium leading-relaxed">
                  المعلومات الرسمية متوفرة بكثرة، لكنها لا تصل بفعالية للفئة المستهدفة. المجتمع بحاجة ماسة إلى <strong>"وسيط موثوق"</strong> لترجمة المعرفة القانونية إلى أفعال وقائية ملموسة.
                </p>
              </div>

              <div className="p-5 bg-[#2F8F83]/10 rounded-2xl border border-[#2F8F83]/30 space-y-2">
                <div className="text-base font-black text-[#185C7A] flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#2F8F83]" />
                  <span>المؤسسات السويدية</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/80 font-medium leading-relaxed">
                  قانون الخدمات الاجتماعية الجديد (July 2025) يفرض على السوسيال تقديم عمل وقائي سهل الوصول وقائم على الثقة لتشجيع طلب الدعم المبكر.
                </p>
              </div>
            </div>

            {/* Key Drivers Banner */}
            <div className="bg-gradient-to-r from-[#185C7A]/10 to-[#2F8F83]/10 p-6 rounded-2xl border border-[#185C7A]/30 space-y-3">
              <h3 className="font-extrabold text-[#185C7A] text-base flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#F2C86B]" />
                <span>لماذا الآن؟ الزخم القانوني والديموغرافي 2025/2026:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#123B4A]/90 font-medium">
                <div className="p-3.5 bg-white rounded-xl border border-[#185C7A]/15 space-y-1">
                  <strong className="text-[#185C7A]">الحاجة الديموغرافية واللغوية:</strong> أكثر من 20% من سكان السويد (2.2 مليون) ولدوا خارج البلاد. برامج الدعم تتطلب مواد حساسة ثقافياً ومتاحة بلغات متعددة لضمان المساواة.
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#185C7A]/15 space-y-1">
                  <strong className="text-[#2F8F83]">دعم الدولة (MFoF 2026):</strong> خصصت الدولة 195 مليون كرونة لزيادة الوصول المتساوي لدعم الوالدين، و 180 مليون كرونة للبلديات للوقاية الأسرية.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THE 4 PILLARS OF THE BRIDGE */}
      {activeTab === 'four-pillars' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Building2 className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">بناء "جسر الأسرة" عبر أربعة أعمدة متينة</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">النموذج الهيكلي المتكامل للوقاية الأسرية وبناء الثقة</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1 */}
              <div className="bg-[#F7F5EF] p-6 rounded-2xl border-s-4 border-[#185C7A] border-t border-e border-b border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-[#185C7A] text-lg">
                    <Scale className="w-6 h-6 text-[#185C7A]" />
                    <h3>العمود الأول: المجتمع والقانون (Samhälle & lag)</h3>
                  </div>
                  <span className="text-xs bg-[#185C7A] text-white px-2.5 py-0.5 rounded-full font-bold">1</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  شرح حقوق الطفل الأساسية، آليات الحماية القانونية، وتوجيه الأسرة نحو المراجع والقوانين السويدية الموثوقة للتخلص من المخاوف والشائعات.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#F7F5EF] p-6 rounded-2xl border-s-4 border-[#2F8F83] border-t border-e border-b border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-[#2F8F83] text-lg">
                    <Heart className="w-6 h-6 text-[#2F8F83]" />
                    <h3>العمود الثاني: الأسرة (Familjen)</h3>
                  </div>
                  <span className="text-xs bg-[#2F8F83] text-white px-2.5 py-0.5 rounded-full font-bold">2</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  أساليب التربية الحديثة، تعزيز الحوار بين الأجيال، وحماية العلاقة الزوجية وإدارة الانفصال قبل أن تتحول النزاعات إلى أزمات تؤثر على الأبناء.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#F7F5EF] p-6 rounded-2xl border-s-4 border-[#F2C86B] border-t border-e border-b border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-[#123B4A] text-lg">
                    <Building2 className="w-6 h-6 text-[#185C7A]" />
                    <h3>العمود الثالث: الدعم المبكر (Tidigt stöd)</h3>
                  </div>
                  <span className="text-xs bg-[#F2C86B] text-[#123B4A] px-2.5 py-0.5 rounded-full font-bold">3</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  تبيان طبيعة الدعم الوقائي الطوعي للخدمات الاجتماعية (SoL)، وشرح كيف يبدأ الحوار المباشر بثقة بعيداً عن الخوف أو التجنب المتبادل.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="bg-[#F7F5EF] p-6 rounded-2xl border-s-4 border-[#123B4A] border-t border-e border-b border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-[#123B4A] text-lg">
                    <GraduationCap className="w-6 h-6 text-[#123B4A]" />
                    <h3>العمود الرابع: المدرسة (Skolan)</h3>
                  </div>
                  <span className="text-xs bg-[#123B4A] text-white px-2.5 py-0.5 rounded-full font-bold">4</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  فهم دور المدرسة، أهمية المشاركة في اجتماعات الوالدين، وكيفية دعم الطفل عند الغياب أو مواجهة صعوبات التعلم والتنمر بشكل مبكر.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CORE TOPICS MATRIX */}
      {activeTab === 'topics-matrix' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <FileText className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">منظومة المحتوى: مواضيع الحوار الموثوق الستة</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">إطار متكامل يغطي كافة الجوانب التربوية والقانونية للأسرة</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {topicsMatrix.map((topic) => {
                const IconComponent = topic.icon;
                const isExpanded = expandedTopicId === topic.id;
                return (
                  <div
                    key={topic.id}
                    className={`p-5 rounded-2xl border transition shadow-2xs ${topic.color}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white shadow-xs shrink-0">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-black text-base sm:text-lg">{topic.title}</h3>
                          <p className="text-xs opacity-90 mt-0.5">{topic.subtitle}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                        className="p-1 hover:bg-black/10 rounded-lg cursor-pointer shrink-0"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-black/10 text-xs sm:text-sm leading-relaxed font-medium opacity-95">
                        {topic.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RED LINES & ETHICAL BOUNDARIES */}
      {activeTab === 'red-lines' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Shield className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">الحماية المهنية والأخلاقية (الخطوط الحمراء)</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">تحديد نطاق العمل بوضوح وشفافية لضمان الأمان والامتثال للقانون السويدي</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What We Offer */}
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <div className="text-lg font-black text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span>نطاق عمل برنامج جسر الأسرة:</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>التثقيف الوقائي ودعم الوالدين بأساليب تربوية حديثة.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>الإحالة الدقيقة للجهات الرسمية والمختصين (Signposting).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>توفير معلومات موثوقة ومترجمة بدقة وفق التشريعات السويدية.</span>
                  </li>
                </ul>
              </div>

              {/* Red Lines */}
              <div className="p-6 bg-rose-50 rounded-2xl border border-rose-200 space-y-3">
                <div className="text-lg font-black text-rose-900 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-rose-600" />
                  <span>خطوط حمراء نتجنبها تماماً:</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-rose-950 font-medium">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <span>لا نقدم علاجاً نفسياً أو استشارات سريرية طبية.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <span>لا نمثل العائلات قانونياً أو في المحاكم في قضايا (LVU).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <span>لا نعد بحل قضايا فردية خاصة نيابة عن دائرة السوسيال.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <span>لا ننشر قصص أطفال أو ملفات عائلية خاصة مطلقاً.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: QUIZ "FROM FEAR TO DIALOGUE" */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Award className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">اختبار "من الخوف إلى الحوار" (Från oro till dialog)</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">قياس التطور المعرفي واستكشاف الجاهزية للحوار مع المؤسسات السويدية</p>
              </div>
            </div>

            {!quizSubmitted ? (
              <div className="space-y-6">
                {quizQuestions.map((q) => (
                  <div key={q.id} className="p-5 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-3">
                    <h3 className="font-bold text-[#185C7A] text-sm sm:text-base flex items-start gap-2">
                      <span className="bg-[#185C7A] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {q.id}
                      </span>
                      <span>{q.question}</span>
                    </h3>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, idx) => {
                        const isSelected = quizAnswers[q.id] === opt.points;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectAnswer(q.id, opt.points)}
                            className={`w-full text-start p-3.5 rounded-xl border transition text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#185C7A] text-white border-[#185C7A] font-bold shadow-xs'
                                : 'bg-white text-[#123B4A] hover:bg-gray-50 border-gray-200'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#F2C86B] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className={`w-full py-4 rounded-2xl font-black text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    Object.keys(quizAnswers).length === quizQuestions.length
                      ? 'bg-[#185C7A] hover:bg-[#123B4A] text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-[#F2C86B]" />
                  <span>عرض النتيجة وتحليل التحول للحوار</span>
                </button>
              </div>
            ) : (
              <div className="p-6 bg-gradient-to-br from-[#185C7A]/10 via-[#2F8F83]/10 to-white rounded-2xl border border-[#185C7A]/30 space-y-6">
                <div className="text-center space-y-2">
                  <span className="bg-[#F2C86B] text-[#123B4A] font-black text-xs px-4 py-1 rounded-full inline-block">
                    نتيجة مقياس التحول المعرفي
                  </span>
                  <h3 className="text-2xl font-black text-[#185C7A]">
                    مجموع النقاط: {calculateScore()} من 18
                  </h3>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#185C7A]/20 space-y-3">
                  {calculateScore() >= 15 ? (
                    <div className="space-y-2">
                      <div className="text-emerald-800 font-black text-base flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>مستوى ممتاز - جاهزية عالية للحوار والشراكة!</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                        عائلتك تتمتع بوعي قانوني وتربوي متطور يدرك أهمية التواصل المباشر والمبكر مع السوسيال والمدرسة بدلاً من الخوف والتجنب. أنت نموذج للشراكة المجتمعية البناءة!
                      </p>
                    </div>
                  ) : calculateScore() >= 11 ? (
                    <div className="space-y-2">
                      <div className="text-[#185C7A] font-black text-base flex items-center gap-2">
                        <Info className="w-5 h-5 text-[#F2C86B]" />
                        <span>مستوى متوسط - رغبة إيجابية تتطلب المزيد من المعرفة</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                        لديك رغبة في الفهم والحوار ولكن قد تساورك بعض الشكوك والشائعات أحياناً. ننصحك باستعراض دليل حماية الطفل ومواضيع برنامج جسر الأسرة للوصول للثقة التامة.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-rose-800 font-black text-base flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-rose-600" />
                        <span>مستوى خوف مرتفع - يحتاج لتوضيح ودعم آمن</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                        يبدو أن الخوف والشائعات يؤثران بشكل كبير على تواصل أسرتك مع المؤسسات. تذكر دائماً أن قانون Services Act السويدي يركز على تقديم الدعم الوقائي الطوعي لمساندتك.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                  className="flex items-center justify-center gap-2 mx-auto bg-[#185C7A] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#123B4A] transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#F2C86B]" />
                  <span>إعادة الاختبار مرة أخرى</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: PILOT PROGRAM (12-WEEK ROADMAP) */}
      {activeTab === 'pilot-program' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Clock className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">المنتج الأساسي: البرنامج التجريبي (12 أسبوعاً)</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">خطة عمل مرحلية قابلة للقياس والتطبيق في البلديات والمدارس</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-2">
                  <span className="w-7 h-7 rounded-full bg-[#185C7A] text-white flex items-center justify-center text-xs font-black">1</span>
                  <h3 className="font-bold text-[#185C7A] text-sm">الجلسة الافتتاحية والاستبيان</h3>
                  <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">تحديد الفجوات المعرفية واستبيان قبل وبعد لربط قياس الأثر.</p>
                </div>

                <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-2">
                  <span className="w-7 h-7 rounded-full bg-[#2F8F83] text-white flex items-center justify-center text-xs font-black">2</span>
                  <h3 className="font-bold text-[#2F8F83] text-sm">إنتاج 6 مقابلات مصورة</h3>
                  <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">حوارات مكثفة مع خبراء (سوسيونوم، مرشد، وقانوني).</p>
                </div>

                <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-2">
                  <span className="w-7 h-7 rounded-full bg-[#123B4A] text-white flex items-center justify-center text-xs font-black">3</span>
                  <h3 className="font-bold text-[#123B4A] text-sm">المقابلات المرئية العمودية</h3>
                  <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">تحويل المحتوى إلى 18 مقطعاً توعوياً متاحاً بالعربية ومترجماً للسويدية.</p>
                </div>

                <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-2">
                  <span className="w-7 h-7 rounded-full bg-[#F2C86B] text-[#123B4A] flex items-center justify-center text-xs font-black">4</span>
                  <h3 className="font-bold text-[#123B4A] text-sm">لقاءات حوارية مسائية</h3>
                  <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">تنظيم 3 لقاءات تفاعلية بمشاركة 15-25 من الأبناء والأمهات والآباء.</p>
                </div>

                <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-2">
                  <span className="w-7 h-7 rounded-full bg-[#185C7A] text-white flex items-center justify-center text-xs font-black">5</span>
                  <h3 className="font-bold text-[#185C7A] text-sm">توزيع دليل الإحالة</h3>
                  <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">دليل عربي-سويدي للإحالة السريعة والدعم المباشر.</p>
                </div>

                <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-2">
                  <span className="w-7 h-7 rounded-full bg-[#2F8F83] text-white flex items-center justify-center text-xs font-black">6</span>
                  <h3 className="font-bold text-[#2F8F83] text-sm">قياس الأثر والتقرير الختامي</h3>
                  <p className="text-xs text-[#123B4A]/80 leading-relaxed font-medium">تقديم تقرير أثر قياسي شامل وموثق للمؤسسات والشركاء.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Helpful Feedback Widget */}
      <HelpfulFeedbackWidget
        itemId={`familjebron-${activeTab}`}
        itemTitle="قسم برنامج جسر الأسرة Familjebron"
        lang={lang}
      />
    </div>
  );
};
