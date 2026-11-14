import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAllSlugs } from "@/lib/companies";
import { baseOpenGraph } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...baseOpenGraph, url: "/" },
};

export default async function Home() {
  const slugs = getAllSlugs();
  const slug = slugs[Math.floor(Math.random() * slugs.length)];
  redirect(`/c/${slug}`);
}
