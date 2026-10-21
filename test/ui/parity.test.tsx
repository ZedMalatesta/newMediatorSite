import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PravoPage from "@/app/pravo/page";
import LiteraturePage from "@/app/literature/page";
import ObucheniePage from "@/app/obuchenie/page";
import ThankYouPage from "@/app/thankyou/page";
import { experts } from "@lib/data";
import { pageBlocks } from "@lib/pageBlocks";

/** What a visitor of mediatorok.by can do, they can do here: found missing by comparing the two sites. */
describe("parity with the live site", () => {
  it("offers the documents /pravo links for download", () => {
    render(<PravoPage />);
    const law = screen.getByRole("link", { name: /Закон Республики Беларусь "О медиации"/ });
    expect(law).toHaveAttribute("href", "https://disk.yandex.ru/i/GFmv5RsLWf5nnA");
    expect(law).toHaveAttribute("target", "_blank");
    const resolution = screen.getAllByRole("link", { name: /Постановление Министерства юстиции/ });
    expect(resolution.some((a) => a.getAttribute("href") === "https://disk.yandex.ru/i/02HJ-iyH9XyyOw")).toBe(true);
  });

  it("offers the books and materials /literature links, one per line", () => {
    render(<LiteraturePage />);
    const downloads = within(screen.getByRole("main"))
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("https://disk.yandex.ru/"));
    expect(downloads).toHaveLength(8);
    expect(downloads[0].parentElement).toHaveClass("flex-col");
  });

  it("leads from every catalogue card to its course page", () => {
    render(<ObucheniePage />);
    const main = within(screen.getByRole("main"));
    // The programme tabs: every "Подробнее" goes somewhere.
    const more = main.getAllByRole("link", { name: "Подробнее" }).map((a) => a.getAttribute("href"));
    expect(more).toEqual([
      "/semeynayamediation",
      "/obucheniemediator",
      "/obucheniemediator",
      "/school",
      "/summerschool2025",
      "/practicalconflictology",
    ]);
    // The further courses are links themselves.
    for (const [name, href] of [
      [/Точка роста/, "/tochkarosta"],
      [/Психологическое консультирование/, "/consultation"],
      [/Английский для психологов/, "/englishforpsychology"],
      [/Английский для медиации/, "/englishformediation"],
      [/Новые технологии современной медиации/, "/newtechnologies"],
    ] as const) {
      expect(main.getAllByRole("link", { name }).some((a) => a.getAttribute("href") === href)).toBe(true);
    }
  });

  it("finishes a registration in the bot that sends the lesson link", () => {
    render(<ThankYouPage />);
    expect(screen.getByRole("link", { name: "Перейти в Telegram" })).toHaveAttribute("href", "https://t.me/mediator_ok_bot");
  });

  it("presents the home page's experts as the live home page does", () => {
    const live = pageBlocks.home.find((b) => b.heading === "Наши эксперты")!.cards;
    expect(experts.map((e) => e.name)).toEqual(live.map((c) => c.title));
    // The descriptions match too, apart from ё.
    const plain = (t: string) => t.replace(/ё/g, "е");
    expect(experts.map((e) => plain(e.credentials))).toEqual(live.map((c) => plain(c.body.map((n) => n.text).join(" "))));
  });
});
