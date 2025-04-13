"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function ServicesHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-b from-[#080F26] to-[#0A0F2C]"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Onze Diensten
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Wij leveren geavanceerde AI-agents die uw team ondersteunen en versterken. Onze agents werken 24/7, zijn uiterst nauwkeurig en direct inzetbaar om de capaciteiten van uw organisatie te maximaliseren en uw medewerkers vrij te maken voor werk dat écht menselijke creativiteit vereist.
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </section>
  );
} 