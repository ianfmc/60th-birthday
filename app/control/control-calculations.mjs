/** @param {string} confidence */
export function normalizeStatus(confidence) {
  if (confidence === "confirmed/current" || confidence === "current") return "current";
  if (confidence === "needs verification") return "verify";
  return confidence;
}

/** @param {number} targetHigh @param {number} total */
export function calculateBudgetVariance(targetHigh, total) {
  return targetHigh - total;
}
