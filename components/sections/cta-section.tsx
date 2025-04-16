"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RevealText } from "@/components/ui/atoms/reveal-text";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { 
  OptimizedMotionDiv,
  useOptimizedAnimationProps
} from "@/components/ui/optimized-motion";
import { useMobileOptimizer } from "@/components/ui/mobile-optimizer";

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoverState, setHoverState] = useState(false);
  const { isMobile, disableAllAnimations } = useMobileOptimizer();
  
  // Only use animations on desktop
  const useAnimations = !disableAllAnimations && !isMobile;
  
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
      {/* Enhanced Particle background - only on desktop */}
      {useAnimations && (
        <ParticleField 
          className="absolute inset-0 -z-10"
          particleCount={90}
          particleColor="#6366f1"
          particleSize={1.8}
          connectionRadius={140}
          interactiveRadius={220}
          backgroundLayer={false}
        />
      )}
      
      {/* Gradient spotlight with enhanced animation - only on desktop */}
      {useAnimations && (
        <>
          <OptimizedMotionDiv
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
          <OptimizedMotionDiv
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
        </>
      )}
      
      {/* Glass card container */}
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <OptimizedMotionDiv
            className="relative overflow-hidden rounded-3xl backdrop-blur-xl border border-white/15 shadow-2xl bg-white/5 dark:bg-black/10"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enhanced animated corner accents - only on desktop */}
            {useAnimations && (
              <>
                <OptimizedMotionDiv 
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
                <OptimizedMotionDiv 
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
              </>
            )}
            
            {/* Content */}
            <div className="p-12 md:p-20 text-center relative z-10">
              {!useAnimations ? (
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gradient">
                  Ervaar de Toekomst van Werk
                </h2>
              ) : (
                <RevealText
                  text="Ervaar de Toekomst van Werk"
                  as="h2"
                  textStyle="gradient"
                  className="text-4xl md:text-6xl font-bold mb-8"
                  preset="word"
                  staggerChildren={0.08}
                />
              )}
              
              {!useAnimations ? (
                <p className="text-lg md:text-xl mb-14 max-w-3xl mx-auto text-muted-foreground">
                  Doe mee met honderden organisaties die Laava&apos;s AI-oplossingen gebruiken om processen te transformeren, productiviteit te verhogen en nieuwe mogelijkheden te ontsluiten.
                </p>
              ) : (
                <RevealText
                  text="Doe mee met honderden organisaties die Laava's AI-oplossingen gebruiken om processen te transformeren, productiviteit te verhogen en nieuwe mogelijkheden te ontsluiten."
                  as="p" 
                  className="text-lg md:text-xl mb-14 max-w-3xl mx-auto text-muted-foreground"
                  preset="word"
                  staggerChildren={0.02}
                  delay={0.4}
                />
              )}
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {useAnimations ? (
                  <OptimizedMotionDiv
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
                      asChild
                    >
                      <Link href="/contact">
                        <Sparkles className="mr-2 h-5 w-5" />
                        <span>Begin Vandaag</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </OptimizedMotionDiv>
                ) : (
                  <Button 
                    size="lg"
                    className="group bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0 text-white px-10 py-7 rounded-xl transition-all duration-300 text-base shadow-lg shadow-indigo-500/20"
                    asChild
                  >
                    <Link href="/contact">
                      <Sparkles className="mr-2 h-5 w-5" />
                      <span>Begin Vandaag</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/15 hover:bg-white/10 backdrop-blur-sm px-10 py-7 rounded-xl transition-all duration-300 text-base"
                  asChild
                >
                  <Link href="/demo">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Plan een Demo</span>
                  </Link>
                </Button>
              </div>
              
              {/* Repositioned floating badges - only on desktop */}
              {useAnimations && (
                <>
                  <OptimizedMotionDiv 
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
                  </OptimizedMotionDiv>
                  
                  <OptimizedMotionDiv 
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
                  </OptimizedMotionDiv>
                </>
              )}
            </div>
          </OptimizedMotionDiv>
        </div>
      </div>
    </section>
  );
} 