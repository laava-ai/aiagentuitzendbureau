"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { useMobileOptimizer } from "@/components/ui/mobile-optimizer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronRight, Search, Settings, RefreshCw, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const { isMobile, disableAllAnimations } = useMobileOptimizer();
  
  // Only show particles on desktop
  const showParticles = !disableAllAnimations;
  
  const steps = [
    {
      title: "Analyse & Behoefteonderzoek",
      description: "We beginnen met een grondige analyse van uw bedrijfsprocessen en identificeren waar AI-agents de meeste waarde kunnen toevoegen.",
      icon: <Search className="h-10 w-10 text-indigo-400" />,
    },
    {
      title: "Ontwikkeling op Maat",
      description: "Onze experts ontwikkelen AI-agents specifiek voor uw behoeften, rekening houdend met uw branche en bedrijfsdoelen.",
      icon: <Settings className="h-10 w-10 text-indigo-400" />,
    },
    {
      title: "Integratie & Training",
      description: "We integreren de AI-agents in uw bestaande systemen en trainen zowel de AI als uw team voor optimale samenwerking.",
      icon: <RefreshCw className="h-10 w-10 text-indigo-400" />,
    },
    {
      title: "Implementatie & Monitoring",
      description: "Na implementatie monitoren we de prestaties en optimaliseren de AI-agents continu voor de beste resultaten.",
      icon: <BarChart3 className="h-10 w-10 text-indigo-400" />,
    },
  ];
  
  const benefits = [
    "Toegang tot geavanceerde AI-technologie zonder grote investeringen",
    "Snellere bedrijfsprocessen en verhoogde productiviteit",
    "Minder fouten en consistentere resultaten",
    "Schaalbare oplossingen die meegroeien met uw bedrijf",
    "24/7 beschikbaarheid zonder moeheid of onderbrekingen",
    "Ondersteunt menselijke medewerkers zodat zij zich kunnen focussen op waardevollere taken"
  ];
  
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background particle effect */}
      {showParticles && (
        <ParticleField 
          className="fixed inset-0 -z-10"
          particleCount={isMobile ? 30 : 100}
          particleSize={1}
          particleColor="#6366f1"
          particleSpeed={0.3}
          connectionRadius={150}
          connectionOpacity={0.05}
        />
      )}

      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="flex-1">
        <section className="relative pt-24 pb-16 md:py-32 overflow-hidden bg-gradient-to-b from-[#080F26] to-[#0A0F2C]">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-4xl mx-auto mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Hoe Onze AI Agents Werken
              </h1>
              <p className="text-xl text-gray-300">
                Ontdek hoe onze digitale collega&apos;s naadloos integreren in uw bedrijf en uw team naar nieuwe hoogten tillen.
              </p>
            </motion.div>
            
            {/* Process Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/30 border border-indigo-600/50 mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Integration Image */}
            <motion.div 
              className="relative rounded-lg overflow-hidden mb-24 mx-auto max-w-4xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="p-10 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-white">AI Agent Workflow Visualisatie</h3>
                  <p className="text-gray-400">Hier zou een illustratie of diagram van de workflow van uw AI-agents kunnen staan</p>
                </div>
              </div>
            </motion.div>
            
            {/* Benefits */}
            <motion.div 
              className="max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Voordelen van Onze AI Agents
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1 bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-full">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* CTA */}
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Klaar om uw eerste AI-agent aan te nemen?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0">
                  <Link href="/contact">
                    <span>Neem contact op</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10">
                  <Link href="/demo">
                    <span className="text-white">Plan een demo</span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-[#0A0F2C]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Veelgestelde Vragen
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Hoe lang duurt het implementeren van een AI-agent?",
                  answer: "De implementatietijd varieert afhankelijk van de complexiteit, maar meestal duurt het 2-6 weken van analyse tot volledig operationele AI-agent."
                },
                {
                  question: "Welke training hebben mijn medewerkers nodig?",
                  answer: "We bieden uitgebreide training aan uw team om effectief samen te werken met AI-agents. De meeste gebruikers leren binnen enkele dagen om optimaal gebruik te maken van het systeem."
                },
                {
                  question: "Kunnen AI-agents worden aangepast naarmate onze behoeften veranderen?",
                  answer: "Absoluut! Onze AI-agents zijn ontworpen om te evolueren met uw bedrijf. We bieden doorlopende ondersteuning en aanpassingen om ervoor te zorgen dat ze blijven voldoen aan uw veranderende behoeften."
                },
                {
                  question: "Hoe veilig zijn de gegevens bij gebruik van AI-agents?",
                  answer: "Beveiliging is onze topprioriteit. We implementeren end-to-end encryptie, strikte toegangscontroles en voldoen aan alle relevante gegevensbeschermingsvoorschriften, waaronder de AVG."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 