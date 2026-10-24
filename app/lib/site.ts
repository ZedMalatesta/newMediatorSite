/**
 * Canonical site constants. The public URL depends on where the export is
 * deployed, so it is env-driven with the current GitHub Pages URL as default.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zedmalatesta.github.io"
).replace(/\/$/, "");

/**
 * Whether this build is the site on its own domain. The GitHub Pages copy is
 * staging: it duplicates mediatorok.by, so it is kept out of search engines and
 * analytics (launch specification, L1 and L4). Building with NEXT_PUBLIC_SITE_URL
 * set to the real domain is what makes it live.
 */
export const isLiveSite = !new URL(siteUrl).hostname.endsWith(".github.io");

/** Absolute URL for a route, including any base path. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${basePath}${clean === "/" ? "" : clean}` || siteUrl;
}

export type OpeningHours = {
  /** e.g. "Пн–Чт" */
  days: string;
  /** e.g. "9:30 – 17:30" */
  hours: string;
  /** Optional break, e.g. "обед 12:30 – 13:00" */
  note?: string;
};

export const site = {
  name: "МедиаторОк Проф",
  legalName: "Учебно-практическое учреждение «МедиаторОк Проф»",
  locale: "ru_RU",
  description:
    "Учебно-практическое учреждение «МедиаторОк Проф»: обучение медиаторов, " +
    "медиация, психологическое консультирование и разрешение конфликтов. " +
    "Помогаем людям менять себя и мир вокруг, создавать новые ценности и " +
    "поддерживать культуру ненасилия.",
  address: "г. Минск, ул. Короля 9, каб. 126",
  /** The address as a map search, without the office number a geocoder trips on. */
  mapQuery: "Минск, улица Короля, 9",
  email: "mediatorok.by@gmail.com",
  phones: ["+375 (29) 867‑82‑40", "+375 (33) 689‑90‑19"],
  /**
   * Opening hours are not published anywhere on mediatorok.by, so none are
   * asserted here. Add entries and the header renders them automatically -
   * showing invented hours would send someone to a closed office.
   */
  openingHours: [] as OpeningHours[],
  telegram: "https://t.me/MediatorOK",
  instagram: "https://www.instagram.com/mediatorok.by/",
  /** The live site's Yandex.Metrika counter, kept so statistics carry across launch. */
  metrikaId: 105878977,
} as const;
