"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone, Clock, Linkedin, MessagesSquare, Brain, Sparkles } from "lucide-react";
import { InteractiveAIOrb } from "@/components/ui/animations/interactive-ai-orb";
import Image from "next/image";

export function ContactInfo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const benefits = [
    {
      icon: <MessagesSquare className="h-6 w-6 text-purple-400" />,
      title: "Menselijke Samenwerking",
      description: "Onze AI-agents werken naadloos samen met uw bestaande team"
    },
    {
      icon: <Brain className="h-6 w-6 text-blue-400" />,
      title: "Intelligente Automatisering",
      description: "Routinetaken automatiseren zodat uw team kan focussen op waarde"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-green-400" />,
      title: "Altijd Beschikbaar",
      description: "24/7 ondersteuning zonder vermoeidheid of onderbrekingen"
    }
  ];

  return (
    <motion.div 
      ref={ref}
      className="lg:w-2/5 w-full order-2 lg:order-2 text-center lg:text-left lg:pl-10"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="bg-[#0A1435]/90 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/5 mb-8 transform hover:translate-y-[-5px] transition-all duration-300">
        <motion.h3 
          className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Waarom AI-assistenten?
        </motion.h3>
        
        <div className="space-y-5">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={benefit.title}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
            >
              <div className="p-3 rounded-lg bg-white/5 flex-shrink-0 mt-1">
                {benefit.icon}
              </div>
              <div>
                <h4 className="text-white font-medium text-lg">{benefit.title}</h4>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div
        className="bg-[#0A1435]/90 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/5 transform hover:translate-y-[-5px] transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Contactgegevens
        </h3>
        
        <div className="space-y-5">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <Mail className="h-5 w-5 text-purple-400" />
            </div>
            <a href="mailto:info@laava.nl" className="text-white hover:text-purple-400 transition-colors">
              info@laava.nl
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-full">
              <Linkedin className="h-5 w-5 text-blue-400" />
            </div>
            <a href="https://www.linkedin.com/company/laava-nl" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
              Laava B.V.
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-full">
              <Clock className="h-5 w-5 text-green-400" />
            </div>
            <span className="text-white">
              KvK: 97025356
            </span>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <InteractiveAIOrb size={100} />
        </div>
      </motion.div>
    </motion.div>
  );
} 