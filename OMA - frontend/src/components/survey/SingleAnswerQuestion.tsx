import type { SurveyOption } from "../../types/survey";

interface SingleAnswerQuestionProps {
  options: SurveyOption[];
  value: number | undefined;
  /** Fires the selected option_id, or undefined when the same option is clicked again (deselect). */
  onChange: (optionId: number | undefined) => void;
}

export function SingleAnswerQuestion({ options, value, onChange }: SingleAnswerQuestionProps) {
  return (
    <div className="space-y-3" role="radiogroup">
      {options.map((option) => {
        const isSelected = value === option.option_id;
        return (
          <button
            key={option.option_id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(isSelected ? undefined : option.option_id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
              isSelected
                ? "border-[#008489] bg-[#008489]/5 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            {/* Custom radio indicator */}
            <span
              className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected ? "border-[#008489]" : "border-gray-400"
              }`}
            >
              {isSelected && (
                <span className="w-2 h-2 rounded-full bg-[#008489] block" />
              )}
            </span>
            <span
              className={`text-base leading-relaxed ${
                isSelected ? "text-[#002D72] font-medium" : "text-[#4A4A4A]"
              }`}
            >
              {option.option_text}
            </span>
          </button>
        );
      })}
    </div>
  );
}
