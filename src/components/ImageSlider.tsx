import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageSliderProps {
  isBangla: boolean;
}

interface Slide {
  id: number;
  url: string;
  fallbackUrl: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  categoryBn: string;
  categoryEn: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ isBangla }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: Slide[] = [
    {
      id: 0,
      url: '/images/college-gate.jpg',
      fallbackUrl: 'https://www.gsctd.edu.bd/wp-content/uploads/2025/01/gsc-gate101.jpg',
      categoryBn: 'ক্যাম্পাস তোরণ',
      categoryEn: 'Main Entrance Gate',
      titleBn: 'সরকারি বিজ্ঞান কলেজ, তেজগাঁও, ঢাকা — মূল প্রবেশদ্বার',
      titleEn: 'Government Science College, Tejgaon, Dhaka — Main Gate',
      descBn: 'ঢাকার তেজগাঁও শিল্পাঞ্চলের প্রাণকেন্দ্রে ১৯৫৪ সালে প্রতিষ্ঠিত সরকারি বিজ্ঞান কলেজের ঐতিহাসিক মূল প্রবেশদ্বার।',
      descEn: 'The historic main entrance gate of Government Science College, Tejgaon, Dhaka — a beacon of science education since 1954.'
    },
    //{
    //id: 1,
    //url: '/images/robotics-expo.jpg',
    //fallbackUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    //categoryBn: 'রোবোটিক্স প্রদর্শনী',
    //categoryEn: 'Robotics Exhibition',
    //titleBn: 'বিজ্ঞান ও কোয়ান্টু প্রদর্শনী — রোবোটিক্স প্রকল্পসমূহ',
    //titleEn: 'Science & Quantu Exhibition — Robotics Projects',
    //descBn: 'রোবোটিক্স প্রদর্শনীতে সরকারি বিজ্ঞান কলেজের শিক্ষার্থীদের তৈরি রোভার ও বিভিন্ন প্রযুক্তি প্রকল্পের প্রদর্শনী।',
    //descEn: 'GSC students demonstrating custom-built automated rovers and tech projects at the robotics exhibition.'
    //},
    {
      id: 2,
      url: '/images/cultural-program.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
      categoryBn: 'সাংস্কৃতিক অনুষ্ঠান',
      categoryEn: 'Cultural Program',
      titleBn: 'সাহিত্য ও সংস্কৃতি প্রতিযোগিতা ২০২৪–২০২৫ পুরস্কার বিতরণ',
      titleEn: 'Literary & Cultural Competition 2024–2025 Prize Distribution',
      descBn: 'কলেজের বার্ষিক সাহিত্য ও সংস্কৃতি প্রতিযোগিতার পুরস্কার বিতরণ অনুষ্ঠানে শিক্ষার্থীদের সঙ্গীত পরিবেশনা ও সাংস্কৃতিক কার্যক্রম।',
      descEn: 'Students performing music and cultural activities at the annual Literary & Cultural Competition prize distribution ceremony.'
    },
    {
      id: 3,
      url: '/images/gaming-tournament.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
      categoryBn: 'গেমিং টুর্নামেন্ট',
      categoryEn: 'Gaming Tournament',
      titleBn: 'জিএসসি বিজ্ঞান ক্লাব — ইন্টার-ডিস্ট্রিক্ট সায়েন্স ফেস্টিভ্যাল গেমিং প্রতিযোগিতা',
      titleEn: 'GSC Science Club — Inter-District Science Festival Gaming Contest',
      descBn: 'সরকারি বিজ্ঞান কলেজ বিজ্ঞান ক্লাব কর্তৃক আয়োজিত জাতীয় বিজ্ঞান ও আইটি উৎসবে রোমাঞ্চকর গেমিং টুর্নামেন্ট ও ই-স্পোর্টস প্রতিযোগিতা।',
      descEn: 'Thrilling gaming tournament and e-sports competition at the National Science & IT Festival organized by GSC Science Club.'
    },

    // {
    // id: 4,
    // url: '/images/classroom-study.jpg',
    // fallbackUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1200',
    //categoryBn: 'শ্রেণীকক্ষ কার্যক্রম',
    //categoryEn: 'Classroom Activities',
    // titleBn: 'শ্রেণীকক্ষে মনোযোগী পাঠদান ও পরীক্ষার প্রস্তুতি',
    // titleEn: 'Focused Classroom Learning & Exam Preparation',
    // descBn: 'শিক্ষার্থীরা শ্রেণীকক্ষে একনিষ্ঠ মনোযোগে পাঠদান গ্রহণ ও পরীক্ষার প্রস্তুতি নিচ্ছে। নিয়মিত পাঠদানই আমাদের শিক্ষার ভিত্তি।',
    // descEn: 'Students engaged in focused classroom study and exam preparation. Regular disciplined learning is the foundation of our education.'
    //}, 
    {
      id: 5,
      url: '/images/robotics-classroom.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200',
      categoryBn: 'স্টেম কর্মশালা',
      categoryEn: 'STEM Workshop',
      titleBn: 'হাতে-কলমে রোবোটিক্স ও ইলেকট্রনিক্স কর্মশালা',
      titleEn: 'Hands-on Robotics & Electronics Workshop',
      descBn: 'রোবোটিক্স ল্যাবে শিক্ষক ও শিক্ষার্থীদের যৌথ উদ্যোগে রোবট চ্যাসিস ডিজাইন ও সেন্সর সংযোজন।',
      descEn: 'Students and faculty members collaborating on robotic chassis design and sensor integration in the lab.'
    },
    {
      id: 6,
      url: '/images/bncc-cadets.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200',
      categoryBn: 'বিএনসিসি ক্যাডেট',
      categoryEn: 'BNCC Cadets',
      titleBn: 'সরকারি বিজ্ঞান কলেজ বিএনসিসি ক্যাডেটদের গৌরবময় প্যারেড',
      titleEn: 'GSCB NCC Cadets — Discipline, Duty & National Pride',
      descBn: 'কলেজের বিএনসিসি (বাংলাদেশ ন্যাশনাল ক্যাডেট কোর) ক্যাডেটদের সুশৃঙ্খল কুচকাওয়াজ ও জাতীয় সেবায় নিবেদিত প্রশিক্ষণ কার্যক্রম।',
      descEn: 'The BNCC (Bangladesh National Cadet Corps) cadets of Government Science College showcasing discipline and national service commitment.'
    },
    {
      id: 7,
      url: '/images/robotics-rover.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
      categoryBn: 'উদ্ভাবন হাব',
      categoryEn: 'Innovation Hub',
      titleBn: 'স্বয়ংক্রিয় রোভার প্রোটোটাইপ পরীক্ষা',
      titleEn: 'Testing the Autonomous Rover Prototype',
      descBn: 'কলেজের প্রকৌশল ও রোবোটিক্স টিম কর্তৃক নির্মিত অনুসন্ধান ও উদ্ধারকারী রোভার প্রোটোটাইপ পরীক্ষা।',
      descEn: 'Deep testing of the search-and-rescue rover built by the college engineering and robotics team.'
    }
  ];

  // Auto-play interval logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, slides.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Error callback to switch local/primary url with fallbackUrl
  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  const activeSlide = slides[currentIndex];
  const useFallback = imageErrors[activeSlide.id] || false;
  const currentImageUrl = useFallback ? activeSlide.fallbackUrl : activeSlide.url;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 1.03
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.97
    })
  };

  return (
    <div id="image-slider-component" className="w-full relative">

      {/* Main Slider Canvas - Full Screen Aspect */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] bg-slate-900 overflow-hidden group">

        {/* Slide Image with transitions */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={currentIndex}
              src={currentImageUrl}
              alt={isBangla ? activeSlide.titleBn : activeSlide.titleEn}
              onError={() => handleImageError(activeSlide.id)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 260, damping: 28 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.45 }
              }}
            />
          </AnimatePresence>

          {/* Vignette Overlay Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent"></div>
        </div>

        {/* Floating Top Category Badge - aligned with main page container bounds */}
        <div className="absolute top-6 left-0 right-0 z-20 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="bg-crimson text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded shadow-md inline-flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-white animate-pulse" />
              <span>{isBangla ? activeSlide.categoryBn : activeSlide.categoryEn}</span>
            </span>
          </div>
        </div>

        {/* Side Nav Buttons — always visible on desktop */}
        <button
          id="btn-slider-prev"
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/30 hover:bg-crimson hover:scale-110 text-white border border-white/20 transition-all cursor-pointer hidden sm:flex items-center justify-center shadow-xl backdrop-blur-sm"
          title="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          id="btn-slider-next"
          onClick={handleNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/30 hover:bg-crimson hover:scale-110 text-white border border-white/20 transition-all cursor-pointer hidden sm:flex items-center justify-center shadow-xl backdrop-blur-sm"
          title="Next Slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* bottom text descriptors & dynamic control dashboard panel */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 pt-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-end bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent">
          <div className="max-w-7xl mx-auto w-full space-y-4">
            <div className="max-w-3xl space-y-2">

              {/* Slide title */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-white tracking-tight drop-shadow">
                {isBangla ? activeSlide.titleBn : activeSlide.titleEn}
              </h3>

              {/* Slide Description */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans drop-shadow font-medium">
                {isBangla ? activeSlide.descBn : activeSlide.descEn}
              </p>
            </div>

            {/* Controls Segment: Autoplay Toggle, Dots pagination, Mobile gestures */}
            <div className="flex items-center justify-between border-t border-white/15 pt-4">

              {/* Auto Play Pause trigger */}
              <button
                id="slider-play-pause-toggle"
                onClick={togglePlay}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer backdrop-blur"
                title={isPlaying ? 'Pause Auto-cycle' : 'Play Auto-cycle'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-white text-white" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                    <span>Play</span>
                  </>
                )}
              </button>

              {/* Dots Nav Indicators */}
              <div className="flex items-center space-x-2">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    id={`btn-slider-dot-${idx}`}
                    onClick={() => handleDotClick(idx)}
                    className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${currentIndex === idx
                      ? 'w-6 bg-crimson shadow-md shadow-crimson/50'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Slide Count */}
              <span className="text-[10px] font-mono font-bold text-white/70 bg-white/5 px-2.5 py-1 rounded backdrop-blur">
                {currentIndex + 1} / {slides.length}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
