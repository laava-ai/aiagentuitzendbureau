"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface InteractiveAIOrbProps {
  className?: string;
  size?: number;
  idleMessages?: string[];
  pulseColor?: string;
  glowColor?: string;
  messageInterval?: number;
}

export function InteractiveAIOrb({
  className = "",
  size = 300,
  idleMessages = [
    "Hello there! 👋",
    "I'm your AI coworker",
    "Let's collaborate",
    "Need assistance?",
    "I'm here to help",
    "Ask me anything",
    "Let's build together",
    "I analyze data quickly",
    "I learn continuously",
    "I adapt to your needs",
  ],
  pulseColor = "#6366f1",
  glowColor = "rgba(99, 102, 241, 0.5)",
  messageInterval = 4000,
}: InteractiveAIOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Position values for the orb
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Springy motion
  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  // Rotation based on mouse position
  const rotateX = useTransform(springY, [-100, 100], [20, -20]);
  const rotateY = useTransform(springX, [-100, 100], [-20, 20]);
  
  // Inner orb pulse animation
  const pulseSize = useMotionValue(70);
  const springPulse = useSpring(pulseSize, { damping: 15, stiffness: 200 });
  
  // Outer glow size
  const glowSize = useTransform(
    springPulse,
    [60, 80],
    [size * 1.2, size * 1.4]
  );
  
  // Set initial window size
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Call once to set initial size
    updateWindowSize();
    
    // Add listener for window resize
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);
  
  // Handle message cycling
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovered && !isDragging) {
        setCurrentMessage((prev) => (prev + 1) % idleMessages.length);
        
        // Pulse effect when message changes
        pulseSize.set(80);
        setTimeout(() => pulseSize.set(70), 600);
      }
    }, messageInterval);
    
    return () => clearInterval(intervalId);
  }, [idleMessages.length, isHovered, isDragging, messageInterval]);
  
  // Generate random particles inside the orb
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 70 - 35,
    y: Math.random() * 70 - 35,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.2,
  }));
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!orbRef.current) return;
    
    const rect = orbRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distance from center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setMousePosition({ x: mouseX, y: mouseY });
    
    // Only update if hovered or dragging
    if (isHovered || isDragging) {
      // Limit the movement range
      const maxDistance = 50;
      const distanceX = Math.min(Math.max(mouseX, -maxDistance), maxDistance);
      const distanceY = Math.min(Math.max(mouseY, -maxDistance), maxDistance);
      
      x.set(distanceX);
      y.set(distanceY);
    }
  };
  
  // Reset when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      ref={orbRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full blur-xl pointer-events-none"
        style={{
          backgroundColor: glowColor,
          width: glowSize,
          height: glowSize,
          opacity: isHovered ? 0.6 : 0.4,
        }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      />
      
      {/* Main orb */}
      <motion.div
        className="absolute rounded-full backdrop-blur-sm overflow-hidden"
        style={{
          width: size,
          height: size,
          backgroundColor: "rgba(17, 24, 39, 0.8)",
          border: `1px solid rgba(255, 255, 255, 0.1)`,
          x: springX,
          y: springY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Particle effects inside the orb */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              x: particle.x,
              y: particle.y,
              opacity: particle.opacity,
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              x: [particle.x, particle.x + (Math.random() * 60 - 30)],
              y: [particle.y, particle.y + (Math.random() * 60 - 30)],
              opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Inner pulse core */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: springPulse,
            height: springPulse,
            backgroundColor: pulseColor,
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
            filter: "blur(10px)",
            opacity: 0.7,
          }}
        />
        
        {/* Center core */}
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full bg-white/90"
          style={{
            width: 20,
            height: 20,
            translateX: "-50%",
            translateY: "-50%",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Circular light path */}
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full border-2 border-white/20"
          style={{
            width: "60%",
            height: "60%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Orbiting dot */}
          <motion.div
            className="absolute rounded-full bg-white"
            style={{
              width: 6,
              height: 6,
              top: 0,
              left: "50%",
              translateX: "-50%",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Message bubble */}
      <motion.div
        className="absolute top-0 transform -translate-y-full mb-4 px-4 py-2 bg-black/70 backdrop-blur-md rounded-xl border border-white/10 text-white text-center min-w-max"
        style={{
          width: "max-content",
          maxWidth: "200px",
          translateY: "-120%",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0.9, 
          y: isHovered ? 0 : 5,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-sm font-medium">{idleMessages[currentMessage]}</p>
        <div className="absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2 rotate-45 w-3 h-3 bg-black/70 border-r border-b border-white/10"></div>
      </motion.div>
      
      {/* Interaction instructions */}
      {isHovered && (
        <motion.div
          className="absolute bottom-0 transform translate-y-full mt-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-white text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-xs">Interact with me</p>
        </motion.div>
      )}
    </div>
  );
} 