"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";

type Step = {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Discovery & Assessment",
    subtitle:
      "We understand goals, constraints, data, and success metrics to design the right approach.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          d="M11 3a8 8 0 1 0 5.293 14.293l3.707 3.707 1.414-1.414-3.707-3.707A8 8 0 0 0 11 3Zm0 2a6 6 0 1 1 0 12A6 6 0 0 1 11 5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Solution Design",
    subtitle:
      "We propose architecture, data flows and UX, balancing capability, cost, and speed.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          d="M9 2h6v4H9V2Zm-2 6h10v14H7V8Zm2 2v10h6V10H9Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Development & Training",
    subtitle:
      "We build, integrate and iterate; train models, wire dashboards, and automate workflows.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          d="M4 4h16v4H4V4Zm0 6h10v4H4v-4Zm0 6h16v4H4v-4Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Deployment & Optimization",
    subtitle:
      "We launch, monitor and tune; add safeguards, alerts and continuous improvements.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          d="M12 2 3 6v6c0 5.25 3.438 10.125 9 12 5.563-1.875 9-6.75 9-12V6l-9-4Zm0 2.18 7 3.11v4.78c0 4.41-2.92 8.56-7 10.08-4.08-1.52-7-5.67-7-10.08V7.29l7-3.11ZM11 8h2v5h-2V8Zm0 6h2v2h-2v-2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

/** A small tilt-card with cursor parallax */
function TiltCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const lift = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    // Map to nice tilt range
    rotateX.set((0.5 - py) * 8); // up/down tilt
    rotateY.set((px - 0.5) * 10); // left/right tilt
    lift.set(6); // gentle lift on move
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  };

  // subtle entrance animation delay per card
  const delay = useMemo(() => 0.05 * index, [index]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      style={{
        rotateX,
        rotateY,
        y: lift,
        transformStyle: "preserve-3d",
      }}
      className="card-border group relative rounded-2xl bg-base/80 backdrop-blur px-6 pt-6 pb-7 border border-white/10 hover:border-white/20"
    >
      <div className="absolute -top-4 left-6 rounded-xl px-3 py-1 text-xs bg-white/5 border border-white/10 text-gray-300">
        Step {step.id}
      </div>

      <div className="flex items-start gap-3">
        <div className="text-neon/90">
          {step.icon}
        </div>
        <h3 className="font-heading text-lg md:text-xl text-white">
          {step.title}
        </h3>
      </div>

      <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-gray-300">
        {step.subtitle}
      </p>

      {/* gradient sweep on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute -inset-8 blur-3xl opacity-40 bg-[radial-gradient(24rem_24rem_at_30%_20%,rgba(0,208,255,.20),transparent_60%),radial-gradient(20rem_20rem_at_80%_30%,rgba(139,92,246,.18),transparent_60%)]" />
      </div>
    </motion.div>
  );
}

export default function ProcessFlow() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  }, []);

  return (
    <section
      ref={wrapperRef}
      onMouseMove={onMove}
      className="relative py-20 md:py-24 overflow-hidden"
    >
      {/* Background like Core Services */}
      <div className="hero-gradient" />
      <div
        className="services-spotlight"
        style={
          {
            // @ts-ignore custom CSS vars
            "--mx": `${mouse.x}%`,
            "--my": `${mouse.y}%`,
          } as React.CSSProperties
        }
      />
      {/* Decorative blur orbs */}
      <div className="orb absolute -top-24 -left-32 w-[26rem] h-[26rem] bg-[radial-gradient(circle,rgba(0,208,255,.15),transparent_60%)]" />
      <div className="orb absolute -bottom-24 -right-32 w-[26rem] h-[26rem] bg-[radial-gradient(circle,rgba(139,92,246,.15),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4 z-[1]">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-heading text-3xl md:text-4xl text-neon">
            How We Solve It
          </h2>
          <p className="mt-3 text-gray-300">
            From strategy to execution — engineered for real outcomes.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((s, i) => (
            <TiltCard key={s.id} step={s} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-14 text-center">
          <a href="/contact" className="btn-neon">
            Book Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
