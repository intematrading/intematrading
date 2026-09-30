"use client";

import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { inquiryTypes, validateInquiry, type InquiryErrors, type InquiryField } from "@/lib/inquiry";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

const inputClass =
  "mt-2 block w-full border-0 bg-paper px-4 py-3 text-base text-ink ring-1 ring-line transition-shadow placeholder:text-muted/70 focus:ring-2 focus:ring-black focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red";

export function InquiryForm() {
  const t = useTranslations("Contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const startedAt = useRef(0);
  const typeRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    startedAt.current = Date.now();
    // Links like /contact?type=brand#inquiry arrive with the type chosen.
    const type = new URLSearchParams(window.location.search).get("type");
    if (typeRef.current && type && (inquiryTypes as readonly string[]).includes(type)) typeRef.current.value = type;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const { errors: found } = validateInquiry(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setStatus("invalid");
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale, startedAt: startedAt.current }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex items-start gap-4 bg-paper p-6 ring-1 ring-line">
        <CheckCircle2 aria-hidden="true" className="size-7 shrink-0 text-red" />
        <p className="text-base font-semibold text-ink">{t("success")}</p>
      </div>
    );
  }

  const field = (name: InquiryField) => ({
    id: `inquiry-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `inquiry-${name}-error` : undefined,
    className: inputClass,
  });
  const errorText = (name: InquiryField) =>
    errors[name] ? (
      <p id={`inquiry-${name}-error`} className="mt-1.5 text-sm font-semibold text-red-ink">
        {t(errors[name])}
      </p>
    ) : null;
  const label = (name: InquiryField, text: string, optional = false) => (
    <label htmlFor={`inquiry-${name}`} className="text-sm font-bold text-ink">
      {text}
      {optional ? <span className="font-normal text-muted"> ({t("optional")})</span> : <span aria-hidden="true" className="text-red-ink"> *</span>}
    </label>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        {label("name", t("name"))}
        <input {...field("name")} type="text" autoComplete="name" required maxLength={120} />
        {errorText("name")}
      </div>
      <div>
        {label("company", t("company"), true)}
        <input {...field("company")} type="text" autoComplete="organization" maxLength={160} />
      </div>
      <div>
        {label("email", t("email"))}
        <input {...field("email")} type="email" autoComplete="email" required maxLength={200} />
        {errorText("email")}
      </div>
      <div>
        {label("phone", t("phone"), true)}
        <input {...field("phone")} type="tel" autoComplete="tel" maxLength={40} />
      </div>
      <div className="sm:col-span-2">
        {label("inquiryType", t("inquiryType"))}
        <select {...field("inquiryType")} ref={typeRef} defaultValue="retail">
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {t(`types.${type}`)}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        {label("message", t("message"))}
        <textarea {...field("message")} rows={6} required minLength={10} maxLength={5000} />
        {errorText("message")}
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="inquiry-website">Website</label>
        <input id="inquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative isolate inline-flex min-h-12 items-center gap-2.5 px-7 text-base font-bold text-paper transition-transform duration-300 ease-out before:absolute before:inset-0 before:-z-10 before:-skew-x-[14deg] before:bg-red before:transition-colors hover:-translate-y-1 hover:before:bg-black disabled:translate-y-0 disabled:opacity-70 motion-reduce:transition-none"
        >
          {status === "sending" && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
          {status === "sending" ? t("sending") : t("submit")}
        </button>
        <p aria-live="polite" className="text-sm font-semibold text-red-ink">
          {status === "invalid" && t("invalid")}
          {status === "error" && t("error")}
        </p>
      </div>
    </form>
  );
}
