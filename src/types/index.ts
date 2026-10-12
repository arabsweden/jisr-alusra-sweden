export interface FaqItem {
  id: string;
  category: 'school' | 'social-services' | 'rights' | 'benefits' | 'courts' | 'general';
  question_ar: string;
  question_sv: string;
  answer_ar: string;
  answer_sv: string;
  legal_reference_ar?: string; // e.g. "قانون المدارس السويدي (Skollagen 2010:800)"
  legal_reference_sv?: string;
  official_source_name?: string;
  official_source_url?: string;
  related_template_id?: string;
  tags?: string[];
  verified_by?: string;
  verified_by_sv?: string;
  last_reviewed_date?: string;
  legal_topic_ar?: string;
  legal_topic_sv?: string;
}

export type Language = 'ar' | 'sv';

export interface Category {
  id: string;
  slug: string;
  title_ar: string;
  title_sv: string;
  name_ar?: string;
  name_sv?: string;
  description_ar: string;
  description_sv: string;
  icon: string; // Lucide icon name
  badgeColor?: string;
  itemCount: number;
}

export interface PracticalStep {
  step_number: number;
  title_ar: string;
  title_sv: string;
  description_ar: string;
  description_sv: string;
}

export interface Article {
  id: string;
  slug: string;
  category: string; // category id/slug
  title_ar: string;
  title_sv: string;
  summary_ar: string;
  summary_sv: string;
  body_ar?: string;
  body_sv?: string;
  content_ar?: string;
  content_sv?: string;
  practical_steps?: PracticalStep[];
  when_help_needed_ar?: string;
  when_help_needed_sv?: string;
  official_source_name: string;
  official_source_url: string;
  last_verified_date?: string;
  last_verified?: string;
  tags?: string[];
  disclaimer_ar?: string;
  disclaimer_sv?: string;
  is_featured?: boolean;
  is_popular?: boolean;
  read_time_min?: number;
  is_demo?: boolean;
  key_takeaways?: string[];
  action_steps?: string[];
  sources_references?: { title: string; url: string }[];
}

export interface OfficialSource {
  id: string;
  name_sv: string;
  name_ar: string;
  acronym?: string;
  description_ar: string;
  description_sv: string;
  category: string;
  url: string;
  last_verified_date: string;
  topics_covered: string[];
}

export interface PracticalTemplate {
  id: string;
  slug: string;
  category: string;
  title_ar: string;
  title_sv: string;
  target_entity_ar: string;
  target_entity_sv: string;
  description_ar: string;
  description_sv: string;
  template_text_sv: string; // Contains placeholders like [BARNETS_NAMN], [SKOLAN_NAMN], etc.
  instructions_ar: string;
  instructions_sv: string;
  checklist_ar: string[];
  fields_to_fill?: { key: string; label_ar: string; label_sv: string; placeholder: string }[];
}

export interface SurveyResponse {
  id: string;
  timestamp: string;
  age_group?: string;
  family_role?: string;
  residence_duration?: string;
  preferred_lang?: string;
  municipality_optional?: string;
  needed_topics: string[];
  school_challenges?: string;
  social_services_understanding?: string;
  family_topics_needed: string[];
  preferred_format: string[];
  user_suggestions?: string;
  consent_given: boolean;
}

export interface QuizQuestionOption {
  id: string;
  text_ar: string;
  text_sv: string;
  points: number;
}

export interface QuizQuestion {
  id: string;
  question_ar: string;
  question_sv: string;
  options: QuizQuestionOption[];
}

export interface QuizResultRange {
  min_score: number;
  max_score: number;
  title_ar: string;
  title_sv: string;
  guidance_ar: string;
  guidance_sv: string;
  recommended_article_slugs: string[];
  recommended_source_names: string[];
}

export interface Quiz {
  id: string;
  slug: string;
  title_ar: string;
  title_sv: string;
  description_ar: string;
  description_sv: string;
  icon: string;
  questions: QuizQuestion[];
  results: QuizResultRange[];
}

export interface AssistantCitation {
  name: string;
  url: string;
  last_verified?: string;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: AssistantCitation[];
  isDisclaimer?: boolean;
}

export interface UserBookmark {
  article_id: string;
  saved_at: string;
}
