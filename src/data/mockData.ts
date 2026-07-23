import { Department, Course, Assignment, NotificationItem } from '../types/academic';

export const DEPARTMENTS: Department[] = [
  {
    id: 'phy',
    name: 'Physics Department',
    code: 'PHY',
    description: 'Study of matter, energy, mechanics, electromagnetism, modern physics, optics, and thermodynamics. Providing foundational knowledge for engineering and scientific careers with advanced laboratory experiments.',
    shortDesc: 'Mechanics, wave optics, electricity, and thermodynamics.',
    duration: '2 Years (HSC) / 3 Years (B.Sc)',
    semesters: 4,
    labsCount: 2,
    seatCount: 150,
    technologies: ['Mechanics Lab', 'Optics Experiments', 'Electromagnetism Kit', 'Thermodynamics Lab'],
    headOfDept: 'Prof. Dr. Md. Aminul Islam, M.Sc. in Physics, Ph.D.'
  },
  {
    id: 'che',
    name: 'Chemistry Department',
    code: 'CHE',
    description: 'Explores organic synthesis, inorganic chemical properties, physical chemical equilibria, qualitative organic analysis, and laboratory safety. Essential for medical, engineering, and chemical science aspirants.',
    shortDesc: 'Organic chemistry, inorganic analysis, and physical equilibria.',
    duration: '2 Years (HSC) / 3 Years (B.Sc)',
    semesters: 4,
    labsCount: 2,
    seatCount: 150,
    technologies: ['Organic Synthesis Lab', 'Quantitative Analysis', 'Qualitative Chemical Tests', 'Safe Lab Standards'],
    headOfDept: 'Prof. Md. Jahirul Alam, Professor & Head of Department'
  },
  {
    id: 'math',
    name: 'Mathematics Department',
    code: 'MATH',
    description: 'Focuses on calculus, differential equations, linear algebra, coordinate geometry, trigonometry, and vector analysis. Trains students in analytical reasoning, critical logic, and mathematical proofs.',
    shortDesc: 'Calculus, algebra, geometry, and differential analysis.',
    duration: '2 Years (HSC) / 3 Years (B.Sc)',
    semesters: 4,
    labsCount: 1,
    seatCount: 200,
    technologies: ['Analytical geometry', 'Calculus blueprints', 'Mathematical Logic modules'],
    headOfDept: 'Prof. Hosne Ara Begum, M.Sc. in Applied Mathematics'
  },
  {
    id: 'ict',
    name: 'ICT Department',
    code: 'ICT',
    description: 'Covers fundamentals of programming, web technologies, database management systems, communication systems, and cyber security. Prepares students for the digital frontier and software engineering fields.',
    shortDesc: 'HTML, SQL, C Programming, and networking structures.',
    duration: '2 Years (HSC)',
    semesters: 2,
    labsCount: 2,
    seatCount: 120,
    technologies: ['C Programming', 'Web Design (HTML/CSS)', 'SQL Databases', 'Computer Networks'],
    headOfDept: 'Mrs. Rokeya Sultana, M.Sc. in Computer Science'
  },
  {
    id: 'bot',
    name: 'Botany Department',
    code: 'BOT',
    description: 'Study of plant taxonomy, plant physiology, plant genetics, anatomy, biodiversity, and environmental ecology. Offering rich hands-on field studies and microscopical laboratory research.',
    shortDesc: 'Plant physiology, cytology, plant genetics, and ecology.',
    duration: '2 Years (HSC) / 3 Years (B.Sc)',
    semesters: 4,
    labsCount: 1,
    seatCount: 100,
    technologies: ['Cytology Microscope Lab', 'Plant Anatomy kits', 'Taxonomy identification'],
    headOfDept: 'Prof. Selina Akhter, Professor of Botany'
  },
  {
    id: 'zoo',
    name: 'Zoology Department',
    code: 'ZOO',
    description: 'Covers animal physiology, evolution, comparative anatomy, genetics, and ecology. Provides essential concepts for medical entrance preparations and biotechnology fields.',
    shortDesc: 'Animal physiology, genetics, dissection analysis, and evolution.',
    duration: '2 Years (HSC) / 3 Years (B.Sc)',
    semesters: 4,
    labsCount: 1,
    seatCount: 100,
    technologies: ['Anatomy dissection kits', 'Genetics pedigree maps', 'Animal physiology testing'],
    headOfDept: 'Prof. Dr. Tahmina Chowdhury, Ph.D. in Zoology'
  },
  {
    id: 'ban',
    name: 'Bangla Department',
    code: 'BAN',
    description: 'Study of Bengali literature, grammar, history of Bengali language, and cultural expressions. Fostering mother tongue excellence and creative writing skills.',
    shortDesc: 'Bengali prose, poetry, grammar, and history of language.',
    duration: '2 Years (HSC) / 3 Years (B.Sc)',
    semesters: 4,
    labsCount: 0,
    seatCount: 300,
    technologies: ['Language Lab', 'Bangla Sahitya Samsad', 'Debating Society'],
    headOfDept: 'Prof. Syed Moinul Hasan, Professor & HOD'
  },
  {
    id: 'eng',
    name: 'English Department',
    code: 'ENG',
    description: 'Focuses on English language proficiency, communicative grammar, writing mechanics, and classics of English literature. Enhances international communication standard competencies.',
    shortDesc: 'English grammar, reading comprehension, literature, and speech.',
    duration: '2 Years (HSC) / 3 Years (B.Sc)',
    semesters: 4,
    labsCount: 1,
    seatCount: 300,
    technologies: ['Language Lab & Audio Kits', 'English Debating Club', 'Creative Writing Modules'],
    headOfDept: 'Prof. Salma Begum, Principal & HOD English'
  }
];

