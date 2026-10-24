import { describe, expect, it } from "vitest";
import { validateSessions } from "@lib/validateSessions";
import type { Session } from "@/app/types/content";

const s = (day: string, startTime: string, endTime: string, title: string): Session => ({ day, startTime, endTime, title, type: "мастерская" });

describe("validateSessions", () => {
  it("passes a schedule with no overlaps, gaps or repeats", () => {
    expect(
      validateSessions([s("пт", "10:00", "11:00", "Открытие"), s("пт", "11:00", "12:30", "Мастерская")]),
    ).toEqual([]);
  });

  it("finds sessions that overlap, regardless of the order they are listed in", () => {
    const issues = validateSessions([s("сб", "11:30", "12:00", "Б"), s("сб", "10:00", "12:00", "А")]);
    expect(issues).toEqual([
      { kind: "overlap", day: "сб", detail: "«А» (ends 12:00) overlaps «Б» (starts 11:30)" },
    ]);
  });

  it("finds an unlabelled gap longer than the threshold", () => {
    const sessions = [s("вс", "10:00", "11:00", "А"), s("вс", "12:00", "13:00", "Б")];
    expect(validateSessions(sessions)[0]).toMatchObject({ kind: "unlabelled-gap", detail: "60 min unlabelled between 11:00 and 12:00" });
    expect(validateSessions(sessions, 90)).toEqual([]);
  });

  it("reports a title repeated on one day once, and only for that day", () => {
    const issues = validateSessions([
      s("пт", "10:00", "11:00", "Кофе-пауза"),
      s("пт", "11:00", "11:30", "Кофе-пауза"),
      s("сб", "10:00", "11:00", "Кофе-пауза"),
    ]);
    expect(issues.filter((i) => i.kind === "duplicate-title")).toEqual([
      { kind: "duplicate-title", day: "пт", detail: "«Кофе-пауза» appears 2 times on пт" },
    ]);
  });

  it("reads hours without minutes", () => {
    expect(validateSessions([s("пт", "10", "11", "А"), s("пт", "11", "12", "Б")])).toEqual([]);
  });
});
