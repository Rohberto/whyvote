"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Records a visit that arrived through a shared link (?ref=), once per visit. */
export function ReferralTracker() {
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const ref = q.get("ref");
    if (!ref) return;
    try {
      if (sessionStorage.getItem("whyvote:ref-seen")) return;
      sessionStorage.setItem("whyvote:ref-seen", ref);
    } catch {
      // Count it anyway.
    }
    track("referral_visit", { ref, source: q.get("src") ?? undefined, page: window.location.pathname });
  }, []);
  return null;
}
