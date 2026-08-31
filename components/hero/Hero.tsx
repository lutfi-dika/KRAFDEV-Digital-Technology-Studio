"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/components/providers/I18nProvider";
import { ButtonLink } from "@/components/ui/Button";

const trustItems = ["item1", "item2", "item3"] as const;

export default function Hero() {
  const { t } = useI18n();
  const shouldReduce = useReducedMotion();

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <motion.div
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium text-accent-strong">{t("hero.badge")}</p>

          <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl font-medium leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]">
            {t("hero.title")}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href="/order">
              {t("hero.primaryCta")}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/projects" variant="outline">
              {t("hero.secondaryCta")}
            </ButtonLink>
          </div>

          <ul className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            {trustItems.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-border" />}
                {t(`hero.${item}`)}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}