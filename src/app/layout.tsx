import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malta Travel Portal | AI-Powered Community Insights",
  description:
    "Discover Malta through real community experiences. AI-analyzed travel tips, restaurants, beaches, and insider knowledge from thousands of tourists. Featuring Robert Makłowicz's Malta journey.",
  openGraph: {
    title: "Malta Travel Portal — Discover Malta Through Real Eyes",
    description:
      "AI-powered Malta travel guide built from real community experiences. Featuring Robert Makłowicz's interactive video journey through Valletta, Gozo, and Mdina.",
    locale: "en_US",
    type: "website",
    siteName: "Malta Travel Portal",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Malta Travel Portal — Valletta harbour view",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malta Travel Portal — Discover Malta Through Real Eyes",
    description:
      "AI-powered Malta travel guide with Robert Makłowicz's interactive video journey.",
    images: ["https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80"],
  },
  metadataBase: new URL("https://malta-portal-production.up.railway.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Transparent nav - overlays hero */}
        <nav className="fixed top-0 z-50 w-full bg-malta-dark/70 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-malta-gold text-malta-dark font-black text-sm">
                MT
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-white">Malta</span>
                <span className="text-lg font-light text-white/70">
                  {" "}
                  Travel Portal
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-8 text-sm font-semibold tracking-wide uppercase">
              <Link
                href="/articles"
                className="text-white/80 transition-colors hover:text-malta-gold"
              >
                Articles
              </Link>
              <Link
                href="/maklowicz"
                className="text-white/80 transition-colors hover:text-malta-gold"
              >
                Maklowicz
              </Link>
              <Link
                href="/maklowicz/map"
                className="text-white/80 transition-colors hover:text-malta-gold"
              >
                Map
              </Link>
              <Link
                href="/admin"
                className="text-white/80 transition-colors hover:text-malta-gold"
              >
                Admin
              </Link>
              <div className="flex items-center rounded-full border border-white/30 overflow-hidden">
                <span className="px-3 py-1 text-xs font-bold bg-malta-gold text-malta-dark">
                  EN
                </span>
                <Link
                  href="/pl"
                  className="px-3 py-1 text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  PL
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-malta-dark text-white">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-malta-gold text-malta-dark font-black text-sm">
                    MT
                  </div>
                  <span className="text-lg font-bold">Malta Travel Portal</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  AI-powered insights from thousands of real tourist experiences.
                  Built from community discussions, analyzed by artificial intelligence,
                  curated for you.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-malta-gold">
                  Explore
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>
                    <Link href="/articles" className="hover:text-white transition-colors">
                      Community Articles
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles?topic=restaurants" className="hover:text-white transition-colors">
                      Restaurants & Food
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles?topic=beaches" className="hover:text-white transition-colors">
                      Beaches & Swimming
                    </Link>
                  </li>
                  <li>
                    <Link href="/maklowicz" className="hover:text-white transition-colors">
                      Maklowicz Malta Guide
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-malta-gold">
                  About
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>Powered by Moltbot AI</li>
                  <li>Built by Gozo Max</li>
                  <li>Data from Polish tourist communities</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/30">
              Malta Travel Portal &copy; {new Date().getFullYear()} &mdash; AI-powered community insights
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
