import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Code2, 
  Cpu, 
  Server,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface RoleRoadmapDef {
  role: string;
  category: string;
  requiredSkills: string[];
  phases: {
    phase: string;
    duration: string;
    topics: string[];
    milestoneProject: string;
  }[];
}

const ROADMAPS: RoleRoadmapDef[] = [
  {
    role: 'Software Development Engineer - Backend & Cloud',
    category: 'Tier-1 Product Firms (AWS, Microsoft, Google)',
    requiredSkills: ['Data Structures', 'Algorithms', 'Java', 'Python', 'SQL', 'System Design', 'Docker', 'AWS', 'Distributed Systems'],
    phases: [
      {
        phase: 'Phase 1: Algorithmic Rigor & Core CS',
        duration: 'Weeks 1 - 4',
        topics: ['Binary Search & Two Pointers', 'Trees & Graph BFS/DFS', 'Dynamic Programming Fundamentals', 'OS Memory Virtualization & Concurrency'],
        milestoneProject: 'High-Throughput Concurrent Cache in Java with LRU eviction'
      },
      {
        phase: 'Phase 2: Database Scalability & Microservices',
        duration: 'Weeks 5 - 8',
        topics: ['PostgreSQL Index Optimization & Execution Plans', 'Redis Caching Patterns (Cache-Aside, Write-Through)', 'REST & gRPC Microservices in Node/Go'],
        milestoneProject: 'Distributed URL Shortener with Redis Rate Limiting & Sharded DB'
      },
      {
        phase: 'Phase 3: Cloud Deployment & System Architecture',
        duration: 'Weeks 9 - 12',
        topics: ['Docker Containerization & Kubernetes Pods', 'AWS S3, EC2, Lambda & CloudWatch', 'High-Level System Design (CAP Theorem, Load Balancing)'],
        milestoneProject: 'Event-Driven Realtime Notification Engine on AWS SQS & Docker'
      }
    ]
  },
  {
    role: 'Full Stack Engineer - React & Node.js',
    category: 'High-Growth Tech Startups & Digital Consultancies',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'Git', 'REST APIs'],
    phases: [
      {
        phase: 'Phase 1: Modern Frontend Engineering',
        duration: 'Weeks 1 - 3',
        topics: ['TypeScript Advanced Generics & Utility Types', 'React Custom Hooks & State Management', 'Tailwind CSS Responsive Design Systems'],
        milestoneProject: 'Interactive Enterprise Analytics Dashboard with Tailwind & Recharts'
      },
      {
        phase: 'Phase 2: Full Stack Integration & API Security',
        duration: 'Weeks 4 - 7',
        topics: ['Express / Fastify REST APIs with JWT Auth', 'Prisma / Drizzle ORM Schema Migrations', 'WebSockets for Live Collaborative State'],
        milestoneProject: 'Collaborative Real-time Kanban Workspace with WebSockets'
      },
      {
        phase: 'Phase 3: Production Readiness & Testing',
        duration: 'Weeks 8 - 10',
        topics: ['CI/CD with GitHub Actions', 'Automated Vitest & Playwright E2E Tests', 'Lighthouse Performance Optimization & PWA'],
        milestoneProject: 'Production SaaS with Stripe Billing & Dockerized Deployment'
      }
    ]
  },
  {
    role: 'Machine Learning & Data Engineer',
    category: 'AI Enterprise & Big Data Analytics',
    requiredSkills: ['Python', 'SQL', 'Scikit-learn', 'PyTorch', 'Data Structures', 'Docker', 'FastAPI', 'Pandas'],
    phases: [
      {
        phase: 'Phase 1: Mathematical Foundations & Data Wrangling',
        duration: 'Weeks 1 - 4',
        topics: ['Linear Algebra & Vector Calculus for ML', 'Advanced Pandas & NumPy Vectorized Operations', 'Feature Engineering & Exploratory Data Analysis'],
        milestoneProject: 'Automated Tabular Data Cleaning and Predictive Benchmark Suite'
      },
      {
        phase: 'Phase 2: Classical ML & Model Evaluation',
        duration: 'Weeks 5 - 8',
        topics: ['Supervised Models (Random Forest, XGBoost)', 'Unsupervised Clustering & PCA', 'Cross-Validation & ROC/AUC Performance Tuning'],
        milestoneProject: 'End-to-End Customer Churn Classifier with FastAPI Serving'
      },
      {
        phase: 'Phase 3: Deep Learning & Production MLOps',
        duration: 'Weeks 9 - 12',
        topics: ['PyTorch Neural Networks & Embeddings', 'Vector Search & LLM Retrieval-Augmented Generation', 'Model Deployment with Docker & MLflow'],
        milestoneProject: 'Enterprise Document Semantic Search with Vector Embeddings'
      }
    ]
  }
];

