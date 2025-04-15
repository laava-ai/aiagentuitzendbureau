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
  const [isMobile, setIsMobile] = useState(false);

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
    
    // Ensure we have points before creating the path
    if (points.length === 0) {
      return `M ${center},${center} L ${center + 10},${center + 10} Z`; // Default fallback path
    }
    
    // Validate all points have valid numbers
    const validPoints = points.filter(
      pt => !isNaN(pt.x) && isFinite(pt.x) && !isNaN(pt.y) && isFinite(pt.y)
    );
    
    if (validPoints.length === 0) {
      return `M ${center},${center} L ${center + 10},${center + 10} Z`; // Default fallback path
    }
    
    // Create SVG path string
    let path = `M ${validPoints[0].x},${validPoints[0].y}`;
    
    for (let i = 0; i < validPoints.length; i++) {
      const curr = validPoints[i];
      const next = validPoints[(i + 1) % validPoints.length];
      
      // Control points for bezier curve - simpler on mobile
      const randomFactor = isMobile ? 15 : 25;
      const cp1x = curr.x + (next.x - curr.x) / 2 + Math.random() * randomFactor * 2 - randomFactor;
      const cp1y = curr.y + (next.y - curr.y) / 2 + Math.random() * randomFactor * 2 - randomFactor;
      
      // Ensure control points are valid numbers
      if (!isNaN(cp1x) && isFinite(cp1x) && !isNaN(cp1y) && isFinite(cp1y) && 
          !isNaN(next.x) && isFinite(next.x) && !isNaN(next.y) && isFinite(next.y)) {
        path += ` Q ${cp1x},${cp1y} ${next.x},${next.y}`;
      } else {
        // If invalid, use a line segment instead
        path += ` L ${next.x},${next.y}`;
      }
    }
    
    path += " Z";
    return path;
  };

  // Initialize and set up animation
  useEffect(() => {
    // Use fewer blobs on mobile
    const blobCount = isMobile ? 1 : 3;
    const newPaths = [];
    
    // Use simpler shapes for mobile
    const mobileComplexity = isMobile ? Math.max(3, complexity - 2) : complexity;
    
    for (let i = 0; i < blobCount; i++) {
      const start = generateBlobPath(mobileComplexity, size);
      const end = generateBlobPath(mobileComplexity, size);
      
      // Ensure both paths are valid
      if (start && end && start !== "undefined" && end !== "undefined") {
        newPaths.push({ start, end });
      }
    }
    
    if (newPaths.length > 0) {
      setPaths(newPaths);
    } else {
      // Create a simple fallback path if all generated paths are invalid
      const fallback = `M ${size/2},${size/2} m -${size/4},0 a ${size/4},${size/4} 0 1,0 ${size/2},0 a ${size/4},${size/4} 0 1,0 -${size/2},0`;
      setPaths([{ start: fallback, end: fallback }]);
    }
    
    // Rotate through gradient colors - less frequently on mobile
    const intervalId = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % colors.length);
    }, duration * (isMobile ? 1.5 : 1) * 1000);
    
    return () => clearInterval(intervalId);
  }, [complexity, size, colors.length, duration, isMobile]);

  // If paths not generated yet, show nothing
  if (paths.length === 0) return null;

  // Calculate effective blur and duration for mobile
  const effectiveBlur = isMobile ? Math.floor(blur * 0.6) : blur;
  const effectiveDuration = isMobile ? duration * 1.5 : duration;

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
            animate={{ opacity: isMobile ? opacity * 0.8 : opacity }}
            transition={{ duration: 1 }}
            style={{ filter: `blur(${effectiveBlur}px)` }}
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
                      duration: effectiveDuration,
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
                      duration: effectiveDuration,
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
                  duration: effectiveDuration,
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