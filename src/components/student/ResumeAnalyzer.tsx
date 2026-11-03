import React, { useState, useRef } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  Download, 
  RefreshCw, 
  Tag, 
  GraduationCap, 
  FolderGit2, 
  Award,
  ChevronRight,
  TrendingUp,
  Cpu,
  FileCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ResumeAnalysisResult } from '../../types';

const SAMPLE_RESUME_TEXT = `Aarav Sharma
Email: aarav.sharma@ait.edu.in | Phone: +91 98450 12345 | GitHub: github.com/aaravsharma
Location: Bangalore, Karnataka | LinkedIn: linkedin.com/in/aarav-sharma-cs

EDUCATION:
Bachelor of Technology in Computer Science and Engineering
Apex Institute of Technology, Bangalore | 2023 - 2027
CGPA: 8.65 / 10.0 (Top 5% of batch)

TECHNICAL SKILLS:
Programming Languages: Python, Java, C++, JavaScript, TypeScript, SQL
Frameworks & Libraries: React, Node.js, Express, Tailwind CSS, FastAPI
Databases & Cloud: PostgreSQL, MongoDB, MySQL, Redis, AWS (S3, EC2 basics)
Developer Tools & Core CS: Git, Docker, Linux, Data Structures and Algorithms, Object-Oriented Programming, Operating Systems, Database Management Systems

PROJECTS:
1. Distributed Campus Placement & Mock Evaluator
- Engineered a full-stack campus placement portal supporting 1,400+ concurrent students using React, Node.js, and PostgreSQL.
- Implemented automated algorithmic problem evaluation engine with real-time feedback using sandboxed worker threads.
- Optimized database indexing and connection pooling, reducing search latency by 42%.

2. Multi-Threaded Cache & Distributed Key-Value Store
- Built an in-memory LRU cache engine in Java with concurrent read/write locks, achieving 120k requests per second throughput.
- Implemented write-behind persistence and snapshot recovery for fault tolerance.

CERTIFICATIONS:
- AWS Certified Cloud Practitioner (CLF-C02)
- HackerRank 5-Star Problem Solving in Data Structures & Algorithms
- Meta Frontend Developer Professional Certificate

CO-CURRICULAR & ACHIEVEMENTS:
- Winner, Smart India Hackathon College Round 2025 (AI Track)
- Lead Organizer, Apex Tech Symposium 2025`;

