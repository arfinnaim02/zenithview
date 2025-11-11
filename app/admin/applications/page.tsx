"use client";

import { useEffect, useState } from 'react';

type Application = {
  id: string;
  name: string;
  email: string;
  cover_letter?: string;
  resume_url?: string;
  job_slug: string;
  status: string;
  created_at: string;
};

const STATUS_OPTIONS = ['new', 'contacted', 'interview', 'hired', 'rejected'];

export default function ApplicationsAdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/applications');
        if (!res.ok) throw new Error('Failed to fetch applications');
        const json = await res.json();
        setApplications(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-8">
        Job Applications
      </h1>
      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-400">No applications received yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Job</th>
                <th className="p-2">Resume</th>
                <th className="p-2">Status</th>
                <th className="p-2">Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-white/5 hover:bg-base/70 align-top"
                >
                  <td className="p-2 font-medium text-neon">{app.name}</td>
                  <td className="p-2 text-electric">{app.email}</td>
                  <td className="p-2">{app.job_slug}</td>
                  <td className="p-2">
                    {app.resume_url ? (
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric underline"
                      >
                        View
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="p-2">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="bg-base border border-white/20 rounded-md px-2 py-1 text-sm"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 text-gray-400">
                    {new Date(app.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}