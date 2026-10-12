import React, { useState, useRef, useEffect } from 'react';
import { Language, AssistantMessage } from '../types';
import { Sparkles, Send, Bot, User, ExternalLink, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { getTranslation } from '../i18n/translations';
import { HelpfulFeedbackWidget } from './HelpfulFeedbackWidget';

interface Props {
  lang: Language;
}

export const AssistantChat: React.FC<Props> = ({ lang }) => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: lang === 'ar'
        ? 'مرحباً بك في "اسأل جسر الأسرة". أنا مساعدك الذكي المعتمد حصريًا على التشريعات والمصادر الرسمية السويدية (Skolverket, Socialstyrelsen, 1177, Barnombudsmannen). كيف يمكنني مساعدتك اليوم؟'
        : 'Välkommen till Fråga Familjebron! Hur kan jag hjälpa dig idag utifrån officiella svenska källor?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        { name: 'Skolverket', url: 'https://www.skolverket.se' },
        { name: 'Socialstyrelsen', url: 'https://www.socialstyrelsen.se' }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'كيف أتواصل مع المدرسة عند وجود مشكلة؟',
    'ما هي حقوق الوالدين أثناء اجتماع السوسيال؟',
    'ما الفرق بين المعلم المباشر والـ Mentor؟',
    'كيف أستعد لاجتماع تطوير الطالب EVK؟',
    'ما هي إجازة الوالدين Föräldrapenning؟'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const promptText = textToSend || input;
    if (!promptText.trim() || loading) return;

    const userMsg: AssistantMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });

      const data = await res.json();

      const assistantMsg: AssistantMessage = {
        id: 'ast-' + Date.now(),
        sender: 'assistant',
        text: data.reply || 'عذرًا، لم أتمكن من الحصول على المعلومة من المصدر الرسمي حاليًا.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || []
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: 'عذرًا، حدث خطأ في الاتصال بالمساعد الذكي. يمكنك مراجعة دليل الأسرة المكتوب للحصول على المعلومات.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#185C7A]/20 shadow-lg flex flex-col h-[75vh] max-w-4xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="bg-[#185C7A] text-white p-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#F2C86B]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <span>{getTranslation(lang, 'assistantTitle')}</span>
              <span className="bg-[#F2C86B] text-[#123B4A] text-[10px] font-extrabold px-2 py-0.2 rounded-full">
                ذكاء موثق
              </span>
            </h2>
            <p className="text-[11px] text-white/80">
              {getTranslation(lang, 'assistantSubtitle')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="text-xs text-white/70 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>محادثة جديدة</span>
        </button>
      </div>

      {/* Disclaimer Top Warning */}
      <div className="bg-[#F7F5EF] px-4 py-2 text-[11px] text-[#123B4A] border-b border-[#185C7A]/10 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-[#185C7A] shrink-0" />
        <span className="truncate">{getTranslation(lang, 'assistantDisclaimer')}</span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F7F5EF]/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-[#185C7A] text-white'
                  : 'bg-[#2F8F83] text-white shadow-xs'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 shadow-2xs space-y-3 text-sm sm:text-base leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#185C7A] text-white rounded-te-none'
                  : 'bg-white border border-[#185C7A]/15 text-[#123B4A] rounded-ts-none'
              }`}
            >
              <div className="whitespace-pre-wrap font-medium">{msg.text}</div>

              {/* Citations list for Assistant */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 mt-2 border-t border-[#185C7A]/10 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#185C7A] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2F8F83]" />
                    <span>المصادر الرسمية المعتمدة:</span>
                  </span>
                  {msg.citations.map((c, i) => (
                    <a
                      key={i}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-[#185C7A]/10 text-[#185C7A] hover:underline px-2.5 py-1 rounded-md font-bold"
                    >
                      <span>{c.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}

              {/* Feedback widget for assistant answers */}
              {msg.sender === 'assistant' && msg.id !== 'welcome' && (
                <div className="pt-2">
                  <HelpfulFeedbackWidget
                    itemId={`chat-msg-${msg.id}`}
                    itemTitle="إجابة المساعد الذكي القانونية"
                    lang={lang}
                    compact
                  />
                </div>
              )}

              <span className={`block text-[10px] text-end mt-1 ${msg.sender === 'user' ? 'text-white/60' : 'text-[#123B4A]/50'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#185C7A] font-bold p-3 bg-white border border-[#185C7A]/15 rounded-xl w-fit">
            <Sparkles className="w-4 h-4 animate-spin text-[#F2C86B]" />
            <span>يتأكد المساعد من المصادر الرسمية السويدية...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Chips */}
      <div className="p-2.5 bg-gray-50 border-t border-[#185C7A]/10 overflow-x-auto whitespace-nowrap flex items-center gap-2 text-xs">
        <span className="text-[10px] font-bold text-[#185C7A] shrink-0">أسئلة شائعة:</span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="bg-white border border-[#185C7A]/20 hover:bg-[#185C7A] hover:text-white px-3 py-1 rounded-full text-[11px] text-[#123B4A] transition shrink-0 cursor-pointer shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-[#185C7A]/10 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={getTranslation(lang, 'assistantInputPlaceholder')}
          className="flex-1 bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl px-4 py-2.5 text-xs text-[#123B4A] focus:outline-none focus:ring-2 focus:ring-[#185C7A]"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-[#185C7A] hover:bg-[#124259] disabled:opacity-40 text-white p-2.5 rounded-xl font-bold transition shadow-xs cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
