"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/components/providers/I18nProvider";

export default function CtaSection() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden border border-border border-t-2 border-t-accent-deep bg-surface px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
        <div aria-hidden className="blueprint-grid absolute inset-0 opacity-40" />
        <span
          aria-hidden
          className="absolute left-4 top-4 block h-3 w-3 border-l-2 border-t-2 border-line"
        />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t("home.ctaTitle")}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-secondary">
              {t("home.ctaDesc")}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <ButtonLink href="/order" variant="onAccent">
              {t("home.startProject")}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost" className="text-accent-strong hover:bg-accent/10">
              {t("home.contactUs")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}