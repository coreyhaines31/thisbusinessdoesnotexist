import type { Metadata } from "next";

export const SITE_URL = "https://thisbusinessdoesnotexist.com";
export const SITE_NAME = "This Business Does Not Exist";

// Metadata is merged shallowly, so pages that set openGraph spread these in.
export const baseOpenGraph = {
  siteName: SITE_NAME,
  type: "website",
} satisfies Metadata["openGraph"];
