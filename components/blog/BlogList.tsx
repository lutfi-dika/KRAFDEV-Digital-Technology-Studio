"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts, blogCategories } from "@/data/blog";
import { useI18n } from "@/components/providers/I18nProvider";

export default function BlogList() {
  const { locale, t } = useI18n();
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["All", ...blogCategories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              category === c
                ? "border-accent-deep bg-accent-deep text-accent-foreground"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {c === "All" ? t("blog.all") : c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted">{t("blog.empty")}</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <span className="text-xs font-medium text-accent-strong">
                {post.category}
              </span>
              <h2 className="mt-3 font-display text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-accent-strong">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString(locale)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
