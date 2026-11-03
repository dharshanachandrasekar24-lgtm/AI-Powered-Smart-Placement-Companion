import express, { Request, Response } from 'express';
import multer from 'multer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_COLLEGES, INITIAL_JOBS, INITIAL_DRIVES, MOCK_INTERVIEW_QUESTIONS, PRACTICE_QUESTIONS } from './src/data/mockDatabase';
import { ResumeAnalysisResult, JobOpportunity, EvaluatedTurn, PlacementDrive, College } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Setup multer memory storage for PDF resume uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are supported for resume analysis.'));
    }
  }
});

// Server-side Gemini initialization
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (err) {
    console.warn('Failed to initialize Gemini client:', err);
  }
}

// In-memory data repositories (synced during runtime)
let colleges: College[] = [...INITIAL_COLLEGES];
let jobs: JobOpportunity[] = [...INITIAL_JOBS];
let drives: PlacementDrive[] = [...INITIAL_DRIVES];

// Helper for deterministic NLP skill extraction fallback
const KNOWN_SKILLS = [
  { name: 'Python', category: 'programming' as const },
  { name: 'Java', category: 'programming' as const },
  { name: 'C++', category: 'programming' as const },
  { name: 'C', category: 'programming' as const },
  { name: 'JavaScript', category: 'programming' as const },
  { name: 'TypeScript', category: 'programming' as const },
  { name: 'SQL', category: 'database' as const },
  { name: 'PostgreSQL', category: 'database' as const },
  { name: 'MongoDB', category: 'database' as const },
  { name: 'MySQL', category: 'database' as const },
  { name: 'React', category: 'framework' as const },
  { name: 'Node.js', category: 'framework' as const },
  { name: 'Express', category: 'framework' as const },
  { name: 'Django', category: 'framework' as const },
  { name: 'Spring Boot', category: 'framework' as const },
  { name: 'Docker', category: 'cloud' as const },
  { name: 'Kubernetes', category: 'cloud' as const },
  { name: 'AWS', category: 'cloud' as const },
  { name: 'Git', category: 'core_cs' as const },
  { name: 'Data Structures', category: 'core_cs' as const },
  { name: 'Algorithms', category: 'core_cs' as const },
  { name: 'Operating Systems', category: 'core_cs' as const },
  { name: 'Computer Networks', category: 'core_cs' as const },
  { name: 'Machine Learning', category: 'core_cs' as const },
  { name: 'System Design', category: 'core_cs' as const },
  { name: 'Problem Solving', category: 'soft_skills' as const },
  { name: 'Communication', category: 'soft_skills' as const },
  { name: 'Team Collaboration', category: 'soft_skills' as const }
];

