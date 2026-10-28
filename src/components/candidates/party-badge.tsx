import Image from "next/image";
import { party, partyLogo } from "@/lib/parties";

const SIZES = {
  xs: "w-7.5 h-7.5",
  sm: "w-9 h-9",
  md: "w-10 h-10",
} as const;

const PX = { xs: 30, sm: 36, md: 40 } as const;

/**
 * Round party logo. Pass `decorative` when the party name is already printed next to it.
 */
export function PartyBadge({
  code,
  size = "sm",
  decorative = false,
  className,
}: {
  code: string;
  size?: keyof typeof SIZES;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <span
      className={[
        "relative rounded-full bg-white border-2 border-line overflow-hidden flex-none box-content",
        SIZES[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={partyLogo(code)}
        alt={decorative ? "" : party(code).name}
        width={PX[size]}
        height={PX[size]}
        className="w-full h-full object-contain"
      />
    </span>
  );
}
