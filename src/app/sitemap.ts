import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/companies";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/all` },
    ...getAllSlugs().map((slug) => ({ url: `${SITE_URL}/c/${slug}` })),
  ];
}
