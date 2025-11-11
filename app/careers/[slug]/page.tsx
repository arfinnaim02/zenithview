"use client";

import { jobs } from '@/lib/jobs';
import { notFound } from 'next/navigation';
import { useState } from 'react';

type Props = { params: { slug: string } };

/**
 * Detailed job page. Allows the candidate to read more about the role and submit
 * an application. On successful submission a confirmation message is shown.
 */
export async function generateStaticParams() {
  // Pre-generate all job detail pages based on slugs for static site builds
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
  if (!job) {
    notFound();
  }
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    // Append slug so the API knows which job this application is for
    formData.append('job_slug', job!.slug);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong');
      }
      setSubmitted(true);
      form.reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-4">
        {job!.title}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {job!.location} · {job!.type}
      </p>
      <p className="text-gray-300 mb-8">{job!.details || job!.description}</p>
      <div>
        <h2 className="font-heading text-2xl text-neon mb-2">Apply for this role</h2>
        {submitted ? (
          <p className="text-green-400">Thank you for applying! We’ll be in touch soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="flex flex-col">
              <label className="text-sm mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1" htmlFor="resume">Resume (PDF/DOC)</label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-neon file:text-base-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1" htmlFor="cover_letter">Cover Letter</label>
              <textarea
                id="cover_letter"
                name="cover_letter"
                rows={4}
                required
                className="px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="btn-neon"
              disabled={submitting}
            >
              {submitting ? 'Submitting…' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}