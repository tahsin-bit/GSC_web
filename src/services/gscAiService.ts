// GSC Ai - Gemini API Service for Government Science College

const GEMINI_API_KEY = 'AIzaSyDzzoLXr7N4UsbZ8WZbfwDM5dIDXrlMsEw';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const GEMINI_FALLBACK_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const GSC_SYSTEM_INSTRUCTION = `
তুমি "GSC Ai" — সরকারি বিজ্ঞান কলেজ, তেজগাঁও, ঢাকার একজন প্রাণবন্ত ও বন্ধুসুলভ প্রতিনিধি। তুমি একজন মানুষের মতো কথা বলো, কোনো রোবটের মতো না।

## তোমার ব্যক্তিত্ব:
- tumi GSC AI
- তুমি কলেজের একজন সিনিয়র ছাত্র বা ছাত্রী, যে কলেজকে ভালোবাসে এবং নতুনদের সাহায্য করতে ভালো লাগে।
- কথা বলো সহজ, ছোট ছোট বাক্যে। বেশি লম্বা উত্তর দিও না।
- উষ্ণ, আন্তরিক এবং একটু হালকা মজার ভাষায় কথা বলো।
- কখনও বলবে না যে "আমি একটি AI" বা "আমি কৃত্রিম বুদ্ধিমত্তা"। তুমি সরাসরি GSC-এর প্রতিনিধি।
- প্রশ্নকর্তার ভাষায় কথা বলো — বাংলায় জিজ্ঞেস করলে বাংলায়, ইংরেজিতে জিজ্ঞেস করলে ইংরেজিতে।

## উত্তর দেওয়ার স্টাইল:
- সংক্ষিপ্ত রাখো — সাধারণত ৩-৫টি বাক্যের বেশি না।
- যদি কেউ কোনো তথ্য জানতে চায়, সহজ ভাষায় বুঝিয়ে বলো।
- কখনও বুলেট পয়েন্টের বন্যা বইয়ে দিও না — শুধু দরকার হলে ১-৩টি পয়েন্ট দাও।
- একটু ইমোজি ব্যবহার করতে পারো, কিন্তু বেশি না।
- কথোপকথন চালিয়ে যাওয়ার জন্য শেষে একটি ছোট প্রশ্ন বা উৎসাহমূলক কথা বলো।

## GSC সম্পর্কে তুমি যা জানো:
- **পুরো নাম**: সরকারি বিজ্ঞান কলেজ, তেজগাঁও, ঢাকা-১২১৫
- **প্রতিষ্ঠা**: ১৯৫৪ সাল (প্রথমে Intermediate Technical College নামে)
- **EIIN**: ১০৮৫৩৫ | **কলেজ কোড**: ১০০৮
- **অধ্যক্ষ**: প্রফেসর সালমা বেগম
- **কোর্স**: HSC (বিজ্ঞান বিভাগ) এবং ডিগ্রি B.Sc (পাস কোর্স, জাতীয় বিশ্ববিদ্যালয়ের অধীনে)
- **বিভাগ**: পদার্থবিজ্ঞান, রসায়ন, গণিত, আইসিটি, উদ্ভিদবিজ্ঞান, প্রাণিবিজ্ঞান, বাংলা, ইংরেজি
- **ভর্তি যোগ্যতা**: SSC তে কমপক্ষে GPA ৪.০০ (বিজ্ঞান বিভাগ থেকে), Higher Math-এ A- (৩.৫০) বা তার উপরে। ভর্তি হয় xiclassadmission.gov.bd-এর মাধ্যমে।
- **সুবিধা**: ১২টি সায়েন্স ল্যাব, অডিটোরিয়াম, মাঠ, লাইব্রেরি, ২টি ছাত্রাবাস (কাজী নজরুল ইসলাম হোস্টেল এবং ড. কুদরত-ই-খুদা হোস্টেল)
- **ক্লাব**: বিজ্ঞান ক্লাব, আইসিটি ক্লাব, বিতর্ক ক্লাব, সাংস্কৃতিক ক্লাব, স্কাউট গ্রুপ
- **যোগাযোগ**: Tejgaon Industrial Area, Farmgate, Dhaka-1215 | ফোন: +880-2-9110825

## কলেজের বাইরের প্রশ্নে:
যদি কেউ কলেজের বাইরের কোনো বিষয়ে (যেমন সাধারণ পড়াশোনার সাহায্য, অন্য কলেজ, রাজনীতি, বিনোদন) জিজ্ঞেস করে, হালকাভাবে বলো যে এটা তোমার এলাকার বাইরে, কিন্তু GSC নিয়ে কিছু জানতে চাইলে সাথে সাথে সাহায্য করতে পারবে।

মনে রাখো: তুমি একজন বন্ধু যে কলেজটাকে চেনে — রোবট না!
`;

