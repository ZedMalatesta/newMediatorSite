"use client";

import SiteForm from "@ui/SiteForm";
import { field, liveFields } from "@lib/formFields";
import { officeAddress, organizers } from "./intensive-data";

export default function IntensiveSignup() {
  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Регистрация
          </p>
          <h2 className="text-3xl font-bold mb-2">Зарегистрироваться на интенсив</h2>
          <p className="text-slate-400">
            Заполните форму — мы свяжемся с вами и поможем выбрать формат участия.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20">
          <SiteForm
            fields={liveFields("summerintensive2026") ?? [field.name(), field.email(), field.phone()]}
            kind="registration"
            submitLabel="Зарегистрироваться"
            context="Летний интенсив медиаторов 2026"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {organizers.map((o) => (
            <a
              key={o.name}
              href={o.href}
              className="flex items-center justify-between gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 hover:border-accent-400 transition-colors"
            >
              <span className="text-slate-300 text-sm">{o.name}</span>
              <span className="text-accent-400 text-sm font-semibold whitespace-nowrap">{o.phone}</span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-slate-500 text-sm text-center">{officeAddress}</p>
      </div>
    </section>
  );
}
