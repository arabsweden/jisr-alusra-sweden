import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'school',
    slug: 'school',
    title_ar: 'الأسرة والمدرسة',
    title_sv: 'Skola & Familj',
    description_ar: 'التواصل مع المعلم والمدير، دور المينتور، الاجتماعات، والتعامل مع الغياب والتنمر.',
    description_sv: 'Kommunikation med lärare och rektor, mentorns roll, möten samt hantering av frånvaro och mobbning.',
    icon: 'GraduationCap',
    badgeColor: '#185C7A',
    itemCount: 8
  },
  {
    id: 'social-services',
    slug: 'social-services',
    title_ar: 'الخدمات الاجتماعية – السوسيال',
    title_sv: 'Socialtjänsten',
    description_ar: 'شرح مبسط ومتوازن لدور الخدمات الاجتماعية، الفرق بين الدعم والتحقيق، وحقوق الوالدين.',
    description_sv: 'Enkel och balanserad förklaring av socialtjänst, skillnad mellan stöd och utredning samt föräldrars rättigheter.',
    icon: 'Users',
    badgeColor: '#2F8F83',
    itemCount: 6
  },
  {
    id: 'child-rights',
    slug: 'child-rights',
    title_ar: 'حقوق الطفل',
    title_sv: 'Barnets rättigheter',
    description_ar: 'اتفاقية حقوق الطفل في القانون السويدي وحماية سلامة الطفل البدنية والنفسية.',
    description_sv: 'Barnkonventionen i svensk lag samt skydd för barnets kroppsliga och psykiska trygghet.',
    icon: 'ShieldCheck',
    badgeColor: '#185C7A',
    itemCount: 5
  },
  {
    id: 'parenting-dialogue',
    slug: 'parenting-dialogue',
    title_ar: 'التربية والحوار الأسري',
    title_sv: 'Uppfostran & Samtal',
    description_ar: 'أساليب التربية الإيجابية، بناء الجسور بين الثقافات، وتجنب العقاب البدني والنفسي.',
    description_sv: 'Positiva uppfostringsmetoder, kulturell överbryggning och förbud mot kroppslig/psykisk bestraffning.',
    icon: 'HeartHandshake',
    badgeColor: '#2F8F83',
    itemCount: 5
  },
  {
    id: 'marriage-separation',
    slug: 'marriage-separation',
    title_ar: 'الزواج والانفصال',
    title_sv: 'Äktenskap & Separation',
    description_ar: 'الإجراءات القانونية للزواج والانفصال، الحضانات المشتركة، والوساطة الأسرية (Familjerätt).',
    description_sv: 'Juridiska processer kring äktenskap, skilsmässa, gemensam vårdnad och samarbetssamtal.',
    icon: 'Scale',
    badgeColor: '#185C7A',
    itemCount: 4
  },
  {
    id: 'family-law',
    slug: 'family-law',
    title_ar: 'القوانين والحقوق الأسرية',
    title_sv: 'Familjerätt & Lagar',
    description_ar: 'الحقوق القانونية للوالدين والأطفال، إجازة الوالدين (Föräldrapenning)، ونفقة الطفل.',
    description_sv: 'Föräldrars och barns juridiska rättigheter, föräldrapenning och underhållsstöd.',
    icon: 'BookOpen',
    badgeColor: '#2F8F83',
    itemCount: 5
  },
  {
    id: 'health-support',
    slug: 'health-support',
    title_ar: 'الصحة والدعم النفسي',
    title_sv: 'Hälsa & Psykiskt stöd',
    description_ar: 'رعاية صحة الأطفال BVC، المركز الصحي Vårdcentral، والصحة النفسية للشباب BUP.',
    description_sv: 'Barnhälsovård (BVC), vårdcentralen och barn- och ungdomspsykiatrin (BUP).',
    icon: 'Stethoscope',
    badgeColor: '#185C7A',
    itemCount: 5
  },
  {
    id: 'society-life',
    slug: 'society-life',
    title_ar: 'المجتمع والحياة في السويد',
    title_sv: 'Samhälle & Livet i Sverige',
    description_ar: 'الأنشطة الترفيهية للأطفال، الجمعيات المحلية، وفهم القيم والمؤسسات المجتمعية.',
    description_sv: 'Fritidsaktiviteter för barn, föreningsliv och förståelse för samhällets värderingar.',
    icon: 'Compass',
    badgeColor: '#2F8F83',
    itemCount: 4
  },
  {
    id: 'templates-tools',
    slug: 'templates-tools',
    title_ar: 'نماذج ورسائل جاهزة',
    title_sv: 'Mallar & Brev',
    description_ar: 'رسائل سويدية جاهزة للتواصل مع المدرسة، قائمة التحضير للاجتماعات، واستمارة توثيق القرارات.',
    description_sv: 'Färdiga svenska brevmallar för skolkontakt, mötesförberedelser och beslutsprotokoll.',
    icon: 'FileText',
    badgeColor: '#185C7A',
    itemCount: 6
  },
  {
    id: 'surveys-quizzes',
    slug: 'surveys-quizzes',
    title_ar: 'الاستبيانات والاختبارات',
    title_sv: 'Enkäter & Tester',
    description_ar: 'اختبارات توعوية قصيرة للأسرة، واستبيان قياس احتياجات الأسر العربية في السويد.',
    description_sv: 'Korta kunskapstester och enkät om arabiska familjers behov i Sverige.',
    icon: 'HelpCircle',
    badgeColor: '#2F8F83',
    itemCount: 4
  }
];
