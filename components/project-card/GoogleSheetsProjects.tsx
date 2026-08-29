"use client";

import { useState, useMemo, useEffect } from "react";
import { fetchProjectsFromSheet, type GoogleSheetsProject } from "@/lib/googleSheetsProjects";
import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";

function ProjectCardView({ project, index }: { project: GoogleSheetsProject; index: number }) {
  const { t } = useI18n();
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-foreground/25">
      {/* Card visual */}
      <div className="relative aspect-[16/10] overflow-hidden bg-background">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-background/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("projects.viewProject")} ${project.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-white"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium uppercase tracking-wider text-muted">
            {t("projects.projectLabel")} {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-muted tabular-nums">{project.year}</span>
        </div>
        <span className="mt-3 text-xs font-medium uppercase tracking-wide text-accent">
          {project.category}
        </span>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag, tIdx) => (
            <span
              key={`${tag}-${tIdx}`}
              className="rounded border border-border bg-background px-2 py-0.5 text-xs text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent"
          >
            {t("projects.viewProject")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function GoogleSheetsProjects() {
  const { t } = useI18n();
  const [projectsData, setProjectsData] = useState<GoogleSheetsProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjectsFromSheet();
        if (active) setProjectsData(data);
      } catch (err) {
        console.error("Gagal mengambil data Google Sheets:", err);
        if (active) {
          setProjectsData([]);
          setError(String(err instanceof Error ? err.message : err));
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    if (!projectsData.length) return ["All"];
    const unique = [...new Set(projectsData.map((p) => p.category))];
    return ["All", ...unique];
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter, projectsData]);

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project Categories">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeFilter === cat}
            onClick={() => setActiveFilter(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              activeFilter === cat
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {cat === "All" ? t("projects.allCategory") : cat}
          </button>
        ))}
      </div>

      {/* Loading / Error state */}
      {loading && (
        <div className="mt-12 text-center text-muted">
          <p>{t("projects.loading")}</p>
        </div>
      )}

      {error && (
        <div className="mt-12 rounded-xl border border-border bg-surface p-8 text-center">
          <h3 className="text-lg font-semibold text-foreground">{t("projects.errorTitle")}</h3>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 0.04}>
                <ProjectCardView project={project} index={idx} />
              </Reveal>
            ))
          ) : (
            <div className="col-span-full mt-8 text-center">
              <h3 className="text-lg font-semibold text-foreground">{t("projects.emptyTitle")}</h3>
              <p className="mt-1 text-muted">{t("projects.emptyDesc")}</p>
              <button
                type="button"
                className="mt-4 inline-block rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background"
                onClick={() => setActiveFilter("All")}
              >
                {t("projects.emptyCta")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
