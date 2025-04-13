"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function AboutMission() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 bg-[#0A0F2C]/95"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
              <Image
                src="/images/mission.png"
                alt="Our Mission"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080F26]/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
          </motion.div>
          
          {/* Right column - Content */}
          <div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Onze Missie
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Onze missie is de toekomst van werk te herdefiniëren door het menselijke potentieel te versterken 
              met superieure AI-assistenten. We geloven dat bedrijven efficiënter, productiever en winstgevender 
              kunnen worden wanneer hun medewerkers worden bevrijd van routinematige taken.
            </motion.p>
            
            <motion.p
              className="text-lg text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Wij bouwen de perfecte digitale assistenten: AI-agents die 24/7 werken, consistent presteren 
              en zich voortdurend verbeteren. Deze agents vullen menselijke vaardigheden aan en stellen teams 
              in staat zich te concentreren op creatief, strategisch werk dat echte menselijke intelligentie vereist.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <svg className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 8L16 12L10 16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white font-medium">Efficiëntie</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white font-medium">Innovatie</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white font-medium">Partnerschap</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 