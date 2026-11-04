import { verifyUnsubscribe } from "@/lib/email/send";
import { supabase } from "@/lib/supabase";

/** Marks a pledge as unsubscribed. Needs the `unsubscribed_at` column (see supabase/pledges.sql). */
export async function unsubscribe(email: string, token: string) {
  if (!email || !verifyUnsubscribe(email, token)) return "invalid" as const;
  const db = supabase();
  if (!db) return "error" as const;
  const { error } = await db.from("pledges").update({ unsubscribed_at: new Date().toISOString() }).eq("email", email.toLowerCase());
  if (error) {
    console.error("Unsubscribe failed:", error.message);
    return "error" as const;
  }
  return "done" as const;
}
