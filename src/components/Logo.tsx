import type { Company, LogoShape } from "@/lib/schema";

function Shape({ shape, palette }: { shape: LogoShape; palette: Company["palette"] }) {
  const fill = palette[shape.fill];
  switch (shape.type) {
    case "circle":
      return <circle cx={shape.cx} cy={shape.cy} r={shape.r} fill={fill} />;
    case "rect":
      return (
        <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx={shape.rx} fill={fill} />
      );
    case "path":
      return <path d={shape.d} fill={fill} />;
    case "polygon":
      return <polygon points={shape.points} fill={fill} />;
  }
}

export function LogoMark({ company, size = 32 }: { company: Company; size?: number }) {
  const { logo, palette, name } = company;
  if (logo.style === "wordmark-only") return null;
  if (logo.style === "monogram") {
    return (
      <span
        aria-hidden
        className="flex items-center justify-center font-bold"
        style={{
          width: size,
          height: size,
          borderRadius: size / 5,
          background: palette.primary,
          color: palette.bg,
          fontSize: size / (logo.monogram.length > 1 ? 3 : 2.2),
          fontFamily: "var(--brand-font-heading)",
        }}
      >
        {logo.monogram}
      </span>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden role="img">
      <title>{name} logo</title>
      {logo.shapes.map((s, i) => (
        <Shape key={i} shape={s} palette={palette} />
      ))}
    </svg>
  );
}

export function Logo({ company, size = 32 }: { company: Company; size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark company={company} size={size} />
      <span
        className="font-bold tracking-tight"
        style={{ fontSize: size * 0.62, fontFamily: "var(--brand-font-heading)" }}
      >
        {company.name}
      </span>
    </span>
  );
}
