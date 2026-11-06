import type { Metadata, Viewport } from "next";
import { Baloo_Bhaina_2, Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { OdiaCursor } from "@/components/ui/OdiaCursor";
import { brand } from "@/data/content";
import "@/styles/globals.css";

/** Display serif - editorial headings. */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
});

/** Body sans. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/**
 * Odia script support. Baloo Bhaina 2 carries the full Odia block - the Latin
 * fonts above do not, so Odia text without this falls back to tofu.
 */
const balooBhaina = Baloo_Bhaina_2({
  subsets: ["oriya", "latin"],
  display: "swap",
  variable: "--font-odia",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amaparba.example"),
  title: {
    default: `${brand.name} (${brand.odiaName}) - A little piece of Odisha, made personal`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Thirteen illustrated Odisha festival cards, and one card designed around a date that matters to you. Premium cultural gifting from Ama Parba.",
  keywords: [
    "Odisha festival cards",
    "Odia calendar",
    "Ama Parba",
    "personalised cards",
    "Odia gifting",
  ],
  openGraph: {
    title: `${brand.name} - A little piece of Odisha, made personal`,
    description:
      "Thirteen illustrated Odisha festival cards, and one card designed around a date that matters to you.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: false, follow: false }, // Phase 1 preview - not for indexing.
};

export const viewport: Viewport = {
  themeColor: "#F8F3E9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${balooBhaina.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-panel focus:bg-maroon focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <OdiaCursor />
      </body>
    </html>
  );
}
