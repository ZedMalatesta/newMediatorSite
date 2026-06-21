"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { trainers, type Trainer } from "./trainers-data";

function Avatar({
  photo,
  name,
  initials,
  size = "sm",
}: {
  photo: string | null;
  name: string;
  initials: string;
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? "w-28 h-28 md:w-36 md:h-36 text-2xl" : "w-16 h-16 text-lg";
  return (
    <div className={`relative rounded-2xl overflow-hidden border-2 border-amber-200 shadow flex-shrink-0 ${dim}`}>
      {photo ? (
        <Image src={photo} alt={name} fill className="object-cover object-top" sizes={size === "lg" ? "144px" : "64px"} />
      ) : (
        <div className="w-full h-full bg-zinc-200 flex items-center justify-center font-bold text-slate-600">
          {initials}
        </div>
      )}
    </div>
  );
}

function TrainerModal({ trainer, onClose }: { trainer: Trainer; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-3xl md:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Резюме тренера</span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600 font-bold text-lg leading-none"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Identity */}
          <div className="flex items-start gap-5">
            <Avatar photo={trainer.photo} name={trainer.name} initials={trainer.initials} size="lg" />
            <div className="min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{trainer.name}</h2>
              <p className="text-amber-600 font-semibold text-sm mt-1 leading-snug">{trainer.role}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {trainer.tags.map((t) => (
                  <span key={t} className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          <section>
            <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">О специалисте</h3>
            <ul className="space-y-2">
              {trainer.bio.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                  {b}
                </li>
              ))}
            </ul>
          </section>

          {/* Achievements */}
          {trainer.achievements && trainer.achievements.length > 0 && (
            <section>
              <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Достижения</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {trainer.achievements.map((a) => (
                  <div key={a} className="bg-slate-50 rounded-xl px-4 py-3 text-slate-700 text-sm font-medium border border-slate-100">
                    {a}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Specializations */}
          {(trainer.psychologySpec || trainer.mediationSpec) && (
            <section>
              <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Специализация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainer.psychologySpec && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-2">Психология и психотерапия</p>
                    <ul className="space-y-1">
                      {trainer.psychologySpec.map((s) => (
                        <li key={s} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0 mt-2" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {trainer.mediationSpec && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-2">Медиация</p>
                    <ul className="space-y-1">
                      {trainer.mediationSpec.map((s) => (
                        <li key={s} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber-300 flex-shrink-0 mt-2" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Education */}
          {trainer.education.length > 0 && (
            <section>
              <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Образование и повышение квалификации</h3>
              <ul className="space-y-1.5">
                {trainer.education.map((e, i) => (
                  <li key={i} className="text-slate-500 text-sm leading-relaxed pl-3 border-l-2 border-amber-200">
                    {e}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Contacts */}
          {trainer.contacts.length > 0 && (
            <section className="border-t border-slate-100 pt-5">
              <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Контакты</h3>
              <div className="flex flex-wrap gap-3">
                {trainer.contacts.map((c) => (
                  <div key={c.label} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                    <span className="text-slate-400 text-xs">{c.label}:</span>
                    {c.href ? (
                      <a href={c.href} className="text-sm font-medium text-slate-800 hover:text-amber-600 transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-slate-800">{c.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrainersGrid() {
  const [selected, setSelected] = useState<Trainer | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {trainers.map((t) => (
          <button
            key={t.name}
            onClick={() => setSelected(t)}
            className="group bg-white rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all p-5 text-left flex flex-col items-center gap-4 cursor-pointer"
          >
            <Avatar photo={t.photo} name={t.name} initials={t.initials} />
            <div className="text-center min-w-0">
              <p className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-700 transition-colors">
                {t.name}
              </p>
              <p className="text-slate-500 text-xs mt-1 leading-snug line-clamp-2">{t.role}</p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              {t.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-100 font-medium">
                  {tag}
                </span>
              ))}
              {t.tags.length > 2 && (
                <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium">
                  +{t.tags.length - 2}
                </span>
              )}
            </div>
            <span className="mt-auto text-xs text-amber-600 font-semibold group-hover:underline">
              Подробнее →
            </span>
          </button>
        ))}
      </div>

      {selected && <TrainerModal trainer={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
