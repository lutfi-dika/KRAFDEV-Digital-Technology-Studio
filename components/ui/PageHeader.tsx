import type { ReactNode } from "react";
import { Badge } from "./Badge";

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
        <Badge className={centered ? "justify-center" : ""}>{eyebrow}</Badge>
      )}
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className={`mt-4 leading-relaxed text-muted ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </header>
  );
}
