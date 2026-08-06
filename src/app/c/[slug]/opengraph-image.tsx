import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getAllSlugs, getCompany } from "@/lib/companies";
import type { Company, LogoShape } from "@/lib/schema";

export const alt = "This business does not exist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function shapeEl(s: LogoShape, palette: Company["palette"], i: number) {
  const fill = palette[s.fill];
  switch (s.type) {
    case "circle":
      return <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={fill} />;
    case "rect":
      return <rect key={i} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.rx} fill={fill} />;
    case "path":
      return <path key={i} d={s.d} fill={fill} />;
    case "polygon":
      return <polygon key={i} points={s.points} fill={fill} />;
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompany(slug);
  const [medium, bold] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/og-fonts/archivo-500.ttf")),
    readFile(join(process.cwd(), "src/assets/og-fonts/archivo-800.ttf")),
  ]);
  if (!company) return new ImageResponse(<div style={{ display: "flex" }} />, size);

  const { palette: p, logo } = company;
  const markSize = 120;

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
          {logo.style === "monogram" ? (
            <div
              style={{
                width: markSize,
                height: markSize,
                borderRadius: markSize / 5,
                background: p.primary,
                color: p.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: markSize / (logo.monogram.length > 1 ? 3 : 2.2),
                fontWeight: 800,
              }}
            >
              {logo.monogram}
            </div>
          ) : logo.shapes.length > 0 ? (
            <svg width={markSize} height={markSize} viewBox="0 0 24 24">
              {logo.shapes.map((s, i) => shapeEl(s, p, i))}
            </svg>
          ) : null}
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
    {
      ...size,
      fonts: [
        { name: "Archivo", data: medium, weight: 500, style: "normal" },
        { name: "Archivo", data: bold, weight: 800, style: "normal" },
      ],
    },
  );
}
