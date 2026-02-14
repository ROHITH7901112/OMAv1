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
        return (
          <button
            key={option.option_id}
            type="button"
            onClick={() => onChange(option.option_id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              isSelected
                ? "border-[#008489] bg-[#008489]/5 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected
                  ? "bg-white"
                  : "border-gray-300 bg-white"
              }`}
              style={{ borderColor: isSelected ? '#008489' : undefined }}
            >
              {isSelected && (
                <div 
                  className="rounded-full" 
                  style={{ 
                    width: '12px', 
                    height: '12px',
                    backgroundColor: '#008489' 
                  }}
                />
              )}
            </div>
            <span
              className={`text-base leading-relaxed ${
                isSelected ? "text-[#002D72] font-medium" : "text-[#4A4A4A]"
              }`}
              style={{ textAlign: 'left' }} 
            >
              {option.option_text}
            </span>
          </button>
        );
      })}
    </div>
  );
}
