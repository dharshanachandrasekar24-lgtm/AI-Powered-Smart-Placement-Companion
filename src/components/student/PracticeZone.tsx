import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  ChevronRight,
  Flame,
  Filter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PracticeCategory, PracticeQuestion, PracticeAttempt } from '../../types';

export const PracticeZone: React.FC = () => {
  const { practiceAttempts, addPracticeAttempt } = useAuth();
  
  // Category & Filter
  const [activeCategory, setActiveCategory] = useState<PracticeCategory>('Aptitude');
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  // Active Quiz State
  const [inQuiz, setInQuiz] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIndex: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetchCategoryQuestions(activeCategory);
  }, [activeCategory]);

  // Countdown timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      finishAssessment();
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const fetchCategoryQuestions = async (category: PracticeCategory) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/practice/questions?category=${encodeURIComponent(category)}`);
      const data: PracticeQuestion[] = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const startAssessment = () => {
    setInQuiz(true);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setTimerSeconds(questions.length * 90); // 1.5 minutes per question
    setTimerActive(true);
    setQuizFinished(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIndex]: optionIndex
    }));
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      finishAssessment();
    }
  };

  const finishAssessment = () => {
    setTimerActive(false);
    setQuizFinished(true);

    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);

    const attempt: PracticeAttempt = {
      id: `attempt-${Date.now()}`,
      category: activeCategory,
      topic: questions[0]?.topic || activeCategory,
      score: scorePct,
      totalQuestions: questions.length,
      date: 'Just now',
      durationMinutes: Math.max(1, Math.round((questions.length * 90 - timerSeconds) / 60))
    };

    addPracticeAttempt(attempt);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentQ = questions[currentQIndex];

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Module 4 &middot; Algorithmic & Quantitative Arena
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Placement Practice Zone
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Master campus recruitment tests in Aptitude, Logical Reasoning, and Core Programming.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>4 Day Prep Streak</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
            <span>{practiceAttempts.length} Tests Completed</span>
          </div>
        </div>
      </div>

      {!inQuiz ? (
        /* Category Selector and Launch Portal */
        <div className="space-y-6">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#334155] pb-3">
            {(['Aptitude', 'Logical Reasoning', 'Programming'] as PracticeCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#334155]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Subtopics Grid & Start Button */}
          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC]">{activeCategory} Assessment Pack</h3>
                <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
                  Timed multiple-choice challenges calibrated for campus placement recruitment drives.
                </p>
              </div>

              <button
                onClick={startAssessment}
                disabled={loading || questions.length === 0}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 whitespace-nowrap self-start sm:self-center"
              >
                <Clock className="w-4 h-4" />
                <span>Start Timed Assessment ({questions.length} Questions)</span>
              </button>
            </div>

            {/* Questions Preview List */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
                Covered Assessment Topics:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {questions.map((q) => (
                  <div key={q.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#111827] text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-500 dark:text-[#94A3B8] text-[11px]">
                      <span>Topic: <strong className="text-slate-800 dark:text-slate-200">{q.topic}</strong></span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                        {q.difficulty}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{q.question}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Practice History Table */}
          <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-[#334155] flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
                Recent Practice Assessment Attempts
              </h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">Recorded for Readiness Metric</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-[#111827] text-slate-500 dark:text-[#94A3B8] border-b border-slate-200 dark:border-[#334155]">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Category</th>
                    <th className="py-2.5 px-4 font-semibold">Topic Tested</th>
                    <th className="py-2.5 px-4 font-semibold">Date</th>
                    <th className="py-2.5 px-4 font-semibold">Duration</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#334155]">
                  {practiceAttempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-2.5 px-4 font-semibold text-slate-800 dark:text-slate-200">{attempt.category}</td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-[#94A3B8]">{attempt.topic}</td>
                      <td className="py-2.5 px-4 text-slate-500 dark:text-[#94A3B8]">{attempt.date}</td>
                      <td className="py-2.5 px-4 text-slate-500 dark:text-[#94A3B8]">{attempt.durationMinutes} mins</td>
                      <td className="py-2.5 px-4 text-right">
                        <span className={`font-bold tabular-nums ${
                          attempt.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : attempt.score >= 60 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'
                        }`}>
                          {attempt.score}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : quizFinished ? (
        /* Quiz Summary Screen */
        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs max-w-2xl mx-auto text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">Assessment Completed!</h2>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
              Your results have been updated in your placement readiness calculation.
            </p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-[#334155] max-w-sm mx-auto">
            <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mb-1">
              Your Accuracy Score
            </div>
            <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
              {Math.round(
                (questions.filter((q, idx) => selectedAnswers[idx] === q.correctOptionIndex).length / questions.length) * 100
              )}%
            </div>
            <div className="text-xs text-slate-600 dark:text-[#94A3B8] mt-1">
              {questions.filter((q, idx) => selectedAnswers[idx] === q.correctOptionIndex).length} of {questions.length} questions correct
            </div>
          </div>

          <button
            onClick={() => setInQuiz(false)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            Return to Practice Zone
          </button>
        </div>
      ) : (
        /* Active Timed Quiz Session */
        <div className="bg-white dark:bg-[#1E293B] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs max-w-3xl mx-auto space-y-6">
          
          {/* Top Bar: Timer and Progress */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#334155] text-xs">
            <span className="text-slate-500 dark:text-[#94A3B8]">
              Question <strong className="text-slate-900 dark:text-[#F8FAFC]">{currentQIndex + 1}</strong> of {questions.length}
            </span>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-lg font-mono font-bold border border-amber-200 dark:border-amber-800">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{formatTime(timerSeconds)}</span>
            </div>
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {currentQ.topic} &middot; {currentQ.difficulty} Difficulty
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Code Snippet if present */}
            {currentQ.codeSnippet && (
              <pre className="p-3.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            )}

            {/* Multiple Choice Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQIndex] === oIdx;
                const isCorrect = oIdx === currentQ.correctOptionIndex;

                let btnStyle = 'bg-slate-50 dark:bg-[#111827] border-slate-200 dark:border-[#334155] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';
                if (showExplanation) {
                  if (isCorrect) btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-semibold';
                  else if (isSelected) btnStyle = 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700 text-red-900 dark:text-red-200';
                } else if (isSelected) {
                  btnStyle = 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600 text-blue-900 dark:text-blue-200 font-semibold';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full p-3 rounded-lg border text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showExplanation && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    {showExplanation && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Callout */}
          {showExplanation && (
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs space-y-1">
              <span className="font-bold text-blue-900 dark:text-blue-300 block flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Step-by-Step Mathematical & Algorithmic Explanation:
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-[#334155] flex items-center justify-between">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              disabled={selectedAnswers[currentQIndex] === undefined}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-40"
            >
              {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
            </button>

            <button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQIndex] === undefined}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>{currentQIndex + 1 === questions.length ? 'Finish Assessment' : 'Next Question'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
