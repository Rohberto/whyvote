import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Files read with fs at runtime (pledge email images, share-image fonts and photos).
  // Vercel only bundles files it can trace, and never public/, so list them here.
  outputFileTracingIncludes: {
    "/**": ["./public/images/email/**/*", "./src/assets/**/*"],
  },
  partialPrefetching: true,
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
