import fs from "fs";
import path from "path";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { CompanySchema, type Company } from "../src/lib/schema";
import { getClient, withRetry } from "./lib/claude";
import { buildSeeds, type Seed } from "./lib/seeds";
import { buildPrompt } from "./lib/prompt";
import { validateCompany } from "./lib/validate";

const DATA_DIR = path.join(process.cwd(), "data", "companies");
const MANIFEST = path.join(process.cwd(), "data", "manifest.json");
const REJECTS = path.join(process.cwd(), "data", "rejects.json");
const MODEL = "claude-opus-4-8";
const CONCURRENCY = 3;
const MAX_GEN_ATTEMPTS = 3;

type Manifest = Record<string, string>; // seed index -> slug

function loadJson<T>(file: string, fallback: T): T {
  return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, "utf8")) as T) : fallback;
}

function usedNames(): string[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => (JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf8")) as Company).name);
}

async function generateOne(seed: Seed, names: string[]): Promise<Company> {
  const client = getClient();
  let feedback = "";
  for (let attempt = 1; attempt <= MAX_GEN_ATTEMPTS; attempt++) {
    const prompt = buildPrompt(seed, names) + feedback;
    let msg;
    try {
      msg = await withRetry(async () => {
        const stream = client.messages.stream({
          model: MODEL,
          max_tokens: 16000,
          thinking: { type: "adaptive" },
          output_config: { format: zodOutputFormat(CompanySchema) },
          messages: [{ role: "user", content: prompt }],
        });
        return stream.finalMessage();
      });
    } catch (err) {
      // SDK-side schema validation can throw here; feed it back and retry
      if (err instanceof Error && err.name?.includes("API")) throw err;
      console.log(`  [${seed.index}] attempt ${attempt} threw: ${String(err).slice(0, 200)}`);
      feedback = `\n\nYour previous attempt failed validation:\n${String(err).slice(0, 600)}\nFix these issues.`;
      continue;
    }
    const text = msg.content.find((b) => b.type === "text")?.text;
    if (!text) throw new Error(`no text block for seed ${seed.index}`);
    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      feedback = `\n\nYour previous output was not valid JSON. Return only the JSON object.`;
      continue;
    }
    const result = validateCompany(raw, names);
    if (result.ok) {
      if (result.fixes.length) console.log(`  [${seed.index}] auto-fixes: ${result.fixes.join("; ")}`);
      return result.company;
    }
    console.log(`  [${seed.index}] attempt ${attempt} rejected: ${result.errors.join("; ")}`);
    feedback = `\n\nYour previous attempt was rejected for these reasons — fix them:\n- ${result.errors.join("\n- ")}`;
  }
  throw new Error(`seed ${seed.index} failed after ${MAX_GEN_ATTEMPTS} attempts`);
}

async function main() {
  const countArg = process.argv.indexOf("--count");
  const count = countArg > -1 ? parseInt(process.argv[countArg + 1], 10) : Infinity;

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const manifest = loadJson<Manifest>(MANIFEST, {});
  const rejects = loadJson<Record<string, string>>(REJECTS, {});
  const names = usedNames();

  const pending = buildSeeds().filter((s) => {
    const slug = manifest[String(s.index)];
    return !(slug && fs.existsSync(path.join(DATA_DIR, `${slug}.json`)));
  });
  const batch = pending.slice(0, count);
  console.log(`${pending.length} seeds pending; generating ${batch.length} (concurrency ${CONCURRENCY})`);

  let done = 0;
  const queue = [...batch];
  async function worker() {
    for (;;) {
      const seed = queue.shift();
      if (!seed) return;
      try {
        const company = await generateOne(seed, names);
        // reserve the name before writing to keep parallel workers deduped
        names.push(company.name);
        fs.writeFileSync(
          path.join(DATA_DIR, `${company.slug}.json`),
          JSON.stringify(company, null, 2) + "\n",
        );
        manifest[String(seed.index)] = company.slug;
        fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
        delete rejects[String(seed.index)];
        done++;
        console.log(`[${done}/${batch.length}] ${company.name} (${seed.industry}, ${seed.vibe})`);
      } catch (err) {
        rejects[String(seed.index)] = String(err);
        fs.writeFileSync(REJECTS, JSON.stringify(rejects, null, 2) + "\n");
        console.error(`[seed ${seed.index}] FAILED: ${err}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`Done. ${done}/${batch.length} generated.`);
}

main();
