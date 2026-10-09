"use client";

import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ButtonArrow, buttonClass } from "./ButtonLink";
import { inquiryTypes, validateInquiry, type InquiryErrors, type InquiryField } from "@/lib/inquiry";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

const inputClass =
  "mt-2 block w-full rounded-xl border-0 bg-steel-50 px-4 py-3 text-base text-ink ring-1 ring-steel-200 transition-[box-shadow,background-color] placeholder:text-muted/70 focus:bg-paper focus:ring-2 focus:ring-steel-700 focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red";

export function InquiryForm() {
  const t = useTranslations("Contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const startedAt = useRef(0);
  const typeRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    startedAt.current = Date.now();
    // Links like /contact?type=brand preselect the type.
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
      <div role="status" className="flex items-start gap-4 rounded-2xl bg-steel-50 p-6 ring-1 ring-steel-200">
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
  const label = (name: InquiryField, text: string) => (
    <label htmlFor={`inquiry-${name}`} className="text-sm font-bold text-ink">
      {text}
      <span aria-hidden="true" className="text-red-ink"> *</span>
    </label>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <div>
        {label("name", t("name"))}
        <input {...field("name")} type="text" autoComplete="name" required maxLength={120} />
        {errorText("name")}
      </div>
      <div>
        {label("email", t("email"))}
        <input {...field("email")} type="email" autoComplete="email" required maxLength={200} />
        {errorText("email")}
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
        <textarea {...field("message")} rows={3} required minLength={10} maxLength={5000} />
        {errorText("message")}
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="inquiry-website">Website</label>
        <input id="inquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Status message, then the submit button on the right */}
      <div className="flex flex-wrap items-center justify-end gap-4 sm:col-span-2">
        <p aria-live="polite" className="me-auto text-sm font-semibold text-red-ink">
          {status === "invalid" && t("invalid")}
          {status === "error" && t("error")}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`${buttonClass("red")} disabled:translate-y-0 disabled:opacity-70`}
        >
          {status === "sending" ? t("sending") : t("submit")}
          {status === "sending" ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <ButtonArrow />}
        </button>
      </div>
    </form>
  );
}
