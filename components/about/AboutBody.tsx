"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/components/providers/I18nProvider";

export default function AboutBody() {
  const { t } = useI18n();

  const approach = [
    { step: "01", title: t("about.approach1Title"), body: t("about.approach1Body") },
    { step: "02", title: t("about.approach2Title"), body: t("about.approach2Body") },
    { step: "03", title: t("about.approach3Title"), body: t("about.approach3Body") },
  ];

  const principles = [
    { step: "01", title: t("about.principle1Title"), body: t("about.principle1Body") },
    { step: "02", title: t("about.principle2Title"), body: t("about.principle2Body") },
    { step: "03", title: t("about.principle3Title"), body: t("about.principle3Body") },
    { step: "04", title: t("about.principle4Title"), body: t("about.principle4Body") },
  ];

  const values = [
    { title: t("about.value1Title"), body: t("about.value1Body") },
    { title: t("about.value2Title"), body: t("about.value2Body") },
    { title: t("about.value3Title"), body: t("about.value3Body") },
    { title: t("about.value4Title"), body: t("about.value4Body") },
    { title: t("about.value5Title"), body: t("about.value5Body") },
  ];

  const workItems = [t("about.workItem1"), t("about.workItem2"), t("about.workItem3")];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* ===== Masthead ===== */}
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t("about.eyebrow")}
        </p>
        <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {t("about.masthead")}
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted sm:text-xl">
          {t("about.intro")}
        </p>
        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted">
          <span className="font-semibold uppercase tracking-widest text-foreground">
            {t("about.studioLabel")}
          </span>
        </div>
        <div className="mx-auto mt-8 h-px w-24 bg-border" />
      </header>

      {/* ===== Lead ===== */}
      <div className="mx-auto mt-12 max-w-3xl">
        <Reveal>
          <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-accent leading-relaxed text-foreground">
            {t("about.lead")}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-medium text-foreground">
              {t("about.chip1")}
            </span>
            <span className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-medium text-foreground">
              {t("about.chip2")}
            </span>
            <span className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-medium text-foreground">
              {t("about.chip3")}
            </span>
          </div>
        </Reveal>
      </div>

      {/* ===== Mengapa KRAFDEV Hadir ===== */}
      <section className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("about.whyEyebrow")}
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("about.whyTitle")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="leading-relaxed text-muted">{t("about.whyBody")}</p>
        </Reveal>
      </section>

      {/* ===== Dirancang Sesuai Bisnis Anda ===== */}
      <section className="mt-20">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("about.approachEyebrow")}
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("about.approachTitle")}
          </h2>
        </Reveal>

        <div className="mt-8">
          <ol className="divide-y divide-border border-y border-border">
            {approach.map((a, i) => (
              <li key={a.step}>
                <Reveal delay={i * 0.04}>
                  <div className="grid gap-2 py-7 sm:grid-cols-[3.5rem_14rem_1fr] sm:gap-6">
                    <span className="font-mono text-sm text-muted tabular-nums">{a.step}</span>
                    <h3 className="font-semibold uppercase tracking-wider text-foreground sm:text-base">
                      {a.title}
                    </h3>
                    <p className="leading-relaxed text-muted">{a.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Prinsip Utama Kami ===== */}
      <section className="mt-20 border-t border-border pt-16">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("about.principlesEyebrow")}
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("about.principlesTitle")}
          </h2>
        </Reveal>

        <div className="mt-8">
          <ol className="grid border-t border-border sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.step} className="border-b border-border sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
                <Reveal delay={i * 0.04}>
                  <div className="py-6">
                    <span className="font-mono text-sm text-muted tabular-nums">{p.step}</span>
                    <h3 className="mt-3 text-lg font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Cara Kami Bekerja ===== */}
      <section className="mt-20 border-t border-border pt-16">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("about.workEyebrow")}
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("about.workTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{t("about.workBody")}</p>
        </Reveal>

        <div className="mt-8">
          <ul className="divide-y divide-border border-y border-border">
            {workItems.map((s, i) => (
              <li key={s}>
                <Reveal delay={i * 0.04}>
                  <div className="flex items-center gap-4 py-4 text-sm font-medium text-foreground">
                    <span className="font-mono text-sm text-muted tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Nilai ===== */}
      <section className="mt-20 border-t border-border pt-16">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("about.valuesEyebrow")}
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("about.valuesTitle")}
          </h2>
        </Reveal>

        <div className="mt-8">
          <dl className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className="border-b border-border sm:pr-8">
                <Reveal delay={i * 0.03}>
                  <div className="py-6">
                    <dt className="text-sm font-semibold uppercase tracking-wider text-accent">
                      {v.title}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{v.body}</dd>
                  </div>
                </Reveal>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-accent p-8 text-white sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {t("about.ctaTitle")}
                </h2>
                <p className="mt-3 text-white/85">{t("about.ctaBody")}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <ButtonLink href="/order" variant="onAccent">
                  {t("about.ctaAction")}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  {t("about.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
