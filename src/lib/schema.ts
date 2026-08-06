import { z } from "zod";

export const VIBES = [
  "corporate",
  "playful",
  "brutalist",
  "elegant",
  "startup",
] as const;
export type Vibe = (typeof VIBES)[number];

export const FONT_PAIRINGS = [
  "inter-lora",
  "fraunces-inter",
  "space-grotesk-ibm-plex",
  "playfair-source-sans",
  "dm-serif-dm-sans",
  "archivo-libre-franklin",
  "sora-newsreader",
  "bricolage-instrument-sans",
] as const;
export type FontPairingId = (typeof FONT_PAIRINGS)[number];

export const FEATURE_ICONS = [
  "zap",
  "shield",
  "chart",
  "clock",
  "users",
  "globe",
  "layers",
  "lock",
  "rocket",
  "sparkles",
  "target",
  "wrench",
  "bell",
  "calendar",
  "compass",
  "database",
  "inbox",
  "map-pin",
  "refresh",
  "trending-up",
] as const;
export type FeatureIcon = (typeof FEATURE_ICONS)[number];

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/);

const fillRole = z.enum(["primary", "accent", "text", "bg"]);

// Logo shapes live in a 24x24 viewBox. Fills are palette roles so the mark
// always matches the brand and can be recolored for the OG card.
export const LogoShapeSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("circle"),
    cx: z.number(),
    cy: z.number(),
    r: z.number(),
    fill: fillRole,
  }),
  z.object({
    type: z.literal("rect"),
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
    rx: z.number(),
    fill: fillRole,
  }),
  z.object({
    type: z.literal("path"),
    // Data-only path commands — no way to smuggle markup through this.
    d: z.string().regex(/^[MmLlHhVvCcSsQqTtAaZz0-9\s,.\-eE]+$/),
    fill: fillRole,
  }),
  z.object({
    type: z.literal("polygon"),
    points: z.string().regex(/^[0-9\s,.\-eE]+$/),
    fill: fillRole,
  }),
]);
export type LogoShape = z.infer<typeof LogoShapeSchema>;

export const CompanySchema = z.object({
  name: z.string().min(2).max(30),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  industry: z.string(),
  tagline: z.string().max(120),
  positioning: z.string().max(240),
  vibe: z.enum(VIBES),
  fontPairing: z.enum(FONT_PAIRINGS),
  palette: z.object({
    bg: hex,
    surface: hex,
    text: hex,
    primary: hex,
    accent: hex,
  }),
  logo: z.object({
    style: z.enum(["mark-and-wordmark", "wordmark-only", "monogram"]),
    monogram: z.string().max(3),
    shapes: z.array(LogoShapeSchema).max(6),
  }),
  homepage: z.object({
    hero: z.object({
      h1: z.string().max(90),
      sub: z.string().max(280),
      ctaLabel: z.string().max(30),
      secondaryCtaLabel: z.string().max(30),
    }),
    features: z
      .array(
        z.object({
          title: z.string().max(40),
          description: z.string().max(220),
          icon: z.enum(FEATURE_ICONS),
        }),
      )
      .min(3)
      .max(6),
    testimonials: z
      .array(
        z.object({
          quote: z.string().max(260),
          name: z.string().max(40),
          role: z.string().max(50),
          company: z.string().max(40),
        }),
      )
      .length(3),
    pricing: z
      .array(
        z.object({
          tier: z.string().max(24),
          price: z.string().max(16),
          period: z.string().max(36),
          blurb: z.string().max(90),
          features: z.array(z.string().max(60)).min(3).max(6),
          highlighted: z.boolean(),
        }),
      )
      .length(3),
    footerBlurb: z.string().max(240),
  }),
});

export type Company = z.infer<typeof CompanySchema>;
