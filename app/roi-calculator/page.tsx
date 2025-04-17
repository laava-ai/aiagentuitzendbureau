'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function ROICalculator() {
  // Form states
  const [supportAgents, setSupportAgents] = useState(5);
  const [ticketsPerMonth, setTicketsPerMonth] = useState(500);
  const [avgTicketTime, setAvgTicketTime] = useState(10); // in minutes
  const [agentHourlyRate, setAgentHourlyRate] = useState(25);
  
  // Results states
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [yearlySavings, setYearlySavings] = useState(0);
  const [timeReduction, setTimeReduction] = useState(0);
  const [productivityIncrease, setProductivityIncrease] = useState(0);
  const [roi, setRoi] = useState(0);
  
  // Calculate results whenever inputs change
  useEffect(() => {
    // Assume AI agent reduces handling time by 40%
    const timeReductionPercent = 40;
    const newTimeReduction = timeReductionPercent;
    setTimeReduction(newTimeReduction);
    
    // Calculate productivity increase
    const newProductivityIncrease = Math.round(100 / (100 - timeReductionPercent) * 100 - 100);
    setProductivityIncrease(newProductivityIncrease);
    
    // Calculate monthly time savings in hours
    const monthlyTimeWithoutAI = (ticketsPerMonth * avgTicketTime) / 60;
    const monthlyTimeWithAI = monthlyTimeWithoutAI * (1 - timeReductionPercent / 100);
    const timeSavedHours = monthlyTimeWithoutAI - monthlyTimeWithAI;
    
    // Calculate monthly cost savings
    const monthlyCostSavings = timeSavedHours * agentHourlyRate;
    setMonthlySavings(Math.round(monthlyCostSavings));
    
    // Calculate yearly savings
    setYearlySavings(Math.round(monthlyCostSavings * 12));
    
    // Calculate ROI (assume AI agent costs €500/month)
    const aiAgentMonthlyCost = 500;
    const yearlyROI = ((monthlyCostSavings * 12) - (aiAgentMonthlyCost * 12)) / (aiAgentMonthlyCost * 12) * 100;
    setRoi(Math.round(yearlyROI));
  }, [supportAgents, ticketsPerMonth, avgTicketTime, agentHourlyRate]);

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
                Bereken uw ROI met AI-agenten
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ontdek hoeveel tijd en geld uw bedrijf kan besparen door onze AI-agenten 
                te implementeren in uw klantenservice team.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Calculator Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 md:p-8 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Details van uw support team</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="supportAgents" className="font-medium text-gray-300">
                        Aantal support medewerkers
                      </Label>
                      <span className="font-bold text-white">{supportAgents}</span>
                    </div>
                    <Slider
                      id="supportAgents"
                      min={1}
                      max={100}
                      step={1}
                      value={[supportAgents]}
                      onValueChange={(value) => setSupportAgents(value[0])}
                      className="mb-4"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="ticketsPerMonth" className="font-medium text-gray-300">
                        Tickets per maand
                      </Label>
                      <span className="font-bold text-white">{ticketsPerMonth}</span>
                    </div>
                    <Slider
                      id="ticketsPerMonth"
                      min={100}
                      max={10000}
                      step={100}
                      value={[ticketsPerMonth]}
                      onValueChange={(value) => setTicketsPerMonth(value[0])}
                      className="mb-4"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <Label htmlFor="avgTicketTime" className="font-medium mr-2 text-gray-300">
                          Gemiddelde minuten per ticket
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info size={16} className="text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-64">De gemiddelde tijd die uw medewerkers besteden aan het oplossen van een klantenservice ticket</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="font-bold text-white">{avgTicketTime} min</span>
                    </div>
                    <Slider
                      id="avgTicketTime"
                      min={1}
                      max={60}
                      step={1}
                      value={[avgTicketTime]}
                      onValueChange={(value) => setAvgTicketTime(value[0])}
                      className="mb-4"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <Label htmlFor="agentHourlyRate" className="font-medium mr-2 text-gray-300">
                          Uurtarief medewerker (€)
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info size={16} className="text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-64">De volledige kosten per uur van uw support medewerkers inclusief secundaire arbeidsvoorwaarden</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="font-bold text-white">€{agentHourlyRate}</span>
                    </div>
                    <Slider
                      id="agentHourlyRate"
                      min={10}
                      max={100}
                      step={1}
                      value={[agentHourlyRate]}
                      onValueChange={(value) => setAgentHourlyRate(value[0])}
                      className="mb-4"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 md:p-8 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Uw potentiële besparingen</h2>
                
                <div className="space-y-6">
                  <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10">
                    <CardHeader className="pb-2">
                      <CardDescription className="text-black">Jaarlijkse besparingen</CardDescription>
                      <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">€{yearlySavings.toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-black">
                        Gebaseerd op uw input, dit is hoeveel u jaarlijks zou kunnen besparen
                      </p>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white/5 border border-white/10">
                      <CardHeader className="pb-2">
                        <CardDescription className="text-gray-300">Maandelijkse besparing</CardDescription>
                        <CardTitle className="text-2xl font-bold text-white">€{monthlySavings.toLocaleString()}</CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-white/5 border border-white/10">
                      <CardHeader className="pb-2">
                        <CardDescription className="text-gray-300">ROI</CardDescription>
                        <CardTitle className="text-2xl font-bold text-white">{roi}%</CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-white/5 border border-white/10">
                      <CardHeader className="pb-2">
                        <CardDescription className="text-gray-300">Tijdsbesparing</CardDescription>
                        <CardTitle className="text-2xl font-bold text-white">{timeReduction}%</CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-white/5 border border-white/10">
                      <CardHeader className="pb-2">
                        <CardDescription className="text-gray-300">Productiviteitsverhoging</CardDescription>
                        <CardTitle className="text-2xl font-bold text-white">{productivityIncrease}%</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  <Button 
                    className="w-full h-12 text-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Neem contact op voor meer informatie
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
            
            {/* Additional Information */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Hoe onze AI-agenten uw resultaten verbeteren</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
                Onze AI-agenten integreren naadloos met uw supportteam, automatiseren repetitieve taken
                en bieden directe antwoorden op veelvoorkomende klantvragen.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Card className="bg-white/5 border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Snellere oplossingstijden</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">AI-agenten kunnen meerdere verzoeken tegelijkertijd afhandelen, waardoor wachttijden worden verkort en de afhandeling wordt versneld.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">24/7 Beschikbaarheid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">Onze AI-agenten werken de klok rond en bieden consistente ondersteuning, zelfs buiten kantooruren.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Menselijke interacties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">Geavanceerde natuurlijke taalverwerking zorgt ervoor dat gesprekken natuurlijk en gepersonaliseerd aanvoelen.</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button className="mt-10 h-12 px-8 text-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0">
                Boek een demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 