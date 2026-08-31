"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { getServices } from "@/data";

export default function ServicesOverview() {
  const { t, locale } = useI18n();
  const services = getServices(locale);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent-strong">{t("page.servicesEyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-4xl">
            {t("home.servicesTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{t("home.servicesSubtitle")}</p>
        </div>
        <Link
          href="/services"
          className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent-strong"
        >
          {t("home.viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-14 border-t border-border">
        {services.map((service, i) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group grid items-center gap-3 border-b border-border py-6 transition-colors hover:bg-surface/60 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-6 sm:px-2"
          >
            <span className="text-sm font-medium text-muted tabular-nums transition-colors group-hover:text-accent-strong">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent-strong sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-1 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </div>
            <span className="hidden text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-strong sm:block">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}