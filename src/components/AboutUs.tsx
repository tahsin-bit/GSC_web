import React, { useState } from 'react';
import { History, Target, Landmark, Building2, BookOpen, Hotel, Trophy, Eye } from 'lucide-react';
import { GENERAL_STATS, PAST_PRINCIPALS } from '../data/mockData';

interface AboutUsProps {
  isBangla: boolean;
}

export const AboutUs: React.FC<AboutUsProps> = ({ isBangla }) => {
  const [activeSection, setActiveSection] = useState<'history' | 'vision' | 'glance' | 'infrastructure'>('history');

  return (
    <div id="about-us-page" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left">
      
      {/* Editorial Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
          {isBangla ? 'কলেজ পরিচিতি ও গৌরবময় ঐতিহ্য' : 'INSTITUTIONAL HERITAGE & OVERVIEW'}
        </span>
        <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
          {isBangla ? 'আমাদের সম্পর্কে' : 'About Government Science College'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBangla 
            ? '১৯৫৪ সাল থেকে বিজ্ঞান ও প্রযুক্তির বুনিয়াদ গঠনে কাজ করে আসা ঢাকার তেজগাঁওয়ের ঐতিহাসিক শিক্ষা প্রতিষ্ঠান।' 
            : 'Fostering science education, discipline, and outstanding board results in Tejgaon, Dhaka since 1954.'}
        </p>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap border-b border-slate-200 gap-1 sm:gap-2">
        <button
          onClick={() => setActiveSection('history')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSection === 'history'
              ? 'border-crimson text-crimson bg-slate-50'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <History className="w-4 h-4" />
          <span>{isBangla ? 'সৃষ্টির ইতিহাস' : 'History & Legacy'}</span>
        </button>

        <button
          onClick={() => setActiveSection('vision')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSection === 'vision'
              ? 'border-crimson text-crimson bg-slate-50'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>{isBangla ? 'লক্ষ্য ও উদ্দেশ্য' : 'Vision & Mission'}</span>
        </button>

        <button
          onClick={() => setActiveSection('glance')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSection === 'glance'
              ? 'border-crimson text-crimson bg-slate-50'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>{isBangla ? 'এক নজরে কলেজ' : 'At a Glance'}</span>
        </button>

        <button
          onClick={() => setActiveSection('infrastructure')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSection === 'infrastructure'
              ? 'border-crimson text-crimson bg-slate-50'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{isBangla ? 'প্রাতিষ্ঠানিক অবকাঠামো' : 'Infrastructure'}</span>
        </button>
      </div>

      {/* Main Dynamic View Panels */}
      <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md">
        
        {activeSection === 'history' && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
              <History className="w-5.5 h-5.5 text-crimson" />
              <span>{isBangla ? 'সরকারি বিজ্ঞান কলেজ সৃষ্টির গৌরবময় ইতিহাস' : 'Historical Origins of Government Science College'}</span>
            </h2>
            <div className="w-12 h-1 bg-crimson"></div>
            
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 font-sans">
              <p>
                {isBangla 
                  ? '১৯৫৪ সালে ঢাকার তেজগাঁও শিল্প এলাকার প্রাণকেন্দ্রে কারিগরি উচ্চ বিদ্যালয় (Technical High School) হিসেবে এই স্বনামধন্য প্রতিষ্ঠানটির প্রথম যাত্রা শুরু হয়। তৎকালীন কলম্বো প্ল্যান (Colombo Plan) এর আর্থিক অনুদান এবং ফোর্ড ফাউন্ডেশন (Ford Foundation) এর কারিগরি সহায়তায় প্রতিষ্ঠানটি প্রতিষ্ঠিত হয়েছিল।' 
                  : 'In 1954, the prestigious institution began its historical journey as a specialized Technical High School in the heart of the Tejgaon Industrial Area, Dhaka. It was funded by the Colombo Plan and received primary technical machinery and design guidance from the Ford Foundation.'}
              </p>
              
              <div className="p-4 bg-slate-50 border-l-4 border-crimson rounded my-4">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-1">{isBangla ? 'কারিগরি শিক্ষায় অবদান' : 'Pioneering Technical Education'}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600">
                  {isBangla 
                    ? 'তৎকালীন পূর্ব পাকিস্তানে বিজ্ঞান ও বৃত্তিমূলক কারিগরি শিক্ষার বিস্তার ও যুবকদের শিল্পায়নে দক্ষ করে তোলার লক্ষ্যে এটি তৈরি করা হয়। ১৯৬২ সালে কলেজটিকে ইন্টারমিডিয়েট টেকনিক্যাল কলেজ (Intermediate Technical College) হিসেবে উন্নীত করা হয়।' 
                    : 'The school aimed to nurture technical competencies and specialized industrial skills in the region. In 1962, the school was upgraded to the Intermediate Technical College (ITC), offering advanced coursework in pre-engineering streams.'}
                </p>
              </div>

              <p>
                {isBangla 
                  ? 'বাংলাদেশ স্বাধীন হওয়ার পর ১৯৭২ সালে কলেজটিতে স্নাতক (বিজ্ঞান পাস কোর্স) শাখা চালু করা হয় এবং এর নাম পরিবর্তন করে "সরকারি বিজ্ঞান কলেজ" রাখা হয়। এটি সাধারণ শিক্ষা ধারা ও বিজ্ঞান শিক্ষার প্রসারে গুরুত্বপূর্ণ অবদান রাখতে শুরু করে এবং মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর, শিক্ষা মন্ত্রণালয়ের অধীনে পুরোপুরি সরকারি কলেজ হিসেবে ন্যস্ত হয়।' 
                  : 'Following the independence of Bangladesh, Bachelor of Science (B.Sc.) pass courses were introduced in 1972, and the college was renamed "Government Science College". Since then, it has transitioned from technical vocational training to a purely science-focused general intermediate and undergraduate education center under the Ministry of Education.'}
              </p>

              <p>
                {isBangla 
                  ? 'বর্তমানে এটি ঢাকা বোর্ডের অধীনস্থ একটি অত্যন্ত সুপরিচিত ও স্বনামধন্য শিক্ষা প্রতিষ্ঠান, যেখানে প্রতি বছর হাজার হাজার শিক্ষার্থী তাদের মাধ্যমিক উত্তর বিজ্ঞান শিক্ষা গ্রহণ করতে আসে। এর নিয়মানুবর্তিতা, বিজ্ঞানাগারসমূহ এবং শিক্ষকদের নিবিড় তদারকির কারণে এটি বিজ্ঞান শিক্ষার অন্যতম আলোকবর্তিকা।' 
                  : 'Today, GSC is recognized as a premier institution in Dhaka, producing outstanding outcomes in board exams. Renowned for its rigorous discipline, extensive laboratory layouts, and dedicated faculty support, it stands as a leading institute for STEM studies.'}
              </p>
            </div>
          </div>
        )}

        {activeSection === 'vision' && (
          <div className="space-y-8 max-w-4xl">
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <Target className="w-5.5 h-5.5 text-crimson" />
                <span>{isBangla ? 'লক্ষ্য ও উদ্দেশ্য' : 'Vision, Mission & Academic Focus'}</span>
              </h2>
              <div className="w-12 h-1 bg-crimson"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="bg-slate-50 p-6 rounded border border-slate-200 text-left space-y-3">
                <div className="w-10 h-10 bg-crimson rounded flex items-center justify-center text-white font-bold">
                  <Eye className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-sm font-serif font-bold text-slate-900 uppercase tracking-wider">{isBangla ? 'আমাদের রূপকল্প (Vision)' : 'Our Vision'}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {isBangla 
                    ? 'বিজ্ঞানমনস্ক, সৃজনশীল ও সুশৃঙ্খল নাগরিক তৈরি করা, যারা আধুনিক প্রযুক্তির উৎকর্ষতা অর্জনের মাধ্যমে দেশ গঠনে অগ্রণী ভূমিকা পালন করবে।' 
                    : 'To cultivate analytically-minded, creative, and highly disciplined leaders who will spearhead scientific progress and contribute positively to national development.'}
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded border border-slate-200 text-left space-y-3">
                <div className="w-10 h-10 bg-crimson rounded flex items-center justify-center text-white font-bold">
                  <Target className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-sm font-serif font-bold text-slate-900 uppercase tracking-wider">{isBangla ? 'আমাদের মিশন (Mission)' : 'Our Mission'}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {isBangla 
                    ? 'আধুনিক সুসজ্জিত বিজ্ঞান ল্যাবরেটরি, ব্যবহারিক কার্যক্রম ও অভিজ্ঞ শিক্ষকদের দিকনির্দেশনায় শিক্ষার্থীদের তাত্ত্বিক ও ব্যবহারিক বিজ্ঞানে দক্ষ গড়ে তোলা এবং চারিত্রিক বিকাশ ঘটানো।' 
                    : 'To provide high-quality science instructions, extensive laboratory experiments, and rigorous character development through mentored training programs.'}
                </p>
              </div>
            </div>

            <div className="p-5 bg-crimson/5 border-l-4 border-crimson rounded space-y-2 text-left">
              <h4 className="font-mono text-xs text-crimson font-bold uppercase tracking-widest">{isBangla ? 'আমাদের মূল মন্ত্র' : 'GSC Core Motto'}</h4>
              <p className="font-serif italic font-black text-sm sm:text-base text-slate-800">
                {isBangla ? '"শৃঙ্খলা, শিক্ষা, চরিত্র ও উন্নয়ন"' : '"Discipline, Education, Character & Development"'}
              </p>
            </div>
          </div>
        )}

        {activeSection === 'glance' && (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
              <Landmark className="w-5.5 h-5.5 text-crimson" />
              <span>{isBangla ? 'এক নজরে সকল তথ্য ও পরিসংখ্যান' : 'GSC At a Glance'}</span>
            </h2>
            <div className="w-12 h-1 bg-crimson"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
              {/* Stats Grid table */}
              <div className="md:col-span-8 overflow-hidden border border-slate-200 rounded shadow-sm text-xs font-sans">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <th className="p-3 font-semibold">{isBangla ? 'বিবরণ' : 'Academic Feature'}</th>
                      <th className="p-3 font-semibold">{isBangla ? 'তথ্যাদি / বিবরণী' : 'Official Statistics'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 font-medium text-slate-500">{isBangla ? 'অফিসিয়াল কোড (EIIN)' : 'College EIIN Code'}</td>
                      <td className="p-3 font-mono font-bold">108535</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-500">{isBangla ? 'ঢাকা বোর্ড কলেজ কোড' : 'Dhaka Board College Code'}</td>
                      <td className="p-3 font-mono font-bold">1008</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-500">{isBangla ? 'স্থাপিত শিক্ষাবর্ষ' : 'Established Year'}</td>
                      <td className="p-3 font-mono font-bold">{GENERAL_STATS.establishedYear} AD</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-500">{isBangla ? 'মোট আয়তন' : 'Campus Physical Area'}</td>
                      <td className="p-3 font-mono font-bold">{GENERAL_STATS.campusSize} (Approx 9 Acres)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-500">{isBangla ? 'শ্রেণি ও অনুষদ' : 'Offered Tracks'}</td>
                      <td className="p-3">{isBangla ? 'উচ্চ মাধ্যমিক (বিজ্ঞান) এবং স্নাতক বি.এসসি (পাস কোর্স)' : 'HSC (Science group only) & B.Sc (Pass Course)'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-500">{isBangla ? 'মোট শিক্ষার্থী ধারণক্ষমতা' : 'Student Enrolled Body'}</td>
                      <td className="p-3 font-mono font-bold">3,250+</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-500">{isBangla ? 'মোট শিক্ষক সংখ্যা' : 'Faculty Strengths'}</td>
                      <td className="p-3 font-mono font-bold">{GENERAL_STATS.facultyCount} Active Teachers</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-500">{isBangla ? 'ব্যবহারিক বিজ্ঞানাগার' : 'Active Science Laboratories'}</td>
                      <td className="p-3 font-mono font-bold">{GENERAL_STATS.labCount} Labs Complexes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Sidebar badge stats info */}
              <div className="md:col-span-4 bg-slate-50 p-6 rounded border border-slate-200 space-y-4 text-left">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-crimson" />
                  <span>{isBangla ? 'গৌরব ও সাফল্য' : 'Academic Accolades'}</span>
                </h4>
                
                <div className="space-y-3.5 text-xs text-slate-600">
                  <div>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold uppercase">95.6% SUCCESS</span>
                    <p className="font-semibold text-slate-800 mt-1">{isBangla ? 'এইচএসসি বোর্ড পরীক্ষার ফলাফল' : 'Board Exam Success Percentage'}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{isBangla ? 'ঢাকার শীর্ষস্থানীয় সরকারি কলেজসমূহের অন্যতম।' : 'Consistently ranked among the top government colleges in Dhaka division.'}</p>
                  </div>
                  <div>
                    <span className="text-[9px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono font-bold uppercase">100% SECURE</span>
                    <p className="font-semibold text-slate-800 mt-1">{isBangla ? 'স্মার্ট ল্যাবরেটরি ল্যাব' : 'Technical Laboratory Complexes'}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{isBangla ? 'ব্যবহারিক ক্লাসের জন্য পর্যাপ্ত যন্ত্রপাতি।' : 'Equipped with individual lab tables, computing assets, and qualitative sets.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'infrastructure' && (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
              <Building2 className="w-5.5 h-5.5 text-crimson" />
              <span>{isBangla ? 'প্রাতিষ্ঠানিক অবকাঠামোগত সুবিধা' : 'Campus Infrastructure & Facilities'}</span>
            </h2>
            <div className="w-12 h-1 bg-crimson"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              
              {/* Labs */}
              <div className="bg-slate-50 p-5 rounded border border-slate-200 text-left space-y-3 hover:border-crimson/20 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-crimson/10 border border-crimson/20 text-crimson rounded flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 text-crimson" />
                </div>
                <h3 className="text-xs font-serif font-bold text-slate-900 uppercase tracking-wider">{isBangla ? 'বিজ্ঞানাগার / ল্যাব' : 'Science Lab Complexes'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {isBangla 
                    ? 'পদার্থবিজ্ঞান, রসায়ন, উচ্চতর গণিত, আইসিটি, উদ্ভিদবিজ্ঞান এবং প্রাণিবিজ্ঞান বিভাগের জন্য মোট ১২টি সুসজ্জিত গবেষণাগার রয়েছে।' 
                    : '12 active laboratories for Physics, Chemistry, Higher Maths, Zoology, Botany, and two computer labs with broadband terminals.'}
                </p>
              </div>

              {/* Hostel */}
              <div className="bg-slate-50 p-5 rounded border border-slate-200 text-left space-y-3 hover:border-crimson/20 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-crimson/10 border border-crimson/20 text-crimson rounded flex items-center justify-center font-bold">
                  <Hotel className="w-5 h-5 text-crimson" />
                </div>
                <h3 className="text-xs font-serif font-bold text-slate-900 uppercase tracking-wider">{isBangla ? 'আবাসিক ছাত্রাবাস' : 'Residential Hostels'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {isBangla 
                    ? 'দূরবর্তী শিক্ষার্থীদের আবাসনের জন্য দুটি সুপরিসর ডরমিটরি রয়েছে: ড. কুদরত-ই-খুদা হোস্টেল এবং কাজী নজরুল ইসলাম হোস্টেল।' 
                    : 'Providing housing for remote students through two dormitory blocks: Kazi Nazrul Islam Hostel and Dr. Qudrat-i-Khuda Hostel.'}
                </p>
              </div>

              {/* Library */}
              <div className="bg-slate-50 p-5 rounded border border-slate-200 text-left space-y-3 hover:border-crimson/20 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-crimson/10 border border-crimson/20 text-crimson rounded flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5 text-crimson" />
                </div>
                <h3 className="text-xs font-serif font-bold text-slate-900 uppercase tracking-wider">{isBangla ? 'সেন্ট্রাল লাইব্রেরি' : 'Central Reference Library'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {isBangla 
                    ? 'আমাদের লাইব্রেরিতে ১৫,০০০-এর বেশি বই, বৈজ্ঞানিক জার্নাল এবং রেফারেন্স বুক রয়েছে, যা শিক্ষার্থীদের পড়ার জন্য অত্যন্ত নিরিবিলি পরিবেশ দেয়।' 
                    : 'A library catalog hosting over 15,000 reference text books, science archives, and reference logs with reading rooms.'}
                </p>
              </div>

              {/* Gym */}
              <div className="bg-slate-50 p-5 rounded border border-slate-200 text-left space-y-3 hover:border-crimson/20 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-crimson/10 border border-crimson/20 text-crimson rounded flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5 text-crimson" />
                </div>
                <h3 className="text-xs font-serif font-bold text-slate-900 uppercase tracking-wider">{isBangla ? 'জিমনেসিয়াম ও খেলার মাঠ' : 'Gymnasium & Playground'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {isBangla 
                    ? 'শিক্ষার্থীদের শারীরিক সুস্থতা ও খেলাধুলার বিকাশে বিশাল খেলার মাঠ এবং ইনডোর জিমনেসিয়ামের সুবিধা রয়েছে।' 
                    : 'A spacious open playground for outdoor track activities and physical training blocks for sports teams.'}
                </p>
              </div>

              {/* Auditorium */}
              <div className="bg-slate-50 p-5 rounded border border-slate-200 text-left space-y-3 hover:border-crimson/20 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-crimson/10 border border-crimson/20 text-crimson rounded flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5 text-crimson" />
                </div>
                <h3 className="text-xs font-serif font-bold text-slate-900 uppercase tracking-wider">{isBangla ? 'কলেজ অডিটোরিয়াম' : 'Assembly Auditorium'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {isBangla 
                    ? 'সাংস্কৃতিক অনুষ্ঠান, সাহিত্য সভা এবং জাতীয় দিবস উদযাপনের জন্য সুপরিসর অডিটোরিয়াম ভবন রয়েছে।' 
                    : 'A large assembly hall catering to annual cultural awards, debate festivals, and administrative seminars.'}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