export const SkillRoadmap: React.FC = () => {
  const { studentResume } = useAuth();
  const [selectedRoadmapIdx, setSelectedRoadmapIdx] = useState(0);

  const activeRoadmap = ROADMAPS[selectedRoadmapIdx];
  const currentSkills = new Set(
    studentResume
      ? studentResume.extractedSkills.map(s => s.name.toLowerCase())
      : ['python', 'java', 'sql', 'react', 'data structures', 'git']
  );

  const matched = activeRoadmap.requiredSkills.filter(s => currentSkills.has(s.toLowerCase()));
  const missing = activeRoadmap.requiredSkills.filter(s => !currentSkills.has(s.toLowerCase()));
  const matchPct = Math.round((matched.length / activeRoadmap.requiredSkills.length) * 100);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Advanced Feature &middot; Career Pathway Navigation
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Target Role Skill Gap & Preparation Roadmap
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Compare your verified profile against high-paying placement tracks and execute a phased learning curriculum.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-[#94A3B8]">Track Match:</span>
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
            {matchPct}% Fit
          </span>
        </div>
      </div>

      {/* Role Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ROADMAPS.map((rm, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedRoadmapIdx(idx)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedRoadmapIdx === idx
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600 text-blue-900 dark:text-blue-200 shadow-xs'
                : 'bg-white dark:bg-[#1E293B] border-slate-200 dark:border-[#334155] hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {rm.category}
            </div>
            <div className="text-sm font-bold mt-1 text-slate-900 dark:text-[#F8FAFC]">
              {rm.role}
            </div>
          </button>
        ))}
      </div>

      {/* Skill Gap Analysis Box */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#334155]">
          <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
            Prerequisite Skill Gap Analysis for {activeRoadmap.role}
          </h3>
          <span className="text-xs text-slate-500 dark:text-[#94A3B8]">
            {matched.length} of {activeRoadmap.requiredSkills.length} Skills Acquired
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800 space-y-2">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Verified Skills on Resume ({matched.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {matched.map(s => (
                <span key={s} className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 rounded text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800 space-y-2">
            <div className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Circle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Missing High-Yield Skills to Acquire ({missing.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {missing.map(s => (
                <span key={s} className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-300 rounded text-xs font-medium">
                  + {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phased Roadmap Timeline */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-6">
        <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
          Step-by-Step Structured Preparation Curriculum
        </h3>

        <div className="space-y-6">
          {activeRoadmap.phases.map((ph, pIdx) => (
            <div key={pIdx} className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-900/50 space-y-2 pb-4">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-[#1E293B]"></div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-[#F8FAFC] text-sm">{ph.phase}</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-[#94A3B8] font-semibold">{ph.duration}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-xs text-slate-600 dark:text-[#94A3B8]">
                {ph.topics.map((top, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>{top}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">Capstone Portfolio Milestone: </span>
                <span className="text-blue-700 dark:text-blue-400 font-medium">{ph.milestoneProject}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
