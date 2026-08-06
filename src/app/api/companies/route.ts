import { NextResponse } from "next/server";
import { getAllCompanies } from "@/lib/companies";

// GET /api/companies — index of every company that does not exist
// ?full=1 returns complete objects instead of the summary index.
export async function GET(req: Request) {
  const full = new URL(req.url).searchParams.get("full") === "1";
  const companies = getAllCompanies();
  const body = full
    ? companies
    : companies.map((c) => ({
        name: c.name,
        slug: c.slug,
        industry: c.industry,
        tagline: c.tagline,
        vibe: c.vibe,
        permalink: `https://thisbusinessdoesnotexist.com/c/${c.slug}`,
        api: `https://thisbusinessdoesnotexist.com/api/company/${c.slug}`,
      }));
  return NextResponse.json(
    {
      disclaimer: "None of these businesses exist. All data is AI-generated fiction.",
      count: companies.length,
      companies: body,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    },
  );
}
