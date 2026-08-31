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
      className={`relative flex flex-col rounded-xl border p-6 ${
        tier.featured
          ? "border-accent-strong/60 bg-surface ring-1 ring-accent-strong/20"
          : "border-border bg-surface"
      }`}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent-deep px-3 py-0.5 text-[11px] font-semibold text-accent-foreground">
          {t("common.mostPopular")}
        </span>
      )}
      <h3 className="font-display text-xl font-medium tracking-tight text-foreground">{tier.name}</h3>
      <p className="mt-1 text-sm text-muted">{tier.description}</p>
      <div className="mt-5 flex items-end gap-1">
        <span className="font-display text-3xl font-medium tabular-nums tracking-tight text-foreground">
          {formatPrice(tier.price)}
        </span>
        {tier.price !== "Custom" && (
          <span className="mb-1 text-sm text-muted">{t("common.perProject")}</span>
        )}
      </div>
      <ul className="mt-6 flex-1 space-y-2.5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
            <Check className="h-4 w-4 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <ButtonLink
          href="/order"
          variant={tier.featured ? "primary" : "outline"}
          className="w-full"
        >
          {t("common.choose")} {tier.name}
        </ButtonLink>
      </div>
    </div>
  );
}
