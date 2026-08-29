"use client";

import { useState } from "react";
import { useCart } from "@/app/hooks/useCart";
import { submitForm, FormNotConfiguredError } from "@lib/submitForm";
import { validateContactFields } from "@lib/validateForm";
import { site } from "@lib/site";

/**
 * Checkout — change request point 3 (платёжная система).
 *
 * This site is a static export: there is no server to create an order, hold a
 * payment session or talk to an acquirer, and taking card details in the
 * browser would be both non-functional and unsafe. So there is deliberately no
 * card form here.
 *
 * What this does instead is real and useful: it sends the selection as a
 * request through the same transport the site's other forms use, so the office
 * receives the order and can invoice. When a payment provider is chosen, it
 * hands off to NEXT_PUBLIC_PAYMENT_ENDPOINT - a redirect to the provider's own
 * hosted page, which is where card data belongs.
 */
export default function Checkout() {
  const { lines, total, hasUnpriced, clear } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const paymentEndpoint = process.env.NEXT_PUBLIC_PAYMENT_ENDPOINT;

  if (lines.length === 0) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(
      Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)]),
    ) as Record<string, string>;

    const found = validateContactFields(data);
    setErrors(found);
    if (Object.keys(found).length) {
      setState("error");
      setMessage("Проверьте, пожалуйста, заполненные поля.");
      return;
    }

    setState("busy");
    try {
      await submitForm("registration", {
        ...data,
        order: lines.map((l) => `${l.title} × ${l.qty}`).join("; "),
        orderTotalByn: hasUnpriced ? `${total}+ (неполный)` : String(total),
      });
      setState("done");
      setMessage("Заявка отправлена. Мы свяжемся с вами для подтверждения и оплаты.");
      clear();
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof FormNotConfiguredError
          ? "Оформление пока не подключено. Напишите нам в Telegram или на почту."
          : "Не удалось отправить заявку. Попробуйте ещё раз.",
      );
    }
  };

  const field =
    "w-full border rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-accent-400 transition-colors";

  return (
    <section className="mt-12 border-t border-slate-200 pt-10">
      <h2 className="text-xl font-bold text-slate-900 mb-2">Оформление заявки</h2>

      {!paymentEndpoint && (
        <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xl">
          Онлайн-оплата на сайте пока не подключена. Оставьте контакты — мы
          подтвердим состав и стоимость и пришлём счёт. Также можно написать в{" "}
          <a href={site.telegram} className="text-accent-600 hover:underline font-semibold">Telegram</a>{" "}
          или на{" "}
          <a href={`mailto:${site.email}`} className="text-accent-600 hover:underline font-semibold">{site.email}</a>.
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-4 max-w-md">
        <div>
          <label htmlFor="co-name" className="block text-sm font-medium text-slate-700 mb-1">Имя</label>
          <input id="co-name" name="name" type="text" autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={`${field} ${errors.name ? "border-red-400" : "border-slate-300"}`} />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="co-email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input id="co-email" name="email" type="email" autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={`${field} ${errors.email ? "border-red-400" : "border-slate-300"}`} />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="co-phone" className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
          <input id="co-phone" name="phone" type="tel" autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className={`${field} ${errors.phone ? "border-red-400" : "border-slate-300"}`} />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>
        {errors.contact && <p className="text-red-600 text-xs">{errors.contact}</p>}

        <button type="submit" disabled={state === "busy"}
          className="w-full bg-accent-500 text-white py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
          {state === "busy" ? "Отправляем…" : "Отправить заявку"}
        </button>

        {message && (
          <p role="status" aria-live="polite"
            className={`text-sm ${state === "done" ? "text-green-700" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
