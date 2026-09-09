import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage, MoneyField, ResultRow } from "@/components/site/CalculatorUI";
import { monthlyInstalment, rand } from "@/lib/calculators";

const title = "Home Loan Repayment Calculator — Madulo Properties";
const description = "Estimate the monthly instalment and total interest on a South African home loan.";

export const Route = createFileRoute("/preview/calculators/home-loan-repayment")({
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
  const [price, setPrice] = useState<number | "">(1_500_000);
  const [deposit, setDeposit] = useState<number | "">(150_000);
  const [rate, setRate] = useState<number | "">(11);
  const [years, setYears] = useState<number | "">(20);

  const loan = Math.max(0, (price === "" ? 0 : price) - (deposit === "" ? 0 : deposit));
  const r = rate === "" ? 0 : rate;
  const y = years === "" ? 0 : years;
  const instalment = monthlyInstalment(loan, r, y);
  const totalRepaid = instalment * y * 12;

  return (
    <CalculatorPage
      title="Home loan repayment"
      intro="See what a bond of this size would cost each month, and what it would cost in total."
      inputs={
        <>
          <MoneyField label="Purchase price" id="price" value={price} onChange={setPrice} />
          <MoneyField label="Deposit" id="deposit" value={deposit} onChange={setDeposit} />
          <MoneyField label="Interest rate" id="rate" prefix="%" value={rate} onChange={setRate} hint="Annual, linked to prime." />
          <MoneyField label="Loan term" id="years" prefix="yrs" value={years} onChange={setYears} hint="Usually 20 years." />
        </>
      }
      results={
        <div className="space-y-4">
          <ResultRow label="Loan amount" value={rand(loan)} />
          <ResultRow label="Total interest" value={rand(Math.max(0, totalRepaid - loan))} />
          <ResultRow label="Total repaid" value={rand(totalRepaid)} />
          <ResultRow label="Monthly instalment" value={rand(instalment)} emphasis />
        </div>
      }
      notes={
        <>
          <p>The instalment assumes a fixed rate for the full term. In practice a linked rate moves with prime.</p>
          <p>Bank initiation and monthly administration fees are excluded.</p>
          <p>Life and homeowner's cover are usually required in addition to the instalment.</p>
        </>
      }
    />
  );
}
