"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { useMobileOptimizer } from "@/components/ui/mobile-optimizer";
import Script from "next/script";

export default function Home() {
  const { isMobile, isLowEndDevice, disableAllAnimations } = useMobileOptimizer();
  
  // Only show particles on desktop
  const showParticles = !disableAllAnimations;
  
  // If showing particles, calculate optimal settings based on device
  const particleCount = isMobile 
    ? (isLowEndDevice ? 15 : 30)
    : 100;
    
  const connectionRadius = isMobile 
    ? (isLowEndDevice ? 80 : 120)
    : 150;
    
  const particleSpeed = isMobile ? 0.15 : 0.3;
  
  return (
    <div className="relative">
      {/* JSON-LD Structured Data */}
      <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Laava",
            "url": "https://laava.nl",
            "logo": "https://laava.nl/logo.png",
            "sameAs": [
              "https://twitter.com/LaavaAI",
              "https://www.linkedin.com/company/laava-ai",
              "https://www.facebook.com/LaavaAI"
            ],
            "description": "Laava ontwikkelt geavanceerde AI-agents die als digitale collega's naadloos samenwerken met uw team. Onze intelligente computer collega's automatiseren complexe taken en verhogen de productiviteit.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Utrecht",
              "addressRegion": "NH",
              "postalCode": "3526 WP",
              "addressCountry": "NL"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+31-20-123-4567",
              "contactType": "customer service",
              "email": "info@laava.nl",
              "availableLanguage": ["Dutch"]
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://laava.nl/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://laava.nl"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "AI Agents Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Intelligente AI Agents",
                    "description": "Intelligente AI-assistenten die uw team versterken en complexe taken automatiseren."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digitale Collega's",
                    "description": "Digitale collega's die naadloos integreren in uw organisatie en dagelijkse taken optimaliseren."
                  }
                }
              ]
            }
          }
        `}
      </Script>

      {/* Background particle effect - only on desktop */}
      {showParticles && (
        <ParticleField 
          className="fixed inset-0 -z-10"
          particleCount={particleCount}
          particleSize={isMobile ? 1 : 1.5}
          particleColor="#6366f1"
          particleSpeed={particleSpeed}
          connectionRadius={connectionRadius}
          connectionOpacity={isMobile ? 0.03 : 0.05}
        />
      )}

      {/* Background color for mobile when animations are disabled */}
      {!showParticles && (
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950" />
      )}

      {/* Header */}
      <Header />
      
      {/* Main content sections */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}