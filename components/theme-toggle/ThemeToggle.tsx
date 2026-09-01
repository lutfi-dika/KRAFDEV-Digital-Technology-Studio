"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycles: Record<string, string> = {
    light: "System",
    system: "Dark",
    dark: "Light",
  };

  const safeTheme = theme ?? "system";
  const label = mounted ? cycles[safeTheme] : "System";
  const Icon = mounted
    ? safeTheme === "dark"
      ? Moon
      : safeTheme === "light"
        ? Sun
        : Monitor
    : Monitor;

  const handleToggle = () => {
    if (!mounted) return;
    setTheme(cycles[safeTheme].toLowerCase());
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
      aria-label={`Toggle theme to ${label}`}
      title={`Theme: ${label}`}
      suppressHydrationWarning
    >
      <Icon className="h-[18px] w-[18px]" />
    </button>
  );
}
