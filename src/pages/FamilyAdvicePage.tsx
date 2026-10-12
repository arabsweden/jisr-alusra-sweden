import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { HelpfulFeedbackWidget } from '../components/HelpfulFeedbackWidget';
import {
  Heart,
  MessageCircle,
  Smile,
  ShieldCheck,
  Sparkles,
  Printer,
  Share2,
  Headphones,
  Play,
  Pause,
  Square,
  Type,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Users,
  Home,
  Sun,
  Moon,
  Clock,
  Zap,
  BookOpen,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  PhoneCall,
  Compass,
  Award,
  Check,
  Info
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigateToAssistant?: () => void;
  onNavigateToGuide?: () => void;
}

export const FamilyAdvicePage: React.FC<Props> = ({
  lang,
  onNavigateToAssistant,
  onNavigateToGuide
}) => {
  const [activeTab, setActiveTab] = useState<
    'principles' | 'communication' | 'stress' | 'reflection' | 'breathing' | 'resources'
  >('principles');

  // Font Size Switcher for "خط واضح كبير"
  const [fontSizeClass, setFontSizeClass] = useState<'text-base' | 'text-lg' | 'text-xl'>('text-lg');

  // Text-To-Speech States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Copy share link confirmation
  const [copiedLink, setCopiedLink] = useState(false);

  // Breathing Exercise States
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingSeconds, setBreathingSeconds] = useState(4);

  // Interactive Self-Reflection Assessment State
  const [stressAnswers, setStressAnswers] = useState<Record<number, number>>({});
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Script Card Expansion State
  const [expandedScriptId, setExpandedScriptId] = useState<number | null>(1);

  // Cleanup Speech Synthesis on Unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Breathing timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathingSeconds((prev) => {
          if (prev <= 1) {
            if (breathingPhase === 'inhale') {
              setBreathingPhase('hold');
              return 4;
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('exhale');
              return 6;
            } else {
              setBreathingPhase('inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathingPhase('inhale');
      setBreathingSeconds(4);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathingPhase]);

  // Audio Reader Handler
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
      دليل النصائح التربوية والتواصل الأسري وإدارة الضغوط في السويد.
      محتوى مراجع يهدف إلى دعم الوالدين بأساليب تربية إيجابية، تعزيز الحوار اليومي مع الأطفال، التغلب على ضغوط الاندماج والحياة، والاستفادة من برامج الدعم الوالدي المتاحة.
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

  // Self Reflection Questions (Parent Stress & Communication)
  const reflectionQuestions = [
    {
      id: 1,
      question: 'كيف تتصرف عادةً عندما يرفض طفلك الاستجابة لطلباتك (مثل إغلاق الشاشة أو المذاكرة)؟',
      options: [
        { label: 'أرفع صوتي أو أغضب فوراً بسبب نفاد الصبر.', points: 1 },
        { label: 'أهدد بالعقاب الصارم دون حوار مسبق.', points: 2 },
        { label: 'أحاول النزول لمستواه البصري والتحدث بهدوء مع وضع حدود واضحة ومسبقة.', points: 3 }
      ]
    },
    {
      id: 2,
      question: 'كيف تتعامل مع مشاعر الضغط والقلق الناتجة عن التوفيق بين العمل والاندماج ورعاية الأسرة؟',
      options: [
        { label: 'أكتم الضغط داخلي حتى أنفجر في أوقات غير متوقعة.', points: 1 },
        { label: 'أشعر بالإرهاق الدائم وأجد صعوبة في الاستمتاع بوقتي مع الأبناء.', points: 2 },
        { label: 'أخصص وقت استراحة قصير لنفسي وأطلب الدعم من الشريك أو مراكز الدعم الأسرية.', points: 3 }
      ]
    },
    {
      id: 3,
      question: 'كيف توازن بين تعزيز هويتكم وثقافتكم العربية وبين اندماج طفلك السلس في المجتمع السويدي؟',
      options: [
        { label: 'أشعر بالخوف والرفض التام لبعض مظاهر المجتمع السويدي.', points: 1 },
        { label: 'أترك الأبناء دون توجيه واضح، مما يسبب لهم تشتتاً بين البيت والمدرسة.', points: 2 },
        { label: 'أبني معهم حواراً مفتوحاً يعتز بثقافتنا وأصلنا ويرحب بالقيم الإيجابية للمجتمع السويدي.', points: 3 }
      ]
    },
    {
      id: 4,
      question: 'هل تخصص وقتاً يومياً للحوار الفردي مع طفلك دون وجود شاشات أو مشتتات؟',
      options: [
        { label: 'نادراً جداً بسبب ضيق الوقت والالتزامات.', points: 1 },
        { label: 'أحياناً خلال عطلة نهاية الأسبوع فقط.', points: 2 },
        { label: 'نعم، أحرص على 10-15 دقيقة يومياً للاستماع لرأيه وتجاربه في المدرسة.', points: 3 }
      ]
    }
  ];

  const handleSelectStressAnswer = (qId: number, points: number) => {
    if (reflectionSubmitted) return;
    setStressAnswers(prev => ({ ...prev, [qId]: points }));
  };

  const calculateStressScore = () => {
    let total = 0;
    Object.values(stressAnswers).forEach((val) => {
      if (typeof val === 'number') {
        total += val;
      }
    });
    return total;
  };

  // Communication Scripts Data
  const communicationScripts = [
    {
      id: 1,
      situation: 'رفض إغلاق الشاشة أو الهاتف الذكي عند حان وقت النوم أو المذاكرة',
      insteadOf: '«أغلق الهاتف فوراً وإلا سأسحبه منك طوال الأسبوع!»',
      trySaying: '«أعلم أن هذه اللعبة ممتعة جداً ومن الصعب إيقافها الآن. يتبقى لدينا 5 دقائق قبل إغلاق الشاشة لتجهيز أنفسنا للنوم. هل تفضل إغلاقها الآن أم بعد التنبيه المتبقي؟»',
      whyItWorks: 'يمنح الطفل شعوراً بالاحترام والتوقع المسبق بدلاً من الصدمة والمواجهة المفاجئة.'
    },
    {
      id: 2,
      situation: 'عندما يعود الطفل من المدرسة غاضباً أو منغلقاً ولا يريد التحدث',
      insteadOf: '«لماذا أنت نكد اليوم؟ ماذا حدث في المدرسة؟ اتكلم!»',
      trySaying: '«أرى أنك مجهد أو متضايق اليوم. أنا هنا بجانبك إذا أردت التحدث لاحقاً، وستجد وجبتك المفضلة جاهزة عندما ترتاح.»',
      whyItWorks: 'يمنح الطفل مساحة لتفريغ مشاعره دون الاستجواء المباشر، مما يجعله يلجأ للوالد تلقائياً لاحقاً.'
    },
    {
      id: 3,
      situation: 'التعبير عن الارتباك بين الثقافة العربية داخل البيت والقيم السويدية في المدرسة',
      insteadOf: '«لا تستمع لما يقولونه في المدرسة، ناهيك عن هذه الأمور!»',
      trySaying: '«من الطبيعي أن تلاحظ اختلافات بين ما نفعله في بيتنا وما يفعله أصدقاؤك. تعال نتحدث عن هذه الفكرة ونفهم معاً ما المميز في ثقافتنا وكيف نتعايش بذكاء.»',
      whyItWorks: 'يبني الثقة والاعتزاز بالذات (Bikulturell identitet) ويمنع الطفل من التكتم أو العيش بشخصيتين مزدوجتين.'
    },
    {
      id: 4,
      situation: 'نوبة غضب وسلوك انفعالي في مكان عام (مثل السوبرماركت)',
      insteadOf: '«فضحتنا أمام الناس! سأعاقبك شديداً عندما نصل البيت!»',
      trySaying: '«أنت غاضب لأننا لم نشترِ هذه اللعبة اليوم، وأنا أفهم شعورك بالخيبة. سنبتعد قليلاً لنأخذ نفساً عميقاً معاً.»',
      whyItWorks: 'يركز على تسمية المشاعر والتهدئة الحركية بدلاً من الشلل والانفعال المضاد أمام الآخرين.'
    }
  ];

  return (
    <div className="space-y-8 pb-16 dir-rtl">
      {/* Disclaimer Banner */}
      <DisclaimerBanner
        type="advice"
        title="محتوى مراجَع وموثّق - نصائح وإرشادات تربوية وأسرية غير قانونية"
        description="هذا القسم يقدم نصائح تربوية ونفسية عملية لدعم الأسرة وتخفيف الضغوط والتواصل الفعال. المحتوى مُراجع من منظور الاستشارات الوالدية والدعم الأسري، ولا يشكل استشارة قانونية أو تشخيصاً طبياً رسمياً."
      />

      {/* Main Page Header Banner in Natural Tones */}
      <div className="bg-gradient-to-br from-[#123B4A] via-[#185C7A] to-[#2F8F83] text-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-5 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 end-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
          <Heart className="w-96 h-96" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2 bg-[#F2C86B] text-[#123B4A] font-black text-xs px-3.5 py-1 rounded-full shadow-2xs">
            <Sparkles className="w-4 h-4" />
            <span>الدليل العملي للتربية والتواصل وإدارة الضغوط الأسرية</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-white/15 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs border border-white/20">
              تصميم مريح وألوان طبيعية (Natural Tones)
            </span>
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
            نصائح وإرشادات التماسك الأسري والتربية الإيجابية في السويد
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed font-medium">
            أدوات عملية ومجربة لمساعدة الأسر العربية على تعزيز الحوار مع الأبناء، بناء الهوية المزدوجة باعتزاز، التعامل مع نوبات الغضب وضغوط الحياة، والاستفادة من برامج الدعم الوالدي السويدية المتاحة.
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
                <span>استمع للملخص الصوتي</span>
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
              <span>{copiedLink ? 'تم نسخ الرابط!' : 'مشاركة الصفحة'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar inside FamilyAdvicePage */}
      <div className="flex items-center gap-2 border-b border-[#185C7A]/20 pb-3 overflow-x-auto no-scrollbar no-print">
        <button
          onClick={() => setActiveTab('principles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'principles'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <Heart className="w-4 h-4 text-[#F2C86B]" />
          <span>مبادئ التربية الإيجابية</span>
        </button>

        <button
          onClick={() => setActiveTab('communication')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'communication'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <MessageCircle className="w-4 h-4 text-[#F2C86B]" />
          <span>نماذج وحوارات عملية (بدلاً من X)</span>
        </button>

        <button
          onClick={() => setActiveTab('stress')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'stress'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <Zap className="w-4 h-4 text-[#F2C86B]" />
          <span>إدارة الضغوط ونوبات الغضب</span>
        </button>

        <button
          onClick={() => setActiveTab('reflection')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'reflection'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <Award className="w-4 h-4 text-[#F2C86B]" />
          <span>مقياس التقييم الذاتي للوالدين</span>
        </button>

        <button
          onClick={() => setActiveTab('breathing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'breathing'
              ? 'bg-[#2F8F83] text-white shadow-md'
              : 'bg-white text-[#2F8F83] hover:bg-gray-100 border border-[#2F8F83]/30'
          }`}
        >
          <Clock className="w-4 h-4 text-[#F2C86B]" />
          <span>تمرين التهدئة والتنفس (5 دقائق)</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'resources'
              ? 'bg-[#185C7A] text-white shadow-md'
              : 'bg-white text-[#123B4A] hover:bg-gray-100 border border-[#185C7A]/15'
          }`}
        >
          <Compass className="w-4 h-4 text-[#F2C86B]" />
          <span>مراكز ودورات الدعم الأسرية بالسويد</span>
        </button>
      </div>

      {/* TAB 1: POSITIVE PARENTING PRINCIPLES */}
      {activeTab === 'principles' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Heart className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">الركائز الأربع للتربية الإيجابية وبناء الهوية الثنائية</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">تنمية ذكاء عاطفي متوازن يبني الجسور بين البيت والمجتمع السويدي</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1 */}
              <div className="bg-[#F7F5EF] p-5 rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center gap-2 font-black text-[#185C7A] text-lg">
                  <span className="w-8 h-8 rounded-full bg-[#185C7A] text-white flex items-center justify-center text-sm font-black">1</span>
                  <h3>الإنصات النشط قبل إعطاء الأحكام</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  عندما يعود الطفل بحكايات من المدرسة، استمع بتعاطف دون أن تبدي استنكاراً فورياً. الإنصات الهادئ يُشعر الطفل بالترحاب ويجعله يلجأ للبيت كملجأ آمن لمناقشة أفكاره وملاحظاته بكل صدق.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#F7F5EF] p-5 rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center gap-2 font-black text-[#2F8F83] text-lg">
                  <span className="w-8 h-8 rounded-full bg-[#2F8F83] text-white flex items-center justify-center text-sm font-black">2</span>
                  <h3>الهوية الثقافية الثنائية باعتزاز (Bikulturell)</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  ساعد الأبناء على الشعور بالفخر باللغة العربية والقيم الأسرية النبيلة، مع فتح المجال لتقدير القيم السويدية النافعة كاحترام المواعيد، البيئة، والاستقلالية. الثنائية الثقافية إثراء وليست تناقضاً.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#F7F5EF] p-5 rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center gap-2 font-black text-[#123B4A] text-lg">
                  <span className="w-8 h-8 rounded-full bg-[#123B4A] text-white flex items-center justify-center text-sm font-black">3</span>
                  <h3>الحدود الواضحة الحازمة بدعم ومحبة</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  التربية الإيجابية ليست تساهلاً مطلقاً؛ بل هي وضع حدود ثابته وعادلة (مثل أوقات النوم، الشاشات، الواجبات) ولكن مع توضيح الأسباب بهدوء دون اللجوء للصراخ أو الترهيب.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="bg-[#F7F5EF] p-5 rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center gap-2 font-black text-[#2F8F83] text-lg">
                  <span className="w-8 h-8 rounded-full bg-[#F2C86B] text-[#123B4A] flex items-center justify-center text-sm font-black">4</span>
                  <h3>القدوة اليومية في التعبير عن المشاعر</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  عندما يرى الطفل الوالدين يعبران عن التعب أو الحزن أو الفرح بأسلوب راقٍ متوازن، يتعلم كيف يدير مشاعره الذاتية دون اللجوء للتفريغ العدواني أو الانعزال الصامت.
                </p>
              </div>
            </div>

            {/* Practical Daily Routine Box */}
            <div className="bg-gradient-to-r from-[#185C7A]/10 to-[#2F8F83]/10 p-6 rounded-2xl border border-[#185C7A]/30 space-y-3">
              <h3 className="font-extrabold text-[#185C7A] text-base flex items-center gap-2">
                <Sun className="w-5 h-5 text-[#F2C86B]" />
                <span>عادات أسرية يومية بسيطة تزيد التماسك:</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#123B4A]/90 font-medium">
                <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#185C7A]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#2F8F83] shrink-0" />
                  <span>وجبة طعام دافئة تجمع الأسرة بدون شاشات إلكترونية.</span>
                </li>
                <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#185C7A]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#2F8F83] shrink-0" />
                  <span>سؤال مفتوح يومياً: «ما أفضل شَيء حَدَث معك اليوم؟»</span>
                </li>
                <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#185C7A]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#2F8F83] shrink-0" />
                  <span>قراءة قصة أو حديث هادئ لمدة 10 دقائق قبل النوم.</span>
                </li>
                <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#185C7A]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#2F8F83] shrink-0" />
                  <span>عناق حار وعبارة تقدير صريحة: «أنا سعيد لأنك ابني/ابنتي».</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMMUNICATION SCRIPTS ("INSTEAD OF X, TRY SAYING Y") */}
      {activeTab === 'communication' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <MessageCircle className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">نماذج وحوارات عملية للحياة اليومية</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">كيف تحول لحظات التوتر والمواجهة إلى حوار بناء وعلاقة قوية مع طفلك</p>
              </div>
            </div>

            <div className="space-y-4">
              {communicationScripts.map((script) => {
                const isExpanded = expandedScriptId === script.id;
                return (
                  <div
                    key={script.id}
                    className="border border-[#185C7A]/20 rounded-2xl overflow-hidden shadow-2xs transition"
                  >
                    <button
                      onClick={() => setExpandedScriptId(isExpanded ? null : script.id)}
                      className="w-full p-4 bg-[#F7F5EF] hover:bg-[#eae6d8] text-start font-bold flex items-center justify-between gap-3 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-[#185C7A] text-white flex items-center justify-center text-xs font-black shrink-0">
                          {script.id}
                        </span>
                        <span className="text-sm sm:text-base text-[#123B4A]">{script.situation}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-[#185C7A] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#185C7A] shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-5 bg-white space-y-4 text-xs sm:text-sm border-t border-[#185C7A]/15">
                        {/* Instead Of Box */}
                        <div className="p-4 bg-rose-50 border-s-4 border-rose-500 rounded-2xl space-y-1">
                          <span className="text-xs font-black text-rose-800 flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-600" />
                            <span>بدلاً من التعبير التلقائي المنفعل:</span>
                          </span>
                          <p className="text-rose-950 font-bold italic text-sm sm:text-base leading-relaxed">
                            {script.insteadOf}
                          </p>
                        </div>

                        {/* Try Saying Box */}
                        <div className="p-4 bg-emerald-50 border-s-4 border-emerald-500 rounded-2xl space-y-1">
                          <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>جرب الصياغة التربوية الهادئة:</span>
                          </span>
                          <p className="text-emerald-950 font-bold text-sm sm:text-base leading-relaxed">
                            {script.trySaying}
                          </p>
                        </div>

                        {/* Why It Works Box */}
                        <div className="p-3 bg-[#185C7A]/5 rounded-xl border border-[#185C7A]/15 text-[#123B4A]/90 font-medium leading-relaxed">
                          <strong className="text-[#185C7A]">لماذا تنجح هذه الطريقة؟</strong> {script.whyItWorks}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STRESS MANAGEMENT & ANGER DE-ESCALATION */}
      {activeTab === 'stress' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Zap className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">إدارة الضغوط الأسرية ونوبات الغضب الحادة</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">تقنيات استعادة الهدوء الذاتي والوقاية من الاحتراق الوالدي في السويد</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Step 1 */}
              <div className="p-5 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center gap-2 font-black text-[#185C7A]">
                  <Clock className="w-5 h-5 text-[#F2C86B]" />
                  <span>1. قاعدة الـ 10 ثوانٍ للتوقف (Pause)</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/80 leading-relaxed font-medium">
                  قبل الرد أو اتخاذ أي تصرف أثناء الغضب الشديد، خذ خطوة للخلف واحبس انفاسك لمدة 3 ثوانٍ ثم افرغها بطباعة. هذا يقطع الاستجابة الانفعالية السريعة من مخك النامي إلى التفكير المنطقي.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center gap-2 font-black text-[#2F8F83]">
                  <Smile className="w-5 h-5 text-[#2F8F83]" />
                  <span>2. خفض نبرة الصوت والمستوى البصري</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/80 leading-relaxed font-medium">
                  انزل على ركبتيك لتكون في مستوى عين طفلك وتحدث بنبرة منخفضة وهادئة جداً. الصوت المنخفض يجبر الطفل على التركيز والاستماع بدلاً من الدخول في صياح متبادل.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center gap-2 font-black text-[#123B4A]">
                  <Heart className="w-5 h-5 text-[#F2C86B]" />
                  <span>3. الرعاية الذاتية للوالدين</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/80 leading-relaxed font-medium">
                  لا يمكنك الإعطاء من كأس فارغ. يزم تخصيص وقت استراحة مستقطع للوالدين خلال الأسبوع (المشي في الطبيعة السويدية، الرياضة، الهوايات) لتفريغ ضغوط العمل والاندماج.
                </p>
              </div>
            </div>

            {/* Winter & Integration Stress in Sweden */}
            <div className="bg-gradient-to-r from-[#185C7A]/10 to-[#2F8F83]/10 p-6 rounded-2xl border border-[#185C7A]/30 space-y-3">
              <h3 className="font-bold text-[#185C7A] text-base flex items-center gap-2">
                <Moon className="w-5 h-5 text-[#185C7A]" />
                <span>نصائح خاصة للتعامل مع الشتاء واختلاف الطقس بالسويد:</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                قد يؤدي نقص فيتامين D وقصر ساعات النهار في الشتاء السويدي إلى زيادة التوتر وانخفاض الطاقة لدى الكبار والأطفال. يوصى بـ:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#123B4A]/80 font-medium">
                <li>الخروج اليومي المنتظم في ساعات النهار واستنشاق الهواء النقي (المشي أو اللعب بالأماكن المفتوحة).</li>
                <li>تناول مكملات فيتامين D بانتظام وفق توصيات مراكز الرعاية الصحية (Vårdcentralen).</li>
                <li>تأسيس أنشطة منزلية دافئة (قراءة، ألعاب جماعية، طهي مشترك) تعوض قلة الإضاءة الخارجة.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SELF-REFLECTION PARENTING ASSESSMENT */}
      {activeTab === 'reflection' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Award className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">مقياس التقييم والتأمل الذاتي للوالدين</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">أداة تفاعلية سريعة لاكتشاف أنماط التعامل الأسرية وتحديد نقاط التطوير</p>
              </div>
            </div>

            {!reflectionSubmitted ? (
              <div className="space-y-6">
                {reflectionQuestions.map((q) => (
                  <div key={q.id} className="p-5 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-3">
                    <h3 className="font-bold text-[#185C7A] text-sm sm:text-base flex items-start gap-2">
                      <span className="bg-[#185C7A] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {q.id}
                      </span>
                      <span>{q.question}</span>
                    </h3>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, idx) => {
                        const isSelected = stressAnswers[q.id] === opt.points;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectStressAnswer(q.id, opt.points)}
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
                  onClick={() => setReflectionSubmitted(true)}
                  disabled={Object.keys(stressAnswers).length < reflectionQuestions.length}
                  className={`w-full py-4 rounded-2xl font-black text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    Object.keys(stressAnswers).length === reflectionQuestions.length
                      ? 'bg-[#185C7A] hover:bg-[#123B4A] text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-[#F2C86B]" />
                  <span>عرض النتيجة والتوصيات المخصصة</span>
                </button>
              </div>
            ) : (
              <div className="p-6 bg-gradient-to-br from-[#185C7A]/10 via-[#2F8F83]/10 to-white rounded-2xl border border-[#185C7A]/30 space-y-6">
                <div className="text-center space-y-2">
                  <span className="bg-[#F2C86B] text-[#123B4A] font-black text-xs px-4 py-1 rounded-full inline-block">
                    نتيجة التقييم الذاتي
                  </span>
                  <h3 className="text-2xl font-black text-[#185C7A]">
                    مجموع النقاط: {calculateStressScore()} من 12
                  </h3>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#185C7A]/20 space-y-3">
                  {calculateStressScore() >= 10 ? (
                    <div className="space-y-2">
                      <div className="text-emerald-800 font-black text-base flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>نمط تواصل ممتاز ومتوازن!</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                        أنت تبذل جهداً رائعاً في الاعتماد على الحوار الهادئ والإنصات وتحديد الحدود بذكاء عاطفي. استمر في هذه الممارسات الطيبة وشارك تجاربك الناجحة مع الأسر الأخرى!
                      </p>
                    </div>
                  ) : calculateStressScore() >= 7 ? (
                    <div className="space-y-2">
                      <div className="text-[#185C7A] font-black text-base flex items-center gap-2">
                        <Info className="w-5 h-5 text-[#F2C86B]" />
                        <span>مستوى متوسط - هناك فرص رائعة للتحسين والتطوير</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                        ترغب بشدة في تقديم الأفضل ولكن قد تتغلب عليك ضغوط الحياة أحياناً. جرب تطبيق حوارات "بدلاً من X جرب Y" واستفد من دورات ABC المجانية في منطقتك.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-rose-800 font-black text-base flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-rose-600" />
                        <span>مستوى توتر مرتفع - يحتاج لخطوات هادئة ودعم</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                        يبدو أنك تتحمل أعباء وضغوطاً عالية جداً تؤثر على صبرك اليومي. نوصيك بالبدء بتمرين التنفس السريع 5 دقائق، وطلب الدعم الاستشاري من مراكز الأسرة (Familjecentralen) الخالية من أي إجراءات رسمية معقدة.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setReflectionSubmitted(false);
                    setStressAnswers({});
                  }}
                  className="flex items-center justify-center gap-2 mx-auto bg-[#185C7A] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#123B4A] transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#F2C86B]" />
                  <span>إعادة التقييم مرة أخرى</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: 5-MINUTE GUIDED BREATHING EXERCISE */}
      {activeTab === 'breathing' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Clock className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">تمرين التنفس والتهدئة السريع للوالدين (5 دقائق)</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">طريقة موثقة لتهدئة الجهاز العصبي واستعادة التركيز قبل التفاعل مع الأبناء</p>
              </div>
            </div>

            <div className="bg-[#F7F5EF] p-8 rounded-3xl border border-[#185C7A]/20 flex flex-col items-center justify-center text-center space-y-6">
              {/* Visual Animated Breathing Circle */}
              <div
                className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-xl border-4 ${
                  breathingPhase === 'inhale'
                    ? 'scale-110 bg-[#185C7A] text-white border-[#F2C86B]'
                    : breathingPhase === 'hold'
                    ? 'scale-105 bg-[#2F8F83] text-white border-white'
                    : 'scale-95 bg-[#123B4A] text-white border-teal-300'
                }`}
              >
                <span className="text-xs uppercase font-black text-[#F2C86B] tracking-widest">
                  {breathingPhase === 'inhale' ? 'شهيق عميق' : breathingPhase === 'hold' ? 'احبس أفقك' : 'زفير بطيء'}
                </span>
                <span className="text-5xl font-black mt-2">{breathingSeconds}</span>
                <span className="text-[10px] text-white/80 mt-1">ثوانٍ</span>
              </div>

              <div className="max-w-md space-y-2">
                <p className="text-xs sm:text-sm text-[#123B4A]/80 font-medium leading-relaxed">
                  اجلس في مكان مريح، واضبط ذهنك مع الدائرة المتحركة: شهيق من الأنف (4 ثوانٍ)، حبس النفس (4 ثوانٍ)، ثم زفير هادئ من الفم (6 ثوانٍ).
                </p>
              </div>

              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm transition shadow-md flex items-center gap-2 cursor-pointer ${
                  isBreathingActive
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-[#185C7A] hover:bg-[#123B4A] text-white'
                }`}
              >
                {isBreathingActive ? (
                  <>
                    <Pause className="w-5 h-5 text-white" />
                    <span>إيقاف التمرین المؤقت</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 text-[#F2C86B]" />
                    <span>ابدأ تمرين التنفس والتهدئة الآن</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: COMMUNITY PARENTING SUPPORT IN SWEDEN */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#185C7A]/20 shadow-xs space-y-6 ${fontSizeClass} text-[#123B4A]`}>
            <div className="flex items-center gap-3 text-[#185C7A] border-b border-[#185C7A]/10 pb-4">
              <Compass className="w-7 h-7 text-[#F2C86B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black">دورات ومراكز الدعم الوالدي المجانية في السويد</h2>
                <p className="text-xs text-[#123B4A]/70 mt-1">برامج صحية وتربوية طوعية بالكامل متاحة لجميع الأسر دون أدنى تعقيد رسمي</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Program 1 */}
              <div className="p-5 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-[#185C7A] text-base">ABC (Alla Barn i Centrum)</h3>
                  <span className="bg-[#185C7A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">برنامج حكومي طوعي</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  برنامج استشاري مجاني تقدمه معظم البلديات يتكون من 4 لقاءات تفاعلية للأهالي. يركز على كيفية تقوية العلاقة مع الأطفال من سن 3 إلى 12 سنة والتعامل مع تحديات السلوك اليومي.
                </p>
              </div>

              {/* Program 2 */}
              <div className="p-5 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-[#2F8F83] text-base">Familjecentralen (مركز الأسرة)</h3>
                  <span className="bg-[#2F8F83] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">لقاءات مفتوحة</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  مكان ملتقى يجمع بين رعاية صحة الأطفال (BVC)، الروضة المفتوحة (Öppen förskola)، والمستشار الأسري. يتيح لك الالتقاء بعائلات أخرى وتبادل التجارب في بيئة دافئة وبسيطة.
                </p>
              </div>

              {/* Program 3 */}
              <div className="p-5 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-[#123B4A] text-base">BRIS för vuxna om barn</h3>
                  <span className="bg-[#123B4A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">خط استشاري هاتف</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  خط استشاري مجاني للبالغين للحديث عن قضايا ومخاوف الأطفال على الرقم: <strong className="text-[#185C7A] dir-ltr inline-block">0771-50 50 50</strong>. يمكنك الحديث بسرية مع أخصائيين نفسيين واجتماعيين.
                </p>
              </div>

              {/* Program 4 */}
              <div className="p-5 bg-[#F7F5EF] rounded-2xl border border-[#185C7A]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-[#185C7A] text-base">Trygga Föräldrar (الأوصياء الآمنون)</h3>
                  <span className="bg-[#F2C86B] text-[#123B4A] text-[10px] font-black px-2.5 py-0.5 rounded-full">دعم يافعين</span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                  برامج موجهة خصيصاً لأسر اليافعين والمراهقين لمساعدتهم على الوقاية من رفقاء السوء وتعزيز التواصل وحماية الأبناء في المرحلة الإعدادية والثانوية.
                </p>
              </div>
            </div>

            {/* Quick Link to AI Assistant */}
            <div className="pt-4 border-t border-[#185C7A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-start">
                <h4 className="font-bold text-[#185C7A] text-sm">هل لديك سؤال تربوي خاص بوضع أسرتك؟</h4>
                <p className="text-xs text-[#123B4A]/80">استعن بالذكاء الاصطناعي الخاص بالمنصة للإجابة بناءً على المصادر الرسمية</p>
              </div>
              {onNavigateToAssistant && (
                <button
                  onClick={onNavigateToAssistant}
                  className="flex items-center gap-2 bg-[#185C7A] hover:bg-[#123B4A] text-white px-5 py-2.5 rounded-2xl font-bold text-xs transition shadow-xs cursor-pointer shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-[#F2C86B]" />
                  <span>اسأل مساعد جِسر الأسرة الذكي</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Helpful Feedback Widget */}
      <HelpfulFeedbackWidget
        itemId={`family-advice-${activeTab}`}
        itemTitle="قسم النصائح التربوية والتواصل الأسري"
        lang={lang}
      />
    </div>
  );
};
