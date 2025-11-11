"use client";

import { useState } from 'react';
import { caseStudies } from '@/lib/caseStudies';
import Link from 'next/link';
import Image from 'next/image';

const industries = ['All', ...Array.from(new Set(caseStudies.map((cs) => cs.industry)))];
const serviceCategories = ['All', ...Array.from(new Set(caseStudies.flatMap((cs) => cs.services)))];

export default function PortfolioPage() {
  const [industry, setIndustry] = useState('All');
  const [service, setService] = useState('All');
  const filtered = caseStudies.filter((cs) => {
    const matchIndustry = industry === 'All' || cs.industry === industry;
    const matchService = service === 'All' || cs.services.includes(service);
    return matchIndustry && matchService;
  });
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-12 text-center">Case Studies</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {/* Industry Filter */}
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="bg-base/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200"
        >
          {industries.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        {/* Service Filter */}
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="bg-base/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200"
        >
          {serviceCategories.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((cs) => (
          <Link key={cs.slug} href={`/portfolio/${cs.slug}`} className="block overflow-hidden rounded-2xl border border-white/10 bg-base/80 hover:bg-base/60 transition-colors">
            <div className="h-48 relative">
              <Image src={cs.image} alt={cs.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-heading text-lg text-neon mb-2">{cs.title}</h3>
              <p className="text-gray-400 text-sm mb-1">{cs.industry}</p>
              <p className="text-gray-400 text-sm">{cs.services.join(', ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}