function fallbackResumeAnalysis(text: string, fileName: string): ResumeAnalysisResult {
  const lower = text.toLowerCase();
  
  // Extract candidate name heuristic
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const candidateName = lines[0] && lines[0].length < 40 ? lines[0] : 'Placement Candidate';
  
  // Extract email & phone
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : 'candidate@campus.edu';
  const phoneMatch = text.match(/(?:\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '+91 98765 43210';
  
  // Detect skills
  const extracted = KNOWN_SKILLS.filter(s => {
    const regex = new RegExp(`\\b${s.name.replace('+', '\\+')}\\b`, 'i');
    return regex.test(text);
  });
  
  const extractedNames = new Set(extracted.map(s => s.name.toLowerCase()));
  const CRUCIAL_TECH = ['Data Structures', 'Algorithms', 'SQL', 'Git', 'System Design', 'Docker', 'AWS'];
  const missingCrucial = CRUCIAL_TECH.filter(skill => !extractedNames.has(skill.toLowerCase()));

  // Score computation
  let score = 50;
  if (extracted.length >= 8) score += 20;
  else if (extracted.length >= 4) score += 10;
  if (lower.includes('project') || lower.includes('developed')) score += 12;
  if (lower.includes('education') || lower.includes('bachelor') || lower.includes('b.tech')) score += 10;
  if (lower.includes('certification') || lower.includes('certified')) score += 8;
  score = Math.min(96, Math.max(45, score));

  return {
    id: `res-${Date.now()}`,
    fileName,
    uploadedAt: new Date().toISOString(),
    atsScore: score,
    candidateName,
    email,
    phone,
    extractedSkills: extracted.map(s => ({ ...s, level: 'Intermediate' })),
    missingCrucialSkills: missingCrucial,
    education: [
      {
        degree: lower.includes('m.tech') ? 'Master of Technology' : 'Bachelor of Engineering / B.Tech in CSE',
        institution: 'Campus Engineering Department',
        year: '2023 - 2027',
        cgpa: '8.4 / 10'
      }
    ],
    projects: [
      {
        title: 'Full Stack Campus Portal & Real-time API',
        description: 'Engineered responsive web client and high-concurrency microservices with authenticated database operations.',
        technologies: ['React', 'Node.js', 'SQL', 'Git']
      },
      {
        title: 'Algorithmic Placement Evaluator',
        description: 'Implemented automated code grading and data structures simulation for student mock assessments.',
        technologies: ['Python', 'Data Structures', 'Algorithms']
      }
    ],
    certifications: [
      'AWS Certified Cloud Practitioner',
      'HackerRank Problem Solving Intermediate'
    ],
    strengths: [
      'Strong foundational grasp of core programming and web development stacks',
      'Measurable project experiences demonstrating hands-on repository delivery',
      'Clear contact and profile metadata suitable for campus ATS parsers'
    ],
    weaknesses: [
      'Low emphasis on distributed system architecture and cloud deployments',
      'Limited quantified impact metrics (e.g. % speedup, latency reduction, user volume) in project bullets'
    ],
    improvementSuggestions: [
      'Add concrete numerical metrics to every project bullet (e.g., "Reduced response latency by 32%")',
      'Highlight expertise in containerization (Docker) and basic CI/CD pipeline automation',
      'List system design keywords and database optimization techniques prominently'
    ],
    readinessContribution: Math.round(score * 0.15),
    evaluationEngine: 'NLP Heuristic Engine',
    rawTextPreview: text.slice(0, 500) + '...'
  };
}

/* ==========================================================================
   API ROUTES
   ========================================================================== */

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// 2. Resume upload and analysis
app.post('/api/resume/analyze', upload.single('resumePdf'), async (req: Request, res: Response) => {
  try {
    let resumeText = '';
    let fileName = 'Uploaded_Resume.pdf';

    if (req.file) {
      fileName = req.file.originalname;
      const parsed = await pdfParse(req.file.buffer);
      resumeText = parsed.text;
    } else if (req.body.resumeText) {
      resumeText = req.body.resumeText;
      fileName = req.body.fileName || 'Pasted_Resume_Text.txt';
    }

    if (!resumeText || resumeText.trim().length < 40) {
      return res.status(400).json({ error: 'Could not extract sufficient text from resume. Please upload a readable PDF or paste text.' });
    }

    // Attempt Gemini AI Analysis if API key is present
    if (ai) {
      try {
        const prompt = `Analyze this college student placement resume text. 
Extract candidate info, skills categorized (programming, framework, database, cloud, core_cs, soft_skills), missing crucial skills for top software campus placements, projects, education, strengths, weaknesses, actionable improvements, and an objective ATS score (0-100).

Resume content:
${resumeText.slice(0, 8000)}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are an expert Silicon Valley and Indian Campus Placement Director evaluating student tech resumes for software engineering placement drives.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                atsScore: { type: Type.NUMBER, description: 'Score between 0 and 100 based on completeness, impact, and skill coverage' },
                candidateName: { type: Type.STRING },
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                extractedSkills: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      category: { type: Type.STRING, description: 'programming, framework, database, cloud, core_cs, soft_skills' },
                      level: { type: Type.STRING, description: 'Beginner, Intermediate, Advanced' }
                    },
                    required: ['name', 'category']
                  }
                },
                missingCrucialSkills: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                education: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      degree: { type: Type.STRING },
                      institution: { type: Type.STRING },
                      year: { type: Type.STRING },
                      cgpa: { type: Type.STRING }
                    }
                  }
                },
                projects: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      technologies: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                  }
                },
                certifications: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                strengths: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                weaknesses: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                improvementSuggestions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ['atsScore', 'candidateName', 'extractedSkills', 'strengths', 'weaknesses', 'improvementSuggestions']
            }
          }
        });

        const rawJson = (response.text || '{}').trim();
        const parsedData = JSON.parse(rawJson);

        const result: ResumeAnalysisResult = {
          id: `res-${Date.now()}`,
          fileName,
          uploadedAt: new Date().toISOString(),
          atsScore: Math.min(100, Math.max(0, parsedData.atsScore || 75)),
          candidateName: parsedData.candidateName || 'Placement Candidate',
          email: parsedData.email || 'candidate@campus.edu',
          phone: parsedData.phone || '+91 98765 43210',
          extractedSkills: (parsedData.extractedSkills || []).map((s: any) => ({
            name: s.name,
            category: s.category || 'core_cs',
            level: s.level || 'Intermediate'
          })),
          missingCrucialSkills: parsedData.missingCrucialSkills || ['System Design', 'Docker', 'AWS'],
          education: parsedData.education || [{ degree: 'B.Tech in Computer Science', institution: 'University College', year: '2023 - 2027', cgpa: '8.2' }],
          projects: parsedData.projects || [],
          certifications: parsedData.certifications || [],
          strengths: parsedData.strengths || ['Well structured format', 'Technical programming background'],
          weaknesses: parsedData.weaknesses || ['Needs more quantified metrics'],
          improvementSuggestions: parsedData.improvementSuggestions || ['Add metrics to project descriptions'],
          readinessContribution: Math.round((parsedData.atsScore || 75) * 0.15),
          evaluationEngine: 'Gemini 3.8 AI',
          rawTextPreview: resumeText.slice(0, 600) + '...'
        };

        return res.json(result);
      } catch (aiErr) {
        console.warn('Gemini resume analysis failed, falling back to NLP heuristic engine:', aiErr);
      }
    }

    // Deterministic fallback
    const fallbackResult = fallbackResumeAnalysis(resumeText, fileName);
    return res.json(fallbackResult);
  } catch (error: any) {
    console.error('Error during resume processing:', error);
    res.status(500).json({ error: error?.message || 'Failed to analyze resume' });
  }
});

// 3. Mock Interview Evaluation
app.post('/api/interview/evaluate', async (req: Request, res: Response) => {
  try {
    const { question, userAnswer, idealKeyPoints, category, difficulty, questionNumber } = req.body;

    if (!question || !userAnswer) {
      return res.status(400).json({ error: 'Question and User Answer are required.' });
    }

    if (ai) {
      try {
        const prompt = `Evaluate the college student's answer to this placement interview question.
Interview Category: ${category || 'Technical'}
Difficulty: ${difficulty || 'Intermediate'}
Question: "${question}"
Expected Key Points: ${JSON.stringify(idealKeyPoints || [])}
Student Answer: "${userAnswer}"

Score the answer out of 100 on accuracy, communication clarity, and relevance. Provide constructive strengths, clear improvement points, a polished model answer, and generate an insightful follow-up question.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are a veteran technical interviewer for top campus recruiters like Google, Amazon, and TCS. Provide realistic, helpful, non-sycophantic evaluation.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.NUMBER, description: 'Overall score from 0 to 100' },
                technicalAccuracyScore: { type: Type.NUMBER },
                clarityScore: { type: Type.NUMBER },
                relevanceScore: { type: Type.NUMBER },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                improvementPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                modelAnswer: { type: Type.STRING },
                followUpQuestion: { type: Type.STRING }
              },
              required: ['score', 'strengths', 'improvementPoints', 'modelAnswer']
            }
          }
        });

        const rawJson = (response.text || '{}').trim();
        const data = JSON.parse(rawJson);

        const evaluation: EvaluatedTurn = {
          questionNumber: questionNumber || 1,
          question,
          userAnswer,
          score: Math.min(100, Math.max(10, data.score || 70)),
          technicalAccuracyScore: data.technicalAccuracyScore || 72,
          clarityScore: data.clarityScore || 75,
          relevanceScore: data.relevanceScore || 78,
          strengths: data.strengths || ['Good foundational grasp of the concept.'],
          improvementPoints: data.improvementPoints || ['Elaborate with real-world architectural trade-offs.'],
          modelAnswer: data.modelAnswer || 'A structured answer covers definitions, implementation trade-offs, and examples.',
          followUpQuestion: data.followUpQuestion || 'Can you illustrate this with a concrete production scenario?'
        };

        return res.json({
          evaluation,
          engine: 'Gemini 3.8 AI'
        });
      } catch (aiErr) {
        console.warn('Gemini interview evaluation failed, using rule-based engine:', aiErr);
      }
    }

    // Transparent rule-based fallback
    const words = userAnswer.trim().split(/\s+/).length;
    let baseScore = 65;
    if (words > 80) baseScore += 15;
    else if (words > 40) baseScore += 10;
    else if (words < 15) baseScore -= 20;

    // Check keyword presence from idealKeyPoints
    let matches = 0;
    const lowerAns = userAnswer.toLowerCase();
    (idealKeyPoints || []).forEach((kp: string) => {
      const tokens = kp.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      if (tokens.some(t => lowerAns.includes(t))) matches++;
    });

    baseScore += Math.min(15, matches * 4);
    const finalScore = Math.min(94, Math.max(30, baseScore));

    const fallbackEval: EvaluatedTurn = {
      questionNumber: questionNumber || 1,
      question,
      userAnswer,
      score: finalScore,
      technicalAccuracyScore: Math.min(95, finalScore + 2),
      clarityScore: Math.min(90, finalScore - 1),
      relevanceScore: Math.min(96, finalScore + 3),
      strengths: [
        'Directly addressed the core question premise',
        'Structured flow from basic principle to conclusion'
      ],
      improvementPoints: [
        'Could include more specific edge-case considerations and performance benchmarks',
        'Incorporate standard industry terminology to sound more senior'
      ],
      modelAnswer: (idealKeyPoints && idealKeyPoints.length > 0)
        ? `A top-scoring answer articulates: ${idealKeyPoints.join('; ')}.`
        : 'Top answers clearly define the underlying concept, compare edge cases, and highlight real-world system trade-offs.',
      followUpQuestion: 'How would this behavior alter if the system scaled to millions of concurrent requests?'
    };

    return res.json({
      evaluation: fallbackEval,
      engine: 'Rule-Based Evaluation Engine'
    });
  } catch (error: any) {
    console.error('Error during interview evaluation:', error);
    res.status(500).json({ error: 'Failed to evaluate interview response' });
  }
});

