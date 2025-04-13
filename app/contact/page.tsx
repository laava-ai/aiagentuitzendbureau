"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { ContactInfo } from "@/components/sections/contact/contact-info";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background particle effect */}
      <ParticleField 
        className="fixed inset-0 -z-10"
        particleCount={100}
        particleSize={1}
        particleColor="#6366f1"
        particleSpeed={0.3}
        connectionRadius={150}
        connectionOpacity={0.05}
      />

      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-[#080F26] to-[#0A0F2C] py-20 sm:py-28">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Neem contact met ons op
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ontdek hoe AI-assistenten uw team kunnen versterken en uw bedrijf naar een hoger niveau kunnen tillen.
              </p>
            </motion.div>
            
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 