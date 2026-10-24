import { absoluteUrl, site } from "./site";
import type { CurrentProgram } from "./data";
import { isoDay, parseRuDate } from "./lifecycle";
import { searchIndex } from "./searchIndex";

/**
 * Organisation-level facts only. Individual trainers' personal emails and phone
 * numbers appear in the source content but are gated on per-person consent
 * (spec §4.4 [LEGAL], Q-12), so they are deliberately excluded here.
 */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logos/logo.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Короля 9, кабинет 126",
      addressLocality: "Минск",
      addressCountry: "BY",
    },
    telephone: "+375 (29) 867-82-40",
    sameAs: [site.telegram, site.instagram],
  };
}

const COURSE_MODE = { online: "online", "in-person": "onsite", both: "blended" } as const;

/**
 * The catalogue as a list of courses, so search engines can show each with its
 * format and start (Google's "course list"). Each course is described by its
 * own page's description; a start date is given only while it is ahead - a
 * started course offers no date rather than a past one.
 */
export function courseListJsonLd(programs: CurrentProgram[], now: Date = new Date()): Record<string, unknown> {
  const provider = { "@type": "EducationalOrganization", name: site.legalName, url: absoluteUrl("/") };
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: programs.map((p, i) => {
      const page = searchIndex.find((d) => `/${d.slug}` === p.href);
      const start = p.started ? undefined : parseRuDate(p.startDate, now);
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Course",
          name: p.title,
          description: page?.description || `${p.title}. ${p.duration}.`,
          url: absoluteUrl(p.href),
          inLanguage: "ru",
          provider,
          educationalCredentialAwarded: p.certificate,
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: COURSE_MODE[p.format],
            ...(start && { startDate: isoDay(start) }),
            ...(p.kind === "event" && { endDate: p.ends }),
            ...(p.format !== "online" && {
              location: { "@type": "Place", name: site.legalName, address: site.address },
            }),
          },
        },
      };
    }),
  };
}
