// Botswana Pula price formatting.
// Example: formatPula(1299) => "P 1,299.00"
export function formatPula(amount: number | string | null | undefined): string {
  const n = typeof amount === "string" ? Number(amount) : amount ?? 0;
  if (!Number.isFinite(n)) return "P 0.00";
  return "P " + n.toLocaleString("en-BW", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
