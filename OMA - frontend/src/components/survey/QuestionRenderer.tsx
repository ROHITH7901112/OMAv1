import type { SurveyQuestion, ResponseValue } from "../../types/survey";
import { SingleAnswerQuestion } from "./SingleAnswerQuestion";
import { MultiAnswerQuestion } from "./MultiAnswerQuestion";
import { FreeTextQuestion } from "./FreeTextQuestion";
import { RankQuestion } from "./RankQuestion";
import { LikertMatrixQuestion } from "./LikertMatrixQuestion";

interface QuestionRendererProps {
    question: SurveyQuestion;
    value: ResponseValue | undefined;
    onChange: (value: ResponseValue) => void;
}

export function QuestionRenderer({
    question,
    value,
    onChange,
}: QuestionRendererProps) {
    switch (question.question_type) {
        case "single ans":
            return (
                <SingleAnswerQuestion
                    options={question.options}
                    value={value as number | undefined}
                    onChange={(v) => onChange(v)}
                />
            );

        case "multi ans":
            return (
                <MultiAnswerQuestion
                    options={question.options}
                    value={value as number[] | undefined}
                    onChange={(v) => onChange(v)}
                />
            );

        case "free text":
            return (
                <FreeTextQuestion
                    value={value as string | undefined}
                    onChange={(v) => onChange(v)}
                />
            );

        case "rank":
            return (
                <RankQuestion
                    options={question.options}
                    value={value as number[] | undefined}
                    onChange={(v) => onChange(v)}
                />
            );

        case "likert":
            return (
                <LikertMatrixQuestion
                    subQuestions={question.sub_questions}
                    value={value as Record<number, number> | undefined}
                    onChange={(v) => onChange(v)}
                />
            );

        default:
            return (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                    Unknown question type: {question.question_type}
                </div>
            );
    }
}

