import { describe, expect, it } from "vitest";
import { activeTier, enrolmentStatus, eventStatus, isPast, isTierExpired, isoDay, parseRuDate } from "@lib/lifecycle";
import { currentPrograms, programs } from "@lib/data";

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

describe("dates as the live pages write them", () => {
  const today = on("2026-10-24");
  it("reads day, month and year, whatever comes around them", () => {
    expect(isoDay(parseRuDate("15 сентября 2026", today)!)).toBe("2026-09-15");
    expect(isoDay(parseRuDate("с 19 октября 2026", today)!)).toBe("2026-10-19");
    expect(isoDay(parseRuDate("С 1 июня 2026г", today)!)).toBe("2026-06-01");
    expect(isoDay(parseRuDate("Со 2 января 2026 г.", today)!)).toBe("2026-01-02");
  });

  it("puts a date without a year in the year nearest to today", () => {
    expect(isoDay(parseRuDate("с 6 октября", today)!)).toBe("2026-10-06");
    expect(isoDay(parseRuDate("с 10 января", on("2026-12-20"))!)).toBe("2027-01-10");
    expect(isoDay(parseRuDate("20 декабря", on("2027-01-05"))!)).toBe("2026-12-20");
  });

  it("finds no date where there is none", () => {
    expect(parseRuDate("Дата уточняется", today)).toBeUndefined();
    expect(parseRuDate("Июль 2026", today)).toBeUndefined();
    expect(parseRuDate("5 мартобря 2026", today)).toBeUndefined();
  });
});

describe("the catalogue on a given day", () => {
  const titles = (d: string) => currentPrograms(on(d)).map((p) => p.title);

  it("drops an event the day after it ends", () => {
    expect(titles("2026-07-31")).toContain("Школа юного медиатора «Территория взаимопонимания»");
    expect(titles("2026-08-01")).not.toContain("Школа юного медиатора «Территория взаимопонимания»");
    expect(titles("2025-07-06")).toContain("Летний интенсив — «Медиатор как личность и как профессионал»");
    expect(titles("2025-07-07")).not.toContain("Летний интенсив — «Медиатор как личность и как профессионал»");
  });

  it("keeps a course once it has started, marked as started", () => {
    const course = { ...programs[0], kind: "course" as const, startDate: "с 19 октября 2026" };
    const started = (d: string) => currentPrograms(on(d), [course])[0].started;
    expect(started("2026-10-18")).toBe(false);
    expect(started("2026-10-20")).toBe(true);
    // A course with no date yet is not "started".
    expect(currentPrograms(on("2026-10-20"), [{ ...course, startDate: "Дата уточняется" }])[0].started).toBe(false);
    expect(typeof currentPrograms()[0].started).toBe("boolean");
  });
});

