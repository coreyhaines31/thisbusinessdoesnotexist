import { CompanySchema, type Company } from "../../src/lib/schema";
import { contrastRatio, fixContrast } from "./contrast";
import { KNOWN_BRANDS } from "./known-brands";
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

const dataset = englishDataset.build();
const profanity = new RegExpMatcher({
  ...dataset,
  ...englishRecommendedTransformers,
});

// obscenity flags substrings ("artisanal", "analysis"); only trust matches that
// aren't inside a benign word from this list.
const BENIGN = /artisanal|analysis|analytics|analyze|canal|assess|assets|class|pass|bass|grass|glass|massage|cassette|shiitake|scunthorpe/i;

export function levenshtein(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[m][n];
}

export type ValidationResult =
  | { ok: true; company: Company; fixes: string[] }
  | { ok: false; errors: string[] };

export function validateCompany(
  raw: unknown,
  existingNames: string[],
): ValidationResult {
  const parsed = CompanySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
    };
  }
  const company = parsed.data;
  const errors: string[] = [];
  const fixes: string[] = [];
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const name = norm(company.name);

  // Name dedupe against pool
  for (const existing of existingNames) {
    const e = norm(existing);
    const d = levenshtein(e, name);
    // Strict only for short names; 6+ letter names two edits apart read as distinct
    if (e === name || d < 2 || (d < 3 && name.length <= 5)) {
      errors.push(`name "${company.name}" too similar to existing "${existing}"`);
    }
  }

  // Famous-brand similarity
  for (const brand of KNOWN_BRANDS) {
    if (name === brand || levenshtein(name, brand) < 2 || (name.length > 4 && brand.includes(name))) {
      errors.push(`name "${company.name}" too similar to real brand "${brand}"`);
    }
  }

  // Profanity across visitor-facing strings
  const textFields = [
    company.name,
    company.tagline,
    company.positioning,
    company.homepage.hero.h1,
    company.homepage.hero.sub,
    ...company.homepage.testimonials.flatMap((t) => [t.quote, t.name, t.company]),
  ];
  for (const field of textFields) {
    if (profanity.hasMatch(field)) {
      const words = field.split(/\s+/);
      const offending = words.filter((w) => profanity.hasMatch(w) && !BENIGN.test(w));
      if (offending.length) errors.push(`profanity detected in: "${field}"`);
    }
  }

  // Logo geometry within 24x24 (±2 tolerance) for parametric shapes
  for (const s of company.logo.shapes) {
    const coords =
      s.type === "circle"
        ? [s.cx - s.r, s.cy - s.r, s.cx + s.r, s.cy + s.r]
        : s.type === "rect"
          ? [s.x, s.y, s.x + s.width, s.y + s.height]
          : [];
    if (coords.some((c) => c < -2 || c > 26)) {
      errors.push(`logo ${s.type} out of 24x24 viewBox bounds`);
    }
  }
  if (company.logo.style === "mark-and-wordmark" && company.logo.shapes.length === 0) {
    errors.push("mark-and-wordmark logo has no shapes");
  }

  // Exactly one highlighted pricing tier
  const highlighted = company.homepage.pricing.filter((p) => p.highlighted).length;
  if (highlighted !== 1) {
    company.homepage.pricing.forEach((p, i) => (p.highlighted = i === 1));
    fixes.push(`highlighted tiers was ${highlighted}; reset to middle tier`);
  }

  if (errors.length) return { ok: false, errors };

  // Contrast: auto-fix rather than regenerate
  const p = company.palette;
  const checks: Array<["text" | "primary", string, number]> = [
    ["text", p.bg, 4.5],
    ["text", p.surface, 4.5],
    ["primary", p.bg, 3],
  ];
  for (const [role, against, target] of checks) {
    if (contrastRatio(p[role], against) < target) {
      const fixed = fixContrast(p[role], against, target);
      if (!fixed) return { ok: false, errors: [`unfixable contrast: ${role} on ${against}`] };
      if (fixed !== p[role]) {
        fixes.push(`${role} ${p[role]} -> ${fixed} (contrast vs ${against})`);
        p[role] = fixed;
      }
    }
  }

  return { ok: true, company, fixes };
}
