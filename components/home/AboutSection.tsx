"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";

const steps = ["step1", "step2", "step3", "step4"] as const;

export default function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]">
          <div className="lg:pt-24">
            <p className="text-sm font-medium text-accent-strong">{t("homeAbout.eyebrow")}</p>
          </div>
          <div>
            <h2 className="max-w-3xl text-balance font-display text-3xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t("homeAbout.title")}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">
              {t("homeAbout.desc")}
            </p>
          </div>
        </div>

        <div className="mt-16 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step} className="border-b border-border sm:border-r sm:last:border-r-0 lg:border-b-0">
              <div className="p-6 pl-0 sm:p-8 sm:pl-8 sm:first:pl-0 lg:pr-8">
                <p className="text-sm font-medium text-accent-strong tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-foreground">
                  {t(`homeAbout.${step}`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`homeAbout.${step}Desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}