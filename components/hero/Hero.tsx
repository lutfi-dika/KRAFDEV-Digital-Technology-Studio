
"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { useI18n } from "@/components/providers/I18nProvider";
import { ButtonLink } from "@/components/ui/Button";

const trustItems = ["item1", "item2", "item3"] as const;

export default function Hero() {
  const { t } = useI18n();
  const shouldReduce = useReducedMotion();

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-accent-strong" />

            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-strong">
              {t("hero.badge")}
            </p>
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-balance font-display text-[2.75rem] font-medium leading-[1.04] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[5.25rem]">
            {t("hero.title")}
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-secondary sm:text-lg">
            {t("hero.subtitle")}
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink
              href="/order"
              className="group"
            >
              {t("hero.primaryCta")}

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </ButtonLink>

            <ButtonLink
              href="/projects"
              variant="outline"
            >
              {t("hero.secondaryCta")}
            </ButtonLink>
          </div>

          {/* Trust / Expertise */}
          <div className="mt-14 border-t border-border pt-5">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                Expertise
              </span>

              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {trustItems.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-secondary"
                  >
                    {t(`hero.${item}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

