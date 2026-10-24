export interface EventHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  meta?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Used when the live page has no cover picture of its own. */
  imageSrc?: string;
  /** Page key in the block manifest - its live cover picture is the backdrop. */
  page?: string;
}
