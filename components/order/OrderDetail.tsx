"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrder, formatRupiah, waLink, type Order } from "@/lib/orders";
import { paymentMethods, projectAddons, budgetLabel, timelineLabel } from "@/data/pricing";
import { CheckCircle2, Clock, Loader2, MessageCircle } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";

const ADDON_LABELS: Record<string, string> = Object.fromEntries(
  projectAddons.map((a) => [a.id, a.label]),
);

const PAYMENT_LABELS: Record<string, string> = Object.fromEntries(
  paymentMethods.map((m) => [m.id, m.label]),
);

const statusColor: Record<string, string> = {
  Pending: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
  Confirmed: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "In Progress": "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  Revision: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  Completed: "bg-green-500/15 text-green-600 dark:text-green-400",
  Cancelled: "bg-red-500/15 text-red-600 dark:text-red-400",
};

export default function OrderDetail({ id }: { id: string }) {
  const { t, locale } = useI18n();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const timeout = setTimeout(() => {
      const found = getOrder(id);
      if (active) {
        setOrder(found);
        setLoading(false);
      }
    }, 0);
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [id]);

  if (loading) {
    return (
      <p className="flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" /> {t("orderDetail.loading")}
      </p>
    );
  }

  if (!order) {
    return (
      <div className="rounded-xl border border-border bg-surface p-10 text-center">
        <p className="text-muted">{t("orderDetail.notFound")}</p>
        <Link
          href="/order"
          className="mt-5 inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90"
        >
          {t("orderDetail.startNew")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* Header */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted">{t("orderDetail.orderId")}</p>
              <h1 className="text-2xl font-bold text-foreground">{order.id}</h1>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[order.status]}`}
            >
              {order.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            {t("orderDetail.placedOn")} {new Date(order.createdAt).toLocaleDateString("id-ID")}
          </p>
        </div>

        {/* Project info */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">{t("orderDetail.project")}</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">{t("orderDetail.projectType")}</dt>
              <dd className="mt-1 font-medium text-foreground">{order.projectType}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t("orderDetail.estimatedPrice")}</dt>
              <dd className="mt-1 font-bold text-foreground">
                {formatRupiah(order.estimatedPrice)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t("orderDetail.timeline")}</dt>
              <dd className="mt-1 font-medium text-foreground">
                {timelineLabel(locale, order.timeline)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t("orderDetail.budget")}</dt>
              <dd className="mt-1 font-medium text-foreground">
                {budgetLabel(locale, order.budget)}
              </dd>
            </div>
          </dl>
          {order.addons.length > 0 && (
            <div className="mt-4">
              <dt className="text-xs text-muted">{t("orderDetail.addons")}</dt>
              <div className="mt-2 flex flex-wrap gap-2">
                {order.addons.map((a) => (
                  <span
                    key={a}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                  >
                    {ADDON_LABELS[a] ?? a}
                  </span>
                ))}
              </div>
            </div>
          )}
          {order.description && (
            <div className="mt-4">
              <dt className="text-xs text-muted">{t("orderDetail.description")}</dt>
              <dd className="mt-1 text-sm text-foreground">{order.description}</dd>
            </div>
          )}
        </div>

        {/* Payment status */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">{t("orderDetail.payment")}</h2>
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                order.paymentStatus === "Paid"
                  ? "bg-green-500/15 text-green-600 dark:text-green-400"
                  : "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400"
              }`}
            >
              {order.paymentStatus}
            </span>
            <span className="text-sm text-muted">{t("orderDetail.via")} {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}</span>
          </div>
          <p className="mt-3 text-xs text-muted">
            {t("orderDetail.paymentHint")}
          </p>
        </div>

        {/* Notes / timeline */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Clock className="h-5 w-5 text-accent" /> {t("orderDetail.timelineAndNotes")}
          </h2>
          <ul className="mt-4 space-y-3">
            {order.notes.map((note, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Client info */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">{t("orderDetail.client")}</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted">{t("orderDetail.name")}</dt>
              <dd className="mt-1 font-medium text-foreground">{order.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t("orderDetail.email")}</dt>
              <dd className="mt-1 font-medium text-foreground">{order.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t("orderDetail.whatsapp")}</dt>
              <dd className="mt-1 font-medium text-foreground">
                {order.whatsapp || "-"}
              </dd>
            </div>
          </dl>
          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-muted">{t("orderDetail.waHint")}</p>
            <a
              href={waLink(
                `Halo KRAFDEV, saya baru membuat order ${order.id} (${order.projectType}, ${formatRupiah(
                  order.estimatedPrice,
                )}). Mohon info pembayaran & konfirmasi order.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90"
            >
              <MessageCircle className="h-4 w-4" /> {t("orderDetail.waChat")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
