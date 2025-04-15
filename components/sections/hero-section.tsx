"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MorphingBlob } from "@/components/ui/animations/morphing-blob";
import { RevealText } from "@/components/ui/atoms/reveal-text";
import { InteractiveAIOrb } from "@/components/ui/animations/interactive-ai-orb";
import { CountUp } from "@/components/ui/animations/count-up";
import { useMobileOptimizer } from "@/components/ui/mobile-optimizer";
import Image from "next/image";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, isLowEndDevice, prefersReducedMotion, disableAllAnimations } = useMobileOptimizer();
  
  // Parallax scrolling effect - disabled on mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Only apply parallax on desktop
  const parallaxStrength = disableAllAnimations ? 0 : 1;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300 * parallaxStrength]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200 * parallaxStrength]);
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-[calc(100vh-80px)] flex items-center pt-24 pb-12 md:py-24 overflow-hidden"
      id="hero"
    >
      {/* Morphing blob backgrounds - only on desktop */}
      {!disableAllAnimations && (
        <>
          <MorphingBlob 
            className="opacity-40 top-0 left-1/2 -translate-x-1/2"
            colors={["#6366f1", "#8b5cf6", "#6366f1"]}
            size={isMobile ? 700 : 900}
            blur={isMobile ? 90 : 120}
          />
          
          {/* Second blob only on desktop */}
          <MorphingBlob 
            className="opacity-20 bottom-0 right-0 translate-x-1/3 translate-y-1/3"
            colors={["#3b82f6", "#8b5cf6", "#ec4899"]}
            size={600}
            blur={80}
            duration={25}
            complexity={7}
          />
        </>
      )}
      
      {/* Floating elements - only shown on desktop */}
      {!disableAllAnimations && (
        <>
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
        </>
      )}
      
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {disableAllAnimations ? (
              // Static content for mobile - no animations
              <div>
                <div className="mb-6">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2 text-gradient">
                    AI Agents: Uw Nieuwe Digitale Collega&apos;s
                  </h1>
                  
                  <h2 className="text-2xl md:text-3xl font-light text-black text-gradient">
                    Intelligente AI-assistenten die uw team versterken
                  </h2>
                </div>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                  Laava ontwikkelt geavanceerde AI-agents die als digitale collega&apos;s naadloos samenwerken met uw team. Onze intelligente computer collega&apos;s automatiseren complexe taken, verbeteren besluitvorming en verhogen de productiviteit in uw hele organisatie.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="group bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0">
                    <span>Verbind met AI</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10">
                    Hoe het werkt
                  </Button>
                </div>
                
                <div className="mt-12 grid grid-cols-3 gap-4 max-w-sm">
                  {[
                    { label: "Taken Geautomatiseerd", value: "5M+" },
                    { label: "Tijd Bespaard", value: "98%" },
                    { label: "AI Nauwkeurigheid", value: "99.6%" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-gradient">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Animated content for desktop
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-6">
                  <RevealText
                    text="AI Agents: Uw Nieuwe Digitale Collega's"
                    as="h1"
                    textStyle="gradient"
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-2"
                    preset="word"
                    staggerChildren={isMobile ? 0.04 : 0.08}
                    delay={isMobile ? 0.1 : 0.2}
                  />
                  
                  <RevealText
                    text="Intelligente AI-assistenten die uw team versterken"
                    as="h2"
                    textStyle="gradient"
                    className="text-2xl md:text-3xl font-light text-black"
                    preset="word"
                    staggerChildren={isMobile ? 0.03 : 0.05}
                    delay={isMobile ? 0.3 : 0.6}
                  />
                </div>
                
                <RevealText
                  text="Laava ontwikkelt geavanceerde AI-agents die als digitale collega's naadloos samenwerken met uw team. Onze intelligente computer collega's automatiseren complexe taken, verbeteren besluitvorming en verhogen de productiviteit in uw hele organisatie."
                  as="p"
                  className="text-lg text-muted-foreground mb-8 max-w-2xl"
                  preset="word"
                  delay={isMobile ? 0.4 : 0.8}
                  staggerChildren={isMobile ? 0.05 : 0.01}
                />
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0.6 : 1.2 }}
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
                  transition={{ delay: isMobile ? 0.8 : 1.5, duration: isMobile ? 0.6 : 1 }}
                >
                  {[
                    { label: "Taken Geautomatiseerd", value: "5M+" },
                    { label: "Tijd Bespaard", value: "98%" },
                    { label: "AI Nauwkeurigheid", value: "99.6%" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-gradient">
                        <CountUp 
                          end={stat.value} 
                          duration={isMobile ? 2 : 3}
                          delay={isMobile ? (0.3 + index * 0.15) : (0.5 + index * 0.3)}
                          className="text-gradient"
                        />
                      </p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            {disableAllAnimations ? (
              // Static image for mobile
              <div className="relative" style={{ width: 280, height: 280 }}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl opacity-30" />
                <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-700 opacity-80" />
                </div>
              </div>
            ) : (
              // Animated orb for desktop
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: isMobile ? 0.6 : 1, delay: isMobile ? 0.2 : 0.5 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl opacity-30" />
                
                {/* The interactive AI orb - smaller on mobile */}
                <InteractiveAIOrb 
                  size={isMobile ? 280 : 350}
                  pulseColor="#6366f1"
                  glowColor="rgba(99, 102, 241, 0.4)"
                />
                
                {/* Connection lines - simplified or removed on mobile */}
                {!isLowEndDevice && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 350 350">
                    <motion.path 
                      d="M175,175 L290,80" 
                      stroke="rgba(99, 102, 241, 0.3)" 
                      strokeWidth="1" 
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: isMobile ? 0.5 : 0.7 }}
                      transition={{ delay: isMobile ? 0.9 : 1.8, duration: isMobile ? 0.6 : 1 }}
                    />
                    {(!isMobile || !isLowEndDevice) && (
                      <>
                        <motion.path 
                          d="M175,175 L85,170" 
                          stroke="rgba(99, 102, 241, 0.3)" 
                          strokeWidth="1" 
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: isMobile ? 0.5 : 0.7 }}
                          transition={{ delay: isMobile ? 1.1 : 2, duration: isMobile ? 0.6 : 1 }}
                        />
                        <motion.path 
                          d="M175,175 L180,290" 
                          stroke="rgba(99, 102, 241, 0.3)" 
                          strokeWidth="1" 
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: isMobile ? 0.5 : 0.7 }}
                          transition={{ delay: isMobile ? 1.3 : 2.2, duration: isMobile ? 0.6 : 1 }}
                        />
                      </>
                    )}
                  </svg>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 