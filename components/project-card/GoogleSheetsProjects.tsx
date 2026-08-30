"use client";

import { useState, useMemo, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { fetchProjectsFromSheet, type GoogleSheetsProject } from "@/lib/googleSheetsProjects";
import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

function ProjectLink({
  project,
  children,
  className = "",
}: {
  project: GoogleSheetsProject;
  children: React.ReactNode;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("projects.viewProject")} ${project.name}`}
      className={className}
    >
      {children}
    </a>
  );
}

function FeaturedProject({ project, index }: { project: GoogleSheetsProject; index: number }) {
  const { t } = useI18n();
  return (
    <ProjectLink
      project={project}
      className="group grid overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-foreground/25 lg:grid-cols-2"
    >
      {/* Visual */}
      <div className="relative aspect-[16/10] overflow-hidden bg-background lg:aspect-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-7 sm:p-9">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {t("projects.projectLabel")} / {String(index + 1).padStart(2, "0")}
          </p>
          <span className="mt-4 inline-block text-xs font-medium uppercase tracking-wide text-accent">
            {project.category}
          </span>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-3 max-w-prose leading-relaxed text-muted">
            {project.description}
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-x-6 gap-y-4 border-t border-border pt-5">
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-muted">
                {t("projects.projectLabel")}
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">{project.category}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-muted">
                {t("projects.yearLabel")}
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">{project.year}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-muted">
                {t("projects.statusLabel")}
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">{project.status}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          {t("projects.viewCaseStudy")}
          <span className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
            <ExternalLink className="h-4 w-4" />
          </span>
        </div>
      </div>
    </ProjectLink>
  );
}

function CompactProject({ project, index }: { project: GoogleSheetsProject; index: number }) {
  const { t } = useI18n();
  return (
    <ProjectLink
      project={project}
      className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-foreground/25"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono uppercase tracking-wider text-muted">
          {t("projects.projectLabel")} {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-muted tabular-nums">{project.year}</span>
      </div>

      <span className="mt-4 text-xs font-medium uppercase tracking-wide text-accent">
        {project.category}
      </span>
      <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground">
        {project.name}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag, tIdx) => (
          <span
            key={`${tag}-${tIdx}`}
            className="rounded border border-border bg-background px-2 py-0.5 text-xs text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-accent">
          {t("projects.viewProject")}
          <span className="text-muted transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowIcon />
          </span>
        </span>
      </div>
    </ProjectLink>
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

  const featured = filteredProjects.find((p) => p.featured);
  const rest = featured
    ? filteredProjects.filter((p) => p.id !== featured.id)
    : filteredProjects.slice(1);

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

      {/* Projects */}
      {!loading && !error && (
        <div className="mt-10 space-y-6">
          {filteredProjects.length > 0 ? (
            <>
              {(featured ?? filteredProjects[0]) && (
                <Reveal>
                  <FeaturedProject
                    project={featured ?? filteredProjects[0]}
                    index={rest.length}
                  />
                </Reveal>
              )}

              {rest.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((project, idx) => (
                    <Reveal key={project.id} delay={idx * 0.04}>
                      <CompactProject project={project} index={idx + 1} />
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="mt-8 text-center">
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
