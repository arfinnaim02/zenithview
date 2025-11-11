"use client";

import HeroBackground from "./HeroBackground";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import UpscalingViz from "./UpscalingViz";
import NeuralWeb from "./NeuralWeb";

/**
 * Hero — full-screen dynamic background with interactive parallax, upscaling flow,
 * and neural web sparkles filling the whole backdrop.
 */
export default function Hero() {
  const words = ["AI", "Automation", "Dashboards", "Watchdog"];
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax glow
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 15 });
  const springY = useSpring(y, { stiffness: 50, damping: 15 });

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * 26);
    y.set(relY * 26);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      id="hero"
    >
      {/* === Animated Layers that fill entire background === */}
      <HeroBackground eventSource={containerRef} />

      {/* Subtle moving neon glow */}
      <motion.div
        aria-hidden
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div
          className="h-full w-full animate-pulseSlow opacity-70"
          style={{
            background:
              "radial-gradient(40vmax 40vmax at 15% 20%, rgba(0,208,255,.25), transparent 60%)," +
              "radial-gradient(35vmax 35vmax at 85% 30%, rgba(57,240,255,.25), transparent 60%)," +
              "radial-gradient(40vmax 40vmax at 50% 85%, rgba(139,92,246,.20), transparent 60%)",
            filter: "saturate(1.08)",
          }}
        />
      </motion.div>

      {/* Upscaling chart floating toward bottom-left */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[10%] md:bottom-[8%] md:left-[8%] z-[2] scale-[1.2]"
      >
        <UpscalingViz />
      </motion.div>

      {/* Neural network visual filling the top-right */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 z-[2] w-full h-full pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-[50%] h-[50%] md:w-[60%] md:h-[60%]">
          <NeuralWeb className="w-full h-full" />
        </div>
      </motion.div>

      {/* === Hero Content (LEFT-ALIGNED) === */}
      <div className="relative z-[3] w-full px-6">
        <div className="max-w-5xl mx-auto">
          {/* Headline (both lines same size) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-left"
          >
            <span className="text-white">We&apos;re </span>
            <span className="text-neon">ZenithView</span>
            <span className="text-white"> —</span>
            <br className="hidden md:block" />
            <span className="text-white">Powering business decisions with </span>
            <span className="text-gradient-neon">data</span>
            <span className="text-white"> and </span>
            <span className="text-gradient-neon">intelligence</span>
            <span className="text-white">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="mt-6 text-gray-300 text-base md:text-lg max-w-3xl text-left"
          >
            From strategy to execution, we engineer technology that accelerates your business goals.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-10 flex items-center gap-4 justify-start"
          >
            <Link href="/contact" className="btn-neon">
              Book Consultation
            </Link>
            <Link
              href="/solutions/dashboard"
              className="btn-neon bg-transparent border border-neon text-neon hover:bg-neon/10"
            >
              Live Demo
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
