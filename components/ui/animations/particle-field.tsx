"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  particleSize?: number;
  particleColor?: string;
  particleSpeed?: number;
  interactiveRadius?: number;
  interactiveStrength?: number;
  connectionRadius?: number;
  connectionOpacity?: number;
  backgroundLayer?: boolean;
}

export function ParticleField({
  className = "",
  particleCount = 20,
  particleSize = 2,
  particleColor = "#3b82f6",
  particleSpeed = 0.2,
  interactiveRadius = 100,
  interactiveStrength = 2,
  connectionRadius = 80,
  connectionOpacity = 0.1,
  backgroundLayer = true,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const frameCountRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Check if component is visible in viewport with larger rootMargin to reduce checks
  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);
  
  // Initialize canvas and dimensions with debounce for resize
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const handleResize = () => {
      // Clear any existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      // Debounce resize to once every 200ms
      resizeTimeoutRef.current = setTimeout(() => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const parent = canvas.parentElement;
          if (parent) {
            const { width, height } = parent.getBoundingClientRect();
            // Use lower resolution for better performance
            const scale = 0.7; // 70% of original resolution
            canvas.width = width * scale;
            canvas.height = height * scale;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            setDimensions({ width: canvas.width, height: canvas.height });
          }
        }
      }, 200);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);
  
  // Create particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    // Reduce particle count based on screen size for mobile optimization
    const dynamicParticleCount = Math.min(
      particleCount,
      Math.floor((dimensions.width * dimensions.height) / 15000) // Decrease density
    );
    
    const particles: Particle[] = [];
    
    for (let i = 0; i < dynamicParticleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: particleSize * (0.5 + Math.random() * 0.5),
        speedX: (Math.random() - 0.5) * particleSpeed * 0.8, // Slow down particles
        speedY: (Math.random() - 0.5) * particleSpeed * 0.8,
        color: particleColor,
        opacity: 0.2 + Math.random() * 0.5,
      });
    }
    
    particlesRef.current = particles;
  }, [dimensions, particleCount, particleSize, particleColor, particleSpeed]);
  
  // Animation loop with frame skipping
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let lastTime = 0;
    const frameInterval = 40; // Target ~25fps instead of 60fps
    
    const render = (timestamp: number) => {
      // Skip frames to improve performance
      if (timestamp - lastTime < frameInterval || !isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = timestamp;
      frameCountRef.current++;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw connections less frequently
      const shouldDrawConnections = frameCountRef.current % 5 === 0;
      
      if (shouldDrawConnections) {
        // Use a more efficient connection algorithm
        for (let i = 0; i < particlesRef.current.length; i++) {
          const particle = particlesRef.current[i];
          
          // Skip every other particle to reduce the number of connections
          for (let j = i + 2; j < particlesRef.current.length; j += 2) {
            const other = particlesRef.current[j];
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            // Use approximation for distance calculation (avoid square root)
            const approxDistance = Math.abs(dx) + Math.abs(dy);
            
            if (approxDistance < connectionRadius * 1.2) {
              const opacity = (1 - approxDistance / (connectionRadius * 1.2)) * connectionOpacity * 0.7;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${particleColor.replace(/^#/, "").match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(", ")}, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        }
      }
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Only process mouse interaction every few frames and for some particles
        if (isMouseInCanvas && frameCountRef.current % 3 === 0 && index % 2 === 0) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < interactiveRadius) {
            const force = (interactiveRadius - distance) / interactiveRadius;
            particle.speedX -= (dx / distance) * force * interactiveStrength * 0.03;
            particle.speedY -= (dy / distance) * force * interactiveStrength * 0.03;
          }
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX = -particle.speedX * 0.8; // Add damping
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY = -particle.speedY * 0.8; // Add damping
        }
        
        // Apply stronger friction
        particle.speedX *= 0.98;
        particle.speedY *= 0.98;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor.replace(/^#/, "").match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(", ")}, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    dimensions, 
    particleColor, 
    connectionRadius, 
    connectionOpacity, 
    isMouseInCanvas, 
    mousePosition.x, 
    mousePosition.y, 
    interactiveRadius, 
    interactiveStrength,
    isVisible
  ]);
  
  // Throttle mouse movement events more aggressively
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !isVisible) return;
    
    // Skip most frames
    if (frameCountRef.current % 5 !== 0) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    });
  };
  
  return (
    <div className={`relative ${backgroundLayer ? "fixed inset-0 -z-10" : ""} ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseInCanvas(true)}
        onMouseLeave={() => setIsMouseInCanvas(false)}
      />
    </div>
  );
} 