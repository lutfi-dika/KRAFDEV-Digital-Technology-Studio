"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/components/providers/I18nProvider";

const WA_URL = "https://wa.me/6285135977841?text=" +
  encodeURIComponent("Halo KRAFDEV, saya ingin mendiskusikan project.");

export default function CtaSection() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
        <p className="text-sm font-medium text-accent-strong">{t("home.ctaEyebrow")}</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-3xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {t("home.ctaTitle")}
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-secondary">
          {t("home.ctaSubtitle")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {t("home.ctaPrimary")}
            <ArrowRight className="h-4 w-4" />
          </a>
          <ButtonLink href="/projects" variant="outline">
            {t("home.ctaSecondary")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}