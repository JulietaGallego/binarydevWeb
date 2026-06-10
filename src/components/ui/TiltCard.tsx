'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useRef } from 'react';

const STRENGTH = 7;
const SPRING = { stiffness: 280, damping: 28 };

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-STRENGTH, STRENGTH]), SPRING);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [STRENGTH, -STRENGTH]), SPRING);
  const scale   = useSpring(1, SPRING);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
    scale.set(1.02);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d', perspective: 600, willChange: 'transform' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default TiltCard;
