import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  centered = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <header className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p
          className={`mt-6 mb-2 text-sm font-medium text-accent-strong ${
            centered ? "text-center" : ""
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className={`mt-5 max-w-2xl leading-relaxed text-secondary ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </header>
  );
}
