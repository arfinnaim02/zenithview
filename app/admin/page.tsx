"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Admin dashboard landing page. Displays quick links to manage contact leads,
 * job applications and blog posts with simple counts, plus a Calendly shortcut.
 */
type Card = {
  title: string;
  href: string;
  description: string;
  count?: number | null;
  external?: boolean;
};

export default function AdminDashboard() {
  const [leadCount, setLeadCount] = useState<number | null>(null);
  const [appCount, setAppCount] = useState<number | null>(null);
  const [postCount, setPostCount] = useState<number | null>(null);

useEffect(() => {
  async function fetchCounts() {
    try {
      // Fetch contact leads and applications from your API
      const [leadsRes, appsRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/applications"),
      ]);

      if (leadsRes.ok) {
        const json = await leadsRes.json();
        setLeadCount(json.data?.length ?? 0);
      }

      if (appsRes.ok) {
        const json = await appsRes.json();
        setAppCount(json.data?.length ?? 0);
      }

      // Blog posts from static lib/blog.ts
      const postsModule = await import("@/lib/blog");
      const posts = postsModule.posts ?? []; // ✅ Option 1 fix
      setPostCount(posts.length);

    } catch (error) {
      console.error("Failed to fetch admin counts:", error);
      // Counts stay null on error
    }
  }

  fetchCounts();
}, []);


  const cards: Card[] = [
    {
      title: "Contact Leads",
      href: "/admin/contact",
      count: leadCount,
      description: "View and update status of contact form submissions.",
    },
    {
      title: "Job Applications",
      href: "/admin/applications",
      count: appCount,
      description: "Review applications and update hiring statuses.",
    },
    {
      title: "Blog Posts",
      href: "/admin/blog",
      count: postCount,
      description: "Manage content for the blog page.",
    },
    {
      title: "Consultation Calls",
      href: "https://calendly.com/app/scheduled_events/user/me",
      count: null, // no count, just a shortcut
      description: "Open your Calendly scheduled events dashboard.",
      external: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-12 text-center">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card) => {
          const content = (
            <>
              <h3 className="font-heading text-xl text-neon mb-2">
                {card.title}
              </h3>
              {card.count !== null && card.count !== undefined && (
                <p className="text-3xl font-semibold text-white mb-2">
                  {card.count}
                </p>
              )}
              <p className="text-sm text-gray-400 flex-1">
                {card.description}
              </p>
              <span className="mt-4 text-electric text-sm">Manage →</span>
            </>
          );

          // External link (Calendly)
          if (card.external) {
            return (
              <a
                key={card.href}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-base/80 border border-white/10 rounded-2xl hover:bg-base/70 transition-colors flex flex-col"
              >
                {content}
              </a>
            );
          }

          // Internal Next.js route
          return (
            <Link
              key={card.href}
              href={card.href}
              className="p-6 bg-base/80 border border-white/10 rounded-2xl hover:bg-base/70 transition-colors flex flex-col"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
