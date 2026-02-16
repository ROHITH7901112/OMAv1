import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Download, Users, Target, Zap, Workflow, UserCheck, Cpu, GraduationCap } from "lucide-react";
import { ContactUs } from "../components/ContactUs";
import { OnionPeel } from "../components/OnionPeel";
import { HappinessChart } from "../components/HappinessChart";
import { Footer } from "../components/Footer";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import logo from "../assets/HARTS Consulting LBG.png";

// Elements Overview Data - 8 categories, 2 elements each
const elementsData = [
  {
    category: "Leadership",
    icon: Users,
    elements: [
      {
        title: "Leadership Effectiveness",
        score: 89,
        description: "Effective Leadership can have many definitions depending on the situation at hand. When a business needs to find new and innovative ways of working, it is the leadership style: communicating the vision, inclusion, consultation, brainstorming that makes the difference between companies that succeed and those that don't.",
        factors: ["Accountability (vs Blame)", "Leadership Engagement & Commitment", "Nurturing Environment", "Setting the Tone"]
      },
      {
        title: "Growth Strategies",
        score: 90,
        description: "Growth Strategy is the method a company uses to expand its business and ultimately continue to grow. Regardless of the size, industry or age of the business, a fundamental similarity across all of them is the need to grow. And the smaller and younger the business, the more imperative is this need.",
        factors: ["Business Impact", "Leadership Focus & Intent", "Planning & Implementation", "Practicality & Pragmatism"]
      }
    ]
  },
  {
    category: "Strategy",
    icon: Target,
    elements: [
      {
        title: "Strategic Planning",
        score: 85,
        description: "Strategic planning involves defining the organization's direction and making decisions on allocating resources to pursue this strategy. It provides a framework for making critical decisions about the future direction of the organization.",
        factors: ["Vision Clarity", "Goal Alignment", "Resource Allocation", "Market Positioning"]
      },
      {
        title: "Competitive Advantage",
        score: 82,
        description: "Building sustainable competitive advantages requires understanding your unique value proposition and leveraging organizational strengths. Companies that excel create moats around their core competencies.",
        factors: ["Differentiation Strategy", "Value Proposition", "Market Analysis", "Innovation Pipeline"]
      }
    ]
  },
  {
    category: "Execution",
    icon: Zap,
    elements: [
      {
        title: "Operational Excellence",
        score: 78,
        description: "Operational excellence is a philosophy where problem-solving, teamwork, and leadership result in ongoing improvement. The process involves focusing on customers' needs, keeping employees engaged, and continually improving.",
        factors: ["Process Efficiency", "Quality Control", "Delivery Predictability", "Resource Optimization"]
      },
      {
        title: "Project Delivery",
        score: 75,
        description: "Effective project delivery ensures that initiatives are completed on time, within budget, and to the required quality standards. It encompasses planning, execution, and monitoring of all project activities.",
        factors: ["Timeline Management", "Budget Adherence", "Stakeholder Communication", "Risk Mitigation"]
      }
    ]
  },
  {
    category: "Process",
    icon: Workflow,
    elements: [
      {
        title: "Process Standardization",
        score: 80,
        description: "Process standardization creates consistent, repeatable workflows across the organization. It reduces variability, improves quality, and enables scalability while maintaining flexibility where needed.",
        factors: ["Documentation Quality", "Workflow Automation", "Compliance Standards", "Continuous Improvement"]
      },
      {
        title: "Change Management",
        score: 77,
        description: "Effective change management ensures that organizational changes are smoothly implemented and that the lasting benefits of change are achieved. It focuses on the people side of change.",
        factors: ["Communication Strategy", "Stakeholder Buy-in", "Training Programs", "Resistance Management"]
      }
    ]
  },
  {
    category: "People",
    icon: UserCheck,
    elements: [
      {
        title: "Talent Development",
        score: 88,
        description: "Talent development is the full scope of HR processes to attract, develop, motivate, and retain high-performing employees. It creates a competitive advantage by building capabilities that drive organizational success.",
        factors: ["Career Pathways", "Skill Building", "Performance Management", "Succession Planning"]
      },
      {
        title: "Employee Engagement",
        score: 91,
        description: "Employee engagement represents the levels of enthusiasm and connection employees have with their organization. It's a measure of how motivated people are to put in extra effort and their commitment to staying.",
        factors: ["Culture & Values", "Recognition Programs", "Work-Life Balance", "Team Collaboration"]
      }
    ]
  },
  {
    category: "Performance",
    icon: TrendingUp,
    elements: [
      {
        title: "Performance Metrics",
        score: 79,
        description: "Performance metrics provide quantifiable measures used to gauge organizational success. They help track progress toward strategic goals and identify areas requiring attention or improvement.",
        factors: ["KPI Framework", "Data Analytics", "Benchmarking", "Reporting Cadence"]
      },
      {
        title: "Results Orientation",
        score: 81,
        description: "A results-oriented culture focuses on outcomes rather than activities. It emphasizes accountability, measurable objectives, and the relentless pursuit of performance excellence across all functions.",
        factors: ["Goal Setting", "Outcome Tracking", "Accountability Systems", "Performance Reviews"]
      }
    ]
  },
  {
    category: "Technology",
    icon: Cpu,
    elements: [
      {
        title: "Digital Infrastructure",
        score: 84,
        description: "Digital infrastructure encompasses the technology platforms, systems, and tools that enable business operations. A robust infrastructure supports scalability, security, and operational efficiency.",
        factors: ["System Architecture", "Cloud Strategy", "Security Framework", "Integration Capabilities"]
      },
      {
        title: "Innovation Enablement",
        score: 86,
        description: "Innovation enablement creates the technological foundation and culture that supports experimentation and new ideas. It provides the tools and processes needed to transform concepts into value.",
        factors: ["R&D Investment", "Technology Adoption", "Experimentation Culture", "Digital Transformation"]
      }
    ]
  },
  {
    category: "Learning",
    icon: GraduationCap,
    elements: [
      {
        title: "Organizational Learning",
        score: 87,
        description: "Organizational learning is the process of creating, retaining, and transferring knowledge. Organizations improve over time as they gain experience and use it to create knowledge.",
        factors: ["Knowledge Management", "Best Practice Sharing", "Lessons Learned", "Learning Culture"]
      },
      {
        title: "Capability Building",
        score: 83,
        description: "Capability building develops the skills, abilities, and processes that organizations and people need to achieve their goals. It creates sustainable competitive advantage through human capital.",
        factors: ["Training Programs", "Competency Frameworks", "Mentorship", "External Learning"]
      }
    ]
  }
];

