import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import Image from "next/image";
import { audiences, getAudience, audienceItems } from "@lib/audiences";
import { cardImage } from "@lib/pageImage";
import { absoluteUrl } from "@lib/site";
import FavouriteButton from "@ui/FavouriteButton/FavouriteButton";
import AddToCartButton from "@ui/AddToCartButton/AddToCartButton";

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
              {items.map((item) => {
                const img = cardImage(item.slug);
                return (
                <li
                  key={item.slug}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 hover:border-accent-300 hover:shadow-md transition-all"
                >
                  {img && (
                    <Link href={`/${item.slug}`} className="relative block aspect-16/9 bg-slate-200">
                      <Image
                        src={img.src}
                        alt={img.alt || item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                    </Link>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/${item.slug}`} className="group flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 group-hover:text-accent-600 transition-colors mb-2">
                        {item.title}
                      </h3>
                    </Link>
                    <FavouriteButton slug={item.slug} title={item.title} className="-mr-2 -mt-2 flex-shrink-0" />
                  </div>
                  {item.description && (
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <AddToCartButton slug={item.slug} title={item.title} />
                  </div>
                  </div>
                </li>
                );
              })}
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
