/**
 * Types for the Government Science College (GSC) Academic Portal
 */

export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  batch: string;
  avatarUrl?: string;
  cgpa: number;
  semester: number;
  completedCredits: number;
  totalCredits: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  shortDesc: string;
  duration: string;
  semesters: number;
  labsCount: number;
  seatCount: number;
  technologies: string[];
  headOfDept: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  semester: number;
  credit: number;
  materials: CourseMaterial[];
  exams: ExamEvent[];
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'sheet' | 'syllabus';
  courseCode: string;
  fileSize: string;
  downloadUrl: string;
  isCustom?: boolean;
}

export interface ExamEvent {
  id: string;
  courseCode: string;
  courseTitle: string;
  type: 'Midterm' | 'Final' | 'Lab Assessment' | 'Quiz';
  dateTime: string; // ISO String
  room: string;
  instructions: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseCode: string;
  dueDate: string; // YYYY-MM-DD
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string; // ISO date
  category: 'academic' | 'exam' | 'event' | 'admission';
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  link?: string;
  memoNo?: string;
  issuedBy?: string;
  detailsBn?: string;
  detailsEn?: string;
}

export interface AppState {
  user: User | null;
  notifications: NotificationItem[];
  assignments: Assignment[];
}
