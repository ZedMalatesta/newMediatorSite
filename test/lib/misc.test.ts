import { afterEach, describe, expect, it, vi } from "vitest";
import imageLoader from "@lib/imageLoader";
import { blockByHeading, isIcon, listInOrder } from "@lib/blockQuery";
import { cleanCopy, fixTypos, isTildaArtefact } from "@lib/copyFilters";
import { audienceItems, audiences, getAudience } from "@lib/audiences";
import { contactFields, field, liveFields } from "@lib/formFields";
import { navLinks, programs, promos } from "@lib/data";
import { cardImage } from "@lib/pageImage";
import { pageCover } from "@lib/pageBlocks";
import { organizationJsonLd } from "@lib/structuredData";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("imageLoader", () => {
  it("prefixes local images with the base path, once", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/newMediatorSite");
    expect(imageLoader({ src: "/images/a.jpg", width: 640 })).toBe("/newMediatorSite/images/a.jpg");
    expect(imageLoader({ src: "/newMediatorSite/images/a.jpg", width: 640 })).toBe("/newMediatorSite/images/a.jpg");
  });

  it("leaves remote images and an unset base path alone", () => {
    expect(imageLoader({ src: "https://cdn.example/a.jpg", width: 640 })).toBe("https://cdn.example/a.jpg");
    expect(imageLoader({ src: "/images/a.jpg", width: 640 })).toBe("/images/a.jpg");
  });
});

describe("site URLs", () => {
  it("builds absolute URLs on the configured site and base path", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://mediatorok.example/");
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/base");
    const { absoluteUrl, siteUrl } = await import("@lib/site");
    expect(siteUrl).toBe("https://mediatorok.example");
    expect(absoluteUrl()).toBe("https://mediatorok.example/base");
    expect(absoluteUrl("trainers")).toBe("https://mediatorok.example/base/trainers");
  });

  it("defaults to the GitHub Pages address, which is staging", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", undefined as unknown as string);
    const { absoluteUrl, isLiveSite } = await import("@lib/site");
    expect(absoluteUrl("/")).toBe("https://zedmalatesta.github.io");
    expect(isLiveSite).toBe(false);
  });

  it("is live on any other domain", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://mediatorok.by");
    const { isLiveSite } = await import("@lib/site");
    expect(isLiveSite).toBe(true);
  });
});

describe("copy filters", () => {
  it("recognises Tilda scaffolding", () => {
    expect(isTildaArtefact("↓ Нажми на тренера, чтобы просмотреть его резюме ↓")).toBe(true);
    expect(isTildaArtefact("  ")).toBe(true);
    expect(isTildaArtefact("Медиация")).toBe(false);
  });

  it("fixes typos carried over from the live site", () => {
    expect(fixTypos("Заполнить заяку")).toBe("Заполнить заявку");
    expect(fixTypos("Косультация психолога")).toBe("Консультация психолога");
  });

  it("drops artefacts and empty price placeholders", () => {
    expect(cleanCopy(["Назад", "от 100 р. р. бел.руб.", "Текст"])).toEqual(["от 100 бел.руб.", "Текст"]);
  });
});

describe("block queries", () => {
  it("finds a live block by how its heading starts", () => {
    expect(blockByHeading("psycologicalcounseling", "Форматы работы")?.cards).toHaveLength(3);
    expect(blockByHeading("psycologicalcounseling", "Нет такого")).toBeUndefined();
  });

  it("lists a block's lines once each, in page order", () => {
    expect(listInOrder(undefined)).toEqual([]);
    const lines = listInOrder({
      ...blockByHeading("psycologicalcounseling", "Форматы работы")!,
      paragraphs: ["a", "b"],
      listItems: ["b", "c"],
    });
    expect(lines).toEqual(["a", "b", "c"]);
  });

  it("tells icons from pictures", () => {
    const img = (src: string, width: number, height: number) => ({ src, width, height, alt: "" });
    expect(isIcon(img("/i.png", 100, 100))).toBe(true);
    expect(isIcon(img("/pictogram.png", 512, 512))).toBe(true);
    expect(isIcon(img("/photo.jpg", 512, 512))).toBe(false);
    expect(isIcon(img("/photo.jpg", 1280, 853))).toBe(false);
  });
});

describe("content data", () => {
  it("resolves every audience to existing programmes", () => {
    for (const a of audiences) {
      expect(getAudience(a.slug)).toBe(a);
      expect(audienceItems(a).length).toBeGreaterThan(0);
    }
    expect(getAudience("nobody")).toBeUndefined();
    expect(audienceItems({ ...audiences[0], items: ["no-such-page"] })).toEqual([]);
  });

  it("builds the menu from the live one, with the audiences after Обучение", () => {
    const labels = navLinks.map((l) => l.label);
    expect(labels).toContain("Направления");
    expect(labels.indexOf("Направления")).toBe(labels.indexOf("Обучение") + 1);
    expect(navLinks.flatMap((l) => l.children ?? []).every((c) => c.href !== "/error")).toBe(true);
  });

  it("dates promos and programmes from the live pages", () => {
    expect(promos.length).toBeGreaterThan(0);
    expect(programs.every((p) => p.title)).toBe(true);
  });

  it("offers the form fields a page asks for", () => {
    expect(contactFields.map((f) => f.key)).toEqual(["name", "email", "phone", "comment"]);
    expect(field.text("city", "Город")).toMatchObject({ key: "city", kind: "text", required: false });
    expect(field.multi("topics", "Темы", ["A"])).toMatchObject({ kind: "multi", options: ["A"] });
    expect(liveFields("no-such-page")).toBeUndefined();
    expect(liveFields("mediation")?.length).toBeGreaterThan(0);
  });

  it("picks a listing card image: the live cover, else the first wide photo, else none", () => {
    const covered = Object.keys(pageCover)[0];
    expect(cardImage(covered)).toEqual({ src: pageCover[covered], alt: "" });
    expect(cardImage("fordialogue")?.src).toMatch(/\.(jpe?g|png|webp)$/);
    expect(cardImage("no-such-page")).toBeNull();
  });

  it("publishes the organisation's facts but no individual's contacts", () => {
    const data = organizationJsonLd();
    expect(data).toMatchObject({ "@type": "EducationalOrganization", telephone: "+375 (29) 867-82-40" });
    expect(JSON.stringify(data)).not.toMatch(/trustbel|target_oksana/);
  });
});
