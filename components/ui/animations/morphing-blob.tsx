"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MorphingBlobProps {
  className?: string;
  colors?: string[];
  duration?: number;
  size?: number;
  blur?: number;
  opacity?: number;
  complexity?: number;
}

export function MorphingBlob({
  className = "",
  colors = ["#4f46e5", "#8b5cf6", "#3b82f6"],
  duration = 20,
  size = 600,
  blur = 60,
  opacity = 0.15,
  complexity = 5,
}: MorphingBlobProps) {
  const [paths, setPaths] = useState<{ start: string; end: string }[]>([]);
  const [currentGradient, setCurrentGradient] = useState(0);

  // Generate random blob path
  const generateBlobPath = (complexity: number, size: number) => {
    const center = size / 2;
    const points: { x: number; y: number }[] = [];
    const angleStep = (Math.PI * 2) / complexity;
    
    for (let i = 0; i < complexity; i++) {
      const angle = i * angleStep;
      const radius = center * (0.6 + Math.random() * 0.4);
      points.push({
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius,
      });
    }
    
    // Create SVG path string
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length; i++) {
      const curr = points[i];
      const next = points[(i + 1) % points.length];
      
      // Control points for bezier curve
      const cp1x = curr.x + (next.x - curr.x) / 2 + Math.random() * 50 - 25;
      const cp1y = curr.y + (next.y - curr.y) / 2 + Math.random() * 50 - 25;
      
      path += ` Q ${cp1x},${cp1y} ${next.x},${next.y}`;
    }
    
    path += " Z";
    return path;
  };

  // Initialize and set up animation
  useEffect(() => {
    const newPaths = [];
    
    for (let i = 0; i < 3; i++) {
      newPaths.push({
        start: generateBlobPath(complexity, size),
        end: generateBlobPath(complexity, size),
      });
    }
    
    setPaths(newPaths);
    
    // Rotate through gradient colors
    const intervalId = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % colors.length);
    }, duration * 1000);
    
    return () => clearInterval(intervalId);
  }, [complexity, size, colors.length, duration]);

  // If paths not generated yet, show nothing
  if (paths.length === 0) return null;

  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <div
        className="relative"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {paths.map((pathData, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{ duration: 1 }}
            style={{ filter: `blur(${blur}px)` }}
          >
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id={`gradient-${index}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <motion.stop
                    offset="0%"
                    animate={{
                      stopColor: [
                        colors[(currentGradient) % colors.length],
                        colors[(currentGradient + 1) % colors.length],
                        colors[(currentGradient + 2) % colors.length],
                      ],
                    }}
                    transition={{
                      duration: duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.stop
                    offset="100%"
                    animate={{
                      stopColor: [
                        colors[(currentGradient + 2) % colors.length],
                        colors[(currentGradient) % colors.length],
                        colors[(currentGradient + 1) % colors.length],
                      ],
                    }}
                    transition={{
                      duration: duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </linearGradient>
              </defs>
              <motion.path
                d={pathData.start}
                animate={{ d: pathData.end }}
                transition={{
                  duration: duration,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
                fill={`url(#gradient-${index})`}
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 