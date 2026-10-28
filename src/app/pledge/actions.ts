"use server";

import { STATES } from "@/lib/nigeria";

export type PledgeState =
  | { status: "idle" }
  | { status: "error"; message: string; fields?: Partial<Record<"name" | "email" | "phone", string>> }
  | { status: "done"; firstName: string; email: string; phone: string | null };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NG_PHONE = /^(?:\+?234|0)[789][01]\d{8}$/;

export async function submitPledge(_prev: PledgeState, formData: FormData): Promise<PledgeState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phoneRaw = String(formData.get("phone") ?? "").replace(/[\s-]/g, "");
  const state = String(formData.get("state") ?? "");
  const lga = String(formData.get("lga") ?? "").trim();
  const sms = formData.get("sms") === "on";

  const fields: Partial<Record<"name" | "email" | "phone", string>> = {};
  if (name.length < 2) fields.name = "Enter your name.";
  if (!EMAIL.test(email)) fields.email = "Enter a valid email address.";
  if (phoneRaw && !NG_PHONE.test(phoneRaw)) fields.phone = "Enter a Nigerian mobile number, like 0803 000 0000.";
  if (Object.keys(fields).length) {
    return { status: "error", message: "Check the highlighted details.", fields };
  }

  const pledge = {
    name,
    email,
    phone: phoneRaw || null,
    state: (STATES as readonly string[]).includes(state) ? state : null,
    lga: lga || null,
    sms: sms && Boolean(phoneRaw),
    createdAt: new Date().toISOString(),
  };

  // TODO: persist the pledge (for example a Supabase `pledges` table) and queue the reminder messages.
  void pledge;

  return { status: "done", firstName: name.split(/\s+/)[0], email, phone: pledge.phone };
}
