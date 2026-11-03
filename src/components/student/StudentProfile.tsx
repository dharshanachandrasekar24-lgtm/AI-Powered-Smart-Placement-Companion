import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  GraduationCap, 
  Save, 
  CheckCircle,
  Award,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentProfile: React.FC = () => {
  const { currentUser, updateStudentProfile, targetRole, setTargetRole } = useAuth();
  
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '+91 98450 12345');
  const [department, setDepartment] = useState(currentUser.department || 'Computer Science and Engineering');
  const [cgpa, setCgpa] = useState(currentUser.cgpa || 8.65);
  const [batch, setBatch] = useState(currentUser.batch || '2023 - 2027');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name,
      email,
      phone,
      department,
      cgpa: Number(cgpa),
      batch
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Academic Credentials & Preferences
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Student Placement Profile
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Keep your official academic details updated to ensure automated eligibility matching across all campus drives.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-4 h-4" />
            <span>Profile Saved</span>
          </div>
        )}
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1E293B] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs space-y-6">
        
        {/* Avatar + Primary Details */}
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100 dark:border-[#334155]">
          {currentUser.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-600 shadow-xs"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
          )}

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">{currentUser.name}</h3>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8]">{currentUser.collegeName || 'Apex Institute of Technology'}</p>
            <div className="mt-1 inline-flex items-center gap-2 text-[11px] text-blue-700 dark:text-blue-300 font-semibold bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded">
              <span>Verified Campus Scholar</span>
              <span>&middot;</span>
              <span>Class of 2027</span>
            </div>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Legal Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              required
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">College Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              required
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Contact Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Academic Department</label>
            <input
              type="text"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cumulative CGPA (Out of 10.0)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={cgpa}
              onChange={e => setCgpa(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Primary Dream Career Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              placeholder="e.g. Software Development Engineer"
              className="w-full p-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium placeholder-slate-400"
            />
          </div>

        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-[#334155] flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Update Academic Profile</span>
          </button>
        </div>

      </form>

    </div>
  );
};
