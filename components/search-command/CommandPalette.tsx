"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";
import { buildSearchIndex } from "@/data/search";
import { useI18n } from "@/components/providers/I18nProvider";
import { useTheme } from "next-themes";

type RunItem = { key: string; label: string; sub?: string; run: () => void };

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-accent/20 text-foreground">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const allEntries = useMemo(() => buildSearchIndex(), []);

  const items = useMemo<RunItem[]>(() => {
    const list: RunItem[] = [];
    if (query.trim()) {
      const q = query.toLowerCase();
      for (const e of allEntries) {
        if (
          e.title.toLowerCase().includes(q) ||
          e.keywords.includes(q)
        ) {
          list.push({
            key: `service-${e.title}`,
            label: e.title,
            sub: e.type,
            run: () => {
              setOpen(false);
              router.push(e.href);
            },
          });
        }
      }
    }
    const cmds: RunItem[] = [
      {
        key: "cmd-services",
        label: t("nav.services"),
        sub: t("search.command"),
        run: () => {
          setOpen(false);
          router.push("/services");
        },
      },
      {
        key: "cmd-projects",
        label: t("nav.projects"),
        sub: t("search.command"),
        run: () => {
          setOpen(false);
          router.push("/projects");
        },
      },
      {
        key: "cmd-pricing",
        label: t("nav.pricing"),
        sub: t("search.command"),
        run: () => {
          setOpen(false);
          router.push("/pricing");
        },
      },
      {
        key: "cmd-contact",
        label: t("nav.contact"),
        sub: t("search.command"),
        run: () => {
          setOpen(false);
          router.push("/contact");
        },
      },
      {
        key: "cmd-theme",
        label: t("search.toggleTheme"),
        sub: t("search.command"),
        run: () => {
          setTheme(theme === "dark" ? "light" : "dark");
          setOpen(false);
        },
      },
      {
        key: "cmd-language",
        label: t("search.changeLanguage"),
        sub: t("search.command"),
        run: () => {
          setLocale(locale === "id" ? "en" : "id");
          setOpen(false);
        },
      },
    ];
    return [...list, ...cmds];
  }, [query, allEntries, router, theme, setTheme, locale, setLocale, setOpen, t]);

  const openRef = useRef(open);
  const activeRef = useRef(active);
  const itemsRef = useRef(items);

  useEffect(() => {
    openRef.current = open;
  }, [open]);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuery("");
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!openRef.current) return;
      const list = itemsRef.current;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, Math.max(list.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = list[activeRef.current];
        if (target) {
          setOpen(false);
          target.run();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) return null;

  const empty = query.trim() && items.length === 0;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="mx-auto mt-24 max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={t("nav.search")}
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label="Search"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {empty && (
            <p className="px-3 py-6 text-center text-sm text-muted">
              {t("search.noResults")}
            </p>
          )}
          {!empty &&
            items.map((item, i) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setOpen(false);
                  item.run();
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${
                  i === active ? "bg-accent/10 text-foreground" : "text-foreground"
                }`}
              >
                <span className="truncate">{highlight(item.label, query)}</span>
                {i === active ? (
                  <CornerDownLeft className="h-4 w-4 shrink-0 text-muted" />
                ) : (
                  <span className="shrink-0 text-xs text-muted">{item.sub}</span>
                )}
              </button>
            ))}
          {!query.trim() && (
            <p className="px-3 pb-1 pt-2 text-xs text-muted">
              {t("brand.name")} — {t("brand.subtitle")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

