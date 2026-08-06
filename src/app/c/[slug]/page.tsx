import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getCompany } from "@/lib/companies";
import { BrandTheme } from "@/components/BrandTheme";
import { ShuffleButton } from "@/components/ShuffleButton";
import { TEMPLATES } from "@/components/templates";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return {};
  return {
    title: `${company.name} — ${company.tagline}`,
    description: `${company.positioning} (This business does not exist.)`,
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();
  const Template = TEMPLATES[company.vibe];
  const slugs = getAllSlugs();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-neutral-950 px-4 py-2.5 text-white">
        <Link href="/all" className="text-sm font-medium tracking-tight opacity-90 hover:opacity-100">
          <span className="font-bold">This business does not exist.</span>{" "}
          <span className="hidden opacity-60 sm:inline">
            Everything below — the company, the logo, the people — is AI-generated fiction.
          </span>
        </Link>
        <ShuffleButton slugs={slugs} current={company.slug} />
      </div>
      <div className="flex-1">
        <BrandTheme company={company}>
          <Template company={company} />
        </BrandTheme>
      </div>
    </div>
  );
}
