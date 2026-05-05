'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const faqs = [
  {
    q: 'What file formats does DocBot support?',
    a: 'DocBot supports PDF, DOCX, TXT, Markdown (.md), CSV, and public URLs (web pages, Notion, Confluence, GitHub READMEs). More integrations are added regularly.',
  },
  {
    q: "How does DocBot avoid hallucinating answers?",
    a: "DocBot uses retrieval-augmented generation (RAG) — it only generates answers from content found in your uploaded documents. If no relevant content exists, it tells the user it doesn't know rather than inventing an answer.",
  },
  {
    q: 'Can I customize the chatbot\'s personality and tone?',
    a: 'Yes. In the admin dashboard you can set a custom system prompt, define the bot name, choose a tone (professional, friendly, concise), set topic boundaries, and write a custom fallback message.',
  },
  {
    q: 'How do I embed DocBot on my website?',
    a: 'Copy a single JavaScript snippet from your dashboard and paste it into your HTML. The widget appears as a floating chat button. You can also use an iframe embed or our React SDK component.',
  },
  {
    q: 'Is my data secure and private?',
    a: 'All documents are encrypted at rest (AES-256) and in transit (TLS 1.3). We do not train our models on your data. Growth and Scale plans include SOC 2 Type II compliance reports on request.',
  },
  {
    q: 'What happens when I hit my query limit?',
    a: 'You receive an email alert at 80% usage. When the limit is reached, users see a polite message that the bot is temporarily unavailable. No data is lost. You can upgrade mid-cycle at any time.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );
    itemRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 px-6 bg-muted/10 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-8">
            <div
              ref={(el) => { itemRefs.current[0] = el; }}
              className="reveal-up"
            >
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Frequently
                <br />
                <span className="text-gradient">asked questions.</span>
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed">
                Everything you need to know before you start building. Still
                have questions? Our team replies within a few hours.
              </p>
            </div>

            {/* Contact card */}
            <div
              ref={(el) => { itemRefs.current[1] = el; }}
              className="reveal-up stagger-2 glass-card rounded-2xl p-7 border border-border"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="ChatBubbleLeftEllipsisIcon" size={22} className="text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Still have questions?</p>
                  <p className="text-xs text-muted-foreground">We respond within 4 hours</p>
                </div>
              </div>
              <Link
                href="#"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-muted border border-border text-foreground text-sm font-semibold hover:border-primary/40 transition-colors"
              >
                <span>Chat with Support</span>
                <Icon name="ArrowRightIcon" size={14} />
              </Link>
            </div>
          </div>

          {/* Right — Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i + 2] = el; }}
                className={`reveal-up stagger-${Math.min(i + 1, 6)} glass-card rounded-2xl border transition-all duration-300 ${
                  openIndex === i ? 'border-primary/30' : 'border-border hover:border-border/80'
                }`}
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="text-base font-semibold text-foreground pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openIndex === i
                        ? 'bg-primary border-primary text-primary-foreground rotate-180'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    <Icon name="ChevronDownIcon" size={16} />
                  </div>
                </button>

                <div
                  ref={(el) => { contentRefs.current[i] = el; }}
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: openIndex === i ? `${contentRefs.current[i]?.scrollHeight ?? 200}px` : '0px',
                  }}
                >
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}