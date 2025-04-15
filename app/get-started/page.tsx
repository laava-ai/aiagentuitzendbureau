"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { useMobileOptimizer } from "@/components/ui/mobile-optimizer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Lightbulb, Rocket, Code, Clock, Shield, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function GetStartedPage() {
  const { isMobile, disableAllAnimations } = useMobileOptimizer();
  
  // Only show particles on desktop
  const showParticles = !disableAllAnimations;

  const steps = [
    {
      title: "Gratis consultatie",
      description: "Plan een gratis gesprek met ons team om uw behoeften en doelen te bespreken. We analyseren waar AI-agents het grootste verschil kunnen maken voor uw organisatie.",
      icon: <MessageSquare className="h-10 w-10 text-indigo-400" />,
    },
    {
      title: "Maatwerk AI-agent ontwerp",
      description: "Op basis van de consultatie ontwikkelen we een voorstel voor een op maat gemaakte AI-agent die aansluit bij uw werkprocessen en specifieke vereisten.",
      icon: <Lightbulb className="h-10 w-10 text-indigo-400" />,
    },
    {
      title: "Ontwikkeling & Training",
      description: "Onze ingenieurs ontwikkelen uw AI-agent met geavanceerde machine learning en trainen deze met uw specifieke data en use cases.",
      icon: <Code className="h-10 w-10 text-indigo-400" />,
    },
    {
      title: "Implementatie & Integratie",
      description: "We integreren de AI-agent naadloos in uw bestaande systemen en workflows, met minimale verstoring van uw dagelijkse operaties.",
      icon: <Rocket className="h-10 w-10 text-indigo-400" />,
    },
    {
      title: "Ondersteuning & Optimalisatie",
      description: "Na implementatie bieden we continue ondersteuning en optimaliseren we uw AI-agent op basis van feedback en veranderende behoeften.",
      icon: <Shield className="h-10 w-10 text-indigo-400" />,
    }
  ];

  const benefits = [
    {
      title: "Snelle implementatie",
      description: "Binnen 2-4 weken actief, in tegenstelling tot traditionele softwareprojecten die maanden kunnen duren.",
      icon: <Clock className="h-6 w-6 text-indigo-400" />,
    },
    {
      title: "Bewezen ROI",
      description: "Gemiddeld zien klanten een ROI van 300% binnen 6 maanden door kostenbesparing en efficiëntieverbeteringen.",
      icon: <CheckCircle2 className="h-6 w-6 text-indigo-400" />,
    },
    {
      title: "Schaalbaar & Flexibel",
      description: "Start klein en schaal op naarmate uw behoeften groeien. Onze AI-agents passen zich aan uw veranderende behoeften aan.",
      icon: <Rocket className="h-6 w-6 text-indigo-400" />,
    }
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
              className="text-center max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Begin Vandaag Met AI-Agents
              </h1>
              <p className="text-xl text-gray-300">
                In slechts enkele stappen kunt u geavanceerde AI-agents implementeren die uw bedrijf naar een hoger niveau tillen. Volg onze beproefde aanpak om snel resultaat te boeken.
              </p>
            </motion.div>

            {/* Process Steps */}
            <motion.div 
              className="max-w-5xl mx-auto mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="grid gap-12">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className="relative grid md:grid-cols-[80px_1fr] gap-6 items-start"
                  >
                    {/* Step number and icon */}
                    <div className="relative">
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-900/30 border border-indigo-600/50">
                        {step.icon}
                        <span className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold">
                          {index + 1}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="absolute top-20 left-10 w-0.5 h-12 md:h-[calc(100%+1rem)] bg-gradient-to-b from-indigo-600 to-transparent"></div>
                      )}
                    </div>
                    
                    {/* Step content */}
                    <div className="pt-2">
                      <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              className="max-w-5xl mx-auto py-12 px-6 md:px-12 my-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">Klaar om te beginnen?</h2>
                  <p className="text-gray-300">
                    Plan vandaag nog een gratis consultatie met ons team. We bespreken uw specifieke situatie en laten zien hoe onze AI-agents u kunnen helpen.
                  </p>
                  <div className="space-y-4">
                    <Button asChild size="lg" className="w-full md:w-auto group bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0">
                      <Link href="/demo">
                        <span>Plan een demo</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
                      <Link href="/how-it-works">
                        <span>Lees meer over onze aanpak</span>
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative h-72 md:h-80 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 rounded-xl"></div>
                  <Image
                    src="/images/consultation.jpg"
                    alt="Team consultatie"
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>

            {/* Key Benefits */}
            <motion.div 
              className="max-w-5xl mx-auto mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                De voordelen van onze aanpak
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-center mb-4">
                      {benefit.icon}
                      <h3 className="text-xl font-semibold ml-2">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Client Success */}
            <motion.div 
              className="max-w-5xl mx-auto mt-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Succesverhalen
              </h2>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
                  <div className="bg-indigo-900/30 rounded-xl p-6 text-center space-y-4">
                    <div className="text-4xl font-bold text-indigo-400">67%</div>
                    <p className="text-white font-semibold">Tijdbesparing op administratieve taken</p>
                    <div className="text-4xl font-bold text-indigo-400">€280K</div>
                    <p className="text-white font-semibold">Jaarlijkse kostenbesparing</p>
                    <div className="text-4xl font-bold text-indigo-400">98%</div>
                    <p className="text-white font-semibold">Klanttevredenheid</p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Case: Nationale Financieringsmaatschappij</h3>
                    <p className="text-gray-300 mb-4">
                      Een toonaangevende financiële dienstverlener implementeerde onze AI-agents om hun kredietbeoordelingsproces te stroomlijnen. Voorheen duurde het proces gemiddeld 4 dagen; nu wordt 80% van de aanvragen binnen 4 uur verwerkt.
                    </p>
                    <p className="text-gray-300 mb-6">
                      De AI-agent analyseert aanvragen, verzamelt ontbrekende gegevens, beoordeelt risico&apos;s en genereert gedetailleerde rapporten. Dit heeft geleid tot snellere besluitvorming, hogere klanttevredenheid en aanzienlijke kostenbesparingen.
                    </p>
                    <Button asChild variant="link" className="p-0">
                      <Link href="/cases">
                        <span>Bekijk meer succesverhalen</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* FAQ */}
            <motion.div 
              className="max-w-3xl mx-auto mt-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Veelgestelde vragen
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    question: "Hoe lang duurt het voordat een AI-agent operationeel is?",
                    answer: "De implementatietijd varieert afhankelijk van de complexiteit, maar de meeste AI-agents zijn binnen 2-4 weken volledig operationeel. Eenvoudige use cases kunnen soms al binnen een week live gaan."
                  },
                  {
                    question: "Moet ik mijn bestaande systemen vervangen?",
                    answer: "Absoluut niet. Onze AI-agents zijn ontworpen om te integreren met uw bestaande systemen en werkprocessen. Ze verbeteren wat u al heeft zonder vervanging te vereisen."
                  },
                  {
                    question: "Hoe meet ik het rendement van de investering?",
                    answer: "We stellen samen met u concrete KPI&apos;s op bij aanvang van het project. Deze kunnen tijdsbesparing, kostenreductie, klanttevredenheid of andere metrics omvatten die belangrijk zijn voor uw bedrijf."
                  },
                  {
                    question: "Wat gebeurt er na de implementatie?",
                    answer: "We bieden doorlopende ondersteuning en monitoring. Uw AI-agent blijft leren en verbeteren door gebruik. We houden regelmatig evaluatiegesprekken om de prestaties te optimaliseren."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Final CTA */}
            <motion.div 
              className="max-w-4xl mx-auto mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Klaar om te transformeren met AI?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Neem vandaag nog contact op voor een gratis, vrijblijvende consultatie.
              </p>
              <Button asChild size="lg" className="group bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0">
                <Link href="/demo">
                  <span>Plan een demo</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 