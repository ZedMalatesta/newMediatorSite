import { site } from "@lib/site";

/**
 * Utility bar: contact channels on the left, address and opening hours on the
 * right, following the reference layout in the change request (point 4).
 *
 * Hours render only when site.openingHours is populated - the organisation
 * publishes none, and inventing them would send someone to a closed office.
 */
export default function TopBar() {
  const [primaryPhone, secondaryPhone] = site.phones;

  return (
    <div className="bg-slate-800 border-b border-accent-500/20 text-white text-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row md:items-start justify-between gap-2">
        <div className="flex items-center gap-4 text-slate-300">
          <a
            href={`tel:${primaryPhone.replace(/[^\d+]/g, "")}`}
            className="hover:text-accent-400 transition-colors"
          >
            {primaryPhone}
          </a>
          <span className="text-slate-600">·</span>
          <a
            href={`tel:${secondaryPhone.replace(/[^\d+]/g, "")}`}
            className="hidden sm:block hover:text-accent-400 transition-colors"
          >
            {secondaryPhone}
          </a>
          <span className="hidden sm:block text-slate-600">·</span>
          <a
            href={`mailto:${site.email}`}
            className="hidden sm:block hover:text-accent-400 transition-colors"
          >
            {site.email}
          </a>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1 text-slate-400">
          <address className="not-italic text-xs md:text-right">
            {site.address}
          </address>

          {site.openingHours.length > 0 && (
            <dl className="text-xs md:text-right">
              <dt className="sr-only">Часы работы</dt>
              {site.openingHours.map((h) => (
                <dd key={h.days} className="flex gap-2 md:justify-end">
                  <span className="text-slate-500">{h.days}</span>
                  <span className="text-slate-300 font-medium">{h.hours}</span>
                  {h.note && <span className="text-slate-500">({h.note})</span>}
                </dd>
              ))}
            </dl>
          )}

          <a
            href="#footer"
            className="mt-1 bg-accent-500 text-white px-3 py-0.5 rounded text-xs font-semibold hover:bg-accent-400 transition-colors"
          >
            Записаться
          </a>
        </div>
      </div>
    </div>
  );
}
