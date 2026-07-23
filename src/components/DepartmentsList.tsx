import React, { useState } from 'react';
import { BookOpen, Search, Building2, Award, Users, ChevronRight, Bookmark } from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';

interface DepartmentsListProps {
  isBangla: boolean;
}

export const DepartmentsList: React.FC<DepartmentsListProps> = ({ isBangla }) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('phy');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDepts = DEPARTMENTS.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];

  return (
    <div id="departments-list-page" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left">
      
      {/* Editorial Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
          {isBangla ? 'অনুষদ ও শিক্ষা বিভাগসমূহ' : 'ACADEMIC DEPARTMENTS & TRADES'}
        </span>
        <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
          {isBangla ? 'বিভাগসমূহ ও অনুষদ বিবরণী' : 'Departments & Faculty'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBangla 
            ? 'সরকারি বিজ্ঞান কলেজের আটটি মূল বিষয়ের গবেষণাগার, আসন সংখ্যা ও অনুষদ প্রধানের তথ্য।' 
            : 'Review GSC core educational tracks, seat limits, HOD lists, and syllabus descriptions.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md relative shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder={isBangla ? 'বিভাগ বা ল্যাব ফিল্টার করুন...' : 'Search physics, chemistry, labs...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded pl-10 pr-4 py-2.5 placeholder-slate-400 text-sm text-slate-800 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all font-sans"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left selector */}
        <div className="lg:col-span-4 space-y-2">
          {filteredDepts.length === 0 ? (
            <div className="p-6 rounded border border-slate-200 text-center text-slate-400 text-xs bg-slate-50 font-mono">
              No matching departments found.
            </div>
          ) : (
            filteredDepts.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDeptId(d.id)}
                className={`w-full text-left p-4 rounded transition-all flex items-center justify-between group border ${
                  selectedDeptId === d.id 
                    ? 'bg-white border-y-slate-200 border-r-slate-200 border-l-4 border-l-crimson shadow-md text-slate-950 font-semibold' 
                    : 'bg-slate-50/50 border-slate-250 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 text-crimson rounded group-hover:scale-105 transition-transform">
                    <BookOpen className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-slate-400 uppercase font-black tracking-wider block">{d.code}</span>
                    <h3 className="text-xs sm:text-sm">{isBangla && d.id === 'phy' ? 'পদার্থবিজ্ঞান বিভাগ' : isBangla && d.id === 'che' ? 'রসায়ন বিভাগ' : isBangla && d.id === 'math' ? 'গণিত বিভাগ' : isBangla && d.id === 'ict' ? 'আইসিটি বিভাগ' : isBangla && d.id === 'bot' ? 'উদ্ভিদবিজ্ঞান বিভাগ' : isBangla && d.id === 'zoo' ? 'প্রাণিবিজ্ঞান বিভাগ' : isBangla && d.id === 'ban' ? 'বাংলা বিভাগ' : isBangla && d.id === 'eng' ? 'ইংরেজি বিভাগ' : d.name}</h3>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedDeptId === d.id ? 'text-crimson' : 'text-slate-400'}`} />
              </button>
            ))
          )}
        </div>

        {/* Right details */}
        {selectedDept && (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md relative overflow-hidden">
            <span className="absolute -right-6 -bottom-10 text-9xl font-serif font-black text-slate-50 pointer-events-none select-none">
              {selectedDept.code}
            </span>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded text-crimson shadow-sm">
                  <BookOpen className="w-5.5 h-5.5 text-crimson" />
                </div>
                <div>
                  <span className="text-[8px] bg-crimson/10 text-crimson font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded">
                    🎓 {selectedDept.duration}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 mt-1">
                    {isBangla && selectedDept.id === 'phy' ? 'পদার্থবিজ্ঞান বিভাগ' : isBangla && selectedDept.id === 'che' ? 'রসায়ন বিভাগ' : isBangla && selectedDept.id === 'math' ? 'গণিত বিভাগ' : isBangla && selectedDept.id === 'ict' ? 'আইসিটি বিভাগ' : isBangla && selectedDept.id === 'bot' ? 'উদ্ভিদবিজ্ঞান বিভাগ' : isBangla && selectedDept.id === 'zoo' ? 'প্রাণিবিজ্ঞান বিভাগ' : isBangla && selectedDept.id === 'ban' ? 'বাংলা বিভাগ' : isBangla && selectedDept.id === 'eng' ? 'ইংরেজি বিভাগ' : selectedDept.name}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-605 leading-relaxed font-sans mb-8 relative z-10 text-slate-600">
              {isBangla && selectedDept.id === 'phy' ? 'পদার্থের গঠন, বলবিদ্যা, তড়িৎ চৌম্বকত্ব, আলোকবিদ্যা, পারমাণবিক পদার্থবিজ্ঞান এবং তাপগতিবিদ্যার বিস্তারিত তাত্ত্বিক ও ব্যবহারিক পর্যালোচনা। প্রকৌশল ও বিজ্ঞান শিক্ষার অন্যতম বুনিয়াদ।' : isBangla && selectedDept.id === 'che' ? 'জৈব রসায়ন, অজৈব পদার্থের গুণগত বিশ্লেষণ, রাসায়নিক সাম্যাবস্থা এবং ল্যাবরেটরির রাসায়নিক পরীক্ষা। মেডিকেল ও ইঞ্জিনিয়ারিং পরীক্ষার অন্যতম সহায়ক পাঠ।' : isBangla && selectedDept.id === 'math' ? 'ক্যালকুলাস, ডিফারেনশিয়াল সমীকরণ, রৈখিক বীজগণিত, স্থানাঙ্ক জ্যামিতি এবং ভেক্টর বিশ্লেষণ। শিক্ষার্থীদের গাণিতিক যুক্তি ও বিশ্লেষণী ক্ষমতা তৈরি করতে সহায়ক।' : isBangla && selectedDept.id === 'ict' ? 'প্রোগ্রামিংয়ের মূল ভিত্তি, ওয়েব ডিজাইন, ডেটাবেস ম্যানেজমেন্ট এবং সাইবার নিরাপত্তা। শিক্ষার্থীদের আধুনিক ডিজিটাল বিশ্বের অগ্রযাত্রায় উপযুক্ত করে তোলে।' : isBangla && selectedDept.id === 'bot' ? 'উদ্ভিদ শারীরবৃত্তি, কোষবিদ্যা, ট্যাক্সনমি এবং পরিবেশগত বাস্তুসংস্থান। সমৃদ্ধ ব্যবহারিক ক্লাস এবং মাইক্রোস্কোপিক গবেষণার সুবিধা।' : isBangla && selectedDept.id === 'zoo' ? 'প্রাণীর শারীরস্থান, বিবর্তন, জেনেটিক্স এবং বাস্তুবিদ্যা। মেডিকেল কলেজ ভর্তি প্রস্তুতি এবং লাইফ সায়েন্সের বুনিয়াদ গঠনে কার্যকর।' : isBangla && selectedDept.id === 'ban' ? 'বাংলা সাহিত্যের ইতিহাস, ব্যাকরণ, গদ্য ও পদ্যের নান্দনিক বিশ্লেষণ। শিক্ষার্থীদের সৃজনশীল মননশীলতা ও ভাষাগত দক্ষতা তৈরিতে সহায়ক।' : isBangla && selectedDept.id === 'eng' ? 'ইংরেজি ভাষার ব্যাকরণ, লিখনশৈলী এবং ইংরেজি সাহিত্যের কালজয়ী সৃষ্টির পর্যালোচনা। শিক্ষার্থীদের আন্তর্জাতিক যোগাযোগ দক্ষতায় উপযুক্ত গড়ে তোলে।' : selectedDept.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 relative z-10">
              <div className="bg-slate-50 p-4 rounded border border-slate-150">
                <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'বিভাগীয় প্রধান' : 'Head of Department'}</p>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  {selectedDept.headOfDept}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded border border-slate-150">
                <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'বিজ্ঞানাগার / ল্যাব' : 'Active Labs'}</p>
                <p className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 pt-0.5">
                  {selectedDept.labsCount > 0 ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{selectedDept.labsCount} {isBangla ? 'টি ল্যাবরেটরি' : 'Lab Units'}</span>
                    </>
                  ) : (
                    <span>{isBangla ? 'ল্যাব সুবিধা নেই' : 'No Lab Required'}</span>
                  )}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded border border-slate-150">
                <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'আসন সংখ্যা' : 'Seats Capacity'}</p>
                <p className="text-xs font-bold text-slate-800 pt-0.5">{selectedDept.seatCount} {isBangla ? 'জন শিক্ষার্থী' : 'Students'}</p>
              </div>
            </div>

            <div className="relative z-10">
              <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-1.5 border-b border-slate-100 pb-1.5">
                <Building2 className="w-4 h-4 text-crimson" />
                <span>{isBangla ? 'গবেষণাগার ও ব্যবহারিক বিষয়সমূহ' : 'Syllabus Core Modules'}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDept.technologies.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded text-slate-700 font-mono font-medium transition-colors"
                  >
                    ⚙️ {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
