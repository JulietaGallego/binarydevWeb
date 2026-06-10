'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useRef, useState } from 'react';

const STRENGTH = 5;
const SPRING = { stiffness: 180, damping: 24 };

// Only the icons used in ProcesoTrabajo
const iconPaths: Record<string, string> = {
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  code:   'M16 18l6-6-6-6M8 6l-6 6 6 6',
  zap:    'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
};

interface ProcessCardProps {
  name: string;
  desc: string;
  icon: string;
  index: number;
  image?: string;
}

export function ProcessCard({ name, desc, icon, index, image }: ProcessCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-STRENGTH, STRENGTH]), SPRING);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [STRENGTH, -STRENGTH]), SPRING);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }

  const path = iconPaths[icon] ?? iconPaths.zap;

  return (
    <motion.div
      ref={ref}
      className="relative h-full overflow-hidden rounded-xl bg-card border border-border shadow-lg p-6"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800, willChange: 'transform' }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {/* Image overlay — revealed on hover */}
      {image && (
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.img
            src={image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1 : 1.06 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/70 to-card/20" />
        </motion.div>
      )}

      {/* Card content: icon+number at top, title+desc at bottom */}
      <div className="relative z-10 flex flex-col justify-between h-full min-h-[200px] text-center md:text-left">
        <div className="flex items-start justify-between">
          <div className="flex items-center justify-center rounded-lg bg-background p-2 ring-1 ring-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 shrink-0"
              aria-hidden="true"
            >
              {path.split('M').filter(Boolean).map((d, i) => (
                <path key={i} d={`M${d}`} />
              ))}
            </svg>
          </div>
          <span className="font-display text-4xl font-black opacity-10 select-none">{index + 1}</span>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-foreground mb-2">{name}</h3>
          <p className="text-sm leading-relaxed text-foreground-muted">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default ProcessCard;
