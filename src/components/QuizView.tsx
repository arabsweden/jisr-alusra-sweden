import React, { useState } from 'react';
import { Quiz, Language, Article } from '../types';
import { HelpCircle, CheckCircle, RefreshCw, ArrowLeft, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { DataService } from '../services/dataService';

interface Props {
  quiz: Quiz;
  lang: Language;
  onSelectArticle: (article: Article) => void;
  onReset: () => void;
}

export const QuizView: React.FC<Props> = ({ quiz, lang, onSelectArticle, onReset }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleSelectOption = (questionId: string, points: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: points });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate total score
  const totalScore = (Object.values(selectedAnswers) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);

  // Find matching result range
  const matchedResult = quiz.results.find(
    r => totalScore >= r.min_score && totalScore <= r.max_score
  ) || quiz.results[0];

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#185C7A]/20 shadow-md max-w-3xl mx-auto space-y-6">
      {/* Quiz Title */}
      <div className="border-b border-[#185C7A]/10 pb-4">
        <div className="flex items-center gap-2 text-[#185C7A] mb-1">
          <HelpCircle className="w-5 h-5 text-[#2F8F83]" />
          <span className="text-xs font-bold bg-[#185C7A]/10 px-2.5 py-0.5 rounded-full">
            اختبار توعوي تفاعلي
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[#185C7A]">
          {lang === 'ar' ? quiz.title_ar : quiz.title_sv}
        </h2>
        <p className="text-xs text-[#123B4A]/80 mt-1">
          {lang === 'ar' ? quiz.description_ar : quiz.description_sv}
        </p>
      </div>

      {!finished ? (
        /* Question Runner */
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-[#185C7A]">
            <span>السؤال {currentQuestionIndex + 1} من {quiz.questions.length}</span>
            <span>النقاط: {totalScore}</span>
          </div>

          <div className="bg-[#F7F5EF] p-5 rounded-2xl border border-[#185C7A]/15 space-y-4">
            <h3 className="text-base font-bold text-[#185C7A] leading-snug">
              {lang === 'ar' ? currentQuestion.question_ar : currentQuestion.question_sv}
            </h3>

            <div className="space-y-2.5">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option.points;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(currentQuestion.id, option.points)}
                    className={`w-full text-start p-3.5 rounded-xl border-2 transition cursor-pointer flex items-center justify-between text-xs font-semibold ${
                      isSelected
                        ? 'border-[#185C7A] bg-[#185C7A] text-white shadow-xs'
                        : 'border-[#185C7A]/20 bg-white text-[#123B4A] hover:border-[#185C7A]/50 hover:bg-[#185C7A]/5'
                    }`}
                  >
                    <span>{lang === 'ar' ? option.text_ar : option.text_sv}</span>
                    {isSelected && <CheckCircle className="w-4 h-4 text-[#F2C86B] shrink-0 ms-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-[#123B4A] px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion.id] === undefined}
              className="flex items-center gap-1 bg-[#185C7A] hover:bg-[#124259] disabled:opacity-40 text-white px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <span>{currentQuestionIndex === quiz.questions.length - 1 ? 'عرض النتيجة التوعوية' : 'التالي'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 text-center animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-[#185C7A]/5 border border-[#185C7A]/20 space-y-3">
            <div className="w-12 h-12 bg-[#185C7A] text-[#F2C86B] rounded-full flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-[#185C7A]">
              {lang === 'ar' ? matchedResult.title_ar : matchedResult.title_sv}
            </h3>

            <p className="text-xs text-[#123B4A]/90 leading-relaxed max-w-lg mx-auto">
              {lang === 'ar' ? matchedResult.guidance_ar : matchedResult.guidance_sv}
            </p>
          </div>

          {/* Recommended Articles & Sources */}
          <div className="text-start space-y-3">
            <h4 className="text-xs font-bold text-[#185C7A] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#2F8F83]" />
              <span>موضوعات مقترحة لزيادة حصيلتك المعرفية:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedResult.recommended_article_slugs.map((slug) => {
                const article = DataService.getArticleBySlug(slug);
                if (!article) return null;
                return (
                  <div
                    key={slug}
                    onClick={() => onSelectArticle(article)}
                    className="p-3 bg-[#F7F5EF] rounded-xl border border-[#185C7A]/15 hover:border-[#185C7A] transition cursor-pointer"
                  >
                    <h5 className="text-xs font-bold text-[#185C7A] mb-1">
                      {lang === 'ar' ? article.title_ar : article.title_sv}
                    </h5>
                    <p className="text-[11px] text-[#123B4A]/70 line-clamp-2">
                      {lang === 'ar' ? article.summary_ar : article.summary_sv}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#F2C86B]/20 p-3 rounded-xl text-[11px] text-[#123B4A] border border-[#F2C86B]">
            تنبيه: نتيجة هذا الاختبار للتوعية والتعليم العام فقط، ولا تمثل تقييمًا أو تشخيصًا نفسيًا أو قانونيًا أو طبيًا رسمياً.
          </div>

          <button
            onClick={() => {
              setSelectedAnswers({});
              setCurrentQuestionIndex(0);
              setFinished(false);
            }}
            className="flex items-center gap-2 bg-[#185C7A] hover:bg-[#124259] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition mx-auto cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>إعادة الاختبار</span>
          </button>
        </div>
      )}
    </div>
  );
};
