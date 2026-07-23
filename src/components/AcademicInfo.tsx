import React, { useState } from 'react';
import { CalendarRange, Download, BookOpen, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AcademicInfoProps {
  isBangla: boolean;
}

export const AcademicInfo: React.FC<AcademicInfoProps> = ({ isBangla }) => {
  const [selectedClass, setSelectedClass] = useState<'xi' | 'xii'>('xi');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const routineXI = [
    { period: '1st (10:00 - 10:45)', sun: 'Physics (Rm 201)', mon: 'Chemistry (Rm 202)', tue: 'Mathematics (Rm 203)', wed: 'ICT (Lab 2)', thu: 'Bangla (Rm 101)' },
    { period: '2nd (10:45 - 11:30)', sun: 'English (Rm 102)', mon: 'Bangla (Rm 101)', tue: 'Physics (Rm 201)', wed: 'Chemistry (Rm 202)', thu: 'Mathematics (Rm 203)' },
    { period: '3rd (11:30 - 12:15)', sun: 'Mathematics (Rm 203)', mon: 'ICT (Lab 2)', tue: 'Zoology (Rm 301)', wed: 'Botany (Rm 302)', thu: 'English (Rm 102)' },
    { period: '4th (12:15 - 01:00)', sun: 'Botany (Rm 302)', mon: 'Zoology (Rm 301)', tue: 'English (Rm 102)', wed: 'Physics (Rm 201)', thu: 'Chemistry (Rm 202)' },
    { period: '5th (01:00 - 01:45)', sun: 'Physics Lab (Gp A)', mon: 'Chemistry Lab (Gp B)', tue: 'Math Practice (Rm 203)', wed: 'Zoology Lab (Gp C)', thu: 'Botany Lab (Gp D)' }
  ];

  const routineXII = [
    { period: '1st (10:00 - 10:45)', sun: 'Chemistry (Rm 202)', mon: 'Physics (Rm 201)', tue: 'Bangla (Rm 101)', wed: 'Mathematics (Rm 203)', thu: 'ICT (Lab 2)' },
    { period: '2nd (10:45 - 11:30)', sun: 'Mathematics (Rm 203)', mon: 'English (Rm 102)', tue: 'Chemistry (Rm 202)', wed: 'Physics (Rm 201)', thu: 'Zoology (Rm 301)' },
    { period: '3rd (11:30 - 12:15)', sun: 'Bangla (Rm 101)', mon: 'Botany (Rm 302)', tue: 'ICT (Lab 2)', wed: 'English (Rm 102)', thu: 'Chemistry (Rm 202)' },
    { period: '4th (12:15 - 01:00)', sun: 'Zoology (Rm 301)', mon: 'Mathematics (Rm 203)', tue: 'Physics (Rm 201)', wed: 'Botany (Rm 302)', thu: 'English (Rm 102)' },
    { period: '5th (01:00 - 01:45)', sun: 'Chemistry Lab (Gp A)', mon: 'Physics Lab (Gp B)', tue: 'Zoology Lab (Gp D)', wed: 'Botany Lab (Gp A)', thu: 'ICT Lab (Gp C)' }
  ];

  const activeRoutine = selectedClass === 'xi' ? routineXI : routineXII;

  const triggerDownload = (fileName: string) => {
    setToastMessage(isBangla 
      ? `সফলভাবে ডাউনলোড হয়েছে: ${fileName}` 
      : `Successfully downloaded: ${fileName}`);
    
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div id="academic-info-page" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-750 text-white px-5 py-3.5 rounded shadow-xl font-mono text-xs flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Editorial Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
          {isBangla ? 'একাডেমিক কার্যক্রম ও রুটিন গাইড' : 'ACADEMIC CALENDARS & SCHEDULES'}
        </span>
        <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
          {isBangla ? 'একাডেমিক কার্যক্রম' : 'Academic Activities & Routines'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBangla 
            ? 'কলেজের নিয়মিত ক্লাস রুটিন এবং সিলেবাস বিবরণী পত্রসমূহ।' 
            : 'Access weekly science schedules, academic routines, and syllabus guides.'}
        </p>
      </div>

      {/* Routine Section */}
      <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h3 className="text-sm font-serif font-bold text-slate-900 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-crimson" />
            <span>{isBangla ? 'সাপ্তাহিক ক্লাস রুটিন (বিজ্ঞান বিভাগ)' : 'Class Timetables (Science Group)'}</span>
          </h3>

          <div className="inline-flex bg-slate-100 p-1 rounded border border-slate-200">
            <button
              onClick={() => setSelectedClass('xi')}
              className={`px-4 py-1 text-xs font-bold transition-all rounded cursor-pointer ${
                selectedClass === 'xi' ? 'bg-crimson text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {isBangla ? 'একাদশ শ্রেণি (Class XI)' : 'Class XI (1st Year)'}
            </button>
            <button
              onClick={() => setSelectedClass('xii')}
              className={`px-4 py-1 text-xs font-bold transition-all rounded cursor-pointer ${
                selectedClass === 'xii' ? 'bg-crimson text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {isBangla ? 'দ্বাদশ শ্রেণি (Class XII)' : 'Class XII (2nd Year)'}
            </button>
          </div>
        </div>

        {/* Timetable table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs border border-slate-200">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-650 font-mono text-[9px] uppercase tracking-wider">
                <th className="p-3 pl-4 border-r border-slate-200">{isBangla ? 'ঘণ্টা / পিরিয়ড' : 'Period / Hour'}</th>
                <th className="p-3 border-r border-slate-200">{isBangla ? 'রবিবার' : 'Sunday'}</th>
                <th className="p-3 border-r border-slate-200">{isBangla ? 'সোমবার' : 'Monday'}</th>
                <th className="p-3 border-r border-slate-200">{isBangla ? 'মঙ্গলবার' : 'Tuesday'}</th>
                <th className="p-3 border-r border-slate-200">{isBangla ? 'বুধবার' : 'Wednesday'}</th>
                <th className="p-3 pr-4">{isBangla ? 'বৃহস্পতিবার' : 'Thursday'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
              {activeRoutine.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 pl-4 border-r border-slate-200 font-mono font-bold bg-slate-50/50">{row.period}</td>
                  <td className="p-3 border-r border-slate-200 font-medium text-slate-800">{row.sun}</td>
                  <td className="p-3 border-r border-slate-200 font-medium text-slate-800">{row.mon}</td>
                  <td className="p-3 border-r border-slate-200 font-medium text-slate-800">{row.tue}</td>
                  <td className="p-3 border-r border-slate-200 font-medium text-slate-800">{row.wed}</td>
                  <td className="p-3 pr-4 font-medium text-slate-800">{row.thu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => triggerDownload(`Class_${selectedClass.toUpperCase()}_Routine_2026.pdf`)}
            className="flex items-center space-x-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider py-2 px-4 rounded border border-slate-250 cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4 text-crimson" />
            <span>{isBangla ? 'রুটিন পিডিএফ ডাউনলোড' : 'Download Routine PDF'}</span>
          </button>
        </div>
      </div>

      {/* Syllabus & Guidelines Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Academic Calendar info */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6">
          <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <CalendarRange className="w-5 h-5 text-crimson" />
            <span>{isBangla ? 'একাডেমিক বর্ষপঞ্জি ২০২৬' : 'Academic Calendar 2026'}</span>
          </h3>

          <div className="space-y-4 text-xs font-sans text-slate-600">
            <div className="flex items-start space-x-3 pb-3 border-b border-slate-100">
              <span className="font-mono text-crimson font-black text-right min-w-[70px] shrink-0">Jun 22</span>
              <div>
                <p className="font-bold text-slate-900">{isBangla ? 'একাদশ বার্ষিক পরীক্ষা শুরু' : 'Class XI Annual Exam Starts'}</p>
                <p className="text-[11px] text-slate-400">Class XI core syllabus examination across all active subjects.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 pb-3 border-b border-slate-100">
              <span className="font-mono text-slate-500 font-black text-right min-w-[70px] shrink-0">Jul 10</span>
              <div>
                <p className="font-bold text-slate-900">{isBangla ? 'গ্রীষ্মকালীন ছুটি ও মহররম' : 'Summer Vacation & Ashura'}</p>
                <p className="text-[11px] text-slate-400">College campuses close. Administrative offices remain partially active.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 pb-3 border-b border-slate-100">
              <span className="font-mono text-slate-500 font-black text-right min-w-[70px] shrink-0">Aug 12</span>
              <div>
                <p className="font-bold text-slate-900">{isBangla ? 'দ্বাদশ শ্রেণির ক্লাস টেস্ট' : 'Class XII Midterm Quizzes'}</p>
                <p className="text-[11px] text-slate-400">Class XII assessments for laboratory qualifications.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => triggerDownload('Academic_Calendar_2026.pdf')}
            className="w-full flex items-center justify-center space-x-1.5 bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-wider text-xs font-bold py-3.5 px-4 rounded transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4 text-white" />
            <span>{isBangla ? 'একাডেমিক ক্যালেন্ডার ডাউনলোড' : 'Download Academic Calendar'}</span>
          </button>
        </div>

        {/* Syllabus Guides lists */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6">
          <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-crimson" />
            <span>{isBangla ? 'শ্রেণি ভিত্তিক সিলেবাস বুকলেট' : 'Syllabus Guides & Materials'}</span>
          </h3>

          <div className="space-y-3">
            {[
              { code: 'HSC-PHY', title: 'HSC Physics Syllabus (Paper I & II)', size: '1.8 MB' },
              { code: 'HSC-CHE', title: 'HSC Chemistry Syllabus (Paper I & II)', size: '2.1 MB' },
              { code: 'HSC-MTH', title: 'HSC Higher Math Syllabus (Paper I & II)', size: '1.5 MB' },
              { code: 'HSC-ICT', title: 'HSC Information & Communication Tech', size: '1.2 MB' }
            ].map((syl, idx) => (
              <div 
                key={idx}
                className="p-3 bg-slate-50 border border-slate-150 rounded flex items-center justify-between hover:border-crimson/20 transition-all text-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded border border-slate-200 text-crimson font-bold font-mono">
                    📄
                  </div>
                  <div className="text-left space-y-0.5">
                    <span className="text-[9px] font-mono font-bold text-slate-400">{syl.code}</span>
                    <h4 className="font-semibold text-slate-800 leading-snug">{syl.title}</h4>
                  </div>
                </div>

                <button
                  onClick={() => triggerDownload(`${syl.code}_Syllabus.pdf`)}
                  className="flex items-center space-x-1 text-crimson hover:text-crimson-dark font-mono font-black uppercase text-[10px] px-2 py-1 cursor-pointer"
                >
                  <span>Download</span>
                  <ArrowRight className="w-3 h-3 text-crimson" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
