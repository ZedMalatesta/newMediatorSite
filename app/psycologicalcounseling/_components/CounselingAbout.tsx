import Image from "next/image";
import { blockByHeading } from "@lib/blockQuery";
import { cleanCopy } from "@lib/copyFilters";

export default function CounselingAbout() {
  const block = blockByHeading("psycologicalcounseling", "Услуги психологического");
  if (!block) return null;
  const image = block.images[0];

  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-5 md:items-center">
        <div className="md:col-span-3">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Об услуге
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {block.heading}
          </h2>
          {cleanCopy(block.paragraphs).map((p) => (
            <p key={p} className="text-slate-600 text-base leading-relaxed mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </div>

        {/* The drawing sits in the middle third of a tall white canvas (36-71%
            down), so the frame is set to that band: what is cut is only empty
            margin, and the drawing is shown at a readable size. */}
        {image && (
          <div className="md:col-span-2 relative w-full aspect-video">
            <Image
              src={image.src}
              alt=""
              fill
              className="object-cover object-[50%_56%]"
              sizes="(max-width: 768px) 100vw, 460px"
            />
          </div>
        )}
      </div>
    </section>
  );
}
