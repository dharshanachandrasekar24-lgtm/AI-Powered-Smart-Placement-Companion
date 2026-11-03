import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { FeaturesPage, AboutPage, ContactPage } from './components/landing/PublicPages';
import { StudentDashboard } from './components/student/StudentDashboard';
import { ResumeAnalyzer } from './components/student/ResumeAnalyzer';
import { JobMatcher } from './components/student/JobMatcher';
import { MockInterview } from './components/student/MockInterview';
import { PracticeZone } from './components/student/PracticeZone';
import { PlacementReadiness } from './components/student/PlacementReadiness';
import { DailyStudyPlanner } from './components/student/DailyStudyPlanner';
import { SkillRoadmap } from './components/student/SkillRoadmap';
import { InterviewHistory } from './components/student/InterviewHistory';
import { StudentProfile } from './components/student/StudentProfile';
import { CollegeAdminDashboard } from './components/admin/CollegeAdminDashboard';
import { SuperAdminDashboard } from './components/superadmin/SuperAdminDashboard';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AuthModal } from './components/common/AuthModal';
import { NotificationItem } from './types';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'TCS Digital Placement Drive Announced',
    message: 'On-campus recruitment drive scheduled for Nov 22, 2026. CTC: 7.5 - 9.0 LPA. Registration closes in 4 days.',
    type: 'drive',
    timestamp: '2 hours ago',
    read: false,
    linkTab: 'job-matcher'
  },
  {
    id: 'notif-2',
    title: 'Eligibility Verified for Amazon AWS',
    message: 'Your current CGPA (8.65) and ATS Resume score satisfy all prerequisites for the Associate Cloud Engineer opening.',
    type: 'drive',
    timestamp: 'Yesterday',
    read: false,
    linkTab: 'job-matcher'
  },
  {
    id: 'notif-3',
    title: 'Readiness Milestone: Placement Ready Tier',
    message: 'Congratulations! Your combined preparation readiness has surpassed 84%. Keep practicing to sustain your ranking.',
    type: 'readiness',
    timestamp: '2 days ago',
    read: true,
    linkTab: 'readiness-dashboard'
  },
  {
    id: 'notif-4',
    title: 'Daily Study Habit Reminder',
    message: 'You have 3 daily learning tasks remaining today including Operating Systems concurrency practice.',
    type: 'system',
    timestamp: '3 days ago',
    read: true,
    linkTab: 'daily-planner'
  }
];

function AppContent() {
  const { currentUser } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const isPublicView = ['landing', 'about', 'features', 'contact'].includes(currentTab);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220] flex flex-col text-slate-900 dark:text-[#F8FAFC] font-sans transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openNotifications={() => setIsNotifDrawerOpen(true)}
        unreadCount={unreadCount}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      {isPublicView ? (
        <main className="flex-1">
          {currentTab === 'landing' && (
            <LandingPage
              onGetStarted={() => setCurrentTab('dashboard')}
              onExploreFeatures={() => setCurrentTab('features')}
              setCurrentTab={setCurrentTab}
            />
          )}
          {currentTab === 'features' && (
            <FeaturesPage onGetStarted={() => setCurrentTab('dashboard')} />
          )}
          {currentTab === 'about' && <AboutPage />}
          {currentTab === 'contact' && <ContactPage />}
        </main>
      ) : (
        /* Authenticated Workspace with Sidebar */
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {currentUser.role === 'STUDENT' && (
              <>
                {currentTab === 'dashboard' && <StudentDashboard setCurrentTab={setCurrentTab} />}
                {currentTab === 'resume-analyzer' && <ResumeAnalyzer />}
                {currentTab === 'job-matcher' && <JobMatcher />}
                {currentTab === 'mock-interview' && <MockInterview />}
                {currentTab === 'practice-zone' && <PracticeZone />}
                {currentTab === 'readiness-dashboard' && <PlacementReadiness setCurrentTab={setCurrentTab} />}
                {currentTab === 'daily-planner' && <DailyStudyPlanner />}
                {currentTab === 'skill-roadmap' && <SkillRoadmap />}
                {currentTab === 'interview-history' && <InterviewHistory />}
                {currentTab === 'profile' && <StudentProfile />}
              </>
            )}

            {currentUser.role === 'COLLEGE_ADMIN' && (
              <>
                {['dashboard', 'college-drives', 'college-students', 'college-jobs', 'college-analytics', 'profile'].includes(currentTab) && (
                  <CollegeAdminDashboard activeSubTab={currentTab} />
                )}
              </>
            )}

            {currentUser.role === 'SUPER_ADMIN' && (
              <>
                {['dashboard', 'super-colleges', 'super-tpos', 'super-jobs', 'super-analytics', 'profile'].includes(currentTab) && (
                  <SuperAdminDashboard />
                )}
              </>
            )}
          </main>
        </div>
      )}

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotifDrawerOpen}
        onClose={() => setIsNotifDrawerOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllRead}
        onSelectNotification={(tab) => {
          if (tab) setCurrentTab(tab);
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setCurrentTab('dashboard')}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
