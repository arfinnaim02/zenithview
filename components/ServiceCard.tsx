"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export type ServiceCardProps = {
  title: string;
  description: string;
  slug: string;
};

export default function ServiceCard({ title, description, slug }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;
    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 20px rgba(0, 208, 255, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 10 }}
      className="p-6 bg-base border border-white/10 rounded-2xl transition-colors duration-200 hover:bg-base/80 cursor-pointer"
    >
      <h3 className="font-heading text-xl mb-2 text-neon">{title}</h3>
      <p className="text-gray-400 mb-4 text-sm">{description}</p>
      <Link
        href={`/services/${slug}`}
        className="text-electric underline hover:text-neon text-sm"
      >
        Learn more →
      </Link>
    </motion.div>
  );
}
