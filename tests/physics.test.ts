import { describe, it, expect } from "vitest";
import {
  calculateTrueTotalHydration,
  calculateWeightedAbsorptionLimit,
  calculateDDTWithIce,
  solveTargetDoughHeight,
  predictDoughRheology,
} from "../src/index.js";

describe("SourdoughPhysics Engine Test Suite", () => {
  describe("Hydration & Flour Physics", () => {
    it("corrects for starter water content in 100% hydration levain", () => {
      // 500g flour, 75% apparent hydration, 20% starter
      const res = calculateTrueTotalHydration({
        flourWeight: 500,
        apparentHydrationPercent: 75,
        starterPercent: 20,
        starterHydrationPercent: 100,
      });

      // Starter contributes 50g flour + 50g water
      // Total flour = 550g, Total water = 375g + 50g = 425g
      // True Total Hydration = 425 / 550 = 77.27%
      expect(res.trueTotalHydration).toBeCloseTo(77.27, 1);
      expect(res.hydrationDiscrepancy).toBeCloseTo(2.27, 1);
    });

    it("calculates weighted absorption limits for multi-flour blends", () => {
      const blend = [
        { type: "bread" as const, percentage: 80 },
        { type: "wholeWheat" as const, percentage: 15 },
        { type: "rye" as const, percentage: 5 },
      ];
      const limit = calculateWeightedAbsorptionLimit(blend);
      expect(limit).toBeGreaterThan(72);
      expect(limit).toBeLessThan(75);
    });
  });

  describe("Thermodynamics & DDT Ice Substitution", () => {
    it("preserves liquid water when temperatures are moderate", () => {
      const res = calculateDDTWithIce({
        targetDDT: 78,
        roomTemp: 70,
        flourTemp: 68,
        starterTemp: 70,
        frictionFactor: 5,
        unit: "F",
        recipeWaterWeight: 350,
      });

      expect(res.requiresIce).toBe(false);
      expect(res.crushedIceWeight).toBe(0);
      expect(res.calculatedWaterTemp).toBeGreaterThan(36);
    });

    it("calculates crushed ice substitution in hot summer room temp", () => {
      const res = calculateDDTWithIce({
        targetDDT: 72,
        roomTemp: 84,
        flourTemp: 80,
        starterTemp: 80,
        frictionFactor: 18,
        unit: "F",
        recipeWaterWeight: 350,
      });

      expect(res.requiresIce).toBe(true);
      expect(res.crushedIceWeight).toBeGreaterThan(0);
      expect(res.liquidWaterWeight + res.crushedIceWeight).toBe(350);
    });
  });

  describe("Frustum Geometry & Rise Solver", () => {
    it("solves target height linearly for straight-sided cylindrical jars", () => {
      const jar = { bottomRadiusCm: 4, topRadiusCm: 4, heightCm: 15 };
      const res = solveTargetDoughHeight(5.0, 2.0, jar); // +100% rise (double)
      expect(res.isStraightSided).toBe(true);
      expect(res.targetHeightCm).toBe(10.0);
    });

    it("solves non-linear height for conical bowls", () => {
      const bowl = { bottomRadiusCm: 8, topRadiusCm: 12, heightCm: 12 };
      const res = solveTargetDoughHeight(4.0, 2.0, bowl);
      // In a conical bowl, doubling volume requires significantly less than doubling height
      expect(res.targetHeightCm).toBeLessThan(8.0);
      expect(res.targetHeightCm).toBeGreaterThan(5.5);
    });
  });

  describe("Rheology State Machine", () => {
    it("classifies stiff bagel dough as ultra-high elasticity and 1-star tackiness", () => {
      const res = predictDoughRheology({ trueTotalHydration: 55 });
      expect(res.elasticity).toBe("Ultra-High");
      expect(res.tackinessIndex).toBe(1);
    });

    it("classifies 100% rye as paste-like and 5-star tackiness", () => {
      const res = predictDoughRheology({ trueTotalHydration: 82, ryePercentage: 100 });
      expect(res.tackinessIndex).toBe(5);
      expect(res.recommendedFolds).toBe(0);
    });
  });
});
