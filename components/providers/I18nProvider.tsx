"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { messages, type Locale } from "@/data/messages";

export type { Locale };

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "krafdev-locale";

function getMessages(locale: Locale) {
  return messages[locale];
}

function getNested(obj: unknown, path: string): string {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as string;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    let active = true;
    const timeout = setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (active && (stored === "id" || stored === "en")) {
          setLocaleState(stored);
        }
      } catch {
        // ignore storage errors
      }
    }, 0);
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, []);

  function setLocale(locale: Locale) {
    setLocaleState(locale);
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore storage errors
    }
  }

  const t = (key: string) => {
    const dict = getMessages(locale);
    const value = getNested(dict, key);
    return value ?? key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
