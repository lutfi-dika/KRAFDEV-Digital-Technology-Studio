"use client";

import { useI18n } from "@/components/providers/I18nProvider";

export default function PrivacyBody() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t("privacy.title")}
      </h1>
      <p className="mt-2 text-sm text-muted">{t("privacy.lastUpdated")}</p>

      <div className="mt-8 space-y-8 leading-relaxed text-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t("privacy.sectionCollect")}
          </h2>
          <p className="mt-3 text-muted">{t("privacy.collectBody")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t("privacy.sectionUse")}
          </h2>
          <p className="mt-3 text-muted">{t("privacy.useBody")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t("privacy.sectionCookies")}
          </h2>
          <p className="mt-3 text-muted">{t("privacy.cookiesBody")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t("privacy.sectionSecurity")}
          </h2>
          <p className="mt-3 text-muted">{t("privacy.securityBody")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t("privacy.sectionContact")}
          </h2>
          <p className="mt-3 text-muted">{t("privacy.contactBody")}</p>
        </section>
      </div>
    </div>
  );
}
