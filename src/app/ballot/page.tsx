import { BallotView } from "@/components/ballot/ballot-view";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "My ballot",
  description:
    "See the five offices on your 2027 ballot and the candidates for each race where you are registered to vote.",
  path: "/ballot",
});

/** Opens with no place chosen; the picker moves to /ballot/[state]/[lga]. */
export default function BallotPage() {
  return <BallotView />;
}
