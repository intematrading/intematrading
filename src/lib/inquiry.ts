// Shared by the inquiry form (client) and /api/contact (server).

export const inquiryTypes = ["retail", "buyer", "brand", "other"] as const;
export type InquiryType = (typeof inquiryTypes)[number];

export type InquiryInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  message: string;
};

export type InquiryField = keyof InquiryInput;
export type InquiryErrors = Partial<Record<InquiryField, "required" | "invalidEmail" | "tooShort">>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX: Record<InquiryField, number> = { name: 120, company: 160, email: 200, phone: 40, inquiryType: 20, message: 5000 };

/** Trims and bounds every field; returns per-field error codes (empty when valid). */
export function validateInquiry(raw: Record<string, unknown>): { data: InquiryInput; errors: InquiryErrors } {
  const str = (k: InquiryField) => (typeof raw[k] === "string" ? (raw[k] as string).trim().slice(0, MAX[k]) : "");
  const type = str("inquiryType");
  const data: InquiryInput = {
    name: str("name"),
    company: str("company"),
    email: str("email"),
    phone: str("phone"),
    inquiryType: (inquiryTypes as readonly string[]).includes(type) ? (type as InquiryType) : "other",
    message: str("message"),
  };
  const errors: InquiryErrors = {};
  if (!data.name) errors.name = "required";
  if (!data.email) errors.email = "required";
  else if (!EMAIL.test(data.email)) errors.email = "invalidEmail";
  if (!data.message) errors.message = "required";
  else if (data.message.length < 10) errors.message = "tooShort";
  return { data, errors };
}

/** Submissions faster than this after the form rendered are treated as bots. */
export const MIN_FILL_MS = 3000;
