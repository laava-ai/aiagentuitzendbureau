"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform, animate } from "framer-motion";
import { Mic, Send, Volume2, VolumeX } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { throttle } from "lodash";
import * as THREE from "three";

interface InteractiveAIOrbProps {
  size?: number;
  pulseColor?: string;
  glowColor?: string;
}

export function InteractiveAIOrb({
  size = 400,
  pulseColor = "#8b5cf6",
  glowColor = "rgba(99, 102, 241, 0.6)",
}: InteractiveAIOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Use framer-motion values 
  const springX = useMotionValue(0);
  const springY = useMotionValue(0);
  
  // Transform the motion values to be used in the 3D transform
  const rotateX = useTransform(springY, value => -value);
  const rotateY = useTransform(springX, value => value);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "150px" }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current && containerRef.current) {
        observerRef.current.unobserve(containerRef.current);
      }
    };
  }, []);

  // Mouse move handler
  const handleMouseMove = throttle(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !isVisible || isMobile) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDistance = Math.max(rect.width, rect.height) / 2;

      const falloff = Math.pow(Math.min(1, distance / maxDistance), 3) * 0.7 + 0.3;

      const x = (distX / (rect.width / 2)) * falloff;
      const y = (distY / (rect.height / 2)) * falloff;

      // Use animate for spring physics
      animate(springX, x * 0.35, {
        type: "spring",
        stiffness: isHovered ? 180 : 140,
        damping: isHovered ? 18 : 24,
        mass: 1.4
      });
      
      animate(springY, -y * 0.35, {
        type: "spring",
        stiffness: isHovered ? 180 : 140,
        damping: isHovered ? 18 : 24,
        mass: 1.4
      });
    },
    isMobile ? 50 : 12, // Increase throttle time on mobile
    { leading: true, trailing: true }
  );

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Reset position with animation
    animate(springX, 0, {
      type: "spring",
      stiffness: 100,
      damping: 16,
      mass: 1
    });
    
    animate(springY, 0, {
      type: "spring",
      stiffness: 100,
      damping: 16,
      mass: 1
    });
  };

  // Three.js orb with continuous active pulsing
  function ThreeJSOrb() {
    const meshRef = useRef<THREE.Mesh>(null);
    const targetScale = useRef({ x: 1.15, y: 1.15, z: 1.15 });
    const currentRotation = useRef({ x: 0, y: 0 });
    const lastUpdateTime = useRef(0);
    const distortionRef = useRef(0.6);
    const speedRef = useRef(4);

    useFrame((state) => {
      if (!meshRef.current || !isVisible) return;

      const time = state.clock.getElapsedTime();
      
      // On mobile, only update animation every few frames
      if (isMobile && (time * 1000) % 3 > 0) return;
      
      const deltaTime = Math.min(0.033, time - lastUpdateTime.current);
      lastUpdateTime.current = time;

      // Reduced animation complexity for mobile
      const rotationSpeed = isMobile ? 0.15 : (isHovered ? 0.35 : 0.25);
      const wobble = isMobile ? 0 : (Math.sin(time * 1.5) * 0.02);

      currentRotation.current.x += rotationSpeed * deltaTime * 0.3 + wobble * deltaTime;
      currentRotation.current.y += rotationSpeed * deltaTime * 0.4 - wobble * deltaTime * 0.7;

      meshRef.current.rotation.x = currentRotation.current.x;
      meshRef.current.rotation.y = currentRotation.current.y;

      // Continuous pulsing around active state - reduced for mobile
      const pulseSpeed = isMobile ? 0.4 : 0.8;
      const pulseAmplitude = isMobile ? 0.02 : (isHovered ? 0.08 : 0.05);
      const pulseBase = 1.15; // Active scale
      const pulse = Math.sin(time * pulseSpeed) * pulseAmplitude + pulseBase;
      const phaseOffset = isMobile ? 0 : (Math.cos(time * pulseSpeed * 0.7) * 0.01);

      targetScale.current = {
        x: pulse + phaseOffset,
        y: pulse,
        z: pulse - phaseOffset,
      };

      // Smooth scale transitions - reduced lerp factor for mobile
      const scaleLerpFactor = isMobile ? 2 : (isHovered ? 5 : 4);
      meshRef.current.scale.x +=
        (targetScale.current.x - meshRef.current.scale.x) * scaleLerpFactor * deltaTime;
      meshRef.current.scale.y +=
        (targetScale.current.y - meshRef.current.scale.y) * scaleLerpFactor * deltaTime;
      meshRef.current.scale.z +=
        (targetScale.current.z - meshRef.current.scale.z) * scaleLerpFactor * deltaTime;

      // Continuous material pulsing - reduced for mobile
      const baseDistortion = isMobile ? 0.5 : 0.6;
      const baseSpeed = isMobile ? 2.5 : 4;
      const distortionAmplitude = isMobile ? 0.03 : (isHovered ? 0.1 : 0.06);
      const speedAmplitude = isMobile ? 0.2 : (isHovered ? 0.8 : 0.5);

      distortionRef.current = baseDistortion + Math.sin(time * pulseSpeed) * distortionAmplitude;
      speedRef.current = baseSpeed + Math.cos(time * pulseSpeed * 0.8) * speedAmplitude;
    });

    return (
      <Sphere args={[1, isMobile ? 16 : 32, isMobile ? 16 : 32]} ref={meshRef}>
        <MeshDistortMaterial
          color={pulseColor}
          attach="material"
          distort={distortionRef.current}
          speed={speedRef.current}
          roughness={0.3}
          metalness={0.7}
          bumpScale={0.05}
          clearcoat={0.4}
          clearcoatRoughness={0.4}
          radius={1}
        />
      </Sphere>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer select-none"
      style={{ width: size, height: size }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Continuous active glow - simplified for mobile */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-70 blur-2xl"
        animate={{
          scale: [1.35, 1.45, 1.35],
          opacity: [0.95, 1, 0.95],
          filter: ["blur(35px)", "blur(40px)", "blur(35px)"],
        }}
        transition={{
          duration: isMobile ? 4 : 2, // Slower on mobile
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle, rgba(139, 92, 246, 0.75) 0%, rgba(99, 102, 241, 0.85) 50%, rgba(79, 70, 229, 0.65) 100%)`,
        }}
      />

      {/* Continuous pulse rings - fewer and slower on mobile */}
      {!isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0.7, scale: 0.95 }}
            animate={{ opacity: [0.7, 0, 0.7], scale: [0.95, 1.65, 0.95] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: [0.25, 0.1, 0.25, 1.0],
              times: [0, 0.7, 1],
            }}
            className="absolute inset-0 rounded-full border-2 border-indigo-500"
            style={{
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
              filter: "blur(1px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: [0.5, 0, 0.5], scale: [0.9, 1.45, 0.9] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.15,
              times: [0, 0.7, 1],
            }}
            className="absolute inset-0 rounded-full border border-indigo-400"
            style={{ filter: "blur(0.5px)" }}
          />
        </>
      )}
      
      {/* Simplified single pulse ring for mobile */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: [0.3, 0, 0.3], scale: [1, 1.25, 1] }}
          transition={{
            duration: 3, // Slower animation
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.3,
            times: [0, 0.7, 1],
          }}
          className="absolute inset-0 rounded-full border border-violet-400"
        />
      )}

      {/* Orb container - now using motion.div with styles from motion values */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          rotateX,
          rotateY,
          perspective: 1200,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        {isVisible && (
          <Canvas
            dpr={isMobile ? 1 : [1, 2]} // Lower resolution on mobile
            gl={{
              antialias: !isMobile, // Disable antialiasing on mobile
              alpha: true,
              powerPreference: isMobile ? "low-power" : "high-performance",
            }}
            camera={{ fov: 45, position: [0, 0, 5] }}
          >
            <ambientLight intensity={0.65} />
            <pointLight position={[10, 10, 10]} intensity={1.8} color="#8b5cf6" />
            {!isMobile && <pointLight position={[-10, -10, -5]} intensity={1.2} color="#6366f1" />}
            <directionalLight position={[0, 5, 5]} intensity={0.8} color="#f9fafb" />
            <ThreeJSOrb />
          </Canvas>
        )}
      </motion.div>

      {/* Continuous particle effect - reduced or disabled for mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isVisible &&
          Array.from({ length: isMobile ? 3 : 10 }).map((_, i) => {
            const angleOffset = Math.random() * 0.2 - 0.1;
            const angle = (i / (isMobile ? 3 : 10)) * Math.PI * 2 + angleOffset;
            const distanceVariation = 0.7 + Math.random() * 0.6;
            const distance = size * 0.38 * distanceVariation;
            const startX = Math.cos(angle) * distance + size / 2;
            const startY = Math.sin(angle) * distance + size / 2;

            const moveDistance = isHovered ? 80 : 70;
            const moveX =
              Math.cos(angle + (Math.random() * 0.8 - 0.4)) * moveDistance * (0.8 + Math.random() * 0.4);
            const moveY =
              Math.sin(angle + (Math.random() * 0.8 - 0.4)) * moveDistance * (0.8 + Math.random() * 0.4);

            const duration = isMobile ? 5 + Math.random() * 4 : 3 + Math.random() * 4;
            const delay = Math.random() * 4;

            const particleSize = (isHovered ? 4 : 3.5) + Math.random() * 2;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: startX,
                  top: startY,
                  opacity: 0,
                  filter: "blur(1px)",
                  width: particleSize + "px",
                  height: particleSize + "px",
                  background:
                    i % 3 === 0
                      ? "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)"
                      : i % 3 === 1
                      ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                      : "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
                }}
                animate={{
                  x: [0, moveX * 0.3, moveX],
                  y: [0, moveY * 0.4, moveY],
                  scale: [0, 1.2, 0],
                  opacity: [0, isMobile ? 0.7 : (isHovered ? 1 : 0.95), 0],
                  filter: ["blur(2px)", "blur(1px)", "blur(3px)"],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  times: [0, 0.4, 1],
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

interface TalkingAIAgentProps {
  className?: string;
}

export function TalkingAIAgent({ className = "" }: TalkingAIAgentProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const controls = useAnimation();
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize speech synthesis
  useEffect(() => {
    speechRef.current = new SpeechSynthesisUtterance();
    speechRef.current.lang = "en-US";
    speechRef.current.volume = 1;
    speechRef.current.rate = 1;
    speechRef.current.pitch = 1;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setConversation((prev) => [...prev, { role: "user", text: transcript }]);
        handleResponse(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setConversation((prev) => [...prev, { role: "ai", text: "Sorry, I couldn't understand that." }]);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Speak a response
  const speak = (text: string) => {
    if (isMuted || !speechRef.current) return;
    window.speechSynthesis.cancel();
    speechRef.current.text = text;
    window.speechSynthesis.speak(speechRef.current);
    setIsSpeaking(true);
    controls.start({ scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 0.5 } });
    speechRef.current.onend = () => {
      setIsSpeaking(false);
      controls.stop();
      controls.set({ scale: 1 });
    };
  };

  // Mock AI response
  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hey there! How can I assist you today?";
    } else if (lowerInput.includes("weather")) {
      return "I don't have real-time data, but tell me your city, and I'll give you a sunny vibe!";
    } else if (lowerInput.includes("joke")) {
      return "Why did the computer go to art school? Because it wanted to learn how to draw a better 'byte'!";
    } else {
      return "That's an interesting question! Could you clarify or ask something else?";
    }
  };

  // Handle user input and AI response
  const handleResponse = (input: string) => {
    const response = getAIResponse(input);
    setConversation((prev) => [...prev, { role: "ai", text: response }]);
    speak(response);
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      setConversation((prev) => [
        ...prev,
        { role: "ai", text: "Voice input is not supported in this browser." },
      ]);
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Handle text input
  const handleTextInput = () => {
    if (!userInput.trim()) return;
    setConversation((prev) => [...prev, { role: "user", text: userInput }]);
    handleResponse(userInput);
    setUserInput("");
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted((prev) => {
      if (!prev) window.speechSynthesis.cancel();
      return !prev;
    });
  };

  return (
    <div className={`flex flex-col items-center p-4 ${className}`}>
      {/* Animated avatar/icon */}
      <motion.div
        className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4"
        animate={controls}
      >
        {isSpeaking ? (
          <Volume2 className="w-8 h-8 text-white" />
        ) : isListening ? (
          <Mic className="w-8 h-8 text-white animate-pulse" />
        ) : (
          <div className="w-6 h-6 bg-white rounded-full" />
        )}
      </motion.div>

      {/* Conversation display */}
      <div className="w-full max-w-md h-64 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {msg.role === "user" ? "You" : "AI"}: {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input controls */}
      <div className="flex w-full max-w-md items-center space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleTextInput()}
          placeholder="Type or speak..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleVoiceInput}
          className={`p-2 rounded-lg ${isListening ? "bg-red-500" : "bg-purple-500"} text-white`}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          <Mic className="w-6 h-6" />
        </button>
        <button
          onClick={handleTextInput}
          className="p-2 bg-blue-500 rounded-lg text-white"
          aria-label="Send message"
        >
          <Send className="w-6 h-6" />
        </button>
        <button
          onClick={toggleMute}
          className="p-2 bg-gray-500 rounded-lg text-white"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}