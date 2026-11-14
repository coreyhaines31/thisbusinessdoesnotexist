import type { Metadata } from "next";
import Link from "next/link";
import { getAllCompanies } from "@/lib/companies";
import { LogoMark } from "@/components/Logo";
import { baseOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "All businesses that do not exist",
  description: "The full catalog of AI-generated companies that do not exist.",
  alternates: { canonical: "/all" },
  openGraph: { ...baseOpenGraph, url: "/all" },
};

export default function AllPage() {
  const companies = getAllCompanies();
  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          {companies.length} businesses that do not exist
        </h1>
        <p className="mt-3 max-w-xl text-neutral-400">
          Every company below — its brand, its customers, its pricing — is AI-generated fiction.
          Click one to visit its homepage.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {companies.map((c) => (
            <Link
              key={c.slug}
              href={`/c/${c.slug}`}
              className="group rounded-xl p-5 transition-transform hover:-translate-y-1"
              style={{ background: c.palette.bg, color: c.palette.text }}
            >
              <LogoMark company={c} size={36} />
              <div className="mt-4 font-bold">{c.name}</div>
              <div className="mt-1 text-xs leading-snug opacity-70">{c.tagline}</div>
              <div className="mt-3 text-[10px] tracking-wider uppercase opacity-50">
                {c.industry} · {c.vibe}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
