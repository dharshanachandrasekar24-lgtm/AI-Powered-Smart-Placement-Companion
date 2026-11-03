import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Briefcase, 
  PlusCircle, 
  BarChart3, 
  TrendingUp, 
  Award, 
  Calendar, 
  CheckCircle, 
  Search, 
  Filter, 
  Plus, 
  Trash2,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PlacementDrive, JobOpportunity } from '../../types';

interface StudentRosterItem {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  cgpa: number;
  readinessScore: number;
  readinessTier: string;
  atsScore: number;
  interviewsDone: number;
  status: 'Ready' | 'In Training' | 'Placed';
}

const SAMPLE_STUDENTS: StudentRosterItem[] = [
  { id: 'st-1', name: 'Aarav Sharma', rollNo: 'AIT23CS014', department: 'Computer Science', cgpa: 8.65, readinessScore: 84, readinessTier: 'Placement Ready', atsScore: 88, interviewsDone: 3, status: 'Ready' },
  { id: 'st-2', name: 'Pooja Venkatesh', rollNo: 'AIT23CS089', department: 'Information Tech', cgpa: 9.10, readinessScore: 92, readinessTier: 'Placement Ready', atsScore: 94, interviewsDone: 4, status: 'Placed' },
  { id: 'st-3', name: 'Rohan Mehra', rollNo: 'AIT23EC045', department: 'Electronics & Comm', cgpa: 7.40, readinessScore: 68, readinessTier: 'In Preparation', atsScore: 70, interviewsDone: 1, status: 'In Training' },
  { id: 'st-4', name: 'Ananya Iyer', rollNo: 'AIT23CS102', department: 'Computer Science', cgpa: 8.85, readinessScore: 89, readinessTier: 'Placement Ready', atsScore: 86, interviewsDone: 2, status: 'Ready' },
  { id: 'st-5', name: 'Karthik Subramanian', rollNo: 'AIT23CS056', department: 'Data Science', cgpa: 7.90, readinessScore: 74, readinessTier: 'High Potential', atsScore: 78, interviewsDone: 2, status: 'In Training' },
  { id: 'st-6', name: 'Divya Nair', rollNo: 'AIT23EC012', department: 'Electronics & Comm', cgpa: 8.20, readinessScore: 81, readinessTier: 'High Potential', atsScore: 82, interviewsDone: 2, status: 'Ready' },
];

