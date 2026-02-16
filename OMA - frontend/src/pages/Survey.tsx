import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { ChevronLeft, ChevronRight, Loader2, Save, CheckCircle2 } from "lucide-react";
import logo from "../assets/HARTS Consulting LBG.png";
import { QuestionRenderer } from "../components/survey";

import type { SurveyCategory, SurveyQuestion, SurveyQuestionType, ResponseValue } from "../types/survey";

// ── localStorage keys ──
const LS_RESPONSES   = "oma_survey_responses";
const LS_POSITION    = "oma_survey_position";
const LS_SESSION_ID  = "oma_session_id";
const LS_STARTED_AT  = "oma_survey_started_at";

// ── Helpers ──
function generateSessionId(): string {
  return `anon-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getOrCreateSessionId(): string {
  const existing = localStorage.getItem(LS_SESSION_ID);
  if (existing) return existing;
  const id = generateSessionId();
  localStorage.setItem(LS_SESSION_ID, id);
  return id;
}

function loadSavedResponses(): Record<string, ResponseValue> {
  try {
    const raw = localStorage.getItem(LS_RESPONSES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadSavedPosition(): { categoryIndex: number; questionIndex: number } | null {
  try {
    const raw = localStorage.getItem(LS_POSITION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearSurveyStorage() {
  localStorage.removeItem(LS_RESPONSES);
  localStorage.removeItem(LS_POSITION);
  localStorage.removeItem(LS_SESSION_ID);
  localStorage.removeItem(LS_STARTED_AT);
}

export default function Survey() {
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState<SurveyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, ResponseValue>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const sessionId = useRef(getOrCreateSessionId());
  const restoredPosition = useRef(false);

  // Flatten all questions for progress calculation
  const allQuestions = useMemo(() => {
    return surveyData.flatMap((cat) => cat.questions);
  }, [surveyData]);

  // ── Fetch survey data & restore saved state ──
  useEffect(() => {
    // Record start time if first visit
    if (!localStorage.getItem(LS_STARTED_AT)) {
      localStorage.setItem(LS_STARTED_AT, new Date().toISOString());
    }

    fetch("/api/category/allquestion")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load survey data");
        return res.json();
      })
      .then((data: SurveyCategory[]) => {
        setSurveyData(data);

        // Restore saved responses
        const savedResponses = loadSavedResponses();
        if (Object.keys(savedResponses).length > 0) {
          setResponses(savedResponses);
        }

        // Restore position (only once)
        if (!restoredPosition.current) {
          const savedPos = loadSavedPosition();
          if (savedPos) {
            // Validate position is within bounds
            const maxCat = data.length - 1;
            const catIdx = Math.min(savedPos.categoryIndex, maxCat);
            const maxQ = (data[catIdx]?.questions.length ?? 1) - 1;
            const qIdx = Math.min(savedPos.questionIndex, maxQ);
            setCurrentCategoryIndex(catIdx);
            setCurrentQuestionIndex(qIdx);
          }
          restoredPosition.current = true;
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ── Autosave responses to localStorage ──
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const autosave = useCallback(() => {
    setSaveStatus("saving");
    try {
      localStorage.setItem(LS_RESPONSES, JSON.stringify(responses));
      localStorage.setItem(
        LS_POSITION,
        JSON.stringify({ categoryIndex: currentCategoryIndex, questionIndex: currentQuestionIndex })
      );
    } catch {
      // localStorage full or unavailable – silently ignore
    }
    setSaveStatus("saved");
    // Reset indicator after 2s
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => setSaveStatus("idle"), 2000);
  }, [responses, currentCategoryIndex, currentQuestionIndex]);

  // Trigger autosave whenever responses or position change
  useEffect(() => {
    if (!loading && surveyData.length > 0) {
      autosave();
    }
  }, [responses, currentCategoryIndex, currentQuestionIndex, autosave, loading, surveyData.length]);

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#008489] mx-auto" />
          <p className="text-[#4A4A4A]">Loading survey...</p>
        </div>
      </div>
    );
  }

  if (error || surveyData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <p className="text-red-500">Error: {error || "No survey data available"}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const currentCategory = surveyData[currentCategoryIndex];
  const currentQuestion = currentCategory.questions[currentQuestionIndex];
  const responseKey = String(currentQuestion.main_question_id);
  const currentResponse = responses[responseKey];

  const totalQuestions = allQuestions.length;
  const answeredQuestions = Object.keys(responses).filter((key) => {
    const resp = responses[key];
    if (resp === undefined || resp === null) return false;
    if (typeof resp === "string") return resp.trim().length > 0;
    if (Array.isArray(resp)) return resp.length > 0;
    return true;
  }).length;
  const progressPercent = (answeredQuestions / totalQuestions) * 100;

  const handleResponseChange = (value: ResponseValue) => {
    setResponses({ ...responses, [responseKey]: value });
  };

  const isQuestionAnswered = (question: SurveyQuestion, response: ResponseValue | undefined): boolean => {
    if (response === undefined || response === null) return false;
    switch (question.question_type) {
      case "single ans":
        return typeof response === "number";
      case "multi ans":
        return Array.isArray(response) && response.length > 0;
      case "free text":
        return typeof response === "string" && response.trim().length > 0;
      case "rank":
        return Array.isArray(response) && response.length > 0;
      case "likert":
        return (
          typeof response === "object" &&
          !Array.isArray(response) &&
          Object.keys(response).length === question.sub_questions.length
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        sessionId: sessionId.current,
        startedAt: localStorage.getItem(LS_STARTED_AT),
        completedAt: new Date().toISOString(),
        responses,
      };
      const res = await fetch("/api/survey/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");

      // Clear saved progress after successful submit
      clearSurveyStorage();
      navigate("/dashboard");
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to submit survey. Your answers are saved locally – please try again.");
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < surveyData.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Survey complete — submit
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentQuestionIndex(
        surveyData[currentCategoryIndex - 1].questions.length - 1
      );
    }
  };

  const canGoNext = isQuestionAnswered(currentQuestion, currentResponse);
  const canGoPrevious = currentCategoryIndex > 0 || currentQuestionIndex > 0;
  const isLastQuestion =
    currentCategoryIndex === surveyData.length - 1 &&
    currentQuestionIndex === currentCategory.questions.length - 1;

  const getQuestionTypeLabel = (type: SurveyQuestionType) => {
    switch (type) {
      case "single ans":
        return "Choose one";
      case "multi ans":
        return "Select all that apply";
      case "free text":
        return "Open response";
      case "rank":
        return "Rank in order";
      case "likert":
        return "Rate each statement";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm animate-fade-in-down">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="OMA Tool Logo" className="h-10 w-auto" />
              <h1 className="text-2xl font-light tracking-wider text-[#002D72]">
                OMA
              </h1>
            </div>
            {/* Autosave indicator */}
            <div className="flex items-center gap-2 text-xs text-[#4A4A4A]/70">
              {saveStatus === "saving" && (
                <>
                  <Save className="w-3.5 h-3.5 animate-pulse" />
                  <span>Saving...</span>
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-600">Progress saved</span>
                </>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#4A4A4A]">
                Category {currentCategoryIndex + 1} of {surveyData.length}
              </span>
              <span className="text-[#4A4A4A]">
                {answeredQuestions} / {totalQuestions} questions answered
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">

          {/* Question Card */}
          <div className="mx-auto w-full max-w-4xl">
            <div className={`bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-8 ${
              currentQuestion.question_type === 'rank' ? '' : 'card-hover'
            }`}>
              {/* Question Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[#008489] font-semibold text-sm tracking-wide uppercase">
                    {currentCategory.category_text}
                  </span>
                  <span className="text-xs text-[#4A4A4A] bg-gray-100 px-3 py-1 rounded-full">
                    {getQuestionTypeLabel(currentQuestion.question_type)}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-[#002D72] leading-relaxed">
                  {currentQuestion.question_text}
                </h2>
              </div>

              {/* Question Input */}
              <div className="min-h-[200px]">
                <QuestionRenderer
                  question={currentQuestion}
                  value={currentResponse}
                  onChange={handleResponseChange}
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={!canGoPrevious}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canGoNext || submitting}
                  className="gap-2 bg-[#002D72] hover:bg-[#001f52]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : isLastQuestion ? (
                    "Complete"
                  ) : (
                    "Next"
                  )}
                  {!submitting && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
