import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// System Prompt for "اسأل جسر الأسرة"
const ASSISTANT_SYSTEM_INSTRUCTION = `
أنت المساعد المعرفي والتفاعلي لمنصة "جسر الأسرة في السويد" (Familjebron Sverige).
شعار المنصة: "نربط الأسرة بالمعلومة الصحيحة".

مهامك ومبادئ إجابتك:
1. الإجابة بلغة عربية سهلة، هادئة، وغير مخيفة ومبسطة، مع ذكر المصطلحات السويدية الرسمية بين قوسين عند الحاجة (مثل: Mentor, Rektor, Åtgärdsprogram, Utvecklingssamtal, EVK, Socialtjänsten, Familjerätt).
2. الاعتماد حصريًا على التشريعات السويدية الرسمية والجهات الحكومية (Skolverket, Socialstyrelsen, 1177, Barnombudsmannen, MFOF, Sveriges Domstolar).
3. اقتراح خطوات عملية عامة متدرجة لمساعدة الأسرة، مع التأكيد بأن الإجراءات تتكيف حسب الحالة.
4. إظهار وتسمية المصادر الرسمية المعتمدة في نهاية الإجابة.
5. الاعتراف بوضوح عند عدم توفر معلومة موثوقة بالعبارة:
"لم نتمكن من التحقق من هذه المعلومة من مصدر رسمي، لذلك لن نقدم إجابة مؤكدة."

محظورات مطلقة:
- يمنع تقديم تشخيص طبي أو نفسي أو إصدار فتوى شرعية أو قرار قانوني نهائي.
- يمنع التنبؤ أو التكهن بقرارات الخدمات الاجتماعية (السوسيال) في القضايا الفردية.
- يمنع طلب أو تخزين بيانات شخصية حساسة أو الرقم الشخصي (Personnummer).
- يمنع اختلاق قوانين أو أرقام هاتفية أو روابط غير رسمية.
`;

// AI Assistant Endpoint
app.post('/api/assistant', async (req, res) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'الرجاء إدخال سؤال صحيح.' });
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured yet
      return res.json({
        reply: `أهلاً بك في "اسأل جسر الأسرة". بناءً على دليلك المعرفي، نقترح عليك البدء بالخطوات التالية:\n\n1. التواصل المباشر مع معلم الفصل (Mentor) أو المعلم المباشر.\n2. طلب اجتماع تطوير الطالب (Utvecklingssamtal) وتأكيد حجز مترجم شفوي معتمد باللغة العربية.\n3. التوجه لمدير المدرسة (Rektor) في حال عدم التوصل لحل.\n\nالمصدر الرسمي: Skolverket (مصلحة المدارس السويدية)\nرابط المصدر: https://www.skolverket.se`,
        citations: [
          { name: 'Skolverket', url: 'https://www.skolverket.se' },
          { name: 'Socialstyrelsen', url: 'https://www.socialstyrelsen.se' }
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: ASSISTANT_SYSTEM_INSTRUCTION,
        temperature: 0.3
      }
    });

    const replyText = response.text || 'عذرًا، لم أتمكن من الحصول على الإجابة من المصدر الرسمي حاليًا.';

    // Extract official citations referenced
    const citations = [
      { name: 'Skolverket', url: 'https://www.skolverket.se' },
      { name: 'Socialstyrelsen', url: 'https://www.socialstyrelsen.se' },
      { name: 'Barnombudsmannen', url: 'https://www.barnombudsmannen.se' }
    ].filter(c => replyText.toLowerCase().includes(c.name.toLowerCase()));

    return res.json({
      reply: replyText,
      citations: citations.length > 0 ? citations : [
        { name: 'Skolverket / Socialstyrelsen', url: 'https://www.skolverket.se' }
      ]
    });
  } catch (err: any) {
    console.error('Assistant API Error:', err);
    return res.status(500).json({
      error: 'حدث خطأ أثناء الاتصال بمساعد جسر الأسرة الذكي.',
      details: err.message
    });
  }
});

// AI Consultation Endpoint
app.post('/api/consultation', async (req, res) => {
  try {
    const { prompt, fileData, mimeType } = req.body;
    if (!prompt && !fileData) {
      return res.status(400).json({ error: 'الرجاء إدخال سؤالك أو إرفاق وثيقة.' });
    }

    if (!ai) {
      return res.status(503).json({ error: 'الخدمة غير متوفرة حالياً.' });
    }

    let contents: any = [];
    if (fileData) {
      contents.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: fileData,
        },
      });
    }
    if (prompt) {
      contents.push({ text: prompt });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contents,
      config: {
        systemInstruction: `
أنت المساعد القانوني المعرفي لـ "جسر الأسرة في السويد".
مهمتك: تقديم إجابة استرشادية بناءً على التشريعات السويدية (Sveriges rikes lag) والمصادر الحكومية.
يجب أن تتضمن إجابتك:
1. الإجابة القانونية المبسطة مع ذكر رقم القانون أو المادة القانونية (مثل: Föräldrabalken) إن أمكن.
2. المصادر الرسمية المستخدمة (مثل: Sveriges Domstolar, Socialstyrelsen).
3. "تنويه قانوني: هذه الاستشارة هي معلومات استرشادية عامة تستند إلى المصادر الرسمية السويدية، ولا تعتبر استشارة قانونية ملزمة أو بديلاً عن التواصل مع محامٍ متخصص أو الجهات المختصة في حالتك الخاصة. نحن لا نتحمل أي مسؤولية قانونية عن القرارات الشخصية بناءً على هذه المعلومات."
`,
        temperature: 0.2
      }
    });

    const replyText = response.text || 'عذرًا، لم أتمكن من الحصول على الإجابة.';

    return res.json({
      reply: replyText,
    });
  } catch (err: any) {
    console.error('Consultation API Error:', err);
    return res.status(500).json({
      error: 'حدث خطأ أثناء الاتصال بالمستشار الذكي.',
      details: err.message
    });
  }
});

// Vite Middleware integration for dev and static file serving for prod
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Familjebron Sverige server listening on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
