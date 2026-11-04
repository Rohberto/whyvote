import type { NextRequest } from "next/server";
import { unsubscribe } from "@/lib/email/unsubscribe";

/** One-click unsubscribe (RFC 8058), used by Gmail and other mail apps from the List-Unsubscribe header. */
export async function POST(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const result = await unsubscribe(q.get("email") ?? "", q.get("token") ?? "");
  return new Response(null, { status: result === "done" ? 200 : result === "invalid" ? 400 : 500 });
}
