import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import logo from "../assets/HARTS Consulting LBG.png";
import LeadershipIcon from "../assets/icons/strategic leadership.svg?react";
import CultureIcon from "../assets/icons/Culture.svg?react";
import GovernanceIcon from "../assets/icons/Governance.svg?react";
import LeadershipCapabilityIcon from "../assets/icons/leadershipcapability.svg?react";
import ChangeAgilityIcon from "../assets/icons/Changeagility.svg?react";
import PerformanceIcon from "../assets/icons/Performance.svg?react";
import CommunicationIcon from "../assets/icons/communication.svg?react";
import ProgressIcon from "../assets/icons/progress.svg?react";
import {
  ArrowRight,
  ClipboardCheck,
  ListChecks,
  ArrowUpDown,
  ChevronRight,
  Check,
  FileEdit,
} from "lucide-react";



const categories = [
  { icon: LeadershipIcon,          name: "Strategic Leadership and Vision",       color: "#002D72" },
  { icon: CultureIcon,             name: "Culture Integration",                   color: "#002D72" },
  { icon: GovernanceIcon,          name: "Governance and Decision Making",        color: "#002D72" },
  { icon: LeadershipCapabilityIcon, name: "Leadership Capability and Succession", color: "#002D72" },
  { icon: ChangeAgilityIcon,       name: "Change Agility",                        color: "#002D72" },
  { icon: CommunicationIcon,      name: "Communication and Engagement",          color: "#002D72" },
  { icon: PerformanceIcon,         name: "Performance and Accountability",        color: "#002D72" },
  { icon: ProgressIcon,            name: "Growth and Progress",                   color: "#002D72" },
];

const responseFormats = [
  {
    icon: ArrowUpDown,
    label: "Ranking Method",
    description: "Rank options in order of relevance or frequency based on your experience or observation.",
  },
  {
    icon: Check,
    label: "Single Choice",
    description: "Select the option that best describes your experience or observation.",
  },
  {
    icon: ListChecks,
    label: "Multiple Choice",
    description: "Select all options that apply to your experience or observation.",
  },
  {
    icon: FileEdit,
    label: "Fill in the blanks",
    description: "Provide your own response in the text field.",
  }
];

const whatHappensNext = [
  "Aggregated to show overall and dimension-level maturity.",
  "Benchmarked against the leadership maturity framework.",
  "Used to design targeted leadership initiatives, coaching programs, and alignment sessions that support our goals.",
];

export default function InstructionPage() {
  const navigate = useNavigate();

  return (
    
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* ── Navigation ── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
              role="button"
              aria-label="Go to home"
            >
              <img src={logo} alt="HARTS Consulting Logo" className="h-10 w-auto" />
              <span className="text-2xl font-light tracking-wider text-[#002D72] hidden sm:block">
                OMA Beta
              </span>
            </div>
            <span className="text-sm text-[#4A4A4A] font-medium tracking-wide uppercase">
              Survey Instructions
            </span>
          </div>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* ── Hero Card ── */}
        <section
          className="bg-gradient-to-br from-[#002D72] to-[#004aad] rounded-2xl shadow-lg px-8 py-12 text-white text-center"
          aria-labelledby="survey-title"
        >
          <ClipboardCheck className="mx-auto mb-5 h-12 w-12 opacity-80" aria-hidden="true" />
          <h1
            id="survey-title"
            className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug"
          >
            Welcome to the Organisational Assessment Survey - Leadership
          </h1>
        </section>
        {/* ── Anonymous/Confidential ── */}
          <div className="rounded-xl border border-[#008489]/30 bg-[#008489]/5 px-5 py-4 space-y-1">
            <p className="text-[#4A4A4A] leading-relaxed">
              Your responses will be <strong className="text-[#002D72]">confidential and anonymous</strong>{" "}
              and will be used in aggregate to shape your Organisation's Development Roadmap.
            </p>
          </div>
        
        {/* ── Purpose of the Assessment ── */}
        <section
          className="bg-white rounded-2xl shadow-md px-8 py-8 space-y-5 gradient-border-hover"
          aria-labelledby="purpose-heading"
        >
          <h2
            id="purpose-heading"
            className="text-xl sm:text-2xl font-semibold text-[#002D72] border-b border-gray-100 pb-3"
          >
            Purpose of the Assessment
          </h2>

          <p className="text-[#4A4A4A] leading-relaxed">
            As EVORA enters an exciting new phase, organisational maturity becomes a critical
            enabler of sustainable growth and cultural integration.
          </p>

          <p className="text-[#4A4A4A] leading-relaxed">
            This survey aims to evaluate the current state of organisational maturity across
            eight key dimensions:
          </p>

          {/* ── Category Grid ── */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
            aria-label="Eight key dimensions"
          >
            {categories.map(({ icon: Icon, name, color }) => (
              <li
                key={name}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-[#F5F7FA] px-4 py-3"
              >
                <span
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}18` }}
                  aria-hidden="true"
                >
                  <Icon className="h-10 w-10 translate-y-1" style={{ color }} />
                </span>
                <span className="text-sm font-medium text-[#1a1a2e]">{name}</span>
              </li>
            ))}
          </ul>

          <p className="text-[#4A4A4A] leading-relaxed pt-1">
            The goal is to evaluate organisational maturity — not to rate individuals — and
            to gain a clear, collective view of our organisation's leadership strengths and
            development priorities.
          </p>
        </section>

        {/* ── How to Respond ── */}
        <section
          className="bg-white rounded-2xl shadow-md px-8 py-8 space-y-5 gradient-border-hover"
          aria-labelledby="how-to-respond-heading"
        >
          <h2
            id="how-to-respond-heading"
            className="text-xl sm:text-2xl font-semibold text-[#002D72] border-b border-gray-100 pb-3"
          >
            How to Respond
          </h2>

          <p className="text-[#4A4A4A] leading-relaxed">
            Please answer honestly and objectively based on your observations and experience.
          </p>

          <p className="text-[#4A4A4A]">
            Use the response formats as explained below each question:
          </p>

          <ul className="space-y-4" aria-label="Response formats">
            {responseFormats.map(({ icon: Icon, label, description }) => (
              <li
                key={label}
                className="flex items-start gap-4 rounded-xl border border-gray-100 bg-[#F5F7FA] px-5 py-4"
              >
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#002D72]/10"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5 text-[#002D72]" />
                </span>
                <div>
                  <p className="font-semibold text-[#002D72] text-sm">{label}</p>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed mt-0.5">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── What Will Happen Next ── */}
        <section
          className="bg-white rounded-2xl shadow-md px-8 py-8 space-y-5 gradient-border-hover"
          aria-labelledby="what-next-heading"
        >
          <h2
            id="what-next-heading"
            className="text-xl sm:text-2xl font-semibold text-[#002D72] border-b border-gray-100 pb-3"
          >
            What Will Happen Next
          </h2>

          <p className="text-[#4A4A4A] leading-relaxed">
            After all responses are collected, results will be:
          </p>

          <ul className="space-y-3" aria-label="Next steps">
            {whatHappensNext.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#002D72]/15 mt-0.5"
                  aria-hidden="true"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-[#002D72]" />
                </span>
                <span className="text-[#4A4A4A] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Start Survey CTA ── */}
        <div className="flex justify-center pb-10">
          <Button
            onClick={() => navigate("/survey")}
            className="h-14 px-12 text-lg bg-[#008489] hover:bg-[#006b6f] text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl flex items-center gap-2"
            aria-label="Start the survey"
          >
            Start Survey
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </main>
    </div>
  );
}
