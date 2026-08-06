import type { Seed } from "./seeds";

export function buildPrompt(seed: Seed, usedNames: string[]): string {
  return `You are inventing a fictional B2B/SaaS company for "This Business Does Not Exist" — a site that shows visitors a complete, believable fake company. Your output must feel like a real, well-funded company a designer actually branded: specific, confident, and internally consistent. Never generic.

## Your assignment (fixed — do not deviate)
- Industry: ${seed.industry}
- Brand tone: ${seed.tone}
- Target audience: ${seed.audience}
- Layout vibe: ${seed.vibe} (set the "vibe" field to exactly this)
- Font pairing: ${seed.fontPairing} (set "fontPairing" to exactly this)
- Palette mood: ${seed.paletteMood}
- Company naming style: ${seed.namingStyle}
- Pricing model: ${seed.pricingModel}

## Rules

**Name**: Follow the naming style. Short (one or two words), pronounceable, plausible as a real startup. It must NOT resemble any of these already-used names: ${usedNames.length ? usedNames.join(", ") : "(none yet)"}. Also avoid resembling famous real companies. The slug is the lowercased name, hyphenated, alphanumeric only.

**Copy**: Write like a top-tier SaaS copywriter working in the assigned tone. Concrete over abstract — name the painful workflow, the specific artifact, the actual user. Testimonial authors are invented people at invented companies with realistic names and job titles for this industry. Pricing follows the assigned model with plausible price points for the audience (enterprise tiers can say "Custom"). Exactly one pricing tier has "highlighted": true (the middle one, usually).

**Palette**: 5 hex colors following the palette mood. "bg" is the page background, "surface" is card background (must sit naturally on bg), "text" must have high contrast on both bg and surface (WCAG AA, 4.5:1+), "primary" is the main brand/button color (contrast 3:1+ against bg), "accent" is a secondary flourish color. Dark palettes are welcome when the mood calls for them.

**Logo**: A simple geometric mark in a 24x24 viewBox, in the spirit of great minimal logos (think early Stripe, Vercel, Linear — abstract, balanced, 1-4 shapes). Your assigned logo archetype is: **${seed.logoArchetype}** — design within that archetype. NEVER default to two overlapping filled circles; that cliché is banned. Choose the style that best fits the brand:
- "mark-and-wordmark": 1-4 shapes forming an abstract mark shown next to the name. Shapes must be bold at small sizes — no thin details. Overlapping shapes in primary/accent work well.
- "monogram": 1-3 letter monogram rendered by the site in brand type; set shapes to [] (or a single simple backing shape).
- "wordmark-only": no mark; set shapes to [].
Coordinates must stay within 0-24. Fills are the palette roles ("primary", "accent", "text", "bg"), not hex values. Paths use only M/L/H/V/C/S/Q/T/A/Z commands with numbers.

**Believability bar**: A visitor should momentarily wonder if this company is real. Humor is allowed only if the assigned tone is irreverent — and even then it's dry, not clownish.

Return the company as JSON matching the provided schema.`;
}
