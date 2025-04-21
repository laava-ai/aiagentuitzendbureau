"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { RevealText } from "@/components/ui/atoms/reveal-text";
import { CtaSection } from "@/components/sections/cta-section";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Company() {
  const companyPages = [
    {
      title: "Over ons",
      description: "Leer meer over onze missie, visie en wat ons drijft om AI-oplossingen te creëren die bedrijven transformeren.",
      href: "/about",
      color: "from-indigo-600 to-violet-600"
    },
    {
      title: "Succesverhalen",
      description: "Ontdek hoe onze klanten met onze AI-oplossingen hun efficiency hebben verbeterd en hun teams hebben versterkt.",
      href: "/company/success-stories",
      color: "from-blue-600 to-cyan-500",
      disabled: true
    },
    {
      title: "Referenties",
      description: "Bekijk wat onze klanten over ons zeggen en hoe onze AI-oplossingen een verschil hebben gemaakt in hun bedrijven.",
      href: "/company/testimonials",
      color: "from-violet-600 to-fuchsia-500",
      disabled: true
    },
    {
      title: "Team",
      description: "Ontmoet de experts achter Laava die gepassioneerd zijn over het bouwen van intelligente AI-oplossingen.",
      href: "/company/team",
      color: "from-indigo-500 to-blue-600"
    },
    {
      title: "Vacatures",
      description: "Word onderdeel van ons team en help mee aan de toekomst van werk met AI. Bekijk onze openstaande posities.",
      href: "/company/careers",
      color: "from-purple-600 to-indigo-500"
    },
  ];

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
        <section className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-b from-[#080F26] to-[#0A0F2C]">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Bedrijf
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ontdek meer over Laava - onze mensen, onze waarden en hoe we AI gebruiken om 
                de toekomst van werk vorm te geven.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companyPages.filter(page => !page.disabled).map((page, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`h-2 bg-gradient-to-r ${page.color}`}></div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{page.title}</h3>
                    <p className="text-gray-600 mb-6">{page.description}</p>
                    <Link 
                      href={page.href}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                      Meer informatie <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 