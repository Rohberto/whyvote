import type { NextConfig } from "next";
import renamed from "./scripts/candidates/renamed.json";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Files read with fs at runtime (pledge email images, share-image fonts and photos).
  // Vercel only bundles files it can trace, and never public/, so list them here.
  outputFileTracingIncludes: {
    "/**": ["./public/images/email/**/*", "./src/assets/**/*"],
  },
  partialPrefetching: true,
  // Candidates whose names INEC corrected in an updated list keep their old Ziki links working.
  async redirects() {
    return Object.entries(renamed as Record<string, string>).map(([from, to]) => ({
      source: `/ziki/${from}`,
      destination: `/ziki/${to}`,
      permanent: true,
    }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
