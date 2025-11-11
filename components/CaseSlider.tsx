"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export type CaseStudy = {
  title: string;
  slug: string;
  image: string;
};

type CaseSliderProps = {
  items: CaseStudy[];
};

export default function CaseSlider({ items }: CaseSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  return (
    <div className="overflow-hidden" ref={sliderRef}>
      <motion.div
        ref={trackRef}
        className="flex space-x-4 cursor-grab"
        drag="x"
        dragConstraints={sliderRef}
        whileTap={{ cursor: 'grabbing' }}
      >
        {items.map((item) => (
          <motion.div
            key={item.slug}
            className="min-w-[280px] sm:min-w-[320px] bg-base border border-white/10 rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <Link href={`/portfolio/${item.slug}`}>              
              <div className="h-40 relative">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-heading text-lg mb-2 text-neon">{item.title}</h4>
                <p className="text-sm text-gray-400">View case study →</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}