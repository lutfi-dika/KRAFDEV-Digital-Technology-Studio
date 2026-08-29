export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "In Progress"
  | "Revision"
  | "Completed"
  | "Cancelled";

export type PaymentStatus = "Unpaid" | "Pending" | "Paid";

export type Order = {
  id: string;
  projectType: string;
  packageName: string;
  budget: string;
  timeline: string;
  addons: string[];
  description: string;
  name: string;
  email: string;
  whatsapp: string;
  paymentMethod: string;
  estimatedPrice: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: string;
  notes: string[];
};

const ORDERS_KEY = "krafdev-orders";

export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const prefix = `KRF-${year}-`;
  const existing = getOrders();
  const maxSeq = existing.reduce((max, o) => {
    const num = Number(o.id.replace(prefix, ""));
    return Number.isFinite(num) ? Math.max(max, num) : max;
  }, 0);
  return `${prefix}${String(maxSeq + 1).padStart(4, "0")}`;
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function getOrder(id: string): Order | null {
  return getOrders().find((o) => o.id === id) ?? null;
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  orders.push(order);
  try {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // ignore
  }
  return order;
}

// Estimate price based on project type base price + add-ons
export const projectBasePrice: Record<string, number> = {
  Website: 2500000,
  "Landing Page": 1500000,
  "Company Profile": 3500000,
  "Web App": 8500000,
  "UI/UX": 3000000,
  SEO: 2000000,
  Custom: 5000000,
};

export const addonPrice: Record<string, number> = {
  dashboard: 2500000,
  payment: 3000000,
  api: 2000000,
  database: 1500000,
  "admin-panel": 2000000,
  "multi-language": 1000000,
  "dark-mode": 500000,
  analytics: 1000000,
  seo: 1500000,
};

export function estimatePrice(
  projectType: string,
  addons: string[],
  timeline: string,
): number {
  const base = projectBasePrice[projectType] ?? projectBasePrice.Custom;
  const addonsTotal = addons.reduce(
    (sum, a) => sum + (addonPrice[a] ?? 0),
    0,
  );
  const rushMultiplier =
    timeline === "ASAP" || timeline === "1–2 minggu" ? 1.2 : 1;
  return Math.round((base + addonsTotal) * rushMultiplier);
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const ADMIN_WHATSAPP = "6285135977841";

export function waLink(message?: string): string {
  const base = `https://wa.me/${ADMIN_WHATSAPP}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
