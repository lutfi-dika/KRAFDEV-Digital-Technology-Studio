"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { mainNav } from "@/data";
import DigitalClock from "@/components/digital-clock/DigitalClock";
import ThemeToggle from "@/components/theme-toggle/ThemeToggle";
import LanguageSwitcher from "@/components/language-switcher/LanguageSwitcher";

export default function Navbar({ onSearch }: { onSearch: () => void }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 transition-[border-color,background-color] ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center gap-4 px-4 transition-all sm:px-6 lg:px-8 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-surface">
            <Image
              src="/krafdev.png"
              alt="KRAFDEV logo"
              width={32}
              height={32}
              priority
              className="h-full w-full object-cover"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              KRAFDEV
            </span>
            <span className="text-[10px] text-muted">{t("brand.subtitle")}</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-0.5 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t(`nav.${item.label.toLowerCase()}`)}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1 lg:ml-3">
          <button
            type="button"
            onClick={onSearch}
            className="hidden h-9 items-center gap-2 rounded-md border border-border bg-surface/50 px-3 text-sm text-muted transition-colors hover:text-foreground sm:flex"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">{t("nav.search")}</span>
            <kbd className="rounded border border-border bg-background px-1 text-[10px]">
              Ctrl K
            </kbd>
          </button>
          <button
            type="button"
            onClick={onSearch}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-foreground sm:hidden"
            aria-label="Open search"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div className="mx-auto hidden max-w-6xl items-center justify-between border-t border-border px-6 py-1.5 lg:flex">
        <DigitalClock />
        <span className="text-[11px] text-muted">{t("brand.tagline")}</span>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-0.5">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-[15px] transition-colors ${
                  isActive(item.href)
                    ? "bg-surface font-medium text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {t(`nav.${item.label.toLowerCase()}`)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
              <DigitalClock />
              <span className="flex items-center gap-1">
                <LanguageSwitcher />
                <ThemeToggle />
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
