"use client";

import { Check, ArrowRight } from "lucide-react";
import { getServices } from "@/data";
import { getFaqs } from "@/data/faq";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/components/providers/I18nProvider";

export default function ServiceDetail({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const service = getServices(locale).find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;
  const startingPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(service.startingPrice);

  const processSteps = [
    { step: "01", title: t("serviceDetail.step1Title"), desc: t("serviceDetail.step1Desc") },
    { step: "02", title: t("serviceDetail.step2Title"), desc: t("serviceDetail.step2Desc") },
    { step: "03", title: t("serviceDetail.step3Title"), desc: t("serviceDetail.step3Desc") },
    { step: "04", title: t("serviceDetail.step4Title"), desc: t("serviceDetail.step4Desc") },
  ];

  const faqs = getFaqs(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-3">
        {/* Hero / main */}
        <div className="lg:col-span-2">
          <Reveal>
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-background text-accent">
              <Icon className="h-6 w-6" />
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{service.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/order">
                {t("serviceDetail.orderThis")} <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>

          {/* Problem / Solution */}
          <Reveal className="mt-14">
            <h2 className="text-2xl font-semibold text-foreground">{t("serviceDetail.challenge")}</h2>
            <p className="mt-3 text-muted">{t("serviceDetail.challengeDesc")}</p>
            <h2 className="mt-8 text-2xl font-semibold text-foreground">{t("serviceDetail.solution")}</h2>
            <p className="mt-3 text-muted">
              {service.title} {t("serviceDetail.solutionPart")}
            </p>
          </Reveal>

          {/* Features */}
          <Reveal className="mt-14">
            <h2 className="text-2xl font-semibold text-foreground">
              {t("serviceDetail.features")}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-3 w-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Reveal className="rounded-xl border border-border bg-surface p-6">
            <p className="text-sm text-muted">{t("serviceDetail.estimatedStartingPrice")}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{startingPrice}</p>
            <p className="mt-1 text-xs text-muted">{t("serviceDetail.priceNote")}</p>
            <ButtonLink href="/order" className="mt-5 w-full">
              {t("serviceDetail.order")}
            </ButtonLink>
          </Reveal>

          <Reveal className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-sm font-semibold text-foreground">{t("serviceDetail.process")}</h3>
            <ol className="mt-4 space-y-4">
              {processSteps.map((p) => (
                <li key={p.step} className="flex gap-3">
                  <span className="text-sm font-bold text-accent">{p.step}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.title}</p>
                    <p className="text-xs text-muted">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-sm font-semibold text-foreground">{t("serviceDetail.technology")}</h3>
            <p className="mt-3 text-sm text-muted">
              Next.js · React · TypeScript · Node.js · Tailwind CSS · PostgreSQL
            </p>
          </Reveal>
        </div>
      </div>

      {/* FAQ */}
      <Reveal className="mt-20">
        <h2 className="text-2xl font-semibold text-foreground">{t("serviceDetail.faqTitle")}</h2>
        <div className="mt-6 space-y-4">
          {faqs.slice(0, 4).map((f) => (
            <div key={f.question} className="rounded-lg border border-border bg-surface p-5">
              <h3 className="font-medium text-foreground">{f.question}</h3>
              <p className="mt-2 text-sm text-muted">{f.answer}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
