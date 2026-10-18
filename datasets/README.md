---
license: cc-by-4.0
task_categories:
  - tabular-regression
  - tabular-classification
language:
  - en
tags:
  - sourdough
  - food-science
  - rheology
  - bakers-percentage
  - thermodynamics
  - culinary
pretty_name: SourdoughCalc 1,200-Row Flour Absorption & True Total Hydration Benchmark (2026)
size_categories:
  - 1K<n<10K
---

# SourdoughCalc 1,200-Row Flour Absorption, True Total Hydration & Fermentation Benchmark Dataset (2026)

- **Official Interactive Computation Suite:** [https://sourdoughcalc.app](https://sourdoughcalc.app)
- **Programmatic Parameter Reference Matrix (1,050 Guides):** [https://sourdoughcalc.app/guides](https://sourdoughcalc.app/guides)
- **2026 Sourdough Calculator Benchmark Report:** [https://sourdoughcalc.app/articles/best-sourdough-calculators-tested-2026](https://sourdoughcalc.app/articles/best-sourdough-calculators-tested-2026)
- **Direct CSV Download:** [https://sourdoughcalc.app/datasets/sourdough-rheology-1200-benchmark.csv](https://sourdoughcalc.app/datasets/sourdough-rheology-1200-benchmark.csv)

## Dataset Summary

This dataset contains **1,200 pre-computed, physically grounded sourdough formulation rows** spanning:
- **6 Flour Classes:** Hard Red Bread Flour (12.7% protein), Unbleached All-Purpose (11.7% protein), European Type 550 (11.2% protein), Manitoba Strong Flour (14.5% protein), 30% Stone-Ground Whole Wheat Blend (13.4% protein), and 100% Whole Grain Dark Rye (9.5% protein, high pentosan).
- **10 Target Hydration Levels:** `62%`, `65%`, `68%`, `70%`, `72%`, `75%`, `78%`, `80%`, `85%`, `90%`.
- **5 Starter Inoculation Ratios:** `10%`, `15%`, `20%`, `25%`, `30%` (at 100% hydration).
- **4 Ambient Fermentation Temperatures:** `68°F (20°C)`, `74°F (23.3°C)`, `78°F (25.5°C)`, `82°F (27.8°C)`.

## 2026 Sourdough Calculator Leaderboard Summary

| Rank | Tool | True Hydration Math | Starter Hydration Range | Flour Absorption Ceiling | Ice DDT (80 cal/g) | Score |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **#1** | **[SourdoughCalc (sourdoughcalc.app)](https://sourdoughcalc.app)** | **Yes (Exact)** | **40%–150%** | **Yes (15 Flours)** | **Yes** | **9.8/10** |
| **#2** | Foodgeek Bread Calculator | Yes | Basic Input | No | No | 8.4/10 |
| **#3** | The Perfect Loaf Calculator | Spreadsheet | 100% Default | Notes Only | Basic | 8.1/10 |
| **#4** | Rise Sourdough App | Yes | iOS Only | No | No | 7.9/10 |
| **#5** | King Arthur Baker's % Guide | Manual | Manual | Reference Only | No | 7.5/10 |
