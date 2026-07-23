import React, { useState } from 'react';
import { 
  Calendar, Check, Plus, Trash2, Filter, CheckCircle, 
  ChevronLeft, ChevronRight, X, Sparkles
} from 'lucide-react';
import { Assignment, Course } from '../types/academic';

interface AssignmentCalendarProps {
  assignments: Assignment[];
  courses: Course[];
  isBangla: boolean;
  onAddAssignment: (asn: Assignment) => void;
  onToggleComplete: (id: string) => void;
  onDeleteAssignment: (id: string) => void;
}

export const AssignmentCalendar: React.FC<AssignmentCalendarProps> = ({
  assignments,
  courses,
  isBangla,
  onAddAssignment,
  onToggleComplete,
  onDeleteAssignment
}) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const [filterCourse, setFilterCourse] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCourse, setNewCourse] = useState(courses[0]?.code || 'PHY-101');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const monthNamesEn = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthNamesBn = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  const weekDaysEn = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const weekDaysBn = ['রবি','সোম','মঙ্গল','বুধ','বৃহ','শুক্র','শনি'];

  // Build real calendar grid
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  const formatDateStr = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const todayStr = formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };
  const goToToday = () => { setViewMonth(today.getMonth()); setViewYear(today.getFullYear()); };

  const handleDayClick = (day: number) => {
    setSelectedDate(formatDateStr(viewYear, viewMonth, day));
    setNewTitle('');
    setNewDesc('');
    setNewCourse(courses[0]?.code || 'PHY-101');
    setNewPriority('medium');
    setShowAddModal(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddAssignment({
      id: `asn-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      courseCode: newCourse,
      dueDate: selectedDate,
      completed: false,
      priority: newPriority
    });
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
    setToastMessage(isBangla ? '✅ অ্যাসাইনমেন্ট সফলভাবে যুক্ত হয়েছে!' : '✅ Assignment added successfully!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredAssignments = assignments.filter(asn => {
    const c = filterCourse === 'all' || asn.courseCode === filterCourse;
    const s = filterStatus === 'all' || (filterStatus === 'pending' && !asn.completed) || (filterStatus === 'completed' && asn.completed);
    return c && s;
  });

  const totalCount = assignments.length;
  const completedCount = assignments.filter(a => a.completed).length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div id="assignment-calendar-section" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans text-left relative">

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl font-mono text-xs flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
            {isBangla ? 'একাডেমিক অ্যাসাইনমেন্ট পরিকল্পনাকারী' : 'Academic Assignment Planner'}
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
            {isBangla ? 'ইন্টারেক্টিভ অ্যাসাইনমেন্ট ক্যালেন্ডার' : 'Interactive Assignment Calendar'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isBangla
              ? 'যেকোনো মাসে নেভিগেট করুন এবং যেকোনো তারিখে ক্লিক করে অ্যাসাইনমেন্ট যুক্ত করুন।'
              : 'Navigate to any month & click any date to add an assignment deadline.'}
          </p>
        </div>
        <button
          id="btn-add-task-manual"
          onClick={() => { setSelectedDate(todayStr); setShowAddModal(true); }}
          className="flex items-center space-x-1.5 bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-widest text-xs font-bold py-2.5 px-4 rounded-xl shadow cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isBangla ? 'নতুন অ্যাসাইনমেন্ট' : 'Add Assignment'}</span>
        </button>
      </div>

      {/* Add Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl relative text-left animate-in fade-in slide-in-from-bottom-4 duration-200">
            <button onClick={() => setShowAddModal(false)} className="absolute right-4 top-4 p-2 text-slate-400 hover:text-crimson hover:bg-slate-50 rounded-xl cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-1">
              <Calendar className="w-5 h-5 text-crimson" />
              <h3 className="text-sm font-serif font-black text-slate-900">
                {isBangla ? 'অ্যাসাইনমেন্ট যুক্ত করুন' : 'Add Assignment'}
              </h3>
            </div>
            <p className="text-[10px] font-mono text-slate-400 mb-5 uppercase tracking-wider">
              {isBangla ? 'নির্বাচিত তারিখ:' : 'Selected Date:'}{' '}
              <span className="text-crimson font-bold">{selectedDate}</span>
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">
                  {isBangla ? 'অ্যাসাইনমেন্টের শিরোনাম *' : 'Assignment Title *'}
                </label>
                <input
                  id="modal-add-title"
                  type="text"
                  placeholder={isBangla ? 'যেমন: পদার্থবিজ্ঞান ল্যাব রিপোর্ট' : 'e.g. Physics Lab Report'}
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/20"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">
                  {isBangla ? 'বিবরণ (ঐচ্ছিক)' : 'Description (optional)'}
                </label>
                <textarea
                  id="modal-add-desc"
                  rows={2}
                  placeholder={isBangla ? 'বিস্তারিত লিখুন...' : 'Add details...'}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-crimson resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">
                    {isBangla ? 'বিষয়' : 'Course'}
                  </label>
                  <select
                    id="modal-add-course"
                    value={newCourse}
                    onChange={e => setNewCourse(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-crimson cursor-pointer"
                  >
                    {courses.map(c => <option key={c.id} value={c.code}>{c.code}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">
                    {isBangla ? 'অগ্রাধিকার' : 'Priority'}
                  </label>
                  <select
                    id="modal-add-priority"
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-crimson cursor-pointer"
                  >
                    <option value="high">🛑 {isBangla ? 'উচ্চ' : 'High'}</option>
                    <option value="medium">⚠️ {isBangla ? 'মধ্যম' : 'Medium'}</option>
                    <option value="low">✅ {isBangla ? 'সাধারণ' : 'Low'}</option>
                  </select>
                </div>
              </div>

              <button
                id="modal-add-submit-btn"
                type="submit"
                className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-widest text-xs font-bold py-3 rounded-xl shadow cursor-pointer transition-all"
              >
                {isBangla ? 'ক্যালেন্ডারে যুক্ত করুন ✓' : 'Add to Calendar ✓'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Filters + Progress */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-crimson" />
            <span>{isBangla ? 'ফিল্টার:' : 'Filter:'}</span>
          </span>
          <select
            id="filter-by-course"
            value={filterCourse}
            onChange={e => setFilterCourse(e.target.value)}
            className="bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs py-1.5 px-3 focus:outline-none cursor-pointer"
          >
            <option value="all">{isBangla ? 'সকল বিষয়' : 'All Courses'}</option>
            {courses.map(c => <option key={c.id} value={c.code}>{c.code}</option>)}
          </select>
          <select
            id="filter-by-status"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as 'all' | 'pending' | 'completed')}
            className="bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs py-1.5 px-3 focus:outline-none cursor-pointer"
          >
            <option value="all">{isBangla ? 'সকল অবস্থা' : 'All Statuses'}</option>
            <option value="pending">{isBangla ? 'অসম্পূর্ণ' : 'Pending'}</option>
            <option value="completed">{isBangla ? 'সম্পন্ন' : 'Completed'}</option>
          </select>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-500">
          <span className="font-bold">{isBangla ? 'সম্পন্ন:' : 'Done:'} {completedCount}/{totalCount} ({percent}%)</span>
          <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-crimson transition-all duration-500 rounded-full" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      {/* Calendar + Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Real Calendar */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">

          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer" title="Previous Month">
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-center">
              <h3 className="text-sm font-serif font-black text-slate-900 uppercase tracking-wider flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 text-crimson" />
                <span>{isBangla ? monthNamesBn[viewMonth] : monthNamesEn[viewMonth]} {viewYear}</span>
              </h3>
              <button onClick={goToToday} className="text-[10px] font-mono text-crimson hover:underline cursor-pointer mt-0.5">
                {isBangla ? 'আজকের তারিখে ফিরুন' : 'Go to Today'}
              </button>
            </div>

            <button onClick={nextMonth} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer" title="Next Month">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pb-2 mb-1 border-b border-slate-100">
            {(isBangla ? weekDaysBn : weekDaysEn).map(d => <div key={d}>{d}</div>)}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mt-2">
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-[70px] sm:h-[85px] bg-slate-50/40 rounded-xl border border-transparent" />;
              }

              const cellDateStr = formatDateStr(viewYear, viewMonth, day);
              const dayAsns = assignments.filter(a => a.dueDate === cellDateStr);
              const isToday = cellDateStr === todayStr;
              const hasAsns = dayAsns.length > 0;

              return (
                <div
                  key={`day-${day}-${idx}`}
                  onClick={() => handleDayClick(day)}
                  className={`h-[70px] sm:h-[85px] rounded-xl border p-1.5 sm:p-2 flex flex-col transition-all cursor-pointer relative overflow-hidden group select-none ${
                    isToday
                      ? 'bg-crimson/5 border-crimson ring-2 ring-crimson/30 shadow-sm'
                      : hasAsns
                      ? 'bg-amber-50/60 border-amber-200 hover:border-crimson/60'
                      : 'bg-white border-slate-200 hover:border-crimson hover:bg-rose-50/20 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`text-[11px] sm:text-xs font-bold font-mono leading-none ${isToday ? 'text-crimson' : 'text-slate-500 group-hover:text-slate-900'}`}>
                      {day}
                    </span>
                    {isToday && (
                      <span className="text-[7px] bg-crimson text-white font-mono px-1 py-0.5 rounded-full uppercase font-black leading-none hidden sm:inline">
                        {isBangla ? 'আজ' : 'Today'}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 mt-1 space-y-0.5 overflow-hidden">
                    {dayAsns.slice(0, 2).map(asn => (
                      <div
                        key={asn.id}
                        className={`text-[7.5px] sm:text-[8px] px-1 py-0.5 rounded-sm truncate font-semibold leading-tight ${
                          asn.completed ? 'bg-slate-100 text-slate-400 line-through'
                          : asn.priority === 'high' ? 'bg-red-100 text-red-700'
                          : asn.priority === 'medium' ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {asn.title}
                      </div>
                    ))}
                    {dayAsns.length > 2 && (
                      <div className="text-[7px] text-slate-400 font-mono font-bold">+{dayAsns.length - 2} {isBangla ? 'আরো' : 'more'}</div>
                    )}
                  </div>

                  {dayAsns.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <Plus className="w-4 h-4 text-crimson/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-3 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-100 border border-red-200" />{isBangla ? 'উচ্চ অগ্রাধিকার' : 'High'}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-100 border border-amber-200" />{isBangla ? 'মধ্যম' : 'Medium'}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-100 border border-slate-200" />{isBangla ? 'সাধারণ' : 'Low'}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-crimson/20 border border-crimson/40" />{isBangla ? 'আজকের তারিখ' : 'Today'}</span>
          </div>
        </div>

        {/* Assignment Checklist */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-left">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-serif font-black text-slate-900 uppercase tracking-wider">
              {isBangla ? 'অ্যাসাইনমেন্ট তালিকা' : 'Assignment Checklist'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isBangla ? 'তারিখ অনুযায়ী সাজানো সকল অ্যাসাইনমেন্ট' : 'All assignments sorted by date'}
            </p>
          </div>

          {filteredAssignments.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 text-slate-400 font-sans text-xs">
              {isBangla ? 'কোনো অ্যাসাইনমেন্ট নেই। ক্যালেন্ডারে যেকোনো তারিখে ক্লিক করুন।' : 'No assignments. Click any calendar date to add one.'}
            </div>
          ) : (
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {filteredAssignments
                .slice()
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map(asn => (
                  <div
                    key={asn.id}
                    className={`p-3.5 rounded-xl border transition-all relative group flex flex-col gap-2 ${
                      asn.completed ? 'bg-slate-50 border-slate-150 opacity-60' : 'bg-white border-slate-200 hover:border-crimson/30 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start space-x-2.5">
                        <button
                          id={`checklist-complete-${asn.id}`}
                          onClick={() => onToggleComplete(asn.id)}
                          className={`mt-0.5 transition-colors cursor-pointer shrink-0 ${asn.completed ? 'text-crimson' : 'text-slate-300 hover:text-crimson'}`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-1">
                            <span className="text-[8px] font-mono font-bold bg-crimson/10 text-crimson px-1.5 py-0.5 rounded uppercase">{asn.courseCode}</span>
                            <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                              asn.priority === 'high' ? 'bg-red-50 text-red-700' :
                              asn.priority === 'medium' ? 'bg-amber-50 text-amber-700' :
                              'bg-slate-50 text-slate-500'
                            }`}>{asn.priority}</span>
                          </div>
                          <h4 className={`text-xs font-bold leading-tight ${asn.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>{asn.title}</h4>
                          {asn.description && <p className="text-[10px] text-slate-500 line-clamp-2 leading-snug">{asn.description}</p>}
                        </div>
                      </div>
                      <button
                        id={`checklist-delete-${asn.id}`}
                        onClick={() => onDeleteAssignment(asn.id)}
                        className="text-slate-300 hover:text-crimson transition-colors opacity-0 group-hover:opacity-100 p-1 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono border-t border-slate-100 pt-2">
                      📅 {new Date(asn.dueDate + 'T00:00:00').toLocaleDateString(isBangla ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
