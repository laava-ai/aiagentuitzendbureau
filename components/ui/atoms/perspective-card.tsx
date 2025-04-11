"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface PerspectiveCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  shadow?: boolean;
  glare?: boolean;
  rotationIntensity?: number;
  backgroundGradient?: boolean;
  border?: boolean;
}

export function PerspectiveCard({
  children,
  className = "",
  depth = 50,
  shadow = true,
  glare = true,
  rotationIntensity = 10,
  backgroundGradient = false,
  border = false,
}: PerspectiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 });

  // Smoother animations with springs
  const springConfig = { damping: 30, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [0, dimensions.height], [rotationIntensity, -rotationIntensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, dimensions.width], [-rotationIntensity, rotationIntensity]), springConfig);
  
  // For the glare effect
  const glareX = useTransform(mouseX, [0, dimensions.width], [dimensions.width * -0.5, dimensions.width * 0.5]);
  const glareY = useTransform(mouseY, [0, dimensions.height], [dimensions.height * -0.5, dimensions.height * 0.5]);
  const glareOpacity = useSpring(useTransform(
    mouseX,
    [0, dimensions.width],
    [0.05, isHovered ? 0.2 : 0.05]
  ), springConfig);
  
  // Set dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Track mouse movements
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const { left, top } = dimensions;
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${shadow ? "group" : ""} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: `${depth * 30}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className={`w-full h-full transition-colors duration-300 ${
          border ? "border border-white/10 dark:border-gray-800" : ""
        } ${backgroundGradient ? "bg-gradient-to-b from-white/5 to-white/10 dark:from-gray-900/70 dark:to-gray-800/70" : ""}`}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.1, type: "tween" }}
      >
        {children}

        {/* Shadow under the card when lifted */}
        {shadow && (
          <motion.div
            className="absolute -z-10 inset-0 rounded-[inherit] bg-black/20 dark:bg-black/50"
            style={{
              translateZ: "-80px",
              rotateX: isHovered ? rotateX : 0,
              rotateY: isHovered ? rotateY : 0,
              filter: "blur(16px)",
              opacity: 0,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Light glare effect */}
        {glare && (
          <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white via-white to-transparent opacity-0 rounded-[inherit] pointer-events-none"
            style={{
              x: glareX,
              y: glareY,
              opacity: glareOpacity,
              background:
                "linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)",
            }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
} 