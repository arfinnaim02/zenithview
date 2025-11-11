import { caseStudies } from '@/lib/caseStudies';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Params = { slug: string };

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: { params: Params }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title} | Case Study`,
    description: cs.problem,
  };
}

export default function CaseStudyDetail({ params }: { params: Params }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-6">{cs!.title}</h1>
      <p className="text-gray-400 text-sm mb-8">Industry: {cs!.industry} · Services: {cs!.services.join(', ')}</p>
      <div className="h-64 relative mb-8 rounded-2xl overflow-hidden border border-white/10">
        <Image src={cs!.image} alt={cs!.title} fill className="object-cover" />
      </div>
      <section className="space-y-8">
        <div>
          <h2 className="font-heading text-2xl text-neon mb-2">Problem</h2>
          <p className="text-gray-400 leading-relaxed">{cs!.problem}</p>
        </div>
        <div>
          <h2 className="font-heading text-2xl text-neon mb-2">Approach</h2>
          <p className="text-gray-400 leading-relaxed">{cs!.approach}</p>
        </div>
        <div>
          <h2 className="font-heading text-2xl text-neon mb-2">Results</h2>
          <p className="text-gray-400 leading-relaxed">{cs!.results}</p>
        </div>
      </section>
      <div className="mt-12 text-center">
        <a href="/contact" className="btn-neon inline-block">Discuss Your Project</a>
      </div>
    </div>
  );
}