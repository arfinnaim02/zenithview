"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useCallback, useRef } from "react";

type Item = { title: string; description: string; slug: string };
export default function InteractiveServices({ items }: { items: Item[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  }, []);

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1, y: 0,
      transition: { staggerChildren: 0.08, when: "beforeChildren" }
    }
  };

  return (
    <section className="relative py-20 bg-base/90" onMouseMove={onMouseMove}>
      {/* floating orbs for depth */}
      <div className="absolute -top-10 left-10 w-56 h-56 rounded-full bg-[rgba(0,208,255,.18)] orb" />
      <div className="absolute bottom-0 right-20 w-64 h-64 rounded-full bg-[rgba(139,92,246,.18)] orb" />

      <div className="max-w-6xl mx-auto px-4" ref={sectionRef}>
        <h2 className="font-heading text-3xl md:text-4xl text-neon mb-10 text-center">
          Core Services
        </h2>

        {/* spotlight */}
        <div className="services-spotlight z-0" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((it) => (
            <ServiceCard key={it.slug} {...it} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Card with magnetic hover + 3D tilt + border gradient ---------- */
function ServiceCard({ title, description, slug }: Item) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(y, [-50, 50], [8, -8]);   // rotateX
  const ry = useTransform(x, [-50, 50], [-8, 8]);   // rotateY
  const sx = useSpring(x, { stiffness: 120, damping: 15 });
  const sy = useSpring(y, { stiffness: 120, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) - rect.width / 2);
    y.set((e.clientY - rect.top) - rect.height / 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
      className="relative group"
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="card-border rounded-2xl bg-base/70 border border-white/10 p-6 h-full"
      >
        {/* inner glow that chases cursor */}
        <motion.div
          aria-hidden
          style={{
            x: sx, y: sy,
            translateZ: 20
          }}
          className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(0,208,255,.18),transparent_60%)]" />
        </motion.div>

        <div className="relative z-10" style={{ transform: "translateZ(10px)" }}>
          <h3 className="font-heading text-lg mb-2 text-neon">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">{description}</p>

          <Link
            href={`/services/${slug}`}
            className="inline-flex items-center gap-1 text-electric text-sm"
          >
            <span>Learn more</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              className="inline-block"
            >
              →
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
