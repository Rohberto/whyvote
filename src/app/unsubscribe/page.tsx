import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { unsubscribe } from "@/lib/email/unsubscribe";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Unsubscribe",
  description: "Stop whyVote emails.",
  path: "/unsubscribe",
  noIndex: true,
});

async function confirm(formData: FormData) {
  "use server";
  const { redirect } = await import("next/navigation");
  const result = await unsubscribe(String(formData.get("email") ?? ""), String(formData.get("token") ?? ""));
  redirect(`/unsubscribe?result=${result}`);
}

async function Body({ searchParams }: { searchParams: PageProps<"/unsubscribe">["searchParams"] }) {
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");
  const result = one(q.result);
  if (result === "done") {
    return <p className="text-[17px] leading-[1.6] text-ink-soft">You will not get any more whyVote emails. Your pledge still counts.</p>;
  }
  if (result) {
    return (
      <p className="text-[17px] leading-[1.6] text-ink-soft">
        That link did not work. Use the unsubscribe link in your latest whyVote email, or write to ijoba@poliz.ng.
      </p>
    );
  }
  return (
    <form action={confirm} className="flex flex-col gap-4 items-start">
      <input type="hidden" name="email" value={one(q.email)} />
      <input type="hidden" name="token" value={one(q.token)} />
      <p className="text-[17px] leading-[1.6] text-ink-soft">
        Stop reminders and updates to <b className="text-ink">{one(q.email) || "this address"}</b>?
      </p>
      <Button type="submit" size="lg">
        Unsubscribe
      </Button>
    </form>
  );
}

export default function UnsubscribePage({ searchParams }: PageProps<"/unsubscribe">) {
  return (
    <section className="py-12 lg:py-20">
      <Container>
        <div className="flex flex-col gap-4 max-w-[640px]">
          <Eyebrow>Emails</Eyebrow>
          <h1 className="font-display text-[48px] leading-[0.95] text-ink uppercase lg:text-[72px]">Unsubscribe</h1>
          <Suspense>
            <Body searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
