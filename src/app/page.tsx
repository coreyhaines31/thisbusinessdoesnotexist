import { redirect } from "next/navigation";
import { getAllSlugs } from "@/lib/companies";

export const dynamic = "force-dynamic";

export default async function Home() {
  const slugs = getAllSlugs();
  const slug = slugs[Math.floor(Math.random() * slugs.length)];
  redirect(`/c/${slug}`);
}
