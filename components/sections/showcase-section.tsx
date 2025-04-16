"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/ui/atoms/reveal-text";
import { useMobileOptimizer } from "@/components/ui/mobile-optimizer";
import Image from "next/image";

const caseStudies = [
  {
    id: "customer-service",
    title: "Klantenservice Transformatie",
    subtitle: "Hoe een middelgrote webshop 24/7 klantenservice realiseerde zonder extra personeel",
    description: "Een groeiende Nederlandse webshop implementeerde onze AI Agents om klantvragen te beantwoorden en retourverzoeken te verwerken. Binnen 3 weken was het systeem operationeel, met minimale IT-inspanning. Nu worden 85% van alle klantvragen automatisch afgehandeld, wat heeft geleid tot kostenbesparing én hogere klanttevredenheid.",
    image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "85%", label: "Automatisch Opgelost" },
      { value: "3 weken", label: "Implementatietijd" },
      { value: "5.3x", label: "ROI binnen 6 maanden" },
    ],
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "hr-recruitment",
    title: "HR & Recruitment Versnelling",
    subtitle: "Automatisering van sollicitatiescreening en onboarding voor efficiëntere werving",
    description: "Een MKB-dienstverlener met 120 medewerkers zette onze AI Agents in om sollicitaties te screenen, interviews in te plannen en het onboarding-proces te begeleiden. Met bestaande HR-systemen geïntegreerd, verwerkt de AI nu 80% van alle routinetaken, waardoor recruiters 15 uur per week besparen en zich kunnen richten op het persoonlijke contact.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: [
      { value: "80%", label: "Minder Routinetaken" },
      { value: "68%", label: "Snellere Respons naar Kandidaten" },
      { value: "15 uur", label: "Tijdsbesparing per Week" },
    ],
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: "administratie",
    title: "Administratieve Automatisering",
    subtitle: "Van factuurverwerking tot boekhouding zonder handmatige invoer",
    description: "Een accountantskantoor met 50+ MKB-klanten implementeerde onze AI Agents voor automatische factuurverwerking, gegevensextractie en voorbereidende boekhoudtaken. Met directe integratie in bestaande boekhoudpakketten, werd de verwerkingstijd van administratie met 71% verminderd, terwijl de nauwkeurigheid significant verbeterde.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "71%", label: "Snellere Administratie" },
      { value: "99.3%", label: "Verwerkingsnauwkeurigheid" },
      { value: "40%", label: "Kostenbesparing" },
    ],
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "helpdesk",
    title: "Interne IT Helpdesk",
    subtitle: "24/7 IT-ondersteuning zonder uitbreiding van het team",
    description: "Een regionaal transportbedrijf installeerde onze AI Agents als eerste aanspreekpunt voor IT-vragen van 250+ medewerkers. De AI lost standaardproblemen zelfstandig op (wachtwoordresets, software-installaties, VPN-toegang) en escaleert complexere problemen naar IT-specialisten. Het resultaat: 91% van alle tickets wordt binnen 5 minuten opgelost, met slechts 2 weken implementatietijd.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "91%", label: "Binnen 5 Min Opgelost" },
      { value: "67%", label: "Minder IT-escalaties" },
      { value: "2 weken", label: "Van Start tot Operationeel" },
    ],
    color: "from-orange-500 to-amber-600",
  },
];

