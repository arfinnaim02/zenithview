// app/admin/contact/page.tsx
"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  status: string | null;
  source?: string | null;
  budget?: string | null;
  created_at: string;
};

const STATUS_OPTIONS = ["new", "contacted", "ongoing", "rejected"];

export default function ContactAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchLeads() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (!res.ok) throw new Error("Failed to load leads");
      const json = await res.json();
      const data: Lead[] = json.data ?? [];
      setLeads(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/leads/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
      );
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-8 gap-4">
        <h1 className="font-heading text-3xl md:text-4xl text-neon">
          Contact Leads
        </h1>
        <button
          onClick={fetchLeads}
          disabled={loading}
          className="px-4 py-2 rounded-lg border border-white/20 text-sm hover:bg-base/70"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : leads.length === 0 ? (
        <p className="text-gray-400">
          No leads yet. Submit a test message from the Contact page and click
          “Refresh”.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Company</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Message</th>
                <th className="p-2">Status</th>
                <th className="p-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-white/5 hover:bg-base/70 align-top"
                >
                  <td className="p-2 font-medium text-neon">{lead.name}</td>
                  <td className="p-2 text-electric">{lead.email}</td>
                  <td className="p-2">{lead.company || "-"}</td>
                  <td className="p-2">{lead.phone || "-"}</td>
                  <td className="p-2 max-w-xs whitespace-pre-wrap">
                    {lead.message || "-"}
                  </td>
                  <td className="p-2">
                    <select
                      value={lead.status || "new"}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
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
                    {new Date(lead.created_at).toLocaleString()}
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
