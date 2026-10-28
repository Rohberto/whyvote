import Link from "next/link";
import { ELECTION_DAYS, getDaysToVote } from "@/lib/election";

/** Countdown strip above the header. */
export async function TopBar() {
  const days = await getDaysToVote();
  return (
    <div className="bg-ink text-white text-[13px]">
      <div className="mx-auto max-w-[1240px] px-5 py-[9px] flex flex-wrap gap-y-1.5 gap-x-4 items-center justify-center">
        <span>
          <b className="text-lime">
            {days.first} {days.first === 1 ? "day" : "days"}
          </b>{" "}
          to the first vote, {ELECTION_DAYS.first.label}
        </span>
        <Link href="/get-ready" className="text-lime font-semibold hover:text-white">
          Get ready
        </Link>
      </div>
    </div>
  );
}
