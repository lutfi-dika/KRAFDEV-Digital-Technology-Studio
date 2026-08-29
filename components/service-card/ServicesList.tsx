"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { getServices } from "@/data";
import ServiceCard from "@/components/service-card/ServiceCard";

export default function ServicesList() {
  const { locale } = useI18n();
  const services = getServices(locale);
  return (
    <div className="mt-12">
      {services.map((service, i) => (
        <ServiceCard key={service.slug} service={service} index={i + 1} />
      ))}
    </div>
  );
}
