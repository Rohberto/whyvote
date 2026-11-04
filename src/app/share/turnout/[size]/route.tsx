import { turnoutCard } from "@/lib/share-cards";

/** PNG turnout graphic: /share/turnout/square or /share/turnout/status. */
export async function GET(_req: Request, { params }: RouteContext<"/share/turnout/[size]">) {
  const { size } = await params;
  if (size !== "square" && size !== "status") return new Response("Not found", { status: 404 });
  return turnoutCard(size);
}
