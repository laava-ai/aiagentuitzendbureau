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
  
  useEffect(() => {
    if (isInView) {
      setShouldCount(true);
    } else if (!once) {
      setShouldCount(false);
    }
  }, [isInView, once]);

  return (
    <span ref={ref} className={className}>
      {shouldCount ? (
        <ReactCountUp
          start={start}
          end={endValue}
          duration={duration}
          delay={delay}
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