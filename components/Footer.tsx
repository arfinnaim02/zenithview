"use client";

import Link from "next/link";
// Pull from the single source of truth so slugs always match pages
import { services } from "@/lib/services";

// Minimal inline SVG icons (no extra deps)
function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M18.9 3H22l-7 8.1L23.5 21H17l-5.3-6.3L5.6 21H2l7.6-8.8L.8 3H7l4.7 5.6L18.9 3z"
      />
    </svg>
  );
}
function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.55c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.64H9.36V9.5h3.41v1.49h.05c.47-.89 1.61-1.84 3.32-1.84 3.55 0 4.21 2.34 4.21 5.38v5.92zM5.34 8.01a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9.5h3.55v10.95z"
      />
    </svg>
  );
}
function IconGitHub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.19-3.37-1.19-.46-1.17-1.12-1.49-1.12-1.49-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.35-2.22-.25-4.56-1.11-4.56-4.96 0-1.1.39-2 .1-2.72 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 7.07a9.6 9.6 0 0 1 2.75.38c1.9-1.3 2.74-1.03 2.74-1.03.28.72.1 1.62.05 2.72 0 3.86-2.34 4.71-4.57 4.96.36.31.67.91.67 1.84v2.73c0 .27.18.58.7.48A10 10 0 0 0 12 2z"
      />
    </svg>
  );
}
function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm5.75-2.5a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.75 7z"
      />
    </svg>
  );
}
function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M13.5 9H16l-.4 3h-2.1V22h-3.2v-10H8V9h2.3V7.3C10.3 5.1 11.5 4 13.9 4c1 0 1.8.07 1.8.07l-.1 2.8s-.78-.01-1.63-.01C13 6.86 13.5 7.7 13.5 9z"
      />
    </svg>
  );
}

export default function Footer() {
  // Build service links from the same list that powers your pages
  const serviceLinks = services.map((s) => ({
    title: s.title,
    href: `/services/${s.slug}`,
  }));

  return (
    <footer className="mt-24 border-t border-white/10 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="font-heading text-2xl mb-4 text-neon">Book a Free Strategy Call</h3>
        <p className="text-gray-400 mb-6">
          Let’s discuss how ZenithView can elevate your business through intelligent solutions.
        </p>
        <Link href="/contact" className="btn-neon inline-block">
          Schedule Now
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-500 px-4 max-w-6xl mx-auto">
        {/* Company */}
        <div>
          <h4 className="font-heading text-neon mb-2">Company</h4>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-neon">About</Link></li>
            <li><Link href="/careers" className="hover:text-neon">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-neon">Contact</Link></li>
          </ul>
        </div>

        {/* Services (always in sync with pages) */}
        <div>
          <h4 className="font-heading text-neon mb-2">Services</h4>
          <ul className="space-y-1">
            {serviceLinks.slice(0, 6).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-neon">{l.title}</Link>
              </li>
            ))}
            {/* “See all” if there are more than we show */}
            {serviceLinks.length > 6 && (
              <li>
                <Link href="/services" className="hover:text-neon">All services →</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-heading text-neon mb-2">Resources</h4>
          <ul className="space-y-1">
            <li><Link href="/blog" className="hover:text-neon">Blog</Link></li>
            <li><Link href="/portfolio" className="hover:text-neon">Portfolio</Link></li>
            <li><Link href="/pricing" className="hover:text-neon">Pricing</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-heading text-neon mb-2">Follow</h4>
          <div className="flex items-center gap-3">
            <a href="#" target="_blank" rel="noreferrer" aria-label="X / Twitter"
               className="p-2 rounded-lg border border-white/10 hover:text-neon hover:border-neon">
              <IconX className="h-4 w-4" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn"
               className="p-2 rounded-lg border border-white/10 hover:text-neon hover:border-neon">
              <IconLinkedIn className="h-4 w-4" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="GitHub"
               className="p-2 rounded-lg border border-white/10 hover:text-neon hover:border-neon">
              <IconGitHub className="h-4 w-4" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram"
               className="p-2 rounded-lg border border-white/10 hover:text-neon hover:border-neon">
              <IconInstagram className="h-4 w-4" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Facebook"
               className="p-2 rounded-lg border border-white/10 hover:text-neon hover:border-neon">
              <IconFacebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <p className="mt-12 text-xs text-gray-600 text-center">
        © {new Date().getFullYear()} ZenithView. All rights reserved.
      </p>
    </footer>
  );
}
