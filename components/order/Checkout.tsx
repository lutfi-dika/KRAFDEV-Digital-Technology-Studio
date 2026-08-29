"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import {
  projectAddons,
  getPaymentMethods,
  budgetLabel,
  timelineLabel,
} from "@/data/pricing";
import {
  generateOrderId,
  saveOrder,
  estimatePrice,
  formatRupiah,
  type Order,
} from "@/lib/orders";
import { useI18n } from "@/components/providers/I18nProvider";
import type { OrderDraft } from "./OrderConfigurator";

const DRAFT_KEY = "krafdev-order-draft";

const ADDON_LABELS: Record<string, string> = Object.fromEntries(
  projectAddons.map((a) => [a.id, a.label]),
);

export default function Checkout() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const paymentOptions = getPaymentMethods(locale);
  const [draft, setDraft] = useState<OrderDraft | null>(null);
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]?.id ?? "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const timeout = setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(DRAFT_KEY);
        if (active && raw) setDraft(JSON.parse(raw) as OrderDraft);
      } catch {
        // ignore
      }
      if (active) setLoading(false);
    }, 0);
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, []);

  if (loading) return null;

  if (!draft) {
    return (
      <div className="rounded-xl border border-border bg-surface p-10 text-center">
        <p className="text-muted">{t("checkout.noDraft")}</p>
        <Link
          href="/order"
          className="mt-5 inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90"
        >
          {t("checkout.startProject")}
        </Link>
      </div>
    );
  }

  const draftData: OrderDraft = draft;

  const price = estimatePrice(draftData.projectType, draftData.addons, draftData.timeline);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const order: Order = {
      id: generateOrderId(),
      projectType: draftData.projectType,
      packageName: draftData.budget,
      budget: draftData.budget,
      timeline: draftData.timeline,
      addons: draftData.addons,
      description: draftData.description,
      name: draftData.name,
      email: draftData.email,
      whatsapp: draftData.whatsapp,
      paymentMethod,
      estimatedPrice: price,
      paymentStatus: "Pending",
      status: "Pending",
      createdAt: new Date().toISOString(),
      notes: [t("checkout.orderReceived")],
    };
    saveOrder(order);
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
    router.push(`/order/${order.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* Project summary */}
        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">{t("checkout.projectSummary")}</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">{t("checkout.projectType")}</dt>
              <dd className="mt-1 font-medium text-foreground">{draft.projectType}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t("checkout.budget")}</dt>
              <dd className="mt-1 font-medium text-foreground">
                {budgetLabel(locale, draft.budget)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t("checkout.timeline")}</dt>
              <dd className="mt-1 font-medium text-foreground">
                {timelineLabel(locale, draft.timeline)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t("checkout.estimatedPrice")}</dt>
              <dd className="mt-1 font-bold text-foreground">{formatRupiah(price)}</dd>
            </div>
          </dl>
          {draft.addons.length > 0 && (
            <div className="mt-4">
              <dt className="text-xs text-muted">{t("checkout.addons")}</dt>
              <div className="mt-2 flex flex-wrap gap-2">
                {draft.addons.map((a) => {
                  const label = ADDON_LABELS[a] ?? a;
                  return (
                    <span
                      key={a}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {draft.description && (
            <div className="mt-4">
              <dt className="text-xs text-muted">{t("checkout.description")}</dt>
              <dd className="mt-1 text-sm text-foreground">{draft.description}</dd>
            </div>
          )}
        </section>

        {/* Client info */}
        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">{t("checkout.clientInfo")}</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted">{t("checkout.name")}</dt>
              <dd className="mt-1 font-medium text-foreground">{draft.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t("checkout.email")}</dt>
              <dd className="mt-1 font-medium text-foreground">{draft.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t("checkout.whatsapp")}</dt>
              <dd className="mt-1 font-medium text-foreground">
                {draft.whatsapp || "-"}
              </dd>
            </div>
          </dl>
        </section>

        {/* Payment method */}
        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">{t("checkout.paymentMethod")}</h2>
          <p className="mt-1 text-sm text-muted">{t("checkout.paymentHint")}</p>
          <div className="mt-4 space-y-2">
            {paymentOptions.map((m) => (
              <label
                key={m.id}
                className={`flex cursor-pointer items-center gap-3 rounded-md border p-3.5 ${
                  paymentMethod === m.id
                    ? "border-accent bg-accent/10"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === m.id}
                  onChange={() => setPaymentMethod(m.id)}
                  className="h-4 w-4 accent-accent"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{m.label}</p>
                  <p className="text-xs text-muted">{m.description}</p>
                </div>
              </label>
            ))}
          </div>
        </section>
      </div>

      {/* Order summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">{t("checkout.orderSummary")}</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">{t("checkout.base")} ({draft.projectType})</span>
              <span className="text-foreground">
                {formatRupiah(estimatePrice(draft.projectType, [], "1 bulan"))}
              </span>
            </div>
            {draft.addons.length > 0 && (
              <div className="flex justify-between">
                <span className="text-muted">{t("checkout.addonsIncluded")} ({draft.addons.length})</span>
                <span className="text-foreground">{t("checkout.included")}</span>
              </div>
            )}
            <div className="border-t border-border pt-3 mt-3 flex justify-between">
              <span className="font-medium text-foreground">{t("checkout.estimatedTotal")}</span>
              <span className="font-bold text-accent">{formatRupiah(price)}</span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent/90"
          >
            <Check className="h-4 w-4" /> {t("checkout.confirmOrder")}
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            {t("checkout.noPayment")}
          </p>
        </div>
      </div>
    </form>
  );
}
