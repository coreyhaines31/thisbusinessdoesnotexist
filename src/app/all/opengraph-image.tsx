import { ImageResponse } from "next/og";
import { getAllCompanies } from "@/lib/companies";
import { OgMark, hasOgMark, loadOgFonts, ogSize } from "@/lib/og";

export const alt = "Businesses that do not exist";
export const size = ogSize;
export const contentType = "image/png";

const TILES = 6;

export default async function Image() {
  const fonts = await loadOgFonts();
  const companies = getAllCompanies();
  const withMarks = companies.filter(hasOgMark);
  // Spread the picks across the pool so the row is varied and stable.
  const picks = Array.from({ length: TILES }, (_, i) => withMarks[Math.floor((i * withMarks.length) / TILES)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: 72,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3 }}>
          {companies.length} businesses that do not exist
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {picks.map((c) => (
            <div
              key={c.slug}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 160,
                height: 160,
                borderRadius: 24,
                background: c.palette.bg,
                border: "2px solid rgba(255,255,255,0.12)",
              }}
            >
              <OgMark company={c} size={88} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", width: 40, height: 6, background: picks[0].palette.accent }} />
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, opacity: 0.75 }}>
            thisbusinessdoesnotexist.com/all
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
