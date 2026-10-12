import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Upload, Mic, Loader2 } from 'lucide-react';
import { Language } from '../types';

export const ConsultationPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!prompt && !file) return;
    setLoading(true);
    setReply(null);

    let fileData = null;
    let mimeType = null;

    if (file) {
      const reader = new FileReader();
      fileData = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result?.toString().split(',')[1]);
        reader.readAsDataURL(file);
      });
      mimeType = file.type;
    }

    const res = await fetch('/api/consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, fileData, mimeType }),
    });

    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
      <Helmet>
        <title>الاستشارات القانونية | جسر الأسرة السويدية</title>
      </Helmet>

      <div className="bg-[#185C7A] text-white p-6 rounded-3xl shadow-md">
        <h1 className="text-2xl font-bold">الاستشارات القانونية الذكية</h1>
        <p className="text-sm opacity-90 mt-2">
          اطرح سؤالك أو أرفق وثيقة للحصول على إجابة استرشادية بناءً على القوانين السويدية.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#185C7A]/20 shadow-sm space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="اكتب سؤالك هنا..."
          className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#185C7A] outline-none"
          rows={5}
        />
        
        <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-xl text-sm font-bold text-[#123B4A]">
                <Upload className="w-4 h-4"/>
                <span>إرفاق وثيقة/صورة</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,application/pdf" />
            </label>
            {file && <span className="text-xs text-emerald-600 self-center">{file.name}</span>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#185C7A] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#123B4A] transition"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          <span>إرسال الاستشارة</span>
        </button>
      </div>

      {reply && (
        <div className="bg-white p-6 rounded-3xl border border-[#2F8F83]/30 shadow-sm space-y-4 whitespace-pre-wrap">
          <h3 className="font-bold text-[#2F8F83]">الإجابة الاسترشادية:</h3>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};