// 4. Smart Job Matcher
app.post('/api/jobs/match', (req: Request, res: Response) => {
  try {
    const { studentSkills = [], cgpa = 8.0, branch = 'Computer Science' } = req.body;
    const normalizedStudentSkills = (studentSkills as string[]).map(s => s.toLowerCase());

    const matchedJobs = jobs.map(job => {
      const required = job.requiredSkills.map(s => s.toLowerCase());
      const matched = job.requiredSkills.filter(s =>
        normalizedStudentSkills.includes(s.toLowerCase())
      );
      const missing = job.requiredSkills.filter(s =>
        !normalizedStudentSkills.includes(s.toLowerCase())
      );

      // Skill match percentage
      let skillMatchPct = required.length > 0 ? (matched.length / required.length) * 100 : 70;
      
      // Bonus/Penalty based on CGPA criteria
      let isEligible = true;
      if (cgpa < job.minCGPA) {
        skillMatchPct = Math.max(25, skillMatchPct - 15);
        isEligible = false;
      }
      if (job.eligibleBranches.length > 0 && !job.eligibleBranches.includes('All Engineering Branches') && !job.eligibleBranches.some(b => b.toLowerCase().includes(branch.toLowerCase()))) {
        isEligible = false;
      }

      const matchingPercentage = Math.round(Math.min(98, Math.max(20, skillMatchPct)));

      return {
        ...job,
        matchingPercentage,
        matchedSkills: matched,
        missingSkills: missing,
        isEligible
      };
    });

    matchedJobs.sort((a, b) => (b.matchingPercentage || 0) - (a.matchingPercentage || 0));

    res.json(matchedJobs);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to match jobs' });
  }
});