const pulseMetrics = [
  {
    title: "Overall Maturity Score",
    value: "3.4",
    max: "5.0",
    trend: "+0.2",
    trendLabel: "from last year",
    icon: TrendingUp,
    color: "#008489",
  },
];

const radarData = [
  {
    category: "Leadership",
    yourScore: 3.8,
    industryBenchmark: 3.2,
  },
  {
    category: "Strategy",
    yourScore: 3.5,
    industryBenchmark: 3.4,
  },
  {
    category: "Execution",
    yourScore: 2.8,
    industryBenchmark: 3.3,
  },
  {
    category: "Process",
    yourScore: 3.2,
    industryBenchmark: 3.5,
  },
  {
    category: "People",
    yourScore: 4.1,
    industryBenchmark: 3.1,
  },
  {
    category: "Performance",
    yourScore: 3.0,
    industryBenchmark: 3.4,
  },
  {
    category: "Technology",
    yourScore: 3.6,
    industryBenchmark: 3.7,
  },
  {
    category: "Learning",
    yourScore: 3.8,
    industryBenchmark: 3.0,
  },
];

const criticalGaps = [
  {
    category: "Execution",
    score: 2.8,
    gap: -0.5,
    severity: "high",
    insight: "Delivery predictability is below industry standard. Focus on process discipline and capacity planning.",
  },
  {
    category: "Performance",
    score: 3.0,
    gap: -0.4,
    severity: "medium",
    insight: "Metrics visibility needs improvement. Implement real-time dashboards and regular performance reviews.",
  },
  {
    category: "Process",
    score: 3.2,
    gap: -0.3,
    severity: "medium",
    insight: "Process standardization is lagging. Document key workflows and establish governance standards.",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  useScrollAnimation();

  const handleDownloadPDF = () => {
    alert("Executive PDF report would be generated and downloaded here.");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="OMA Tool Logo" className="h-10 w-auto" />
              <h1 className="text-2xl font-light tracking-wider text-[#002D72]">
                OMA
              </h1>
            </div>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-[#4A4A4A] hover:text-[#002D72]"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/survey")}
                className="text-[#4A4A4A] hover:text-[#002D72]"
              >
                Retake Survey
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-2 scroll-animate">
          <h2 className="text-5xl font-light text-[#002D72]">
            Strategic Command Center
          </h2>
          <p className="text-lg text-[#4A4A4A]">
            Your organizational maturity assessment results and strategic insights
          </p>
        </div>

        {/* Pulse Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pulseMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className={`p-6 space-y-4 border-2 hover:shadow-lg transition-shadow card-hover gradient-border-hover scroll-animate scroll-delay-${(index + 1) * 100}`}>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-[#4A4A4A]">{metric.title}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-light text-[#002D72]">
                        {metric.value}
                      </span>
                      <span className="text-lg text-[#4A4A4A]">
                        / {metric.max}
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${metric.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: metric.color }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-medium">{metric.trend}</span>
                  <span className="text-[#4A4A4A]">{metric.trendLabel}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Radar Chart */}
        <Card className="p-8 space-y-6 scroll-animate gradient-border-hover">
          <div className="space-y-2">
            <h3 className="text-4xl font-light text-[#002D72]">
              Category Performance Analysis
            </h3>
            <p className="text-lg text-[#4A4A4A]">
              Your organization's maturity compared to industry benchmarks
            </p>
          </div>
          <div className="w-full h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "#4A4A4A", fontSize: 12 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: "#4A4A4A" }} />
                <Radar
                  name="Your Organization"
                  dataKey="yourScore"
                  stroke="#002D72"
                  fill="#002D72"
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="industryBenchmark"
                  stroke="#D1D5DB"
                  fill="#D1D5DB"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="circle"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Business Category — Overall Health */}
        <div className="space-y-10 scroll-animate">
          {/* Section Header */}
          <div className="space-y-6">
            <h3 className="text-4xl font-light text-[#002D72]">
              Business Category — Overall Health
            </h3>

            {/* Gradient Performance Bar */}
            <div className="w-full h-6 rounded-full overflow-hidden" style={{
              background: 'linear-gradient(90deg, #E74C3C 0%, #E67E22 20%, #F1C40F 40%, #C5D94A 60%, #27AE60 80%, #27AE60 100%)'
            }} />

            {/* Legend */}
            <div className="space-y-2">
              <p className="text-[#4A4A4A] text-sm">The performance bar above is broken down as follows:</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#E74C3C' }} />
                  <span className="text-sm font-medium" style={{ color: '#E74C3C' }}>Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#E67E22' }} />
                  <span className="text-sm font-medium" style={{ color: '#E67E22' }}>Marginal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#F1C40F' }} />
                  <span className="text-sm font-medium" style={{ color: '#D4AC0D' }}>OK</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#C5D94A' }} />
                  <span className="text-sm font-medium" style={{ color: '#9AB023' }}>Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#27AE60' }} />
                  <span className="text-sm font-medium" style={{ color: '#27AE60' }}>Great</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Health Bars - 2 columns side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { name: "Leadership", score: 16 },
              { name: "People", score: 8 },
              { name: "Strategy", score: 14 },
              { name: "Performance", score: 12 },
              { name: "Execution", score: 10 },
              { name: "Process", score: 13 },
              { name: "Technology", score: 15 },
              { name: "Learning", score: 14 },
            ].map((category, index) => {
              // Generate bar colors based on score (out of 20 bars for better fit)
              const totalBars = 20;
              const filledBars = Math.round((category.score / 25) * totalBars);
              const getBarColor = (barIndex: number) => {
                if (barIndex >= filledBars) return '#E5E7EB';
                const position = barIndex / totalBars;
                if (position < 0.2) return '#E74C3C';
                if (position < 0.35) return '#E67E22';
                if (position < 0.5) return '#F1C40F';
                if (position < 0.7) return '#C5D94A';
                return '#27AE60';
              };

              return (
                <Card key={index} className={`p-6 hover:shadow-lg transition-shadow gradient-border-hover scroll-animate scroll-delay-${(index + 1) * 100}`}>
                  {/* Category Name */}
                  <h4 className="text-lg font-medium text-[#002D72] mb-4 px-8">
                    {category.name}
                  </h4>

                  {/* Capsule Bar Graph */}
                  <div className="flex items-end gap-2 h-28 mb-6 px-8">
                    {Array.from({ length: totalBars }).map((_, barIndex) => (
                      <div
                        key={barIndex}
                        style={{
                          width: '14px',
                          height: '90px',
                          borderRadius: '9999px',
                          backgroundColor: getBarColor(barIndex),
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </div>

                  {/* View Details Button */}
                  <Button
                    variant="outline"
                    className="w-full border-[#008489] text-[#008489] bg-transparent hover:bg-[#008489] hover:text-white rounded-full"
                  >
                    View {category.name} Details
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Elements Overview Section */}
        <div className="space-y-12 scroll-animate">
          {/* Section Header */}
          <div className="space-y-4">
            <h3 className="text-5xl font-light text-[#002D72]">
              Elements Overview
            </h3>
            <p className="text-base text-[#4A4A4A] leading-relaxed max-w-3xl">
              Each Element comprises of 4 Factors. Individual Factor scores determine the Element score. 
              Factors are the aspects of your business that you control. 
              Roll over the performance rings to reveal the Factor scores for your business. 
              If the score is low this Factor will need to be addressed swiftly!
            </p>
          </div>

          {/* Categories with Elements */}
          {elementsData.map((category, catIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={catIndex} className="space-y-8 scroll-animate">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <CategoryIcon className="w-6 h-6 text-[#008489]" />
                  <h4 className="text-3xl font-medium text-[#002D72]">
                    {category.category}
                  </h4>
                </div>

                {/* Two Elements Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {category.elements.map((element, elIndex) => (
                    <Card key={elIndex} className={`p-6 flex gap-6 hover:shadow-lg transition-shadow gradient-border-hover scroll-animate-scale scroll-delay-${(elIndex + 1) * 100}`}>
                      {/* Circular Progress Ring */}
                      <div className="flex-shrink-0">
                        <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
                          {/* Background rings */}
                          <circle cx="70" cy="70" r="60" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                          <circle cx="70" cy="70" r="48" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                          <circle cx="70" cy="70" r="38" fill="none" stroke="#E5E7EB" strokeWidth="5" />
                          <circle cx="70" cy="70" r="28" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                          {/* Animated progress rings */}
                          <circle
                            cx="70" cy="70" r="60"
                            fill="none"
                            stroke="#002D72"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(element.score / 100) * 377} 377`}
                            className="transition-all duration-1000"
                          />
                          <circle
                            cx="70" cy="70" r="48"
                            fill="none"
                            stroke="#008489"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={`${((element.score - 5) / 100) * 301} 301`}
                            className="transition-all duration-1000 delay-100"
                          />
                          <circle
                            cx="70" cy="70" r="38"
                            fill="none"
                            stroke="#002D72"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray={`${((element.score - 10) / 100) * 239} 239`}
                            className="transition-all duration-1000 delay-200"
                          />
                          <circle
                            cx="70" cy="70" r="28"
                            fill="none"
                            stroke="#008489"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${((element.score - 15) / 100) * 176} 176`}
                            className="transition-all duration-1000 delay-300"
                          />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        {/* Title */}
                        <h5 className="text-xl font-medium text-[#008489]">
                          {element.title}
                        </h5>

                        {/* Score Box */}
                        <div className="inline-block border-2 border-[#008489] rounded px-4 py-2">
                          <span className="text-4xl font-light text-[#002D72]">
                            {element.score}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                          {element.description}
                        </p>

                        {/* Factors List */}
                        <ul className="space-y-1">
                          {element.factors.map((factor, fIndex) => (
                            <li key={fIndex} className="text-sm text-[#6B7280]">
                              {factor}
                            </li>
                          ))}
                        </ul>

                        {/* View Details Button */}
                        <Button
                          variant="outline"
                          className="mt-4 border-[#008489] text-[#008489] bg-transparent hover:bg-[#008489] hover:text-white rounded-full px-6"
                        >
                          View Factor Details
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Organizational Health & Sentiment */}
        <div className="space-y-6 scroll-animate">
          <div className="space-y-2">
            <h3 className="text-4xl font-light text-[#002D72]">
              Organizational Health & Sentiment
            </h3>
            <p className="text-lg text-[#4A4A4A]">
              Visualizing the core layers of your organization and employee well-being
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md transition-shadow card-hover gradient-border-hover scroll-animate-left">
              <h4 className="text-xl font-medium mb-4 w-full text-left text-[#002D72]">The HARTS Model</h4>
              <OnionPeel />
            </Card>
            <div className="h-full scroll-animate">
              <HappinessChart />
            </div>
            {/* eNPS Score Card */}
            <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow card-hover gradient-border-hover scroll-animate-right">
              <h4 className="text-xl font-medium mb-4 text-[#002D72]">Employee Net Promoter Score (eNPS)</h4>
              <div className="flex flex-col items-center">
                {/* Donut Chart */}
                <div className="relative w-26 h-26 mb-3">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="12" />
                    {/* Promoters segment (green) - 54% = 194.4 degrees */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#22c55e" 
                      strokeWidth="7"
                      strokeDasharray="135.7 251.3"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                    {/* Detractors segment (red) - 27% */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="7"
                      strokeDasharray="67.9 251.3"
                      strokeDashoffset="-135.7"
                      strokeLinecap="round"
                    />
                    {/* Passives segment (yellow) - 19% */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#fbbf24" 
                      strokeWidth="7"
                      strokeDasharray="47.7 251.3"
                      strokeDashoffset="-203.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-light text-[#4A4A4A]">50</span>
                    <div className="flex items-center gap-1 text-xs text-[#22c55e]">
                      <span>21</span>
                      <span>▲</span>
                    </div>
                    <span className="text-xs text-[#8c9e99]">From earlier</span>
                  </div>
                </div>
                {/* Legend */}
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                      <span className="text-sm text-[#4A4A4A]">Promoters</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <span className="font-medium">27</span>
                      <span className="text-[#8c9e99]">|</span>
                      <span>54%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                      <span className="text-sm text-[#4A4A4A]">Detractors</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <span className="font-medium">14</span>
                      <span className="text-[#8c9e99]">|</span>
                      <span>27%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                      <span className="text-sm text-[#4A4A4A]">Passives</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <span className="font-medium">9</span>
                      <span className="text-[#8c9e99]">|</span>
                      <span>19%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Critical Gaps - Moved below Organizational Health */}
        <div className="space-y-6 scroll-animate">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-4xl font-light text-[#002D72]">
                Critical Gaps & Recommendations
              </h3>
              <p className="text-lg text-[#4A4A4A]">
                Priority areas requiring strategic attention
              </p>
            </div>
            <Button
              onClick={handleDownloadPDF}
              className="gap-2 bg-[#002D72] hover:bg-[#001f52]"
            >
              <Download className="w-4 h-4" />
              Download Full Executive PDF
            </Button>
          </div>

          <div className="space-y-4">
            {criticalGaps.map((gap, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 card-hover gradient-border-hover scroll-animate scroll-delay-${(index + 1) * 100}`}
                style={{ background: 'linear-gradient(90deg, #002D72 0%, #009b7b 100%)' }}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-xl font-bold">
                      {gap.category}
                    </h4>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs uppercase font-medium tracking-wider">
                      {gap.severity} Priority
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-blue-100 text-sm mb-2">
                    <span>
                      Current Score: <span className="font-bold text-white">{gap.score}</span>
                    </span>
                    <span>
                      Gap: <span className="font-bold text-white">{gap.gap}</span>
                    </span>
                  </div>

                  <p className="text-white/90 leading-relaxed max-w-2xl">
                    {gap.insight}
                  </p>
                </div>

                <Button
                  className="bg-white text-[#002D72] hover:bg-gray-100 font-medium px-6 py-2 whitespace-nowrap"
                  onClick={() => window.location.href = '#contact'}
                >
                  Schedule Consultation
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us Section */}
        <ContactUs />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
