import { Variants } from "framer-motion";

/**
 * Animation variants for elements that fade up into view
 */
export const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } }
};

/**
 * Animation variants for elements that fade in
 */
export const FADE_IN_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } }
};

/**
 * Animation variants for staggered child animations
 */
export const STAGGER_ANIMATION_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
}; 