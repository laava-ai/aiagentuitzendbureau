"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
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
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 