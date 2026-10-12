import { Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: 'school-system-knowledge',
    slug: 'school-system-knowledge',
    title_ar: 'ما مدى معرفتك بالنظام المدرسي السويدي؟',
    title_sv: 'Hur väl känner du till det svenska skolsystemet?',
    description_ar: 'اختبار توعوي قصير لمعرفة مستوى إلمامك بخطوات التواصل مع المدرسة، خطط الدعم الدراسي، وحقوق الطالب.',
    description_sv: 'Ett kort kunskapstest om din förståelse för skolsystemet och elevhälsan.',
    icon: 'GraduationCap',
    questions: [
      {
        id: 'q1',
        question_ar: 'من هو الشخص الأول الذي ينبغي التواصل معه عند مواجهة صعوبات دراسية بسيطة في المدرسة؟',
        question_sv: 'Vem är den första personen att kontakta vid studieutmaningar?',
        options: [
          { id: 'opt1', text_ar: 'المعلم / المينتور (Mentor)', text_sv: 'Klassläraren / Mentorn', points: 3 },
          { id: 'opt2', text_ar: 'مدير المدرسة المباشر (Rektor)', text_sv: 'Rektorn direkt', points: 1 },
          { id: 'opt3', text_ar: 'التقديم بشكوى للتفتيش المدرسي (Skolinspektionen)', text_sv: 'Anmälan till Skolinspektionen', points: 0 }
        ]
      },
      {
        id: 'q2',
        question_ar: 'هل يحق للوالدين طلب مترجم شفوي معتمد باللغة العربية لحضور الاجتماعات المدرسية؟',
        question_sv: 'Har föräldrar rätt till godkänd tolk vid skolmöten?',
        options: [
          { id: 'opt1', text_ar: 'نعم، يحق للوالدين طلب مترجم مجانًا وتلتزم المدرسة بحجزه', text_sv: 'Ja, föräldrar har rätt till gratis tolk', points: 3 },
          { id: 'opt2', text_ar: 'فقط في الحالات الاستثنائية جداً', text_sv: 'Endast i undantagsfall', points: 1 },
          { id: 'opt3', text_ar: 'لا، يجب على الوالدين دفع تكاليف المترجم', text_sv: 'Nej, föräldrar måste betala själva', points: 0 }
        ]
      },
      {
        id: 'q3',
        question_ar: 'ما هي الوثيقة الرسمية التي تعدها المدرسة عندما يحتاج الطالب لدعم دراسي مكثف ومستمر؟',
        question_sv: 'Vilket dokument upprättas vid behov av särskilt stöd?',
        options: [
          { id: 'opt1', text_ar: 'برنامج الدعم والعمل (Åtgärdsprogram)', text_sv: 'Åtgärdsprogram', points: 3 },
          { id: 'opt2', text_ar: 'شهادة السلوك المدرسية', text_sv: 'Beteendeintyg', points: 1 },
          { id: 'opt3', text_ar: 'رسالة إنذار بالغياب', text_sv: 'Varningsbrev', points: 0 }
        ]
      }
    ],
    results: [
      {
        min_score: 7,
        max_score: 9,
        title_ar: 'ممتاز! لديك وعي ورؤية ممتازة بالنظام المدرسي السويدي',
        title_sv: 'Utmärkt! Du har god kunskap om det svenska skolsystemet',
        guidance_ar: 'أنت تعي جيدًا خطوات التواصل والتصعيد المالي والتربوي. ننصحك بتصفح قسم النماذج العملية للاستفادة من الرسائل المترجمة الجاهزة لتسهيل التواصل اليومي.',
        guidance_sv: 'Du har bra koll på kommunikationsvägarna. Utforska gärna våra brevmallar.',
        recommended_article_slugs: ['school-communication-guide', 'school-meetings-evk-prep'],
        recommended_source_names: ['Skolverket', 'Skolinspektionen']
      },
      {
        min_score: 3,
        max_score: 6,
        title_ar: 'معرفة أولية جيدة، وستستفيد من قراءة الإرشادات المدرسية',
        title_sv: 'God grundkunskap, du kan ha nytta av att läsa mer',
        guidance_ar: 'لديك دراية عامة، ولكن قد تحتاج لمزيد من الفهم حول حقوق الطالب في الحصول على دعم دراسي (Åtgärdsprogram) والتعامل مع اجتماعات EVK.',
        guidance_sv: 'Läs gärna mer om åtgärdsprogram och Elevhälsan.',
        recommended_article_slugs: ['school-communication-guide'],
        recommended_source_names: ['Skolverket']
      },
      {
        min_score: 0,
        max_score: 2,
        title_ar: 'ننصحك بقراءة دليل الأسرة والمدرسة لبناء خلفية قوية',
        title_sv: 'Vi rekommenderar att du läser mer i skolguiden',
        guidance_ar: 'يبدو أن نظام التعليم السويدي ومصطلحاته قد تبدو جديدة بالنسبة لك. ابدأ بقراءة مقال "كيف تتواصل الأسرة مع المدرسة" للتعرف على الأدوار والمستويات.',
        guidance_sv: 'Starta med vår artikel om hur familjen kommunicerar med skolan.',
        recommended_article_slugs: ['school-communication-guide'],
        recommended_source_names: ['Skolverket']
      }
    ]
  },
  {
    id: 'family-dialogue-check',
    slug: 'family-dialogue-check',
    title_ar: 'كيف تسير الحوارات داخل الأسرة؟',
    title_sv: 'Hur fungerar samtalen inom familjen?',
    description_ar: 'استبيان توعوي بسيط لمراجعة جودة الحوار الأسري ومهارات الاستماع للأطفال وحل النزاعات الوالدية.',
    description_sv: 'Ett reflektionstest om samtal och kommunikation i familjen.',
    icon: 'HeartHandshake',
    questions: [
      {
        id: 'q1',
        question_ar: 'كم مرة تخصص وقتًا هادئًا للاستماع لطفلك دون توجيه انتقادات أو نصائح مباشرة؟',
        question_sv: 'Hur ofta avsätter du tid för aktivt lyssnande på barnet?',
        options: [
          { id: 'opt1', text_ar: 'يوميًا أو عدة مرات في الأسبوع', text_sv: 'Dagligen eller flera gånger i veckan', points: 3 },
          { id: 'opt2', text_ar: 'أحيانًا فقط في العطلات', text_sv: 'Ibland på helger', points: 2 },
          { id: 'opt3', text_ar: 'نادراً، بسبب ضغوط العمل والحياة', text_sv: 'Sällan på grund av stress', points: 0 }
        ]
      },
      {
        id: 'q2',
        question_ar: 'كيف تتصرف عندما يظهر الطفل غضبًا شديدًا أو اعتراضًا على القوانين المنزلية؟',
        question_sv: 'Hur hanterar du stark ilska eller protest från barnet?',
        options: [
          { id: 'opt1', text_ar: 'أحافظ على الهدوء، وأناقش المشكلة بعد أن يهدأ الطفل', text_sv: 'Behåller lugnet och pratar när barnet lugnat ner sig', points: 3 },
          { id: 'opt2', text_ar: 'أرفع صوتي أحيانًا للسيطرة على الموقف', text_sv: 'Höjer rösten ibland för att ta kontroll', points: 1 },
          { id: 'opt3', text_ar: 'أشعر بالإحباط الشديد أو استخدام العزلة', text_sv: 'Känner stark maktlöshet', points: 0 }
        ]
      }
    ],
    results: [
      {
        min_score: 5,
        max_score: 6,
        title_ar: 'أنت تعتمد أسلوب حوار إيجابي وداعم داخل الأسرة',
        title_sv: 'Du tillämpar en positiv och stödjande samtalskultur',
        guidance_ar: 'استمر في تعزيز المساحة الآمنة لطفلك. ننصحك بقراءة مقال حقوق الطفل في السويد لتواصل أعمق.',
        guidance_sv: 'Fortsätt stärka den trygga dialogen med barnet.',
        recommended_article_slugs: ['child-rights-sweden'],
        recommended_source_names: ['Barnombudsmannen']
      },
      {
        min_score: 0,
        max_score: 4,
        title_ar: 'قد تستفيد من الاستفادة من برامج دعم الوالدية (Föräldraskapsstöd)',
        title_sv: 'Du kan ha nytta av kommunala föräldrakurser',
        guidance_ar: 'ضغوط الحياة اليومية قد تؤثر على التواصل الأسري. توفر البلديات السويدية دورات مجانية رائعة مثل Alla Barn i Centrum (ABC) لتعليم مهارات الحوار الوالدي.',
        guidance_sv: 'Kommunen erbjuder kostnadsfria kurser som Alla Barn i Centrum (ABC).',
        recommended_article_slugs: ['child-rights-sweden', 'social-services-explained'],
        recommended_source_names: ['Socialstyrelsen', 'Barnombudsmannen']
      }
    ]
  },
  {
    id: 'authorities-awareness',
    slug: 'authorities-awareness',
    title_ar: 'هل تعرف الجهات التي يمكنك التواصل معها عند الحاجة؟',
    title_sv: 'Känner du till vilka myndigheter du kan kontakta?',
    description_ar: 'تحديد فهمك للأدوار الفاصلة بين المدارس، البلديات، الرعاية الصحية، وصندوق التأمينات.',
    description_sv: 'Identifiera din kännedom om svenska myndigheters olika ansvarsområden.',
    icon: 'Compass',
    questions: [
      {
        id: 'q1',
        question_ar: 'أي جهة رسمية هي المسؤولة عن تقديم الدعم الطبي الأولي والفحوصات الدورية للأطفال حديثي الولادة حتى عمر 6 سنوات؟',
        question_sv: 'Vilken instans ansvarar för barnhälsovård 0–6 år?',
        options: [
          { id: 'opt1', text_ar: 'مركز رعاية صحة الأطفال BVC', text_sv: 'Barnhälsovården (BVC)', points: 3 },
          { id: 'opt2', text_ar: 'مصلحة المدارس Skolverket', text_sv: 'Skolverket', points: 0 },
          { id: 'opt3', text_ar: 'صندوق التأمينات Försäkringskassan', text_sv: 'Försäkringskassan', points: 0 }
        ]
      },
      {
        id: 'q2',
        question_ar: 'أين يمكن للوالدين الحصول على استشارات أسرية مجانية ووساطة عند الانفصال لتحديد السكن والنفقة؟',
        question_sv: 'Var finns kostnadsfria samarbetssamtal vid skilsmässa?',
        options: [
          { id: 'opt1', text_ar: 'قسم حقوق الأسرة بالبلدية (Familjerätten / MFOF)', text_sv: 'Familjerätten i kommunen', points: 3 },
          { id: 'opt2', text_ar: 'الشرطة السويدية Polisen', text_sv: 'Polisen', points: 0 },
          { id: 'opt3', text_ar: 'مصلحة الضرائب Skatteverket', text_sv: 'Skatteverket', points: 0 }
        ]
      }
    ],
    results: [
      {
        min_score: 5,
        max_score: 6,
        title_ar: 'رائع! لديك معرفة صحيحة بالجهات السويدية الرسمية',
        title_sv: 'Bra jobbat! Du har god koll på svenska myndigheter',
        guidance_ar: 'تعرفك على الأدوار يساعدك على الوصول للمعلومة الصحيحة بسرعة وتفادي التشتت.',
        guidance_sv: 'Din kunskap underlättar rätt kontakt vid rätt tillfälle.',
        recommended_article_slugs: ['parental-leave-forskola', 'marriage-divorce-custody'],
        recommended_source_names: ['1177', 'Socialstyrelsen', 'MFOF']
      },
      {
        min_score: 0,
        max_score: 4,
        title_ar: 'يمكنك الاطلاع على دليل المصادر الرسمية في تطبيقنا',
        title_sv: 'Utforska gärna vår lista över officiella källor',
        guidance_ar: 'تصفح صفحة "المصادر الرسمية" في التطبيق للتعرف على اختصاصات كل جهة مع الروابط المباشرة.',
        guidance_sv: 'Besök sidan för officiella källor för mer information.',
        recommended_article_slugs: ['parental-leave-forskola'],
        recommended_source_names: ['1177', 'Socialstyrelsen']
      }
    ]
  }
];
