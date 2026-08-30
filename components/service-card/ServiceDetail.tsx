"use client";

import { ArrowRight } from "lucide-react";
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
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
        {/* Hero / main */}
        <div className="lg:col-span-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              KRAFDEV / {service.category}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              {service.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/order">
                {t("serviceDetail.orderThis")} <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>

          {/* Problem / Solution */}
          <Reveal className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">{t("serviceDetail.challenge")}</h2>
            <p className="mt-3 max-w-prose leading-relaxed text-muted">{t("serviceDetail.challengeDesc")}</p>
            <h2 className="mt-10 text-2xl font-semibold text-foreground">{t("serviceDetail.solution")}</h2>
            <p className="mt-3 max-w-prose leading-relaxed text-muted">
              {service.title} {t("serviceDetail.solutionPart")}
            </p>
          </Reveal>

          {/* Features */}
          <Reveal className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">{t("serviceDetail.features")}</h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {service.features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-baseline justify-between gap-6 py-3.5 text-foreground"
                >
                  <span className="text-sm sm:text-base">{f}</span>
                  <span className="font-mono text-xs text-muted tabular-nums" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Sidebar */}
        <div className="space-y-10 lg:border-l lg:border-border lg:pl-10">
          {/* Price — standalone statement, no box */}
          <Reveal>
            <p className="text-sm text-muted">{t("serviceDetail.estimatedStartingPrice")}</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-foreground">{startingPrice}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t("serviceDetail.priceNote")}</p>
            <ButtonLink href="/order" className="mt-5">
              {t("serviceDetail.order")} <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          {/* Process — divider list */}
          <Reveal>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              {t("serviceDetail.process")}
            </h3>
            <ol className="mt-4 divide-y divide-border">
              {processSteps.map((p) => (
                <li key={p.step} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4">
                  <span className="font-mono text-sm text-accent tabular-nums">{p.step}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.title}</p>
                    <p className="text-sm text-muted">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Technology */}
          <Reveal>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              {t("serviceDetail.technology")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Next.js · React · TypeScript · Node.js · Tailwind CSS · PostgreSQL
            </p>
          </Reveal>
        </div>
      </div>

      {/* FAQ */}
      <Reveal className="mt-20">
        <h2 className="text-2xl font-semibold text-foreground">{t("serviceDetail.faqTitle")}</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.slice(0, 4).map((f) => (
            <div key={f.question} className="py-5">
              <h3 className="font-medium text-foreground">{f.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.answer}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
