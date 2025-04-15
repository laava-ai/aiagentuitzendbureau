"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Lightbulb, GraduationCap, Target, Cpu, Sparkles } from "lucide-react";
import { useMobileOptimizer } from "@/components/ui/mobile-optimizer";

export function ServicesOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { isMobile, isLowEndDevice, disableAllAnimations } = useMobileOptimizer();

  const services = [
    {
      title: "Administratieve Ondersteuning",
      description: "Digitale assistenten die routinetaken volledig automatiseren, zodat uw medewerkers zich kunnen richten op strategische, waardevolle taken.",
      icon: <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    },
    {
      title: "Klantenservice Versterking",
      description: "24/7 beschikbare AI-assistenten die uw klantenservice team ondersteunen voor snellere reactietijden en hogere klanttevredenheid.",
      icon: <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    },
    {
      title: "AI-Teamintegratie",
      description: "Training voor uw medewerkers om optimaal samen te werken met AI-collega&apos;s en hun productiviteit te verhogen.",
      icon: <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    },
    {
      title: "Digitale Transformatie",
      description: "Strategische begeleiding bij de integratie van AI in uw bedrijfsprocessen voor betere resultaten en concurrentievoordeel.",
      icon: <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    },
    {
      title: "Gespecialiseerde AI-Assistenten",
      description: "Op maat gemaakte AI-experts voor gespecialiseerde taken zoals data-analyse, programmeren, ontwerp en marketing.",
      icon: <Cpu className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    },
    {
      title: "Team-Augmentatie",
      description: "Uitbreiding van uw bestaande teams met AI-krachten die naadloos samenwerken en de productiviteit verveelvoudigen.",
      icon: <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-16 md:py-32 bg-[#0A0F2C]/95"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {disableAllAnimations ? (
          // Static content for mobile
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 mb-2 sm:mb-4">Onze diensten</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
              Versterk uw team met AI-agents die continu beschikbaar zijn, zich nooit vermoeien en uw medewerkers bevrijden van repetitieve taken zodat zij kunnen excelleren in wat ze het beste doen.
            </p>
          </div>
        ) : (
          // Animated content for desktop
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 mb-2 sm:mb-4">Onze diensten</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
              Versterk uw team met AI-agents die continu beschikbaar zijn, zich nooit vermoeien en uw medewerkers bevrijden van repetitieve taken zodat zij kunnen excelleren in wat ze het beste doen.
            </p>
          </motion.div>
        )}
        
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            disableAllAnimations ? (
              // Static service cards for mobile
              <div
                key={service.title}
                className="relative flex flex-col items-center p-4 sm:p-6 md:p-8 bg-[#0A1435] rounded-xl sm:rounded-2xl shadow-lg"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#1B2A4E] flex items-center justify-center mb-4 sm:mb-6">
                  <div className="text-purple-400">
                    {service.icon}
                  </div>
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">{service.title}</h4>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 text-center mb-4 sm:mb-6">{service.description}</p>
                <div className="mt-auto">
                  <a href="/contact" className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-400 transition-all duration-300">
                    Meer Info
                  </a>
                </div>
              </div>
            ) : (
              // Animated service cards for desktop
              <motion.div
                key={service.title}
                className="relative flex flex-col items-center p-4 sm:p-6 md:p-8 bg-[#0A1435] rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#1B2A4E] flex items-center justify-center mb-4 sm:mb-6">
                  <div className="text-purple-400">
                    {service.icon}
                  </div>
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">{service.title}</h4>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 text-center mb-4 sm:mb-6">{service.description}</p>
                <div className="mt-auto">
                  <a href="/contact" className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-400 transition-all duration-300">
                    Meer Info
                  </a>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
} 