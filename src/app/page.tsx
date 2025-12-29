import React, { Suspense } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-[#f4f4f4] overflow-x-hidden">
      <Header />

      <div className="flex flex-col gap-[100px] w-full max-w-[1440px] items-center">
        <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Loading...</div>}>
          <Hero />
        </Suspense>
        <Features />
        <HowItWorks />
      </div>

      <Footer />
    </main>
  );
}
