import type { Company } from "@/lib/schema";
import { Logo, LogoMark } from "@/components/Logo";

// Editorial refinement: serif-led, narrow measure, hairline rules, small-caps
// labels, generous whitespace. No icons — typography carries everything.
export function ElegantTemplate({ company: c }: { company: Company }) {
  const { homepage: h } = c;
  const hairline = "1px solid color-mix(in srgb, var(--brand-text) 18%, transparent)";
  return (
    <div>
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
        <Logo company={c} size={28} />
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--brand-primary)" }}
        >
          Est. somewhere, never
        </span>
      </header>
      <div className="mx-auto max-w-4xl px-6" style={{ borderTop: hairline }} />

      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center md:pt-28">
        <p className="mb-8 text-xs tracking-[0.35em] uppercase opacity-60">{c.industry}</p>
        <h1 className="font-brand-heading text-4xl leading-[1.12] md:text-6xl">{h.hero.h1}</h1>
        <div
          className="mx-auto my-9 h-px w-16"
          style={{ background: "var(--brand-accent)" }}
        />
        <p className="mx-auto max-w-xl text-lg leading-loose opacity-85">{h.hero.sub}</p>
        <div className="mt-12 flex items-center justify-center gap-8">
          <span
            className="px-9 py-3.5 text-sm tracking-[0.15em] uppercase"
            style={{ background: "var(--brand-text)", color: "var(--brand-bg)" }}
          >
            {h.hero.ctaLabel}
          </span>
          <span
            className="text-sm tracking-[0.15em] uppercase underline decoration-1 underline-offset-8"
            style={{ textDecorationColor: "var(--brand-accent)" }}
          >
            {h.hero.secondaryCtaLabel}
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16" style={{ borderTop: hairline }}>
        <div className="space-y-14">
          {h.features.map((f, i) => (
            <div key={f.title} className="grid gap-4 md:grid-cols-[140px_1fr] md:gap-12">
              <span
                className="font-brand-heading text-4xl leading-none opacity-30"
                style={{ color: "var(--brand-primary)", opacity: 0.55 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-brand-heading text-2xl">{f.title}</h3>
                <p className="mt-3 max-w-xl leading-loose opacity-80">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--brand-surface)", borderTop: hairline, borderBottom: hairline }}>
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="mb-12 text-xs tracking-[0.35em] uppercase opacity-60">In their words</p>
          <div className="space-y-14">
            {h.testimonials.map((t) => (
              <figure key={t.name}>
                <blockquote className="font-brand-heading text-2xl leading-relaxed md:text-3xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm tracking-wider opacity-70">
                  {t.name} · {t.role}, {t.company}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-14 text-center text-xs tracking-[0.35em] uppercase opacity-60">
          Arrangements
        </p>
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {h.pricing.map((p) => (
            <div
              key={p.tier}
              className="flex flex-col text-center"
              style={{
                borderTop: p.highlighted
                  ? "3px solid var(--brand-accent)"
                  : "1px solid color-mix(in srgb, var(--brand-text) 25%, transparent)",
                paddingTop: "2rem",
              }}
            >
              <h3 className="text-sm tracking-[0.25em] uppercase">{p.tier}</h3>
              <div className="font-brand-heading mt-5 text-5xl">{p.price}</div>
              <div className="mt-1 text-xs tracking-wider opacity-60">{p.period}</div>
              <p className="mt-5 text-sm leading-relaxed opacity-80">{p.blurb}</p>
              <ul className="mt-7 flex-1 space-y-3 text-sm opacity-85">
                {p.features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>
              <span
                className="mx-auto mt-9 inline-block text-sm tracking-[0.15em] uppercase underline decoration-1 underline-offset-8"
                style={{ textDecorationColor: "var(--brand-accent)" }}
              >
                {h.hero.ctaLabel}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 pb-16 text-center" style={{ borderTop: hairline }}>
        <div className="mx-auto mt-14 mb-5 flex justify-center">
          <LogoMark company={c} size={34} />
        </div>
        <p className="mx-auto max-w-md text-sm leading-loose opacity-65">{h.footerBlurb}</p>
      </footer>
    </div>
  );
}
