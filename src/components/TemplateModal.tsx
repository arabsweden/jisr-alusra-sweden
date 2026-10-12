import React, { useState } from 'react';
import { PracticalTemplate, Language } from '../types';
import { X, Copy, Check, Printer, FileText, CheckSquare, Sparkles } from 'lucide-react';

interface Props {
  template: PracticalTemplate;
  lang: Language;
  onClose: () => void;
}

export const TemplateModal: React.FC<Props> = ({ template, lang, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [formFields, setFormFields] = useState<Record<string, string>>({});

  // Replace placeholders in Swedish template text
  const getFilledTemplateText = () => {
    let result = template.template_text_sv;
    if (template.fields_to_fill) {
      template.fields_to_fill.forEach(field => {
        const value = formFields[field.key] || `[${field.key}]`;
        result = result.replaceAll(`[${field.key}]`, value);
      });
    }
    return result;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFilledTemplateText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#185C7A]/20 shadow-2xl p-6 relative print-container">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#123B4A] transition no-print cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-[#185C7A]/10 pb-4 mb-4">
          <div className="flex items-center gap-2 text-[#185C7A] mb-1">
            <FileText className="w-5 h-5 text-[#2F8F83]" />
            <span className="text-xs font-bold bg-[#185C7A]/10 px-2.5 py-0.5 rounded-full">
              {lang === 'ar' ? template.target_entity_ar : template.target_entity_sv}
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#185C7A]">
            {lang === 'ar' ? template.title_ar : template.title_sv}
          </h2>
          <p className="text-xs text-[#2F8F83] font-medium mt-1">
            {template.title_sv}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-[#F7F5EF] p-3.5 rounded-xl border border-[#185C7A]/15 mb-4 text-xs text-[#123B4A]">
          <p className="font-bold text-[#185C7A] mb-1">
            💡 {lang === 'ar' ? 'طريقة استخدام النموذج:' : 'Hur du använder mallen:'}
          </p>
          <p className="leading-relaxed opacity-90">
            {lang === 'ar' ? template.instructions_ar : template.instructions_sv}
          </p>
        </div>

        {/* Dynamic Form Fields (if available) */}
        {template.fields_to_fill && template.fields_to_fill.length > 0 && (
          <div className="mb-6 bg-[#185C7A]/5 p-4 rounded-xl border border-[#185C7A]/15 no-print">
            <h3 className="text-xs font-bold text-[#185C7A] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F2C86B]" />
              <span>{lang === 'ar' ? 'قم بتعبئة حقول النموذج أولاً لتحديث النص السويدي تلقائيًا:' : 'Fyll i fälten:'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {template.fields_to_fill.map(field => (
                <div key={field.key}>
                  <label className="block text-[11px] font-semibold text-[#123B4A] mb-1">
                    {lang === 'ar' ? field.label_ar : field.label_sv} ({field.key})
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={formFields[field.key] || ''}
                    onChange={(e) => setFormFields({ ...formFields, [field.key]: e.target.value })}
                    className="w-full bg-white border border-[#185C7A]/20 rounded-lg p-2 text-xs text-[#123B4A] focus:outline-none focus:ring-2 focus:ring-[#185C7A]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filled Swedish Template Display Box */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-[#185C7A]">
              🇸🇪 {lang === 'ar' ? 'النص السويدي الجاهز للنسخ:' : 'Svensk text:'}
            </h3>
            <div className="flex items-center gap-2 no-print">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-[#185C7A] hover:bg-[#124259] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#F2C86B]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Kopierad!') : (lang === 'ar' ? 'نسخ النص' : 'Kopiera')}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#123B4A] px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'طباعة / PDF' : 'Skriv ut'}</span>
              </button>
            </div>
          </div>

          <pre className="bg-gray-50 border border-gray-300 rounded-xl p-4 text-xs font-mono text-gray-800 whitespace-pre-wrap leading-relaxed dir-ltr text-left overflow-x-auto shadow-inner">
            {getFilledTemplateText()}
          </pre>
        </div>

        {/* Checklist */}
        {template.checklist_ar && template.checklist_ar.length > 0 && (
          <div className="border-t border-[#185C7A]/10 pt-4">
            <h3 className="text-xs font-bold text-[#185C7A] mb-2 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-[#2F8F83]" />
              <span>{lang === 'ar' ? 'قائمة تفقدية قبل الإرسال:' : 'Checklista före sändning:'}</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-[#123B4A]">
              {template.checklist_ar.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-[#2F8F83]/20 text-[#2F8F83] flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
