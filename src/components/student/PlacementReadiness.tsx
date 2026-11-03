import React from 'react';
import { 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Award, 
  HelpCircle, 
  FileText, 
  Bot, 
  PenTool, 
  Briefcase,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { calculatePlacementReadiness } from '../../utils/readiness';

interface PlacementReadinessProps {
  setCurrentTab: (tab: string) => void;
}

export const PlacementReadiness: React.FC<PlacementReadinessProps> = ({ setCurrentTab }) => {
  const { studentResume, interviewHistory, practiceAttempts } = useAuth();
  const readiness = calculatePlacementReadiness(studentResume, interviewHistory, practiceAttempts);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Module 5 &middot; Predictive Placement Intelligence
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Placement Readiness Score Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            An audited multi-factor composite index determining student readiness for campus placements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-[#94A3B8]">Classification Tier:</span>
          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            {readiness.tier}
          </span>
        </div>
      </div>

      {/* Main Scorecard Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-xl p-6 md:p-8 text-white shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Left: Overall Circular Dial & Title */}
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-1000 ease-out"
                strokeDasharray={`${readiness.overallScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-extrabold text-white tabular-nums">
                {readiness.overallScore}%
              </span>
              <span className="text-[10px] text-slate-300 block">Readiness</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{readiness.recentGrowthPercentage}% Growth This Month</span>
            </div>
            <h2 className="text-xl font-bold">Top Quartile Placement Candidate</h2>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Based on your verified ATS score, algorithmic problem solving speed, quantitative reasoning accuracy, and mock interview performance.
            </p>
          </div>
        </div>

        {/* Right: Quick Action to Weak Area */}
        <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8 space-y-3 shrink-0">
          <div className="text-xs font-semibold text-slate-300">Target Area for Next Milestone:</div>
          <div className="text-sm font-bold text-white">
            {readiness.weaknesses[0] || 'System Design Trade-offs'}
          </div>
          <button
            onClick={() => setCurrentTab('mock-interview')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            Practice Next Assessment &rarr;
          </button>
        </div>

      </div>

      {/* Transparent Weight Breakdown Table */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-[#334155] flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Transparent Scoring Formula & Weight Distribution
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500">Sum of Weighted Scores = 100% Total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-[#111827] text-slate-500 dark:text-[#94A3B8] border-b border-slate-200 dark:border-[#334155]">
              <tr>
                <th className="py-3 px-4 font-semibold">Evaluation Factor</th>
                <th className="py-3 px-4 font-semibold">Performance Metric</th>
                <th className="py-3 px-4 font-semibold">Weight</th>
                <th className="py-3 px-4 font-semibold text-right">Weighted Points</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#334155]">
              
              {/* Factor 1: Technical & Coding */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <PenTool className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Technical & Coding Challenges
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">{readiness.breakdown.technicalCoding.value}%</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[11px] ml-1">accuracy</span>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-[#94A3B8] font-medium">25%</td>
                <td className="py-3 px-4 text-right font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                  {readiness.breakdown.technicalCoding.weighted} pts
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => setCurrentTab('practice-zone')} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Practice
                  </button>
                </td>
              </tr>

              {/* Factor 2: Mock Interview Fluency */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  Mock Interview & Communication
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">{readiness.breakdown.mockInterviewScore.value}%</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[11px] ml-1">rubric avg</span>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-[#94A3B8] font-medium">25%</td>
                <td className="py-3 px-4 text-right font-bold text-purple-600 dark:text-purple-400 tabular-nums">
                  {readiness.breakdown.mockInterviewScore.weighted} pts
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => setCurrentTab('mock-interview')} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Simulate
                  </button>
                </td>
              </tr>

              {/* Factor 3: Quantitative Aptitude */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Quantitative Aptitude
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">{readiness.breakdown.aptitudeScore.value}%</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[11px] ml-1">speed & accuracy</span>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-[#94A3B8] font-medium">20%</td>
                <td className="py-3 px-4 text-right font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                  {readiness.breakdown.aptitudeScore.weighted} pts
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => setCurrentTab('practice-zone')} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Quiz
                  </button>
                </td>
              </tr>

              {/* Factor 4: Resume ATS Score */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Resume Completeness & ATS Fit
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">{readiness.breakdown.resumeScore.value}%</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[11px] ml-1">ATS index</span>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-[#94A3B8] font-medium">15%</td>
                <td className="py-3 px-4 text-right font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {readiness.breakdown.resumeScore.weighted} pts
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => setCurrentTab('resume-analyzer')} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Analyze
                  </button>
                </td>
              </tr>

              {/* Factor 5: Logical Reasoning */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Logical & Analytical Reasoning
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">{readiness.breakdown.logicalReasoning.value}%</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[11px] ml-1">puzzle solving</span>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-[#94A3B8] font-medium">15%</td>
                <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {readiness.breakdown.logicalReasoning.weighted} pts
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => setCurrentTab('practice-zone')} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Solve
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Strengths & Weaknesses Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strong Areas */}
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Top Competitive Advantages
          </div>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
            Leverage these demonstrated capabilities during technical interview rounds:
          </p>
          <div className="space-y-2 pt-1">
            {readiness.strengths.map((str, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800 text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                <span>{str}</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">High Competence</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Areas */}
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Priority Remediation Targets
          </div>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
            Focus your daily study tasks on these areas to reach the 90%+ Placement Ready threshold:
          </p>
          <div className="space-y-2 pt-1">
            {readiness.weaknesses.map((weak, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800 text-xs font-semibold text-amber-900 dark:text-amber-200 flex items-center justify-between">
                <span>{weak}</span>
                <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">Needs Practice</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
