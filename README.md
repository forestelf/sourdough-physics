# sourdough-physics 🍞🔬

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Live Calculator](https://img.shields.io/badge/Live%20App-sourdoughcalc.app-amber.svg)](https://sourdoughcalc.app)

High-precision computational dough rheology, True Total Hydration correction, and latent heat ice thermodynamics for artisan sourdough bakers.

> **Interactive Web App**: Try the live implementation at [https://sourdoughcalc.app](https://sourdoughcalc.app) — zero ads, zero tracking scripts, pure client-side physics.

---

## 🎯 Why Conventional Baker's Math Fails

Most existing sourdough tools and legacy spreadsheets rely on approximations developed in industrial bakeries using commercial compressed yeast. When applied to long-fermented artisan sourdough, these approximations introduce substantial physical and thermal errors:

### 1. The Starter Hydration Discrepancy (+2% to +4% Drift)
Traditional calculators compute hydration solely as:
$$\text{Apparent Hydration} = \frac{\text{Recipe Water}}{\text{Recipe Flour}} \times 100$$

However, a standard sourdough starter (100% hydration) is equal parts flour and water. When inoculated at 20%, it injects **10% flour and 10% water** into the system. The true thermodynamic hydration of the gluten network is:
$$\text{True Total Hydration} = \frac{\text{Recipe Water} + \text{Starter Water}}{\text{Recipe Flour} + \text{Starter Flour}} \times 100$$

A formula nominally marked as "75% hydration" actually behaves as **77.3% to 78.1% True Total Hydration**, routinely pushing standard flour beyond its absorption ceiling and turning dough into an unmanageable pancake.

### 2. The Summer DDT & "Negative Water Temperature" Trap
In hot summer ambient temperatures ($82^\circ\text{F} / 28^\circ\text{C}$) or when using high-friction planetary/stand mixers ($\Delta T = 18^\circ\text{F}$), the standard Desired Dough Temperature (DDT) formula frequently requests liquid water temperatures below freezing:
$$T_{\text{water}} = (4 \times \text{DDT}) - (T_{\text{room}} + T_{\text{flour}} + T_{\text{starter}} + F) < 32^\circ\text{F} \; (0^\circ\text{C})$$

`sourdough-physics` solves this using the **latent heat of fusion of water ice** ($L_f = 80 \text{ cal/g} \approx 144 \text{ BTU/lb}$), calculating the exact mass of crushed ice to substitute for liquid water.

### 3. The Conical Bowl Frustum Rise Trap
Home bakers often measure dough volume in conical bowls where top radius $r_2 >$ bottom radius $r_1$. In a conical frustum, volume scales cubically with height:
$$V(h) = \frac{1}{3}\pi h \left(3r_1^2 + 3r_1 k h + k^2 h^2\right), \quad k = \frac{r_2 - r_1}{H}$$

A baker who waits for dough to "double in height" in a standard 9-inch bowl actually allows a **+147% volume expansion**, destroying crumb structure. `sourdough-physics` applies the **Newton-Raphson method** to solve for true height targets with an analytic bypass for straight-sided cylindrical jars.

---

## 📦 Installation

```bash
npm install sourdough-physics
# or
pnpm add sourdough-physics
# or
yarn add sourdough-physics
```

---

## 🚀 Quick Start

### 1. True Total Hydration & Absorption
```typescript
import { calculateTrueTotalHydration, calculateWeightedAbsorptionLimit } from 'sourdough-physics';

// 500g flour, 75% recipe hydration, 20% starter
const hydration = calculateTrueTotalHydration({
  flourWeight: 500,
  apparentHydrationPercent: 75,
  starterPercent: 20,
  starterHydrationPercent: 100,
});

console.log(hydration.trueTotalHydration); // 77.27%
console.log(hydration.hydrationDiscrepancy); // +2.27% extra moisture!

// Weighted absorption limit for a 80% Bread / 15% Whole Wheat / 5% Rye blend
const limit = calculateWeightedAbsorptionLimit([
  { type: 'bread', percentage: 80 },
  { type: 'wholeWheat', percentage: 15 },
  { type: 'rye', percentage: 5 },
]);

console.log(limit); // 73.7% maximum recommended hydration
```

### 2. DDT with Latent Heat Ice Substitution
```typescript
import { calculateDDTWithIce } from 'sourdough-physics';

const ddt = calculateDDTWithIce({
  targetDDT: 72,        // Target dough temp: 72°F
  roomTemp: 84,         // Hot kitchen: 84°F
  flourTemp: 80,        // Warm flour: 80°F
  starterTemp: 78,      // Starter: 78°F
  frictionFactor: 18,   // Stand mixer friction: 18°F
  unit: 'F',
  recipeWaterWeight: 350,
});

console.log(ddt.requiresIce);         // true
console.log(ddt.crushedIceWeight);    // 83g crushed ice
console.log(ddt.liquidWaterWeight);   // 267g tap water
```

### 3. Conical Bowl Volume & Rise Solver
```typescript
import { solveTargetDoughHeight } from 'sourdough-physics';

// Standard 9-inch conical mixing bowl (r1 = 8cm, r2 = 12cm, height = 12cm)
const bowl = { bottomRadiusCm: 8, topRadiusCm: 12, heightCm: 12 };

// Initial dough height is 4.0cm, target rise is +100% (volume multiplier 2.0)
const solver = solveTargetDoughHeight(4.0, 2.0, bowl);

console.log(solver.targetHeightCm); // 6.32 cm (NOT 8.0 cm!)
// Waiting until 8.0cm would cause a catastrophic +147% over-fermentation.
```

### 4. Dough Rheology State Machine
```typescript
import { predictDoughRheology } from 'sourdough-physics';

const prediction = predictDoughRheology({
  trueTotalHydration: 65, // Neapolitan pizza dough
});

console.log(prediction.elasticity);        // "High"
console.log(prediction.tackinessIndex);    // 2 (out of 5 stars)
console.log(prediction.recommendedFolds);  // 2
```

---

## 🧪 Testing

```bash
npm test
```
All unit tests are executed using [Vitest](https://vitest.dev/).

---

## 🤝 Reference & Citations

If you use `sourdough-physics` in your research, baking logs, or application, please cite:

```bibtex
@software{sourdough_physics2026,
  author = {Vance, Julian},
  title = {SourdoughPhysics: Open Computational Dough Rheology and Thermodynamics},
  url = {https://sourdoughcalc.app},
  year = {2026}
}
```

## 📄 License
MIT License © 2026 Julian Vance & [SourdoughCalc.app](https://sourdoughcalc.app)
