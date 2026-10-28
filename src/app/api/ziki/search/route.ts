import { searchCandidates } from "@/lib/candidates";

/** GET /api/ziki/search?q=lagos+west — up to 20 matching candidates. */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  const results = await searchCandidates(q.slice(0, 80));
  return Response.json(results, { headers: { "Cache-Control": "public, max-age=3600" } });
}
