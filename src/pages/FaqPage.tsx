import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Language, FaqItem } from '../types';
import { DataService } from '../services/dataService';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { HelpfulFeedbackWidget } from '../components/HelpfulFeedbackWidget';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  Gavel,
  ExternalLink, 
  FileText, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Coins, 
  Sparkles,
  MessageSquare,
  Link2,
  Check,
  Building2,
  Calendar,
  Filter,
  CheckCircle2,
  Tag,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface Props {
  lang: Language;
  onSelectTemplate?: (templateId: string) => void;
  onOpenAssistant?: () => void;
}

export const FaqPage: React.FC<Props> = ({ lang, onSelectTemplate, onOpenAssistant }) => {
  const allFaqs = useMemo(() => DataService.getFaqs(), []);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLegalTopic, setSelectedLegalTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(allFaqs[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [faqFeedback, setFaqFeedback] = useState<Record<string, 'yes' | 'no'>>(() => DataService.getFaqFeedback());

  const handleFeedback = (faqId: string, value: 'yes' | 'no') => {
    const updated = DataService.recordFaqFeedback(faqId, value);
    setFaqFeedback({ ...updated });
  };

  // Extract unique legal topics from FAQs
  const legalTopics = useMemo(() => {
    const topicsMap = new Map<string, string>();
    allFaqs.forEach(faq => {
      if (faq.legal_topic_ar) {
        topicsMap.set(faq.legal_topic_ar, faq.legal_topic_ar);
      }
    });
    return Array.from(topicsMap.keys());
  }, [allFaqs]);

  // Auto-expand question if hash exists in URL on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = allFaqs.find(f => f.id === hash);
      if (match) {
        setExpandedId(match.id);
        setSelectedCategory(match.category);
        if (match.legal_topic_ar) {
          setSelectedLegalTopic(match.legal_topic_ar);
        }
        const el = document.getElementById(match.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [allFaqs]);

  // Filter logic
  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const categoryMatch = selectedCategory === 'all' || faq.category === selectedCategory;
      const topicMatch = selectedLegalTopic === 'all' || faq.legal_topic_ar === selectedLegalTopic;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return categoryMatch && topicMatch;

      const textToSearch = [
        faq.question_ar,
        faq.question_sv,
        faq.answer_ar,
        faq.answer_sv,
        faq.legal_reference_ar || '',
        faq.legal_reference_sv || '',
        faq.official_source_name || '',
        faq.verified_by || '',
        faq.legal_topic_ar || '',
        faq.legal_topic_sv || '',
        ...(faq.tags || [])
      ].join(' ').toLowerCase();

      return categoryMatch && topicMatch && textToSearch.includes(q);
    });
  }, [allFaqs, selectedCategory, selectedLegalTopic, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const copyDirectLink = (e: React.MouseEvent, faqId: string) => {
    e.stopPropagation();
    const directUrl = `${window.location.origin}${window.location.pathname}#${faqId}`;
    navigator.clipboard.writeText(directUrl);
    setCopiedId(faqId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedLegalTopic('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-8 pb-12">
      <Helmet>
        <title>الأسئلة الشائعة والقوانين | جسر الأسرة السويدية</title>
        <meta name="description" content="إجابات قانونية موثقة ومجابة ومرفقة بتاريخ التدقيق والجهات المعتمدة في القوانين السويدية الأسرية، المدارس، السوسيال، والحضانة." />
      </Helmet>

      {/* Header Banner matching "Natural Tones" palette */}
      <div className="bg-[#185C7A] text-white p-8 rounded-3xl shadow-md space-y-4 relative overflow-hidden">
        <div className="absolute -top-10 -end-10 w-48 h-48 bg-[#2F8F83]/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -start-10 w-48 h-48 bg-[#F2C86B]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs">
            <Scale className="w-4.5 h-4.5" />
            <span>الأسئلة الشائعة والقوانين السويدية الأسرية</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            الأسئلة الشائعة وإجاباتها ضمن القانون السويدي
          </h1>

          <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
            إجابات رصينة ودقيقة على أكثر التساؤلات شيوعاً بين الأسر العربية المقيمة في السويد، مستندة حصرياً للمصادر الموثوقة والمحاكم السويدية (Sveriges Domstolar، Skolverket، Socialstyrelsen، Försäkringskassan).
          </p>
        </div>
      </div>

      <DisclaimerBanner lang={lang} />

      {/* Search and Legal Topic Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#185C7A]/20 shadow-xs space-y-5">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#185C7A] absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالنص أو المرجع القانوني (مثال: محكمة، Sveriges Domstolar، Skollagen، LVU، الحضانة...)"
            className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl ps-11 pe-4 py-3 text-xs sm:text-sm text-[#123B4A] focus:outline-none focus:ring-2 focus:ring-[#185C7A] font-medium"
          />
        </div>

        {/* Legal Topics Specific Filter Row */}
        <div className="space-y-2 pt-1 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-[#185C7A] flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#2F8F83]" />
              <span>تصفية مخصصة حسب الموضوع القانوني:</span>
            </label>
            {(selectedCategory !== 'all' || selectedLegalTopic !== 'all' || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-[#2F8F83] hover:underline cursor-pointer"
              >
                إعادة ضبط التصفيات
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold no-scrollbar">
            <button
              onClick={() => setSelectedLegalTopic('all')}
              className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap cursor-pointer border ${
                selectedLegalTopic === 'all'
                  ? 'bg-[#2F8F83] text-white border-[#2F8F83] shadow-2xs'
                  : 'bg-gray-50 text-[#123B4A] border-gray-200 hover:bg-gray-100'
              }`}
            >
              جميع المواضيع القانونية
            </button>

            {legalTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedLegalTopic(topic)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition whitespace-nowrap cursor-pointer border ${
                  selectedLegalTopic === topic
                    ? 'bg-[#2F8F83] text-white border-[#2F8F83] shadow-2xs'
                    : 'bg-gray-50 text-[#123B4A] border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Tag className="w-3 h-3 opacity-80" />
                <span>{topic}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="space-y-2 pt-1 border-t border-gray-100">
          <div className="text-[11px] font-extrabold text-[#123B4A]/70">
            القطاع الحكومي والجهة المعنية:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full transition whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#185C7A] text-white shadow-xs'
                  : 'bg-[#F7F5EF] text-[#123B4A] hover:bg-gray-200'
              }`}
            >
              جميع القطاعات ({allFaqs.length})
            </button>

            <button
              onClick={() => setSelectedCategory('courts')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition whitespace-nowrap cursor-pointer ${
                selectedCategory === 'courts'
                  ? 'bg-[#185C7A] text-white shadow-xs'
                  : 'bg-[#F7F5EF] text-[#123B4A] hover:bg-gray-200'
              }`}
            >
              <Gavel className="w-4 h-4 text-[#F2C86B]" />
              <span>المحاكم والعدالة (Sveriges Domstolar)</span>
            </button>

            <button
              onClick={() => setSelectedCategory('school')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition whitespace-nowrap cursor-pointer ${
                selectedCategory === 'school'
                  ? 'bg-[#185C7A] text-white shadow-xs'
                  : 'bg-[#F7F5EF] text-[#123B4A] hover:bg-gray-200'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-[#2F8F83]" />
              <span>التعليم والمدارس (Skollagen)</span>
            </button>

            <button
              onClick={() => setSelectedCategory('social-services')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition whitespace-nowrap cursor-pointer ${
                selectedCategory === 'social-services'
                  ? 'bg-[#185C7A] text-white shadow-xs'
                  : 'bg-[#F7F5EF] text-[#123B4A] hover:bg-gray-200'
              }`}
            >
              <Users className="w-4 h-4 text-[#2F8F83]" />
              <span>الخدمات الاجتماعية (SoL & LVU)</span>
            </button>

            <button
              onClick={() => setSelectedCategory('rights')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition whitespace-nowrap cursor-pointer ${
                selectedCategory === 'rights'
                  ? 'bg-[#185C7A] text-white shadow-xs'
                  : 'bg-[#F7F5EF] text-[#123B4A] hover:bg-gray-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#2F8F83]" />
              <span>الحضانة وحقوق الطفل</span>
            </button>

            <button
              onClick={() => setSelectedCategory('benefits')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition whitespace-nowrap cursor-pointer ${
                selectedCategory === 'benefits'
                  ? 'bg-[#185C7A] text-white shadow-xs'
                  : 'bg-[#F7F5EF] text-[#123B4A] hover:bg-gray-200'
              }`}
            >
              <Coins className="w-4 h-4 text-[#F2C86B]" />
              <span>التأمينات وإجازة الوالدين</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Summary Bar if filters active */}
      {(selectedLegalTopic !== 'all' || selectedCategory !== 'all' || searchQuery) && (
        <div className="bg-[#2F8F83]/10 border border-[#2F8F83]/20 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-bold text-[#185C7A]">
          <div className="flex flex-wrap items-center gap-2">
            <span>نتائج البحث والتصفية:</span>
            <span className="bg-[#185C7A] text-white px-2 py-0.5 rounded-full text-[11px]">
              {filteredFaqs.length} سؤال موثق
            </span>
            {selectedLegalTopic !== 'all' && (
              <span className="bg-[#2F8F83] text-white px-2 py-0.5 rounded-md text-[11px]">
                الموضوع: {selectedLegalTopic}
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="bg-[#123B4A] text-white px-2 py-0.5 rounded-md text-[11px]">
                القطاع: {selectedCategory}
              </span>
            )}
          </div>

          <button
            onClick={resetFilters}
            className="text-[#2F8F83] hover:underline cursor-pointer shrink-0 font-extrabold"
          >
            مسح التصفيات
          </button>
        </div>
      )}

      {/* FAQ Items Accordion Grid */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-[#185C7A]/15 text-center space-y-3">
            <HelpCircle className="w-12 h-12 text-[#185C7A]/40 mx-auto" />
            <h3 className="text-base font-bold text-[#185C7A]">لم نجد سؤالاً يطابق بحثك حالياً</h3>
            <p className="text-xs text-[#123B4A]/70 max-w-md mx-auto">
              يمكنك كتابة سؤالك مباشرة لمساعدنا الذكي المستند حصرياً للقوانين والجهات الرسمية السويدية.
            </p>
            {onOpenAssistant && (
              <button
                onClick={onOpenAssistant}
                className="inline-flex items-center gap-2 bg-[#185C7A] hover:bg-[#124259] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-xs mt-2"
              >
                <Sparkles className="w-4 h-4 text-[#F2C86B]" />
                <span>طرح السؤال على المساعد الذكي</span>
              </button>
            )}
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            const isCourtFaq = faq.category === 'courts' || faq.official_source_url?.includes('domstol.se');

            return (
              <div
                key={faq.id}
                id={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs ${
                  isExpanded
                    ? 'border-[#185C7A] shadow-md ring-1 ring-[#185C7A]/20'
                    : 'border-[#185C7A]/15 hover:border-[#185C7A]/40'
                }`}
              >
                {/* Header Question Bar */}
                <div
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full text-start p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Court / Category Tag */}
                      {isCourtFaq ? (
                        <span className="bg-[#F2C86B]/30 text-[#123B4A] text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#F2C86B]/50">
                          <Gavel className="w-3 h-3 text-[#185C7A]" />
                          <span>المحاكم والعدالة - Sveriges Domstolar</span>
                        </span>
                      ) : (
                        <span className="bg-[#185C7A]/10 text-[#185C7A] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {faq.category === 'school' && 'التعليم والمدارس'}
                          {faq.category === 'social-services' && 'الخدمات الاجتماعية'}
                          {faq.category === 'rights' && 'الحضانة والأنظمة الأسرية'}
                          {faq.category === 'benefits' && 'التأمينات الاجتماعية'}
                          {faq.category === 'general' && 'عام ومجتمعي'}
                        </span>
                      )}

                      {/* Legal Topic Tag */}
                      {faq.legal_topic_ar && (
                        <span className="bg-[#185C7A]/5 text-[#185C7A] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#185C7A]/15">
                          <Tag className="w-3 h-3 text-[#2F8F83]" />
                          <span>{faq.legal_topic_ar}</span>
                        </span>
                      )}

                      {/* Legal Reference Tag */}
                      {faq.legal_reference_ar && (
                        <span className="bg-[#2F8F83]/10 text-[#2F8F83] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Scale className="w-3 h-3" />
                          <span>{faq.legal_reference_sv || faq.legal_reference_ar}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-[#185C7A] leading-snug">
                      {lang === 'ar' ? faq.question_ar : faq.question_sv}
                    </h3>

                    {/* Prominent Verification Badge in Header */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                      <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 font-extrabold px-3 py-1 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>تم التدقيق بواسطة: <span className="text-[#185C7A] font-black">{faq.verified_by || faq.official_source_name}</span></span>
                      </div>

                      {faq.last_reviewed_date && (
                        <div className="inline-flex items-center gap-1 text-gray-500 font-bold">
                          <Calendar className="w-3.5 h-3.5 text-[#2F8F83]" />
                          <span>تاريخ آخر مراجعة: <strong className="text-[#123B4A]">{faq.last_reviewed_date}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Direct Link Share/Copy Button */}
                    <button
                      onClick={(e) => copyDirectLink(e, faq.id)}
                      title="نسخ رابط الإجابة القانونية المباشر"
                      className="p-2 rounded-xl bg-gray-100 hover:bg-[#185C7A]/10 text-[#185C7A] transition cursor-pointer"
                    >
                      {copiedId === faq.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Link2 className="w-4 h-4" />
                      )}
                    </button>

                    <div className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-[#185C7A] text-white' : 'bg-gray-100 text-[#185C7A]'}`}>
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Answer Content Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-3 border-t border-[#185C7A]/10 space-y-4 bg-[#F7F5EF]/40 animate-in fade-in duration-200">
                    {copiedId === faq.id && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 font-bold animate-in fade-in duration-150">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>تم نسخ رابط الإجابة القانونية المباشر للحافظة بنجاح!</span>
                      </div>
                    )}

                    {/* Official Verification Banner inside Q&A block */}
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-emerald-900 font-extrabold">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>معلومات قانونية مدققة ومطابقة لأحدث التشريعات السويدية</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-[11px] font-bold">
                        <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">
                          الجهة المدققة: {faq.verified_by || faq.official_source_name}
                        </span>
                        {faq.last_reviewed_date && (
                          <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#185C7A]" />
                            <span>مراجعة: {faq.last_reviewed_date}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold text-[#2F8F83] uppercase tracking-wider">
                        الإجابة والتوضيح القانوني المعتمد:
                      </h4>
                      <p className="text-base sm:text-lg text-[#123B4A] leading-relaxed font-normal">
                        {lang === 'ar' ? faq.answer_ar : faq.answer_sv}
                      </p>
                    </div>

                    {/* Legal Reference & Official Source Metadata Box */}
                    <div className="bg-white p-4 rounded-xl border border-[#185C7A]/15 space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2 text-[#185C7A] font-bold">
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-[#2F8F83]" />
                          <span>المرجع القانوني السويدي الرسمي:</span>
                        </div>
                        {faq.legal_topic_ar && (
                          <span className="text-[11px] bg-[#185C7A]/10 text-[#185C7A] px-2 py-0.5 rounded-md">
                            الموضوع: {faq.legal_topic_ar}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#123B4A]/80 font-medium">
                        {faq.legal_reference_ar} ({faq.legal_reference_sv})
                      </p>

                      {faq.official_source_url && (
                        <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] text-gray-600 font-bold flex items-center gap-1.5">
                            {isCourtFaq ? (
                              <Building2 className="w-3.5 h-3.5 text-[#185C7A]" />
                            ) : (
                              <Building2 className="w-3.5 h-3.5 text-[#2F8F83]" />
                            )}
                            <span>المصدر الحكومي المعتمد: {faq.official_source_name}</span>
                          </span>

                          <a
                            href={faq.official_source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#185C7A]/5 hover:bg-[#185C7A]/10 text-[#185C7A] hover:text-[#124259] px-3 py-1.5 rounded-lg font-bold text-xs transition border border-[#185C7A]/15"
                          >
                            <span>فتح المادة من {isCourtFaq ? 'Sveriges Domstolar' : 'المصدر الرسمي'}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#F2C86B]" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Related Practical Template CTA */}
                    {faq.related_template_id && onSelectTemplate && (
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 bg-white/60 p-3 rounded-xl border border-[#2F8F83]/20">
                        <span className="text-xs text-[#2F8F83] font-bold flex items-center gap-1.5">
                          <FileText className="w-4 h-4" />
                          <span>يتوفر نموذج رسالة سويدية جاهز لهذه الحالة</span>
                        </span>

                        <button
                          onClick={() => onSelectTemplate(faq.related_template_id!)}
                          className="bg-[#185C7A] hover:bg-[#124259] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>فتح النموذج الجاهز للنسخ</span>
                        </button>
                      </div>
                    )}

                    {/* Helpfulness Feedback Widget */}
                    <HelpfulFeedbackWidget
                      itemId={`faq-${faq.id}`}
                      itemTitle={faq.question_ar}
                      lang={lang}
                      compact
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* AI Assistant Help Banner */}
      <div className="bg-gradient-to-r from-[#185C7A] to-[#2F8F83] text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-start">
          <h3 className="text-base font-bold flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-5 h-5 text-[#F2C86B]" />
            <span>لديك سؤال قانوني لم تجده في القائمة؟</span>
          </h3>
          <p className="text-xs text-white/90">
            يمكنك توجيه استفسارك مباشرة للمساعد الذكي الموثق وفق قوانين السويد والحصول على توضيح فوري.
          </p>
        </div>

        {onOpenAssistant && (
          <button
            onClick={onOpenAssistant}
            className="bg-[#F2C86B] hover:bg-[#e0b85a] text-[#123B4A] px-5 py-2.5 rounded-xl font-extrabold text-xs transition shrink-0 cursor-pointer shadow-sm flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>اسأل المساعد الذكي الآن</span>
          </button>
        )}
      </div>
    </div>
  );
};

