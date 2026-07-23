import React from 'react';
import { Users, BookOpen, Layers, Laptop, Award, ShieldCheck, CalendarRange, MapPin } from 'lucide-react';
import { GENERAL_STATS } from '../data/mockData';

interface StatsPanelProps {
  isBangla: boolean;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ isBangla }) => {
  const stats = [
    {
      id: 'students',
      icon: <Users className="w-5 h-5 text-white" />,
      labelEn: 'Total Students',
      labelBn: 'মোট শিক্ষার্থী',
      val: GENERAL_STATS.totalStudents.toLocaleString(),
      descEn: 'Registered students in HSC & B.Sc streams',
      descBn: 'একাদশ, দ্বাদশ ও স্নাতক শাখায় অধ্যয়নরত'
    },
    {
      id: 'depts',
      icon: <BookOpen className="w-5 h-5 text-white" />,
      labelEn: 'Academic Departments',
      labelBn: 'একাডেমিক বিভাগসমূহ',
      val: GENERAL_STATS.departmentsCount,
      descEn: 'Fully staffed academic disciplines',
      descBn: 'মানসম্মত বিভাগ ও দক্ষ অনুষদ'
    },
    {
      id: 'labs',
      icon: <Laptop className="w-5 h-5 text-white" />,
      labelEn: 'Science Laboratories',
      labelBn: 'বিজ্ঞানাগার / ল্যাব',
      val: GENERAL_STATS.labCount,
      descEn: 'Fully equipped practical laboratory units',
      descBn: 'পদার্থ, রসায়ন, জীববিজ্ঞান ও আইসিটি ল্যাব'
    },
    {
      id: 'placements',
      icon: <Award className="w-5 h-5 text-white" />,
      labelEn: 'HSC Pass Rate',
      labelBn: 'এইচএসসি পাশের হার',
      val: GENERAL_STATS.jobPlacementRatio,
      descEn: 'Passing percentile in HSC Board Exam',
      descBn: 'বিগত বোর্ড পরীক্ষায় গৌরবময় পাশের হার'
    }
  ];

  return (
    <div id="quick-stats-panel" className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Container holding bento-like quick stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-lg border border-slate-200 shadow-xl">
        {stats.map((item) => (
          <div 
            key={item.id}
            id={`stat-card-${item.id}`}
            className="flex flex-col p-5 bg-slate-50 rounded border border-slate-150 transition-all duration-300 group hover:-translate-y-1 hover:shadow-md hover:border-crimson/30"
          >
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
              <div className="p-2 bg-crimson rounded group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <span className="text-3xl font-serif font-black text-slate-800 tracking-tight group-hover:text-crimson transition-colors">
                {item.val}
              </span>
            </div>
            
            <h4 className="text-xs font-serif font-bold text-slate-900 uppercase tracking-widest mb-1">
              {isBangla ? item.labelBn : item.labelEn}
            </h4>
            <p className="text-[11px] text-slate-500 leading-normal font-sans">
              {isBangla ? item.descBn : item.descEn}
            </p>
          </div>
        ))}
      </div>

      {/* Meta features label */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 pb-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest font-semibold">
        <span className="flex items-center space-x-1">
          <ShieldCheck className="w-4 h-4 text-crimson" />
          <span>{isBangla ? 'শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয় অনুমোদিত' : 'Dhaka Board & NU Affiliated'}</span>
        </span>
        <span className="text-slate-300">|</span>
        <span className="flex items-center space-x-1">
          <CalendarRange className="w-4 h-4 text-crimson" />
          <span>{isBangla ? 'প্রতিষ্ঠিত: ১৯৫৪ খ্রিস্টাব্দ' : `Established in ${GENERAL_STATS.establishedYear}`}</span>
        </span>
        <span className="text-slate-300">|</span>
        <span className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-crimson" />
          <span>{isBangla ? 'তেজগাঁও শিল্প এলাকা ক্যাম্পাস' : `Tejgaon Industrial Area Campus (${GENERAL_STATS.campusSize})`}</span>
        </span>
      </div>
    </div>
  );
};
