"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type AccordionItem = {
  question: string;
  answer: string;
};

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = active === idx;
        return (
          <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => setActive(isOpen ? null : idx)}
              className="w-full flex justify-between items-center px-4 py-3 bg-base hover:bg-base/70"
            >
              <span className="text-left text-sm md:text-base font-medium text-neon">{item.question}</span>
              <span className="text-neon">{isOpen ? '-' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-3 text-sm text-gray-400"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}