"use client";

import { jobs } from '@/lib/jobs';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Careers listing page. Displays available job postings and links to detail pages
 * where candidates can apply. Each accordion item expands to show a short
 * description and requirements with a call to action.
 */
export default function CareersPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-8 text-center">Careers</h1>
      <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
        Join our talented team and help build the future of intelligent business
        solutions.
      </p>
      <div className="space-y-6">
        {jobs.map((job, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={job.slug}
              className="border border-white/10 rounded-2xl overflow-hidden bg-base/80"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 flex justify-between items-center hover:bg-base/70"
              >
                <div>
                  <h3 className="font-heading text-lg text-neon">{job.title}</h3>
                  <p className="text-sm text-gray-400">
                    {job.location} · {job.type}
                  </p>
                </div>
                <span className="text-neon text-2xl">{isOpen ? '-' : '+'}</span>
              </button>
              {isOpen && (
                <div className="p-4 space-y-4">
                  <p className="text-gray-300">{job.description}</p>
                  <div>
                    <h4 className="font-heading text-neon mb-2 text-sm">
                      Requirements
                    </h4>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="btn-neon w-full text-center inline-block"
                  >
                    Apply Now
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}