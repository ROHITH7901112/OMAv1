import type { SurveyOption } from "../../types/survey";

interface SingleAnswerQuestionProps {
  options: SurveyOption[];
  value: number | undefined;
  onChange: (optionId: number) => void;
}

export function SingleAnswerQuestion({ options, value, onChange }: SingleAnswerQuestionProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = value === option.option_id;
        const inputId = `option-${option.option_id}`;
        return (
          <label
            key={option.option_id}
            htmlFor={inputId}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
              isSelected
                ? "border-[#008489] bg-[#008489]/5 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <input
              id={inputId}
              type="radio"
              name="single-answer"
              checked={isSelected}
              onChange={() => onChange(option.option_id)}
              className="w-4 h-4 flex-shrink-0 accent-[#008489] cursor-pointer"
            />
            <span
              className={`text-base leading-relaxed ${
                isSelected ? "text-[#002D72] font-medium" : "text-[#4A4A4A]"
              }`}
            >
              {option.option_text}
            </span>
          </label>
        );
      })}
    </div>
  );
}
