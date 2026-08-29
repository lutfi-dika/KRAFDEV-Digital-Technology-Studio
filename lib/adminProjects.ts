"use client";

import { fetchProjectsFromSheet, type GoogleSheetsProject } from "@/lib/googleSheetsProjects";

const LOCAL_KEY = "krafdev-admin-projects";

export type AdminProject = GoogleSheetsProject;

function readLocal(): AdminProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as AdminProject[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(items: AdminProject[]) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export async function listProjects(): Promise<AdminProject[]> {
  try {
    const fromSheet = await fetchProjectsFromSheet();
    if (fromSheet.length > 0) return fromSheet;
  } catch {
    // fall through to local
  }
  return readLocal();
}

async function callApi(
  action: "add" | "update" | "delete",
  project?: AdminProject,
  id?: string,
): Promise<boolean> {
  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, project, id }),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
    return json.ok === true;
  } catch {
    return false;
  }
}

export async function addProject(project: AdminProject): Promise<boolean> {
  const ok = await callApi("add", project);
  if (!ok) {
    const items = readLocal();
    items.push(project);
    writeLocal(items);
  }
  return ok;
}

export async function updateProject(project: AdminProject): Promise<boolean> {
  const ok = await callApi("update", project);
  if (!ok) {
    const items = readLocal().map((p) => (p.id === project.id ? project : p));
    writeLocal(items);
  }
  return ok;
}

export async function deleteProject(id: string): Promise<boolean> {
  const ok = await callApi("delete", undefined, id);
  if (!ok) {
    writeLocal(readLocal().filter((p) => p.id !== id));
  }
  return ok;
}
