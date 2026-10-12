import type { Metadata } from "next";
import Link from "next/link";
import { aliases } from "@lib/aliases";
import { absoluteUrl } from "@lib/site";

type Props = { params: Promise<{ alias: string }> };

/** Only the known aliases are exported; any other path stays a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(aliases).map((alias) => ({ alias }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { alias } = await params;
  return {
    title: "Страница переехала",
    // Point search engines at the real page and keep this one out of the index.
    alternates: { canonical: absoluteUrl(aliases[alias]) },
    robots: { index: false, follow: true },
  };
}

export default async function AliasPage({ params }: Props) {
  const { alias } = await params;
  const target = aliases[alias];
  const url = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${target}`;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white">
      {/* A static export cannot answer with a 301, so the document forwards itself. */}
      <meta httpEquiv="refresh" content={`0; url=${url}`} />
      <p className="text-slate-600">
        Страница переехала.{" "}
        <Link href={target} className="text-accent-600 font-semibold hover:underline">
          Перейти
        </Link>
      </p>
    </main>
  );
}
