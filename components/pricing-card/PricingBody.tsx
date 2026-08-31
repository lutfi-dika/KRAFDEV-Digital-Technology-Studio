"use client";

import { getWebsitePackages } from "@/data/pricing";
import PricingCard from "@/components/pricing-card/PricingCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";

export default function PricingBody() {
  const { locale, t } = useI18n();
  const packages = getWebsitePackages(locale);

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.06}>
            <PricingCard tier={tier} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 border-t border-border py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
              {t("pricing.customPanelTitle")}
            </h2>
            <p className="mt-2 leading-relaxed text-muted">
              {t("pricing.customPanelDesc")}
            </p>
          </div>
          <ButtonLink href="/order">
            {t("pricing.configure")} <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Reveal>
    </>
  );
}
