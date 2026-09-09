import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { P } from "@/lib/paths";
import { whatsappLink } from "@/config/site";

export function CalculatorPage({
  eyebrow = "Calculator",
  title,
  intro,
  inputs,
  results,
  notes,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  inputs: ReactNode;
  results: ReactNode;
  notes: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-site py-14 lg:py-16">
          <Link
            to={P.calculators}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 ease-premium hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All calculators
          </Link>
          <p className="eyebrow mt-6">{eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground lg:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
        </div>
      </section>

      <section className="container-site grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div className="border border-border bg-card p-6 shadow-card sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Your details</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">{inputs}</div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border border-foreground/10 bg-foreground p-6 text-background shadow-card sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-background/70">Estimate</h2>
            <div className="mt-6">{results}</div>
          </div>

          <div className="border border-border bg-card p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Good to know</h2>
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-muted-foreground">{notes}</div>
            <Button asChild variant="outline" className="mt-6">
              <a href={whatsappLink(`Hello Madulo Properties, I have a question about the ${title.toLowerCase()}.`)}>
                Speak to our team
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export function MoneyField({
  label,
  id,
  value,
  onChange,
  prefix = "R",
  placeholder,
  hint,
}: {
  label: string;
  id: string;
  value: number | "";
  onChange: (v: number | "") => void;
  prefix?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {prefix}
        </span>
        <Input
          id={id}
          inputMode="decimal"
          placeholder={placeholder}
          value={value === "" ? "" : String(value)}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d.]/g, "");
            onChange(raw === "" ? "" : Number(raw));
          }}
          className="h-12 rounded-sm pl-8"
        />
      </div>
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function ResultRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={
        emphasis
          ? "flex items-baseline justify-between gap-4 border-t border-background/20 pt-4"
          : "flex items-baseline justify-between gap-4"
      }
    >
      <span className={emphasis ? "text-xs uppercase tracking-[0.18em] text-background/70" : "text-xs text-background/60"}>
        {label}
      </span>
      <span className={emphasis ? "font-display text-3xl" : "text-sm font-medium"}>{value}</span>
    </div>
  );
}
