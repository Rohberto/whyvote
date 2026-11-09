import { ballotSummary } from "@/lib/ballot-summary";
import { ballotCard } from "@/lib/share-cards";

/** PNG ballot card: /ballot/lagos/ikeja/card/status (9:16) or /square (1:1). */
export async function GET(_req: Request, { params }: RouteContext<"/ballot/[state]/[lga]/card/[size]">) {
  const { state, lga, size } = await params;
  if (size !== "status" && size !== "square") return new Response("Not found", { status: 404 });
  const summary = await ballotSummary(state, lga);
  if (!summary) return new Response("Not found", { status: 404 });
  return ballotCard(summary, size);
}
