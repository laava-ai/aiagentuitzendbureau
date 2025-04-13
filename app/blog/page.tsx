import { Metadata } from "next";
import { BlogList } from "@/components/sections/blog/blog-list";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";

export const metadata: Metadata = {
  title: "Blog | Laava",
  description: "Ontdek de nieuwste inzichten en trends in AI-gestuurde oplossingen voor bedrijven. Lees hier artikelen over AI, automatisering en digitale transformatie.",
};

export default function BlogPage() {
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
      
      {/* Main content sections */}
      <main className="flex-1">
        <section className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-b from-[#080F26] to-[#0A0F2C]">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Blog
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ontdek de nieuwste inzichten en ontwikkelingen op het gebied van kunstmatige intelligentie.
              </p>
            </div>
          </div>
        </section>
        
        <BlogList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 