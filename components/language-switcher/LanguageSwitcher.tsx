"use client";

import { useI18n, type Locale } from "@/components/providers/I18nProvider";

const options: { value: Locale; label: string }[] = [
  { value: "id", label: "🇮🇩 Indonesia" },
  { value: "en", label: "🇬🇧 English" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-0.5 rounded-lg p-0.5" role="radiogroup" aria-label="Language">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={locale === opt.value}
          onClick={() => setLocale(opt.value)}
          className={`rounded-md px-2 py-1 text-sm transition-colors ${
            locale === opt.value
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
