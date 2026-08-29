import { searchIndex } from "./searchIndex";

/**
 * Audience taxonomy — change request points 5 and 6 ("Международная академия",
 * "Для определённой аудитории").
 *
 * The reference site groups its catalogue by who the visitor is rather than by
 * internal service names. The groupings below are derived from this site's own
 * routes; a page may belong to more than one audience (supervision serves both
 * practising mediators and psychologists), which a single-parent nav cannot
 * express.
 *
 * Titles are not repeated here - they are read from the generated search index,
 * so a renamed page cannot fall out of sync with its audience listing.
 */
export type Audience = {
  slug: string;
  title: string;
  tagline: string;
  /** Route slugs belonging to this audience, in presentation order. */
  items: string[];
};

export const audiences: Audience[] = [
  {
    slug: "buduschim-mediatoram",
    title: "Будущим медиаторам",
    tagline: "Программы подготовки, школы и интенсивы для тех, кто идёт в профессию.",
    items: [
      "obucheniemediator",
      "school",
      "schoolofyoungmediator",
      "summerintensive2026",
      "summerschool2025",
      "springschool",
      "practicalconflictology",
      "conflictology",
      "institute",
    ],
  },
  {
    slug: "specialistam",
    title: "Психологам и специалистам",
    tagline: "Повышение квалификации, супервизия и профессиональное сообщество.",
    items: [
      "newtechnologies",
      "supervision",
      "intervision",
      "narrativemediation",
      "provocativemediation",
      "transformativemediation",
      "socraticdialogue",
      "seminarmaksudov",
      "clinicalaspects",
      "logotherapy",
      "musictherapy",
      "webinarsmysla",
      "coupletherapy",
      "speechasinstrument",
      "englishforpsychology",
      "englishformediation",
    ],
  },
  {
    slug: "roditelyam-i-semyam",
    title: "Родителям и семьям",
    tagline: "Помощь семье, детям и родителям — консультирование и медиация.",
    items: [
      "family",
      "familyconsulting",
      "semeynayamediation",
      "childrenindivorce",
      "psychologicalsupport",
      "divorceservice",
      "premaritalcounseling",
      "pedagogikaroditeli",
      "programforparents",
      "mediationinschool",
      "proekdeti",
    ],
  },
  {
    slug: "organizaciyam",
    title: "Организациям и бизнесу",
    tagline: "Корпоративное обучение, переговоры и работа с конфликтами в командах.",
    items: [
      "corporatemediatorok",
      "confictmanagment",
      "negotiationleague",
      "conflictdiagnostics",
      "mediation",
      "tochkarosta",
      "club",
    ],
  },
];

export type AudienceItem = { slug: string; title: string; description: string };

const bySlug = new Map(searchIndex.map((d) => [d.slug, d]));

/** Resolves an audience's route slugs to their live titles and descriptions. */
export function audienceItems(audience: Audience): AudienceItem[] {
  return audience.items
    .map((slug) => {
      const doc = bySlug.get(slug);
      return doc
        ? { slug, title: doc.title, description: doc.description }
        : null;
    })
    .filter((i): i is AudienceItem => i !== null);
}

export function getAudience(slug: string): Audience | undefined {
  return audiences.find((a) => a.slug === slug);
}
