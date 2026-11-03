import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Bot, 
  PenTool, 
  Target, 
  Calendar, 
  Compass, 
  History, 
  Building2, 
  Users, 
  PlusCircle, 
  BarChart3, 
  Globe, 
  Building, 
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const { currentUser } = useAuth();

  const studentNav = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'resume-analyzer', label: 'AI Resume Analyzer', icon: FileText },
    { id: 'job-matcher', label: 'Smart Job Matcher', icon: Briefcase },
    { id: 'mock-interview', label: 'AI Mock Interview', icon: Bot },
    { id: 'practice-zone', label: 'Placement Practice Zone', icon: PenTool },
    { id: 'readiness-dashboard', label: 'Placement Readiness', icon: Target },
    { id: 'daily-planner', label: 'Daily AI Study Planner', icon: Calendar },
    { id: 'skill-roadmap', label: 'Skill Gap & Roadmap', icon: Compass },
    { id: 'interview-history', label: 'Interview History', icon: History },
  ];

  const collegeAdminNav = [
    { id: 'dashboard', label: 'TPO Placement Overview', icon: LayoutDashboard },
    { id: 'college-drives', label: 'Placement Drives', icon: Building2 },
    { id: 'college-students', label: 'Student Readiness Roster', icon: Users },
    { id: 'college-jobs', label: 'Manage Job Openings', icon: PlusCircle },
    { id: 'college-analytics', label: 'Department Analytics', icon: BarChart3 },
  ];

  const superAdminNav = [
    { id: 'dashboard', label: 'Super Admin Overview', icon: LayoutDashboard },
    { id: 'super-colleges', label: 'Affiliated Colleges', icon: Building },
    { id: 'super-tpos', label: 'Placement Officers', icon: Users },
    { id: 'super-jobs', label: 'Global Job Directory', icon: Globe },
    { id: 'super-analytics', label: 'Cross-Campus Analytics', icon: BarChart3 },
  ];

  const navItems = 
    currentUser.role === 'STUDENT' ? studentNav :
    currentUser.role === 'COLLEGE_ADMIN' ? collegeAdminNav : superAdminNav;

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-[#334155] hidden md:flex flex-col min-h-[calc(100vh-4rem)] transition-colors duration-200">
      {/* College / Organization Context Banner */}
      <div className="p-4 border-b border-slate-100 dark:border-[#334155]/60">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {currentUser.role === 'STUDENT' ? 'Current Institution' : currentUser.role === 'COLLEGE_ADMIN' ? 'Placement Cell' : 'Central Platform'}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            {currentUser.collegeName ? currentUser.collegeName.charAt(0) : 'P'}
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
            {currentUser.collegeName || 'National AI Placement Portal'}
          </span>
        </div>
      </div>

      {/* Main Nav Links */}
      <nav className="flex-1 p-3 space-y-1">
        <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-[#94A3B8] hover:bg-slate-50 dark:hover:bg-[#1E293B] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* Student Readiness Quick Glance in Sidebar */}
      {currentUser.role === 'STUDENT' && (
        <div className="p-4 m-3 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-[#334155] transition-colors">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Readiness Score
            </span>
            <span className="font-bold text-slate-900 dark:text-white tabular-nums">84%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: '84%' }}></div>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Tier:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Placement Ready</span>
          </div>
        </div>
      )}

      {/* College TPO Summary in Sidebar */}
      {currentUser.role === 'COLLEGE_ADMIN' && (
        <div className="p-4 m-3 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-[#334155] transition-colors">
          <div className="text-xs font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            2026-27 Placement Drive
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">1,180 of 1,420 students placed</div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '83%' }}></div>
          </div>
          <div className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-400 text-right tabular-nums">83.1% placement rate</div>
        </div>
      )}

      {/* Bottom Footer Note */}
      <div className="p-3 border-t border-slate-100 dark:border-[#334155]/60 text-[11px] text-slate-400 dark:text-slate-500 text-center">
        v2.4 &middot; Verified Academic Architecture
      </div>
    </aside>
  );
};
