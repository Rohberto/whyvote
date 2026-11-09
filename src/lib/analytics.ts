/**
 * Google Analytics 4. Set NEXT_PUBLIC_GA_ID (e.g. G-XXXXXXXXXX) on the host to turn it on.
 * Page views are counted automatically, including moves between pages, by GA4's enhanced measurement.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type Gtag = (command: "event", name: string, params?: Record<string, string | number | boolean | undefined>) => void;

/**
 * Records a whyVote action, such as a pledge or a share. Does nothing when GA is off.
 * Never pass names, emails or phone numbers: GA must not receive personal details.
 */
export function track(name: string, params?: Record<string, string | number | boolean | undefined>) {
  if (typeof window === "undefined" || !GA_ID) return;
  // Queue the event if GA has not loaded yet; gtag.js replays the queue when it starts.
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.gtag =
    w.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params -- gtag.js needs the Arguments object
      w.dataLayer!.push(arguments);
    };
  w.gtag("event", name, params);
}
