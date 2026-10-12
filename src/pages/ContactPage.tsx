import React, { useState } from 'react';
import { Language } from '../types';
import { Mail, Send, CheckCircle2, Facebook, Globe, MessageSquare, ShieldCheck } from 'lucide-react';

interface Props {
  lang: Language;
}

export const ContactPage: React.FC<Props> = ({ lang }) => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'استفسار عام', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#185C7A] text-white p-8 rounded-3xl shadow-md space-y-3">
        <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs">
          <Mail className="w-4 h-4" />
          <span>تواصل معنا واقترح موضوعات</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          اتصل بفريق مشروع "جسر الأسرة في السويد"
        </h1>
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl">
          نرحب بملاحظاتكم، اقتراحاتكم، واستفساراتكم العامة لتطوير الأدلة والنماذج العملية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-[#185C7A]/20 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-[#185C7A] text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#2F8F83]" />
              <span>قنوات التواصل الرسمية</span>
            </h3>

            <p className="text-[#123B4A]/80 leading-relaxed">
              يسعدنا تلقي رسائلكم واقتراحاتكم حول إضافة موضوعات أو رسائل سويدية جديدة.
            </p>

            <div className="space-y-2 pt-2 border-t border-[#185C7A]/10">
              <a
                href="[FACEBOOK_PAGE_URL]"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F5EF] hover:bg-[#185C7A] hover:text-white transition font-bold text-[#185C7A]"
              >
                <Facebook className="w-4 h-4 text-[#F2C86B]" />
                <span>صفحة الفيسبوك [FACEBOOK_PAGE_URL]</span>
              </a>

              <a
                href="[WEBSITE_URL]"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F5EF] hover:bg-[#185C7A] hover:text-white transition font-bold text-[#185C7A]"
              >
                <Globe className="w-4 h-4 text-[#2F8F83]" />
                <span>الموقع الرسمي [WEBSITE_URL]</span>
              </a>
            </div>
          </div>

          <div className="bg-[#185C7A]/5 p-4 rounded-2xl border border-[#185C7A]/15 text-xs text-[#185C7A] space-y-1">
            <ShieldCheck className="w-5 h-5 text-[#2F8F83]" />
            <p className="font-bold">تنبيه سرية:</p>
            <p className="text-[11px] opacity-80">يرجى عدم إرسال أرقام شخصية (Personnummer) أو قضايا حصرية حساسة عبر استمارة التواصل العامة.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-[#185C7A]/20 shadow-xs">
          {sent ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 bg-[#2F8F83]/10 text-[#2F8F83] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#185C7A]">تم استلام رسالتك بنجاح!</h3>
              <p className="text-xs text-[#123B4A]/80">شكرًا لتواصلك معنا ومساهمتك في تطوير منصة جسر الأسرة.</p>
              <button
                onClick={() => setSent(false)}
                className="bg-[#185C7A] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#124259] transition cursor-pointer"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#123B4A] mb-1">الاسم (اختياري):</label>
                <input
                  type="text"
                  placeholder="اسمك أو كنيتك..."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#123B4A] mb-1">البريد الإلكتروني للرد (اختياري):</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#123B4A] mb-1">نوع الاستفسار:</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-2.5 text-xs text-[#123B4A]"
                >
                  <option value="استفسار عام">استفسار عام</option>
                  <option value="اقتراح نموذج سويدي جديد">اقتراح نموذج سويدي جديد</option>
                  <option value="تصحيح معلومة أو مرجع">تصحيح معلومة أو مرجع</option>
                  <option value="تعاون معرفي">تعاون معرفي</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#123B4A] mb-1">الرسالة أو الاقتراح:</label>
                <textarea
                  rows={5}
                  required
                  placeholder="اكتب اقتراحك أو استفسارك هنا..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl p-3 text-xs text-[#123B4A] focus:outline-none focus:ring-2 focus:ring-[#185C7A]"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-[#185C7A] hover:bg-[#124259] text-white px-6 py-2.5 rounded-xl font-bold text-xs transition shadow-md cursor-pointer"
              >
                <span>إرسال الرسالة</span>
                <Send className="w-4 h-4 text-[#F2C86B]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
