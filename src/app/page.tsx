import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import HowItWorksSection from '@/app/components/HowItWorksSection';
import DemoSection from '@/app/components/DemoSection';
import FeaturesSection from '@/app/components/FeaturesSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import PricingSection from '@/app/components/PricingSection';
import FAQSection from '@/app/components/FAQSection';
import CTASection from '@/app/components/CTASection';

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <DemoSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}