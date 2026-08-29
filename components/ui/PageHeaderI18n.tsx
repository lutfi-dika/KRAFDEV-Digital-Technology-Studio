"use client";

import { PageHeader } from "./PageHeader";
import { useI18n } from "@/components/providers/I18nProvider";

export function PageHeaderI18n({
  eyebrowKey,
  titleKey,
  descriptionKey,
  centered = false,
  className = "",
}: {
  eyebrowKey?: string;
  titleKey: string;
  descriptionKey?: string;
  centered?: boolean;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <PageHeader
      eyebrow={eyebrowKey ? t(eyebrowKey) : undefined}
      title={t(titleKey)}
      description={descriptionKey ? t(descriptionKey) : undefined}
      centered={centered}
      className={className}
    />
  );
}
