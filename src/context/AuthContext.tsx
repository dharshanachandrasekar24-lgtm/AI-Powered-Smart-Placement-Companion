import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, ResumeAnalysisResult, MockInterviewSession, PracticeAttempt, DailyStudyTask } from '../types';

interface AuthContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  login: (email: string, role: UserRole, name?: string) => void;
  logout: () => void;
  studentResume: ResumeAnalysisResult | null;
  setStudentResume: (resume: ResumeAnalysisResult | null) => void;
  interviewHistory: MockInterviewSession[];
  addInterviewSession: (session: MockInterviewSession) => void;
  practiceAttempts: PracticeAttempt[];
  addPracticeAttempt: (attempt: PracticeAttempt) => void;
  dailyTasks: DailyStudyTask[];
  toggleDailyTask: (taskId: string) => void;
  addDailyTask: (task: Omit<DailyStudyTask, 'id' | 'completed'>) => void;
  targetRole: string;
  setTargetRole: (role: string) => void;
  updateStudentProfile: (updates: Partial<User>) => void;
}

const DEFAULT_STUDENT: User = {
  id: 'usr-student-01',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@ait.edu.in',
  role: 'STUDENT',
  avatarUrl: '/src/assets/images/student_avatar_profile_1793679802463.jpg',
  collegeId: 'col-1',
  collegeName: 'Apex Institute of Technology',
  department: 'Computer Science and Engineering',
  batch: '2023 - 2027',
  cgpa: 8.65,
  phone: '+91 98450 12345'
};

const DEFAULT_COLLEGE_ADMIN: User = {
  id: 'usr-tpo-01',
  name: 'Prof. Ramesh Kulkarni',
  email: 'tpo.apex@ait.edu.in',
  role: 'COLLEGE_ADMIN',
  avatarUrl: '/src/assets/images/tpo_officer_avatar_1793679804134.jpg',
  collegeId: 'col-1',
  collegeName: 'Apex Institute of Technology',
  department: 'Training and Placement Cell',
  phone: '+91 94480 67890'
};

const DEFAULT_SUPER_ADMIN: User = {
  id: 'usr-super-01',
  name: 'Dr. Vikram Malhotra',
  email: 'superadmin@smartplacement.ai',
  role: 'SUPER_ADMIN',
  avatarUrl: '',
  department: 'National Placement Governance',
  phone: '+91 98110 54321'
};

const DEFAULT_DAILY_TASKS: DailyStudyTask[] = [
  {
    id: 'dt-1',
    title: 'Solve 2 Dynamic Programming problems on HackerRank',
    category: 'Coding',
    estimatedMinutes: 45,
    completed: true,
    dueDate: 'Today'
  },
  {
    id: 'dt-2',
    title: 'Complete Aptitude Timed Quiz on Time & Work',
    category: 'Aptitude',
    estimatedMinutes: 20,
    completed: false,
    dueDate: 'Today'
  },
  {
    id: 'dt-3',
    title: 'Attempt AI Mock Interview on Operating Systems & Concurrency',
    category: 'System Design',
    estimatedMinutes: 30,
    completed: false,
    dueDate: 'Today'
  },
  {
    id: 'dt-4',
    title: 'Review missing cloud skills: Docker & AWS Fundamentals',
    category: 'Resume Fix',
    estimatedMinutes: 25,
    completed: false,
    dueDate: 'Tomorrow'
  }
];

const INITIAL_PRACTICE_ATTEMPTS: PracticeAttempt[] = [
  {
    id: 'pa-1',
    category: 'Aptitude',
    topic: 'Time and Work',
    score: 80,
    totalQuestions: 5,
    date: 'Yesterday',
    durationMinutes: 12
  },
  {
    id: 'pa-2',
    category: 'Logical Reasoning',
    topic: 'Coding and Decoding',
    score: 100,
    totalQuestions: 4,
    date: '2 days ago',
    durationMinutes: 8
  },
  {
    id: 'pa-3',
    category: 'Programming',
    topic: 'Python Output Prediction',
    score: 75,
    totalQuestions: 4,
    date: '3 days ago',
    durationMinutes: 10
  }
];

