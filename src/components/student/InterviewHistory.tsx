import React, { useState } from 'react';
import { 
  History, 
  Award, 
  Calendar, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle,
  Bot,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MockInterviewSession } from '../../types';

export const InterviewHistory: React.FC = () => {
  const { interviewHistory } = useAuth();
  const [selectedSession, setSelectedSession] = useState<MockInterviewSession | null>(
    interviewHistory.length > 0 ? interviewHistory[0] : null
  );

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Module 3 &middot; Performance Archive
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Interview Attempt History & Rubrics
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Review detailed feedback from previous technical and HR mock rounds to track longitudinal progress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-[#94A3B8]">Recorded Sessions:</span>
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
            {interviewHistory.length} Interviews
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sessions List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
            Completed Interview Sessions
          </h3>

          <div className="space-y-2">
            {interviewHistory.map((sess) => {
              const isSelected = selectedSession?.id === sess.id;
              return (
                <div
                  key={sess.id}
                  onClick={() => setSelectedSession(sess)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all text-left ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-[#1E293B] border-slate-200 dark:border-[#334155] hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">{sess.category} Interview</div>
                      <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5">
                        Target: <strong className="text-slate-700 dark:text-slate-300">{sess.companyTarget || 'General'}</strong> &middot; {sess.difficulty}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">{sess.overallScore}%</span>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">Score</div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-[#334155] flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span>{new Date(sess.startedAt).toLocaleDateString()}</span>
                    <span>Engine: {sess.evaluationEngine}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Session Deep Dive */}
        <div className="lg:col-span-7">
          {selectedSession ? (
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-[#334155]">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC]">
                    {selectedSession.category} Round Summary
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
                    Difficulty: {selectedSession.difficulty} &middot; Target: {selectedSession.companyTarget || 'General Tech'}
                  </div>
                </div>

                <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-bold">
                  {selectedSession.overallScore}% Overall Score
                </div>
              </div>

              {/* AI Feedback Summary */}
              <div className="p-4 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-xs">
                <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">Interviewer Feedback Summary:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedSession.summaryFeedback}</p>
              </div>

              {/* Turns Breakdown */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
                  Evaluated Questions ({selectedSession.turns.length})
                </h4>

                {selectedSession.turns.map((turn, tIdx) => (
                  <div key={tIdx} className="p-4 rounded-lg border border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#111827] text-xs space-y-2">
                    <div className="flex items-start justify-between gap-4 font-bold text-slate-900 dark:text-[#F8FAFC]">
                      <span>Q{tIdx + 1}: {turn.question}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-extrabold tabular-nums shrink-0">{turn.score}%</span>
                    </div>

                    <div className="p-2.5 rounded bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-[#334155] italic text-slate-700 dark:text-slate-300">
                      "{turn.userAnswer}"
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div className="text-emerald-700 dark:text-emerald-400">
                        <strong>Strengths: </strong>
                        {turn.strengths.join(', ')}
                      </div>
                      <div className="text-amber-700 dark:text-amber-400">
                        <strong>Improvements: </strong>
                        {turn.improvementPoints.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] text-center text-xs text-slate-500 dark:text-[#94A3B8]">
              Select an interview session from the left to view the scorecard and turn evaluations.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
