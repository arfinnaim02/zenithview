"use client";

import { useState } from "react";
import Link from "next/link";

const packages = [
  {
    name: "Starter",
    monthly: 500,
    onetime: 1500,
    features: ["Essential dashboards", "Up to 2 integrations", "Email support"],
  },
  {
    name: "Growth",
    monthly: 1500,
    onetime: 4500,
    features: ["Advanced analytics", "Up to 5 integrations", "Priority support"],
  },
  {
    name: "Enterprise",
    monthly: 0,
    onetime: 0,
    features: ["Unlimited everything", "Dedicated account manager", "Custom solutions"],
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "onetime">("monthly");

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-6">Pricing</h1>
      <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
        Choose the plan that fits your needs. Switch between monthly subscription or one-time project pricing.
      </p>

      <div className="flex items-center justify-center mb-12">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-4 py-2 rounded-l-lg border border-white/10 ${
            billing === "monthly" ? "bg-neon text-black" : "bg-base/80 text-gray-300"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling("onetime")}
          className={`px-4 py-2 rounded-r-lg border border-white/10 ${
            billing === "onetime" ? "bg-neon text-black" : "bg-base/80 text-gray-300"
          }`}
        >
          One-Time
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, idx) => {
          const price = billing === "monthly" ? pkg.monthly : pkg.onetime;
          return (
            <div key={idx} className="p-6 border border-white/10 rounded-2xl bg-base/80 flex flex-col items-center">
              <h3 className="font-heading text-xl text-neon mb-2">{pkg.name}</h3>
              <p className="text-4xl text-electric font-bold mb-4">
                {price ? `$${price}` : "Custom"}
                {billing === "monthly" && price ? <span className="text-sm text-gray-400">/mo</span> : null}
              </p>
              <ul className="mb-6 space-y-2 text-sm text-gray-400 text-left">
                {pkg.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <Link href="/contact" className="btn-neon inline-block w-full text-center">
                {price ? "Get Started" : "Contact Us"}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <div className="p-6 border border-neon rounded-2xl inline-block bg-base/90">
          <h3 className="font-heading text-xl text-neon mb-2">Pilot Project</h3>
          <p className="text-gray-400 mb-4 text-sm">
            4-week discovery & proof of concept. Perfect for enterprise teams wanting to validate solutions quickly.
          </p>
          <Link href="/contact" className="btn-neon">
            Start Pilot
          </Link>
        </div>
      </div>
    </div>
  );
}