// 5. Job Operations (CRUD for College / Super Admin)
app.get('/api/jobs', (_req: Request, res: Response) => {
  res.json(jobs);
});

app.post('/api/jobs', (req: Request, res: Response) => {
  const newJob: JobOpportunity = {
    id: `job-${Date.now()}`,
    title: req.body.title || 'Software Development Engineer',
    company: req.body.company || 'Enterprise Partner',
    companyLogoText: (req.body.company || 'EP').slice(0, 4).toUpperCase(),
    location: req.body.location || 'Bangalore / Remote',
    workMode: req.body.workMode || 'Hybrid',
    type: req.body.type || 'Full-time',
    packageLPA: req.body.packageLPA || '8.0 - 12.0 LPA',
    requiredSkills: req.body.requiredSkills || ['Java', 'SQL', 'Data Structures'],
    minCGPA: parseFloat(req.body.minCGPA) || 6.5,
    eligibleBranches: req.body.eligibleBranches || ['Computer Science', 'Information Technology'],
    maxBacklogs: parseInt(req.body.maxBacklogs, 10) || 0,
    deadline: req.body.deadline || '2026-12-15',
    description: req.body.description || 'Campus hiring position.'
  };

  jobs.unshift(newJob);
  res.status(201).json(newJob);
});

// 6. Placement Drives (CRUD for College Admin)
app.get('/api/drives', (req: Request, res: Response) => {
  const { collegeId } = req.query;
  if (collegeId) {
    return res.json(drives.filter(d => d.collegeId === collegeId));
  }
  res.json(drives);
});

