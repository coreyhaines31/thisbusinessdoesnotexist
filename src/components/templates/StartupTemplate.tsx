import type { Company } from "@/lib/schema";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

// Modern venture-ware: glow gradient hero, bento feature grid, glassy surfaces,
// pill badges, elevated middle pricing tier.
export function StartupTemplate({ company: c }: { company: Company }) {
  const { homepage: h } = c;
  const bento = h.features.length >= 5;
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in srgb, var(--brand-primary) 32%, transparent), color-mix(in srgb, var(--brand-accent) 14%, transparent) 55%, transparent 75%)",
        }}
      />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo company={c} size={30} />
        <span
          className="rounded-lg px-4 py-2 text-sm font-semibold"
          style={{
            background: "color-mix(in srgb, var(--brand-text) 8%, transparent)",
            border: "1px solid color-mix(in srgb, var(--brand-text) 15%, transparent)",
          }}
        >
          {h.hero.ctaLabel}
        </span>
      </header>

      <section className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 text-center md:pt-28">
        <span
          className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
          style={{
            background: "color-mix(in srgb, var(--brand-primary) 15%, transparent)",
            color: "var(--brand-primary)",
            border: "1px solid color-mix(in srgb, var(--brand-primary) 30%, transparent)",
          }}
        >
          ✦ Now serving {c.industry}
        </span>
        <h1 className="font-brand-heading text-5xl leading-[1.05] font-bold tracking-tight md:text-7xl">
          {h.hero.h1}
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed opacity-80 md:text-xl">
          {h.hero.sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <span
            className="rounded-xl px-7 py-3.5 text-base font-semibold"
            style={{
              background: "linear-gradient(135deg, var(--brand-primary), var(--brand-accent))",
              color: "var(--brand-bg)",
              boxShadow: "0 8px 30px color-mix(in srgb, var(--brand-primary) 40%, transparent)",
            }}
          >
            {h.hero.ctaLabel}
          </span>
          <span
            className="rounded-xl px-7 py-3.5 text-base font-semibold"
            style={{ border: "1px solid color-mix(in srgb, var(--brand-text) 20%, transparent)" }}
          >
            {h.hero.secondaryCtaLabel}
          </span>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-14">
        <div className={`grid gap-4 md:grid-cols-6`}>
          {h.features.map((f, i) => {
            const wide = bento ? (i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2") : "md:col-span-2";
            return (
              <div
                key={f.title}
                className={`rounded-2xl p-7 ${wide}`}
                style={{
                  background: "color-mix(in srgb, var(--brand-surface) 80%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--brand-text) 12%, transparent)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 25%, transparent), color-mix(in srgb, var(--brand-accent) 25%, transparent))",
                    color: "var(--brand-primary)",
                  }}
                >
                  <Icon name={f.icon} size={20} />
                </span>
                <h3 className="font-brand-heading text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-75">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {h.testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl p-6"
              style={{
                background: "color-mix(in srgb, var(--brand-surface) 80%, transparent)",
                border: "1px solid color-mix(in srgb, var(--brand-text) 12%, transparent)",
              }}
            >
              <div className="mb-3 text-sm" style={{ color: "var(--brand-accent)" }}>
                ★★★★★
              </div>
              <blockquote className="text-sm leading-relaxed opacity-90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, var(--brand-primary), var(--brand-accent))",
                    color: "var(--brand-bg)",
                  }}
                >
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="text-xs">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="opacity-60">
                    {t.role}, {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-6 py-16 pb-24">
        <h2 className="font-brand-heading mb-3 text-center text-3xl font-bold md:text-4xl">
          Pricing that scales with you
        </h2>
        <p className="mb-12 text-center opacity-70">Start free-ish. Upgrade when it hurts.</p>
        <div className="grid items-start gap-6 md:grid-cols-3">
          {h.pricing.map((p) => (
            <div
              key={p.tier}
              className={`flex flex-col rounded-2xl p-7 ${p.highlighted ? "md:-mt-4 md:pb-11" : ""}`}
              style={
                p.highlighted
                  ? {
                      background: "linear-gradient(160deg, color-mix(in srgb, var(--brand-primary) 20%, var(--brand-surface)), var(--brand-surface))",
                      border: "1px solid var(--brand-primary)",
                      boxShadow: "0 16px 50px color-mix(in srgb, var(--brand-primary) 25%, transparent)",
                    }
                  : {
                      background: "color-mix(in srgb, var(--brand-surface) 80%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--brand-text) 12%, transparent)",
                    }
              }
            >
              {p.highlighted && (
                <span
                  className="mb-3 self-start rounded-full px-3 py-1 text-xs font-bold"
                  style={{ background: "var(--brand-primary)", color: "var(--brand-bg)" }}
                >
                  Most popular
                </span>
              )}
              <h3 className="font-brand-heading text-lg font-semibold">{p.tier}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-brand-heading text-4xl font-bold">{p.price}</span>
                <span className="text-sm opacity-60">{p.period}</span>
              </div>
              <p className="mt-3 text-sm opacity-75">{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.features.map((feat) => (
                  <li key={feat} className="flex gap-2">
                    <span style={{ color: "var(--brand-accent)" }}>✦</span> {feat}
                  </li>
                ))}
              </ul>
              <span
                className="mt-7 rounded-xl py-2.5 text-center text-sm font-semibold"
                style={
                  p.highlighted
                    ? {
                        background: "linear-gradient(135deg, var(--brand-primary), var(--brand-accent))",
                        color: "var(--brand-bg)",
                      }
                    : { border: "1px solid color-mix(in srgb, var(--brand-text) 22%, transparent)" }
                }
              >
                {h.hero.ctaLabel}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="relative"
        style={{ borderTop: "1px solid color-mix(in srgb, var(--brand-text) 12%, transparent)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 px-6 py-10 md:flex-row md:items-center">
          <Logo company={c} size={26} />
          <p className="max-w-md text-sm opacity-60">{h.footerBlurb}</p>
        </div>
      </footer>
    </div>
  );
}
