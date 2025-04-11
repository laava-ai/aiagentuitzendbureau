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
  particleCount = 50,
  particleSize = 2,
  particleColor = "#3b82f6",
  particleSpeed = 0.5,
  interactiveRadius = 150,
  interactiveStrength = 3,
  connectionRadius = 100,
  connectionOpacity = 0.15,
  backgroundLayer = true,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  
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
    
    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw connections first (behind particles)
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        
        // Draw connections between nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
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
      
      // Update and draw each particle
      particlesRef.current.forEach((particle) => {
        // Apply mouse interaction
        if (isMouseInCanvas) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < interactiveRadius) {
            const force = (interactiveRadius - distance) / interactiveRadius;
            particle.speedX -= (dx / distance) * force * interactiveStrength * 0.05;
            particle.speedY -= (dy / distance) * force * interactiveStrength * 0.05;
          }
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY = -particle.speedY;
        }
        
        // Apply damping
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor.replace(/^#/, "").match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(", ")}, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
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
    interactiveStrength
  ]);
  
  // Handle mouse events
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
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