"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/ui/atoms/reveal-text";
import { ParticleField } from "@/components/ui/animations/particle-field";

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoverState, setHoverState] = useState(false);
  
  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)" 
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 30px 5px rgba(99, 102, 241, 0.5)" 
    }
  };
  
  return (
    <section 
      ref={ref}
      className="relative py-36 md:py-44 overflow-hidden"
      id="cta"
    >
      {/* Enhanced Particle background */}
      <ParticleField 
        className="absolute inset-0 -z-10"
        particleCount={90}
        particleColor="#6366f1"
        particleSize={1.8}
        connectionRadius={140}
        interactiveRadius={220}
        backgroundLayer={false}
      />
      
      {/* Gradient spotlight with enhanced animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30 bg-gradient-radial from-primary/60 via-primary/15 to-transparent pointer-events-none -z-10"
        animate={{
          opacity: [0.3, 0.4, 0.3],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20 bg-gradient-radial from-violet-500/40 via-violet-500/10 to-transparent pointer-events-none -z-10"
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      {/* Glass card container */}
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-3xl backdrop-blur-xl border border-white/15 shadow-2xl bg-white/5 dark:bg-black/10"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enhanced animated corner accents */}
            <motion.div 
              className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary opacity-70" 
              animate={{
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary opacity-70"
              animate={{
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            
            {/* Content */}
            <div className="p-12 md:p-20 text-center relative z-10">
              <RevealText
                text="Ervaar de Toekomst van Werk"
                as="h2"
                textStyle="gradient"
                className="text-4xl md:text-6xl font-bold mb-8"
                preset="word"
                staggerChildren={0.08}
              />
              
              <RevealText
                text="Doe mee met honderden organisaties die Laava's AI-oplossingen gebruiken om processen te transformeren, productiviteit te verhogen en nieuwe mogelijkheden te ontsluiten."
                as="p" 
                className="text-lg md:text-xl mb-14 max-w-3xl mx-auto text-muted-foreground"
                preset="word"
                staggerChildren={0.02}
                delay={0.4}
              />
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  animate={hoverState ? "hover" : "initial"}
                  onHoverStart={() => setHoverState(true)}
                  onHoverEnd={() => setHoverState(false)}
                  variants={buttonVariants}
                >
                  <Button 
                    size="lg"
                    className="group bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0 text-white px-10 py-7 rounded-xl transition-all duration-300 text-base shadow-lg shadow-indigo-500/20"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    <span>Begin Vandaag</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/15 hover:bg-white/10 backdrop-blur-sm px-10 py-7 rounded-xl transition-all duration-300 text-base"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>Plan een Demo</span>
                </Button>
              </div>
              
              {/* Repositioned floating badges */}
              <motion.div 
                className="absolute right-10 top-10 bg-gradient-to-r from-indigo-600/30 to-violet-600/30 backdrop-blur-md rounded-full py-2 px-4 border border-white/20 hidden md:flex items-center gap-2 shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? 
                  { opacity: 1, x: 0, y: [0, -5, 0], rotate: [0, 1, 0] } : 
                  { opacity: 0 }
                }
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                  }
                }}
              >
              </motion.div>
              
              <motion.div 
                className="absolute left-10 bottom-10 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 backdrop-blur-md rounded-full py-2 px-4 border border-white/20 hidden md:flex items-center gap-2 shadow-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? 
                  { opacity: 1, x: 0, y: [0, 5, 0], rotate: [0, -1, 0] } : 
                  { opacity: 0 }
                }
                transition={{ 
                  duration: 0.8, 
                  delay: 0.7,
                  y: {
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut"
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 5.5,
                    ease: "easeInOut"
                  }
                }}
              >
              </motion.div>
              
              <motion.div 
                className="absolute right-20 bottom-20 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 backdrop-blur-md rounded-full py-2 px-4 border border-white/20 hidden md:flex items-center gap-2 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? 
                  { opacity: 1, y: 0, x: [0, 5, 0], rotate: [0, 1, 0] } : 
                  { opacity: 0 }
                }
                transition={{ 
                  duration: 0.8, 
                  delay: 0.9,
                  x: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }
                }}
              >
              </motion.div>
              
              <motion.div 
                className="absolute left-20 top-20 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-md rounded-full py-2 px-4 border border-white/20 hidden md:flex items-center gap-2 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? 
                  { opacity: 1, scale: 1, y: [0, -3, 0], rotate: [0, -1, 0] } : 
                  { opacity: 0 }
                }
                transition={{ 
                  duration: 0.8, 
                  delay: 1.1,
                  y: {
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut"
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut"
                  }
                }}
              >
              </motion.div>
            </div>
            
            {/* Enhanced decorative rings */}
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 border border-primary/30 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <motion.div
              className="absolute -bottom-48 -left-48 w-96 h-96 border border-primary/20 rounded-full"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Additional decorative ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 border border-violet-500/10 rounded-full"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 