export const COURSES: Course[] = [
  {
    id: 'phy-101',
    title: 'Physics Paper I & II',
    code: 'PHY-101',
    semester: 1,
    credit: 4,
    materials: [
      { id: 'mat-1', title: 'Vector & Newtonian Mechanics Lecture Note', type: 'pdf', courseCode: 'PHY-101', fileSize: '3.8 MB', downloadUrl: '#' },
      { id: 'mat-2', title: 'Optics and Wave Mechanics Lab Instructions', type: 'syllabus', courseCode: 'PHY-101', fileSize: '1.2 MB', downloadUrl: '#' },
      { id: 'mat-v1', title: 'Video: Understanding Hookes Law & Elasticity', type: 'video', courseCode: 'PHY-101', fileSize: '30 mins', downloadUrl: '#' }
    ],
    exams: [
      { id: 'ex-1', courseCode: 'PHY-101', courseTitle: 'Physics Paper I', type: 'Midterm', dateTime: '2026-06-22T10:00:00', room: 'Physics Lab 1', instructions: 'Bring scientific calculators, geometry boxes, and lab manuals.' },
      { id: 'ex-2', courseCode: 'PHY-101', courseTitle: 'Physics Paper II', type: 'Final', dateTime: '2026-07-15T09:30:00', room: 'Main Examination Hall A', instructions: 'Only authorized calculators allowed. No mobile devices.' }
    ]
  },
  {
    id: 'che-101',
    title: 'Chemistry Paper I & II',
    code: 'CHE-101',
    semester: 1,
    credit: 4,
    materials: [
      { id: 'mat-4', title: 'Organic Chemistry Reactions Complete Sheet', type: 'sheet', courseCode: 'CHE-101', fileSize: '2.5 MB', downloadUrl: '#' },
      { id: 'mat-5', title: 'Periodic Table Trends & Qualitative Analysis Guide', type: 'pdf', courseCode: 'CHE-101', fileSize: '4.1 MB', downloadUrl: '#' }
    ],
    exams: [
      { id: 'ex-3', courseCode: 'CHE-101', courseTitle: 'Chemistry Paper I', type: 'Lab Assessment', dateTime: '2026-06-25T14:00:00', room: 'Chemistry Qualitative Lab', instructions: 'Aprons are mandatory. Perform salt analysis within 2 hours.' }
    ]
  },
  {
    id: 'math-101',
    title: 'Higher Mathematics Paper I & II',
    code: 'MATH-101',
    semester: 1,
    credit: 4,
    materials: [
      { id: 'mat-7', title: 'Calculus: Integration & Differentiation formulae', type: 'pdf', courseCode: 'MATH-101', fileSize: '1.8 MB', downloadUrl: '#' },
      { id: 'mat-8', title: 'Coordinate Geometry Formulas & Trigonometric Sets', type: 'sheet', courseCode: 'MATH-101', fileSize: '2.0 MB', downloadUrl: '#' }
    ],
    exams: [
      { id: 'ex-4', courseCode: 'MATH-101', courseTitle: 'Higher Mathematics', type: 'Quiz', dateTime: '2026-06-20T11:00:00', room: 'Room 303', instructions: 'Covers limits, derivative properties and vectors.' }
    ]
  },
  {
    id: 'ict-101',
    title: 'Information & Communication Tech (ICT)',
    code: 'ICT-101',
    semester: 1,
    credit: 3,
    materials: [
      { id: 'mat-9', title: 'HTML & Web Design Basics Reference Guide', type: 'pdf', courseCode: 'ICT-101', fileSize: '5.2 MB', downloadUrl: '#' },
      { id: 'mat-10', title: 'C Programming Syntax & Loop Structure Sheet', type: 'sheet', courseCode: 'ICT-101', fileSize: '1.5 MB', downloadUrl: '#' }
    ],
    exams: [
      { id: 'ex-5', courseCode: 'ICT-101', courseTitle: 'ICT Practical', type: 'Lab Assessment', dateTime: '2026-06-23T11:30:00', room: 'ICT Lab 2', instructions: 'Construct a structured C-program demonstrating recursive loops.' }
    ]
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asn-1',
    title: 'Physics Lab: Determining g using Simple Pendulum',
    description: 'Prepare the complete lab experiment report listing data table, graph, and calculations for g.',
    courseCode: 'PHY-101',
    dueDate: '2026-06-18',
    completed: false,
    priority: 'high'
  },
  {
    id: 'asn-2',
    title: 'Chemistry assignment: Balance Redox equations',
    description: 'Solve the 15 chemical equations in Section 3 using ion-electron method.',
    courseCode: 'CHE-101',
    dueDate: '2026-06-20',
    completed: false,
    priority: 'medium'
  },
  {
    id: 'asn-3',
    title: 'Math: Solve Trigonometric Limits',
    description: 'Attempt questions 1 to 20 from Chapter 9 (Calculus limits section).',
    courseCode: 'MATH-101',
    dueDate: '2026-06-24',
    completed: true,
    priority: 'low'
  },
  {
    id: 'asn-4',
    title: 'ICT: Develop a clean HTML Page layout',
    description: 'Build a standard layout with table and header tags simulating an academic portal menu.',
    courseCode: 'ICT-101',
    dueDate: '2026-06-16',
    completed: true,
    priority: 'medium'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'nt-1',
    title: 'স্নাতক (পাস) ও সমমান উপবৃত্তির অনলাইন আবেদনের সময় বৃদ্ধিকরণ নোটিশ',
    message: 'স্নাতক (পাস) ও সমমান পর্যায়ে (ডিগ্রী ও ফাজিল ১ম বর্ষ) ২০২৩-২৪ শিক্ষাবর্ষে অধ্যয়নরত আর্থিকভাবে অসচ্চল পরিবারের মেধাবী শিক্ষার্থীদের চলমান উপবৃত্তির অনলাইন আবেদনের সময় বর্ধিত করা হলো। শিক্ষার্থীরা আগামী ২৬ জুন ২০২৬ তারিখের মধ্যে আবেদন সম্পন্ন করতে পারবেন।',
    date: '2026-06-17T09:00:00Z',
    category: 'admission',
    priority: 'high',
    read: false,
    memoNo: 'GSC/Degree/Sub-2026/102',
    issuedBy: 'Prof. Salma Begum, Principal',
    detailsBn: 'এতদ্বারা কলেজের স্নাতক (পাস) কোর্সের ডিগ্রি ১ম বর্ষের নিয়মিত সকল শিক্ষার্থীদের জানানো যাচ্ছে যে, ২০২৩-২০২৪ শিক্ষাবর্ষের প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্টের অধীনে উপবৃত্তি কার্যক্রমের অনলাইন আবেদনের সময়সীমা আগামী ২৬ জুন ২০২৬ পর্যন্ত বৃদ্ধি করা হয়েছে। নির্ধারিত সময়ের মধ্যে প্রয়োজনীয় সকল নথিপত্রসহ শিক্ষা বোর্ডের পোর্টালে আবেদন নিশ্চিত করতে হবে। বিস্তারিত নির্দেশিকা নোটিশ বোর্ডের সংযুক্ত ফাইলে পাওয়া যাবে।',
    detailsEn: 'This is to inform all degree pass course 1st year regular students that the online application deadline for the Prime Minister\'s Education Assistance Trust stipend project has been extended until June 26, 2026. Students are advised to complete their applications with all supporting documents through the integrated board portal.'
  },
  {
    id: 'nt-2',
    title: 'প্রফেসর মোঃ জহিরুল আলম, রসায়ন বিভাগ এর বহিঃবাংলাদেশ ছুটি ও এনওসি (NOC)',
    message: 'রসায়ন বিভাগের বিভাগীয় প্রধান, প্রফেসর মোঃ জহিরুল আলম এর বহিঃবাংলাদেশ অর্জিত ছুটি ও অনাপত্তি সনদ (NOC) শিক্ষা মন্ত্রণালয়ের অনুমোদনক্রমে জারি করা হয়েছে। ছুটি সংক্রান্ত সরকারি আদেশ নোটিশ বোর্ডে সংযুক্ত করা হয়েছে।',
    date: '2026-06-16T11:30:00Z',
    category: 'academic',
    priority: 'medium',
    read: false,
    memoNo: 'GSC/Admin/NOC-2026/455',
    issuedBy: 'Prof. Salma Begum, Principal',
    detailsBn: 'রসায়ন বিভাগের বিভাগীয় প্রধান, প্রফেসর মোঃ জহিরুল আলম এর ব্যক্তিগত ভ্রমণের উদ্দেশ্যে ১৫ দিনের বহিঃবাংলাদেশ অর্জিত ছুটি ও সংশ্লিষ্ট অনাপত্তি পত্র (NOC) শিক্ষা মন্ত্রণালয়ের মাধ্যমিক ও উচ্চ শিক্ষা বিভাগ কর্তৃক অনুমোদিত হয়েছে। ছুটি চলাকালীন সময়ে রসায়ন বিভাগের বিভাগীয় প্রধানের দায়িত্ব পালন করবেন সহকারী অধ্যাপক জনাব ত্রিনাথ সিংহ।',
    detailsEn: 'The Ministry of Education, secondary and higher education division has approved the Ex-Bangladesh leave and NOC of 15 days for Prof. Md. Jahirul Alam, Head of Chemistry Department. During his absence, Assistant Professor Trinath Singh will perform the duties of the HOD.'
  },
  {
    id: 'nt-3',
    title: 'একাদশ শ্রেণির (শিক্ষাবর্ষ: ২০২৫-২০২৬) বার্ষিক পরীক্ষার সময়সূচি প্রকাশ',
    message: 'একাদশ শ্রেণির শিক্ষার্থীদের শিক্ষাবর্ষ ২০২৫-২০২৬ এর চূড়ান্ত বার্ষিক পরীক্ষার সময়সূচি প্রকাশ করা হয়েছে। পরীক্ষা আগামী ২২ জুন ২০২৬ তারিখ সকাল ১০:০০ টা থেকে শুরু হবে। শিক্ষার্থীরা নিজ নিজ বিভাগীয় অফিস থেকে প্রবেশপত্র সংগ্রহ করতে নির্দেশ দেওয়া হলো।',
    date: '2026-06-15T08:00:00Z',
    category: 'exam',
    priority: 'high',
    read: true,
    memoNo: 'GSC/Exam/HSC-2026/89',
    issuedBy: 'Prof. Salma Begum, Principal',
    detailsBn: 'একাদশ শ্রেণির শিক্ষাবর্ষ ২০২৫-২০২৬ এর নিয়মিত ও অনিয়মিত শিক্ষার্থীদের বার্ষিক পরীক্ষার বিস্তারিত সময়সূচি প্রকাশ করা হলো। পরীক্ষা আগামী ২২ জুন ২০২৬ তারিখ সকাল ১০:০০ টা থেকে কলেজ কেন্দ্রে একযোগে অনুষ্ঠিত হবে। পরীক্ষার সময় ৩ ঘণ্টা। সকল পরীক্ষার্থীকে বোর্ড রেজিস্ট্রেশন কার্ড ও প্রবেশপত্র সাথে আনার নির্দেশ দেওয়া হলো। কোনোভাবেই কেন্দ্রে মোবাইল ফোন আনা যাবে না।',
    detailsEn: 'The detailed schedule for the Class XI Annual Examination 2026 (Academic Session 2025-26) has been published. Exams will commence on June 22, 2026, from 10:00 AM at the GSC test center. Candidates must bring their registration cards and admit sheets. Mobile phones are strictly prohibited.'
  },
  {
    id: 'nt-4',
    title: '২০২৪ সালের বি.এসসি (পাস) ৩য় বর্ষের পরীক্ষার ফরম পূরণ বিজ্ঞপ্তি',
    message: '২০২৪ সালের বি.এসসি (পাস) (শিক্ষাবর্ষ: ২০২১-২০২২) কোর্সে ৩য় বর্ষের নিয়মিত/অনিয়মিত শিক্ষার্থীদের বোর্ড পরীক্ষার ফরম পূরণ সংক্রান্ত বিজ্ঞপ্তি প্রকাশ করা হয়েছে। আগামী ২৩ জুন ২০২৬ তারিখের মধ্যে প্রয়োজনীয় ফি সহ ফরম জমা দিতে হবে।',
    date: '2026-06-14T14:15:00Z',
    category: 'academic',
    priority: 'medium',
    read: true,
    memoNo: 'GSC/Form-Fill/BSc-2026/22',
    issuedBy: 'Prof. Salma Begum, Principal',
    detailsBn: 'জাতীয় বিশ্ববিদ্যালয়ের অধীনে ২০২৪ সালের বি.এসসি (পাস) কোর্স (শিক্ষাবর্ষ: ২০২১-২০২২) ৩য় বর্ষের শিক্ষার্থীদের চূড়ান্ত পরীক্ষার ফরম পূরণ সংক্রান্ত বিশেষ নির্দেশাবলী। শিক্ষার্থীদেরকে আগামী ২৩ জুন ২০২৬ তারিখের মধ্যে সোনালী সেবার মাধ্যমে পরীক্ষার ফি প্রদানপূর্বক পূরণকৃত ফর্ম কলেজ অফিসে জমা দিতে হবে। বিস্তারিত ফি বিবরণী নোটিশের সংযুক্ত তফসিলে উল্লেখ করা হলো।',
    detailsEn: 'Special instructions for the form fill-up of B.Sc (Pass Course) 3rd year final examination 2024 (Session 2021-2022) under National University. Students must submit their filled forms and online pay slips at the main office by June 23, 2026.'
  },
  {
    id: 'nt-5',
    title: 'রসায়ন বিভাগের সহকারী অধ্যাপক জনাব ত্রিনাথ সিংহ এর এনওসি (NOC) অনুমোদন',
    message: 'রসায়ন বিভাগের সহকারী অধ্যাপক, জনাব ত্রিনাথ সিংহ এর ব্যক্তিগত প্রয়োজনে বহিঃবাংলাদেশ ভ্রমণের অনুকূলে অনাপত্তি পত্র (NOC) কলেজ প্রশাসন কর্তৃক অনুমোদিত ও সংযুক্ত করা হলো।',
    date: '2026-06-12T10:00:00Z',
    category: 'academic',
    priority: 'low',
    read: true,
    memoNo: 'GSC/NOC/Staff-2026/78',
    issuedBy: 'Prof. Salma Begum, Principal',
    detailsBn: 'রসায়ন বিভাগের সহকারী অধ্যাপক জনাব ত্রিনাথ সিংহ এর ব্যক্তিগত কারণে ভারতে ভ্রমণের আবেদন পর্যালোচনাক্রমে এবং কলেজ গভর্নিং বডি ও শিক্ষা মন্ত্রণালয়ের বিদ্যমান নীতিমালা অনুসরণপূর্বক ১৫ দিনের অর্জিত বহিঃবাংলাদেশ ছুটি ও অনাপত্তি সনদ (NOC) প্রদান করা হলো।',
    detailsEn: 'Assistant Professor Trinath Singh of Chemistry Department has been granted Ex-Bangladesh leave of 15 days to visit India. The NOC has been approved and issued by the competent authority in accordance with standard rules.'
  },
  {
    id: 'nt-6',
    title: 'প্রফেসর সৈয়দ মইনল হাসান, বাংলা বিভাগ, NOC',
    message: 'বাংলা বিভাগের অধ্যাপক সৈয়দ মইনল হাসান এর চিকিৎসা কাজের জন্য চিকিৎসার উদ্দেশ্যে পাসপোর্ট নবায়ন ও বহিঃবাংলাদেশ ভ্রমণের জন্য বিভাগীয় এনওসি (NOC) প্রদান করা হলো।',
    date: '2026-06-10T09:00:00Z',
    category: 'academic',
    priority: 'low',
    read: true,
    memoNo: 'GSC/NOC/Staff-2026/66',
    issuedBy: 'Prof. Salma Begum, Principal',
    detailsBn: 'বাংলা বিভাগের অধ্যাপক সৈয়দ মইনুল হাসান এর উন্নত চিকিৎসার উদ্দেশ্যে পাসপোর্ট নবায়ন এবং বহিঃবাংলাদেশ ভ্রমণের প্রয়োজনীয় ছাড়পত্র ও অনাপত্তি সনদ (NOC) প্রদান করা হলো। ছুটির সময়সীমা ও বিস্তারিত নির্দেশাবলী সরকারি গেজেট মোতাবেক নির্ধারিত হবে।',
    detailsEn: 'Professor Syed Moinul Hasan of Bangla Department has been granted HOD endorsement and NOC for passport renewal and Ex-Bangladesh travel for advanced medical check-up. The administrative terms are outlined in the official document.'
  }
];

