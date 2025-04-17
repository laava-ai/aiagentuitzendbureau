"use client";

import Link from "next/link";
import { Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Script from "next/script";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const navigationLinks = [
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

  const solutionLinks = [
    { name: "AI voor Klantservice", href: "/blog/ai-agents-klantservice-verhoog-tevredenheid-verlaag-kosten" },
    { name: "AI Software Integratie", href: "/blog/ai-integration-existing-business-software-compatibiliteit" },
    { name: "AI voor Verkoop & Marketing", href: "/blog/ai-agents-verkoop-marketing-boost-conversie-leads" },
    { name: "AI Procesautomatisering", href: "/blog/ai-agents-procesautomatisering-handmatig-naar-autonoom" },
    { name: "AI Medewerkerstraining", href: "/blog/training-medewerkers-samenwerking-ai-agents-tips" },
    { name: "Wat is AI?", href: "/blog/wat-is-ai" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Algemene Voorwaarden", href: "/terms-of-service" },
    { name: "Cookie Beleid", href: "/cookie-policy" },
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
    "description": "Laava ontwikkelt intelligente AI-agents en digitale collega's die bedrijfsprocessen optimaliseren en de productiviteit verhogen.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Europaplein 779",
      "addressLocality": "Utrecht",
      "postalCode": "3526 WP",
      "addressCountry": "NL",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31-20-123-4567",
      "contactType": "customer service",
      "email": "info@laava.nl",
      "availableLanguage": ["Dutch"],
    },
    "sameAs": ["https://www.linkedin.com/company/laava-ai"],
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Fout",
        description: "Vul een geldig e-mailadres in.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newsletter: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Er is iets misgegaan");
      }

      toast({
        title: "Gelukt!",
        description: "Bedankt voor uw aanmelding bij onze nieuwsbrief!",
      });

      setEmail("");
    } catch (error) {
      console.error("Error submitting newsletter form:", error);
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

      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Laava
              </span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-sm">
              Laava ontwikkelt AI-agents en digitale collega’s die processen optimaliseren en productiviteit verhogen. Transformeer je bedrijf met slimme technologie.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                  aria-label={`Volg ons op ${social.name}`}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigatie</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
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

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bedrijf</h3>
            <ul className="space-y-3">
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

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nieuwsbrief</h3>
            <p className="text-gray-600 mb-4">
              Blijf op de hoogte van AI-innovaties en tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="E-mailadres"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="E-mailadres voor nieuwsbrief"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verzenden..." : "Aanmelden"}
              </Button>
            </form>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Oplossingen</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutionLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-600 text-center">
            © {currentYear} Laava. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
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