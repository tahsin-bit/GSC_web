import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon, ZoomIn, Eye } from 'lucide-react';

interface PhotoGalleryProps {
  isBangla: boolean;
  hideHeader?: boolean;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ isBangla, hideHeader }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const photos = [
    // Local images from public/images
    { url: '/images/college-gate.jpg', captionEn: 'Main Entrance Gate — GSC Tejgaon', captionBn: 'মূল প্রবেশদ্বার — জিএসসি তেজগাঁও' },
    { url: '/images/cultural-program.jpg', captionEn: 'Literary & Cultural Competition Prize Distribution', captionBn: 'সাহিত্য ও সংস্কৃতি প্রতিযোগিতা পুরস্কার বিতরণ' },
    { url: '/images/gaming-tournament.jpg', captionEn: 'Inter-District Gaming Tournament', captionBn: 'আন্তঃজেলা গেমিং টুর্নামেন্ট' },
    { url: '/images/robotics-expo.jpg', captionEn: 'Science & Quantu Robotics Exhibition', captionBn: 'বিজ্ঞান ও কোয়ান্টু রোবোটিক্স প্রদর্শনী' },
    { url: '/images/robotics-classroom.jpg', captionEn: 'Hands-on Robotics & Electronics Workshop', captionBn: 'হাতে-কলমে রোবোটিক্স ও ইলেকট্রনিক্স কর্মশালা' },
    { url: '/images/robotics-rover.jpg', captionEn: 'Autonomous Rover Prototype Testing', captionBn: 'স্বয়ংক্রিয় রোভার প্রোটোটাইপ পরীক্ষা' },
    { url: '/images/bncc-cadets.jpg', captionEn: 'BNCC Cadets — Discipline & National Pride', captionBn: 'বিএনসিসি ক্যাডেট — শৃঙ্খলা ও জাতীয় গৌরব' },
    { url: '/images/classroom-study.jpg', captionEn: 'Focused Classroom Learning & Exam Preparation', captionBn: 'শ্রেণীকক্ষে মনোযোগী পাঠদান ও পরীক্ষার প্রস্তুতি' },
    { url: '/images/rocket-exhibition.jpg', captionEn: 'Rocket Model Exhibition — Science Festival', captionBn: 'রকেট মডেল প্রদর্শনী — বিজ্ঞান উৎসব' },

  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx(prev => (prev === 0 ? photos.length - 1 : (prev as number) - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx(prev => (prev === photos.length - 1 ? 0 : (prev as number) + 1));
  };

  return (
    <div id="photo-gallery-page" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left relative">

      {/* Editorial Header */}
      {!hideHeader && (
        <div className="pb-4 border-b border-slate-200">
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
            {isBangla ? 'ক্যাম্পাস কার্যক্রম চিত্রশালা' : 'CAMPUS LIFE & STUDENT ALBUMS'}
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
            {isBangla ? 'ফটো গ্যালারী' : 'Photo Gallery'}
          </h1>
          <p className="text-xs text-slate-500">
            {isBangla
              ? 'কলেজ ক্যাম্পাসের প্রাকৃতিক প্রাঙ্গণ, ঐতিহাসিক অবকাঠামো এবং বিভিন্ন দিবসের সমাবেশের চিত্রাবলী।'
              : 'Explore pictorial memories of GSC classes, assemblies, and campus facilities.'}
          </p>
        </div>
      )}

      {/* Grid gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((p, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className="group relative bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md cursor-pointer hover:border-crimson/30 transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              <img
                src={p.url}
                alt={isBangla ? p.captionBn : p.captionEn}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay hover effect */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm border border-white/10 text-white transform scale-90 group-hover:scale-100 transition-transform">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 text-left border-t border-slate-100">
              <span className="text-[8px] font-mono bg-white text-crimson px-2 py-0.5 rounded border border-slate-200 uppercase tracking-widest font-black inline-block mb-1.5">
                {isBangla ? 'ক্যাম্পাস ছবি' : 'GSC CAMPUS'}
              </span>
              <h4 className="text-xs font-serif font-bold text-slate-805 leading-snug">
                {isBangla ? p.captionBn : p.captionEn}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedIdx !== null && (
        <div
          onClick={() => setSelectedIdx(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex flex-col justify-between py-6 px-4"
        >
          {/* Top header controls */}
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-white print:hidden">
            <div className="text-left">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">GSC ARCHIVE GRAPHIC</span>
              <span className="text-xs font-bold font-sans">
                {selectedIdx + 1} / {photos.length}
              </span>
            </div>

            <button
              onClick={() => setSelectedIdx(null)}
              className="p-2 bg-white/10 border border-white/10 rounded-full hover:bg-crimson hover:scale-105 transition-all text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core image display container */}
          <div className="flex-grow flex items-center justify-center relative max-w-5xl mx-auto w-full">
            {/* Left selector */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-3 bg-white/5 border border-white/10 rounded-full hover:bg-crimson text-white transition-all cursor-pointer backdrop-blur"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Slide Image */}
            <div className="max-w-full max-h-[70vh] flex items-center justify-center p-2">
              <img
                src={photos[selectedIdx].url}
                alt={isBangla ? photos[selectedIdx].captionBn : photos[selectedIdx].captionEn}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-2xl animate-fade-in"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right selector */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-3 bg-white/5 border border-white/10 rounded-full hover:bg-crimson text-white transition-all cursor-pointer backdrop-blur"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Bottom caption and slide indicators */}
          <div className="max-w-3xl mx-auto text-center text-white space-y-2 pb-2">
            <h4 className="text-sm sm:text-base font-serif font-black tracking-wide">
              {isBangla ? photos[selectedIdx].captionBn : photos[selectedIdx].captionEn}
            </h4>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
              {isBangla ? 'তেজগাঁও কলেজ প্রাঙ্গণ চিত্রশালা' : 'TEJGAON CAMPUS EXHIBITION'}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
