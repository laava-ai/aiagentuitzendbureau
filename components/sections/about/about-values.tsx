"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function AboutValues() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const values = [
    {
      title: "Empowerment",
      description: "We geloven in het versterken van menselijke capaciteiten door AI in te zetten voor routinetaken, zodat mensen zich kunnen richten op wat ze het beste doen.",
      icon: (
        <svg className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 3H5.5C4.11929 3 3 4.11929 3 5.5V9.5C3 10.8807 4.11929 12 5.5 12H9.5C10.8807 12 12 10.8807 12 9.5V5.5C12 4.11929 10.8807 3 9.5 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.5 15H5.5C4.11929 15 3 16.1193 3 17.5V21.5C3 22.8807 4.11929 24 5.5 24H9.5C10.8807 24 12 22.8807 12 21.5V17.5C12 16.1193 10.8807 15 9.5 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21.5 3H17.5C16.1193 3 15 4.11929 15 5.5V9.5C15 10.8807 16.1193 12 17.5 12H21.5C22.8807 12 24 10.8807 24 9.5V5.5C24 4.11929 22.8807 3 21.5 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21.5 15H17.5C16.1193 15 15 16.1193 15 17.5V21.5C15 22.8807 16.1193 24 17.5 24H21.5C22.8807 24 24 22.8807 24 21.5V17.5C24 16.1193 22.8807 15 21.5 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Efficiency",
      description: "Onze AI-agents maken organisaties efficiënter door routinetaken 24/7 uit te voeren, zodat menselijke medewerkers hun tijd aan complexere, creatieve taken kunnen besteden.",
      icon: (
        <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Betrouwbaarheid",
      description: "Onze AI-assistenten bieden consistente, nauwkeurige ondersteuning die teams kunnen vertrouwen voor kritieke taken en processen.",
      icon: (
        <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Synergie",
      description: "Wij geloven in de kracht van mens-AI samenwerking, waarbij de sterktes van beide worden gecombineerd voor betere resultaten dan elk afzonderlijk zou kunnen bereiken.",
      icon: (
        <svg className="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Innovatie",
      description: "We blijven voortdurend innoveren om onze AI-assistenten beter, slimmer en effectiever te maken voor de behoeften van moderne organisaties.",
      icon: (
        <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Toekomstgerichtheid",
      description: "We bereiden organisaties voor op een toekomst waarin mens-AI samenwerking de norm is en waar bedrijven die deze synergie benutten succesvol zijn.",
      icon: (
        <svg className="h-8 w-8 text-indigo-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 bg-[#0A0F2C]/95"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Onze Waarden
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Bij AI Agent Uitzendbureau worden we gedreven door waarden die de toekomst van werk vormgeven.
            We geloven in de kracht van menselijke creativiteit, versterkt door de efficiëntie en consistentie van AI.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
            >
              <div className="bg-[#0A1435] p-4 rounded-lg mb-5 inline-block">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-300 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
    </section>
  );
} 