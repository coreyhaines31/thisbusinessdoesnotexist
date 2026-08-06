import { VIBES, FONT_PAIRINGS, type Vibe, type FontPairingId } from "../../src/lib/schema";

export const INDUSTRIES = [
  "pet-tech",
  "funeral services",
  "vertical farming",
  "HOA management",
  "cold-plunge studios",
  "industrial cleaning",
  "drone inspection",
  "artisanal logistics",
  "dental practice operations",
  "esports coaching",
  "cannabis compliance",
  "wedding vendor CRM",
  "fleet telematics",
  "ghost kitchens",
  "B2B swag",
  "elder-care coordination",
  "marina management",
  "tattoo studio booking",
  "soil analytics",
  "church admin software",
  "film production payroll",
  "HVAC field service",
  "luxury resale authentication",
  "corporate offsites",
  "micro-mobility charging",
] as const;

export const TONES = [
  "earnest",
  "irreverent",
  "ultra-corporate",
  "visionary and slightly grandiose",
] as const;

export const AUDIENCES = [
  "SMB owner-operators",
  "enterprise buyers",
  "prosumers and individuals",
] as const;

const PALETTE_MOODS = [
  "dark and moody",
  "soft pastels",
  "high-contrast monochrome with one loud accent",
  "warm earth tones",
  "cool saturated blues and greens",
  "neon on near-black",
  "muted editorial neutrals",
] as const;

const NAMING_STYLES = [
  "compound word (two nouns fused)",
  "real word with a dropped vowel",
  "latinate / pseudo-Latin",
  "two unmodified real words",
  "made-up but pronounceable",
  "animal or nature word + noun",
] as const;

const PRICING_MODELS = ["per-seat", "usage-based", "flat tiers"] as const;

const LOGO_ARCHETYPES = [
  "negative-space cutout (a shape with a meaningful cutout made by layering a bg-fill shape)",
  "stacked or offset bars/rectangles",
  "arc or orbit (open curves, partial circles via path)",
  "rotated square / diamond composition",
  "triangle or chevron composition (polygon)",
  "single bold abstract path glyph (one expressive path, letter-like or symbol-like)",
  "grid or cluster of small repeated shapes",
  "semicircle / split-circle composition (paths, not full circles)",
  "monogram (set style to monogram)",
] as const;

export type Seed = {
  index: number;
  industry: string;
  tone: string;
  audience: string;
  vibe: Vibe;
  fontPairing: FontPairingId;
  paletteMood: string;
  namingStyle: string;
  pricingModel: string;
  logoArchetype: string;
};

// 25 industries x 4 tones x 3 audiences = 300 seeds. Secondary axes rotate on
// strides decorrelated from the primary grid so no template/font clusters on
// one industry.
export function buildSeeds(): Seed[] {
  const seeds: Seed[] = [];
  let i = 0;
  for (const industry of INDUSTRIES) {
    for (const tone of TONES) {
      for (const audience of AUDIENCES) {
        seeds.push({
          index: i,
          industry,
          tone,
          audience,
          vibe: VIBES[i % VIBES.length],
          fontPairing: FONT_PAIRINGS[i % FONT_PAIRINGS.length],
          paletteMood: PALETTE_MOODS[i % PALETTE_MOODS.length],
          namingStyle: NAMING_STYLES[i % NAMING_STYLES.length],
          pricingModel: PRICING_MODELS[i % PRICING_MODELS.length],
          logoArchetype: LOGO_ARCHETYPES[i % LOGO_ARCHETYPES.length],
        });
        i++;
      }
    }
  }
  return seeds;
}
