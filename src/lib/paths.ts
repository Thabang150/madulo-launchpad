/**
 * Route literals for the real website while it lives under /preview.
 * At launch, drop the prefix here and move src/routes/preview/* up a level.
 */
export const P = {
  home: "/preview",
  properties: "/preview/properties",
  developments: "/preview/developments",
  estates: "/preview/estates",
  about: "/preview/about",
  team: "/preview/team",
  community: "/preview/community",
  contact: "/preview/contact",
  calculators: "/preview/calculators",
  calcBondTransfer: "/preview/calculators/bond-transfer-costs",
  calcAdditionalPayment: "/preview/calculators/additional-payment",
  calcAffordability: "/preview/calculators/affordability",
  calcHomeLoanRepayment: "/preview/calculators/home-loan-repayment",
} as const;
