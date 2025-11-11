// app/page.tsx
import Hero from "@/components/Hero";
import CaseSlider from "@/components/CaseSlider";
import InteractiveServices from "@/components/InteractiveServices";
import TrustedBrandsMarquee from "@/components/TrustedBrandsMarquee";

// 🔥 New glossy card-based workflow
import ProcessFlow from "@/components/ProcessFlow";
import { caseStudies as allCaseStudies } from '@/lib/caseStudies';

// ✅ Single source of truth for services
import { services as catalog } from "@/lib/services";

export default function HomePage() {
  // Map lib/services into cards for InteractiveServices
  const serviceCards = catalog.map((s) => ({
    title: s.title,
    description: s.tagline, // short blurb
    slug: s.slug, // used in /services/[slug]
    tags: (s as any).tags ?? (s as any).categories ?? [],
  }));
  // Pull the case studies from the central lib. Select a handful to
  // highlight on the homepage. Feel free to adjust the number of items.
  const featured = allCaseStudies.slice(0, 5);
  // Logos that exist in /public/logos/
  const brandLogos = ["/logos/logo1.png", "/logos/logo2.png", "/logos/logo3.png", "/logos/logo4.png"];
  return (
    <>
      {/* Hero */}
      <Hero />
      {/* One-line continuously moving brand marquee */}
      <TrustedBrandsMarquee logos={brandLogos} />
      {/* Services (now driven from lib/services, so Home + /services use SAME slugs) */}
      <InteractiveServices items={serviceCards} />
      {/* 🔥 New “How We Solve It” glossy card section */}
      <ProcessFlow />
      {/* Featured Case Studies */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl text-neon mb-8 text-center">
            Featured Case Studies
          </h2>
          <CaseSlider items={featured} />
        </div>
      </section>
    </>
  );
}
