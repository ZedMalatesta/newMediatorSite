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
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: absoluteUrl("/"),
    title: `${site.legalName} — обучение медиаторов и разрешение конфликтов`,
    description: site.description,
    images: [{ url: absoluteUrl("/images/logos/logo.png"), width: 578, height: 91, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.legalName,
    description: site.description,
  },
  icons: {
    icon: "/favicon.ico",
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
