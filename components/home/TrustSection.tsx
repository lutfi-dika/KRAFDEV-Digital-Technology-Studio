"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  { key: "pillar1", descKey: "pillar1Desc" },
  { key: "pillar2", descKey: "pillar2Desc" },
  { key: "pillar3", descKey: "pillar3Desc" },
] as const;

export default function TrustSection() {
  const { t } = useI18n();

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("trust.title")}
          </h2>
        </Reveal>

        <Reveal className="mt-6" delay={0.05}>
          <p className="mx-auto max-w-2xl text-pretty text-center leading-relaxed text-muted">
            {t("trust.statement")}
          </p>
        </Reveal>

        <Reveal className="mt-14" delay={0.1}>
          <div className="grid gap-10 divide-y divide-border sm:grid-cols-3 sm:gap-8 sm:divide-y-0 sm:divide-x">
            {pillars.map((p) => (
              <div key={p.key} className="text-center sm:px-6">
                <div className="text-lg font-semibold tracking-tight text-foreground">
                  {t(`trust.${p.key}`)}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`trust.${p.descKey}`)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
