"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { CtaSection } from "@/components/sections/cta-section";
import { motion } from "framer-motion";
import { Upload, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Careers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [motivation, setMotivation] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !motivation || !cvFile) {
      toast({
        title: "Fout",
        description: "Vul alle verplichte velden in en upload je CV.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Hier zou normaal gesproken de API call komen om het formulier te versturen
    // Voor nu simuleren we een succesvolle verzending
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Sollicitatie ontvangen",
        description: "Bedankt voor je interesse! We nemen binnen 5 werkdagen contact met je op.",
      });
    }, 1500);
  };

  const perks = [
    {
      title: "Flexibel werken",
      description: "Hybride werkmodel met vrijheid om vanuit huis of kantoor te werken. Wij geloven in resultaten, niet in aanwezigheid."
    },
    {
      title: "Persoonlijke ontwikkeling",
      description: "Jaarlijks opleidingsbudget voor cursussen, conferenties en certificeringen om je vaardigheden te verbeteren."
    },
    {
      title: "Gezondheid & welzijn",
      description: "Sportvergoeding, mentale gezondheidsondersteuning en regelmatige teamactiviteiten voor een goede werk-privé balans."
    },
    {
      title: "Moderne technologie",
      description: "Werken met de nieuwste tools en technologieën in een innovatieve omgeving waar we vooroplopen in AI."
    },
    {
      title: "Internationaal team",
      description: "Een diverse werkomgeving met collega's van verschillende achtergronden en culturen."
    },
    {
      title: "Impact maken",
      description: "Direct bijdragen aan producten die de manier waarop mensen werken transformeren."
    }
  ];

  return (
    <div className="relative">
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
      
      {/* Main content sections */}
      <main>
        <section className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-b from-[#080F26] to-[#0A0F2C]">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Solliciteer bij Laava
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Word onderdeel van ons team en help mee aan de toekomst van werk met AI.
              </p>
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Werken bij Laava</h2>
              <p className="text-lg text-gray-600">
                Bij Laava geloven we dat de toekomst van werk draait om het combineren van menselijke creativiteit met de kracht van AI. We bouwen een team van gepassioneerde experts die gedreven zijn om AI-oplossingen te creëren die bedrijven transformeren.
              </p>
            </div>
            
            {/* Perks/Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {perks.map((perk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{perk.title}</h3>
                  <p className="text-gray-600">{perk.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Application Form */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Open Sollicitatie</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Bedankt voor je sollicitatie!</h3>
                  <p className="text-green-700 mb-6">
                    We hebben je sollicitatie ontvangen en zullen deze zo snel mogelijk in behandeling nemen. 
                    Binnen 5 werkdagen nemen we contact met je op.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Nieuwe sollicitatie
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
                >
                  <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Naam *
                        </label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Volledige naam"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          E-mailadres *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="naam@voorbeeld.nl"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefoonnummer
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="06 12345678"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
                        Motivatie *
                      </label>
                      <Textarea
                        id="motivation"
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        required
                        placeholder="Vertel ons waarom je bij Laava wilt werken en wat je kunt bijdragen..."
                        className="min-h-[150px]"
                      />
                    </div>
                    
                    <div className="mb-8">
                      <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
                        CV (PDF) *
                      </label>
                      <div className="flex items-center">
                        <Input
                          id="cv"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          required
                          className="hidden"
                        />
                        <div className="flex-1">
                          <div className="border border-gray-300 border-dashed rounded-md p-4 text-center">
                            {cvFile ? (
                              <div className="flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span className="text-sm text-gray-600">{cvFile.name}</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">
                                  Klik om je CV te uploaden of sleep het bestand hierheen
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Alleen PDF bestanden
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="ml-2"
                          onClick={() => document.getElementById('cv')?.click()}
                        >
                          Bladeren
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Bezig met versturen...</span>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            <span>Sollicitatie versturen</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 