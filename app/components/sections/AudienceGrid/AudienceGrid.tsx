import Link from "next/link";
import { audiences, audienceItems } from "@lib/audiences";

/**
 * Catalogue entry points grouped by audience (change request point 5).
 *
 * Each card leads with who the visitor is, then lists the programmes and
 * services that serve them, so someone can self-select instead of decoding
 * internal service names.
 */

const BANDS = [
  "from-accent-700 to-accent-500",
  "from-slate-700 to-slate-500",
  "from-accent-600 to-accent-400",
  "from-slate-800 to-slate-600",
];

/** How many items to list on a card before linking through to the full page. */
const PREVIEW = 6;

export default function AudienceGrid() {
  return (
    <section id="audiences" className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Куда идти
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Выберите своё направление
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, i) => {
            const items = audienceItems(audience);
            const preview = items.slice(0, PREVIEW);
            const rest = items.length - preview.length;

            return (
              <div
                key={audience.slug}
                className="flex flex-col rounded-2xl border border-slate-200 overflow-hidden hover:border-accent-200 hover:shadow-md transition-all"
              >
                <Link
                  href={`/audience/${audience.slug}`}
                  className={`block bg-gradient-to-br ${BANDS[i % BANDS.length]} px-5 py-7 text-white`}
                >
                  <h3 className="font-display text-xl font-bold leading-snug">
                    {audience.title}
                  </h3>
                </Link>

                <div className="flex flex-col flex-1 p-5">
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {audience.tagline}
                  </p>

                  <ul className="space-y-2 mb-4 flex-1">
                    {preview.map((item) => (
                      <li key={item.slug} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-1.5" />
                        <Link
                          href={`/${item.slug}`}
                          className="text-slate-600 text-sm leading-snug hover:text-accent-600 transition-colors"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/audience/${audience.slug}`}
                    className="text-accent-600 font-semibold text-sm hover:underline mt-auto"
                  >
                    {rest > 0 ? `Ещё ${rest} — все направления` : "Все направления"} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
