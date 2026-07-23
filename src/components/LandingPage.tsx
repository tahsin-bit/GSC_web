import React, { useState } from 'react';

import {

  Search, BookOpen, GraduationCap, ChevronRight, MapPin,

  BookMarked, HelpCircle, FileText, Video, Image as ImageIcon,

  Building2, ExternalLink, Calendar, Users, PhoneCall, Info,

  Sparkles

} from 'lucide-react';

import { DEPARTMENTS, INITIAL_NOTIFICATIONS } from '../data/mockData';

import { StatsPanel } from './StatsPanel';

import { ImageSlider } from './ImageSlider';

import { AnnouncementTicker } from './AnnouncementTicker';

import { GscAiChat } from './GscAiChat';

import { PhotoGallery } from './PhotoGallery';



interface LandingPageProps {

  isBangla: boolean;

  onOpenAuth: () => void;

  setActiveTab: (tab: string) => void;

  notifications: typeof INITIAL_NOTIFICATIONS;

  onSelectNotice: (notice: any) => void;

  onSelectInfo: (key: string) => void;

}



export const LandingPage: React.FC<LandingPageProps> = ({

  isBangla,

  onOpenAuth,

  setActiveTab,

  notifications,

  onSelectNotice,

  onSelectInfo

}) => {

  const [selectedDeptId, setSelectedDeptId] = useState<string>('phy');

  const [searchQuery, setSearchQuery] = useState<string>('');



  // GSC Admission Advisor GPA inputs

  const [gpa, setGpa] = useState<string>('5.00');

  const [mathGpa, setMathGpa] = useState<string>('5.00');

  const [eligibleResult, setEligibleResult] = useState<{ eligible: boolean; textEn: string; textBn: string; level: 'success' | 'warning' | 'danger' } | null>(null);



  // Filter department list based on user search query

  const filteredDepartments = DEPARTMENTS.filter(d =>

    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||

    d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||

    d.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))

  );



  const selectedDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];



  // HSC Science eligibility calculator

  const checkEligibility = (e: React.FormEvent) => {

    e.preventDefault();

    const parsedGpa = parseFloat(gpa);

    const parsedMath = parseFloat(mathGpa);



    if (isNaN(parsedGpa) || isNaN(parsedMath)) return;



    if (parsedGpa < 4.0) {

      setEligibleResult({

        eligible: false,

        level: 'danger',

        textEn: 'Government Science College strictly requires a minimum SSC GPA of 4.00 in the Science group.',

        textBn: 'Ã Â¦Â¸Ã Â¦Â°Ã Â¦•à¦¾à¦°à¦¿ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦•à¦²à§‡à¦œà§‡ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦—à§à¦°à§à¦ªà§‡ Ã Â¦†à¦¬à§‡à¦¦à¦¨à§‡à¦° Ã Â¦ÅÃ Â¦Â¨Ã Â§ÂÃ Â¦Â¯ Ã Â¦ÂÃ Â¦Â¸Ã Â¦ÂÃ Â¦Â¸Ã Â¦Â¸Ã Â¦Â¿Ã Â¦Â¤Ã Â§‡ Ã Â¦Â¨Ã Â§ÂÃ Â¦Â¯Ã Â§‚à¦¨à¦¤à¦® Ã Â¦ÅÃ Â¦Â¿Ã Â¦ÂªÃ Â¦Â¿Ã Â¦Â Ã Â§Âª.Ã Â§Â¦Ã Â§Â¦ Ã Â¦†à¦¬à¦¶à§à¦¯à¦•à¥¤'

      });

    } else if (parsedMath < 4.0) {

      setEligibleResult({

        eligible: false,

        level: 'danger',

        textEn: 'Admission criteria: SSC Higher Mathematics / General Mathematics grade must be at least A- (GPA 3.50).',

        textBn: 'Ã Â¦Â­Ã Â¦Â°Ã Â§ÂÃ Â¦Â¤Ã Â¦Â¿Ã Â¦Â° Ã Â¦Â¨Ã Â¦Â¿Ã Â§Å¸Ã Â¦Â® Ã Â¦…à¦¨à§à¦¯à¦¾à§Ÿà§€ Ã Â¦ÂÃ Â¦Â¸Ã Â¦ÂÃ Â¦Â¸Ã Â¦Â¸Ã Â¦Â¿Ã Â¦Â¤Ã Â§‡ Ã Â¦‰à¦šà§à¦šà¦¤à¦° Ã Â¦—à¦£à¦¿à¦¤/Ã Â¦Â¸Ã Â¦Â¾Ã Â¦Â§Ã Â¦Â¾Ã Â¦Â°Ã Â¦Â£ Ã Â¦—à¦£à¦¿à¦¤à§‡ Ã Â¦Â¨Ã Â§ÂÃ Â¦Â¯Ã Â§‚à¦¨à¦¤à¦® Ã Â¦ÅÃ Â¦Â¿Ã Â¦ÂªÃ Â¦Â¿Ã Â¦Â Ã Â§Â©.Ã Â§Â«Ã Â§Â¦ Ã Â¦Â¥Ã Â¦Â¾Ã Â¦•à¦¾ Ã Â¦†à¦¬à¦¶à§à¦¯à¦•à¥¤'

      });

    } else if (parsedGpa >= 5.00) {

      setEligibleResult({

        eligible: true,

        level: 'success',

        textEn: 'Highly Eligible! A GPA of 5.00 gives you a premium chance of admission in the upcoming selection rounds.',

        textBn: 'Ã Â¦…à¦¤à§à¦¯à¦¨à§à¦¤ Ã Â¦‰à¦ªà¦¯à§à¦•à§à¦¤! Ã Â¦ÅÃ Â¦Â¿Ã Â¦ÂªÃ Â¦Â¿Ã Â¦Â Ã Â§Â«.Ã Â§Â¦Ã Â§Â¦ Ã Â¦Â¥Ã Â¦Â¾Ã Â¦•à¦¾à§Ÿ Ã Â¦†à¦¸à¦¨à§à¦¨ Ã Â¦Â¨Ã Â¦Â¿Ã Â¦Â°Ã Â§ÂÃ Â¦Â¬Ã Â¦Â¾Ã Â¦Å¡Ã Â¦Â¨ Ã Â¦Â°Ã Â¦Â¾Ã Â¦‰à¦¨à§à¦¡à§‡ Ã Â¦†à¦ªà¦¨à¦¾à¦° Ã Â¦Â­Ã Â¦Â°Ã Â§ÂÃ Â¦Â¤Ã Â¦Â¿Ã Â¦Â° Ã Â¦Â¸Ã Â¦Â°Ã Â§ÂÃ Â¦Â¬Ã Â§‹à¦šà§à¦š Ã Â¦Â¸Ã Â¦Â®Ã Â§ÂÃ Â¦Â­Ã Â¦Â¾Ã Â¦Â¬Ã Â¦Â¨Ã Â¦Â¾ Ã Â¦Â°Ã Â§Å¸Ã Â§‡à¦›à§‡à¥¤'

      });

    } else {

      setEligibleResult({

        eligible: true,

        level: 'warning',

        textEn: 'Eligible to apply! Selection will depend on the board merit list cutoff score (usually highly competitive).',

        textBn: 'Ã Â¦†à¦¬à§‡à¦¦à¦¨à§‡à¦° Ã Â¦ÅÃ Â¦Â¨Ã Â§ÂÃ Â¦Â¯ Ã Â¦Â¯Ã Â§‹à¦—à§à¦¯! Ã Â¦Å¡Ã Â§‚à§œà¦¾à¦¨à§à¦¤ Ã Â¦Â®Ã Â¦Â¨Ã Â§‹à¦¨à§Ÿà¦¨ Ã Â¦Â¬Ã Â§‹à¦°à§à¦¡à§‡à¦° Ã Â¦Â®Ã Â§‡à¦§à¦¾ Ã Â¦Â¤Ã Â¦Â¾Ã Â¦Â²Ã Â¦Â¿Ã Â¦•à¦¾ Ã Â¦•à¦¾à¦Ÿ-Ã Â¦…à¦« Ã Â¦Â¸Ã Â§ÂÃ Â¦•à§‹à¦°à§‡à¦° Ã Â¦“à¦ªà¦° Ã Â¦Â¨Ã Â¦Â¿Ã Â¦Â°Ã Â§ÂÃ Â¦Â­Ã Â¦Â° Ã Â¦•à¦°à¦¬à§‡ (Ã Â¦Â¯Ã Â¦Â¾ Ã Â¦…à¦¤à§à¦¯à¦¨à§à¦¤ Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¤Ã Â¦Â¿Ã Â¦Â¦Ã Â§ÂÃ Â¦Â¬Ã Â¦Â¨Ã Â§ÂÃ Â¦Â¦Ã Â§ÂÃ Â¦Â¬Ã Â¦Â¿Ã Â¦Â¤Ã Â¦Â¾Ã Â¦ÂªÃ Â§‚à¦°à§à¦£)Ã Â¥Â¤'

      });

    }

  };



  // Six Blocks / Widget-like items from GSC homepage

  const infoBlocks = [

    {

      titleEn: 'About Us',

      titleBn: 'Ã Â¦†à¦®à¦¾à¦¦à§‡à¦° Ã Â¦Â¸Ã Â¦Â®Ã Â§ÂÃ Â¦ÂªÃ Â¦Â°Ã Â§ÂÃ Â¦•à§‡',

      links: [

        { labelEn: 'History of GSC', labelBn: 'Ã Â¦•à¦²à§‡à¦œ Ã Â¦Â¸Ã Â§ÆÃ Â¦Â·Ã Â§ÂÃ Â¦Å¸Ã Â¦Â¿Ã Â¦Â° Ã Â¦‡à¦¤à¦¿à¦¹à¦¾à¦¸', key: 'history' },

        { labelEn: 'Vision & Mission', labelBn: 'Ã Â¦Â²Ã Â¦•à§à¦·à§à¦¯ Ã Â¦“ Ã Â¦‰à¦¦à§à¦¦à§‡à¦¶à§à¦¯', key: 'vision' },

        { labelEn: 'GSC at a Glance', labelBn: 'Ã Â¦ÂÃ Â¦• Ã Â¦Â¨Ã Â¦ÅÃ Â¦Â°Ã Â§‡ Ã Â¦Â¸Ã Â¦Â°Ã Â¦•à¦¾à¦°à¦¿ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦•à¦²à§‡à¦œ', key: 'glance' },

        { labelEn: 'Institutional Infrastructure', labelBn: 'Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¾Ã Â¦Â¤Ã Â¦Â¿Ã Â¦Â·Ã Â§ÂÃ Â¦Â Ã Â¦Â¾Ã Â¦Â¨Ã Â¦Â¿Ã Â¦• Ã Â¦…à¦¬à¦•à¦¾à¦ à¦¾à¦®à§‹', key: 'infrastructure' }

      ]

    },

    {

      titleEn: 'Right to Information',

      titleBn: 'Ã Â¦Â¤Ã Â¦Â¥Ã Â§ÂÃ Â¦Â¯ Ã Â¦…à¦§à¦¿à¦•à¦¾à¦°',

      links: [

        { labelEn: 'RTI Information Officer', labelBn: 'Ã Â¦Â¤Ã Â¦Â¥Ã Â§ÂÃ Â¦Â¯ Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¦Ã Â¦Â¾Ã Â¦Â¨Ã Â¦•à¦¾à¦°à§€ Ã Â¦•à¦°à§à¦®à¦•à¦°à§à¦¤à¦¾ (RTI)', key: 'rti' },

        { labelEn: 'Appellate Authority', labelBn: 'Ã Â¦†à¦ªà§€à¦² Ã Â¦•à¦°à§à¦¤à§ƒà¦ªà¦•à§à¦·', key: 'rti' }

      ]

    },

    {

      titleEn: 'Annual Performance Agreement',

      titleBn: 'Ã Â¦Â¬Ã Â¦Â¾Ã Â¦Â°Ã Â§ÂÃ Â¦Â·Ã Â¦Â¿Ã Â¦• Ã Â¦•à¦°à§à¦®à¦¸à¦®à§à¦ªà¦¾à¦¦à¦¨ Ã Â¦Å¡Ã Â§ÂÃ Â¦•à§à¦¤à¦¿ (APA)',

      links: [

        { labelEn: 'APA Guidelines/Circulars', labelBn: 'Ã Â¦ÂÃ Â¦ÂªÃ Â¦Â¿Ã Â¦Â Ã Â¦Â¨Ã Â¦Â¿Ã Â¦Â°Ã Â§ÂÃ Â¦Â¦Ã Â§‡à¦¶à¦¿à¦•à¦¾/Ã Â¦ÂªÃ Â¦Â°Ã Â¦Â¿Ã Â¦ÂªÃ Â¦Â¤Ã Â§ÂÃ Â¦Â°' },

        { labelEn: 'Agreements Archive', labelBn: 'Ã Â¦Å¡Ã Â§ÂÃ Â¦•à§à¦¤à¦¿à¦¸à¦®à§‚à¦¹' },

        { labelEn: 'Monitoring & Evaluation Reports', labelBn: 'Ã Â¦ÂªÃ Â¦Â°Ã Â¦Â¿Ã Â¦Â¬Ã Â§€à¦•à§à¦·à¦£ Ã Â¦“ Ã Â¦Â®Ã Â§‚à¦²à§à¦¯à¦¾à§Ÿà¦¨ Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¤Ã Â¦Â¿Ã Â¦Â¬Ã Â§‡à¦¦à¦¨' }

      ]

    },

    {

      titleEn: 'National Integrity Strategy',

      titleBn: 'Ã Â¦Â¶Ã Â§ÂÃ Â¦Â¦Ã Â§ÂÃ Â¦Â§Ã Â¦Â¾Ã Â¦Å¡Ã Â¦Â¾Ã Â¦Â° Ã Â¦•à§Œà¦¶à¦² Ã Â¦•à¦°à§à¦®à¦ªà¦°à¦¿à¦•à¦²à§à¦ªà¦¨à¦¾',

      links: [

        { labelEn: 'NIS Action Plan', labelBn: 'Ã Â¦Â¶Ã Â§ÂÃ Â¦Â¦Ã Â§ÂÃ Â¦Â§Ã Â¦Â¾Ã Â¦Å¡Ã Â¦Â¾Ã Â¦Â° Ã Â¦•à§Œà¦¶à¦² Ã Â¦•à¦°à§à¦®à¦ªà¦°à¦¿à¦•à¦²à§à¦ªà¦¨à¦¾' },

        { labelEn: 'Focal Point & Alt Officer', labelBn: 'Ã Â¦Â«Ã Â§‹à¦•à¦¾à¦² Ã Â¦ÂªÃ Â§Å¸Ã Â§‡à¦¨à§à¦Ÿ Ã Â¦“ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦•à¦²à§à¦ª Ã Â¦•à¦°à§à¦®à¦•à¦°à§à¦¤à¦¾' },

        { labelEn: 'Quarterly Reports', labelBn: 'Ã Â¦Â¤Ã Â§ÂÃ Â¦Â°Ã Â§ËÃ Â¦Â®Ã Â¦Â¾Ã Â¦Â¸Ã Â¦Â¿Ã Â¦• Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¤Ã Â¦Â¿Ã Â¦Â¬Ã Â§‡à¦¦à¦¨' }

      ]

    },

    {

      titleEn: 'Security & Discipline',

      titleBn: 'Ã Â¦Â¨Ã Â¦Â¿Ã Â¦Â°Ã Â¦Â¾Ã Â¦ÂªÃ Â¦Â¤Ã Â§ÂÃ Â¦Â¤Ã Â¦Â¾ Ã Â¦“ Ã Â¦Â¶Ã Â§ÆÃ Â¦™à§à¦–à¦²à¦¾',

      links: [

        { labelEn: 'Fire Service Hotlines', labelBn: 'Ã Â¦Â®Ã Â§‹à¦¬à¦¾à¦‡à¦²à§‡ Ã Â¦Â«Ã Â¦Â¾Ã Â§Å¸Ã Â¦Â¾Ã Â¦Â° Ã Â¦Â¸Ã Â¦Â¾Ã Â¦Â°Ã Â§ÂÃ Â¦Â­Ã Â¦Â¿Ã Â¦Â¸' },

        { labelEn: 'Report a Crime / Submit Info', labelBn: 'Ã Â¦…à¦ªà¦°à¦¾à¦§à§‡à¦° Ã Â¦Â¤Ã Â¦Â¥Ã Â§ÂÃ Â¦Â¯ Ã Â¦Â¦Ã Â¦Â¿Ã Â¦Â¨' },

        { labelEn: '999 National Emergency Service', labelBn: 'Ã Â§Â¯Ã Â§Â¯Ã Â§Â¯ Ã Â¦Â¨Ã Â§ÂÃ Â¦Â¯Ã Â¦Â¾Ã Â¦Â¶Ã Â¦Â¨Ã Â¦Â¾Ã Â¦Â² Ã Â¦‡à¦®à¦¾à¦°à§à¦œà§‡à¦¨à§à¦¸à¦¿ Ã Â¦Â¸Ã Â§‡à¦¬à¦¾' }

      ]

    },

    {

      titleEn: 'E-Directory',

      titleBn: 'Ã Â¦‡-Ã Â¦Â¡Ã Â¦Â¿Ã Â¦Â°Ã Â§‡à¦•à§à¦Ÿà¦°à§€',

      links: [

        { labelEn: 'Important Phone Numbers', labelBn: 'Ã Â¦—à§à¦°à§à¦¤à§à¦¬à¦ªà§‚à¦°à§à¦£ Ã Â¦Â«Ã Â§‹à¦¨ Ã Â¦Â¨Ã Â¦Â®Ã Â§ÂÃ Â¦Â¬Ã Â¦Â°' },

        { labelEn: 'Emergency Call Centers', labelBn: 'Ã Â¦ÅÃ Â¦Â°Ã Â§ÂÃ Â¦Â°Ã Â§€ Ã Â¦•à¦² Ã Â¦Â¸Ã Â§‡à¦¨à§à¦Ÿà¦¾à¦°à¦¸à¦®à§‚à¦¹' },

        { labelEn: 'Citizen Service Forms', labelBn: 'Ã Â¦Â¨Ã Â¦Â¾Ã Â¦—à¦°à¦¿à¦• Ã Â¦Â¸Ã Â§‡à¦¬à¦¾ Ã Â¦Â«Ã Â¦Â°Ã Â¦Â®' }

      ]

    }

  ];



  return (

    <div id="landing-page" className="bg-transparent text-slate-900 min-h-screen relative">



      {/* 1. Image Slider Ã¢€” Sticky Container */}

      <div className="sticky top-0 z-0 w-full overflow-hidden">

        <ImageSlider isBangla={isBangla} />

      </div>



      {/* 2. Scrollable content block that slides over the image slider */}

      <div className="relative z-10 bg-harvard-offwhite shadow-[0_-10px_40px_rgba(0,0,0,0.12)] border-t border-slate-200">



        {/* 2. Top Utility & Affiliation Bar (moved here) */}

        <div className="bg-slate-50 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-600 font-sans">

          <div className="max-w-7xl mx-auto flex items-center justify-between">

            <div className="flex items-center space-x-3">

              <span className="font-semibold text-[10px] tracking-wider text-crimson uppercase font-sans">

                Ã°Å¸“ {isBangla ? 'Ã Â¦Â¤Ã Â§‡à¦œà¦—à¦¾à¦à¦“ Ã Â¦Â¶Ã Â¦Â¿Ã Â¦Â²Ã Â§ÂÃ Â¦ÂªÃ Â¦Â¾Ã Â¦Å¾Ã Â§ÂÃ Â¦Å¡Ã Â¦Â², Ã Â¦Â¢Ã Â¦Â¾Ã Â¦•à¦¾-Ã Â§Â§Ã Â§Â¨Ã Â§Â§Ã Â§Â«' : 'Tejgaon Industrial Area, Dhaka-1215'}

              </span>

              <span className="hidden md:inline text-slate-300">|</span>

              <span className="hidden md:inline text-slate-500">

                {isBangla ? 'Ã Â¦‡à¦†à¦‡à¦†à¦‡à¦à¦¨ (EIIN): Ã Â§Â§Ã Â§Â¦Ã Â§Â®Ã Â§Â«Ã Â§Â©Ã Â§Â«' : 'EIIN Code: 108535'}

              </span>

              <span className="hidden md:inline text-slate-300">|</span>

              <span className="hidden md:inline text-slate-500">

                {isBangla ? 'Ã Â¦•à¦²à§‡à¦œ Ã Â¦•à§‹à¦¡: Ã Â§Â§Ã Â§Â¦Ã Â§Â¦Ã Â§Â®' : 'College Code: 1008'}

              </span>

            </div>



            <div className="flex items-center space-x-4">

              <span className="text-[10px] text-slate-500 font-mono flex items-center space-x-1">

                <Sparkles className="w-3.5 h-3.5 text-crimson animate-pulse" />

                <span>{isBangla ? 'Ã Â¦Â¶Ã Â¦Â¿Ã Â¦•à§à¦·à¦¾ Ã Â¦“ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦—à¦¬à§‡à¦·à¦£à¦¾à§Ÿ Ã Â¦Â¶Ã Â§ÂÃ Â¦Â°Ã Â§‡à¦·à§à¦ à¦¤à§à¦¬' : 'Devoted to Excellence in Science'}</span>

              </span>

            </div>

          </div>

        </div>



        {/* 3. Scrolling announcements tick ribbon (moved here) */}

        <AnnouncementTicker

          notifications={notifications}

          isBangla={isBangla}

          onViewNotice={() => {

            const latestNotice = notifications.filter(n => n.priority === 'high')[0] || notifications[0];

            if (latestNotice) onSelectNotice(latestNotice);

          }}

        />



        {/* 2. Harvard-Style Editorial Hero Section */}

        <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-24 border-b border-slate-200 bg-white harvard-grid">

          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 hidden lg:block -z-10"></div>



          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <div className="text-center max-w-4xl mx-auto space-y-6">



              {/* Affiliation Badge Tagline */}

              <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded text-[10px] font-mono tracking-widest font-bold uppercase text-crimson">

                <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse"></span>

                <span>{isBangla ? 'Ã Â¦—à¦£à¦ªà§à¦°à¦œà¦¾à¦¤à¦¨à§à¦¤à§à¦°à§€ Ã Â¦Â¬Ã Â¦Â¾Ã Â¦‚à¦²à¦¾à¦¦à§‡à¦¶ Ã Â¦Â¸Ã Â¦Â°Ã Â¦•à¦¾à¦° Ã Â¦…à¦¨à§à¦®à§‹à¦¦à¦¿à¦¤ Ã Â¦Â¸Ã Â¦Â°Ã Â¦•à¦¾à¦°à¦¿ Ã Â¦•à¦²à§‡à¦œ' : 'Affiliated Ministry of Education, Govt. of Bangladesh'}</span>

              </div>



              {/* Massive Serif Heading - Ivy League Styled */}

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-slate-900 leading-tight">

                {isBangla ? (

                  <>

                    Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦“ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦Å¡Ã Â¦Â°Ã Â§ÂÃ Â¦Å¡Ã Â¦Â¾Ã Â§Å¸ <br />

                    <span className="text-crimson font-serif font-bold underline decoration-crimson/30 decoration-2 underline-offset-8">

                      Ã Â¦Â¶Ã Â§ÂÃ Â¦Â°Ã Â§‡à¦·à§à¦ à¦¤à§à¦¬à§‡à¦° Ã Â¦…à¦°à§à¦§-Ã Â¦Â¶Ã Â¦Â¤Ã Â¦Â¾Ã Â¦Â¬Ã Â§ÂÃ Â¦Â¦Ã Â§€

                    </span>

                  </>

                ) : (

                  <>

                    Devoted to Excellence in <br />

                    <span className="text-crimson font-serif font-bold underline decoration-crimson/30 decoration-2 underline-offset-8">

                      Science Education & Leadership

                    </span>

                  </>

                )}

              </h1>



              {/* Editorial Subheading */}

              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">

                {isBangla

                  ? 'Ã Â§Â§Ã Â§Â¯Ã Â§Â«Ã Â§Âª Ã Â¦Â¸Ã Â¦Â¾Ã Â¦Â²Ã Â§‡ Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¤Ã Â¦Â¿Ã Â¦Â·Ã Â§ÂÃ Â¦Â Ã Â¦Â¿Ã Â¦Â¤ Ã Â¦Â¢Ã Â¦Â¾Ã Â¦•à¦¾à¦° Ã Â¦ÂÃ Â¦Â¤Ã Â¦Â¿Ã Â¦Â¹Ã Â§ÂÃ Â¦Â¯Ã Â¦Â¬Ã Â¦Â¾Ã Â¦Â¹Ã Â§€ Ã Â¦Â¸Ã Â¦Â°Ã Â¦•à¦¾à¦°à¦¿ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦•à¦²à§‡à¦œ Ã Â¦Â¤Ã Â§‡à¦œà¦—à¦¾à¦à¦“-Ã Â¦ÂÃ Â¦Â° Ã Â¦…à¦«à¦¿à¦¸à¦¿à§Ÿà¦¾à¦² Ã Â¦ÂÃ Â¦•à¦¾à¦¡à§‡à¦®à¦¿à¦• Ã Â¦ÂªÃ Â§‹à¦°à§à¦Ÿà¦¾à¦²à§‡ Ã Â¦Â¸Ã Â§ÂÃ Â¦Â¬Ã Â¦Â¾Ã Â¦—à¦¤à¦®à¥¤ Ã Â¦Â®Ã Â¦Â¾Ã Â¦Â§Ã Â§ÂÃ Â¦Â¯Ã Â¦Â®Ã Â¦Â¿Ã Â¦• Ã Â¦ÂªÃ Â¦Â°Ã Â¦Â¬Ã Â¦Â°Ã Â§ÂÃ Â¦Â¤Ã Â§€ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦Â¶Ã Â¦Â¿Ã Â¦•à§à¦·à¦¾à¦° Ã Â¦—à§Œà¦°à¦¬à¦®à§Ÿ Ã Â¦ÂªÃ Â¦Â¥ Ã Â¦Å¡Ã Â¦Â²Ã Â¦Â¾Ã Â§Å¸ Ã Â¦†à¦®à¦°à¦¾ Ã Â¦Â¶Ã Â¦Â¿Ã Â¦•à§à¦·à¦¾à¦°à§à¦¥à§€à¦¦à§‡à¦° Ã Â¦Â¨Ã Â¦Â¿Ã Â§Å¸Ã Â¦Â®Ã Â¦Â¾Ã Â¦Â¨Ã Â§ÂÃ Â¦Â¬Ã Â¦Â°Ã Â§ÂÃ Â¦Â¤Ã Â¦Â¿Ã Â¦Â¤Ã Â¦Â¾ Ã Â¦“ Ã Â¦†à¦§à§à¦¨à¦¿à¦• Ã Â¦—à¦¬à§‡à¦·à¦£à¦¾à¦—à¦¾à¦°à§‡à¦° Ã Â¦Â®Ã Â¦Â¾Ã Â¦Â§Ã Â§ÂÃ Â¦Â¯Ã Â¦Â®Ã Â§‡ Ã Â¦—à§œà§‡ Ã Â¦Â¤Ã Â§ÂÃ Â¦Â²Ã Â¦Â¿Ã Â¥Â¤'

                  : 'Welcome to the premier academic portal of Government Science College, Tejgaon, Dhaka. Cultivating scientifically-minded leaders, rigorous intermediate board certifications, and comprehensive laboratory research since 1954.'}

              </p>



              {/* High Contrast Academic Action Triggers */}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">

                <button

                  id="hero-portal-btn"

                  onClick={onOpenAuth}

                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-widest text-xs font-bold px-8 py-4 rounded transition-all shadow-md cursor-pointer"

                >

                  <GraduationCap className="w-4 h-4 text-white" />

                  <span>{isBangla ? 'Ã Â¦Â¸Ã Â§ÂÃ Â¦Å¸Ã Â§ÂÃ Â¦Â¡Ã Â§‡à¦¨à§à¦Ÿ Ã Â¦ÂªÃ Â§‹à¦°à§à¦Ÿà¦¾à¦² Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¬Ã Â§‡à¦¶' : 'Access Student Portal'}</span>

                </button>



                <a

                  id="hero-explore-btn"

                  href="#departments-section"

                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-mono uppercase tracking-widest text-xs font-bold px-8 py-4 rounded transition-all cursor-pointer"

                >

                  <BookOpen className="w-4 h-4 text-crimson" />

                  <span>{isBangla ? 'Ã Â¦Â¬Ã Â¦Â¿Ã Â¦Â­Ã Â¦Â¾Ã Â¦—à¦¸à¦®à§‚à¦¹ Ã Â¦“ Ã Â¦…à¦¨à§à¦·à¦¦' : 'Explore Departments'}</span>

                </a>

              </div>



            </div>

          </div>

        </section>



        {/* 3. Stats Panel Layer */}

        <section className="relative">

          <StatsPanel isBangla={isBangla} />

        </section>



        {/* 4. Harvard President Style Featured Profile: Principal Message */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 border-b border-slate-200">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">



            {/* Principal Image with Harvard Crimson frame */}

            <div className="lg:col-span-5 flex justify-center">

              <div className="relative group w-48 h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80 max-w-full">

                <div className="absolute inset-0 bg-crimson rounded-lg transform translate-x-3 translate-y-3 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>

                <img

                  src="https://www.gsctd.edu.bd/wp-content/uploads/2026/06/vice-p_salma.jpg"

                  alt="Principal Prof. Salma Begum"

                  className="w-full h-full object-cover rounded-lg shadow-md border border-slate-200 filter contrast-105"

                />

                <div className="absolute -bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur text-white p-3.5 rounded border border-white/10 text-center shadow-lg">

                  <h4 className="font-serif font-black text-xs sm:text-sm">{isBangla ? 'Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â«Ã Â§‡à¦¸à¦° Ã Â¦Â¸Ã Â¦Â¾Ã Â¦Â²Ã Â¦Â®Ã Â¦Â¾ Ã Â¦Â¬Ã Â§‡à¦—à¦®' : 'Prof. Salma Begum'}</h4>

                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">{isBangla ? 'Ã Â¦…à¦§à§à¦¯à¦•à§à¦·, Ã Â¦Â¸Ã Â¦Â°Ã Â¦•à¦¾à¦°à¦¿ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦•à¦²à§‡à¦œ' : 'Principal, Govt. Science College'}</p>

                </div>

              </div>

            </div>



            {/* Principal Speech text */}

            <div className="lg:col-span-7 space-y-6">

              <span className="text-[10px] text-crimson font-mono tracking-widest uppercase font-bold block">

                {isBangla ? 'Ã Â¦…à¦§à§à¦¯à¦•à§à¦·à§‡à¦° Ã Â¦Â¬Ã Â¦Â¾Ã Â¦Â£Ã Â§€' : 'OFFICE OF THE PRINCIPAL'}

              </span>

              <h2 className="text-xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight leading-snug">

                {isBangla ? 'Ã Â¦Â¸Ã Â¦Â°Ã Â¦•à¦¾à¦°à¦¿ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦•à¦²à§‡à¦œà§‡ Ã Â¦†à¦ªà¦¨à¦¾à¦•à§‡ Ã Â¦Â¸Ã Â§ÂÃ Â¦Â¬Ã Â¦Â¾Ã Â¦—à¦¤' : 'Welcome to Government Science College'}

              </h2>

              <div className="w-16 h-1 bg-crimson"></div>



              {/* Serif Speech Quote */}

              <blockquote className="text-base sm:text-lg font-serif italic text-slate-700 border-l-2 border-crimson pl-4 leading-relaxed">

                {isBangla

                  ? 'Ã¢€œà¦†à¦®à¦¾à¦¦à§‡à¦° Ã Â¦Â²Ã Â¦•à§à¦·à§à¦¯ Ã Â¦Â¶Ã Â§ÂÃ Â¦Â§Ã Â§Â Ã Â¦Â¶Ã Â¦Â¿Ã Â¦•à§à¦·à¦¾à¦°à§à¦¥à§€à¦¦à§‡à¦° Ã Â¦ÂªÃ Â¦Â¾Ã Â¦Â Ã Â§ÂÃ Â¦Â¯Ã Â¦Â¸Ã Â§‚à¦šà¦¿ Ã Â¦Â¸Ã Â¦Â®Ã Â¦Â¾Ã Â¦ÂªÃ Â§ÂÃ Â¦Â¤ Ã Â¦•à¦°à¦¾ Ã Â¦Â¨Ã Â§Å¸, Ã Â¦Â¬Ã Â¦Â°Ã Â¦‚ Ã Â¦Â¤Ã Â¦Â¾Ã Â¦Â¦Ã Â§‡à¦° Ã Â¦Â®Ã Â¦Â§Ã Â§ÂÃ Â¦Â¯Ã Â§‡ Ã Â¦ÂÃ Â¦•à¦Ÿà¦¿ Ã Â¦Â¬Ã Â§ËÃ Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨Ã Â¦Â¿Ã Â¦• Ã Â¦Â¦Ã Â§ÆÃ Â¦Â·Ã Â§ÂÃ Â¦Å¸Ã Â¦Â¿Ã Â¦Â­Ã Â¦™à§à¦—à¦¿, Ã Â¦Â¸Ã Â§ÆÃ Â¦ÅÃ Â¦Â¨Ã Â¦Â¶Ã Â§€à¦² Ã Â¦Â®Ã Â¦Â¨Ã Â¦Â¨Ã Â¦Â¶Ã Â§€à¦²à¦¤à¦¾ Ã Â¦ÂÃ Â¦Â¬Ã Â¦‚ Ã Â¦Â¦Ã Â§‡à¦¶à§‡à¦° Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¤Ã Â¦Â¿ Ã Â¦—à¦­à§€à¦° Ã Â¦Â¦Ã Â§‡à¦¶à¦ªà§à¦°à§‡à¦® Ã Â¦ÅÃ Â¦Â¾Ã Â¦—à§à¦°à¦¤ Ã Â¦•à¦°à¦¾à¥¤â€'

                  : 'Ã¢€œOur mission is not merely academic completion, but fostering deep scientific queries, creative innovations, and structural discipline within each cohort.Ã¢€'}

              </blockquote>



              <p className="text-xs sm:text-sm text-slate-655 text-slate-650 leading-relaxed font-sans">

                {isBangla

                  ? 'Ã Â§Â§Ã Â§Â¯Ã Â§Â«Ã Â§Âª Ã Â¦Â¸Ã Â¦Â¾Ã Â¦Â² Ã Â¦Â¥Ã Â§‡à¦•à§‡ Ã Â¦ÂÃ Â¦‡ Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¤Ã Â¦Â¿Ã Â¦Â·Ã Â§ÂÃ Â¦Â Ã Â¦Â¾Ã Â¦Â¨Ã Â¦Å¸Ã Â¦Â¿ Ã Â¦Â¦Ã Â§‡à¦¶à§‡à¦° Ã Â¦Â¸Ã Â§‡à¦°à¦¾ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¤Ã Â¦Â¿Ã Â¦Â­Ã Â¦Â¾ Ã Â¦Â¤Ã Â§ËÃ Â¦Â°Ã Â¦Â¿Ã Â¦Â¤Ã Â§‡ Ã Â¦…à¦¬à¦¦à¦¾à¦¨ Ã Â¦Â°Ã Â§‡à¦–à§‡ Ã Â¦†à¦¸à¦›à§‡à¥¤ Ã Â¦†à¦§à§à¦¨à¦¿à¦• Ã Â¦Â¸Ã Â§ÂÃ Â¦Â¸Ã Â¦ÅÃ Â§ÂÃ Â¦ÅÃ Â¦Â¿Ã Â¦Â¤ Ã Â¦ÂªÃ Â¦Â¦Ã Â¦Â¾Ã Â¦Â°Ã Â§ÂÃ Â¦Â¥, Ã Â¦Â°Ã Â¦Â¸Ã Â¦Â¾Ã Â§Å¸Ã Â¦Â¨, Ã Â¦—à¦£à¦¿à¦¤ Ã Â¦“ Ã Â¦ÅÃ Â§€à¦¬à¦¬à¦¿à¦¦à§à¦¯à¦¾ Ã Â¦Â²Ã Â§ÂÃ Â¦Â¯Ã Â¦Â¾Ã Â¦Â¬Ã Â¦Â°Ã Â§‡à¦Ÿà¦°à¦¿à¦° Ã Â¦Â®Ã Â¦Â¾Ã Â¦Â§Ã Â§ÂÃ Â¦Â¯Ã Â¦Â®Ã Â§‡ Ã Â¦†à¦®à¦°à¦¾ Ã Â¦Â¬Ã Â§ÂÃ Â¦Â¯Ã Â¦Â¬Ã Â¦Â¹Ã Â¦Â¾Ã Â¦Â°Ã Â¦Â¿Ã Â¦• Ã Â¦Â¶Ã Â¦Â¿Ã Â¦•à§à¦·à¦¾à¦•à§‡ Ã Â¦Â¸Ã Â¦Â°Ã Â§ÂÃ Â¦Â¬Ã Â§‹à¦šà§à¦š Ã Â¦—à§à¦°à§à¦¤à§à¦¬ Ã Â¦Â¦Ã Â¦Â¿Ã Â¦‡à¥¤ Ã Â¦Â¶Ã Â¦Â¿Ã Â¦•à§à¦·à¦¾à¦°à§à¦¥à§€à¦¦à§‡à¦° Ã Â¦Â¸Ã Â§ÂÃ Â¦Â¶Ã Â§ÆÃ Â¦™à§à¦–à¦² Ã Â¦ÂªÃ Â¦Â¾Ã Â¦Â Ã Â¦Â¦Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦“ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦Â­Ã Â¦Â¿Ã Â¦Â¨Ã Â§ÂÃ Â¦Â¨ Ã Â¦•à§‹-Ã Â¦•à¦¾à¦°à¦¿à¦•à§à¦²à¦¾à¦° Ã Â¦•à§à¦²à¦¾à¦¬à§‡à¦° Ã Â¦•à¦¾à¦°à§à¦¯à¦•à§à¦°à¦® Ã Â¦Â¤Ã Â¦Â¾Ã Â¦Â¦Ã Â§‡à¦° Ã Â¦ÂÃ Â¦• Ã Â¦ÂÃ Â¦•à¦œà¦¨ Ã Â¦Â¸Ã Â¦Â®Ã Â¦Â¾Ã Â¦ÅÃ Â¦Â¹Ã Â¦Â¿Ã Â¦Â¤Ã Â§ËÃ Â¦Â·Ã Â§€ Ã Â¦“ Ã Â¦Â¸Ã Â§ÂÃ Â¦Â¨Ã Â¦Â¾Ã Â¦—à¦°à¦¿à¦• Ã Â¦Â¹Ã Â¦Â¿Ã Â¦Â¸Ã Â§‡à¦¬à§‡ Ã Â¦—à§œà§‡ Ã Â¦Â¤Ã Â§ÂÃ Â¦Â²Ã Â¦Â¤Ã Â§‡ Ã Â¦Â¸Ã Â¦Â¾Ã Â¦Â¹Ã Â¦Â¾Ã Â¦Â¯Ã Â§ÂÃ Â¦Â¯ Ã Â¦•à¦°à§‡à¥¤'

                  : 'Since 1954, Government Science College has been a beacon of intermediate and undergraduate science education. With state-of-the-art laboratory complexes in physics, chemistry, biology and computer sciences, we bridge the gap between theoretics and practical execution.'}

              </p>



              <div>

                <a

                  href="#"

                  className="inline-flex items-center space-x-1.5 text-xs text-crimson font-mono font-bold uppercase tracking-wider hover:text-crimson-dark transition-all hover:underline underline-offset-4"

                >

                  <span>{isBangla ? 'Ã Â¦Â¬Ã Â¦Â¾Ã Â¦Â£Ã Â§€à¦° Ã Â¦Â¸Ã Â¦Â®Ã Â§ÂÃ Â¦ÂªÃ Â§‚à¦°à§à¦£ Ã Â¦…à¦‚à¦¶ Ã Â¦ÂªÃ Â§ÅÃ Â§ÂÃ Â¦Â¨' : 'Read Full Message'}</span>

                  <ChevronRight className="w-4 h-4" />

                </a>

              </div>

            </div>



          </div>

        </section>



        {/* 5. Notice Board Section (Scraped Headlines from GSC website) */}

        <section id="notices-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 border-b border-slate-200">

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6 sm:mb-12">

            <div>

              <span className="text-[10px] text-crimson font-mono tracking-widest uppercase font-bold block mb-1">

                {isBangla ? 'Ã Â¦Â¸Ã Â¦Â°Ã Â§ÂÃ Â¦Â¬Ã Â¦Â¶Ã Â§‡à¦· Ã Â¦Â¨Ã Â§‹à¦Ÿà¦¿à¦¶ Ã Â¦“ Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦•à¦¾à¦¶à¦¨à¦¾' : 'COLLEGE BULLETINS & ANNOUNCEMENTS'}

              </span>

              <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">

                {isBangla ? 'Ã Â¦Â¨Ã Â§‹à¦Ÿà¦¿à¦¶ Ã Â¦Â¬Ã Â§‹à¦°à§à¦¡ Ã Â¦“ Ã Â¦ÅÃ Â¦Â°Ã Â§ÂÃ Â¦Â°Ã Â¦Â¿ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦ÅÃ Â§ÂÃ Â¦Å¾Ã Â¦ÂªÃ Â§ÂÃ Â¦Â¤Ã Â¦Â¿' : 'Notice Board & Official Circulars'}

              </h2>

            </div>

            <button

              onClick={() => setActiveTab('notifications')}

              className="text-xs text-crimson font-mono font-bold tracking-wider uppercase hover:text-crimson-dark flex items-center space-x-1 hover:underline underline-offset-4 cursor-pointer"

            >

              <span>{isBangla ? 'Ã Â¦Â¸Ã Â¦•à¦² Ã Â¦Â¨Ã Â§‹à¦Ÿà¦¿à¦¶ Ã Â¦Â¸Ã Â¦‚à¦°à¦•à§à¦·à¦£à¦¾à¦—à¦¾à¦°' : 'View Full Bulletin Archive'}</span>

              <ChevronRight className="w-4 h-4" />

            </button>

          </div>



          {/* Notices Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">

            {notifications.slice(0, 6).map((notice) => (

              <div

                key={notice.id}

                onClick={() => onSelectNotice(notice)}

                className="bg-white hover:shadow-lg transition-all border border-slate-200 p-6 rounded cursor-pointer hover:border-crimson/30 flex flex-col justify-between"

              >

                <div>

                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100 text-xs">

                    <span className={`text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded ${notice.category === 'exam' ? 'bg-red-50 text-red-700 border border-red-200' :

                        notice.category === 'academic' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :

                          notice.category === 'event' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :

                            'bg-amber-50 text-amber-700 border border-amber-200'

                      }`}>

                      Ã°Å¸“¢ {notice.category}

                    </span>

                    <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">

                      <Calendar className="w-3.5 h-3.5" />

                      <span>{new Date(notice.date).toLocaleDateString(isBangla ? 'bn-BD' : 'en-US')}</span>

                    </span>

                  </div>



                  <h3 className="text-sm font-serif font-bold text-slate-900 hover:text-crimson transition-colors mb-2.5 line-clamp-2 leading-snug">

                    {notice.title}

                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">

                    {notice.message}

                  </p>

                </div>



                <div className="text-[10px] text-crimson font-mono font-black tracking-widest uppercase flex items-center space-x-1.5 pt-2 border-t border-slate-50 mt-2">

                  <span>{isBangla ? 'Ã Â¦Â¸Ã Â¦Â®Ã Â§ÂÃ Â¦ÂªÃ Â§‚à¦°à§à¦£ Ã Â¦Â¨Ã Â§‹à¦Ÿà¦¿à¦¶à¦Ÿà¦¿ Ã Â¦Â¦Ã Â§‡à¦–à§à¦¨' : 'View Circular PDF'}</span>

                  <ChevronRight className="w-3.5 h-3.5 text-crimson" />

                </div>

              </div>

            ))}

          </div>

        </section>



        {/* 6. Section: Academic Departments Matrix */}
        <section id="departments-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 border-b border-slate-200">
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-[10px] text-crimson font-mono tracking-widest uppercase font-bold block mb-1">
              {isBangla ? 'শিক্ষা ও বিভাগসমূহ' : 'ACADEMIC DEPARTMENTS'}
            </span>
            <h2 className="text-xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
              {isBangla ? 'আমাদের একাডেমিক অনুষদ ও বিভাগসমূহ' : 'GSC Core Science Disciplines'}
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              {isBangla
                ? 'আমাদের সুসজ্জিত বিজ্ঞান ল্যাব ও অভিজ্ঞ শিক্ষক মণ্ডলী দ্বারা পরিচালিত প্রধান ৮টি অনুষদ এবং কোর্সের তালিকা।'
                : 'Explore core sciences disciplines. Each department is equipped with standard labs, intermediate boards, and specialized HOD profiles.'}
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-md mx-auto relative shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                id="dept-search-input"
                type="text"
                placeholder={isBangla ? 'বিভাগ বা অনুষদের নাম সার্চ করুন...' : 'Search physics, chemistry, labs...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded pl-10 pr-4 py-3 placeholder-slate-400 text-sm text-slate-800 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono hover:text-crimson cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
            {/* Left Side selectors — horizontal scroll on mobile, vertical list on desktop */}
            <div className="lg:col-span-4">
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:space-y-2 scrollbar-hide">
              <p className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase px-2 pb-1.5">
                {isBangla ? 'অনুষদ / বিভাগসমূহ' : 'SELECT ACADEMIC DEPARTMENT'}
              </p>
              {filteredDepartments.length === 0 ? (
                <div className="p-5 rounded border border-slate-200 text-center text-slate-500 text-xs bg-white">
                  {isBangla ? 'কোনো বিভাগ পাওয়া যায় নি।' : 'No matching departments found.'}
                </div>
              ) : (
                filteredDepartments.map((dept) => (
                  <button
                    key={dept.id}
                    id={`btn-select-dept-${dept.id}`}
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`shrink-0 lg:w-full text-left p-3 lg:p-4 rounded transition-all flex items-center justify-between group border ${selectedDeptId === dept.id
                        ? 'bg-white border-y-slate-200 border-r-slate-200 border-l-4 border-l-crimson shadow-md text-slate-900'
                        : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2 rounded bg-slate-100 text-crimson group-hover:scale-105 transition-all">
                        <BookOpen className="w-5 h-5 text-crimson" />
                      </div>
                      <div>
                        <h4 className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">{dept.code}</h4>
                        <h3 className="text-xs sm:text-sm font-semibold">{isBangla && dept.id === 'phy' ? 'পদার্থবিজ্ঞান বিভাগ' : isBangla && dept.id === 'che' ? 'রসায়ন বিভাগ' : isBangla && dept.id === 'math' ? 'গণিত বিভাগ' : isBangla && dept.id === 'ict' ? 'আইসিটি বিভাগ' : isBangla && dept.id === 'bot' ? 'উদ্ভিদবিজ্ঞান বিভাগ' : isBangla && dept.id === 'zoo' ? 'প্রাণীবিজ্ঞান বিভাগ' : isBangla && dept.id === 'ban' ? 'বাংলা বিভাগ' : isBangla && dept.id === 'eng' ? 'ইংরেজি বিভাগ' : dept.name}</h3>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedDeptId === dept.id ? 'text-crimson' : 'text-slate-400'}`} />
                  </button>
                ))
              )}
              </div>
            </div>

            {/* Right Side details profile block */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                <div className="flex items-center space-x-3.5">
                  <div className="p-3 bg-slate-50 rounded border border-slate-150 text-crimson">
                    <BookMarked className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] bg-crimson/10 text-crimson font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded">
                      🎓 {isBangla ? 'শ্রেণি সমূহ: একাদশ - দ্বাদশ ও ডিগ্রি' : selectedDept.duration}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 mt-1">
                      {isBangla && selectedDept.id === 'phy' ? 'পদার্থবিজ্ঞান বিভাগ' : isBangla && selectedDept.id === 'che' ? 'রসায়ন বিভাগ' : isBangla && selectedDept.id === 'math' ? 'গণিত বিভাগ' : isBangla && selectedDept.id === 'ict' ? 'আইসিটি বিভাগ' : isBangla && selectedDept.id === 'bot' ? 'উদ্ভিদবিজ্ঞান বিভাগ' : isBangla && selectedDept.id === 'zoo' ? 'প্রাণীবিজ্ঞান বিভাগ' : isBangla && selectedDept.id === 'ban' ? 'বাংলা বিভাগ' : isBangla && selectedDept.id === 'eng' ? 'ইংরেজি বিভাগ' : selectedDept.name}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-8">
                {isBangla && selectedDept.id === 'phy' ? 'পদার্থের গঠন, বলবিদ্যা, তড়িৎ চৌম্বকত্ব, আলোকবিদ্যা, পারমাণবিক পদার্থবিজ্ঞান এবং তাপগতিবিদ্যার বিস্তারিত তাত্ত্বিক ও ব্যবহারিক পর্যালোচনা। প্রকৌশল ও বিজ্ঞান শিক্ষার অন্যতম বুনিয়াদ।' : isBangla && selectedDept.id === 'che' ? 'জৈব রসায়ন, অজৈব পদার্থের গুণগত বিশ্লেষণ, রাসায়নিক সাম্যাবস্থা এবং ল্যাবরেটরির রাসায়নিক পরীক্ষা। মেডিকেল ও ইঞ্জিনিয়ারিং পরীক্ষার অন্যতম সহায়ক পাঠ।' : selectedDept.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'বিভাগীয় প্রধান' : 'Head of Department'}</p>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    {isBangla && selectedDept.id === 'che' ? 'প্রফেসর মোঃ জহিরুল আলম' : selectedDept.headOfDept}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'বিজ্ঞানাগার / ল্যাব' : 'Laboratory Complexes'}</p>
                  <p className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{selectedDept.labsCount} {isBangla ? 'টি ল্যাবরেটরি' : 'Lab Complexes'}</span>
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-150">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">{isBangla ? 'আসন সংখ্যা (প্রতি বিভাগ)' : 'Enrollment Seats'}</p>
                  <p className="text-xs font-bold text-slate-800 pt-0.5">{selectedDept.seatCount} {isBangla ? 'জন শিক্ষার্থী' : 'Seats Count'}</p>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-crimson" />
                  <span>{isBangla ? 'গবেষণাগার ও ব্যবহারিক টপিকসমূহ' : 'Syllabus Core Modules'}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDept.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded text-slate-700 font-mono font-medium transition-colors"
                    >
                      ⚙️ {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 7. Home Six Blocks Widget Grid (APA, NIS, RTI, Security, etc.) */}

        <section className="bg-slate-50 border-b border-slate-200 py-10 sm:py-20">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-6 sm:mb-12">

              <span className="text-[10px] text-crimson font-mono tracking-widest uppercase font-bold block mb-1">

                {isBangla ? 'Ã Â¦Â¸Ã Â¦Â¾Ã Â¦‚à¦—à¦ à¦¨à¦¿à¦• Ã Â¦•à¦°à§à¦®à¦ªà¦°à¦¿à¦•à¦²à§à¦ªà¦¨à¦¾ Ã Â¦“ Ã Â¦Â¤Ã Â¦Â¥Ã Â§ÂÃ Â¦Â¯' : 'INSTITUTIONAL PROTOCOLS'}

              </span>

              <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">

                {isBangla ? 'Ã Â¦Â¶Ã Â§ÂÃ Â¦Â¦Ã Â§ÂÃ Â¦Â§Ã Â¦Â¾Ã Â¦Å¡Ã Â¦Â¾Ã Â¦Â°, Ã Â¦ÂÃ Â¦ÂªÃ Â¦Â¿Ã Â¦Â Ã Â¦ÂÃ Â¦Â¬Ã Â¦‚ Ã Â¦Â¨Ã Â¦Â¾Ã Â¦—à¦°à¦¿à¦• Ã Â¦Â¤Ã Â¦Â¥Ã Â§ÂÃ Â¦Â¯ Ã Â¦•à§‡à¦¨à§à¦¦à§à¦°' : 'Protocols, APA & Public Resources'}

              </h2>

            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">

              {infoBlocks.map((block, idx) => (

                <div key={idx} className="bg-white border border-slate-200 p-6 rounded shadow-sm hover:shadow-md transition-shadow">

                  <h3 className="text-base font-serif font-bold text-slate-900 mb-4 pb-2 border-b border-slate-150 flex items-center justify-between">

                    <span>{isBangla ? block.titleBn : block.titleEn}</span>

                    <span className="w-2.5 h-2.5 rounded-full bg-crimson"></span>

                  </h3>

                  <ul className="space-y-3">

                    {block.links.map((link: any, lIdx) => (

                      <li key={lIdx} className="flex items-center space-x-1.5 text-xs text-slate-605 text-slate-600 hover:text-crimson transition-colors">

                        <ChevronRight className="w-3.5 h-3.5 text-crimson shrink-0" />

                        {link.key ? (

                          <button

                            onClick={() => onSelectInfo(link.key)}

                            className="hover:underline text-left leading-snug cursor-pointer font-medium"

                          >

                            {isBangla ? link.labelBn : link.labelEn}

                          </button>

                        ) : (

                          <a

                            href="#"

                            onClick={(e) => {

                              e.preventDefault();

                              alert(isBangla ? 'Ã Â¦ÂÃ Â¦‡ Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¶Ã Â¦Â¾Ã Â¦Â¸Ã Â¦Â¨Ã Â¦Â¿Ã Â¦• Ã Â¦Â¨Ã Â¦Â¥Ã Â¦Â¿Ã Â¦Å¸Ã Â¦Â¿ Ã Â¦•à¦²à§‡à¦œ Ã Â¦Â²Ã Â¦Â¾Ã Â¦‡à¦¬à§à¦°à§‡à¦°à¦¿à¦¤à§‡ Ã Â¦Â¬Ã Â¦Â¾ Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â¶Ã Â¦Â¾Ã Â¦Â¸Ã Â¦Â¨Ã Â¦Â¿Ã Â¦• Ã Â¦Â¶Ã Â¦Â¾Ã Â¦–à¦¾à§Ÿ Ã Â¦Â¸Ã Â¦‚à¦°à¦•à§à¦·à¦¿à¦¤ Ã Â¦†à¦›à§‡à¥¤' : 'This official document is archived at the main registrar office.');

                            }}

                            className="hover:underline leading-snug"

                          >

                            {isBangla ? link.labelBn : link.labelEn}

                          </a>

                        )}

                      </li>

                    ))}

                  </ul>

                </div>

              ))}

            </div>

          </div>

        </section>



                {/* 8. Admissions Matrix Advisor */}
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
                    <div className={`mt-6 p-4 rounded border ${eligibleResult.level === 'success' ? 'bg-emerald-50 border-emerald-200' :
                        eligibleResult.level === 'warning' ? 'bg-amber-50 border-amber-200' :
                          'bg-red-50 border-red-200'
                      }`}>
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
        </section>





        {/* 9. Student Activities Photo Gallery */}

        <section className="bg-slate-50 py-10 sm:py-20 border-b border-slate-200">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col md:flex-row md:items-end justify-between border-l-4 border-crimson pl-4 mb-10">

              <div>

                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">

                  {isBangla ? 'ক্যাম্পাস চিত্রশালা ও গ্যালারি' : 'CAMPUS LIFE & STUDENT GALLERY'}

                </span>

                <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-tight">

                  {isBangla ? 'সরকারি বিজ্ঞান কলেজ ক্যাম্পাস গ্যালারি' : 'Government Science College Student Activities'}

                </h2>

              </div>

              <p className="text-xs text-slate-500 max-w-md mt-2 md:mt-0 leading-relaxed">

                {isBangla

                  ? 'শ্রেণীকক্ষের পঠনপাঠন, জাতীয় গৌরব উদযাপন, শহীদ মিনারে শ্রদ্ধা নিবেদন এবং কলেজের তোরণের গৌরবময় চিত্রাবলী।'

                  : 'Highlighting cultural awards, collaborative lectures, regional scout assemblies, and historical landmark views.'}

              </p>

            </div>

            <PhotoGallery isBangla={isBangla} hideHeader />

          </div>

        </section>



        {/* 10. Scraped Video Gallery */}

        <section className="bg-white py-10 sm:py-20 border-b border-slate-200">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-6 sm:mb-12">

              <span className="text-[10px] text-crimson font-mono tracking-widest uppercase font-bold block mb-1">

                {isBangla ? 'Ã Â¦Â­Ã Â¦Â¿Ã Â¦Â¡Ã Â¦Â¿Ã Â¦“ Ã Â¦Å¡Ã Â¦Â¿Ã Â¦Â¤Ã Â§ÂÃ Â¦Â°Ã Â¦Â¶Ã Â¦Â¾Ã Â¦Â²Ã Â¦Â¾' : 'CAMPUS VIDEO GALLERY'}

              </span>

              <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">

                {isBangla ? 'Ã Â¦Â­Ã Â¦Â¿Ã Â¦Â¡Ã Â¦Â¿Ã Â¦“ Ã Â¦—à§à¦¯à¦¾à¦²à¦¾à¦°à¦¿ Ã Â¦“ Ã Â¦Å¸Ã Â¦Â¿Ã Â¦‰à¦Ÿà§‹à¦°à¦¿à§Ÿà¦¾à¦²à¦¸' : 'Video Gallery & Digital Resources'}

              </h2>

            </div>



            <div className="max-w-3xl mx-auto bg-slate-100 border border-slate-200 p-4 rounded-lg shadow">

              <div className="w-full aspect-video rounded overflow-hidden bg-slate-900 relative">

                <iframe

                  src="https://www.youtube.com/embed/sA7ldpeCHJM?si=olfpzME0IjK_YO85"

                  title="GSC Video Feature"

                  frameBorder="0"

                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

                  allowFullScreen

                  className="w-full h-full"

                ></iframe>

              </div>

              <div className="mt-4 flex items-center space-x-3.5">

                <div className="p-2.5 bg-crimson/5 text-crimson rounded border border-crimson/10 shrink-0">

                  <Video className="w-5 h-5 text-crimson" />

                </div>

                <div>

                  <h4 className="text-sm font-serif font-bold text-slate-900">

                    {isBangla ? 'Ã Â¦Â¡Ã Â¦Â¿Ã Â¦ÅÃ Â¦Â¿Ã Â¦Å¸Ã Â¦Â¾Ã Â¦Â² Ã Â¦•à§à¦²à¦¾à¦¸ Ã Â¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ Ã Â¦“ Ã Â¦ÂÃ Â¦•à¦¾à¦¡à§‡à¦®à¦¿à¦• Ã Â¦—à¦¾à¦‡à¦¡' : 'Introduction to Academic Programs & Resources'}

                  </h4>

                  <p className="text-xs text-slate-500 leading-normal mt-0.5">

                    {isBangla ? 'Ã Â¦•à¦²à§‡à¦œà§‡à¦° Ã Â¦Â¤Ã Â¦Â¥Ã Â§ÂÃ Â¦Â¯ Ã Â¦“ Ã Â¦Â¡Ã Â¦Â¿Ã Â¦ÅÃ Â¦Â¿Ã Â¦Å¸Ã Â¦Â¾Ã Â¦Â² Ã Â¦•à§à¦²à¦¾à¦¸à¦°à§à¦® Ã Â¦—à¦¾à¦‡à¦¡à¦²à¦¾à¦‡à¦¨ Ã Â¦Â¸Ã Â¦Â®Ã Â§ÂÃ Â¦ÂªÃ Â¦Â°Ã Â§ÂÃ Â¦•à¦¿à¦¤ Ã Â¦ÂªÃ Â§ÂÃ Â¦Â°Ã Â¦Â§Ã Â¦Â¾Ã Â¦Â¨ Ã Â¦Â­Ã Â¦Â¿Ã Â¦Â¡Ã Â¦Â¿Ã Â¦“à¥¤' : 'Featured institutional outline, standard lab reviews, and resource orientations.'}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* 11. Central E-Services & Govt. Forms Directory */}

        <section className="bg-slate-50 py-10 sm:py-20">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">

            <div>

              <span className="text-[10px] text-crimson font-mono tracking-widest uppercase font-bold block mb-1">

                {isBangla ? 'সরকারি ই-সেবা ও ফর্মস' : 'CENTRAL GOVERNMENT SERVICES & FORMS'}

              </span>

              <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">

                {isBangla ? 'কেন্দ্রীয় ই-সেবা ও গুরুত্বপূর্ণ সরকারি লিংক' : 'Central E-Services and Govt Forms'}

              </h2>

            </div>



            {/* Grid list of services */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-left">

              <div className="bg-white border border-slate-200 p-5 rounded shadow-sm space-y-3 hover:border-crimson/30 transition-all">

                <h4 className="font-serif font-bold text-sm text-slate-900">{isBangla ? 'সরকারি ফর্মস' : 'Government Forms'}</h4>

                <ul className="space-y-2 text-xs text-slate-500">

                  <li><a href="http://www.cga.gov.bd/pdf/forms/blank_challan.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-crimson flex items-center justify-between"><span>T.R Form No. 6 (চ্যালেঞ্জ ফর্ম)</span><ExternalLink className="w-3.5 h-3.5" /></a></li>

                  <li><a href="http://www.dip.gov.bd/sites/default/files/MRP%20Application%20Form-combined1%2028-10-10.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-crimson flex items-center justify-between"><span>MRP Passport Form (পাসপোর্ট ফর্ম)</span><ExternalLink className="w-3.5 h-3.5" /></a></li>

                </ul>

              </div>



              <div className="bg-white border border-slate-200 p-5 rounded shadow-sm space-y-3 hover:border-crimson/30 transition-all">

                <h4 className="font-serif font-bold text-sm text-slate-900">{isBangla ? 'কেন্দ্রীয় ই-সেবা' : 'Central E-Services'}</h4>

                <ul className="space-y-2 text-xs text-slate-500">

                  <li><a href="http://bris.lgd.gov.bd/pub/" target="_blank" rel="noopener noreferrer" className="hover:text-crimson flex items-center justify-between"><span>অনলাইন জন্ম/মৃত্যু নিবন্ধন</span><ExternalLink className="w-3.5 h-3.5" /></a></li>

                  <li><a href="https://www.esheba.cnsbd.com/" target="_blank" rel="noopener noreferrer" className="hover:text-crimson flex items-center justify-between"><span>রেলওয়ে টিকেটিং সিস্টেম</span><ExternalLink className="w-3.5 h-3.5" /></a></li>

                  <li><a href="http://secure.incometax.gov.bd/TINHome" target="_blank" rel="noopener noreferrer" className="hover:text-crimson flex items-center justify-between"><span>আয়কর নিবন্ধন (e-TIN)</span><ExternalLink className="w-3.5 h-3.5" /></a></li>

                </ul>

              </div>



              <div className="bg-white border border-slate-200 p-5 rounded shadow-sm space-y-3 hover:border-crimson/30 transition-all">

                <h4 className="font-serif font-bold text-sm text-slate-900">{isBangla ? 'গুরুত্বপূর্ণ লিংক' : 'Important Links'}</h4>

                <ul className="space-y-2 text-xs text-slate-500">

                  <li><a href="http://www.bangladesh.gov.bd" target="_blank" rel="noopener noreferrer" className="hover:text-crimson flex items-center justify-between"><span>জাতীয় তথ্য বাতায়ন</span><ExternalLink className="w-3.5 h-3.5" /></a></li>

                  <li><a href="http://www.lgd.gov.bd/" target="_blank" rel="noopener noreferrer" className="hover:text-crimson flex items-center justify-between"><span>স্থানীয় সরকার বিভাগ</span><ExternalLink className="w-3.5 h-3.5" /></a></li>

                  <li><a href="http://www.mopa.gov.bd/" target="_blank" rel="noopener noreferrer" className="hover:text-crimson flex items-center justify-between"><span>জনপ্রশাসন মন্ত্রণালয়</span><ExternalLink className="w-3.5 h-3.5" /></a></li>

                </ul>

              </div>



              <div className="bg-white border border-slate-200 p-5 rounded shadow-sm space-y-3 hover:border-crimson/30 transition-all">

                <h4 className="font-serif font-bold text-sm text-slate-900">{isBangla ? 'জরুরি হটলাইন' : 'Emergency Hotlines'}</h4>

                <ul className="space-y-2 text-xs text-slate-500">

                  <li className="flex justify-between"><span>৯৯৯ - জাতীয় জরুরি সেবা</span><span className="font-bold text-crimson">Call Free</span></li>

                  <li className="flex justify-between"><span>৩৩৩ - জাতীয় তথ্য বাতায়ন</span><span className="font-bold text-crimson">Call 333</span></li>

                  <li className="flex justify-between"><span>১০৯ - নারী নির্যাতন সেল</span><span className="font-bold text-crimson">Call 109</span></li>

                </ul>

              </div>

            </div>

          </div>

        </section>



        {/* 12. Map Section */}

        <section className="bg-white border-t border-slate-200 py-10 sm:py-16">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

            <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-tight mb-2">

              {isBangla ? 'ক্যাম্পাস যোগাযোগ অবস্থান' : 'Campus Location Map'}

            </h2>

            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">

              {isBangla

                ? 'আমাদের ক্যাম্পাস তেজগাঁও শিল্পাঞ্চল ঢাকা-১২১৫ এ অবস্থিত। যেকোনো কাজের দিন সরাসরি অফিস চলাকালীন কলেজ পরিদর্শনে আমন্ত্রিত।'

                : 'Conveniently located in Tejgaon, Dhaka, with robust connection transit routes across the capital.'}

            </p>



            <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 p-4 rounded shadow-sm flex flex-col md:flex-row items-center gap-6">

              <div className="w-12 h-12 rounded bg-crimson/5 text-crimson flex items-center justify-center shrink-0 border border-crimson/20">

                <MapPin className="w-5 h-5 animate-bounce" />

              </div>



              <div className="text-left space-y-1 flex-1">

                <h4 className="text-xs font-serif font-bold text-slate-900 uppercase tracking-widest">

                  {isBangla ? 'সরকারি বিজ্ঞান কলেজ ক্যাম্পাস' : 'GSC Tejgaon Campus'}

                </h4>

                <p className="text-xs text-slate-655 text-slate-600 leading-snug">

                  {isBangla

                    ? 'তেজগাঁও শিল্প এলাকা, বীরউত্তম শফিউল্লাহ সড়ক, ঢাকা-১২১৫।'

                    : 'Tejgaon Industrial Area, Bir Uttam Shafiullah Road, Dhaka-1215, Bangladesh.'}

                </p>

                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest font-semibold pt-0.5">

                  🕒 {isBangla ? 'অফিস সময়: রবিবার - বৃহস্পতিবার (সকাল ৮:০০ - দুপুর ২:০০)' : 'Operation Hours: Sun - Thu (08:00 AM - 02:00 PM)'}

                </p>

              </div>



              <a

                href="https://maps.app.goo.gl/DqHHEuYsXtwX5d8f6"

                target="_blank"

                rel="noopener noreferrer"

                className="w-full md:w-auto shrink-0 bg-white hover:bg-slate-50 p-2.5 rounded border border-slate-200 text-xs font-mono font-bold tracking-wider uppercase text-slate-700 transition-all text-center cursor-pointer shadow-sm"

              >

                🗺️ {isBangla ? 'গুগল ম্যাপ' : 'Coordinate Map'}

              </a>

            </div>

          </div>

        </section>



      </div> {/* End scrollable content overlay */}



    </div>

  );

};