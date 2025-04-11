"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/ui/atoms/reveal-text";

const caseStudies = [
  {
    id: "ecommerce",
    title: "E-Commerce Revolution",
    subtitle: "How AI transformed customer service for a leading retailer",
    description: "A global e-commerce company implemented our AI solution to handle customer inquiries and automate order processing. The results were transformative, with response times cut by 72% and customer satisfaction scores increasing by 38%.",
    image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "72%", label: "Faster Responses" },
      { value: "38%", label: "Increased Satisfaction" },
      { value: "4.2x", label: "ROI Multiplier" },
    ],
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "healthcare",
    title: "Healthcare Innovation",
    subtitle: "AI-powered patient care and operational efficiency",
    description: "A leading healthcare provider deployed our AI system to optimize scheduling, streamline administrative tasks, and enhance patient communication. The results included reduced wait times and dramatic improvements in staff resource allocation.",
    image: "https://images.unsplash.com/photo-1631815588090-d1bcbe9b4b38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    stats: [
      { value: "35%", label: "Reduced Wait Times" },
      { value: "89%", label: "Staff Satisfaction" },
      { value: "41%", label: "Cost Reduction" },
    ],
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: "finance",
    title: "Financial Intelligence",
    subtitle: "AI-driven insights and risk mitigation",
    description: "A financial institution integrated our AI to analyze customer behavior and provide personalized service recommendations. The platform also identified potential risks and fraudulent activities with unprecedented accuracy.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "62%", label: "Faster Processing" },
      { value: "93%", label: "Detection Accuracy" },
      { value: "2.8x", label: "Revenue Growth" },
    ],
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "manufacturing",
    title: "Smart Manufacturing",
    subtitle: "Predictive maintenance and production optimization",
    description: "A manufacturing company implemented our AI to predict equipment failures and optimize production schedules. The system's real-time analytics and adaptive learning capabilities have transformed their operational efficiency.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "57%", label: "Downtime Reduction" },
      { value: "42%", label: "Efficiency Increase" },
      { value: "3.4M", label: "Annual Savings" },
    ],
    color: "from-orange-500 to-amber-600",
  },
];

export function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const boundedX = useTransform(x, [0, -100 * (caseStudies.length - 1)], [0, -100 * (caseStudies.length - 1)]);
  const springX = useSpring(boundedX, { damping: 20, stiffness: 200 });
  
  // Handle card navigation
  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (direction === "next" && activeIndex < caseStudies.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  
  // Update position when activeIndex changes
  useEffect(() => {
    const newX = -100 * activeIndex;
    x.set(newX);
  }, [activeIndex, x]);
  
  // Handle drag gesture
  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false);
    
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0 && activeIndex > 0) {
        navigate("prev");
      } else if (info.offset.x < 0 && activeIndex < caseStudies.length - 1) {
        navigate("next");
      } else {
        // Snap back to current card
        const newX = -100 * activeIndex;
        x.set(newX);
      }
    } else {
      // Snap back to current card
      const newX = -100 * activeIndex;
      x.set(newX);
    }
  };
  
  return (
    <section 
      className="py-24 relative overflow-hidden bg-gray-950 text-white"
      id="cases"
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-[0.03]" />
      
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="mr-2">💼</span> Success Stories
          </div>
          
          <RevealText
            text="Real-World Transformations"
            as="h2"
            textStyle="gradient"
            className="text-4xl md:text-5xl font-bold mb-6"
            preset="word"
            staggerChildren={0.08}
          />
          
          <RevealText
            text="See how leading organizations across industries have revolutionized their operations with our intelligent AI solutions."
            as="p" 
            className="text-lg text-gray-300"
            preset="word"
            staggerChildren={0.02}
            delay={0.4}
          />
        </div>
        
        {/* 3D case study carousel */}
        <div className="relative max-w-6xl mx-auto px-4">
          <div 
            ref={carouselRef}
            className="perspective-container"
            style={{ perspective: "1200px", height: "600px" }}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ 
                x: springX, 
                transformStyle: "preserve-3d",
              }}
              drag="x"
              dragConstraints={carouselRef}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              dragElastic={0.1}
            >
              {caseStudies.map((study, index) => {
                const isActive = index === activeIndex;
                const offset = (index - activeIndex) * 100;
                const rotateY = offset * 0.5;
                
                return (
                  <motion.div
                    key={study.id}
                    className="absolute top-0 w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `translateX(${100 * index}%) rotateY(${rotateY}deg)`,
                      zIndex: isActive ? 10 : 10 - Math.abs(activeIndex - index),
                      filter: isActive ? "none" : "brightness(0.7)",
                      transition: isDragging ? "none" : "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div className="bg-gray-900 rounded-2xl h-full overflow-hidden border border-white/10 shadow-xl">
                      <div className="grid md:grid-cols-5 h-full">
                        <div className="md:col-span-2 p-8 flex flex-col justify-between relative">
                          {/* Gradient overlay */}
                          <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${study.color}`}></div>
                          
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">{study.title}</h3>
                            <p className="text-gray-400 text-sm mb-6">{study.subtitle}</p>
                            <p className="text-gray-300 text-sm mb-8">{study.description}</p>
                            
                            <div className="grid grid-cols-3 gap-4 mb-8">
                              {study.stats.map((stat, i) => (
                                <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
                                  <p className={`text-xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>{stat.value}</p>
                                  <p className="text-xs text-gray-400">{stat.label}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Button className="group w-full bg-transparent backdrop-blur-sm border border-white/10 hover:bg-white/10">
                            <span>View Full Case Study</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                        
                        <div className="md:col-span-3 relative h-64 md:h-full overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                          <img 
                            src={study.image} 
                            alt={study.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex items-center justify-center mt-12 gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 border-white/10"
              onClick={() => navigate("prev")}
              disabled={activeIndex === 0}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-3">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "bg-white scale-125" : "bg-gray-600 hover:bg-gray-400"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 border-white/10"
              onClick={() => navigate("next")}
              disabled={activeIndex === caseStudies.length - 1}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 