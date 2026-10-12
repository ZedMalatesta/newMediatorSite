"use client";

import { usePathname } from "next/navigation";
import { EventSignupProps } from "./types";
import SiteForm from "@ui/SiteForm";
import { contactFields } from "@lib/formFields";
import { pageForms } from "@lib/pageForms";

export function EventSignup({
  title = "Заполните заявку",
  subtitle = "Мы свяжемся с вами и ответим на все вопросы.",
  submitLabel = "Отправить заявку",
}: EventSignupProps) {
  // Where the live page has its own registration form, ask what it asks -
  // a course that needs to know the city or the format says so there.
  const page = usePathname().split("/").filter(Boolean).pop() ?? "";
  const live = pageForms[page]?.[0];

  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">Записаться</p>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-slate-400">{subtitle}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20">
          <SiteForm
            fields={live?.fields ?? contactFields}
            submitLabel={submitLabel}
            context={live?.title ?? title}
          />
        </div>
      </div>
    </section>
  );
}
