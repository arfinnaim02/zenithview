"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function UpscalingViz() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 15 });
  const springY = useSpring(y, { stiffness: 50, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * 10);
    y.set(relY * 10);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      style={{ x: springX, y: springY }}
      className="relative pointer-events-none w-[360px] h-[240px] md:w-[440px] md:h-[280px] opacity-80"
    >
      <svg
        viewBox="0 0 400 260"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Gradient */}
        <defs>
          <linearGradient id="grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d0ff" />
            <stop offset="50%" stopColor="#39f0ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Axis lines */}
        <motion.line
          x1="40"
          y1="220"
          x2="40"
          y2="20"
          stroke="url(#grad)"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <motion.line
          x1="40"
          y1="220"
          x2="380"
          y2="220"
          stroke="url(#grad)"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* Animated curve */}
        <motion.path
          d="M40 220 C100 200, 180 160, 260 80 S370 20, 380 40"
          stroke="url(#grad)"
          strokeWidth="3"
          animate={{
            pathLength: [0, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />

        {/* Arrow tip following the curve */}
        <motion.polygon
          points="0,0 10,5 0,10"
          fill="#00d0ff"
          animate={{
            x: [40, 380],
            y: [220, 40],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />

        {/* Floating neuron-like dots */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={60 + i * 50}
            cy={220 - i * 30}
            r="3"
            fill={i % 2 ? "#8b5cf6" : "#00d0ff"}
            animate={{
              r: [3, 5, 3],
              opacity: [0.5, 1, 0.5],
              cy: [220 - i * 30, 215 - i * 30, 220 - i * 30],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Neuron network overlay */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-electric/50 blur-md"
            style={{
              width: 10 + i * 4,
              height: 10 + i * 4,
              top: `${60 + i * 40}px`,
              left: `${100 + i * 60}px`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
