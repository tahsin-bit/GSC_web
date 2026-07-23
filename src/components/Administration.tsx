import React, { useState } from 'react';
import { User, Search, Landmark, Calendar, ShieldCheck, Mail, Phone, BookOpen } from 'lucide-react';
import { PAST_PRINCIPALS, TEACHERS } from '../data/mockData';

interface AdministrationProps {
  isBangla: boolean;
}

export const Administration: React.FC<AdministrationProps> = ({ isBangla }) => {
  const [activeTab, setActiveTab] = useState<'principal' | 'past' | 'teachers'>('principal');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', 'Physics Department', 'Chemistry Department', 'Mathematics Department', 'ICT Department', 'Botany Department', 'Zoology Department', 'Bangla', 'English'];

  const filteredTeachers = TEACHERS.filter(t => {
    const matchesSearch = t.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.nameBn.includes(searchQuery) ||
                          t.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = selectedDept === 'All' || t.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div id="administration-page" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left">
      
      {/* Editorial Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
          {isBangla ? 'কলেজ প্রশাসন ও শিক্ষক অনুষদ' : 'ADMINISTRATIVE DIRECTORY & FACULTY COUNCIL'}
        </span>
        <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
          {isBangla ? 'প্রশাসন ও শিক্ষকবৃন্দ' : 'College Administration & Faculty'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBangla 
            ? 'কলেজ পরিচালনা পর্ষদ, পূর্ববর্তী অধ্যক্ষগণ এবং সক্রিয় ৬৪ জন শিক্ষক অনুষদের ডাটাবেস।' 
            : 'Explore Principal speech, administrators archive, and contact details of GSC teachers.'}
        </p>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap border-b border-slate-200 gap-1 sm:gap-2">
        <button
          onClick={() => setActiveTab('principal')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'principal'
              ? 'border-crimson text-crimson bg-slate-50'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>{isBangla ? 'অধ্যক্ষের বাণী' : 'Office of the Principal'}</span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'past'
              ? 'border-crimson text-crimson bg-slate-50'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{isBangla ? 'পূর্ববর্তী অধ্যক্ষগণ' : 'Previous Principals'}</span>
        </button>

        <button
          onClick={() => setActiveTab('teachers')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'teachers'
              ? 'border-crimson text-crimson bg-slate-50'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isBangla ? 'আমাদের শিক্ষকবৃন্দ' : 'Teachers Directory'}</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md">

        {/* Tab 1: Principal speech */}
        {activeTab === 'principal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group w-64 h-64 sm:w-72 sm:h-72 max-w-full">
                <div className="absolute inset-0 bg-crimson rounded-lg transform translate-x-3 translate-y-3 -z-10"></div>
                <img 
                  src="https://www.gsctd.edu.bd/wp-content/uploads/2026/06/vice-p_salma.jpg" 
                  alt="Principal Prof. Salma Begum"
                  className="w-full h-full object-cover rounded-lg shadow border border-slate-200"
                />
                <div className="absolute -bottom-4 left-4 right-4 bg-slate-900 text-white p-3 rounded text-center shadow">
                  <h4 className="font-serif font-black text-xs sm:text-sm">{isBangla ? 'প্রফেসর সালমা বেগম' : 'Prof. Salma Begum'}</h4>
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">{isBangla ? 'অধ্যক্ষ, সরকারি বিজ্ঞান কলেজ' : 'Principal, Govt. Science College'}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6 pt-4 lg:pt-0">
              <span className="text-[10px] text-crimson font-mono tracking-widest uppercase font-bold block">
                {isBangla ? 'অধ্যক্ষের অফিস কক্ষ থেকে' : 'OFFICE OF THE PRINCIPAL'}
              </span>
              <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight leading-snug">
                {isBangla ? 'শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ গঠনে আমাদের অঙ্গীকার' : 'Shaping Science Education for Tomorrow'}
              </h2>
              <div className="w-16 h-1 bg-crimson"></div>
              
              <blockquote className="text-sm sm:text-base font-serif italic text-slate-700 border-l-2 border-crimson pl-4 leading-relaxed">
                {isBangla 
                  ? '“সরকারি বিজ্ঞান কলেজ ১৯৫৪ সাল থেকে এদেশের বিজ্ঞান শিক্ষার প্রসারে অনন্য ভূমিকা পালন করে আসছে। আমরা শিক্ষার্থীদের শুধু সফল পরীক্ষার্থী নয়, বরং মুক্তবুদ্ধিসম্পন্ন বিজ্ঞানমনস্ক মানুষ হিসেবে গড়ে তুলতে চাই।”'
                  : '“Since 1954, Government Science College has been a pioneer in intermediate science education. We are committed to developing critical logic and scientific parameters in each student.”'}
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {isBangla 
                  ? 'স্বনামধন্য এই বিদ্যাপীঠে রয়েছে সুসজ্জিত পদার্থবিজ্ঞান, রসায়ন, গণিত, আইসিটি এবং জীববিদ্যা ল্যাবরেটরি কমপ্লেক্স। আমাদের শিক্ষকেরা শিক্ষার্থীদের ব্যবহারিক শিক্ষার সর্বোচ্চ মান নিশ্চিত করতে প্রতিনিয়ত কাজ করছেন। শিক্ষার পাশাপাশি বিএনসিসি, রোভার স্কাউট, রেড ক্রিসেন্ট এবং বিতর্ক ক্লাবের মতো সহ-শিক্ষা কার্যক্রমের মাধ্যমে আমরা শিক্ষার্থীদের নিয়মানুবর্তিতা ও দেশপ্রেম জাগ্রত করি।'
                  : 'GSC hosts highly standard lab segments in chemical sciences, physics research, botany analysis, and computer systems. Our faculty remains active in mentoring and steering students in core areas. Through co-curricular programs like BNCC cadet drills, Rover Scouting, and debates, we shape responsible citizens.'}
              </p>

              <div className="pt-2 text-xs sm:text-sm text-slate-700 space-y-1">
                <p><strong>Email:</strong> principal@gsctd.edu.bd</p>
                <p><strong>Tel:</strong> +880-2-9110825</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Past principals */}
        {activeTab === 'past' && (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
              <Landmark className="w-5.5 h-5.5 text-crimson" />
              <span>{isBangla ? 'প্রতিষ্ঠাকাল থেকে অধ্যক্ষবৃন্দের তালিকা' : 'Chronological Roll of GSC Principals'}</span>
            </h2>
            <div className="w-12 h-1 bg-crimson"></div>

            <div className="overflow-hidden border border-slate-200 rounded shadow-sm text-xs font-sans">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[9px] uppercase tracking-wider">
                    <th className="p-3 pl-6">{isBangla ? 'ক্রমিক নং' : 'SL.'}</th>
                    <th className="p-3">{isBangla ? 'অধ্যক্ষের নাম' : 'Principal Name'}</th>
                    <th className="p-3">{isBangla ? 'কার্যকাল / মেয়াদ' : 'Academic Period'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {PAST_PRINCIPALS.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 pl-6 font-mono font-bold">{idx + 1}</td>
                      <td className="p-3 font-medium">
                        {isBangla ? p.nameBn : p.nameEn}
                      </td>
                      <td className="p-3 font-mono text-slate-500">
                        {p.period}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Searchable teachers list (64 teachers) */}
        {activeTab === 'teachers' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-150 pb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                  <BookOpen className="w-5.5 h-5.5 text-crimson" />
                  <span>{isBangla ? 'আমাদের শিক্ষক অনুষদ ডাটাবেস' : 'Faculty Council Directory'}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isBangla ? `মোট শিক্ষক অনুষদ: ৬৪ জন (বর্তমান সার্চ ফিল্টারে: ${filteredTeachers.length} জন)` : `Total Faculty: 64 members (${filteredTeachers.length} displayed)`}
                </p>
              </div>

              {/* Filtering components */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="bg-white text-slate-750 text-xs py-2 px-3 border border-slate-200 rounded focus:outline-none focus:border-crimson font-sans"
                >
                  {departments.map((d, i) => (
                    <option key={i} value={d}>
                      {d === 'All' ? (isBangla ? 'সকল বিভাগ' : 'All Departments') : d}
                    </option>
                  ))}
                </select>

                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder={isBangla ? 'শিক্ষকের নাম খুঁজুন...' : 'Search teacher by name/email...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 bg-slate-50 border border-slate-200 rounded pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-crimson font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {filteredTeachers.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-500 text-xs font-mono bg-slate-50 border border-slate-200 rounded">
                  No teacher match found. Change the search filters.
                </div>
              ) : (
                filteredTeachers.map((t) => (
                  <div 
                    key={t.id}
                    className="p-5 bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between hover:border-crimson/30 group"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                        <span className="text-[8px] font-mono font-bold bg-white text-crimson border border-slate-150 px-2 py-0.5 rounded uppercase">
                          {t.department.split(' ')[0]}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono font-bold">{t.id.toUpperCase()}</span>
                      </div>
                      <h4 className="font-serif font-black text-slate-900 text-sm group-hover:text-crimson transition-colors">
                        {isBangla ? t.nameBn : t.nameEn}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium font-sans pt-0.5">
                        {isBangla ? t.designationBn : t.designationEn}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono pt-1">
                        {t.department}
                      </p>
                    </div>

                    <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span className="flex items-center space-x-1 hover:text-crimson transition-colors truncate max-w-[200px]">
                        <Mail className="w-3.5 h-3.5 text-crimson shrink-0" />
                        <span className="truncate">{t.email}</span>
                      </span>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
