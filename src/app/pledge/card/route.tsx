import type { NextRequest } from "next/server";
import { pledgeCard } from "@/lib/share-cards";

/** PNG pledge card for /pledge/card?name=Tolu. The voter's photo is added in the browser. */
export async function GET(req: NextRequest) {
  const name = (req.nextUrl.searchParams.get("name") ?? "").replace(/[^\p{L}\p{M}' -]/gu, "");
  return pledgeCard(name);
}
