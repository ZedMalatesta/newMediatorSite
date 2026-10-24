import type { EventStatus, EnrolmentStatus, PriceTier } from "@/app/types/content";

/**
 * Lifecycle derivation — spec §16.
 *
 * The intensive ran 10-12 July 2026 and both sites still presented it as open
 * for registration, with three expired price tiers and live CTAs. Root cause:
 * hand-built landing pages with no expiry concept. Status is therefore derived
 * from dates here and never set by hand.
 */

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export function eventStatus(
  startDate: string,
  endDate: string,
  now: Date = new Date(),
): EventStatus {
  const start = startOfDay(new Date(startDate));
  const end = startOfDay(new Date(endDate));
  const today = startOfDay(now);

  if (today > end) return "past";
  if (today >= start) return "open";
  return "upcoming";
}

export function isPast(endDate: string, now: Date = new Date()): boolean {
  return startOfDay(now) > startOfDay(new Date(endDate));
}

/** A course leaves "актуальные программы" once its start date has passed. */
export function enrolmentStatus(
  startDate: string | undefined,
  now: Date = new Date(),
): EnrolmentStatus {
  if (!startDate) return "closed";
  return startOfDay(new Date(startDate)) > startOfDay(now) ? "open" : "closed";
}

/** Tiers self-deactivate at windowEnd; the active one is the first still open. */
export function activeTier(
  tiers: PriceTier[],
  now: Date = new Date(),
): PriceTier | undefined {
  const today = startOfDay(now);
  return tiers.find((t) => {
    const afterStart = !t.windowStart || startOfDay(new Date(t.windowStart)) <= today;
    const beforeEnd = !t.windowEnd || startOfDay(new Date(t.windowEnd)) >= today;
    return afterStart && beforeEnd;
  });
}

export function isTierExpired(tier: PriceTier, now: Date = new Date()): boolean {
  if (!tier.windowEnd) return false;
  return startOfDay(now) > startOfDay(new Date(tier.windowEnd));
}

const MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

/**
 * Reads a date the way the live pages write it - "15 сентября 2026",
 * "с 19 октября 2026", "С 1 июня 2026г" - into a Date. A date without a year
 * ("с 6 октября") is taken in the year that puts it nearest to `now`.
 * Undefined when the text holds no such date ("Дата уточняется").
 */
export function parseRuDate(text: string, now: Date = new Date()): Date | undefined {
  const m = /(\d{1,2})\s+([а-яё]+)(?:\s+(\d{4}))?/i.exec(text);
  const month = m ? MONTHS.indexOf(m[2].toLowerCase()) : -1;
  if (!m || month < 0) return undefined;
  const day = Number(m[1]);
  if (m[3]) return new Date(Number(m[3]), month, day);
  const year = now.getFullYear();
  return [year - 1, year, year + 1]
    .map((y) => new Date(y, month, day))
    .reduce((a, b) => (Math.abs(+b - +now) < Math.abs(+a - +now) ? b : a));
}

/** A Date as the ISO day the other helpers take. */
export const isoDay = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
