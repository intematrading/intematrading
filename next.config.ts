import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // 90 for large full-bleed background photos.
    qualities: [75, 90],
  },
  // Contact is no longer its own page: the inquiry form is in the footer.
  async redirects() {
    return [{ source: "/:locale(en|am)/contact", destination: "/:locale#contact", permanent: false }];
  },
};

export default withNextIntl(nextConfig);