export const ResumeAnalyzer: React.FC = () => {
  const { studentResume, setStudentResume } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setErrorMsg('Please select a valid PDF file.');
        return;
      }
      setSelectedFile(file);
      setErrorMsg(null);
    }
  };

  // Perform upload and API analysis
  const analyzeFile = async (fileToUpload?: File) => {
    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      let response: Response;

      if (fileToUpload) {
        const formData = new FormData();
        formData.append('resumePdf', fileToUpload);
        response = await fetch('/api/resume/analyze', {
          method: 'POST',
          body: formData
        });
      } else {
        // Send sample structured text
        response = await fetch('/api/resume/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resumeText: SAMPLE_RESUME_TEXT,
            fileName: 'Aarav_Sharma_Resume.pdf'
          })
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze resume');
      }

      const result: ResumeAnalysisResult = await response.json();
      setStudentResume(result);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during resume analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Download Analysis Report
  const downloadReport = () => {
    if (!studentResume) return;
    const reportContent = `=====================================================
AI-POWERED SMART PLACEMENT COMPANION - RESUME ANALYSIS REPORT
=====================================================
Candidate Name: ${studentResume.candidateName}
File Evaluated: ${studentResume.fileName}
Date: ${new Date(studentResume.uploadedAt).toLocaleString()}
ATS Match Score: ${studentResume.atsScore} / 100
Evaluation Engine: ${studentResume.evaluationEngine}

EXTRACTED TECHNICAL SKILLS (${studentResume.extractedSkills.length}):
${studentResume.extractedSkills.map(s => `- [${s.category.toUpperCase()}] ${s.name} (${s.level || 'Intermediate'})`).join('\n')}

MISSING CRUCIAL PLACEMENT SKILLS:
${studentResume.missingCrucialSkills.map(s => `- ${s}`).join('\n')}

TOP STRENGTHS:
${studentResume.strengths.map(s => `- ${s}`).join('\n')}

AREAS FOR IMPROVEMENT:
${studentResume.weaknesses.map(s => `- ${s}`).join('\n')}

ACTIONABLE RECOMMENDATIONS:
${studentResume.improvementSuggestions.map(s => `- ${s}`).join('\n')}
=====================================================`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentResume.candidateName.replace(/\s+/g, '_')}_Placement_Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Module 1 &middot; Resume Intelligence
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            AI Resume Analyzer & ATS Scorer
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Extracts skills, flags missing industry keywords, and calculates real placement readiness.
          </p>
        </div>

        {studentResume && (
          <button
            onClick={downloadReport}
            className="px-4 py-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 self-start sm:self-center whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            Download Analysis Report
          </button>
        )}
      </div>

      {/* Upload Zone */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-center shadow-xs">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />

        <div className="max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Upload Your PDF Placement Resume
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
              Supports standard single-page or multi-page PDF resumes up to 10MB
            </p>
          </div>

          {selectedFile && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200">
              <FileCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
            >
              Browse PDF
            </button>

            {selectedFile && (
              <button
                onClick={() => analyzeFile(selectedFile)}
                disabled={isAnalyzing}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing PDF...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run AI Analysis</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => analyzeFile()}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Verified Sample Resume</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs rounded-lg text-left flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results */}
      {studentResume ? (
        <div className="space-y-6">
          
          {/* Top Score Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* ATS Scorecard */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex items-center gap-6 transition-colors">
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100 dark:text-slate-700"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600 dark:text-blue-500 transition-all duration-1000 ease-out"
                    strokeDasharray={`${studentResume.atsScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {studentResume.atsScore}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block -mt-1">/100</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  ATS Fit Score
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {studentResume.atsScore >= 80 ? 'Highly Competitive' : studentResume.atsScore >= 65 ? 'Moderate Competitive' : 'Needs Optimization'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-1">
                  Engine: <strong className="text-blue-600 dark:text-blue-400">{studentResume.evaluationEngine}</strong>
                </div>
              </div>
            </div>

            {/* Candidate Metadata */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-2 transition-colors">
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Candidate Profile
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white">
                {studentResume.candidateName}
              </div>
              <div className="text-xs text-slate-500 dark:text-[#94A3B8] space-y-0.5">
                <div>Email: <span className="text-slate-800 dark:text-slate-200">{studentResume.email}</span></div>
                <div>Phone: <span className="text-slate-800 dark:text-slate-200">{studentResume.phone}</span></div>
              </div>
            </div>

            {/* Readiness Contribution */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-2 transition-colors">
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Placement Contribution
              </div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                +{studentResume.readinessContribution}%
              </div>
              <div className="text-xs text-slate-500 dark:text-[#94A3B8]">
                Supplies 15% to your overall placement readiness calculation.
              </div>
            </div>

          </div>

          {/* Skills Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Extracted Skills */}
            <div className="lg:col-span-7 bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Extracted Technical Skills ({studentResume.extractedSkills.length})
                </h3>
                <span className="text-xs text-slate-400 dark:text-slate-500">Classified by Domain</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {studentResume.extractedSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5"
                  >
                    <span>{skill.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 capitalize">({skill.category.replace('_', ' ')})</span>
                  </div>
                ))}
              </div>

              {/* Projects Breakdown */}
              {studentResume.projects && studentResume.projects.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-[#334155]/60 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Detected Project Experiences
                  </h4>
                  <div className="space-y-3">
                    {studentResume.projects.map((proj, pIdx) => (
                      <div key={pIdx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white">{proj.title}</div>
                        <p className="text-slate-600 dark:text-[#94A3B8] leading-relaxed">{proj.description}</p>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="font-semibold text-slate-600 dark:text-slate-300">Tech Stack:</span>
                            {proj.technologies.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Missing Skills & Recommendations */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Missing Crucial Skills */}
              <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-3 transition-colors">
                <h3 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Missing High-Demand Placement Skills
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                  Adding verifiable projects in these areas will dramatically elevate shortlist rates for tier-1 IT firms:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {studentResume.missingCrucialSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded text-xs font-semibold"
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-4 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-[#94A3B8]">
                    {studentResume.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">&bull;</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#334155]/60">
                  <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    Weak Areas to Address
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-[#94A3B8]">
                    {studentResume.weaknesses.map((weak, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">&bull;</span>
                        <span>{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-3 transition-colors">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Actionable Improvement Plan
                </h3>
                <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {studentResume.improvementSuggestions.map((sug, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-start gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400">{idx + 1}.</span>
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        <div className="bg-white dark:bg-[#1E293B] p-12 rounded-xl border border-slate-200 dark:border-[#334155] text-center shadow-xs space-y-3 transition-colors">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">No Resume Analyzed Yet</h3>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] max-w-sm mx-auto">
            Upload your college resume PDF above or click "Load Verified Sample Resume" to instantly test the parsing and scoring workflow.
          </p>
        </div>
      )}

    </div>
  );
};
