import Papa from 'papaparse';
import { Article, PracticalTemplate, SurveyResponse, OfficialSource, Quiz, FaqItem } from '../types';
import { articles as initialArticles } from '../data/articles';
import { officialSources as initialSources } from '../data/officialSources';
import { practicalTemplates as initialTemplates } from '../data/templates';
import { quizzes as initialQuizzes } from '../data/quizzes';
import { faqs as initialFaqs } from '../data/faqs';

const BOOKMARKS_STORAGE_KEY = 'familjebron_bookmarks_v1';
const SURVEYS_STORAGE_KEY = 'familjebron_surveys_v1';
const ARTICLES_STORAGE_KEY = 'familjebron_articles_v1';

// Initial dummy survey responses for admin demonstration
const initialSurveyResponses: SurveyResponse[] = [
  {
    id: 'surv-1',
    timestamp: '2026-03-10T10:30:00Z',
    age_group: '30-45 سنة',
    family_role: 'أم / أمومة',
    residence_duration: '3-5 سنوات',
    preferred_lang: 'العربية',
    municipality_optional: 'Stockholm',
    needed_topics: ['الأسرة والمدرسة', 'الخدمات الاجتماعية – السوسيال'],
    school_challenges: 'صعوبة فهم تقارير التقويم والتواصل مع معلمين المدرسة بلغة غير السويدية',
    social_services_understanding: 'فهم جزئي يحتاج إلى المزيد من التوضيح والتطمينات',
    family_topics_needed: ['التربية الإيجابية', 'التعامل مع مراهقة الأطفال'],
    preferred_format: ['مقالات مكتوبة', 'نماذج ورسائل جاهزة'],
    user_suggestions: 'نتمنى إضافة مقاطع فيديو توضيحية قصيرة تشرح خطوات اجتماعات المدرسة.',
    consent_given: true
  },
  {
    id: 'surv-2',
    timestamp: '2026-03-12T14:15:00Z',
    age_group: '46-60 سنة',
    family_role: 'أب / أبوه',
    residence_duration: 'أكثر من 5 سنوات',
    preferred_lang: 'العربية والسويدية',
    municipality_optional: 'Göteborg',
    needed_topics: ['حقوق الطفل', 'القوانين والحقوق الأسرية'],
    school_challenges: 'متابعة الحضور والغياب وعلاج حالات التنمر في ساحة الاستراحة',
    social_services_understanding: 'فهم متوسط لحقوق الوالدين في طلب مترجم',
    family_topics_needed: ['الحضانة والانفصال', 'إجازة الوالدين'],
    preferred_format: ['نماذج ورسائل جاهزة', 'مساعد ذكي'],
    user_suggestions: 'تطبيق رائع جداً ومهم لكل العائلات.',
    consent_given: true
  }
];

export class DataService {
  // Articles
  static getArticles(): Article[] {
    try {
      const stored = localStorage.getItem(ARTICLES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage not available, falling back to initial data');
    }
    return initialArticles;
  }

  static getArticleBySlug(slug: string): Article | undefined {
    return this.getArticles().find(a => a.slug === slug || a.id === slug);
  }

  static getArticlesByCategory(categorySlug: string): Article[] {
    return this.getArticles().filter(a => a.category === categorySlug);
  }

  static saveArticle(article: Article): Article {
    const current = this.getArticles();
    const index = current.findIndex(a => a.id === article.id);
    let updated: Article[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = article;
    } else {
      updated = [article, ...current];
    }
    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save article to localStorage', e);
    }
    return article;
  }

  // Official Sources
  static getOfficialSources(): OfficialSource[] {
    return initialSources;
  }

  // Templates
  static getTemplates(): PracticalTemplate[] {
    return initialTemplates;
  }

  static getTemplateBySlug(slug: string): PracticalTemplate | undefined {
    return initialTemplates.find(t => t.slug === slug || t.id === slug);
  }

  // Quizzes
  static getQuizzes(): Quiz[] {
    return initialQuizzes;
  }

  static getQuizBySlug(slug: string): Quiz | undefined {
    return initialQuizzes.find(q => q.slug === slug || q.id === slug);
  }

  // FAQs
  static getFaqs(): FaqItem[] {
    return initialFaqs;
  }

  static getFaqsByCategory(category: string): FaqItem[] {
    if (category === 'all') return initialFaqs;
    return initialFaqs.filter(f => f.category === category);
  }

