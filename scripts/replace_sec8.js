import fs from 'fs';

const filePath = 'c:/Users/user/Desktop/gsctd-academic-portal/src/components/LandingPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const newSec = `        {/* 8. Admissions Matrix Advisor */}
        <section id="admissions-calculator" className="bg-white py-10 sm:py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">

              {/* LHS advisories */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[9px] bg-crimson/10 text-crimson px-3 py-1 rounded font-mono font-bold tracking-widest uppercase border border-crimson/10">
                  {isBangla ? 'ভর্তি যোগ্যতা যাচাই' : 'OFFICE OF ADMISSIONS 2026'}
                </span>

                <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-900 leading-tight">
                  {isBangla ? 'আপনি কি বিজ্ঞান কলেজে ভর্তির উপযোগী?' : 'Determine Your Admission Eligibility'}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isBangla
                    ? 'বিজ্ঞান বিভাগে উচ্চ মাধ্যমিক (HSC) আবেদনের ক্ষেত্রে এসএসসি পরীক্ষার জিপিএ এবং উচ্চতর গণিত স্কোরের উপর ভিত্তি করে মেধা তালিকা নির্বাচন করা হয়। আপনার সম্ভাব্য ফলাফল দিয়ে ভর্তির রেকমেন্ডেশন দেখে নিন।'
                    : 'Enrollment at Government Science College requires high thresholds in intermediate physics, chemistry, and higher maths. Test your eligibility benchmarks using our matrix below.'}
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start space-x-3">
                    <span className="text-crimson mt-0.5 font-bold">✓</span>
                    <span>{isBangla ? 'এসএসসিতে বিজ্ঞান বিভাগে ন্যূনতম জিপিএ ৪.০০ আবশ্যক।' : 'Minimum SSC Science GPA of 4.00 is strictly mandated.'}</span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-crimson mt-0.5 font-bold">✓</span>
                    <span>{isBangla ? 'উচ্চতর গণিতে ন্যূনতম জিপিএ ৩.৫০ থাকা বাধ্যতামূলক।' : 'Minimum GPA 3.50 in Higher/General Mathematics is required.'}</span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-crimson mt-0.5 font-bold">✓</span>
                    <span>{isBangla ? 'চূড়ান্ত মেধা তালিকা ঢাকা শিক্ষা বোর্ড কর্তৃক পরিচালিত হয়।' : 'Final selection rounds are administered by the central board portal.'}</span>
                  </div>
                </div>
              </div>

              {/* RHS calculator card form */}
              <div className="lg:col-span-6">
                <div className="bg-slate-50 border border-slate-200 rounded p-6 sm:p-8 shadow-md">
                  <h3 className="text-base font-serif font-bold text-slate-900 mb-6 flex items-center space-x-2">
                    <BookMarked className="w-5 h-5 text-crimson" />
                    <span>{isBangla ? 'যোগ্যতা যাচাই ও সুপারিশকারী ক্যালকুলেটর' : 'Eligibility Matrix Calculator'}</span>
                  </h3>

                  <form onSubmit={checkEligibility} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                          {isBangla ? 'এসএসসি জিপিএ (৫.০০)' : 'Overall SSC GPA'}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="2.00"
                          max="5.00"
                          value={gpa}
                          onChange={(e) => setGpa(e.target.value)}
                          className="w-full bg-white border border-slate-250 rounded px-3 py-2 text-sm text-slate-800 font-mono focus:outline-none focus:border-crimson"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                          {isBangla ? 'উচ্চতর গণিত জিপিএ (৫.০০)' : 'Mathematics GPA'}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="2.00"
                          max="5.00"
                          value={mathGpa}
                          onChange={(e) => setMathGpa(e.target.value)}
                          className="w-full bg-white border border-slate-250 rounded px-3 py-2 text-sm text-slate-800 font-mono focus:outline-none focus:border-crimson"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-crimson hover:bg-crimson-dark justify-center flex items-center space-x-2 text-white font-mono uppercase tracking-wider text-xs font-bold py-3.5 px-4 rounded transition-all cursor-pointer shadow-sm"
                    >
                      <span>{isBangla ? 'যোগ্যতা ও ভর্তির সম্ভাবনা যাচাই' : 'Verify Admission Matrix'}</span>
                    </button>
                  </form>

                  {eligibleResult && (
                    <div className={\`mt-6 p-4 rounded border \${eligibleResult.level === 'success' ? 'bg-emerald-50 border-emerald-200' :
                        eligibleResult.level === 'warning' ? 'bg-amber-50 border-amber-200' :
                          'bg-red-50 border-red-200'
                      }\`}>
                      <div className="flex items-start space-x-3">
                        <div className="shrink-0 text-base mt-0.5">
                          {eligibleResult.eligible ? '✓' : '✕'}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-900">
                            {eligibleResult.eligible
                              ? (isBangla ? 'যোগ্যতা সম্পন্ন' : 'BENCHMARKS SATISFIED')
                              : (isBangla ? 'আবেদনের অনুপযোগী' : 'BENCHMARKS INSUFFICIENT')}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {isBangla ? eligibleResult.textBn : eligibleResult.textEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>`;

const startMarker = '{/* 8. Admissions Matrix Advisor */}';
const endMarker = '</section>';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker, startIdx) + endMarker.length;

if (startIdx !== -1 && endIdx !== -1) {
  content = content.slice(0, startIdx) + newSec + content.slice(endIdx);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated LandingPage.tsx Admission Eligibility section UTF-8 text!');
} else {
  console.log('Markers not found', startIdx, endIdx);
}
