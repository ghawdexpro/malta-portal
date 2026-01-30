import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Turystyczny Malta | Przewodnik AI ze Społeczności",
  description:
    "Odkryj Maltę oczami prawdziwych turystów. Przewodniki AI, restauracje, plaże i insider knowledge z polskich grup turystycznych. Robert Makłowicz — interaktywny przewodnik wideo.",
  openGraph: {
    title: "Portal Turystyczny Malta — Odkryj Maltę Oczami Prawdziwych Turystów",
    description:
      "Przewodnik turystyczny Malta napędzany AI — z interaktywną podróżą Roberta Makłowicza po Valletcie, Gozo i Mdinie.",
    locale: "pl_PL",
    type: "website",
    siteName: "Portal Turystyczny Malta",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
        width: 1200,
        height: 630,
      },
    ],
  },
  metadataBase: new URL("https://malta-portal-production.up.railway.app"),
};

export default function PolishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Polish nav */}
        <nav className="fixed top-0 z-50 w-full bg-malta-dark/70 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <Link href="/pl" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-malta-gold text-malta-dark font-black text-sm">
                MT
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-white">Malta</span>
                <span className="text-lg font-light text-white/70">
                  {" "}
                  Portal Turystyczny
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-8 text-sm font-semibold tracking-wide uppercase">
              <Link
                href="/pl/articles"
                className="text-white/80 transition-colors hover:text-malta-gold"
              >
                Artykuły
              </Link>
              <Link
                href="/pl/maklowicz/map"
                className="text-white/80 transition-colors hover:text-malta-gold"
              >
                Mapa
              </Link>
              <div className="flex items-center rounded-full border border-white/30 overflow-hidden">
                <Link
                  href="/"
                  className="px-3 py-1 text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  EN
                </Link>
                <span className="px-3 py-1 text-xs font-bold bg-malta-gold text-malta-dark">
                  PL
                </span>
              </div>
            </div>
          </div>
        </nav>

        <main className="min-h-screen">{children}</main>

        {/* Polish footer */}
        <footer className="bg-malta-dark text-white">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-malta-gold text-malta-dark font-black text-sm">
                    MT
                  </div>
                  <span className="text-lg font-bold">Portal Turystyczny Malta</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  Spostrzeżenia napędzane AI z tysięcy prawdziwych doświadczeń turystycznych.
                  Zbudowane z dyskusji społeczności, przeanalizowane przez sztuczną inteligencję,
                  wyselekcjonowane dla Ciebie.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-malta-gold">
                  Odkrywaj
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>
                    <Link href="/pl/articles" className="hover:text-white transition-colors">
                      Artykuły Społeczności
                    </Link>
                  </li>
                  <li>
                    <Link href="/pl/articles?topic=restaurants" className="hover:text-white transition-colors">
                      Restauracje i Jedzenie
                    </Link>
                  </li>
                  <li>
                    <Link href="/pl/articles?topic=beaches" className="hover:text-white transition-colors">
                      Plaże i Pływanie
                    </Link>
                  </li>
                  <li>
                    <Link href="/pl/maklowicz" className="hover:text-white transition-colors">
                      Przewodnik Wideo
                    </Link>
                  </li>
                  <li>
                    <Link href="/pl/maklowicz/map" className="hover:text-white transition-colors">
                      Interaktywna Mapa
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-malta-gold">
                  O Portalu
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>Napędzane przez Moltbot AI</li>
                  <li>Stworzone przez Gozo Max</li>
                  <li>Dane z polskich społeczności turystycznych</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/30">
              Portal Turystyczny Malta &copy; {new Date().getFullYear()} &mdash; spostrzeżenia AI ze społeczności
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
