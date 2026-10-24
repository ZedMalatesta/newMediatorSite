import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchBox from "@layout/SearchBox/SearchBox";
import MobileMenu from "@layout/MobileMenu/MobileMenu";
import Navbar from "@layout/Navbar/Navbar";
import SearchResults from "@/app/search/_components/SearchResults";
import ProgramTabs from "@sections/ProgramTabs/ProgramTabs";
import TestimonialsSection from "@sections/TestimonialsSection/TestimonialsSection";
import { navLinks, programs, testimonialImages } from "@lib/data";
import { search } from "@lib/search";
import { navigation } from "../navigation";

describe("SearchBox", () => {
  it("suggests pages as you type and opens one with the keyboard", async () => {
    const user = userEvent.setup();
    render(<SearchBox />);
    const input = screen.getByRole("combobox", { name: "Поиск по сайту" });
    await user.type(input, "медиац");
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(Math.min(6, search("медиац").length));

    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowUp}");
    expect(input).toHaveAttribute("aria-activedescendant", options[0].id);
    expect(options[0]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Enter}");
    expect(navigation.push).toHaveBeenCalledWith(`/${search("медиац", 6)[0].slug}`);
  });

  it("highlights on hover, wraps around, and closes on Esc", async () => {
    const user = userEvent.setup();
    render(<SearchBox />);
    const input = screen.getByRole("combobox");
    await user.type(input, "медиац");
    const options = screen.getAllByRole("option");
    await user.keyboard("{ArrowUp}");
    expect(options.at(-1)).toHaveAttribute("aria-selected", "true");
    await user.hover(within(options[1]).getByRole("link"));
    expect(options[1]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-activedescendant");
  });

  it("says when nothing matches, and ignores arrows then", async () => {
    const user = userEvent.setup();
    render(<SearchBox />);
    await user.type(screen.getByRole("combobox"), "zzzqqq{ArrowDown}");
    expect(screen.getByText("Ничего не найдено по запросу «zzzqqq»")).toBeInTheDocument();
    await user.keyboard("{Enter}");
    expect(navigation.push).toHaveBeenCalledWith("/search?q=zzzqqq");
  });

  it("submits the query to the results page, but not an empty one", async () => {
    const user = userEvent.setup();
    render(<SearchBox />);
    const input = screen.getByRole("combobox");
    await user.type(input, "   {Enter}");
    expect(navigation.push).not.toHaveBeenCalled();
    await user.clear(input);
    await user.type(input, "тренер{Enter}");
    expect(navigation.push).toHaveBeenCalledWith("/search?q=%D1%82%D1%80%D0%B5%D0%BD%D0%B5%D1%80");
  });

  it("hides the suggestions shortly after losing focus, and shows them again on focus", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<><SearchBox /><button>elsewhere</button></>);
    await user.type(screen.getByRole("combobox"), "медиац");
    await user.click(screen.getByRole("button", { name: "elsewhere" }));
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("keeps ids unique when the header mounts it twice", () => {
    render(<><SearchBox /><SearchBox /></>);
    const [a, b] = screen.getAllByRole("combobox");
    expect(a.id).not.toBe(b.id);
  });
});

