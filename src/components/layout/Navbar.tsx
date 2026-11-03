import React, { useState } from 'react';
import { 
  GraduationCap, 
  Bell, 
  User as UserIcon, 
  ChevronDown, 
  LogOut, 
  Sparkles,
  Building2,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { ThemeToggle } from '../common/ThemeToggle';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openNotifications: () => void;
  unreadCount: number;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openNotifications,
  unreadCount,
  openAuthModal
}) => {
  const { currentUser, switchRole, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicPage = ['landing', 'about', 'features', 'contact'].includes(currentTab);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#334155] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => setCurrentTab(isPublicPage ? 'landing' : 'dashboard')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            SmartPlacement<span className="text-blue-600 dark:text-blue-400">.AI</span>
          </span>
        </button>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-[#94A3B8]">
          {isPublicPage ? (
            <>
              <button 
                onClick={() => setCurrentTab('landing')}
                className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'landing' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentTab('features')}
                className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'features' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
              >
                Features
              </button>
              <button 
                onClick={() => setCurrentTab('about')}
                className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'about' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
              >
                About Platform
              </button>
              <button 
                onClick={() => setCurrentTab('contact')}
                className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'contact' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
              >
                Contact & Support
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setCurrentTab('dashboard')}
                className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
              >
                Dashboard
              </button>
              {currentUser.role === 'STUDENT' && (
                <>
                  <button 
                    onClick={() => setCurrentTab('resume-analyzer')}
                    className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'resume-analyzer' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Resume Analyzer
                  </button>
                  <button 
                    onClick={() => setCurrentTab('job-matcher')}
                    className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'job-matcher' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Job Matcher
                  </button>
                  <button 
                    onClick={() => setCurrentTab('mock-interview')}
                    className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'mock-interview' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    AI Mock Interview
                  </button>
                  <button 
                    onClick={() => setCurrentTab('practice-zone')}
                    className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'practice-zone' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Practice Zone
                  </button>
                </>
              )}
              {currentUser.role === 'COLLEGE_ADMIN' && (
                <>
                  <button 
                    onClick={() => setCurrentTab('college-drives')}
                    className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'college-drives' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Placement Drives
                  </button>
                  <button 
                    onClick={() => setCurrentTab('college-students')}
                    className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'college-students' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Student Roster
                  </button>
                  <button 
                    onClick={() => setCurrentTab('college-jobs')}
                    className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'college-jobs' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Manage Postings
                  </button>
                </>
              )}
              {currentUser.role === 'SUPER_ADMIN' && (
                <>
                  <button 
                    onClick={() => setCurrentTab('super-colleges')}
                    className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'super-colleges' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Colleges Directory
                  </button>
                  <button 
                    onClick={() => setCurrentTab('super-analytics')}
                    className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'super-analytics' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Global Analytics
                  </button>
                </>
              )}
            </>
          )}
        </nav>

        {/* Zone 3: 1 primary action / controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Theme Toggle (Light / Dark / System) */}
          <ThemeToggle />

          {/* Quick Role Switcher for instant evaluator demonstration */}
          <div className="hidden xl:flex items-center bg-slate-100 dark:bg-[#1E293B] p-1 rounded-lg border border-slate-200 dark:border-[#334155] text-xs transition-colors">
            <span className="px-2 text-slate-500 dark:text-slate-400 font-medium">Demo:</span>
            <button
              onClick={() => { switchRole('STUDENT'); setCurrentTab('dashboard'); }}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${currentUser.role === 'STUDENT' ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Student
            </button>
            <button
              onClick={() => { switchRole('COLLEGE_ADMIN'); setCurrentTab('dashboard'); }}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${currentUser.role === 'COLLEGE_ADMIN' ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              TPO
            </button>
            <button
              onClick={() => { switchRole('SUPER_ADMIN'); setCurrentTab('dashboard'); }}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${currentUser.role === 'SUPER_ADMIN' ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Admin
            </button>
          </div>

          {/* Notifications Button */}
          {!isPublicPage && (
            <button
              onClick={openNotifications}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {/* User Profile / Auth Button */}
          {isPublicPage ? (
            <div className="flex items-center gap-2">
              <button
                onClick={openAuthModal}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentTab('dashboard')}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors whitespace-nowrap shadow-xs"
              >
                Open Dashboard
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors"
              >
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div className="hidden sm:block text-left text-xs">
                  <div className="font-semibold text-slate-900 dark:text-[#F8FAFC] truncate max-w-[120px]">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] capitalize">{currentUser.role.replace('_', ' ').toLowerCase()}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1E293B] rounded-xl shadow-xl border border-slate-200 dark:border-[#334155] py-1.5 text-xs z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700/60">
                    <p className="font-semibold text-slate-900 dark:text-[#F8FAFC]">{currentUser.name}</p>
                    <p className="text-slate-500 dark:text-[#94A3B8] truncate">{currentUser.email}</p>
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">{currentUser.collegeName || 'National Platform'}</p>
                  </div>
                  
                  <button
                    onClick={() => { setCurrentTab('profile'); setProfileDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    My Profile & Settings
                  </button>

                  <button
                    onClick={() => { setCurrentTab('landing'); setProfileDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-slate-400" />
                    Platform Public Tour
                  </button>

                  <div className="border-t border-slate-100 dark:border-slate-700/60 my-1"></div>

                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Role (Instant)
                  </div>
                  <button
                    onClick={() => { switchRole('STUDENT'); setCurrentTab('dashboard'); setProfileDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between ${currentUser.role === 'STUDENT' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  >
                    <span>Student (Aarav Sharma)</span>
                    {currentUser.role === 'STUDENT' && <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>}
                  </button>
                  <button
                    onClick={() => { switchRole('COLLEGE_ADMIN'); setCurrentTab('dashboard'); setProfileDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between ${currentUser.role === 'COLLEGE_ADMIN' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  >
                    <span>College TPO (Prof. Kulkarni)</span>
                    {currentUser.role === 'COLLEGE_ADMIN' && <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>}
                  </button>
                  <button
                    onClick={() => { switchRole('SUPER_ADMIN'); setCurrentTab('dashboard'); setProfileDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between ${currentUser.role === 'SUPER_ADMIN' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  >
                    <span>Super Admin (Dr. Malhotra)</span>
                    {currentUser.role === 'SUPER_ADMIN' && <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>}
                  </button>

                  <div className="border-t border-slate-100 dark:border-slate-700/60 my-1"></div>
                  <button
                    onClick={() => { logout(); setCurrentTab('landing'); setProfileDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-[#334155] px-4 py-3 space-y-2 text-sm text-slate-800 dark:text-slate-200">
          {isPublicPage ? (
            <>
              <button 
                onClick={() => { setCurrentTab('landing'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-1.5 font-medium hover:text-blue-600"
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentTab('features'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-1.5 font-medium hover:text-blue-600"
              >
                Features
              </button>
              <button 
                onClick={() => { setCurrentTab('about'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-1.5 font-medium hover:text-blue-600"
              >
                About Platform
              </button>
              <button 
                onClick={() => { setCurrentTab('contact'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-1.5 font-medium hover:text-blue-600"
              >
                Contact
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => { setCurrentTab('dashboard'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-1.5 font-medium hover:text-blue-600"
              >
                Dashboard
              </button>
              {currentUser.role === 'STUDENT' && (
                <>
                  <button 
                    onClick={() => { setCurrentTab('resume-analyzer'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-1.5 font-medium hover:text-blue-600"
                  >
                    Resume Analyzer
                  </button>
                  <button 
                    onClick={() => { setCurrentTab('job-matcher'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-1.5 font-medium hover:text-blue-600"
                  >
                    Job Matcher
                  </button>
                  <button 
                    onClick={() => { setCurrentTab('mock-interview'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-1.5 font-medium hover:text-blue-600"
                  >
                    AI Mock Interview
                  </button>
                  <button 
                    onClick={() => { setCurrentTab('practice-zone'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-1.5 font-medium hover:text-blue-600"
                  >
                    Practice Zone
                  </button>
                </>
              )}
            </>
          )}
          
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Switch Demo Role:</span>
            <div className="flex gap-1">
              <button 
                onClick={() => { switchRole('STUDENT'); setMobileMenuOpen(false); }}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300"
              >
                Student
              </button>
              <button 
                onClick={() => { switchRole('COLLEGE_ADMIN'); setMobileMenuOpen(false); }}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300"
              >
                TPO
              </button>
              <button 
                onClick={() => { switchRole('SUPER_ADMIN'); setMobileMenuOpen(false); }}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
