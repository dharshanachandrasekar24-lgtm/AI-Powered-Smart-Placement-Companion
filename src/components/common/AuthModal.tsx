import React, { useState } from 'react';
import { X, GraduationCap, Building2, ShieldCheck, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'aarav.sharma@ait.edu.in', role, name || (role === 'STUDENT' ? 'Aarav Sharma' : role === 'COLLEGE_ADMIN' ? 'Prof. Ramesh Kulkarni' : 'Dr. Vikram Malhotra'));
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-[#334155] shadow-2xl max-w-md w-full p-6 text-left space-y-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#334155]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 dark:text-[#F8FAFC] text-sm">
              SmartPlacement<span className="text-blue-600 dark:text-blue-400">.AI</span> Authentication
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-bold">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
            {isRegister ? 'Student & Institution Registration' : 'Sign in to Placement Portal'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
            Select your academic role to proceed with verified access credentials.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-[#111827] rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`py-1.5 rounded-md transition-colors ${role === 'STUDENT' ? 'bg-white dark:bg-[#1E293B] text-blue-700 dark:text-blue-300 shadow-xs' : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'}`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('COLLEGE_ADMIN')}
            className={`py-1.5 rounded-md transition-colors ${role === 'COLLEGE_ADMIN' ? 'bg-white dark:bg-[#1E293B] text-blue-700 dark:text-blue-300 shadow-xs' : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'}`}
          >
            College TPO
          </button>
          <button
            type="button"
            onClick={() => setRole('SUPER_ADMIN')}
            className={`py-1.5 rounded-md transition-colors ${role === 'SUPER_ADMIN' ? 'bg-white dark:bg-[#1E293B] text-blue-700 dark:text-blue-300 shadow-xs' : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'}`}
          >
            Super Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Legal Name</label>
              <div className="relative">
                <UserIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Official Institutional Email</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="email"
                placeholder={role === 'STUDENT' ? 'aarav.sharma@ait.edu.in' : role === 'COLLEGE_ADMIN' ? 'tpo.apex@ait.edu.in' : 'superadmin@smartplacement.ai'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs transition-colors"
          >
            {isRegister ? 'Register & Enter Platform' : 'Sign In Now'}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 dark:text-[#94A3B8]">
          {isRegister ? (
            <span>
              Already registered?{' '}
              <button onClick={() => setIsRegister(false)} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Sign in
              </button>
            </span>
          ) : (
            <span>
              New candidate or campus?{' '}
              <button onClick={() => setIsRegister(true)} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Create Account
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
