"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

const steps = ["step1", "step2", "step3", "step4"] as const;

export default function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="border-b border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Header dengan Grid & Ilustrasi */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium text-accent-strong uppercase tracking-wider">
              {t("homeAbout.eyebrow")}
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
              {t("homeAbout.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
              {t("homeAbout.desc")}
            </p>
          </div>

          {/* Area Gambar / Ilustrasi */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60 bg-surface/50 shadow-sm">
              <Image
                src="/krafdev.png" // Sesuaikan path gambar Anda
                alt="About Illustration"
                fill
                className="object-cover p-4"
                priority
              />
            </div>
          </div>
        </div>

        {/* Steps Sederhana */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step} delay={i * 0.05} className="h-full">
              <div className="flex flex-col h-full rounded-2xl border border-border/80 bg-background/50 p-6 shadow-xs">
                <span className="font-mono text-sm font-bold text-accent-strong tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium tracking-tight text-foreground">
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
