import { NextResponse } from "next/server";
import { getAllCompanies } from "@/lib/companies";

export const dynamic = "force-dynamic";

// GET /api/company — a random company that does not exist
export async function GET() {
  const companies = getAllCompanies();
  const company = companies[Math.floor(Math.random() * companies.length)];
  return NextResponse.json(
    {
      disclaimer: "This business does not exist. All data is AI-generated fiction.",
      permalink: `https://thisbusinessdoesnotexist.com/c/${company.slug}`,
      company,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    },
  );
}
