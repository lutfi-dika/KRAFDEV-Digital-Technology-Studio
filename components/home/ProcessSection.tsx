"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const steps = ["1", "2", "3", "4"] as const;

export default function ProcessSection() {
  const { t } = useI18n();

  return (
    <section id="process" className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent-strong">{t("home.processEyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-4xl">
            {t("home.processTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{t("home.processSubtitle")}</p>
        </div>

        <div className="relative mt-16">
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-[19px] hidden h-px border-t border-dashed border-border lg:block"
            />
            {steps.map((s, i) => (
              <li key={s} className="relative">
                <Reveal delay={i * 0.06}>
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background font-medium text-accent-strong tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-foreground">
                    {t(`home.process${s}`)}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                    {t(`home.process${s}Desc`)}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16">
          <ButtonLink href="/order">
            {t("nav.startProject")}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}