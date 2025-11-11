import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";

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

        {/* Page content; keep your spacing the same */}
        <main id="content" className="relative pt-16">
          {/* Optional container similar to the screenshot (keeps your design) */}
          {/* <div className="max-w-7xl mx-auto px-4 lg:px-6"> */}
          {children}
          {/* </div> */}
        </main>

        <Footer />
      </body>
    </html>
  );
}
