import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  ExternalLink,
  Check,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { JobOpportunity } from '../../types';

export const JobMatcher: React.FC = () => {
  const { currentUser, studentResume } = useAuth();
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('ALL');
  const [minMatchThreshold, setMinMatchThreshold] = useState<number>(50);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('spc_applied_jobs');
    return saved ? new Set(JSON.parse(saved)) : new Set(['job-2']);
  });

  const studentSkills = studentResume
    ? studentResume.extractedSkills.map(s => s.name)
    : ['Python', 'Java', 'SQL', 'React', 'Data Structures', 'Git', 'Linux'];

  useEffect(() => {
    fetchJobs();
  }, [studentResume]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/jobs/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentSkills,
          cgpa: currentUser.cgpa || 8.2,
          branch: currentUser.department || 'Computer Science'
        })
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (err) {
      console.error('Failed to match jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobId: string) => {
    setAppliedJobIds(prev => {
      const next = new Set(prev);
      next.add(jobId);
      localStorage.setItem('spc_applied_jobs', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Distinct company list for filter
  const companies = Array.from(new Set(jobs.map(j => j.company)));

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCompany = selectedCompany === 'ALL' || job.company === selectedCompany;
    const matchesScore = (job.matchingPercentage || 0) >= minMatchThreshold;

    return matchesSearch && matchesCompany && matchesScore;
  });

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Module 2 &middot; Opportunity Match Engine
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Smart Job & Campus Placement Matcher
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Matching against verified recruiter requirements based on your extracted resume skills and academic eligibility.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <div className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{studentSkills.length} Active Candidate Skills</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by role, company, or required skill..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Company Filter */}
          <div className="md:col-span-4">
            <select
              value={selectedCompany}
              onChange={e => setSelectedCompany(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">All Companies (Verified)</option>
              {companies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Match Score Threshold Slider */}
          <div className="md:col-span-3 flex items-center gap-2 bg-slate-50 dark:bg-[#111827] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#334155]">
            <span className="text-[11px] font-medium text-slate-500 dark:text-[#94A3B8] whitespace-nowrap">
              Min Match: <strong className="text-slate-800 dark:text-slate-200">{minMatchThreshold}%</strong>
            </span>
            <input
              type="range"
              min="30"
              max="90"
              step="5"
              value={minMatchThreshold}
              onChange={e => setMinMatchThreshold(parseInt(e.target.value, 10))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

        </div>
      </div>

      {/* Job Opportunity Cards List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-500 dark:text-[#94A3B8]">
          Calculating skill overlap and corporate eligibility...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white dark:bg-[#1E293B] p-12 rounded-xl border border-slate-200 dark:border-[#334155] text-center shadow-xs">
          <Briefcase className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">No Job Opportunities Found</h3>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">Try lowering the minimum match threshold or clearing search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map(job => {
            const isApplied = appliedJobIds.has(job.id);
            const matchScore = job.matchingPercentage || 70;

            return (
              <div
                key={job.id}
                className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] hover:border-blue-300 dark:hover:border-blue-500 transition-all p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top Bar: Company & Match Score Badge */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-xs shrink-0 border border-blue-100 dark:border-blue-800">
                        {job.companyLogoText || job.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] leading-snug">
                          {job.title}
                        </h3>
                        <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium">
                          {job.company}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`text-sm font-extrabold tabular-nums ${
                        matchScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' : matchScore >= 60 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'
                      }`}>
                        {matchScore}% Match
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">Skill Overlap</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-[#94A3B8] line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-[#94A3B8] bg-slate-50 dark:bg-[#111827] p-2.5 rounded-lg mb-4">
                    <div>
                      <span>Package: </span>
                      <strong className="text-slate-800 dark:text-slate-200">{job.packageLPA}</strong>
                    </div>
                    <div>
                      <span>Location: </span>
                      <strong className="text-slate-800 dark:text-slate-200">{job.location}</strong>
                    </div>
                    <div>
                      <span>Min CGPA: </span>
                      <strong className="text-slate-800 dark:text-slate-200">{job.minCGPA}</strong>
                      {currentUser.cgpa && currentUser.cgpa >= job.minCGPA ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium ml-1">(Eligible)</span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 font-medium ml-1">(Below Cutoff)</span>
                      )}
                    </div>
                    <div>
                      <span>Deadline: </span>
                      <strong className="text-slate-800 dark:text-slate-200">{job.deadline}</strong>
                    </div>
                  </div>

                  {/* Matched Skills */}
                  <div className="space-y-2 mb-4">
                    <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      Matched Skills ({job.matchedSkills?.length || 0}):
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.matchedSkills && job.matchedSkills.length > 0 ? (
                        job.matchedSkills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-medium border border-emerald-100 dark:border-emerald-800 flex items-center gap-1"
                          >
                            <Check className="w-2.5 h-2.5" />
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">None currently matched</span>
                      )}
                    </div>

                    {/* Missing Skills for Role */}
                    {job.missingSkills && job.missingSkills.length > 0 && (
                      <div className="pt-1">
                        <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                          Recommended Skills to Learn for this Role:
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {job.missingSkills.map((s, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px] font-medium border border-amber-100 dark:border-amber-800"
                            >
                              + {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Bottom Action Strip */}
                <div className="pt-3 border-t border-slate-100 dark:border-[#334155] flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">
                    Mode: <strong className="text-slate-700 dark:text-slate-300">{job.workMode}</strong>
                  </div>

                  {isApplied ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 cursor-default"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Applied & Tracked
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-xs"
                    >
                      One-Click Campus Apply
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
