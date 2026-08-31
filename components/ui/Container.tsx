import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const widths = {
    default: "max-w-6xl",
    wide: "max-w-7xl",
    narrow: "max-w-4xl",
  };
  return (
    <div className={`mx-auto w-full ${widths[size]} px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
