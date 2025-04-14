"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";

interface InteractiveAIOrbProps {
  className?: string;
  size?: number;
  pulseColor?: string;
  glowColor?: string;
  messageInterval?: number;
  typingSpeed?: number;
}

function ThreeJSOrb({
  size,
  pulseColor,
  glowColor,
  isHovered,
}: {
  size: number;
  pulseColor: string;
  glowColor: string;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const frameCountRef = useRef(0);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    frameCountRef.current += 1;
    
    // Only update every 2 frames for better performance
    if (frameCountRef.current % 2 !== 0) return;
    
    if (meshRef.current && groupRef.current) {
      // Reduce rotation speed
      groupRef.current.rotation.x += 0.002;
      groupRef.current.rotation.y += 0.002;

      // Simplify animation - less dramatic scale changes
      const scale = 1 + Math.sin(clock.getElapsedTime()) * (isHovered ? 0.03 : 0.01);
      meshRef.current.scale.set(scale, scale, scale);

      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = isHovered ? 0.6 : 0.3;
    }
  });

  // Use simpler geometry with fewer vertices
  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size / 200, 32, 32]} />
        <meshStandardMaterial
          color={pulseColor}
          wireframe={true}
          emissive={glowColor}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <pointLight color={glowColor} intensity={isHovered ? 1.5 : 0.8} distance={size / 50} position={[0, 0, 0]} />
      <ambientLight color={pulseColor} intensity={0.2} />
    </group>
  );
}

export function InteractiveAIOrb({
  className = "",
  size = 300,
  pulseColor = "#00aaff",
  glowColor = "rgba(99, 102, 241, 0.5)",
  messageInterval = 4000,
  typingSpeed = 200,
}: InteractiveAIOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const lastMoveTimeRef = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Less responsive but more efficient spring config
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [5, -5]);
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);

  const glowSize = useMotionValue(size * 1.2);
  const springGlow = useSpring(glowSize, { damping: 15, stiffness: 150 });

  // Check if component is visible to pause animations when not in viewport
  useEffect(() => {
    if (typeof window === 'undefined' || !orbRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(orbRef.current);
    return () => observer.disconnect();
  }, []);

  // Throttle mouse movement handling
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!orbRef.current || !isVisible) return;
    
    // Throttle mouse move events to once every 50ms
    const now = Date.now();
    if (now - lastMoveTimeRef.current < 50) return;
    lastMoveTimeRef.current = now;
    
    const rect = orbRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    setMousePosition({ x: mouseX, y: mouseY });

    if (isHovered || isDragging) {
      // Limit movement range for better performance
      const maxDistance = 20;
      const distanceX = Math.min(Math.max(mouseX, -maxDistance), maxDistance);
      const distanceY = Math.min(Math.max(mouseY, -maxDistance), maxDistance);
      x.set(distanceX);
      y.set(distanceY);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Reduce number of particles
  const particles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    x: Math.random() * 50 - 25,
    y: Math.random() * 50 - 25,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 5, // Slower animations
    delay: Math.random() * 4,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      ref={orbRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {isVisible && (
        <>
          <motion.div
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${glowColor} 10%, transparent 70%)`,
              width: springGlow,
              height: springGlow,
              opacity: isHovered ? 0.6 : 0.4,
            }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute"
            style={{
              width: size,
              height: size,
              x: springX,
              y: springY,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 60 }}
              style={{ width: "100%", height: "100%" }}
              gl={{ alpha: true, antialias: true }}
            >
              <ThreeJSOrb size={size} pulseColor={pulseColor} glowColor={pulseColor} isHovered={isHovered} />
            </Canvas>
          </motion.div>

          {/* Only render particles when hovered to improve performance */}
          {isHovered && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-blue-400"
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
                x: [particle.x, particle.x + (Math.random() * 30 - 15)],
                y: [particle.y, particle.y + (Math.random() * 30 - 15)],
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

          {isHovered && (
            <motion.div
              className="absolute bottom-0 transform translate-y-full mt-6 px-5 py-2 bg-gray-900/80 backdrop-blur-lg rounded-lg border border-white/10 text-white text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="text-xs font-medium">Interageer met de AI-kern</p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}