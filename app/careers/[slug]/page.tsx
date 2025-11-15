// app/careers/[slug]/page.tsx
import { notFound } from "next/navigation";
import { jobs } from "@/lib/jobs";
import JobApplicationForm from "@/components/JobApplicationForm";

type Props = { params: { slug: string } };

export const dynamicParams = false;

// Pre-generate all job detail pages
export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export function generateMetadata({ params }: Props) {
  const job = jobs.find((j) => j.slug === params.slug);
  if (!job) return {};
  return {
    title: `${job.title} | Careers`,
    description: job.description,
  };
}

export default function JobDetailPage({ params }: Props) {
  const job = jobs.find((j) => j.slug === params.slug);
  if (!job) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-4">
        {job.title}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {job.location} · {job.type}
      </p>
      <p className="text-gray-300 mb-8">{job.details || job.description}</p>

      <div>
        <h2 className="font-heading text-2xl text-neon mb-2">
          Apply for this role
        </h2>
        <JobApplicationForm jobSlug={job.slug} />
      </div>
    </div>
  );
}
