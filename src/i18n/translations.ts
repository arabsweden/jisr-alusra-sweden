import { Language } from '../types';

export const translations = {
  ar: {
    // General & Branding
    appName: "جسر الأسرة في السويد",
    appSubName: "Familjebron Sverige",
    tagline: "نربط الأسرة بالمعلومة الصحيحة",
    heroTitle: "دليلك لفهم حياة الأسرة في السويد",
    heroSubtitle: "معلومات عربية مبسطة، أدوات عملية ومصادر سويدية رسمية تساعد الأسرة على اتخاذ خطوات أكثر وضوحًا ووعيًا.",
    
    // Header & Navigation
    navHome: "الرئيسية",
    navGuide: "دليل الأسرة",
    navSchool: "الأسرة والمدرسة",
    navSocialServices: "السوسيال",
    navFaq: "القوانين والحقوق",
    navAsk: "اسأل جسر الأسرة",
    navSurvey: "الاستبيان",
    navQuizzes: "الاختبارات التوعوية",
    navTemplates: "النماذج العملية",
    navSources: "المصادر الرسمية",
    navReportGuide: "تقرير حماية الطفل الشامل",
    navChildRestoration: "استرجاع الطفل (Hemtagning)",
    navFamilyAdvice: "نصائح وإرشادات الأسرة",
    navFamiljebron: "برنامج جسر الأسرة",
    navAbout: "من نحن",
    navContact: "اتصل بنا",
    navAdmin: "لوحة الإدارة",
    navMore: "المزيد",

    // Search & CTAs
    searchPlaceholder: "ما المعلومة التي تبحث عنها؟ (مثلاً: التسجيل في المدرسة، السوسيال، الحضانة...)",
    btnStartHere: "ابدأ من هنا",
    btnTakeSurvey: "شارك في الاستبيان",
    btnBrowseGuide: "تصفح دليل الأسرة",
    btnSearch: "بحث",
    btnFilter: "تصفية",
    btnReset: "إعادة ضبط",
    btnCopy: "نسخ النص",
    btnCopied: "تم النسخ!",
    btnPrintPdf: "حفظ كـ PDF / طباعة",
    btnSaveBookmark: "حفظ في المفضلة",
    btnSaved: "في المفضلة",
    btnShare: "مشاركة",
    btnAskAI: "اسأل المساعد الذكي",
    btnViewDetails: "قراءة التفاصيل",
    btnBack: "رجوع",
    btnNext: "التالي",
    btnSubmit: "إرسال",
    btnVerifiedSource: "زيارة المصدر الرسمي",
    btnAdminDashboard: "لوحة التحكم",

    // Home Sections
    homeTopicsTitle: "الأقسام والأدوات الرئيسية",
    homeTopicsSubtitle: "استكشف البوابات المعرفية والأدوات الأكثر أهمية للأسرة",
    secCategoriesTitle: "الأقسام الأساسية",
    secCategoriesSub: "تصفح الموضوعات الأكثر أهمية للأسر العربية في السويد",
    secPopularTitle: "الأكثر بحثًا وقراءة",
    secPopularSub: "مقالات وإرشادات يحتاجها العديد من أولياء الأمور حاليًا",
    secOfficialHighlightTitle: "معلومة موثوقة من مصدر سويدي رسمي",
    secOfficialHighlightBadge: "مفحوصة وموثقة",
    secSurveyCalloutTitle: "ساعدنا في تطوير جسر الأسرة",
    secSurveyCalloutText: "صوتك يهمنا! شارك في الاستبيان الوطني القصير للإعراب عن احتياجات أسرتك والتحديات التي تواجهها مع المدرسة والخدمات الاجتماعية.",
    secEmergencyTitle: "جهات الدعم والطوارئ في السويد",
    secEmergencySub: "أرقام رسمية موثوقة عند الحاجة للدعم الفوري",

    // Categories List
    catSchoolTitle: "الأسرة والمدرسة",
    catSchoolDesc: "فهم النظام المدرسي، التواصل مع المعلم والمدير، والتعامل مع الغياب والتنمر.",
    catSocialTitle: "الخدمات الاجتماعية – السوسيال",
    catSocialDesc: "شرح مبسط لدور السوسيال، الفرق بين الدعم والتحقيق، وحقوق الوالدين أثناء الاجتماعات.",
    catRightsTitle: "حقوق الطفل",
    catRightsDesc: "اتفاقية حقوق الطفل في القانون السويدي وحماية سلامته البدنية والنفسية.",
    catParentingTitle: "التربية والحوار الأسري",
    catParentingDesc: "أساليب التربية الإيجابية، الجسور بين الثقافتين، وتجنب العقاب البدني.",
    catMarriageTitle: "الزواج والانفصال",
    catMarriageDesc: "الإجراءات القانونية للزواج والانفصال، الحضانات المشاركة، ونفقة الأطفال.",
    catLawTitle: "القوانين والحقوق الأسرية",
    catLawDesc: "الحقوق القانونية للأسرة والوالدين، الشمل والنفقة وإجازة الوالدين (Föräldrapenning).",
    catHealthTitle: "الصحة والدعم النفسي",
    catHealthDesc: "الرعاية الصحية للأطفال (BVC)، المركز الصحي (Vårdcentral)، والصحة النفسية (BUP).",
    catSocietyTitle: "المجتمع والحياة في السويد",
    catSocietyDesc: "الأنشطة الترفيهية، الجمعيات الأهلية، والاندماج الإيجابي في المجتمع السويدي.",
    catTemplatesTitle: "نماذج ورسائل جاهزة",
    catTemplatesDesc: "رسائل سويدية جاهزة للتواصل مع المدرسة، قوائم التحضير للاجتماعات، وتوثيق المواعيد.",
    catQuizzesTitle: "الاستبيانات والاختبارات",
    catQuizzesDesc: "اختبارات توعوية قصيرة لقياس فهمك للنظام السويدي وتحديد مجالات الدعم.",

    // Disclaimers & Badges
    independentProjectDisclaimer: "جسر الأسرة في السويد مشروع معرفي مستقل، وليس جهة حكومية. المعلومات المنشورة عامة وتهدف إلى التوعية، ولا تمثل استشارة قانونية أو طبية أو اجتماعية فردية.",
    demoContentBadge: "محتوى تجريبي يحتاج إلى مراجعة قبل النشر",
    lastVerifiedDateLabel: "تاريخ آخر مراجعة للمعلومة:",
    officialSourceLabel: "الجهة السويدية الرسمية:",
    practicalStepsLabel: "خطوات عملية للأسرة:",
    whenHelpNeededLabel: "متى تحتاج الأسرة إلى مساعدة متخصصة؟",
    generalDisclaimerNotice: "تنبيه: هذه المعلومات صالحة للتوعية العامة. لكل حالة ظروفها الخاصة، وننصح بالتواصل المباشر مع الجهة المختصة عند الحاجة.",

    // Assistant View
    assistantTitle: "اسأل جسر الأسرة",
    assistantSubtitle: "مساعد ذكي يعتمد حصريًا على المصادر الرسمية السويدية لإرشادك للمعلومة الصحيحة.",
    assistantDisclaimer: "المساعد يجيب استنادًا إلى قواعد البيانات الرسمية في التطبيق. لا يحل المساعد محل القانوني أو الأخصائي الاجتماعي أو الطبيب.",
    assistantInputPlaceholder: "اكتب سؤالك هنا... (مثلاً: كيف أستعد لاجتماع تطوير المدرسة EVK؟)",

    // School Diagram Section
    schoolDiagramTitle: "تسلسل التواصل والتصعيد في المدرسة السويدية",
    schoolDiagramDesc: "خطوات توضيحية متدرجة لحل أي مشكلة مدرسية بطريقة رسمية وفعالة:",
    step1Teacher: "1. المعلم / Mentor",
    step1TeacherDesc: "نقطة التواصل الأولى لمناقشة التحصيل، السلوك، أو الصعوبات البسيطة.",
    step2Rektor: "2. مدير المدرسة (Rektor)",
    step2RektorDesc: "في حال عدم التوصل لحل، أو وجود قضايا خطيرة كالتنمر أو الحفاظ على البيئة المدرسية.",
    step3Huvudman: "3. الجهة المسؤولة (Huvudman)",
    step3HuvudmanDesc: "إدارة البلدية (Kommun) للمدارس الحكومية، أو مجلس الإدارة للمدارس الخاصة (Friskola).",
    step4Skolinspektionen: "4. التفتيش المدرسي (Skolinspektionen)",
    step4SkolinspektionenDesc: "الجهة الرسمية العلياء للتقدم بشكوى رسمية عند استنفاد الخطوات المدرسية.",

    // Footer
    footerDesc: "منصة معرفية عربية موثوقة تسعى لبناء جسور التفاهم والوعي لدى الأسرة العربية في المجتمع السويدي.",
    footerQuickLinks: "روابط سريعة",
    footerLegal: "الخصوصية والشروط",
    footerOfficialBodies: "الجهات السويدية الرسمية",
    privacyPolicyLink: "سياسة الخصوصية",
    termsOfUseLink: "شروط الاستخدام",
    methodologyLink: "منهجية التحقق من المصادر",

    // Quiz & Survey Stats
    surveyTitle: "استبيان: ماذا تحتاج الأسرة العربية في السويد؟",
    surveySubtitle: "مساهمتك تساعدنا في تقديم محتوى أدق وأدوات أكثر فائدة للجميع. جميع الإجابات سرية ولا نطلب أي بيانات شخصية.",
    quizResultTitle: "نتيجة الاختبار التوعوي",
    quizDisclaimer: "هذا الاختبار لأغراض توعوية وتعليمية فقط، ولا يشكل تقييمًا رسميًا أو تشخيصًا.",

    // Languages Switcher
    langArabic: "العربية",
    langSwedish: "Svenska",
    langToggleBtn: "تغيير اللغة / Byt språk",
  },

  sv: {
    // General & Branding
    appName: "Familjebron Sverige",
    appSubName: "جسر الأسرة في السويد",
    tagline: "Vi kopplar familjen till rätt information",
    heroTitle: "Din guide till familjelivet i Sverige",
    heroSubtitle: "Förenklad information på arabiska, praktiska verktyg och officiella svenska källor som hjälper familjen att ta tydligare och mer medvetna steg.",
    
    // Header & Navigation
    navHome: "Start",
    navGuide: "Familjeguiden",
    navSchool: "Skola & Familj",
    navSocialServices: "Socialtjänsten",
    navFaq: "Frågor & Lagar",
    navAsk: "Fråga Familjebron",
    navSurvey: "Enkäten",
    navQuizzes: "Kunskapstester",
    navTemplates: "Mallar & Brev",
    navSources: "Officiella källor",
    navReportGuide: "Barnskyddsrapporten",
    navChildRestoration: "Återgång till hemmet (Hemtagning)",
    navFamilyAdvice: "Föräldraråd & Familj",
    navFamiljebron: "Familjebron Sverige",
    navAbout: "Om oss",
    navContact: "Kontakt",
    navAdmin: "Admin",
    navMore: "Mer",

    // Search & CTAs
    searchPlaceholder: "Vad letar du efter för information? (t.ex. Skolanmälan, Socialtjänsten, Förskola...)",
    btnStartHere: "Börja här",
    btnTakeSurvey: "Delta i enkäten",
    btnBrowseGuide: "Utforska guiden",
    btnSearch: "Sök",
    btnFilter: "Filtrera",
    btnReset: "Återställ",
    btnCopy: "Kopiera text",
    btnCopied: "Kopierad!",
    btnPrintPdf: "Spara som PDF / Skriv ut",
    btnSaveBookmark: "Spara i favoriter",
    btnSaved: "I favoriter",
    btnShare: "Dela",
    btnAskAI: "Fråga AI-assistenten",
    btnViewDetails: "Läs mer",
    btnBack: "Tillbaka",
    btnNext: "Nästa",
    btnSubmit: "Skicka",
    btnVerifiedSource: "Besök officiell källa",
    btnAdminDashboard: "Kontrollpanel",

    // Home Sections
    secCategoriesTitle: "Huvudkategorier",
    secCategoriesSub: "Utforska de viktigaste ämnena för arabisktalande familjer i Sverige",
    secPopularTitle: "Mest läst och sökt",
    secPopularSub: "Artiklar och vägledning som många föräldrar behöver just nu",
    secOfficialHighlightTitle: "Bekräftad information från officiell källa",
    secOfficialHighlightBadge: "Verifierad",
    secSurveyCalloutTitle: "Hjälp oss utveckla Familjebron",
    secSurveyCalloutText: "Din röst är viktig! Delta i vår korta enkät för att berätta om din familjs behov och utmaningar med skola och socialtjänst.",
    secEmergencyTitle: "Nödnummer och stödkontakter i Sverige",
    secEmergencySub: "Pålitliga officiella kontaktuppgifter vid behov av omedelbart stöd",

    // Categories List
    catSchoolTitle: "Skola och familj",
    catSchoolDesc: "Förstå skolsystemet, kommunikation med lärare och rektor, samt hantering av frånvaro och mobbning.",
    catSocialTitle: "Socialtjänsten",
    catSocialDesc: "Enkel förklaring av socialtjänstens roll, skillnad på stöd och utredning, samt föräldrars rättigheter vid möten.",
    catRightsTitle: "Barnets rättigheter",
    catRightsDesc: "Barnkonventionen i svensk lag och skydd för barnets fysiska och psykiska hälsa.",
    catParentingTitle: "Uppfostran och samtal",
    catParentingDesc: "Positiva uppfostringsmetoder, broar mellan kulturer och förbud mot kroppslig bestraffning.",
    catMarriageTitle: "Äktenskap och separation",
    catMarriageDesc: "Juridiska processer kring äktenskap, skilsmässa, gemensam vårdnad och underhållsstöd.",
    catLawTitle: "Familjerätt och lagar",
    catLawDesc: "Familjens rättigheter, föräldrapenning, familjeåterförening och försörjningsstöd.",
    catHealthTitle: "Hälsa och psykiskt stöd",
    catHealthDesc: "Hälsovård för barn (BVC), vårdcentralen och barn- och ungdomspsykiatrin (BUP).",
    catSocietyTitle: "Samhälle och livet i Sverige",
    catSocietyDesc: "Fritidsaktiviteter, föreningsliv och positiv integration i det svenska samhället.",
    catTemplatesTitle: "Färdiga mallar och brev",
    catTemplatesDesc: "Svenska brevmallar för skolkontakt, förberedelse listor inför möten och dokumentation.",
    catQuizzesTitle: "Enkäter och kunskapstester",
    catQuizzesDesc: "Korta kunskapstester för att mäta din förståelse av det svenska systemet och identifiera stödbehov.",

    // Disclaimers & Badges
    independentProjectDisclaimer: "Familjebron Sverige är ett fristående kunskapsprojekt och inte en myndighet. Publicerad information är allmän i informationssyfte och utgör inte individuella juridiska, medicinska eller sociala råd.",
    demoContentBadge: "Testinnehåll - behöver granskas före publicering",
    lastVerifiedDateLabel: "Senast verifierat datum:",
    officialSourceLabel: "Officiell svensk myndighet:",
    practicalStepsLabel: "Praktiska steg för familjen:",
    whenHelpNeededLabel: "När behöver familjen specialiserad hjälp?",
    generalDisclaimerNotice: "Obs: Denna information är allmän vägledning. Varje fall har sina egna omständigheter, och vi rekommenderar direktkontakt med behörig myndighet vid behov.",

    // Assistant View
    assistantTitle: "Fråga Familjebron",
    assistantSubtitle: "En smart AI-assistent baserad uteslutande på officiella svenska källor för att vägleda dig rätt.",
    assistantDisclaimer: "Assistenten svarar utifrån officiella källor i appen. Den ersätter inte jurist, socialsekreterare eller läkare.",
    assistantInputPlaceholder: "Skriv din fråga här... (t.ex. Hur förbereder jag mig inför ett utvecklingssamtal?)",

    // School Diagram Section
    schoolDiagramTitle: "Kommunikationskedjan i den svenska skolan",
    schoolDiagramDesc: "Steg-för-steg-instruktioner för att lösa skolrelaterade frågor på ett formellt sätt:",
    step1Teacher: "1. Lärare / Mentor",
    step1TeacherDesc: "Första kontakten för att diskutera studieresultat, trivsel eller enklare svårigheter.",
    step2Rektor: "2. Rektor",
    step2RektorDesc: "Vid utebliven lösning eller allvarligare frågor som mobbning eller trygghet i skolan.",
    step3Huvudman: "3. Huvudman",
    step3HuvudmanDesc: "Kommunens utbildningsförvaltning för kommunala skolor, eller styrelsen för friskolor.",
    step4Skolinspektionen: "4. Skolinspektionen",
    step4SkolinspektionenDesc: "Den statliga tillsynsmyndigheten för formella anmälningar när skolan inte åtgärdat bristerna.",

    // Footer
    footerDesc: "En pålitlig kunskapsplattform som bygger broar av förståelse och medvetenhet för arabisktalande familjer i Sverige.",
    footerQuickLinks: "Snabblänkar",
    footerLegal: "Integritet och villkor",
    footerOfficialBodies: "Svenska myndigheter",
    privacyPolicyLink: "Integritetspolicy",
    termsOfUseLink: "Användarvillkor",
    methodologyLink: "Verifieringsmetodik",

    // Quiz & Survey Stats
    surveyTitle: "Enkät: Vad behöver den arabiska familjen i Sverige?",
    surveySubtitle: "Ditt bidrag hjälper oss att erbjuda mer exakt innehåll och nyttiga verktyg. Alla svar är anonyma och inga personuppgifter samlas in.",
    quizResultTitle: "Resultat av kunskapstestet",
    quizDisclaimer: "Detta test är endast för utbildningsändamål och utgör inte en formell bedömning.",

    // Languages Switcher
    langArabic: "Arabiska",
    langSwedish: "Svenska",
    langToggleBtn: "Byt språk / تغيير اللغة",
  }
};

export function getTranslation(lang: Language, key: keyof typeof translations['ar']): string {
  return translations[lang]?.[key] || translations['ar'][key] || key;
}
