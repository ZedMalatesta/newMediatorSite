/**
 * Copy register — spec §15.1.
 *
 * The old /trainers and /team pages were built with Tilda's e-commerce product
 * cards, so commerce scaffolding shows through as visible text. None of it
 * should survive migration.
 *
 * Applied at render time, not just scrubbed from the generated manifest: the
 * manifest is regenerated from the original markup, so a one-off clean would
 * silently reintroduce these on the next run.
 */
const ARTEFACT_PATTERNS: RegExp[] = [
  /Нажми на тренера/i,        // Tilda popup instruction, wrapped in ↓ arrows
  /#?prodpopup/i,             // product-popup anchor rendered as a label
  /^Назад$/,                  // stray back control lifted out of a card
  /^Email\*+$/i,              // newsletter field placeholder
  /^\s*р\.\s*р\.\s*$/,        // empty price placeholder from the product card
];

/** True when a line is Tilda scaffolding rather than real content. */
export function isTildaArtefact(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  return ARTEFACT_PATTERNS.some((re) => re.test(t));
}

/**
 * Typos present on the live site itself. The content is synced verbatim, so
 * without this they would be faithfully reproduced; a rebuild is the moment to
 * fix them rather than carry them over.
 */
const LIVE_TYPOS: [RegExp, string][] = [
  [/местоположениев г\./g, "местоположение в г."],
  [/Заполнить заяку/g, "Заполнить заявку"],
  [/Косультация/g, "Консультация"],
  [/Тажке Вас/g, "Также Вас"],
  [/усовершенствоват свои/g, "усовершенствовать свои"],
];

export function fixTypos(text: string): string {
  return LIVE_TYPOS.reduce((t, [re, fix]) => t.replace(re, fix), text);
}

/** Drops artefact lines, trims price placeholders and fixes known typos. */
export function cleanCopy(lines: string[]): string[] {
  return lines
    .map((l) => fixTypos(l.replace(/\s*р\.\s*р\.\s*/g, " ").trim()))
    .filter((l) => l && !isTildaArtefact(l));
}
