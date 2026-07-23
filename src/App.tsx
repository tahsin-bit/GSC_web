import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { CourseMaterials } from './components/CourseMaterials';
import { ExamSchedule } from './components/ExamSchedule';
import { AssignmentCalendar } from './components/AssignmentCalendar';
import { NotificationCenter } from './components/NotificationCenter';

// New GSC subpages
import { AboutUs } from './components/AboutUs';
import { Administration } from './components/Administration';
import { ResultsChecker } from './components/ResultsChecker';
import { AcademicInfo } from './components/AcademicInfo';
import { ResourcesInfo } from './components/ResourcesInfo';
import { PhotoGallery } from './components/PhotoGallery';
import { ContactPage } from './components/ContactPage';
import { DepartmentsList } from './components/DepartmentsList';

import { User, Assignment, NotificationItem, Course } from './types/academic';
import { COURSES, INITIAL_ASSIGNMENTS, INITIAL_NOTIFICATIONS } from './data/mockData';
import { X, Printer, Menu, Languages, Search } from 'lucide-react';
import { StudentSidebar } from './components/StudentSidebar';
import { GscAiChat } from './components/GscAiChat';


export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBangla, setIsBangla] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [selectedNotice, setSelectedNotice] = useState<NotificationItem | null>(null);
  const [infoModalKey, setInfoModalKey] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'attendance' | 'grades' | 'finance' | 'timetable' | 'profile'>('overview');
  const [portalSearchQuery, setPortalSearchQuery] = useState<string>('');
  const [isPortalSearchOpen, setIsPortalSearchOpen] = useState<boolean>(false);

  // Assignments persistence local state
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('gsctd_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  // Notifications persistence local state
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('gsctd_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Track active session student profiles dynamically
  useEffect(() => {
    const savedUser = localStorage.getItem('gsctd_current_student');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        // Default jump directly to interactive portal if logged-in session exists
        setActiveTab('dashboard');
      } catch (err) {
        console.error("Failed to restore user", err);
      }
    }
  }, []);

  // Save states to localstorage on updates
  useEffect(() => {
    localStorage.setItem('gsctd_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('gsctd_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Dynamic Tab Switching Browser Document Title
  useEffect(() => {
    const titlesEn: Record<string, string> = {
      home: 'Government Science College, Tejgaon, Dhaka',
      about: 'About Us & History - Government Science College',
      administration: 'Administration & Teachers - Government Science College',
      'departments-list': 'Science Departments - Government Science College',
      'academic-info': 'Academic Activities & Routines - Government Science College',
      results: 'HSC Results Checker - Government Science College',
      'resources-info': 'Student Resources & E-Library - Government Science College',
      'gallery-info': 'Photo & Video Gallery - Government Science College',
      'contact-info': 'Contact & Location Map - Government Science College',
      dashboard: 'Student Portal Dashboard - Government Science College',
      materials: 'Course Materials & Notes - Government Science College',
      exams: 'Exam Routines & Schedules - Government Science College',
      calendar: 'Assignment Calendar - Government Science College',
      notifications: 'Academic Notice Board - Government Science College',
    };

    const titlesBn: Record<string, string> = {
      home: 'সরকারি বিজ্ঞান কলেজ, তেজগাঁও, ঢাকা',
      about: 'আমাদের সম্পর্কে - সরকারি বিজ্ঞান কলেজ',
      administration: 'প্রশাসন ও শিক্ষকবৃন্দ - সরকারি বিজ্ঞান কলেজ',
      'departments-list': 'অনুষদ ও বিভাগসমূহ - সরকারি বিজ্ঞান কলেজ',
      'academic-info': 'একাডেমিক কার্যক্রম - সরকারি বিজ্ঞান কলেজ',
      results: 'ফলাফল ও রেজাল্ট সিস্টেম - সরকারি বিজ্ঞান কলেজ',
      'resources-info': 'শিক্ষার্থীদের রিসোর্স - সরকারি বিজ্ঞান কলেজ',
      'gallery-info': 'ক্যাম্পাস ফটো গ্যালারী - সরকারি বিজ্ঞান কলেজ',
      'contact-info': 'যোগাযোগ ও মানচিত্র - সরকারি বিজ্ঞান কলেজ',
      dashboard: 'স্টুডেন্ট পোর্টাল ড্যাশবোর্ড - সরকারি বিজ্ঞান কলেজ',
      materials: 'কোর্স ফাইল ও লেকচার নোটস - সরকারি বিজ্ঞান কলেজ',
      exams: 'পরীক্ষা রুটিন ও সময়সূচী - সরকারি বিজ্ঞান কলেজ',
      calendar: 'অ্যাসাইনমেন্ট ক্যালেন্ডার - সরকারি বিজ্ঞান কলেজ',
      notifications: 'একাডেমিক নোটিশ বোর্ড - সরকারি বিজ্ঞান কলেজ',
    };

    const currentMap = isBangla ? titlesBn : titlesEn;
    const pageTitle = currentMap[activeTab] || (isBangla ? 'সরকারি বিজ্ঞান কলেজ, তেজগাঁও, ঢাকা' : 'Government Science College, Tejgaon, Dhaka');
    document.title = pageTitle;
  }, [activeTab, isBangla]);

  // Redirection check for logged-in student session
  useEffect(() => {
    if (user) {
      const allowedDashboardTabs = ['dashboard', 'materials', 'exams', 'calendar', 'notifications'];
      if (!allowedDashboardTabs.includes(activeTab)) {
        setActiveTab('dashboard');
      }
    }
  }, [user, activeTab]);

  // Auth helper callbacks
  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem('gsctd_current_student', JSON.stringify(authenticatedUser));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gsctd_current_student');
    setActiveTab('home');
  };

  // Assignment helpers
  const handleAddAssignment = (newAsn: Assignment) => {
    setAssignments(prev => [newAsn, ...prev]);
  };

  const handleToggleComplete = (id: string) => {
    setAssignments(prev => prev.map(asn => 
      asn.id === id ? { ...asn, completed: !asn.completed } : asn
    ));
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(asn => asn.id !== id));
  };

  // Notification helpers
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notice => 
      notice.id === id ? { ...notice, read: true } : notice
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notice => ({ ...notice, read: true })));
  };

  const handleDismissNotice = (id: string) => {
    setNotifications(prev => prev.filter(notice => notice.id !== id));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Navigation router router handler
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
      case 'departments':
      case 'admissions':
        return (
          <LandingPage
            isBangla={isBangla}
            onOpenAuth={() => setIsAuthOpen(true)}
            setActiveTab={setActiveTab}
            notifications={notifications}
            onSelectNotice={setSelectedNotice}
            onSelectInfo={setInfoModalKey}
          />
        );
      case 'about':
        return <AboutUs isBangla={isBangla} />;
      case 'administration':
        return <Administration isBangla={isBangla} />;
      case 'departments-list':
        return <DepartmentsList isBangla={isBangla} />;
      case 'academic-info':
        return <AcademicInfo isBangla={isBangla} />;
      case 'results':
        return <ResultsChecker isBangla={isBangla} />;
      case 'resources-info':
        return <ResourcesInfo isBangla={isBangla} />;
      case 'gallery-info':
        return <PhotoGallery isBangla={isBangla} />;
      case 'contact-info':
        return <ContactPage isBangla={isBangla} />;
      case 'dashboard':
        return user ? (
          <Dashboard
            user={user}
            assignments={assignments}
            courses={COURSES}
            isBangla={isBangla}
            setActiveTab={setActiveTab}
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
          />
        ) : (
          <div className="py-24 text-center max-w-xl mx-auto px-4">
            <h3 className="text-xl font-serif font-black text-crimson uppercase tracking-wider mb-2">Access Restricted</h3>
            <p className="text-xs sm:text-sm text-slate-605 text-slate-600 mb-6">
              {isBangla ? 'স্টুডেন্ট পোর্টাল ড্যাশবোর্ড দেখতে অনুগ্রহ করে আপনার অফিসিয়াল পাসপোর্টে সাইন-ইন করুন।' : 'Please log in with your authorized credentials to view student dashboard portal details.'}
            </p>
            <button onClick={() => setIsAuthOpen(true)} className="bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-widest text-xs font-bold px-5 py-3 rounded transition-all cursor-pointer">
              {isBangla ? 'স্টুডেন্ট লগইন' : 'Student Sign In'}
            </button>
          </div>
        );
      case 'materials':
        return user ? (
          <CourseMaterials
            user={user}
            courses={COURSES}
            isBangla={isBangla}
          />
        ) : (
          <div className="py-24 text-center max-w-xl mx-auto px-4">
            <h3 className="text-xl font-serif font-black text-crimson uppercase tracking-wider mb-2">Access Restricted</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              {isBangla ? 'কোর্সের ফাইল এবং ডিজিটাল উপাদান দেখতে অনুগ্রহ করে পাসপোর্টে সাইন-ইন করুন।' : 'Access to core training blueprints is strictly reserved for authorized linked student profiles.'}
            </p>
            <button onClick={() => setIsAuthOpen(true)} className="bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-widest text-xs font-bold px-5 py-3 rounded transition-all cursor-pointer">
              {isBangla ? 'স্টুডেন্ট লগইন' : 'Student Sign In'}
            </button>
          </div>
        );
      case 'exams':
        return (
          <ExamSchedule
            courses={COURSES}
            isBangla={isBangla}
          />
        );
      case 'calendar':
        return (
          <AssignmentCalendar
            assignments={assignments}
            courses={COURSES}
            isBangla={isBangla}
            onAddAssignment={handleAddAssignment}
            onToggleComplete={handleToggleComplete}
            onDeleteAssignment={handleDeleteAssignment}
          />
        );
      case 'notifications':
        return (
          <NotificationCenter
            notifications={notifications}
            isBangla={isBangla}
            onMarkAsRead={(id) => {
              handleMarkAsRead(id);
              const notice = notifications.find(n => n.id === id);
              if (notice) setSelectedNotice(notice);
            }}
            onMarkAllAsRead={handleMarkAllAsRead}
            onDismiss={handleDismissNotice}
          />
        );
      default:
        return (
          <LandingPage
            isBangla={isBangla}
            onOpenAuth={() => setIsAuthOpen(true)}
            setActiveTab={setActiveTab}
            notifications={notifications}
            onSelectNotice={setSelectedNotice}
            onSelectInfo={setInfoModalKey}
          />
        );
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-harvard-offwhite text-slate-900 flex">
        {/* Left Sidebar */}
        <StudentSidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setActiveSubTab={setActiveSubTab}
          onLogout={handleLogout}
          isBangla={isBangla}
          unreadCount={unreadNotificationsCount}
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-20 md:pb-0">
          {/* Compact Top Bar */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center space-x-3">
              <h2 className="text-xs sm:text-sm font-serif font-black text-slate-800 uppercase tracking-tight hidden sm:block">
                {isBangla ? 'স্টুডেন্ট পোর্টাল ড্যাশবোর্ড' : 'Student Portal Dashboard'}
              </h2>
            </div>

            {/* Search Bar - Inline on desktop, icon on mobile */}
            <div className="flex-1 max-w-xs mx-3 sm:mx-4">
              <button
                onClick={() => { setIsPortalSearchOpen(true); setPortalSearchQuery(''); }}
                className="w-full flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-400 transition-all cursor-pointer shadow-sm group"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-crimson transition-colors shrink-0" />
                <span className="font-sans text-[11px] truncate">
                  {isBangla ? 'পোর্টাল সার্চ করুন...' : 'Search portal pages, assignments...'}
                </span>
                <kbd className="ml-auto text-[9px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 hidden sm:block">⌘K</kbd>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Language toggle */}
              <button
                onClick={() => setIsBangla(!isBangla)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-slate-700 transition-all cursor-pointer shadow-sm"
              >
                <Languages className="w-3.5 h-3.5 text-crimson" />
                <span className="hidden sm:inline">{isBangla ? 'ENGLISH' : 'বাংলা'}</span>
              </button>
              
              {/* User profile badge */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-red-400 font-bold border border-slate-700 overflow-hidden font-serif">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user.name.charAt(0)}</span>
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 max-w-[120px]">{user.name}</h4>
                  <p className="text-[10px] text-slate-500 font-mono">{user.studentId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ====== COMPREHENSIVE PORTAL SEARCH MODAL ====== */}
          {isPortalSearchOpen && (
            <div
              className="fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-sm flex items-start justify-center pt-10 sm:pt-16 px-3 sm:px-4"
              onClick={() => setIsPortalSearchOpen(false)}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-xl border border-slate-200 overflow-hidden"
                style={{ maxHeight: 'calc(100vh - 80px)' }}
                onClick={e => e.stopPropagation()}
              >
                {/* Search Input Header */}
                <div className="flex items-center space-x-3 px-4 py-3.5 border-b border-slate-100 bg-white">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={portalSearchQuery}
                    onChange={e => setPortalSearchQuery(e.target.value)}
                    placeholder={isBangla ? 'অ্যাসাইনমেন্ট, পরীক্ষা, নোটিশ, কোর্স খুঁজুন...' : 'Search assignments, exams, notices, courses...'}
                    className="flex-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-sans bg-transparent"
                    onKeyDown={e => e.key === 'Escape' && setIsPortalSearchOpen(false)}
                  />
                  {portalSearchQuery && (
                    <button onClick={() => setPortalSearchQuery('')} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsPortalSearchOpen(false)}
                    className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border-l border-slate-100 pl-3 ml-1"
                  >
                    <span className="text-[10px] font-mono">ESC</span>
                  </button>
                </div>

                {/* Search Results */}
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                  {(() => {
                    const q = portalSearchQuery.toLowerCase().trim();

                    const PORTAL_PAGES = [
                      { id: 'dashboard',     icon: '🏠', labelEn: 'My Portal Dashboard',             labelBn: 'আমার পোর্টাল ড্যাশবোর্ড',    descEn: 'Overview, attendance, grades, profile',   descBn: 'ওভারভিউ, উপস্থিতি, গ্রেড, প্রোফাইল' },
                      { id: 'materials',     icon: '📚', labelEn: 'Course Materials & Lecture Notes', labelBn: 'কোর্স ফাইল ও লেকচার নোটস',  descEn: 'PDFs, notes for all subjects',            descBn: 'পিডিএফ ও নোট সব বিষয়ের' },
                      { id: 'exams',         icon: '📝', labelEn: 'Exam Schedule & Routines',         labelBn: 'পরীক্ষার রুটিন',              descEn: 'Midterm, final, lab exam timetable',      descBn: 'মিডটার্ম, ফাইনাল, ল্যাব পরীক্ষা' },
                      { id: 'calendar',      icon: '📅', labelEn: 'Assignment Calendar',              labelBn: 'অ্যাসাইনমেন্ট ক্যালেন্ডার', descEn: 'View and manage assignments by due date', descBn: 'ডিউ ডেট অনুযায়ী অ্যাসাইনমেন্ট' },
                      { id: 'notifications', icon: '🔔', labelEn: 'Announcements & Notice Board',     labelBn: 'নোটিশ বোর্ড ও বিজ্ঞপ্তি',   descEn: 'Official GSC notices and updates',        descBn: 'কলেজের অফিসিয়াল নোটিশ' },
                    ];

                    const pageResults     = q ? PORTAL_PAGES.filter(p => p.labelEn.toLowerCase().includes(q) || p.labelBn.includes(q) || p.descEn.toLowerCase().includes(q) || p.descBn.includes(q)) : PORTAL_PAGES;
                    const assignmentResults = q ? assignments.filter(a => a.title.toLowerCase().includes(q) || (a.description||'').toLowerCase().includes(q) || a.courseCode.toLowerCase().includes(q) || (a.dueDate||'').includes(q)) : [];
                    const courseResults   = q ? COURSES.filter(c => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)) : [];

                    const materialResults: { mat: { id: string; title: string; type: string; courseCode: string; fileSize: string; downloadUrl: string }; courseTitle: string }[] = [];
                    if (q) COURSES.forEach(c => (c.materials||[]).forEach(m => { if (m.title.toLowerCase().includes(q) || m.courseCode.toLowerCase().includes(q) || m.type.toLowerCase().includes(q)) materialResults.push({ mat: m, courseTitle: c.title }); }));

                    const examResults: { exam: { id: string; courseCode: string; courseTitle: string; type: string; dateTime: string; room: string; instructions: string }; courseTitle: string }[] = [];
                    if (q) COURSES.forEach(c => (c.exams||[]).forEach(ex => { if (ex.courseTitle.toLowerCase().includes(q) || ex.type.toLowerCase().includes(q) || ex.courseCode.toLowerCase().includes(q) || (ex.room||'').toLowerCase().includes(q)) examResults.push({ exam: ex, courseTitle: c.title }); }));

                    const noticeResults   = q ? notifications.filter(n => n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q) || (n.category||'').toLowerCase().includes(q) || (n.memoNo||'').toLowerCase().includes(q)) : [];

                    const totalCount = pageResults.length + assignmentResults.length + courseResults.length + materialResults.length + examResults.length + noticeResults.length;

                    if (q && totalCount === 0) {
                      return (
                        <div className="py-14 flex flex-col items-center justify-center space-y-2">
                          <span className="text-4xl">😕</span>
                          <p className="text-sm font-semibold text-slate-500">{isBangla ? 'কোনো ফলাফল নেই' : 'No results found'}</p>
                          <p className="text-xs text-slate-400">{isBangla ? `"${portalSearchQuery}" এর জন্য কিছু মেলেনি` : `Nothing matched "${portalSearchQuery}"`}</p>
                        </div>
                      );
                    }

                    if (!q) {
                      return (
                        <div className="py-5 px-4 space-y-1">
                          <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-3 px-1">{isBangla ? 'দ্রুত নেভিগেট করুন' : 'Quick Navigation'}</p>
                          {PORTAL_PAGES.map(page => (
                            <button key={page.id} onClick={() => { setActiveTab(page.id); setIsPortalSearchOpen(false); setPortalSearchQuery(''); }}
                              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer group">
                              <span className="text-lg leading-none">{page.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-slate-700 group-hover:text-crimson truncate">{isBangla ? page.labelBn : page.labelEn}</p>
                                <p className="text-[10px] text-slate-400 truncate">{isBangla ? page.descBn : page.descEn}</p>
                              </div>
                              <span className="text-[9px] font-mono text-slate-300">↵</span>
                            </button>
                          ))}
                          <p className="text-[10px] text-slate-300 text-center font-mono pt-3">{isBangla ? 'Exam, Notice, Course, Assignment দিয়ে সার্চ করুন' : 'Try: "physics", "exam", "assignment", "notice"'}</p>
                        </div>
                      );
                    }

                    const SectionHeader = ({ label, count }: { label: string; count: number }) => (
                      <div className="px-4 py-1.5 bg-slate-50 border-y border-slate-100">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">{label}</span>
                        <span className="ml-1.5 text-[9px] font-mono text-slate-300">({count})</span>
                      </div>
                    );

                    const hl = (text: string) => {
                      const idx = text.toLowerCase().indexOf(q);
                      if (idx === -1) return <>{text}</>;
                      return <>{text.slice(0, idx)}<mark className="bg-yellow-100 text-yellow-800 rounded-sm">{text.slice(idx, idx + q.length)}</mark>{text.slice(idx + q.length)}</>;
                    };

                    return (
                      <div>
                        {pageResults.length > 0 && (
                          <div>
                            <SectionHeader label={isBangla ? 'পোর্টাল পেজ' : 'Portal Pages'} count={pageResults.length} />
                            {pageResults.map(page => (
                              <button key={page.id} onClick={() => { setActiveTab(page.id); setIsPortalSearchOpen(false); setPortalSearchQuery(''); }}
                                className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left cursor-pointer group border-b border-slate-50">
                                <span className="text-base leading-none shrink-0">{page.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-slate-800 group-hover:text-crimson truncate">{isBangla ? page.labelBn : page.labelEn}</p>
                                  <p className="text-[10px] text-slate-400 truncate">{isBangla ? page.descBn : page.descEn}</p>
                                </div>
                                <span className="shrink-0 text-[9px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">PAGE</span>
                              </button>
                            ))}
                          </div>
                        )}
                        {assignmentResults.length > 0 && (
                          <div>
                            <SectionHeader label={isBangla ? 'অ্যাসাইনমেন্ট' : 'Assignments'} count={assignmentResults.length} />
                            {assignmentResults.map(a => (
                              <button key={a.id} onClick={() => { setActiveTab('calendar'); setIsPortalSearchOpen(false); setPortalSearchQuery(''); }}
                                className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left cursor-pointer group border-b border-slate-50">
                                <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-0.5 ${a.priority === 'high' ? 'bg-red-400' : a.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-slate-800 group-hover:text-crimson truncate">{hl(a.title)}</p>
                                  <p className="text-[10px] text-slate-400 truncate">{a.courseCode} · Due: {a.dueDate}{a.completed && <span className="ml-1 text-green-500">✓</span>}</p>
                                </div>
                                <span className="shrink-0 text-[9px] font-mono text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">TASK</span>
                              </button>
                            ))}
                          </div>
                        )}
                        {courseResults.length > 0 && (
                          <div>
                            <SectionHeader label={isBangla ? 'কোর্সসমূহ' : 'Courses'} count={courseResults.length} />
                            {courseResults.map(c => (
                              <button key={c.id} onClick={() => { setActiveTab('materials'); setIsPortalSearchOpen(false); setPortalSearchQuery(''); }}
                                className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left cursor-pointer group border-b border-slate-50">
                                <span className="text-base leading-none shrink-0">📖</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-slate-800 group-hover:text-crimson truncate">{hl(c.title)}</p>
                                  <p className="text-[10px] text-slate-400">{c.code} · Semester {c.semester} · {c.credit} Credits</p>
                                </div>
                                <span className="shrink-0 text-[9px] font-mono text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">COURSE</span>
                              </button>
                            ))}
                          </div>
                        )}
                        {materialResults.length > 0 && (
                          <div>
                            <SectionHeader label={isBangla ? 'লেকচার ম্যাটেরিয়াল' : 'Course Materials'} count={materialResults.length} />
                            {materialResults.map(({ mat, courseTitle }) => (
                              <button key={mat.id} onClick={() => { setActiveTab('materials'); setIsPortalSearchOpen(false); setPortalSearchQuery(''); }}
                                className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left cursor-pointer group border-b border-slate-50">
                                <span className="text-base leading-none shrink-0">{mat.type === 'pdf' ? '📄' : mat.type === 'video' ? '🎬' : '📋'}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-slate-800 group-hover:text-crimson truncate">{hl(mat.title)}</p>
                                  <p className="text-[10px] text-slate-400 truncate">{mat.courseCode} · {courseTitle} · {mat.fileSize}</p>
                                </div>
                                <span className="shrink-0 text-[9px] font-mono text-purple-500 bg-purple-50 px-1.5 py-0.5 rounded uppercase">{mat.type}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        {examResults.length > 0 && (
                          <div>
                            <SectionHeader label={isBangla ? 'পরীক্ষার সূচী' : 'Exam Schedule'} count={examResults.length} />
                            {examResults.map(({ exam }) => (
                              <button key={exam.id} onClick={() => { setActiveTab('exams'); setIsPortalSearchOpen(false); setPortalSearchQuery(''); }}
                                className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left cursor-pointer group border-b border-slate-50">
                                <span className="text-base leading-none shrink-0">📝</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-slate-800 group-hover:text-crimson truncate">{hl(exam.courseTitle)} — {hl(exam.type)}</p>
                                  <p className="text-[10px] text-slate-400 truncate">{exam.courseCode} · {exam.room} · {new Date(exam.dateTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                </div>
                                <span className="shrink-0 text-[9px] font-mono text-red-500 bg-red-50 px-1.5 py-0.5 rounded">EXAM</span>
                              </button>
                            ))}
                          </div>
                        )}
                        {noticeResults.length > 0 && (
                          <div>
                            <SectionHeader label={isBangla ? 'নোটিশ ও বিজ্ঞপ্তি' : 'Notices'} count={noticeResults.length} />
                            {noticeResults.map(n => (
                              <button key={n.id} onClick={() => { setActiveTab('notifications'); setIsPortalSearchOpen(false); setPortalSearchQuery(''); }}
                                className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left cursor-pointer group border-b border-slate-50">
                                <span className="text-base leading-none shrink-0">{n.category === 'exam' ? '📝' : n.category === 'admission' ? '🎓' : '📢'}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-slate-800 group-hover:text-crimson line-clamp-1">{hl(n.title)}</p>
                                  <p className="text-[10px] text-slate-400 truncate">
                                    {n.memoNo ? `${n.memoNo} · ` : ''}{new Date(n.date).toLocaleDateString('en-GB')}
                                    {!n.read && <span className="ml-2 text-blue-500 font-bold">● NEW</span>}
                                  </p>
                                </div>
                                <span className="shrink-0 text-[9px] font-mono text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded uppercase">{n.category}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono shrink-0">
                  <span>{isBangla ? 'ক্লিক করে পেজে যান' : 'Click a result to navigate'}</span>
                  <span>ESC {isBangla ? 'বন্ধ করুন' : 'to close'}</span>
                </div>
              </div>
            </div>
          )}
          {/* ====== END COMPREHENSIVE SEARCH ====== */}

          {/* Main content body */}

          <main className="flex-grow overflow-y-auto">
            <div className="animate-fade-in">
              {renderTabContent()}
            </div>
          </main>

          {/* Compact dashboard footer */}
          <footer className="bg-slate-50 border-t border-slate-200 py-3 text-center text-[10px] text-slate-500 font-mono shrink-0">
            {isBangla ? '© ২০২৬ সরকারি বিজ্ঞান কলেজ। সর্বস্বত্ব সংরক্ষিত।' : '© 2026 Government Science College. All Rights Reserved.'}
          </footer>
        </div>

        {/* Official GSC Notice Detailed Memo Modal */}
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-white border border-slate-350 rounded shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto print:p-0 print:border-0 print:shadow-none print:max-h-full">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedNotice(null)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-crimson hover:bg-slate-50 rounded transition-colors cursor-pointer print:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Printable Memo Content */}
              <div id="printable-memo" className="space-y-6 text-left font-serif leading-relaxed text-slate-955">
                <div className="text-center border-b-2 border-slate-950 pb-5 space-y-1">
                  <div className="font-sans text-[10px] tracking-widest font-black uppercase text-slate-500 flex items-center justify-center space-x-1">
                    <span>GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase text-crimson tracking-tight">
                    Office of the Principal
                  </h2>
                  <h1 className="text-lg sm:text-xl font-bold uppercase text-slate-905 leading-none">
                    Government Science College
                  </h1>
                  <p className="font-sans text-[10px] text-slate-500 uppercase tracking-wider">
                    Tejgaon, Dhaka-1215 • Estd. 1954 • Board Code: 1008
                  </p>
                </div>

                <div className="flex justify-between items-baseline text-xs font-sans text-slate-700 border-b border-slate-205 pb-2">
                  <div>
                    <span className="font-bold">Memo No: </span>
                    <span className="font-mono">{selectedNotice.memoNo || 'GSC/Admin/2026/01'}</span>
                  </div>
                  <div>
                    <span className="font-bold">Date: </span>
                    <span>{new Date(selectedNotice.date).toLocaleDateString(isBangla ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="inline-block bg-crimson/10 text-crimson text-[9px] font-sans font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Official Notification ({selectedNotice.category})
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-905 border-l-4 border-crimson pl-3">
                    {selectedNotice.title}
                  </h3>
                </div>

                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans space-y-4 pt-2">
                  <p className="whitespace-pre-line leading-relaxed">
                    {isBangla 
                      ? (selectedNotice.detailsBn || selectedNotice.message) 
                      : (selectedNotice.detailsEn || selectedNotice.message)}
                  </p>
                </div>

                <div className="pt-8 flex justify-end">
                  <div className="text-center font-sans space-y-1 w-52 border-t border-dashed border-slate-400 pt-3">
                    <div className="h-6 flex items-center justify-center">
                      <span className="text-[9px] border border-crimson/40 text-crimson rounded px-2.5 py-0.5 uppercase tracking-widest font-mono scale-90 font-bold bg-crimson/5">
                        GSC SEAL APPROVED
                      </span>
                    </div>
                    <h4 className="font-serif font-black text-xs text-slate-905">
                      {selectedNotice.issuedBy || 'Prof. Salma Begum'}
                    </h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                      {isBangla ? 'অধ্যক্ষ' : 'Principal'}
                    </p>
                    <p className="text-[8px] text-slate-400 font-medium leading-none">
                      Government Science College
                    </p>
                  </div>
                </div>
              </div>

              {/* Print Actions */}
              <div className="mt-8 border-t border-slate-100 pt-4 flex justify-between gap-4 print:hidden">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-all cursor-pointer border border-slate-250"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-crimson hover:bg-crimson-dark text-white text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all cursor-pointer shadow flex items-center space-x-1.5"
                >
                  <Printer className="w-4 h-4 text-white" />
                  <span>Print/Download Memo</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Global GSC Ai Assistant Chatbot — Portal Mode with Action Capabilities */}
        <GscAiChat
          isBangla={isBangla}
          portalActions={{
            assignments,
            courses: COURSES,
            onAdd: handleAddAssignment,
            onDelete: handleDeleteAssignment,
            onComplete: handleToggleComplete
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-harvard-offwhite text-slate-900 flex flex-col justify-between">
      
      {/* Main sticky localized header navbar */}
      <Header
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBangla={isBangla}
        setIsBangla={setIsBangla}
        unreadCount={unreadNotificationsCount}
      />

      {/* Primary Dynamic Main Body section with quick layout animation */}
      <main className="flex-grow">
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </main>

      {/* Shared physical location details footer map block */}
      <Footer isBangla={isBangla} />

      {/* Global popup authorization modal drawer */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        isBangla={isBangla}
      />

      {/* Official GSC Notice Detailed Memo Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-slate-350 rounded shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto print:p-0 print:border-0 print:shadow-none print:max-h-full">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedNotice(null)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-crimson hover:bg-slate-50 rounded transition-colors cursor-pointer print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print Friendly Memo Wrapper */}
            <div id="printable-memo" className="space-y-6 text-left font-serif leading-relaxed text-slate-955">
              
              {/* Memo Header */}
              <div className="text-center border-b-2 border-slate-950 pb-5 space-y-1">
                <div className="font-sans text-[10px] tracking-widest font-black uppercase text-slate-500 flex items-center justify-center space-x-1">
                  <span>GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase text-crimson tracking-tight">
                  Office of the Principal
                </h2>
                <h1 className="text-lg sm:text-xl font-bold uppercase text-slate-905 leading-none">
                  Government Science College
                </h1>
                <p className="font-sans text-[10px] text-slate-500 uppercase tracking-wider">
                  Tejgaon, Dhaka-1215 • Estd. 1954 • Board Code: 1008
                </p>
              </div>

              {/* Memo Meta Row */}
              <div className="flex justify-between items-baseline text-xs font-sans text-slate-700 border-b border-slate-205 pb-2">
                <div>
                  <span className="font-bold">Memo No: </span>
                  <span className="font-mono">{selectedNotice.memoNo || 'GSC/Admin/2026/01'}</span>
                </div>
                <div>
                  <span className="font-bold">Date: </span>
                  <span>{new Date(selectedNotice.date).toLocaleDateString(isBangla ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Notice Title */}
              <div className="space-y-2">
                <div className="inline-block bg-crimson/10 text-crimson text-[9px] font-sans font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Official Notification ({selectedNotice.category})
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-905 border-l-4 border-crimson pl-3">
                  {selectedNotice.title}
                </h3>
              </div>

              {/* Notice Details Content */}
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans space-y-4 pt-2">
                <p className="whitespace-pre-line leading-relaxed">
                  {isBangla 
                    ? (selectedNotice.detailsBn || selectedNotice.message) 
                    : (selectedNotice.detailsEn || selectedNotice.message)}
                </p>
              </div>

              {/* Official Signatures Footer */}
              <div className="pt-8 flex justify-end">
                <div className="text-center font-sans space-y-1 w-52 border-t border-dashed border-slate-400 pt-3">
                  {/* Digital seal graphic represent */}
                  <div className="h-6 flex items-center justify-center">
                    <span className="text-[9px] border border-crimson/40 text-crimson rounded px-2.5 py-0.5 uppercase tracking-widest font-mono scale-90 font-bold bg-crimson/5">
                      GSC SEAL APPROVED
                    </span>
                  </div>
                  <h4 className="font-serif font-black text-xs text-slate-905">
                    {selectedNotice.issuedBy || 'Prof. Salma Begum'}
                  </h4>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                    {isBangla ? 'অধ্যক্ষ' : 'Principal'}
                  </p>
                  <p className="text-[8px] text-slate-400 font-medium leading-none">
                    Government Science College
                  </p>
                </div>
              </div>

            </div>

            {/* Print & Action Buttons */}
            <div className="mt-8 border-t border-slate-100 pt-4 flex justify-between gap-4 print:hidden">
              <button
                onClick={() => setSelectedNotice(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-all cursor-pointer border border-slate-250"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="bg-crimson hover:bg-crimson-dark text-white text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all cursor-pointer shadow flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4 text-white" />
                <span>Print/Download Memo</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* GSC Institutional Info Sheet Modal */}
      {infoModalKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-slate-300 rounded shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto text-left">
            
            {/* Close Button */}
            <button 
              onClick={() => setInfoModalKey(null)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-crimson hover:bg-slate-50 rounded transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Render different info text depending on infoModalKey */}
            <div className="space-y-6">
              
              {infoModalKey === 'history' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="text-[9px] text-crimson font-mono tracking-wider font-bold uppercase">
                      {isBangla ? 'কলেজ সৃষ্টির ইতিহাস' : 'HISTORY & LEGACY'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-905 mt-1">
                      {isBangla ? 'সরকারি বিজ্ঞান কলেজের ইতিহাস' : 'History of Government Science College'}
                    </h3>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans space-y-3">
                    <p>
                      {isBangla 
                        ? '১৯৫৪ সালে কলম্বো প্ল্যানের অধীনে এবং ফোর্ড ফাউন্ডেশনের সহায়তায় ঢাকার তেজগাঁও শিল্প এলাকায় একটি "টেকনিক্যাল হাই স্কুল" হিসেবে এই স্বনামধন্য প্রতিষ্ঠানটির যাত্রা শুরু হয়।' 
                        : 'The prestigious institution began its journey in 1954 as a "Technical High School" under the Commonwealth Colombo Plan in the Tejgaon industrial area of Dhaka, with financial and technical support from the Ford Foundation.'}
                    </p>
                    <p>
                      {isBangla 
                        ? '১৯৬২ সালে তৎকালীন পূর্ব পাকিস্তান কারিগরি শিক্ষা অধিদপ্তরের অধীনে স্কুলটিকে উন্নীত করে "ইন্টারমিডিয়েট টেকনিক্যাল কলেজ" নামকরণ করা হয়। এটি ছিল ঢাকা শহরের একমাত্র উচ্চ মাধ্যমিক কলেজ যা বিজ্ঞান, প্রযুক্তি এবং মৌলিক প্রকৌশলের ওপর বিশেষায়িত শিক্ষা প্রদান করত।' 
                        : 'In 1962, the school was upgraded and renamed "Intermediate Technical College" under the Directorate of Technical Education, East Pakistan. It was the only college in Dhaka specializing in intermediate sciences and pre-engineering study tracks.'}
                    </p>
                    <p>
                      {isBangla 
                        ? 'বাংলাদেশ স্বাধীন হওয়ার পর ১৯৭২ সালে কলেজটিতে স্নাতক (পাস) কোর্স চালু করা হয় এবং পরবর্তীতে সাধারণ শিক্ষা ধারায় যুক্ত করে একে "সরকারি বিজ্ঞান কলেজ" হিসেবে শিক্ষা মন্ত্রণালয়ের অধীনে ন্যস্ত করা হয়।' 
                        : 'After the independence of Bangladesh, the college introduced Bachelor of Science (B.Sc.) pass courses in 1972 and was integrated into general higher education under the Ministry of Education as "Government Science College".'}
                    </p>
                    <p>
                      {isBangla
                        ? 'আজ এটি ঢাকার অন্যতম সেরা বিজ্ঞান কলেজ হিসেবে স্বীকৃত, যা বিজ্ঞানমনস্ক ও সুশৃঙ্খল শিক্ষার্থী গঠনে গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে।'
                        : 'Today, GSC stands as a premier public science-only institution, renowned for cultivating academic excellence and producing high-achieving leaders in STEM.'}
                    </p>
                  </div>
                </div>
              )}

              {infoModalKey === 'vision' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="text-[9px] text-crimson font-mono tracking-wider font-bold uppercase">
                      {isBangla ? 'লক্ষ্য ও উদ্দেশ্য' : 'VISION, MISSION & VALUE'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-905 mt-1">
                      {isBangla ? 'আমাদের লক্ষ্য ও উদ্দেশ্য' : 'Vision, Mission & Motto'}
                    </h3>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans space-y-4">
                    <div className="p-4 bg-crimson/5 border-l-4 border-crimson rounded">
                      <p className="font-mono text-xs text-slate-400 font-bold uppercase">{isBangla ? 'কলেজ নীতিবাক্য' : 'College Motto'}</p>
                      <p className="font-serif italic font-black text-sm sm:text-base text-slate-800 mt-1">
                        {isBangla ? '"শৃঙ্খলা, শিক্ষা, চরিত্র ও উন্নয়ন"' : '"Discipline, Education, Character & Development"'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-serif font-bold text-slate-905 text-sm">{isBangla ? 'আমাদের লক্ষ্য' : 'Our Mission'}</h4>
                      <p>
                        {isBangla 
                          ? 'আমাদের লক্ষ্য বিজ্ঞান ও তথ্যপ্রযুক্তিতে আধুনিক ব্যবহারিক শিক্ষা প্রদানের মাধ্যমে শিক্ষার্থীদের বৈজ্ঞানিক অনুসন্ধিৎসা জাগ্রত করা এবং নৈতিক চরিত্রের বিকাশ সাধন করা।'
                          : 'To foster curiosity, analytical logic, and scientific skills through modern lab complexes and rigorous study plans, molding characters ready to lead academic and technological sectors.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {infoModalKey === 'glance' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="text-[9px] text-crimson font-mono tracking-wider font-bold uppercase">
                      {isBangla ? 'এক নজরে সরকারি বিজ্ঞান কলেজ' : 'GSC AT A GLANCE'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-905 mt-1">
                      {isBangla ? 'এক নজরে সকল পরিসংখ্যান' : 'Key Statistics & Info'}
                    </h3>
                  </div>
                  <div className="overflow-hidden border border-slate-200 rounded text-xs font-sans">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="p-3 font-semibold text-slate-600">{isBangla ? 'বিবরণ' : 'Description'}</th>
                          <th className="p-3 font-semibold text-slate-600">{isBangla ? 'তথ্যাদি' : 'Details'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="p-3 font-medium text-slate-500">{isBangla ? 'ইআইআইএন (EIIN)' : 'EIIN Code'}</td>
                          <td className="p-3 font-mono font-bold text-slate-850">108535</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-500">{isBangla ? 'বোর্ড কোড' : 'Board College Code'}</td>
                          <td className="p-3 font-mono font-bold text-slate-850">1008</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-500">{isBangla ? 'মোট আয়তন' : 'Campus Size'}</td>
                          <td className="p-3 font-mono font-bold text-slate-850">{isBangla ? '৯ একর' : '9 Acres'}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-500">{isBangla ? 'মোট শিক্ষার্থী' : 'Student Capacity'}</td>
                          <td className="p-3 font-mono font-bold text-slate-850">3,200+</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-500">{isBangla ? 'হোস্টেল সুবিধা' : 'Dormitory Blocks'}</td>
                          <td className="p-3 text-slate-850">{isBangla ? '২টি ছাত্রাবাস' : '2 Residential Hostels'}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-500">{isBangla ? 'ল্যাবরেটরি সংখ্যা' : 'Laboratory Complexes'}</td>
                          <td className="p-3 text-slate-850">{isBangla ? '১২টি সক্রিয় ল্যাব' : '12 Active Science Labs'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {infoModalKey === 'infrastructure' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="text-[9px] text-crimson font-mono tracking-wider font-bold uppercase">
                      {isBangla ? 'প্রাতিষ্ঠানিক অবকাঠামো' : 'CAMPUS INFRASTRUCTURE'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-905 mt-1">
                      {isBangla ? 'আমাদের অবকাঠামোগত সুযোগ-সুবিধা' : 'GSC Infrastructure Details'}
                    </h3>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans space-y-3">
                    <p>
                      {isBangla 
                        ? 'সরকারি বিজ্ঞান কলেজের তেজগাঁও ক্যাম্পাসটি প্রায় ৯ একর জায়গাজুড়ে বিস্তৃত। এর অবকাঠামোর মধ্যে রয়েছে:' 
                        : 'The campus spans approximately 9 acres in the heart of Dhaka. Its physical learning framework is highly equipped:'}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-650">
                      <li><strong>{isBangla ? 'বিজ্ঞান গবেষণাগার:' : 'Science Labs:'}</strong> {isBangla ? 'পদার্থবিজ্ঞান, রসায়ন, গণিত, আইসিটি, উদ্ভিদবিজ্ঞান এবং প্রাণিবিজ্ঞান বিভাগের জন্য আলাদা সুসজ্জিত কারিগরি ল্যাবরেটরি।' : 'Separate dedicated labs for Physics, Chemistry, Zoology, Botany, and two modern Computer/ICT lab facilities.'}</li>
                      <li><strong>{isBangla ? 'ছাত্রাবাস (হোস্টেল):' : 'Student Dorms:'}</strong> {isBangla ? 'দূরবর্তী শিক্ষার্থীদের জন্য দুটি বৃহৎ আবাসিক ছাত্রাবাস (কাজী নজরুল ইসলাম হোস্টেল ও ড. কুদরত-ই-খুদা হোস্টেল)।' : 'Two large residential student hostels (Kazi Nazrul Islam Hostel and Dr. Qudrat-i-Khuda Hostel) providing affordable lodging.'}</li>
                      <li><strong>{isBangla ? 'অন্যান্য সুবিধা:' : 'Other Facilities:'}</strong> {isBangla ? 'একটি আধুনিক মিলনায়তন (অডিটোরিয়াম), বিশাল খেলার মাঠ, জিমনেসিয়াম, ছাত্র সংসদ কক্ষ এবং সমৃদ্ধ সেন্ট্রাল লাইব্রেরি।' : 'A spacious assembly auditorium, sports field, fully equipped gym block, and a central academic library housing over 15,000 reference resources.'}</li>
                    </ul>
                  </div>
                </div>
              )}

              {infoModalKey === 'rti' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="text-[9px] text-crimson font-mono tracking-wider font-bold uppercase">
                      {isBangla ? 'তথ্য অধিকার কর্মকর্তা' : 'RIGHT TO INFORMATION'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-905 mt-1">
                      {isBangla ? 'তথ্য প্রদানকারী কর্মকর্তা ও আপীল কর্তৃপক্ষ' : 'RTI Information Directory'}
                    </h3>
                  </div>
                  <div className="space-y-4 text-xs sm:text-sm">
                    <div className="bg-slate-50 p-4 border border-slate-200 rounded text-left">
                      <h4 className="font-serif font-bold text-slate-905 text-sm">{isBangla ? 'তথ্য প্রদানকারী কর্মকর্তা (RTI Officer)' : 'RTI Designated Officer'}</h4>
                      <p className="mt-1"><strong>{isBangla ? 'নাম:' : 'Name:'}</strong> {isBangla ? 'প্রভাশ কুমার রায়' : 'Probhash Kumar Roy'}</p>
                      <p><strong>{isBangla ? 'পদবী:' : 'Designation:'}</strong> {isBangla ? 'সহযোগী অধ্যাপক, পদার্থবিজ্ঞান বিভাগ' : 'Associate Professor, Physics Department'}</p>
                      <p><strong>{isBangla ? 'অফিসিয়াল ইমেইল:' : 'Official Email:'}</strong> rti.officer@gsctd.edu.bd</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-slate-200 rounded text-left">
                      <h4 className="font-serif font-bold text-slate-905 text-sm">{isBangla ? 'আপীল কর্তৃপক্ষ (Appellate Authority)' : 'Appellate Authority'}</h4>
                      <p className="mt-1"><strong>{isBangla ? 'নাম:' : 'Name:'}</strong> {isBangla ? 'প্রফেসর সালমা বেগম' : 'Prof. Salma Begum'}</p>
                      <p><strong>{isBangla ? 'পদবী:' : 'Designation:'}</strong> {isBangla ? 'অধ্যক্ষ, সরকারি বিজ্ঞান কলেজ' : 'Principal, Govt. Science College'}</p>
                      <p><strong>{isBangla ? 'যোগাযোগ:' : 'Contact:'}</strong> principal@gsctd.edu.bd</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="mt-8 border-t border-slate-100 pt-4 text-right">
              <button
                onClick={() => setInfoModalKey(null)}
                className="bg-crimson hover:bg-crimson-dark text-white text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all cursor-pointer shadow"
              >
                {isBangla ? 'বন্ধ করুন' : 'Close Sheet'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global GSC Ai Assistant Chatbot — Guest Mode (info only) */}
      <GscAiChat isBangla={isBangla} />
    </div>
  );
}
