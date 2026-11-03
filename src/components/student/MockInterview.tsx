import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Send, 
  RefreshCw, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Award, 
  ArrowRight, 
  RotateCcw,
  Volume2,
  Building2,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  InterviewCategory, 
  InterviewDifficulty, 
  InterviewQuestionItem, 
  EvaluatedTurn, 
  MockInterviewSession 
} from '../../types';

export const MockInterview: React.FC = () => {
  const { addInterviewSession } = useAuth();
  
  // Configuration State
  const [selectedCategory, setSelectedCategory] = useState<InterviewCategory>('Technical');
  const [selectedDifficulty, setSelectedDifficulty] = useState<InterviewDifficulty>('Intermediate');
  const [companyTarget, setCompanyTarget] = useState<string>('General Tech');
  
  // Session State
  const [inSession, setInSession] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestionItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [evaluatedTurns, setEvaluatedTurns] = useState<EvaluatedTurn[]>([]);
  const [currentFollowUp, setCurrentFollowUp] = useState<string | null>(null);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [evaluationEngine, setEvaluationEngine] = useState<string>('Gemini 3.8 AI');

  // Speech Recognition setup (Web Speech API)
  const recognitionRef = React.useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer(prev => prev + ' ' + transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Please type your response.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech recognition start error:', err);
      }
    }
  };

  // Text-to-Speech question reading
  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startInterview = async () => {
    try {
      const res = await fetch(`/api/interview/questions?category=${selectedCategory}`);
      const data: InterviewQuestionItem[] = await res.json();
      
      const qList = data.length > 0 ? data : [
        {
          id: 'def-1',
          category: selectedCategory,
          difficulty: selectedDifficulty,
          question: 'Can you describe a complex technical issue you encountered in a project, and how you approached debugging and optimizing it?',
          idealKeyPoints: ['Root cause identification', 'Performance profiling', 'Trade-off comparison'],
          sampleGoodAnswer: 'I identified memory leaks using profilers, isolated offending event handlers, and implemented cleanup routines.'
        }
      ];

      setQuestions(qList);
      setCurrentQuestionIndex(0);
      setEvaluatedTurns([]);
      setUserAnswer('');
      setCurrentFollowUp(null);
      setSessionCompleted(false);
      setInSession(true);

      // Speak initial question
      speakQuestion(qList[0].question);
    } catch (err) {
      console.error('Failed to load questions:', err);
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setIsEvaluating(true);
    const activeQuestion = questions[currentQuestionIndex];
    const qText = currentFollowUp || activeQuestion.question;

    try {
      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: qText,
          userAnswer,
          idealKeyPoints: activeQuestion.idealKeyPoints,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          questionNumber: currentQuestionIndex + 1
        })
      });

      const data = await res.json();
      const evaluated: EvaluatedTurn = data.evaluation;
      setEvaluationEngine(data.engine || 'Gemini 3.8 AI');

      setEvaluatedTurns(prev => [...prev, evaluated]);

      // If there's an AI follow up question and we haven't asked it yet, present it!
      if (evaluated.followUpQuestion && !currentFollowUp) {
        setCurrentFollowUp(evaluated.followUpQuestion);
        setUserAnswer('');
        speakQuestion(`Follow-up question: ${evaluated.followUpQuestion}`);
      } else {
        // Move to next question or complete
        setCurrentFollowUp(null);
        setUserAnswer('');
        if (currentQuestionIndex + 1 < questions.length && currentQuestionIndex < 2) {
          setCurrentQuestionIndex(prev => prev + 1);
          speakQuestion(questions[currentQuestionIndex + 1].question);
        } else {
          // Finish session
          finishSession([...evaluatedTurns, evaluated], data.engine);
        }
      }
    } catch (err) {
      console.error('Answer evaluation failed:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const finishSession = (turns: EvaluatedTurn[], engine: string) => {
    const totalScore = Math.round(turns.reduce((acc, t) => acc + t.score, 0) / turns.length);
    const completedSession: MockInterviewSession = {
      id: `session-${Date.now()}`,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      companyTarget,
      startedAt: new Date(Date.now() - 15 * 60000).toISOString(),
      completedAt: new Date().toISOString(),
      turns,
      overallScore: totalScore,
      summaryFeedback: totalScore >= 80
        ? 'Excellent command of technical architecture, clarity, and industry terminology.'
        : 'Good effort. Strengthen answers by linking algorithmic theory to real runtime trade-offs.',
      evaluationEngine: engine as any
    };

    addInterviewSession(completedSession);
    setSessionCompleted(true);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Module 3 &middot; Simulated Recruitment Rounds
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            AI Mock Interview & Speech Evaluator
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Real-time answer scoring, dynamic follow-up questions, and speech-to-text response recording.
          </p>
        </div>

        {inSession && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-[#94A3B8]">Engine:</span>
            <span className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
              {evaluationEngine}
            </span>
          </div>
        )}
      </div>

      {!inSession ? (
        /* Configuration Screen */
        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">Configure Your Mock Interview</h2>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
              Select your interview track, target recruiter, and difficulty level to calibrate questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Interview Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as InterviewCategory)}
                className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs font-medium text-slate-800 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Technical">Technical (OS, DBMS, System)</option>
                <option value="Programming">Programming & Data Structures</option>
                <option value="HR">HR & Behavioral (STAR)</option>
                <option value="Company-Specific">Company-Specific Cadre</option>
              </select>
            </div>

            {/* Target Company */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Recruiter Persona</label>
              <select
                value={companyTarget}
                onChange={e => setCompanyTarget(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs font-medium text-slate-800 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="General Tech">General Tech Enterprise</option>
                <option value="TCS">TCS (Digital & Ninja Cadre)</option>
                <option value="AWS">Amazon Web Services (SDE)</option>
                <option value="Infosys">Infosys (Specialist Programmer)</option>
                <option value="Accenture">Accenture Tech Assessment</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Difficulty Level</label>
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value as InterviewDifficulty)}
                className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs font-medium text-slate-800 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Entry">Entry (Campus Fresher)</option>
                <option value="Intermediate">Intermediate (Digital Cadre)</option>
                <option value="Advanced">Advanced (High CTC Roles)</option>
              </select>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-[#334155] flex items-center justify-between">
            <div className="text-xs text-slate-500 dark:text-[#94A3B8] flex items-center gap-2">
              <Mic className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Voice recognition and text input both supported</span>
            </div>

            <button
              onClick={startInterview}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Begin Interview Round</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : sessionCompleted ? (
        /* Completed Scorecard Screen */
        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">Interview Round Completed!</h2>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
              Evaluated via <span className="font-semibold text-blue-600 dark:text-blue-400">{evaluationEngine}</span> &middot; Track: {selectedCategory} ({companyTarget})
            </p>
          </div>

          {/* Average Score Gauge */}
          <div className="p-6 bg-slate-50 dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-[#334155] text-center max-w-md mx-auto">
            <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">
              Final Interview Score
            </div>
            <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
              {Math.round(evaluatedTurns.reduce((acc, t) => acc + t.score, 0) / evaluatedTurns.length)}%
            </div>
            <div className="text-xs text-slate-600 dark:text-[#94A3B8] mt-2 font-medium">
              Contributes 25% directly to your overall Placement Readiness Score.
            </div>
          </div>

          {/* Detailed Question by Question Turn Review */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
              Detailed Question Evaluation & Model Answers
            </h3>

            {evaluatedTurns.map((turn, tIdx) => (
              <div key={tIdx} className="p-5 rounded-xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Question {tIdx + 1}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mt-0.5">{turn.question}</h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">{turn.score}%</span>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">Accuracy Score</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111827] text-xs text-slate-700 dark:text-slate-300 italic border border-slate-100 dark:border-[#334155]">
                  <span className="font-semibold not-italic text-slate-500 dark:text-[#94A3B8] block mb-0.5">Your Response:</span>
                  "{turn.userAnswer}"
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800">
                    <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Strengths Identified
                    </div>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      {turn.strengths.map((s, idx) => (
                        <li key={idx}>&bull; {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800">
                    <div className="font-bold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      Recommendations
                    </div>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      {turn.improvementPoints.map((p, idx) => (
                        <li key={idx}>&bull; {p}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Model Answer */}
                <div className="p-3 rounded-lg bg-blue-50/30 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-xs">
                  <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">Recommended Model Answer:</span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{turn.modelAnswer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => { setInSession(false); setSessionCompleted(false); }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Start Another Round
            </button>
          </div>
        </div>
      ) : (
        /* Active Interview In-Progress Screen */
        <div className="bg-white dark:bg-[#1E293B] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs max-w-3xl mx-auto space-y-6">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8] pb-3 border-b border-slate-100 dark:border-[#334155]">
            <span>Question {currentQuestionIndex + 1} of {Math.min(questions.length, 3)}</span>
            <span>Category: <strong className="text-slate-800 dark:text-slate-200">{selectedCategory}</strong> &middot; {companyTarget}</span>
          </div>

          {/* Current Question Display */}
          <div className="p-5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                {currentFollowUp ? 'AI Follow-Up Question' : 'Interviewer Prompt'}
              </span>
              <button
                onClick={() => speakQuestion(currentFollowUp || questions[currentQuestionIndex].question)}
                className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md transition-colors"
                title="Read question aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] leading-relaxed">
              {currentFollowUp || questions[currentQuestionIndex]?.question}
            </p>
          </div>

          {/* User Answer Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Your Answer (Speak or Type)
              </label>

              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Listening (Click to Stop)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span>Enable Voice Input</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              rows={5}
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="Structure your answer clearly. E.g. Definition, underlying mechanics, real-world examples, and performance trade-offs..."
              className="w-full p-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed font-sans"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
            </span>

            <button
              onClick={submitAnswer}
              disabled={isEvaluating || !userAnswer.trim()}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Evaluating Answer...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit & Score</span>
                </>
              )}
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
