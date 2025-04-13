"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function AboutTeam() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const teamMembers = [
    {
      name: "Alec Siemerink",
      role: "Co-Founder",
      image: "/images/alec.jpeg",
      linkedin: "https://www.linkedin.com/in/alecsiemerink/",
      bio: "Alec heeft een passie voor het ontwerpen van AI-oplossingen die menselijke capaciteiten versterken. Hij leidt onze AI-agent ontwikkeling en implementatiestrategieën."
    },
    {
      name: "Ruben Haisma",
      role: "Co-Founder",
      image: "/images/ruben.jpg",
      linkedin: "https://www.linkedin.com/in/ruben-haisma-526a70158/",
      bio: "Ruben richt zich op het creëren van AI-agents die naadloos samenwerken met mensen, waardoor teams productiever en creatiever kunnen worden."
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 bg-[#080F26]"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Ons Team
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            AI Agent Uitzendbureau werd opgericht door ondernemers met een visie voor de toekomst van werk, 
            waarin mensen en AI samen excelleren. We bouwen intelligente assistenten die menselijke teams 
            versterken en organisaties helpen hun volledige potentieel te bereiken.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + (index * 0.2) }}
            >
              <div className="aspect-square relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <div className="text-purple-400 mb-4 flex items-center justify-between">
                  <span>{member.role}</span>
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                </div>
                <p className="text-gray-300">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 