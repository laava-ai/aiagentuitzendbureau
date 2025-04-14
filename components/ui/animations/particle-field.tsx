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
  
  // Check if component is visible in viewport to pause animations when not visible
  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);
  
  // Initialize canvas and dimensions
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const parent = canvas.parentElement;
        if (parent) {
          const { width, height } = parent.getBoundingClientRect();
          canvas.width = width;
          canvas.height = height;
          setDimensions({ width, height });
        }
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  // Create particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: particleSize * (0.5 + Math.random() * 0.5),
        speedX: (Math.random() - 0.5) * particleSpeed,
        speedY: (Math.random() - 0.5) * particleSpeed,
        color: particleColor,
        opacity: 0.2 + Math.random() * 0.6,
      });
    }
    
    particlesRef.current = particles;
  }, [dimensions, particleCount, particleSize, particleColor, particleSpeed]);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let lastTime = 0;
    
    const render = (timestamp: number) => {
      if (timestamp - lastTime < 33 || !isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = timestamp;
      frameCountRef.current++;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      const shouldDrawConnections = frameCountRef.current % 3 === 0;
      
      if (shouldDrawConnections) {
        for (let i = 0; i < particlesRef.current.length; i += 2) {
          const particle = particlesRef.current[i];
          
          for (let j = i + 2; j < particlesRef.current.length; j += 2) {
            const other = particlesRef.current[j];
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionRadius) {
              const opacity = (1 - distance / connectionRadius) * connectionOpacity;
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
      
      particlesRef.current.forEach((particle) => {
        if (isMouseInCanvas && frameCountRef.current % 2 === 0) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < interactiveRadius) {
            const force = (interactiveRadius - distance) / interactiveRadius;
            particle.speedX -= (dx / distance) * force * interactiveStrength * 0.05;
            particle.speedY -= (dy / distance) * force * interactiveStrength * 0.05;
          }
        }
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY = -particle.speedY;
        }
        
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        
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
  
  // Throttle mouse movement events for better performance
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !isVisible) return;
    
    if (frameCountRef.current % 3 !== 0) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
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