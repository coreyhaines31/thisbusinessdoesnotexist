import { ImageResponse } from "next/og";
import { getAllSlugs, getCompany } from "@/lib/companies";
import { OgMark, loadOgFonts, ogSize } from "@/lib/og";

export const alt = "This business does not exist";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompany(slug);
  const fonts = await loadOgFonts();
  if (!company) return new ImageResponse(<div style={{ display: "flex" }} />, size);

  const { palette: p } = company;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: p.bg,
          color: p.text,
          padding: 72,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <OgMark company={company} size={120} />
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>
            {company.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", fontSize: 46, fontWeight: 800, lineHeight: 1.15, letterSpacing: -1 }}>
            {company.tagline}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 40, height: 6, background: p.accent }} />
            <div style={{ display: "flex", fontSize: 24, fontWeight: 500, opacity: 0.75 }}>
              thisbusinessdoesnotexist.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
