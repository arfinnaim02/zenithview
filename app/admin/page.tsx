"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Admin dashboard landing page. Displays quick links to manage contact leads,
 * job applications and blog posts. Fetches counts for each entity to give
 * admins an overview of outstanding items. Additional modules can be added
 * here as the product grows.
 */
export default function AdminDashboard() {
  const [leadCount, setLeadCount] = useState<number | null>(null);
  const [appCount, setAppCount] = useState<number | null>(null);
  const [postCount, setPostCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [leadsRes, appsRes] = await Promise.all([
          fetch('/api/admin/leads'),
          fetch('/api/admin/applications'),
        ]);
        if (leadsRes.ok) {
          const json = await leadsRes.json();
          setLeadCount(json.data?.length ?? 0);
        }
        if (appsRes.ok) {
          const json = await appsRes.json();
          setAppCount(json.data?.length ?? 0);
        }
        // Blog posts are loaded from static lib; require dynamic import
        const postsModule = await import('@/lib/blog');
        setPostCount(postsModule.posts.length);
      } catch {
        // Silent fail; counts remain null
      }
    }
    fetchCounts();
  }, []);

  const cards = [
    {
      title: 'Contact Leads',
      href: '/admin/contact',
      count: leadCount,
      description: 'View and update status of contact form submissions.',
    },
    {
      title: 'Job Applications',
      href: '/admin/applications',
      count: appCount,
      description: 'Review applications and update hiring statuses.',
    },
    {
      title: 'Blog Posts',
      href: '/admin/blog',
      count: postCount,
      description: 'Manage content for the blog page.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-12 text-center">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="p-6 bg-base/80 border border-white/10 rounded-2xl hover:bg-base/70 transition-colors flex flex-col"
          >
            <h3 className="font-heading text-xl text-neon mb-2">{card.title}</h3>
            {card.count !== null && (
              <p className="text-3xl font-semibold text-white mb-2">{card.count}</p>
            )}
            <p className="text-sm text-gray-400 flex-1">{card.description}</p>
            <span className="mt-4 text-electric text-sm">Manage →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}