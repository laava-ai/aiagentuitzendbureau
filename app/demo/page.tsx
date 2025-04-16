"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { useMobileOptimizer } from "@/components/ui/mobile-optimizer";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, Clock, Send } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Naam is verplicht" }),
  email: z.string().email({ message: "Vul een geldig e-mailadres in" }),
  company: z.string().min(2, { message: "Bedrijfsnaam is verplicht" }),
  phone: z.string().optional(),
  requestType: z.enum(["online", "inperson"], { 
    required_error: "Selecteer een type demo" 
  }),
  industry: z.string({ required_error: "Selecteer uw branche" }),
  preferredDate: z.string().min(1, { message: "Selecteer een voorkeursdatum" }),
  preferredTime: z.string().min(1, { message: "Selecteer een voorkeurstijd" }),
  notes: z.string().optional(),
});

export default function DemoPage() {
  const { isMobile, disableAllAnimations } = useMobileOptimizer();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Only show particles on desktop
  const showParticles = !disableAllAnimations;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      requestType: "online",
      industry: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would submit to an API endpoint
    console.log(values);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  }
  
  const industries = [
    "Financiële dienstverlening",
    "Gezondheidszorg",
    "Retail",
    "Technologie",
    "Productie",
    "Professionele dienstverlening",
    "Onderwijs",
    "Overheid",
    "Non-profit",
    "Andere"
  ];
  
  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background particle effect */}
      {showParticles && (
        <ParticleField 
          className="fixed inset-0 -z-10"
          particleCount={isMobile ? 30 : 100}
          particleSize={1}
          particleColor="#6366f1"
          particleSpeed={0.3}
          connectionRadius={150}
          connectionOpacity={0.05}
        />
      )}

      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="flex-1">
        <section className="relative pt-24 pb-16 md:py-32 overflow-hidden bg-gradient-to-b from-[#080F26] to-[#0A0F2C]">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Plan Uw Persoonlijke Demo
              </h1>
              <p className="text-xl text-gray-300">
                Ontdek hoe onze AI-agenten uw bedrijf kunnen transformeren. Plan een gepersonaliseerde demonstratie die is afgestemd op uw specifieke behoeften.
              </p>
            </motion.div>
            
            {/* Form Section */}
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {!isSubmitted ? (
                <div className="w-full max-w-3xl mx-auto bg-[#0A1435]/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.25)] border-2 border-white/5 transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Plan Uw Demo</h2>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="h-2 w-12 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                      <div className="h-2 w-12 rounded-full bg-[#2A3A8F]"></div>
                    </div>
                    <p className="text-white/80 text-base font-medium">Vul het formulier in om een gepersonaliseerde demonstratie aan te vragen</p>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium text-white mb-1.5">
                                Naam <span className="text-purple-400">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Uw volledige naam" {...field} className="w-full p-3 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium text-white mb-1.5">
                                E-mail <span className="text-purple-400">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="uw@email.nl" {...field} className="w-full p-3 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium text-white mb-1.5">
                                Bedrijfsnaam <span className="text-purple-400">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Uw bedrijf" {...field} className="w-full p-3 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium text-white mb-1.5">
                                Telefoonnummer
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="+31 6 12345678" {...field} className="w-full p-3 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="requestType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base font-medium text-white mb-1.5">
                              Type demo <span className="text-purple-400">*</span>
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="online" className="text-purple-400 border-white/30" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer text-white">
                                    Online Demo
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="inperson" className="text-purple-400 border-white/30" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer text-white">
                                    Demo op locatie
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-white mb-1.5">
                              Uw branche <span className="text-purple-400">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full p-3 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10">
                                  <SelectValue placeholder="Selecteer uw branche" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#0A1435] border border-white/10">
                                {industries.map((industry) => (
                                  <SelectItem key={industry} value={industry}>
                                    {industry}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="preferredDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium text-white mb-1.5">
                                Voorkeursdatum <span className="text-purple-400">*</span>
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    type="date" 
                                    {...field} 
                                    className="w-full p-3 pl-10 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10" 
                                  />
                                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="preferredTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium text-white mb-1.5">
                                Voorkeurstijd <span className="text-purple-400">*</span>
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-full p-3 pl-10 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10">
                                    <Clock className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />
                                    <SelectValue placeholder="Selecteer een tijd" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#0A1435] border border-white/10">
                                  {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-white mb-1.5">
                              Aanvullende informatie
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Vertel ons meer over uw specifieke behoeften of vragen..."
                                className="w-full p-3 rounded-2xl text-white text-base placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-[#0A0F2C]/70 border border-white/10 min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <button
                        type="submit"
                        className="w-full p-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-base font-semibold rounded-2xl hover:from-purple-500 hover:to-blue-400 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#0A0F2C] shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                      >
                        <Send className="inline-block mr-2 h-4 w-4" />
                        <span>Verstuur aanvraag</span>
                      </button>
                    </form>
                  </Form>
                </div>
              ) : (
                <div className="w-full max-w-3xl mx-auto bg-[#0A1435]/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.25)] border-2 border-white/5 transform hover:translate-y-[-5px] transition-all duration-300 text-center">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-[0_0_20px_rgba(74,222,128,0.35)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Bedankt voor uw aanvraag!</h2>
                  <p className="text-white/80 text-lg mb-8">
                    We hebben uw demo-aanvraag ontvangen en zullen binnen 24 uur contact met u opnemen om de details te bevestigen.
                  </p>
                  <Button asChild className="p-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-base font-semibold rounded-2xl hover:from-purple-500 hover:to-blue-400 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#0A0F2C] shadow-[0_0_20px_rgba(168,85,247,0.35)]">
                    <Link href="/">
                      <span>Terug naar home</span>
                    </Link>
                  </Button>
                </div>
              )}
            </motion.div>
            
            {/* Testimonials */}
            <div className="mt-24 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Wat Anderen Zeggen
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    quote: "De demo gaf ons een helder beeld van hoe AI-agents ons administratieproces kunnen stroomlijnen. Zeer waardevol!",
                    name: "Martijn de Vries",
                    title: "Operationeel Manager, TechSolutions BV"
                  },
                  {
                    quote: "Ik was onder de indruk van hoe goed de AI-agent was afgestemd op onze specifieke branche. De demo was op maat en zeer informatief.",
                    name: "Lisa Jansen",
                    title: "CEO, InnovatieWerkt"
                  }
                ].map((testimonial, index) => (
                  <motion.div 
                    key={index}
                    className="bg-[#0A1435]/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/5 transform hover:translate-y-[-5px] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-4 p-3 bg-purple-500/20 rounded-full w-fit">
                        <svg className="h-5 w-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                        </svg>
                      </div>
                      <p className="text-white/80 flex-1 mb-4">{testimonial.quote}</p>
                      <div>
                        <p className="font-medium text-white">{testimonial.name}</p>
                        <p className="text-sm text-white/60">{testimonial.title}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 