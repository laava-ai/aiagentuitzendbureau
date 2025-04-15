"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { ServicesOverview } from "@/components/sections/services/services-overview";
import { ServicesFeatures } from "@/components/sections/services/services-features";
import { ServicesProcess } from "@/components/sections/services/services-process";
import { CtaSection } from "@/components/sections/cta-section";
import { useMobileOptimizer } from "@/components/ui/mobile-optimizer";

export default function Services() {
  const { isMobile, isLowEndDevice, disableAllAnimations } = useMobileOptimizer();
  
  // Only show particles on desktop
  const showParticles = !disableAllAnimations;
  
  return (
    <div className="relative">
      {/* Background particle effect - only on desktop */}
      {showParticles && (
        <ParticleField 
          className="fixed inset-0 -z-10"
          particleCount={isMobile ? 50 : 100}
          particleSize={isMobile ? 1 : 1.5}
          particleColor="#6366f1"
          particleSpeed={isMobile ? 0.15 : 0.3}
          connectionRadius={isMobile ? 100 : 150}
          connectionOpacity={isMobile ? 0.03 : 0.05}
        />
      )}
      
      {/* Background color for mobile when animations are disabled */}
      {!showParticles && (
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#080F26] to-[#0A0F2C]" />
      )}

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