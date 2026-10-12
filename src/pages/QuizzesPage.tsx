import React, { useState } from 'react';
import { Language, Quiz, Article } from '../types';
import { DataService } from '../services/dataService';
import { QuizView } from '../components/QuizView';
import { HelpCircle, ArrowLeft, GraduationCap, HeartHandshake, Compass } from 'lucide-react';

interface Props {
  lang: Language;
  onSelectArticle: (article: Article) => void;
}

export const QuizzesPage: React.FC<Props> = ({ lang, onSelectArticle }) => {
  const quizzes = DataService.getQuizzes();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-[#185C7A] text-white p-8 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[#F2C86B] font-bold text-xs">
          <HelpCircle className="w-4 h-4" />
          <span>الاختبارات والتطبيقات التفاعلية التوعوية</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          اختبر حصيلتك وتعرف على حقوقك وإرشاداتك الأسرية
        </h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
          اختبارات توعوية سريعة تهدف لمساعدتك في قياس فهمك للنظام السويدي وتوجيهك للإرشادات والمصادر الصحيحة بشكل مريح وإيجابي.
        </p>
      </div>

      {selectedQuiz ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedQuiz(null)}
            className="flex items-center gap-2 bg-white border border-[#185C7A]/20 hover:bg-[#F7F5EF] text-[#185C7A] px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span>العودة لقائمة الاختبارات التوعوية</span>
          </button>

          <QuizView
            quiz={selectedQuiz}
            lang={lang}
            onSelectArticle={onSelectArticle}
            onReset={() => setSelectedQuiz(null)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl p-6 border border-[#185C7A]/15 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#185C7A]/10 text-[#185C7A] flex items-center justify-center font-bold">
                  {quiz.icon === 'GraduationCap' && <GraduationCap className="w-5 h-5 text-[#2F8F83]" />}
                  {quiz.icon === 'HeartHandshake' && <HeartHandshake className="w-5 h-5 text-[#2F8F83]" />}
                  {quiz.icon === 'Compass' && <Compass className="w-5 h-5 text-[#2F8F83]" />}
                </div>

                <h3 className="text-base font-bold text-[#185C7A]">
                  {lang === 'ar' ? quiz.title_ar : quiz.title_sv}
                </h3>

                <p className="text-xs text-[#123B4A]/80 leading-relaxed">
                  {lang === 'ar' ? quiz.description_ar : quiz.description_sv}
                </p>
              </div>

              <div className="pt-3 border-t border-[#185C7A]/10 flex items-center justify-between">
                <span className="text-[10px] text-[#123B4A]/60 font-semibold">
                  {quiz.questions.length} أسئلة توعوية
                </span>

                <button
                  onClick={() => setSelectedQuiz(quiz)}
                  className="flex items-center gap-1.5 bg-[#185C7A] hover:bg-[#124259] text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  <span>بدء الاختبار</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#F2C86B]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
