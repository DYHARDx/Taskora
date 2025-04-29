'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-background text-text">
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
} 