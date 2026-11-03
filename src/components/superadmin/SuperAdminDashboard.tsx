import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Users, 
  Globe, 
  BarChart3, 
  Plus, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  MapPin, 
  Search,
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { College } from '../../types';

export const SuperAdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddCollegeModal, setShowAddCollegeModal] = useState(false);

  // New college form
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [location, setLocation] = useState('Chennai, Tamil Nadu');
  const [university, setUniversity] = useState('Anna University');
  const [tpoName, setTpoName] = useState('Prof. Anand Raj');
  const [tpoEmail, setTpoEmail] = useState('tpo@chennaitech.edu.in');
  const [studentsCount, setStudentsCount] = useState(1250);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/colleges');
      if (res.ok) {
        const data = await res.json();
        setColleges(data);
      }
    } catch (err) {
      console.error('Failed to load colleges:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    try {
      const res = await fetch('/api/colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          code: code || `COL-0${colleges.length + 1}`,
          location,
          affiliatedUniversity: university,
          adminName: tpoName,
          adminEmail: tpoEmail,
          totalStudents: Number(studentsCount) || 1200,
          averagePackageLPA: 7.2
        })
      });

      if (res.ok) {
        const created = await res.json();
        setColleges(prev => [...prev, created]);
        setShowAddCollegeModal(false);
        setName('');
        setCode('');
      }
    } catch (err) {
      console.error('Failed to add college:', err);
    }
  };

  const totalStudents = colleges.reduce((sum, c) => sum + c.totalStudents, 0);
  const totalPlaced = colleges.reduce((sum, c) => sum + c.placedStudents, 0);
  const totalDrives = colleges.reduce((sum, c) => sum + c.activeDrives, 0);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
            Global Governance &middot; Central Platform Command
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Super Administrator Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Cross-campus analytics, affiliated university governance, and nationwide placement metrics.
          </p>
        </div>

        <button
          onClick={() => setShowAddCollegeModal(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-center"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Affiliate New Institution</span>
        </button>
      </div>

      {/* Global KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Affiliated Colleges</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">{colleges.length} Institutes</div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Multi-state autonomous network</div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Registered Students</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">{totalStudents.toLocaleString()}</div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-1">Actively tracking readiness</div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Successful Placements</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{totalPlaced.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            {totalStudents > 0 ? Math.round((totalPlaced / totalStudents) * 100) : 83}% Network Placement Rate
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Total On-Campus Drives</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 tabular-nums">{totalDrives} Drives</div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Across 18 tier-1 recruiters</div>
        </div>
      </div>

      {/* Affiliated Colleges Directory Table */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-[#334155] flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
              Affiliated Engineering & Science Institutions
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
              Review institution codes, appointed placement officers, and real-time accreditation metrics.
            </p>
          </div>

          <button
            onClick={() => setShowAddCollegeModal(true)}
            className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add College</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-[#111827] text-slate-500 dark:text-[#94A3B8] border-b border-slate-200 dark:border-[#334155]">
              <tr>
                <th className="py-3 px-4 font-semibold">Institution Name & Code</th>
                <th className="py-3 px-4 font-semibold">Location & Affiliation</th>
                <th className="py-3 px-4 font-semibold">Placement Officer (TPO)</th>
                <th className="py-3 px-4 font-semibold">Batch Strength</th>
                <th className="py-3 px-4 font-semibold">Placement Rate</th>
                <th className="py-3 px-4 font-semibold text-right">Avg Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#334155]">
              {colleges.map(col => (
                <tr key={col.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-[#F8FAFC]">{col.name}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{col.code}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-800 dark:text-slate-200 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      {col.location}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{col.affiliatedUniversity}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{col.adminName}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500">{col.adminEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                    {col.totalStudents.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{col.placementRate}%</span>
                      <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${col.placementRate}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">
                    {col.averagePackageLPA} LPA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add College Modal */}
      {showAddCollegeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#334155]">
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                Affiliate New College to Network
              </h3>
              <button
                onClick={() => setShowAddCollegeModal(false)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-xs font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddCollege} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Institution Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Chennai Institute of Technology"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Institutional Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CIT-09"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Affiliated State University</label>
                <input
                  type="text"
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Placement Officer (TPO) Name</label>
                  <input
                    type="text"
                    value={tpoName}
                    onChange={e => setTpoName(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">TPO Official Email</label>
                  <input
                    type="email"
                    value={tpoEmail}
                    onChange={e => setTpoEmail(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Total Eligible Final-Year Batch</label>
                <input
                  type="number"
                  value={studentsCount}
                  onChange={e => setStudentsCount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#334155] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCollegeModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Affiliate Institution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
