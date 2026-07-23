import React, { useState, useEffect } from 'react';
import { 
  Clock, Calendar, AlertTriangle, BookOpen, Award, BellRing, Bell
} from 'lucide-react';
import { Course, ExamEvent } from '../types/academic';

interface ExamScheduleProps {
  courses: Course[];
  isBangla: boolean;
}

export const ExamSchedule: React.FC<ExamScheduleProps> = ({
  courses,
  isBangla
}) => {
  // Pull all upcoming exams from courses flattened
  const allExams: ExamEvent[] = [];
  courses.forEach(c => {
    c.exams.forEach(ex => {
      allExams.push(ex);
    });
  });

  // Sort exams by chronological date
  const sortedExams = allExams.sort((a, b) => new Date(a.dateTime).getTime() - new Date().getTime());
  
  // Highlight the closest upcoming exam
  const nextExam = sortedExams.find(ex => new Date(ex.dateTime).getTime() > new Date().getTime()) || sortedExams[0];

  // Live countdown state values
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedExamId, setSelectedExamId] = useState(nextExam?.id || '');
  const [activeAlarms, setActiveAlarms] = useState<{ [key: string]: boolean }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedExam = sortedExams.find(ex => ex.id === selectedExamId) || nextExam;

  // Real-time countdown timer tick mechanism
  useEffect(() => {
    if (!nextExam) return;

    const tick = () => {
      const difference = new Date(nextExam.dateTime).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [nextExam]);

  const toggleAlarm = (examId: string) => {
    const isNowActive = !activeAlarms[examId];
    setActiveAlarms(prev => ({ ...prev, [examId]: isNowActive }));

    if (isNowActive) {
      setToastMessage(isBangla 
        ? 'পরীক্ষার এলার্ম সেট করা হয়েছে! পরীক্ষার ২ ঘণ্টা পূর্বে ব্রাউজারে নোটিফিকেশন পাঠানো হবে।' 
        : 'Assessment Alarm Scheduled! You will receive alerts 2 hours prior to start.');
      setTimeout(() => setToastMessage(null), 3500);
    } else {
      setToastMessage(isBangla ? 'এলার্ম নিষ্ক্রিয় করা হয়েছে।' : 'Alarm turned off.');
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  const getSyllabusCheatSheet = (code: string) => {
    switch (code) {
      case 'PHY-101':
        return {
          chapters: ['Chapter 1: Vectors, Newtonian mechanics, linear momentum, and rotational motion.', 'Chapter 2: Thermodynamics laws, isothermal and adiabatic expansions.', 'Chapter 3: Wave mechanics, physical optics, interference, and diffraction patterns.'],
          weight: 'Final Written Exam weightage: 60% theory, 40% math equations.',
          advice: 'Practice drawing diagrams for pendulum motion and solving thermodynamic heat engine math.'
        };
      case 'CHE-101':
        return {
          chapters: ['Chapter 2: Qualitative organic tests, aromatic synthesis, and functional groups.', 'Chapter 4: Periodic table trends, s, p, d block element reactions.', 'Chapter 5: Chemical kinetics, reaction rates, and activation energy calculations.'],
          weight: 'Full Practical Lab Assessment: 100% qualitative analysis criteria.',
          advice: 'Wearing laboratory protective aprons is strictly mandatory. Review salt classification flowcharts.'
        };
      case 'MATH-101':
        return {
          chapters: ['Chapter 1: Calculus limits, differential derivatives, and integrals.', 'Chapter 3: Analytical coordinate geometry, circles, and conics equations.', 'Chapter 5: Vector algebra, dot product, cross product, and 3D coordinate geometry.'],
          weight: 'Exam weightage: 100% calculation based scoring.',
          advice: 'Memorize all trigonometric identities and basic integration formulas.'
        };
      case 'ICT-101':
        return {
          chapters: ['Chapter 2: Communication systems, networking topologies, and IP addressing.', 'Chapter 4: HTML web layout codes, tables, hyperlink tag architectures.', 'Chapter 5: Structured programming syntax in C language, loops, and conditions.'],
          weight: 'Practical Graded Lab Trial: 40% coding execution, 60% theory.',
          advice: 'Solve the recursive loops and matrix questions in Chapter 5 on local computer editor.'
        };
      default:
        return {
          chapters: ['Syllabus Course Content Module 1 & 2', 'Lab manual exercises 1 through 5'],
          weight: 'Graded Assessment: 20% weightage.',
          advice: 'Consult course syllabus materials PDF catalog.'
        };
    }
  };

  const cheatSheet = getSyllabusCheatSheet(selectedExam?.courseCode || 'PHY-101');

  return (
    <div id="exam-schedules-section" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left relative">
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-750 text-white px-5 py-3.5 rounded shadow-xl font-mono text-xs flex items-center space-x-2 animate-bounce">
          <Clock className="w-3.5 h-3.5 text-crimson shrink-0 animate-swing" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Title header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
          {isBangla ? 'একাডেমিক পরীক্ষা পরিষদ' : 'ACADEMIC REGISTRY & ASSESSMENTS'}
        </span>
        <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
          {isBangla ? 'পরীক্ষা ও মূল্যায়ন সময়সূচি' : 'Exams & Assessment Schedule'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBangla ? 'পরীক্ষা রুটিন, আসন্ন পরীক্ষার কাউন্টডাউন এবং সিলেবাস বুকলেট।' : 'Direct track on board exams, midterms, final evaluations, and syllabus criteria.'}
        </p>
      </div>

      {/* 1. CountDown Hero Widget */}
      {nextExam && (
        <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 relative overflow-hidden shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute right-0 top-0 w-48 h-48 bg-crimson/[0.02] rounded-full pointer-events-none blur-3xl"></div>
          <div className="space-y-3 text-center lg:text-left flex-1">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-crimson/10 text-crimson font-mono text-[9px] font-bold uppercase tracking-widest border border-crimson/10">
              <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-crimson" />
              <span>{isBangla ? 'আসন্ন পরীক্ষা কাউন্টডাউন' : 'IMMINENT EXAMINATION ALARM'}</span>
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 leading-tight">
                {nextExam.courseTitle} ({nextExam.courseCode})
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Type: <span className="text-slate-850 font-bold font-mono">{nextExam.type}</span> • Venue: <span className="text-crimson font-bold">{nextExam.room}</span>
              </p>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xl">
              ⚠️ Regulations: {nextExam.instructions}
            </p>
          </div>

          {/* Clock timer design */}
          <div className="flex gap-4 bg-slate-50 p-4 rounded border border-slate-200 shadow-inner shrink-0">
            <div className="text-center w-12 sm:w-16">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-crimson tracking-tight">{timeLeft.days}</span>
              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold tracking-wider">{isBangla ? 'দিন' : 'Days'}</span>
            </div>
            <div className="text-center text-slate-350 text-2xl font-black self-center">:</div>
            <div className="text-center w-12 sm:w-16">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-slate-800 tracking-tight">{timeLeft.hours}</span>
              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold tracking-wider">{isBangla ? 'ঘণ্টা' : 'Hours'}</span>
            </div>
            <div className="text-center text-slate-350 text-2xl font-black self-center">:</div>
            <div className="text-center w-12 sm:w-16">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-slate-800 tracking-tight">{timeLeft.minutes}</span>
              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold tracking-wider">{isBangla ? 'মিনিট' : 'Mins'}</span>
            </div>
            <div className="text-center text-slate-350 text-2xl font-black self-center">:</div>
            <div className="text-center w-12 sm:w-16">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-slate-500 tracking-tight">{timeLeft.seconds}</span>
              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold tracking-wider">{isBangla ? 'সেকেন্ড' : 'Secs'}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Official Academic Exams Schedule Table */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 bg-slate-50 text-left">
          <h3 className="text-xs font-serif font-black text-slate-900 uppercase tracking-widest">
            {isBangla ? 'পরীক্ষা রুটিন ও সময়সূচি' : 'Board Assessment Matrices'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            List of GSC core exams, midterms, and lab practical trials.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                <th className="p-4 pl-6">{isBangla ? 'বিষয় ও কোড' : 'Course & Code'}</th>
                <th className="p-4">{isBangla ? 'মূল্যায়ন ধরন' : 'Assessment Type'}</th>
                <th className="p-4">{isBangla ? 'তারিখ ও সময়' : 'Schedules Time'}</th>
                <th className="p-4">{isBangla ? 'পরীক্ষার রুম/ল্যাব' : 'Venue Complex'}</th>
                <th className="p-4 text-center pr-6">Alert Alarm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sortedExams.map((ex) => {
                const isAlarmActive = activeAlarms[ex.id] || false;
                const formattedDate = new Date(ex.dateTime).toLocaleDateString(isBangla ? 'bn-BD' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
                const formattedTime = new Date(ex.dateTime).toLocaleTimeString(isBangla ? 'bn-BD' : 'en-US', { hour: '2-digit', minute: '2-digit' });

                return (
                  <tr 
                    key={ex.id}
                    onClick={() => setSelectedExamId(ex.id)}
                    className={`hover:bg-slate-50 cursor-pointer transition-all ${
                      selectedExamId === ex.id ? 'bg-slate-50 border-l-4 border-l-crimson font-medium' : ''
                    }`}
                  >
                    <td className="p-4 pl-6 font-sans">
                      <div className="space-y-0.5 text-left">
                        <span className="text-[9px] font-mono tracking-wide text-crimson font-bold">{ex.courseCode}</span>
                        <p className="text-slate-950 font-serif font-black">{ex.courseTitle}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider border ${
                        ex.type === 'Midterm' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        ex.type === 'Final' ? 'bg-crimson/5 text-crimson border-crimson/10' :
                        ex.type === 'Lab Assessment' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {ex.type}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-800 text-left">
                      <div className="font-bold">{formattedDate}</div>
                      <div className="text-[10px] text-slate-400 pt-0.5">{formattedTime}</div>
                    </td>
                    <td className="p-4 font-sans text-slate-500 font-medium text-left">
                      🏫 {ex.room}
                    </td>
                    <td className="p-4 text-center pr-6">
                      <button
                        id={`btn-alarm-toggle-${ex.id}`}
                        onClick={(e) => { e.stopPropagation(); toggleAlarm(ex.id); }}
                        className={`p-2 rounded border transition-all cursor-pointer ${
                          isAlarmActive 
                            ? 'bg-crimson text-white border-crimson' 
                            : 'bg-white border-slate-200 text-slate-400 hover:text-crimson hover:bg-slate-50'
                        }`}
                        title="Set Study Alarm"
                      >
                        {isAlarmActive ? <BellRing className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Detailed Syllabus Outline Panel */}
      {selectedExam && (
        <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start text-left">
          <div className="space-y-4 flex-1">
            <span className="inline-block text-[9px] bg-crimson/10 text-crimson px-3 py-1 rounded font-mono font-bold tracking-widest uppercase border border-crimson/10">
              SYLLABUS FOCUS: {selectedExam.courseCode}
            </span>
            <h3 className="text-base sm:text-lg font-serif font-black text-slate-900">
              Recommended Preparation Guidelines
            </h3>
            
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 border-b border-slate-100 pb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-crimson" />
                <span>Focus Chapter Outlines</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 pl-1">
                {cheatSheet.chapters.map((ch, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-crimson mt-0.5">•</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4 w-full md:w-80 bg-slate-50 p-5 rounded border border-slate-200 shrink-0">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 border-b border-slate-200 pb-2.5">
              <Award className="w-3.5 h-3.5 text-crimson" />
              <span>Assessment Values</span>
            </h4>

            <div className="space-y-3.5 text-xs">
              <div>
                <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider font-bold">Grade Weighting</p>
                <p className="text-slate-700 font-semibold pt-0.5 leading-normal">{cheatSheet.weight}</p>
              </div>

              <div>
                <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider font-bold">Instructor Notice</p>
                <p className="text-slate-500 italic pt-0.5 leading-normal bg-white p-2.5 rounded border border-slate-150">" {cheatSheet.advice} "</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
