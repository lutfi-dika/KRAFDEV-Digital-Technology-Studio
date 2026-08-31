import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "onAccent";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98]";

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  sm: "px-4 py-2 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-deep text-accent-foreground hover:bg-accent-deep/90",
  outline:
    "border border-border bg-transparent text-foreground hover:border-accent-strong/50 hover:bg-accent/10 hover:text-accent-strong",
  ghost: "text-foreground hover:bg-accent/10 hover:text-accent-strong",
  onAccent:
    "bg-background text-foreground hover:bg-accent-strong hover:text-background",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
