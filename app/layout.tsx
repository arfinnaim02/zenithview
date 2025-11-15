// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "ZenithView | Futuristic AI Solutions",
    template: "%s | ZenithView",
  },
  description: "Elevating your business to the zenith of digital intelligence.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-base text-white antialiased">
        {/* Full-site animated background (non-blocking, purely decorative) */}
        <GlobalBackground />

        {/* Sticky glass navbar on top of the background */}
        <Navbar />

        {/* Page content */}
        <main id="content" className="relative pt-16">
          {children}
        </main>

        <Footer />

        {/* Calendly popup widget script – needed for the Schedule Now popup */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
