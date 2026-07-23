import React, { useState, useEffect } from 'react';
import { 
  Award, Shield, Calendar, BookOpen, Clock, 
  User as UserIcon, RefreshCw, Copy, Printer, Landmark, Trash2, Plus, ChevronRight,
  Settings, DollarSign, CheckCircle2, AlertCircle, Eye, CreditCard, Send, Edit
} from 'lucide-react';
import { User, Assignment, Course } from '../types/academic';
import { DEPARTMENTS } from '../data/mockData';

interface DashboardProps {
  user: User;
  assignments: Assignment[];
  courses: Course[];
  isBangla: boolean;
  setActiveTab: (tab: string) => void;
  activeSubTab: 'overview' | 'attendance' | 'grades' | 'finance' | 'timetable' | 'profile';
  setActiveSubTab: (subTab: 'overview' | 'attendance' | 'grades' | 'finance' | 'timetable' | 'profile') => void;
}

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  dateApplied: string;
}

interface BillItem {
  id: string;
  descEn: string;
  descBn: string;
  amount: number;
  status: 'PAID' | 'UNPAID';
  dateDue: string;
  txId?: string;
  method?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  assignments,
  courses,
  isBangla,
  setActiveTab,
  activeSubTab,
  setActiveSubTab
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // ID Card Flip simulation

