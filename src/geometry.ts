/**
 * Frustum Geometry & Bulk Fermentation Rise Solver
 *
 * Home bakers often use conical mixing bowls (inverted truncated cones / frustums) where
 * top diameter > bottom diameter.
 *
 * In a conical container, dough volume does NOT scale linearly with height:
 *   V(h) = (1/3) * pi * h * (3 * r1^2 + 3 * r1 * k * h + k^2 * h^2)
 *   where k = (r2 - r1) / H_bowl
 *
 * A baker expecting "+100% volume" who measures "+100% height" in a 9-inch conical bowl
 * will actually experience a +147% volume expansion, resulting in severely over-proofed, collapsed dough!
 *
 * This module solves for exact target height using the Newton-Raphson method, with an analytic
 * bypass for straight-sided (cylindrical) containers (k = 0).
 */

export interface BowlGeometry {
  bottomRadiusCm: number; // r1
  topRadiusCm: number; // r2
  heightCm: number; // H_bowl
}

export function frustumVolumeAtHeight(h: number, r1: number, k: number): number {
  if (h <= 0) return 0;
  return (Math.PI / 3) * h * (3 * r1 * r1 + 3 * r1 * k * h + k * k * h * h);
}

export function frustumCrossSectionArea(h: number, r1: number, k: number): number {
  const currentRadius = r1 + k * h;
  return Math.PI * currentRadius * currentRadius;
}

export function solveTargetDoughHeight(
  initialHeightCm: number,
  targetVolumeMultiplier: number, // e.g. 1.5 for +50% rise, 2.0 for +100% rise
  bowl: BowlGeometry
): { targetHeightCm: number; actualVolumeMultiplier: number; isStraightSided: boolean } {
  const { bottomRadiusCm: r1, topRadiusCm: r2, heightCm: H } = bowl;
  const k = (r2 - r1) / H;

  // Analytic bypass for straight-sided containers (k = 0)
  if (Math.abs(r2 - r1) < 1e-4) {
    const targetHeight = initialHeightCm * targetVolumeMultiplier;
    return {
      targetHeightCm: Number(targetHeight.toFixed(2)),
      actualVolumeMultiplier: targetVolumeMultiplier,
      isStraightSided: true,
    };
  }

  // Initial volume in conical bowl
  const vInitial = frustumVolumeAtHeight(initialHeightCm, r1, k);
  const vTarget = vInitial * targetVolumeMultiplier;

  // Newton-Raphson iteration
  // f(h) = V(h) - vTarget = 0
  // f'(h) = Area(h) = pi * (r1 + k*h)^2
  let h = initialHeightCm * Math.pow(targetVolumeMultiplier, 1 / 3); // sensible initial guess
  const tolerance = 1e-4;
  const maxIterations = 20;

  for (let i = 0; i < maxIterations; i++) {
    const vCurrent = frustumVolumeAtHeight(h, r1, k);
    const diff = vCurrent - vTarget;

    if (Math.abs(diff) < tolerance) break;

    const area = frustumCrossSectionArea(h, r1, k);
    if (area <= 0) break;

    const nextH = h - diff / area;
    if (nextH <= 0) {
      h = h / 2;
    } else {
      h = nextH;
    }
  }

  const vFinal = frustumVolumeAtHeight(h, r1, k);
  const actualMultiplier = vInitial > 0 ? vFinal / vInitial : targetVolumeMultiplier;

  return {
    targetHeightCm: Number(h.toFixed(2)),
    actualVolumeMultiplier: Number(actualMultiplier.toFixed(2)),
    isStraightSided: false,
  };
}
