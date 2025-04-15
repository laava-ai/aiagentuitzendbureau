"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import ReactCountUp from "react-countup";

interface CountUpProps {
  end: number | string;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  enableScrollSpy?: boolean;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function CountUp({
  end,
  start = 0,
  duration = 2.5,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  enableScrollSpy = true,
  className = "",
  once = true,
  threshold = 0.3,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const [shouldCount, setShouldCount] = useState(false);
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
  
  // Parse the end value if it's a string with special characters
  const parseEndValue = () => {
    if (typeof end === 'string') {
      // If the string contains "M", "K", etc., strip those for the animation
      // and add them back as suffix
      const numericValue = end.replace(/[^0-9.]/g, '');
      return parseFloat(numericValue);
    }
    return end;
  };
  
  // Extract any non-numeric suffix like 'M+', 'K', etc.
  const getValueSuffix = () => {
    if (typeof end === 'string') {
      // Extract anything that's not a number or decimal point
      const match = end.match(/[^0-9.].*/);
      return match ? match[0] : suffix;
    }
    return suffix;
  };
  
  const endValue = parseEndValue();
  const valueSuffix = getValueSuffix();
  
  // Use larger threshold for mobile for earlier intersection detection
  const mobileThreshold = isMobile ? Math.min(0.1, threshold) : threshold;
  
  useEffect(() => {
    if (isInView) {
      // Small delay for mobile to ensure smooth animation after page load
      if (isMobile) {
        const timer = setTimeout(() => {
          setShouldCount(true);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setShouldCount(true);
      }
    } else if (!once) {
      setShouldCount(false);
    }
  }, [isInView, once, isMobile]);

  // Optimize duration for mobile (slightly faster)
  const effectiveDuration = isMobile ? Math.max(1.2, duration * 0.8) : duration;

  return (
    <span ref={ref} className={className}>
      {shouldCount ? (
        <ReactCountUp
          start={start}
          end={endValue}
          duration={effectiveDuration}
          delay={isMobile ? 0 : delay} // No delay on mobile
          prefix={prefix}
          suffix={valueSuffix}
          decimals={decimals}
          enableScrollSpy={false}
        />
      ) : (
        `${prefix}${start}${valueSuffix}`
      )}
    </span>
  );
} 