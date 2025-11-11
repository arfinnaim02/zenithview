"use client";

import { services, type Service } from '@/lib/services';
import ServiceCard from '@/components/ServiceCard';
import { useState, useMemo } from 'react';

// Derive the categories from your services catalogue. Each service can belong to
// one of the predefined buckets based on its tags or slug. Feel free to
// reorder this array to change the tab ordering in the UI.
const categories = ['All', 'AI', 'Automation', 'Web', 'Email Solutions', 'Watchdog'] as const;

// Assign a category to a given service by inspecting its tags. This ensures
// services are always sorted into the correct bucket even when new entries are
// added to lib/services.ts. If no known tag is found, the service falls back
// to the "Other" category which is hidden by default.
function getCategory(service: Service): string {
  const tags = service.tags || [];
  const slug = service.slug;
  // Map by tags first
  if (tags.includes('AI')) return 'AI';
  if (tags.includes('Automation')) return 'Automation';
  if (tags.includes('Web') || tags.includes('Frontend') || tags.includes('E-Commerce')) return 'Web';
  if (tags.includes('Email') || tags.includes('IT')) return 'Email Solutions';
  if (tags.includes('Watchdog') || tags.includes('Marketing')) return 'Watchdog';
  // fallback based on slug names
  if (slug.includes('ai')) return 'AI';
  if (slug.includes('automation')) return 'Automation';
  if (slug.includes('web') || slug.includes('ecommerce')) return 'Web';
  if (slug.includes('email')) return 'Email Solutions';
  if (slug.includes('watchdog')) return 'Watchdog';
  return 'Other';
}

export default function ServicesPage() {
  const [active, setActive] = useState('All');
  // Memoize the filtered services when the active category changes. For "All"
  // we return the full list. Otherwise we only include services belonging
  // to the selected category.
  const filtered = useMemo(() => {
    if (active === 'All') return services;
    return services.filter((svc) => getCategory(svc) === active);
  }, [active]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-12 text-center">Our Services</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`relative px-4 py-2 font-medium text-sm transition-colors ${active === cat ? 'text-neon' : 'text-gray-400 hover:text-neon'}`}
          >
            {cat}
            {active === cat && (
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-neon rounded-full"></span>
            )}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((svc) => (
          <ServiceCard key={svc.slug} title={svc.title} description={svc.solution} slug={svc.slug} />
        ))}
      </div>
    </div>
  );
}