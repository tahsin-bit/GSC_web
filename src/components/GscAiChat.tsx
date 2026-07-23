import React, { useState, useRef, useEffect } from 'react';
import { X, Send, RefreshCw, Minimize2, Sparkles, MessageCircle, ShieldCheck, CheckCircle, Trash2, Plus, List, Zap } from 'lucide-react';
import { askGscAi, askGscAiWithPortalContext, ChatMessage, PortalContext, PortalActionType } from '../services/gscAiService';
import { Assignment, Course } from '../types/academic';

interface PortalActions {
  assignments: Assignment[];
  courses: Course[];
  onAdd: (a: Assignment) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

interface GscAiChatProps {
  isBangla?: boolean;
  portalActions?: PortalActions; // only passed when user is logged in
}

// Format action result message for display
function getActionResultMessage(action: PortalActionType, assignments: Assignment[], isBangla: boolean): string {
  switch (action.type) {
    case 'add_assignment':
      return isBangla
        ? `✅ "${action.title}" assignment যুক্ত করা হয়েছে! (${action.courseCode} • Due: ${action.dueDate})`
        : `✅ Added "${action.title}" to your calendar! (${action.courseCode} • Due: ${action.dueDate})`;
    case 'delete_assignment': {
      const found = assignments.find(a => a.id === action.assignmentId);
      return isBangla
        ? `🗑️ "${found?.title || 'Assignment'}" delete করা হয়েছে।`
        : `🗑️ "${found?.title || 'Assignment'}" has been deleted.`;
    }
    case 'complete_assignment': {
      const found = assignments.find(a => a.id === action.assignmentId);
      return isBangla
        ? `✔️ "${found?.title || 'Assignment'}" completed হিসেবে mark করা হয়েছে!`
        : `✔️ "${found?.title || 'Assignment'}" marked as complete!`;
    }
    case 'list_assignments': {
      const filter = action.filter || 'all';
      const list = assignments.filter(a =>
        filter === 'all' ? true : filter === 'pending' ? !a.completed : a.completed
      );
      if (list.length === 0) return isBangla ? '📋 কোনো assignment নেই।' : '📋 No assignments found.';
      const lines = list.slice(0, 8).map(a =>
        `• ${a.completed ? '✅' : '⏳'} ${a.title} (${a.courseCode}) — ${a.dueDate}`
      );
      if (list.length > 8) lines.push(isBangla ? `...এবং আরো ${list.length - 8}টি` : `...and ${list.length - 8} more`);
      return (isBangla ? `📋 তোমার assignments:\n` : `📋 Your assignments:\n`) + lines.join('\n');
    }
    default:
      return '';
  }
}

function getActionIcon(type: string) {
  switch (type) {
    case 'add_assignment': return <Plus className="w-3.5 h-3.5" />;
    case 'delete_assignment': return <Trash2 className="w-3.5 h-3.5" />;
    case 'complete_assignment': return <CheckCircle className="w-3.5 h-3.5" />;
    case 'list_assignments': return <List className="w-3.5 h-3.5" />;
    default: return <Zap className="w-3.5 h-3.5" />;
  }
}

export const GscAiChat: React.FC<GscAiChatProps> = ({ isBangla = true, portalActions }) => {
  const isPortalMode = !!portalActions;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const GSC_LOGO_URL = '/images/gsc-logo.png';

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'ai',
        text: isPortalMode
          ? (isBangla
            ? '👋 হ্যালো! আমি GSC Ai। তোমার assignment calendar-এ কিছু add, delete বা complete করতে চাইলে বলো। যেমন — "আগামীকাল Physics assignment add করো" বা "আমার সব assignment দেখাও"!'
            : '👋 Hey! I\'m GSC Ai. I can help you manage your assignments! Try saying "Add a Physics assignment for tomorrow" or "Show all my pending assignments".')
          : (isBangla
            ? 'শুভকামনা! আমি "GSC Ai" — সরকারি বিজ্ঞান কলেজের অফিসিয়াল সহকারী। ভর্তি, বিভাগ, ক্যাম্পাস — যেকোনো বিষয়ে জিজ্ঞেস করুন!'
            : 'Welcome! I\'m "GSC Ai" — the official assistant for Government Science College, Dhaka. Ask me anything about admissions, departments, or campus!'),
        timestamp: new Date()
      }
    ]);
  }, [isBangla, isPortalMode]);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      if (isPortalMode && portalActions) {
        // Portal mode — use function calling
        const context: PortalContext = {
          assignments: portalActions.assignments.map(a => ({
            id: a.id, title: a.title, courseCode: a.courseCode,
            dueDate: a.dueDate, completed: a.completed, priority: a.priority
          })),
          courseCodes: portalActions.courses.map(c => c.code)
        };

        const result = await askGscAiWithPortalContext(query, messages, context);

        if (result.action) {
          // Execute the action
          executeAction(result.action, portalActions);

          const actionText = getActionResultMessage(result.action, portalActions.assignments, isBangla);
          const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: actionText,
            timestamp: new Date(),
            isAction: true,
            actionType: result.action.type
          };
          setMessages(prev => [...prev, aiMsg]);
        } else if (result.text) {
          const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: result.text, timestamp: new Date() };
          setMessages(prev => [...prev, aiMsg]);
        }
      } else {
        // Guest mode — standard chat
        const replyText = await askGscAi(query, messages);
        const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: replyText, timestamp: new Date() };
        setMessages(prev => [...prev, aiMsg]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const executeAction = (action: PortalActionType, pa: PortalActions) => {
    switch (action.type) {
      case 'add_assignment':
        pa.onAdd({
          id: `asn-ai-${Date.now()}`,
          title: action.title,
          courseCode: action.courseCode,
          dueDate: action.dueDate,
          priority: action.priority,
          description: action.description || '',
          completed: false
        });
        break;
      case 'delete_assignment':
        pa.onDelete(action.assignmentId);
        break;
      case 'complete_assignment':
        pa.onComplete(action.assignmentId);
        break;
      case 'list_assignments':
        // No side effect — result shown in message
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); handleSend(); }
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now().toString(),
      sender: 'ai',
      text: isBangla ? 'চ্যাট নতুন করে শুরু হয়েছে! কী জানতে চাও বলো 😊' : 'Chat reset! What can I help you with?',
      timestamp: new Date()
    }]);
  };

  // Suggestions based on mode
  const suggestions = isPortalMode
    ? (isBangla
      ? ['আমার assignments দেখাও', 'আগামীকাল Physics assignment add করো', 'বাকি assignments কী কী?', 'Chemistry assignment complete করো']
      : ['Show my assignments', 'Add a Math assignment for tomorrow', 'What assignments are pending?', 'Delete completed assignments'])
    : (isBangla
      ? ['ভর্তি যোগ্যতা কী?', 'বিভাগসমূহ কী কী?', 'কলেজ কোড কত?', 'ক্যাম্পাস কোথায়?']
      : ['Admission criteria?', 'Available departments?', 'College Code?', 'Campus location?']);

  return (
    <div className={`fixed z-[60] font-sans transition-all duration-300 ${isPortalMode ? 'bottom-20 right-3.5 sm:bottom-6 sm:right-6' : 'bottom-20 right-4 sm:bottom-6 sm:right-6'}`}>

      {/* FAB Button */}
      {!isOpen && (
        <button
          id="gsc-ai-fab-btn"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2 bg-gradient-to-tr from-slate-950 via-crimson to-rose-700 hover:from-crimson hover:to-slate-950 text-white px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_10px_35px_rgba(159,18,57,0.45)] border-2 border-white/30 backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Open GSC Ai"
        >
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
            <Sparkles className="w-3 h-3 text-rose-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-black tracking-wider uppercase font-mono text-white group-hover:text-rose-200 transition-colors">
            GSC Ai
          </span>
          {isPortalMode && (
            <span className="absolute -top-2 -left-2 bg-emerald-500 text-white text-[8px] font-mono font-black px-1.5 py-0.5 rounded-full uppercase border-2 border-white shadow-sm">
              {isBangla ? 'সক্রিয়' : 'Active'}
            </span>
          )}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950" />
          </span>
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
          </div>
        </button>
      )}

      {/* Chat Panel Window with Mobile Responsive Drawer / Overlay */}
      {isOpen && (
        <>
          {/* Mobile backdrop dimming layer */}
          <div 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs sm:hidden z-[65]"
          />

          <div className="fixed inset-x-2 bottom-2 top-14 sm:inset-auto sm:bottom-6 sm:right-6 z-[70] sm:w-[430px] sm:max-h-[640px] sm:h-[85vh] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">


          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-crimson text-white p-4 flex items-center justify-between shadow-md shrink-0 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center ring-2 ring-rose-400/40 shadow-sm shrink-0">
                <img src={GSC_LOGO_URL} alt="GSC Logo" className="w-full h-full object-contain" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-serif font-black text-sm tracking-wide text-white">GSC Ai</h3>
                  {isPortalMode && (
                    <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-emerald-400/30 flex items-center space-x-1">
                      <Zap className="w-2.5 h-2.5" />
                      <span>{isBangla ? 'পোর্টাল মোড' : 'Portal Mode'}</span>
                    </span>
                  )}
                  {!isPortalMode && (
                    <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-emerald-400/30 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Online</span>
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-rose-200/90 font-sans mt-0.5">
                  {isPortalMode
                    ? (isBangla ? 'Assignment ম্যানেজার • স্টুডেন্ট পোর্টাল' : 'Assignment Manager • Student Portal')
                    : (isBangla ? 'সরকারি বিজ্ঞান কলেজ • প্রাতিষ্ঠানিক প্রতিনিধি' : 'Govt. Science College Academic Counselor')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={clearChat} title="Reset" className="p-1.5 hover:bg-white/15 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} title="Close" className="p-1.5 hover:bg-white/15 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer">
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader */}
          <div className="bg-slate-900 border-b border-slate-800 px-3.5 py-1.5 flex items-center text-[10px] text-slate-300 font-medium shrink-0 space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              {isPortalMode
                ? (isBangla ? 'Assignment add, delete, complete বা list করতে পারো' : 'You can add, delete, complete or list assignments')
                : (isBangla ? 'জিএসসি ক্যাম্পাস ও ভর্তি তথ্য কেন্দ্র' : 'GSC Official Campus & Admission Information Center')}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start space-x-2.5`}>
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm mt-0.5">
                    <img src={GSC_LOGO_URL} alt="GSC" className="w-full h-full object-contain" />
                  </div>
                )}
                <div className={`max-w-[84%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-crimson text-white rounded-br-none shadow-md font-sans'
                    : msg.isAction
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-bl-none shadow-sm font-sans'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm font-sans'
                }`}>
                  {msg.isAction && msg.actionType && (
                    <div className="flex items-center space-x-1.5 mb-2 text-emerald-600 font-mono font-bold text-[9px] uppercase tracking-wider">
                      {getActionIcon(msg.actionType)}
                      <span>{msg.actionType.replace(/_/g, ' ')}</span>
                    </div>
                  )}
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1.5 font-mono ${msg.sender === 'user' ? 'text-rose-200 text-right' : msg.isAction ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-start space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                  <img src={GSC_LOGO_URL} alt="GSC" className="w-full h-full object-contain" />
                </div>
                <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-2">
                  <span className="w-2 h-2 bg-crimson rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-crimson rounded-full animate-bounce delay-150" />
                  <span className="w-2 h-2 bg-crimson rounded-full animate-bounce delay-300" />
                  <span className="text-[10px] text-slate-500 ml-1">
                    {isBangla ? 'GSC Ai কাজ করছে...' : 'GSC Ai is working...'}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase shrink-0">
              {isPortalMode ? '⚡' : '💡'} {isBangla ? 'দ্রুত:' : 'Quick:'}
            </span>
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sug)}
                disabled={isLoading}
                className={`text-[10px] border px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer disabled:opacity-50 font-sans ${
                  isPortalMode
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 border-emerald-200 hover:border-emerald-300'
                    : 'bg-slate-100 hover:bg-rose-50 hover:text-crimson hover:border-crimson/30 border-slate-200 text-slate-700'
                }`}
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isPortalMode
                  ? (isBangla ? 'বলো কী করতে চাও... যেমন "Physics assignment add করো"' : 'Tell me what to do, e.g. "Add a Physics assignment"')
                  : (isBangla ? 'জিএসসি সম্পর্কে যেকোনো প্রশ্ন...' : 'Ask GSC Ai anything about the college...')
              }
              disabled={isLoading}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all font-sans disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isLoading}
              className="bg-crimson hover:bg-crimson-dark text-white p-2.5 rounded-xl transition-all disabled:opacity-40 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  );
};
