import Link from "next/link";
import type { Candidate } from "@/lib/candidates";
import { OFFICE_LABEL } from "@/lib/candidates";
import { party } from "@/lib/parties";
import { Chip } from "@/components/ui/chip";
import { CandidateAvatar, CandidatePhoto } from "@/components/candidates/candidate-photo";
import { PartyBadge } from "@/components/candidates/party-badge";

const arrow = (size: number) => (
  <svg className="flex-none" aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Photo card on My ballot. */
export function BallotCard({ candidate, tone, officeholder }: { candidate: Candidate; tone: number; officeholder?: boolean }) {
  return (
    <Link
      className={`bg-white rounded-md p-2 flex flex-col gap-2.5 no-underline text-ink hover:text-ink hover:border-ink ${officeholder ? "border-2 border-ink" : "border border-line"}`}
      href={`/ziki/${candidate.id}`}
    >
      <div className="relative rounded-md overflow-hidden">
        <CandidatePhoto candidate={candidate} tone={tone} className="h-[120px] rounded-md lg:h-[150px]" />
        {officeholder && (
          <span className="absolute left-0 right-0 bottom-0 flex items-center justify-center gap-[5px] py-[5px] px-1.5 bg-ink text-white text-[11px] font-semibold tracking-[0.4px] uppercase">
            <svg className="flex-none" aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            Officeholder
          </span>
        )}
      </div>
      <div className="flex gap-2.5 items-center px-1">
        <PartyBadge code={candidate.party} decorative />
        <div className="min-w-0">
          <p className="text-[15px] font-bold">{candidate.name}</p>
          <p className="text-[12px] text-ink-soft">{party(candidate.party).name}</p>
        </div>
      </div>
      <span className="mb-1.5 mx-1 text-[14px] font-semibold text-green inline-flex gap-1.5 items-center">
        Open ziki profile
        {arrow(15)}
      </span>
    </Link>
  );
}

/** Numbered row on the Other candidates list. */
export function CandidateRow({ candidate, index }: { candidate: Candidate; index: number }) {
  return (
    <Link
      className="flex gap-3.5 items-center py-3.5 px-4 border-b border-line last:border-b-0 no-underline text-ink bg-white hover:bg-mist-light hover:text-ink"
      href={`/ziki/${candidate.id}`}
    >
      <span className="w-7 text-[13px] text-ink-faint flex-none">{String(index + 1).padStart(2, "0")}</span>
      <PartyBadge code={candidate.party} size="md" decorative />
      <span className="flex-1 min-w-0 flex flex-col gap-0.5">
        <b className="text-[15px]">{candidate.name}</b>
        <span className="text-[13px] text-ink-soft">{party(candidate.party).name}</span>
      </span>
      <span className="text-[14px] font-semibold text-green inline-flex gap-1.5 items-center flex-none">
        <span className="max-lg:hidden">Ziki profile</span>
        {arrow(16)}
      </span>
    </Link>
  );
}

const CHIP: Record<Candidate["office"], string> = {
  president: "For President, 2027",
  "vice-president": "Running mate, 2027",
  governor: "For Governor, 2027",
  "deputy-governor": "Deputy Governor, 2027",
  senate: "For Senate, 2027",
  reps: "For House of Reps, 2027",
  assembly: "For State Assembly, 2027",
};

/** Portrait card on the Ziki index and "Compare the rest of this race". */
export function ZikiCard({ candidate, headline }: { candidate: Candidate; headline?: string }) {
  return (
    <Link className="flex flex-col gap-2.5 bg-mist rounded-lg p-4.5 no-underline text-ink hover:bg-mist-deep hover:text-ink" href={`/ziki/${candidate.id}`}>
      <CandidateAvatar candidate={candidate} />
      <div className="flex gap-2 items-center">
        <PartyBadge code={candidate.party} size="xs" />
        <b className="text-[17px] text-ink">{candidate.name}</b>
      </div>
      <span className="text-[14px] font-semibold leading-[1.4]">{headline ?? party(candidate.party).name}</span>
      <div className="flex flex-wrap gap-1.5">
        <Chip>{CHIP[candidate.office]}</Chip>
      </div>
      <span className="text-[14px] font-semibold text-green mt-0.5">View profile</span>
    </Link>
  );
}

export { OFFICE_LABEL };
