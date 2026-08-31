"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/components/providers/I18nProvider";
import { ButtonLink } from "@/components/ui/Button";

const flowKeys = ["flow1", "flow2", "flow3", "flow4"] as const;

export default function Hero() {
  const { t } = useI18n();
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
          <div>
            <p className="text-sm text-muted">{t("hero.location")}</p>

            <h1 className="mt-5 max-w-3xl text-balance font-display text-5xl font-medium leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]">
              {t("hero.title")}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
              {t("hero.subtitle")}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <ButtonLink href="/order">
                {t("hero.primaryCta")}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-accent-strong decoration-2 underline-offset-8 transition-colors hover:text-accent-strong"
              >
                {t("hero.secondaryCta")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Blueprint flow diagram — the signature visual */}
          <div className="relative border border-border bg-surface p-6 sm:p-8">
            <div aria-hidden className="blueprint-grid absolute inset-0 opacity-60" />
            <span
              aria-hidden
              className="absolute left-3 top-3 block h-3 w-3 border-l-2 border-t-2 border-line"
            />
            <span
              aria-hidden
              className="absolute bottom-3 right-3 block h-3 w-3 border-b-2 border-r-2 border-line"
            />

            <div className="relative">
              <p className="text-sm font-medium text-foreground">{t("hero.flowLabel")}</p>
              <svg
                aria-hidden
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                className="absolute inset-x-4 top-10 h-2 w-auto"
              >
                <motion.path
                  d="M 0 4 H 100"
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="1"
                  strokeDasharray="none"
                  initial={shouldReduce ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                />
              </svg>

              <div className="grid grid-cols-4 pt-8">
                {flowKeys.map((key, i) => (
                  <motion.div
                    key={key}
                    initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: shouldReduce ? 0 : 0.15 + i * 0.14, duration: 0.35 }}
                    className="flex flex-col items-center"
                  >
                    <span
                      className={`relative h-3.5 w-3.5 rounded-full border-2 ${
                        i === flowKeys.length - 1
                          ? "border-accent-deep bg-accent-deep"
                          : "border-line bg-surface"
                      }`}
                    />
                    <span className="mt-3 font-mono text-[10px] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-0.5 text-center text-[13px] font-semibold text-foreground">
                      {t(`hero.${key}`)}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* technical annotation — mono is reserved for real data */}
              <div className="mt-6 flex items-center justify-between border-t border-dashed border-line/40 pt-4 font-mono text-[11px] text-muted">
                <span>ORDER/2026/001</span>
                <span className="flex items-center gap-2">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent-strong" />
                  STATUS: PENDING
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}