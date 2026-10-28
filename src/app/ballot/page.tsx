import type { Metadata } from "next";
import { BallotView } from "@/components/ballot/ballot-view";

export const metadata: Metadata = {
  title: "My ballot",
  description:
    "See the five offices on your 2027 ballot and the candidates for each race where you are registered to vote.",
};

/** Opens on the design's example selection; the picker moves to /ballot/[state]/[lga]. */
export default function BallotPage() {
  return <BallotView stateSlug="lagos" lgaSlug="ajeromi-ifelodun" example />;
}
