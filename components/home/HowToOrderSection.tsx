"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const steps = ["1", "2", "3", "4"] as const;

const payments = ["1", "2", "3"] as const;

export default function HowToOrderSection() {
  const { t } = useI18n();

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("howToOrder.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("howToOrder.title")}
          </h2>
          <p className="mt-4 text-muted">{t("howToOrder.subtitle")}</p>
        </Reveal>

        {/* Steps — numbered sequence, not icon cards */}
        <div className="mt-14">
          <ol className="divide-y divide-border border-y border-border">
            {steps.map((s, i) => (
              <li key={s}>
                <Reveal delay={i * 0.04}>
                  <div className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                    <span className="font-mono text-sm text-muted tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {t(`howToOrder.step${s}Title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {t(`howToOrder.step${s}Desc`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Payment — minimal note */}
        <Reveal className="mt-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {t("howToOrder.paymentTitle")}
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">
                {t("howToOrder.paymentDesc")}
              </p>
            </div>
            <div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                {payments.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    <span className="font-medium text-foreground">
                      {t(`howToOrder.payment${p}Title`)}
                    </span>
                    <span className="hidden sm:inline">— {t(`howToOrder.payment${p}Desc`)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="/order">
                  {t("howToOrder.cta")} <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
