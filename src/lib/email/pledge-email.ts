import type { BallotSummary, SummaryRace } from "@/lib/ballot-summary";
import type { Candidate } from "@/lib/candidates";
import { pledgeInviteUrl } from "@/lib/pledge";

/**
 * Pledge confirmation email (design C: names, photos and party).
 * Table layout and inline styles so it renders the same in Gmail, Outlook and phone mail apps.
 */

const C = {
  ink: "#0A3B2A",
  soft: "#43574A",
  faint: "#5E7064",
  green: "#2A7F36",
  brand: "#2F8A3B",
  line: "#D6E2D6",
  lime: "#E3F07A",
  sun: "#F2C230",
  mintPale: "#E2F2E8",
  mistLight: "#F7FAF6",
  page: "#EDF3EC",
  warnPale: "#FFF4CF",
};
const SANS = "'Outfit', 'Segoe UI', Helvetica, Arial, sans-serif";
const DISPLAY = "'Bricolage Grotesque', 'Arial Narrow', Arial, sans-serif";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export type PledgeEmailInput = {
  firstName: string;
  siteUrl: string;
  summary: BallotSummary | null;
  unsubscribeUrl: string;
  /** Candidate ids that have a photo on the site. */
  hasPhoto: (id: string) => boolean;
  /**
   * Where an image comes from, given its public path ("/images/email/logo.png") or "card".
   * The sender attaches images to the email and returns "cid:..." references, so they show
   * even when the site is not reachable (local testing, or before the domain is live).
   */
  image?: (path: string) => string;
};

const imageSrc = (input: PledgeEmailInput, path: string) =>
  input.image ? input.image(path) : path === "card" ? `${input.siteUrl}/pledge/card?name=${encodeURIComponent(input.firstName)}` : `${input.siteUrl}${path}`;

function button(href: string, label: string, bg = C.green, color = "#FFFFFF") {
  return `<a href="${esc(href)}" style="display:inline-block;padding:14px 22px;border-radius:4px;background:${bg};color:${color};border:2px solid ${bg};font-family:${SANS};font-size:15px;font-weight:700;text-decoration:none">${esc(label)}</a>`;
}

function candidateCell(c: Candidate, input: PledgeEmailInput, officeholder: boolean) {
  const photo = imageSrc(input, input.hasPhoto(c.id) ? `/images/email/candidates/${c.id}.jpg` : "/images/email/no-photo.jpg");
  const logo = imageSrc(input, `/images/email/parties/${c.party.toLowerCase()}.jpg`);
  return `<td width="33%" valign="top" align="center" style="padding:8px 4px">
    <a href="${esc(`${input.siteUrl}/ziki/${c.id}`)}" style="text-decoration:none;color:${C.ink}">
      <img src="${esc(photo)}" width="56" height="56" alt="" style="display:block;width:56px;height:56px;border-radius:28px;margin:0 auto">
      <span style="display:block;margin-top:6px;font-family:${SANS};font-size:12px;line-height:1.3;font-weight:600;color:${C.ink}">${esc(c.name)}</span>
      <span style="display:block;margin-top:3px;font-family:${SANS};font-size:11px;font-weight:700;color:${C.faint}"><img src="${esc(logo)}" width="16" height="16" alt="" style="width:16px;height:16px;border-radius:8px;vertical-align:middle;margin-right:4px">${esc(c.party)}</span>
      ${officeholder ? `<span style="display:inline-block;margin-top:3px;font-family:${SANS};font-size:9px;font-weight:700;color:#FFFFFF;background:${C.ink};border-radius:999px;padding:1px 6px">OFFICEHOLDER</span>` : ""}
    </a>
  </td>`;
}

function candidateGrid(featured: Candidate[], input: PledgeEmailInput, officeholder?: string) {
  if (!featured.length) {
    return `<p style="margin:8px 0 0;font-family:${SANS};font-size:13px;color:${C.soft}">None of the six largest parties has a candidate in this race.</p>`;
  }
  const rows: string[] = [];
  for (let i = 0; i < featured.length; i += 3) {
    const cells = featured.slice(i, i + 3).map((c) => candidateCell(c, input, c.id === officeholder));
    while (cells.length < 3) cells.push('<td width="33%"></td>');
    rows.push(`<tr>${cells.join("")}</tr>`);
  }
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px">${rows.join("")}</table>`;
}

