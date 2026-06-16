export const FONT_SIZE = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
} as const;

export const FONT_WEIGHT = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export const TRACKING = {
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
} as const;

export const LEADING = {
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
} as const;

export const TYPE_SCALE = {
  label: `text-sm font-semibold uppercase tracking-widest`,
  h1: `text-4xl md:text-5xl font-bold leading-tight`,
  h2: `text-3xl md:text-4xl font-bold`,
  h3: `text-xl font-bold`,
  h4: `text-base font-bold`,
  body: `text-base leading-relaxed`,
  bodySmall: `text-sm leading-relaxed`,
  caption: `text-xs leading-relaxed`,
} as const;
