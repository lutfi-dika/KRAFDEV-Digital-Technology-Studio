"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { ButtonLink } from "@/components/ui/Button";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* subtle technical grid, edge only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_72%)] opacity-60"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium tracking-wide text-foreground">
          <span className="h-1 w-1 rounded-full bg-accent" />
          {t("hero.badge")}
        </span>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          {t("hero.title")}
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/order">
            {t("hero.primaryCta")}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/services" variant="outline">
            {t("hero.secondaryCta")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
