import "server-only";
import fs from "fs";
import path from "path";
import { CompanySchema, type Company } from "./schema";

const DATA_DIR = path.join(process.cwd(), "data", "companies");

let cache: Company[] | null = null;

export function getAllCompanies(): Company[] {
  if (cache) return cache;
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
  cache = files.map((f) => {
    const raw = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf8"));
    return CompanySchema.parse(raw);
  });
  return cache;
}

export function getCompany(slug: string): Company | undefined {
  return getAllCompanies().find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllCompanies().map((c) => c.slug);
}
