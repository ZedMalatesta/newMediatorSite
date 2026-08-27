"use client";

import Link from "next/link";
import { EventSignupProps } from "./types";
import { useFormSubmit } from "@/app/hooks/useFormSubmit";

export function EventSignup({
  title = "Заполните заявку",
  subtitle = "Мы свяжемся с вами и ответим на все вопросы.",
  submitLabel = "Отправить заявку",
}: EventSignupProps) {
  const { state, errors, message, handleSubmit } = useFormSubmit("registration");
  const busy = state === "submitting";

  const field =
    "w-full bg-slate-700 border rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-accent-400 transition-colors";
  const ok = "border-slate-600";
  const bad = "border-red-400";

  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">Записаться</p>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-slate-400">{subtitle}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20">
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="signup-name" className="sr-only">Ваше имя</label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  placeholder="Ваше имя"
                  aria-invalid={Boolean(errors.name)}
                  className={`${field} ${errors.name ? bad : ok}`}
                />
                {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="signup-email" className="sr-only">Ваш email</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="Ваш Email"
                  aria-invalid={Boolean(errors.email)}
                  className={`${field} ${errors.email ? bad : ok}`}
                />
                {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="signup-phone" className="sr-only">Ваш телефон</label>
              <input
                id="signup-phone"
                name="phone"
                type="tel"
                placeholder="Ваш телефон"
                aria-invalid={Boolean(errors.phone)}
                className={`${field} ${errors.phone ? bad : ok}`}
              />
              {errors.phone && <p className="text-red-300 text-xs mt-1">{errors.phone}</p>}
            </div>
            {errors.contact && <p className="text-red-300 text-xs">{errors.contact}</p>}

            <div>
              <label htmlFor="signup-comment" className="sr-only">Ваш вопрос или комментарий</label>
              <textarea
                id="signup-comment"
                name="comment"
                placeholder="Ваш вопрос или комментарий (необязательно)"
                rows={3}
                className={`${field} ${ok} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-accent-500 text-white py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? "Отправляем…" : submitLabel}
            </button>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`text-sm text-center ${state === "success" ? "text-green-300" : "text-red-300"}`}
              >
                {message}
              </p>
            )}

            <p className="text-slate-500 text-xs text-center">
              Отправляя данную форму, вы соглашаетесь с{" "}
              <Link href="/politicaobrabotkidannyh" className="text-accent-400 hover:underline">
                политикой обработки персональных данных
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
