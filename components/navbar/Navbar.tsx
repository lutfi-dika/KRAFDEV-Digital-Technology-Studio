"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Menu, X, ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { mainNav } from "@/data";
import ThemeToggle from "@/components/theme-toggle/ThemeToggle";
import LanguageSwitcher from "@/components/language-switcher/LanguageSwitcher";
import DigitalClock from "@/components/digital-clock/Digitalclock";

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

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md transition-all duration-300 supports-[backdrop-filter]:bg-background/80 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Logo Brand */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="KRAFDEV — home"
        >
          <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-surface ring-1 ring-border">
            <Image
              src="/krafdev.png"
              alt="KRAFDEV Digital Technology Studio"
              width={32}
              height={32}
              priority
              className="h-full w-full object-cover"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              {t("brand.name")}
            </span>
          </span>
        </Link>

        {/* Navigasi Menu Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                isActive(item.href)
                  ? "text-accent-strong"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t(`nav.${item.label.toLowerCase()}`)}
            </Link>
          ))}
          <Link
            href="/order"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-[13px] font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {t("nav.startProject")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Bagian Kanan: Jam Digital, Pencarian, Bahasa, Tema, & Tombol Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Jam Digital (Hampil tampil di layar besar/XL ke atas agar navbar tidak sesak) */}
          <div className="hidden xl:flex items-center">
            <DigitalClock />
          </div>

          <button
            type="button"
            onClick={onSearch}
            className="hidden h-9 items-center gap-2 rounded-full border border-border bg-surface/50 px-3 text-sm text-muted transition-colors hover:text-foreground sm:flex"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">{t("nav.search")}</span>
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
              Ctrl K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onSearch}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-foreground sm:hidden"
            aria-label="Open search"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          <LanguageSwitcher />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 sm:px-6">
          {/* Jam Digital di Menu Mobile */}
          <div className="mb-2 py-2 flex justify-center bg-surface/30 rounded-2xl border border-border/50">
            <div className="scale-90">
              <DigitalClock />
            </div>
          </div>

          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-[15px] transition-colors ${
                isActive(item.href)
                  ? "bg-surface font-medium text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t(`nav.${item.label.toLowerCase()}`)}
            </Link>
          ))}
          <Link
            href="/order"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-3 text-[15px] font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {t("nav.startProject")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
