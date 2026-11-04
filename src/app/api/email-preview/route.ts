import type { NextRequest } from "next/server";
import { existsSync } from "node:fs";
import path from "node:path";
import { ballotSummary } from "@/lib/ballot-summary";
import { pledgeEmail } from "@/lib/email/pledge-email";
import { unsubscribeUrl } from "@/lib/email/send";
import { SITE_URL } from "@/lib/site";

/**
 * Development only: preview the pledge email in the browser.
 *   /api/email-preview?name=Tolu&state=lagos&lga=ajeromi-ifelodun
 */
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") return new Response("Not found", { status: 404 });
  const q = req.nextUrl.searchParams;
  const state = q.get("state") ?? "lagos";
  const lga = q.get("lga") ?? "ajeromi-ifelodun";
  const dir = path.join(process.cwd(), "public/images/email/candidates");
  const { html } = pledgeEmail({
    firstName: q.get("name") ?? "Tolu",
    siteUrl: SITE_URL,
    summary: await ballotSummary(state, lga),
    unsubscribeUrl: unsubscribeUrl("tolu@email.com"),
    hasPhoto: (id) => existsSync(path.join(dir, `${id}.jpg`)),
  });
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
