/**
 * South African property finance helpers.
 * All results are guideline estimates only — attorney fees, deeds office
 * tariffs and bank pricing vary. No bank or attorney quote is implied.
 */

export const randFormatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

export const rand = (n: number) => randFormatter.format(Math.max(0, Math.round(n)));

/** SARS transfer duty table (natural persons, current tax year). */
const DUTY_BANDS = [
  { upTo: 1_210_000, base: 0, rate: 0, from: 0 },
  { upTo: 1_663_800, base: 0, rate: 0.03, from: 1_210_000 },
  { upTo: 2_329_300, base: 13_614, rate: 0.06, from: 1_663_800 },
  { upTo: 2_994_800, base: 53_544, rate: 0.08, from: 2_329_300 },
  { upTo: 13_310_000, base: 106_784, rate: 0.11, from: 2_994_800 },
  { upTo: Infinity, base: 1_241_456, rate: 0.13, from: 13_310_000 },
];

export function transferDuty(price: number): number {
  if (price <= 0) return 0;
  const band = DUTY_BANDS.find((b) => price <= b.upTo)!;
  return band.base + (price - band.from) * band.rate;
}

/** Guideline conveyancing fee (excl. VAT) used for both transfer and bond registration. */
function conveyancingFee(amount: number): number {
  if (amount <= 0) return 0;
  if (amount <= 500_000) return 8_000;
  return 8_000 + ((amount - 500_000) / 100_000) * 1_200;
}

const VAT = 0.15;

export interface BondTransferCosts {
  transferDuty: number;
  transferAttorney: number;
  transferDeedsOffice: number;
  bondAttorney: number;
  bondDeedsOffice: number;
  transferTotal: number;
  bondTotal: number;
  total: number;
}

export function bondAndTransferCosts(price: number, bondAmount: number): BondTransferCosts {
  const duty = transferDuty(price);
  const transferAttorney = conveyancingFee(price) * (1 + VAT);
  const transferDeedsOffice = deedsOfficeFee(price);
  const bondAttorney = bondAmount > 0 ? conveyancingFee(bondAmount) * (1 + VAT) : 0;
  const bondDeedsOffice = bondAmount > 0 ? deedsOfficeFee(bondAmount) : 0;
  const transferTotal = duty + transferAttorney + transferDeedsOffice;
  const bondTotal = bondAttorney + bondDeedsOffice;
  return {
    transferDuty: duty,
    transferAttorney,
    transferDeedsOffice,
    bondAttorney,
    bondDeedsOffice,
    transferTotal,
    bondTotal,
    total: transferTotal + bondTotal,
  };
}

function deedsOfficeFee(amount: number): number {
  if (amount <= 0) return 0;
  if (amount <= 200_000) return 570;
  if (amount <= 500_000) return 1_006;
  if (amount <= 1_000_000) return 1_453;
  if (amount <= 2_000_000) return 1_902;
  if (amount <= 5_000_000) return 2_784;
  return 4_437;
}

/** Standard amortised monthly instalment. */
export function monthlyInstalment(principal: number, annualRatePct: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const i = annualRatePct / 100 / 12;
  const n = years * 12;
  if (i === 0) return principal / n;
  return (principal * i) / (1 - Math.pow(1 + i, -n));
}

/** Months needed to repay a balance at a given monthly payment. */
export function monthsToRepay(balance: number, annualRatePct: number, payment: number): number | null {
  const i = annualRatePct / 100 / 12;
  if (balance <= 0 || payment <= 0) return null;
  if (i === 0) return Math.ceil(balance / payment);
  if (payment <= balance * i) return null; // never repaid
  return Math.ceil(-Math.log(1 - (balance * i) / payment) / Math.log(1 + i));
}

/** Simple affordability guideline: instalment capped at 30% of gross income, less obligations. */
export function affordability(
  grossMonthly: number,
  expenses: number,
  annualRatePct: number,
  years: number,
  deposit: number,
) {
  const maxInstalment = Math.max(0, grossMonthly * 0.3 - expenses);
  const i = annualRatePct / 100 / 12;
  const n = years * 12;
  const loan = i === 0 ? maxInstalment * n : (maxInstalment * (1 - Math.pow(1 + i, -n))) / i;
  return { maxInstalment, loan, purchasePrice: loan + Math.max(0, deposit) };
}

export function monthsToYearsLabel(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y ? `${y} yr${y === 1 ? "" : "s"}` : null, m ? `${m} mth${m === 1 ? "" : "s"}` : null]
    .filter(Boolean)
    .join(" ") || "0 mths";
}
