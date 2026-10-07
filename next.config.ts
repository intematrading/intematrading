import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // This folder is the project root (a stray package-lock.json higher up
  // would otherwise make Turbopack guess).
  turbopack: { root: __dirname },
  // Development-only "N" badge: off the bottom-left corner, where the
  // language switch sits.
  devIndicators: { position: "bottom-right" },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // 90 for large full-bleed background photos.
    qualities: [75, 90],
  },
  async redirects() {
    return [
      // The site was English/Amharic before French replaced Amharic.
      { source: "/am", destination: "/fr", permanent: false },
      { source: "/am/:path*", destination: "/fr/:path*", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
