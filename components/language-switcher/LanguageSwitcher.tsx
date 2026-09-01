"use client";

import { useEffect, useState } from "react";
import { useI18n, type Locale } from "@/components/providers/I18nProvider";

const options: { value: Locale; label: string }[] = [
  { value: "id", label: "🇮🇩 Indonesia" },
  { value: "en", label: "🇬🇧 English" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeLocale = mounted ? locale : "id";

  return (
    <div
      className="flex items-center gap-0.5 rounded-full p-0.5"
      role="radiogroup"
      aria-label="Language"
      suppressHydrationWarning
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={activeLocale === opt.value}
          onClick={() => setLocale(opt.value)}
          className={`rounded-full px-2 py-1 text-sm transition-colors ${
            activeLocale === opt.value
              ? "bg-surface text-foreground"
              : "text-muted hover:text-foreground"
          }`}
          title={opt.label}
        >
          {opt.value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
