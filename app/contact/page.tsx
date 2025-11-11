"use client";

import { useMemo, useState } from "react";
import { services as svcList } from "@/lib/services";

type Form = {
  name: string;
  email: string;
  whatsapp?: string;
  service: string;
  budget: string;
  message: string;
};

const BUDGETS = [
  "Below $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,500",
  "$7,500 – $15,000",
  "$15,000+",
];

export default function ContactPage() {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    whatsapp: "",
    service: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | "success" | "error">(null);
  const [error, setError] = useState<string>("");

  // Build options from your services file + “Custom”
  const serviceOptions = useMemo(() => {
    const base = svcList.map((s) => ({ value: s.slug, label: s.title }));
    return [...base, { value: "custom", label: "Custom (describe below)" }];
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || "Failed to submit. Try again.");
      }

      setOk("success");
      setForm({
        name: "",
        email: "",
        whatsapp: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch (err: any) {
      setOk("error");
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-6 text-center">
        Contact Us
      </h1>
      <p className="text-gray-400 text-center mb-10">
        Tell us a bit about your project. We usually reply within one business day.
      </p>

      {ok === "success" && (
        <div className="mb-6 p-4 border border-green-500 text-green-400 rounded-lg text-center">
          Thanks! Your request has been received.
        </div>
      )}
      {ok === "error" && (
        <div className="mb-6 p-4 border border-red-500 text-red-400 rounded-lg text-center">
          {error}
        </div>
      )}

      <form
        onSubmit={submit}
        className="glass rounded-2xl p-6 md:p-8 grid grid-cols-1 gap-5"
      >
        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={onChange}
              required
              className="w-full p-3 rounded-lg bg-base/80 border border-white/10 text-gray-200"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              WhatsApp Number (Optional)
            </label>
            <input
              name="whatsapp"
              placeholder="e.g., +1 234 567 890"
              value={form.whatsapp}
              onChange={onChange}
              className="w-full p-3 rounded-lg bg-base/80 border border-white/10 text-gray-200"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">
            Your Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={onChange}
            required
            className="w-full p-3 rounded-lg bg-base/80 border border-white/10 text-gray-200"
          />
        </div>

        {/* Row 3 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Service <span className="text-red-400">*</span>
            </label>
            <select
              name="service"
              value={form.service}
              onChange={onChange}
              required
              className="w-full p-3 rounded-lg bg-base/80 border border-white/10 text-gray-200"
            >
              <option value="" disabled>
                Select Service
              </option>
              {serviceOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Project Budget <span className="text-red-400">*</span>
            </label>
            <select
              name="budget"
              value={form.budget}
              onChange={onChange}
              required
              className="w-full p-3 rounded-lg bg-base/80 border border-white/10 text-gray-200"
            >
              <option value="" disabled>
                Select Your Range
              </option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4 */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">
            Project Details <span className="text-red-400">*</span>
          </label>
          <textarea
            name="message"
            placeholder="Tell us about your idea or requirements…"
            rows={6}
            value={form.message}
            onChange={onChange}
            required
            className="w-full p-3 rounded-lg bg-base/80 border border-white/10 text-gray-200"
          />
        </div>

        <div className="pt-2">
          <button type="submit" disabled={loading} className="btn-neon">
            {loading ? "Sending…" : "Contact Us"}
          </button>
        </div>
      </form>
    </div>
  );
}
