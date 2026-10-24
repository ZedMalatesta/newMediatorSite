import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import CartList from "@/app/cart/_components/CartList";
import Checkout from "@/app/cart/_components/Checkout";
import FavouritesList from "@/app/favourites/_components/FavouritesList";
import AddToCartButton from "@ui/AddToCartButton/AddToCartButton";
import FavouriteButton from "@ui/FavouriteButton/FavouriteButton";
import HeaderActions from "@layout/HeaderActions/HeaderActions";
import { Button } from "@ui/Button";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { searchIndex } from "@lib/searchIndex";
import { writeStore, readStore } from "@lib/clientStore";

afterEach(() => vi.unstubAllEnvs());

const cart = () => readStore<{ slug: string; qty: number }[]>("mediatorok.cart", []);

describe("cart", () => {
  it("adds a programme, counting repeats, and confirms briefly", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<AddToCartButton slug="conflictology" title="Конфликтология" priceByn={100} />);
    await user.click(screen.getByRole("button", { name: "В корзину" }));
    expect(screen.getByRole("button", { name: "Добавлено" })).toBeInTheDocument();
    await user.click(screen.getByRole("button"));
    expect(cart()).toEqual([{ slug: "conflictology", title: "Конфликтология", priceByn: 100, qty: 2 }]);
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole("button", { name: "В корзину" })).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("is empty until something is added, then lists, totals, changes and clears it", async () => {
    const user = userEvent.setup();
    render(<><HeaderActions /><CartList /></>);
    expect(screen.getByText("Корзина пуста.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Корзина" })).toBeInTheDocument();

    act(() =>
      writeStore("mediatorok.cart", [
        { slug: "conflictology", title: "Конфликтология", priceByn: 1200, qty: 1 },
        { slug: "club", title: "Клуб", qty: 1 },
      ]),
    );
    expect(screen.getByRole("link", { name: "Корзина: 2" })).toBeInTheDocument();
    expect(screen.getByText("Цена уточняется")).toBeInTheDocument();
    expect(screen.getByText(/итог неполный/)).toBeInTheDocument();
    expect(screen.getByText(/1\s200 BYN/, { selector: "p.text-2xl" })).toBeInTheDocument();

    const qty = screen.getByLabelText("Количество: Конфликтология");
    // Clearing the field puts it back to 1 at once; a quantity is replaced by selecting it.
    await user.clear(qty);
    expect(qty).toHaveValue(1);
    await user.tripleClick(qty);
    await user.keyboard("3");
    expect(cart().find((l) => l.slug === "conflictology")?.qty).toBe(3);

    await user.click(screen.getByRole("button", { name: "Убрать «Клуб» из корзины" }));
    expect(screen.queryByText("Клуб")).not.toBeInTheDocument();
    expect(screen.queryByText(/итог неполный/)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Очистить корзину" }));
    expect(screen.getByText("Корзина пуста.")).toBeInTheDocument();
  });

  it("drops a line whose quantity is set to zero", async () => {
    const { result } = await import("./renderHook").then((m) => m.renderUseCart());
    act(() => result.current.add({ slug: "a", title: "A" }));
    act(() => result.current.setQty("a", 0));
    expect(result.current.lines).toEqual([]);
  });
});

