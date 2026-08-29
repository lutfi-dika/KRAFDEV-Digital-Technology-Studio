"use client";

import {
  Settings2,
  ClipboardCheck,
  FileCheck,
  MessageSquare,
  Landmark,
  Wallet,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const steps = [
  { icon: Settings2, key: "1" },
  { icon: ClipboardCheck, key: "2" },
  { icon: FileCheck, key: "3" },
  { icon: MessageSquare, key: "4" },
];

const payments = [
  { icon: Landmark, key: "1" },
  { icon: Wallet, key: "2" },
  { icon: CreditCard, key: "3" },
];

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

        {/* Steps */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.05}>
              <div className="relative h-full rounded-xl border border-border bg-background p-6">
                <span className="absolute right-5 top-5 text-3xl font-bold text-border/40">
                  0{i + 1}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-foreground">
                  {t(`howToOrder.step${s.key}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`howToOrder.step${s.key}Desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Payment */}
        <Reveal className="mt-16">
          <div className="rounded-2xl border border-border bg-background p-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  {t("howToOrder.paymentTitle")}
                </span>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {t("howToOrder.paymentTitle")}
                </h3>
                <p className="mt-3 text-muted">{t("howToOrder.paymentDesc")}</p>
                <ButtonLink href="/order" className="mt-6">
                  {t("howToOrder.cta")} <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
              <div className="space-y-3">
                {payments.map((p) => (
                  <div
                    key={p.key}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t(`howToOrder.payment${p.key}Title`)}
                      </p>
                      <p className="text-xs text-muted">
                        {t(`howToOrder.payment${p.key}Desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
