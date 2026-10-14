import { absoluteUrl, site } from "./site";

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
