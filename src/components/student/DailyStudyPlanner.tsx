import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Sparkles, 
  Target, 
  TrendingUp,
  Trash2,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DailyStudyTask } from '../../types';

export const DailyStudyPlanner: React.FC = () => {
  const { dailyTasks, toggleDailyTask, addDailyTask } = useAuth();
  
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<DailyStudyTask['category']>('Coding');
  const [newMinutes, setNewMinutes] = useState(30);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addDailyTask({
      title: newTitle.trim(),
      category: newCategory,
      estimatedMinutes: Number(newMinutes) || 30,
      dueDate: 'Today'
    });

    setNewTitle('');
    setIsAdding(false);
  };

  const completedCount = dailyTasks.filter(t => t.completed).length;
  const totalMinutes = dailyTasks.reduce((sum, t) => sum + (t.completed ? t.estimatedMinutes : 0), 0);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Advanced Feature &middot; AI Study Orchestration
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Daily AI Study Planner & Habit Engine
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Personalized preparation schedules dynamically calibrated to your weakest interview & coding topics.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Preparation Task</span>
        </button>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Daily Task Completion</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">
            {completedCount} / {dailyTasks.length} Done
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
            <div
              className="bg-blue-600 h-full rounded-full transition-all"
              style={{ width: `${dailyTasks.length > 0 ? (completedCount / dailyTasks.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Productive Prep Time Today</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">
            {totalMinutes} Minutes
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            On track to meet campus recruitment targets
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">AI Recommendation Focus</div>
          <div className="text-base font-bold text-slate-900 dark:text-[#F8FAFC]">
            System Design & Docker
          </div>
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Identified gap from your recent ATS resume parse
          </div>
        </div>
      </div>

      {/* Add Task Modal / Form */}
      {isAdding && (
        <form onSubmit={handleCreateTask} className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
            Create Custom Placement Task
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Task Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Solve LeetCode #146 LRU Cache in Java"
                className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-3">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as any)}
                className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Coding">Coding</option>
                <option value="Aptitude">Aptitude</option>
                <option value="System Design">System Design</option>
                <option value="HR Prep">HR Prep</option>
                <option value="Resume Fix">Resume Fix</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Est. Duration (Mins)</label>
              <input
                type="number"
                value={newMinutes}
                onChange={e => setNewMinutes(Number(e.target.value))}
                min="5"
                max="180"
                className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-1.5 text-xs text-slate-600 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              Save Task
            </button>
          </div>
        </form>
      )}

      {/* Task List */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs p-6 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#334155]">
          <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
            Today's Scheduled Roadmap Tasks
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500">Click row to toggle completion</span>
        </div>

        <div className="space-y-2">
          {dailyTasks.map(task => (
            <div
              key={task.id}
              onClick={() => toggleDailyTask(task.id)}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                task.completed
                  ? 'bg-slate-50 dark:bg-[#111827]/60 border-slate-200 dark:border-[#334155] opacity-60'
                  : 'bg-white dark:bg-[#1E293B] border-slate-200 dark:border-[#334155] hover:border-blue-300 dark:hover:border-blue-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  task.completed ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {task.completed && <Check className="w-3.5 h-3.5" />}
                </div>

                <div>
                  <div className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-[#F8FAFC]'}`}>
                    {task.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5 flex items-center gap-2">
                    <span className="px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300 font-medium">{task.category}</span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.estimatedMinutes} minutes
                    </span>
                    <span>&middot;</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                {task.completed ? 'Completed' : 'Pending'}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
