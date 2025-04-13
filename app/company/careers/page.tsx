"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { CtaSection } from "@/components/sections/cta-section";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Careers() {
  const jobs = [
    {
      title: "Senior AI Engineer",
      department: "AI Research",
      location: "Amsterdam",
      type: "Fulltime",
      description: "Wij zoeken een ervaren AI Engineer die ons team kan versterken bij het ontwikkelen van state-of-the-art AI-oplossingen voor enterprise klanten.",
      requirements: [
        "5+ jaar ervaring met machine learning en natuurlijke taalverwerking",
        "Ervaring met LLMs zoals GPT-4 en foundation models",
        "Sterke programmeervaardigheden in Python en PyTorch/TensorFlow",
        "Ervaring met het implementeren van AI-oplossingen in productieomgevingen"
      ],
      slug: "senior-ai-engineer"
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Amsterdam",
      type: "Fulltime",
      description: "Als Product Manager ben je verantwoordelijk voor het definiëren en implementeren van de productstrategie voor onze AI-assistenten.",
      requirements: [
        "3+ jaar ervaring als Product Manager, bij voorkeur in B2B SaaS",
        "Affiniteit met AI en machine learning technologieën",
        "Sterke analytische en communicatieve vaardigheden",
        "Ervaring met het werken in agile ontwikkelteams"
      ],
      slug: "product-manager"
    },
    {
      title: "Front-end Developer",
      department: "Engineering",
      location: "Remote (NL)",
      type: "Fulltime",
      description: "Wij zoeken een getalenteerde Front-end Developer om gebruiksvriendelijke interfaces te bouwen voor onze AI-assistenten.",
      requirements: [
        "3+ jaar ervaring met React en Next.js",
        "Sterke kennis van moderne JavaScript/TypeScript",
        "Ervaring met responsive design en toegankelijkheid",
        "Oog voor detail en passie voor gebruikerservaring"
      ],
      slug: "frontend-developer"
    },
    {
      title: "Back-end Developer",
      department: "Engineering",
      location: "Amsterdam",
      type: "Fulltime",
      description: "Als Back-end Developer werk je aan de infrastructuur en API's die onze AI-assistenten ondersteunen.",
      requirements: [
        "3+ jaar ervaring met Node.js/Python",
        "Ervaring met microservices architectuur",
        "Kennis van databases (SQL en NoSQL)",
        "Vertrouwd met cloud platforms (AWS/GCP)"
      ],
      slug: "backend-developer"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Hybrid (Amsterdam)",
      type: "Fulltime",
      description: "We zoeken een creatieve UX/UI Designer om intuïtieve en aantrekkelijke interfaces te ontwerpen voor onze AI-producten.",
      requirements: [
        "Portfolio met UX/UI projecten",
        "Ervaring met Figma en moderne design systemen",
        "Kennis van gebruikersonderzoek en usability testing",
        "Affiniteit met AI-producten en conversational interfaces"
      ],
      slug: "ux-ui-designer"
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "Amsterdam",
      type: "Fulltime",
      description: "Als SDR ben je verantwoordelijk voor het genereren van hoogwaardige leads en het opbouwen van een sterke sales pipeline.",
      requirements: [
        "1+ jaar ervaring in B2B sales of business development",
        "Uitstekende communicatieve vaardigheden",
        "Resultaatgericht en proactieve houding",
        "Affiniteit met technologie en AI"
      ],
      slug: "sales-development-representative"
    }
  ];

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
                Careers bij Laava
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Word onderdeel van ons team en help mee aan de toekomst van werk met AI.
              </p>
              
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0">
                <span>Open posities bekijken</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
            
            {/* Job Listings */}
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-center mb-12">Open Posities</h2>
              
              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                          <p className="text-gray-600 mb-4">{job.description}</p>
                          
                          <div className="flex flex-wrap gap-3 mb-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Briefcase className="w-4 h-4 mr-1" />
                              {job.department}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.type}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0">
                          <Link href={`/company/careers/${job.slug}`}>
                            <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                              Bekijk Vacature
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Niet gevonden wat je zocht?</p>
                <Link href="/contact">
                  <Button variant="outline" className="bg-white">
                    Stuur een Open Sollicitatie
                  </Button>
                </Link>
              </div>
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