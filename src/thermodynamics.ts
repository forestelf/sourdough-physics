/**
 * Sourdough Thermodynamics & Desired Dough Temperature (DDT)
 *
 * In warm ambient conditions, conventional 3-variable or 4-variable DDT formulas
 * frequently demand liquid water temperatures near or below freezing (<= 32°F / 0°C).
 *
 * This module applies the latent heat of fusion of water ice (80 cal/g, or 144 BTU/lb)
 * to calculate the exact mass of crushed ice needed to absorb excess ambient and mechanical heat.
 *
 * Heat Balance:
 *   Energy absorbed by melting ice at 0°C to water at DDT:
 *     Q_ice = m_ice * (L_f + c * (T_DDT - 0))
 *   Energy extracted from water/flour/starter mix to reach T_DDT:
 *     Q_excess = m_water * c * (T_target_effective - T_DDT)
 */

export interface DDTCalculationInput {
  targetDDT: number; // e.g. 78°F or 25.5°C
  roomTemp: number; // e.g. 82°F or 27.7°C
  flourTemp: number; // e.g. 80°F or 26.6°C
  starterTemp: number; // e.g. 76°F or 24.4°C
  frictionFactor: number; // e.g. 2°F (hand mix) to 20°F (stand mixer)
  unit: "F" | "C";
  recipeWaterWeight: number; // grams of water to be mixed
}

export interface DDTCalculationResult {
  unit: "F" | "C";
  targetDDT: number;
  calculatedWaterTemp: number;
  requiresIce: boolean;
  liquidWaterWeight: number; // grams
  crushedIceWeight: number; // grams
  recommendedTapWaterTemp?: number;
  warning?: string;
}

export function calculateDDTWithIce(input: DDTCalculationInput): DDTCalculationResult {
  const {
    targetDDT,
    roomTemp,
    flourTemp,
    starterTemp,
    frictionFactor,
    unit,
    recipeWaterWeight,
  } = input;

  // 4-variable equation: Water Temp = (DDT * 4) - (Room + Flour + Starter + Friction)
  const calculatedWaterTemp = targetDDT * 4 - (roomTemp + flourTemp + starterTemp + frictionFactor);
  const freezingThreshold = unit === "F" ? 36 : 2.2; // Practical liquid chilling limit

  if (calculatedWaterTemp >= freezingThreshold) {
    return {
      unit,
      targetDDT,
      calculatedWaterTemp: Number(calculatedWaterTemp.toFixed(1)),
      requiresIce: false,
      liquidWaterWeight: recipeWaterWeight,
      crushedIceWeight: 0,
      recommendedTapWaterTemp: Number(calculatedWaterTemp.toFixed(1)),
    };
  }

  // Ice replacement calculation using Latent Heat of Fusion
  // L_f = 80 cal/g (in Celsius) or 144 BTU/lb (in Fahrenheit)
  let iceFraction: number;

  if (unit === "C") {
    // Energy to warm 1g of 0°C ice to targetDDT: 80 cal + (targetDDT * 1 cal/g°C)
    const energyPerGramIce = 80 + targetDDT;
    // Energy required to cool water from standard tap (e.g. 18°C) to required virtual temp:
    const tapTemp = 18;
    const coolingDeficit = tapTemp - calculatedWaterTemp;
    iceFraction = Math.min(1.0, Math.max(0.05, coolingDeficit / energyPerGramIce));
  } else {
    // In Fahrenheit:
    // Heat of fusion is 144 BTU/lb. Warming from 32°F to targetDDT requires (targetDDT - 32) BTU/lb.
    const energyPerLbIce = 144 + (targetDDT - 32);
    const tapTemp = 65;
    const coolingDeficit = tapTemp - calculatedWaterTemp;
    iceFraction = Math.min(1.0, Math.max(0.05, coolingDeficit / energyPerLbIce));
  }

  const crushedIceWeight = Math.round(recipeWaterWeight * iceFraction);
  const liquidWaterWeight = recipeWaterWeight - crushedIceWeight;

  return {
    unit,
    targetDDT,
    calculatedWaterTemp: Number(calculatedWaterTemp.toFixed(1)),
    requiresIce: true,
    liquidWaterWeight,
    crushedIceWeight,
    warning:
      unit === "F"
        ? `Theoretical water temperature is ${calculatedWaterTemp.toFixed(1)}°F (< 36°F limit). Substituted ${crushedIceWeight}g with crushed ice.`
        : `Theoretical water temperature is ${calculatedWaterTemp.toFixed(1)}°C (< 2.2°C limit). Substituted ${crushedIceWeight}g with crushed ice.`,
  };
}
