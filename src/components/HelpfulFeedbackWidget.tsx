import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { ThumbsUp, ThumbsDown, CheckCircle2, MessageSquare, Send, Heart, Sparkles } from 'lucide-react';

interface Props {
  itemId: string;
  itemTitle?: string;
  lang?: Language;
  compact?: boolean;
  className?: string;
}

interface RatingEntry {
  rating: 'yes' | 'no';
  timestamp: number;
  comment?: string;
  itemTitle?: string;
}

const LOCAL_STORAGE_KEY = 'familjebron_helpful_ratings';

export const HelpfulFeedbackWidget: React.FC<Props> = ({
  itemId,
  itemTitle,
  lang = 'ar',
  compact = false,
  className = ''
}) => {
  const [rating, setRating] = useState<'yes' | 'no' | null>(null);
  const [comment, setComment] = useState<string>('');
  const [commentSaved, setCommentSaved] = useState<boolean>(false);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed: Record<string, RatingEntry> = JSON.parse(stored);
        if (parsed[itemId]) {
          setRating(parsed[itemId].rating);
          if (parsed[itemId].comment) {
            setComment(parsed[itemId].comment);
            setCommentSaved(true);
          }
        }
      }
    } catch (e) {
      console.error('Error loading feedback from localStorage:', e);
    }
  }, [itemId]);

  const saveRating = (newRating: 'yes' | 'no', optionalComment?: string) => {
    setRating(newRating);
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed: Record<string, RatingEntry> = stored ? JSON.parse(stored) : {};
      
      parsed[itemId] = {
        rating: newRating,
        timestamp: Date.now(),
        comment: optionalComment !== undefined ? optionalComment : (parsed[itemId]?.comment || ''),
        itemTitle: itemTitle || itemId
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
    } catch (e) {
      console.error('Error saving feedback to localStorage:', e);
    }
  };

  const handleRatingClick = (selected: 'yes' | 'no') => {
    saveRating(selected);
    if (selected === 'no') {
      setShowCommentBox(true);
    } else {
      setShowCommentBox(false);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating) {
      saveRating(rating, comment);
      setCommentSaved(true);
    }
  };

  const isAr = lang === 'ar';

  return (
    <div
      className={`bg-gradient-to-r from-[#185C7A]/5 via-[#2F8F83]/10 to-[#F7F5EF] border border-[#185C7A]/20 rounded-2xl p-4 sm:p-5 transition shadow-2xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title Question */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F2C86B]" />
            <h4 className="text-base sm:text-lg font-black text-[#123B4A]">
              {isAr ? 'هل كان هذا التوضيح مفيداً لك؟' : 'Var denna förklaring hjälpsam?'}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-[#123B4A]/70 font-medium">
            {isAr
              ? 'تقييمك يساعدنا على تحسين وتطوير جودة وتبسيط المحتوى الموجه للجالية.'
              : 'Din feedback hjälper oss att förbättرا innehållets kvalitet.'}
          </p>
        </div>

        {/* Action Choice Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleRatingClick('yes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer border ${
              rating === 'yes'
                ? 'bg-[#2F8F83] text-white border-[#2F8F83] shadow-xs'
                : 'bg-white hover:bg-emerald-50 text-[#123B4A] border-gray-200'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${rating === 'yes' ? 'fill-current' : 'text-emerald-600'}`} />
            <span>{isAr ? 'نعم، مفيد جداً' : 'Ja, hjälpsam'}</span>
          </button>

          <button
            onClick={() => handleRatingClick('no')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer border ${
              rating === 'no'
                ? 'bg-rose-800 text-white border-rose-900 shadow-xs'
                : 'bg-white hover:bg-rose-50 text-[#123B4A] border-gray-200'
            }`}
          >
            <ThumbsDown className={`w-4 h-4 ${rating === 'no' ? 'fill-current' : 'text-rose-600'}`} />
            <span>{isAr ? 'لا، يحتاج توضيحاً' : 'Nej, behövs mer'}</span>
          </button>
        </div>
      </div>

      {/* Thank you feedback message */}
      {rating === 'yes' && (
        <div className="mt-3 pt-3 border-t border-[#185C7A]/15 flex items-center gap-2 text-emerald-900 bg-emerald-50/80 p-3 rounded-xl text-xs sm:text-sm font-bold border border-emerald-200 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            {isAr
              ? 'شكراً لك! يسعدنا جداً أن التوضيح كان مفيداً وواضحاً لك. تم حفظ تقييمك بنجاح.'
              : 'Tack! Vi är glada att förklaringen var hjälpsam.'}
          </span>
        </div>
      )}

      {/* Optional Comment Input Box when rating is 'no' */}
      {rating === 'no' && (
        <div className="mt-3 pt-3 border-t border-[#185C7A]/15 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-rose-900">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4 text-rose-600" />
              <span>{isAr ? 'شكراً لملاحظتك! كيف يمكننا تحسين هذا التوضيح أكثر؟ (اختياري)' : 'Hur kan vi förbättرا förklaringen?'}</span>
            </span>
            {commentSaved && (
              <span className="text-emerald-700 bg-emerald-100 text-[11px] px-2 py-0.5 rounded font-bold">
                {isAr ? 'تم حفظ الملاحظة!' : 'Sparat!'}
              </span>
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={isAr ? 'اكتب اقتراحك هنا (مثلاً: إضافة أمثلة أكثر، تبسيط الكلمات القانونية...)' : 'Skriv ditt förslag här...'}
              className="flex-1 bg-white border border-rose-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#123B4A] focus:outline-none focus:border-[#185C7A]"
            />
            <button
              type="submit"
              className="bg-[#185C7A] hover:bg-[#123B4A] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5 text-[#F2C86B]" />
              <span>{isAr ? 'إرسال' : 'Skicka'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
