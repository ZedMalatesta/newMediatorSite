import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import AuthForm from "@/app/account/_components/AuthForm";
import AccountMenu from "@layout/AccountMenu/AccountMenu";
import { readProfile, writeProfile } from "@lib/auth";

afterEach(() => vi.unstubAllEnvs());

describe("AccountMenu", () => {
  it("offers sign-in when nobody is remembered", () => {
    render(<AccountMenu />);
    expect(screen.getByRole("link", { name: "Вход" })).toHaveAttribute("href", "/account");
  });

  it("shows the remembered name, or the email when there is none, and signs out", async () => {
    const user = userEvent.setup();
    act(() => writeProfile({ name: "  ", email: "anna@example.by" }));
    render(<AccountMenu />);
    expect(screen.getByTitle("anna@example.by")).toHaveTextContent("A");
    act(() => writeProfile({ name: "Анна", email: "anna@example.by" }));
    expect(screen.getByTitle("Анна")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Выйти" }));
    expect(screen.getByRole("link", { name: "Вход" })).toBeInTheDocument();
  });
});

describe("AuthForm", () => {
  const fill = async (user: ReturnType<typeof userEvent.setup>, values: Record<string, string>) => {
    for (const [label, value] of Object.entries(values)) await user.type(screen.getByLabelText(label), value);
  };

  it("says the account area is not connected yet and does not submit", () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_ENDPOINT", "");
    render(<AuthForm />);
    expect(screen.getByText("Личный кабинет пока не подключён")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Войти" })).toBeDisabled();
  });

  it("explains, rather than fails silently, if it is submitted anyway", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_ENDPOINT", "");
    const { container } = render(<AuthForm />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@b.by" } });
    fireEvent.change(screen.getByLabelText("Пароль"), { target: { value: "long-enough" } });
    await act(async () => {
      fireEvent.submit(container.querySelector("form")!);
    });
    expect(screen.getByRole("status")).toHaveTextContent("Личный кабинет ещё не подключён.");
  });

  it("checks the email and password before sending anything", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_ENDPOINT", "https://auth.example");
    const fetch = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    render(<AuthForm />);
    await fill(user, { Пароль: "short" });
    await user.click(screen.getByRole("button", { name: "Войти" }));
    expect(screen.getByText("Укажите email")).toBeInTheDocument();
    expect(screen.getByText("Пароль должен быть не короче 8 символов")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("signs in and remembers the profile", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_ENDPOINT", "https://auth.example");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ name: "Анна", email: "a@b.by" }));
    const user = userEvent.setup();
    render(<AuthForm />);
    await fill(user, { Email: "a@b.by", Пароль: "long-enough" });
    await user.click(screen.getByRole("button", { name: "Войти" }));
    expect(await screen.findByText("Вы вошли в аккаунт.")).toBeInTheDocument();
    expect(readProfile()).toEqual({ name: "Анна", email: "a@b.by" });
  });

  it("registers with a name, and validates it", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_ENDPOINT", "https://auth.example");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({}));
    const user = userEvent.setup();
    render(<AuthForm />);
    await user.click(screen.getByRole("button", { name: "Регистрация" }));
    expect(screen.getByRole("button", { name: "Регистрация" })).toHaveAttribute("aria-pressed", "true");
    await fill(user, { Email: "a@b.by", Пароль: "long-enough" });
    await user.click(screen.getByRole("button", { name: "Зарегистрироваться" }));
    expect(screen.getByText("Укажите имя")).toBeInTheDocument();
    await fill(user, { Имя: "Анна" });
    await user.click(screen.getByRole("button", { name: "Зарегистрироваться" }));
    expect(await screen.findByText("Аккаунт создан.")).toBeInTheDocument();
  });

  it("reports a failed sign-in", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_ENDPOINT", "https://auth.example");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 401 }));
    const user = userEvent.setup();
    render(<AuthForm />);
    await fill(user, { Email: "a@b.by", Пароль: "long-enough" });
    await user.click(screen.getByRole("button", { name: "Войти" }));
    expect(await screen.findByText("Не удалось выполнить вход. Попробуйте ещё раз.")).toBeInTheDocument();
  });
});
