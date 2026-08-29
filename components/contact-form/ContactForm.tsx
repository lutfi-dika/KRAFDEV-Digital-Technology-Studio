"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/components/providers/I18nProvider";

type Errors = Partial<Record<string, string>>;

const fieldClass =
  "w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-2 focus:outline-accent";

export default function ContactForm() {
  const { t } = useI18n();
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = t("contactForm.nameRequired");
    if (!form.email.trim()) {
      e.email = t("contactForm.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t("contactForm.emailInvalid");
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      e.message = t("contactForm.messageRequired");
    }
    return e;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("sending");
    setTimeout(() => setStatus("success"), 800);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            {t("contactForm.name")} *
          </label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t("contactForm.namePh")}
            className={fieldClass}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            {t("contactForm.email")} *
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={t("contactForm.emailPh")}
            className={fieldClass}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-medium text-foreground">
            {t("contactForm.whatsapp")}
          </label>
          <input
            id="whatsapp"
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder={t("contactForm.whatsappPh")}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
            {t("contactForm.subject")}
          </label>
          <input
            id="subject"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            placeholder={t("contactForm.subjectPh")}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          {t("contactForm.message")} *
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          placeholder={t("contactForm.messagePh")}
          className={`${fieldClass} resize-y`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending"
          ? t("contactForm.sending")
          : status === "success"
            ? t("contactForm.sent")
            : t("contactForm.send")}
      </button>
    </form>
  );
}
