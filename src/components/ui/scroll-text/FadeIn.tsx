'use client';
import { motion, useInView } from 'motion/react';
import React, { useRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  scale?: boolean;
  spring?: boolean;
  once?: boolean;
}

const dirOffset: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 28 },
  down:  { y: -28 },
  left:  { x: 28 },
  right: { x: -28 },
  none:  {},
};

export function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  scale = false,
  spring = false,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' });

  const initial = {
    opacity: 0,
    filter: 'blur(4px)',
    ...dirOffset[direction],
    ...(scale ? { scale: 0.94 } : {}),
    ...(spring ? { scale: 0.7 } : {}),
  };

  const animate = inView
    ? { opacity: 1, filter: 'blur(0px)', x: 0, y: 0, scale: 1 }
    : {};

  const transition = spring
    ? { type: 'spring', stiffness: 300, damping: 22, delay }
    : { duration, delay, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
