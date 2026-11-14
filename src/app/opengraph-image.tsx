import { ImageResponse } from "next/og";
import { getAllCompanies } from "@/lib/companies";
import { loadOgFonts, ogSize } from "@/lib/og";

export const alt = "This business does not exist.";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOgFonts();
  const companies = getAllCompanies();
  // A strip of real palettes from the pool, picked evenly so it stays stable.
  const stripe = Array.from({ length: 12 }, (_, i) => companies[Math.floor((i * companies.length) / 12)]);

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
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", height: 16 }}>
          {stripe.map((c) => (
            <div key={c.slug} style={{ display: "flex", flex: 1, background: c.palette.primary }} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, padding: "0 72px" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 1.02, letterSpacing: -4 }}>
            This business does not exist.
          </div>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 500, opacity: 0.7, letterSpacing: -0.5 }}>
            Every refresh, a complete AI-generated fake company.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "0 72px 64px" }}>
          <div style={{ display: "flex", width: 40, height: 6, background: stripe[0].palette.accent }} />
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, opacity: 0.75 }}>
            thisbusinessdoesnotexist.com
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
