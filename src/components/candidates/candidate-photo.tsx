import Image from "next/image";
import type { Candidate } from "@/lib/candidates";
import { PLACEHOLDER_TONES } from "@/lib/parties";

export function candidatePhotoSrc(id: string) {
  return `/images/candidates/${id}.webp`;
}

/** Rectangular photo used on ballot cards and profile asides. Falls back to the "Photo pending" figure. */
export function CandidatePhoto({
  candidate,
  tone = 0,
  className,
  sizes = "(min-width: 1024px) 300px, 50vw",
  priority,
}: {
  candidate: Pick<Candidate, "id" | "name" | "photo">;
  tone?: number;
  className: string;
  sizes?: string;
  priority?: boolean;
}) {
  const t = PLACEHOLDER_TONES[tone % PLACEHOLDER_TONES.length];
  if (candidate.photo) {
    return (
      <div className={`relative overflow-hidden bg-mist-deep ${className}`}>
        <Image
          src={candidatePhotoSrc(candidate.id)}
          alt={candidate.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-[50%_32%]"
        />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: t.bg }}>
      <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold tracking-[0.8px] uppercase text-ink opacity-75">
        Photo pending
      </span>
      <svg className="absolute left-0 right-0 bottom-0 w-full h-[82%]" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
        <circle cx="50" cy="38" r="17" fill={t.fg} />
        <path d="M18 100c0-20 14-34 32-34s32 14 32 34z" fill={t.fg} />
      </svg>
    </div>
  );
}

/** Round portrait used on Ziki cards. */
export function CandidateAvatar({ candidate }: { candidate: Pick<Candidate, "id" | "name" | "photo"> }) {
  return (
    <div className="relative w-[110px] h-[110px] mb-2 mx-auto rounded-full border-3 border-brand bg-mist-deep overflow-hidden lg:w-[140px] lg:h-[140px] box-content">
      {candidate.photo ? (
        <Image src={candidatePhotoSrc(candidate.id)} alt="" fill sizes="140px" className="object-cover object-[50%_28%]" />
      ) : (
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true" viewBox="0 0 100 100">
          <circle cx="50" cy="40" r="17" fill="#9CBFA5" />
          <path d="M16 100c0-21 15-34 34-34s34 13 34 34z" fill="#9CBFA5" />
        </svg>
      )}
    </div>
  );
}