  // FAQ Feedback
  static getFaqFeedback(): Record<string, 'yes' | 'no'> {
    try {
      const stored = localStorage.getItem('familjebron_faq_feedback_v1');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  static recordFaqFeedback(faqId: string, feedback: 'yes' | 'no'): Record<string, 'yes' | 'no'> {
    const current = this.getFaqFeedback();
    current[faqId] = feedback;
    try {
      localStorage.setItem('familjebron_faq_feedback_v1', JSON.stringify(current));
    } catch (e) {
      console.error('Failed to store FAQ feedback', e);
    }
    return current;
  }

  // Bookmarks
  static getBookmarks(): string[] {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  static toggleBookmark(articleId: string): boolean {
    const current = this.getBookmarks();
    const exists = current.includes(articleId);
    let updated: string[];
    if (exists) {
      updated = current.filter(id => id !== articleId);
    } else {
      updated = [...current, articleId];
    }
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save bookmark', e);
    }
    return !exists;
  }

  static isBookmarked(articleId: string): boolean {
    return this.getBookmarks().includes(articleId);
  }

  // Survey Submissions
  static getSurveySubmissions(): SurveyResponse[] {
    try {
      const stored = localStorage.getItem(SURVEYS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage error');
    }
    return initialSurveyResponses;
  }

  static submitSurvey(response: Omit<SurveyResponse, 'id' | 'timestamp'>): SurveyResponse {
    const newSubmission: SurveyResponse = {
      ...response,
      id: 'surv-' + Date.now(),
      timestamp: new Date().toISOString()
    };
    const current = this.getSurveySubmissions();
    const updated = [newSubmission, ...current];
    try {
      localStorage.setItem(SURVEYS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to store survey response', e);
    }
    return newSubmission;
  }

  // Helper to trigger browser CSV file download with UTF-8 BOM for Arabic support
  static downloadCSV(filename: string, csvString: string): void {
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Export Survey Submissions to CSV using PapaParse
  static exportSurveysToCSV(): string {
    const surveys = this.getSurveySubmissions();
    if (surveys.length === 0) return '';

    const formattedData = surveys.map(s => ({
      'رمز الاستبيان (ID)': s.id,
      'تاريخ التقديم': new Date(s.timestamp).toLocaleString('ar-EG'),
      'الفئة العمرية': s.age_group || 'غير محدد',
      'الدور في الأسرة': s.family_role || 'غير محدد',
      'مدة الإقامة في السويد': s.residence_duration || 'غير محدد',
      'اللغة المفضلة': s.preferred_lang || 'غير محدد',
      'البلدية / المدينة': s.municipality_optional || 'غير محدد',
      'الموضوعات المطلوبة': (s.needed_topics || []).join(' | '),
      'تحديات التواصل مع المدرسة': s.school_challenges || 'لا يوجد',
      'مدى فهم قوانين السوسيال': s.social_services_understanding || 'غير محدد',
      'الموضوعات الأسرية المطلوبة': (s.family_topics_needed || []).join(' | '),
      'التنسيق والتنسيقات المفضلة': (s.preferred_format || []).join(' | '),
      'المقترحات والملاحظات': s.user_suggestions || 'لا يوجد'
    }));

    return Papa.unparse(formattedData);
  }

  // Export Legal FAQ Evaluations & Feedback to CSV
  static exportFaqFeedbackToCSV(): string {
    const faqs = this.getFaqs();
    const feedback = this.getFaqFeedback();

    const formattedData = faqs.map(faq => {
      const userVote = feedback[faq.id];
      let voteStatus = 'لم يتم التقييم بعد';
      if (userVote === 'yes') voteStatus = 'مفيد جداً (نعم)';
      if (userVote === 'no') voteStatus = 'يحتاج توضيح أكثر (لا)';

      return {
        'رمز السؤال (FAQ ID)': faq.id,
        'السؤال القانوني (بالعربية)': faq.question_ar,
        'السؤال (بالسويدية)': faq.question_sv,
        'القطاع الحكومي / الفئة': faq.category,
        'الموضوع القانوني': faq.legal_topic_ar || 'غير محدد',
        'المرجع القانوني الرسمية': `${faq.legal_reference_ar || ''} (${faq.legal_reference_sv || ''})`,
        'الجهة المعنية والمدققة': faq.verified_by || faq.official_source_name || 'غير محدد',
        'تاريخ المراجعة الأخيرة': faq.last_reviewed_date || 'غير محدد',
        'تقييم الفائدة للمستخدمين': voteStatus
      };
    });

    return Papa.unparse(formattedData);
  }
}