const INITIAL_INTERVIEW_SESSION: MockInterviewSession = {
  id: 'mis-prev-1',
  category: 'Technical',
  difficulty: 'Intermediate',
  companyTarget: 'TCS',
  startedAt: '2026-11-01T14:30:00.000Z',
  completedAt: '2026-11-01T14:52:00.000Z',
  overallScore: 82,
  summaryFeedback: 'Commendable conceptual clarity on multithreading and database indexing. Advised to substantiate answers with runtime complexity and system trade-offs.',
  evaluationEngine: 'Gemini 3.8 AI',
  turns: [
    {
      questionNumber: 1,
      question: 'What is the difference between Process and Thread?',
      userAnswer: 'A process is an independent program in execution with its own isolated address space, whereas threads share the memory space of their parent process.',
      score: 85,
      technicalAccuracyScore: 88,
      clarityScore: 84,
      relevanceScore: 86,
      strengths: ['Accurate definition of memory isolation'],
      improvementPoints: ['Could mention TLB context switching overhead'],
      modelAnswer: 'Processes have independent virtual address spaces requiring MMU page table flushes during context switches; threads share code and data sections while retaining independent stacks.'
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('spc_user');
    return saved ? JSON.parse(saved) : DEFAULT_STUDENT;
  });

  const [studentResume, setStudentResume] = useState<ResumeAnalysisResult | null>(() => {
    const saved = localStorage.getItem('spc_resume');
    return saved ? JSON.parse(saved) : null;
  });

  const [interviewHistory, setInterviewHistory] = useState<MockInterviewSession[]>(() => {
    const saved = localStorage.getItem('spc_interviews');
    return saved ? JSON.parse(saved) : [INITIAL_INTERVIEW_SESSION];
  });

  const [practiceAttempts, setPracticeAttempts] = useState<PracticeAttempt[]>(() => {
    const saved = localStorage.getItem('spc_practice');
    return saved ? JSON.parse(saved) : INITIAL_PRACTICE_ATTEMPTS;
  });

  const [dailyTasks, setDailyTasks] = useState<DailyStudyTask[]>(() => {
    const saved = localStorage.getItem('spc_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_DAILY_TASKS;
  });

  const [targetRole, setTargetRole] = useState<string>('Software Development Engineer');

  useEffect(() => {
    localStorage.setItem('spc_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (studentResume) localStorage.setItem('spc_resume', JSON.stringify(studentResume));
  }, [studentResume]);

  useEffect(() => {
    localStorage.setItem('spc_interviews', JSON.stringify(interviewHistory));
  }, [interviewHistory]);

  useEffect(() => {
    localStorage.setItem('spc_practice', JSON.stringify(practiceAttempts));
  }, [practiceAttempts]);

  useEffect(() => {
    localStorage.setItem('spc_tasks', JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  const switchRole = (role: UserRole) => {
    if (role === 'STUDENT') setCurrentUser(DEFAULT_STUDENT);
    else if (role === 'COLLEGE_ADMIN') setCurrentUser(DEFAULT_COLLEGE_ADMIN);
    else if (role === 'SUPER_ADMIN') setCurrentUser(DEFAULT_SUPER_ADMIN);
  };

  const login = (email: string, role: UserRole, name?: string) => {
    const base = role === 'STUDENT' ? DEFAULT_STUDENT : role === 'COLLEGE_ADMIN' ? DEFAULT_COLLEGE_ADMIN : DEFAULT_SUPER_ADMIN;
    setCurrentUser({
      ...base,
      email,
      name: name || base.name,
      role
    });
  };

  const logout = () => {
    setCurrentUser(DEFAULT_STUDENT);
  };

  const addInterviewSession = (session: MockInterviewSession) => {
    setInterviewHistory(prev => [session, ...prev]);
  };

  const addPracticeAttempt = (attempt: PracticeAttempt) => {
    setPracticeAttempts(prev => [attempt, ...prev]);
  };

  const toggleDailyTask = (taskId: string) => {
    setDailyTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addDailyTask = (task: Omit<DailyStudyTask, 'id' | 'completed'>) => {
    const newTask: DailyStudyTask = {
      ...task,
      id: `task-${Date.now()}`,
      completed: false
    };
    setDailyTasks(prev => [newTask, ...prev]);
  };

  const updateStudentProfile = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        switchRole,
        login,
        logout,
        studentResume,
        setStudentResume,
        interviewHistory,
        addInterviewSession,
        practiceAttempts,
        addPracticeAttempt,
        dailyTasks,
        toggleDailyTask,
        addDailyTask,
        targetRole,
        setTargetRole,
        updateStudentProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
