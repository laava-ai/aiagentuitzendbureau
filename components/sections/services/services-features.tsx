"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function ServicesFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      title: "AI Agents voor bedrijfsgroei",
      subtitle: "Optimaliseer uw processen",
      description: "AI Agents zijn uw onvermoeibare digitale werknemers, klaar om volledige rollen binnen uw bedrijf over te nemen. Van het automatiseren van leadgeneratie tot het beheren van klantrelaties, deze agents voeren taken uit met volledige nauwkeurigheid. Dit stelt uw team in staat zich te richten op strategische groei. Schaal uw activiteiten zonder extra personeel, verminder kosten en verhoog de productiviteit.",
      imageSrc: "/images/growth.png",
      benefits: ["Geautomatiseerde leadgeneratie", "Verbeterde klantbetrokkenheid"]
    },
    {
      title: "Sales & Marketing",
      subtitle: "Maximaliseer uw omzet",
      description: "Versterk uw sales- en marketingteams met AI Agents die leads genereren, gepersonaliseerde benaderingen uitvoeren en follow-ups automatiseren. Door naadloze integratie met uw CRM zorgen deze agents ervoor dat geen enkele lead wordt gemist en elke interactie wordt geoptimaliseerd voor conversie.",
      imageSrc: "/images/salesmarketing.png",
      benefits: ["Gepersonaliseerde benadering", "Geautomatiseerde follow-ups"]
    },
    {
      title: "Customer Success",
      subtitle: "Verhoog de klanttevredenheid",
      description: "Lever uitzonderlijke klantenservice met AI Agents die voortdurend beschikbaar zijn om vragen te beantwoorden, problemen op te lossen en proactieve ondersteuning te bieden. Dit zorgt voor verbeterde klanttevredenheid en loyaliteit, wat leidt tot langdurige zakelijke relaties.",
      imageSrc: "/images/support.png",
      benefits: ["24/7 ondersteuning", "Proactieve klantzorg"]
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 bg-[#080F26]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center pb-8 sm:pb-12">
          <motion.h2 
            className="h2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400 text-3xl sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Hyperautomation
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg text-gray-300 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ontgrendel de kracht van AI Agents: slimme virtuele assistenten die taken automatiseren, 
            klantinteracties verbeteren en uw bedrijfsprocessen optimaliseren. Verhoog efficiëntie en 
            klanttevredenheid terwijl uw team zich richt op groei en innovatie.
          </motion.p>
        </div>

        <div className="space-y-12 sm:space-y-20">
          {features.map((feature, index) => {
            const isEven = index % 2 !== 0;
            
            return (
              <motion.div 
                key={feature.title}
                className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center space-y-8 sm:space-y-8 md:space-y-0 md:space-x-8 bg-sky-950 rounded-lg p-4 sm:p-8`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + (index * 0.2) }}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.title}
                      width={540}
                      height={405}
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                </div>
                <div className={`w-full md:w-1/2 text-center md:text-left ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="text-blue-400 font-semibold text-base sm:text-lg mb-2">{feature.subtitle}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-200 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center justify-center md:justify-start">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300 text-sm sm:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 