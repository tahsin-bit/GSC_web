import React, { useState } from 'react';
import { Search, Printer, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Landmark } from 'lucide-react';
import { RESULTS_DB, BOARD_RESULTS_STATS } from '../data/mockData';

interface ResultsCheckerProps {
  isBangla: boolean;
}

export const ResultsChecker: React.FC<ResultsCheckerProps> = ({ isBangla }) => {
  const [examType, setExamType] = useState('Class XI Annual Exam');
  const [session, setSession] = useState('2025-2026');
  const [roll, setRoll] = useState('');
  const [reg, setReg] = useState('');
  const [searched, setSearched] = useState(false);
  const [resultRecord, setResultRecord] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    const record = RESULTS_DB.find(
      r => r.roll === roll.trim() && 
           r.reg === reg.trim() && 
           r.examType === examType && 
           r.session === session
    );

    setResultRecord(record || null);
  };

  const resetForm = () => {
    setRoll('');
    setReg('');
    setSearched(false);
    setResultRecord(null);
  };

  return (
    <div id="results-checker-page" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left print:p-0">
      
      {/* Editorial Header */}
      <div className="pb-4 border-b border-slate-200 print:hidden">
        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
          {isBangla ? 'পরীক্ষা নিয়ন্ত্রণ দপ্তর ও ফলাফল আর্কাইভ' : 'OFFICE OF CONTROLLER OF EXAMINATIONS'}
        </span>
        <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
          {isBangla ? 'ফলাফল অনুসন্ধান ও পরীক্ষার বিবরণী' : 'Online Results Portal'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBangla 
            ? 'অভ্যন্তরীণ পরীক্ষার ফলাফল এবং অতীতের বোর্ড পরীক্ষার পরিসংখ্যান যাচাই করুন।' 
            : 'Access GSC internal academic transcript ledgers and board performance histories.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LHS Results Query form */}
        <div className="lg:col-span-5 print:hidden">
          <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Search className="w-5 h-5 text-crimson" />
              <span>{isBangla ? 'অনলাইন ট্রান্সক্রিপ্ট ফাইন্ডার' : 'Academic Results Search'}</span>
            </h3>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'পরীক্ষার নাম' : 'Select Examination'}</label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-xs text-slate-700 focus:outline-none"
                >
                  <option value="Class XI Annual Exam">{isBangla ? 'একাদশ শ্রেণি বার্ষিক পরীক্ষা' : 'Class XI Annual Exam'}</option>
                  <option value="HSC Pre-test Exam">{isBangla ? 'দ্বাদশ শ্রেণি প্রাক-নির্বাচনী পরীক্ষা' : 'HSC Pre-test Exam'}</option>
                  <option value="HSC Test Exam">{isBangla ? 'দ্বাদশ শ্রেণি নির্বাচনী পরীক্ষা (HSC Test)' : 'HSC Test Exam'}</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'শিক্ষাবর্ষ / সেশন' : 'Academic Session'}</label>
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-xs text-slate-700 focus:outline-none font-mono"
                >
                  <option value="2025-2026">2025-2026</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'রোল নম্বর' : 'Student Roll'}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 20501"
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 font-mono focus:outline-none focus:border-crimson"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'রেজিস্ট্রেশন নম্বর' : 'Registration No.'}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 987654"
                    value={reg}
                    onChange={(e) => setReg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 font-mono focus:outline-none focus:border-crimson"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-wider text-xs font-bold py-3.5 px-4 rounded transition-all cursor-pointer shadow-sm flex items-center justify-center space-x-1.5"
              >
                <Search className="w-4 h-4 text-white" />
                <span>{isBangla ? 'ফলাফল অনুসন্ধান করুন' : 'Retrieve Marksheet'}</span>
              </button>
            </form>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-500 leading-normal text-left">
              💡 <strong>{isBangla ? 'টেস্টিং ডেমো রোল:' : 'Testing credentials:'}</strong><br />
              {isBangla 
                ? 'অনলাইন ডাটাবেস পরীক্ষা করার জন্য Roll: 20501 এবং Registration: 987654 সেশন: 2025-2026 একাদশ শ্রেণির জন্য ব্যবহার করুন।' 
                : 'To test search, use Roll: 20501 & Reg: 987654 (Session: 2025-2026, Class XI).'}
            </div>
          </div>
        </div>

        {/* RHS Result Transcripts or board stats */}
        <div className="lg:col-span-7">
          
          {/* Default view before search */}
          {!searched && (
            <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6 print:hidden">
              <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-crimson" />
                <span>{isBangla ? 'বিগত এইচএসসি ফলাফল পরিসংখ্যান' : 'HSC Board Examination Statistics'}</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isBangla 
                  ? 'উচ্চ মাধ্যমিক পরীক্ষায় সরকারি বিজ্ঞান কলেজ ঢাকা বোর্ডের অন্যতম শ্রেষ্ঠ ফলাফল অর্জনকারী সরকারি কলেজ। নিচে বিগত কয়েক বছরের এইচএসসি পরীক্ষার ফলাফল তুলে ধরা হলো:' 
                  : 'GSC stands as one of the top academic performers in Dhaka education board examinations. Here are the historical summaries of GSC HSC cohorts:'}
              </p>

              <div className="overflow-hidden border border-slate-200 rounded text-xs font-sans">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[9px] uppercase tracking-wider">
                      <th className="p-3 pl-4">{isBangla ? 'পরীক্ষার বছর' : 'Board Year'}</th>
                      <th className="p-3">{isBangla ? 'অংশগ্রহণকারী পরীক্ষার্থী' : 'Total Passed'}</th>
                      <th className="p-3">{isBangla ? 'জিপিএ-৫ প্রাপ্ত' : 'GPA-5 Achieved'}</th>
                      <th className="p-3 pr-4 text-right">{isBangla ? 'পাশের হার' : 'Success Rate'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                    {BOARD_RESULTS_STATS.map((stat, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 pl-4 font-bold">{stat.year}</td>
                        <td className="p-3">{stat.totalPassed}</td>
                        <td className="p-3 text-emerald-600 font-bold">{stat.gpa5}</td>
                        <td className="p-3 pr-4 text-right text-crimson font-black">{stat.passRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Searched and result found */}
          {searched && resultRecord && (
            <div className="space-y-4">
              {/* Transcript Sheet card (Print-friendly) */}
              <div className="bg-white border border-slate-300 rounded shadow-lg p-6 sm:p-10 text-left font-serif leading-relaxed text-slate-900 relative">
                
                {/* Bar code watermarks */}
                <div className="absolute right-6 top-6 bg-slate-50 p-1.5 border border-slate-200 rounded text-center print:hidden">
                  <div className="h-6 w-24 flex items-center justify-center space-x-0.5 overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="bg-slate-800 h-full shrink-0" style={{ width: `${(i % 3 === 0 ? 3 : 1)}px` }} />
                    ))}
                  </div>
                  <p className="text-[7px] text-slate-400 font-mono uppercase tracking-widest pt-0.5">SECURE VERIFIED</p>
                </div>

                {/* Memo Header */}
                <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
                  <div className="font-sans text-[8px] sm:text-[9px] tracking-widest font-black uppercase text-slate-500 flex items-center justify-center space-x-1 leading-none">
                    <span>GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH</span>
                  </div>
                  <h1 className="text-lg sm:text-2xl font-black uppercase text-crimson tracking-tight pt-1">
                    Government Science College
                  </h1>
                  <p className="font-sans text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest leading-none">
                    Tejgaon, Dhaka-1215 • Board Code: 1008 • EIIN: 108535
                  </p>
                  <div className="inline-block bg-slate-900 text-white font-sans text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded mt-2">
                    ACADEMIC TRANSCRIPT / গ্রেড শীট
                  </div>
                </div>

                {/* Student Details Grid */}
                <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-4 pt-4 text-xs font-sans text-slate-800 leading-normal">
                  <div className="space-y-1">
                    <p><strong>{isBangla ? 'শিক্ষার্থীর নাম:' : 'Student Name:'}</strong> <span className="font-serif font-black">{resultRecord.name}</span></p>
                    <p><strong>{isBangla ? 'রোল নম্বর:' : 'Roll Number:'}</strong> <span className="font-mono">{resultRecord.roll}</span></p>
                    <p><strong>{isBangla ? 'রেজিস্ট্রেশন নম্বর:' : 'Registration No:'}</strong> <span className="font-mono">{resultRecord.reg}</span></p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p><strong>{isBangla ? 'পরীক্ষার বিবরণ:' : 'Examination:'}</strong> {resultRecord.examType}</p>
                    <p><strong>{isBangla ? 'শিক্ষাবর্ষ / সেশন:' : 'Session:'}</strong> <span className="font-mono">{resultRecord.session}</span></p>
                    <p><strong>{isBangla ? 'ফলাফল স্থিতি:' : 'Status:'}</strong> <span className="text-emerald-600 font-bold uppercase">PASSED (পাস)</span></p>
                  </div>
                </div>

                {/* Marksheet table */}
                <div className="overflow-x-auto pt-4 text-xs font-sans">
                  <table className="w-full text-left border border-slate-300">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-300 text-slate-700 font-bold">
                        <th className="p-2.5 border-r border-slate-300 pl-4">{isBangla ? 'বিষয় কোড' : 'Subject Code'}</th>
                        <th className="p-2.5 border-r border-slate-300">{isBangla ? 'বিষয়' : 'Subject Name'}</th>
                        <th className="p-2.5 border-r border-slate-300 text-center">{isBangla ? 'প্রাপ্ত নম্বর' : 'Marks'}</th>
                        <th className="p-2.5 border-r border-slate-300 text-center">{isBangla ? 'লেটার গ্রেড' : 'Grade Letter'}</th>
                        <th className="p-2.5 text-center pr-4">{isBangla ? 'গ্রেড পয়েন্ট' : 'Grade Point'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 border-b border-slate-300">
                      {resultRecord.subjects.map((sub: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-2.5 border-r border-slate-200 pl-4 font-mono">{sub.code}</td>
                          <td className="p-2.5 border-r border-slate-200 font-semibold">{sub.name}</td>
                          <td className="p-2.5 border-r border-slate-200 text-center font-mono">{sub.marks}</td>
                          <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-800">{sub.letterGrade}</td>
                          <td className="p-2.5 text-center pr-4 font-mono font-bold text-slate-800">{sub.gp.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals Summary */}
                <div className="flex justify-between items-center bg-slate-50 p-4 border border-t-0 border-slate-300 rounded-b font-sans text-xs">
                  <div className="text-left">
                    <p className="text-[9px] text-slate-400 font-mono uppercase font-bold">{isBangla ? 'সামগ্রিক জিপিএ' : 'CUMULATIVE GPA'}</p>
                    <div className="flex items-baseline space-x-1 mt-0.5">
                      <span className="text-2xl font-black font-mono text-emerald-600">{resultRecord.gpa.toFixed(2)}</span>
                      <span className="text-slate-400 font-mono text-[10px]">/ 5.00</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 font-mono uppercase font-bold">{isBangla ? 'লেটার গ্রেড' : 'FINAL GRADE'}</p>
                    <span className="inline-block bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono font-bold px-3 py-1 rounded text-sm mt-0.5 uppercase">
                      {resultRecord.grade}
                    </span>
                  </div>
                </div>

                {/* Signatures */}
                <div className="pt-10 flex justify-between items-end font-sans">
                  <div className="text-center space-y-1 w-44 border-t border-slate-300 pt-2 text-[10px] text-slate-500">
                    <p className="font-bold">{isBangla ? 'কম্পিউটার অপারেটর' : 'Prepared by'}</p>
                    <p className="text-[9px]">GSC Exam Control Office</p>
                  </div>
                  
                  <div className="text-center space-y-1 w-44 border-t border-slate-300 pt-2 text-[10px] text-slate-500">
                    <div className="h-6 flex items-center justify-center">
                      <span className="text-[8px] border border-crimson/30 text-crimson rounded px-2 py-0.2 uppercase font-mono font-bold bg-crimson/5">APPROVED</span>
                    </div>
                    <h4 className="font-bold text-slate-800">{isBangla ? 'প্রফেসর সালমা বেগম' : 'Prof. Salma Begum'}</h4>
                    <p className="text-[9px] uppercase font-bold tracking-wider">{isBangla ? 'অধ্যক্ষ' : 'Principal'}</p>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center gap-4 bg-white border border-slate-200 p-4 rounded shadow-sm print:hidden">
                <button
                  onClick={resetForm}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-all cursor-pointer border border-slate-250"
                >
                  {isBangla ? 'নতুন অনুসন্ধান' : 'Search Again'}
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-crimson hover:bg-crimson-dark text-white text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all cursor-pointer shadow flex items-center space-x-1.5"
                >
                  <Printer className="w-4 h-4 text-white" />
                  <span>{isBangla ? 'সার্টিফিকেট ডাউনলোড / প্রিন্ট' : 'Print Official Transcript'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Searched and result NOT found */}
          {searched && !resultRecord && (
            <div className="bg-white border border-slate-200 rounded p-8 sm:p-12 shadow-md text-center space-y-6 print:hidden">
              <div className="w-16 h-16 bg-red-50 border border-red-200 text-crimson rounded-full flex items-center justify-center mx-auto shadow-inner">
                <AlertTriangle className="w-8 h-8 text-crimson" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wide">
                  {isBangla ? 'কোনো ফলাফল পাওয়া যায় নি' : 'Record Not Found'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  {isBangla 
                    ? 'আপনার প্রবিষ্ট রোল নম্বর, রেজিস্ট্রেশন নম্বর এবং সেশনের জন্য সার্ভারে কোনো তথ্য পাওয়া যায়নি। অনুগ্রহ করে সঠিক তথ্য প্রদান করুন।' 
                    : 'The roll or registration number you entered is not mapped to this academic session inside GSC results registers.'}
                </p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs text-slate-600 max-w-sm mx-auto">
                💡 <strong>{isBangla ? 'পরামর্শ:' : 'Tip:'}</strong> {isBangla ? 'একাদশ সেশন ২০২৫-২০২৬ এর জন্য Roll: 20501 এবং Reg: 987654 টাইপ করে ট্রাই করুন।' : 'Try searching with Roll: 20501 and Reg: 987654 (Session 2025-2026).'}
              </div>

              <button
                onClick={resetForm}
                className="bg-crimson hover:bg-crimson-dark text-white text-xs font-mono font-bold uppercase tracking-wider px-5 py-3 rounded cursor-pointer transition-all shadow"
              >
                {isBangla ? 'ফলাফল ফর্ম রিসেট' : 'Back to Search'}
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
