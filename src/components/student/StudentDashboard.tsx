import React from 'react';
import { 
  Target, 
  FileText, 
  Briefcase, 
  Bot, 
  PenTool, 
  TrendingUp, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2,
  Award,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { calculatePlacementReadiness } from '../../utils/readiness';
import { INITIAL_DRIVES } from '../../data/mockDatabase';

interface StudentDashboardProps {
  setCurrentTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ setCurrentTab }) => {
  const { 
    currentUser, 
    studentResume, 
    interviewHistory, 
    practiceAttempts, 
    dailyTasks, 
    toggleDailyTask,
    targetRole 
  } = useAuth();

  const readiness = calculatePlacementReadiness(studentResume, interviewHistory, practiceAttempts);
  const nextDrive = INITIAL_DRIVES[0];

  const pendingTasks = dailyTasks.filter(t => !t.completed);

  return (
    <div className="space-y-6 text-left">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 dark:from-[#0B1220] dark:via-blue-950/80 dark:to-[#111827] rounded-xl p-6 text-white shadow-sm border border-slate-800 dark:border-[#334155] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">
            <span>Class of 2027</span>
            <span>&middot;</span>
            <span>{currentUser.department || 'Computer Science & Engineering'}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Targeting: <span className="text-white font-semibold">{targetRole}</span> &middot; Campus Placement Readiness is actively tracking at <span className="text-emerald-400 font-bold tabular-nums">{readiness.overallScore}%</span>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentTab('resume-analyzer')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            Analyze Resume
          </button>
          <button
            onClick={() => setCurrentTab('mock-interview')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold border border-white/20 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Bot className="w-3.5 h-3.5" />
            Start Mock Interview
          </button>
        </div>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div 
          onClick={() => setCurrentTab('readiness-dashboard')}
          className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8] mb-2">
            <span>Overall Readiness</span>
            <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {readiness.overallScore}%
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>{readiness.tier}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => setCurrentTab('resume-analyzer')}
          className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8] mb-2">
            <span>Resume ATS Score</span>
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {studentResume ? `${studentResume.atsScore}%` : '82%'}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-[#94A3B8]">
            {studentResume ? `${studentResume.extractedSkills.length} Verified Skills` : 'Standard Profile Loaded'}
          </div>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => setCurrentTab('mock-interview')}
          className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8] mb-2">
            <span>Mock Interviews</span>
            <Bot className="w-4 h-4 text-purple-600 dark:text-[#A78BFA]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {interviewHistory.length} Completed
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-[#94A3B8]">
            Avg Score: <span className="font-semibold text-slate-700 dark:text-slate-300">{readiness.breakdown.mockInterviewScore.value}%</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => setCurrentTab('practice-zone')}
          className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8] mb-2">
            <span>Practice Tests</span>
            <PenTool className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {practiceAttempts.length} Quizzes
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-[#94A3B8]">
            Aptitude & Coding Mastery
          </div>
        </div>

      </div>

      {/* Main Grid: Upcoming Drive & Readiness Formula */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Drive Alert & Action Center */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Upcoming Drive Card */}
          {nextDrive && (
            <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] p-5 shadow-xs transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#334155]/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Upcoming On-Campus Placement Drive
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                  Registration Closes in 4 Days
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{nextDrive.companyName}</h3>
                  <p className="text-xs text-slate-600 dark:text-[#94A3B8] mt-0.5">{nextDrive.jobRole}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span>Package: <strong className="text-slate-800 dark:text-slate-200">{nextDrive.ctcLPA}</strong></span>
                    <span>&middot;</span>
                    <span>Min CGPA: <strong className="text-slate-800 dark:text-slate-200">{nextDrive.minCGPA}</strong></span>
                    <span>&middot;</span>
                    <span>Drive Date: <strong className="text-slate-800 dark:text-slate-200">{nextDrive.driveDate}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentTab('job-matcher')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap self-start sm:self-center shadow-xs"
                >
                  Check Eligibility & Apply
                </button>
              </div>
            </div>
          )}

          {/* Module Fast Launch Cards */}
          <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] p-5 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                Quick Preparation Portals
              </h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">All Modules Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentTab('resume-analyzer')}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-left flex items-start gap-3 group"
              >
                <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    AI Resume Analyzer
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5">
                    Extract skills & calculate ATS placement fit
                  </div>
                </div>
              </button>

              <button
                onClick={() => setCurrentTab('mock-interview')}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-left flex items-start gap-3 group"
              >
                <div className="p-2 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-[#A78BFA] group-hover:scale-105 transition-transform">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-[#A78BFA] transition-colors">
                    AI Mock Interview
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5">
                    Practice Technical, HR & TCS/Amazon rounds
                  </div>
                </div>
              </button>

              <button
                onClick={() => setCurrentTab('practice-zone')}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-left flex items-start gap-3 group"
              >
                <div className="p-2 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Placement Practice Zone
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5">
                    Aptitude, Reasoning & Programming tests
                  </div>
                </div>
              </button>

              <button
                onClick={() => setCurrentTab('job-matcher')}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-left flex items-start gap-3 group"
              >
                <div className="p-2 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Smart Job Matcher
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5">
                    View matching % and missing company skills
                  </div>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Today's Tasks & Transparent Readiness Weight */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Daily Tasks Card */}
          <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] p-5 shadow-xs transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                  Daily Preparation Tasks
                </h3>
              </div>
              <button
                onClick={() => setCurrentTab('daily-planner')}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                View Full Plan
              </button>
            </div>

            <div className="space-y-2">
              {dailyTasks.slice(0, 4).map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleDailyTask(task.id)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                    task.completed
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-60'
                      : 'bg-white dark:bg-[#1E293B] border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleDailyTask(task.id)}
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100 font-medium'}`}>
                      {task.title}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-2">
                      <span>{task.category}</span>
                      <span>&middot;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {task.estimatedMinutes} mins
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8]">
              <span>{pendingTasks.length} tasks remaining today</span>
              <button
                onClick={() => setCurrentTab('daily-planner')}
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700"
              >
                + Add Task
              </button>
            </div>
          </div>

          {/* Transparent Score Breakdown Mini Card */}
          <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] p-5 shadow-xs transition-colors">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
              Readiness Weight Distribution
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-[#94A3B8]">Technical & Coding (25%)</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{readiness.breakdown.technicalCoding.value}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" style={{ width: `${readiness.breakdown.technicalCoding.value}%` }}></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-600 dark:text-[#94A3B8]">Mock Interview Fluency (25%)</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{readiness.breakdown.mockInterviewScore.value}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-600 dark:bg-[#A78BFA] h-full rounded-full" style={{ width: `${readiness.breakdown.mockInterviewScore.value}%` }}></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-600 dark:text-[#94A3B8]">Quantitative Aptitude (20%)</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{readiness.breakdown.aptitudeScore.value}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 dark:bg-amber-400 h-full rounded-full" style={{ width: `${readiness.breakdown.aptitudeScore.value}%` }}></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-600 dark:text-[#94A3B8]">Resume Quality (15%)</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{readiness.breakdown.resumeScore.value}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 dark:bg-indigo-400 h-full rounded-full" style={{ width: `${readiness.breakdown.resumeScore.value}%` }}></div>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('readiness-dashboard')}
              className="mt-4 w-full py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-1 shadow-2xs"
            >
              <span>Inspect Formula & Weak Areas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
