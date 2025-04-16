"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, MessageSquare, Database, Users, Cpu, Bot, BarChart3, Lightbulb } from "lucide-react";
import { RevealText } from "@/components/ui/atoms/reveal-text";
import { PerspectiveCard } from "@/components/ui/atoms/perspective-card";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  index: number;
  color: string;
}

function FeatureCard({ title, description, icon, index, color }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <PerspectiveCard
        className="h-full rounded-xl overflow-hidden"
        depth={40}
        rotationIntensity={10}
        shadow={true}
        glare={true}
        backgroundGradient={true}
        border={true}
      >
        <div className="p-6 h-full flex flex-col">
          <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-5`}>
            {icon}
          </div>
          
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm flex-grow">
            {description}
          </p>
          
          <div className="mt-6 pt-4 border-t border-gray-200/10">
            <Link href="/services">
              <motion.div
                className="flex items-center text-xs text-primary font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span>Meer informatie</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                  <path d="M1.16699 7H12.8337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 1.16675L12.8333 7.00008L7 12.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </Link>
          </div>
        </div>
      </PerspectiveCard>
    </motion.div>
  );
}

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI Agent Automatisering",
      description: "Verbeter werkprocessen met intelligente AI-agents die repetitieve taken en complexe workflows autonoom uitvoeren en zich aanpassen aan specifieke behoeften.",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Conversatie-AI Assistenten",
      description: "Geavanceerde AI-agents voor natuurlijke gesprekken die context begrijpen en als digitale collega's fungeren bij klantinteracties en team-ondersteuning.",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data-analyse Agents",
      description: "Transformeer ruwe data in strategische inzichten met AI-agents die patronen herkennen, anomalieën detecteren en besluitvorming ondersteunen.",
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Computer Collega's",
      description: "Digitale teamleden die naadloos samenwerken met uw menselijke medewerkers, taken overnemen en de productiviteit verhogen met AI-gestuurde assistentie.",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Zelfverbeterende AI-agents",
      description: "Intelligente agents die continu leren van interacties en feedback, waardoor ze steeds effectiever worden als uw digitale collega's.",
      color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Voorspellende AI Collega's",
      description: "AI-agents die trends voorspellen en proactief handelen door historische data te analyseren, waardoor uw team altijd een stap vooruit blijft.",
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "Gepersonaliseerde AI-agents",
      description: "Op maat gemaakte digitale assistenten die exact aansluiten op uw branche, bedrijfsprocessen en specifieke uitdagingen.",
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovatieve Computer Collega's",
      description: "Digitale teamgenoten die innovatie versnellen door AI-gestuurde ideevorming, probleem-oplossing en creatieve ondersteuning.",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <section 
      ref={ref}
      className="py-24 relative overflow-hidden"
      id="features"
    >
      {/* Background decorative grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      
      {/* Circular gradients */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl opacity-60" />
      
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          
          <RevealText
            text="Intelligente AI-agents als Digitale Collega's"
            as="h2"
            textStyle="gradient"
            className="text-4xl md:text-5xl font-bold mb-6"
            preset="word"
            staggerChildren={0.08}
          />
          
          <RevealText
            text="Onze geavanceerde AI-agents functioneren als volwaardige computer collega's die naadloos integreren in uw team en de werkwijze van uw organisatie transformeren."
            as="p" 
            className="text-lg text-muted-foreground"
            preset="word"
            staggerChildren={0.02}
            delay={0.4}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
              color={feature.color}
            />
          ))}
        </div>
        
        {/* Bottom decorative element */}
        <div className="mt-20 flex justify-center relative overflow-hidden">
          <motion.div
            className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  );
} 