import { Easing } from 'react-native';

export const Animations = {
  // Timing configurations
  timing: {
    quick: 200,
    medium: 400,
    slow: 800,
    breathe: 2000,
  },
  
  // Easing functions
  easing: {
    gentle: Easing.out(Easing.cubic),
    bounce: Easing.bounce,
    breathe: Easing.inOut(Easing.sin),
    elastic: Easing.elastic(2),
  },
  
  // Scale animations
  scale: {
    press: 0.95,
    hover: 1.05,
    grow: 1.1,
  },
  
  // Spring configurations
  spring: {
    gentle: {
      tension: 100,
      friction: 8,
    },
    bouncy: {
      tension: 120,
      friction: 6,
    },
    stiff: {
      tension: 200,
      friction: 10,
    },
  },
};

export const AnimationPresets = {
  fadeInUp: {
    from: {
      opacity: 0,
      translateY: 20,
    },
    to: {
      opacity: 1,
      translateY: 0,
    },
    duration: Animations.timing.medium,
    easing: Animations.easing.gentle,
  },
  
  scaleIn: {
    from: {
      opacity: 0,
      scale: 0.8,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
    duration: Animations.timing.medium,
    easing: Animations.easing.gentle,
  },
  
  slideInRight: {
    from: {
      opacity: 0,
      translateX: 50,
    },
    to: {
      opacity: 1,
      translateX: 0,
    },
    duration: Animations.timing.medium,
    easing: Animations.easing.gentle,
  },
};