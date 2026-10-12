import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Article, Language } from '../types';
import { DataService } from '../services/dataService';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { SchoolHierarchyDiagram } from '../components/SchoolHierarchyDiagram';
import { ArticleCard } from '../components/ArticleCard';
import { HelpfulFeedbackWidget } from '../components/HelpfulFeedbackWidget';
import {
  ArrowRight,
  Bookmark,
  ShieldCheck,
  Clock,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Check,
  FileText,
  Printer,
  Facebook,
  MessageCircle,
  Volume2,
  Play,
  Pause,
  Square,
  Headphones,
  Send,
  Link2,
  Mail
} from 'lucide-react';

interface Props {
  article: Article;
  lang: Language;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenTemplates?: () => void;
}

export const ArticleDetailPage: React.FC<Props> = ({
  article,
  lang,
  onBack,
  onSelectArticle,
  onOpenTemplates
}) => {
  const [bookmarked, setBookmarked] = useState(DataService.isBookmarked(article.id));
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Text-to-Speech States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechLang, setSpeechLang] = useState<Language>(lang || 'ar');
  const [speechRate, setSpeechRate] = useState<number>(0.95);

  // Social Share States & Handlers
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      alert('تم نسخ رابط المقال!');
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`💡 مقال توعوي موثق من جسر الأسرة:\n*${article.title_ar}*\n\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleTelegramShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`💡 ${article.title_ar}`);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`مقال موثق: ${article.title_ar}`);
    const body = encodeURIComponent(`السلام عليكم،\n\nأود مشاركة هذا المقال التوعوي الموثق معك بخصوص ${article.title_ar}:\n\n${window.location.href}\n\nمنصة جسر الأسرة في السويد.`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Cleanup speech on article change
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [article.id]);

  const handlePlaySpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('عذراً، متصفحك لا يدعم ميزة القراءة الصوتية (Web Speech API).');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare text content based on selected language
    let textToRead = '';
    if (speechLang === 'ar') {
      const parts = [
        article.title_ar,
        article.summary_ar,
        article.key_takeaways ? `أهم النقاط: ${article.key_takeaways.join('. ')}` : '',
        article.content_ar || article.body_ar || ''
      ];
      textToRead = parts.filter(Boolean).join('. ');
    } else {
      const parts = [
        article.title_sv,
        article.summary_sv,
        article.content_sv || article.body_sv || article.title_sv
      ];
      textToRead = parts.filter(Boolean).join('. ');
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = speechLang === 'ar' ? 'ar-SA' : 'sv-SE';
    utterance.rate = speechRate;

    // Pick best available voice if available
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.lang.startsWith(speechLang === 'ar' ? 'ar' : 'sv'));
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

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

  const handlePauseSpeech = () => {
    if (isPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleToggleBookmark = () => {
    const newState = DataService.toggleBookmark(article.id);
    setBookmarked(newState);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title_ar,
        text: article.summary_ar,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط المقال!');
    }
  };

  const relatedArticles = DataService.getArticles()
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="fixed top-0 left-0 h-1 bg-[#2F8F83] z-50 transition-all duration-150 ease-out no-print" style={{ width: `${scrollProgress}%` }} />
      <Helmet>
        <title>{article.title_ar} | جسر الأسرة السويدية</title>
        <meta name="description" content={article.summary_ar} />
      </Helmet>

      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white border border-[#185C7A]/20 hover:bg-[#F7F5EF] text-[#185C7A] px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لقائمة المقالات</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBookmark}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              bookmarked
                ? 'bg-[#F2C86B] text-[#123B4A]'
                : 'bg-white border border-[#185C7A]/20 text-[#123B4A] hover:bg-gray-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            <span>{bookmarked ? 'في المفضلة' : 'حفظ'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-white border border-[#185C7A]/20 text-[#123B4A] hover:bg-gray-100 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>مشاركة</span>
          </button>

          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="flex items-center gap-1.5 bg-white border border-[#185C7A]/20 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
            title="مشاركة على فيسبوك"
          >
            <Facebook className="w-4 h-4" />
          </button>

          <button
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${article.title_ar}: ${window.location.href}`)}`, '_blank')}
            className="flex items-center gap-1.5 bg-white border border-[#185C7A]/20 text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
            title="مشاركة على واتساب"
          >
            <MessageCircle className="w-4 h-4" />
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-white border border-[#185C7A]/20 text-[#123B4A] hover:bg-gray-100 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>حفظ كـ PDF</span>
          </button>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="bg-white rounded-3xl p-6 md:p-10 border border-[#185C7A]/20 shadow-md space-y-6">
        {/* Category & Demo Notice */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#185C7A]/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#185C7A] text-white text-xs font-bold px-3 py-1 rounded-full">
              {article.category === 'school' && 'الأسرة والمدرسة'}
              {article.category === 'social-services' && 'الخدمات الاجتماعية'}
              {article.category === 'child-rights' && 'حقوق الطفل'}
              {article.category === 'family-law' && 'القوانين الأسرية'}
              {article.category === 'marriage-separation' && 'الزواج والانفصال'}
            </span>
            <span className="text-xs text-[#2F8F83] font-semibold italic">
              {article.title_sv}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#123B4A]/70">
            <Clock className="w-3.5 h-3.5 text-[#185C7A]" />
            <span>وقت القراءة: {article.read_time_min || 4} دقائق</span>
          </div>
        </div>

        {/* Demo Warning Banner */}
        {article.is_demo && (
          <div className="bg-[#F2C86B]/20 border border-[#F2C86B] p-3 rounded-xl text-xs text-[#123B4A] font-medium flex items-center justify-between">
            <span>محتوى تجريبي تم إعداده بأسلوب رصين ومستند للمصادر، ويخضع لمراجعة دورية قبل الاعتماد النهائي.</span>
          </div>
        )}

        {/* Title with Quick Text-to-Speech Button */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-black text-[#185C7A] leading-tight flex-1">
              {article.title_ar}
            </h1>

            {/* Listen to Article Quick Button next to title */}
            <div className="flex items-center gap-2 bg-[#185C7A]/10 p-1.5 rounded-2xl border border-[#185C7A]/20 no-print shrink-0 self-start sm:self-auto">
              <button
                onClick={handlePlaySpeech}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer ${
                  isPlaying
                    ? 'bg-[#2F8F83] text-white animate-pulse'
                    : 'bg-[#185C7A] hover:bg-[#124259] text-white'
                }`}
                title="استمع للمقال بصوت متحدث آلي واضح"
              >
                {isPlaying ? <Volume2 className="w-4 h-4 text-[#F2C86B]" /> : <Headphones className="w-4 h-4 text-[#F2C86B]" />}
                <span>{isPlaying ? 'جاري الاستماع...' : isPaused ? 'استئناف القراءة' : 'استمع للمقال'}</span>
              </button>

              {/* Language Choice Toggle for TTS */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl text-[11px] font-extrabold border border-[#185C7A]/15">
                <button
                  onClick={() => {
                    handleStopSpeech();
                    setSpeechLang('ar');
                  }}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    speechLang === 'ar'
                      ? 'bg-[#2F8F83] text-white shadow-2xs'
                      : 'text-[#123B4A] hover:bg-gray-100'
                  }`}
                  title="القراءة باللغة العربية"
                >
                  العربية
                </button>
                <button
                  onClick={() => {
                    handleStopSpeech();
                    setSpeechLang('sv');
                  }}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    speechLang === 'sv'
                      ? 'bg-[#2F8F83] text-white shadow-2xs'
                      : 'text-[#123B4A] hover:bg-gray-100'
                  }`}
                  title="Läs på svenska"
                >
                  Svenska
                </button>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#123B4A]/80 font-medium leading-relaxed bg-[#F7F5EF] p-4 rounded-2xl border-s-4 border-[#2F8F83]">
            {article.summary_ar}
          </p>
        </div>

        {/* Text-to-Speech Audio Reader Banner */}
        <div className="bg-[#185C7A]/5 border border-[#185C7A]/20 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs no-print">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-2.5 rounded-xl transition ${isPlaying ? 'bg-[#2F8F83] text-white animate-pulse' : 'bg-[#185C7A] text-[#F2C86B]'}`}>
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-[#185C7A] flex items-center gap-1.5">
                  <span>ميزة الاستماع الصوتي للمقال (Text-to-Speech)</span>
                  <span className="bg-[#2F8F83]/15 text-[#2F8F83] text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    سهولة الوصول
                  </span>
                </h3>
                <p className="text-[11px] text-[#123B4A]/70 font-medium">
                  استمع إلى النص باللغة العربية أو السويدية لتسهيل القراءة والمتابعة.
                </p>
              </div>
            </div>

            {/* Language Toggle for Voice */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#185C7A]/15 text-xs font-bold">
              <button
                onClick={() => {
                  handleStopSpeech();
                  setSpeechLang('ar');
                }}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  speechLang === 'ar'
                    ? 'bg-[#185C7A] text-white shadow-2xs'
                    : 'text-[#123B4A] hover:bg-gray-100'
                }`}
              >
                العربية (ar)
              </button>
              <button
                onClick={() => {
                  handleStopSpeech();
                  setSpeechLang('sv');
                }}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  speechLang === 'sv'
                    ? 'bg-[#185C7A] text-white shadow-2xs'
                    : 'text-[#123B4A] hover:bg-gray-100'
                }`}
              >
                Svenska (sv)
              </button>
            </div>
          </div>

          {/* Player Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#185C7A]/10 text-xs">
            <div className="flex items-center gap-2">
              {!isPlaying ? (
                <button
                  onClick={handlePlaySpeech}
                  className="flex items-center gap-2 bg-[#2F8F83] hover:bg-[#236e65] text-white px-4 py-2 rounded-xl font-bold transition shadow-2xs cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isPaused ? 'استئناف القراءة' : 'تشغيل الاستماع الصوتي'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePauseSpeech}
                  className="flex items-center gap-2 bg-[#F2C86B] hover:bg-[#e0b657] text-[#123B4A] px-4 py-2 rounded-xl font-bold transition shadow-2xs cursor-pointer"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>إيقاف مؤقت</span>
                </button>
              )}

              {(isPlaying || isPaused) && (
                <button
                  onClick={handleStopSpeech}
                  className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 px-3 py-2 rounded-xl font-bold transition cursor-pointer"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>إيقاف نهائي</span>
                </button>
              )}
            </div>

            {/* Reading Speed Controls */}
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#123B4A]/80">
              <span>سرعة القراءة:</span>
              <select
                value={speechRate}
                onChange={(e) => {
                  setSpeechRate(parseFloat(e.target.value));
                  if (isPlaying) {
                    handleStopSpeech();
                  }
                }}
                className="bg-white border border-[#185C7A]/20 rounded-lg px-2 py-1 text-xs text-[#185C7A] font-bold focus:outline-none"
              >
                <option value={0.8}>0.8x (بطيء للمبتدئين)</option>
                <option value={0.95}>1.0x (سرعة طبيعية)</option>
                <option value={1.2}>1.2x (سريع)</option>
              </select>
            </div>

            {/* Reading Status Display */}
            {isPlaying && (
              <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg text-[11px] font-bold animate-pulse">
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>جاري قراءة المقال باللغة {speechLang === 'ar' ? 'العربية' : 'السويدية'}...</span>
              </div>
            )}
          </div>
        </div>

        {/* Official Authority Source Box */}
        <div className="bg-[#185C7A]/5 border border-[#185C7A]/15 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#185C7A] text-[#F2C86B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#185C7A]">المصدر السويدي المعتمد لهذا المقال:</p>
              <p className="text-xs text-[#123B4A] font-semibold">{article.official_source_name}</p>
            </div>
          </div>

          <div className="text-end text-[11px] text-[#123B4A]/70">
            <p>آخر مراجعة وتحديث: <span className="font-bold text-[#185C7A]">{article.last_verified}</span></p>
            <a
              href={article.official_source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#2F8F83] font-bold hover:underline mt-1"
            >
              <span>زيارة الموقع الرسمي للجهة</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Key Takeaways Box */}
        {article.key_takeaways && article.key_takeaways.length > 0 && (
          <div className="bg-[#2F8F83]/10 border border-[#2F8F83]/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#185C7A] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2F8F83]" />
              <span>أهم النقاط الجوهرية التي ينبغي معرفتها:</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#123B4A] leading-relaxed">
              {article.key_takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F8F83] mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Content */}
        <div className="text-base sm:text-lg text-[#123B4A] leading-relaxed whitespace-pre-wrap space-y-4 font-normal">
          {article.content_ar || article.body_ar}
        </div>

        {/* Embedded School Diagram if article is school escalation */}
        {article.id === 'school-communication-guide' && (
          <div className="my-8">
            <SchoolHierarchyDiagram lang={lang} />
          </div>
        )}

        {/* Practical Steps Checklist */}
        {article.action_steps && article.action_steps.length > 0 && (
          <div className="bg-[#F7F5EF] border border-[#185C7A]/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#185C7A] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#185C7A]" />
              <span>خطوات عملية يُنصح باتباعها:</span>
            </h3>
            <ol className="space-y-2.5 text-xs text-[#123B4A]">
              {article.action_steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#185C7A] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            {onOpenTemplates && (
              <div className="pt-3 border-t border-[#185C7A]/10 text-end">
                <button
                  onClick={onOpenTemplates}
                  className="inline-flex items-center gap-1.5 bg-[#185C7A] hover:bg-[#124259] text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#F2C86B]" />
                  <span>تصفح الرسائل السويدية الجاهزة لهذا الموضوع</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Official Sources References */}
        {article.sources_references && article.sources_references.length > 0 && (
          <div className="border-t border-[#185C7A]/10 pt-4 space-y-2">
            <h4 className="text-xs font-bold text-[#185C7A]">المراجع والنصوص القانونية الرسمية:</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {article.sources_references.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-[#185C7A]/5 hover:bg-[#185C7A]/10 text-[#185C7A] px-3 py-1 rounded-lg border border-[#185C7A]/15 font-medium transition"
                >
                  <span>{src.title}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Helpful Feedback Widget */}
        <HelpfulFeedbackWidget
          itemId={`article-${article.id}`}
          itemTitle={article.title_ar}
          lang={lang}
        />

        {/* Social Sharing Widget Box */}
        <div className="bg-[#185C7A]/5 border border-[#185C7A]/20 rounded-2xl p-5 space-y-3 no-print">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-black text-[#185C7A] flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#2F8F83]" />
                <span>مشاركة هذا المقال الموثق مع العائلات والأصدقاء:</span>
              </h3>
              <p className="text-[11px] text-[#123B4A]/70 font-medium">
                ساهم في نشر المعرفة والوعي بالقوانين السويدية الأسرية المعتمدة.
              </p>
            </div>

            {copiedLink && (
              <span className="text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-lg font-bold flex items-center gap-1 animate-in fade-in duration-150">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>تم نسخ رابط المقال بنجاح!</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1 text-xs font-bold">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white py-2.5 px-3 rounded-xl transition shadow-2xs cursor-pointer"
              title="مشاركة عبر واتساب"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>واتساب</span>
            </button>

            {/* Facebook */}
            <button
              onClick={handleFacebookShare}
              className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1464cc] text-white py-2.5 px-3 rounded-xl transition shadow-2xs cursor-pointer"
              title="مشاركة عبر فيسبوك"
            >
              <Facebook className="w-4 h-4 fill-current" />
              <span>فيسبوك</span>
            </button>

            {/* Telegram */}
            <button
              onClick={handleTelegramShare}
              className="flex items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1b88bd] text-white py-2.5 px-3 rounded-xl transition shadow-2xs cursor-pointer"
              title="مشاركة عبر تيليجرام"
            >
              <Send className="w-4 h-4" />
              <span>تيليجرام</span>
            </button>

            {/* Email */}
            <button
              onClick={handleEmailShare}
              className="flex items-center justify-center gap-2 bg-[#185C7A] hover:bg-[#104359] text-white py-2.5 px-3 rounded-xl transition shadow-2xs cursor-pointer"
              title="إرسال عبر البريد الإلكتروني"
            >
              <Mail className="w-4 h-4" />
              <span>البريد</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 bg-white border border-[#185C7A]/25 hover:bg-[#F7F5EF] text-[#123B4A] py-2.5 px-3 rounded-xl transition shadow-2xs cursor-pointer"
              title="نسخ رابط المقال"
            >
              <Link2 className="w-4 h-4 text-[#185C7A]" />
              <span>{copiedLink ? 'تم النسخ' : 'نسخ الرابط'}</span>
            </button>
          </div>
        </div>

        {/* Disclaimer Banner at Bottom */}
        <DisclaimerBanner lang={lang} compact />
      </article>

      {/* Related Articles Grid */}
      {relatedArticles.length > 0 && (
        <div className="space-y-3 no-print">
          <h3 className="text-sm font-bold text-[#185C7A]">موضوعات ذات صلة:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map(rel => (
              <ArticleCard
                key={rel.id}
                article={rel}
                lang={lang}
                onSelect={onSelectArticle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
