"use client";

import { useEffect, useState } from "react";

type CalendlyPopupButtonProps = {
  url?: string;
  text?: string;
  className?: string;
};

export default function CalendlyPopupButton({
  url = "https://calendly.com/arfinnaim02/30min",
  text = "Schedule Now",
  className = "",
}: CalendlyPopupButtonProps) {
  const [open, setOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(url);

  // Build Calendly embed URL on the client so we can safely use window.location
  useEffect(() => {
    try {
      const hostname =
        typeof window !== "undefined" ? window.location.hostname : "localhost";
      const params = new URLSearchParams({
        embed_domain: hostname,
        embed_type: "Inline",
      });
      setEmbedUrl(`${url}?${params.toString()}`);
    } catch {
      // Fallback if anything weird happens
      setEmbedUrl(url);
    }
  }, [url]);

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`btn-neon ${className}`}
      >
        {text}
      </button>

      {/* Popup modal with Calendly iframe */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[80vh] bg-base/95 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white text-2xl leading-none"
              aria-label="Close scheduling popup"
            >
              ×
            </button>

            <iframe
              src={embedUrl}
              title="Schedule a call"
              className="w-full h-full border-0"
              allow="camera; microphone; fullscreen"
            />
          </div>
        </div>
      )}
    </>
  );
}
