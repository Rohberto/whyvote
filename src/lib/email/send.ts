import { createHmac, timingSafeEqual } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ballotSummary } from "@/lib/ballot-summary";
import { pledgeEmail } from "@/lib/email/pledge-email";
import { pledgeCard } from "@/lib/share-cards";
import { SITE_URL } from "@/lib/site";

/**
 * Pledge emails go out through Resend (resend.com). Set in .env.local and on the host:
 *   RESEND_API_KEY=re_...
 *   EMAIL_FROM="whyVote <hello@your-domain>"   (a domain verified in Resend)
 * Without RESEND_API_KEY, pledges still save and nothing is sent.
 */

const secret = () => process.env.EMAIL_SIGNING_SECRET ?? process.env.SUPABASE_SECRET_KEY ?? "";

/** Signed token so unsubscribe links cannot be guessed for other addresses. */
export function unsubscribeToken(email: string) {
  return createHmac("sha256", secret()).update(email.toLowerCase()).digest("base64url").slice(0, 32);
}

export function verifyUnsubscribe(email: string, token: string) {
  const expected = Buffer.from(unsubscribeToken(email));
  const given = Buffer.from(token);
  return secret() !== "" && expected.length === given.length && timingSafeEqual(expected, given);
}

const unsubscribeQuery = (email: string) => `email=${encodeURIComponent(email)}&token=${unsubscribeToken(email)}`;
/** Link in the email footer: opens a confirm page, so link scanners cannot unsubscribe anyone. */
export const unsubscribeUrl = (email: string) => `${SITE_URL}/unsubscribe?${unsubscribeQuery(email)}`;

const photoDir = path.join(process.cwd(), "public/images/email/candidates");
const hasPhoto = (id: string) => existsSync(path.join(photoDir, `${id}.jpg`));

export async function sendPledgeEmail(p: { email: string; firstName: string; state: string | null; lga: string | null }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    console.warn("Pledge email not sent: RESEND_API_KEY or EMAIL_FROM is not set.");
    return;
  }
  const summary = p.state && p.lga ? await ballotSummary(p.state, p.lga) : null;
  const unsubscribe = unsubscribeUrl(p.email);
  // Attach every image (inline, by content id) instead of linking to the site, so the email
  // looks right even when the site is not reachable from mail servers.
  const inline = new Map<string, string>();
  const image = (src: string) => {
    if (!inline.has(src)) inline.set(src, `img${inline.size}`);
    return `cid:${inline.get(src)}`;
  };
  const { subject, html, text } = pledgeEmail({ firstName: p.firstName, siteUrl: SITE_URL, summary, unsubscribeUrl: unsubscribe, hasPhoto, image });
  const attachments = await Promise.all(
    [...inline].map(async ([src, id]) => {
      const data =
        src === "card"
          ? Buffer.from(await (await pledgeCard(p.firstName)).arrayBuffer())
          : await readFile(path.join(process.cwd(), "public", src));
      const name = src === "card" ? "whyvote-pledge-card.png" : path.basename(src);
      return { filename: name, content: data.toString("base64"), content_id: id, content_type: name.endsWith(".png") ? "image/png" : "image/jpeg" };
    }),
  );

  // RESEND_API_URL is only for tests; leave it unset.
  const res = await fetch(process.env.RESEND_API_URL ?? "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [p.email],
      subject,
      html,
      text,
      attachments,
      headers: { "List-Unsubscribe": `<${SITE_URL}/api/unsubscribe?${unsubscribeQuery(p.email)}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    }),
  });
  if (!res.ok) console.error("Pledge email failed:", res.status, await res.text());
}