export const GENERAL_STATS = {
  totalStudents: 3250,
  departmentsCount: 8,
  labCount: 12,
  facultyCount: 64,
  jobPlacementRatio: '95.6%', // HSC Pass rate
  establishedYear: 1954,
  campusSize: '9 Acres'
};

export const PAST_PRINCIPALS = [
  { nameBn: 'প্রফেসর সালমা বেগম', nameEn: 'Prof. Salma Begum', period: '2025 - Present' },
  { nameBn: 'প্রফেসর ড. মোঃ আমিনুল আকবর', nameEn: 'Prof. Dr. Md. Aminul Akbar', period: '2021 - 2025' },
  { nameBn: 'প্রফেসর মোঃ কাফিল উদ্দিন', nameEn: 'Prof. Md. Kafil Uddin', period: '2018 - 2021' },
  { nameBn: 'প্রফেসর সুরাইয়া বেগম', nameEn: 'Prof. Suraiya Begum', period: '2015 - 2018' },
  { nameBn: 'প্রফেসর মোঃ আবদুর রউফ', nameEn: 'Prof. Md. Abdur Rauf', period: '2011 - 2015' },
  { nameBn: 'প্রফেসর ড. শেখ মোঃ আনসার আলী', nameEn: 'Prof. Dr. Shekh Md. Ansar Ali', period: '2007 - 2011' },
  { nameBn: 'প্রফেসর মোঃ ইসমাইল হোসেন', nameEn: 'Prof. Md. Ismail Hossain', period: '2003 - 2007' }
];

