"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // Particle setup
    const COUNT = prefersReduced ? 0 : isMobile ? 18 : 32;
    const particles = Array.from({ length: COUNT }).map(() => ({
      x: Math.random() * (w / devicePixelRatio),
      y: Math.random() * (h / devicePixelRatio),
      vx: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.45),
      vy: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.45),
      r: Math.random() * 2 + 0.6,
      c: Math.random() < 0.5 ? "rgba(0,208,255,0.85)" : "rgba(139,92,246,0.85)",
    }));

    const mouse = { x: w / (2 * devicePixelRatio), y: h / (2 * devicePixelRatio) };
    const pointer = { x: mouse.x, y: mouse.y };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left);
      mouse.y = (e.clientY - rect.top);
    };

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    canvas.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    const loop = () => {
      // ease pointer for subtle parallax
      pointer.x += (mouse.x - pointer.x) * 0.04;
      pointer.y += (mouse.y - pointer.y) * 0.04;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // glow blend
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // bounce edges
        if (p.x < 0 || p.x > w / devicePixelRatio) p.vx *= -1;
        if (p.y < 0 || p.y > h / devicePixelRatio) p.vy *= -1;

        // gentle attraction to pointer
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001;
        const force = Math.min(40 / dist, 0.3); // clamp
        p.vx -= (dx / dist) * force * 0.02;
        p.vy -= (dy / dist) * force * 0.02;

        // draw glow dot
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 12;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // reset composite & shadow for next frame
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 2 }}
    />
  );
}
