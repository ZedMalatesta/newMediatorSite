"use client";

import Link from "next/link";
import { useState } from "react";
import {
  authConfigured,
  submitAuth,
  writeProfile,
  AuthNotConfiguredError,
  type AuthMode,
} from "@lib/auth";
import { validateContactFields } from "@lib/validateForm";
import { site } from "@lib/site";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const configured = authConfigured();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(
      Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)]),
    ) as Record<string, string>;

    const found: Record<string, string> = {};
    if (mode === "register") Object.assign(found, validateContactFields(data));
    if (!data.email?.trim()) found.email = "Укажите email";
    if (!data.password || data.password.length < 8)
      found.password = "Пароль должен быть не короче 8 символов";

    setErrors(found);
    if (Object.keys(found).length) {
      setState("error");
      setMessage("Проверьте, пожалуйста, заполненные поля.");
      return;
    }

    setState("busy");
    try {
      const profile = await submitAuth(mode, data);
      writeProfile(profile);
      setState("done");
      setMessage(mode === "login" ? "Вы вошли в аккаунт." : "Аккаунт создан.");
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof AuthNotConfiguredError
          ? "Личный кабинет ещё не подключён."
          : "Не удалось выполнить вход. Попробуйте ещё раз.",
      );
    }
  };

  const field =
    "w-full border rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-accent-400 transition-colors";

  return (
    <div className="max-w-md">
      {!configured && (
        <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-900 mb-1">
            Личный кабинет пока не подключён
          </h2>
          <p className="text-amber-800 text-sm leading-relaxed">
            Регистрация и вход появятся позже. Сейчас записаться на программу
            можно через форму заявки, в{" "}
            <a href={site.telegram} className="underline font-semibold">
              Telegram
            </a>{" "}
            или по почте{" "}
            <a href={`mailto:${site.email}`} className="underline font-semibold">
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="flex gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl w-fit mb-6">
        {(["login", "register"] as AuthMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setErrors({});
              setState("idle");
              setMessage("");
            }}
            aria-pressed={mode === m}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === m
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {m === "login" ? "Вход" : "Регистрация"}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {mode === "register" && (
          <div>
            <label htmlFor="acc-name" className="block text-sm font-medium text-slate-700 mb-1">
              Имя
            </label>
            <input id="acc-name" name="name" type="text" autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              className={`${field} ${errors.name ? "border-red-400" : "border-slate-300"}`} />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>
        )}

        <div>
          <label htmlFor="acc-email" className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input id="acc-email" name="email" type="email" autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={`${field} ${errors.email ? "border-red-400" : "border-slate-300"}`} />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="acc-password" className="block text-sm font-medium text-slate-700 mb-1">
            Пароль
          </label>
          <input id="acc-password" name="password" type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            aria-invalid={Boolean(errors.password)}
            className={`${field} ${errors.password ? "border-red-400" : "border-slate-300"}`} />
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={state === "busy" || !configured}
          className="w-full bg-accent-500 text-white py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === "busy"
            ? "Отправляем…"
            : mode === "login"
              ? "Войти"
              : "Зарегистрироваться"}
        </button>

        {message && (
          <p role="status" aria-live="polite"
            className={`text-sm ${state === "done" ? "text-green-700" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <p className="text-slate-500 text-xs">
          Продолжая, вы соглашаетесь с{" "}
          <Link href="/politicaobrabotkidannyh" className="text-accent-600 hover:underline">
            политикой обработки персональных данных
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
