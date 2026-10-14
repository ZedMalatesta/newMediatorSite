import type { Session } from "@/app/types/content";

export type ScheduleIssue = {
  kind: "overlap" | "unlabelled-gap" | "duplicate-title";
  day: string;
  detail: string;
};

const minutes = (t: string): number => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
};

/**
 * Schedule validation — spec §8.4. The audit found these defects by hand on the
 * event page; encoding them means a bad schedule fails loudly instead of
 * shipping. Catches E-7 (overlap), E-10 (unlabelled gap), E-8 (duplicate title).
 */
export function validateSessions(
  sessions: Session[],
  gapThresholdMinutes = 30,
): ScheduleIssue[] {
  const issues: ScheduleIssue[] = [];
  const byDay = new Map<string, Session[]>();

  for (const s of sessions) {
    byDay.set(s.day, [...(byDay.get(s.day) ?? []), s]);
  }

  for (const [day, daySessions] of byDay) {
    const ordered = [...daySessions].sort(
      (a, b) => minutes(a.startTime) - minutes(b.startTime),
    );

    for (let i = 0; i < ordered.length; i++) {
      const cur = ordered[i];
      const next = ordered[i + 1];

      const sameTitle = ordered.filter((o) => o.title === cur.title);
      if (sameTitle.length > 1 && sameTitle[0] === cur) {
        issues.push({
          kind: "duplicate-title",
          day,
          detail: `«${cur.title}» appears ${sameTitle.length} times on ${day}`,
        });
      }

      if (!next) continue;

      if (minutes(next.startTime) < minutes(cur.endTime)) {
        issues.push({
          kind: "overlap",
          day,
          detail: `«${cur.title}» (ends ${cur.endTime}) overlaps «${next.title}» (starts ${next.startTime})`,
        });
      }

      const gap = minutes(next.startTime) - minutes(cur.endTime);
      if (gap > gapThresholdMinutes) {
        issues.push({
          kind: "unlabelled-gap",
          day,
          detail: `${gap} min unlabelled between ${cur.endTime} and ${next.startTime}`,
        });
      }
    }
  }

  return issues;
}
