"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { CtaSection } from "@/components/sections/cta-section";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image from "next/image";
export default function Team() {
  const teamMembers = [
    {
      name: "Alec Siemerink",
      position: "Co-founder",
      bio: "Alec heeft ruime ervaring in technologie en een passie voor innovatieve AI-oplossingen. Met een achtergrond in zowel softwareontwikkeling als ondernemerschap, richt hij zich op het creëren van impactvolle producten die organisaties helpen te groeien. Alec gelooft sterk in de kracht van samenwerking en innovatie om complexe uitdagingen op te lossen en waarde te leveren aan klanten.",
      image: "/images/alec.jpeg",
      socials: {
        linkedin: "https://linkedin.com/in/alecsiemerink"
      }
    },
    {
      name: "Ruben Haisma",
      position: "Co-founder",
      bio: "Ruben heeft een brede ervaring in software engineering en AI en draagt bij aan de technologische ontwikkeling binnen het team. Met een passie voor het ontwerpen van AI-oplossingen die menselijke capaciteiten versterken, richt hij zich op het creëren van AI-agents die naadloos samenwerken met mensen, waardoor teams productiever en creatiever kunnen worden.",
      image: "/images/ruben.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/rubenhaisma"
      }
    },
    {
      name: "Marcel Grauwen",
      position: "Co-founder",
      bio: "Marcel is gespecialiseerd in het optimaliseren van bedrijfsprocessen met AI-technologie. Hij helpt organisaties hun efficiëntie te verhogen door slimme automatisering en het verhogen van de kwaliteit van hun producten en diensten.",
      image: "/images/marcel.jpeg",
      socials: {
        linkedin: "https://linkedin.com/in/marcelgrauwen"
      }
    }
  ];

  const departments = [
    { name: "Leiderschap", count: 3 },
    { name: "Engineering", count: 5 },
    { name: "AI Research", count: 4 },
    { name: "Customer Success", count: 3 }
  ];

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      default:
        return null;
    }
  };

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
                Ons Team
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Maak kennis met de gepassioneerde mensen achter Laava die werken aan de toekomst van AI-assistentie.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            {/* Department Stats */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Ons groeiende team</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {departments.map((dept, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-6 text-center"
                  >
                    <p className="text-3xl font-bold text-indigo-600 mb-2">{dept.count}</p>
                    <p className="text-gray-600">{dept.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Team Members */}
            <h2 className="text-3xl font-bold text-center mb-12">Kernteam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 bg-gradient-to-r from-indigo-100 to-blue-50 flex items-center justify-center">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover"
                      width={96}
                      height={96}
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-indigo-600 font-medium mb-4">{member.position}</p>
                    <p className="text-gray-600 mb-5">{member.bio}</p>
                    
                    <div className="flex items-center gap-3">
                      {Object.entries(member.socials).map(([platform, url], idx) => (
                        <a 
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                          {renderSocialIcon(platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
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