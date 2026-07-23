import React, { useState, useEffect } from 'react';
import { 
  Landmark, LogOut, User as UserIcon, Bell, Menu, X, Languages, Sparkles, Search, 
  GraduationCap, BookOpen, FileText, PhoneCall, Building2, ChevronRight, ExternalLink,
  Info, HelpCircle, Calendar, Award, Bot, ArrowUp
} from 'lucide-react';
import { User } from '../types/academic';
import { DEPARTMENTS, INITIAL_NOTIFICATIONS } from '../data/mockData';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isBangla: boolean;
  setIsBangla: (val: boolean) => void;
  unreadCount: number;
}

interface SearchableItem {
  id: string;
  titleEn: string;
  titleBn: string;
  categoryEn: string;
  categoryBn: string;
  descEn?: string;
  descBn?: string;
  tab?: string;
  url?: string;
  icon?: any;
  action?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onOpenAuth,
  activeTab,
  setActiveTab,
  isBangla,
  setIsBangla,
  unreadCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Scroll detection for Smart Sticky Header on Scroll Up
  const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 120) {
        setIsSticky(false);
        setIsVisible(true);
      } else {
        setIsSticky(true);
        // Scrolling up -> show sticky top navigation bar
        if (currentScrollY < lastScrollY - 5) {
          setIsVisible(true);
        } 
        // Scrolling down -> hide navigation bar
        else if (currentScrollY > lastScrollY + 5) {
          setIsVisible(false);
          setActiveDropdown(null);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuStructure = [
    { id: 'home', labelEn: 'Home', labelBn: 'প্রথম পাতা', tab: 'home' },
    {
      id: 'about',
      labelEn: 'About Us',
      labelBn: 'আমাদের সম্পর্কে',
      tab: 'about',
      subMenu: [
        { labelEn: 'History of GSC', labelBn: 'সৃষ্টির ইতিহাস', tab: 'about' },
        { labelEn: 'Vision & Mission', labelBn: 'লক্ষ্য ও উদ্দেশ্য', tab: 'about' },
        { labelEn: 'At a Glance', labelBn: 'এক নজরে', tab: 'about' },
        { labelEn: 'Infrastructure', labelBn: 'প্রাতিষ্ঠানিক অবকাঠামো', tab: 'about' }
      ]
    },
    {
      id: 'admin',
      labelEn: 'Administration',
      labelBn: 'প্রশাসন',
      tab: 'administration',
      subMenu: [
        { labelEn: 'Principal Speech', labelBn: 'অধ্যক্ষের বাণী', tab: 'administration' },
        { labelEn: 'Past Principals', labelBn: 'পূর্ববর্তী অধ্যক্ষগণ', tab: 'administration' },
        { labelEn: 'Our Teachers', labelBn: 'আমাদের শিক্ষকবৃন্দ', tab: 'administration' }
      ]
    },
    { id: 'departments', labelEn: 'Departments', labelBn: 'বিভাগসমূহ', tab: 'departments-list' },
    { id: 'academic-menu', labelEn: 'Academic Activities', labelBn: 'একাডেমিক কার্যক্রম', tab: 'academic-info' },
    { id: 'results-menu', labelEn: 'Results', labelBn: 'ফলাফল', tab: 'results' },
    { id: 'resources-menu', labelEn: 'Resources', labelBn: 'রিসোর্স', tab: 'resources-info' },
    { id: 'gallery-menu', labelEn: 'Gallery', labelBn: 'গ্যালারী', tab: 'gallery-info' },
    { id: 'contact-menu', labelEn: 'Contact', labelBn: 'যোগাযোগ', tab: 'contact-info' }
  ];

  const loggedInNavItems = [
    { id: 'dashboard', labelEn: 'My Portal', labelBn: 'আমার পোর্টাল' },
    { id: 'materials', labelEn: 'Course Materials', labelBn: 'কোর্স ফাইল' },
    { id: 'exams', labelEn: 'Exams & Schedules', labelBn: 'পরীক্ষা রুটিন' },
    { id: 'calendar', labelEn: 'Assignment Calendar', labelBn: 'অ্যাসাইনমেন্ট ক্যালেন্ডার' },
  ];

  // Comprehensive Search Index with correct target tab mappings
  const buildSearchableIndex = (): SearchableItem[] => {
    const items: SearchableItem[] = [
      // Site Pages
      { id: 'p-home', titleEn: 'Home Page', titleBn: 'প্রথম পাতা (হোম)', categoryEn: 'Page', categoryBn: 'পেজ', descEn: 'Main campus portal, slider, stats, principal speech', descBn: 'ক্যাম্পাস পোর্টাল, অধ্যক্ষের বাণী ও তথ্য', tab: 'home', icon: Landmark },
      { id: 'p-about', titleEn: 'About Government Science College', titleBn: 'আমাদের সম্পর্কে (জিএসসি ইতিহাস)', categoryEn: 'Page', categoryBn: 'পেজ', descEn: 'History, Vision, Mission, Infrastructure (ESTD 1954)', descBn: '১৯৫৪ সালের সৃষ্টির ইতিহাস, অবকাঠামো ও বিবরণ', tab: 'about', icon: Info },
      { id: 'p-admin', titleEn: 'College Administration & Faculty', titleBn: 'প্রশাসন ও শিক্ষকবৃন্দ', categoryEn: 'Page', categoryBn: 'পেজ', descEn: 'Principal Prof. Salma Begum, HODs, Teachers list', descBn: 'অধ্যক্ষ প্রফেসর সালমা বেগম ও শিক্ষক তালিকা', tab: 'administration', icon: Building2 },
      { id: 'p-depts', titleEn: 'Academic Science Departments', titleBn: 'অনুষদ ও বিভাগসমূহ', categoryEn: 'Page', categoryBn: 'পেজ', descEn: 'Physics, Chemistry, Math, ICT, Botany, Zoology labs', descBn: 'পদার্থ, রসায়ন, গণিত, আইসিটি ও জীববিজ্ঞান বিভাগ', tab: 'departments-list', icon: BookOpen },
      { id: 'p-academic', titleEn: 'Academic Activities & Syllabus', titleBn: 'একাডেমিক কার্যক্রম ও নিয়মাবলী', categoryEn: 'Page', categoryBn: 'পেজ', descEn: 'Academic overview, lab safety rules, code of conduct', descBn: 'একাডেমিক নির্দেশিকা, ল্যাব নিয়ম ও কোড অফ কন্ডাক্ট', tab: 'academic-info', icon: Calendar },
      { id: 'p-exams', titleEn: 'Exam Routines & Schedules', titleBn: 'পরীক্ষার রুটিন ও সময়সূচী', categoryEn: 'Exam', categoryBn: 'পরীক্ষা', descEn: 'HSC exam routine, model test & term exam schedule', descBn: 'এইচএসসি ও টার্ম পরীক্ষার সময়সূচী রুটিন', tab: 'exams', icon: Calendar },
      { id: 'p-materials', titleEn: 'Course Materials & Lecture Files', titleBn: 'কোর্স ফাইল ও লেকচার নোটস', categoryEn: 'Study', categoryBn: 'পড়াশোনা', descEn: 'Download chapter PDFs & lecture sheets', descBn: 'অধ্যায়ভিত্তিক নোট ও লেকচার ফাইল', tab: 'materials', icon: FileText },
      { id: 'p-calendar', titleEn: 'Assignment Calendar & Submissions', titleBn: 'অ্যাসাইনমেন্ট ক্যালেন্ডার', categoryEn: 'Calendar', categoryBn: 'ক্যালেন্ডার', descEn: 'Lab report deadlines & assignment submission dates', descBn: 'ল্যাব রিপোর্ট ও অ্যাসাইনমেন্টের জমাদানের তারিখ', tab: 'calendar', icon: Calendar },
      { id: 'p-results', titleEn: 'HSC & College Results Checker', titleBn: 'ফলাফল ও রেজাল্ট সিস্টেম', categoryEn: 'Page', categoryBn: 'পেজ', descEn: 'Student exam marks, CGPA & board grade search', descBn: 'পরীক্ষার নাম্বার ও রেজাল্ট দেখার পদ্ধতি', tab: 'results', icon: Award },
      { id: 'p-resources', titleEn: 'Student Resources & Library', titleBn: 'শিক্ষার্থীদের রিসোর্স ও লাইব্রেরি', categoryEn: 'Page', categoryBn: 'পেজ', descEn: 'Digital syllabus books, lecture notes & e-library', descBn: 'লেকচার নোটস, ডিজিটাল বই ও লাইব্রেরি', tab: 'resources-info', icon: FileText },
      { id: 'p-gallery', titleEn: 'GSC Photo & Campus Gallery', titleBn: 'ফটো গ্যালারী ও চিত্রশালা', categoryEn: 'Page', categoryBn: 'পেজ', descEn: 'Campus life, sports, science fair, BNCC cadets', descBn: 'ক্যাম্পাস জীবন, বিজ্ঞান উৎসব ও ক্যাডেট ছবি', tab: 'gallery-info', icon: Sparkles },
      { id: 'p-contact', titleEn: 'Contact & Campus Map Location', titleBn: 'যোগাযোগ ও মানচিত্র', categoryEn: 'Page', categoryBn: 'পেজ', descEn: 'Tejgaon Farmgate Dhaka-1215, Phone, Helpdesk', descBn: 'তেজগাঁও ফার্মগেট ঠিকানা, ফোন ও মানচিত্র', tab: 'contact-info', icon: PhoneCall },
      { id: 'p-admissions', titleEn: 'HSC Admission Eligibility Advisor', titleBn: 'ভর্তি যোগ্যতা ক্যালকুলেটর', categoryEn: 'Admission', categoryBn: 'ভর্তি', descEn: 'SSC Science minimum GPA 4.00, Math GPA 3.50 cutoff', descBn: 'এসএসসি জিপিএ ৪.০০ ও গণিত জিপিএ ৩.৫০ শর্তাবলী', tab: 'home', icon: GraduationCap },

      // Govt Forms & E-Services
      { id: 's-tr6', titleEn: 'T.R Form No. 6 (Challan Form)', titleBn: 'টি.আর ফর্ম নং ৬ (চালান ফর্ম)', categoryEn: 'Govt Form', categoryBn: 'সরকারি ফর্ম', descEn: 'Official government treasury challan form download', descBn: 'সরকারি ট্রেজারি চালান ফর্ম ডাউনলোড', url: 'http://www.cga.gov.bd/pdf/forms/blank_challan.pdf', icon: FileText },
      { id: 's-mrp', titleEn: 'MRP Passport Application Form', titleBn: 'এমআরপি পাসপোর্ট আবেদন ফর্ম', categoryEn: 'Govt Form', categoryBn: 'সরকারি ফর্ম', descEn: 'Machine Readable Passport form PDF', descBn: 'পাসপোর্ট আবেদন ফর্ম পিডিএফ', url: 'http://www.dip.gov.bd/sites/default/files/MRP%20Application%20Form-combined1%2028-10-10.pdf', icon: FileText },
      { id: 's-birth', titleEn: 'Online Birth & Death Registration', titleBn: 'অনলাইন জন্ম ও মৃত্যু নিবন্ধন (BRIS)', categoryEn: 'E-Service', categoryBn: 'ই-সেবা', descEn: 'BRIS birth certificate portal', descBn: 'অনলাইন জন্ম নিবন্ধনের সরকারি ওয়েবসাইট', url: 'http://bris.lgd.gov.bd/pub/', icon: ExternalLink },
      { id: 's-rail', titleEn: 'Railway E-Ticketing System', titleBn: 'বাংলাদেশ রেলওয়ে অনলাইন টিকিট', categoryEn: 'E-Service', categoryBn: 'ই-সেবা', descEn: 'Train ticket booking portal', descBn: 'অনলাইনে ট্রেনের টিকিট বুকিং', url: 'https://www.esheba.cnsbd.com/', icon: ExternalLink },
      { id: 's-tin', titleEn: 'Income Tax e-TIN Registration', titleBn: 'ই-টিইন আয়কর নিবন্ধন', categoryEn: 'E-Service', categoryBn: 'ই-সেবা', descEn: 'NBR e-TIN certificate registration', descBn: 'এনবিআর ই-টিন সার্টিফিকেট পোর্টাল', url: 'http://secure.incometax.gov.bd/TINHome', icon: ExternalLink },

      // Emergency Hotlines
      { id: 'h-999', titleEn: '999 National Emergency Service', titleBn: '৯৯৯ জাতীয় জরুরি সেবা', categoryEn: 'Hotline', categoryBn: 'জরুরি সেবা', descEn: 'Police, Fire Service, Ambulance (Toll Free)', descBn: 'পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স (টোল ফ্রি)', icon: PhoneCall },
      { id: 'h-333', titleEn: '333 Government Information Portal', titleBn: '৩৩৩ জাতীয় তথ্য বাতায়ন', categoryEn: 'Hotline', categoryBn: 'জরুরি সেবা', descEn: 'Citizen information & govt services helpline', descBn: 'সরকারি সেবা সংক্রান্ত তথ্য ও সহায়তা কল সেন্টার', icon: PhoneCall },
      { id: 'h-109', titleEn: '109 Women & Children Helpline', titleBn: '১০৯ নারী ও শিশু নির্যাতন প্রতিরোধ সেল', categoryEn: 'Hotline', categoryBn: 'জরুরি সেবা', descEn: 'Help center for women and child security', descBn: 'নারী ও শিশু সুরক্ষা কল সেন্টার', icon: PhoneCall },
    ];

    // Append Departments
    DEPARTMENTS.forEach((dept) => {
      items.push({
        id: `dept-${dept.id}`,
        titleEn: `${dept.name} (${dept.code})`,
        titleBn: isBangla && dept.id === 'phy' ? 'পদার্থবিজ্ঞান বিভাগ (PHY)' : isBangla && dept.id === 'che' ? 'রসায়ন বিভাগ (CHE)' : isBangla && dept.id === 'math' ? 'গণিত বিভাগ (MATH)' : isBangla && dept.id === 'ict' ? 'আইসিটি বিভাগ (ICT)' : isBangla && dept.id === 'bot' ? 'উদ্ভিদবিজ্ঞান বিভাগ (BOT)' : isBangla && dept.id === 'zoo' ? 'প্রাণিবিজ্ঞান বিভাগ (ZOO)' : `${dept.name} (${dept.code})`,
        categoryEn: 'Department',
        categoryBn: 'বিভাগ',
        descEn: `${dept.shortDesc} • Head: ${dept.headOfDept}`,
        descBn: `${dept.shortDesc} • বিভাগীয় প্রধান: ${dept.headOfDept}`,
        tab: 'departments-list',
        icon: BookOpen
      });
    });

    // Append Notifications & Notices
    INITIAL_NOTIFICATIONS.forEach((notice) => {
      items.push({
        id: `notice-${notice.id}`,
        titleEn: notice.title,
        titleBn: notice.title,
        categoryEn: 'Notice',
        categoryBn: 'নোটিশ',
        descEn: notice.message,
        descBn: notice.message,
        tab: 'notifications',
        icon: Bell
      });
    });

    return items;
  };

  const searchableIndex = buildSearchableIndex();

  const filteredResults = searchQuery.trim() === '' ? [] : searchableIndex
    .filter((item) => {
      const q = searchQuery.toLowerCase();
      return (
        item.titleEn.toLowerCase().includes(q) ||
        item.titleBn.toLowerCase().includes(q) ||
        item.categoryEn.toLowerCase().includes(q) ||
        item.categoryBn.toLowerCase().includes(q) ||
        (item.descEn && item.descEn.toLowerCase().includes(q)) ||
        (item.descBn && item.descBn.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      const q = searchQuery.toLowerCase();
      const aTitleStart = a.titleEn.toLowerCase().startsWith(q) || a.titleBn.toLowerCase().startsWith(q);
      const bTitleStart = b.titleEn.toLowerCase().startsWith(q) || b.titleBn.toLowerCase().startsWith(q);
      if (aTitleStart && !bTitleStart) return -1;
      if (!aTitleStart && bTitleStart) return 1;
      return 0;
    });

  const handleSelectResult = (item: SearchableItem) => {
    if (item.url) {
      window.open(item.url, '_blank');
    } else if (item.action) {
      item.action();
    } else if (item.tab) {
      setActiveTab(item.tab);
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredResults.length > 0) {
      handleSelectResult(filteredResults[0]);
    }
  };

  return (
    <header id="app-header" className="w-full bg-white text-harvard-charcoal shadow-sm border-b border-slate-200 z-40 relative">

      {/* 3. Majestic Harvard-Style Brand Masthead */}
      <div className="py-3 px-3 sm:py-6 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-3 md:gap-6">
          <div 
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} 
            className="flex items-center space-x-3 sm:space-x-4 cursor-pointer group select-none text-left"
          >
            {/* The Crimson GSC Crest Logo Shield */}
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white p-0.5 shadow-md border border-slate-200 group-hover:border-crimson transition-all transform group-hover:rotate-3 overflow-hidden shrink-0">
              <img 
                src="/images/gsc-logo.png" 
                alt="Government Science College Logo" 
                className="w-full h-full object-contain rounded-full" 
              />
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-2.5">
                <h1 className="text-base sm:text-2xl lg:text-3xl font-serif font-black tracking-tight text-[#A51C30] uppercase leading-tight">
                  {isBangla ? 'সরকারি বিজ্ঞান কলেজ' : 'Government Science College'}
                </h1>
                <span className="hidden sm:inline-block text-[9px] bg-crimson text-white font-mono px-2 py-0.5 rounded font-black uppercase tracking-wider self-center sm:self-auto mt-1.5 sm:mt-0 shadow-sm">
                  ESTD 1954
                </span>
              </div>
              <p className="text-[9px] sm:text-xs text-slate-500 tracking-wider uppercase font-serif font-medium mt-0.5 sm:mt-1">
                {isBangla 
                  ? 'তেজগাঁও, ঢাকা-১২১৫ — শিক্ষা বোর্ড কোড: ১০০৮' 
                  : 'Tejgaon, Dhaka-1215 — Board Code: 1008'}
              </p>
            </div>
          </div>

          {/* Harvard-Style Utility stats */}
          <div className="hidden lg:flex items-center space-x-6 text-right">
            <div className="border-r border-slate-200 pr-6">
              <span className="block text-[10px] text-slate-400 font-serif uppercase tracking-wider">{isBangla ? 'প্রতিষ্ঠিত' : 'Established'}</span>
              <span className="text-sm font-bold text-slate-800 font-serif">1954 AD</span>
            </div>
            <div className="border-r border-slate-200 pr-6">
              <span className="block text-[10px] text-slate-400 font-serif uppercase tracking-wider">{isBangla ? 'মোট শিক্ষার্থী' : 'Students Body'}</span>
              <span className="text-sm font-bold text-crimson uppercase tracking-tight font-mono">3,200+</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-serif uppercase tracking-wider">{isBangla ? 'ফলাফল' : 'HSC Pass Rate'}</span>
              <span className="text-sm font-bold text-emerald-600 font-serif">95.6%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Elegant Harvard Deep Charcoal Navigation Bar Ribbon (Smart Sticky on Scroll Up) */}
      <div 
        className={`bg-harvard-slate text-white py-1 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isSticky 
            ? `fixed top-0 left-0 right-0 z-50 shadow-2xl border-b border-slate-700/80 ${
                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
              }` 
            : 'relative z-20'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Main Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 relative">

            {/* Mini Brand Logo when sticky navbar is active */}
            {isSticky && (
              <div 
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center space-x-2 mr-3 cursor-pointer group shrink-0"
                title="Return to Top Home"
              >
                <img src="/images/gsc-logo.png" alt="GSC" className="w-8 h-8 rounded-full bg-white p-0.5 border border-slate-600 group-hover:border-crimson transition-all transform group-hover:scale-105" />
                <span className="font-serif font-black text-xs text-white uppercase tracking-wider hidden xl:inline">
                  {isBangla ? 'জিএসসি' : 'GSC'}
                </span>
              </div>
            )}

            {menuStructure.map((item) => {
              const hasSub = !!item.subMenu;
              return (
                <div 
                  key={item.id} 
                  className="relative"
                  onMouseEnter={() => hasSub && setActiveDropdown(item.id)}
                  onMouseLeave={() => hasSub && setActiveDropdown(null)}
                >
                  <button
                    id={`nav-${item.id}`}
                    onClick={() => {
                      if (!hasSub) {
                        setActiveTab(item.tab);
                      }
                    }}
                    className={`px-3 py-3 text-[11px] font-mono font-bold uppercase tracking-wider transition-all border-b-2 hover:text-white hover:bg-white/5 flex items-center space-x-1 ${
                      activeTab === item.tab
                        ? 'border-crimson text-white bg-slate-800/40' 
                        : 'border-transparent text-slate-300'
                    }`}
                  >
                    <span>{isBangla ? item.labelBn : item.labelEn}</span>
                    {hasSub && <span className="text-[8px] text-slate-400">▼</span>}
                  </button>

                  {/* Submenu Dropdown panel */}
                  {hasSub && activeDropdown === item.id && (
                    <div className="absolute top-full left-0 bg-white text-slate-800 shadow-xl border border-slate-200 py-1.5 rounded w-48 z-50">
                      {item.subMenu.map((sub, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            setActiveTab(sub.tab);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-crimson hover:text-white text-xs font-semibold font-sans transition-colors block"
                        >
                          {isBangla ? sub.labelBn : sub.labelEn}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Separator */}
            {user && <span className="text-slate-700 mx-2">|</span>}

            {user && loggedInNavItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-3 text-[11px] font-mono font-bold uppercase tracking-wider transition-all border-b-2 hover:text-white hover:bg-white/5 ${
                  activeTab === item.id 
                    ? 'border-crimson text-white bg-slate-800/60' 
                    : 'border-transparent text-slate-300'
                }`}
              >
                📁 {isBangla ? item.labelBn : item.labelEn}
              </button>
            ))}
          </nav>

          {/* Right Actions Block */}
          <div className="flex items-center justify-end w-full md:w-auto space-x-3 sm:space-x-4">
            
            {/* Language Translation Button */}
            <button
              id="lang-toggle-desktop"
              onClick={() => setIsBangla(!isBangla)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800/40 hover:bg-slate-700 hover:text-white text-slate-300 border border-slate-700/50 text-[11px] font-mono font-bold transition-all cursor-pointer shadow-sm"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5 text-crimson" />
              <span>{isBangla ? 'ENGLISH' : 'বাংলা'}</span>
            </button>

            {/* Search and Notification toggles */}
            <div className="flex items-center space-x-2">
              <button
                id="header-search-toggle"
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-lg transition-all border border-slate-700/50 cursor-pointer ${
                  searchOpen ? 'bg-crimson text-white border-crimson' : 'bg-slate-800/40 hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Search Site"
              >
                <Search className="w-4 h-4" />
              </button>

              {user && (
                <button
                  id="header-notification-bell"
                  onClick={() => setActiveTab('notifications')}
                  className="relative p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700 hover:text-white transition-all group border border-slate-700/50 cursor-pointer"
                  title="View Announcements"
                >
                  <Bell className="w-4 h-4 text-slate-300 group-hover:text-crimson" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-crimson text-[9px] font-bold text-white font-mono border border-harvard-slate">
                      {unreadCount}
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* Scroll to Top button when sticky */}
            {isSticky && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-2 rounded-lg bg-crimson hover:bg-crimson-dark text-white transition-all shadow cursor-pointer text-xs flex items-center space-x-1"
                title="Scroll to Top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px] font-mono font-bold uppercase">{isBangla ? 'উপরে' : 'Top'}</span>
              </button>
            )}

            {/* Auth / Student Passport Segment */}
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
                  <div 
                    onClick={() => setActiveTab('dashboard')} 
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center text-red-400 font-bold border border-slate-700 group-hover:border-crimson transition-all overflow-hidden font-serif">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>{user.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="text-left hidden lg:block">
                      <h4 className="text-[11px] font-semibold text-slate-200 line-clamp-1 max-w-[100px]">{user.name}</h4>
                      <p className="text-[9px] text-slate-400 font-mono">{user.studentId}</p>
                    </div>
                  </div>
                  <button
                    id="logout-btn-desktop"
                    onClick={onLogout}
                    className="p-1 rounded text-slate-400 hover:text-crimson transition-all cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="portal-login-btn"
                  onClick={onOpenAuth}
                  className="flex items-center space-x-1.5 bg-crimson hover:bg-crimson-dark text-white font-mono font-bold text-[11px] uppercase tracking-wider py-2 px-4 rounded transition-all cursor-pointer shadow"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'পোর্টাল লগইন' : 'Portal Login'}</span>
                </button>
              )}

              {/* Mobile hamburger menu toggle */}
              <button
                id="mobile-hamburguer-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white md:hidden border border-slate-700/50 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Floating live search dropdown attached to sticky navbar */}
        {searchOpen && (
          <div className="bg-slate-900/95 backdrop-blur border-b border-slate-700 py-5 px-4 sm:px-6 lg:px-8 absolute top-full left-0 right-0 z-50 shadow-2xl animate-in fade-in duration-200">
            <div className="max-w-3xl mx-auto space-y-3">
              <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3 bg-white rounded-xl p-2 shadow-inner border border-slate-300">
                <Search className="w-5 h-5 text-crimson shrink-0 ml-2" />
                <input
                  type="text"
                  placeholder={
                    isBangla 
                      ? 'ওয়েবসাইটের যেকোনো কিছু খুঁজুন (যেমন: পদার্থবিজ্ঞান, ভর্তি যোগ্যতা, রেজাল্ট, চালান ফর্ম...)' 
                      : 'Search anything on GSC portal (e.g. Physics, Admission, Results, Challan Form...)'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-transparent border-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-sans"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-slate-400 hover:text-crimson font-mono px-2"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-lg transition-colors cursor-pointer"
                  title="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>

              {/* Live Search Results List */}
              {searchQuery.trim() !== '' && (
                <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-[420px] overflow-y-auto font-sans">
                  <div className="p-2.5 bg-slate-50 border-b border-slate-150 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    <span>{isBangla ? `ফলাফল পাওয়া গেছে: ${filteredResults.length} টি` : `Found ${filteredResults.length} matching results`}</span>
                    <span>{isBangla ? 'পছন্দের রেজাল্টে ক্লিক করুন' : 'Click to navigate'}</span>
                  </div>

                  {filteredResults.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {filteredResults.map((item) => {
                        const IconComp = item.icon || BookOpen;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSelectResult(item)}
                            className="p-3 sm:p-3.5 hover:bg-rose-50/60 transition-colors cursor-pointer flex items-center justify-between group"
                          >
                            <div className="flex items-center space-x-3 pr-2">
                              <div className="p-2 rounded-lg bg-slate-100 text-crimson group-hover:bg-crimson group-hover:text-white transition-colors shrink-0">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-crimson transition-colors font-serif">
                                    {isBangla ? item.titleBn : item.titleEn}
                                  </h4>
                                  <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                    {isBangla ? item.categoryBn : item.categoryEn}
                                  </span>
                                </div>
                                {item.descBn && (
                                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 leading-snug">
                                    {isBangla ? item.descBn : item.descEn}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-crimson group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-rose-50 text-crimson flex items-center justify-center mx-auto border border-rose-100">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">
                          {isBangla ? 'কোনো নির্দিষ্ট তথ্য পাওয়া যায়নি' : 'No direct matches found'}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                          {isBangla 
                            ? 'আপনার কাঙ্ক্ষিত প্রশ্নটি GSC Ai চ্যাট সহকারীকে করতে পারেন। হোম পেজের ডান কোণায় GSC Ai বাটনে চ্যাট করুন।'
                            : 'Try asking our GSC Ai Assistant at the bottom right corner of the page for detailed guidance!'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. Right-Side Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end md:hidden">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Right Slide Panel */}
          <div className="relative w-80 max-w-[85vw] bg-slate-900/98 backdrop-blur-2xl text-white h-full shadow-2xl border-l border-slate-800 flex flex-col justify-between z-50 animate-in slide-in-from-right duration-300 font-sans">
            
            {/* Top Brand & Close Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                  <img src="/images/gsc-logo.png" alt="GSC" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xs font-serif font-black tracking-wider text-slate-200 uppercase">
                  {isBangla ? 'নেভিগেশন মেনু' : 'Navigation Menu'}
                </h3>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer border border-slate-700"
                title="Close Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Links List */}
            <div className="flex-1 p-4 space-y-1.5 overflow-y-auto">
              {menuStructure.map((item) => {
                const IconComp = 
                  item.id === 'home' ? Landmark :
                  item.id === 'about' ? Info :
                  item.id === 'admin' ? Building2 :
                  item.id === 'departments' ? BookOpen :
                  item.id === 'academic-menu' ? Calendar :
                  item.id === 'results-menu' ? Award :
                  item.id === 'resources-menu' ? FileText :
                  item.id === 'gallery-menu' ? Sparkles :
                  item.id === 'contact-menu' ? PhoneCall : BookOpen;

                const isActive = activeTab === item.tab;

                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab(item.tab);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-crimson text-white font-bold shadow-lg shadow-crimson/30 border-l-4 border-white' 
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-crimson'}`} />
                        <span>{isBangla ? item.labelBn : item.labelEn}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    </button>

                    {/* Submenu expansion if available */}
                    {item.subMenu && activeTab === item.tab && (
                      <div className="pl-6 space-y-1 pt-1 pb-1">
                        {item.subMenu.map((sub, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => {
                              setActiveTab(sub.tab);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg text-[11px] font-sans text-slate-300 hover:text-white hover:bg-slate-800/60 block"
                          >
                            • {isBangla ? sub.labelBn : sub.labelEn}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {user && (
                <div className="py-2 my-2 border-t border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase tracking-widest px-2">
                  {isBangla ? 'আমার পোর্টাল সেকশন' : 'Personal Academic Hub'}
                </div>
              )}

              {user && loggedInNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider ${
                    activeTab === item.id 
                      ? 'bg-slate-800 text-white font-bold border-l-4 border-crimson shadow' 
                      : 'text-slate-300 hover:bg-slate-800/60 bg-slate-800/20'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-crimson" />
                  <span>{isBangla ? item.labelBn : item.labelEn}</span>
                </button>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-3 py-2 bg-slate-800/50 rounded-xl border border-slate-750">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-crimson font-bold border border-slate-700 font-serif shrink-0">
                      <span>{user.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 truncate">
                      <h4 className="text-xs font-bold text-slate-100 truncate">{user.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono truncate">{user.studentId} • {user.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      id="lang-toggle-mobile"
                      onClick={() => { setIsBangla(!isBangla); }}
                      className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-mono border border-slate-700 cursor-pointer"
                    >
                      <Languages className="w-3.5 h-3.5 text-crimson" />
                      <span>{isBangla ? 'ENGLISH' : 'বাংলা'}</span>
                    </button>

                    <button
                      id="logout-btn-mobile"
                      onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                      className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 bg-red-950/30 hover:bg-red-950/50 text-red-400 rounded-xl text-xs font-mono border border-red-900/40 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{isBangla ? 'লগআউট' : 'Logout'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setIsBangla(!isBangla); }}
                    className="flex-1 flex items-center justify-center space-x-1.5 py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-mono border border-slate-700 cursor-pointer font-bold"
                  >
                    <Languages className="w-3.5 h-3.5 text-crimson" />
                    <span>{isBangla ? 'ENGLISH' : 'বাংলা'}</span>
                  </button>

                  <button
                    onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                    className="flex-[2] flex items-center justify-center space-x-2 bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-wider py-3 rounded-xl shadow-lg text-xs font-bold cursor-pointer"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>{isBangla ? 'পোর্টাল লগইন' : 'Portal Login'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