describe("MobileMenu", () => {
  it("opens a panel with every menu link, and closes on Esc, the backdrop, the button or a link", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);
    const open = screen.getByRole("button", { name: "Открыть меню" });
    expect(open).toHaveAttribute("aria-expanded", "false");

    await user.click(open);
    const dialog = screen.getByRole("dialog", { name: "Меню сайта" });
    expect(screen.getByRole("button", { name: "Закрыть меню" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
    for (const link of navLinks) expect(within(dialog).getByText(link.label)).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");

    await user.click(open);
    await user.click(screen.getByRole("button", { name: "Закрыть меню" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(open);
    await user.click(screen.getByRole("dialog").firstElementChild as HTMLElement);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(open);
    const plain = navLinks.find((l) => !l.children)!;
    await user.click(within(screen.getByRole("dialog")).getByRole("link", { name: plain.label }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(open);
    const group = navLinks.find((l) => l.children)!;
    await user.click(within(screen.getByRole("dialog")).getByText(group.label));
    await user.click(within(screen.getByRole("dialog")).getByRole("link", { name: group.children![0].label }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes itself when the window grows to desktop width", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);
    await user.click(screen.getByRole("button", { name: "Открыть меню" }));
    Object.assign(window, { innerWidth: 1000 });
    fireEvent(window, new Event("resize"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    Object.assign(window, { innerWidth: 1400 });
    fireEvent(window, new Event("resize"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Navbar", () => {
  it("shows every menu item, with parents that only open a submenu as buttons", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation", { name: "Основное меню" });
    for (const link of navLinks) {
      const role = link.children && !link.href ? "button" : "link";
      expect(within(nav).getAllByRole(role, { name: new RegExp(link.label) }).length).toBeGreaterThan(0);
    }
  });
});

describe("SearchResults", () => {
  it("asks for a query when there is none", () => {
    render(<SearchResults />);
    expect(screen.getByText(/Введите запрос/)).toBeInTheDocument();
  });

  it("lists the matches for the query in the address", () => {
    navigation.search = "q=медиация";
    render(<SearchResults />);
    expect(screen.getByRole("status")).toHaveTextContent(`Найдено: ${search("медиация", 50).length}`);
    expect(screen.getAllByRole("listitem").length).toBe(search("медиация", 50).length);
  });

  it("points to the main sections when nothing matches", () => {
    navigation.search = "q=zzzqqq";
    render(<SearchResults />);
    expect(screen.getByRole("status")).toHaveTextContent("Ничего не найдено по запросу «zzzqqq»");
    expect(screen.getByRole("link", { name: "Наши тренеры" })).toHaveAttribute("href", "/trainers");
  });
});

describe("ProgramTabs", () => {
  it("filters programmes by format with clicks and the arrow keys", async () => {
    const user = userEvent.setup();
    render(<ProgramTabs programs={programs.map((p) => ({ ...p, started: false }))} />);
    const tab = (name: string) => screen.getByRole("tab", { name });
    const shown = () => screen.getByRole("tabpanel").querySelectorAll("h3").length;
    expect(shown()).toBe(programs.length);

    await user.click(tab("Очно"));
    expect(shown()).toBe(programs.filter((p) => p.format !== "online").length);
    await user.keyboard("{ArrowRight}");
    expect(tab("Онлайн")).toHaveFocus();
    expect(tab("Онлайн")).toHaveAttribute("aria-selected", "true");
    expect(shown()).toBe(programs.filter((p) => p.format !== "in-person").length);
    await user.keyboard("{ArrowRight}");
    expect(tab("Все программы")).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("Онлайн")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(tab("Все программы")).toHaveFocus();
    await user.keyboard("{End}");
    expect(tab("Онлайн")).toHaveFocus();
    await user.keyboard("a");
    expect(tab("Онлайн")).toHaveFocus();
  });
});

describe("ProgramTabs dates", () => {
  const [course] = programs;
  it("says a course has started instead of offering a past date", () => {
    render(<ProgramTabs programs={[{ ...course, startDate: "с 19 октября 2026", started: true }]} />);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Старт был: 19 октября 2026, уточняйте следующий поток");
  });

  it("offers the start date while it is ahead", () => {
    render(<ProgramTabs programs={[{ ...course, startDate: "с 19 октября 2026", started: false }]} />);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Начало: с 19 октября 2026");
  });

  it("says so when nothing is current", () => {
    render(<ProgramTabs programs={[]} />);
    expect(screen.getByText("Программ для данного формата не найдено.")).toBeInTheDocument();
  });
});

describe("TestimonialsSection", () => {
  it("opens a review full-size and steps through them with buttons and keys", async () => {
    const user = userEvent.setup();
    const n = testimonialImages.length;
    render(<TestimonialsSection videos={[{ provider: "youtube", id: "v1" }]} />);
    expect(screen.getByRole("button", { name: "Смотреть: Видеоотзыв ученика" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Открыть отзыв 1" }));
    expect(screen.getByText(`1 / ${n}`)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Предыдущий" }));
    expect(screen.getByText(`${n} / ${n}`)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Следующий" }));
    await user.keyboard("{ArrowRight}");
    expect(screen.getByText(`2 / ${n}`)).toBeInTheDocument();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByText(`1 / ${n}`)).toBeInTheDocument();

    await user.click(screen.getAllByRole("img", { name: "Отзыв 1" }).at(-1)!);
    expect(screen.getByText(`1 / ${n}`)).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText(`1 / ${n}`)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Открыть отзыв 2" }));
    await user.click(screen.getByRole("button", { name: "Закрыть" }));
    expect(screen.queryByText(`2 / ${n}`)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Открыть отзыв 2" }));
    await user.click(screen.getByText(`2 / ${n}`).closest(".fixed") as HTMLElement);
    expect(screen.queryByText(`2 / ${n}`)).not.toBeInTheDocument();
  });
});
