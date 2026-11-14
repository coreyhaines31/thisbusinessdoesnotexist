# This Business Does Not Exist

[thisbusinessdoesnotexist.com](https://thisbusinessdoesnotexist.com)

One click, one complete and believable fake company: name, logo, palette, tagline, positioning, homepage copy, pricing, and testimonials. None of it is real. Every company is AI-generated fiction.

- `/` redirects to a random company at `/c/{slug}`
- `/all` is the full catalog
- `/api` is a free JSON API over the same data

## How it works

The companies are a pre-generated pool, not generated on request. `scripts/generate-companies.ts` builds them offline with Claude from a deterministic seed grid (industry, tone, audience, plus rotating vibe, font pairing, palette mood, naming style, pricing model, and logo archetype). Each result is validated with zod (`src/lib/schema.ts`) plus extra checks for contrast, duplicate or too-similar names, known brands, and profanity, then written to `data/companies/{slug}.json`.

At runtime the site just reads those JSON files. There is no runtime AI and no database. Company pages and their share images are statically generated at build time.

## JSON API

Free to use, CORS open (`Access-Control-Allow-Origin: *`), no key.

| Endpoint | Returns |
| --- | --- |
| `GET /api` | Self-describing index of the API |
| `GET /api/company` | A random company (uncached, different every call) |
| `GET /api/company/{slug}` | One company by slug (404 if unknown) |
| `GET /api/companies` | Summary index of every company. Add `?full=1` for complete objects |

```sh
curl https://thisbusinessdoesnotexist.com/api/company
curl https://thisbusinessdoesnotexist.com/api/company/sigilvault
curl "https://thisbusinessdoesnotexist.com/api/companies?full=1"
```

Logos are returned as structured specs (monogram or shapes in a 24x24 viewBox with palette-role fills), so you can render them as SVG in your own palette.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` then `npm start` serves the production build on port 3008.

## Generating companies

```sh
cp .env.example .env.local   # then set ANTHROPIC_API_KEY
npm run generate
npm run generate -- --count 10
```

- With no arguments it generates every pending seed. `--count N` limits the run to the first N pending seeds.
- A seed is pending if `data/manifest.json` has no slug for it or that slug's JSON file is missing, so reruns resume where they left off.
- Runs 3 requests in parallel. Each seed gets up to 3 attempts, with validation errors fed back to the model.
- Seeds that still fail are recorded in `data/rejects.json` and retried on the next run.

## Environment variables

See `.env.example`.

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_TRACERKIT_KEY` | TracerKit site public key (`tk_...`). Analytics (Headstream) is configured as a tag in the TracerKit dashboard. The loader only renders when `VERCEL_ENV=production`. |
| `ANTHROPIC_API_KEY` | Only for `npm run generate`. Read from `.env.local`. |

## Project structure

```
data/
  companies/          one JSON file per company
  manifest.json       seed index to slug
  rejects.json        seeds that failed generation
scripts/
  generate-companies.ts
  lib/                Claude client, prompt, seeds, validation
src/
  app/
    page.tsx          random redirect
    all/              catalog
    c/[slug]/         company page and its share image
    api/              JSON API routes
    robots.ts, sitemap.ts, opengraph-image.tsx
  components/         logo, brand theme, page templates per vibe, TracerKit
  lib/                company loader, schema, site constants, OG helpers
```

## Deploy

Hosted on Vercel. Pushes to `main` deploy to production. `www.thisbusinessdoesnotexist.com` permanently redirects to the apex domain (see `next.config.ts`).
