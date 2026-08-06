import { NextResponse } from "next/server";

// GET /api — self-describing index
export async function GET() {
  return NextResponse.json(
    {
      name: "This Business Does Not Exist API",
      description:
        "Free, open JSON API of AI-generated fake companies — brand kits, palettes, logos (as structured SVG specs), and full homepage copy. Nothing here is real.",
      endpoints: {
        "GET /api/company": "A random fake company (uncached — different every call)",
        "GET /api/company/:slug": "A specific fake company by slug",
        "GET /api/companies": "Index of all fake companies (add ?full=1 for complete objects)",
      },
      source: "https://github.com/coreyhaines31/thisbusinessdoesnotexist",
      disclaimer: "All data is AI-generated fiction. Do not invoice these companies.",
    },
    { headers: { "Access-Control-Allow-Origin": "*" } },
  );
}
