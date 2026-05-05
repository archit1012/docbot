'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for individuals and small projects.',
    features: [
      '1 chatbot',
      '50 queries / month',
      '5 documents (up to 10 MB)',
      'Web widget embed',
      'Basic analytics',
      'Community support',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: { monthly: 49, annual: 39 },
    description: 'For growing teams that need more power.',
    features: [
      '5 chatbots',
      '5,000 queries / month',
      '100 documents (up to 500 MB)',
      'Web widget + API access',
      'Full analytics dashboard',
      'Custom branding',
      'Slack integration',
      'Email support (< 24h)',
    ],
    cta: 'Start 14-Day Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Scale',
    price: { monthly: 149, annual: 119 },
    description: 'For high-volume teams and enterprises.',
    features: [
      'Unlimited chatbots',
      '50,000 queries / month',
      'Unlimited documents',
      'REST API + all SDKs',
      'SSO & RBAC',
      'SOC 2 compliance',
      'Dedicated Slack channel',
      'SLA guarantee',
    ],
    cta: 'Start 14-Day Trial',
    highlighted: false,
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
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

  return (
    <section id="pricing" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          ref={(el) => { itemRefs.current[0] = el; }}
          className="reveal-up text-center mb-12"
        >
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Simple, transparent pricing.
            <br />
            <span className="text-gradient">No surprises.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light mb-8">
            Start free. Upgrade when you need to. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-muted rounded-full p-1 border border-border">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                !annual ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                annual ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              ref={(el) => { itemRefs.current[i + 1] = el; }}
              className={`reveal-up stagger-${i + 1} relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-primary/10 border-2 border-primary teal-glow' :'glass-card border border-border'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-foreground">
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-muted-foreground text-sm mb-2">/month</span>
                  )}
                </div>
                {annual && plan.price.monthly > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Billed ${(annual ? plan.price.annual : plan.price.monthly) * 12}/year
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Icon
                      name="CheckIcon"
                      size={16}
                      className={`flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-primary' : 'text-accent'}`}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#"
                className={`text-center py-3.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105'
                    : 'border border-border text-foreground hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          No credit card required for Starter. 14-day money-back guarantee on paid plans.
        </p>
      </div>
    </section>
  );
}