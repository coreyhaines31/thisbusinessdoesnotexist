import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Company, LogoShape } from "@/lib/schema";

export const ogSize = { width: 1200, height: 630 };

export async function loadOgFonts() {
  const [medium, bold] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/og-fonts/archivo-500.ttf")),
    readFile(join(process.cwd(), "src/assets/og-fonts/archivo-800.ttf")),
  ]);
  return [
    { name: "Archivo", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Archivo", data: bold, weight: 800 as const, style: "normal" as const },
  ];
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

export function hasOgMark(company: Company) {
  return company.logo.style === "monogram" || company.logo.shapes.length > 0;
}

// Satori-friendly logo mark: monogram tile or the 24x24 shape spec as SVG.
export function OgMark({ company, size }: { company: Company; size: number }) {
  const { palette: p, logo } = company;
  if (logo.style === "monogram") {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size / 5,
          background: p.primary,
          color: p.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size / (logo.monogram.length > 1 ? 3 : 2.2),
          fontWeight: 800,
        }}
      >
        {logo.monogram}
      </div>
    );
  }
  if (logo.shapes.length === 0) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {logo.shapes.map((s, i) => shapeEl(s, p, i))}
    </svg>
  );
}
