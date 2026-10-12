import Image from "next/image";
import SignupCta from "@ui/SignupCta";
import { blockByHeading, listInOrder } from "@lib/blockQuery";
import { pageCover } from "@lib/pageBlocks";
import { prices } from "./counseling-data";

const PAGE = "psycologicalcounseling";

export default function CounselingFormats() {
  const formats = blockByHeading(PAGE, "Форматы работы");
  const pricing = blockByHeading(PAGE, "Стоимость услуг");
  const labels = listInOrder(formats);
  // The live block illustrates each format in turn; its first picture is the
  // one the sync lifts out as the page's lead image.
  const pictures = [pageCover[PAGE], ...(formats?.images.map((i) => i.src) ?? [])].filter(Boolean);

  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
          Форматы
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
          {formats?.heading ?? "Форматы работы"}
        </h2>

        <div className="grid gap-6 sm:grid-cols-3 mb-16">
          {labels.map((label, i) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-100 bg-white overflow-hidden text-center"
            >
              {pictures[i] && (
                <div className="relative aspect-4/3">
                  <Image
                    src={pictures[i]}
                    alt=""
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 360px"
                  />
                </div>
              )}
              <p className="font-bold text-slate-900 text-sm px-5 pb-6 pt-2 first-letter:uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
          Стоимость
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
          {pricing?.heading ?? "Стоимость услуг"}
        </h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {prices.map((row) => (
            <div
              key={row.service}
              className="flex flex-col rounded-2xl border border-slate-200 p-6"
            >
              <p className="font-semibold text-slate-900 text-sm leading-snug mb-4 flex-1">
                {row.service}
              </p>
              <p className="text-2xl font-bold text-accent-700 mb-5">{row.price}</p>
              <SignupCta
                label="Оставить заявку"
                className="inline-block text-center border-2 border-accent-400 text-accent-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-50 transition-colors"
              />
            </div>
          ))}
        </div>

        {pricing?.paragraphs[0] && (
          <p className="text-slate-400 text-xs mt-5">{pricing.paragraphs[0]}</p>
        )}
      </div>
    </section>
  );
}
