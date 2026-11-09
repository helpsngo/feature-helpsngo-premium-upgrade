import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  FileText, 
  HeartHandshake,
  MessageSquare
} from 'lucide-react';
import { TabType } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  modelUsed?: string;
}

interface AJChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (tab: TabType) => void;
}

const QUICK_PROMPTS = [
  'How do I claim 80G tax exemption?',
  'How do I donate via UPI?',
  'Tell me about AABHA child education',
  'How can I volunteer in Punjab?',
  'Corporate CSR co-sponsorship details'
];

export const AJChatbotModal: React.FC<AJChatbotModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: `**Sat Sri Akal & Welcome to HELPS NGO!** 🙏\n\nI am **AJ**, your official verified guide for HELPS Welfare Society (Est. 2016 in Ludhiana, Punjab).\n\nAsk me anything regarding:\n• **Section 80G Tax Exemption** & Form 10BE certificates\n• **Direct Donations** via UPI (\`helpsngo@icici\`) or ICICI Bank wire\n• **AABHA Slum Child Education** & Mobile Medical Clinics\n• **Volunteer Registration** & Weekend Field Drives\n• **Corporate CSR Partnerships** (Form CSR-1 approved)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'Grounded NGO Fact Sheet'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: `aj-${Date.now()}`,
        role: 'assistant',
        text: data.text || 'Thank you for contacting HELPS NGO. Please call +91 94729 29856 for immediate assistance.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('[AJ Chatbot] Request failed:', err);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        text: `I apologize, I am temporarily having trouble contacting the verification server. You can always reach our Managing Director's office directly at **+91 94729 29856** or **info@helpsngo.in**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageText = (text: string) => {
    // Render markdown-like bold and bullet lines nicely
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-xs">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1.5" />;
          
          // Bullet point
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            const cleanContent = line.replace(/^[•\-]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-orange-500 font-bold shrink-0">•</span>
                <span>{renderFormattedInline(cleanContent)}</span>
              </div>
            );
          }

          return <p key={idx}>{renderFormattedInline(line)}</p>;
        })}
      </div>
    );
  };

  const renderFormattedInline = (text: string) => {
    // Basic bold **text** and code `code` formatting
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-gray-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 px-1 py-0.5 rounded font-mono text-[11px]">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Ask AJ AI Guide"
    >
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col h-[85vh] max-h-[640px] overflow-hidden">
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white font-black text-sm">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-orange-700 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                  AJ — AI Guide
                </h2>
                <span className="text-[9px] bg-white/20 font-bold px-2 py-0.5 rounded-full text-orange-100 border border-white/25">
                  Verified NGO Facts
                </span>
              </div>
              <p className="text-[10px] text-orange-100/90 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                <span>HELPS Welfare Society (Est. 2016, Ludhiana)</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 bg-gray-50/70 dark:bg-zinc-950/50">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-2xs">
                    AJ
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-xs ${
                    isUser
                      ? 'bg-orange-600 text-white rounded-tr-none font-medium'
                      : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 border border-gray-200 dark:border-zinc-700/80 rounded-tl-none'
                  }`}
                >
                  {isUser ? (
                    <p className="leading-relaxed">{msg.text}</p>
                  ) : (
                    formatMessageText(msg.text)
                  )}

                  <div className="mt-1.5 pt-1 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[9px] opacity-75">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <span className="flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Source Grounded</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                AJ
              </div>
              <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700/80 rounded-2xl rounded-tl-none p-3 shadow-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">
                  Consulting verified HELPS NGO records...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3.5 pt-2 pb-1 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-bold uppercase text-gray-400 shrink-0">Suggestions:</span>
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-[10px] font-semibold bg-orange-50 dark:bg-zinc-800 hover:bg-orange-100 dark:hover:bg-zinc-700 text-orange-700 dark:text-orange-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-orange-200/80 dark:border-zinc-700 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Quick Navigation Footer Actions */}
        <div className="px-3.5 py-1.5 bg-gray-50 dark:bg-zinc-900/80 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] shrink-0">
          <span className="text-gray-500 dark:text-gray-400 text-[10px]">Direct Actions:</span>
          <div className="flex items-center gap-2">
            {onNavigate && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('donate');
                  }}
                  className="text-orange-600 dark:text-orange-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HeartHandshake className="w-3 h-3" />
                  <span>Donate ₹</span>
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('volunteer');
                  }}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Volunteer</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Input bar */}
        <div className="p-3 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about 80G tax rules, donations, schools, or volunteering..."
              disabled={isLoading}
              className="flex-1 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-xs rounded-2xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all disabled:opacity-50"
              aria-label="Message to AJ AI Guide"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="w-9 h-9 rounded-2xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[9px] text-gray-400 dark:text-zinc-500 mt-1.5 px-1">
            <span>Official AI Assistant for HELPS Welfare Society</span>
            <span>Helpline: +91 94729 29856</span>
          </div>
        </div>
      </div>
    </div>
  );
};
