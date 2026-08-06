import type { CSSProperties, ReactNode } from "react";
import type { Company } from "@/lib/schema";
import { FONT_PAIRING_MAP } from "@/lib/fonts";

export function BrandTheme({ company, children }: { company: Company; children: ReactNode }) {
  const fonts = FONT_PAIRING_MAP[company.fontPairing];
  const vars = {
    "--brand-bg": company.palette.bg,
    "--brand-surface": company.palette.surface,
    "--brand-text": company.palette.text,
    "--brand-primary": company.palette.primary,
    "--brand-accent": company.palette.accent,
    "--brand-font-heading": fonts.heading.family,
    "--brand-font-body": fonts.body.family,
  } as CSSProperties;

  return (
    <div
      style={vars}
      className={`${fonts.heading.className} ${fonts.body.className} bg-brand-bg text-brand-text font-brand-body min-h-screen`}
    >
      {children}
    </div>
  );
}
