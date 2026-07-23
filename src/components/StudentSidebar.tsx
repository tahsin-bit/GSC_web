import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Clock, 
  Bell, 
  LogOut,
  X,
  Sparkles
} from 'lucide-react';
import { User } from '../types/academic';

interface StudentSidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActiveSubTab: (subTab: 'overview' | 'attendance' | 'grades' | 'finance' | 'timetable' | 'profile') => void;
  onLogout: () => void;
  isBangla: boolean;
  unreadCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
  setActiveSubTab,
  onLogout,
  isBangla,
  unreadCount,
  isOpen,
  onClose
}) => {
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const sections = [
    {
      titleEn: 'Workspace',
      titleBn: 'কার্যক্ষেত্র',
      items: [
        { id: 'dashboard', labelEn: 'My Portal', labelBn: 'আমার পোর্টাল', icon: LayoutDashboard },
      ]
    },
    {
      titleEn: 'Academic Hub',
      titleBn: 'একাডেমিক হাব',
      items: [
        { id: 'materials', labelEn: 'Course Materials', labelBn: 'কোর্স ফাইল', icon: BookOpen },
        { id: 'exams', labelEn: 'Exams & Schedules', labelBn: 'পরীক্ষা রুটিন', icon: Calendar },
        { id: 'calendar', labelEn: 'Assignment Calendar', labelBn: 'ক্যালেন্ডার', icon: Clock },
      ]
    },
    {
      titleEn: 'Communication',
      titleBn: 'যোগাযোগ',
      items: [
        { id: 'notifications', labelEn: 'Announcements', labelBn: 'বিজ্ঞপ্তি বোর্ড', icon: Bell, badge: true },
      ]
    }
  ];

  const mobileBottomNavItems = [
    { id: 'dashboard', labelEn: 'Portal', labelBn: 'পোর্টাল', icon: LayoutDashboard },
    { id: 'materials', labelEn: 'Materials', labelBn: 'কোর্স ফাইল', icon: BookOpen },
    { id: 'exams', labelEn: 'Exams', labelBn: 'পরীক্ষা', icon: Calendar },
    { id: 'calendar', labelEn: 'Calendar', labelBn: 'ক্যালেন্ডার', icon: Clock },
    { id: 'notifications', labelEn: 'Notices', labelBn: 'বিজ্ঞপ্তি', icon: Bell, badge: true },
  ];

  // Memoized user initials for mobile dock profile avatar
  const userInitial = user.name.charAt(0).toUpperCase();

  const sidebarContent = (
    <div className="w-64 bg-harvard-charcoal text-slate-300 flex flex-col justify-between h-full border-r border-slate-800 font-sans relative overflow-hidden">
      
      {/* Background soft glowing accent circles */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-crimson/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-10 w-24 h-24 bg-crimson/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col relative z-10 flex-grow overflow-y-auto">
        
        {/* 1. Sidebar Brand Header */}
        <div className="p-4 border-b border-slate-850 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-full bg-white p-0.5 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
              <img src="/images/gsc-logo.png" alt="GSC" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-[10px] font-serif font-black tracking-widest text-slate-400 uppercase leading-none">
              {isBangla ? 'সরকারি বিজ্ঞান কলেজ' : 'Govt. Science College'}
            </h2>
          </div>
          {/* No close button needed on mobile - drawer is desktop only */}
        </div>

        {/* 2. Prominent Interactive Profile Card at the TOP */}
        <div 
          onClick={() => {
            setActiveTab('dashboard');
            setActiveSubTab('profile');
            onClose();
          }}
          className="p-6 border-b border-slate-850 bg-gradient-to-b from-slate-900/50 to-slate-955/20 hover:from-slate-900/80 hover:to-slate-955/40 cursor-pointer transition-all duration-300 group text-center relative"
          title={isBangla ? 'প্রোফাইল পরিবর্তন করতে ক্লিক করুন' : 'Click to edit profile'}
        >
          {/* Big clearly visible Profile Picture */}
          <div className="relative w-20 h-20 mx-auto rounded-full p-0.5 border-2 border-crimson/70 shadow-lg group-hover:border-crimson group-hover:shadow-crimson/30 transition-all duration-300 overflow-hidden">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center text-red-400 font-bold text-2xl font-serif">
                {user.name.charAt(0)}
              </div>
            )}
            
            {/* Edit overlay on hover */}
            <div className="absolute inset-0 bg-slate-955/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-full">
              <span className="text-[9px] font-mono text-white font-bold tracking-wider uppercase">
                {isBangla ? 'সম্পাদন' : 'Edit'}
              </span>
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <h4 className="text-sm font-bold text-slate-100 group-hover:text-crimson-light transition-colors truncate">
              {user.name}
            </h4>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider truncate">{user.studentId}</p>
            <span className="text-[8px] font-mono text-slate-500 uppercase block tracking-widest mt-0.5 truncate">{user.department}</span>
          </div>

          {/* Active status bubble */}
          <div className="absolute top-4 right-4 flex items-center space-x-1 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
        </div>

        {/* 3. Sectioned Navigation Links */}
        <nav className="p-4 space-y-6">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-2">
              {/* Category Header */}
              <h3 className="px-3 text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                {isBangla ? section.titleBn : section.titleEn}
              </h3>
              
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        onClose(); // Close mobile drawer
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer transform hover:translate-x-1 ${
                        isActive 
                          ? 'bg-gradient-to-r from-crimson to-crimson-light text-white shadow-lg shadow-crimson/25 border-l-4 border-white' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                        <span>{isBangla ? item.labelBn : item.labelEn}</span>
                      </div>
                      {item.badge && unreadCount > 0 && (
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold font-mono transition-colors ${
                          isActive ? 'bg-white text-crimson animate-none' : 'bg-crimson text-white animate-bounce'
                        }`}>
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Segment - Just Logout button now */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/20 backdrop-blur-md">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-center space-x-2 bg-slate-800/50 hover:bg-red-950/20 text-slate-400 hover:text-red-400 font-mono font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg border border-slate-700 hover:border-red-900/30 transition-all duration-300 cursor-pointer shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isBangla ? 'লগআউট' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar — hidden on mobile, shown on md+ */}
      <aside className="hidden md:flex flex-col shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Premium Floating Glassmorphic Mobile Bottom Navigation Dock */}
      <nav className="fixed bottom-3 left-3 right-3 z-50 md:hidden max-w-md mx-auto bg-slate-900/92 backdrop-blur-xl border border-slate-750/80 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-1.5 flex items-center justify-around font-sans">
        {mobileBottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-300 cursor-pointer relative select-none ${
                isActive 
                  ? 'bg-crimson text-white shadow-lg shadow-crimson/40 scale-105 font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-white' : 'text-slate-400'}`} />
                {item.badge && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-crimson text-[8px] font-bold text-white font-mono border-2 border-slate-900 shadow-md animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-[9px] font-mono tracking-tight uppercase mt-1 ${isActive ? 'text-white font-extrabold' : 'text-slate-400 font-medium'}`}>
                {isBangla ? item.labelBn : item.labelEn}
              </span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="w-px h-8 bg-slate-700/60 mx-0.5 rounded-full" />

        {/* Logout Button in dock */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-300 cursor-pointer select-none text-slate-400 hover:text-red-400 hover:bg-red-950/30"
          title={isBangla ? 'লগআউট' : 'Logout'}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[9px] font-mono tracking-tight uppercase mt-1 font-medium">
            {isBangla ? 'লগআউট' : 'Logout'}
          </span>
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative text-left animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4">
              <LogOut className="w-6 h-6" />
            </div>

            <h3 className="text-base font-serif font-black text-slate-900 mb-1">
              {isBangla ? 'লগআউট নিশ্চিতকরণ' : 'Confirm Logout'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-sans">
              {isBangla 
                ? 'আপনি কি নিশ্চিত যে স্টুডেন্ট পোর্টাল থেকে লগআউট করতে চান?' 
                : 'Are you sure you want to log out of your student portal session?'}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer border border-slate-250"
              >
                {isBangla ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  onLogout();
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
              >
                {isBangla ? 'হ্যাঁ, লগআউট' : 'Yes, Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
