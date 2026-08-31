"use client";

import { useI18n } from "@/components/providers/I18nProvider";

const pillars = [
  { key: "pillar1", descKey: "pillar1Desc" },
  { key: "pillar2", descKey: "pillar2Desc" },
  { key: "pillar3", descKey: "pillar3Desc" },
] as const;

export default function TrustSection() {
  const { t } = useI18n();

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
          <h2 className="max-w-xl font-display text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("trust.title")}
          </h2>
          <p className="max-w-lg leading-relaxed text-secondary lg:ml-auto lg:text-lg">
            {t("trust.statement")}
          </p>
        </div>

        <div className="mt-16 grid border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-border">
          {pillars.map((p) => (
            <div
              key={p.key}
              className="border-b border-border py-8 pr-6 last:border-b-0 sm:border-b-0 sm:py-10 sm:pl-6 first:sm:pl-0"
            >
              <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-line" />
              <h3 className="mt-4 font-display text-xl font-medium text-foreground">
                {t(`trust.${p.key}`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`trust.${p.descKey}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}