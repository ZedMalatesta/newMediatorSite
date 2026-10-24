import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { programs, type CurrentProgram } from "@lib/data";
import { courseListJsonLd } from "@lib/structuredData";
import ObucheniePage from "@/app/obuchenie/page";

const on = (d: string) => new Date(`${d}T12:00:00`);
const course = (over: Partial<CurrentProgram>): CurrentProgram =>
  ({ ...programs[0], kind: "course", startDate: "Дата уточняется", started: false, ...over }) as CurrentProgram;
type Item = { position: number; item: Record<string, unknown> & { hasCourseInstance: Record<string, unknown> } };
const items = (list: CurrentProgram[], d = "2026-10-24") => courseListJsonLd(list, on(d)).itemListElement as Item[];

describe("the catalogue as structured data", () => {
  it("lists every programme as a course of this institution, in order, on its own page", () => {
    const [first, second] = items([course({}), course({ title: "Второй", href: "/obucheniemediator" })]);
    expect(first.position).toBe(1);
    expect(second.position).toBe(2);
    expect(first.item).toMatchObject({ "@type": "Course", inLanguage: "ru", provider: { "@type": "EducationalOrganization" } });
    expect(first.item.url).toMatch(/\/semeynayamediation$/);
    // Described as the course's own page describes it.
    expect(first.item.description).toMatch(/^Полный курс/);
  });

  it("gives a start date only while it is ahead", () => {
    const [ahead, started, none] = items([
      course({ startDate: "с 9 ноября 2026" }),
      course({ startDate: "с 19 октября 2026", started: true }),
      course({ startDate: "Дата уточняется" }),
    ]);
    expect(ahead.item.hasCourseInstance.startDate).toBe("2026-11-09");
    expect(started.item.hasCourseInstance).not.toHaveProperty("startDate");
    expect(none.item.hasCourseInstance).not.toHaveProperty("startDate");
  });

  it("says how and where it runs, and when an event ends", () => {
    const [online, inPerson, event] = items([
      course({ format: "online" }),
      course({ format: "in-person" }),
      { ...course({ format: "both" }), kind: "event", ends: "2026-07-31" } as CurrentProgram,
    ]);
    expect(online.item.hasCourseInstance).toEqual({ "@type": "CourseInstance", courseMode: "online" });
    expect(inPerson.item.hasCourseInstance).toMatchObject({ courseMode: "onsite", location: { "@type": "Place" } });
    expect(event.item.hasCourseInstance).toMatchObject({ courseMode: "blended", endDate: "2026-07-31" });
  });

  it("falls back to the card's own words when the page has no description", () => {
    const [orphan] = items([course({ href: "/nowhere", title: "Курс", duration: "Два дня" })]);
    expect(orphan.item.description).toBe("Курс. Два дня.");
  });

  it("is on the catalogue page", () => {
    const { container } = render(<ObucheniePage />);
    const data = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
    expect(data["@type"]).toBe("ItemList");
    expect(data.itemListElement.length).toBeGreaterThan(0);
  });
});
