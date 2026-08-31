"use client";

import { useState } from "react";
import {
  getProjects,
  getProjectCategories,
} from "@/data/projects";
import ProjectCard from "@/components/project-card/ProjectCard";
import { useI18n } from "@/components/providers/I18nProvider";

export default function ProjectsGrid() {
  const { locale, t } = useI18n();
  const projects = getProjects(locale);
  const displayCategories = getProjectCategories(locale);
  const [activeIndex, setActiveIndex] = useState(0);

  const isAll = activeIndex === 0;

  const filtered = isAll
    ? projects
    : projects.filter((p) => p.category === getProjectCategories(locale)[activeIndex]);

  const [featured, ...rest] = filtered;

  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter projects">
        {displayCategories.map((c, i) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              activeIndex === i
                ? "border-foreground text-foreground"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted">{t("projects.empty")}</p>
      ) : (
        <div className="mt-10 space-y-10">
          {featured && (
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <ProjectCard project={featured} />
              </div>
            </div>
          )}
          {rest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
