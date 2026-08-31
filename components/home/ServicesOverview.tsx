"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { getServices } from "@/data";

function WireframeSketch() {
  return (
    <div aria-hidden className="w-full shrink-0 sm:w-44">
      <div className="border border-border bg-background p-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="h-1.5 w-8 rounded-sm bg-accent-deep/80" />
          <div className="flex gap-1">
            <div className="h-1.5 w-4 rounded-sm bg-foreground/25" />
            <div className="h-1.5 w-4 rounded-sm bg-foreground/25" />
            <div className="h-1.5 w-4 rounded-sm bg-foreground/25" />
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-4/5 rounded-sm bg-foreground/40" />
          <div className="h-1.5 w-3/5 rounded-sm bg-foreground/25" />
          <div className="h-1.5 w-full rounded-sm bg-foreground/20" />
          <div className="h-1.5 w-11/12 rounded-sm bg-foreground/20" />
        </div>
        <div className="mt-3 flex gap-1.5">
          <div className="h-1.5 w-9 rounded-sm bg-accent-deep/70" />
          <div className="h-1.5 w-9 rounded-sm bg-foreground/15" />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between px-0.5 font-mono text-[9px] text-muted">
        <span>WIRE/SK.PNG</span>
        <span>v1</span>
      </div>
    </div>
  );
}

export default function ServicesOverview() {
  const { t, locale } = useI18n();
  const services = getServices(locale);
  const [featured, ...rest] = services;

  const startingPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(featured.startingPrice);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("home.servicesTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            {t("home.servicesSubtitle")}
          </p>
        </div>
        <Link
          href="/services"
          className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent-strong/40 hover:bg-accent/10 hover:text-accent-strong"
        >
          {t("home.viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Asymmetric: one main service + compact list */}
      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* Featured service */}
        <Link
          href={`/services/${featured.slug}`}
          className="group flex flex-col justify-between gap-8 border border-border bg-surface p-7 transition-colors hover:border-accent-strong/40 sm:p-9 lg:flex-row lg:items-start"
        >
          <div>
            <div className="flex items-baseline gap-x-3">
              <h3 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {featured.title}
              </h3>
              <span className="text-xs text-muted">{featured.category}</span>
            </div>
            <p className="mt-4 max-w-prose leading-relaxed text-muted">
              {featured.description}
            </p>

            <ul className="mt-6 grid max-w-sm grid-cols-2 gap-x-6 gap-y-2">
              {featured.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <span aria-hidden className="h-1 w-3 bg-line" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5">
              <span className="font-mono text-xs text-muted">
                {startingPrice} · mulai dari
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-accent-strong">
                {t("common.learnMore")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>

          <WireframeSketch />
        </Link>

        {/* Compact list of the rest */}
        <div className="flex flex-col border-y border-border">
          {rest.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex items-center justify-between gap-4 border-b border-border py-4 last:border-b-0"
            >
              <div>
                <h3 className="font-display text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-accent-strong">
                  {service.title}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-sm text-muted">
                  {service.description}
                </p>
              </div>
              <span className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-strong">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}