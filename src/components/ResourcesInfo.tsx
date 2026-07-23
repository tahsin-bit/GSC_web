import React, { useState } from 'react';
import { Shield, Users, Trophy, BookOpen, Sparkles, CheckSquare, HeartHandshake, ArrowRight, Heart } from 'lucide-react';

interface ResourcesInfoProps {
  isBangla: boolean;
}

export const ResourcesInfo: React.FC<ResourcesInfoProps> = ({ isBangla }) => {
  const [activeGroup, setActiveGroup] = useState<'bncc' | 'scout' | 'crescent'>('bncc');
  const [inscribed, setInscribed] = useState<{ [key: string]: boolean }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleInscribe = (group: string) => {
    setInscribed(prev => ({ ...prev, [group]: true }));
    setToastMessage(isBangla 
      ? 'আপনার আবেদন সফলভাবে জমা নেওয়া হয়েছে! ফোকাল শিক্ষকের সাথে যোগাযোগ করুন।' 
      : 'Application submitted! Please meet the designated officer inside campus.');
    
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div id="resources-info-page" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-750 text-white px-5 py-3.5 rounded shadow-xl font-mono text-xs flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Editorial Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
          {isBangla ? 'সহ-শিক্ষামূলক কার্যক্রম ও নেতৃত্ব উন্নয়ন' : 'CO-CURRICULAR CLUBS & STUDENT LEADERSHIP'}
        </span>
        <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
          {isBangla ? 'রিসোর্স ও কো-কারিকুলার কার্যক্রম' : 'Co-curricular Organizations'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBangla 
            ? 'নৈমিত্তিক ক্লাসরুমের বাইরে নিয়মানুবর্তিতা, সমাজসেবা ও নেতৃত্বের দীক্ষা অর্জনের সহ-শিক্ষা ইউনিটসমূহ।' 
            : 'Explore leadership, physical drills, and volunteer activities at GSC campus.'}
        </p>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap border-b border-slate-200 gap-1 sm:gap-2">
        <button
          onClick={() => setActiveGroup('bncc')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeGroup === 'bncc'
              ? 'border-crimson text-crimson bg-slate-50'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>{isBangla ? 'বিএনসিসি (BNCC)' : 'BNCC Cadets'}</span>
        </button>

        <button
          onClick={() => setActiveGroup('scout')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeGroup === 'scout'
              ? 'border-crimson text-crimson bg-slate-50'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>{isBangla ? 'রোভার স্কাউট (Rover Scout)' : 'Rover Scouts'}</span>
        </button>

        <button
          onClick={() => setActiveGroup('crescent')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeGroup === 'crescent'
              ? 'border-crimson text-crimson bg-slate-50'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{isBangla ? 'রেড ক্রিসেন্ট (Red Crescent)' : 'Red Crescent'}</span>
        </button>
      </div>

      {/* Main details block */}
      <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md">
        
        {activeGroup === 'bncc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-[10px] text-crimson font-mono tracking-widest uppercase font-bold block">
                {isBangla ? 'বাংলাদেশ ন্যাশনাল ক্যাডেট কোর' : 'BANGLADESH NATIONAL CADET CORPS'}
              </span>
              
              <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 tracking-tight">
                {isBangla ? 'সরকারি বিজ্ঞান কলেজ বিএনসিসি প্ল্যাটুন' : 'GSC Army Wing Platoon (BNCC)'}
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {isBangla 
                  ? '১৯৫৪ সাল থেকে নিয়মানুবর্তিতা ও কর্তব্যের দীক্ষা দিয়ে আসা সরকারি বিজ্ঞান কলেজ বিএনসিসি প্ল্যাটুন অন্যতম জনপ্রিয় কন্টিনজেন্ট। সেনাবাহিনীর ৩ রমনা ব্যাটালিয়নের অধীনে এটি পরিচালিত হয়। ক্যাডেটরা স্বাধীনতা দিবস প্যারেড, জাতীয় কুচকাওয়াজ এবং উদ্ধার কাজ ও আইন-শৃঙ্খলা রক্ষায় কলেজ প্রশাসন ও সমাজকে সহায়তা দিয়ে থাকে।'
                  : 'Operating under the 3 Ramna Battalion of Bangladesh Army, the GSC BNCC platoon is renowned for military training, physical agility, and disaster rescue exercises. Platoon cadets participate in National Day drills and maintain college safety standards.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'প্লাটুন কমান্ডার' : 'Platoon Commander'}</p>
                  <p className="text-xs font-semibold text-slate-800">Lt. Probhash Kumar Roy</p>
                </div>
                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'মোট সক্রিয় ক্যাডেট' : 'Active Cadets Count'}</p>
                  <p className="text-xs font-bold text-slate-800">65+ Cadets</p>
                </div>
                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'প্যারেড অনুশীলন' : 'Weekly Drills'}</p>
                  <p className="text-xs font-bold text-slate-800">Fri & Sat (08:00 AM)</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-slate-900 text-xs sm:text-sm">{isBangla ? 'সুবিধাসমূহ ও অর্জন:' : 'Key Benefits & Advantages:'}</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 leading-relaxed">
                  <li>{isBangla ? 'সেনাবাহিনী ও বিমানবাহিনীতে কমিশন অফিসার নিয়োগ পরীক্ষায় বিশেষ অগ্রাধিকার।' : 'Preferred credits in ISSB and defense officer selection commissions.'}</li>
                  <li>{isBangla ? 'বিনামূল্যে সামরিক বুট, ক্যাপ এবং ইউনিফর্ম সামগ্রী প্রদান।' : 'Provision of standard combat boots, berets, and uniform kits.'}</li>
                  <li>{isBangla ? 'বার্ষিক সামরিক ক্যাম্পিং ও ফায়ারিং অনুশীলনে অংশ নেওয়ার সুযোগ।' : 'Opportunity for annual centralized camping and live ammunition firing trials.'}</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-6 rounded border border-slate-200 space-y-6 text-center">
              <div className="w-16 h-16 bg-crimson rounded-full flex items-center justify-center text-white mx-auto shadow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-serif font-bold text-slate-900">{isBangla ? 'নতুন ক্যাডেট ভর্তি ২০২৬' : 'BNCC Recruitment 2026'}</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {isBangla ? 'একাদশ শ্রেণির শিক্ষার্থীদের জন্য প্লাটুনে যোগদানের আবেদন আহ্বান করা যাচ্ছে।' : 'Class XI students of GSC are eligible to apply for Army wing enrollment.'}
                </p>
              </div>

              {inscribed['bncc'] ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-bold">
                  ✓ {isBangla ? 'আবেদন সম্পন্ন হয়েছে' : 'Application Received!'}
                </div>
              ) : (
                <button
                  onClick={() => handleInscribe('bncc')}
                  className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-wider text-xs font-bold py-3 px-4 rounded transition-all cursor-pointer shadow"
                >
                  {isBangla ? 'প্লাটুনে যোগ দিন' : 'Apply for Platoon'}
                </button>
              )}
            </div>
          </div>
        )}

        {activeGroup === 'scout' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-[10px] text-crimson font-mono tracking-widest uppercase font-bold block">
                {isBangla ? 'বাংলাদেশ স্কাউটস রোভার ডেন' : 'BANGLADESH SCOUTS ROVER ASSEMBLY'}
              </span>
              
              <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 tracking-tight">
                {isBangla ? 'সরকারি বিজ্ঞান কলেজ রোভার স্কাউট গ্রুপ' : 'GSC Rover Scout Group'}
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {isBangla 
                  ? 'রোভার স্কাউটস শিক্ষার্থীদের আত্মনির্ভরশীল, দেশপ্রেমিক ও স্বেচ্ছাসেবী মনোভাব নিয়ে গড়ে তুলতে দীর্ঘ পাঁচ দশক ধরে কাজ করে আসছে। কলেজের কন্টিনজেন্টটি নিয়মিত জ্যাম্বুরি, হাইকিং এবং সমাজসেবা মূলক ক্যাম্পিংয়ে সুনামের সাথে অংশ নেয়।'
                  : 'The GSC Rover Scout troop promotes self-reliance, outdoor camping skill sets, and civic volunteers. Our scouts participate in national Jamborees, disaster reliefs, and tree plantations.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'গ্রুপ সভাপতি' : 'Group President'}</p>
                  <p className="text-xs font-semibold text-slate-800">Prof. Salma Begum (Principal)</p>
                </div>
                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'সক্রিয় রোভার সংখ্যা' : 'Registered Rovers'}</p>
                  <p className="text-xs font-bold text-slate-800">80+ Rovers</p>
                </div>
                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'অনিল ডেন মিটিং' : 'Scout Meeting Session'}</p>
                  <p className="text-xs font-bold text-slate-800">Saturdays (02:00 PM)</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-slate-900 text-xs sm:text-sm">{isBangla ? 'কার্যক্রম ও মিশনসমূহ:' : 'Rover Guidelines & Missions:'}</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 leading-relaxed">
                  <li>{isBangla ? 'বিভিন্ন দূর্যোগকালীন ত্রাণের কাজে ও রক্তদান কর্মসূচীতে স্বপ্রণোদিত অংশ গ্রহণ।' : 'Participation in flood reliefs, winter clothing distribution, and blood donations.'}</li>
                  <li>{isBangla ? 'প্রেসিডেন্ট রোভার স্কাউট (PRS) পদক অর্জনের জন্য বিশেষ প্রশিক্ষণ।' : 'Intensive coaching for President Rover Scout (PRS) National Award.'}</li>
                  <li>{isBangla ? 'সাপ্তাহিক হাইকিং, ট্র্যাকিং ও পরিবেশ সচেতনতামূলক ক্যাম্পিং।' : 'Weekend hiking, forest tracking, and eco-conservation campaigns.'}</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-6 rounded border border-slate-200 space-y-6 text-center">
              <div className="w-16 h-16 bg-crimson rounded-full flex items-center justify-center text-white mx-auto shadow">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-serif font-bold text-slate-900">{isBangla ? 'রোভার সদস্য ভর্তি ২০২৬' : 'Scout Crew Registration'}</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {isBangla ? 'স্কাউটিংয়ের দীক্ষা গ্রহণ করে দেশ সেবায় অবদান রাখতে আপনার আবেদন পাঠান।' : 'Apply to join our Rover crew to gain certificates and survival camping skills.'}
                </p>
              </div>

              {inscribed['scout'] ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-bold">
                  ✓ {isBangla ? 'আবেদন সম্পন্ন হয়েছে' : 'Registration Received!'}
                </div>
              ) : (
                <button
                  onClick={() => handleInscribe('scout')}
                  className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-wider text-xs font-bold py-3 px-4 rounded transition-all cursor-pointer shadow"
                >
                  {isBangla ? 'স্কাউট ক্রু-তে যোগ দিন' : 'Register with Scouts'}
                </button>
              )}
            </div>
          </div>
        )}

        {activeGroup === 'crescent' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-[10px] text-crimson font-mono tracking-widest uppercase font-bold block">
                {isBangla ? 'রেড ক্রিসেন্ট যুব ইউনিট' : 'YOUTH RED CRESCENT DIVISION'}
              </span>
              
              <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 tracking-tight">
                {isBangla ? 'সরকারি বিজ্ঞান কলেজ যুব রেড ক্রিসেন্ট সোসাইটি' : 'GSC Youth Red Crescent Society'}
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {isBangla 
                  ? 'মানবিক সাহায্য ও প্রাথমিক চিকিৎসা সেবাপ্রদানের বৈশ্বিক আদর্শ লালন করে সরকারি বিজ্ঞান কলেজের রেড ক্রিসেন্ট ইউনিট সুপরিচিত। ক্যাম্পাসের বড় কোনো ক্রীড়া প্রতিযোগিতা, পরীক্ষা চলাকালীন চিকিৎসা সেবা দিতে যুব সদস্যরা সবসময় তৎপর থাকে।'
                  : 'Following global humanitarian codes, the GSC Red Crescent team maintains campus first-aid booths and assists doctors during free medical check-up camps.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'ইন-চার্জ শিক্ষক' : 'Program Counselor'}</p>
                  <p className="text-xs font-semibold text-slate-800">Ferdousi Begum (Lecturer)</p>
                </div>
                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'মোট স্বেচ্ছাসেবক' : 'Volunteers Registered'}</p>
                  <p className="text-xs font-bold text-slate-800">50+ Members</p>
                </div>
                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'প্রাথমিক চিকিৎসা প্রশিক্ষণ' : 'Training Seminars'}</p>
                  <p className="text-xs font-bold text-slate-800">Tuesdays (01:45 PM)</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-slate-900 text-xs sm:text-sm">{isBangla ? 'প্রশিক্ষণ ও মানবসেবা কার্যক্রম:' : 'First Aid Training & Volunteer Logs:'}</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 leading-relaxed">
                  <li>{isBangla ? 'রেড ক্রিসেন্ট সোসাইটি কর্তৃক স্বীকৃত ফার্স্ট এইড ও সিপিআর (CPR) সনদপত্র।' : 'Professional First-Aid and Cardiopulmonary Resuscitation (CPR) certifications.'}</li>
                  <li>{isBangla ? 'বার্ষিক রক্তদান ক্যাম্প ও দুর্যোগ ব্যবস্থাপনামূলক মক ড্রিল।' : 'Organizing blood donation tables and fire-safety mock drills.'}</li>
                  <li>{isBangla ? 'জাতীয় ও আন্তর্জাতিক রেড ক্রস ভলান্টিয়ার নেটওয়ার্কে যুক্ত হওয়ার সুবিধা।' : 'Direct linkage to national and international volunteer networks.'}</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-6 rounded border border-slate-200 space-y-6 text-center">
              <div className="w-16 h-16 bg-crimson rounded-full flex items-center justify-center text-white mx-auto shadow">
                <HeartHandshake className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-serif font-bold text-slate-900">{isBangla ? 'ভলান্টিয়ার সংযুক্তি ২০২৬' : 'Volunteer Intake 2026'}</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {isBangla ? 'সেবামূলক কার্যক্রমে যুক্ত হতে ও প্রাথমিক চিকিৎসা শিখতে আপনার আবেদন পাঠান।' : 'Apply for registration to serve as a medical volunteer and first responder.'}
                </p>
              </div>

              {inscribed['crescent'] ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-bold">
                  ✓ {isBangla ? 'আবেদন সম্পন্ন হয়েছে' : 'Membership Confirmed!'}
                </div>
              ) : (
                <button
                  onClick={() => handleInscribe('crescent')}
                  className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-wider text-xs font-bold py-3 px-4 rounded transition-all cursor-pointer shadow"
                >
                  {isBangla ? 'ভলান্টিয়ার কার্ড আবেদন' : 'Apply as Volunteer'}
                </button>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
