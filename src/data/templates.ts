import { PracticalTemplate } from '../types';

export const practicalTemplates: PracticalTemplate[] = [
  {
    id: 'school-meeting-request-letter',
    slug: 'school-meeting-request-letter',
    category: 'school',
    title_ar: 'رسالة سويدية لطلب اجتماع مع المدرسة',
    title_sv: 'Brev för att begära ett möte med skolan',
    target_entity_ar: 'معلم الفصل / المينتور / مدير المدرسة',
    target_entity_sv: 'Klasslärare / Mentor / Rektor',
    description_ar: 'نموذج نصي سويدي جاهز يمكن تعديل بياناته ونسخه لإرساله عبر البريد الإلكتروني أو منصة التواصل المدرسية لطلب اجتماع رسمية.',
    description_sv: 'En färdig svensk brevmall att anpassa och kopiera för e-post eller skolportal.',
    template_text_sv: `Hej [LÄRARENS_NAMN / MENTORNS_NAMN],

Jag skriver till er gällande min son/dotter [BARNETS_NAMN], som går i klass [KLASS].

Jag skulle vilja begära ett möte för att diskutera [BARNETS_NAMN]s [SITUATION / SKOLSITUATION / STÖDBEHOV]. Vi vill gärna stämma av hur det går i skolan och hur vi tillsammans kan stötta [BARNETS_NAMN] på bästa sätt.

Skulle det finnas möjlighet att träffas under någon av de kommande veckorna? Vi önskar gärna att det bokas en tolk till mötet på arabiska.

Tack på förhand!

Med vänliga hälsningar,
[DITT_NAMN]
E-post: [DINS_EPOST]
Telefon: [DITT_TELEFONNUMMER]`,
    instructions_ar: 'استبدل الكلمات المعقوفة مثل [BARNETS_NAMN] بالبيانات الحقيقية لطفلك ومدرستك، ثم انسخ النص بالكامل مع خيار طلب مترجم عربي.',
    instructions_sv: 'Ersätt hakparenteserna med dina uppgifter och kopiera texten.',
    checklist_ar: [
      'تحديد اسم الطالب والصف بدقة',
      'ذكر الموضوع المراد مناقشته اختصارًا',
      'تأكيد طلب حجز مترجم شفوي معتمد (Tolk)',
      'وضع بيانات التواصل الهاتفية والبريد الإلكتروني'
    ],
    fields_to_fill: [
      { key: 'LÄRARENS_NAMN', label_ar: 'اسم المعلم / المينتور', label_sv: 'Lärarens namn', placeholder: 'مثلاً: Anna Svensson' },
      { key: 'BARNETS_NAMN', label_ar: 'اسم الطالب/ة', label_sv: 'Barnets namn', placeholder: 'مثلاً: أدم / Adam' },
      { key: 'KLASS', label_ar: 'الصف الدراسي', label_sv: 'Klass', placeholder: 'مثلاً: 4B' },
      { key: 'SITUATION', label_ar: 'موضوع الاجتماع', label_sv: 'Anledning', placeholder: 'مثلاً: الدعم الدراسي / الموائمة' },
      { key: 'DITT_NAMN', label_ar: 'اسم ولي الأمر', label_sv: 'Ditt namn', placeholder: 'مثلاً: أحمد علي' },
      { key: 'DINS_EPOST', label_ar: 'البريد الإلكتروني', label_sv: 'E-post', placeholder: 'ahmed@example.com' },
      { key: 'DITT_TELEFONNUMMER', label_ar: 'رقم الهاتف', label_sv: 'Telefonnummer', placeholder: '070-1234567' }
    ]
  },
  {
    id: 'school-inquiry-bullying-letter',
    slug: 'school-inquiry-bullying-letter',
    category: 'school',
    title_ar: 'رسالة سويدية للاستفسار والتعامل مع مشكلة مدرسية (كالغياب أو التنمر)',
    title_sv: 'Brev om skolrelaterat problem (frånvaro eller mobbning)',
    target_entity_ar: 'مدير المدرسة (Rektor) / معلم الفصل',
    target_entity_sv: 'Rektor / Mentor',
    description_ar: 'رسالة رسمية رصينة للتوثيق والاستفسار عن الإجراءات المتخذة لحماية الطالب في المدرسة.',
    description_sv: 'Ett formellt brev för att dokumentera och efterfråga skolans åtgärder vid mobbning eller oro.',
    template_text_sv: `Till Rektor och skolledning på [SKOLANS_NAMN],

Jag kontaktar er som förälder till [BARNETS_NAMN] i klass [KLASS].

Jag vill uppmärksamma er på en oroande situation gällande [BARNETS_NAMN]s trygghet i skolan. [BARNETS_NAMN] har berättat om [KORT_BESKRIVNING_AV_HÄNDELSEN_ELLER_MOBBNINGEN].

Enligt skollagen har skolan en skyldighet att utreda och vidta åtgärder när en elev inte känner sig trygg. Jag ber er därför vänligen att återkomma till mig med information om vilka steg skolan planerar att ta för att säkerställa [BARNETS_NAMN]s trygghet.

Jag emotser er återkoppling inom kort och önskar ett möte.

Med vänliga hälsningar,
[DITT_NAMN]
Telefon: [DITT_TELEFONNUMMER]`,
    instructions_ar: 'تأكد من صياغة الوصف بأسلوب محايد وواضح، واطلب توضيح خطة المدرسة الأمنية أو الدعم الدراسي وفق قانون المدارس Skollagen.',
    instructions_sv: 'Använd en neutral och saklig ton och be om besked om skolans åtgärder.',
    checklist_ar: [
      'الإشارة المباشرة إلى قانون المدارس (Skollagen)',
      'وصف الواقعة باختصار ودون استخدام ألفاظ انفعالية',
      'طلب رد رسمي من إدارة المدرسة في وقت محدد'
    ],
    fields_to_fill: [
      { key: 'SKOLANS_NAMN', label_ar: 'اسم المدرسة', label_sv: 'Skolans namn', placeholder: 'مثلاً: Centralskolan' },
      { key: 'BARNETS_NAMN', label_ar: 'اسم الطالب', label_sv: 'Barnets namn', placeholder: 'أدم' },
      { key: 'KLASS', label_ar: 'الصف', label_sv: 'Klass', placeholder: '5A' },
      { key: 'KORT_BESKRIVNING_AV_HÄNDELSEN_ELLER_MOBBNINGEN', label_ar: 'وصف قصير للمشكلة', label_sv: 'Kort beskrivning', placeholder: 'المشاحنات المتكررة في باحة المدرسة' },
      { key: 'DITT_NAMN', label_ar: 'اسم ولي الأمر', label_sv: 'Ditt namn', placeholder: 'أحمد علي' },
      { key: 'DITT_TELEFONNUMMER', label_ar: 'رقم الهاتف', label_sv: 'Telefonnummer', placeholder: '070-1234567' }
    ]
  },
  {
    id: 'meeting-preparation-checklist',
    slug: 'meeting-preparation-checklist',
    category: 'school',
    title_ar: 'قائمة التحضير الذهني والعملي لاجتماع مع المدرسة أو السوسيال',
    title_sv: 'Förberedelselista inför möte med skola eller socialtjänst',
    target_entity_ar: 'أولياء الأمور',
    target_entity_sv: 'Föräldrar',
    description_ar: 'قائمة تفقدية إرشادية تساعدك على تنظيم أفكارك ومستنداتك قبل الدخول في أي اجتماع رسمي.',
    description_sv: 'En checklista som hjälper dig att organisera tankar och dokument före mötet.',
    template_text_sv: `[قائمة تفقدية تفاعلية للتحضير للاجتماع]:
1. تحديد الهدف الرئيسي من الاجتماع في نقطة واحدة أو نقطتين.
2. طلب حجز مترجم معتمد (Tolk) وتأكيد لغته قبل وقت الاجتماع.
3. تجميع كافة الرسائل والتقرير والشهادات السابقة في ملف منظم.
4. كتابة الأسئلة الأساسية التي تريد الإجابة عنها على ورقة خضراء لتطرحها خلال اللقاء.
5. اصطحاب شخص داعم أو محامي إذا كان الاجتماع مصيرياً.
6. التدوين المباشر لأسماء الحاضرين ووظائفهم والتاريخ والاتفاقات.`,
    instructions_ar: 'راجع جميع النقاط وأشر بعلامة صح أمام كل خطوة يتم إنجازها.',
    instructions_sv: 'Bocka av varje steg när det är slutfört.',
    checklist_ar: [
      'تأكيد حجز المترجم الرسمي قبل الاجتماع بـ 48 ساعة',
      'تدوين أسئلتك المحددة في ورقة خارجية',
      'تجهيز المستندات أو التشارير الطبية/المدرسية إن وجدت',
      'الاتفاق مع الشخص الداعم المقترن بحضورك'
    ]
  },
  {
    id: 'questions-for-official-meetings',
    slug: 'questions-for-official-meetings',
    category: 'school',
    title_ar: 'قائمة بالأسئلة الذهبية التي يمكن طرحها في اجتماع رسمي',
    title_sv: 'Checklista med frågor att ställa vid officiella möten',
    target_entity_ar: 'المدرسة / الخدمات الاجتماعية',
    target_entity_sv: 'Skolan / Socialtjänsten',
    description_ar: 'مجموعة من الأسئلة النظامية المصاغة بدقة لمساعدتك في فهم حقوقك والخطوات القادمة.',
    description_sv: 'Sakkunniga frågor för att säkerställa att du får klarhet i dina rättigheter och nästa steg.',
    template_text_sv: `أسئلة مقترحة للطرح أثناء الاجتماع:
1. ما هي الخطوات المحددة التي ستتخذونها لمعالجة هذه المشكلة وموعد البدء بها؟
2. متى وكيف سينتهي الموعد المترقب لتقييم النتائج (Uppföljning)؟
3. من هو الشخص المسؤول المباشر عن تنفيذ هذه القرارات من طرفكم؟
4. هل يمكنكم تزويدي بنسخة مكتوبة من محضر الاجتماع (Protokoll / Minnesanteckningar)؟
5. ما هي حقوقنا القانونية للاعتراض أو التعديل في حال عدم تحسن الوضع؟`,
    instructions_ar: 'يمكنك استخدام هذه الأسئلة كمرجع إرشادي أثناء المقابلة للحصول على ردود كتابية محددة.',
    instructions_sv: 'Använd dessa frågor för att ställa tydliga krav under mötet.',
    checklist_ar: [
      'السؤال عن موعد التقييم القادم (Uppföljning)',
      'طلب المحضر المكتوب (Protokoll)',
      'معرفة اسم وتواصل الشخص المسؤول المباشر'
    ]
  },
  {
    id: 'contact-log-tracker',
    slug: 'contact-log-tracker',
    category: 'templates-tools',
    title_ar: 'نموذج توثيق المراسلات والمواعيد والقرارات (Kontaktlogg)',
    title_sv: 'Formulär för kontaktlogg och dokumentation',
    target_entity_ar: 'الأسرة للاحتفاظ الشخصي',
    target_entity_sv: 'Familjens egen dokumentation',
    description_ar: 'سجل عملي منظم لتدوين التاريخ، اسم الشخص، الجهة، ملخص ما تم الاتفاق عليه لتكون مرجعيتك قوية وسليمة.',
    description_sv: 'En praktisk mall för att föra anteckningar om datum, person, myndighet och beslut.',
    template_text_sv: `[SEKRETESS & EGEN DOKUMENTATION]

Datum för kontakt: ____ - ____ - 2026
Myndighet / Skola: _______________________
Kontaktperson (Namn & Titel): _______________________
Kommunikationssätt (Möte / Telefon / E-post): _______________________

Sammanfattning av vad som diskuterades:
____________________________________________________________________
____________________________________________________________________

Beslut & Överenskomna åtgärder:
____________________________________________________________________
____________________________________________________________________

Nästa uppföljningsdatum: ____ - ____ - 2026`,
    instructions_ar: 'احتفظ بهذا السجل في ملف خاص بك بعد كل مكالمة أو اجتماع رسمي ليكون دليلًا واضحًا على متابعتك للخطوات.',
    instructions_sv: 'Fyll i efter varje kontakt och spara i en egen pärm.',
    checklist_ar: [
      'تدوين تاريخ وتوقيت التواصل بالضبط',
      'تدوين الاسم الثلاثي والمسمى الوظيفي للموظف',
      'كتابة القرارات والمواعيد القادمة بوضوح'
    ]
  },
  {
    id: 'document-review-checklist',
    slug: 'document-review-checklist',
    category: 'templates-tools',
    title_ar: 'قائمة مراجعة المستندات والقرارات قبل التوقيع أو الموافقة',
    title_sv: 'Checklista för granskning av dokument och beslut',
    target_entity_ar: 'القرارات المدرسية والرسمية',
    target_entity_sv: 'Skolbeslut och myndighetsbeslut',
    description_ar: 'خطوات أمان للتحقق من سلامة الأوراق والمستندات قبل تسليمها أو التوقيع عليها.',
    description_sv: 'Säkerhetssteg för att granska dokument innan signering.',
    template_text_sv: `خطوات التفقد قبل الاعتماد:
1. التأكد من أن جميع أسماء العائلة وتواريخ الميلاد مكتوبة بدقة دون أخطاء إملائية.
2. التحقق من مطابقة الترجمة الفورية باللغة العربية مع ما ورد في النص السويدي المكتوب.
3. التثبت من وجود خيار الطعن أو الاعتراض (Överklagande) والمدة الزمنية المتاحة لذلك.
4. أخذ نسخة ضوئية أو ورقية كاملة من كل مستند قبل إعادة تسليمه للجهة الرسمية.`,
    instructions_ar: 'استخدم هذه القائمة كدرع أمان للتأكد من سلامة وحقوق أسرتك التامة.',
    instructions_sv: 'Använd listan för att kontrollera att alla fakta stämmer.',
    checklist_ar: [
      'التأكد من دقة البيانات الشخصية',
      'فهم شروط الاعتراض وتاريخ انتهاء مهلته',
      'الاحتفاظ بنسخة طبق الأصل للوثيقة'
    ]
  }
];
