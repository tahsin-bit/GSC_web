import React, { useState } from 'react';
import { 
  Bell, Search, Info, Landmark, Calendar, Clock,
  CheckCircle2, ArrowRight, ShieldCheck, Mail, Sparkles, X, RefreshCw
} from 'lucide-react';
import { NotificationItem } from '../types/academic';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  isBangla: boolean;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  isBangla,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'academic' | 'exam' | 'event' | 'admission'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', labelEn: 'All Notices', labelBn: 'সকল নোটিশ' },
    { id: 'academic', labelEn: 'Academic', labelBn: 'একাডেমিক' },
    { id: 'exam', labelEn: 'Exam Routines', labelBn: 'পরীক্ষা রুটিন' },
    { id: 'event', labelEn: 'Events & Club', labelBn: 'অনুষ্ঠান ও ক্লাব' },
    { id: 'admission', labelEn: 'Admission', labelBn: 'ভর্তি সংবাদ' },
  ];

  const filteredNotices = notifications.filter(notice => {
    const categoryMatch = activeCategory === 'all' || notice.category === activeCategory;
    const term = searchTerm.toLowerCase().trim();
    const searchMatch = !term || (
      notice.title.toLowerCase().includes(term) || 
      notice.message.toLowerCase().includes(term) ||
      notice.category.toLowerCase().includes(term)
    );
    return categoryMatch && searchMatch;
  });

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'exam': return 'bg-red-50 text-crimson border-red-200';
      case 'academic': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'event': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'admission': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <div id="notification-center-section" className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 font-sans text-left relative">
      
      {/* Title section */}
      <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
            {isBangla ? 'সরকারি বিজ্ঞান কলেজ অফিসিয়াল সার্কুলার' : 'GOVERNMENT SCIENCE COLLEGE REGISTRAR BOARD'}
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900 flex items-center space-x-2">
            <Bell className="w-5.5 h-5.5 text-crimson" />
            <span>{isBangla ? 'একাডেমিক নোটিশ বোর্ড' : 'Academic Notice Board'}</span>
          </h1>
          <p className="text-xs text-slate-500">
            {isBangla ? 'কলেজের সার্বিক একাডেমিক ঘোষণা, পরীক্ষা রুটিন, ইভেন্ট ও জরুরি নোটিশ।' : 'Stay updated with official GSC board exam dates, administrative circulars, and event deadlines.'}
          </p>
        </div>

        {/* Mark All Read button */}
        {hasUnread && (
          <button
            id="mark-all-read-btn"
            onClick={onMarkAllAsRead}
            className="text-xs font-mono font-bold uppercase tracking-wider bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 text-slate-700 cursor-pointer shadow-sm rounded transition-all"
          >
            {isBangla ? 'সব নোটিশ পঠিত চিহ্নিত করুন' : 'Mark All as Read'}
          </button>
        )}
      </div>

      {/* Categories filters & search query row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        
        {/* Category switches */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-crimson text-white shadow-sm' 
                  : 'text-slate-600 bg-slate-50 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isBangla ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Real-time Search Input Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-crimson absolute left-3 top-2.5" />
          <input
            id="notice-general-search"
            type="text"
            placeholder={isBangla ? 'নোটিশের শিরোনাম বা বিষয় দিয়ে খুঁজুন...' : 'Search notices, exams, events...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-800 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson font-sans transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-crimson"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Search status & count indicator */}
      {searchTerm && (
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-1">
          <span>
            {isBangla 
              ? `"${searchTerm}" এর জন্য ${filteredNotices.length} টি নোটিশ পাওয়া গেছে` 
              : `Found ${filteredNotices.length} notices for "${searchTerm}"`}
          </span>
          <button 
            onClick={() => setSearchTerm('')}
            className="text-crimson hover:underline text-[11px]"
          >
            {isBangla ? 'সার্চ রিসেট করুন' : 'Reset Search'}
          </button>
        </div>
      )}

      {/* Bulletins lists feed */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="p-12 text-center rounded-lg border border-slate-200 bg-white space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-700">
              {isBangla ? 'কোনো নোটিশ পাওয়া যায়নি' : 'No notices found matching your search'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {isBangla 
                ? 'আপনার সার্চ ফিল্টারের সাথে মিলে এমন কোনো নোটিশ বা ঘোষণা এই মুহূর্তে নেই।' 
                : 'Try adjusting your search query or switching categories.'}
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold uppercase transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-crimson" />
              <span>{isBangla ? 'সকল নোটিশ দেখুন' : 'Show All Notices'}</span>
            </button>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div 
              key={notice.id}
              onClick={() => onMarkAsRead(notice.id)}
              className={`border rounded-lg p-5 sm:p-6 transition-all relative flex flex-col justify-between gap-4 cursor-pointer ${
                notice.read 
                  ? 'bg-slate-50 border-slate-200 opacity-85 hover:bg-slate-100/60' 
                  : 'bg-white border-slate-200 border-l-4 border-l-crimson shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                
                {/* Meta details Header bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-left">
                  <div className="flex items-center space-x-2.5">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryTheme(notice.category)}`}>
                      📢 {notice.category}
                    </span>
                    {!notice.read && (
                      <span className="flex h-2.5 w-2.5 rounded-full bg-crimson animate-ping" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    {isBangla ? 'প্রকাশের তারিখ: ' : 'Posted on: '}
                    {new Date(notice.date).toLocaleDateString(isBangla ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <h3 className={`text-sm sm:text-base font-serif font-black ${notice.read ? "text-slate-700" : "text-slate-900"}`}>
                  {notice.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans text-left">
                  {notice.message}
                </p>
              </div>

              {/* Bottom footer bar */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[9px] text-slate-400 font-mono uppercase tracking-wider font-bold">
                <span className="flex items-center space-x-1 text-slate-500 font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isBangla ? 'অফিসিয়াল সার্কুলার প্রকাশিত' : 'Approved Official Publication'}</span>
                </span>

                <button
                  id={`btn-dismiss-alert-${notice.id}`}
                  onClick={(e) => { e.stopPropagation(); onDismiss(notice.id); }}
                  className="hover:text-crimson hover:bg-slate-100 p-1.5 px-2.5 font-bold tracking-wider uppercase text-[8px] bg-slate-50 text-slate-500 rounded border border-slate-200 cursor-pointer transition-colors"
                  title="Remove Notice"
                >
                  {isBangla ? 'ডিলিট করুন' : 'Dismiss notice'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
