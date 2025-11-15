"use client";

import { useEffect, useState } from "react";
import { jobs } from "@/lib/jobs";

type Application = {
  id: string;
  name: string;
  email: string;
  cover_letter?: string;
  resume_url?: string;
  job_slug: string;
  status: string | null;
  created_at: string;
};

const STATUS_OPTIONS = ["new", "contacted", "interview", "hired", "rejected"];

function getJobTitle(slug: string) {
  const job = jobs.find((j) => j.slug === slug);
  return job ? job.title : slug;
}

export default function ApplicationsAdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/applications");
      if (!res.ok) throw new Error("Failed to fetch applications");
      const json = await res.json();
      const data: Application[] = json.data ?? [];
      setApplications(
        data.map((app) => ({
          ...app,
          status: app.status || "new",
        }))
      );
      setSelectedIds([]);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/applications/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update status");
      }
      const json = await res.json();
      const updated: Application = json.data;

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...updated } : app))
      );
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    if (selectedIds.length === applications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(applications.map((a) => a.id));
    }
  }

  async function handleDeleteSelected() {
    if (selectedIds.length === 0) return;
    if (
      !window.confirm(
        `Delete ${selectedIds.length} application${
          selectedIds.length > 1 ? "s" : ""
        }? This cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch("/api/admin/applications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete applications");
      }

      setApplications((prev) =>
        prev.filter((app) => !selectedIds.includes(app.id))
      );
      setSelectedIds([]);
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    }
  }

  const allSelected =
    applications.length > 0 && selectedIds.length === applications.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="font-heading text-3xl md:text-4xl text-neon">
          Job Applications
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 rounded-md border border-red-500/60 text-red-400 text-sm disabled:opacity-40"
          >
            Delete selected
          </button>
          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-md border border-white/20 text-sm hover:bg-white/5"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-400">
          No applications received yet. Submit a test application from the
          Careers page and click “Refresh”.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left">
                <th className="p-2">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
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
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(app.id)}
                      onChange={() => toggleSelect(app.id)}
                    />
                  </td>
                  <td className="p-2 font-medium text-neon">{app.name}</td>
                  <td className="p-2 text-electric">{app.email}</td>
                  <td className="p-2">
                    <div className="font-medium">
                      {getJobTitle(app.job_slug)}
                    </div>
                    <div className="text-xs text-gray-500">
                      slug: {app.job_slug}
                    </div>
                    {app.cover_letter && (
                      <div className="mt-1 text-xs text-gray-400 line-clamp-2">
                        “{app.cover_letter}”
                      </div>
                    )}
                  </td>
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
                      "-"
                    )}
                  </td>
                  <td className="p-2">
                    <select
                      value={app.status || "new"}
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
