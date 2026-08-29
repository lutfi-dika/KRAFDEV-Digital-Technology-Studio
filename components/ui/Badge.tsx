import type { ReactNode } from "react";

export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}) {
  const styles = {
    default: "border-border bg-surface text-foreground",
    accent: "border-accent/30 bg-accent/5 text-accent",
    muted: "border-border bg-transparent text-muted",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
