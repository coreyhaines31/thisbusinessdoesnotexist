import {
  Inter,
  Lora,
  Fraunces,
  Space_Grotesk,
  IBM_Plex_Sans,
  Playfair_Display,
  Source_Sans_3,
  DM_Serif_Display,
  DM_Sans,
  Archivo,
  Libre_Franklin,
  Sora,
  Newsreader,
  Bricolage_Grotesque,
  Instrument_Sans,
} from "next/font/google";
import type { FontPairingId } from "./schema";

// next/font requires module-scope declarations. preload:false keeps unused
// fonts out of every page; browsers only fetch faces actually referenced.
const inter = Inter({ subsets: ["latin"], preload: false });
const lora = Lora({ subsets: ["latin"], preload: false });
const fraunces = Fraunces({ subsets: ["latin"], preload: false });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], preload: false });
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});
const playfair = Playfair_Display({ subsets: ["latin"], preload: false });
const sourceSans = Source_Sans_3({ subsets: ["latin"], preload: false });
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  preload: false,
});
const dmSans = DM_Sans({ subsets: ["latin"], preload: false });
const archivo = Archivo({ subsets: ["latin"], preload: false });
const libreFranklin = Libre_Franklin({ subsets: ["latin"], preload: false });
const sora = Sora({ subsets: ["latin"], preload: false });
const newsreader = Newsreader({ subsets: ["latin"], preload: false });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], preload: false });
const instrumentSans = Instrument_Sans({ subsets: ["latin"], preload: false });

type Pairing = {
  heading: { className: string; family: string };
  body: { className: string; family: string };
};

function pair(
  heading: { className: string; style: { fontFamily: string } },
  body: { className: string; style: { fontFamily: string } },
): Pairing {
  return {
    heading: { className: heading.className, family: heading.style.fontFamily },
    body: { className: body.className, family: body.style.fontFamily },
  };
}

export const FONT_PAIRING_MAP: Record<FontPairingId, Pairing> = {
  "inter-lora": pair(inter, lora),
  "fraunces-inter": pair(fraunces, inter),
  "space-grotesk-ibm-plex": pair(spaceGrotesk, ibmPlexSans),
  "playfair-source-sans": pair(playfair, sourceSans),
  "dm-serif-dm-sans": pair(dmSerif, dmSans),
  "archivo-libre-franklin": pair(archivo, libreFranklin),
  "sora-newsreader": pair(sora, newsreader),
  "bricolage-instrument-sans": pair(bricolage, instrumentSans),
};