// ---- Agentic Portal System Instruction (for logged-in students only) ----
const PORTAL_SYSTEM_INSTRUCTION = `
তুমি "GSC Ai" — স্টুডেন্ট পোর্টালের একজন বিশ্বস্ত সহকারী। তুমি একজন মানুষের মতো কথা বলো, স্বাভাবিকভাবে এবং সংক্ষিপ্তভাবে।

## তোমার পোর্টাল ক্ষমতা:
তুমি student-এর assignment calendar-এ কাজ করতে পারো। যদি student চায়:
- নতুন assignment যুক্ত করতে → add_assignment tool ব্যবহার করো
- কোনো assignment delete করতে → delete_assignment tool ব্যবহার করো
- কোনো assignment complete করতে → complete_assignment tool ব্যবহার করো
- তার assignments দেখতে চাইলে → list_assignments tool ব্যবহার করো

## দিনের তারিখ বোঝার নিয়ম:
আজকের তারিখ: {{TODAY}}
- "আজকে" বা "today" = {{TODAY}}
- "আগামীকাল" বা "tomorrow" = {{TOMORROW}}
- "পরশু" = {{DAY_AFTER}}
- "এই সপ্তাহে" = এই সপ্তাহের মধ্যে যেকোনো সুবিধামতো তারিখ

## Course code গুলো:
{{COURSE_CODES}}

## Student-এর বর্তমান assignments:
{{ASSIGNMENTS_CONTEXT}}

## কথা বলার স্টাইল:
- সংক্ষিপ্ত, বন্ধুত্বপূর্ণ, ছোট বাক্যে কথা বলো
- action নেওয়ার পরে confirm করো কী করলে
- ভুল বুঝলে জিজ্ঞেস করো, আন্দাজে কিছু করো না
- বাংলায় জিজ্ঞেস করলে বাংলায়, ইংরেজিতে জিজ্ঞেস করলে ইংরেজিতে উত্তর দাও
`;

// ---- Types ----
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  isAction?: boolean;
  actionType?: string;
}

export type PortalActionType =
  | { type: 'add_assignment'; title: string; courseCode: string; dueDate: string; priority: 'low' | 'medium' | 'high'; description?: string }
  | { type: 'delete_assignment'; assignmentId: string }
  | { type: 'complete_assignment'; assignmentId: string }
  | { type: 'list_assignments'; filter?: 'all' | 'pending' | 'completed' };

export interface GscAiResponse {
  text: string;
  action?: PortalActionType;
}

export interface PortalContext {
  assignments: Array<{ id: string; title: string; courseCode: string; dueDate: string; completed: boolean; priority: string }>;
  courseCodes: string[];
}

// ---- Portal tools definition for Gemini ----
const PORTAL_TOOLS = [
  {
    functionDeclarations: [
      {
        name: 'add_assignment',
        description: 'Student-এর assignment calendar-এ একটি নতুন assignment যুক্ত করে।',
        parameters: {
          type: 'OBJECT',
          properties: {
            title: { type: 'STRING', description: 'Assignment-এর শিরোনাম' },
            courseCode: { type: 'STRING', description: 'Course code, যেমন PHY-101, CHE-101 ইত্যাদি' },
            dueDate: { type: 'STRING', description: 'Due date YYYY-MM-DD format-এ' },
            priority: { type: 'STRING', description: '"low", "medium", বা "high"' },
            description: { type: 'STRING', description: 'Assignment-এর বিবরণ (ঐচ্ছিক)' }
          },
          required: ['title', 'courseCode', 'dueDate', 'priority']
        }
      },
      {
        name: 'delete_assignment',
        description: 'Student-এর একটি assignment delete করে।',
        parameters: {
          type: 'OBJECT',
          properties: {
            assignmentId: { type: 'STRING', description: 'Delete করতে হবে যে assignment-এর ID' }
          },
          required: ['assignmentId']
        }
      },
      {
        name: 'complete_assignment',
        description: 'একটি assignment-কে completed হিসেবে mark করে।',
        parameters: {
          type: 'OBJECT',
          properties: {
            assignmentId: { type: 'STRING', description: 'Complete করতে হবে যে assignment-এর ID' }
          },
          required: ['assignmentId']
        }
      },
      {
        name: 'list_assignments',
        description: 'Student-এর assignments-এর তালিকা দেখায়।',
        parameters: {
          type: 'OBJECT',
          properties: {
            filter: { type: 'STRING', description: '"all", "pending", বা "completed"' }
          },
          required: []
        }
      }
    ]
  }
];

