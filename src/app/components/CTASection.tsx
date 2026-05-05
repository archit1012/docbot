'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && contentRef.current) {
          contentRef.current.classList.add('is-visible');
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div
          ref={contentRef}
          className="reveal-up relative overflow-hidden rounded-3xl px-8 py-20 text-center"
          style={{
            background: 'linear-gradient(135deg, #0D1117 0%, #0f1e2e 50%, #0D1117 100%)',
            border: '1px solid rgba(45, 212, 191, 0.15)',
          }}
        >
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(45, 212, 191, 0.12) 0%, transparent 70%)',
            }}
          />

          {/* Floating icons */}
          <div className="hidden lg:block absolute top-12 left-12 opacity-10 animate-float">
            <Icon name="DocumentTextIcon" size={48} className="text-primary" />
          </div>
          <div className="hidden lg:block absolute bottom-12 right-12 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
            <Icon name="ChatBubbleLeftRightIcon" size={56} className="text-primary" />
          </div>
          <div className="hidden lg:block absolute top-16 right-24 opacity-8 animate-float" style={{ animationDelay: '4s' }}>
            <Icon name="SparklesIcon" size={36} className="text-accent" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              No credit card required
            </div>

            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
              Your docs deserve{' '}
              <span className="text-gradient">better than search.</span>
            </h2>

            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-10 max-w-xl mx-auto">
              Join 75,000+ users who stopped making their customers dig through
              PDFs and started giving them instant, accurate answers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link
                href="#"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-base px-10 py-4 rounded-full hover:bg-primary/90 hover:scale-105 transition-all duration-200 teal-glow"
              >
                Build Your First Bot Free
                <Icon name="ArrowRightIcon" size={18} />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 border border-border text-foreground font-semibold text-base px-10 py-4 rounded-full hover:border-primary/40 hover:bg-muted/50 transition-all duration-200"
              >
                Book a Demo
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-10 border-t border-border/50">
              {[
                { val: '75k+', label: 'Active Users' },
                { val: '3,000+', label: 'Bots Deployed' },
                { val: '4.9 / 5', label: 'App Store Rating' },
                { val: '24 / 7', label: 'Support' },
              ]?.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-black text-foreground">{s?.val}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{s?.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}