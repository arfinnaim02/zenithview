"use client";

import { useEffect, useRef } from "react";

type Props = { className?: string };

export default function NeuralWeb({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // TEMP: disable reduced-motion guard while testing visibility
    // const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // if (prefersReduced) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const fit = () => {
      const w = canvas.offsetWidth || 1;
      const h = canvas.offsetHeight || 1;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const N = isMobile ? 7 : 10;

    const nodes = Array.from({ length: N }).map(() => {
      const baseX = Math.random() * (canvas.offsetWidth || 300);
      const baseY = Math.random() * (canvas.offsetHeight || 200);
      return {
        baseX, baseY, x: baseX, y: baseY,
        r: 3 + Math.random() * 3,
        hue: Math.random() < 0.5 ? 190 : 270,
        t: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.01,
      };
    });

    const S = isMobile ? 8 : 12;
    const sparkles = Array.from({ length: S }).map(() => ({
      x: Math.random() * (canvas.offsetWidth || 300),
      y: Math.random() * (canvas.offsetHeight || 200),
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.025,
      size: 1 + Math.random() * 1.5,
      tint: Math.random() < 0.5 ? "rgba(255,255,255," : "rgba(0,208,255,",
    }));

    const mouse = { x: (canvas.offsetWidth || 300) * 0.6, y: (canvas.offsetHeight || 200) * 0.4 };
    const pointer = { ...mouse };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    const onResize = () => fit();
    window.addEventListener("resize", onResize);

    const drawSparkle = (sx: number, sy: number, amt: number, size: number, tint: string) => {
      ctx.beginPath();
      ctx.fillStyle = `${tint}${0.85 * amt})`;
      ctx.shadowColor = `${tint}${0.9 * amt})`;
      ctx.shadowBlur = 10 * amt + 2;
      ctx.arc(sx, sy, size + amt * 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = `${tint}${0.8 * amt})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sx - 3 - amt, sy);
      ctx.lineTo(sx + 3 + amt, sy);
      ctx.moveTo(sx, sy - 3 - amt);
      ctx.lineTo(sx, sy + 3 + amt);
      ctx.stroke();
    };

    const draw = () => {
      pointer.x += (mouse.x - pointer.x) * 0.06;
      pointer.y += (mouse.y - pointer.y) * 0.06;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gx = (pointer.x - (canvas.offsetWidth || 300) / 2) * 0.02;
      const gy = (pointer.y - (canvas.offsetHeight || 200) / 2) * 0.02;

      nodes.forEach((n) => {
        n.t += n.speed;
        const wobble = 10;
        n.x = n.baseX + Math.cos(n.t) * wobble + gx;
        n.y = n.baseY + Math.sin(n.t * 1.2) * wobble + gy;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${n.hue} 100% 60% / 0.95)`;
        ctx.shadowColor = `hsla(${n.hue} 100% 60% / 0.9)`;
        ctx.shadowBlur = 14;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const max = 140;
          if (dist < max) {
            const alpha = 1 - dist / max;
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2} 100% 60% / ${alpha * 0.7})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      sparkles.forEach((s) => {
        s.phase += s.speed;
        const amt = (Math.sin(s.phase) + 1) / 2;
        drawSparkle(s.x + gx * 0.6, s.y + gy * 0.6, amt, s.size, s.tint);
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} aria-hidden />;
}
