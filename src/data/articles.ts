import { Article } from '../types';

export const articles: Article[] = [
  {
    id: 'school-communication-guide',
    slug: 'school-communication-guide',
    category: 'school',
    title_ar: 'كيف تتواصل الأسرة مع المدرسة عند وجود مشكلة؟',
    title_sv: 'Hur kommunicerar familjen med skolan vid problem?',
    summary_ar: 'دليل عملي حول خطوات التواصل المتدرج مع المدرسة السويدية بدءًا من معلم الفصل وحتى مدير المدرسة والجهة الرقابية.',
    summary_sv: 'En praktisk guide om stegvis kommunikation med den svenska skolan från lärare till rektor och tillsynsmyndighet.',
    body_ar: `تعتمد المدرسة السويدية على مبدأ الشراكة الوثيقة بين البيت والمدرسة (Hem och skola). عندما يواجه الطالب أي تحدٍ أكاديمي، اجتماعي، أو سلوكي، فإن من حق الأسرة التواصل مباشرة مع الكادر المدرسي للحصول على التوضيحات والدعم المناسب.

من المهم دائمًا اتباع التسلسل الإداري المتدرج داخل المدرسة لضمان حل المشكلات بسرعة وفاعلية دون تخطي المراحل الأساسية.

### التسلسل الإداري للتواصل:
1. **المعلم أو الـ Mentor:** هو الشريك الأساسي والمطلع الأول على يوميات الطالب. تواصل معه أولاً عبر البريد الإلكتروني الرسمي أو منصة المدرسة (مثل Unikum أو Skolplattformen).
2. **مدير المدرسة (Rektor):** إذا لم تجد حلاً مع المعلم، أو كانت القضية تتعلق بسلامة الطالب أو التنمر، يحق لك طلب اجتماع رسمي مع Rektor.
3. **الجهة المسؤولة (Huvudman):** إذا لم تقم المدرسة بدورها، يمكنك التوجه إلى إدارة التعليم بالبلدية (للتعليم الحكومي) أو مجلس الإدارة (للمدارس الخاصة).
4. **التفتيش المدرسي (Skolinspektionen):** هي الجهة الحكومية الرسمية التي تتلقى الشكاوى عند عدم استجابة المدرسة للمتطلبات القانونية.`,
    body_sv: `Den svenska skolan bygger på nära samverkan mellan hem och skola. När en elev möter utmaningar har familjen rätt till direkt kommunikation för stöd.

Det är viktigt att följa den formella kontaktkedjan:
1. Lärare / Mentor: Första kontakten för dagliga frågor.
2. Rektor: Om lösning saknas eller vid trygghetsfrågor.
3. Huvudman: Kommunens utbildningsförvaltning eller friskolans styrelse.
4. Skolinspektionen: Statlig tillsynsmyndighet för formella anmälningar.`,
    practical_steps: [
      {
        step_number: 1,
        title_ar: 'تحديد المشكلة بدقة',
        title_sv: 'Identifiera problemet tydligt',
        description_ar: 'اكتب ملاحظاتك وتاريخ وقوع المشكلة وأثرها على الطالب بشكل واضح ومحايد.',
        description_sv: 'Skriv ner datum, händelser och påverkan på eleven tydligt.'
      },
      {
        step_number: 2,
        title_ar: 'طلب موعد اجتماع رسمي',
        title_sv: 'Begär ett formellt möte',
        description_ar: 'أرسل رسالة كتابية لمعلم الفصل أو Mentor تطلب فيها اجتماعًا وتوضح النقاط المراد مناقشتها.',
        description_sv: 'Skicka ett skriftligt meddelande till lärare/mentor för att boka möte.'
      },
      {
        step_number: 3,
        title_ar: 'التحضير للاجتماع وطرح الأسئلة',
        title_sv: 'Förbered mötet och ställ frågor',
        description_ar: 'اطلب مترجمًا معتمدًا إذا كنت تفضل الحديث باللغة العربية، ودوّن جميع القرارات المتفق عليها.',
        description_sv: 'Boka tolk vid behov och anteckna alla överenskomna beslut.'
      }
    ],
    when_help_needed_ar: 'إذا تعرض الطالب للتنمر المستمر، أو الغياب القسري، أو رفضت المدرسة تقديم خطة دعم دراسي (Åtgärdsprogram) رغم وجود صعوبات تعلم مثبتة.',
    when_help_needed_sv: 'Om eleven utsätts för upprepad mobbning, oroväckande frånvaro, eller om skolan vägrar utarbeta ett åtgärdsprogram vid behov.',
    official_source_name: 'Skolverket',
    official_source_url: 'https://www.skolverket.se/regler-och-ansvar/ansvar-i-skolfragan/samarbete-mellan-hem-och-skola',
    last_verified_date: '2026-03-15',
    tags: ['المدرسة', 'التواصل', 'المدير', 'Mentor', 'Skolverket'],
    disclaimer_ar: 'هذه المعلومات عامة وتسترشد بقانون المدارس السويدي (Skollagen)، ولا تعوض عن التواصل المباشر مع إدارة مدرستك.',
    disclaimer_sv: 'Informationen baseras på skollagen och ersätter inte direktkontakt med skolan.',
    is_featured: true,
    is_popular: true,
    read_time_min: 5,
    is_demo: true
  },
  {
    id: 'social-services-explained',
    slug: 'social-services-explained',
    category: 'social-services',
    title_ar: 'ما هي الخدمات الاجتماعية (السوسيال) وما حقوق الأسرة؟',
    title_sv: 'Vad är Socialtjänsten och vilka är familjens rättigheter?',
    summary_ar: 'شرح هادئ ومبسط عن طبيعة عمل الخدمات الاجتماعية في السويد، والفرق بين تقديم الدعم الطوعي والتحقيق الاجتماعي، مع بيان حقوق الوالدين.',
    summary_sv: 'En lugn och tydlig förklaring av socialtjänstens arbete, skillnaden mellan frivilligt stöd och utredning, samt föräldrars rättigheter.',
    body_ar: `تعتبر الخدمات الاجتماعية (Socialtjänsten - السوسيال) في السويد جهة بلدية تهدف إلى تقديم الدعم والمساندة للأسر والأطفال والأفراد لضمان بيئة آمنة وصحية.

### متى تتواصل الخدمات الاجتماعية مع الأسرة؟
تتواصل الخدمات الاجتماعية مع الأسرة في حالتين رئيسيتين:
1. **طلب دعم طوعي من الأسرة نفسها (Ansökan om stöd):** عندما تطلب الأسرة الإرشاد الوالدي، الدعم النفسي، أو المساعدة في حل الخلافات الأسرية.
2. **وصول بلاغ قلق (Orosanmälan):** عندما ترسل جهة كالـمدرسة أو المركز الصحي أو الشرطة بلاغًا يعبر عن القلق بشأن رفاهية الطفل أو سلامته.

### ما الفرق بين الدعم والتحقيق؟
- **الدعم الطوعي (Frivilliga insatser):** خدمات يُقدم عليها الوالدان برغبتهما كاملة، مثل دورات التربية (COPE أو Alla Barn i Centrum) أو الاستشارات الأسرية.
- **التحقيق الاجتماعي (Utredning):** دراسة حالة يجريها الأخصائي الاجتماعي لفهم احتياجات الطفل، وستستمع الجهة لأقوال الوالدين والطفل للوصول إلى أفضل قرارات الدعم.

### حقوق الوالدين أثناء الاجتماعات:
- **حق طلب مترجم معتمد (Tolkservice):** يحق لك الحصول على مترجم فوري مجاني باللغة العربية.
- **حق السؤال والفهم:** يحق لك معرفة سبب البلاغ ومحتواه بالكامل.
- **حق الاطلاع على المستندات (Aktinsyn):** يحق لك مراءة ما يُكتب في ملفك وتصحيح أي معلومات غير دقيقة.
- **حق إحضار شخص داعم:** يمكنك اصطحاب شخص تثق به لحضور الاجتماعات.`,
    body_sv: `Socialtjänsten är en kommunal verksamhet som syftar till att ge stöd till familjer och barn för att säkerställa en trygg uppväxt.

Kontakt sker antingen via frivillig ansökan om stöd eller efter en orosanmälan från skola, hälso- och sjukvård eller polis.

Föräldrars rättigheter omfattar:
- Rätt till kvalificerad tolk.
- Rätt till aktinsyn och information.
- Rätt att ta med stödperson vid möten.`,
    practical_steps: [
      {
        step_number: 1,
        title_ar: 'الحفاظ على الهدوء والتعاون',
        title_sv: 'Behåll lugnet och samarbeta',
        description_ar: 'الهدف المعلن للخدمات الاجتماعية هو مصلحة الطفل الفضلى؛ التعبير عن حرصك وادراكك لمصلحة أبنائك يساعد في بناء حوار إيجابي.',
        description_sv: 'Målet är barnets bästa. Visa din vilja att samarbeta kring barnets behov.'
      },
      {
        step_number: 2,
        title_ar: 'طلب مترجم رسمي مسبقًا',
        title_sv: 'Boka tolk i förväg',
        description_ar: 'تأكد عند تحديد أي موعد من طلب مترجم شفوي معتمد باللغة العربية لضمان فهم جميع التفاصيل.',
        description_sv: 'Säkerställ att en godkänd tolk bokas till alla möten.'
      },
      {
        step_number: 3,
        title_ar: 'احتفظ بتوثيق كتابي لجميع المراسلات',
        title_sv: 'Spara skriftlig dokumentation',
        description_ar: 'احتفظ بنسخ من جميع القرارات، الرسائل، والملاحظات التي تسلمتها أو أرسلتها للخدمات الاجتماعية.',
        description_sv: 'Spara alla skriftliga beslut, e-postmeddelanden och minnesanteckningar.'
      }
    ],
    when_help_needed_ar: 'في حال وجود خلاف قانوني حول قرارات رسمية صدرت، أو الحاجة لاستشارة قانونية متخصصة في محامي أسرة (Familjerättsadvokat).',
    when_help_needed_sv: 'Vid juridiska tvister eller behov av specialiserad juridisk rådgivning från en familjerättsadvokat.',
    official_source_name: 'Socialstyrelsen',
    official_source_url: 'https://www.socialstyrelsen.se/om-socialstyrelsen/ett-stod-for-familjer-och-barn/',
    last_verified_date: '2026-03-15',
    tags: ['السوسيال', 'الخدمات الاجتماعية', 'حقوق الوالدين', 'مترجم', 'Socialstyrelsen'],
    disclaimer_ar: 'هذه المعلومات توعوية عامة ولا تمثل استشارة قانونية فردية. لا يمكن التنبؤ بقرارات القضايا الفردية.',
    disclaimer_sv: 'Allmän information som inte ersätter individuell juridisk rådgivning.',
    is_featured: true,
    is_popular: true,
    read_time_min: 7,
    is_demo: true
  },
  {
    id: 'child-rights-sweden',
    slug: 'child-rights-sweden',
    category: 'child-rights',
    title_ar: 'حقوق الطفل واتفاقية الأمم المتحدة في القانون السويدي',
    title_sv: 'Barnets rättigheter och Barnkonventionen i svensk lag',
    summary_ar: 'نظرة شمولية على حماية حقوق الطفل، منع العقاب البدني والنفسي، وحق الطفل في التعبير عن رأيه وفقًا للتشريعات السويدية.',
    summary_sv: 'Översikt över barnets rättigheter, förbud mot kroppslig/psykisk bestraffning och barnets rätt att komma till tals.',
    body_ar: `أصبحت اتفاقية الأمم المتحدة لحقوق الطفل (Barnkonventionen) جزءًا لا يتجزأ من القانون السويدي المباشر منذ عام 2020. 

### المبادئ الأربعة الأساسية لحقوق الطفل:
1. **عدم التمييز (المادة 2):** يتمتع جميع الأطفال في السويد بنفس الحقوق بغض النظر عن جنسيتهم أو خلفيتهم الثقافية أو أصولهم.
2. **مصلحة الطفل الفضلى (المادة 3):** يجب أن تكون مصلحة الطفل هي الاعتبار الأول في جميع القرارات التي تتخذها المدارس والمؤسسات والجهات الحكومية.
3. **الحق في الحياة والبقاء والنمو (المادة 6):** ضمان البيئة الآمنة والرعاية الصحية والتعليم السليم.
4. **احترام رأي الطفل (المادة 12):** يحق للطفل الاستماع إلى رأيه وأخذه بعين الاعتبار وفقًا لعمره ومستوى نضجه.

### حظر العقاب البدني والنفسي:
السويد هي أول دولة في العالم حظرت العقاب البدني للأطفال تمامًا بالقانون منذ عام 1979. يُحظر الضرب، الصفح، أو الإهانة النفسية واللفظية، وتعتبر هذه التصرفات مخالفة صريحة لقانون الوالدية والرعاية (Föräldrabalken).`,
    body_sv: `Barnkonventionen är svensk lag sedan 2020. 

De fyra huvudprinciperna:
1. Icke-diskriminering.
2. Barnets bästa i främsta rummet.
3. Rätt till liv och utveckling.
4. Rätt att uttrycka sin mening.

Sverige förbjöd kroppslig bestraffning 1979 via Föräldrabalken.`,
    practical_steps: [
      {
        step_number: 1,
        title_ar: 'الحوار والإصغاء الفعال للطفل',
        title_sv: 'Aktivt lyssnande på barnet',
        description_ar: 'خصص وقتًا يوميًا للاستماع لأفكار طفلك ومشاعر حول المدرسة والأصدقاء بدون إصدار أحكام إحباطية.',
        description_sv: 'Ge barnet utrymme att uttrycka sina tankar utan uppfostringsstress.'
      },
      {
        step_number: 2,
        title_ar: 'استخدام البدائل التربوية الإيجابية',
        title_sv: 'Använd positiva uppfostringsmetoder',
        description_ar: 'استبدال الصراخ بالاتفاق الواضح والتوجيه المقنع، والاستفادة من برامج دعم الوالدين المتاحة بالبلدية.',
        description_sv: 'Ersätt skrik med tydliga ramar och delta i kommunala föräldrakurser.'
      }
    ],
    when_help_needed_ar: 'عند مواجهة صعوبات تربوية شديدة في السيطرة على الغضب أو الضغوط النفسية داخل الأسرة.',
    when_help_needed_sv: 'Vid svårigheter med ilskekontroll eller stark stress i familjen.',
    official_source_name: 'Barnombudsmannen',
    official_source_url: 'https://www.barnombudsmannen.se/barnombudsmannen/barnkonventionen/',
    last_verified_date: '2026-03-15',
    tags: ['حقوق الطفل', 'اتفاقية الأمم المتحدة', 'التربية', 'Barnombudsmannen'],
    disclaimer_ar: 'محتوى توعوي مستند إلى التشريعات السويدية العامة.',
    disclaimer_sv: 'Utbildningsmaterial baserat på svensk lagstiftning.',
    is_featured: false,
    is_popular: true,
    read_time_min: 4,
    is_demo: true
  },
  {
    id: 'school-meetings-evk-prep',
    slug: 'school-meetings-evk-prep',
    category: 'school',
    title_ar: 'كيف تستعد لاجتماع تطوير الطالب (Utvecklingssamtal / EVK)؟',
    title_sv: 'Hur förbereder du dig inför utvecklingssamtal och EVK?',
    summary_ar: 'دليل شامل للتحضير لاجتماعات المدرسة الدورية، واجتماعات فريق صحة الطالب (Elevhälsan)، وكيفية طرح الأسئلة الصحيحة.',
    summary_sv: 'En omfattande guide för att förbereda utvecklingssamtal och elevhälsomöten (EVK) samt ställa rätt frågor.',
    body_ar: `تجري المدارس السويدية اجتماع تطوير الطالب (Utvecklingssamtal) مرة واحدة على الأقل كل فصل دراسي بمشاركة الطالب، والوالدين، والمينتور.

### ما هو اجتماع فريق صحة الطالب (EVK)؟
اجتماع فريق صحة الطالب (Elevhälsomöte / EVK) هو اجتماع متخصص يُعقد عندما يحتاج الطالب إلى خطة دعم دراسي مكثفة أو يعاني من صعوبات في التركيز، التعلم، أو الصحة النفسية. يضم هذا الاجتماع عادةً:
- مدير المدرسة أو نائب المدير.
- الأخصائي الاجتماعي بالمدرسة (Kurator).
- ممرضة المدرسة (Skolsköterska).
- معلم التربية الخاصة (Specialpedagog).

### أسئلة مهمة يمكنك طرحها في الاجتماع:
- كيف يقضي طفلي فترات الاستراحة (Rast)؟ هل لديه أصدقاء ويلعب مع الآخرين؟
- هل يحتاج طفلي إلى موائمات إضافية (Extra anpassningar) في بعض المواد؟
- كيف نتابع التقدم بين البيت والمدرسة؟`,
    body_sv: `Utvecklingssamtal genomförs minst en gång per termin. 

Elevhälsomöte (EVK) sammankallas vid behov av särskilt stöd och involverar specialpedagog, skolsköterska och kurator.`,
    practical_steps: [
      {
        step_number: 1,
        title_ar: 'الحديث مع الطفل قبل الاجتماع',
        title_sv: 'Prata med barnet före mötet',
        description_ar: 'اسأل طفلك عن الأمور التي يحبها في المدرسة والمواد التي يجد فيها صعوبة ليتم طرحها في الاجتماع.',
        description_sv: 'Fråga barnet vad som fungerar bra och vad som känns svårt.'
      },
      {
        step_number: 2,
        title_ar: 'طلب مترجم متخصص',
        title_sv: 'Boka kvalificerad tolk',
        description_ar: 'اطلب من المدرسة حجز مترجم عربي مسبقًا لضمان استيعاب كافة المفاهيم التربوية والدراسية.',
        description_sv: 'Be skolan boka tolk i god tid.'
      }
    ],
    when_help_needed_ar: 'إذا شعرت أن طفلك يتراجع دراسيًا بشكل ملحوظ أو يعاني من توتر وقلق شديد قبل الذهاب للمدرسة.',
    when_help_needed_sv: 'Om barnet visar tecken på skolskräck eller kraftigt försämrade studieresultat.',
    official_source_name: 'Skolverket',
    official_source_url: 'https://www.skolverket.se/foraktorer/elevhalsa',
    last_verified_date: '2026-03-15',
    tags: ['EVK', 'Utvecklingssamtal', 'صحة الطالب', 'المدرسة'],
    disclaimer_ar: 'معلومات عامة حول الاجتماعات المدرسية في السويد.',
    disclaimer_sv: 'Allmän information om skolmöten i Sverige.',
    is_featured: false,
    is_popular: false,
    read_time_min: 6,
    is_demo: true
  },
  {
    id: 'parental-leave-forskola',
    slug: 'parental-leave-forskola',
    category: 'family-law',
    title_ar: 'إجازة الوالدين (Föräldrapenning) والتسجيل في الروضة (Förskola)',
    title_sv: 'Föräldrapenning och anmälan till förskola',
    summary_ar: 'دليل مبسط حول حقوق الوالدين في التعويض المالي عند رعاية الأطفال، وشروط التقديم على الروضة السويدية.',
    summary_sv: 'Enkel guide om föräldrapenning från Försäkringskassan och regler för förskoleansökan.',
    body_ar: `تضمن الدولة السويدية دعمًا ماليًا ووظيفيًا للأسر عند ولادة أو تبني طفل من خلال صندوق التأمينات الاجتماعية (Försäkringskassan).

### إجازة الوالدين (Föräldrapenning):
- يحصل الوالدان على إجمالي 480 يوم إجازة مدفوعة لكل طفل.
- يتم توزيع الأيام بين الأب والأم لتعزيز رعاية الطفل المشتركة.
- تُحسب القيمة المالية بناءً على دخل الوالد قبل الإجازة (SGI)، أو الحد الأدنى (Sjukpenninggrundande inkomst).

### الروضة (Förskola):
- يحق لكل طفل ابتداءً من عمر سنة واحدة الحصول على مكان في الروضة إذا كان الوالدان يعملان أو يدرسان أو يبحثان عن عمل.
- المواعيد والتقديم يتم عبر موقع البلدية (Kommun) التابع لمحل السكن.`,
    body_sv: `Föräldrapenning betalas ut i 480 dagar per barn via Försäkringskassan. 

Barn från 1 års ålder har rätt till förskoleplats om föräldrarna arbetar, studerar eller är arbetssökande.`,
    practical_steps: [
      {
        step_number: 1,
        title_ar: 'إنشاء حساب على Försäkringskassan',
        title_sv: 'Skapa konto hos Försäkringskassan',
        description_ar: 'استخدام الهوية الإلكترونية BankID لمتابعة أيام الإجازة وتحديد مواعيد الصرف.',
        description_sv: 'Använd BankID för att logga in och planera föräldraledighet.'
      },
      {
        step_number: 2,
        title_ar: 'التقديم للروضة قبل 4 أشهر',
        title_sv: 'Ansök om förskola 4 månader innan',
        description_ar: 'تضمن البلدية توفير مكان للطفل خلال 4 أشهر من تقديم الطلب الرسمي.',
        description_sv: 'Kommunen garanterar plats inom 4 månader från ansökan.'
      }
    ],
    when_help_needed_ar: 'عند وجود استفسارات معقدة حول حساب الدخل أو الانتقال بين البلديات.',
    when_help_needed_sv: 'Vid komplicerade inkomstberäkningar eller flytt mellan kommuner.',
    official_source_name: 'Försäkringskassan',
    official_source_url: 'https://www.forsakringskassan.se/privatperson/foraldrar',
    last_verified_date: '2026-03-15',
    tags: ['Föräldrapenning', 'Förskola', 'الروضة', 'Försäkringskassan'],
    disclaimer_ar: 'معلومات عامة خاضعة للائحة التأمينات الاجتماعية السويدية.',
    disclaimer_sv: 'Allmän information enligt Försäkringskassans regelverk.',
    is_featured: false,
    is_popular: true,
    read_time_min: 5,
    is_demo: true
  },
  {
    id: 'marriage-divorce-custody',
    slug: 'marriage-divorce-custody',
    category: 'marriage-separation',
    title_ar: 'الزواج والانفصال والحضانة المشتركة (Vårdnad & Boende)',
    title_sv: 'Äktenskap, skilsmässa och gemensam vårdnad',
    summary_ar: 'فهم الجوانب القانونية للانفصال في السويد، والوساطة الأسرية (Familjerätt)، وحقوق الأطفال في السكن المشترك.',
    summary_sv: 'Förstå de juridiska aspekterna av skilsmässa, samarbetssamtal hos Familjerätten och barnets boende.',
    body_ar: `عند حدوث انفصال بين الوالدين في السويد، يظل الأصل القانوني هو الحفاظ على **الحضانة المشتركة (Gemensam vårdnad)** لضمان استمرار علاقة الطفل بكلا الوالدين.

### الوساطة الأسرية (Familjerätt / Samarbetssamtal):
تقدم البلدية خدمة مجانية تُسمى "محادثات التعاون" لمساعدة الوالدين المنفصلين على التوصل إلى اتفاقات ودية حول:
- **السكن (Boende):** أين يعيش الطفل (مثلاً أسبوع عند الأب وأسبوع عند الأم Växelvis boende).
- **حق الرؤية (Umgänge):** تنظيم زيارات الطفل.
- **النفقة (Underhållsstöd):** حماية التزامات الطفل المالية.

تعتبر قرارات قسم حقوق الأسرة بالبلدية (Familjerätten) ملزمة قانونًا عند المصادقة عليها.`,
    body_sv: `Vid skilsmässa är gemensam vårdnad huvudregeln. 

Kommunens Familjerätt erbjuder kostnadsfria samarbetssamtal för att komma överens om barnets boende, umgänge och underhåll.`,
    practical_steps: [
      {
        step_number: 1,
        title_ar: 'حجز موعد محادثات تعاون (Samarbetssamtal)',
        title_sv: 'Boka samarbetssamtal',
        description_ar: 'التواصل مع قسم حقوق الأسرة (Familjerätten) في بلدية محل السكن للبدء في الحوار الودي.',
        description_sv: 'Kontakta kommunens familjerätt för kostnadsfri rådgivning.'
      }
    ],
    when_help_needed_ar: 'عند وجود نزاع حاد يمنع الاتفاق الودي، حيث يتم اللجوء للمحكمة الابتدائية (Tingsrätt) لحسم القضية.',
    when_help_needed_sv: 'Vid djupa konflikter där ärendet måste prövas i Tingsrätten.',
    official_source_name: 'Myndigheten för familjerätt och föräldraskapsstöd',
    official_source_url: 'https://www.mfof.se/familjeratt/',
    last_verified_date: '2026-03-15',
    tags: ['الانفصال', 'الحضانة', 'Familjerätt', 'MFOF', 'الزواج'],
    disclaimer_ar: 'معلومات قانونية عامة للتوعية بمسارات الأحوال الشخصية في السويد.',
    disclaimer_sv: 'Allmän juridisk orientering om svensk familjerätt.',
    is_featured: false,
    is_popular: false,
    read_time_min: 5,
    is_demo: true
  }
];