export interface Teacher {
  id: string;
  nameEn: string;
  nameBn: string;
  designationEn: string;
  designationBn: string;
  department: string;
  email: string;
  phone?: string;
}

// Named teachers (15 main)
const basicTeachers: Teacher[] = [
  { id: 't1', nameEn: 'Prof. Salma Begum', nameBn: 'প্রফেসর সালমা বেগম', designationEn: 'Principal', designationBn: 'অধ্যক্ষ', department: 'English', email: 'principal@gsctd.edu.bd' },
  { id: 't2', nameEn: 'Prof. Dr. Md. Aminul Islam', nameBn: 'প্রফেসর ড. মোঃ আমিনুল ইসলাম', designationEn: 'Professor & Head', designationBn: 'অধ্যাপক ও বিভাগীয় প্রধান', department: 'Physics Department', email: 'aminul.phy@gsctd.edu.bd' },
  { id: 't3', nameEn: 'Prof. Md. Jahirul Alam', nameBn: 'প্রফেসর মোঃ জহিরুল আলম', designationEn: 'Professor & Head', designationBn: 'অধ্যাপক ও বিভাগীয় প্রধান', department: 'Chemistry Department', email: 'jahirul.che@gsctd.edu.bd' },
  { id: 't4', nameEn: 'Prof. Hosne Ara Begum', nameBn: 'প্রফেসর হোসনে আরা বেগম', designationEn: 'Professor & Head', designationBn: 'অধ্যাপক ও বিভাগীয় প্রধান', department: 'Mathematics Department', email: 'hosneara.math@gsctd.edu.bd' },
  { id: 't5', nameEn: 'Mrs. Rokeya Sultana', nameBn: 'মিসেস রোকেয়া সুলতানা', designationEn: 'Associate Professor & Head', designationBn: 'সহযোগী অধ্যাপক ও বিভাগীয় প্রধান', department: 'ICT Department', email: 'rokeya.ict@gsctd.edu.bd' },
  { id: 't6', nameEn: 'Prof. Selina Akhter', nameBn: 'প্রফেসর সেলিনা আক্তার', designationEn: 'Professor & Head', designationBn: 'অধ্যাপক ও বিভাগীয় প্রধান', department: 'Botany Department', email: 'selina.bot@gsctd.edu.bd' },
  { id: 't7', nameEn: 'Prof. Dr. Tahmina Chowdhury', nameBn: 'প্রফেসর ড. তাহমিনা চৌধুরী', designationEn: 'Professor & Head', designationBn: 'অধ্যাপক ও বিভাগীয় প্রধান', department: 'Zoology Department', email: 'tahmina.zoo@gsctd.edu.bd' },
  { id: 't8', nameEn: 'Prof. Syed Moinul Hasan', nameBn: 'প্রফেসর সৈয়দ মইনুল হাসান', designationEn: 'Professor & Head', designationBn: 'অধ্যাপক ও বিভাগীয় প্রধান', department: 'Bangla', email: 'moinul.ban@gsctd.edu.bd' },
  { id: 't9', nameEn: 'Trinath Singh', nameBn: 'জনাব ত্রিনাথ সিংহ', designationEn: 'Assistant Professor', designationBn: 'সহকারী অধ্যাপক', department: 'Chemistry Department', email: 'trinath.che@gsctd.edu.bd' },
  { id: 't10', nameEn: 'Probhash Kumar Roy', nameBn: 'প্রভাশ কুমার রায়', designationEn: 'Associate Professor & HOD Support', designationBn: 'সহযোগী অধ্যাপক', department: 'Physics Department', email: 'probhash.phy@gsctd.edu.bd' },
  { id: 't11', nameEn: 'Dr. Rafiqul Islam', nameBn: 'ড. রফিকুল ইসলাম', designationEn: 'Assistant Professor', designationBn: 'সহকারী অধ্যাপক', department: 'Physics Department', email: 'rafiq.phy@gsctd.edu.bd' },
  { id: 't12', nameEn: 'Ferdousi Begum', nameBn: 'ফেরদৌসী বেগম', designationEn: 'Lecturer', designationBn: 'প্রভাষক', department: 'Chemistry Department', email: 'ferdousi.che@gsctd.edu.bd' },
  { id: 't13', nameEn: 'Md. Kamrul Hasan', nameBn: 'মোঃ কামরুল হাসান', designationEn: 'Lecturer', designationBn: 'প্রভাষক', department: 'Mathematics Department', email: 'kamrul.math@gsctd.edu.bd' },
  { id: 't14', nameEn: 'Nasrin Sultana', nameBn: 'নাসরিন সুলতানা', designationEn: 'Lecturer', designationBn: 'প্রভাষক', department: 'English', email: 'nasrin.eng@gsctd.edu.bd' },
  { id: 't15', nameEn: 'Md. Zillur Rahman', nameBn: 'মোঃ জিলুর রহমান', designationEn: 'Lecturer', designationBn: 'প্রভাষক', department: 'ICT Department', email: 'zillur.ict@gsctd.edu.bd' }
];

