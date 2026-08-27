import { ButtonProps, ButtonVariant, ButtonSize } from "./types";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent-500 text-white hover:bg-accent-400",
  secondary: "bg-slate-800 text-white hover:bg-slate-700",
  silver: "bg-zinc-200 text-slate-800 hover:bg-zinc-300 border border-zinc-300",
  ghost: "text-slate-700 hover:text-accent-600 hover:bg-slate-50",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-colors";
  const classes = `${base} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
