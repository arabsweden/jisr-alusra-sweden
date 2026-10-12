import React, { useState } from 'react';
import { Language, Article } from '../types';
import { DataService } from '../services/dataService';
import {
  ShieldCheck,
  Download,
  Edit3,
  Plus,
  BookOpen,
  HeartHandshake,
  Bookmark,
  Save,
  X,
  Scale,
  FileSpreadsheet,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface Props {
  lang: Language;
}

export const AdminPage: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'surveys' | 'legal-feedback' | 'articles' | 'stats'>('surveys');
  const [articles, setArticles] = useState<Article[]>(DataService.getArticles());
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isNew, setIsNew] = useState(false);

  const surveys = DataService.getSurveySubmissions();
  const faqs = DataService.getFaqs();
  const faqFeedback = DataService.getFaqFeedback();
  const bookmarksCount = DataService.getBookmarks().length;

  // Feedback Metrics Calculation
  const feedbackValues = Object.values(faqFeedback);
  const positiveVotes = feedbackValues.filter(v => v === 'yes').length;
  const negativeVotes = feedbackValues.filter(v => v === 'no').length;
  const totalVotes = feedbackValues.length;
  const positiveRatio = totalVotes > 0 ? Math.round((positiveVotes / totalVotes) * 100) : 100;

  const handleExportSurveysCSV = () => {
    const csvContent = DataService.exportSurveysToCSV();
    if (!csvContent) {
      alert('لا توجد بيانات استبيان للتصدير حالياً.');
      return;
    }
    DataService.downloadCSV(`familjebron_surveys_${Date.now()}.csv`, csvContent);
  };

  const handleExportFaqFeedbackCSV = () => {
    const csvContent = DataService.exportFaqFeedbackToCSV();
    if (!csvContent) {
      alert('لا توجد تقييمات مجمعة حالياً.');
      return;
    }
    DataService.downloadCSV(`familjebron_legal_evaluations_${Date.now()}.csv`, csvContent);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    DataService.saveArticle(editingArticle);
    setArticles(DataService.getArticles());
    setEditingArticle(null);
    alert('تم حفظ المقال بنجاح!');
  };

  const createBlankArticle = (): Article => ({
    id: 'art-' + Date.now(),
    slug: 'new-article-' + Date.now(),
    category: 'school',
    title_ar: 'عنوان جديد بالعربية',
    title_sv: 'Ny rubrik på svenska',
    summary_ar: 'ملخص المقال بالعربية...',
    summary_sv: 'Sammanfattning...',
    content_ar: 'محتوى النص الكامل للمقال هنا...',
    content_sv: 'Innehåll...',
    official_source_name: 'Skolverket',
    official_source_url: 'https://www.skolverket.se',
    last_verified: '2026-03-20',
    read_time_min: 5,
    is_demo: true,
    key_takeaways: ['نقطة أساسية 1', 'نقطة أساسية 2'],
    action_steps: ['خطوة عملية 1']
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Header */}
      <div className="bg-[#123B4A] text-white p-8 rounded-3xl shadow-md space-y-4 relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>لوحة التحكم والإدارة (Admin Dashboard Structure)</span>
          </div>
          <span className="bg-[#2F8F83] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            إدارة المحتوى وتصدير البيانات
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black">
              لوحة إدارة جسر الأسرة في السويد
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              هيكل إداري متكامل لمتابعة إحصائيات الاستبيان الوطني، تقييمات التوضيحات القانونية، وإدارة المحتوى المعرفي.
            </p>
          </div>

          {/* Header Action Buttons for CSV Downloads */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportSurveysCSV}
              className="flex items-center gap-1.5 bg-[#2F8F83] hover:bg-[#236e65] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer border border-white/10"
              title="تصدير نتائج الاستبيان الوطني إلى CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#F2C86B]" />
              <span>تصدير الاستبيانات (CSV)</span>
            </button>

            <button
              onClick={handleExportFaqFeedbackCSV}
              className="flex items-center gap-1.5 bg-[#185C7A] hover:bg-[#104359] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer border border-white/20"
              title="تصدير تقييمات الأسئلة والإجابات القانونية إلى CSV"
            >
              <Download className="w-4 h-4 text-[#F2C86B]" />
              <span>تصدير التقييمات القانونية (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#185C7A]/20 pb-2 text-xs font-bold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('surveys')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
            activeTab === 'surveys'
              ? 'bg-[#185C7A] text-white shadow-xs'
              : 'bg-white text-[#123B4A] hover:bg-gray-100'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-[#F2C86B]" />
          <span>إجابات الاستبيان ({surveys.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('legal-feedback')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
            activeTab === 'legal-feedback'
              ? 'bg-[#185C7A] text-white shadow-xs'
              : 'bg-white text-[#123B4A] hover:bg-gray-100'
          }`}
        >
          <Scale className="w-4 h-4 text-[#F2C86B]" />
          <span>تقييمات التوضيحات القانونية ({faqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
            activeTab === 'articles'
              ? 'bg-[#185C7A] text-white shadow-xs'
              : 'bg-white text-[#123B4A] hover:bg-gray-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#F2C86B]" />
          <span>المقالات والمحتوى ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
            activeTab === 'stats'
              ? 'bg-[#185C7A] text-white shadow-xs'
              : 'bg-white text-[#123B4A] hover:bg-gray-100'
          }`}
        >
          <Bookmark className="w-4 h-4 text-[#F2C86B]" />
          <span>الإحصائيات والتقارير</span>
        </button>
      </div>

      {/* Tab 1: Surveys View & Export CSV */}
      {activeTab === 'surveys' && (
        <div className="bg-white rounded-2xl p-6 border border-[#185C7A]/20 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#185C7A]">نتائج الاستبيان الوطني المستلمة</h2>
              <p className="text-xs text-[#123B4A]/70">تصدير كافة البيانات المجمعة مجهولة الهوية لتحليل الاحتياجات وتحديد الأولويات.</p>
            </div>

            <button
              onClick={handleExportSurveysCSV}
              className="flex items-center gap-2 bg-[#2F8F83] hover:bg-[#236e65] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#F2C86B]" />
              <span>تصدير ملف CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#185C7A]/15 rounded-xl">
            <table className="w-full text-start text-xs dir-rtl">
              <thead className="bg-[#185C7A] text-white font-bold">
                <tr>
                  <th className="p-3 text-start">التاريخ</th>
                  <th className="p-3 text-start">الفئة العمرية</th>
                  <th className="p-3 text-start">الدور</th>
                  <th className="p-3 text-start">مدة الإقامة</th>
                  <th className="p-3 text-start">الموضوعات المطلوبة</th>
                  <th className="p-3 text-start">مستوى فهم السوسيال</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-[#123B4A]">
                {surveys.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono text-[10px] text-gray-500">{new Date(s.timestamp).toLocaleDateString()}</td>
                    <td className="p-3 font-semibold">{s.age_group || 'غير محدد'}</td>
                    <td className="p-3">{s.family_role || 'غير محدد'}</td>
                    <td className="p-3">{s.residence_duration || 'غير محدد'}</td>
                    <td className="p-3">{(s.needed_topics || []).join('، ')}</td>
                    <td className="p-3 max-w-xs truncate">{s.social_services_understanding || 'غير محدد'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Legal FAQ Feedback & CSV Export */}
      {activeTab === 'legal-feedback' && (
        <div className="space-y-5">
          {/* Metrics summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#185C7A]/15 space-y-1">
              <div className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#185C7A]" />
                <span>إجمالي الأسئلة القانونية</span>
              </div>
              <div className="text-2xl font-black text-[#185C7A]">{faqs.length}</div>
              <p className="text-[10px] text-gray-400">سؤال موثق بمرجع رسمي</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200 space-y-1 bg-emerald-50/20">
              <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4 text-emerald-600" />
                <span>التقييمات الإيجابية ("مفيد")</span>
              </div>
              <div className="text-2xl font-black text-emerald-700">{positiveVotes}</div>
              <p className="text-[10px] text-emerald-600">إجابة توضيحية مفيدة</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-rose-200 space-y-1 bg-rose-50/20">
              <div className="text-[11px] font-bold text-rose-800 flex items-center gap-1.5">
                <ThumbsDown className="w-4 h-4 text-rose-600" />
                <span>ملاحظات تحتاج توضيح</span>
              </div>
              <div className="text-2xl font-black text-rose-700">{negativeVotes}</div>
              <p className="text-[10px] text-rose-600">طلب إضافة تفاصيل أكثر</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#185C7A]/15 space-y-1">
              <div className="text-[11px] font-bold text-[#2F8F83] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2F8F83]" />
                <span>نسبة الرضا عن المحتوى</span>
              </div>
              <div className="text-2xl font-black text-[#2F8F83]">{positiveRatio}%</div>
              <p className="text-[10px] text-gray-500">من إجمالي الأصوات المجمعة</p>
            </div>
          </div>

          {/* Legal FAQ Evaluation Table & CSV Button */}
          <div className="bg-white rounded-2xl p-6 border border-[#185C7A]/20 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[#185C7A]">تقرير التقييمات والآراء حول الإجابات القانونية</h2>
                <p className="text-xs text-[#123B4A]/70">تصدير تقرير CSV شامل لاستجابات المستخدمين حول فائدة التوضيحات التشريعية.</p>
              </div>

              <button
                onClick={handleExportFaqFeedbackCSV}
                className="flex items-center gap-2 bg-[#185C7A] hover:bg-[#104359] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#F2C86B]" />
                <span>تصدير تقرير التقييمات (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-[#185C7A]/15 rounded-xl">
              <table className="w-full text-start text-xs dir-rtl">
                <thead className="bg-[#185C7A] text-white font-bold">
                  <tr>
                    <th className="p-3 text-start">الرمز</th>
                    <th className="p-3 text-start">السؤال القانوني</th>
                    <th className="p-3 text-start">الموضوع القانوني</th>
                    <th className="p-3 text-start">الجهة المدققة</th>
                    <th className="p-3 text-start">تاريخ المراجعة</th>
                    <th className="p-3 text-center">تقييم المساعدة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[#123B4A]">
                  {faqs.map((faq) => {
                    const vote = faqFeedback[faq.id];
                    return (
                      <tr key={faq.id} className="hover:bg-gray-50">
                        <td className="p-3 font-mono text-[10px] text-gray-500">{faq.id}</td>
                        <td className="p-3 font-bold text-[#185C7A] max-w-sm">{faq.question_ar}</td>
                        <td className="p-3 font-semibold text-[#2F8F83]">{faq.legal_topic_ar || 'عام'}</td>
                        <td className="p-3 font-medium">{faq.verified_by || faq.official_source_name}</td>
                        <td className="p-3 text-gray-500 font-mono text-[10px]">{faq.last_reviewed_date || 'غير محدد'}</td>
                        <td className="p-3 text-center">
                          {vote === 'yes' && (
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                              <ThumbsUp className="w-3 h-3 text-emerald-600" />
                              <span>مفيد جداً</span>
                            </span>
                          )}
                          {vote === 'no' && (
                            <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-rose-300">
                              <ThumbsDown className="w-3 h-3 text-rose-600" />
                              <span>يحتاج توضيح</span>
                            </span>
                          )}
                          {!vote && (
                            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                              لم يتم التقييم
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Articles List & CRUD */}
      {activeTab === 'articles' && (
        <div className="bg-white rounded-2xl p-6 border border-[#185C7A]/20 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#185C7A]">إدارة وقواعد بيانات المقالات</h2>

            <button
              onClick={() => {
                setEditingArticle(createBlankArticle());
                setIsNew(true);
              }}
              className="flex items-center gap-1.5 bg-[#185C7A] hover:bg-[#124259] text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#F2C86B]" />
              <span>إضافة مقال جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((art) => (
              <div key={art.id} className="p-4 rounded-xl border border-[#185C7A]/15 bg-[#F7F5EF] flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold bg-[#185C7A]/10 text-[#185C7A] px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <h3 className="text-xs font-bold text-[#185C7A]">{art.title_ar}</h3>
                  <p className="text-[11px] text-[#2F8F83] font-medium">{art.title_sv}</p>
                  <p className="text-[10px] text-gray-500">المصدر: {art.official_source_name}</p>
                </div>

                <button
                  onClick={() => {
                    setEditingArticle(art);
                    setIsNew(false);
                  }}
                  className="p-2 bg-white hover:bg-gray-100 rounded-lg border border-[#185C7A]/20 text-[#185C7A] transition cursor-pointer"
                  title="تعديل المقال"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: System Overview Stats */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-[#185C7A]/15 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-[#185C7A] mx-auto" />
              <span className="text-2xl font-black text-[#185C7A]">{articles.length}</span>
              <p className="text-xs text-[#123B4A]/70 font-semibold">مقال متاح بالدليل</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#185C7A]/15 text-center space-y-2">
              <HeartHandshake className="w-8 h-8 text-[#2F8F83] mx-auto" />
              <span className="text-2xl font-black text-[#2F8F83]">{surveys.length}</span>
              <p className="text-xs text-[#123B4A]/70 font-semibold">مشاركة استبيانية مستلمة</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#185C7A]/15 text-center space-y-2">
              <Scale className="w-8 h-8 text-[#185C7A] mx-auto" />
              <span className="text-2xl font-black text-[#185C7A]">{faqs.length}</span>
              <p className="text-xs text-[#123B4A]/70 font-semibold">توضيح قانوني مدقق</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#185C7A]/15 text-center space-y-2">
              <Bookmark className="w-8 h-8 text-[#F2C86B] mx-auto" />
              <span className="text-2xl font-black text-[#123B4A]">{bookmarksCount}</span>
              <p className="text-xs text-[#123B4A]/70 font-semibold">عناصر محفوظة بالمفضلة</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#185C7A]/20 space-y-4">
            <h3 className="text-sm font-bold text-[#185C7A]">تصدير التقارير الإدارية بضغطة زر</h3>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportSurveysCSV}
                className="flex items-center gap-2 bg-[#2F8F83] hover:bg-[#236e65] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#F2C86B]" />
                <span>تصدير نتائج الاستبيانات (CSV)</span>
              </button>

              <button
                onClick={handleExportFaqFeedbackCSV}
                className="flex items-center gap-2 bg-[#185C7A] hover:bg-[#104359] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#F2C86B]" />
                <span>تصدير تقييمات التوضيحات القانونية (CSV)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#185C7A]/20 shadow-2xl p-6 relative">
            <button
              onClick={() => setEditingArticle(null)}
              className="absolute top-4 end-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#123B4A] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-[#185C7A] mb-4">
              {isNew ? 'إضافة مقال جديد' : 'تعديل المقال المعرفي'}
            </h2>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#123B4A] mb-1">العنوان بالعربية:</label>
                <input
                  type="text"
                  value={editingArticle.title_ar}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title_ar: e.target.value })}
                  className="w-full border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#123B4A] mb-1">العنوان بالسويدية:</label>
                <input
                  type="text"
                  value={editingArticle.title_sv}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title_sv: e.target.value })}
                  className="w-full border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#123B4A] mb-1">الملخص بالعربية:</label>
                <textarea
                  rows={2}
                  value={editingArticle.summary_ar}
                  onChange={(e) => setEditingArticle({ ...editingArticle, summary_ar: e.target.value })}
                  className="w-full border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#123B4A] mb-1">النص الكامل بالعربية:</label>
                <textarea
                  rows={6}
                  value={editingArticle.content_ar}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content_ar: e.target.value })}
                  className="w-full border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#123B4A] mb-1">المصدر الرسمي:</label>
                  <input
                    type="text"
                    value={editingArticle.official_source_name}
                    onChange={(e) => setEditingArticle({ ...editingArticle, official_source_name: e.target.value })}
                    className="w-full border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#123B4A] mb-1">تاريخ المراجعة:</label>
                  <input
                    type="text"
                    value={editingArticle.last_verified}
                    onChange={(e) => setEditingArticle({ ...editingArticle, last_verified: e.target.value })}
                    className="w-full border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#185C7A]/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#123B4A] font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#185C7A] hover:bg-[#124259] text-white font-bold cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#F2C86B]" />
                  <span>حفظ التغييرات</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
