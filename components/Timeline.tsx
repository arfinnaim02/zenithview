"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Step = {
  number: number;
  title: string;
  description: string;
};

type TimelineProps = {
  steps: Step[];
};

export default function Timeline({ steps }: TimelineProps) {
  return (
    <div className="relative ml-2 border-l border-neon/40 space-y-12">
      {steps.map((step, idx) => (
        <TimelineItem key={idx} step={step} />
      ))}
    </div>
  );
}

function TimelineItem({ step }: { step: Step }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: step.number * 0.1 }}
      className="pl-8 relative"
    >
      <span className="absolute left-[-15px] top-0 flex items-center justify-center w-8 h-8 bg-neon text-base rounded-full font-bold text-base-900">
        {step.number}
      </span>
      <h5 className="font-heading text-lg text-neon mb-1">{step.title}</h5>
      <p className="text-gray-400 text-sm max-w-md">{step.description}</p>
    </motion.div>
  );
}