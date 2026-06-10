'use client';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const slideDown = {
  hidden: { y: -16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeUp = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const pop = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring' as const, stiffness: 380, damping: 20 } },
};

export function MockupWebInstitucional() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <div ref={ref} className="relative mx-auto max-w-sm lg:max-w-none">
      <div className="pointer-events-none absolute -top-8 -right-8 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        variants={container}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Chrome */}
        <motion.div variants={slideDown} className="flex items-center gap-3 border-b border-border bg-secondary px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-md bg-background px-3 py-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground-subtle shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            <motion.span variants={fadeUp} className="text-xs text-foreground-subtle truncate">tunegocio.com.ar</motion.span>
          </div>
        </motion.div>

        {/* Nav */}
        <motion.div variants={fadeUp} className="flex items-center justify-between border-b border-border/50 px-5 py-3">
          <div className="h-4 w-20 rounded bg-brand-500/20" />
          <div className="hidden items-center gap-4 sm:flex">
            <div className="h-2.5 w-10 rounded bg-foreground-subtle/20" />
            <div className="h-2.5 w-12 rounded bg-foreground-subtle/20" />
            <div className="h-2.5 w-10 rounded bg-foreground-subtle/20" />
          </div>
          <div className="h-7 w-20 rounded-full bg-brand-500/80" />
        </motion.div>

        {/* Hero */}
        <div className="px-5 py-7">
          <motion.div variants={fadeUp} className="mb-1.5 h-2 w-24 rounded bg-brand-500/30" />
          <motion.div variants={fadeUp} className="mb-1.5 h-5 w-4/5 rounded bg-foreground/20" />
          <motion.div variants={fadeUp} className="mb-1 h-5 w-3/5 rounded bg-foreground/20" />
          <div className="mt-3 mb-5 space-y-1.5">
            <motion.div variants={fadeUp} className="h-2 w-full rounded bg-foreground-subtle/15" />
            <motion.div variants={fadeUp} className="h-2 w-5/6 rounded bg-foreground-subtle/15" />
            <motion.div variants={fadeUp} className="h-2 w-4/6 rounded bg-foreground-subtle/15" />
          </div>
          <motion.div variants={fadeUp} className="flex gap-2">
            <div className="h-8 w-28 rounded-lg bg-brand-500/80" />
            <div className="h-8 w-24 rounded-lg border border-border bg-transparent" />
          </motion.div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-3 gap-2 px-5 pb-5">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} variants={pop} className="rounded-lg border border-border p-3">
              <div className="mb-2 h-5 w-5 rounded bg-brand-500/30" />
              <div className="mb-1 h-2 w-full rounded bg-foreground/15" />
              <div className="h-2 w-3/4 rounded bg-foreground-subtle/15" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Badge */}
      <motion.div
        className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.85 }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/15 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <span className="text-xs font-semibold text-foreground">100% mobile-ready</span>
      </motion.div>
    </div>
  );
}

export default MockupWebInstitucional;
