import type { Company } from "@/lib/schema";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

// Raw and unapologetic: hard 2px borders everywhere, uppercase labels,
// numbered sections, flat pricing table, zero border-radius.
export function BrutalistTemplate({ company: c }: { company: Company }) {
  const { homepage: h } = c;
  const border = "2px solid var(--brand-text)";
  return (
    <div>
      <header
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: border }}
      >
        <Logo company={c} size={28} />
        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "var(--brand-primary)" }}>
          {c.industry}
        </span>
      </header>

      <section className="px-5 py-16 md:py-24" style={{ borderBottom: border }}>
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs font-bold tracking-[0.25em] uppercase opacity-60">
            001 / {h.hero.secondaryCtaLabel}
          </p>
          <h1 className="font-brand-heading max-w-4xl text-5xl leading-[0.98] font-black tracking-tight uppercase md:text-8xl">
            {h.hero.h1}
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-lg text-lg leading-snug">{h.hero.sub}</p>
            <span
              className="inline-block px-8 py-4 text-center text-base font-black tracking-wide uppercase"
              style={{ background: "var(--brand-primary)", color: "var(--brand-bg)", border }}
            >
              {h.hero.ctaLabel} ↗
            </span>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3" style={{ borderBottom: border }}>
        {h.features.map((f, i) => (
          <div
            key={f.title}
            className="p-8"
            style={{
              borderRight: (i + 1) % 3 !== 0 ? border : undefined,
              borderBottom: i < h.features.length - (h.features.length % 3 || 3) ? border : undefined,
              background: i % 2 ? "var(--brand-surface)" : undefined,
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold opacity-50">{String(i + 2).padStart(3, "0")}</span>
              <span style={{ color: "var(--brand-accent)" }}>
                <Icon name={f.icon} size={22} />
              </span>
            </div>
            <h3 className="font-brand-heading text-xl font-black uppercase">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed opacity-80">{f.description}</p>
          </div>
        ))}
      </section>

      <section style={{ borderBottom: border, background: "var(--brand-text)", color: "var(--brand-bg)" }}>
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="mb-10 text-xs font-bold tracking-[0.25em] uppercase opacity-60">Field reports</p>
          <div className="space-y-10">
            {h.testimonials.map((t) => (
              <figure key={t.name} className="md:flex md:items-baseline md:gap-10">
                <blockquote className="font-brand-heading max-w-3xl text-xl leading-snug font-bold md:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 shrink-0 text-xs font-bold tracking-wider uppercase opacity-70 md:mt-0">
                  {t.name} — {t.role}, {t.company}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16" style={{ borderBottom: border }}>
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 text-xs font-bold tracking-[0.25em] uppercase opacity-60">Rates</p>
          <div className="grid gap-0 md:grid-cols-3">
            {h.pricing.map((p, i) => (
              <div
                key={p.tier}
                className="flex flex-col p-8"
                style={{
                  border,
                  marginLeft: i > 0 ? -2 : 0,
                  background: p.highlighted ? "var(--brand-primary)" : "var(--brand-surface)",
                  color: p.highlighted ? "var(--brand-bg)" : undefined,
                }}
              >
                <h3 className="text-sm font-black tracking-[0.2em] uppercase">{p.tier}</h3>
                <div className="font-brand-heading mt-4 text-5xl font-black">{p.price}</div>
                <div className="text-xs uppercase opacity-70">{p.period}</div>
                <p className="mt-4 text-sm">{p.blurb}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm">
                  {p.features.map((feat) => (
                    <li key={feat}>— {feat}</li>
                  ))}
                </ul>
                <span
                  className="mt-8 py-3 text-center text-sm font-black tracking-wide uppercase"
                  style={{
                    border: p.highlighted ? "2px solid var(--brand-bg)" : border,
                  }}
                >
                  Select
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-4 px-5 py-8 md:flex-row md:items-center">
        <Logo company={c} size={24} />
        <p className="max-w-md text-xs leading-relaxed uppercase opacity-60">{h.footerBlurb}</p>
      </footer>
    </div>
  );
}
