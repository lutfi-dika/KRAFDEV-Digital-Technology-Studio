"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { getServices } from "@/data";
import ServiceCard from "@/components/service-card/ServiceCard";
import { ViewAllLink } from "@/components/ui/ViewAllLink";

export default function ServicesOverview() {
  const { t, locale } = useI18n();
  const services = getServices(locale);
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("home.servicesTitle")}
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            {t("home.servicesSubtitle")}
          </p>
        </div>
        <ViewAllLink href="/services">{t("home.viewAll")}</ViewAllLink>
      </div>

      <div className="mt-10">
        {services.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i + 1} />
        ))}
      </div>
    </section>
  );
}
