import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage, MoneyField, ResultRow } from "@/components/site/CalculatorUI";
import { monthlyInstalment, monthsToRepay, monthsToYearsLabel, rand } from "@/lib/calculators";

const title = "Additional Payment Calculator — Madulo Properties";
const description = "See how paying extra into your bond each month shortens the term and saves interest.";

export const Route = createFileRoute("/preview/calculators/additional-payment")({
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
  const [balance, setBalance] = useState<number | "">(1_200_000);
  const [rate, setRate] = useState<number | "">(11);
  const [years, setYears] = useState<number | "">(20);
  const [extra, setExtra] = useState<number | "">(1_000);

  const n = (v: number | "") => (v === "" ? 0 : v);
  const base = monthlyInstalment(n(balance), n(rate), n(years));
  const withExtra = base + n(extra);
  const baseMonths = n(years) * 12;
  const newMonths = monthsToRepay(n(balance), n(rate), withExtra);

  const baseInterest = base * baseMonths - n(balance);
  const newInterest = newMonths ? withExtra * newMonths - n(balance) : 0;
  const saved = newMonths ? Math.max(0, baseInterest - newInterest) : 0;

  return (
    <CalculatorPage
      title="Additional payment"
      intro="Even a small extra amount each month can take years off a bond. See the difference here."
      inputs={
        <>
          <MoneyField label="Outstanding balance" id="balance" value={balance} onChange={setBalance} />
          <MoneyField label="Interest rate" id="rate" prefix="%" value={rate} onChange={setRate} />
          <MoneyField label="Remaining term" id="years" prefix="yrs" value={years} onChange={setYears} />
          <MoneyField label="Extra monthly payment" id="extra" value={extra} onChange={setExtra} />
        </>
      }
      results={
        <div className="space-y-4">
          <ResultRow label="Current instalment" value={rand(base)} />
          <ResultRow label="New instalment" value={rand(withExtra)} />
          <ResultRow
            label="New payoff period"
            value={newMonths ? monthsToYearsLabel(newMonths) : "—"}
          />
          <ResultRow
            label="Time saved"
            value={newMonths ? monthsToYearsLabel(Math.max(0, baseMonths - newMonths)) : "—"}
          />
          <ResultRow label="Interest saved" value={rand(saved)} emphasis />
        </div>
      }
      notes={
        <>
          <p>Extra payments reduce the capital balance, so interest is charged on a smaller amount each month.</p>
          <p>Confirm with your bank that additional payments are applied to capital, not held in advance.</p>
          <p>Figures assume the interest rate stays unchanged for the remaining term.</p>
        </>
      }
    />
  );
}
