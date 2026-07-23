import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ContactPageProps {
  isBangla: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ isBangla }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMsg('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div id="contact-page" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left relative">

      {/* Toast Alert */}
      {submitted && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-750 text-white px-5 py-3.5 rounded shadow-xl font-mono text-xs flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{isBangla ? 'আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।' : 'Inquiry sent successfully to registrar desk.'}</span>
        </div>
      )}

      {/* Editorial Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
          {isBangla ? 'প্রশাসনিক হেল্পডেস্ক ও মানচিত্র' : 'REGISTRAR DESK & CAMPUS MAP'}
        </span>
        <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
          {isBangla ? 'যোগাযোগ করুন' : 'Contact Administration'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBangla
            ? 'সরকারি বিজ্ঞান কলেজের অফিশিয়াল ফোন নম্বর, ইমেল অ্যাড্রেস এবং তেজগাঁও ক্যাম্পাসের মানচিত্র।'
            : 'Get in touch with GSC academic office and administrative sectors.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LHS Contact info card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-crimson" />
              <span>{isBangla ? 'যোগাযোগের বিবরণী' : 'Office Coordinates'}</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-crimson shrink-0 mt-0.5" />
                <div className="text-left space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">{isBangla ? 'ঠিকানা' : 'Physical Address'}</span>
                  <p className="font-semibold text-slate-800">
                    {isBangla
                      ? 'সরকারি বিজ্ঞান কলেজ, তেজগাঁও শিল্পাঞ্চল, ঢাকা-১২১৫, বাংলাদেশ।'
                      : 'Government Science College, Tejgaon Industrial Area, Dhaka-1215, Bangladesh.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-5 h-5 text-crimson shrink-0 mt-0.5" />
                <div className="text-left space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">{isBangla ? 'ফোন নম্বর' : 'Hotlines'}</span>
                  <p className="font-semibold text-slate-800 font-mono">+880-2-9110825, +880-2-9122396</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="w-5 h-5 text-crimson shrink-0 mt-0.5" />
                <div className="text-left space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">{isBangla ? 'অফিসিয়াল ইমেইল' : 'Registrar Email'}</span>
                  <p className="font-semibold text-slate-800 underline font-mono">principal@gsctd.edu.bd</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="w-5 h-5 text-crimson shrink-0 mt-0.5" />
                <div className="text-left space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">{isBangla ? 'কার্যালয় সময়' : 'Office Timings'}</span>
                  <p className="font-semibold text-slate-800">
                    {isBangla
                      ? 'রবিবার - বৃহস্পতিবার: সকাল ০৯:০০ টা - দুপুর ০২:০০ টা।'
                      : 'Sunday to Thursday: 09:00 AM to 02:00 PM.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map embed */}
          <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-md h-60">
            <iframe
              title="GSC Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.7120744200233!2d90.3900646751154!3d23.757644778665465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9fb53556e1f%3A0xf22b88ad29aa7dd5!2z4Ka44Kaw4KaV4Ka-4Kaw4Ka_IOCmrOCmv-CmnOCnjeCmnuCmvuCmqCDgppXgprLgp4fgppwsIOCmpOCnh-CmnOCml-CmvuCmgeCmkywg4Kai4Ka-4KaV4Ka-!5e0!3m2!1sbn!2sbd!4v1784812162162!5m2!1sbn!2sbd"
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
            />
          </div>
        </div>

        {/* RHS Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Send className="w-5 h-5 text-crimson" />
              <span>{isBangla ? 'যোগাযোগ বার্তা ফরম' : 'Administrative Helpdesk Ticket'}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'আপনার নাম' : 'Your Full Name'}</label>
                <input
                  type="text"
                  required
                  placeholder={isBangla ? 'যেমন: সালমান রহমান' : 'e.g. Salman Rahman'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-crimson"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'ইমেইল এড্রেস' : 'Email Address'}</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. salman@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-crimson"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'মোবাইল নম্বর' : 'Phone Number'}</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01700000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-crimson"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">{isBangla ? 'বার্তার বিষয়বস্তু' : 'Detailed Message Inquiry'}</label>
                <textarea
                  rows={5}
                  required
                  placeholder={isBangla ? 'এখানে আপনার প্রশ্ন বা অনুরোধ বিস্তারিত লিখুন...' : 'Write your details and queries here...'}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-crimson resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-wider text-xs font-bold py-3.5 px-4 rounded transition-all cursor-pointer shadow-sm flex items-center justify-center space-x-1.5"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{isBangla ? 'বার্তা পাঠান' : 'Submit Inquiry'}</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
