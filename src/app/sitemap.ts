import type { MetadataRoute } from "next";
import { GEO, listCandidateIds } from "@/lib/candidates";
import { SITE_URL } from "@/lib/site";

const STATIC: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/why-vote", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ballot", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ziki", priority: 0.8, changeFrequency: "weekly" },
  { path: "/who-does-what", priority: 0.8, changeFrequency: "monthly" },
  { path: "/get-ready", priority: 0.9, changeFrequency: "weekly" },
  { path: "/get-ready/polling-unit", priority: 0.8, changeFrequency: "monthly" },
  { path: "/get-ready/polling-unit/area", priority: 0.6, changeFrequency: "monthly" },
  { path: "/pledge", priority: 0.8, changeFrequency: "monthly" },
  { path: "/share", priority: 0.6, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
];

/** Every indexable page: the main sections, all 774 LGA ballots and polling unit lists and every candidate profile. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ballots = GEO.flatMap((s) =>
    s.lgas.flatMap((l) => [
      { url: `${SITE_URL}/ballot/${s.slug}/${l.slug}`, changeFrequency: "weekly" as const, priority: 0.7 },
      { url: `${SITE_URL}/ballot/${s.slug}/${l.slug}/candidates`, changeFrequency: "weekly" as const, priority: 0.4 },
      { url: `${SITE_URL}/get-ready/polling-unit/${s.slug}/${l.slug}`, changeFrequency: "monthly" as const, priority: 0.6 },
    ]),
  );
  const profiles = (
    await listCandidateIds(["president", "vice-president", "governor", "deputy-governor", "senate", "reps", "assembly"])
  ).map((id) => ({ url: `${SITE_URL}/ziki/${id}`, changeFrequency: "monthly" as const, priority: 0.5 }));

  return [
    ...STATIC.map((s) => ({ url: `${SITE_URL}${s.path}`, changeFrequency: s.changeFrequency, priority: s.priority })),
    ...ballots,
    ...profiles,
  ];
}
