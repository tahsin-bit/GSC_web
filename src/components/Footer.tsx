import React from 'react';
import { Landmark, MapPin, Phone, Mail, Send, Check, ShieldCheck, HeartHandshake, Eye, BarChart2 } from 'lucide-react';

interface FooterProps {
  isBangla: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isBangla }) => {
  const [queryEmail, setQueryEmail] = React.useState('');
  const [queryText, setQueryText] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryEmail || !queryText) return;
    setSubmitted(true);
    setQueryEmail('');
    setQueryText('');
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer id="app-footer" className="bg-harvard-charcoal text-slate-300 font-sans border-t-4 border-crimson pt-8 pb-24 md:pb-12 sm:pt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Branding Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 sm:pb-10 border-b border-slate-800 mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="flex items-center space-x-3 sm:space-x-4 text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white flex items-center justify-center p-0.5 rounded-full shadow-md border border-slate-700 overflow-hidden shrink-0">
              <img
                src="/images/gsc-logo.png"
                alt="GSC Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h2 className="text-base sm:text-2xl font-serif font-black tracking-tight text-white uppercase leading-tight">
                {isBangla ? 'সরকারি বিজ্ঞান কলেজ' : 'Government Science College'}
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 font-serif tracking-wider uppercase mt-0.5">
                {isBangla ? 'তেজগাঁও, ঢাকা-১২১৫ — শিক্ষা বোর্ড কোড: ১০০৮' : 'Tejgaon, Dhaka-1215 — Board Code: 1008'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <span className="text-[9px] sm:text-[10px] bg-slate-900 border border-slate-850 text-slate-400 font-mono px-2.5 py-1 rounded uppercase tracking-wider">
              🎓 HSC & B.Sc Streams
            </span>
            <span className="text-[9px] sm:text-[10px] bg-crimson/10 border border-crimson/30 text-crimson-light font-mono px-2.5 py-1 rounded uppercase tracking-wider">
              🛡️ Est. 1954
            </span>
          </div>
        </div>

        {/* Medium Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-sm">
          {/* Column 1: Institutional Core values */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-serif text-xs sm:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2">
              {isBangla ? 'কলেজ পরিচিতি' : 'Institutional Heritage'}
            </h3>
            <p className="text-[11px] sm:text-[12px] text-slate-400 leading-relaxed font-sans">
              {isBangla
                ? 'সরকারি বিজ্ঞান কলেজ বাংলাদেশের একটি ঐতিহ্যবাহী শিক্ষা প্রতিষ্ঠান। ১৯৫৪ সালে টেকনিক্যাল হাই স্কুল হিসেবে যাত্রা শুরু করে পরবর্তীতে এটি বিজ্ঞান কলেজে রূপান্তরিত হয়। প্রতিষ্ঠানটি বিজ্ঞান চর্চা ও দক্ষ মানবসম্পদ সৃষ্টিতে অগ্রণী ভূমিকা পালন করে আসছে।'
                : 'Government Science College, Tejgaon, Dhaka, has stood as a premier academic landmark in science education since its foundation in 1954. Sourcing specialized faculty, intermediate science cohorts, and undergraduate degree tracks.'}
            </p>
            <div className="space-y-1.5 pt-1">
              <span className="inline-flex items-center text-[10px] bg-slate-900 border border-slate-850 text-slate-400 font-mono px-2.5 py-1 rounded">
                ✓ Board Code: 1008
              </span>
            </div>
          </div>

          {/* Column 2: Visitor Statistics Counter */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-serif text-xs sm:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center space-x-1.5">
              <BarChart2 className="w-4 h-4 text-crimson" />
              <span>{isBangla ? 'পরিদর্শক সংখ্যা' : 'Visitor Counter'}</span>
            </h3>
            <div className="bg-slate-900/60 p-3.5 sm:p-4 rounded border border-slate-850 space-y-2.5 sm:space-y-3 font-mono text-[11px] text-slate-400">
              <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                <span>{isBangla ? 'আজকের ভিজিট' : 'Visit Today'}:</span>
                <span className="text-white font-bold">116</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                <span>{isBangla ? 'গতকালের ভিজিট' : 'Visit Yesterday'}:</span>
                <span className="text-white font-bold">231</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                <span>{isBangla ? 'এই মাসের ভিজিট' : 'This Month'}:</span>
                <span className="text-white font-bold">4,696</span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span>{isBangla ? 'সর্বমোট পরিদর্শক' : 'Total Visit'}:</span>
                <span className="text-crimson-light font-black">168,791</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 font-mono text-left">
              {isBangla ? 'সাইট শেষ হালনাগাদ: ১৭-০৬-২০২৬' : 'Last Updated: 17-06-2026'}
            </div>
          </div>

          {/* Column 3: Contact & Registrar address */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-serif text-xs sm:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2">
              {isBangla ? 'যোগাযোগ ও ঠিকানা' : 'Administration & Office'}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3.5 text-[11px] sm:text-[12px] text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {isBangla
                    ? 'সরকারি বিজ্ঞান কলেজ, তেজগাঁও শিল্পাঞ্চল, ঢাকা-১২১৫, বাংলাদেশ।'
                    : 'Government Science College, Tejgaon Industrial Area, Dhaka-1215, Bangladesh.'}
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-crimson shrink-0" />
                <span className="break-all sm:break-normal">+880-2-9110825, +880-2-9122396</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-crimson shrink-0" />
                <span className="hover:text-white underline break-all sm:break-normal">principal@gsctd.edu.bd</span>
              </li>
              <li className="pt-1 text-[10px] text-slate-500 font-mono uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isBangla ? 'অফিসিয়াল সরকারি পোর্টাল' : 'Official Government Site'}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Help ticket query */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-serif text-xs sm:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center space-x-1.5">
              <HeartHandshake className="w-4 h-4 text-crimson" />
              <span>{isBangla ? 'জিজ্ঞাসা ও অনুসন্ধান' : 'Student Help Desk'}</span>
            </h3>
            <p className="text-[11px] text-slate-400 leading-normal">
              {isBangla
                ? 'ভর্তি বা নোটিশ সংক্রান্ত যেকোনো তথ্যের জন্য আপনার ইমেইল দিয়ে প্রশ্ন পাঠান।'
                : 'Send your administrative or curriculum questions directly to our college administration.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                id="footer-email-input"
                type="email"
                placeholder={isBangla ? 'আপনার ইমেইল' : 'Email Address'}
                value={queryEmail}
                onChange={(e) => setQueryEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-crimson"
                required
              />
              <textarea
                id="footer-query-textarea"
                rows={2}
                placeholder={isBangla ? 'আপনার প্রশ্নটি লিখুন...' : 'Write your question here...'}
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-crimson resize-none"
                required
              ></textarea>

              <button
                id="footer-submit-btn"
                type="submit"
                className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-wider py-2 px-3 rounded text-[10px] font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer shadow-sm active:scale-95"
              >
                {submitted ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isBangla ? 'প্রেরিত হয়েছে!' : 'Inquiry Submitted!'}</span>
                  </>
                ) : (
                  <span>{isBangla ? 'বার্তা পাঠান' : 'Submit Query'}</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footnote and licensing */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono gap-3 sm:gap-4">
          <p>© {new Date().getFullYear()} Government Science College, Tejgaon.</p>
          <div className="text-[10px] text-slate-500 uppercase tracking-widest flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{isBangla ? 'শিক্ষা মন্ত্রণালয় অনুমোদিত' : 'Affiliated Ministry of Education'}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
