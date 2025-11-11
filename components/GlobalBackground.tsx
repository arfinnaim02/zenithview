"use client";

import { useEffect, useRef } from "react";

/** Tiny canvas network used site-wide (very light) */
function MeshCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const fit = () => {
      const w = canvas.offsetWidth || 1;
      const h = canvas.offsetHeight || 1;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    // Fewer nodes/site-wide so it stays subtle
    const N = 36;
    const nodes = Array.from({ length: N }).map(() => ({
      baseX: Math.random() * (canvas.offsetWidth || 800),
      baseY: Math.random() * (canvas.offsetHeight || 600),
      x: 0,
      y: 0,
      r: 2 + Math.random() * 2,
      hue: Math.random() < 0.6 ? 190 : 270,
      t: Math.random() * Math.PI * 2,
      speed: prefersReduced ? 0 : 0.004 + Math.random() * 0.006,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // gentle drift
      nodes.forEach((n) => {
        n.t += n.speed;
        const wobble = 16;
        n.x = n.baseX + Math.cos(n.t) * wobble;
        n.y = n.baseY + Math.sin(n.t * 1.15) * wobble;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${n.hue} 100% 60% / 0.85)`;
        ctx.shadowColor = `hsla(${n.hue} 100% 60% / 0.8)`;
        ctx.shadowBlur = 10;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const max = 120; // short links like the screenshot
          if (dist < max) {
            const alpha = (1 - dist / max) * 0.6;
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2} 100% 60% / ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    const onResize = () => fit();
    window.addEventListener("resize", onResize);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

/** Fixed, site-wide background (glow + mesh) */
export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* soft neon gradient + film grain (re-uses your globals.css palette) */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-grain" />
      {/* neural mesh over the gradient */}
      <MeshCanvas />
      {/* vignette for edge contrast like the screenshot */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
    </div>
  );
}
