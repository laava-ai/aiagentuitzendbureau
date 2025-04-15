"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

export function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const formValues = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Er is iets misgegaan');
      }
      
      setFormStatus('success');
      // Reset form using the ref instead of e.currentTarget
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Er is iets misgegaan');
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="lg:w-3/5 w-full order-1 lg:order-1 lg:pr-6 mb-10 lg:mb-0"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-xl mx-auto bg-[#0A1435]/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.25)] border-2 border-white/5 transform hover:translate-y-[-5px] transition-all duration-300">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Stuur ons een bericht</h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-2 w-12 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              <div className="h-2 w-12 rounded-full bg-[#2A3A8F]"></div>
            </div>
            <p className="text-white/80 text-base font-medium">Vertel ons over uw bedrijf en hoe wij kunnen helpen</p>
          </div>
          
          <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-base font-medium text-white mb-1.5">
                Naam <span className="text-purple-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full p-3 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10"
                required
                placeholder="Uw naam"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-base font-medium text-white mb-1.5">
                Email <span className="text-purple-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full p-3 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10"
                required
                placeholder="uw@email.nl"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-base font-medium text-white mb-1.5">
                Bedrijf
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full p-3 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10"
                placeholder="Bedrijfsnaam"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-base font-medium text-white mb-1.5">
                Bericht <span className="text-purple-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-3 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10"
                required
                placeholder="Vertel ons over uw project of vraag..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="w-full p-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-base font-semibold rounded-2xl hover:from-purple-500 hover:to-blue-400 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#0A0F2C] shadow-[0_0_20px_rgba(168,85,247,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formStatus === 'submitting' ? 'Versturen...' : 'Versturen'}
            </button>
            
            {formStatus === 'success' && (
              <motion.div 
                className="bg-green-500/20 border border-green-500/30 text-green-300 py-3 px-4 rounded-lg text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Bedankt! We hebben uw bericht ontvangen en nemen zo snel mogelijk contact met u op.
              </motion.div>
            )}
            
            {formStatus === 'error' && (
              <motion.div 
                className="bg-red-500/20 border border-red-500/30 text-red-300 py-3 px-4 rounded-lg text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errorMessage || 'Er is iets misgegaan. Probeer het later opnieuw of neem contact met ons op via email.'}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
} 