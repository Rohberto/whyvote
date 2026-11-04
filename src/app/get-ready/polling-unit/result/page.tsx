import { permanentRedirect } from "next/navigation";

/** Old placeholder route: results now live at /get-ready/polling-unit/unit/<code>. */
export default function PollingUnitResultPage() {
  permanentRedirect("/get-ready/polling-unit");
}
