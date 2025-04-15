"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface MobileOptimizerContextType {
  isMobile: boolean;
  isLowEndDevice: boolean; // For extra optimization on low-end devices
  prefersReducedMotion: boolean;
  disableAllAnimations: boolean; // New flag to completely disable animations
}

const MobileOptimizerContext = createContext<MobileOptimizerContextType>({
  isMobile: false,
  isLowEndDevice: false,
  prefersReducedMotion: false,
  disableAllAnimations: false,
});

export const useMobileOptimizer = () => useContext(MobileOptimizerContext);

interface MobileOptimizerProviderProps {
  children: ReactNode;
  forceDisableAnimations?: boolean; // Optional prop to force disable all animations
}

export function MobileOptimizerProvider({ 
  children,
  forceDisableAnimations = true, // Default to true to disable all animations on mobile
}: MobileOptimizerProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [disableAllAnimations, setDisableAllAnimations] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === "undefined") return;

    // Function to check if device is mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      
      // If mobile and forceDisableAnimations is true, disable all animations
      setDisableAllAnimations(mobile && forceDisableAnimations);
    };

    // Check for low-end devices (approximation)
    const checkLowEndDevice = () => {
      // Factors that might indicate a low-end device
      const lowMemory = "deviceMemory" in navigator && (navigator as any).deviceMemory < 4;
      const slowCPU = "hardwareConcurrency" in navigator && navigator.hardwareConcurrency < 4;
      const isLowEnd = lowMemory || slowCPU || (window.innerWidth * window.devicePixelRatio < 1000);
      setIsLowEndDevice(isLowEnd);
    };

    // Check user preference for reduced motion
    const checkReducedMotion = () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPrefersReducedMotion(prefersReduced);
      
      // If user prefers reduced motion, also disable all animations
      if (prefersReduced) {
        setDisableAllAnimations(true);
      }
    };

    // Initial checks
    checkMobile();
    checkLowEndDevice();
    checkReducedMotion();

    // Add event listeners
    window.addEventListener("resize", checkMobile);
    
    // Listen for prefers-reduced-motion changes
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionMediaQuery.addEventListener("change", checkReducedMotion);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionMediaQuery.removeEventListener("change", checkReducedMotion);
    };
  }, [forceDisableAnimations]);

  return (
    <MobileOptimizerContext.Provider 
      value={{ 
        isMobile, 
        isLowEndDevice, 
        prefersReducedMotion,
        disableAllAnimations
      }}
    >
      {children}
    </MobileOptimizerContext.Provider>
  );
} 