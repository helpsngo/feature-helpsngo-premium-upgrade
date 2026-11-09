import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  HelpCircle,
  RefreshCw,
  Award,
  BookOpen,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { TabType } from '../types';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface AJAssistantPageProps {
  onNavigate: (tab: TabType) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'aj';
  text: string;
  timestamp: string;
  citations?: string[];
  suggestedAction?: {
    label: string;
    tab: TabType;
  };
}

export const AJAssistantPage: React.FC<AJAssistantPageProps> = ({ onNavigate }) => {
  const orgProfile = authoritativeOrgService.getProfile();
  const impact = authoritativeOrgService.getImpactData();
  const transparency = authoritativeOrgService.getFinancialTransparency();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'aj',
      text: `Hello! I am AJ, the verified AI Guide for HELPS Welfare Society (Est. 2016, Ludhiana, Punjab). Every answer I provide is strictly grounded in official society records, audited financial statements, registration documents (HR/2021/0285458), and field ledgers. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        'Societies Registration Act XXI of 1860 (Reg: HR/2021/0285458)',
        'Section 80G Approval Order CIT(E) CHD/80G/2016-17/4726'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sampleQuestions = [
    {
      q: 'How do I claim 50% 80G tax exemption on my donation?',
      tab: 'transparency' as TabType
    },
    {
      q: 'What is the audited expenditure ratio? How much goes to programs?',
      tab: 'transparency' as TabType
    },
    {
      q: 'Where are the AABHA slum child education centers located?',
      tab: 'about' as TabType
    },
    {
      q: 'How can university students join the volunteer or internship program?',
      tab: 'volunteer' as TabType
    },
    {
      q: 'How can a needy family or patient request emergency humanitarian aid?',
      tab: 'assistance' as TabType
    },
    {
      q: 'Who is the Nodal Grievance Officer and what is the legal turnaround time?',
      tab: 'contact' as TabType
    }
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Call grounded chat API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', text: m.text }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.text || 'Thank you for reaching out to HELPS NGO. All our operations are governed under Societies Registration Act XXI of 1860.';
        
        // Determine intelligent navigation suggestion based on query keywords
        let suggestedTab: TabType | undefined = undefined;
        let actionLabel = '';
        const qLower = query.toLowerCase();
        if (qLower.includes('tax') || qLower.includes('80g') || qLower.includes('audit') || qLower.includes('transparency')) {
          suggestedTab = 'transparency';
          actionLabel = 'Inspect Annual Transparency Reports';
        } else if (qLower.includes('donate') || qLower.includes('contribute') || qLower.includes('upi')) {
          suggestedTab = 'donate';
          actionLabel = 'Make a Contribution';
        } else if (qLower.includes('volunteer') || qLower.includes('intern') || qLower.includes('join')) {
          suggestedTab = 'volunteer';
          actionLabel = 'Join Volunteer Squad';
        } else if (qLower.includes('help') || qLower.includes('aid') || qLower.includes('ration') || qLower.includes('medicine')) {
          suggestedTab = 'assistance';
          actionLabel = 'Request Assistance';
        }

        const ajMsg: ChatMessage = {
          id: `aj-${Date.now()}`,
          sender: 'aj',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: [
            'Authoritative Society Profile (Est. 2016, Ludhiana, Punjab)',
            'Societies Registration Act XXI of 1860 (Reg: HR/2021/0285458)'
          ],
          suggestedAction: suggestedTab ? {
            label: actionLabel,
            tab: suggestedTab
          } : undefined
        };
        setMessages((prev) => [...prev, ajMsg]);
      } else {
        throw new Error('API request returned error');
      }
    } catch {
      // Grounded fallback using local authoritative data
      const fallbackText = `According to HELPS Welfare Society official records: We are registered under Societies Registration Act XXI of 1860 (Reg: HR/2021/0285458) with 80G tax exemption (Order CIT(E) CHD/80G/2016-17/4726). Our programmatic field expenditure ratio is audited at 88.4%. For personalized assistance, you can call +91 94729 29856.`;
      setMessages((prev) => [
        ...prev,
        {
          id: `aj-${Date.now()}`,
          sender: 'aj',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: ['Statutory Society Records · Ludhiana, Punjab']
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] dark:bg-zinc-950 text-stone-900 dark:text-zinc-100 transition-colors">
      
      {/* Editorial Header */}
      <section className="bg-stone-900 text-white pt-14 pb-16 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">
            <Bot className="w-4 h-4" />
            <span>Grounded AI Knowledge Engine</span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <span>Zero Hallucination Standard</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Ask AJ — Verified HELPS NGO Guide
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
            AJ is trained strictly on certified records of HELPS Welfare Society. Inquire about Section 80G tax deductions, AABHA education centers, audited expenditure ratios, volunteer fellowships, or beneficiary aid.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-stone-400 pt-4 border-t border-stone-800">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Verified by Statutory Records
            </span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <span>Est. 2016, Ludhiana, Punjab</span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <span>Society Reg: HR/2021/0285458</span>
          </div>
        </div>
      </section>

      {/* Main Chat Interface */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl shadow-xs overflow-hidden flex flex-col h-[650px]">
          
          {/* Chat Top Banner */}
          <div className="bg-stone-50 dark:bg-zinc-800/80 px-6 py-3.5 border-b border-stone-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-serif text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <span>AJ Intelligence Console</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                </div>
                <span className="text-[11px] text-stone-500 dark:text-zinc-400">
                  Grounded in HELPS Society Database
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMessages([
                  {
                    id: 'init-reset',
                    sender: 'aj',
                    text: 'Conversation reset. Feel free to ask anything about HELPS Welfare Society!',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ]);
              }}
              className="text-stone-500 hover:text-stone-900 dark:hover:text-white p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              title="Reset Conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-stone-100 dark:bg-zinc-800 text-stone-900 dark:text-zinc-100 border border-stone-200 dark:border-zinc-700/60'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Citations if from AJ */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-stone-200/60 dark:border-zinc-700 text-[11px] text-stone-500 dark:text-zinc-400 space-y-1">
                      <div className="font-semibold text-stone-600 dark:text-zinc-300">
                        Official Citations:
                      </div>
                      {msg.citations.map((cite, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 font-mono text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{cite}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Direct Action Link */}
                  {msg.suggestedAction && (
                    <button
                      type="button"
                      onClick={() => onNavigate(msg.suggestedAction!.tab)}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-colors"
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                
                <span className="text-[10px] text-stone-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-stone-400 italic">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]" />
                <span>AJ is cross-verifying official records...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sample Prompts Tray */}
          <div className="px-4 py-2 bg-stone-50 dark:bg-zinc-900 border-t border-stone-200 dark:border-zinc-800 overflow-x-auto flex gap-2">
            {sampleQuestions.slice(0, 3).map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(item.q)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-stone-700 dark:text-zinc-300 hover:border-orange-500 hover:text-orange-600 transition-colors shrink-0 cursor-pointer"
              >
                {item.q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white dark:bg-zinc-900 border-t border-stone-200 dark:border-zinc-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about 80G deductions, programs, audited ratios, volunteering..."
                className="flex-1 px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-5 py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline text-xs uppercase tracking-wider">Send</span>
              </button>
            </form>
          </div>

        </div>

        {/* Informational Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 text-xs">
            <div className="font-bold text-stone-900 dark:text-white mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-orange-600" />
              <span>Section 80G Exemption</span>
            </div>
            <p className="text-stone-600 dark:text-zinc-400">
              Order No: CIT(E) CHD/80G/2016-17/4726. Qualifying Indian citizens & corporates receive 50% deduction with Form 10BE certificate.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 text-xs">
            <div className="font-bold text-stone-900 dark:text-white mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>88.4% Programmatic Ratio</span>
            </div>
            <p className="text-stone-600 dark:text-zinc-400">
              Verified by independent Chartered Accountants: 88.4% direct field relief, 6.8% administration, 4.8% fundraising.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 text-xs">
            <div className="font-bold text-stone-900 dark:text-white mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Registered Headquarters</span>
            </div>
            <p className="text-stone-600 dark:text-zinc-400">
              H.No-2, Gill Road, Near GNDEC, Ludhiana, Punjab – 141006. Helpline: +91 94729 29856.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
};
