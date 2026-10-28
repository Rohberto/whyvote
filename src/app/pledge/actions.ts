"use server";

import { STATES } from "@/lib/nigeria";
import { supabase } from "@/lib/supabase";

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
    // Stored in international format (+234...) so SMS providers can use it as is.
    phone: phoneRaw ? phoneRaw.replace(/^(?:\+?234|0)/, "+234") : null,
    state: (STATES as readonly string[]).includes(state) ? state : null,
    lga: lga || null,
    sms_opt_in: sms && Boolean(phoneRaw),
  };

  const db = supabase();
  if (!db) {
    console.error("Pledge not saved: SUPABASE_URL or SUPABASE_SECRET_KEY is not set.");
    return { status: "error", message: "We couldn’t save your pledge just now. Please try again in a moment." };
  }
  // One pledge per email: pledging again updates the earlier one.
  const { error } = await db.from("pledges").upsert(
    { ...pledge, updated_at: new Date().toISOString() },
    { onConflict: "email" },
  );
  if (error) {
    console.error("Pledge not saved:", error.message);
    return { status: "error", message: "We couldn’t save your pledge just now. Please try again in a moment." };
  }

  return { status: "done", firstName: name.split(/\s+/)[0], email, phone: pledge.phone };
}
