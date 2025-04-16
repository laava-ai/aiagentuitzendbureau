"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Script from "next/script";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const pageLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Bedrijf", href: "/company" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];
  
  const companyLinks = [
    { name: "Over ons", href: "/about" },
    { name: "Succesverhalen", href: "/company/success-stories" },
    { name: "Referenties", href: "/company/testimonials" },
    { name: "Team", href: "/company/team" },
    { name: "Vacatures", href: "/company/careers" },
  ];
  
  const blogLinks = [
    { name: "ROI van AI Agents", href: "/blog/roi-ai-agents-bereken-zakelijke-waarde-bedrijf" },
    { name: "AI voor MKB-Bedrijven", href: "/blog/implementatie-ai-agents-mkb-stap-voor-stap-handleiding" },
    { name: "AI vs. Automatisering", href: "/blog/ai-agents-vs-traditionele-automatisering-vergelijking" },
    { name: "Kostenbesparing met AI", href: "/blog/kostenbesparing-ai-agents-7-gebieden-directe-voordelen" },
    { name: "AI Agent Huren", href: "/blog/ai-agent-huren-praktijkgids-bedrijven-nederland" },
  ];
  
  const businessSolutionLinks = [
    { name: "AI voor Klantservice", href: "/blog/ai-agents-klantservice-verhoog-tevredenheid-verlaag-kosten" },
    { name: "AI Software Integratie", href: "/blog/ai-integration-existing-business-software-compatibiliteit" },
    { name: "AI voor Verkoop & Marketing", href: "/blog/ai-agents-verkoop-marketing-boost-conversie-leads" },
    { name: "AI Procesautomatisering", href: "/blog/ai-agents-procesautomatisering-handmatig-naar-autonoom" },
    { name: "AI Medewerkerstraining", href: "/blog/training-medewerkers-samenwerking-ai-agents-tips" },
  ];
  
  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Algemene voorwaarden", href: "/terms-of-service" },
    { name: "Cookie beleid", href: "/cookie-policy" },
  ];
  
  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/laava-ai" },
  ];

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Laava",
    "url": "https://laava.nl",
    "logo": "https://laava.nl/logo.png",
    "description": "Laava ontwikkelt intelligente AI-agents en digitale collega&apos;s die bedrijfsprocessen optimaliseren en de productiviteit verhogen.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hoofdstraat 123",
      "addressLocality": "Amsterdam",
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
    "sameAs": [
      "https://www.linkedin.com/company/laava-ai"
    ],
    "blogPosts": [
      {
        "@type": "BlogPosting",
        "headline": "ROI van AI Agents: Bereken de Zakelijke Waarde voor Uw Bedrijf",
        "description": "Een praktische gids voor het berekenen van de return on investment (ROI) bij de implementatie van AI agents in uw bedrijf, met concrete methoden en voorbeelden.",
        "url": "https://laava.nl/blog/roi-ai-agents-bereken-zakelijke-waarde-bedrijf",
        "keywords": ["AI ROI", "zakelijke waarde AI", "AI rendement", "rendement berekenen", "investeringsrendement AI", "business case AI", "kosten-baten analyse AI"]
      },
      {
        "@type": "BlogPosting",
        "headline": "Implementatie van AI Agents in het MKB: Een Stap-voor-Stap Handleiding",
        "description": "Praktische implementatiestrategieën voor MKB-bedrijven die AI agents willen integreren zonder grote IT-afdeling of enorm budget.",
        "url": "https://laava.nl/blog/implementatie-ai-agents-mkb-stap-voor-stap-handleiding",
        "keywords": ["AI voor MKB", "AI kleine bedrijven", "AI implementatie", "stap voor stap AI", "betaalbare AI oplossingen", "AI zonder IT-afdeling"]
      },
      {
        "@type": "BlogPosting",
        "headline": "AI Agents vs. Traditionele Automatisering: Wat Werkt Beter voor Uw Bedrijf?",
        "description": "Een gedetailleerde vergelijking tussen AI agents en traditionele automatiseringsoplossingen, inclusief use cases, kosten en implementatie-overwegingen.",
        "url": "https://laava.nl/blog/ai-agents-vs-traditionele-automatisering-vergelijking",
        "keywords": ["AI vs automatisering", "vergelijking AI automatisering", "traditionele automatisering", "AI voordelen", "betere automatisering", "moderne automatisering"]
      },
      {
        "@type": "BlogPosting",
        "headline": "Kostenbesparing door AI Agents: 7 Gebieden Waar Bedrijven Direct Voordeel Behalen",
        "description": "Ontdek de zeven belangrijkste gebieden waar AI agents aantoonbare kostenbesparingen realiseren, met praktijkvoorbeelden.",
        "url": "https://laava.nl/blog/kostenbesparing-ai-agents-7-gebieden-directe-voordelen",
        "keywords": ["AI kostenbesparing", "kosten reduceren met AI", "operationele kosten verlagen", "efficiency verhogen", "kostenvoordelen AI", "AI investeringsvoordelen"]
      },
      {
        "@type": "BlogPosting",
        "headline": "AI Integration in Existing Business Software: Compatibiliteit met Uw Huidige Systemen",
        "description": "Hoe AI agents naadloos integreren met populaire bedrijfssoftware zoals SAP, Exact, Microsoft, Salesforce en branchespecifieke oplossingen.",
        "url": "https://laava.nl/blog/ai-integration-existing-business-software-compatibiliteit",
        "keywords": ["AI software integratie", "AI compatibiliteit", "AI integreren bestaande systemen", "ERP AI integratie", "CRM AI integratie", "SAP AI integratie", "Exact AI integratie"]
      },
      {
        "@type": "BlogPosting",
        "headline": "AI Agent Huren: Praktijkgids voor Bedrijven in Nederland",
        "description": "Alles wat u moet weten over het huren van AI agents voor uw organisatie. Van kosten en implementatie tot praktische toepassingen en ROI voor Nederlandse bedrijven.",
        "url": "https://laava.nl/blog/ai-agent-huren-praktijkgids-bedrijven-nederland",
        "keywords": ["AI agent huren", "AI agent inzetten", "AI agent in mijn bedrijf", "digitale medewerker", "computer collega", "AI implementatie", "Nederlandse bedrijven"]
      },
      {
        "@type": "BlogPosting",
        "headline": "AI voor Recruitment: Revolutionaire Technologie voor Moderne Recruiters",
        "description": "Ontdek hoe AI het recruitmentproces transformeert, van kandidaatselectie tot onboarding.",
        "url": "https://laava.nl/blog/ai-voor-recruitment-technologie-moderne-recruiters",
        "keywords": ["AI recruitment", "werving", "selectie", "recruitmentbureaus", "uitzendbureaus", "talentwerving"]
      },
      {
        "@type": "BlogPosting",
        "headline": "AI voor HR, Finance en Productie: De belangrijkste bedrijfstakken transformeren",
        "description": "Hoe verschillende bedrijfstakken revolutionaire veranderingen ondergaan door AI-technologie.",
        "url": "https://laava.nl/blog/ai-voor-hr-finance-productie-bedrijfstakken-transformeren",
        "keywords": ["AI bedrijfstakken", "HR", "Finance", "Productie", "AI transformatie"]
      },
      {
        "@type": "BlogPosting",
        "headline": "AI Agents vs Digitale Medewerkers: De Evolutie van Intelligente Assistenten",
        "description": "Een diepgaande vergelijking tussen traditionele AI Agents en volwaardige Digitale Medewerkers.",
        "url": "https://laava.nl/blog/ai-agents-vs-digitale-medewerkers-evolutie",
        "keywords": ["AI agents", "digitale medewerker", "virtuele assistent", "AI assistenten"]
      }
    ]
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Fout",
        description: "Vul een geldig e-mailadres in.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newsletter: true,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Er is iets misgegaan');
      }
      
      toast({
        title: "Gelukt!",
        description: "Bedankt voor uw aanmelding bij onze nieuwsbrief!",
      });
      
      setEmail("");
    } catch (error) {
      console.error('Error submitting newsletter form:', error);
      toast({
        title: "Fout",
        description: "Er is iets misgegaan. Probeer het later opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <Script id="local-business-data" type="application/ld+json">
        {JSON.stringify(localBusinessData)}
      </Script>

      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
          {/* Logo and social links */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Laava
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Laava creëert intelligente AI-agents die als digitale collega&apos;s naadloos integreren in uw team. Onze computer collega&apos;s automatiseren taken, verbeteren besluitvorming en maximaliseren uw bedrijfsefficiëntie.
            </p>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Pages */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Pagina&apos;s</h3>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Bedrijf</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Populaire Blogs */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Populaire Blogs</h3>
            <ul className="space-y-2">
              {blogLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Business Solutions */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Business Solutions</h3>
            <ul className="space-y-2">
              {businessSolutionLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Nieuwsbrief</h3>
            <p className="text-gray-600 mb-4">
              Ontvang de laatste AI nieuws en tips
            </p>
            <form className="flex flex-col gap-2" onSubmit={handleNewsletterSubmit}>
              <div className="flex">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    placeholder="E-mailadres"
                    className="pl-10"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Bezig..." : "Aanmelden"}
              </Button>
            </form>
          </div>
        </div>
        
        {/* SEO-focused blog links section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="text-sm text-gray-500 mb-4">AI Agent Resources</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
            <Link href="/blog/roi-ai-agents-bereken-zakelijke-waarde-bedrijf" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">ROI van AI Agents Berekenen</Link>
            <Link href="/blog/implementatie-ai-agents-mkb-stap-voor-stap-handleiding" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI Agents voor MKB</Link>
            <Link href="/blog/ai-agents-vs-traditionele-automatisering-vergelijking" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI vs Traditionele Automatisering</Link>
            <Link href="/blog/kostenbesparing-ai-agents-7-gebieden-directe-voordelen" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">Kostenbesparing met AI Agents</Link>
            <Link href="/blog/ai-integration-existing-business-software-compatibiliteit" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI Integratie met Bestaande Software</Link>
            <Link href="/blog/ai-agents-klantservice-verhoog-tevredenheid-verlaag-kosten" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI voor Klantservice</Link>
            <Link href="/blog/training-medewerkers-samenwerking-ai-agents-tips" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">Medewerkers Trainen voor AI Samenwerking</Link>
            <Link href="/blog/ai-agents-procesautomatisering-handmatig-naar-autonoom" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI voor Procesautomatisering</Link>
            <Link href="/blog/beveiliging-privacy-ai-agent-implementatie-wetgeving" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI Agent Beveiliging & Privacy</Link>
            <Link href="/blog/ai-agents-verkoop-marketing-boost-conversie-leads" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI voor Verkoop & Marketing</Link>
            <Link href="/blog/ai-agent-huren-praktijkgids-bedrijven-nederland" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI Agent Huren voor Bedrijven</Link>
            <Link href="/blog/ai-voor-recruitment-technologie-moderne-recruiters" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI voor Recruitment</Link>
            <Link href="/blog/ai-voor-hr-finance-productie-bedrijfstakken-transformeren" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI voor HR & Finance</Link>
            <Link href="/blog/ai-agents-vs-digitale-medewerkers-evolutie" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI Agents vs Digitale Medewerkers</Link>
            <Link href="/blog/kunstmatige-intelligentie-toekomst-bedrijfsautomatisering" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">AI voor Bedrijfsautomatisering</Link>
            <Link href="/blog/data-analyse-concurrentievoordeel-praktische-toepassingen" className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">Data-analyse met AI</Link>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm order-2 md:order-1 mt-4 md:mt-0">
            © {currentYear} Laava | Ontwikkelaars van AI-agents en digitale collega&apos;s. Alle rechten voorbehouden.
          </p>
          <div className="flex space-x-6 order-1 md:order-2">
            {legalLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 