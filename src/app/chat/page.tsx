'use client';

import React, { useState, useRef, useEffect } from 'react';

import Icon from '@/components/ui/AppIcon';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface Document {
  id: string;
  name: string;
  pages: number;
  icon: string;
}

const documents: Document[] = [
  { id: 'all', name: 'All Documents', pages: 0, icon: 'DocumentDuplicateIcon' },
  { id: 'doc1', name: 'Product Manual v2.4', pages: 48, icon: 'DocumentTextIcon' },
  { id: 'doc2', name: 'API Reference Guide', pages: 120, icon: 'CodeBracketIcon' },
  { id: 'doc3', name: 'Onboarding Handbook', pages: 32, icon: 'BookOpenIcon' },
  { id: 'doc4', name: 'Privacy Policy 2025', pages: 14, icon: 'ShieldCheckIcon' },
  { id: 'doc5', name: 'Release Notes Q1', pages: 8, icon: 'ClipboardDocumentListIcon' },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    text: 'Hi! I\'m DocBot. Select a document from the dropdown above and ask me anything about it.',
    timestamp: '10:00 AM',
  },
];

const suggestedQuestions = [
  'What are the key features?',
  'How do I get started?',
  'What are the pricing plans?',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<Document>(documents[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const mockResponses: Record<string, string> = {
    default: "Based on the selected document, I found relevant information. The document covers this topic in detail across multiple sections. Would you like me to provide a more specific answer or explore a related topic?",
    features: "The document outlines several key features including automated processing, real-time analytics, seamless integrations with popular tools, and enterprise-grade security with SOC 2 compliance.",
    started: "To get started: 1) Create your account, 2) Upload your documents, 3) Configure your chatbot settings, and 4) Embed the widget on your platform. The whole setup takes under 10 minutes.",
    pricing: "There are three plans available: Starter (free, up to 3 docs), Pro ($49/mo, unlimited docs + analytics), and Enterprise (custom pricing with dedicated support and SLA guarantees).",
  };

  const getResponse = (question: string): string => {
    const q = question.toLowerCase();
    if (q.includes('feature') || q.includes('key')) return mockResponses.features;
    if (q.includes('start') || q.includes('begin') || q.includes('setup')) return mockResponses.started;
    if (q.includes('pric') || q.includes('plan') || q.includes('cost')) return mockResponses.pricing;
    return mockResponses.default;
  };

  const handleSend = (text?: string) => {
    const question = text || inputValue.trim();
    if (!question) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: question,
      timestamp: getTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        text: getResponse(question),
        timestamp: getTimeString(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDocSelect = (doc: Document) => {
    setSelectedDoc(doc);
    setDropdownOpen(false);
    const switchMsg: Message = {
      id: Date.now(),
      role: 'assistant',
      text: doc.id === 'all' ?'Searching across all documents. Ask me anything!'
        : `Switched to "${doc.name}". I'm ready to answer questions about this document.`,
      timestamp: getTimeString(),
    };
    setMessages((prev) => [...prev, switchMsg]);
  };

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      {/* Mobile Phone Frame */}
      <div className="relative w-full max-w-[390px] mx-auto">
        {/* Phone outer shell */}
        <div
          className="relative rounded-[44px] overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #1a2535 0%, #0d1117 100%)',
            border: '2px solid rgba(45,212,191,0.18)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(45,212,191,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-8 pt-4 pb-2 bg-[#0D1117]">
            <span className="text-xs font-semibold text-foreground/80">9:41</span>
            <div className="w-24 h-6 rounded-full bg-[#0D1117] border border-border/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-foreground/30 mr-1" />
              <div className="w-10 h-1.5 rounded-full bg-foreground/20" />
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="SignalIcon" size={14} className="text-foreground/70" />
              <Icon name="WifiIcon" size={14} className="text-foreground/70" />
              <div className="w-6 h-3 rounded-sm border border-foreground/40 flex items-center px-0.5">
                <div className="w-3.5 h-1.5 rounded-sm bg-primary" />
              </div>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-[#0D1117] border-b border-border/50 px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center teal-glow">
                  <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-primary-foreground" variant="solid" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">DocBot</p>
                  <p className="text-[10px] text-primary mt-0.5">● Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-secondary/60 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Icon name="MagnifyingGlassIcon" size={15} className="text-muted-foreground" />
                </button>
                <button className="w-8 h-8 rounded-full bg-secondary/60 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Icon name="EllipsisVerticalIcon" size={15} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Document Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between gap-2 bg-secondary/50 border border-border/60 rounded-2xl px-3.5 py-2.5 hover:border-primary/40 transition-all duration-200"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Icon name={selectedDoc.icon as any} size={13} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground truncate">{selectedDoc.name}</span>
                  {selectedDoc.pages > 0 && (
                    <span className="text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded-full flex-shrink-0">
                      {selectedDoc.pages}p
                    </span>
                  )}
                </div>
                <Icon
                  name="ChevronDownIcon"
                  size={14}
                  className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-1.5 rounded-2xl border border-border/60 overflow-hidden z-50"
                  style={{
                    background: 'rgba(19,28,39,0.98)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="p-1.5">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1.5">
                      Select Document
                    </p>
                    {documents.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => handleDocSelect(doc)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left ${
                          selectedDoc.id === doc.id
                            ? 'bg-primary/15 text-foreground'
                            : 'hover:bg-secondary/60 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedDoc.id === doc.id ? 'bg-primary/20' : 'bg-muted/50'
                        }`}>
                          <Icon name={doc.icon as any} size={14} className={selectedDoc.id === doc.id ? 'text-primary' : 'text-muted-foreground'} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{doc.name}</p>
                          {doc.pages > 0 && (
                            <p className="text-[10px] text-muted-foreground">{doc.pages} pages</p>
                          )}
                        </div>
                        {selectedDoc.id === doc.id && (
                          <Icon name="CheckIcon" size={14} className="text-primary flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div
            className="overflow-y-auto px-4 py-4 space-y-4"
            style={{ height: '420px', background: 'var(--background)' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="SparklesIcon" size={13} className="text-primary-foreground" variant="solid" />
                  </div>
                )}
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-secondary border border-border/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="UserIcon" size={13} className="text-muted-foreground" />
                  </div>
                )}

                <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed chat-bubble-in ${
                      msg.role === 'user' ?'bg-primary text-primary-foreground rounded-tr-sm' :'bg-card border border-border/50 text-foreground rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground px-1">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-end">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Icon name="SparklesIcon" size={13} className="text-primary-foreground" variant="solid" />
                </div>
                <div className="bg-card border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing-1" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing-2" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing-3" />
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions (only at start) */}
            {messages.length <= 2 && !isTyping && (
              <div className="space-y-2 pt-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                  Suggested Questions
                </p>
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-xs text-primary bg-primary/8 border border-primary/20 rounded-xl px-3.5 py-2.5 hover:bg-primary/15 hover:border-primary/40 transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className="border-t border-border/50 px-3 py-3"
            style={{ background: 'var(--background)' }}
          >
            <div className="flex items-end gap-2">
              <button className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center flex-shrink-0 hover:bg-secondary transition-colors mb-0.5">
                <Icon name="PaperClipIcon" size={16} className="text-muted-foreground" />
              </button>

              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about the document…"
                  rows={1}
                  className="w-full bg-secondary/50 border border-border/60 rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 leading-relaxed"
                  style={{ maxHeight: '100px', minHeight: '40px' }}
                />
              </div>

              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5 transition-all duration-200 ${
                  inputValue.trim()
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 teal-glow'
                    : 'bg-secondary/40 text-muted-foreground cursor-not-allowed'
                }`}
              >
                <Icon name="PaperAirplaneIcon" size={16} variant="solid" />
              </button>
            </div>

            {/* Bottom hint */}
            <p className="text-center text-[10px] text-muted-foreground mt-2">
              Powered by <span className="text-primary font-medium">DocBot AI</span>
            </p>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center pb-2 pt-1 bg-[#0D1117]">
            <div className="w-28 h-1 rounded-full bg-foreground/20" />
          </div>
        </div>

        {/* Decorative glow behind phone */}
        <div
          className="absolute inset-0 -z-10 rounded-[44px] blur-3xl opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, #2DD4BF 0%, transparent 70%)' }}
        />
      </div>
    </div>
  );
}
