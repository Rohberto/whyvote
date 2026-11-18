import { cacheLife } from "next/cache";
import { supabase } from "@/lib/supabase";

/** Number of pledges so far, refreshed every few minutes. Null when the count is unavailable. */
async function pledgeCount(): Promise<number | null> {
  "use cache";
  cacheLife("minutes");
  const db = supabase();
  if (!db) return null;
  const { count, error } = await db.from("pledges").select("*", { count: "exact", head: true });
  if (error) {
    console.error("Pledge count failed:", error.message);
    return null;
  }
  return count ?? null;
}

export async function GET() {
  return Response.json({ count: await pledgeCount() });
}