  // Attendance states
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('gsc_leave_requests');
    return saved ? JSON.parse(saved) : [
      { id: 'l1', startDate: '2026-06-10', endDate: '2026-06-11', reason: 'Fever / Medical Checkup', status: 'APPROVED', dateApplied: '2026-06-09' }
    ];
  });
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');
  const [leaveReason, setLeaveReason] = useState('Medical');
  const [leaveDetails, setLeaveDetails] = useState('');

  // Finance states
  const [bills, setBills] = useState<BillItem[]>(() => {
    const saved = localStorage.getItem('gsc_student_bills');
    return saved ? JSON.parse(saved) : [
      { id: 'b1', descEn: 'Class XI Admission Fees', descBn: 'একাদশ শ্রেণি ভর্তি ফি', amount: 12000, status: 'PAID', dateDue: '2025-07-10', txId: 'TXN-BKASH-902183', method: 'bKash' },
      { id: 'b2', descEn: 'Class XI Annual Exam Fees', descBn: 'একাদশ শ্রেণি বার্ষিক পরীক্ষার ফি', amount: 2500, status: 'UNPAID', dateDue: '2026-06-20' },
      { id: 'b3', descEn: 'Laboratory Development Charge', descBn: 'বিজ্ঞানাগার / ল্যাব উন্নয়ন চার্জ', amount: 1500, status: 'UNPAID', dateDue: '2026-06-22' }
    ];
  });
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [paymentStep, setPaymentStep] = useState<1 | 2 | 3>(1);
  const [payMobile, setPayMobile] = useState('');
  const [payOtp, setPayOtp] = useState('');
  const [payPin, setPayPin] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  // Profile Form states
  const [profilePhone, setProfilePhone] = useState(localStorage.getItem('gsc_prof_phone') || '+880-1712-345678');
  const [profileAddress, setProfileAddress] = useState(localStorage.getItem('gsc_prof_addr') || 'Tejgaon, Dhaka-1215');
  const [profileGuardian, setProfileGuardian] = useState(localStorage.getItem('gsc_prof_guard') || 'Abdur Rahman (Father)');
  const [profileBlood, setProfileBlood] = useState(localStorage.getItem('gsc_prof_blood') || 'A+');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save states to local storage
  useEffect(() => {
    localStorage.setItem('gsc_leave_requests', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem('gsc_student_bills', JSON.stringify(bills));
  }, [bills]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Leave Form submission
  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveStart || !leaveEnd || !leaveDetails) return;

    const newReq: LeaveRequest = {
      id: `l-req-${Date.now()}`,
      startDate: leaveStart,
      endDate: leaveEnd,
      reason: `${leaveReason}: ${leaveDetails}`,
      status: 'PENDING',
      dateApplied: new Date().toISOString().split('T')[0]
    };

    setLeaveRequests(prev => [newReq, ...prev]);
    setLeaveStart('');
    setLeaveEnd('');
    setLeaveDetails('');
    triggerToast(isBangla ? 'ছুটির আবেদন জমা হয়েছে! অনুমোদনের জন্য অপেক্ষা করুন।' : 'Leave application posted. Auto-approval in progress.');

    // Auto-approve simulation after 5 seconds
    setTimeout(() => {
      setLeaveRequests(current => 
        current.map(req => 
          req.id === newReq.id ? { ...req, status: 'APPROVED' } : req
        )
      );
      triggerToast(isBangla ? 'আপনার ছুটির আবেদনটি অনুমোদিত হয়েছে!' : 'Your leave request has been approved by the HOD!');
    }, 5000);
  };

  // Simulated Payment submit
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentStep === 1) {
      if (!payMobile && paymentMethod !== 'card') return;
      setPaymentStep(2);
    } else if (paymentStep === 2) {
      setPaymentStep(3);
    } else if (paymentStep === 3) {
      setProcessingPayment(true);
      setTimeout(() => {
        setBills(prev => prev.map(bill => {
          if (bill.id === selectedBillId) {
            const txVal = Math.floor(100000 + Math.random() * 900000);
            return {
              ...bill,
              status: 'PAID',
              txId: `TXN-${paymentMethod.toUpperCase()}-${txVal}`,
              method: paymentMethod === 'bkash' ? 'bKash' : paymentMethod === 'nagad' ? 'Nagad' : 'Card'
            };
          }
          return bill;
        }));
        setProcessingPayment(false);
        setPayModalOpen(false);
        setPayMobile('');
        setPayOtp('');
        setPayPin('');
        setPaymentStep(1);
        triggerToast(isBangla ? 'বিল পরিশোধ সফল হয়েছে! ডিজিটাল ভাউচার তৈরি করা হয়েছে।' : 'Payment successful! Digital voucher added to invoice history.');
      }, 1500);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('gsc_prof_phone', profilePhone);
    localStorage.setItem('gsc_prof_addr', profileAddress);
    localStorage.setItem('gsc_prof_guard', profileGuardian);
    localStorage.setItem('gsc_prof_blood', profileBlood);
    triggerToast(isBangla ? 'প্রোফাইল তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।' : 'Student settings updated in college registers.');
  };

  const pendingAssignments = assignments.filter(a => !a.completed);

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(user.studentId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getDepartmentCode = () => {
    const matched = DEPARTMENTS.find(d => d.name === user.department);
    return matched ? matched.code : 'PHY';
  };

  const selectedBill = bills.find(b => b.id === selectedBillId);

  return (
    <div id="student-dashboard" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans relative">
      
      {/* Dynamic Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-750 text-white px-5 py-3.5 rounded shadow-xl font-mono text-xs flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Greeting Banner - Ivy Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded p-6 sm:p-8 relative overflow-hidden shadow-md text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-crimson/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-crimson flex items-center justify-center text-white rounded shadow-sm shrink-0">
            <UserIcon className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[9px] bg-crimson/10 text-crimson font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded">
              {isBangla ? 'স্টুডেন্ট আইডি ভেরিফায়েড' : 'AUTHORIZED SECURE SESSION'}
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900 mt-1">
              {isBangla ? `স্বাগতম, ${user.name}` : `Welcome back, ${user.name}`}
            </h1>
            <p className="text-xs text-slate-500">
              {isBangla 
                ? `${user.department} • ব্যাচ: ${user.batch} • ১ম বর্ষ` 
                : `${user.department} • Stream Ref: ${getDepartmentCode()} • ${user.batch}`}
            </p>
          </div>
        </div>

        {/* Dashboard Quick stats strip on RHS */}
        <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 md:border-t-0 md:pt-0">
          <div className="bg-slate-50 px-4 py-2.5 rounded border border-slate-200 text-center min-w-[100px] shadow-sm">
            <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">{isBangla ? 'বর্তমান সিজিপিএ' : 'CUMULATIVE CGPA'}</p>
            <p className="text-sm font-bold text-slate-850 font-mono mt-0.5">{user.cgpa} / 4.00</p>
          </div>
          <div className="bg-slate-50 px-4 py-2.5 rounded border border-slate-200 text-center min-w-[100px] shadow-sm">
            <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">{isBangla ? 'পেন্ডিং অ্যাসাইনমেন্ট' : 'PENDING Tasks'}</p>
            <p className="text-sm font-bold text-crimson font-mono mt-0.5">{pendingAssignments.length}</p>
          </div>
          <div className="bg-slate-50 px-4 py-2.5 rounded border border-slate-200 text-center min-w-[100px] shadow-sm">
            <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">{isBangla ? 'অর্জিত ক্রেডিট সম্পন্ন' : 'CREDIT PROGRESS'}</p>
            <p className="text-sm font-bold text-emerald-600 font-mono mt-0.5">{user.completedCredits} / {user.totalCredits}</p>
          </div>
        </div>
      </div>

      {/* 2. Sub-tab Navigation Ribbon */}
      <div className="flex flex-wrap border-b border-slate-200 gap-1 sm:gap-2">
        {[
          { id: 'overview', labelEn: 'Overview', labelBn: 'ড্যাশবোর্ড ওভারভিউ' },
          { id: 'attendance', labelEn: 'Attendance & Leave', labelBn: 'উপস্থিতি ও ছুটি' },
          { id: 'grades', labelEn: 'My Grades', labelBn: 'আমার গ্রেড' },
          { id: 'finance', labelEn: 'Fees & Invoices', labelBn: 'ফি ও পেমেন্ট' },
          { id: 'timetable', labelEn: 'Class Schedule', labelBn: 'ক্লাস রুটিন' },
          { id: 'profile', labelEn: 'Profile Settings', labelBn: 'প্রোফাইল সেটিংস' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeSubTab === tab.id
                ? 'border-crimson text-crimson bg-slate-50'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {isBangla ? tab.labelBn : tab.labelEn}
          </button>
        ))}
      </div>

      {/* 3. Sub-tab Panel Content */}
      <div className="animate-fade-in text-left">
        
        {/* OVERVIEW SUB-TAB */}
        {activeSubTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LHS */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
                    <span>🎫 Student ID Card</span>
                  </h3>
                  <button 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="text-[10px] font-mono font-bold text-crimson hover:text-crimson-dark flex items-center space-x-0.5 hover:underline cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{isFlipped ? 'Show Front' : 'Flip Card'}</span>
                  </button>
                </div>

                <div 
                  id="student-id-card-element"
                  className="relative w-full h-[225px] rounded border border-slate-350 bg-white shadow-lg overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:border-crimson/50"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-crimson"></div>
                  {!isFlipped ? (
                    <div className="w-full h-full pl-7 pr-5 py-5 flex flex-col justify-between relative">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center p-0.5 border border-slate-200 overflow-hidden shrink-0">
                            <img src="/images/gsc-logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
                          </div>
                          <div>
                            <h4 className="text-[9px] font-serif font-black text-slate-900 tracking-wider">GOVT. SCIENCE COLLEGE</h4>
                            <p className="text-[7px] text-slate-400 tracking-wider font-mono">Tejgaon, Dhaka-1215</p>
                          </div>
                        </div>
                        <span className="text-[8px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                          ACTIVE SECURE
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 my-2.5">
                        <div className="w-16 h-16 rounded border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
                          <UserIcon className="w-7 h-7 text-slate-400" />
                        </div>
                        <div className="space-y-1 overflow-hidden">
                          <h3 className="text-xs sm:text-sm font-serif font-black text-slate-900 truncate">{user.name}</h3>
                          <p className="text-[9px] font-mono text-crimson tracking-wider truncate uppercase font-bold">{getDepartmentCode()} DEPARTMENT</p>
                          <p className="text-[9px] text-slate-550 text-slate-500 font-mono">Roll / ID: <span className="text-slate-800 font-semibold">{user.studentId}</span></p>
                          <p className="text-[8px] text-slate-400 font-mono">Batch: {user.batch} • Sem: {user.semester}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[8px] text-slate-400 font-mono uppercase tracking-widest">
                        <span className="flex items-center space-x-1 font-bold text-crimson">
                          <Shield className="w-2.5 h-2.5" />
                          <span>Govt APPROVED</span>
                        </span>
                        <span>Ref: {user.id.slice(0, 8)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full pl-7 pr-5 py-5 flex flex-col justify-between bg-slate-50 relative text-center">
                      <div className="space-y-2 text-[9px] text-slate-500 leading-normal pt-2 font-mono text-left">
                        <p className="font-bold text-slate-800">INSTRUCTIONS & REGS</p>
                        <p>This digital authorization card is strictly non-transferable. Present at GSC laboratories complexes in Tejgaon.</p>
                      </div>
                      <div className="space-y-1 py-1.5 bg-white rounded border border-slate-200 mx-auto w-full">
                        <div className="h-6 flex items-center justify-center space-x-0.5 overflow-hidden px-6">
                          {[...Array(28)].map((_, idx) => (
                            <div key={idx} className="bg-slate-800 h-full shrink-0" style={{ width: `${(idx % 4 === 0 ? 3 : (idx % 2 === 0 ? 1 : 2))}px` }} />
                          ))}
                        </div>
                        <p className="text-[8px] tracking-widest font-mono text-slate-450 text-slate-400">*{user.studentId}*</p>
                      </div>
                      <p className="text-[7.5px] text-slate-400 font-mono uppercase tracking-widest">GSC Student Gateway Token</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={copyIdToClipboard}
                    className="flex-1 bg-white hover:bg-slate-50 border border-slate-250 p-2.5 text-[10px] uppercase tracking-widest rounded text-slate-700 font-mono font-bold text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                  >
                    <Copy className="w-3 h-3 text-crimson" />
                    <span>{copiedId ? '✓ Copied ID' : 'Copy Roll ID'}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-white hover:bg-slate-50 p-2.5 px-3 rounded border border-slate-250 text-slate-500 hover:text-crimson cursor-pointer shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* RHS */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Quick statistics layout shortcut */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div onClick={() => setActiveSubTab('attendance')} className="bg-white border border-slate-200 hover:border-crimson/30 hover:shadow-md shadow-sm p-5 rounded cursor-pointer group transition-all flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="p-2.5 rounded bg-crimson text-white w-10 h-10 flex items-center justify-center shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-serif font-black text-slate-900 group-hover:text-crimson uppercase tracking-wider">{isBangla ? 'উপস্থিতি ক্যাটালগ' : 'My Attendance'}</h3>
                    <p className="text-[11px] text-slate-500 leading-normal">Monitor daily subject-wise classroom attendance and leaves logs.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all" />
                </div>

                <div onClick={() => setActiveSubTab('grades')} className="bg-white border border-slate-200 hover:border-crimson/30 hover:shadow-md shadow-sm p-5 rounded cursor-pointer group transition-all flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="p-2.5 rounded bg-crimson text-white w-10 h-10 flex items-center justify-center shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-serif font-black text-slate-900 group-hover:text-crimson uppercase tracking-wider">{isBangla ? 'আমার জিপিএ গ্রেড' : 'Grade Ledger'}</h3>
                    <p className="text-[11px] text-slate-500 leading-normal">Track quizzes, midterms, and lab assessment reports.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all" />
                </div>

                <div onClick={() => setActiveSubTab('finance')} className="bg-white border border-slate-200 hover:border-crimson/30 hover:shadow-md shadow-sm p-5 rounded cursor-pointer group transition-all flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="p-2.5 rounded bg-crimson text-white w-10 h-10 flex items-center justify-center shadow-sm">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-serif font-black text-slate-900 group-hover:text-crimson uppercase tracking-wider">{isBangla ? 'পেমেন্ট ও রসিদ' : 'Fees & Billing'}</h3>
                    <p className="text-[11px] text-slate-500 leading-normal">Review semester dues and complete online payments.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Pending Assignments */}
              <div className="bg-white border border-slate-200 rounded p-6 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-serif font-black text-slate-950 uppercase tracking-widest">{isBangla ? 'পেন্ডিং অ্যাসাইনমেন্ট' : 'Pending Assignments'}</h3>
                  <button onClick={() => setActiveTab('calendar')} className="text-xs text-crimson font-mono font-bold hover:underline cursor-pointer">
                    {isBangla ? 'ক্যালেন্ডার ভিউ' : 'Open Schedule'}
                  </button>
                </div>

                {pendingAssignments.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs font-mono">No pending tasks.</div>
                ) : (
                  <div className="space-y-3">
                    {pendingAssignments.slice(0, 3).map(asn => (
                      <div key={asn.id} className="bg-slate-50 border border-slate-150 p-4 rounded flex items-center justify-between gap-4">
                        <div className="text-left space-y-1">
                          <span className="text-[8px] font-mono font-bold bg-white text-crimson border border-slate-200 px-2 py-0.5 rounded uppercase">{asn.courseCode}</span>
                          <h4 className="text-xs font-bold text-slate-800">{asn.title}</h4>
                        </div>
                        <span className="text-xs font-bold font-mono text-crimson">{new Date(asn.dueDate).toLocaleDateString(isBangla ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ATTENDANCE & LEAVE SUB-TAB */}
        {activeSubTab === 'attendance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Radial Gauges */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6">
              <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-crimson" />
                <span>{isBangla ? 'ক্লাস উপস্থিতি বিশ্লেষণ' : 'Subject-Wise Class Attendance'}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { subject: 'Physics', pct: 92, color: 'stroke-emerald-500' },
                  { subject: 'Chemistry', pct: 88, color: 'stroke-teal-500' },
                  { subject: 'Mathematics', pct: 95, color: 'stroke-indigo-500' },
                  { subject: 'ICT', pct: 100, color: 'stroke-crimson' }
                ].map((item, idx) => {
                  const radius = 35;
                  const circ = 2 * Math.PI * radius;
                  const offset = circ - (item.pct / 100) * circ;
                  
                  return (
                    <div key={idx} className="bg-slate-50 border border-slate-150 p-4 rounded flex flex-col items-center justify-between">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="48" cy="48" r={radius} className="stroke-slate-200 fill-none" strokeWidth="6" />
                          <circle 
                            cx="48" 
                            cy="48" 
                            r={radius} 
                            className={`fill-none transition-all duration-1000 ${item.color}`} 
                            strokeWidth="6" 
                            strokeDasharray={circ}
                            strokeDashoffset={offset}
                          />
                        </svg>
                        <span className="absolute font-mono font-black text-sm text-slate-800">{item.pct}%</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-905">{item.subject}</h4>
                        <p className="text-[9px] text-slate-400 font-mono mt-0.5">Classes Attended</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Leave Requests Table */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h4 className="text-xs font-serif font-bold text-slate-900">{isBangla ? 'আবেদিত ছুটির ইতিহাস' : 'Leave Application Records'}</h4>
                
                <div className="overflow-x-auto text-xs border border-slate-200 rounded">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                        <th className="p-2.5 pl-4">{isBangla ? 'আবেদনের তারিখ' : 'Applied Date'}</th>
                        <th className="p-2.5">{isBangla ? 'ছুটির মেয়াদ' : 'Period'}</th>
                        <th className="p-2.5">{isBangla ? 'কারণ ও মন্তব্য' : 'Reason / Note'}</th>
                        <th className="p-2.5 pr-4 text-center">{isBangla ? 'স্থিতি' : 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                      {leaveRequests.map(req => (
                        <tr key={req.id} className="hover:bg-slate-50/50">
                          <td className="p-2.5 pl-4 font-mono">{req.dateApplied}</td>
                          <td className="p-2.5 font-mono text-[11px] leading-snug">
                            {req.startDate} to {req.endDate}
                          </td>
                          <td className="p-2.5 text-[11px] leading-normal">{req.reason}</td>
                          <td className="p-2.5 pr-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                              req.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
                              req.status === 'PENDING' ? 'bg-amber-50 text-amber-800 border border-amber-100' :
                              'bg-red-50 text-red-800 border border-red-100'
                            }`}>
                              {req.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Leave Apply Form */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md">
              <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <Send className="w-5 h-5 text-crimson" />
                <span>{isBangla ? 'ছুটির আবেদন ফরম' : 'Request Leave of Absence'}</span>
              </h3>

              <form onSubmit={handleLeaveSubmit} className="space-y-4 pt-2 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'শুরুর তারিখ' : 'Start Date'}</label>
                    <input
                      type="date"
                      required
                      value={leaveStart}
                      onChange={e => setLeaveStart(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-xs font-mono text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'শেষের তারিখ' : 'End Date'}</label>
                    <input
                      type="date"
                      required
                      value={leaveEnd}
                      onChange={e => setLeaveEnd(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-xs font-mono text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'ছুটির কারণ' : 'Reason for Leave'}</label>
                  <select
                    value={leaveReason}
                    onChange={e => setLeaveReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-xs text-slate-700 focus:outline-none font-sans"
                  >
                    <option value="Medical">{isBangla ? 'অসুস্থতা / মেডিকেল চেকআপ' : 'Medical Sickness'}</option>
                    <option value="Family Event">{isBangla ? 'পারিবারিক অনুষ্ঠান' : 'Family Emergency'}</option>
                    <option value="Urgent Personal">{isBangla ? 'জরুরি ব্যক্তিগত কাজ' : 'Urgent Personal Affair'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'বিস্তারিত বিবরণ' : 'Application Notes / Details'}</label>
                  <textarea
                    rows={4}
                    required
                    placeholder={isBangla ? 'ছুটির যৌক্তিক কারণ ব্যাখ্যা করুন...' : 'Provide brief clarification details...'}
                    value={leaveDetails}
                    onChange={e => setLeaveDetails(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-wider text-xs font-bold py-3.5 px-4 rounded transition-all cursor-pointer shadow-sm flex items-center justify-center space-x-1"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{isBangla ? 'আবেদন পেশ করুন' : 'Submit Application'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* GRADES LEDGER SUB-TAB */}
        {activeSubTab === 'grades' && (
          <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Award className="w-5 h-5 text-crimson" />
              <span>{isBangla ? 'অনলাইন পরীক্ষার গ্রেডবুক' : 'Sessional Examination Gradebook'}</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
              {isBangla 
                ? 'একাদশ শ্রেণির প্রথম বর্ষের টিউটোরিয়াল টেস্ট, কুইজ এবং ব্যবহারিক মূল্যায়নের গ্রেড খতিয়ান। নিচে আপনার স্কোরের সাথে শ্রেণির গড় স্কোরের তুলনা করা হলো:' 
                : 'Review sessional quizzes, class test marks, and sessional averages across core syllabus units:'}
            </p>

            {/* Grades Table */}
            <div className="overflow-x-auto text-xs border border-slate-200 rounded">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[9px] uppercase tracking-wider">
                    <th className="p-3 pl-4 border-r border-slate-200">{isBangla ? 'বিষয় ও কোড' : 'Subject & Code'}</th>
                    <th className="p-3 border-r border-slate-200 text-center">{isBangla ? 'ক্লাস টেস্ট (১৫)' : 'Quiz Test (15)'}</th>
                    <th className="p-3 border-r border-slate-200 text-center">{isBangla ? 'ব্যবহারিক ল্যাব (২৫)' : 'Lab Assessment (25)'}</th>
                    <th className="p-3 border-r border-slate-200 text-center">{isBangla ? 'অর্ধ-বার্ষিক (৬০)' : 'Midterm (60)'}</th>
                    <th className="p-3 border-r border-slate-200 text-center">{isBangla ? 'মোট নম্বর (১০০)' : 'Total Raw (100)'}</th>
                    <th className="p-3 border-r border-slate-200 text-center">{isBangla ? 'প্রাপ্ত গ্রেড' : 'Grade'}</th>
                    <th className="p-3 pr-4 text-center">{isBangla ? 'গ্রেড পয়েন্ট' : 'Grade Point'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                  {[
                    { sub: 'Physics I & II (PHY-101)', ct: 14, lab: 23, mid: 52, tot: 89, gr: 'A+', gp: 5.00, avg: 74 },
                    { sub: 'Chemistry I & II (CHE-101)', ct: 13, lab: 22, mid: 48, tot: 83, gr: 'A+', gp: 5.00, avg: 71 },
                    { sub: 'Higher Maths (MATH-101)', ct: 12, lab: 20, mid: 46, tot: 78, gr: 'A', gp: 4.00, avg: 68 },
                    { sub: 'ICT & Web Design (ICT-101)', ct: 14, lab: 24, mid: 54, tot: 92, gr: 'A+', gp: 5.00, avg: 80 }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 pl-4 border-r border-slate-200 font-semibold text-slate-800">{row.sub}</td>
                      <td className="p-3 border-r border-slate-200 text-center font-mono font-bold">{row.ct}</td>
                      <td className="p-3 border-r border-slate-200 text-center font-mono font-bold">{row.lab}</td>
                      <td className="p-3 border-r border-slate-200 text-center font-mono font-bold">{row.mid}</td>
                      <td className="p-3 border-r border-slate-200 text-center font-mono font-black text-slate-900">{row.tot}</td>
                      <td className="p-3 border-r border-slate-200 text-center">
                        <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                          {row.gr}
                        </span>
                      </td>
                      <td className="p-3 pr-4 text-center font-mono font-bold text-slate-800">{row.gp.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Performance comparison visualizer */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="text-xs font-serif font-bold text-slate-905">{isBangla ? 'শ্রেণির গড় স্কোরের সাথে আপনার তুলনা' : 'Performance vs Class Average'}</h4>
              
              <div className="space-y-4">
                {[
                  { label: 'Physics I & II', myScore: 89, classAvg: 74 },
                  { label: 'Chemistry I & II', myScore: 83, classAvg: 71 },
                  { label: 'Higher Maths', myScore: 78, classAvg: 68 },
                  { label: 'ICT & Web Design', myScore: 92, classAvg: 80 }
                ].map((bar, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-800 font-sans">
                      <span>{bar.label}</span>
                      <span className="font-mono text-crimson">My: {bar.myScore}% vs Avg: {bar.classAvg}%</span>
                    </div>
                    <div className="relative w-full h-4 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                      {/* Class Average bar */}
                      <div className="absolute top-0 bottom-0 left-0 bg-slate-300 rounded-full" style={{ width: `${bar.classAvg}%` }}></div>
                      {/* My Score bar */}
                      <div className="absolute top-0 bottom-0 left-0 bg-crimson rounded-full" style={{ width: `${bar.myScore}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FEES & INVOICES SUB-TAB */}
        {activeSubTab === 'finance' && (
          <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-crimson" />
              <span>{isBangla ? 'ভর্তি ও পরীক্ষার ফি খতিয়ান' : 'College Finance Ledger & Bill Payments'}</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {isBangla 
                ? 'কলেজ প্রশাসনের সকল বকেয়া বিল পর্যবেক্ষণ এবং বকেয়া ফি পরিশোধ করুন।' 
                : 'Review GSC semester payments, pending fee balances, and retrieve digital cash receipts:'}
            </p>

            <div className="overflow-x-auto text-xs border border-slate-200 rounded shadow-inner">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                    <th className="p-3 pl-4 border-r border-slate-200">{isBangla ? 'বিল বিবরণ' : 'Invoiced Fee details'}</th>
                    <th className="p-3 border-r border-slate-200 text-center">{isBangla ? 'ফি পরিমাণ (টাকা)' : 'Fee Amount (BDT)'}</th>
                    <th className="p-3 border-r border-slate-200 text-center">{isBangla ? 'পরিশোধের শেষ তারিখ' : 'Due Date'}</th>
                    <th className="p-3 border-r border-slate-200 text-center">{isBangla ? 'পরিশোধের স্থিতি' : 'Payment Status'}</th>
                    <th className="p-3 border-r border-slate-200">{isBangla ? 'রসিদ / ট্রানজেকশন আইডি' : 'Transaction Voucher'}</th>
                    <th className="p-3 pr-4 text-center">{isBangla ? 'পেমেন্ট অ্যাকশন' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                  {bills.map(bill => (
                    <tr key={bill.id} className="hover:bg-slate-50/50">
                      <td className="p-3 border-r border-slate-200 font-semibold text-slate-800">
                        {isBangla ? bill.descBn : bill.descEn}
                      </td>
                      <td className="p-3 border-r border-slate-200 text-center font-mono font-bold text-slate-900">{bill.amount.toLocaleString()} ৳</td>
                      <td className="p-3 border-r border-slate-200 text-center font-mono text-slate-500">{bill.dateDue}</td>
                      <td className="p-3 border-r border-slate-200 text-center">
                        <span className={`px-2.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider border ${
                          bill.status === 'PAID' 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
                            : 'bg-red-50 text-red-800 border-red-100'
                        }`}>
                          {bill.status}
                        </span>
                      </td>
                      <td className="p-3 border-r border-slate-200 font-mono text-slate-500 text-[11px]">
                        {bill.txId ? (
                          <div className="space-y-0.5 text-left">
                            <span className="font-bold text-slate-800 leading-none block">{bill.txId}</span>
                            <span className="text-[9px] text-slate-400">via {bill.method}</span>
                          </div>
                        ) : '-'}
                      </td>
                      <td className="p-3 pr-4 text-center">
                        {bill.status === 'UNPAID' ? (
                          <button
                            onClick={() => { setSelectedBillId(bill.id); setPayModalOpen(true); }}
                            className="bg-crimson hover:bg-crimson-dark text-white font-mono uppercase text-[9px] font-bold py-1.5 px-3 rounded shadow-sm transition-all cursor-pointer"
                          >
                            {isBangla ? 'অনলাইনে পরিশোধ' : 'Pay Online'}
                          </button>
                        ) : (
                          <button 
                            onClick={() => triggerToast(isBangla ? 'রসিদ ডাউনলোড সম্পন্ন হয়েছে।' : 'Digital invoice voucher saved to local storage.')}
                            className="text-slate-450 hover:text-crimson font-mono uppercase text-[9px] font-bold border border-slate-200 bg-white p-1 rounded px-2"
                          >
                            {isBangla ? 'ভাউচার ডাউনলোড' : 'Download Receipt'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CLASS TIMETABLE SUB-TAB */}
        {activeSubTab === 'timetable' && (
          <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-crimson" />
              <span>{isBangla ? 'আমার ব্যক্তিগত সাপ্তাহিক ক্লাস সূচি' : 'My Personal Weekly Class Schedule'}</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-505 text-slate-500 leading-relaxed">
              {isBangla 
                ? 'একাদশ শ্রেণির বিজ্ঞান বিভাগের ১ম বর্ষের নিয়মিত শিক্ষার্থীদের ক্লাস সময়সূচি।' 
                : 'Weekly sessional class schedule mapped to your first year science stream cohort:'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
              {[
                { day: isBangla ? 'রবিবার' : 'Sunday', classes: [{ sub: 'Physics I', hour: '10:00 AM', room: 'Rm 201' }, { sub: 'English', hour: '10:45 AM', room: 'Rm 102' }, { sub: 'Mathematics I', hour: '11:30 AM', room: 'Rm 203' }] },
                { day: isBangla ? 'সোমবার' : 'Monday', classes: [{ sub: 'Chemistry I', hour: '10:00 AM', room: 'Rm 202' }, { sub: 'Bangla', hour: '10:45 AM', room: 'Rm 101' }, { sub: 'ICT Lab', hour: '11:30 AM', room: 'Computer Lab 2' }] },
                { day: isBangla ? 'মঙ্গলবার' : 'Tuesday', classes: [{ sub: 'Mathematics I', hour: '10:00 AM', room: 'Rm 203' }, { sub: 'Physics I', hour: '10:45 AM', room: 'Rm 201' }, { sub: 'Zoology', hour: '11:30 AM', room: 'Rm 301' }] },
                { day: isBangla ? 'বুধবার' : 'Wednesday', classes: [{ sub: 'ICT & Web Code', hour: '10:00 AM', room: 'Lab 2' }, { sub: 'Chemistry I', hour: '10:45 AM', room: 'Rm 202' }, { sub: 'Botany', hour: '11:30 AM', room: 'Rm 302' }] },
                { day: isBangla ? 'বৃহস্পতিবার' : 'Thursday', classes: [{ sub: 'Bangla Literature', hour: '10:00 AM', room: 'Rm 101' }, { sub: 'Mathematics I', hour: '10:45 AM', room: 'Rm 203' }, { sub: 'English', hour: '11:30 AM', room: 'Rm 102' }] }
              ].map((daySchedule, dIdx) => (
                <div key={dIdx} className="bg-slate-50 border border-slate-200 rounded p-4 text-left space-y-3 shadow-inner">
                  <h4 className="text-xs font-mono font-black border-b border-slate-200 pb-1.5 text-slate-800 uppercase tracking-widest">{daySchedule.day}</h4>
                  <div className="space-y-2.5">
                    {daySchedule.classes.map((c, cIdx) => (
                      <div key={cIdx} className="bg-white p-2.5 rounded border border-slate-150 shadow-sm text-left">
                        <span className="text-[8px] font-mono text-slate-400 block">{c.hour}</span>
                        <h5 className="text-xs font-bold text-slate-800 truncate">{c.sub}</h5>
                        <p className="text-[9px] text-crimson font-mono mt-0.5">{c.room}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE SETTINGS SUB-TAB */}
        {activeSubTab === 'profile' && (
          <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md max-w-2xl text-left space-y-6">
            <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-crimson" />
              <span>{isBangla ? 'শিক্ষার্থীর প্রোফাইল ও সেটিংস' : 'My Account Settings'}</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-6 text-xs font-sans">
              
              {/* College Managed Dossier (Read-Only) */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 shadow-inner">
                <div className="flex items-center space-x-1.5 border-b border-slate-200 pb-2 text-slate-500">
                  <Shield className="w-4 h-4 text-crimson shrink-0" />
                  <span className="font-mono font-bold uppercase tracking-wider text-[9px] text-slate-500">
                    {isBangla ? 'কলেজ নির্ধারিত তথ্য (অপরিবর্তনযোগ্য)' : 'COLLEGE MANAGED PROFILE DOSSIER (READ-ONLY)'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-400 mb-1">{isBangla ? 'শিক্ষার্থীর নাম' : 'Full Name'}</label>
                    <input
                      type="text"
                      disabled
                      value={user.name}
                      className="w-full bg-slate-200/50 border border-slate-200 rounded px-2.5 py-1.5 font-sans text-slate-500 cursor-not-allowed select-none focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-400 mb-1">{isBangla ? 'রজিস্ট্রেশন আইডি (রোল)' : 'Student ID / Roll'}</label>
                    <input
                      type="text"
                      disabled
                      value={user.studentId}
                      className="w-full bg-slate-200/50 border border-slate-200 rounded px-2.5 py-1.5 font-mono text-slate-500 cursor-not-allowed select-none focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-400 mb-1">{isBangla ? 'অফিসিয়াল ইমেইল' : 'Official Email'}</label>
                    <input
                      type="text"
                      disabled
                      value={user.email}
                      className="w-full bg-slate-200/50 border border-slate-200 rounded px-2.5 py-1.5 font-sans text-slate-500 cursor-not-allowed select-none focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-400 mb-1">{isBangla ? 'অনুষদ / বিভাগ' : 'Department'}</label>
                    <input
                      type="text"
                      disabled
                      value={user.department}
                      className="w-full bg-slate-200/50 border border-slate-200 rounded px-2.5 py-1.5 font-sans text-slate-500 cursor-not-allowed select-none focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-400 mb-1">{isBangla ? 'ব্যাচ' : 'Cohort Batch'}</label>
                    <input
                      type="text"
                      disabled
                      value={user.batch}
                      className="w-full bg-slate-200/50 border border-slate-200 rounded px-2.5 py-1.5 font-mono text-slate-500 cursor-not-allowed select-none focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-400 mb-1">{isBangla ? 'শ্রেণি / বর্ষ' : 'Class Year'}</label>
                    <input
                      type="text"
                      disabled
                      value={user.semester === 1 ? (isBangla ? '১ম বর্ষ (একাদশ)' : '1st Year (XI)') : (isBangla ? '২য় বর্ষ (দ্বাদশ)' : '2nd Year (XII)')}
                      className="w-full bg-slate-200/50 border border-slate-200 rounded px-2.5 py-1.5 font-sans text-slate-500 cursor-not-allowed select-none focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Student Managed Details (Editable) */}
              <div className="space-y-4">
                <div className="flex items-center space-x-1.5 border-b border-slate-100 pb-2 text-slate-700">
                  <span className="font-mono font-bold uppercase tracking-wider text-[9px] text-slate-650">
                    {isBangla ? 'সম্পাদনযোগ্য ব্যক্তিগত তথ্য' : 'STUDENT MANAGED CONTACT INFO (EDITABLE)'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'মোবাইল নম্বর' : 'Phone Number'}</label>
                  <input
                    type="text"
                    required
                    value={profilePhone}
                    onChange={e => setProfilePhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-crimson text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'রক্তের গ্রুপ' : 'Blood Group'}</label>
                  <input
                    type="text"
                    required
                    value={profileBlood}
                    onChange={e => setProfileBlood(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-crimson text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'অভিভাবকের তথ্য' : 'Guardian Contact Reference'}</label>
                <input
                  type="text"
                  required
                  value={profileGuardian}
                  onChange={e => setProfileGuardian(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-crimson text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'বর্তমান ও স্থায়ী ঠিকানা' : 'Residential Address'}</label>
                <textarea
                  rows={3}
                  required
                  value={profileAddress}
                  onChange={e => setProfileAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-crimson resize-none text-slate-800"
                />
              </div>
              
              </div> {/* End of space-y-4 wrapper */}

              <button
                type="submit"
                className="bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-wider text-xs font-bold py-3 px-6 rounded transition-all cursor-pointer shadow flex items-center space-x-1"
              >
                <Edit className="w-3.5 h-3.5 text-white" />
                <span>{isBangla ? 'তথ্য পরিবর্তন সংরক্ষণ' : 'Save Changes'}</span>
              </button>
            </form>
          </div>
        )}

      </div>

      {/* 4. ONLINE BILLS CHECKOUT Sim Gateway Modal */}
      {payModalOpen && selectedBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm print:hidden">
          
          {/* Simulated checkout card */}
          <div className="relative w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden text-left border border-slate-350">
            
            {/* Header of Payment method brand */}
            <div className={`p-5 text-white flex items-center justify-between ${
              paymentMethod === 'bkash' ? 'bg-[#D12053]' : paymentMethod === 'nagad' ? 'bg-[#EC5A24]' : 'bg-slate-800'
            }`}>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-serif font-black text-sm uppercase tracking-wide">
                    {paymentMethod === 'bkash' ? 'bKash Checkout' : paymentMethod === 'nagad' ? 'Nagad Portal' : 'Credit/Debit Card'}
                  </h3>
                  <p className="text-[9px] text-white/85 font-mono">GSC Official Merchant Acc</p>
                </div>
              </div>
              <button 
                onClick={() => { setPayModalOpen(false); setPaymentStep(1); }}
                className="text-white hover:text-red-200 p-1 font-mono text-xs font-black"
              >
                ✕ Close
              </button>
            </div>

            {/* Bill Info Strip */}
            <div className="bg-slate-50 border-b border-slate-100 p-3.5 text-xs text-slate-700 flex justify-between items-center">
              <div className="text-left">
                <span className="text-[8px] font-mono text-slate-400 uppercase leading-none block">Invoiced Bill</span>
                <p className="font-bold font-sans truncate max-w-[200px] text-slate-900">{isBangla ? selectedBill.descBn : selectedBill.descEn}</p>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-mono text-slate-400 uppercase leading-none block">Amount Due</span>
                <p className="font-mono font-black text-crimson text-sm">{selectedBill.amount.toLocaleString()} ৳</p>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4 text-xs font-sans">
              
              {/* Payment Methods Toggles at Step 1 */}
              {paymentStep === 1 && (
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">1. Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-2.5 rounded border text-center transition-all cursor-pointer font-bold ${
                        paymentMethod === 'bkash' 
                          ? 'border-[#D12053] bg-[#D12053]/5 text-[#D12053]' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      bKash
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('nagad')}
                      className={`p-2.5 rounded border text-center transition-all cursor-pointer font-bold ${
                        paymentMethod === 'nagad' 
                          ? 'border-[#EC5A24] bg-[#EC5A24]/5 text-[#EC5A24]' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      Nagad
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded border text-center transition-all cursor-pointer font-bold ${
                        paymentMethod === 'card' 
                          ? 'border-slate-800 bg-slate-800/5 text-slate-800' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      Bank Card
                    </button>
                  </div>

                  {paymentMethod !== 'card' ? (
                    <div className="space-y-1.5 pt-2">
                      <label className="block text-[9px] font-mono text-slate-500 uppercase">{paymentMethod === 'bkash' ? 'Your bKash Number' : 'Your Nagad Number'}</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 01712345678"
                        value={payMobile}
                        onChange={e => setPayMobile(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 pt-2 text-[10px]">
                      <div className="space-y-1">
                        <label className="block text-[8px] font-mono text-slate-400 uppercase">Card Number</label>
                        <input type="text" required placeholder="4321 •••• •••• 9812" className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono focus:outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="block text-[8px] font-mono text-slate-400 uppercase">Expiry</label>
                          <input type="text" required placeholder="MM/YY" className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[8px] font-mono text-slate-400 uppercase">CVC</label>
                          <input type="text" required placeholder="123" className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Verification Code */}
              {paymentStep === 2 && (
                <div className="space-y-3 text-center">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500 mb-1 border border-amber-200">
                    <Shield className="w-5 h-5 text-amber-500" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase">{isBangla ? 'যাচাইকরণ কোড পাঠানো হয়েছে' : 'OTP Code Verification'}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {isBangla 
                      ? 'পেমেন্ট অনুমোদনের জন্য আপনার মোবাইলে পাঠানো ৬ সংখ্যার কোড টাইপ করুন (ডেমো কোড: ১২৩৪৫৬)' 
                      : `A simulated security verification code was sent to ${payMobile || 'your card bank'}. Enter "123456" to proceed.`}
                  </p>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={payOtp}
                    onChange={e => setPayOtp(e.target.value)}
                    className="w-32 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-center text-sm font-mono tracking-widest text-slate-800 focus:outline-none mx-auto block"
                  />
                </div>
              )}

              {/* Step 3: PIN Input */}
              {paymentStep === 3 && (
                <div className="space-y-3 text-center">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-1 border border-emerald-200">
                    <Shield className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase">{isBangla ? 'পিনের মাধ্যমে নিশ্চিত করুন' : 'Confirm Security PIN'}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {isBangla 
                      ? 'লেনদেন চূড়ান্ত করতে আপনার ৪/৫ সংখ্যার সিকিউর পিন কোড টাইপ করুন।' 
                      : 'Type your secure wallet transaction PIN to execute final checkout.'}
                  </p>
                  <input
                    type="password"
                    required
                    maxLength={5}
                    placeholder="••••"
                    value={payPin}
                    onChange={e => setPayPin(e.target.value)}
                    className="w-24 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-center text-sm font-mono tracking-widest text-slate-800 focus:outline-none mx-auto block"
                  />
                </div>
              )}

              {/* Checkout triggers */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={processingPayment}
                  className={`w-full py-3 rounded text-white font-mono uppercase text-xs font-bold tracking-wider transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                    processingPayment 
                      ? 'bg-slate-400 text-slate-100' 
                      : paymentMethod === 'bkash' ? 'bg-[#D12053] hover:bg-[#b01642]' : paymentMethod === 'nagad' ? 'bg-[#EC5A24] hover:bg-[#ce4818]' : 'bg-slate-800 hover:bg-slate-900'
                  }`}
                >
                  {processingPayment ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{isBangla ? 'প্রক্রিয়াধীন...' : 'Processing Transaction...'}</span>
                    </>
                  ) : (
                    <span>
                      {paymentStep === 1 ? (isBangla ? 'পরবর্তী ধাপ' : 'Proceed') :
                       paymentStep === 2 ? (isBangla ? 'কোড যাচাই করুন' : 'Verify Code') :
                       (isBangla ? 'পেমেন্ট নিশ্চিত করুন' : 'Confirm & Pay')}
                    </span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
