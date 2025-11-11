"use client";

import { useEffect, useState } from 'react';

type Lead = {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  status?: string;
  created_at: string;
};

const STATUS_OPTIONS = ['new', 'contacted', 'ongoing', 'rejected'];

export default function ContactAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/leads');
        if (!res.ok) throw new Error('Failed to load leads');
        const json = await res.json();
        setLeads(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-8">Contact Leads</h1>
      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : leads.length === 0 ? (
        <p className="text-gray-400">No leads yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Company</th>
                <th className="p-2">Message</th>
                <th className="p-2">Status</th>
                <th className="p-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-base/70">
                  <td className="p-2 font-medium text-neon">{lead.name}</td>
                  <td className="p-2 text-electric">{lead.email}</td>
                  <td className="p-2">{lead.company || '-'}</td>
                  <td className="p-2 max-w-xs whitespace-pre-wrap">{lead.message || '-'}</td>
                  <td className="p-2">
                    <select
                      value={lead.status || 'new'}
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