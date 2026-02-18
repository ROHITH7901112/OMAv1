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
import { Download } from "lucide-react";
import { ContactUs } from "../components/ContactUs";
import { OnionPeel } from "../components/OnionPeel";
import { HappinessChart } from "../components/HappinessChart";
import { Footer } from "../components/Footer";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import logo from "../assets/HARTS Consulting LBG.png";
import EvoraLogo from "../assets/Evoralogo.png";

const pulseMetrics = [
  {
    title: "Overall Maturity Score",
    value: "3.4",
    max: "5.0",
    color: "#008489",
  },
];

const radarData = [
  {
    category: "Leadership",
    yourScore: 3.8,
  },
  {
    category: "Strategy",
    yourScore: 3.5,
  },
  {
    category: "Execution",
    yourScore: 2.8,
  },
  {
    category: "Process",
    yourScore: 3.2,
  },
  {
    category: "People",
    yourScore: 4.1,
  },
  {
    category: "Performance",
    yourScore: 3.0,
  },
  {
    category: "Technology",
    yourScore: 3.6,
  },
  {
    category: "Learning",
    yourScore: 3.8,
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
                OMA Tool - Beta
              </h1>
            </div>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/home")}
                className="text-[#4A4A4A] hover:text-[#002D72]"
              >
                Home
              </Button>
              
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-2 scroll-animate">
          <div className="flex items-center gap-5">
            <img src={EvoraLogo} alt="EVORA Logo" className="h-12 w-auto mt-4" />
            <h2 className="text-5xl font-light text-[#002D72]">
              Maturity Assessment Dashboard
            </h2>
          </div>
          <p className="text-lg text-[#4A4A4A]">
            Your organizational maturity assessment results and strategic insights
          </p>
        </div>

        {/* Main Layout: Left Column (2 boxes) + Right Column (1 large box) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Overall Maturity Score */}
            <Card className="p-8 scroll-animate gradient-border-hover">
              {pulseMetrics.map((metric, index) => (
                <div key={index} className="space-y-6">
                  <h3 className="text-2xl font-light text-[#002D72]">Overall Maturity Score</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-[#4A4A4A]">{metric.title}</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-light text-[#002D72]">
                        {metric.value}
                      </span>
                      <span className="text-xl text-[#4A4A4A]">
                        / {metric.max}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            {/* EVORA's Model */}
            <Card className="p-8 scroll-animate gradient-border-hover">
              <h3 className="text-2xl font-light text-[#002D72] mb-6">EVORA's Model</h3>
              <div className="w-full">
                <OnionPeel />
              </div>
            </Card>
          </div>

          {/* Right Column - Category Performance Analysis */}
          <div>
            <Card className="p-8 h-full scroll-animate gradient-border-hover">
              <div className="space-y-6 h-full flex flex-col">
                <div>
                  <h3 className="text-2xl font-light text-[#002D72]">
                    Category Performance Analysis
                  </h3>
                  <p className="text-sm text-[#4A4A4A] mt-2">
                    Your organization's maturity across key categories
                  </p>
                </div>
                <div className="flex-1 min-h-[350px]">
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
                      <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        iconType="circle"
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Organizational Health & Sentiment */}
        <div className="space-y-6 scroll-animate">
          <div className="space-y-2">
            <h3 className="text-4xl font-light text-[#002D72]">
              Organizational Health & Sentiment
            </h3>
            <p className="text-lg text-[#4A4A4A]">
              Employee well-being and engagement metrics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        {/* Contact Us Section */}
        <ContactUs />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}