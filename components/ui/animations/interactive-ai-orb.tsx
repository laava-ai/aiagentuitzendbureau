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

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (meshRef.current && groupRef.current) {
      groupRef.current.rotation.x += 0.005;
      groupRef.current.rotation.y += 0.005;

      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * (isHovered ? 0.05 : 0.02);
      meshRef.current.scale.set(scale, scale, scale);

      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = isHovered ? 0.8 : 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size / 200, 64, 64]} />
        <meshStandardMaterial
          color={pulseColor}
          wireframe={true}
          emissive={glowColor}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <pointLight color={glowColor} intensity={isHovered ? 2 : 1} distance={size / 50} position={[0, 0, 0]} />
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
  const [currentMessage, setCurrentMessage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [wordIndex, setWordIndex] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [10, -10]);
  const rotateY = useTransform(springX, [-100, 100], [-10, 10]);

  const glowSize = useMotionValue(size * 1.2);
  const springGlow = useSpring(glowSize, { damping: 15, stiffness: 200 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovered && !isDragging) {
        setDisplayedWords([]);
        setWordIndex(0);
        glowSize.set(size * 1.4);
        setTimeout(() => glowSize.set(size * 1.2), 600);
      }
    }, messageInterval);
    return () => clearInterval(intervalId);
  }, [isHovered, isDragging, messageInterval, size]);

  useEffect(() => {
    setDisplayedWords([]);
    setWordIndex(0);
  }, [currentMessage]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    setMousePosition({ x: mouseX, y: mouseY });

    if (isHovered || isDragging) {
      const maxDistance = 30;
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

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 50 - 25,
    y: Math.random() * 50 - 25,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.4 + 0.2,
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
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 10%, transparent 70%)`,
          width: springGlow,
          height: springGlow,
          opacity: isHovered ? 0.7 : 0.5,
        }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
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

      {particles.map((particle) => (
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
            x: [particle.x, particle.x + (Math.random() * 40 - 20)],
            y: [particle.y, particle.y + (Math.random() * 40 - 20)],
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
    </div>
  );
}