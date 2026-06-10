'use client';
import { motion, useInView, type Variants } from 'motion/react';
import React, { useRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';
type As = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
type Style = 'default' | 'reveal';

interface TextAnimationProps {
  text: string;
  as?: As;
  classname?: string;
  variants?: Variants;
  letterAnime?: boolean;
  lineAnime?: boolean;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  style?: Style;
}

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 40 },
  down:  { y: -40 },
  left:  { x: 40 },
  right: { x: -40 },
};

function defaultVariants(direction: Direction, duration: number): Variants {
  const offset = directionOffset[direction];
  return {
    hidden: { opacity: 0, filter: 'blur(4px)', ...offset },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      x: 0,
      y: 0,
      transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
    },
  };
}

// Clip-path reveal: each word slides up from behind an invisible mask
const revealVariants = (duration: number): Variants => ({
  hidden: { y: '105%' },
  visible: { y: '0%', transition: { duration, ease: [0.76, 0, 0.24, 1] } },
});

const STAGGER_WORD   = 0.12;
const STAGGER_LETTER = 0.04;
const STAGGER_LINE   = 0.15;

export function TextAnimation({
  text,
  as: Tag = 'h2',
  classname = '',
  variants,
  letterAnime = false,
  lineAnime = false,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  once = true,
  style = 'default',
}: TextAnimationProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: '0px 0px -80px 0px' });

  const resolvedVariants = variants ?? (style === 'reveal' ? revealVariants(duration) : defaultVariants(direction, duration));

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: letterAnime ? STAGGER_LETTER : lineAnime ? STAGGER_LINE : STAGGER_WORD, delayChildren: delay } },
  };

  const MotionTag = motion[Tag] as typeof motion.h2;

  // Line animation — split by \n or sentences
  if (lineAnime) {
    const lines = text.split(/\n|(?<=\.)\s+/);
    return (
      <MotionTag
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className={classname}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span className="block" variants={resolvedVariants}>
              {line}
            </motion.span>
          </span>
        ))}
      </MotionTag>
    );
  }

  // Letter animation
  if (letterAnime) {
    return (
      <MotionTag
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className={classname}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            className={char === ' ' ? 'inline-block' : 'inline-block'}
            style={char === ' ' ? { marginRight: '0.25em' } : undefined}
            variants={resolvedVariants}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  // Word animation — default or reveal
  const words = text.split(' ');
  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={classname}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {words.map((word, i) => (
        style === 'reveal' ? (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]" style={{ verticalAlign: 'bottom' }}>
            <motion.span className="inline-block" variants={resolvedVariants}>
              {word}
            </motion.span>
          </span>
        ) : (
          <motion.span key={i} className="inline-block mr-[0.25em]" variants={resolvedVariants}>
            {word}
          </motion.span>
        )
      ))}
    </MotionTag>
  );
}

export default TextAnimation;
