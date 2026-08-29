"use client";

import { getWebsitePackages } from "@/data/pricing";
import PricingCard from "@/components/pricing-card/PricingCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
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

      <Reveal className="mt-16 rounded-xl border border-border bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          {t("pricing.customPanelTitle")}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-muted">
          {t("pricing.customPanelDesc")}
        </p>
        <ButtonLink href="/order" className="mt-6">
          {t("pricing.configure")}
        </ButtonLink>
      </Reveal>
    </>
  );
}
