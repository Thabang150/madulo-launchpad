import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage, MoneyField, ResultRow } from "@/components/site/CalculatorUI";
import { bondAndTransferCosts, rand } from "@/lib/calculators";

const title = "Bond & Transfer Costs Calculator — Madulo Properties";
const description =
  "Estimate transfer duty, conveyancing fees and deeds office costs on a South African property purchase.";

export const Route = createFileRoute("/preview/calculators/bond-transfer-costs")({
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
  const [bond, setBond] = useState<number | "">(1_350_000);

  const p = price === "" ? 0 : price;
  const b = bond === "" ? 0 : bond;
  const c = bondAndTransferCosts(p, b);

  return (
    <CalculatorPage
      title="Bond & transfer costs"
      intro="Estimate the once-off costs payable on registration, over and above the purchase price."
      inputs={
        <>
          <MoneyField label="Purchase price" id="price" value={price} onChange={setPrice} />
          <MoneyField
            label="Bond amount"
            id="bond"
            value={bond}
            onChange={setBond}
            hint="Leave at 0 for a cash purchase."
          />
        </>
      }
      results={
        <div className="space-y-4">
          <ResultRow label="Transfer duty" value={rand(c.transferDuty)} />
          <ResultRow label="Transfer attorney (incl. VAT)" value={rand(c.transferAttorney)} />
          <ResultRow label="Deeds office (transfer)" value={rand(c.transferDeedsOffice)} />
          <ResultRow label="Bond attorney (incl. VAT)" value={rand(c.bondAttorney)} />
          <ResultRow label="Deeds office (bond)" value={rand(c.bondDeedsOffice)} />
          <ResultRow label="Estimated total" value={rand(c.total)} emphasis />
        </div>
      }
      notes={
        <>
          <p>Transfer duty is calculated on the SARS sliding scale for natural persons. No duty is payable below R1 210 000.</p>
          <p>Attorney fees follow published conveyancing guidelines and include VAT at 15%.</p>
          <p>Banks may add initiation and monthly service fees that are not shown here.</p>
        </>
      }
    />
  );
}
