"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MorphingBlob } from "@/components/ui/animations/morphing-blob";
import { RevealText } from "@/components/ui/atoms/reveal-text";
import { InteractiveAIOrb } from "@/components/ui/animations/interactive-ai-orb";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-[calc(100vh-80px)] flex items-center pt-24 pb-12 md:py-24 overflow-hidden"
      id="hero"
    >
      {/* Morphing blob backgrounds */}
      <MorphingBlob 
        className="opacity-40 top-0 left-1/2 -translate-x-1/2"
        colors={["#6366f1", "#8b5cf6", "#6366f1"]}
        size={900}
        blur={120}
      />
      
      <MorphingBlob 
        className="opacity-20 bottom-0 right-0 translate-x-1/3 translate-y-1/3"
        colors={["#3b82f6", "#8b5cf6", "#ec4899"]}
        size={600}
        blur={80}
        duration={25}
        complexity={7}
      />
      
      {/* Floating element */}
      <motion.div
        className="absolute right-[10%] top-[20%] w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-md opacity-60 hidden md:block"
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y1 }}
      />
      
      <motion.div
        className="absolute left-[15%] bottom-[25%] w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-sm opacity-50 hidden md:block"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y2 }}
      />
      
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <span className="mr-2">✨</span> Uw AI Collega
              </div>
              
              <div className="mb-6">
                <RevealText
                  text="Ontmoet Je Nieuwe Digitale Teamgenoot"
                  as="h1"
                  textStyle="gradient"
                  className="text-5xl md:text-7xl font-bold tracking-tight mb-2"
                  preset="word"
                  staggerChildren={0.08}
                  delay={0.2}
                />
                
                <RevealText
                  text="Intelligent, adaptief en altijd beschikbaar"
                  as="h2"
                  textStyle="outline"
                  className="text-2xl md:text-3xl font-light"
                  preset="word"
                  staggerChildren={0.05}
                  delay={0.6}
                />
              </div>
              
              <RevealText
                text="Laava creëert intelligente AI-collega's die naadloos integreren met je team, complexe taken automatiseren en de productiviteit in je hele organisatie verbeteren."
                as="p"
                className="text-lg text-muted-foreground mb-8 max-w-2xl"
                preset="word"
                delay={0.8}
                staggerChildren={0.01}
              />
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Button size="lg" className="group bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0">
                  <span>Verbind met AI</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10">
                  Hoe het werkt
                </Button>
              </motion.div>
              
              <motion.div 
                className="mt-12 grid grid-cols-3 gap-4 max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                {[
                  { label: "Taken Geautomatiseerd", value: "5M+" },
                  { label: "Tijd Bespaard", value: "98%" },
                  { label: "AI Nauwkeurigheid", value: "99.6%" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-gradient">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl opacity-30" />
              
              {/* The interactive AI orb */}
              <InteractiveAIOrb 
                size={350}
                pulseColor="#6366f1"
                glowColor="rgba(99, 102, 241, 0.4)"
                idleMessages={[
                  "Hallo daar! 👋",
                  "Ik ben je AI-collega",
                  "Laten we samenwerken",
                  "Ik kan helpen met taken",
                  "Ik leer van onze interacties",
                  "Vraag me alles",
                  "Ik sta klaar om te helpen",
                  "Ik werk 24/7",
                  "Geen koffiepauzes nodig",
                  "Samen bereiken we meer",
                ]}
              />
              
              {/* Feature badges around the orb */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-black/60 backdrop-blur-md rounded-lg py-2 px-3 border border-white/10 shadow-xl"
                initial={{ opacity: 0, y: 20, rotate: 5 }}
                animate={{ opacity: 1, y: 0, rotate: 5 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-green-500/20 p-1.5 rounded-full">
                    <svg className="h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-white">Continu Lerend</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-2 left-10 bg-black/60 backdrop-blur-md rounded-lg py-2 px-3 border border-white/10 shadow-xl"
                initial={{ opacity: 0, y: -20, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: -3 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500/20 p-1.5 rounded-full">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-white">Bliksemnel</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -left-6 top-1/3 bg-black/60 backdrop-blur-md rounded-lg py-2 px-3 border border-white/10 shadow-xl"
                initial={{ opacity: 0, x: 20, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-purple-500/20 p-1.5 rounded-full">
                    <svg className="h-3 w-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-white">Veilig & Privé</span>
                </div>
              </motion.div>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 350 350">
                <motion.path 
                  d="M175,175 L290,80" 
                  stroke="rgba(99, 102, 241, 0.3)" 
                  strokeWidth="1" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ delay: 1.8, duration: 1 }}
                />
                <motion.path 
                  d="M175,175 L85,170" 
                  stroke="rgba(99, 102, 241, 0.3)" 
                  strokeWidth="1" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ delay: 2, duration: 1 }}
                />
                <motion.path 
                  d="M175,175 L180,290" 
                  stroke="rgba(99, 102, 241, 0.3)" 
                  strokeWidth="1" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ delay: 2.2, duration: 1 }}
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 