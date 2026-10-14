/**
 * Sourdough Hydration & Flour Absorption Physics
 *
 * Traditional baker's math treats levain as an additive entity and calculates hydration as:
 *   Apparent Hydration = (Water / Flour) * 100
 *
 * However, with 100% hydration starter (1:1 flour:water by weight), the starter injects
 * equal masses of flour and water into the final dough matrix:
 *   True Total Hydration = (Total Water / Total Flour) * 100
 *                       = (Recipe Water + Starter Water) / (Recipe Flour + Starter Flour) * 100
 */

export interface HydrationCalculationInput {
  flourWeight: number; // grams
  apparentHydrationPercent: number; // e.g., 75 for 75%
  starterPercent: number; // e.g., 20 for 20%
  starterHydrationPercent?: number; // default 100%
  saltPercent?: number; // default 2.0%
}

export interface HydrationCalculationResult {
  apparentHydration: number;
  trueTotalHydration: number;
  starterFlourWeight: number;
  starterWaterWeight: number;
  totalFlourWeight: number;
  totalWaterWeight: number;
  recipeWaterWeight: number;
  autolyseWaterWeight: number; // 90% of recipe water
  bassinageWaterWeight: number; // 10% reserved for salt/levain incorporation
  hydrationDiscrepancy: number; // Difference between True Total and Apparent
}

export function calculateTrueTotalHydration(
  input: HydrationCalculationInput
): HydrationCalculationResult {
  const {
    flourWeight,
    apparentHydrationPercent,
    starterPercent,
    starterHydrationPercent = 100,
  } = input;

  const starterWeight = (flourWeight * starterPercent) / 100;
  const starterFlourRatio = 1 / (1 + starterHydrationPercent / 100);
  const starterFlour = starterWeight * starterFlourRatio;
  const starterWater = starterWeight - starterFlour;

  const recipeWater = (flourWeight * apparentHydrationPercent) / 100;
  const totalFlour = flourWeight + starterFlour;
  const totalWater = recipeWater + starterWater;

  const trueTotalHydration = (totalWater / totalFlour) * 100;
  const autolyseWater = Math.round(recipeWater * 0.9);
  const bassinageWater = recipeWater - autolyseWater;

  return {
    apparentHydration: apparentHydrationPercent,
    trueTotalHydration: Number(trueTotalHydration.toFixed(2)),
    starterFlourWeight: Math.round(starterFlour),
    starterWaterWeight: Math.round(starterWater),
    totalFlourWeight: Math.round(totalFlour),
    totalWaterWeight: Math.round(totalWater),
    recipeWaterWeight: Math.round(recipeWater),
    autolyseWaterWeight: autolyseWater,
    bassinageWaterWeight: bassinageWater,
    hydrationDiscrepancy: Number((trueTotalHydration - apparentHydrationPercent).toFixed(2)),
  };
}

export interface FlourBlendItem {
  type: "bread" | "allPurpose" | "wholeWheat" | "rye" | "spelt";
  percentage: number;
}

export const BASELINE_ABSORPTION_LIMITS: Record<FlourBlendItem["type"], number> = {
  allPurpose: 66,
  bread: 72,
  wholeWheat: 80,
  rye: 82,
  spelt: 68,
};

export function calculateWeightedAbsorptionLimit(flours: FlourBlendItem[]): number {
  const totalPercentage = flours.reduce((sum, f) => sum + f.percentage, 0);
  if (totalPercentage === 0) return BASELINE_ABSORPTION_LIMITS.bread;

  const weightedSum = flours.reduce((sum, f) => {
    const limit = BASELINE_ABSORPTION_LIMITS[f.type] || BASELINE_ABSORPTION_LIMITS.bread;
    return sum + (f.percentage / totalPercentage) * limit;
  }, 0);

  return Number(weightedSum.toFixed(1));
}
