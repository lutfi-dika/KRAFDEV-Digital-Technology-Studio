"use client";

import { useI18n } from "@/components/providers/I18nProvider";

export default function TermsBody() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t("terms.title")}
      </h1>
      <p className="mt-2 text-sm text-muted">{t("terms.lastUpdated")}</p>

      <div className="mt-8 space-y-8 leading-relaxed text-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t("terms.sectionAccept")}
          </h2>
          <p className="mt-3 text-muted">{t("terms.acceptBody")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t("terms.sectionServices")}
          </h2>
          <p className="mt-3 text-muted">{t("terms.servicesBody")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t("terms.sectionPayments")}
          </h2>
          <p className="mt-3 text-muted">{t("terms.paymentsBody")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t("terms.sectionIp")}
          </h2>
          <p className="mt-3 text-muted">{t("terms.ipBody")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t("terms.sectionLimitation")}
          </h2>
          <p className="mt-3 text-muted">{t("terms.limitationBody")}</p>
        </section>
      </div>
    </div>
  );
}
