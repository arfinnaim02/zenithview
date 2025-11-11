"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

type MetricsStripProps = {
  stats: Stat[];
  logos: string[];
};

export default function MetricsStrip({ stats, logos }: MetricsStripProps) {
  return (
    <section className="py-16 bg-base/80">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logos ticker */}
        <div className="overflow-hidden mb-10">
          <div className="flex space-x-8 animate-scrollX">
            {logos.concat(logos).map((logo, idx) => (
              <img key={idx} src={logo} alt="client logo" className="h-8 w-auto opacity-70" />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, idx) => (
            <Counter key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ label, value, suffix = "+" }: Stat) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  // numeric motion value to animate
  const mv = useMotionValue(0);

  // local string we actually render
  const [display, setDisplay] = useState("0");

  // subscribe to changes and format
  useMotionValueEvent(mv, "change", (latest) => {
    setDisplay(Math.floor(latest).toLocaleString());
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.span className="font-heading text-4xl text-neon">
        {display} {suffix}
      </motion.span>
      <span className="text-gray-400 mt-2 text-sm">{label}</span>
    </div>
  );
}
