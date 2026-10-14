/**
 * Canonical site constants. The public URL depends on where the export is
 * deployed, so it is env-driven with the current GitHub Pages URL as default.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zedmalatesta.github.io"
).replace(/\/$/, "");

/** Absolute URL for a route, including any base path. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${basePath}${clean === "/" ? "" : clean}` || siteUrl;
}

export const site = {
  name: "МедиаторОк Проф",
  legalName: "Учебно-практическое учреждение «МедиаторОк Проф»",
  locale: "ru_RU",
  description:
    "Учебно-практическое учреждение «МедиаторОк Проф»: обучение медиаторов, " +
    "медиация, психологическое консультирование и разрешение конфликтов. " +
    "Помогаем людям менять себя и мир вокруг, создавать новые ценности и " +
    "поддерживать культуру ненасилия.",
  telegram: "https://t.me/MediatorOK",
  instagram: "https://www.instagram.com/mediatorok.by/",
} as const;
