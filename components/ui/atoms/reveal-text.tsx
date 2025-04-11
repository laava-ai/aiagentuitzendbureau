"use client";

import { useRef, useEffect } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
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
  
  return (
    <Component className={className}>
      <motion.div
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
      </motion.div>
    </Component>
  );
} 