export const CollegeAdminDashboard: React.FC<{ activeSubTab?: string }> = ({ activeSubTab = 'overview' }) => {
  const { currentUser } = useAuth();
  
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [students, setStudents] = useState<StudentRosterItem[]>(SAMPLE_STUDENTS);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(activeSubTab);
  
  // Modals
  const [showAddDriveModal, setShowAddDriveModal] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  // Drive form state
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newPackage, setNewPackage] = useState('8.5 - 12.0 LPA');
  const [newDate, setNewDate] = useState('2026-12-10');
  const [newDeadline, setNewDeadline] = useState('2026-12-01');
  const [newMinCgpa, setNewMinCgpa] = useState('7.0');

  // Search & Filters
  const [searchStudent, setSearchStudent] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');

  useEffect(() => {
    setActiveTab(activeSubTab);
  }, [activeSubTab]);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/drives?collegeId=${currentUser.collegeId || 'col-1'}`);
      if (res.ok) {
        const data = await res.json();
        setDrives(data);
      }
    } catch (err) {
      console.error('Failed to load drives:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;

    try {
      const res = await fetch('/api/drives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: newCompany,
          jobRole: newRole,
          ctcLPA: newPackage,
          driveDate: newDate,
          registrationDeadline: newDeadline,
          collegeId: currentUser.collegeId || 'col-1',
          minCGPA: parseFloat(newMinCgpa) || 6.5,
          eligibleBranches: ['Computer Science', 'Information Technology', 'ECE']
        })
      });

      if (res.ok) {
        const created = await res.json();
        setDrives(prev => [created, ...prev]);
        setShowAddDriveModal(false);
        setNewCompany('');
        setNewRole('');
      }
    } catch (err) {
      console.error('Failed to create drive:', err);
    }
  };

  const filteredStudents = students.filter(st => {
    const matchesSearch = st.name.toLowerCase().includes(searchStudent.toLowerCase()) || st.rollNo.toLowerCase().includes(searchStudent.toLowerCase());
    const matchesDept = filterDept === 'ALL' || st.department === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Institutional Administration &middot; {currentUser.collegeName || 'Apex Institute of Technology'}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Training & Placement Officer (TPO) Console
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
            Officer in Charge: <strong className="text-slate-800 dark:text-slate-200">{currentUser.name}</strong> &middot; Real-time batch readiness surveillance and drive management.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={() => setShowAddDriveModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Campus Drive</span>
          </button>
        </div>
      </div>

      {/* College Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Total Enrolled Batch</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">1,420</div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">2026-27 Final Years</div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Students Placed</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">1,180</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">83.1% Placement Rate</div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Active Campus Drives</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">{drives.length} Drives</div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Upcoming & Scheduled</div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Average CTC Package</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums">7.8 LPA</div>
          <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-1">Peak: 24.0 LPA (AWS)</div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mb-1">Mean Readiness Score</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">81.4%</div>
          <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mt-1">Top Quartile Tier</div>
        </div>
      </div>

      {/* Main Tabs Container */}
      <div className="space-y-6">
        
        {/* Placement Drives Section */}
        <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-[#334155] flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
                Campus Placement Drives & Corporate Recruitment
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">Manage eligibility criteria, schedules, and registered candidates.</p>
            </div>

            <button
              onClick={() => setShowAddDriveModal(true)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Drive</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-[#111827] text-slate-500 dark:text-[#94A3B8] border-b border-slate-200 dark:border-[#334155]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Company & Cadre</th>
                  <th className="py-3 px-4 font-semibold">Package (CTC)</th>
                  <th className="py-3 px-4 font-semibold">Drive Date</th>
                  <th className="py-3 px-4 font-semibold">Min CGPA</th>
                  <th className="py-3 px-4 font-semibold">Eligible Branches</th>
                  <th className="py-3 px-4 font-semibold text-right">Registered</th>
                  <th className="py-3 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#334155]">
                {drives.map(drive => (
                  <tr key={drive.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-[#F8FAFC]">{drive.companyName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{drive.jobRole}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">{drive.ctcLPA}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-[#94A3B8]">{drive.driveDate}</td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-semibold">{drive.minCGPA}</td>
                    <td className="py-3 px-4 text-slate-500 dark:text-[#94A3B8] max-w-xs truncate">
                      {drive.eligibleBranches.join(', ')}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                      {drive.totalRegistered} students
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-semibold text-[10px]">
                        {drive.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Readiness Surveillance Table */}
        <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-[#334155] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wide">
                Student Placement Readiness Surveillance Roster
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
                Surveil real-time student ATS scores, mock interview completion, and intervention requirements.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search student or roll no..."
                  value={searchStudent}
                  onChange={e => setSearchStudent(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs text-slate-800 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Department Filter */}
              <select
                value={filterDept}
                onChange={e => setFilterDept(e.target.value)}
                className="py-1.5 px-2.5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-xs text-slate-800 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="ALL">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Tech">Information Tech</option>
                <option value="Electronics & Comm">Electronics & Comm</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-[#111827] text-slate-500 dark:text-[#94A3B8] border-b border-slate-200 dark:border-[#334155]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Student Name & Roll No</th>
                  <th className="py-3 px-4 font-semibold">Department</th>
                  <th className="py-3 px-4 font-semibold">CGPA</th>
                  <th className="py-3 px-4 font-semibold">ATS Resume</th>
                  <th className="py-3 px-4 font-semibold">Mock Interviews</th>
                  <th className="py-3 px-4 font-semibold">Readiness Score</th>
                  <th className="py-3 px-4 font-semibold text-right">Placement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#334155]">
                {filteredStudents.map(st => (
                  <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-[#F8FAFC]">{st.name}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">{st.rollNo}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-[#94A3B8]">{st.department}</td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">{st.cgpa}</td>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">{st.atsScore}%</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-[#94A3B8]">{st.interviewsDone} completed</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">{st.readinessScore}%</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">({st.readinessTier})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        st.status === 'Placed'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : st.status === 'Ready'
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                          : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      }`}>
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Placement Drive Modal */}
      {showAddDriveModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-[#334155] shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#334155]">
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                Schedule New Campus Placement Drive
              </h3>
              <button
                onClick={() => setShowAddDriveModal(false)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-xs font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateDrive} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Recruiting Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Google Cloud / Oracle"
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Job Designation & Cadre</label>
                <input
                  type="text"
                  placeholder="e.g. Associate Cloud Engineer"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CTC Package (LPA)</label>
                  <input
                    type="text"
                    value={newPackage}
                    onChange={e => setNewPackage(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Minimum CGPA Cutoff</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMinCgpa}
                    onChange={e => setNewMinCgpa(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">On-Campus Drive Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Registration Cutoff Deadline</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={e => setNewDeadline(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-lg text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#334155] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDriveModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Publish Campus Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
