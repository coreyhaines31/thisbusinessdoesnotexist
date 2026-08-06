import type { Company } from "@/lib/schema";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

// Enterprise calm: centered hero, airy 3-col grid, boxed pricing. Restraint is
// the aesthetic — generous whitespace, hairline rules, one confident accent.
export function CorporateTemplate({ company: c }: { company: Company }) {
  const { homepage: h } = c;
  return (
    <div>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo company={c} size={30} />
        <nav className="hidden items-center gap-8 text-sm opacity-80 md:flex">
          <span>Product</span>
          <span>Customers</span>
          <span>Pricing</span>
          <span
            className="rounded-md px-4 py-2 font-medium"
            style={{ background: "var(--brand-primary)", color: "var(--brand-bg)" }}
          >
            {h.hero.ctaLabel}
          </span>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center md:pt-28">
        <p
          className="mb-6 inline-block rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase"
          style={{ borderColor: "color-mix(in srgb, var(--brand-text) 20%, transparent)", color: "var(--brand-primary)" }}
        >
          {c.industry}
        </p>
        <h1 className="font-brand-heading text-4xl leading-tight font-bold tracking-tight md:text-6xl">
          {h.hero.h1}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed opacity-80">{h.hero.sub}</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <span
            className="rounded-md px-6 py-3 text-base font-semibold"
            style={{ background: "var(--brand-primary)", color: "var(--brand-bg)" }}
          >
            {h.hero.ctaLabel}
          </span>
          <span className="px-2 py-3 text-base font-medium underline-offset-4 opacity-80 hover:underline">
            {h.hero.secondaryCtaLabel} →
          </span>
        </div>
      </section>

      <section
        className="border-y"
        style={{ borderColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)", background: "var(--brand-surface)" }}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3 md:gap-8 md:py-20">
          {h.features.map((f) => (
            <div key={f.title}>
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{
                  background: "color-mix(in srgb, var(--brand-primary) 14%, transparent)",
                  color: "var(--brand-primary)",
                }}
              >
                <Icon name={f.icon} size={20} />
              </div>
              <h3 className="font-brand-heading mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed opacity-75">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-brand-heading mb-12 text-center text-2xl font-bold md:text-3xl">
          Trusted by teams in {c.industry}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {h.testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-xl border p-6"
              style={{
                borderColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)",
                background: "var(--brand-surface)",
              }}
            >
              <blockquote className="text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="opacity-60">
                  {" "}
                  · {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="font-brand-heading mb-3 text-center text-2xl font-bold md:text-3xl">Pricing</h2>
        <p className="mb-12 text-center opacity-70">Simple plans that scale with you.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {h.pricing.map((p) => (
            <div
              key={p.tier}
              className="flex flex-col rounded-xl border p-7"
              style={
                p.highlighted
                  ? { borderColor: "var(--brand-primary)", borderWidth: 2, background: "var(--brand-surface)" }
                  : {
                      borderColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)",
                      background: "var(--brand-surface)",
                    }
              }
            >
              <h3 className="font-brand-heading text-lg font-semibold">{p.tier}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-brand-heading text-4xl font-bold">{p.price}</span>
                <span className="text-sm opacity-60">{p.period}</span>
              </div>
              <p className="mt-3 text-sm opacity-75">{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.features.map((feat) => (
                  <li key={feat} className="flex gap-2">
                    <span style={{ color: "var(--brand-primary)" }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <span
                className="mt-7 rounded-md py-2.5 text-center text-sm font-semibold"
                style={
                  p.highlighted
                    ? { background: "var(--brand-primary)", color: "var(--brand-bg)" }
                    : {
                        border: "1px solid color-mix(in srgb, var(--brand-text) 25%, transparent)",
                      }
                }
              >
                {h.hero.ctaLabel}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="border-t"
        style={{ borderColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
          <Logo company={c} size={26} />
          <p className="max-w-md text-sm opacity-60">{h.footerBlurb}</p>
        </div>
      </footer>
    </div>
  );
}
