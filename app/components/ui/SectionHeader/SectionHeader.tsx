import { SectionHeaderProps } from "./types";

export function SectionHeader({ label, title, subtitle, align = "left", className = "" }: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "";

  return (
    <div className={`mb-10 ${alignClass} ${className}`}>
      {label && (
        <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-slate-600 text-base leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
