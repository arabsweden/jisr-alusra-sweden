import React, { useState, useEffect } from 'react';
import { Language, Article } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { Hero } from './components/Hero';
import { EmergencyModal } from './components/EmergencyModal';
import { GuidePage } from './pages/GuidePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { SourcesPage } from './pages/SourcesPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { ChildProtectionReportPage } from './pages/ChildProtectionReportPage';
import { ChildRestorationPage } from './pages/ChildRestorationPage';
import { FamilyAdvicePage } from './pages/FamilyAdvicePage';
import { FamiljebronPage } from './pages/FamiljebronPage';
import { AssistantChat } from './components/AssistantChat';
import { SurveyForm } from './components/SurveyForm';
import { SchoolHierarchyDiagram } from './components/SchoolHierarchyDiagram';
import { DataService } from './services/dataService';
import { ArticleCard } from './components/ArticleCard';
import { getTranslation } from './i18n/translations';
import { FontSizeControl, applyFontSize, getSavedFontSize } from './components/FontSizeControl';
import { Sparkles, HeartHandshake, GraduationCap, Users, ShieldCheck, ArrowLeft, FileText, HelpCircle, Scale, Heart, Building2, RotateCcw } from 'lucide-react';

export function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [emergencyOpen, setEmergencyOpen] = useState<boolean>(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState<boolean>(false);

  // Initialize saved font size on mount
  useEffect(() => {
    const saved = getSavedFontSize();
    applyFontSize(saved);
  }, []);

  // Sync HTML document direction with active language
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Handle article selection
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search from header or hero
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setSelectedArticle(null);
    setActiveTab('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredArticles = DataService.getArticles().slice(0, 3);
  const bookmarkedIds = DataService.getBookmarks();

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#123B4A] flex flex-col font-sans selection:bg-[#F2C86B] selection:text-[#123B4A]">
      {/* Global Header */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearchSubmit={handleSearchSubmit}
        onOpenEmergency={() => setEmergencyOpen(true)}
      />

      {/* Main Body Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {selectedArticle ? (
          /* Single Article Detail Page */
          <ArticleDetailPage
            article={selectedArticle}
            lang={lang}
            onBack={() => setSelectedArticle(null)}
            onSelectArticle={handleSelectArticle}
            onOpenTemplates={() => {
              setSelectedArticle(null);
              setActiveTab('templates');
            }}
          />
        ) : (
          /* Tab Routing */
          <>
            {/* 1. Home Page View */}
            {activeTab === 'home' && (
              <div className="space-y-10 pb-12">
                {/* Hero Section */}
                <Hero
                  lang={lang}
                  onSearch={handleSearchSubmit}
                  setActiveTab={setActiveTab}
                />

                {/* Global Text Size Control Panel */}
                <FontSizeControl lang={lang} />

                {/* Featured Report Highlight Banner */}
                <div
                  onClick={() => {
                    setActiveTab('child-report');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-r from-[#123B4A] via-[#185C7A] to-[#2F8F83] text-white p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-xl transition cursor-pointer relative overflow-hidden group space-y-4 border border-[#F2C86B]/30"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="bg-[#F2C86B] text-[#123B4A] text-xs font-black px-3.5 py-1 rounded-full shadow-2xs flex items-center gap-1.5">
                      <Scale className="w-4 h-4" />
                      <span>جديد: السوسيال والأطفال في السويد (حقائق تهمك)</span>
                    </span>
                    <span className="text-xs text-white/80 font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      دليل مصور 15 شريحة بخط واضح كبير + اختبار تفاعلي
                    </span>
                  </div>

                  <div className="space-y-2 max-w-3xl">
                    <h2 className="text-xl md:text-3xl font-black leading-tight text-white group-hover:text-[#F2C86B] transition-colors">
                      دليل الحماية القانونية والتربوية وحقائق السوسيال للأنس في السويد
                    </h2>
                    <p className="text-xs md:text-sm text-white/90 leading-relaxed font-medium">
                      تصفح العرض المصور المباشر لـ 15 حقيقة وقاعدة قانونية تفكك الشائعات، الفرق بين SoL و LVU، خطوات التحقيق الاجتماعي، حقوق الوالدين بالمحكمة (محامٍ مجاني ومترجم)، واختبار الفهم بخط كبير واضح وقراءة صوتية.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#F2C86B]">
                    <span>اقرأ التقرير واجرِ الاختبار التفاعلي الآن</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Core Topics Portals Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-[#185C7A]">
                        {getTranslation(lang, 'homeTopicsTitle')}
                      </h2>
                      <p className="text-xs text-[#123B4A]/70 mt-0.5">
                        {getTranslation(lang, 'homeTopicsSubtitle')}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('guide')}
                      className="text-xs text-[#185C7A] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>تصفح جميع التصنيفات</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Portal: Child Restoration */}
                    <div
                      onClick={() => {
                        setActiveTab('child-restoration');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white p-5 rounded-2xl border border-[#2F8F83]/40 shadow-xs hover:shadow-md hover:border-[#2F8F83] transition cursor-pointer group space-y-3 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#2F8F83]/10 text-[#2F8F83] flex items-center justify-center font-bold group-hover:bg-[#2F8F83] group-hover:text-white transition-colors">
                          <RotateCcw className="w-6 h-6" />
                        </div>
                        <span className="bg-[#2F8F83]/10 text-[#185C7A] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#2F8F83]/20">
                          Hemtagning
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#185C7A]">خطوات استرجاع الطفل (Hemtagning)</h3>
                      <p className="text-xs text-[#123B4A]/80 leading-relaxed">
                        دليل الإجراءات القانونية، شروط إثبات الأهلية (Lex Lilla Hjärtat)، ومسار العودة التدريجية.
                      </p>
                    </div>

                    {/* Portal 1: School */}
                    <div
                      onClick={() => {
                        setActiveTab('school');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white p-5 rounded-2xl border border-[#185C7A]/20 shadow-xs hover:shadow-md hover:border-[#185C7A] transition cursor-pointer group space-y-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#185C7A]/10 text-[#185C7A] flex items-center justify-center font-bold group-hover:bg-[#185C7A] group-hover:text-[#F2C86B] transition-colors">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-[#185C7A]">الأسرة والمدرسة</h3>
                      <p className="text-xs text-[#123B4A]/80 leading-relaxed">
                        خطوات التواصل مع المعلم، التسجيل المدرسي، اجتماعات EVK، وخطة الدعم الدراسي (Åtgärdsprogram).
                      </p>
                    </div>

                    {/* Portal 2: Social Services */}
                    <div
                      onClick={() => {
                        setActiveTab('social-services');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white p-5 rounded-2xl border border-[#185C7A]/20 shadow-xs hover:shadow-md hover:border-[#185C7A] transition cursor-pointer group space-y-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#2F8F83]/10 text-[#2F8F83] flex items-center justify-center font-bold group-hover:bg-[#2F8F83] group-hover:text-white transition-colors">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-[#185C7A]">الخدمات الاجتماعية (السوسيال)</h3>
                      <p className="text-xs text-[#123B4A]/80 leading-relaxed">
                        شرح هادئ وموثق لدور Socialtjänsten، الدعم الأسرية الطوعي، وحقوق الوالدين القانونية.
                      </p>
                    </div>

                    {/* Portal 3: FAQ & Legal */}
                    <div
                      onClick={() => {
                        setActiveTab('faq');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white p-5 rounded-2xl border border-[#185C7A]/20 shadow-xs hover:shadow-md hover:border-[#185C7A] transition cursor-pointer group space-y-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#185C7A]/10 text-[#185C7A] flex items-center justify-center font-bold group-hover:bg-[#185C7A] group-hover:text-[#F2C86B] transition-colors">
                        <Scale className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-[#185C7A]">الأسئلة والقوانين الشائعة</h3>
                      <p className="text-xs text-[#123B4A]/80 leading-relaxed">
                        إجابات قانونية رسمية على التساؤلات الأكثر تكراراً (Skollagen, SoL, LVU, VAB, Tolk).
                      </p>
                    </div>

                    {/* Portal 4: AI Assistant */}
                    <div
                      onClick={() => {
                        setActiveTab('assistant');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-gradient-to-br from-[#185C7A] to-[#2F8F83] p-5 rounded-2xl text-white shadow-md hover:shadow-lg transition cursor-pointer space-y-3 relative overflow-hidden"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 text-[#F2C86B] flex items-center justify-center font-bold">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                        <span>اسأل جسر الأسرة</span>
                        <span className="bg-[#F2C86B] text-[#123B4A] text-[9px] font-extrabold px-1.5 py-0.2 rounded">ذكاء</span>
                      </h3>
                      <p className="text-xs text-white/90 leading-relaxed">
                        إجابات سريعة موثقة حصريًا وفق التشريعات السويدية الرسمية.
                      </p>
                    </div>

                    {/* Portal 5: Familjebron Sverige */}
                    <div
                      onClick={() => {
                        setActiveTab('familjebron');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-gradient-to-br from-[#123B4A] to-[#185C7A] text-white p-5 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer group space-y-3 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#F2C86B] text-[#123B4A] flex items-center justify-center font-bold">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <span className="bg-white/20 text-[#F2C86B] text-[10px] font-black px-2 py-0.5 rounded-full border border-white/20">
                          البرنامج العربي السويدي
                        </span>
                      </div>
                      <h3 className="text-base font-black text-white">برنامج جسر الأسرة (Familjebron)</h3>
                      <p className="text-xs text-white/90 leading-relaxed">
                        بناء الثقة، 4 أعمدة رئيسية، مواضيع الحوار الستة، واختبار "من الخوف إلى الحوار".
                      </p>
                    </div>

                    {/* Portal 6: Family Advice & Parenting */}
                    <div
                      onClick={() => {
                        setActiveTab('family-advice');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white p-5 rounded-2xl border border-[#185C7A]/20 shadow-xs hover:shadow-md hover:border-[#185C7A] transition cursor-pointer group space-y-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#185C7A]/10 text-[#185C7A] flex items-center justify-center font-bold group-hover:bg-[#185C7A] group-hover:text-[#F2C86B] transition-colors">
                        <Heart className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-[#185C7A]">نصائح وإرشادات الأسرة</h3>
                      <p className="text-xs text-[#123B4A]/80 leading-relaxed">
                        التربية الإيجابية، مهارات التواصل اليومي، إدارة الضغوط، ودليلك لبرامج الدعم بالسويد.
                      </p>
                    </div>

                    {/* Portal 6: Survey */}
                    <div
                      onClick={() => {
                        setActiveTab('survey');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white p-5 rounded-2xl border border-[#185C7A]/20 shadow-xs hover:shadow-md hover:border-[#185C7A] transition cursor-pointer group space-y-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#F2C86B]/30 text-[#123B4A] flex items-center justify-center font-bold group-hover:bg-[#F2C86B] transition-colors">
                        <HeartHandshake className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-[#185C7A]">الاستبيان الوطني</h3>
                      <p className="text-xs text-[#123B4A]/80 leading-relaxed">
                        شارك بصوتك وتجربتك لمساعدتنا في تحديد الاحتياجات المعرفية للأسر.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Featured Articles Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-[#185C7A]">
                        أهم الإرشادات والمقالات المعرفية
                      </h2>
                      <p className="text-xs text-[#123B4A]/70 mt-0.5">
                        مستندة حصريًا للمصادر السويدية الرسمية
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('guide')}
                      className="text-xs text-[#185C7A] font-bold hover:underline"
                    >
                      عرض جميع المقالات
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {featuredArticles.map((art) => (
                      <ArticleCard
                        key={art.id}
                        article={art}
                        lang={lang}
                        onSelect={handleSelectArticle}
                        isBookmarked={bookmarkedIds.includes(art.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Interactive School Hierarchy Diagram Card */}
                <div className="my-8">
                  <SchoolHierarchyDiagram lang={lang} />
                </div>
              </div>
            )}

            {/* Familjebron Sverige Page View */}
            {activeTab === 'familjebron' && (
              <FamiljebronPage
                lang={lang}
                onNavigateToAssistant={() => {
                  setActiveTab('assistant');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToReport={() => {
                  setActiveTab('child-report');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToGuide={() => {
                  setActiveTab('guide');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Family Advice Page View */}
            {activeTab === 'family-advice' && (
              <FamilyAdvicePage
                lang={lang}
                onNavigateToAssistant={() => {
                  setActiveTab('assistant');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToGuide={() => {
                  setActiveTab('guide');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Child Protection Report Page View */}
            {activeTab === 'child-report' && (
              <ChildProtectionReportPage
                lang={lang}
                onNavigateToAssistant={() => {
                  setActiveTab('assistant');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToTemplates={() => {
                  setActiveTab('templates');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Child Restoration Page View */}
            {activeTab === 'child-restoration' && (
              <ChildRestorationPage
                lang={lang}
                onNavigateToAssistant={() => {
                  setActiveTab('assistant');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToTemplates={() => {
                  setActiveTab('templates');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToReport={() => {
                  setActiveTab('child-report');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* 2. Guide Page View */}
            {activeTab === 'guide' && (
              <GuidePage
                lang={lang}
                onSelectArticle={handleSelectArticle}
                searchQuery={searchQuery}
              />
            )}

            {/* 3. School Focused View */}
            {activeTab === 'school' && (
              <GuidePage
                lang={lang}
                onSelectArticle={handleSelectArticle}
                initialCategory="school"
              />
            )}

            {/* 4. Social Services Focused View */}
            {activeTab === 'social-services' && (
              <GuidePage
                lang={lang}
                onSelectArticle={handleSelectArticle}
                initialCategory="social-services"
              />
            )}

            {/* 5. Legal FAQ Page View */}
            {activeTab === 'faq' && (
              <FaqPage
                lang={lang}
                onSelectTemplate={(tplId) => {
                  setActiveTab('templates');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAssistant={() => {
                  setActiveTab('assistant');
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* 6. AI Assistant View */}
            {activeTab === 'assistant' && (
              <div className="py-4">
                <AssistantChat lang={lang} />
              </div>
            )}

            {/* Consultation View */}
            {activeTab === 'consultation' && (
              <ConsultationPage lang={lang} />
            )}

            {/* 6. Survey View */}
            {activeTab === 'survey' && (
              <div className="py-4">
                <SurveyForm
                  lang={lang}
                  onFinished={() => setActiveTab('home')}
                />
              </div>
            )}

            {/* 7. Templates View */}
            {activeTab === 'templates' && (
              <TemplatesPage lang={lang} />
            )}

            {/* 8. Quizzes View */}
            {activeTab === 'quizzes' && (
              <QuizzesPage
                lang={lang}
                onSelectArticle={handleSelectArticle}
              />
            )}

            {/* 9. Official Sources View */}
            {activeTab === 'sources' && (
              <SourcesPage lang={lang} />
            )}

            {/* 10. Admin Page View */}
            {activeTab === 'admin' && (
              <AdminPage lang={lang} />
            )}

            {/* Informational Views */}
            {activeTab === 'about' && <AboutPage lang={lang} />}
            {activeTab === 'privacy' && <PrivacyPage lang={lang} />}
            {activeTab === 'terms' && <TermsPage lang={lang} />}
            {activeTab === 'methodology' && <MethodologyPage lang={lang} />}
            {activeTab === 'contact' && <ContactPage lang={lang} />}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer lang={lang} setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedArticle(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Mobile Bottom Nav */}
      <BottomNav
        lang={lang}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMoreMenu={() => setMoreMenuOpen(true)}
      />

      {/* Mobile More Drawer Menu */}
      {moreMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center lg:hidden">
          <div className="bg-white rounded-t-3xl w-full p-6 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-[#185C7A]/10 pb-3">
              <h3 className="text-base font-bold text-[#185C7A]">المزيد من الأقسام والأدوات</h3>
              <button
                onClick={() => setMoreMenuOpen(false)}
                className="text-xs bg-gray-100 p-2 rounded-full text-[#123B4A]"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-[#123B4A]">
              <button
                onClick={() => { setActiveTab('familjebron'); setMoreMenuOpen(false); setSelectedArticle(null); }}
                className="col-span-2 p-3.5 bg-gradient-to-r from-[#123B4A] via-[#185C7A] to-[#2F8F83] text-white rounded-xl text-start flex items-center justify-between font-black shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#F2C86B]" />
                  <span>برنامج جسر الأسرة (Familjebron Sverige)</span>
                </div>
                <span className="bg-[#F2C86B] text-[#123B4A] text-[9px] px-2 py-0.5 rounded font-black">جديد</span>
              </button>

              <button
                onClick={() => { setActiveTab('family-advice'); setMoreMenuOpen(false); setSelectedArticle(null); }}
                className="col-span-2 p-3 bg-[#F7F5EF] rounded-xl text-start flex items-center gap-2 border border-[#185C7A]/15 font-bold text-[#185C7A]"
              >
                <Heart className="w-5 h-5 text-[#185C7A]" />
                <span>نصائح وإرشادات التربية والأسرة</span>
              </button>

              <button
                onClick={() => { setActiveTab('child-report'); setMoreMenuOpen(false); setSelectedArticle(null); }}
                className="col-span-2 p-3 bg-[#F7F5EF] rounded-xl text-start flex items-center gap-2 border border-[#185C7A]/15 font-bold text-[#185C7A]"
              >
                <Scale className="w-5 h-5 text-[#185C7A]" />
                <span>تقرير حماية الطفل الشامل واختباراته</span>
              </button>

              <button
                onClick={() => { setActiveTab('faq'); setMoreMenuOpen(false); setSelectedArticle(null); }}
                className="p-3 bg-[#F7F5EF] rounded-xl text-start flex items-center gap-2 border border-[#185C7A]/15 font-bold text-[#185C7A]"
              >
                <Scale className="w-4 h-4 text-[#185C7A]" />
                <span>الأسئلة والقوانين</span>
              </button>

              <button
                onClick={() => { setActiveTab('templates'); setMoreMenuOpen(false); setSelectedArticle(null); }}
                className="p-3 bg-[#F7F5EF] rounded-xl text-start flex items-center gap-2 border border-[#185C7A]/15"
              >
                <FileText className="w-4 h-4 text-[#185C7A]" />
                <span>النماذج العملية</span>
              </button>

              <button
                onClick={() => { setActiveTab('consultation'); setMoreMenuOpen(false); setSelectedArticle(null); }}
                className="p-3 bg-[#F7F5EF] rounded-xl text-start flex items-center gap-2 border border-[#185C7A]/15 text-[#185C7A] font-bold"
              >
                <HelpCircle className="w-4 h-4 text-[#185C7A]" />
                <span>الاستشارات</span>
              </button>

              <button
                onClick={() => { setActiveTab('quizzes'); setMoreMenuOpen(false); setSelectedArticle(null); }}
                className="p-3 bg-[#F7F5EF] rounded-xl text-start flex items-center gap-2 border border-[#185C7A]/15"
              >
                <HelpCircle className="w-4 h-4 text-[#185C7A]" />
                <span>الاختبارات التوعوية</span>
              </button>

              <button
                onClick={() => { setActiveTab('sources'); setMoreMenuOpen(false); setSelectedArticle(null); }}
                className="p-3 bg-[#F7F5EF] rounded-xl text-start flex items-center gap-2 border border-[#185C7A]/15"
              >
                <ShieldCheck className="w-4 h-4 text-[#185C7A]" />
                <span>المصادر الرسمية</span>
              </button>

              <button
                onClick={() => { setActiveTab('admin'); setMoreMenuOpen(false); setSelectedArticle(null); }}
                className="p-3 bg-[#F7F5EF] rounded-xl text-start flex items-center gap-2 border border-[#185C7A]/15 text-[#2F8F83]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>لوحة التحكم</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Hotline Modal */}
      {emergencyOpen && (
        <EmergencyModal
          lang={lang}
          onClose={() => setEmergencyOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
