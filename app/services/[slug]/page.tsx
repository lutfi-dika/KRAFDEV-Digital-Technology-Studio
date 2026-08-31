import type { Metadata } from "next";
import { services } from "@/data";
import ServiceDetail from "@/components/service-card/ServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, BRAND_NAME } from "@/lib/seo";

export const dynamicParams = true;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `Jasa ${service.title}`,
    description: service.description,
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    openGraph: {
      type: "website",
      title: `Jasa ${service.title} | KRAFDEV`,
      description: service.description,
      url: `${SITE_URL}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return <ServiceDetail slug={slug} />;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Layanan",
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${SITE_URL}/services/${service.slug}`,
      },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    category: service.category,
    url: `${SITE_URL}/services/${service.slug}`,
    areaServed: "Indonesia",
    provider: { "@type": "Organization", name: BRAND_NAME, url: SITE_URL },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: service.startingPrice,
      description: "Harga mulai dari untuk jasa ini.",
      areaServed: "Indonesia",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={serviceLd} />
      <ServiceDetail slug={slug} />
    </>
  );
}
