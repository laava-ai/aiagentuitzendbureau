"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { AboutMission } from "@/components/sections/about/about-mission";
import { AboutTeam } from "@/components/sections/about/about-team";
import { AboutValues } from "@/components/sections/about/about-values";
import { CtaSection } from "@/components/sections/cta-section";

export default function About() {
  const teamMembers = [
    {
      name: "Alec Siemerink",
      role: "Co-Founder",
      bio: "Alec heeft een passie voor het ontwerpen van AI-oplossingen die menselijke capaciteiten versterken. Hij leidt onze AI-agent ontwikkeling en implementatiestrategieën.",
      image: "/images/alec.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/alecsiemerink/"
      }
    },
    {
      name: "Ruben Haisma",
      role: "Co-Founder",
      bio: "Ruben richt zich op het creëren van AI-agents die naadloos samenwerken met mensen, waardoor teams productiever en creatiever kunnen worden.",
      image: "/images/ruben.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/ruben-haisma-526a70158/"
      }
    },
    {
      name: "Marcel Grauwen",
      role: "Co-Founder",
      bio: "Marcel is gespecialiseerd in het optimaliseren van bedrijfsprocessen met AI-technologie. Hij helpt organisaties hun efficiëntie te verhogen door slimme automatisering.",
      image: "/images/marcel.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/marcel-grauwen/"
      }
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
                Over Laava
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Wij zijn een bedrijf gespecialiseerd in AI-oplossingen. Ons doel is om bedrijven 
                te helpen hun menselijk potentieel te maximaliseren door routinetaken 
                over te dragen aan efficiënte, betrouwbare AI-assistenten.
              </p>
            </div>
          </div>
        </section>

        <AboutMission />
        <AboutValues />
        <AboutTeam teamMembers={teamMembers} />
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 