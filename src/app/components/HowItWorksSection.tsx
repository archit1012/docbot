'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    number: '01',
    icon: 'CloudArrowUpIcon' as const,
    title: 'Upload Your Documents',
    description:
      'Drag and drop PDFs, Word docs, text files, or paste URLs. DocBot ingests your content and builds a searchable knowledge index automatically.',
    detail: 'Supports PDF, DOCX, TXT, MD, URLs, Notion, Confluence',
    color: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    number: '02',
    icon: 'AdjustmentsHorizontalIcon' as const,
    title: 'Configure Context & Behavior',
    description:
      "Set your bot's name, persona, and instructions. Define what topics it covers, its tone, and fallback responses when questions go out of scope.",
    detail: 'Custom prompts · Fallback messages · Topic guardrails',
    color: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-400',
  },
  {
    number: '03',
    icon: 'RocketLaunchIcon' as const,
    title: 'Deploy Anywhere in Minutes',
    description:
      'Embed a chat widget on your site, share a public link, or connect via API. Your users get instant, source-cited answers from your docs.',
    detail: 'Web widget · Slack · API · Shareable link',
    color: 'from-accent/20 to-accent/5',
    iconColor: 'text-accent',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 px-6 border-t border-border"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          ref={(el) => { itemRefs.current[0] = el; }}
          className="reveal-up mb-16 max-w-2xl"
        >
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            From upload to deployed
            <br />
            <span className="text-gradient">in three steps.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            No coding, no ML expertise, no infrastructure headaches. Just your
            documents and a chatbot ready to answer questions.
          </p>
        </div>

        {/* Steps — asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { itemRefs.current[i + 1] = el; }}
              className={`reveal-up stagger-${i + 1} glass-card rounded-2xl p-8 bento-hover relative overflow-hidden`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-40 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-black text-border leading-none select-none">
                    {step.number}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center border border-white/10`}
                  >
                    <Icon name={step.icon} size={22} className={step.iconColor} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {step.description}
                </p>

                {/* Detail pill */}
                <div className="flex flex-wrap gap-1.5">
                  {step.detail.split(' · ').map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connector line (desktop only) */}
        <div className="hidden lg:flex items-center justify-center mt-8 gap-0">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="mx-4 flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <Icon name="CheckCircleIcon" size={16} className="text-primary" variant="solid" />
            Average setup time: 4 minutes 38 seconds
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}