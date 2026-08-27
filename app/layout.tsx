import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { site, siteUrl, absoluteUrl } from "@lib/site";

// Body text. Cyrillic is required - the site is entirely in Russian.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Headings.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  // Spec §12: the site's content is entirely Russian; its metadata was English.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.legalName} — обучение медиаторов и разрешение конфликтов`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
