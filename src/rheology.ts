/**
 * Dough Rheology State Machine
 *
 * Predicts dough elasticity, extensibility, and tackiness index (1-5 stars)
 * based on true total hydration, flour protein/pentosan composition, and fat/oil additions.
 */

export interface RheologyInput {
  trueTotalHydration: number; // e.g. 75.0
  wholeWheatPercentage?: number; // 0-100
  ryePercentage?: number; // 0-100
  oilPercentage?: number; // 0-100
  proteinContent?: number; // 10-15%, default 12.5%
}

export interface RheologyPrediction {
  elasticity: "Low" | "Medium" | "High" | "Ultra-High";
  extensibility: "Low" | "Medium" | "High";
  tackinessIndex: number; // 1 to 5
  handlingAdvice: string;
  recommendedFolds: number;
}

export function predictDoughRheology(input: RheologyInput): RheologyPrediction {
  const {
    trueTotalHydration,
    wholeWheatPercentage = 0,
    ryePercentage = 0,
    oilPercentage = 0,
    proteinContent = 12.5,
  } = input;

  // 100% Rye case (Pentosans dominate, no traditional gluten)
  if (ryePercentage >= 80) {
    return {
      elasticity: "Low",
      extensibility: "Low",
      tackinessIndex: 5,
      handlingAdvice:
        "Paste-like rheology dominated by pentosans. Zero traditional gluten matrix. Shape with wet hands directly into a pullman loaf pan; do not stretch and fold.",
      recommendedFolds: 0,
    };
  }

  // Low hydration (e.g. Bagels 50-60%)
  if (trueTotalHydration <= 60) {
    return {
      elasticity: "Ultra-High",
      extensibility: "Low",
      tackinessIndex: 1,
      handlingAdvice:
        "Extremely stiff, rubbery dough with high tensile resistance. Requires vigorous mechanical or manual kneading. Excellent shape retention.",
      recommendedFolds: 1,
    };
  }

  // Medium hydration (61-70%, e.g. Neapolitan Pizza)
  if (trueTotalHydration <= 70) {
    return {
      elasticity: "High",
      extensibility: "Medium",
      tackinessIndex: 2,
      handlingAdvice:
        "Supple, highly manageable dough. Minimal bench flour needed. Rapid gluten development with standard slap-and-fold.",
      recommendedFolds: 2,
    };
  }

  // High hydration (71-78%, e.g. Tartine Country Loaf)
  if (trueTotalHydration <= 78) {
    const isWholeGrainHeavy = wholeWheatPercentage + ryePercentage > 30;
    return {
      elasticity: isWholeGrainHeavy ? "Medium" : "High",
      extensibility: "High",
      tackinessIndex: isWholeGrainHeavy ? 3 : 3,
      handlingAdvice:
        "Wet, extensible artisan dough. Handle with wet hands or bench knife. Requires 3-4 rounds of stretch-and-folds and coil folds to build vertical tension.",
      recommendedFolds: 4,
    };
  }

  // Very high hydration (> 78%, e.g. Focaccia, Pan de Cristal)
  return {
    elasticity: "Medium",
    extensibility: "High",
    tackinessIndex: 4,
    handlingAdvice:
      "Semi-liquid, highly extensible batter-like dough. Best poured directly into an oiled sheet pan for focaccia or handled exclusively with gentle coil folds and wet hands.",
    recommendedFolds: 5,
  };
}
