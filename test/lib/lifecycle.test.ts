import { describe, expect, it } from "vitest";
import { activeTier, enrolmentStatus, eventStatus, isPast, isTierExpired } from "@lib/lifecycle";

const on = (d: string) => new Date(`${d}T12:00:00`);

describe("lifecycle", () => {
  it("derives an event's status from its dates", () => {
    expect(eventStatus("2026-07-10", "2026-07-12", on("2026-07-01"))).toBe("upcoming");
    expect(eventStatus("2026-07-10", "2026-07-12", on("2026-07-10"))).toBe("open");
    expect(eventStatus("2026-07-10", "2026-07-12", on("2026-07-12"))).toBe("open");
    expect(eventStatus("2026-07-10", "2026-07-12", on("2026-07-13"))).toBe("past");
  });

  it("knows when something is over", () => {
    expect(isPast("2026-07-12", on("2026-07-12"))).toBe(false);
    expect(isPast("2026-07-12", on("2026-07-13"))).toBe(true);
    expect(typeof isPast("2026-07-12")).toBe("boolean");
  });

  it("closes enrolment once a course has started, or when it has no date", () => {
    expect(enrolmentStatus(undefined)).toBe("closed");
    expect(enrolmentStatus("2026-09-15", on("2026-09-01"))).toBe("open");
    expect(enrolmentStatus("2026-09-15", on("2026-09-15"))).toBe("closed");
  });

  it("picks the first price tier whose window includes today", () => {
    const tiers = [
      { label: "early", byn: 400, windowEnd: "2026-05-31" },
      { label: "regular", byn: 450, windowStart: "2026-06-01", windowEnd: "2026-06-30" },
      { label: "late", byn: 500, windowStart: "2026-07-01" },
    ];
    expect(activeTier(tiers, on("2026-05-01"))?.label).toBe("early");
    expect(activeTier(tiers, on("2026-06-15"))?.label).toBe("regular");
    expect(activeTier(tiers, on("2026-08-01"))?.label).toBe("late");
    expect(activeTier(tiers.slice(0, 2), on("2026-08-01"))).toBeUndefined();
  });

  it("expires a tier the day after its window ends, and never one without an end", () => {
    expect(isTierExpired({ label: "x", byn: 1, windowEnd: "2026-05-31" }, on("2026-05-31"))).toBe(false);
    expect(isTierExpired({ label: "x", byn: 1, windowEnd: "2026-05-31" }, on("2026-06-01"))).toBe(true);
    expect(isTierExpired({ label: "x", byn: 1 })).toBe(false);
  });
});