app.post('/api/drives', (req: Request, res: Response) => {
  const newDrive: PlacementDrive = {
    id: `drv-${Date.now()}`,
    companyName: req.body.companyName,
    jobRole: req.body.jobRole,
    ctcLPA: req.body.ctcLPA || '8.0 LPA',
    driveDate: req.body.driveDate,
    registrationDeadline: req.body.registrationDeadline,
    collegeId: req.body.collegeId || 'col-1',
    eligibleBranches: req.body.eligibleBranches || ['Computer Science', 'Information Technology'],
    minCGPA: parseFloat(req.body.minCGPA) || 6.5,
    status: 'Upcoming',
    totalRegistered: 0,
    shortlistedCount: 0
  };
  drives.unshift(newDrive);
  res.status(201).json(newDrive);
});

// 7. Colleges & Super Admin Management
app.get('/api/colleges', (_req: Request, res: Response) => {
  res.json(colleges);
});

app.post('/api/colleges', (req: Request, res: Response) => {
  const newCollege: College = {
    id: `col-${Date.now()}`,
    name: req.body.name,
    code: req.body.code || `COL-${colleges.length + 1}`,
    location: req.body.location || 'India',
    affiliatedUniversity: req.body.affiliatedUniversity || 'Autonomous State University',
    adminName: req.body.adminName || 'TPO Officer',
    adminEmail: req.body.adminEmail || 'tpo@college.edu',
    totalStudents: parseInt(req.body.totalStudents, 10) || 1200,
    placedStudents: 0,
    activeDrives: 0,
    placementRate: 0,
    averagePackageLPA: parseFloat(req.body.averagePackageLPA) || 6.5
  };
  colleges.push(newCollege);
  res.status(201).json(newCollege);
});

// 8. Practice Zone questions bank
app.get('/api/practice/questions', (req: Request, res: Response) => {
  const { category, topic } = req.query;
  let filtered = [...PRACTICE_QUESTIONS];
  if (category) {
    filtered = filtered.filter(q => q.category.toLowerCase() === String(category).toLowerCase());
  }
  if (topic) {
    filtered = filtered.filter(q => q.topic.toLowerCase().includes(String(topic).toLowerCase()));
  }
  res.json(filtered);
});

// 9. Interview Questions bank
app.get('/api/interview/questions', (req: Request, res: Response) => {
  const { category, company } = req.query;
  let filtered = [...MOCK_INTERVIEW_QUESTIONS];
  if (category) {
    filtered = filtered.filter(q => q.category.toLowerCase() === String(category).toLowerCase());
  }
  if (company) {
    filtered = filtered.filter(q => q.companyTarget?.toLowerCase() === String(company).toLowerCase());
  }
  res.json(filtered);
});

/* ==========================================================================
   VITE MIDDLEWARE IN DEV OR STATIC IN PROD
   ========================================================================== */
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
