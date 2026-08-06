import type { Company } from "@/lib/schema";
import { Logo, LogoMark } from "@/components/Logo";
import { Icon } from "@/components/Icon";

// Toy-like energy: oversized display type, rotated sticker chips, chunky
// borders and hard shadows, alternating feature rows, pill everything.
export function PlayfulTemplate({ company: c }: { company: Company }) {
  const { homepage: h } = c;
  const tilt = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2"];
  return (
    <div className="overflow-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo company={c} size={34} />
        <span
          className="rounded-full px-5 py-2.5 text-sm font-bold"
          style={{
            background: "var(--brand-primary)",
            color: "var(--brand-bg)",
            boxShadow: "3px 3px 0 var(--brand-accent)",
          }}
        >
          {h.hero.ctaLabel}
        </span>
      </header>

      <section className="relative mx-auto max-w-5xl px-6 pt-14 pb-20 text-center md:pt-20">
        <span
          className="absolute top-6 left-4 hidden -rotate-12 rounded-full px-4 py-1.5 text-xs font-bold md:inline-block"
          style={{ background: "var(--brand-accent)", color: "var(--brand-bg)" }}
        >
          100% {c.industry}
        </span>
        <span
          className="absolute top-16 right-2 hidden rotate-6 rounded-full border-2 px-4 py-1.5 text-xs font-bold md:inline-block"
          style={{ borderColor: "var(--brand-primary)", color: "var(--brand-primary)" }}
        >
          no, really
        </span>
        <h1 className="font-brand-heading text-5xl leading-[1.02] font-extrabold tracking-tight md:text-7xl">
          {h.hero.h1}
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed opacity-85">{h.hero.sub}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <span
            className="rounded-full px-8 py-4 text-lg font-bold transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--brand-primary)",
              color: "var(--brand-bg)",
              boxShadow: "4px 4px 0 var(--brand-accent)",
            }}
          >
            {h.hero.ctaLabel}
          </span>
          <span
            className="rounded-full border-2 px-8 py-4 text-lg font-bold"
            style={{ borderColor: "var(--brand-text)" }}
          >
            {h.hero.secondaryCtaLabel}
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-8 px-6 pb-20">
        {h.features.map((f, i) => (
          <div
            key={f.title}
            className={`flex flex-col gap-5 rounded-3xl border-2 p-8 md:items-center ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"} ${tilt[i % tilt.length]} md:gap-8`}
            style={{
              borderColor: "var(--brand-text)",
              background: "var(--brand-surface)",
              boxShadow: "6px 6px 0 color-mix(in srgb, var(--brand-primary) 60%, transparent)",
            }}
          >
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: "var(--brand-accent)", color: "var(--brand-bg)" }}
            >
              <Icon name={f.icon} size={30} />
            </div>
            <div>
              <h3 className="font-brand-heading text-2xl font-bold">{f.title}</h3>
              <p className="mt-2 leading-relaxed opacity-80">{f.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section
        className="border-y-2 py-16"
        style={{ borderColor: "var(--brand-text)", background: "var(--brand-primary)" }}
      >
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {h.testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`rounded-2xl p-6 ${tilt[(i + 1) % tilt.length]}`}
              style={{ background: "var(--brand-bg)", color: "var(--brand-text)" }}
            >
              <blockquote className="font-medium leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-bold">
                {t.name}
                <span className="block font-normal opacity-60">
                  {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-brand-heading mb-12 text-center text-4xl font-extrabold">
          Pick your flavor
        </h2>
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {h.pricing.map((p, i) => (
            <div
              key={p.tier}
              className={`flex flex-col rounded-3xl border-2 p-7 ${p.highlighted ? "md:-translate-y-3" : ""} ${tilt[(i + 2) % tilt.length]}`}
              style={{
                borderColor: "var(--brand-text)",
                background: p.highlighted ? "var(--brand-accent)" : "var(--brand-surface)",
                color: p.highlighted ? "var(--brand-bg)" : undefined,
                boxShadow: p.highlighted ? "6px 6px 0 var(--brand-text)" : "4px 4px 0 color-mix(in srgb, var(--brand-text) 35%, transparent)",
              }}
            >
              <h3 className="font-brand-heading text-xl font-bold">{p.tier}</h3>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="font-brand-heading text-5xl font-extrabold">{p.price}</span>
                <span className="text-sm opacity-70">{p.period}</span>
              </div>
              <p className="mt-3 text-sm font-medium opacity-85">{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm font-medium">
                {p.features.map((feat) => (
                  <li key={feat}>★ {feat}</li>
                ))}
              </ul>
              <span
                className="mt-7 rounded-full border-2 py-3 text-center font-bold"
                style={{
                  borderColor: p.highlighted ? "var(--brand-bg)" : "var(--brand-text)",
                }}
              >
                {h.hero.ctaLabel}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 pb-14 text-center">
        <div className="mx-auto mb-4 flex justify-center">
          <LogoMark company={c} size={40} />
        </div>
        <p className="mx-auto max-w-md text-sm opacity-70">{h.footerBlurb}</p>
      </footer>
    </div>
  );
}
