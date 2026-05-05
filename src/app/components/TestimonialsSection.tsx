'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  quote:
  "We cut support ticket volume by 41% in the first month. Our users get answers at 2 AM without waiting for a human. DocBot paid for itself in week two.",
  name: 'Sarah Okonkwo',
  role: 'Head of Customer Success',
  company: 'Veridian SaaS',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fca82876-1763294352035.png",
  alt: 'Professional woman with natural hair smiling confidently, bright office background',
  stars: 5
},
{
  quote:
  "Our DevRel team was drowning in the same docs questions on Discord. Now DocBot handles them. Engineers actually read the docs because they can ask questions inline.",
  name: 'Marcus Chen',
  role: 'Developer Relations Lead',
  company: 'Axiom Cloud',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd00268c-1763296028848.png",
  alt: 'Young Asian man in casual shirt, clean background, friendly expression',
  stars: 5
},
{
  quote:
  "The source citations are the killer feature. Our legal team was skeptical of AI until they saw every answer linked back to the exact policy document and page.",
  name: 'Priya Nambiar',
  role: 'VP of Operations',
  company: 'Clearfield Legal',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_175bc78da-1763297795096.png",
  alt: 'South Asian woman in professional attire, confident expression, neutral background',
  stars: 5
}];


export default function TestimonialsSection() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15 }
    );
    itemRefs.current.forEach((el) => {if (el) observer.observe(el);});
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 bg-muted/10 border-t border-border">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          ref={(el) => {itemRefs.current[0] = el;}}
          className="reveal-up text-center mb-14">
          
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">
            Social Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Teams that shipped faster
            <br />
            <span className="text-gradient">after switching to DocBot.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) =>
          <div
            key={t.name}
            ref={(el) => {itemRefs.current[i + 1] = el;}}
            className={`reveal-up stagger-${i + 1} glass-card rounded-2xl p-8 bento-hover flex flex-col justify-between`}>
            
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, si) =>
              <svg key={si} className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
              )}
              </div>

              {/* Quote */}
              <p className="text-base text-foreground leading-relaxed mb-6 flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-4 pt-5 border-t border-border">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                  <AppImage
                  src={t.avatar}
                  alt={t.alt}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                  <p className="text-xs text-primary font-semibold">{t.company}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}