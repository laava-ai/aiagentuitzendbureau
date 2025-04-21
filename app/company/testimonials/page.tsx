"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/ui/animations/particle-field";
import { CtaSection } from "@/components/sections/cta-section";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";

export default function Testimonials() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to company page
    router.push('/company');
  }, [router]);
  
  // Return null or a loading state, but it will quickly redirect
  return null;
} 