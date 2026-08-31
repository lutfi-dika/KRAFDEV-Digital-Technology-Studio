"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

const emptySubscribe = () => () => {};

function getMountedSnapshot() {
  return typeof window !== "undefined";
}

function getMountedServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getMountedSnapshot,
    getMountedServerSnapshot,
  );

  const cycles: Record<string, string> = {
    light: "System",
    system: "Dark",
    dark: "Light",
  };

  const Icon = !mounted
    ? null
    : theme === "dark"
      ? Moon
      : theme === "light"
        ? Sun
        : Monitor;
  const label = !mounted ? "" : cycles[theme ?? "system"];

  return (
    <button
      type="button"
      onClick={() => mounted && setTheme(cycles[theme ?? "system"].toLowerCase())}
      className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
      aria-label={`Toggle theme to ${label}`}
      title={`Theme: ${label || "..."}`}
    >
      {Icon ? <Icon className="h-[18px] w-[18px]" /> : <span className="h-[18px] w-[18px]" />}
    </button>
  );
}
