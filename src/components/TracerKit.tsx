import Script from "next/script";

// Production only, so local dev and preview deployments never record visits.
export function TracerKit() {
  const key = process.env.NEXT_PUBLIC_TRACERKIT_KEY;
  if (!key || process.env.VERCEL_ENV !== "production") return null;
  return <Script data-key={key} src="https://tracerkit.com/t.js" strategy="afterInteractive" />;
}
