"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  projectTypes,
  projectAddons,
  getOrderBudgets,
  getOrderTimelines,
  budgetLabel,
  timelineLabel,
} from "@/data/pricing";
import { estimatePrice } from "@/lib/orders";
import { useI18n } from "@/components/providers/I18nProvider";

export type OrderDraft = {
  projectType: string;
  budget: string;
  timeline: string;
  addons: string[];
  description: string;
  attachmentName?: string;
  name: string;
  email: string;
  whatsapp: string;
};

const DRAFT_KEY = "krafdev-order-draft";

const inputClass =
  "w-full h-11 rounded-md border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted focus:outline-2 focus:outline-accent";

const selectClass = (selected: boolean) =>
  `rounded-md border px-3 py-2.5 text-sm text-left transition-colors ${
    selected
      ? "border-accent bg-accent/10 text-foreground"
      : "border-border text-secondary hover:text-foreground"
  }`;

export default function OrderConfigurator() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const steps = [
    t("order.stepService"),
    t("order.stepPackage"),
    t("order.stepDetails"),
    t("order.stepReview"),
  ];
  const budgets = getOrderBudgets(locale);
  const timelines = getOrderTimelines(locale);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<OrderDraft>({
    projectType: "",
    budget: "",
    timeline: "",
    addons: [],
    description: "",
    name: "",
    email: "",
    whatsapp: "",
  });
  const [fileName, setFileName] = useState<string>();
  const [error, setError] = useState("");

  function update<K extends keyof OrderDraft>(key: K, value: OrderDraft[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  }

  function toggleAddon(id: string) {
    setForm((f) => ({
      ...f,
      addons: f.addons.includes(id)
        ? f.addons.filter((a) => a !== id)
        : [...f.addons, id],
    }));
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileName(file?.name);
  }

  const stepError = (): string => {
    switch (step) {
      case 0:
        return !form.projectType ? t("order.pickServiceErr") : "";
      case 1:
        return !form.budget ? t("order.pickBudgetErr") : "";
      case 2:
        return !form.timeline ? t("order.pickTimelineErr") : "";
      default:
        if (!form.name) return t("order.nameErr");
        if (!form.email) return t("order.emailErr");
        return "";
    }
  };

  function next() {
    const err = stepError();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const err = stepError();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    const draft = { ...form, attachmentName: fileName };
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // ignore
    }
    router.push("/checkout");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Step indicator */}
      <ol className="flex items-center gap-2 overflow-x-auto">
        {steps.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={label} className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                disabled={i > step}
                onClick={() => done && setStep(i)}
                className={`flex items-center gap-2 ${done ? "cursor-pointer" : ""}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                    done
                      ? "border-accent bg-accent text-white"
                      : active
                        ? "border-accent bg-accent/10 text-accent-strong"
                        : "border-border text-muted"
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-xs font-medium ${
                    active ? "text-foreground" : done ? "text-foreground" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <span
                  className={`h-px w-6 ${done ? "bg-accent" : "bg-border"}`}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Step 1: Service */}
      {step === 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("order.chooseService")}</h2>
          <p className="mt-1 text-sm text-muted">{t("order.pickService")}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {projectTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => update("projectType", type)}
                className={selectClass(form.projectType === type)}
              >
                {type}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 2: Package / Budget */}
      {step === 1 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("order.chooseBudget")}</h2>
          <p className="mt-1 text-sm text-muted">{t("order.pickBudget")}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {budgets.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update("budget", opt.value)}
                className={selectClass(form.budget === opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 3: Project Details */}
      {step === 2 && (
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-foreground">{t("order.timeline")}</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {timelines.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update("timeline", opt.value)}
                  className={selectClass(form.timeline === opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">{t("order.addons")}</h2>
            <p className="mt-1 text-sm text-muted">{t("order.addonsDesc")}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {projectAddons.map((addon) => (
                <label
                  key={addon.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors ${
                    form.addons.includes(addon.id)
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border text-foreground"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.addons.includes(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                    className="h-4 w-4 accent-accent"
                  />
                  {addon.label}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">{t("order.projectDesc")}</h2>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={5}
              placeholder={t("order.projectDescPh")}
              className="mt-4 w-full resize-y rounded-md border border-border bg-surface px-3.5 py-3 text-sm text-foreground placeholder:text-muted focus:outline-2 focus:outline-accent"
            />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {t("order.attachment")}{" "}
              <span className="text-sm font-normal text-muted">{t("order.attachmentOptional")}</span>
            </h2>
            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted hover:border-accent">
              <input type="file" className="hidden" onChange={handleFile} />
              {fileName ? (
                <span className="text-foreground">{fileName}</span>
              ) : (
                <span>{t("order.attachPh")}</span>
              )}
            </label>
          </section>
        </div>
      )}

      {/* Step 4: Review & Contact */}
      {step === 3 && (
        <div className="space-y-8">
          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold text-foreground">{t("order.review")}</h2>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted">{t("order.service")}</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {form.projectType}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{t("order.budget")}</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {budgetLabel(locale, form.budget)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{t("order.timelineLabel")}</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {timelineLabel(locale, form.timeline)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{t("order.estimatedPrice")}</dt>
                <dd className="mt-1 font-bold text-foreground">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(
                    estimatePrice(form.projectType, form.addons, form.timeline) || 0,
                  )}
                </dd>
              </div>
            </dl>
            {form.addons.length > 0 && (
              <div className="mt-4">
                <dt className="text-xs text-muted">{t("order.addonsLabel")}</dt>
                <div className="mt-2 flex flex-wrap gap-2">
                  {form.addons.map((a) => (
                    <span
                      key={a}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">{t("order.contactInfo")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                  {t("order.name")} *
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder={t("order.namePh")}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                  {t("order.email")} *
                </label>
                <input
                  id="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  type="email"
                  placeholder={t("order.emailPh")}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-medium text-foreground">
                  {t("order.whatsapp")}
                </label>
                <input
                  id="whatsapp"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  placeholder={t("order.whatsappPh")}
                  className={inputClass}
                />
              </div>
            </div>
          </section>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center justify-between border-t border-border pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> {t("order.back")}
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90"
          >
            {t("order.continue")} <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90"
          >
            {t("order.continueToCheckout")} <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
}