function raceBlock(r: SummaryRace, input: PledgeEmailInput, all: string) {
  const split = r.constituencies.length > 1;
  const head = `<b style="font-family:${SANS};font-size:15px;color:${C.ink}">${esc(r.title)}</b><br><span style="font-family:${SANS};font-size:13px;color:${C.soft}">${esc(r.seat)}</span>`;
  const seeAll = (total: number) =>
    `<a href="${esc(`${all}#${r.hash}`)}" style="display:inline-block;margin-top:6px;font-family:${SANS};font-size:13px;font-weight:700;color:${C.green}">See all ${total} candidates</a>`;
  if (!split) {
    const k = r.constituencies[0];
    return `<div style="padding:12px 0;border-top:1px solid ${C.line}">${head}${candidateGrid(k.featured, input, k.officeholder)}${k.total > k.featured.length ? seeAll(k.total) : ""}</div>`;
  }
  const n = r.constituencies.length;
  const words = ["", "one", "two", "three", "four", "five", "six"][n] ?? String(n);
  const note = `<div style="margin-top:8px;background:${C.warnPale};border-radius:6px;padding:10px 12px;font-family:${SANS};font-size:13px;line-height:1.5;color:${C.soft}"><b style="color:${C.ink}">Your LGA has ${words} ${r.hash === "assembly" ? "state" : "federal"} constituencies, but you belong to only one.</b> You will vote for candidates in just one of the lists below, depending on your polling unit. Check the polling unit code on the back of your PVC.</div>`;
  const lists = r.constituencies
    .map(
      (k) =>
        `<div style="margin-top:12px"><b style="font-family:${SANS};font-size:14px;color:${C.ink}">${esc(k.race.name ?? "")}</b>${candidateGrid(k.featured, input, k.officeholder)}${k.total > k.featured.length ? seeAll(k.total) : ""}</div>`,
    )
    .join("");
  return `<div style="padding:12px 0;border-top:1px solid ${C.line}">${head}${note}${lists}</div>`;
}

const STEPS = [
  {
    title: "Collect your PVC",
    body: "Go to your INEC local government office, 9am to 3pm. You must go yourself. INEC has not announced a deadline yet, so do not wait.",
  },
  {
    title: "Confirm your polling unit",
    body: "Use the code on the back of your PVC to check exactly where you will vote.",
    link: { href: "https://cvr.inecnigeria.org/pu", label: "Find my polling unit" },
  },
  {
    title: "Plan to be there",
    body: "You can only vote at the unit where you registered. If you have moved, plan to be close to it the day before each election.",
  },
];

