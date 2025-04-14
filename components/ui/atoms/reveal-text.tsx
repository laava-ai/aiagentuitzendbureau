"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

type TextStyle = "gradient" | "outline" | "glow" | "stroke" | "blur" | "standard";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  preset?: "word" | "char" | "line";
  textStyle?: TextStyle;
  as?: React.ElementType;
  staggerChildren?: number;
  threshold?: number;
}

export function RevealText({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  preset = "word",
  textStyle = "standard",
  as: Component = "div",
  staggerChildren = 0.04,
  threshold = 0.3,
}: RevealTextProps) {
  const controls = useAnimation();
  const ref = useRef<any>(null);
  const inView = useInView(ref, { 
    once,
    amount: threshold
  });
  
  // Split text into parts based on preset
  const getParts = () => {
    switch (preset) {
      case "char":
        return text.split("");
      case "line":
        return text.split(/\n/);
      case "word":
      default:
        return text.split(/\s+/);
    }
  };
  
  const parts = getParts();
  
  // Animate when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);
  
  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
        duration,
      },
    },
  };
  
  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };
  
  // Apply text styling
  const getTextStyle = (style: TextStyle) => {
    switch (style) {
      case "gradient":
        return "text-gradient";
      case "outline":
        return "text-outline";
      case "glow":
        return "text-glow";
      case "stroke":
        return "text-stroke";
      case "blur":
        return "backdrop-blur-sm";
      default:
        return "";
    }
  };
  
  const textClass = getTextStyle(textStyle);
  
  // Get the appropriate motion component to match the parent component type
  // Handle different HTML elements to prevent nesting violations
  const getMotionComponent = () => {
    // Common HTML elements that need special handling to avoid invalid nesting
    if (Component === 'p') return motion.p;
    if (Component === 'h1') return motion.h1;
    if (Component === 'h2') return motion.h2;
    if (Component === 'h3') return motion.h3;
    if (Component === 'h4') return motion.h4;
    if (Component === 'h5') return motion.h5;
    if (Component === 'h6') return motion.h6;
    if (Component === 'span') return motion.span;
    
    // Default to div for custom components
    return motion.div;
  };
  
  const MotionComponent = getMotionComponent();
  
  return React.createElement(
    Component,
    { className },
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={container}
      className="inline"
    >
      {parts.map((part, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className={`${textClass} inline-block ${preset === "word" ? "mr-[0.25em]" : ""}`}
        >
          {part}
          {preset === "line" && index < parts.length - 1 ? <br /> : ""}
        </motion.span>
      ))}
    </MotionComponent>
  );
} 