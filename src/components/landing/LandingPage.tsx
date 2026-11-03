import React from 'react';
import { 
  Sparkles, 
  FileText, 
  Briefcase, 
  Bot, 
  PenTool, 
  Target, 
  ArrowRight, 
  CheckCircle, 
  Building2, 
  GraduationCap, 
  Users, 
  Award,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
  setCurrentTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onExploreFeatures,
  setCurrentTab
}) => {
  const { switchRole } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220] text-slate-900 dark:text-[#F8FAFC] transition-colors duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-200 dark:border-[#334155] bg-white dark:bg-[#0B1220] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Generation Campus Placement Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Your Career Journey <br className="hidden sm:inline" />
                <span className="text-blue-600 dark:text-blue-400">Starts Here.</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-[#94A3B8] max-w-xl leading-relaxed">
                An AI-powered placement companion that analyzes your skills, prepares you for technical and HR interviews, and calculates personalized placement readiness scores.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-sm transition-all flex items-center gap-2 group whitespace-nowrap"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={onExploreFeatures}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-[#334155] rounded-lg transition-colors whitespace-nowrap"
                >
                  Explore Modules
                </button>
              </div>

              {/* Trust proof stats */}
              <div className="pt-6 border-t border-slate-100 dark:border-[#334155]/60 grid grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">94.2%</div>
                  <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium">Placement Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">45+ Colleges</div>
                  <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium">Affiliated Portals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">18.5 LPA</div>
                  <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium">Peak Package Secured</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-[#334155] group">
                <img
                  src="/src/assets/images/hero_placement_mentor_1793679802420.jpg"
                  alt="Students preparing for placements in modern campus tech center"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-102"
                />
                
                {/* Floating glass metrics card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-slate-200 dark:border-[#334155]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Live Student Placement Readiness
                    </span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tabular-nums">84% Ready</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" style={{ width: '84%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>ATS Resume: 88%</span>
                    <span>&middot;</span>
                    <span>Coding: 82%</span>
                    <span>&middot;</span>
                    <span>Mock Interview: 85%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PLATFORM FEATURES BENTO */}
      <section className="py-20 bg-slate-50 dark:bg-[#0B1220] border-b border-slate-200 dark:border-[#334155] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Comprehensive Placement Suite
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Five Intelligent Modules, One Complete Career Journey
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-[#94A3B8]">
              Engineered to replace fragmented preparation with an integrated, data-driven system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">AI Resume Analyzer</h4>
                <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  Upload PDF resumes with automatic PyMuPDF extraction. Identifies technical frameworks, certifications, detects missing skills, and calculates ATS placement score.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#334155]/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>ATS & Skill Breakdown</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Smart Job Matcher</h4>
                <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  Real-time matching against active corporate requirements. Computes match percentages, highlights missing prerequisites, and enforces CGPA eligibility criteria.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#334155]/60 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Skill Overlap & Apply</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-[#A78BFA] flex items-center justify-center mb-4">
                  <Bot className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">AI Mock Interview</h4>
                <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  Interactive voice and text interviews for Technical, HR, and Company-Specific rounds (TCS, AWS, Infosys). Dynamic follow-ups and transparent answer scoring.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#334155]/60 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-[#A78BFA]">
                <span>Speech & AI Evaluation</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  <PenTool className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Placement Practice Zone</h4>
                <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  Curated problem bank spanning Quantitative Aptitude, Logical Reasoning, and Core Programming challenges with instant step-by-step mathematical explanations.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#334155]/60 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
                <span>Timed Assessments</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Placement Readiness Score</h4>
                <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  A transparent mathematical composite combining resume strength, coding agility, aptitude scores, and mock interview performance into an actionable tier.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#334155]/60 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Weighted Formula</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Multi-College TPO Control</h4>
                <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  Role-based portals for Training & Placement Officers to track batch readiness, coordinate campus on-site drives, and broadcast eligibility notifications.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#334155]/60 flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400">
                <span>Enterprise TPO Suite</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-20 bg-white dark:bg-[#0B1220] border-b border-slate-200 dark:border-[#334155] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Structured Methodology
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              From Student Profile to Dream Offer in 4 Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-left space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Upload & Parse Resume</h4>
              <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Extract technical skills, verify CGPA, detect gaps, and optimize your ATS score before company applications open.
              </p>
            </div>

            <div className="text-left space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Master Aptitude & Code</h4>
              <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Practice topic-wise quantitative aptitude, logical puzzles, and language-specific challenges with detailed answers.
              </p>
            </div>

            <div className="text-left space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Conquer AI Mock Interviews</h4>
              <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Experience simulated technical and HR rounds with company-calibrated question sets and adaptive follow-ups.
              </p>
            </div>

            <div className="text-left space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm">
                04
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Match & Secure Drives</h4>
              <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Receive personalized job recommendations, verify eligibility, and register for campus recruitment drives with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DUAL BENEFITS (STUDENTS & COLLEGES) */}
      <section className="py-20 bg-slate-50 dark:bg-[#0B1220] border-b border-slate-200 dark:border-[#334155] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* For Students */}
            <div className="bg-white dark:bg-[#1E293B] p-8 rounded-2xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-6 text-left transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">For Aspiring Students</h3>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8]">Autonomous, personalized career acceleration</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Real ATS score calculation revealing exactly why resumes get filtered</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Interactive mock interview simulator with realistic speech recognition</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Personalized daily task planner focused strictly on your identified skill gaps</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Instant job matching against verified company requirements with CGPA filters</span>
                </div>
              </div>

              <button
                onClick={() => { switchRole('STUDENT'); setCurrentTab('dashboard'); }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors text-center"
              >
                Launch Student Experience &rarr;
              </button>
            </div>

            {/* For Colleges & TPOs */}
            <div className="bg-white dark:bg-[#1E293B] p-8 rounded-2xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-6 text-left transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">For College Placement Officers</h3>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8]">Institutional analytics and drive management</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Batch-level placement readiness tracking across CSE, IT, and core engineering</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>End-to-end placement drive scheduling with automated eligibility enforcement</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Corporate recruiter portal integration for instant student shortlisting</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Comprehensive placement statistics for accreditation (NAAC / NBA) audits</span>
                </div>
              </div>

              <button
                onClick={() => { switchRole('COLLEGE_ADMIN'); setCurrentTab('dashboard'); }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-colors text-center"
              >
                Launch Placement Officer Portal &rarr;
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. VERIFIED PLACEMENT SUCCESS STORIES */}
      <section className="py-20 bg-white dark:bg-[#0B1220] border-b border-slate-200 dark:border-[#334155] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Authentic Campus Outcomes
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Students Prepared, Placed, and Thriving
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-xl border border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#1E293B] space-y-4 transition-colors">
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "The AI Mock Interview's follow-up questions on operating system context switching mirrored the exact technical rounds I faced at Amazon. The readiness score showed me my weak spots two weeks before the drive."
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-[#334155]">
                <div className="font-bold text-slate-900 dark:text-white text-xs">Aarav Sharma</div>
                <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Placed at Amazon Web Services &middot; 21.5 LPA</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Apex Institute of Technology</div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#1E293B] space-y-4 transition-colors">
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "The Resume Analyzer pinpointed that my project bullet points lacked quantified metrics. After rewriting them with the AI suggestions, my ATS score went from 62% to 91%, and I got shortlisted for TCS Digital."
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-[#334155]">
                <div className="font-bold text-slate-900 dark:text-white text-xs">Pooja Venkatesh</div>
                <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Placed at TCS Digital Cadre &middot; 9.0 LPA</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">National College of Engineering</div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#1E293B] space-y-4 transition-colors">
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "As a Placement Officer managing 1,400 students, the real-time readiness dashboard helped our department intervene early for struggling students. Our campus placement rate jumped to 83% this season."
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-[#334155]">
                <div className="font-bold text-slate-900 dark:text-white text-xs">Prof. Ramesh Kulkarni</div>
                <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Head of Placements & Training</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Apex Institute of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="py-20 bg-slate-900 dark:bg-[#111827] text-white text-center border-b border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Accelerate Your Placement Success?
          </h2>
          <p className="text-sm text-slate-300 dark:text-[#94A3B8] max-w-xl mx-auto">
            Experience our intelligent resume scoring, interactive AI mock interviews, and tailored practice zones designed specifically for campus recruitment.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => { switchRole('STUDENT'); setCurrentTab('dashboard'); }}
              className="px-6 py-3 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              Open Student Portal
            </button>
            <button
              onClick={() => { switchRole('COLLEGE_ADMIN'); setCurrentTab('dashboard'); }}
              className="px-6 py-3 text-xs font-semibold text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-400 rounded-lg transition-colors whitespace-nowrap"
            >
              Open Placement Officer Portal
            </button>
          </div>
        </div>
      </section>

      {/* 7. CLEAN FOOTER */}
      <footer className="bg-white dark:bg-[#0B1220] border-t border-slate-200 dark:border-[#334155] py-12 text-xs text-slate-500 dark:text-[#94A3B8] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>AI-Powered Smart Placement Companion</span>
          </div>
          <div>
            &copy; 2026 AI-Powered Smart Placement Companion &middot; All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentTab('about')} className="hover:text-slate-900 dark:hover:text-white transition-colors">About</button>
            <button onClick={() => setCurrentTab('features')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</button>
            <button onClick={() => setCurrentTab('contact')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </footer>

    </div>
  );
};
