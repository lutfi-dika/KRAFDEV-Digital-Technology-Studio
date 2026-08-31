"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { ButtonLink } from "@/components/ui/Button";

const steps = ["1", "2", "3", "4"] as const;

const payments = ["1", "2", "3"] as const;

export default function HowToOrderSection() {
  const { t } = useI18n();

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl lg:ml-auto lg:pr-8">
          <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("howToOrder.title")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{t("howToOrder.subtitle")}</p>
        </div>

        {/* Blueprint timeline — numbering is valid here (sequential) */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-16">
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span
              aria-hidden
              className="absolute -top-1.5 right-0 left-0 hidden h-0 border-t-2 border-dashed border-line/40 lg:block"
            />
            {steps.map((s, i) => (
              <li key={s} className="relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-line bg-surface font-mono text-sm text-accent-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
                  {t(`howToOrder.step${s}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`howToOrder.step${s}Desc`)}
                </p>
              </li>
            ))}
          </ol>

          <aside>
            <h3 className="font-display text-xl font-medium tracking-tight text-foreground">
              {t("howToOrder.paymentTitle")}
            </h3>
            <p className="mt-2 max-w-xl leading-relaxed text-muted">
              {t("howToOrder.paymentDesc")}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {payments.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-line" />
                  <span className="font-medium text-foreground">
                    {t(`howToOrder.payment${p}Title`)}
                  </span>
                  <span className="text-muted">— {t(`howToOrder.payment${p}Desc`)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/order">
                {t("howToOrder.cta")} <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}