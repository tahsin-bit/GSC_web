import React, { useState } from 'react';
import {
  X, ShieldCheck, Mail, Lock, User as UserIcon,
  GraduationCap, UserPlus, Eye, EyeOff, LogIn, Landmark,
  Upload, Camera, Phone
} from 'lucide-react';
import { User } from '../types/academic';
import { DEPARTMENTS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  isBangla: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  isBangla
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login Form States
  const [loginStudentId, setLoginStudentId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regSscRoll, setRegSscRoll] = useState('');
  const [regSscBoard, setRegSscBoard] = useState('Dhaka');
  const [regSscGpa, setRegSscGpa] = useState('');
  const [regDept, setRegDept] = useState('Physics Department');
  const [regGroup, setRegGroup] = useState('Science');
  const [regSession, setRegSession] = useState('2025-2026');
  const [regSection, setRegSection] = useState('A');
  const [regSemester, setRegSemester] = useState('1');
  const [regGuardianName, setRegGuardianName] = useState('');
  const [regGuardianPhone, setRegGuardianPhone] = useState('');
  const [regBloodGroup, setRegBloodGroup] = useState('O+');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAvatar, setRegAvatar] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);

  const TEST_PROFILES: User[] = [
    {
      id: 'student-phy',
      name: 'Ismail Ibna',
      email: 'ismail.ibna@gsctd.edu.bd',
      studentId: '1001',
      department: 'Physics Department',
      batch: '2026 Batch',
      cgpa: 3.78,
      semester: 1,
      completedCredits: 24,
      totalCredits: 48,
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256'
    },
    {
      id: 'student-che',
      name: 'Farhan Ahmed',
      email: 'farhan.chemistry@gsctd.edu.bd',
      studentId: '2002',
      department: 'Chemistry Department',
      batch: '2026 Batch',
      cgpa: 3.65,
      semester: 1,
      completedCredits: 20,
      totalCredits: 48,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
    },
    {
      id: 'student-ict',
      name: 'Tasnim Chowdhury',
      email: 'tasnim.ict@gsctd.edu.bd',
      studentId: '3003',
      department: 'ICT Department',
      batch: '2026 Batch',
      cgpa: 3.92,
      semester: 1,
      completedCredits: 28,
      totalCredits: 48,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256'
    },
    {
      id: 'student-zoo',
      name: 'Nusrat Jahan',
      email: 'nusrat.zoo@gsctd.edu.bd',
      studentId: '4004',
      department: 'Zoology Department',
      batch: '2026 Batch',
      cgpa: 3.55,
      semester: 1,
      completedCredits: 22,
      totalCredits: 48,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'
    }
  ];

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setRegAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginStudentId || !loginPassword) {
      setErrorMsg(isBangla ? 'অনুগ্রহ করে সব ক্ষেত্র পূরণ করুন।' : 'Please fill all required login parameters.');
      return;
    }
    const matchedTestAccount = TEST_PROFILES.find(p => p.studentId === loginStudentId && loginPassword === 'gsc1954');
    if (matchedTestAccount) {
      triggerSuccess(matchedTestAccount);
    } else if (loginStudentId === '2026-06-17' && loginPassword === 'student123') {
      triggerSuccess({
        id: 'student-pre',
        name: 'Ismail Ibna',
        email: 'ismailibna8@gmail.com',
        studentId: '2026-06-17',
        department: 'Physics Department',
        batch: '2026 Batch',
        cgpa: 3.78,
        semester: 1,
        completedCredits: 24,
        totalCredits: 48,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
      });
    } else {
      const stored = localStorage.getItem(`student_user_${loginStudentId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          triggerSuccess(parsed);
          return;
        } catch (_e) { /* fallback */ }
      }
      setErrorMsg(isBangla ? 'ভুল স্টুডেন্ট আইডি অথবা পাসওয়ার্ড।' : 'Invalid student ID or portal passcode.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regStudentId || !regSscRoll || !regPassword) {
      setErrorMsg(isBangla ? 'অনুগ্রহ করে সকল * চিহ্নিত তথ্য পূরণ করুন।' : 'Please fill all required (*) fields.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg(isBangla ? 'পাসওয়ার্ড মিলছে না, আবার চেষ্টা করুন।' : 'Passwords do not match.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMsg(isBangla ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters.');
      return;
    }
    const newUser: User = {
      id: `student-${Date.now()}`,
      name: regName,
      email: regEmail,
      studentId: regStudentId,
      department: regDept,
      batch: `Session ${regSession}`,
      cgpa: parseFloat(regSscGpa) || 3.85,
      semester: parseInt(regSemester),
      completedCredits: parseInt(regSemester) === 2 ? 24 : 12,
      totalCredits: 48,
      avatarUrl: regAvatar || ''
    };
    localStorage.setItem(`student_user_${regStudentId}`, JSON.stringify(newUser));
    triggerSuccess(newUser);
  };

  const triggerSuccess = (student: User) => {
    setErrorMsg('');
    setSuccessAnimation(true);
    setTimeout(() => {
      onSuccess(student);
      setSuccessAnimation(false);
      onClose();
    }, 1400);
  };

  /* shared classnames */
  const lbl = 'block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-1.5';
  const inp = 'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/10 transition-all placeholder-slate-400';
  const sel = 'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/10 transition-all';

  return (
    <div id="auth-overlay-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className={`relative w-full bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-[95vh] flex flex-col overflow-hidden ${activeTab === 'register' ? 'max-w-lg' : 'max-w-md'}`}>

        {/* Close button */}
        <button
          id="close-auth-modal"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1.5 text-slate-400 hover:text-crimson hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-7 flex-1">
          {successAnimation ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-10 h-10 animate-pulse text-emerald-500" />
              </div>
              <h3 className="text-xl font-serif font-black text-slate-900">
                {isBangla ? 'ভেরিফিকেশন সফল!' : 'Authorization Successful!'}
              </h3>
              <p className="text-sm text-slate-500">
                {isBangla ? 'আপনার অ্যাকাউন্ট লোড হচ্ছে...' : 'Loading your workspace...'}
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 bg-white p-0.5 mb-3 shadow">
                  <img src="/images/gsc-logo.png" alt="GSC Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <h2 className="text-2xl font-serif font-black text-slate-950 tracking-tight">
                  {isBangla ? 'স্টুডেন্ট পোর্টাল' : 'GSC Student Center'}
                </h2>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono tracking-widest">
                  {isBangla ? 'একাডেমিক ড্যাশবোর্ড ও লার্নিং গেটওয়ে' : 'Academic Portal Gateway'}
                </p>
              </div>

              {/* Tab Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 mb-6 font-mono text-xs">
                <button
                  id="tab-select-login"
                  onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
                  className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-2.5 font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'সাইন-ইন' : 'Sign In'}</span>
                </button>
                <button
                  id="tab-select-register"
                  onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
                  className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-2.5 font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'নিবন্ধন' : 'Register'}</span>
                </button>
              </div>

              {/* Error */}
              {errorMsg && (
                <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold font-mono flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* ─── LOGIN FORM ─── */}
              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div>
                    <label className={lbl}>{isBangla ? 'স্টুডেন্ট আইডি / রোল নম্বর' : 'Student ID / Roll Number'}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <input
                        id="login-student-id"
                        type="text"
                        placeholder="e.g. 1001"
                        value={loginStudentId}
                        onChange={(e) => setLoginStudentId(e.target.value)}
                        className={`${inp} pl-11 font-mono font-bold`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={lbl}>{isBangla ? 'পাসওয়ার্ড' : 'Password'}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className={`${inp} pl-11 pr-12`}
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-crimson cursor-pointer transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    id="auth-login-submit"
                    type="submit"
                    className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-widest text-xs font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md active:scale-[0.98] mt-2"
                  >
                    {isBangla ? 'পোর্টালে প্রবেশ করুন →' : 'Authenticate & Unlock →'}
                  </button>
                </form>
              )}

              {/* ─── REGISTER FORM ─── */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-6 font-sans">

                  {/* Section 1: Photo & Personal */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-crimson flex items-center justify-center text-white text-[10px] font-black shrink-0">১</span>
                      <span className="text-[10px] font-mono font-bold text-crimson uppercase tracking-widest">
                        {isBangla ? 'ব্যক্তিগত তথ্য ও ছবি' : 'Personal Details & Photo'}
                      </span>
                    </div>

                    {/* Photo Upload */}
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="relative w-20 h-20 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center overflow-hidden shrink-0 group shadow-inner">
                        {regAvatar
                          ? <img src={regAvatar} alt="Preview" className="w-full h-full object-cover" />
                          : <UserIcon className="w-9 h-9 text-slate-400 mt-2" />
                        }
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer rounded-full">
                          <Camera className="w-5 h-5 text-white" />
                          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        </label>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700 mb-1">
                          {isBangla ? 'পাসপোর্ট সাইজ ছবি' : 'Passport Size Photo'}
                        </p>
                        <p className="text-[11px] text-slate-400 mb-2.5">
                          {isBangla ? 'JPG/PNG ফরম্যাট, সর্বোচ্চ ২ MB' : 'JPG or PNG, max 2 MB'}
                        </p>
                        <label className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-mono font-bold px-3.5 py-2 rounded-lg cursor-pointer transition-all shadow-sm">
                          <Upload className="w-3.5 h-3.5 text-crimson" />
                          <span>{isBangla ? 'ছবি বেছে নিন' : 'Browse Photo'}</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className={lbl}>{isBangla ? 'শিক্ষার্থীর পূর্ণ নাম *' : 'Full Name *'}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <UserIcon className="h-4 w-4" />
                        </div>
                        <input type="text" placeholder={isBangla ? 'যেমন: রেদোয়ান আহমেদ' : 'e.g. Redwan Ahmed'}
                          value={regName} onChange={(e) => setRegName(e.target.value)}
                          className={`${inp} pl-11`} required />
                      </div>
                    </div>

                    <div>
                      <label className={lbl}>{isBangla ? 'ইমেইল অ্যাড্রেস *' : 'Email Address *'}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="h-4 w-4" />
                        </div>
                        <input type="email" placeholder="student@gsctd.edu.bd"
                          value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
                          className={`${inp} pl-11 font-mono`} required />
                      </div>
                    </div>

                    <div>
                      <label className={lbl}>{isBangla ? 'মোবাইল নম্বর *' : 'Phone Number *'}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="h-4 w-4" />
                        </div>
                        <input type="tel" placeholder="017XXXXXXXX"
                          value={regPhone} onChange={(e) => setRegPhone(e.target.value)}
                          className={`${inp} pl-11 font-mono`} required />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: SSC */}
                  <div className="space-y-4 pt-5 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-crimson flex items-center justify-center text-white text-[10px] font-black shrink-0">২</span>
                      <span className="text-[10px] font-mono font-bold text-crimson uppercase tracking-widest">
                        {isBangla ? 'এস.এস.সি তথ্য' : 'SSC Academic Record'}
                      </span>
                    </div>

                    <div>
                      <label className={lbl}>{isBangla ? 'SSC রোল নম্বর *' : 'SSC Roll Number *'}</label>
                      <input type="text" placeholder="e.g. 105942"
                        value={regSscRoll} onChange={(e) => setRegSscRoll(e.target.value)}
                        className={`${inp} font-mono`} required />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={lbl}>{isBangla ? 'শিক্ষা বোর্ড' : 'Education Board'}</label>
                        <select value={regSscBoard} onChange={(e) => setRegSscBoard(e.target.value)} className={sel}>
                          {['Dhaka','Rajshahi','Chittagong','Comilla','Jessore','Barisal','Sylhet','Dinajpur','Mymensingh'].map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={lbl}>{isBangla ? 'SSC GPA' : 'SSC GPA'}</label>
                        <input type="text" placeholder="5.00"
                          value={regSscGpa} onChange={(e) => setRegSscGpa(e.target.value)}
                          className={`${inp} font-mono`} />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: GSC Academic */}
                  <div className="space-y-4 pt-5 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-crimson flex items-center justify-center text-white text-[10px] font-black shrink-0">৩</span>
                      <span className="text-[10px] font-mono font-bold text-crimson uppercase tracking-widest">
                        {isBangla ? 'জিএসসি ভর্তি তথ্য' : 'GSC Academic Information'}
                      </span>
                    </div>

                    <div>
                      <label className={lbl}>{isBangla ? 'শিক্ষাবর্ষ' : 'Academic Session'}</label>
                      <select value={regSession} onChange={(e) => setRegSession(e.target.value)} className={sel}>
                        <option value="2025-2026">2025–2026</option>
                        <option value="2024-2025">2024–2025</option>
                        <option value="2023-2024">2023–2024</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className={lbl}>{isBangla ? 'গ্রুপ' : 'Group'}</label>
                        <select value={regGroup} onChange={(e) => setRegGroup(e.target.value)} className={sel}>
                          <option value="Science">Science</option>
                        </select>
                      </div>
                      <div>
                        <label className={lbl}>{isBangla ? 'বর্ষ' : 'Year'}</label>
                        <select value={regSemester} onChange={(e) => setRegSemester(e.target.value)} className={sel}>
                          <option value="1">{isBangla ? '১ম বর্ষ' : '1st Year'}</option>
                          <option value="2">{isBangla ? '২য় বর্ষ' : '2nd Year'}</option>
                        </select>
                      </div>
                      <div>
                        <label className={lbl}>{isBangla ? 'শাখা' : 'Section'}</label>
                        <select value={regSection} onChange={(e) => setRegSection(e.target.value)} className={sel}>
                          {['A','B','C','D'].map(s => (
                            <option key={s} value={s}>{isBangla ? `শাখা ${s}` : `Section ${s}`}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Guardian */}
                  <div className="space-y-4 pt-5 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-crimson flex items-center justify-center text-white text-[10px] font-black shrink-0">৪</span>
                      <span className="text-[10px] font-mono font-bold text-crimson uppercase tracking-widest">
                        {isBangla ? 'অভিভাবক তথ্য' : 'Guardian & Emergency'}
                      </span>
                    </div>

                    <div>
                      <label className={lbl}>{isBangla ? 'অভিভাবকের নাম' : 'Guardian Name'}</label>
                      <input type="text" placeholder={isBangla ? 'পিতা/মাতার পূর্ণ নাম' : "Father / Mother's name"}
                        value={regGuardianName} onChange={(e) => setRegGuardianName(e.target.value)}
                        className={inp} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={lbl}>{isBangla ? 'অভিভাবকের ফোন' : 'Guardian Phone'}</label>
                        <input type="tel" placeholder="017XXXXXXXX"
                          value={regGuardianPhone} onChange={(e) => setRegGuardianPhone(e.target.value)}
                          className={`${inp} font-mono`} />
                      </div>
                      <div>
                        <label className={lbl}>{isBangla ? 'রক্তের গ্রুপ' : 'Blood Group'}</label>
                        <select value={regBloodGroup} onChange={(e) => setRegBloodGroup(e.target.value)} className={sel}>
                          {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Credentials */}
                  <div className="space-y-4 pt-5 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-crimson flex items-center justify-center text-white text-[10px] font-black shrink-0">৫</span>
                      <span className="text-[10px] font-mono font-bold text-crimson uppercase tracking-widest">
                        {isBangla ? 'পোর্টাল লগইন তথ্য' : 'Account Login Credentials'}
                      </span>
                    </div>

                    <div>
                      <label className={lbl}>{isBangla ? 'স্টুডেন্ট আইডি (পোর্টাল লগইনের জন্য) *' : 'Student ID — For Portal Login *'}</label>
                      <input type="text" placeholder="e.g. 524021"
                        value={regStudentId} onChange={(e) => setRegStudentId(e.target.value)}
                        className={`${inp} font-mono font-bold`} required />
                      <p className="text-[10px] text-slate-400 mt-1.5">
                        ℹ️ {isBangla ? 'এই আইডি ও পাসওয়ার্ড দিয়েই পরবর্তীতে লগইন করবেন।' : 'Use this ID + Password to sign in next time.'}
                      </p>
                    </div>

                    <div>
                      <label className={lbl}>{isBangla ? 'পাসওয়ার্ড নির্ধারণ *' : 'Create Password *'}</label>
                      <div className="relative">
                        <input type={showPassword ? 'text' : 'password'}
                          placeholder={isBangla ? 'কমপক্ষে ৬ অক্ষর' : 'Min 6 characters'}
                          value={regPassword} onChange={(e) => setRegPassword(e.target.value)}
                          className={`${inp} pr-12`} required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-crimson cursor-pointer transition-colors">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className={lbl}>{isBangla ? 'পাসওয়ার্ড নিশ্চিত করুন *' : 'Confirm Password *'}</label>
                      <div className="relative">
                        <input type={showConfirmPassword ? 'text' : 'password'}
                          placeholder={isBangla ? 'পাসওয়ার্ড পুনরায় লিখুন' : 'Repeat your password'}
                          value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)}
                          className={`${inp} pr-12`} required />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-crimson cursor-pointer transition-colors">
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    id="auth-register-submit"
                    type="submit"
                    className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-widest text-xs font-bold py-4 rounded-xl transition-all cursor-pointer shadow-md active:scale-[0.98] mt-2"
                  >
                    {isBangla ? 'জিএসসি পোর্টালে সাবমিট করুন ✓' : 'Submit & Register Profile ✓'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
