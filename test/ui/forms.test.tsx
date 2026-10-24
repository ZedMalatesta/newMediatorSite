import { act, fireEvent, render, renderHook, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import SiteForm from "@ui/SiteForm";
import SignupCta from "@ui/SignupCta";
import { field } from "@lib/formFields";
import { useFormSubmit } from "@/app/hooks/useFormSubmit";
import type { LiveFormField } from "@lib/pageForms";
import { navigation } from "../navigation";

afterEach(() => vi.unstubAllEnvs());

const fields: LiveFormField[] = [
  field.name(),
  field.email("Email", true),
  field.phone(),
  { key: "format", kind: "choice", label: "Формат", required: true, options: ["Очно", "Онлайн"] },
  { key: "topics", kind: "multi", label: "Темы", required: false, options: ["Семья", "Бизнес", "Школа"] },
  { key: "service", kind: "choice", label: "Какие услуги Вас интересуют?", required: false },
  field.comment(),
];

const ok = () => vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));

describe("SiteForm", () => {
  it("renders each kind of field from its definition", () => {
    render(<SiteForm fields={fields} theme="light" />);
    expect(screen.getByLabelText("Ваше имя")).toHaveAttribute("autocomplete", "name");
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Ваш телефон")).toHaveAttribute("type", "tel");
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getAllByRole("checkbox")).toHaveLength(4); // three topics and the consent
    // A choice the live site fills in at runtime has no options here: it is asked as text.
    expect(screen.getByLabelText("Какие услуги Вас интересуют?")).toHaveAttribute("autocomplete", "off");
    expect(screen.getByLabelText("Ваш вопрос или комментарий").tagName).toBe("TEXTAREA");
    expect(screen.getByRole("group", { name: "Формат *" })).toBeInTheDocument();
  });

  it("marks every problem next to its field and sends nothing", async () => {
    const fetch = ok();
    const user = userEvent.setup();
    render(<SiteForm fields={fields} />);
    await user.type(screen.getByLabelText("Ваш телефон"), "12");
    await user.click(screen.getByRole("button", { name: "Отправить" }));

    expect(screen.getAllByText("Заполните это поле")).toHaveLength(3); // name, email, format
    expect(screen.getByText("Проверьте номер телефона")).toBeInTheDocument();
    expect(screen.getByText("Подтвердите согласие на обработку данных")).toBeInTheDocument();
    expect(screen.getByLabelText("Ваше имя")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Проверьте, пожалуйста, заполненные поля.");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("asks for a way to reply when both contact fields are optional", async () => {
    const user = userEvent.setup();
    render(<SiteForm fields={[field.name(), field.email(), field.phone()]} />);
    await user.click(screen.getByRole("button", { name: "Отправить" }));
    expect(screen.getByText("Укажите email или телефон, чтобы мы могли ответить")).toBeInTheDocument();
  });

  it("sends every answer, all ticked options together, with what the form is for", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", "https://forms.example");
    const fetch = ok();
    const onSuccess = vi.fn();
    const user = userEvent.setup();
    navigation.pathname = "/school";
    render(<SiteForm fields={fields} context="Школа юного медиатора" submitLabel="Записаться" onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText("Ваше имя"), "Анна");
    await user.type(screen.getByLabelText("Email"), "anna@example.by");
    await user.click(screen.getByRole("radio", { name: "Онлайн" }));
    await user.click(screen.getByRole("checkbox", { name: "Семья" }));
    await user.click(screen.getByRole("checkbox", { name: "Школа" }));
    await user.click(screen.getByRole("checkbox", { name: /политикой обработки/ }));
    await user.click(screen.getByRole("button", { name: "Записаться" }));

    expect(await screen.findByText("Спасибо! Мы получили вашу заявку и свяжемся с вами.")).toBeInTheDocument();
    const { kind, data } = JSON.parse(String(fetch.mock.calls[0][1]?.body));
    expect(kind).toBe("registration");
    expect(data).toMatchObject({ name: "Анна", format: "Онлайн", topics: "Семья, Школа", form: "Школа юного медиатора" });
    expect(onSuccess).toHaveBeenCalled();
    expect(screen.getByLabelText("Ваше имя")).toHaveValue("");
  });

  const submitValid = async () => {
    const user = userEvent.setup();
    render(<SiteForm fields={[field.name(), field.email("Email", true)]} />);
    await user.type(screen.getByLabelText("Ваше имя"), "Анна");
    await user.type(screen.getByLabelText("Email"), "anna@example.by");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Отправить" }));
  };

  it("says plainly when the form is not connected to anything yet", async () => {
    await submitValid();
    expect(await screen.findByText(/Форма пока не подключена/)).toBeInTheDocument();
  });

  it("says plainly when sending failed", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", "https://forms.example");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 500 }));
    await submitValid();
    expect(await screen.findByText(/Не удалось отправить заявку/)).toBeInTheDocument();
  });

  it("shows that it is sending, and blocks a second submission meanwhile", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", "https://forms.example");
    let release!: (r: Response) => void;
    vi.spyOn(globalThis, "fetch").mockReturnValue(new Promise((r) => (release = r)));
    await submitValid();
    expect(screen.getByRole("button", { name: "Отправляем…" })).toBeDisabled();
    await act(async () => release(new Response(null, { status: 200 })));
    expect(screen.getByRole("button", { name: "Отправить" })).toBeEnabled();
  });
});

describe("useFormSubmit without field definitions", () => {
  it("asks for a name and one way to reply", async () => {
    const { result } = renderHook(() => useFormSubmit("lead"));
    const form = document.createElement("form");
    await act(async () => {
      await result.current.handleSubmit({ preventDefault() {}, currentTarget: form } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.errors).toMatchObject({ name: "Укажите имя" });
    expect(result.current.state).toBe("error");
  });
});

describe("SignupCta", () => {
  it("scrolls to the page's form where the live page has no popup", () => {
    navigation.pathname = "/family";
    render(<SignupCta label="Записаться" />);
    expect(screen.getByRole("link", { name: "Записаться" })).toHaveAttribute("href", "#signup");
  });

  it("opens the live page's own form in a dialog where it has one", async () => {
    const user = userEvent.setup();
    navigation.pathname = "/divorceservice";
    render(<SignupCta label="Записаться" />);
    await user.click(screen.getByRole("button", { name: "Бесплатная консультация по телефону" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("button", { name: /Получить|Отправить/ })).toBeInTheDocument();
    await user.click(within(dialog).getByRole("button", { name: "Закрыть" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("uses its own label when the live trigger has none, and the popup's text when there is one", async () => {
    const user = userEvent.setup();
    navigation.pathname = "/club";
    render(<SignupCta label="Вступить в клуб" />);
    await user.click(screen.getByRole("button", { name: "Вступить в клуб" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
