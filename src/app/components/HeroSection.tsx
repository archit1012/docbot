'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const chatMessages = [
  { role: 'user', text: 'What is the refund policy?' },
  {
    role: 'bot',
    text: 'Based on your uploaded policy doc: full refunds within 30 days of purchase. No questions asked.',
    source: 'policy-2026.pdf',
  },
  { role: 'user', text: 'How do I reset my password?' },
  {
    role: 'bot',
    text: 'Go to Settings → Security → Reset Password. A link will be sent to your registered email.',
    source: 'user-guide.pdf',
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [headingRef?.current, subRef?.current, ctaRef?.current, cardRef?.current, scrollRef?.current];
    const delays = [0, 150, 300, 500, 700];

    elements?.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delays?.[i]);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6 mesh-bg overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated gradient orbs */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #2DD4BF 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'floatY 8s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-8"
        style={{
          background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'floatY 10s ease-in-out infinite reverse',
        }}
      />
      {/* Badge */}
      <div
        ref={headingRef}
        className="mb-6"
        style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Now in public beta — free to start
        </span>
      </div>
      {/* Headline */}
      <h1
        className="text-center max-w-4xl text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
        style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
        ref={subRef}
      >
        Your Docs.{' '}
        <span className="text-gradient">Instant Answers.</span>
        <br />
        Zero Hallucinations.
      </h1>
      {/* Sub */}
      <p
        ref={ctaRef}
        className="text-center max-w-2xl text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-10"
        style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
      >
        Upload your documents, set context, and deploy an AI chatbot that answers
        questions grounded in your actual content — in under 5 minutes.
      </p>
      {/* CTAs */}
      <div
        className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
        ref={cardRef}
      >
        <Link
          href="#"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-8 py-4 rounded-full hover:bg-primary/90 hover:scale-105 transition-all duration-200 teal-glow"
        >
          Start for Free
          <Icon name="ArrowRightIcon" size={16} />
        </Link>
        <Link
          href="#demo"
          className="inline-flex items-center gap-2 border border-border text-foreground font-semibold text-sm px-8 py-4 rounded-full hover:border-primary/40 hover:bg-muted/50 transition-all duration-200"
        >
          <Icon name="PlayIcon" size={16} className="text-primary" variant="solid" />
          See Live Demo
        </Link>
      </div>
      {/* Stats bar */}
      <div
        className="flex flex-wrap items-center justify-center gap-8 mb-16 text-sm text-muted-foreground"
        style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
        ref={scrollRef}
      >
        {[
          { val: '75k+', label: 'Users' },
          { val: '3,000+', label: 'Bots Deployed' },
          { val: '4.9★', label: 'Avg Rating' },
          { val: '<5 min', label: 'Setup Time' },
        ]?.map((s) => (
          <div key={s?.label} className="flex items-center gap-2">
            <span className="font-bold text-foreground text-base">{s?.val}</span>
            <span>{s?.label}</span>
          </div>
        ))}
      </div>
      {/* Floating Chat UI Card */}
      <div className="w-full max-w-lg animate-float">
        <div className="glass-card rounded-2xl overflow-hidden border border-primary/10 shadow-2xl">
          {/* Card header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="ChatBubbleLeftRightIcon" size={14} className="text-primary-foreground" variant="solid" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">DocBot Assistant</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                <span className="text-xs text-muted-foreground">Trained on 4 documents</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="px-5 py-4 space-y-4 max-h-64 overflow-y-auto">
            {chatMessages?.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg?.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg?.role === 'user' ?'bg-primary text-primary-foreground rounded-tr-sm' :'bg-secondary text-foreground rounded-tl-sm'
                  }`}
                >
                  {msg?.text}
                  {msg?.source && (
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="DocumentTextIcon" size={11} />
                      <span>{msg?.source}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            <div className="flex justify-start">
              <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-3" />
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="px-5 py-3 border-t border-border flex items-center gap-3">
            <input
              type="text"
              placeholder="Ask anything from your docs…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              readOnly
            />
            <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Icon name="PaperAirplaneIcon" size={14} className="text-primary-foreground" variant="solid" />
            </button>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground opacity-60">Scroll</span>
        <div className="w-px h-10 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-primary animate-scroll-line" style={{ height: '40%' }} />
        </div>
      </div>
    </section>
  );
}