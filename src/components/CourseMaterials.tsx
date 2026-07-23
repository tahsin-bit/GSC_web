import React, { useState } from 'react';
import { 
  FileText, Play, Download, Search, FileSpreadsheet,
  Plus, UploadCloud, BookOpen, BookmarkCheck, CheckSquare, Square, X, RefreshCw
} from 'lucide-react';
import { Course, CourseMaterial, User } from '../types/academic';

interface CourseMaterialsProps {
  user: User;
  courses: Course[];
  isBangla: boolean;
}

export const CourseMaterials: React.FC<CourseMaterialsProps> = ({
  user,
  courses,
  isBangla
}) => {
  const [selectedSemester, setSelectedSemester] = useState<number>(user.semester);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local Course Materials lists initialized from mock courses + localStorage custom uploads
  const [materials, setMaterials] = useState<CourseMaterial[]>(() => {
    const allmats: CourseMaterial[] = [];
    courses.forEach(c => allmats.push(...c.materials));
    
    // Load persisted user uploads
    const savedCustom = localStorage.getItem('gsctd_custom_materials');
    if (savedCustom) {
      try {
        const parsed: CourseMaterial[] = JSON.parse(savedCustom);
        allmats.unshift(...parsed);
      } catch (err) {
        console.error("Failed to load custom materials", err);
      }
    }
    return allmats;
  });

  // Timed interactive toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Track checked reading progress states
  const [completedMats, setCompletedMats] = useState<{ [key: string]: boolean }>({
    'mat-1': true,
    'mat-4': true,
  });

  // Custom user uploading states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customCourse, setCustomCourse] = useState(courses[0]?.code || 'PHY-101');
  const [customType, setCustomType] = useState<'pdf' | 'video' | 'sheet'>('pdf');
  const [customSize, setCustomSize] = useState('1.5 MB');

  // Filter semester options
  const semesterCourses = courses.filter(c => c.semester === selectedSemester);

  const handleToggleReadStatus = (matId: string) => {
    setCompletedMats(prev => ({
      ...prev,
      [matId]: !prev[matId]
    }));
  };

  // Handle file selection and autofill
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedFile(file);
    // Autofill title (stripping extension)
    setCustomTitle(file.name.replace(/\.[^/.]+$/, ""));
    // Autofill size
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    setCustomSize(`${sizeMB} MB`);
    
    // Autofill type based on extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') {
      setCustomType('pdf');
    } else if (['xls', 'xlsx', 'csv'].includes(ext || '')) {
      setCustomType('sheet');
    } else if (['mp4', 'mov', 'avi', 'mkv'].includes(ext || '')) {
      setCustomType('video');
    }
  };

  const handleCustomUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle) return;

    const newMat: CourseMaterial = {
      id: `mat-user-${Date.now()}`,
      title: customTitle,
      type: customType,
      courseCode: customCourse,
      fileSize: customSize || '2.1 MB',
      downloadUrl: '#',
      isCustom: true
    };

    // Add to state
    setMaterials(prev => [newMat, ...prev]);

    // Save to localStorage
    const savedCustom = localStorage.getItem('gsctd_custom_materials');
    const customList: CourseMaterial[] = savedCustom ? JSON.parse(savedCustom) : [];
    customList.unshift(newMat);
    localStorage.setItem('gsctd_custom_materials', JSON.stringify(customList));

    // Reset forms
    setCustomTitle('');
    setSelectedFile(null);
    setShowUploadModal(false);

    // Show dynamic success toast
    setToastMessage(isBangla ? 'লেকচার শিটটি সফলভাবে আপলোড করা হয়েছে।' : 'Custom study note added to your personal workspace!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Local filtered materials for selected semester (used for progress tracker)
  const filteredMaterialsLocal = materials.filter(mat => {
    const parentCourse = courses.find(c => c.code === mat.courseCode);
    return parentCourse && parentCourse.semester === selectedSemester;
  });

  // Global search matching (bypasses semester restriction to search globally)
  const filteredMaterialsGlobal = materials.filter(mat => {
    return (
      mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-crimson" />;
      case 'video': return <Play className="w-5 h-5 text-blue-600" />;
      case 'sheet': return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      default: return <BookOpen className="w-5 h-5 text-slate-400" />;
    }
  };

  // Real browser-triggered download of document stubs
  const [downloadingMatId, setDownloadingMatId] = useState<string | null>(null);
  const triggerDownload = (mat: CourseMaterial) => {
    setDownloadingMatId(mat.id);
    setTimeout(() => {
      setDownloadingMatId(null);

      // Create a real text blob to trigger download
      const element = document.createElement("a");
      const fileContent = `GOVERNMENT SCIENCE COLLEGE, TEJGAON, DHAKA\n==========================================\n\nCourse Material: ${mat.title}\nCourse Code: ${mat.courseCode}\nFile Size: ${mat.fileSize}\nResource Category: ${mat.type.toUpperCase()}\n\nThis is an officially approved GSC academic resource. Detailed study guidelines are reserved for registered student portal accounts.`;
      const file = new Blob([fileContent], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${mat.title.replace(/\s+/g, '_')}_GSC.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setToastMessage(isBangla ? 'ডাউনলোড সফল হয়েছে! ফাইলটি অফলাইনে সংরক্ষিত করা হয়েছে।' : 'Download complete! Course document saved locally.');
      setTimeout(() => setToastMessage(null), 3500);
    }, 1000);
  };

  const readCount = filteredMaterialsLocal.filter(m => completedMats[m.id]).length;
  const progressRatio = filteredMaterialsLocal.length > 0 
    ? Math.round((readCount / filteredMaterialsLocal.length) * 100) 
    : 0;

  return (
    <div id="course-materials-section" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left relative">
      
      {/* Dynamic Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-750 text-white px-5 py-3.5 rounded shadow-xl font-mono text-xs flex items-center space-x-2 animate-bounce">
          <BookmarkCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Title header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1">
            {isBangla ? 'কোর্স ফাইল এবং লেকচার শিট' : 'TECHNICAL CURRICULUM ARCHIVE'}
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-905">
            {isBangla ? 'আकाডেমিক কোর্স মেটেরিয়ালস' : 'Course Lecture Materials'}
          </h1>
          <p className="text-xs text-slate-500">
            {isBangla ? 'আপনার সেমিস্টারের পাঠ্য উপাদানসমূহ পর্যবেক্ষণ এবং প্রাকটিক্যাল শিট ডাউনলোড করুন।' : 'Review syllabus files, practical lab records, and advisory instructions.'}
          </p>
        </div>

        <button
          id="btn-trigger-upload-modal"
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-1.5 bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-widest text-xs font-bold py-2.5 px-4 rounded shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>{isBangla ? 'লেকচার আপলোড' : 'Upload Study Notes'}</span>
        </button>
      </div>

      {/* Study Notes Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded p-6 w-full max-w-md shadow-2xl relative text-left">
            <button
              id="close-upload-modal"
              onClick={() => {
                setShowUploadModal(false);
                setSelectedFile(null);
              }}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-crimson hover:bg-slate-50 rounded"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-serif font-bold text-slate-905 mb-4 flex items-center space-x-2">
              <UploadCloud className="w-5 h-5 text-crimson" />
              <span>{isBangla ? 'নতুন পিডিএফ/লেকচার শিট প্রবিষ্ট করুণ' : 'Post Custom Lecture Note'}</span>
            </h3>

            <form onSubmit={handleCustomUploadSubmit} className="space-y-4">
              
              {/* File Drag and Drop Selection */}
              <div className="border-2 border-dashed border-slate-200 hover:border-crimson/50 rounded-lg p-5 text-center cursor-pointer transition-colors relative">
                <input 
                  type="file" 
                  accept=".pdf,.mp4,.xlsx,.xls,.csv"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={handleFileChange}
                />
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-700 font-medium">
                  {selectedFile ? selectedFile.name : (isBangla ? 'ফাইল নির্বাচন করতে ক্লিক বা ড্র্যাগ করুন' : 'Click or drag file to upload')}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">PDF, MP4, XLSX up to 10MB</p>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Note/Material Title</label>
                <input
                  id="upload-mat-title"
                  type="text"
                  placeholder="e.g. Siemens S7 Ladder Logic Interfacing Diagram"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-crimson"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Select Course</label>
                  <select
                    id="upload-mat-course"
                    value={customCourse}
                    onChange={(e) => setCustomCourse(e.target.value)}
                    className="w-full bg-slate-550 bg-slate-50 border border-slate-200 rounded px-2 py-2 text-xs text-slate-700 focus:outline-none font-sans"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.code}>{c.code} - {c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Material Type</label>
                  <select
                    id="upload-mat-type"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as any)}
                    className="w-full bg-slate-550 bg-slate-50 border border-slate-200 rounded px-2 py-2 text-xs text-slate-705 text-slate-700 focus:outline-none font-sans"
                  >
                    <option value="pdf">📄 PDF Document</option>
                    <option value="video">🎥 MP4 Lecture Video</option>
                    <option value="sheet">📊 Excel Sheet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Size Tag</label>
                <input
                  id="upload-mat-size"
                  type="text"
                  placeholder="e.g. 2.4 MB"
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-crimson font-mono"
                  required
                />
              </div>

              <button
                id="submit-upload-btn"
                type="submit"
                className="w-full bg-crimson hover:bg-crimson-dark text-white font-mono uppercase tracking-widest text-xs font-bold py-3 px-4 rounded transition-all cursor-pointer shadow-sm"
              >
                {isBangla ? 'রিসোর্স হিসেবে যুক্ত করুন' : 'Publish Study Notes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Control row with Semester Switchers & Search parameters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded border border-slate-200 shadow-sm">
        
        {/* Semester selector */}
        <div className="flex items-center space-x-2.5">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{isBangla ? 'সেমিস্টার সুইচ:' : 'Semester Filters:'}</span>
          <div className="inline-flex bg-slate-100 p-1 rounded border border-slate-200">
            {[1, 2].map((sem) => (
              <button
                key={sem}
                id={`sem-switch-btn-${sem}`}
                onClick={() => {
                  setSelectedSemester(sem);
                  setSearchQuery(''); // Clear search query when changing semesters for better UX
                }}
                className={`px-3.5 py-1 text-xs font-bold transition-all rounded cursor-pointer ${
                  selectedSemester === sem && !searchQuery
                    ? 'bg-crimson text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {sem === 1 ? (isBangla ? '১ম বর্ষ' : '1st Year') : (isBangla ? '২য় বর্ষ' : '2nd Year')}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            id="mat-local-search"
            type="text"
            placeholder={isBangla ? 'মেটেরিয়ালের নাম খুঁজুন...' : 'Filter lecture titles...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-crimson font-sans"
          />
        </div>
      </div>

      {/* Structured Completion Index bar */}
      <div className="bg-white border border-slate-200 p-5 rounded flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-crimson/5 border border-crimson/10 rounded flex items-center justify-center text-crimson">
            <BookmarkCheck className="w-5.5 h-5.5 text-crimson" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-black text-slate-900">{isBangla ? 'সেমিস্টার রিডিং সম্পন্নতা স্তর' : 'Semester Syllabus Reading Progress'}</h3>
            <p className="text-xs text-slate-500">
              {isBangla 
                ? `${filteredMaterialsLocal.length} টি নথির মধ্যে ${readCount} টি পড়া শেষ হয়েছে` 
                : `${readCount} of ${filteredMaterialsLocal.length} lecture files checked off`}
            </p>
          </div>
        </div>

        {/* Real dynamic progress percentage block */}
        <div className="w-full sm:w-64 space-y-1.5">
          <div className="flex justify-between text-xs font-mono font-bold text-slate-500">
            <span>CHART PERCENTAGE</span>
            <span>{progressRatio}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-crimson rounded-full transition-all duration-500 animate-pulse" style={{ width: `${progressRatio}%` }}></div>
          </div>
        </div>
      </div>

      {/* Dynamic Materials View (Flat Global Search Results VS Semester Course Groupings) */}
      {searchQuery ? (
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-150 pb-2">
            <span className="font-semibold">
              {isBangla 
                ? `অনুসন্ধানের ফলাফল: ${filteredMaterialsGlobal.length} টি ফাইল পাওয়া গেছে` 
                : `Search Results: Found ${filteredMaterialsGlobal.length} matching materials`}
            </span>
            <button 
              onClick={() => setSearchQuery('')} 
              className="text-crimson font-mono font-bold hover:underline cursor-pointer"
            >
              {isBangla ? 'অনুসন্ধান মুছুন' : 'Clear Filter'}
            </button>
          </div>

          {filteredMaterialsGlobal.length === 0 ? (
            <div className="p-16 text-center rounded-lg border border-slate-200 bg-white text-slate-400 text-xs font-mono">
              {isBangla ? 'কোনো লেকচার ফাইল পাওয়া যায়নি।' : 'No study materials matched your filter queries.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMaterialsGlobal.map((mat) => {
                const isRead = completedMats[mat.id] || false;
                const course = courses.find(c => c.code === mat.courseCode);
                return (
                  <div 
                    key={mat.id}
                    className={`p-3.5 rounded-lg border transition-all flex items-center justify-between text-xs gap-3 ${
                      isRead ? 'border-slate-200 bg-slate-50 opacity-75' : 'border-slate-200 hover:border-crimson/20 bg-white shadow-sm hover:shadow'
                    }`}
                  >
                    <div className="flex items-center space-x-3 overflow-hidden flex-1">
                      <button
                        onClick={() => handleToggleReadStatus(mat.id)}
                        className="text-slate-400 hover:text-crimson shrink-0 transition-colors cursor-pointer"
                      >
                        {isRead ? (
                          <CheckSquare className="w-4.5 h-4.5 text-crimson" />
                        ) : (
                          <Square className="w-4.5 h-4.5 text-slate-350" />
                        )}
                      </button>

                      <div className="p-1.5 bg-slate-50 border border-slate-150 rounded shrink-0">
                        {getMaterialIcon(mat.type)}
                      </div>
                      
                      <div className="overflow-hidden text-left space-y-0.5">
                        <h4 className={`font-bold text-slate-800 truncate ${isRead && 'line-through text-slate-400'}`}>
                          {mat.title}
                        </h4>
                        <p className="text-[9px] text-slate-500 font-mono truncate">
                          Course: <span className="font-semibold text-crimson">{mat.courseCode}</span>
                          {course && ` (${isBangla ? (course.semester === 1 ? '১ম বর্ষ' : '২য় বর্ষ') : (course.semester === 1 ? '1st Year' : '2nd Year')})`}
                          {` • Size: ${mat.fileSize}`}
                          {mat.isCustom && <span className="text-[8px] text-crimson font-bold ml-1.5 bg-crimson/5 px-1 py-0.2 rounded">User Upload</span>}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => triggerDownload(mat)}
                      disabled={downloadingMatId !== null}
                      className={`p-2 border rounded transition-colors shrink-0 flex items-center space-x-1 cursor-pointer bg-slate-50 ${
                        isRead 
                          ? 'border-slate-200 text-slate-400 hover:text-slate-800'
                          : 'border-slate-200 text-slate-500 hover:text-crimson hover:border-crimson/20'
                      }`}
                    >
                      {downloadingMatId === mat.id ? (
                        <RefreshCw className="w-3.5 h-3.5 text-crimson animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {semesterCourses.length === 0 ? (
            <div className="col-span-2 p-12 text-center rounded border border-slate-200 bg-white text-slate-400 text-xs font-mono">
              No active trades or matching course materials.
            </div>
          ) : (
            semesterCourses.map((course) => {
              const courseMats = filteredMaterialsLocal.filter(m => m.courseCode === course.code);

              return (
                <div key={course.id} className="bg-white border border-slate-200 rounded p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    {/* Header metadata tag */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold bg-crimson/10 text-crimson border border-crimson/10 px-2 py-0.5 rounded">
                          {course.code}
                        </span>
                        <h3 className="text-sm sm:text-base font-serif font-black text-slate-900 mt-1.5">{course.title}</h3>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">{course.credit} CR</span>
                    </div>

                    {/* Sub Course Files lists */}
                    {courseMats.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 italic text-center">
                        No documents mapped to this course.
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {courseMats.map((mat) => {
                          const isRead = completedMats[mat.id] || false;

                          return (
                            <div 
                              key={mat.id}
                              className={`p-3 rounded border transition-all flex items-center justify-between text-xs gap-3 ${
                                isRead ? 'border-slate-150 bg-slate-50 opacity-70' : 'border-slate-150 hover:border-crimson/20 bg-white'
                              }`}
                            >
                              <div className="flex items-center space-x-3 overflow-hidden flex-1">
                                
                                {/* Read checkbox trigger state toggle */}
                                <button
                                  id={`toggle-read-status-${mat.id}`}
                                  onClick={() => handleToggleReadStatus(mat.id)}
                                  className="text-slate-400 hover:text-crimson shrink-0 transition-colors cursor-pointer"
                                  title={isRead ? 'Mark Active Study' : 'Check Completed'}
                                >
                                  {isRead ? (
                                    <CheckSquare className="w-4.5 h-4.5 text-crimson" />
                                  ) : (
                                    <Square className="w-4.5 h-4.5 text-slate-350" />
                                  )}
                                </button>

                                <div className="p-1.5 bg-slate-50 border border-slate-150 rounded shrink-0">
                                  {getMaterialIcon(mat.type)}
                                </div>
                                
                                <div className="overflow-hidden text-left space-y-0.5">
                                  <h4 className={`font-semibold text-slate-800 truncate ${isRead && 'line-through text-slate-400'}`}>
                                    {mat.title}
                                  </h4>
                                  <p className="text-[9px] text-slate-500 font-mono">
                                    Type: <span className="uppercase">{mat.type}</span> • Size: {mat.fileSize}
                                    {mat.isCustom && <span className="text-[8px] text-crimson font-bold ml-1.5 bg-crimson/5 px-1 py-0.2 rounded">User Upload</span>}
                                  </p>
                                </div>
                              </div>

                              {/* Download handler */}
                              <button
                                id={`download-mat-handle-${mat.id}`}
                                onClick={() => triggerDownload(mat)}
                                disabled={downloadingMatId !== null}
                                className={`p-2 border rounded transition-colors shrink-0 flex items-center space-x-1 cursor-pointer bg-slate-50 ${
                                  isRead 
                                    ? 'border-slate-200 text-slate-400 hover:text-slate-800'
                                    : 'border-slate-200 text-slate-500 hover:text-crimson hover:border-crimson/20'
                                }`}
                                title="Download Lesson Material"
                              >
                                {downloadingMatId === mat.id ? (
                                  <RefreshCw className="w-3.5 h-3.5 text-crimson animate-spin" />
                                ) : (
                                  <Download className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

    </div>
  );
};
