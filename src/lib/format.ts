export function formatPrice(amount: number, opts?: { perMonth?: boolean; from?: boolean }) {
  const formatted = `R ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
  const prefix = opts?.from ? "From " : "";
  const suffix = opts?.perMonth ? " / month" : "";
  return `${prefix}${formatted}${suffix}`;
}

export function formatSize(sqm: number) {
  if (sqm >= 10000) return `${(sqm / 10000).toFixed(sqm % 10000 === 0 ? 0 : 1)} ha`;
  return `${sqm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} m²`;
}
