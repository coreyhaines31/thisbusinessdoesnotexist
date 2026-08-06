import type { ComponentType } from "react";
import type { Company, Vibe } from "@/lib/schema";
import { CorporateTemplate } from "./CorporateTemplate";
import { PlayfulTemplate } from "./PlayfulTemplate";
import { BrutalistTemplate } from "./BrutalistTemplate";
import { ElegantTemplate } from "./ElegantTemplate";
import { StartupTemplate } from "./StartupTemplate";

export const TEMPLATES: Record<Vibe, ComponentType<{ company: Company }>> = {
  corporate: CorporateTemplate,
  playful: PlayfulTemplate,
  brutalist: BrutalistTemplate,
  elegant: ElegantTemplate,
  startup: StartupTemplate,
};
