"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { CtaSection } from "@/components/sections/cta-section";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SuccessStories() {
  const successStories = [
    {
      company: "TechGlobal",
      logo: "/logos/placeholder-logo-1.svg", // Placeholder - would need to be replaced with actual logos
      title: "Van 3 uur naar 15 minuten per supportticket",
      description: "Dankzij onze AI-assistenten heeft TechGlobal hun gemiddelde afhandeltijd van supporttickets met 92% verminderd, waardoor hun klanttevredenheid met 45% is gestegen.",
      quote: "De AI-assistenten van Laava hebben ons in staat gesteld om veel sneller te reageren op klantvragen en tegelijkertijd meer persoonlijke aandacht te geven aan complexe problemen.",
      author: "Jaap de Vries",
      position: "CTO, TechGlobal",
      stats: [
        { label: "Tijdsbesparing", value: "92%" },
        { label: "Hogere klanttevredenheid", value: "45%" },
        { label: "ROI", value: "320%" }
      ]
    },
    {
      company: "FinancePartners",
      logo: "/logos/placeholder-logo-2.svg",
      title: "Automatisering van financiële rapportages bespaart 200+ uur per maand",
      description: "FinancePartners gebruikt onze AI-assistenten voor het automatiseren van financiële rapportages, waardoor analisten zich kunnen richten op strategisch advies in plaats van data-verzameling.",
      quote: "We hebben niet alleen tijd bespaard, maar ook de kwaliteit van onze rapporten verbeterd doordat menselijke fouten worden verminderd en we consistentere analyses kunnen leveren.",
      author: "Sophie Jansen",
      position: "Financieel Directeur, FinancePartners",
      stats: [
        { label: "Tijdsbesparing", value: "200+ uur/mnd" },
        { label: "Foutreductie", value: "98%" },
        { label: "Analysecapaciteit", value: "+160%" }
      ]
    },
    {
      company: "HealthInnovators",
      logo: "/logos/placeholder-logo-3.svg",
      title: "AI-assistenten helpen bij betere patiëntenzorg",
      description: "Door routinetaken te automatiseren hebben zorgverleners bij HealthInnovators meer tijd voor directe patiëntenzorg, wat leidt tot betere zorgresultaten en hogere patiënttevredenheid.",
      quote: "De AI-assistenten van Laava nemen veel administratief werk van onze zorgverleners over. Hierdoor kunnen ze meer tijd besteden aan wat echt belangrijk is: de patiënten.",
      author: "Dr. Marieke van Dam",
      position: "Medisch Directeur, HealthInnovators",
      stats: [
        { label: "Meer patiënttijd", value: "+35%" },
        { label: "Administratieve last", value: "-60%" },
        { label: "Medewerkerstevredenheid", value: "+40%" }
      ]
    }
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
                Succesverhalen
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ontdek hoe onze AI-assistenten bedrijven helpen hun efficiëntie te verhogen, 
                kosten te verlagen en hun teams te versterken.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {successStories.map((story, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                >
                  <div className="w-full lg:w-1/2 relative">
                    <div className="bg-gradient-to-r from-indigo-100 to-blue-50 rounded-2xl p-8 aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-indigo-800 mb-4">{story.company}</h3>
                        <div className="h-20 w-48 mx-auto bg-white rounded-lg shadow-md flex items-center justify-center">
                          <p className="text-gray-400 italic">Company logo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">{story.title}</h2>
                    <p className="text-gray-600 mb-6">{story.description}</p>
                    
                    <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700 mb-8">
                      "{story.quote}"
                      <footer className="mt-2 font-medium text-gray-900">
                        {story.author}, <span className="font-normal text-gray-600">{story.position}</span>
                      </footer>
                    </blockquote>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {story.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                      ))}
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