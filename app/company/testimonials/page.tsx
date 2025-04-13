"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { CtaSection } from "@/components/sections/cta-section";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Johan Smit",
      position: "CEO, DigitalFlow",
      company: "DigitalFlow",
      content: "Laava heeft ons geholpen onze klantenservice te transformeren. De AI-assistenten nemen routinevragen over, waardoor ons team zich kan concentreren op complexere kwesties. De implementatie was soepel en de resultaten zijn indrukwekkend - snellere responstijden en hogere klanttevredenheid.",
      rating: 5,
      image: "/images/testimonials/placeholder-1.jpg", // Placeholder
      category: "Klantenservice"
    },
    {
      name: "Emma de Boer",
      position: "COO, TechSolutions",
      company: "TechSolutions",
      content: "We waren op zoek naar een manier om onze administratieve processen efficiënter te maken zonder kwaliteit in te leveren. De AI-oplossingen van Laava hebben dat voor elkaar gekregen. Onze medewerkers zijn enthousiast dat ze niet langer hun tijd hoeven te besteden aan repetitieve taken.",
      rating: 5,
      image: "/images/testimonials/placeholder-2.jpg",
      category: "Administratie"
    },
    {
      name: "Thomas Bakker",
      position: "Head of HR, InnovateCorp",
      company: "InnovateCorp",
      content: "Het implementeren van Laava's AI-assistenten voor onze HR-afdeling heeft ons geholpen om processen zoals werving en onboarding te stroomlijnen. We kunnen nu kandidaten sneller verwerken en zorgen voor een betere ervaring voor nieuwe medewerkers.",
      rating: 4,
      image: "/images/testimonials/placeholder-3.jpg",
      category: "HR"
    },
    {
      name: "Sara van Dijk",
      position: "Marketing Director, BrandGrowth",
      company: "BrandGrowth",
      content: "De AI-tools van Laava hebben onze content-creatie en marketinganalyse naar een nieuw niveau getild. We kunnen nu veel meer content produceren, terwijl we ook diepere inzichten krijgen in hoe onze campagnes presteren. Een echte game-changer voor ons team.",
      rating: 5,
      image: "/images/testimonials/placeholder-4.jpg",
      category: "Marketing"
    },
    {
      name: "Pieter Jansen",
      position: "CTO, DataDriven",
      company: "DataDriven",
      content: "Als databedrijf waren we sceptisch over de waarde die AI zou kunnen toevoegen aan onze operaties. Laava heeft ons overtuigd met hun intelligente assistenten die ons helpen bij het automatiseren van data-analyse en het genereren van rapporten, wat ons veel tijd bespaart.",
      rating: 5,
      image: "/images/testimonials/placeholder-5.jpg",
      category: "Data-analyse"
    },
    {
      name: "Lisa Visser",
      position: "Operations Manager, LogisticsPro",
      company: "LogisticsPro",
      content: "In de logistiek is efficiëntie alles. De AI-oplossingen van Laava hebben ons geholpen bij het optimaliseren van routes, het beheren van voorraden en het voorspellen van onderhoudsproblemen. Dit heeft geleid tot aanzienlijke kostenbesparingen.",
      rating: 4,
      image: "/images/testimonials/placeholder-6.jpg",
      category: "Logistiek"
    }
  ];

  const categories = Array.from(new Set(testimonials.map(t => t.category)));

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
                Wat Onze Klanten Zeggen
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ontdek hoe onze AI-oplossingen het verschil maken voor bedrijven in verschillende sectoren.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="px-6 py-2 bg-indigo-50 rounded-full text-indigo-700 font-medium">
                    {category}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-bold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {testimonial.rating}/5
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{testimonial.content}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                        {testimonial.category}
                      </span>
                      <span className="text-sm text-gray-500">{testimonial.company}</span>
                    </div>
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