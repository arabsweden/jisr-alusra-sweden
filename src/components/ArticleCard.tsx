import React from 'react';
import { Article, Language } from '../types';
import { Bookmark, ShieldCheck, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { DataService } from '../services/dataService';

interface Props {
  article: Article;
  lang: Language;
  onSelect: (article: Article) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (articleId: string) => void;
}

export const ArticleCard: React.FC<Props> = ({
  article,
  lang,
  onSelect,
  isBookmarked = false,
  onToggleBookmark
}) => {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleBookmark) {
      onToggleBookmark(article.id);
    } else {
      DataService.toggleBookmark(article.id);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: lang === 'ar' ? article.title_ar : article.title_sv,
        text: lang === 'ar' ? article.summary_ar : article.summary_sv,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'ar' ? 'تم نسخ رابط المقال إلى الحافظة!' : 'Länk kopierad!');
    }
  };

  return (
    <div
      onClick={() => onSelect(article)}
      className="bg-white rounded-2xl p-5 border border-[#185C7A]/15 shadow-xs hover:shadow-md hover:border-[#185C7A]/40 transition duration-200 cursor-pointer flex flex-col justify-between group relative"
    >
      <div>
        {/* Top Badges Line */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="bg-[#185C7A]/10 text-[#185C7A] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#185C7A]/20">
            {article.category === 'school' && (lang === 'ar' ? 'الأسرة والمدرسة' : 'Skola')}
            {article.category === 'social-services' && (lang === 'ar' ? 'الخدمات الاجتماعية' : 'Socialtjänsten')}
            {article.category === 'child-rights' && (lang === 'ar' ? 'حقوق الطفل' : 'Barnets rättigheter')}
            {article.category === 'family-law' && (lang === 'ar' ? 'القوانين الأسرية' : 'Familjerätt')}
            {article.category === 'marriage-separation' && (lang === 'ar' ? 'الزواج والانفصال' : 'Separation')}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleBookmarkClick}
              className={`p-1.5 rounded-full transition cursor-pointer ${
                isBookmarked
                  ? 'bg-[#F2C86B] text-[#123B4A]'
                  : 'bg-gray-100 text-[#123B4A]/60 hover:text-[#185C7A] hover:bg-gray-200'
              }`}
              title={isBookmarked ? 'حذف من المفضلة' : 'حفظ في المفضلة'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleShareClick}
              className="p-1.5 rounded-full bg-gray-100 text-[#123B4A]/60 hover:text-[#185C7A] hover:bg-gray-200 transition cursor-pointer"
              title="مشاركة"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Demo Content Warning Badge if is_demo */}
        {article.is_demo && (
          <div className="mb-2 bg-[#F2C86B]/30 border border-[#F2C86B] text-[#123B4A] text-[10px] font-bold px-2 py-0.5 rounded inline-block">
            محتوى تجريبي يحتاج إلى مراجعة قبل النشر
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-bold text-[#185C7A] group-hover:text-[#2F8F83] transition-colors leading-snug mb-2">
          {lang === 'ar' ? article.title_ar : article.title_sv}
        </h3>

        {/* Swedish Subtitle */}
        <p className="text-xs text-[#2F8F83] font-medium mb-3 italic">
          {article.title_sv}
        </p>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-[#123B4A]/90 leading-relaxed line-clamp-3 mb-4">
          {lang === 'ar' ? article.summary_ar : article.summary_sv}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-[#185C7A]/10 flex flex-wrap items-center justify-between text-[11px] text-[#123B4A]/70 gap-2">
        <div className="flex items-center gap-1.5 text-[#185C7A] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2F8F83]" />
          <span>{article.official_source_name}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#123B4A]/50" />
            <span>{article.read_time_min || 4} دقائق</span>
          </span>

          <span className="text-[#185C7A] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
            <span>{lang === 'ar' ? 'اقرأ المزيد' : 'Läs mer'}</span>
            <ArrowLeft className={`w-3.5 h-3.5 ${lang === 'sv' ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </div>
    </div>
  );
};
