import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage, MoneyField, ResultRow } from "@/components/site/CalculatorUI";
import { affordability, rand } from "@/lib/calculators";

const title = "Affordability Calculator — Madulo Properties";
const description = "Estimate the home loan and purchase price your income could support.";

export const Route = createFileRoute("/preview/calculators/affordability")({
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
  component: Page,
});

function Page() {
  const [income, setIncome] = useState<number | "">(35_000);
  const [expenses, setExpenses] = useState<number | "">(8_000);
  const [deposit, setDeposit] = useState<number | "">(100_000);
  const [rate, setRate] = useState<number | "">(11);
  const [years, setYears] = useState<number | "">(20);

  const n = (v: number | "") => (v === "" ? 0 : v);
  const a = affordability(n(income), n(expenses), n(rate), n(years), n(deposit));

  return (
    <CalculatorPage
      title="Affordability"
      intro="A guideline of what you could qualify for, based on gross income and existing monthly commitments."
      inputs={
        <>
          <MoneyField label="Gross monthly income" id="income" value={income} onChange={setIncome} />
          <MoneyField
            label="Monthly obligations"
            id="expenses"
            value={expenses}
            onChange={setExpenses}
            hint="Debt repayments and living expenses."
          />
          <MoneyField label="Deposit available" id="deposit" value={deposit} onChange={setDeposit} />
          <MoneyField label="Interest rate" id="rate" prefix="%" value={rate} onChange={setRate} />
          <MoneyField label="Loan term" id="years" prefix="yrs" value={years} onChange={setYears} />
        </>
      }
      results={
        <div className="space-y-4">
          <ResultRow label="Affordable instalment" value={rand(a.maxInstalment)} />
          <ResultRow label="Indicative loan amount" value={rand(a.loan)} />
          <ResultRow label="Purchase price guideline" value={rand(a.purchasePrice)} emphasis />
        </div>
      }
      notes={
        <>
          <p>Lenders generally allow a bond instalment of around 30% of gross income, less existing commitments.</p>
          <p>Your credit record, employment history and account conduct all affect the final approval.</p>
          <p>Remember to budget separately for transfer and bond registration costs.</p>
        </>
      }
    />
  );
}