export function pledgeEmail(input: PledgeEmailInput) {
  const { firstName, siteUrl, summary } = input;
  const name = esc(firstName);
  const invite = pledgeInviteUrl(siteUrl, firstName);
  const card = `${siteUrl}/pledge/card?name=${encodeURIComponent(firstName)}`;
  const ballotUrl = summary ? `${siteUrl}/ballot/${summary.state.slug}/${summary.lga.slug}` : `${siteUrl}/ballot`;
  const allUrl = summary ? `${ballotUrl}/candidates` : `${siteUrl}/ballot`;
  const subject = `You pledged. Here is your ballot, ${firstName}.`;
  const preheader = "Two Saturdays, five positions, and what to do next.";

  const ballot = summary
    ? summary.days
        .map(
          (d) => `<div style="background:#FFFFFF;border:1px solid ${C.line};border-radius:8px;padding:16px 18px;margin-top:12px">
        <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${C.green}">${esc(d.label)}</p>
        <p style="margin:2px 0 8px;font-family:${DISPLAY};font-weight:800;font-size:24px;color:${C.ink}">${esc(d.date)}</p>
        ${d.races.map((r) => raceBlock(r, input, allUrl)).join("")}
        ${d.note ? `<p style="margin:8px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${C.soft}">${esc(d.note)}</p>` : ""}
      </div>`,
        )
        .join("")
    : `<p style="margin:12px 0 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.soft}">Choose your state and LGA on My ballot to see the five positions and everyone running where you are registered.</p>`;

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${C.page}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:8px;overflow:hidden">
  <tr><td style="padding:22px 36px;border-bottom:1px solid ${C.line}"><img src="${imageSrc(input, "/images/email/logo.png")}" width="116" height="26" alt="whyVote" style="display:block;height:26px;width:auto"></td></tr>
  <tr><td style="background:${C.brand};padding:32px 36px;color:#FFFFFF">
    <p style="margin:0;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${C.lime}">Pledge confirmed</p>
    <p style="margin:8px 0 0;font-family:${DISPLAY};font-weight:800;font-size:44px;line-height:0.95;color:#FFFFFF">You pledged, ${name}.</p>
    <p style="margin:12px 0 18px;font-family:${SANS};font-size:16px;line-height:1.5;color:#E4F3E6">Thank you for promising to vote on both Saturdays.</p>
    <img src="${esc(imageSrc(input, "card"))}" width="200" height="356" alt="${name} is in. I pledge to vote." style="display:block;width:200px;height:auto;border-radius:8px">
    <p style="margin:12px 0 0">${button(card, "Save your card", C.sun, C.ink)}</p>
  </td></tr>
  <tr><td style="padding:36px">
    <p style="margin:0;font-family:${DISPLAY};font-weight:800;font-size:28px;color:${C.ink}">Your ballot</p>
    ${summary ? `<p style="margin:4px 0 0;font-family:${SANS};font-size:14px;color:${C.soft}">${esc(summary.state.name)} · ${esc(summary.lga.name)}</p>` : ""}
    <p style="margin:8px 0 0;font-family:${SANS};font-size:12px;line-height:1.5;color:${C.faint}">The six parties holding the most elected offices, in alphabetical order. Candidates from INEC’s official published list.</p>
    ${ballot}
    <p style="margin:18px 0 0">${button(ballotUrl, "See who is running")}</p>
  </td></tr>
  <tr><td style="padding:0 36px 36px">
    <p style="margin:0 0 4px;font-family:${DISPLAY};font-weight:800;font-size:28px;color:${C.ink}">Before election day</p>
    ${STEPS.map(
      (s, i) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.line}"><tr>
      <td width="46" valign="top" style="padding:14px 0"><span style="display:inline-block;width:32px;height:32px;line-height:32px;border-radius:16px;background:${C.lime};color:${C.ink};text-align:center;font-family:${DISPLAY};font-weight:800;font-size:17px">${i + 1}</span></td>
      <td valign="top" style="padding:14px 0"><p style="margin:0;font-family:${SANS};font-size:16px;font-weight:700;color:${C.ink}">${esc(s.title)}</p>
      <p style="margin:4px 0 0;font-family:${SANS};font-size:14px;line-height:1.55;color:${C.soft}">${esc(s.body)}</p>
      ${s.link ? `<a href="${esc(s.link.href)}" style="display:inline-block;margin-top:6px;font-family:${SANS};font-size:14px;font-weight:700;color:${C.green}">${esc(s.link.label)}</a>` : ""}</td></tr></table>`,
    ).join("")}
  </td></tr>
  <tr><td style="padding:0 36px">
    <p style="margin:0;font-family:${DISPLAY};font-weight:800;font-size:24px;color:${C.ink}">What we will send you</p>
    <ul style="margin:10px 0 0;padding-left:20px;font-family:${SANS};font-size:14px;line-height:1.7;color:${C.soft}">
      <li>A reminder before PVC collection closes</li><li>A reminder the day before each Saturday</li><li>One last nudge in the final week</li><li>Updates and important news about the election</li>
    </ul>
    <p style="margin:8px 0 0;font-family:${SANS};font-size:13px;color:${C.faint}">By text too, if you added your phone number.</p>
  </td></tr>
  <tr><td style="padding:36px">
    <div style="background:${C.mintPale};border:1px solid #CFE6D6;border-radius:8px;padding:22px 20px">
      <p style="margin:0;font-family:${DISPLAY};font-weight:800;font-size:28px;line-height:1;color:${C.ink}">Now invite your friends to pledge</p>
      <p style="margin:10px 0 14px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.soft}">One vote is good. Five friends who vote with you is better.</p>
      ${button(`https://wa.me/?text=${encodeURIComponent(`I just pledged to vote in 2027. Pledge with me: ${invite}`)}`, "Share your invite link", C.ink)}
      <p style="margin:10px 0 0;font-family:${SANS};font-size:13px;color:${C.faint}">${esc(invite.replace(/^https?:\/\//, ""))}</p>
    </div>
  </td></tr>
  <tr><td style="padding:22px 36px 28px;border-top:1px solid ${C.line};background:${C.mistLight}">
    <img src="${imageSrc(input, "/images/email/logo.png")}" width="90" height="20" alt="whyVote" style="display:block;height:20px;width:auto">
    <p style="margin:10px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.faint}">whyVote is built by PoliZ. We do not support, oppose or endorse any party or candidate. The only ask is that you vote. We never ask who for.</p>
    <p style="margin:8px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.faint}">You are getting this email because you pledged at ${esc(siteUrl.replace(/^https?:\/\//, ""))}. <a href="${esc(input.unsubscribeUrl)}" style="color:${C.green}">Unsubscribe</a> · <a href="${siteUrl}/about" style="color:${C.green}">About whyVote</a></p>
    <p style="margin:8px 0 0;font-family:${SANS};font-size:12px;color:${C.faint}">PoliZ · Lagos, Nigeria</p>
  </td></tr>
</table></td></tr></table>
</body></html>`;

  const lines = [
    `You pledged, ${firstName}.`,
    "",
    "Thank you for promising to vote on both Saturdays.",
    "",
    ...(summary
      ? [
          `Your ballot: ${summary.state.name} · ${summary.lga.name}`,
          ...summary.days.flatMap((d) => [
            "",
            `${d.label}: ${d.date}`,
            ...d.races.map((r) => `- ${r.title}: ${r.seat}`),
            ...(d.note ? [d.note] : []),
          ]),
        ]
      : ["Choose your state and LGA on My ballot to see everyone running where you are registered."]),
    "",
    `See who is running: ${ballotUrl}`,
    "",
    "Before election day",
    ...STEPS.map((s, i) => `${i + 1}. ${s.title}. ${s.body}`),
    "",
    `Invite your friends to pledge: ${invite}`,
    "",
    `Unsubscribe: ${input.unsubscribeUrl}`,
  ];

  return { subject, html, text: lines.join("\n") };
}
