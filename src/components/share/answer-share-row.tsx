import { CopyButton, ShareImageButton, ShareLinkButton } from "@/components/share/share-actions";
import { answerBySlug, answerCardHref, answerShareText } from "@/lib/answers";
import { SITE_URL } from "@/lib/site";

/** Share buttons under an answer on Why vote: images for each platform, the line, and a link. */
export function AnswerShareRow({ slug }: { slug: string }) {
  const a = answerBySlug(slug);
  if (!a) return null;
  return (
    <div className="flex flex-wrap gap-2">
      <ShareImageButton size="sm" href={answerCardHref(a.slug, "status")} filename={`whyvote-${a.slug}-status.png`}>
        <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
        </svg>
        WhatsApp status image
      </ShareImageButton>
      <ShareImageButton variant="soft" size="sm" href={answerCardHref(a.slug, "square")} filename={`whyvote-${a.slug}-square.png`}>
        Instagram image
      </ShareImageButton>
      <ShareImageButton variant="soft" size="sm" href={answerCardHref(a.slug, "x")} filename={`whyvote-${a.slug}-x.png`}>
        X image
      </ShareImageButton>
      <CopyButton variant="soft" size="sm" text={answerShareText(a, SITE_URL)}>
        Copy the line
      </CopyButton>
      <ShareLinkButton variant="soft" size="sm" url={`${SITE_URL}/why-vote#${a.slug}`} text={`“${a.objection}” Here is the answer.`}>
        <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        Share link
      </ShareLinkButton>
    </div>
  );
}