// ---- Main API call functions ----

// Standard chat (no portal actions — for guests)
export async function askGscAi(userPrompt: string, history: ChatMessage[] = []): Promise<string> {
  try {
    const contents = [
      ...history.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] })),
      { role: 'user', parts: [{ text: userPrompt }] }
    ];

    const payload = {
      systemInstruction: { parts: [{ text: GSC_SYSTEM_INSTRUCTION }] },
      contents,
      generationConfig: { temperature: 0.85, maxOutputTokens: 400, topP: 0.95, topK: 40 }
    };

    const result: any = await callGemini(payload);
    return result?.candidates?.[0]?.content?.parts?.[0]?.text
      || 'ক্ষমা করবেন, আপনার কথাটি সঠিকভাবে বুঝতে পারিনি। আরেকবার বলবেন?';
  } catch {
    return 'দুঃখিত, কারিগরি সমস্যায় উত্তর দেওয়া যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।';
  }
}

// Portal chat with function calling (for logged-in students)
export async function askGscAiWithPortalContext(
  userPrompt: string,
  history: ChatMessage[],
  portalContext: PortalContext
): Promise<GscAiResponse> {
  try {
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2);
    const fmt = (d: Date) => d.toISOString().split('T')[0];

    // Build assignments context string
    const assignmentsStr = portalContext.assignments.length === 0
      ? 'কোনো assignment নেই।'
      : portalContext.assignments.map(a =>
          `- ID: ${a.id} | "${a.title}" | Course: ${a.courseCode} | Due: ${a.dueDate} | Status: ${a.completed ? 'সম্পন্ন' : 'বাকি'} | Priority: ${a.priority}`
        ).join('\n');

    const systemText = PORTAL_SYSTEM_INSTRUCTION
      .replace('{{TODAY}}', fmt(today))
      .replace('{{TOMORROW}}', fmt(tomorrow))
      .replace('{{DAY_AFTER}}', fmt(dayAfter))
      .replace('{{COURSE_CODES}}', portalContext.courseCodes.join(', '))
      .replace('{{ASSIGNMENTS_CONTEXT}}', assignmentsStr);

    const contents = [
      ...history
        .filter(m => !m.isAction) // skip action-result messages from history
        .map(msg => ({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] })),
      { role: 'user', parts: [{ text: userPrompt }] }
    ];

    const payload = {
      systemInstruction: { parts: [{ text: systemText }] },
      contents,
      tools: PORTAL_TOOLS,
      generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
    };

    const data: any = await callGemini(payload);
    const candidate = data?.candidates?.[0];
    if (!candidate) return { text: 'উত্তর পেতে সমস্যা হচ্ছে। আবার চেষ্টা করুন।' };

    const parts = candidate?.content?.parts || [];

    // Check for function call
    for (const part of parts) {
      if (part.functionCall) {
        const { name, args } = part.functionCall;
        const action = parseFunctionCall(name, args);
        if (action) {
          return { text: '', action };
        }
      }
    }

    // Regular text response
    const text = parts.find((p: { text?: string }) => p.text)?.text || 'কিছু বুঝতে পারিনি, আরেকবার বলুন।';
    return { text };
  } catch (err) {
    console.error('Portal AI error:', err);
    return { text: 'দুঃখিত, কারিগরি সমস্যায় উত্তর দেওয়া যাচ্ছে না।' };
  }
}

// ---- Helpers ----
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function callGemini(payload: object): Promise<any> {
  let response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    response = await fetch(GEMINI_FALLBACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }
  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
  return response.json();
}

function parseFunctionCall(name: string, args: Record<string, string>): PortalActionType | null {
  switch (name) {
    case 'add_assignment':
      return {
        type: 'add_assignment',
        title: args.title || 'Untitled',
        courseCode: args.courseCode || '',
        dueDate: args.dueDate || new Date().toISOString().split('T')[0],
        priority: (['low', 'medium', 'high'].includes(args.priority) ? args.priority : 'medium') as 'low' | 'medium' | 'high',
        description: args.description
      };
    case 'delete_assignment':
      return { type: 'delete_assignment', assignmentId: args.assignmentId };
    case 'complete_assignment':
      return { type: 'complete_assignment', assignmentId: args.assignmentId };
    case 'list_assignments':
      return { type: 'list_assignments', filter: (args.filter as 'all' | 'pending' | 'completed') || 'all' };
    default:
      return null;
  }
}
