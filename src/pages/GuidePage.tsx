import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Language, Article, Category } from '../types';
import { categories } from '../data/categories';
import { DataService } from '../services/dataService';
import { ArticleCard } from '../components/ArticleCard';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { SchoolHierarchyDiagram } from '../components/SchoolHierarchyDiagram';
import { Search, Filter, BookOpen, ShieldCheck, ArrowLeft, Bookmark } from 'lucide-react';

interface Props {
  lang: Language;
  onSelectArticle: (article: Article) => void;
  initialCategory?: string;
  searchQuery?: string;
}

export const GuidePage: React.FC<Props> = ({
  lang,
  onSelectArticle,
  initialCategory = 'all',
  searchQuery = ''
}) => {
  const [selectedCat, setSelectedCat] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const [bookmarksOnly, setBookmarksOnly] = useState<boolean>(false);

  const allArticles = DataService.getArticles();
  const bookmarkedIds = DataService.getBookmarks();

  const filteredArticles = useMemo(() => {
    return allArticles.filter(art => {
      // Category filter
      if (selectedCat !== 'all' && art.category !== selectedCat) return false;

      // Bookmarks filter
      if (bookmarksOnly && !bookmarkedIds.includes(art.id)) return false;

      // Search query filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const titleMatch = art.title_ar.toLowerCase().includes(q) || art.title_sv.toLowerCase().includes(q);
        const summaryMatch = art.summary_ar.toLowerCase().includes(q) || art.summary_sv.toLowerCase().includes(q);
        const contentMatch = (art.content_ar || art.body_ar || '').toLowerCase().includes(q);
        return titleMatch || summaryMatch || contentMatch;
      }

      return true;
    });
  }, [allArticles, selectedCat, bookmarksOnly, searchTerm, bookmarkedIds]);

  return (
    <div className="space-y-8 pb-12">
      <Helmet>
        <title>الدليل المعرفي | جسر الأسرة السويدية</title>
        <meta name="description" content="دليل الحياة الأسرية والتعليمية في السويد، يغطي كافة الجوانب المعرفية والقانونية للأسر العربية." />
      </Helmet>

      {/* Title Header */}
      <div className="bg-[#185C7A] text-white p-8 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
        <div className="absolute -end-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
        <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>الدليل المعرفي الشامل</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          دليل الحياة الأسرية والتعليمية في السويد
        </h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
          تصفح كافة الموضوعات الميدانية المصنفة بدقة وارجع إلى التشريعات الرسمية في كل مجال.
        </p>
      </div>

      {/* Persistent Disclaimer */}
      <DisclaimerBanner lang={lang} />

      {/* Filter Bar & Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#185C7A]/15 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث في المقالات والموضوعات..."
              className="w-full bg-[#F7F5EF] border border-[#185C7A]/20 rounded-xl py-2.5 ps-10 pe-4 text-xs text-[#123B4A] focus:outline-none focus:ring-2 focus:ring-[#185C7A]"
            />
            <Search className="w-4 h-4 text-[#185C7A]/60 absolute start-3 top-3" />
          </div>

          {/* Bookmarks Toggle Button */}
          <button
            onClick={() => setBookmarksOnly(!bookmarksOnly)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
              bookmarksOnly
                ? 'bg-[#F2C86B] text-[#123B4A] shadow-xs'
                : 'bg-[#F7F5EF] text-[#123B4A] border border-[#185C7A]/20 hover:bg-[#185C7A]/10'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarksOnly ? 'fill-current' : ''}`} />
            <span>المفضلة ({bookmarkedIds.length})</span>
          </button>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-[#185C7A] text-white shadow-xs'
                : 'bg-[#F7F5EF] text-[#123B4A] border border-[#185C7A]/15 hover:bg-[#185C7A]/10'
            }`}
          >
            جميع الموضوعات ({allArticles.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                selectedCat === cat.slug
                  ? 'bg-[#185C7A] text-white shadow-xs'
                  : 'bg-[#F7F5EF] text-[#123B4A] border border-[#185C7A]/15 hover:bg-[#185C7A]/10'
              }`}
            >
              <span>{lang === 'ar' ? cat.name_ar : cat.name_sv}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Show School Escalation Diagram if 'school' category is active */}
      {(selectedCat === 'school' || selectedCat === 'all') && (
        <div className="my-6">
          <SchoolHierarchyDiagram lang={lang} />
        </div>
      )}

      {/* Articles Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#185C7A]">
            المقالات والإرشادات المتاحة ({filteredArticles.length})
          </h2>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                lang={lang}
                onSelect={onSelectArticle}
                isBookmarked={bookmarkedIds.includes(art.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#185C7A]/15 space-y-3">
            <BookOpen className="w-12 h-12 text-[#185C7A]/30 mx-auto" />
            <h3 className="text-base font-bold text-[#185C7A]">لم نجد مقالات تطابق خيارات البحث</h3>
            <p className="text-xs text-[#123B4A]/70">جرّب تغيير كلمات البحث أو اختر تصنيفًا آخر.</p>
            <button
              onClick={() => {
                setSelectedCat('all');
                setSearchTerm('');
                setBookmarksOnly(false);
              }}
              className="bg-[#185C7A] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#124259] transition cursor-pointer"
            >
              عرض جميع المقالات
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
