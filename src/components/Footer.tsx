import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Changelog', href: '#' },
];

const companyLinks = [
  { label: 'About', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Careers', href: '#' },
];

const legalLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Security', href: '#' },
];

const socialLinks = [
  { icon: 'ChatBubbleLeftEllipsisIcon' as const, href: '#', label: 'Twitter' },
  { icon: 'CodeBracketIcon' as const, href: '#', label: 'GitHub' },
  { icon: 'LinkIcon' as const, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top row — link groups */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="flex items-center gap-2.5 self-start">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="ChatBubbleLeftRightIcon" size={14} className="text-primary-foreground" variant="solid" />
            </div>
            <span className="text-base font-bold text-foreground">
              Doc<span className="text-gradient">Bot</span>
            </span>
          </div>

          {/* Link groups — no headers, spacing creates grouping */}
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <div className="flex gap-8">
              {productLinks.map((l) => (
                <Link key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-8">
              {companyLinks.map((l) => (
                <Link key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-8">
              {legalLinks.map((l) => (
                <Link key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">© 2026 DocBot. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
              >
                <Icon name={s.icon} size={15} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}