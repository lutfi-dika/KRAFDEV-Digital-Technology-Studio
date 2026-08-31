"use client";

import { Check } from "lucide-react";
import type { PricingTier } from "@/data/pricing";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/components/providers/I18nProvider";

export default function PricingCard({ tier }: { tier: PricingTier }) {
  const { t } = useI18n();
  function formatPrice(price: PricingTier["price"]) {
    if (price === "Custom") return t("common.custom");
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl border bg-surface ${
        tier.featured ? "border-accent-strong/60" : "border-border"
      }`}
    >
      {tier.featured && <div className="h-1.5 w-full bg-accent-deep" />}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-medium tracking-tight text-foreground">{tier.name}</h3>
          {tier.featured && (
            <span className="shrink-0 rounded-full bg-accent-deep px-3 py-1 font-mono text-[10px] font-medium text-accent-foreground">
              {t("common.mostPopular")}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{tier.description}</p>

        <ul className="mt-6 flex-1 space-y-2.5">
          {tier.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                <Check className="h-3 w-3 text-accent-strong" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-border pt-5">
          {tier.price !== "Custom" && (
            <p className="text-sm text-muted">{t("common.startingFrom")}</p>
          )}
          <p className="mt-1 font-display text-3xl font-medium tabular-nums tracking-tight text-foreground">
            {formatPrice(tier.price)}
          </p>
          {tier.price === "Custom" && (
            <p className="mt-1 text-sm text-muted">{tier.description}</p>
          )}
          <ButtonLink
            href="/order"
            variant={tier.featured ? "primary" : "outline"}
            className="mt-5 w-full"
          >
            {t("common.discuss")}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}