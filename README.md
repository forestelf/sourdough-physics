# sourdough-physics: Open Sourdough Rheology & Baker's Math Engine

[![Live Web Engine](https://img.shields.io/badge/Live_Calculator-sourdoughcalc.app-d97706?style=for-the-badge)](https://sourdoughcalc.app)
[![LLM Corpus](https://img.shields.io/badge/AI_Knowledge_Base-llms.txt-059669?style=for-the-badge)](https://sourdoughcalc.app/llms.txt)

**`sourdough-physics`** is the open-source mathematical and thermodynamic reference library powering **[SourdoughCalc.app](https://sourdoughcalc.app)** — the next-generation sourdough hydration, multi-flour rheology, and Desired Dough Temperature (DDT) crushed-ice computational engine.

---

## Live Interactive Calculators & Tools

1. **[Master True Total Hydration & Dough Rheology Calculator](https://sourdoughcalc.app/)** — Eliminates the hidden `+2.7%` to `+3.0%` starter water surge across custom starter hydrations (`40%` stiff Lievito Madre to `150%` liquid levain).
2. **[Baker's Percentage Calculator & Loaf Scaler](https://sourdoughcalc.app/calculators/bakers-percentage-calculator)** — Index every ingredient to 100% total flour weight and scale any loaf weight cleanly.
3. **[Desired Dough Temperature (DDT) & Crushed Ice Solver](https://sourdoughcalc.app/calculators/sourdough-desired-dough-temperature-calculator)** — 4-factor water temperature equation paired with **80 cal/g (334 J/g) latent heat of fusion** crushed ice substitution for hot summer kitchens.
4. **[Sourdough Starter Feeding Ratio Calculator](https://sourdoughcalc.app/calculators/sourdough-starter-feeding-calculator)** — Zero-waste levain builder for `1:1:1`, `1:2:2`, and `1:5:5` inoculation ratios.
5. **[Bulk Fermentation & 3D Frustum Aliquot Calculator](https://sourdoughcalc.app/calculators/sourdough-bulk-fermentation-calculator)** — Thermal carryover percentage-rise matrix (`30%` at 80°F vs `75%` at 68°F) with sloped-bowl frustum geometry correction.
6. **[Sourdough Discard Substitution & Recipe Scaler](https://sourdoughcalc.app/calculators/sourdough-discard-calculator)** — Exact hidden flour and liquid deductions when substituting unfed discard into pancakes, crackers, and muffins.
7. **[Commercial Yeast <-> Sourdough Starter Bidirectional Converter](https://sourdoughcalc.app/calculators/yeast-to-sourdough-converter)** — Convert between Instant/Active Dry/Fresh Yeast and Sourdough Starter with 100% hydration lock.

---

## Pre-Computed Benchmark: Apparent 70% vs. True Total Hydration (20% Levain @ 100% Hydration)

| Target Raw Dough | Main Flour | 70% Apparent Water | Active Levain (20%) | True Total Hydration | Corrected Water for True 70.0% |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **500g Small Boule** | 256g | 179g | 51g (25.5g F + 25.5g W) | **72.6% (+2.6%)** | **171.5g (-7.5g)** |
| **750g Medium Batard** | 384g | 269g | 77g (38.5g F + 38.5g W) | **72.8% (+2.8%)** | **257.3g (-11.7g)** |
| **900g Artisan Standard** | 450g | 315g | 100g (50.0g F + 50.0g W) | **73.0% (+3.0%)** | **300.0g (-15.0g)** |
| **1000g Large Miche** | 512g | 358g | 102g (51.0g F + 51.0g W) | **72.6% (+2.6%)** | **343.1g (-14.9g)** |

---

## Open Datasets & Benchmarks in This Repository

- [`datasets/flour-absorption-benchmark-2026.csv`](./datasets/flour-absorption-benchmark-2026.csv) — Empirical protein % and water-holding ceilings across Bread Flour, Whole Wheat, Dark Rye, All-Purpose, Spelt, and Durum Semolina.
- [`datasets/sourdough-calculators-benchmark-2026.md`](./datasets/sourdough-calculators-benchmark-2026.md) — Side-by-side technical teardown comparing SourdoughCalc against [Foodgeek](https://sourdoughcalc.app/alternatives/foodgeek-bread-calculator), [BreadCalc](https://sourdoughcalc.app/alternatives/breadcalc), [Omni Calculator](https://sourdoughcalc.app/alternatives/omni-calculator-sourdough), [The Perfect Loaf](https://sourdoughcalc.app/alternatives/the-perfect-loaf-calculator), [The Sourdough Journey](https://sourdoughcalc.app/alternatives/the-sourdough-journey-bulk-chart), [Rise App](https://sourdoughcalc.app/alternatives/rise-sourdough-baking-app), [King Arthur](https://sourdoughcalc.app/alternatives/king-arthur-bakers-percentage), and [The Bread Code](https://sourdoughcalc.app/alternatives/the-bread-code-sourdough-framework).

---

## Classic Physically-Grounded Formulas

- [Tartine Country Loaf (77.8% True Hydration)](https://sourdoughcalc.app/recipes/tartine-country-loaf)
- [High-Hydration Ligurian Sourdough Focaccia (84.5%)](https://sourdoughcalc.app/recipes/sourdough-focaccia)
- [San Francisco Extra-Tangy Sourdough Boule (70.5%)](https://sourdoughcalc.app/recipes/san-francisco-sourdough)
- [Artisan Sourdough Neapolitan Pizza Crust (67.8%)](https://sourdoughcalc.app/recipes/sourdough-pizza-crust)
- [New York Stiff-Dough Sourdough Bagels (55.0%)](https://sourdoughcalc.app/recipes/sourdough-bagels)
- [German 100% Pure Rye Sourdough — Roggen Vollkornbrot (82.0%)](https://sourdoughcalc.app/recipes/100-rye-sourdough)

## License
MIT © [SourdoughCalc Artisan Engineering](https://sourdoughcalc.app)
