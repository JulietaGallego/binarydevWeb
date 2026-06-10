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

const products = [
  { name: 'Producto destacado', price: '$12.500', badge: 'Más vendido', color: 'bg-brand-500/10' },
  { name: 'Nuevo ingreso',      price: '$8.900',  badge: 'Nuevo',       color: 'bg-green-500/10' },
  { name: 'Oferta especial',    price: '$6.200',  badge: '-20%',        color: 'bg-orange-500/10' },
];

const categories = ['Todo', 'Ropa', 'Accesorios'];

export function MockupTiendaOnline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <div ref={ref} className="relative mx-auto max-w-sm lg:max-w-none">
      <div className="pointer-events-none absolute -top-8 -left-8 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />

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
            <motion.span variants={fadeUp} className="text-xs text-foreground-subtle truncate">mitienda.com.ar</motion.span>
          </div>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground-muted"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-500 text-[8px] font-bold text-white">2</span>
          </div>
        </motion.div>

        {/* Category header */}
        <motion.div variants={fadeUp} className="border-b border-border/50 bg-background px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-24 rounded bg-foreground/20" />
            <div className="flex gap-3">
              {categories.map((cat, i) => (
                <span
                  key={cat}
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${i === 0 ? 'bg-brand-500 text-white' : 'text-foreground-subtle'}`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-3 gap-2 bg-background p-4">
          {products.map((p, i) => (
            <motion.div key={i} variants={pop} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className={`relative flex aspect-square items-center justify-center ${p.color}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground-subtle/40" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                <span className="absolute top-1.5 left-1.5 rounded-full bg-brand-500 px-1.5 py-0.5 text-[8px] font-bold text-white leading-none">{p.badge}</span>
              </div>
              <div className="p-2">
                <p className="truncate text-[10px] font-semibold text-foreground leading-tight">{p.name}</p>
                <p className="text-[10px] font-bold text-brand-500">{p.price}</p>
                <button className="mt-1.5 w-full rounded-md bg-brand-500/90 py-1 text-[9px] font-bold text-white">+ Agregar</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Badge */}
      <motion.div
        className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.75 }}
      >
        <span className="text-base">🔔</span>
        <div>
          <p className="text-[10px] font-bold text-foreground leading-none">Nueva venta</p>
          <p className="text-[10px] text-foreground-subtle">hace 2 minutos</p>
        </div>
      </motion.div>
    </div>
  );
}

export default MockupTiendaOnline;
