import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { ChevronLeft, ChevronRight, Loader2, CheckCircle2, WifiOff, RefreshCw, AlertCircle, Sparkles } from "lucide-react";
import logo from "../assets/HARTS Consulting LBG.png";
import { QuestionRenderer } from "../components/survey";

import type { SurveyCategory, SurveyQuestion, SurveyQuestionType, ResponseValue } from "../types/survey";

// ── localStorage keys ──
const LS_RESPONSES  = "oma_survey_responses";
const LS_POSITION   = "oma_survey_position";
const LS_SESSION_ID = "oma_session_id";
const LS_STARTED_AT = "oma_survey_started_at";
const LS_SUBMITTED  = "oma_survey_submitted";

// ── Cookie helpers ──
function setCookie(name: string, value: string, days = 30) {
  const d = new Date();
  d.setTime(d.getTime() + days * 86_400_000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// ── Helpers ──
function generateSessionId(): string {
  return `anon-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getOrCreateSessionId(): string {
  // Priority: localStorage → cookie → create new
  const fromLS = localStorage.getItem(LS_SESSION_ID);
  if (fromLS) {
    setCookie("oma_session_id", fromLS); // keep cookie in sync
    return fromLS;
  }
  const fromCookie = getCookie("oma_session_id");
  if (fromCookie) {
    localStorage.setItem(LS_SESSION_ID, fromCookie); // restore to localStorage
    return fromCookie;
  }
  const id = generateSessionId();
  localStorage.setItem(LS_SESSION_ID, id);
  setCookie("oma_session_id", id);
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
  localStorage.removeItem(LS_SUBMITTED);
  deleteCookie("oma_session_id");
}

// ── Helper: Check if a question is answered ──
function isQuestionAnswered(question: SurveyQuestion, response: ResponseValue | undefined): boolean {
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
}

export default function Survey() {
  const [surveyData, setSurveyData] = useState<SurveyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(() => localStorage.getItem(LS_SUBMITTED) === "true");

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, ResponseValue>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "offline">("idle");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const sessionId = useRef(getOrCreateSessionId());
  const restoredPosition = useRef(false);
  const pendingDBSaves = useRef<Array<{ mainQuestionId: number; answer: ResponseValue }>>([]);

  // ── Track online/offline status ──
  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true);
      setSaveStatus("idle");
      // Flush any pending saves that failed while offline
      flushPendingSaves();
    };
    const goOffline = () => {
      setIsOnline(false);
      setSaveStatus("offline");
    };
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Flatten all questions for progress calculation
  const allQuestions = useMemo(() => {
    return surveyData.flatMap((cat) => cat.questions);
  }, [surveyData]);

  // ── Flush pending DB saves (queued while offline) ──
  const flushPendingSaves = useCallback(() => {
    const pending = [...pendingDBSaves.current];
    pendingDBSaves.current = [];
    for (const { mainQuestionId, answer } of pending) {
      fetch("/api/survey/save-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId.current,
          startedAt: localStorage.getItem(LS_STARTED_AT),
          mainQuestionId,
          answer,
        }),
      }).catch(() => {
        // Re-queue if still failing
        pendingDBSaves.current.push({ mainQuestionId, answer });
      });
    }
  }, []);

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
      .then(async (data: SurveyCategory[]) => {
        setSurveyData(data);

        // 1️⃣ Try localStorage first (fastest)
        const savedResponses = loadSavedResponses();
        if (Object.keys(savedResponses).length > 0) {
          setResponses(savedResponses);
          restorePosition(data);
          setLoading(false);
          return;
        }

        // 2️⃣ localStorage empty — try recovering from DB via session cookie
        try {
          const sid = sessionId.current;
          const dbRes = await fetch(`/api/survey/session/${encodeURIComponent(sid)}/responses`);
          if (dbRes.ok) {
            const dbData = await dbRes.json();
            if (dbData.found && !dbData.submitted && dbData.responses && Object.keys(dbData.responses).length > 0) {
              // Restore responses from DB and persist back to localStorage
              setResponses(dbData.responses as Record<string, ResponseValue>);
              localStorage.setItem(LS_RESPONSES, JSON.stringify(dbData.responses));
              if (dbData.startedAt) {
                localStorage.setItem(LS_STARTED_AT, dbData.startedAt);
              }
              restorePosition(data);
              setLoading(false);
              return;
            }
            if (dbData.submitted) {
              // Already submitted — show thank-you
              localStorage.setItem(LS_SUBMITTED, "true");
              setSubmitted(true);
              setLoading(false);
              return;
            }
          }
        } catch {
          // DB recovery failed — continue with empty state (fresh start)
        }

        // 3️⃣ No saved data — fresh start
        restorePosition(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    function restorePosition(data: SurveyCategory[]) {
      if (!restoredPosition.current) {
        const savedPos = loadSavedPosition();
        if (savedPos) {
          const maxCat = data.length - 1;
          const catIdx = Math.min(savedPos.categoryIndex, maxCat);
          const maxQ = (data[catIdx]?.questions.length ?? 1) - 1;
          const qIdx = Math.min(savedPos.questionIndex, maxQ);
          setCurrentCategoryIndex(catIdx);
          setCurrentQuestionIndex(qIdx);
        }
        restoredPosition.current = true;
      }
    }
  }, []);

  // ── Immediate autosave to localStorage ──
  const saveIndicatorRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (loading || surveyData.length === 0) return;

    // Save to localStorage immediately (fast, no debounce)
    if (isOnline) setSaveStatus("saving");
    try {
      localStorage.setItem(LS_RESPONSES, JSON.stringify(responses));
      localStorage.setItem(
        LS_POSITION,
        JSON.stringify({ categoryIndex: currentCategoryIndex, questionIndex: currentQuestionIndex })
      );
    } catch {
      // localStorage full or unavailable – silently ignore
    }
    if (isOnline) {
      setSaveStatus("saved");
      if (saveIndicatorRef.current) clearTimeout(saveIndicatorRef.current);
      saveIndicatorRef.current = setTimeout(() => setSaveStatus("idle"), 1500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responses, currentCategoryIndex, currentQuestionIndex, loading, surveyData.length]);

  // Check if ALL questions in the survey have been answered
  const allQuestionsAnswered = useMemo(() => {
    return allQuestions.every((q) =>
      isQuestionAnswered(q, responses[String(q.main_question_id)])
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQuestions, responses]);

  // Count how many are unanswered (for the warning message)
  const unansweredCount = useMemo(() => {
    return allQuestions.filter(
      (q) => !isQuestionAnswered(q, responses[String(q.main_question_id)])
    ).length;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQuestions, responses]);

  // ── Debounced DB save (fires 2 s after Next click with an answered question) ──
  const dbSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveAnswerToDB = useCallback(
    (mainQuestionId: number, answer: ResponseValue) => {
      // If offline, queue the save for later
      if (!navigator.onLine) {
        pendingDBSaves.current.push({ mainQuestionId, answer });
        return;
      }

      // Clear any pending DB save
      if (dbSaveTimerRef.current) clearTimeout(dbSaveTimerRef.current);

      dbSaveTimerRef.current = setTimeout(() => {
        fetch("/api/survey/save-answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionId.current,
            startedAt: localStorage.getItem(LS_STARTED_AT),
            mainQuestionId,
            answer,
          }),
        }).catch(() => {
          // Network failed — queue for retry when back online
          pendingDBSaves.current.push({ mainQuestionId, answer });
        });
      }, 2000);
    },
    []
  );

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
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg text-center space-y-6">
          <p className="text-red-500 text-lg">{error || "No survey data available"}</p>
          <p className="text-sm text-[#4A4A4A]">
            Your answers are safely stored in your browser and will not be lost.
          </p>
          <Button
            onClick={() => { setError(null); setSubmitting(false); window.location.reload(); }}
            className="gap-2 bg-[#002D72] hover:bg-[#001f52]"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // ── Thank-you screen after successful submit ──
  if (submitted) {
    return <ThankYouScreen />;
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

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        sessionId: sessionId.current,
        startedAt: localStorage.getItem(LS_STARTED_AT),
        submittedAt: new Date().toISOString(),
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
      localStorage.setItem(LS_SUBMITTED, "true");
      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to submit survey. Your answers are saved locally – please try again.");
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    // Save current answer to DB if answered
    const currentAnswer = responses[responseKey];
    if (currentAnswer !== undefined && currentAnswer !== null) {
      saveAnswerToDB(currentQuestion.main_question_id, currentAnswer);
    }

    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < surveyData.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    } else if (allQuestionsAnswered) {
      // Survey complete — flush any pending DB save and do final submit
      if (dbSaveTimerRef.current) clearTimeout(dbSaveTimerRef.current);
      handleSubmit();
    }
    // If last question but not all answered, button is disabled via canGoNext
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
  const currentAnswered = isQuestionAnswered(currentQuestion, currentResponse);
  const canGoPrevious = currentCategoryIndex > 0 || currentQuestionIndex > 0;
  const isLastQuestion =
    currentCategoryIndex === surveyData.length - 1 &&
    currentQuestionIndex === currentCategory.questions.length - 1;
  // On the last question, require ALL questions answered to enable Complete
  // const canGoNext = isLastQuestion
  //   ? currentAnswered && allQuestionsAnswered
  //   : currentAnswered;
  const canGoNext = true;
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
              {!isOnline && (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-amber-600">Offline — saved locally</span>
                </>
              )}
              {isOnline && saveStatus === "saving" && (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              )}
              {isOnline && saveStatus === "saved" && (
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

              {/* Unanswered questions warning on last question */}
              {isLastQuestion && currentAnswered && !allQuestionsAnswered && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      {unansweredCount} question{unansweredCount > 1 ? "s" : ""} still unanswered
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      Please go back and answer all questions before submitting.
                    </p>
                  </div>
                </div>
              )}

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

// ── Premium Thank-You Screen ──
function ThankYouScreen() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8f5f5]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #008489 0%, transparent 70%)",
            top: "-10%",
            right: "-10%",
            animation: "floatOrb 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #002D72 0%, transparent 70%)",
            bottom: "-10%",
            left: "-10%",
            animation: "floatOrb 10s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #008489 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />

        {/* Confetti particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: ["#002D72", "#008489", "#4CAF50", "#FFB300", "#E91E63"][
                Math.floor(Math.random() * 5)
              ],
              left: `${Math.random() * 100}%`,
              top: "-5%",
              opacity: 0.6,
              animation: `confettiFall ${5 + Math.random() * 8}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div
          className="w-full max-w-2xl"
          style={{ animation: "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
        >
          {/* Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-14 text-center relative overflow-hidden">
            {/* Shine sweep */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 45%, transparent 50%)",
                animation: "shineSweep 3s ease-in-out infinite",
                animationDelay: "1s",
              }}
            />

            {/* Logo */}
            <div
              className="flex justify-center mb-8"
              style={{ animation: "fadeSlideUp 0.6s ease-out 0.2s both" }}
            >
              <img
                src={logo}
                alt="HARTS Consulting"
                className="h-14 w-auto drop-shadow-sm"
              />
            </div>

            {/* Animated checkmark */}
            {/* <div
              className="relative mx-auto mb-16 w-24 h-24"
              style={{ animation: "fadeSlideUp 0.6s ease-out 0.4s both" }}
            > */}
              {/* Glow ring */}
              {/* <div
                className="absolute inset-0 rounded-full"
              >
                <div className="w-full h-full rounded-full bg-white" />
              </div> */}
              {/* Check icon */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 origin-top"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ animation: "drawCheck 0.6s ease-out 0.8s both" }}
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#008489"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 30,
                      strokeDashoffset: 30,
                      animation: "drawPath 0.6s ease-out 1s forwards",
                    }}
                  />
                </svg>
              </div>
            </div> */}

            {/* Heading */}
            <div style={{ animation: "fadeSlideUp 0.6s ease-out 0.6s both" }}>
              <h1 className="text-4xl md:text-5xl leading-tight font-light text-[#002D72] mb-3 tracking-tight">
                Thank You
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#008489]" />
                <Sparkles className="w-4 h-4 text-[#008489]" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#008489]" />
              </div>
            </div>

            {/* Message */}
            <div style={{ animation: "fadeSlideUp 0.6s ease-out 0.8s both" }}>
              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-2 max-w-md mx-auto">
                Your assessment has been submitted successfully.
              </p>
              <p className="mb-6 text-sm text-[#4A4A4A]/70 leading-relaxed max-w-sm mx-auto">
                We appreciate your valuable input. Your responses will help drive
                meaningful organizational insights.
              </p>
            </div>


            {/* Footer stats */}
            <div
              className="mt-6 flex justify-between items-center text-center"
              style={{ animation: "fadeSlideUp 0.6s ease-out 1.1s both" }}
            >
              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold text-[#002D72]">✓</div>
                <div className="text-sm text-[#4A4A4A]/60">
                  Responses Recorded
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold text-[#008489]">✓</div>
                <div className="text-sm text-[#4A4A4A]/60">
                  Securely Stored
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold text-[#4CAF50]">✓</div>
                <div className="text-sm text-[#4A4A4A]/60">
                  Analysis Pending
                </div>
              </div>
            </div>


          </div>

          {/* Bottom branding */}
          <div
            className="text-center mt-8"
            style={{ animation: "fadeSlideUp 0.6s ease-out 1.3s both" }}
          >
            <p className="text-xs text-[#4A4A4A]/40 tracking-widest uppercase">
              Powered by HARTS Consulting
            </p>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shineSweep {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
