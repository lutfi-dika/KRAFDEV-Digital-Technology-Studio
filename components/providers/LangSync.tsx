"use client";

import { useEffect } from "react";
import { useI18n } from "@/components/providers/I18nProvider";

export default function LangSync() {
  const { locale } = useI18n();

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "id";
  }, [locale]);

  return null;
}
