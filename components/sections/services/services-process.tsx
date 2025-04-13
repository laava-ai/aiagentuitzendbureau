"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

export function ServicesProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Analyse & Strategie",
      description: "We beginnen met een grondige analyse van uw bedrijfsbehoeften en doelstellingen om een op maat gemaakte AI-strategie te ontwikkelen.",
      image: "/images/meeting.png"
    },
    {
      title: "Ontwikkeling & Implementatie",
      description: "We bouwen en implementeren AI-oplossingen die perfect aansluiten bij uw vereisten, met regelmatige feedbackmomenten.",
      image: "/images/development.png"
    },
    {
      title: "Training & Integratie",
      description: "We zorgen voor een soepele integratie met uw bestaande systemen en bieden uitgebreide training voor uw team.",
      image: "/images/training.png"
    },
    {
      title: "Optimalisatie & Ondersteuning",
      description: "We bieden doorlopende ondersteuning en optimaliseren voortdurend uw AI-oplossingen voor maximale prestaties.",
      image: "/images/support.png"
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 bg-[#0A0F2C]/95"
    >
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Onze Aanpak
        </motion.h2>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Left column - Steps */}
          <div className="relative">
            {steps.map((step, index) => (
              <div key={index}>
                <motion.div 
                  className={`relative pl-16 group transition-all duration-300 mb-8 ${activeStep === index ? 'scale-105' : 'hover:scale-102'}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <div 
                    className={`absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full
                      ${activeStep === index ? 'bg-gradient-to-r from-purple-500 to-blue-400 ring-4 ring-purple-500/20' : 'bg-purple-500/80 hover:bg-purple-500'}
                      text-white font-bold text-xl shadow-lg transition-all duration-300 z-10`}
                  >
                    {index + 1}
                  </div>
                  <h3 
                    className={`text-2xl font-bold mb-2 transition-colors duration-300
                      ${activeStep === index ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400' : 'text-gray-100'}`}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className={`text-gray-300 text-lg transition-opacity duration-300
                      ${activeStep === index ? 'opacity-100' : 'opacity-75'}`}
                  >
                    {step.description}
                  </p>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="h-[1px] bg-gray-700 ml-6 mb-8"></div>
                )}
              </div>
            ))}
          </div>

          {/* Right column - Image */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div 
              className="bg-sky-950 border border-white/5 p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="aspect-video relative mb-6 rounded-lg overflow-hidden">
                <Image
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 mb-4">
                {steps[activeStep].title}
              </h4>
              <p className="text-gray-300 text-lg leading-relaxed">
                {activeStep === 0 && (
                  "Ons proces begint met een volledig gratis, vrijblijvende AI-scan om snel inzicht te krijgen in uw bedrijf. Vervolgens duiken we dieper in het begrijpen van uw bedrijfsdoelen, uitdagingen en kansen, waarbij we een uitgebreide analyse uitvoeren om te identificeren waar AI de meeste waarde kan toevoegen aan uw activiteiten."
                )}
                {activeStep === 1 && (
                  "Tijdens de ontwikkelingsfase werken we nauw samen met uw team om AI-oplossingen te creëren die precies aansluiten bij uw behoeften. We volgen een iteratieve aanpak om ervoor te zorgen dat elke functie voldoet aan uw verwachtingen en naadloos integreert met uw bestaande processen."
                )}
                {activeStep === 2 && (
                  "Succesvolle AI-implementatie vereist meer dan alleen technologie. We zorgen ervoor dat uw team volledig is toegerust om met de nieuwe AI-tools te werken. Onze uitgebreide trainingen en gestroomlijnde integratie zorgen ervoor dat de overgang soepel verloopt en het systeem vanaf dag één optimaal wordt benut."
                )}
                {activeStep === 3 && (
                  "Onze relatie eindigt niet bij de implementatie. We bieden doorlopende ondersteuning en voortdurende optimalisatie om ervoor te zorgen dat uw AI-oplossingen blijven evolueren met uw bedrijf. Door prestaties te monitoren en regelmatige updates uit te voeren, zorgen we ervoor dat u maximale ROI blijft realiseren."
                )}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 