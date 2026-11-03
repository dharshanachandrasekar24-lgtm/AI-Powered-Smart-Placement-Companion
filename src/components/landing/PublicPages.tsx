import React from 'react';
import { 
  CheckCircle, 
  Sparkles, 
  FileText, 
  Briefcase, 
  Bot, 
  PenTool, 
  Target, 
  Building2, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Send 
} from 'lucide-react';

export const FeaturesPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const features = [
    {
      title: 'Module 1: AI Resume Analyzer & ATS Scorer',
      desc: 'Parses complex multi-column PDF resumes via PyMuPDF. Extracts structured skill taxonomies, projects, education, and flags crucial missing technical keywords for top campus recruiters.',
      bullets: ['Accurate ATS score out of 100', 'Automated missing skill diagnosis', 'Downloadable candidate audit report']
    },
    {
      title: 'Module 2: Smart Job Matcher with Skill Overlap',
      desc: 'Evaluates your candidate profile against active corporate placement requirements. Computes real skill overlap % and enforces minimum CGPA & backlog constraints.',
      bullets: ['Detailed matched vs missing skill analysis', 'One-click campus application tracking', 'Verified corporate salary & location data']
    },
    {
      title: 'Module 3: AI Mock Interview & Speech Recognition',
      desc: 'Conducts simulated recruitment rounds across Technical, HR, and Company-Specific tracks. Listens to speech or typed text, asks dynamic follow-up questions, and evaluates technical depth.',
      bullets: ['Full speech-to-text voice dictation', 'Dynamic context-aware follow-up prompts', 'Turn-by-turn model answers & rubrics']
    },
    {
      title: 'Module 4: Placement Practice Zone',
      desc: 'Timed assessment portal containing verified aptitude, logical reasoning puzzles, and language-specific programming prediction questions with full mathematical solutions.',
      bullets: ['Real-time countdown assessment timer', 'Step-by-step mathematical explanations', 'Practice attempt tracking for readiness scoring']
    },
    {
      title: 'Module 5: Placement Readiness Score Dashboard',
      desc: 'A transparent multi-factor weighted index aggregating resume strength (15%), coding accuracy (25%), aptitude speed (20%), logical reasoning (15%), and mock interview performance (25%).',
      bullets: ['Transparent non-blackbox formula', 'Automated tier classification', 'Direct link to daily learning schedules']
    },
    {
      title: 'Module 6: Multi-College Placement Officer Console',
      desc: 'Institutional surveillance portal enabling Training & Placement Officers to track batch-wide readiness scores, publish verified drives, and schedule on-campus recruitment.',
      bullets: ['Batch readiness surveillance table', 'Drive scheduling with branch cutoffs', 'Accreditation-grade placement metrics']
    }
  ];

  return (
    <div className="py-16 bg-slate-50 dark:bg-[#0B1220] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Architectural Feature Tour</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Engineered for Campus Recruitment Excellence
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8]">
            A unified suite designed to turn ambitious students into top-tier placement candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC]">{f.title}</h3>
              <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">{f.desc}</p>
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-[#334155]">
                {f.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-6">
          <button
            onClick={onGetStarted}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
          >
            Experience Platform Modules Live &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 bg-white dark:bg-[#0B1220] text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Academic Pedagogy & Mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            About AI-Powered Smart Placement Companion
          </h1>
          <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
            Campus recruitment has historically suffered from fragmented tools: resume templates that fail ATS parsers, generic coding websites with no institutional context, and anxiety-inducing interviews with zero structured feedback.
          </p>
        </div>

        <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>SmartPlacement.AI</strong> was created as a state-of-the-art career acceleration companion for higher education. Built on transparent mathematical rubrics, real-time speech processing, and server-side artificial intelligence, the platform bridges the divide between student aspirations and corporate recruiter benchmarks.
          </p>
          <p>
            With multi-college hierarchy support, institutions maintain autonomous student directories, custom placement drives, and verified eligibility gates, while students receive personalized study itineraries tailored to their exact skill gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-[#334155]">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-[#334155]">
            <h4 className="font-bold text-slate-900 dark:text-[#F8FAFC] text-sm mb-1">Our Core Mission</h4>
            <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              Ensure every graduating engineer and science graduate enters their campus drives with verified readiness.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-[#334155]">
            <h4 className="font-bold text-slate-900 dark:text-[#F8FAFC] text-sm mb-1">Transparent AI</h4>
            <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              We never fabricate scores. Every metric is backed by transparent weights and clear explanations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-[#334155]">
            <h4 className="font-bold text-slate-900 dark:text-[#F8FAFC] text-sm mb-1">Institutional Scale</h4>
            <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              Engineered to support tens of thousands of concurrent students across affiliated university networks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="py-16 bg-slate-50 dark:bg-[#0B1220] text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Institutional Support & Partnerships
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Connect With Our Academic Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] max-w-lg mx-auto">
            Inquiring about college onboarding, enterprise recruiter partnerships, or student technical assistance? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">Direct Contact Channels</h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-[#94A3B8]">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>support@smartplacement.ai</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>+91 80 4567 8900 (Mon - Fri, 9am - 6pm)</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>Technology Innovation Hub, Electronic City Phase 1, Bangalore 560100, India</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-300 space-y-1">
              <span className="font-bold">Colleges & Universities:</span>
              <p className="text-slate-600 dark:text-[#94A3B8]">
                Contact us to schedule an on-premise demonstration of the TPO portal and student readiness surveillance system.
              </p>
            </div>
          </div>

          <div className="md:col-span-7 bg-white dark:bg-[#1E293B] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC]">Message Received!</h3>
                <p className="text-xs text-slate-600 dark:text-[#94A3B8]">
                  Our academic partnership team will respond to your official institutional email within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Sunita Rao"
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Official Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. tpo@university.edu"
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Affiliated College or Company</label>
                  <input
                    type="text"
                    placeholder="e.g. National College of Engineering"
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Inquiry Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry regarding campus onboarding, student batches, or recruiter drives..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiries</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
