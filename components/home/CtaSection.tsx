"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/components/providers/I18nProvider";

export default function CtaSection() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-accent px-8 py-16 text-center shadow-lg sm:px-16">
        {/* single subtle wash, kept minimal */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("home.ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-white/85">
            {t("home.ctaDesc")}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/order" variant="onAccent">
              {t("home.startProject")}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              {t("home.contactUs")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
