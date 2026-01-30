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
    "Discover Malta through real community experiences. AI-analyzed travel tips, restaurant recommendations, and insider knowledge from Polish tourist groups.",
  openGraph: {
    title: "Malta Travel Portal",
    description: "AI-powered Malta travel guide built from real community experiences",
    locale: "en_US",
  },
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
        <nav className="sticky top-0 z-50 border-b border-malta-stone bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-accent">Malta</span>
              <span className="text-xl font-light text-foreground">Travel Portal</span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/articles" className="text-foreground/70 transition-colors hover:text-accent">
                Articles
              </Link>
              <Link href="/maklowicz" className="text-foreground/70 transition-colors hover:text-accent">
                Maklowicz Guide
              </Link>
              <Link href="/admin" className="text-foreground/70 transition-colors hover:text-accent">
                Admin
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-malta-stone bg-malta-stone/30 py-8">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-foreground/50">
            <p>Malta Travel Portal — AI-powered insights from real community experiences</p>
            <p className="mt-1">Built by Gozo Max & Moltbot</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
