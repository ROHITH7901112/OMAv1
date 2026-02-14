// ── New JSON-driven survey types ──

export type SurveyQuestionType = 'single ans' | 'multi ans' | 'free text' | 'rank' | 'likert';

export interface SurveyOption {
  option_id: number;
  option_text: string;
  score: number | null;
}

export interface SubQuestion {
  sub_question_id: number;
  question_text: string;
  weight: number;
  options: SurveyOption[];
}

export interface SurveyQuestion {
  main_question_id: number;
  question_text: string;
  question_type: SurveyQuestionType;
  weight: number;
  options: SurveyOption[];
  sub_questions: SubQuestion[];
}

export interface SurveyCategory {
  category_id: number;
  category_text: string;
  weight: number;
  questions: SurveyQuestion[];
}

/**
 * Response value stored per question:
 * - single ans  → number (selected option_id)
 * - multi ans   → number[] (selected option_ids)
 * - free text   → string
 * - rank        → number[] (ordered option_ids)
 * - likert      → Record<number, number> (sub_question_id → option_id)
 */
export type ResponseValue = number | number[] | string | Record<number, number>;

// ── Legacy types (kept for backward compatibility) ──

export type QuestionType = 'likert' | 'text' | 'multi-choice' | 'rank-order';

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: string[];
    placeholder?: string;
    correctOrder?: string[];
}

export interface Category {
    name: string;
    questions: Question[];
}

export const LIKERT_SCALE = [
    { value: 1, label: "Ad-hoc" },
    { value: 2, label: "Reactive" },
    { value: 3, label: "Defined" },
    { value: 4, label: "Managed" },
    { value: 5, label: "Optimized" },
];