// Generate 49 more realistic teachers dynamically to make the count exactly 64
const firstNames = ['Mohammad', 'Abdul', 'Rahman', 'Siddique', 'Hossain', 'Ahmed', 'Islam', 'Kabir', 'Alam', 'Nahar', 'Begum', 'Sultana', 'Yasmin', 'Akhter', 'Chowdhury', 'Faruque', 'Bhuiyan', 'Karim'];
const lastNames = ['Ali', 'Hasan', 'Uddin', 'Khan', 'Miah', 'Talukder', 'Patwary', 'Dewan', 'Sarker', 'Mollah', 'Jahan', 'Khatun', 'Roy', 'Sen', 'Dutta', 'Das'];
const depts = ['Physics Department', 'Chemistry Department', 'Mathematics Department', 'ICT Department', 'Botany Department', 'Zoology Department', 'Bangla', 'English'];
const designations = [
  { en: 'Assistant Professor', bn: 'সহকারী অধ্যাপক' },
  { en: 'Lecturer', bn: 'প্রভাষক' },
  { en: 'Senior Lecturer', bn: 'জ্যেষ্ঠ প্রভাষক' }
];

const generatedTeachers: Teacher[] = [];
for (let i = 16; i <= 64; i++) {
  const fName = firstNames[i % firstNames.length];
  const lName = lastNames[i % lastNames.length];
  const dept = depts[i % depts.length];
  const des = designations[i % designations.length];
  const nameEn = `${fName} ${lName}`;
  const nameBn = `${fName === 'Mohammad' ? 'মোহাম্মদ' : fName === 'Abdul' ? 'আব্দুল' : fName === 'Rahman' ? 'রহমান' : 'মো.'} ${lName === 'Hasan' ? 'হাসান' : lName === 'Uddin' ? 'উদ্দীন' : lName === 'Khan' ? 'খান' : 'মিঞা'}`;
  const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@gsctd.edu.bd`;

  generatedTeachers.push({
    id: `t${i}`,
    nameEn,
    nameBn,
    designationEn: des.en,
    designationBn: des.bn,
    department: dept,
    email
  });
}

export const TEACHERS: Teacher[] = [...basicTeachers, ...generatedTeachers];

// Academic Results database
export interface StudentResult {
  roll: string;
  reg: string;
  name: string;
  examType: string;
  session: string;
  gpa: number;
  grade: string;
  subjects: {
    name: string;
    code: string;
    marks: number;
    gp: number;
    letterGrade: string;
  }[];
}

export const RESULTS_DB: StudentResult[] = [
  {
    roll: '20501',
    reg: '987654',
    name: 'Salman Rahman',
    examType: 'Class XI Annual Exam',
    session: '2025-2026',
    gpa: 5.00,
    grade: 'A+',
    subjects: [
      { name: 'Physics', code: '174', marks: 88, gp: 5.00, letterGrade: 'A+' },
      { name: 'Chemistry', code: '176', marks: 92, gp: 5.00, letterGrade: 'A+' },
      { name: 'Higher Mathematics', code: '265', marks: 95, gp: 5.00, letterGrade: 'A+' },
      { name: 'ICT', code: '275', marks: 85, gp: 5.00, letterGrade: 'A+' },
      { name: 'Bangla', code: '101', marks: 82, gp: 5.00, letterGrade: 'A+' },
      { name: 'English', code: '107', marks: 80, gp: 5.00, letterGrade: 'A+' }
    ]
  },
  {
    roll: '20502',
    reg: '987653',
    name: 'Fahim Hossain',
    examType: 'Class XI Annual Exam',
    session: '2025-2026',
    gpa: 4.83,
    grade: 'A',
    subjects: [
      { name: 'Physics', code: '174', marks: 85, gp: 5.00, letterGrade: 'A+' },
      { name: 'Chemistry', code: '176', marks: 83, gp: 5.00, letterGrade: 'A+' },
      { name: 'Higher Mathematics', code: '265', marks: 74, gp: 4.00, letterGrade: 'A' },
      { name: 'ICT', code: '275', marks: 88, gp: 5.00, letterGrade: 'A+' },
      { name: 'Bangla', code: '101', marks: 81, gp: 5.00, letterGrade: 'A+' },
      { name: 'English', code: '107', marks: 78, gp: 4.00, letterGrade: 'A' }
    ]
  },
  {
    roll: '20503',
    reg: '987652',
    name: 'Tasnim Ara',
    examType: 'Class XI Annual Exam',
    session: '2025-2026',
    gpa: 4.50,
    grade: 'A',
    subjects: [
      { name: 'Physics', code: '174', marks: 78, gp: 4.00, letterGrade: 'A' },
      { name: 'Chemistry', code: '176', marks: 81, gp: 5.00, letterGrade: 'A+' },
      { name: 'Higher Mathematics', code: '265', marks: 68, gp: 3.50, letterGrade: 'A-' },
      { name: 'ICT', code: '275', marks: 82, gp: 5.00, letterGrade: 'A+' },
      { name: 'Bangla', code: '101', marks: 75, gp: 4.00, letterGrade: 'A' },
      { name: 'English', code: '107', marks: 79, gp: 4.00, letterGrade: 'A' }
    ]
  },
  {
    roll: '20504',
    reg: '987651',
    name: 'Abrar Fahad',
    examType: 'Class XI Annual Exam',
    session: '2025-2026',
    gpa: 3.83,
    grade: 'A-',
    subjects: [
      { name: 'Physics', code: '174', marks: 62, gp: 3.00, letterGrade: 'B' },
      { name: 'Chemistry', code: '176', marks: 65, gp: 3.00, letterGrade: 'B' },
      { name: 'Higher Mathematics', code: '265', marks: 71, gp: 4.00, letterGrade: 'A' },
      { name: 'ICT', code: '275', marks: 77, gp: 4.00, letterGrade: 'A' },
      { name: 'Bangla', code: '101', marks: 69, gp: 3.50, letterGrade: 'A-' },
      { name: 'English', code: '107', marks: 80, gp: 5.00, letterGrade: 'A+' }
    ]
  }
];

export const BOARD_RESULTS_STATS = [
  { year: '2025', totalPassed: '1152', gpa5: '842', passRate: '98.5%' },
  { year: '2024', totalPassed: '1088', gpa5: '785', passRate: '97.2%' },
  { year: '2023', totalPassed: '1120', gpa5: '811', passRate: '96.8%' },
  { year: '2022', totalPassed: '1050', gpa5: '720', passRate: '95.6%' }
];
