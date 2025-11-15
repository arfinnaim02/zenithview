// components/JobApplicationForm.tsx
"use client";

import { useState } from "react";

export default function JobApplicationForm({ jobSlug }: { jobSlug: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Include job slug so the API knows which role this is for
    formData.append("job_slug", jobSlug);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-green-400">
        Thank you for applying! We’ll be in touch soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      encType="multipart/form-data"
    >
      <div className="flex flex-col">
        <label className="text-sm mb-1" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1" htmlFor="resume">
          Resume (PDF/DOC)
        </label>
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
        <label className="text-sm mb-1" htmlFor="cover_letter">
          Cover Letter
        </label>
        <textarea
          id="cover_letter"
          name="cover_letter"
          rows={4}
          required
          className="px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" className="btn-neon" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