describe("checkout", () => {
  const order = [{ slug: "conflictology", title: "Конфликтология", priceByn: 100, qty: 2 }];

  it("is not shown for an empty cart", () => {
    const { container } = render(<Checkout />);
    expect(container).toBeEmptyDOMElement();
  });

  it("explains that online payment is not connected, and validates the contacts", async () => {
    writeStore("mediatorok.cart", order);
    const user = userEvent.setup();
    render(<Checkout />);
    expect(screen.getByText(/Онлайн-оплата на сайте пока не подключена/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Отправить заявку" }));
    expect(screen.getByText("Укажите имя")).toBeInTheDocument();
    expect(screen.getByText("Укажите email или телефон, чтобы мы могли ответить")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Email"), "nope");
    await user.type(screen.getByLabelText("Телефон"), "1");
    await user.click(screen.getByRole("button", { name: "Отправить заявку" }));
    expect(screen.getByText("Проверьте адрес электронной почты")).toBeInTheDocument();
    expect(screen.getByText("Проверьте номер телефона")).toBeInTheDocument();
  });

  it("sends the order with its total and empties the cart", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", "https://forms.example");
    vi.stubEnv("NEXT_PUBLIC_PAYMENT_ENDPOINT", "https://pay.example");
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    writeStore("mediatorok.cart", order);
    const user = userEvent.setup();
    render(<Checkout />);
    expect(screen.queryByText(/Онлайн-оплата/)).not.toBeInTheDocument();
    await user.type(screen.getByLabelText("Имя"), "Анна");
    await user.type(screen.getByLabelText("Email"), "a@b.by");
    await user.click(screen.getByRole("button", { name: "Отправить заявку" }));
    const body = JSON.parse(String(fetch.mock.calls[0][1]?.body));
    expect(body.data).toMatchObject({ order: "Конфликтология × 2", orderTotalByn: "200" });
    expect(cart()).toEqual([]);
  });

  it("marks a partial total and reports a failure or a missing transport", async () => {
    writeStore("mediatorok.cart", [...order, { slug: "club", title: "Клуб", qty: 1 }]);
    const user = userEvent.setup();
    const { unmount } = render(<Checkout />);
    await user.type(screen.getByLabelText("Имя"), "Анна");
    await user.type(screen.getByLabelText("Телефон"), "+375291234567");
    await user.click(screen.getByRole("button", { name: "Отправить заявку" }));
    expect(await screen.findByText(/Оформление пока не подключено/)).toBeInTheDocument();
    unmount();

    vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", "https://forms.example");
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 500 }));
    render(<Checkout />);
    await user.type(screen.getByLabelText("Имя"), "Анна");
    await user.type(screen.getByLabelText("Телефон"), "+375291234567");
    await user.click(screen.getByRole("button", { name: "Отправить заявку" }));
    expect(await screen.findByText("Не удалось отправить заявку. Попробуйте ещё раз.")).toBeInTheDocument();
    expect(JSON.parse(String(fetch.mock.calls[0][1]?.body)).data.orderTotalByn).toBe("200+ (неполный)");
  });
});

describe("favourites", () => {
  const doc = searchIndex.find((d) => d.description)!;

  it("saves and unsaves, and lists what was saved", async () => {
    const user = userEvent.setup();
    render(<><HeaderActions /><FavouriteButton slug={doc.slug} title={doc.title} /><FavouritesList /></>);
    expect(screen.getByText(/Здесь появятся программы/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: `Добавить «${doc.title}» в избранное` }));
    expect(screen.getByRole("link", { name: "Избранное: 1" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: doc.title })).toBeInTheDocument();
    expect(screen.getByText(doc.description)).toBeInTheDocument();

    const remove = screen.getAllByRole("button", { name: `Убрать «${doc.title}» из избранного` });
    expect(remove[0]).toHaveAttribute("aria-pressed", "true");
    await user.click(remove[0]);
    expect(screen.getByText(/Здесь появятся программы/)).toBeInTheDocument();
  });

  it("ignores saved pages that no longer exist", () => {
    writeStore("mediatorok.favourites", ["gone"]);
    render(<FavouritesList />);
    expect(screen.getByText(/Здесь появятся программы/)).toBeInTheDocument();
  });

  it("lists a page without a description", () => {
    const bare = searchIndex.find((d) => !d.description);
    if (!bare) return;
    writeStore("mediatorok.favourites", [bare.slug]);
    render(<FavouritesList />);
    expect(screen.getByRole("heading", { name: bare.title })).toBeInTheDocument();
  });
});

describe("Button", () => {
  it("is a link when it has a destination, a button otherwise", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <>
        <Button href="/trainers" variant="secondary" size="lg">Тренеры</Button>
        <Button onClick={onClick} variant="ghost" size="sm">Нажми</Button>
        <Button disabled type="submit" variant="silver">Отправить</Button>
      </>,
    );
    expect(screen.getByRole("link", { name: "Тренеры" })).toHaveAttribute("href", "/trainers");
    await user.click(screen.getByRole("button", { name: "Нажми" }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Отправить" })).toBeDisabled();
  });
});

describe("EventDetails", () => {
  it("shows the description, programme groups and the speaker, photo or initials", () => {
    const { rerender } = render(
      <EventDetails
        description={["Первый абзац"]}
        groups={[{ heading: "День 1", items: ["Открытие"] }]}
        speaker={{ name: "Оксана Шульга", role: "Ведущая", initials: "ОШ", photo: "/images/experts/shulga.jpg" }}
      />,
    );
    expect(screen.getByText("Первый абзац")).toBeInTheDocument();
    expect(screen.getByText("Открытие")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Оксана Шульга" })).toBeInTheDocument();
    rerender(<EventDetails speaker={{ name: "Оксана Шульга", role: "Ведущая", initials: "ОШ", photo: null }} />);
    expect(screen.getByText("ОШ")).toBeInTheDocument();
  });
});
