'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const adminUploads = [
  { name: 'product-manual-v3.pdf', pages: 48, status: 'indexed', size: '2.1 MB' },
  { name: 'refund-policy-2026.pdf', pages: 6, status: 'indexed', size: '340 KB' },
  { name: 'onboarding-guide.docx', pages: 12, status: 'indexed', size: '890 KB' },
  { name: 'api-reference.md', pages: 32, status: 'processing', size: '1.4 MB' },
];

const demoConversation = [
  { role: 'user', text: 'How do I integrate the API with my React app?' },
  {
    role: 'bot',
    text: 'To integrate with React, install the package via npm: `npm install @docbot/sdk`. Then initialize with your API key and render the `<DocBotWidget />` component. Full code example is in the docs.',
    source: 'api-reference.md · p.14',
    delay: 600,
  },
  { role: 'user', text: 'What happens if I exceed my plan limits?', delay: 1200 },
  {
    role: 'bot',
    text: "You\'ll receive an email alert at 80% usage. Queries above your limit are queued and processed once your cycle resets — no data is lost.",
    source: 'product-manual-v3.pdf · p.22',
    delay: 1800,
  },
];

export default function DemoSection() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          demoConversation.forEach((msg, i) => {
            const delay = (msg as { delay?: number }).delay ?? i * 600;
            setTimeout(() => {
              setVisibleMessages((prev) => prev + 1);
            }, delay);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="py-24 px-6 bg-muted/20 border-t border-border"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">
            Live Preview
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Admin uploads.{' '}
            <span className="text-gradient">Users ask.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light">
            See both sides of DocBot — the simple admin dashboard and the
            seamless user chat experience.
          </p>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Admin Panel */}
          <div className="glass-card rounded-2xl overflow-hidden border border-border">
            {/* Panel header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <Icon name="Cog6ToothIcon" size={14} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">Admin Dashboard — Knowledge Base</span>
              </div>
            </div>

            <div className="p-5">
              {/* Upload zone */}
              <div className="border-2 border-dashed border-primary/20 rounded-xl p-6 flex flex-col items-center gap-3 mb-5 bg-primary/3 hover:border-primary/40 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name="CloudArrowUpIcon" size={20} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">Drop files to upload</p>
                <p className="text-xs text-muted-foreground">PDF, DOCX, TXT, MD, URLs supported</p>
                <button className="text-xs bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-semibold hover:bg-primary/90 transition-colors">
                  Browse Files
                </button>
              </div>

              {/* File list */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Knowledge Base · 4 documents
                </p>
                {adminUploads.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border hover:border-primary/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon name="DocumentTextIcon" size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.pages} pages · {file.size}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                        file.status === 'indexed' ?'bg-primary/10 text-primary' :'bg-yellow-500/10 text-yellow-400'
                      }`}
                    >
                      {file.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Chat Panel */}
          <div className="glass-card rounded-2xl overflow-hidden border border-primary/15">
            {/* Panel header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-primary/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name="ChatBubbleLeftRightIcon" size={15} className="text-primary-foreground" variant="solid" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">DocBot Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">Online · Answers from your docs</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-4 min-h-[300px] flex flex-col justify-end">
              {demoConversation.slice(0, visibleMessages).map((msg, i) => (
                <div
                  key={i}
                  className={`flex chat-bubble-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user' ?'bg-primary text-primary-foreground rounded-tr-sm' :'bg-secondary text-foreground rounded-tl-sm border border-border'
                    }`}
                  >
                    <span className="font-mono text-xs">{msg.text}</span>
                    {(msg as { source?: string }).source && (
                      <div className="mt-2 flex items-center gap-1 text-xs opacity-70">
                        <Icon name="DocumentMagnifyingGlassIcon" size={11} />
                        <span>{(msg as { source?: string }).source}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {visibleMessages < demoConversation.length && visibleMessages > 0 && (
                <div className="flex justify-start">
                  <div className="bg-secondary border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-1" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-2" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-3" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-5 py-3 border-t border-border flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask a question from your documents…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                readOnly
              />
              <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Icon name="PaperAirplaneIcon" size={14} className="text-primary-foreground" variant="solid" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}