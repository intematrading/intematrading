import Script from "next/script";

// Tawk.to live chat. IDs come from the Tawk.to dashboard embed code; they can
// be overridden per environment without a code change.
const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? "6abceb9dd1e95d3448e4247d";
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? "1k3ovgntj";

/** Loads the Tawk.to widget once the page is idle. Position and colours are set in the Tawk.to dashboard. */
export function TawkChat() {
  if (!PROPERTY_ID || !WIDGET_ID) return null;
  return (
    <Script id="tawk-to" strategy="lazyOnload">
      {`
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
`}
    </Script>
  );
}
