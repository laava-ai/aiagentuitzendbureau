"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ParticleField } from "@/components/ui/animations/particle-field";
import Script from "next/script";

export default function Home() {
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
              "addressLocality": "Amsterdam",
              "addressRegion": "NH",
              "postalCode": "1000 AA",
              "addressCountry": "NL"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+31-20-123-4567",
              "contactType": "customer service",
              "email": "info@laava.nl",
              "availableLanguage": ["Dutch", "English"]
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