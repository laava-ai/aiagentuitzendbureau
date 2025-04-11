"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      className="relative py-32 overflow-hidden"
      id="cta"
    >
      {/* Particle background */}
      <ParticleField 
        className="absolute inset-0 -z-10"
        particleCount={70}
        particleColor="#6366f1"
        particleSize={1.5}
        connectionRadius={120}
        interactiveRadius={200}
        backgroundLayer={false}
      />
      
      {/* Gradient spotlight */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20 bg-gradient-radial from-primary/50 via-primary/10 to-transparent pointer-events-none -z-10"
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Glass card container */}
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg bg-white/5 dark:bg-black/10"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary opacity-60" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary opacity-60" />
            
            {/* Content */}
            <div className="p-10 md:p-16 text-center relative z-10">
              <RevealText
                text="Experience the Future of Work"
                as="h2"
                textStyle="gradient"
                className="text-4xl md:text-5xl font-bold mb-6"
                preset="word"
                staggerChildren={0.08}
              />
              
              <RevealText
                text="Join hundreds of organizations using Laava's AI solutions to transform operations, enhance productivity, and unlock new possibilities."
                as="p" 
                className="text-lg mb-12 max-w-3xl mx-auto text-muted-foreground"
                preset="word"
                staggerChildren={0.02}
                delay={0.4}
              />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                    className="group bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0 text-white px-8"
                  >
                    <span>Get Started Today</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/10 hover:bg-white/5 backdrop-blur-sm"
                >
                  Schedule a Demo
                </Button>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -right-4 top-8 rotate-12 bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/10 hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500/20 p-1.5 rounded-full">
                    <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Fast Integration</span>
                </div>
              </div>
              
              <div className="absolute -left-2 bottom-12 -rotate-6 bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/10 hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500/20 p-1.5 rounded-full">
                    <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Award-winning AI</span>
                </div>
              </div>
            </div>
            
            {/* Decorative rings */}
            <motion.div
              className="absolute -top-32 -right-32 w-64 h-64 border border-primary/20 rounded-full"
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
              className="absolute -bottom-40 -left-40 w-80 h-80 border border-primary/10 rounded-full"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 