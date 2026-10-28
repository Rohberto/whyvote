import { redirect } from "next/navigation";

/** Old address from the design prototype; candidates now live under each LGA's ballot. */
export default function OldCandidatesPage() {
  redirect("/ballot/lagos/ajeromi-ifelodun/candidates");
}
