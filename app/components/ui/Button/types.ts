export type ButtonVariant = "primary" | "secondary" | "silver" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
