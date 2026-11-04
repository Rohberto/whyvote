import { answerBySlug, CARD_SIZES, type CardSize } from "@/lib/answers";
import { answerCard } from "@/lib/share-cards";

/** PNG answer card, e.g. /share/cards/vote-buying/status. */
export async function GET(_req: Request, { params }: RouteContext<"/share/cards/[slug]/[size]">) {
  const { slug, size } = await params;
  const answer = answerBySlug(slug);
  if (!answer || !(size in CARD_SIZES)) return new Response("Not found", { status: 404 });
  return answerCard(answer, size as CardSize);
}
