'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

// BENTO GRID AUDIT
// Array has 6 cards: [AccurateSources, MultiDocument, InstantDeploy, AdminDashboard, CustomBranding, APIAccess]
// Desktop grid-cols-3:
// Row 1: [col-1 cs-2: AccurateSources] [col-3 cs-1: MultiDocument]
// Row 2: [col-1 cs-1: InstantDeploy] [col-2 cs-1: AdminDashboard] [col-3 cs-1: CustomBranding]
// Row 3: [col-1 cs-3: APIAccess]
// Placed 6/6 cards ✓

const features = [
  {
    id: 'accurate-sources',
    colSpan: 'lg:col-span-2',
    icon: 'ShieldCheckIcon' as const,
    iconColor: 'text-primary',
    label: 'Grounded Accuracy',
    title: 'Every answer cites its source.',
    description:
      'DocBot never invents facts. Every response includes a direct citation — filename and page number — so users can verify answers instantly. No hallucinations, no guesswork.',
    stat: '99.2%',
    statLabel: 'Answer accuracy rate',
    accent: 'from-primary/15 to-transparent',
    tall: false,
  },
  {
    id: 'multi-document',
    colSpan: 'lg:col-span-1',
    icon: 'FolderOpenIcon' as const,
    iconColor: 'text-blue-400',
    label: 'Multi-Document',
    title: 'Query across your entire library.',
    description:
      'Upload dozens of files. DocBot searches across all of them simultaneously and synthesizes a single coherent answer.',
    accent: 'from-blue-500/10 to-transparent',
    tall: false,
  },
  {
    id: 'instant-deploy',
    colSpan: 'lg:col-span-1',
    icon: 'BoltIcon' as const,
    iconColor: 'text-yellow-400',
    label: 'Instant Deploy',
    title: 'Live in minutes.',
    description:
      'One embed snippet. Your chatbot appears on any website, help center, or internal tool without touching your backend.',
    accent: 'from-yellow-500/10 to-transparent',
    tall: false,
  },
  {
    id: 'admin-dashboard',
    colSpan: 'lg:col-span-1',
    icon: 'ChartBarIcon' as const,
    iconColor: 'text-accent',
    label: 'Admin Dashboard',
    title: 'See what users are asking.',
    description:
      'Full analytics on queries, unanswered questions, and engagement. Use insights to improve your docs and fill knowledge gaps.',
    accent: 'from-accent/10 to-transparent',
    tall: false,
  },
  {
    id: 'custom-branding',
    colSpan: 'lg:col-span-1',
    icon: 'PaintBrushIcon' as const,
    iconColor: 'text-pink-400',
    label: 'Custom Branding',
    title: 'Your brand, not ours.',
    description:
      'Set your logo, colors, bot name, and welcome message. The widget looks native to your product.',
    accent: 'from-pink-500/10 to-transparent',
    tall: false,
  },
  {
    id: 'api-access',
    colSpan: 'lg:col-span-3',
    icon: 'CodeBracketIcon' as const,
    iconColor: 'text-primary',
    label: 'API & Integrations',
    title: 'Connect to anything via REST API.',
    description:
      'Full REST API with SDKs for JavaScript, Python, and Go. Connect DocBot to Slack, Notion, Intercom, Zendesk, or any custom workflow. Webhooks for real-time events.',
    badges: ['REST API', 'JavaScript SDK', 'Python SDK', 'Slack', 'Notion', 'Zendesk', 'Webhooks'],
    accent: 'from-primary/10 via-blue-500/5 to-transparent',
    wide: true,
    tall: false,
  },
];

export default function FeaturesSection() {
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
      { threshold: 0.1 }
    );
    itemRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          ref={(el) => { itemRefs.current[0] = el; }}
          className="reveal-up mb-14 text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Built for trust.
            <br />
            <span className="text-gradient">Designed for speed.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Everything you need to turn static documents into a dynamic,
            always-accurate knowledge layer for your users.
          </p>
        </div>

        {/* Bento Grid */}
        {/* Row 1: AccurateSources (cs-2) | MultiDocument (cs-1) */}
        {/* Row 2: InstantDeploy (cs-1) | AdminDashboard (cs-1) | CustomBranding (cs-1) */}
        {/* Row 3: APIAccess (cs-3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {features.map((feat, i) => (
            <div
              key={feat.id}
              ref={(el) => { itemRefs.current[i + 1] = el; }}
              className={`reveal-up stagger-${Math.min(i + 1, 6)} ${feat.colSpan} glass-card rounded-2xl p-7 bento-hover relative overflow-hidden`}
            >
              {/* BG accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.accent} pointer-events-none`} />

              <div className="relative z-10">
                {/* Icon + label */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center border border-border">
                    <Icon name={feat.icon} size={20} className={feat.iconColor} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {feat.label}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {feat.description}
                </p>

                {/* Stat */}
                {feat.stat && (
                  <div className="mt-4 pt-4 border-t border-border flex items-end gap-2">
                    <span className="text-4xl font-black text-primary">{feat.stat}</span>
                    <span className="text-xs text-muted-foreground pb-1">{feat.statLabel}</span>
                  </div>
                )}

                {/* Badges for API card */}
                {feat.badges && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {feat.badges.map((b) => (
                      <span
                        key={b}
                        className="text-xs px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground font-medium"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}