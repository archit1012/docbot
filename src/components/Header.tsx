'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Demo', href: '#demo' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center teal-glow">
            <Icon name="ChatBubbleLeftRightIcon" size={18} className="text-primary-foreground" variant="solid" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Doc<span className="text-gradient">Bot</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks?.map((link) => (
            <Link
              key={link?.label}
              href={link?.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link?.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/chat"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Try Chat
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Log in
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          >
            Try Free
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <Icon name="XMarkIcon" size={24} />
          ) : (
            <Icon name="Bars3Icon" size={24} />
          )}
        </button>
      </div>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] z-40 bg-background/95 backdrop-blur-xl flex flex-col px-6 pt-8 pb-10 gap-2">
          {navLinks?.map((link) => (
            <Link
              key={link?.label}
              href={link?.href}
              onClick={handleLinkClick}
              className="text-lg font-medium text-foreground py-3 border-b border-border hover:text-primary transition-colors"
            >
              {link?.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="#"
              onClick={handleLinkClick}
              className="text-center text-sm font-medium text-muted-foreground border border-border rounded-full py-3 hover:border-primary/50 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="#"
              onClick={handleLinkClick}
              className="text-center bg-primary text-primary-foreground text-sm font-semibold py-3 rounded-full hover:bg-primary/90 transition-colors"
            >
              Try Free — No Credit Card
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}