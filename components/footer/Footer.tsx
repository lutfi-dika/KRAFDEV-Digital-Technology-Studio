"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { getServices } from "@/data";

export default function Footer() {
  const { t, locale } = useI18n();
  const services = getServices(locale);

  const companyLinks = [
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const resourceLinks = [
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/faq", label: "FAQ" },
    { href: "/order", label: t("order.stepService") },
  ];

  const socials = [
    { href: "https://wa.me/6285135977841", label: "WhatsApp", icon: MessageCircle },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface ring-1 ring-border">
                <Image
                  src="/krafdev.png"
                  alt="KRAFDEV logo"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                  KRAFDEV
                </span>
                <span className="mt-0.5 text-[10px] text-muted">
                  {t("brand.subtitle")}
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t("footer.about")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t("footer.navigation")}
            </h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t("footer.services")}
            </h3>
            <ul className="mt-4 space-y-2">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-muted hover:text-foreground"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t("footer.resources")}
            </h3>
            <ul className="mt-4 space-y-2">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-7 text-sm font-semibold text-foreground">
              {t("footer.social")}
            </h3>
            <div className="mt-3 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent-strong/40 hover:bg-accent/10 hover:text-accent-strong"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>
            &copy; 2026 KRAFDEV. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
