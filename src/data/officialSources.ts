import { OfficialSource } from '../types';

export const officialSources: OfficialSource[] = [
  {
    id: 'skolverket',
    name_sv: 'Skolverket',
    name_ar: 'مصلحة المدارس السويدية (سكول فيركيت)',
    acronym: 'Skolverket',
    category: 'school',
    url: 'https://www.skolverket.se/',
    description_ar: 'الجهة الحكومية المسؤولة عن توجيه ودعم النظام التعليمي وتحديد المناهج وحقوق الطلاب في السويد.',
    description_sv: 'Statlig myndighet som styr och stödjer det svenska skolsystemet samt fastställer läroplaner.',
    last_verified_date: '2026-03-15',
    topics_covered: ['المناهج الدراسية', 'الدعم الدراسي', 'حقوق الطالب', 'تقييم الدرجات']
  },
  {
    id: 'skolinspektionen',
    name_sv: 'Skolinspektionen',
    name_ar: 'مفتشية المدارس السويدية (سكول إنسپكشنين)',
    acronym: 'Skolinspektionen',
    category: 'school',
    url: 'https://www.skolinspektionen.se/',
    description_ar: 'الجهة الرقابية المسؤولة عن التفتيش على المدارس والتحقيق في الشكاوى المتعلقة بالتنمر وعدم توفير الدعم الدراسي.',
    description_sv: 'Tillsynsmyndighet som granskar skolor och utreder anmälningar om mobbning eller bristande stöd.',
    last_verified_date: '2026-03-15',
    topics_covered: ['الشكاوى المدرسية', 'التفتيش والمراقبة', 'مكافحة التنمر', 'السلامة المدرسية']
  },
  {
    id: 'socialstyrelsen',
    name_sv: 'Socialstyrelsen',
    name_ar: 'المجلس الوطني للتعليم والصحة والخدمات الاجتماعية (سوسيال ستيريلسن)',
    acronym: 'Socialstyrelsen',
    category: 'social-services',
    url: 'https://www.socialstyrelsen.se/',
    description_ar: 'الجهة الحكومية المسؤولة عن وضع التوجيهات العامة للخدمات الاجتماعية والرعاية الصحية وحماية الأطفال والأسرة.',
    description_sv: 'Statlig myndighet för socialtjänst och hälso- och sjukvård med ansvar för riktlinjer och barnets skydd.',
    last_verified_date: '2026-03-15',
    topics_covered: ['الخدمات الاجتماعية', 'دعم الأسرة', 'حماية الأطفال', 'الرعاية الصحية']
  },
  {
    id: '1177',
    name_sv: '1177 Vårdguiden',
    name_ar: 'دليل الرعاية الصحية السويدي (1177)',
    acronym: '1177',
    category: 'health-support',
    url: 'https://www.1177.se/',
    description_ar: 'البوابة الوطنية الرسمية للخدمات الصحية والاستشارات الطبية، وتحديد مراكز رعاية الأطفال BVC والصحة النفسية.',
    description_sv: 'Sveriges samlingsplats för information och tjänster inom hälso- och sjukvård.',
    last_verified_date: '2026-03-15',
    topics_covered: ['صحة الطفل BVC', 'المركز الصحي', 'استشارات طوارئ 1177', 'الصحة النفسية']
  },
  {
    id: 'barnombudsmannen',
    name_sv: 'Barnombudsmannen (BO)',
    name_ar: 'أمين مظالم الأطفال في السويد (بارن أومبودسمان)',
    acronym: 'BO',
    category: 'child-rights',
    url: 'https://www.barnombudsmannen.se/',
    description_ar: 'جهة حكومية مستقلة تحرص على تطبيق اتفاقية حقوق الطفل الصادرة عن الأمم المتحدة في القوانين السويدية.',
    description_sv: 'Statlig myndighet som företräder barnets rättigheter utifrån FN:s barnkonvention.',
    last_verified_date: '2026-03-15',
    topics_covered: ['اتفاقية حقوق الطفل', 'صوت الطفل', 'الحماية القانونية للأطفال']
  },
  {
    id: 'domstol',
    name_sv: 'Sveriges Domstolar',
    name_ar: 'المحاكم السويدية (دومستول)',
    acronym: 'Domstol',
    category: 'family-law',
    url: 'https://www.domstol.se/',
    description_ar: 'الموقع الرسمي القائم على القضاء السويدي لتوضيح إجراءات قضايا الأسرة، الحضانات، والانفصال.',
    description_sv: 'Officiell portal för Sveriges domstolar om vårdnadstvister, familjerätt och rättsprocesser.',
    last_verified_date: '2026-03-15',
    topics_covered: ['حضانات الأطفال', 'قضايا الأسرة', 'المساعدة القانونية', 'الانفصال']
  },
  {
    id: 'riksdagen',
    name_sv: 'Sveriges Riksdag',
    name_ar: 'البرلمان السويدي (ريكسداغن)',
    acronym: 'Riksdagen',
    category: 'family-law',
    url: 'https://www.riksdagen.se/',
    description_ar: 'المصدر الرسمي للتشريعات والقوانين المعتمدة في السويد المتعلقة بالأسرة والتعليم والخدمات الاجتماعية.',
    description_sv: 'Sveriges folkvalda parlament och källan till gällande lagstiftning om skola och familj.',
    last_verified_date: '2026-03-15',
    topics_covered: ['القوانين السويدية', 'تشريعات الأسرة', 'قانون المدارس Skollagen']
  },
  {
    id: 'mfof',
    name_sv: 'Myndigheten för familjerätt och föräldraskapsstöd (MFOF)',
    name_ar: 'مصلحة حقوق الأسرة ودعم الوالدية (MFOF)',
    acronym: 'MFOF',
    category: 'marriage-separation',
    url: 'https://www.mfof.se/',
    description_ar: 'الجهة الحكومية المتخصصة في تقديم الإرشادات حول الحضانة المشتركة، الوساطة الأسرية، ومهارات التربية.',
    description_sv: 'Statlig myndighet för familjerätt, samarbetssamtal och föräldraskapsstöd.',
    last_verified_date: '2026-03-15',
    topics_covered: ['الوساطة الأسرية Familjerätt', 'دعم الوالدين', 'الحضانة والنفقة']
  }
];
