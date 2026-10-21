import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PravoPage from "@/app/pravo/page";
import LiteraturePage from "@/app/literature/page";

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
});
