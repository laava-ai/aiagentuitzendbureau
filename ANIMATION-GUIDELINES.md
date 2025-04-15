# Mobile Animation Optimization Guidelines

## Problem

Heavy animations on mobile devices can cause:
- Poor performance
- Janky scrolling
- Battery drain
- Overheating
- Memory issues
- Poor user experience

## Solution

We've implemented a comprehensive strategy to optimize animations for mobile devices:

1. **Mobile Detection**: Using the `useMobileOptimizer` hook to detect mobile devices
2. **Animation Disabling**: Conditionally disabling animations on mobile
3. **Optimized Components**: Using wrapper components that automatically handle mobile optimization

## How to Use

### 1. MobileOptimizer Context

The `MobileOptimizerProvider` is already set up in the app, providing these properties:

```tsx
{
  isMobile: boolean;         // Is the device a mobile device
  isLowEndDevice: boolean;   // Is this a low-performance device
  prefersReducedMotion: boolean; // User preference for reduced motion
  disableAllAnimations: boolean; // Combined flag for disabling animations
}
```

### 2. Using the OptimizedMotion Components

Replace standard Framer Motion components with our optimized versions:

```tsx
// BEFORE
import { motion } from "framer-motion";

<motion.div
  animate={{ opacity: [0.3, 0.4, 0.3] }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>

// AFTER
import { OptimizedMotionDiv } from "@/components/ui/optimized-motion";

<OptimizedMotionDiv
  animate={{ opacity: [0.3, 0.4, 0.3] }}
  transition={{ duration: 0.8 }}
>
  Content
</OptimizedMotionDiv>
```

### 3. Conditional Rendering for Heavy Animations

For complex animations, use conditional rendering:

```tsx
import { useMobileOptimizer } from "@/components/ui/mobile-optimizer";

function MyComponent() {
  const { disableAllAnimations } = useMobileOptimizer();
  
  return (
    <div>
      {!disableAllAnimations && (
        <HeavyAnimationComponent />
      )}
      
      {/* Always show static content for mobile */}
      <StaticContent />
    </div>
  );
}
```

### 4. Available Optimized Components

- `OptimizedMotion` (generic wrapper)
- `OptimizedMotionDiv`
- `OptimizedMotionP`
- `OptimizedMotionH1`, `OptimizedMotionH2`, `OptimizedMotionH3`
- `OptimizedMotionSpan`
- `OptimizedMotionUl`, `OptimizedMotionLi`
- `OptimizedMotionPath`, `OptimizedMotionSvg`

### 5. Helper Hook

For optimizing animation props:

```tsx
import { useOptimizedAnimationProps } from "@/components/ui/optimized-motion";

function MyComponent() {
  const animationProps = useOptimizedAnimationProps({
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  });
  
  return <div {...animationProps}>Content</div>;
}
```

## Best Practices

1. **Always provide static fallbacks** for animated content
2. **Avoid heavy animations** on critical parts of the UI
3. **Test on real mobile devices** to ensure smoothness
4. **Reduce animation complexity** on mobile (fewer keyframes, simpler paths)
5. **Consider using CSS transitions** for simple animations as they're more performant
6. **Lazy load** animation-heavy components
7. **Monitor performance** using browser dev tools

## Implementation Examples

See the following components for implementation examples:
- `components/sections/hero-section.tsx`
- `components/sections/about/about-hero.tsx`
- `components/sections/services/services-hero.tsx`
- `components/sections/cta-section.tsx`
- `components/sections/showcase-section.tsx` 