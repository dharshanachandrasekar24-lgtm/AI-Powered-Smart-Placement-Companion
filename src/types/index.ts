export type UserRole = 'STUDENT' | 'COLLEGE_ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  collegeId?: string;
  collegeName?: string;
  department?: string;
  batch?: string;
  cgpa?: number;
  phone?: string;
}

export interface College {
  id: string;
  name: string;
  code: string;
  location: string;
  affiliatedUniversity: string;
  adminName: string;
  adminEmail: string;
  totalStudents: number;
  placedStudents: number;
  activeDrives: number;
  placementRate: number; // percentage
  averagePackageLPA: number;
}

export interface SkillItem {
  name: string;
  category: 'programming' | 'framework' | 'database' | 'cloud' | 'core_cs' | 'soft_skills';
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ResumeAnalysisResult {
  id: string;
  fileName: string;
  uploadedAt: string;
  atsScore: number; // 0 - 100
  candidateName: string;
  email: string;
  phone: string;
  extractedSkills: SkillItem[];
  missingCrucialSkills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
    cgpa?: string;
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
  }[];
  certifications: string[];
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
  readinessContribution: number;
  evaluationEngine: 'Gemini 3.8 AI' | 'NLP Heuristic Engine';
  rawTextPreview?: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogoText: string;
  location: string;
  workMode: 'On-site' | 'Remote' | 'Hybrid';
  type: 'Full-time' | 'Internship' | 'Drive';
  packageLPA: string;
  requiredSkills: string[];
  minCGPA: number;
  eligibleBranches: string[];
  maxBacklogs: number;
  deadline: string;
  description: string;
  collegeId?: string; // empty means global
  matchingPercentage?: number;
  matchedSkills?: string[];
  missingSkills?: string[];
  isEligible?: boolean;
  applied?: boolean;
}

export type InterviewCategory = 'Technical' | 'HR' | 'Programming' | 'Company-Specific';
export type InterviewDifficulty = 'Entry' | 'Intermediate' | 'Advanced';

export interface InterviewQuestionItem {
  id: string;
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  companyTarget?: string;
  question: string;
  idealKeyPoints: string[];
  sampleGoodAnswer: string;
}

export interface EvaluatedTurn {
  questionNumber: number;
  question: string;
  userAnswer: string;
  score: number; // 0 - 100
  technicalAccuracyScore: number;
  clarityScore: number;
  relevanceScore: number;
  strengths: string[];
  improvementPoints: string[];
  modelAnswer: string;
  followUpQuestion?: string;
}

export interface MockInterviewSession {
  id: string;
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  companyTarget?: string;
  startedAt: string;
  completedAt?: string;
  turns: EvaluatedTurn[];
  overallScore: number;
  summaryFeedback: string;
  evaluationEngine: 'Gemini 3.8 AI' | 'Rule-Based Evaluation Engine';
}

export type PracticeCategory = 'Aptitude' | 'Logical Reasoning' | 'Programming';

export interface PracticeQuestion {
  id: string;
  category: PracticeCategory;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface PracticeAttempt {
  id: string;
  category: PracticeCategory;
  topic: string;
  score: number;
  totalQuestions: number;
  date: string;
  durationMinutes: number;
}

export interface PlacementReadinessMetrics {
  overallScore: number; // 0 - 100
  tier: 'Placement Ready' | 'High Potential' | 'In Preparation' | 'Foundation Building';
  breakdown: {
    resumeScore: { value: number; weight: number; weighted: number };
    technicalCoding: { value: number; weight: number; weighted: number };
    aptitudeScore: { value: number; weight: number; weighted: number };
    logicalReasoning: { value: number; weight: number; weighted: number };
    mockInterviewScore: { value: number; weight: number; weighted: number };
  };
  strengths: string[];
  weaknesses: string[];
  recentGrowthPercentage: number;
}

export interface DailyStudyTask {
  id: string;
  title: string;
  category: 'Coding' | 'Aptitude' | 'System Design' | 'HR Prep' | 'Resume Fix';
  estimatedMinutes: number;
  completed: boolean;
  dueDate: string;
}

export interface PlacementDrive {
  id: string;
  companyName: string;
  jobRole: string;
  ctcLPA: string;
  driveDate: string;
  registrationDeadline: string;
  collegeId: string;
  eligibleBranches: string[];
  minCGPA: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  totalRegistered: number;
  shortlistedCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'drive' | 'interview' | 'readiness' | 'system';
  timestamp: string;
  read: boolean;
  linkTab?: string;
}
