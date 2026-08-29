"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { key: "projectsCompleted" as const, value: 120 },
  { key: "clients" as const, value: 85 },
  { key: "technologies" as const, value: 15 },
  { key: "yearsExperience" as const, value: 8 },
];

function format(n: number) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(n);
}

export default function TrustSection() {
  const { t } = useI18n();
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("trust.title")}
          </h2>
        </Reveal>
        <Reveal className="mt-12" delay={0.1}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.key} className="bg-surface px-6 py-8 text-center">
                <div className="text-3xl font-bold text-foreground sm:text-4xl">
                  {format(s.value)}+
                </div>
                <div className="mt-2 text-sm text-muted">{t(`trust.${s.key}`)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
