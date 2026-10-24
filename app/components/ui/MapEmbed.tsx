import { site } from "@lib/site";

/**
 * Map of the office.
 *
 * The live site's map block was never configured: its coordinates are Tilda's
 * default (40.71, -74.01 - lower Manhattan), so it shows New York. Rather than
 * reproduce that, this looks the published address up by text, which cannot
 * drift from the address shown next to it.
 */
export default function MapEmbed({ className = "" }: { className?: string }) {
  const query = encodeURIComponent(site.mapQuery);

  return (
    <div className={className}>
      <div className="relative w-full aspect-16/9 md:aspect-21/9 rounded-2xl overflow-hidden bg-slate-200 shadow-sm">
        <iframe
          src={`https://yandex.ru/map-widget/v1/?text=${query}&z=16`}
          title={`Карта: ${site.address}`}
          loading="lazy"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      <div className="mt-3 text-sm text-slate-500">
        <address className="not-italic inline">{site.address}</address>
        {" · "}
        <a
          href={`https://yandex.ru/maps/?text=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-600 font-semibold hover:underline"
        >
          Открыть в Яндекс Картах
        </a>
      </div>
    </div>
  );
}
