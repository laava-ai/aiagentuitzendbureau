"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Twitter, Github, Facebook, Instagram } from "lucide-react";
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
  
  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Algemene voorwaarden", href: "/terms-of-service" },
    { name: "Cookie beleid", href: "/cookie-policy" },
  ];
  
  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/laava-ai" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/laava_ai" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/laava.ai" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/laava.ai" },
  ];

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Laava",
    "url": "https://laava.nl",
    "logo": "https://laava.nl/logo.png",
    "description": "Laava ontwikkelt intelligente AI-agents en digitale collega's die bedrijfsprocessen optimaliseren en de productiviteit verhogen.",
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
      "https://www.linkedin.com/company/laava-ai",
      "https://twitter.com/laava_ai",
      "https://www.instagram.com/laava.ai",
      "https://www.facebook.com/laava.ai"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and social links */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Laava
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Laava creëert intelligente AI-agents die als digitale collega's naadloos integreren in uw team. Onze computer collega's automatiseren taken, verbeteren besluitvorming en maximaliseren uw bedrijfsefficiëntie.
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
        
        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm order-2 md:order-1 mt-4 md:mt-0">
            © {currentYear} Laava | Ontwikkelaars van AI-agents en digitale collega's. Alle rechten voorbehouden.
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