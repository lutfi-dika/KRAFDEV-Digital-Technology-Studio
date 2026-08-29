"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Power, LayoutDashboard, FolderKanban, Inbox } from "lucide-react";
import { isAuthenticated, logout } from "@/lib/admin";
import {
  listProjects,
  addProject,
  updateProject,
  deleteProject,
  type AdminProject,
} from "@/lib/adminProjects";
import { getOrders, formatRupiah, type Order } from "@/lib/orders";

const EMPTY: AdminProject = {
  id: "",
  name: "",
  category: "",
  description: "",
  image: "",
  link: "#",
  year: "2026",
  status: "Done",
  featured: false,
  tags: [],
};

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `project-${Date.now()}`
  );
}

type Tab = "projects" | "orders";

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("projects");

  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [form, setForm] = useState<AdminProject>(EMPTY);
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/admin/login");
      return;
    }
    let active = true;
    const t1 = setTimeout(() => setAuthed(true), 0);
    listProjects().then((p) => {
      if (active) setProjects(p);
    });
    const t2 = setTimeout(() => setOrders(getOrders()), 0);
    return () => {
      active = false;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [router]);

  if (authed === null) {
    return <div className="px-4 py-16 text-muted">Loading...</div>;
  }

  function showNotice(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  }

  function handleAdd() {
    setEditing(false);
    setForm(EMPTY);
  }

  function handleEdit(p: AdminProject) {
    setEditing(true);
    setForm(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const id = editing ? form.id : form.id || slugify(form.name);
    const payload: AdminProject = { ...form, id };
    if (editing) {
      await updateProject(payload);
      setProjects((ps) => ps.map((p) => (p.id === id ? payload : p)));
      showNotice("Project diperbarui (tersimpan di browser; GAS bila dikonfigurasi).");
    } else {
      await addProject(payload);
      setProjects((ps) => [payload, ...ps]);
      showNotice("Project ditambahkan (tersimpan di browser; GAS bila dikonfigurasi).");
    }
    setForm(EMPTY);
    setEditing(false);
  }

  async function handleDelete(id: string) {
    await deleteProject(id);
    setProjects((ps) => ps.filter((p) => p.id !== id));
    showNotice("Project dihapus.");
  }

  function handleLogout() {
    logout();
    router.replace("/admin/login");
  }

  function updateOrderStatus(id: string, status: Order["status"]) {
    const orders = getOrders();
    const target = orders.find((o) => o.id === id);
    if (target) {
      target.status = status;
      try {
        window.localStorage.setItem(
          "krafdev-orders",
          JSON.stringify(
            orders.map((o) => (o.id === id ? { ...o, status } : o)),
          ),
        );
      } catch {
        // ignore
      }
    }
  }

  const statusOptions: Order["status"][] = [
    "Pending",
    "Confirmed",
    "In Progress",
    "Revision",
    "Completed",
    "Cancelled",
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Admin</h1>
          <p className="text-sm text-muted">Kelola project &amp; pesanan KRAFDEV.</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
        >
          <Power className="h-4 w-4" /> Logout
        </button>
      </div>

      {notice && (
        <div className="mt-4 rounded-md border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm text-foreground">
          {notice}
        </div>
      )}

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-border">
        {(
          [
            { id: "projects", label: "Projects", icon: FolderKanban },
            { id: "orders", label: "Orders", icon: Inbox },
          ] as { id: Tab; label: string; icon: typeof FolderKanban }[]
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === item.id
                ? "border-accent text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" /> {item.label}
          </button>
        ))}
      </div>

      {tab === "projects" ? (
        <div className="mt-8 grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                {editing ? (
                  <>
                    <Pencil className="h-5 w-5 text-accent" /> Edit Project
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 text-accent" /> Tambah Project
                  </>
                )}
              </h2>
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <Field label="Nama">
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                    placeholder="Nama Project"
                  />
                </Field>
                <Field label="Kategori">
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={inputCls}
                    placeholder="Website / Landing Page / dll"
                  />
                </Field>
                <Field label="Deskripsi">
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`${inputCls} min-h-[72px]`}
                    placeholder="Deskripsi singkat"
                  />
                </Field>
                <Field label="URL Gambar">
                  <input
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className={inputCls}
                    placeholder="https://..."
                  />
                </Field>
                <Field label="URL Project">
                  <input
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className={inputCls}
                    placeholder="https://..."
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Tahun">
                    <input
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Tags (koma)">
                    <input
                      value={form.tags.join(", ")}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          tags: e.target.value.split(",").map((s) => s.trim()),
                        })
                      }
                      className={inputCls}
                      placeholder="React, Tailwind"
                    />
                  </Field>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="h-4 w-4 accent-accent"
                    />
                    Featured
                  </label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90"
                  >
                    {editing ? "Simpan Perubahan" : "Tambah Project"}
                  </button>
                  {editing && (
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="rounded-md border border-border px-4 py-2.5 text-sm text-muted hover:text-foreground"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 text-sm text-muted">
              <LayoutDashboard className="h-4 w-4" /> {projects.length} project dari Google Sheets
            </div>
            <div className="mt-4 space-y-3">
              {projects.length === 0 ? (
                <p className="text-muted">Belum ada project.</p>
              ) : (
                projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="h-14 w-20 shrink-0 overflow-hidden rounded-md bg-background">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-foreground">{p.name}</p>
                      <p className="truncate text-xs text-muted">
                        {p.category} · {p.year}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        aria-label="Edit"
                        className="rounded-md border border-border p-2 text-muted hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        aria-label="Hapus"
                        className="rounded-md border border-border p-2 text-red-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <OrdersTab orders={orders} statusOptions={statusOptions} onStatus={updateOrderStatus} />
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function OrdersTab({
  orders,
  statusOptions,
  onStatus,
}: {
  orders: Order[];
  statusOptions: Order["status"][];
  onStatus: (id: string, status: Order["status"]) => void;
}) {
  return (
    <div className="mt-8">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <Inbox className="h-5 w-5 text-accent" /> Pesanan Masuk ({orders.length})
      </h2>
      {orders.length === 0 ? (
        <p className="mt-4 text-muted">
          Belum ada pesanan. Pesanan yang dikirim lewat halaman order tersimpan di browser ini.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-foreground">{o.id}</p>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
                    {o.projectType}
                  </span>
                </div>
                <p className="font-semibold text-accent">{formatRupiah(o.estimatedPrice)}</p>
              </div>
              <p className="mt-2 text-sm text-foreground">{o.name}</p>
              <p className="text-xs text-muted">
                {o.whatsapp || "-"} · {o.email}
              </p>
              <p className="mt-1 text-xs text-muted">{o.description || "Tidak ada deskripsi"}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-muted">Status:</span>
                <select
                  value={o.status}
                  onChange={(e) => onStatus(o.id, e.target.value as Order["status"])}
                  className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
