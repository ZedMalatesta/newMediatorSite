import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { audiences, getAudience, audienceItems } from "@lib/audiences";
import { absoluteUrl } from "@lib/site";

type Props = { params: Promise<{ slug: string }> };

/** Static export needs every audience route enumerated at build time. */
export function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) return {};
  return {
    title: audience.title,
    description: audience.tagline,
    alternates: { canonical: absoluteUrl(`/audience/${slug}`) },
    openGraph: { url: absoluteUrl(`/audience/${slug}`) },
  };
}

export default async function AudiencePage({ params }: Props) {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) notFound();

  const items = audienceItems(audience);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Направление
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {audience.title}
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl">{audience.tagline}</p>
          </div>
        </section>

        <section className="px-4 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">
              {items.length} направлени{items.length === 1 ? "е" : "й"}
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    className="group block h-full rounded-xl border border-slate-200 p-5 hover:border-accent-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-accent-600 transition-colors mb-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto border-t border-slate-200 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Другие направления
            </h2>
            <div className="flex flex-wrap gap-3">
              {audiences
                .filter((a) => a.slug !== audience.slug)
                .map((a) => (
                  <Link
                    key={a.slug}
                    href={`/audience/${a.slug}`}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-300 hover:text-accent-600 transition-colors"
                  >
                    {a.title}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
