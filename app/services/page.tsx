"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { ServicesOverview } from "@/components/sections/services/services-overview";
import { ServicesFeatures } from "@/components/sections/services/services-features";
import { ServicesProcess } from "@/components/sections/services/services-process";
import { CtaSection } from "@/components/sections/cta-section";

export default function Services() {
  return (
    <div className="relative">
      {/* Background particle effect */}
      <ParticleField 
        className="fixed inset-0 -z-10"
        particleCount={100}
        particleSize={1}
        particleColor="#6366f1"
        particleSpeed={0.3}
        connectionRadius={150}
        connectionOpacity={0.05}
      />

      {/* Header */}
      <Header />
      
      {/* Main content sections */}
      <main>
        <ServicesHero />
        <ServicesOverview />
        <ServicesFeatures />
        <ServicesProcess />
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 