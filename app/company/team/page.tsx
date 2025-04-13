"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { CtaSection } from "@/components/sections/cta-section";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Globe } from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Robin Versteeg",
      position: "CEO & Co-founder",
      bio: "Robin heeft meer dan 15 jaar ervaring in de tech-industrie en heeft meerdere succesvolle startups opgericht. Hij heeft een passie voor AI en hoe het kan worden gebruikt om het werk van mensen te verbeteren.",
      image: "/images/team/placeholder-1.jpg", // Placeholder images
      socials: {
        linkedin: "https://linkedin.com/",
        twitter: "https://twitter.com/",
        website: "https://example.com/"
      }
    },
    {
      name: "Laura Janssen",
      position: "CTO & Co-founder",
      bio: "Met een achtergrond in computerwetenschappen en machinaal leren, leidt Laura de technische ontwikkeling van onze AI-oplossingen. Ze heeft eerder gewerkt bij toonaangevende tech-bedrijven.",
      image: "/images/team/placeholder-2.jpg",
      socials: {
        linkedin: "https://linkedin.com/",
        twitter: "https://twitter.com/"
      }
    },
    {
      name: "Martijn de Groot",
      position: "Head of AI Research",
      bio: "Martijn heeft een PhD in AI en heeft bijgedragen aan baanbrekend onderzoek op het gebied van natuurlijke taalverwerking. Hij zorgt ervoor dat onze AI-modellen state-of-the-art blijven.",
      image: "/images/team/placeholder-3.jpg",
      socials: {
        linkedin: "https://linkedin.com/",
        website: "https://example.com/"
      }
    },
    {
      name: "Sophie Bakker",
      position: "Head of Product",
      bio: "Sophie vertaalt complexe technologie naar gebruiksvriendelijke producten. Met haar achtergrond in UX-design en productmanagement zorgt ze ervoor dat onze oplossingen intuïtief en waardevol zijn.",
      image: "/images/team/placeholder-4.jpg",
      socials: {
        linkedin: "https://linkedin.com/",
        twitter: "https://twitter.com/"
      }
    },
    {
      name: "David van der Berg",
      position: "Head of Sales",
      bio: "David heeft een uitgebreide achtergrond in B2B-sales en helpt bedrijven de juiste AI-oplossingen te vinden om hun specifieke uitdagingen aan te pakken.",
      image: "/images/team/placeholder-5.jpg",
      socials: {
        linkedin: "https://linkedin.com/"
      }
    },
    {
      name: "Noor El Fahmi",
      position: "Head of Customer Success",
      bio: "Noor zorgt ervoor dat onze klanten maximale waarde halen uit onze AI-oplossingen. Ze leidt het customer success team dat klanten begeleidt vanaf de implementatie tot doorlopende optimalisatie.",
      image: "/images/team/placeholder-6.jpg",
      socials: {
        linkedin: "https://linkedin.com/",
        twitter: "https://twitter.com/"
      }
    }
  ];

  const departments = [
    { name: "Leiderschap", count: 2 },
    { name: "AI Research", count: 8 },
    { name: "Product", count: 6 },
    { name: "Engineering", count: 12 },
    { name: "Design", count: 5 },
    { name: "Sales", count: 7 },
    { name: "Marketing", count: 4 },
    { name: "Customer Success", count: 9 }
  ];

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'website':
        return <Globe className="w-5 h-5" />;
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
                    <div className="w-24 h-24 bg-indigo-200 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-2xl">
                        {member.name.charAt(0)}
                      </span>
                    </div>
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