export function ShowcaseSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const { isMobile, disableAllAnimations } = useMobileOptimizer();
  
  // Only use animations on desktop
  const useScrollAnimation = !disableAllAnimations && !isMobile;

  // Create null or empty values for mobile that won't trigger animations
  const dummyMotionValue = useMotionValue(0);
  
  // Always declare the hooks but only use their values when needed
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Adjust progress range to start the effect immediately
  const progressRange = useTransform(
    scrollYProgress,
    // Use smaller input range to make the effect start sooner
    [0, 0.65],
    [0, caseStudies.length - 1]
  );
  
  const activeIndex = useSpring(progressRange, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Create all motion values outside of conditionals
  // For case 0
  const opacity0 = useTransform(activeIndex, [-0.5, 0, 0.8], [0, 1, 0]);
  const rotateY0 = useTransform(activeIndex, [-0.5, 0, 0.8], [-15, 0, 15]);
  const scale0 = useTransform(activeIndex, [-0.5, 0, 0.8], [0.95, 1, 0.95]);
  
  // For case 1
  const opacity1 = useTransform(activeIndex, [0, 1, 1.8], [0, 1, 0]);
  const rotateY1 = useTransform(activeIndex, [0, 1, 1.8], [-15, 0, 15]);
  const scale1 = useTransform(activeIndex, [0, 1, 1.8], [0.95, 1, 0.95]);
  
  // For case 2
  const opacity2 = useTransform(activeIndex, [1, 2, 2.8], [0, 1, 0]);
  const rotateY2 = useTransform(activeIndex, [1, 2, 2.8], [-15, 0, 15]);
  const scale2 = useTransform(activeIndex, [1, 2, 2.8], [0.95, 1, 0.95]);
  
  // For case 3
  const opacity3 = useTransform(activeIndex, [2, 3, 3.8], [0, 1, 0]);
  const rotateY3 = useTransform(activeIndex, [2, 3, 3.8], [-15, 0, 15]);
  const scale3 = useTransform(activeIndex, [2, 3, 3.8], [0.95, 1, 0.95]);
  
  const motionValues = [
    { opacity: opacity0, rotateY: rotateY0, scale: scale0 },
    { opacity: opacity1, rotateY: rotateY1, scale: scale1 },
    { opacity: opacity2, rotateY: rotateY2, scale: scale2 },
    { opacity: opacity3, rotateY: rotateY3, scale: scale3 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-950 text-white showcase-section"
      style={{ 
        minHeight: useScrollAnimation ? `${(caseStudies.length) * 80}vh` : "auto",
        scrollMarginTop: "0px"
      }}
      id="cases"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-[0.03]" />

      {/* Header - not sticky on mobile */}
      <div 
        ref={headerRef} 
        className={`${!isMobile ? "sticky top-0" : ""} z-30 pt-16 pb-8 bg-gray-950 showcase-header`}
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            {isMobile || disableAllAnimations ? (
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Transformaties in de Praktijk
              </h2>
            ) : (
              <RevealText
                text="Transformaties in de Praktijk"
                as="h2"
                textStyle="gradient"
                className="text-4xl md:text-5xl font-bold mb-6"
                preset="word"
                staggerChildren={0.08}
              />
            )}
            
            {isMobile || disableAllAnimations ? (
              <div className="text-lg text-gray-300">
                Ontdek hoe toonaangevende organisaties in verschillende sectoren hun activiteiten hebben gerevolutioneerd met onze intelligente AI-oplossingen.
              </div>
            ) : (
              <RevealText
                text="Ontdek hoe toonaangevende organisaties in verschillende sectoren hun activiteiten hebben gerevolutioneerd met onze intelligente AI-oplossingen."
                as="div"
                className="text-lg text-gray-300"
                preset="word"
                staggerChildren={0.02}
                delay={0.4}
              />
            )}
          </div>
        </div>
        {/* Gradient fade effect for header - only on desktop */}
        {!isMobile && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none"></div>
        )}
      </div>

      {/* Case Studies Container */}
      <div 
        ref={containerRef} 
        className={`relative ${!useScrollAnimation ? "pb-20 pt-8" : "min-h-screen sticky top-0"}`}
        style={useScrollAnimation ? { 
          top: 0, 
          height: `100vh`,
          perspective: "1200px"
        } : {}}
      >
        {caseStudies.map((study, index) => {
          // Simple static view for mobile
          if (isMobile || disableAllAnimations) {
            return (
              <div
                key={study.id}
                className="case-study mb-20 relative"
              >
                <div className="container px-4 md:px-6">
                  <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-6xl mx-auto">
                    <div className={`grid ${isMobile ? "grid-cols-1" : "md:grid-cols-5"}`}>
                      <div className={`${isMobile ? "order-2 p-6" : "md:col-span-2 p-8"} flex flex-col justify-between relative`}>
                        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${study.color}`}></div>
                        <div>
                          <h3 className="case-title text-2xl md:text-4xl font-bold mb-3">
                            {study.title}
                          </h3>
                          <div className="case-subtitle text-gray-400 text-sm mb-4 md:mb-6">
                            {study.subtitle}
                          </div>
                          <div className="case-description text-gray-300 text-sm mb-6 md:mb-8">
                            {study.description}
                          </div>
                          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                            {study.stats.map((stat, i) => (
                              <div
                                key={i}
                                className="stat-item bg-white/5 p-2 md:p-3 rounded-lg border border-white/10 backdrop-blur-sm"
                              >
                                <div className={`text-base md:text-xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                                  {stat.value}
                                </div>
                                <div className="text-[10px] md:text-xs text-gray-400">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Button className="case-button group w-full bg-transparent backdrop-blur-sm border border-white/10 hover:bg-white/10">
                            <span>Bekijk volledige casestudy</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                      <div className={`${isMobile ? "order-1 h-52" : "md:col-span-3 h-[600px]"} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                        <Image
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover"
                          width={1000}
                          height={1000}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Desktop with animations: 3D scroll effect
          const { opacity, rotateY, scale } = motionValues[index];
          return (
            <motion.div
              key={study.id}
              className="case-study absolute inset-0 flex items-center justify-center"
              style={{
                opacity,
                rotateY,
                scale,
                zIndex: caseStudies.length - index,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="container px-4 md:px-6">
                <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-5">
                    <div className="md:col-span-2 p-8 flex flex-col justify-between relative">
                      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${study.color}`}></div>
                      <div>
                        <h3 className="case-title text-2xl md:text-4xl font-bold mb-3">
                          {study.title}
                        </h3>
                        <div className="case-subtitle text-gray-400 text-sm mb-4 md:mb-6">
                          {study.subtitle}
                        </div>
                        <div className="case-description text-gray-300 text-sm mb-6 md:mb-8">
                          {study.description}
                        </div>
                        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                          {study.stats.map((stat, i) => (
                            <div
                              key={i}
                              className="stat-item bg-white/5 p-2 md:p-3 rounded-lg border border-white/10 backdrop-blur-sm"
                            >
                              <div className={`text-base md:text-xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                                {stat.value}
                              </div>
                              <div className="text-[10px] md:text-xs text-gray-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Button className="case-button group w-full bg-transparent backdrop-blur-sm border border-white/10 hover:bg-white/10">
                          <span>Bekijk volledige casestudy</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                    <div className="md:col-span-3 h-[600px] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                      <Image
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover"
                        width={1000}
                        height={1000}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scroll Indicator - only on desktop with animations */}
      {useScrollAnimation && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="animate-bounce text-white/60 text-sm font-medium">
            Scroll om meer te ontdekken
          </div>
        </div>
      )}

      {/* CSS */}
      <style jsx>{`
        .case-study {
          transition: opacity 0.3s ease;
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .showcase-section {
            scroll-snap-type: y proximity;
          }
          
          .showcase-header {
            scroll-snap-align: start;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .case-study, .stat-item {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}