// lib/axiom-db.ts

export type AxiomVariable = {
  symbol: string;
  name: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit: string;
};

export type AxiomEntry = {
  id: string;
  title: string;
  category: "Physics" | "Economics" | "Philosophy" | "Computing";
  desc: string;
  formula?: string; // LaTeX representation
  variables?: AxiomVariable[];
  // The calculator function takes an array of values (matching variables order) and returns the result
  calculate?: (vals: number[]) => number; 
  resultUnit?: string;
};

export const AXIOM_LIBRARY: AxiomEntry[] = [
  // --- PHYSICS ---
  {
    id: "newton-2",
    title: "Newton's Second Law",
    category: "Physics",
    desc: "The acceleration of an object is directly related to the net force and inversely related to its mass.",
    formula: "F = m \\cdot a",
    variables: [
      { symbol: "m", name: "Mass", min: 1, max: 100, step: 1, default: 10, unit: "kg" },
      { symbol: "a", name: "Acceleration", min: 0, max: 50, step: 0.5, default: 9.8, unit: "m/s²" },
    ],
    calculate: ([m, a]) => m * a,
    resultUnit: "N (Newtons)"
  },
  {
    id: "ohm",
    title: "Ohm's Law",
    category: "Physics",
    desc: "The current through a conductor is proportional to the voltage across it.",
    formula: "V = I \\cdot R",
    variables: [
      { symbol: "I", name: "Current", min: 0.1, max: 10, step: 0.1, default: 2, unit: "A" },
      { symbol: "R", name: "Resistance", min: 1, max: 1000, step: 10, default: 100, unit: "Ω" },
    ],
    calculate: ([i, r]) => i * r,
    resultUnit: "V (Volts)"
  },

  // --- ECONOMICS ---
  {
    id: "rule-72",
    title: "Rule of 72",
    category: "Economics",
    desc: "A simplified way to estimate the time required to double an investment at a fixed annual rate of return.",
    formula: "T \\approx \\frac{72}{r}",
    variables: [
      { symbol: "r", name: "Interest Rate", min: 1, max: 20, step: 0.5, default: 6, unit: "%" },
    ],
    calculate: ([r]) => 72 / r,
    resultUnit: "Years to Double"
  },

  // --- COMPUTING ---
  {
    id: "moore",
    title: "Moore's Law",
    category: "Computing",
    desc: "The observation that the number of transistors in a dense integrated circuit doubles about every two years.",
    formula: "N_t = N_0 \\cdot 2^{(t/2)}",
    variables: [
      { symbol: "t", name: "Years Passed", min: 0, max: 20, step: 2, default: 10, unit: "yrs" },
    ],
    calculate: ([t]) => Math.pow(2, t/2),
    resultUnit: "x Growth Factor"
  },

  // --- PHILOSOPHY (Logic Rule) ---
  {
    id: "occam",
    title: "Occam's Razor",
    category: "Philosophy",
    desc: "Entities should not be multiplied without necessity. The simplest explanation is usually the correct one.",
    formula: "\\text{Pluralitas non est ponenda sine necessitate}",
    // No calculator for this one, just static wisdom
  }
];