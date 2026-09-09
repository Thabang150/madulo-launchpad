import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { P } from "@/lib/paths";

const title = "Property Calculators — Madulo Properties";
const description =
  "Estimate bond and transfer costs, monthly home loan repayments, affordability and the effect of extra payments.";

export const Route = createFileRoute("/preview/calculators/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalculatorsIndex,
});

const cards = [
  {
    to: P.calcBondTransfer,
    title: "Bond & Transfer Costs",
    copy: "Estimate transfer duty, attorney fees and deeds office costs on a purchase.",
  },
  {
    to: P.calcHomeLoanRepayment,
    title: "Home Loan Repayment",
    copy: "Work out the monthly instalment and total interest on a bond.",
  },
  {
    to: P.calcAffordability,
    title: "Affordability",
    copy: "See the guideline purchase price your income could support.",
  },
  {
    to: P.calcAdditionalPayment,
    title: "Additional Payment",
    copy: "See how paying extra each month shortens your bond and saves interest.",
  },
] as const;

function CalculatorsIndex() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-site py-14 lg:py-16">
          <p className="eyebrow">Tools</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground lg:text-5xl">Property calculators</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Guideline estimates for South African home buyers. Figures are indicative and not a quotation.
          </p>
        </div>
      </section>

      <section className="container-site py-14">
        <ul className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {cards.map((c) => (
            <li key={c.to} className="bg-card">
              <Link
                to={c.to}
                className="flex h-full flex-col justify-between gap-6 p-8 transition-colors duration-300 ease-premium hover:bg-accent"
              >
                <div>
                  <h2 className="font-display text-2xl text-foreground">{c.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                  Open calculator <ArrowRight className="h-4 w-4 text-gold" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
