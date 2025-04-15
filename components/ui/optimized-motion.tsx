"use client";

import * as React from "react";
import { motion, MotionProps, HTMLMotionProps } from "framer-motion";
import { useMobileOptimizer } from "./mobile-optimizer";

// OptimizedMotion wrapper component that will conditionally render either
// a motion component or a static alternative based on mobile status
export function OptimizedMotion<T extends React.ElementType = "div">({
  as,
  children,
  className,
  style,
  ...props
}: MotionProps & {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { disableAllAnimations } = useMobileOptimizer();
  const Component = as || "div";

  // On mobile/low-end devices or when animations are disabled,
  // render a plain div with no animation props
  if (disableAllAnimations) {
    return React.createElement(
      Component as React.ElementType,
      { className, style },
      children
    );
  }

  // On desktop, use the full motion component with all animation props
  return (
    <motion.div className={className} style={style} {...props}>
      {children}
    </motion.div>
  );
}

// Function to create optimized variants of motion components
export function createOptimizedMotionComponent<T extends keyof JSX.IntrinsicElements>(
  element: T
) {
  // Use React component props with motionProps
  type MotionComponentProps = React.ComponentProps<T> & MotionProps & {
    children?: React.ReactNode;
  };
  
  const OptimizedComponent = React.forwardRef<
    HTMLElement,
    MotionComponentProps
  >(({ children, className, style, ...props }, ref) => {
    const { disableAllAnimations } = useMobileOptimizer();

    if (disableAllAnimations) {
      return React.createElement(
        element,
        { ref, className, style },
        children
      );
    }

    const MotionComponent = motion[element as keyof typeof motion];
    return React.createElement(
      MotionComponent as React.ElementType,
      { ref, className, style, ...props },
      children
    );
  });
  
  // Set display name to fix linter error
  OptimizedComponent.displayName = `OptimizedMotion(${String(element)})`;
  
  return OptimizedComponent;
}

// Create optimized versions of common motion components
export const OptimizedMotionDiv = createOptimizedMotionComponent("div");
export const OptimizedMotionP = createOptimizedMotionComponent("p");
export const OptimizedMotionH1 = createOptimizedMotionComponent("h1");
export const OptimizedMotionH2 = createOptimizedMotionComponent("h2");
export const OptimizedMotionH3 = createOptimizedMotionComponent("h3");
export const OptimizedMotionSpan = createOptimizedMotionComponent("span");
export const OptimizedMotionUl = createOptimizedMotionComponent("ul");
export const OptimizedMotionLi = createOptimizedMotionComponent("li");
export const OptimizedMotionPath = createOptimizedMotionComponent("path");
export const OptimizedMotionSvg = createOptimizedMotionComponent("svg");

// Helper hook to get animation properties only when animations are enabled
export function useOptimizedAnimationProps<T>(props: T): T | null {
  const { disableAllAnimations } = useMobileOptimizer();
  return disableAllAnimations ? null : props;
} 