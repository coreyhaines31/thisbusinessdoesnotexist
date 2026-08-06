import { NextResponse } from "next/server";
import { getCompany } from "@/lib/companies";

// GET /api/company/:slug — one specific company that does not exist
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) {
    return NextResponse.json(
      { error: "This business does not exist. But unlike the others, it also doesn't not-exist here." },
      { status: 404, headers: { "Access-Control-Allow-Origin": "*" } },
    );
  }
  return NextResponse.json(
    {
      disclaimer: "This business does not exist. All data is AI-generated fiction.",
      permalink: `https://thisbusinessdoesnotexist.com/c/${company.slug}`,
      company,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    },
  );
}
