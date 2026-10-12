"use client";

import Link from "next/link";
import { useId } from "react";
import { useFormSubmit } from "@/app/hooks/useFormSubmit";
import type { FormKind } from "@lib/submitForm";
import type { LiveFormField } from "@lib/pageForms";

type Theme = "dark" | "light";

type Props = {
  fields: LiveFormField[];
  kind?: FormKind;
  submitLabel?: string;
  theme?: Theme;
  /** What the form is for - sent with the submission so enquiries can be told apart. */
  context?: string;
  onSuccess?: () => void;
};

const STYLE: Record<Theme, { field: string; ok: string; text: string; muted: string; error: string; success: string; link: string }> = {
  dark: {
    field: "w-full bg-slate-700 border rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-accent-400 transition-colors",
    ok: "border-slate-600",
    text: "text-slate-300",
    muted: "text-slate-400",
    error: "text-red-300",
    success: "text-green-300",
    link: "text-accent-400",
  },
  light: {
    field: "w-full bg-white border rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-accent-400 transition-colors",
    ok: "border-slate-300",
    text: "text-slate-700",
    muted: "text-slate-500",
    error: "text-red-600",
    success: "text-green-700",
    link: "text-accent-600",
  },
};

const INPUT_TYPE = { name: "text", text: "text", email: "email", phone: "tel" } as const;
const AUTOCOMPLETE = { name: "name", email: "email", phone: "tel", text: "off" } as const;

/**
 * One form, rendered from field definitions.
 *
 * Every form on the site used to be its own hand-rolled copy, and eleven of
 * them had inputs with no `name` and a submit handler that only called
 * preventDefault - they collected nothing. This is the single implementation:
 * the fields come either from the live site's own form for the page or from a
 * short local list, and validation, in-flight state, delivery and the outcome
 * message are the same everywhere.
 */
export default function SiteForm({
  fields,
  kind = "registration",
  submitLabel = "Отправить",
  theme = "dark",
  context,
  onSuccess,
}: Props) {
  const uid = useId();
  const { state, errors, message, handleSubmit } = useFormSubmit(kind, { fields, context, onSuccess });
  const s = STYLE[theme];
  const busy = state === "submitting";
  const mark = (f: LiveFormField) => `${f.label}${f.required ? " *" : ""}`;

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => {
          const id = `${uid}-${f.key}`;
          const error = errors[f.key];
          const border = error ? "border-red-400" : s.ok;
          const hasOptions = (f.kind === "choice" || f.kind === "multi") && f.options && f.options.length > 0;

          if (hasOptions) {
            return (
              <fieldset key={f.key} className="sm:col-span-2">
                <legend className={`text-sm font-semibold mb-2 ${s.text}`}>{mark(f)}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {f.options!.map((option) => (
                    <label key={option} className={`flex items-start gap-2.5 text-sm cursor-pointer ${s.text}`}>
                      <input
                        type={f.kind === "multi" ? "checkbox" : "radio"}
                        name={f.key}
                        value={option}
                        className="accent-accent-500 w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {error && <p className={`text-xs mt-1 ${s.error}`}>{error}</p>}
              </fieldset>
            );
          }

          if (f.kind === "textarea") {
            return (
              <div key={f.key} className="sm:col-span-2">
                <label htmlFor={id} className="sr-only">{f.label}</label>
                <textarea
                  id={id}
                  name={f.key}
                  rows={3}
                  placeholder={mark(f)}
                  aria-invalid={Boolean(error)}
                  className={`${s.field} ${border} resize-none`}
                />
                {error && <p className={`text-xs mt-1 ${s.error}`}>{error}</p>}
              </div>
            );
          }

          // A choice whose answers the live site loads at runtime has no options
          // in its markup, so it falls back to a free-text answer.
          const type = f.kind in INPUT_TYPE ? INPUT_TYPE[f.kind as keyof typeof INPUT_TYPE] : "text";
          const wide = !(f.kind in INPUT_TYPE);
          return (
            <div key={f.key} className={wide ? "sm:col-span-2" : ""}>
              <label htmlFor={id} className="sr-only">{f.label}</label>
              <input
                id={id}
                name={f.key}
                type={type}
                autoComplete={f.kind in AUTOCOMPLETE ? AUTOCOMPLETE[f.kind as keyof typeof AUTOCOMPLETE] : "off"}
                placeholder={mark(f)}
                aria-invalid={Boolean(error)}
                aria-required={f.required}
                className={`${s.field} ${border}`}
              />
              {error && <p className={`text-xs mt-1 ${s.error}`}>{error}</p>}
            </div>
          );
        })}
      </div>

      {errors.contact && <p className={`text-xs ${s.error}`}>{errors.contact}</p>}

      <div>
        <label className={`flex items-start gap-2.5 text-xs cursor-pointer ${s.muted}`}>
          <input
            type="checkbox"
            name="consent"
            value="yes"
            aria-invalid={Boolean(errors.consent)}
            className="accent-accent-500 w-4 h-4 mt-0.5 flex-shrink-0"
          />
          <span>
            Я соглашаюсь с{" "}
            <Link href="/politicaobrabotkidannyh" className={`${s.link} hover:underline`}>
              политикой обработки персональных данных
            </Link>
          </span>
        </label>
        {errors.consent && <p className={`text-xs mt-1 ${s.error}`}>{errors.consent}</p>}
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full bg-accent-500 text-white py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {busy ? "Отправляем…" : submitLabel}
      </button>

      {message && (
        <p role="status" aria-live="polite" className={`text-sm text-center ${state === "success" ? s.success : s.error}`}>
          {message}
        </p>
      )}
    </form>
  );
}
