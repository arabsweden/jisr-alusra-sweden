import React, { useState } from 'react';
import { Language, PracticalTemplate } from '../types';
import { DataService } from '../services/dataService';
import { TemplateModal } from '../components/TemplateModal';
import { HelpfulFeedbackWidget } from '../components/HelpfulFeedbackWidget';
import { FileText, Copy, Printer, CheckSquare, Sparkles } from 'lucide-react';

interface Props {
  lang: Language;
}

export const TemplatesPage: React.FC<Props> = ({ lang }) => {
  const templates = DataService.getTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<PracticalTemplate | null>(null);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-[#185C7A] text-white p-8 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs">
          <FileText className="w-4 h-4" />
          <span>النماذج العملية والقوائم التحضيرية الجاهزة</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          نماذج ورسائل سويدية جاهزة للاستخدام
        </h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
          صيغ متقنة باللغة السويدية المعتمدة للاتصال بالمدارس والجهات الرسمية، مع إمكانية إدخال بيانات طفلك ومدرستك ونسخ النص بنقرة واحدة.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-2xl p-6 border border-[#185C7A]/15 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-[#185C7A]/10 text-[#185C7A] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {tpl.target_entity_ar}
                </span>
                <span className="text-xs text-[#2F8F83] font-medium italic">{tpl.title_sv}</span>
              </div>

              <h3 className="text-base font-bold text-[#185C7A]">
                {lang === 'ar' ? tpl.title_ar : tpl.title_sv}
              </h3>

              <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed font-medium">
                {lang === 'ar' ? tpl.description_ar : tpl.description_sv}
              </p>
            </div>

            <div className="pt-3 border-t border-[#185C7A]/10 flex items-center justify-between">
              <span className="text-[11px] text-[#2F8F83] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F2C86B]" />
                <span>تحديث بالبيانات المباشرة</span>
              </span>

              <button
                onClick={() => setSelectedTemplate(tpl)}
                className="flex items-center gap-1.5 bg-[#185C7A] hover:bg-[#124259] text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5 text-[#F2C86B]" />
                <span>فتح النموذج للنسخ</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Helpful Feedback Widget */}
      <HelpfulFeedbackWidget
        itemId="templates-page-overall"
        itemTitle="قسم النماذج والرسائل السويدية الجاهزة"
        lang={lang}
      />

      {/* Render Template Modal when selected */}
      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          lang={lang}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  );
};
