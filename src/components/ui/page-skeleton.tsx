import { Container } from "@/components/ui/container";

/** Placeholder shown for a moment while a page that depends on its URL streams in. */
export function PageSkeleton({ label = "Loading" }: { label?: string }) {
  return (
    <section className="pt-8 pb-16 lg:pt-14" aria-busy="true" aria-label={label}>
      <Container>
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-3 w-40 rounded-sm bg-mist-deep" />
          <div className="h-12 w-3/4 max-w-[640px] rounded-md bg-mist-deep lg:h-20" />
          <div className="h-4 w-full max-w-[560px] rounded-sm bg-mist" />
          <div className="h-4 w-2/3 max-w-[420px] rounded-sm bg-mist" />
          <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-3 lg:grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[220px] rounded-md bg-mist" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
