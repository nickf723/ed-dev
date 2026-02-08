export interface Strategy {
  id: string;
  name: string;
  formula: string; // LaTeX representation
  condition: string;
  difficulty: 1 | 2 | 3;
  desc: string;
}

export const STRATEGIES: Strategy[] = [
  {
    id: 'gcf',
    name: 'Greatest Common Factor',
    formula: 'ab + ac = a(b + c)',
    condition: 'Always check this first!',
    difficulty: 1,
    desc: "The universal first step. Extracting the largest value that divides evenly into every term."
  },
  {
    id: 'dops',
    name: 'Difference of Perfect Squares',
    formula: 'a^2 - b^2 = (a-b)(a+b)',
    condition: '2 Terms (Subtraction)',
    difficulty: 1,
    desc: "A binomial where two perfect squares are subtracted. The middle term cancels out, leaving a symmetrical result."
  },
  {
    id: 'trinomial_simple',
    name: 'Simple Trinomials',
    formula: 'x^2 + bx + c',
    condition: '3 Terms (a = 1)',
    difficulty: 2,
    desc: "The classic puzzle. Find two numbers that multiply to 'c' and add up to 'b'."
  },
  {
    id: 'trinomial_complex',
    name: 'Complex Trinomials',
    formula: 'ax^2 + bx + c',
    condition: '3 Terms (a > 1)',
    difficulty: 3,
    desc: "Requires the 'AC Method' or 'Slide and Divide'. Splitting the middle term to factor by grouping."
  },
  {
    id: 'grouping',
    name: 'Factor by Grouping',
    formula: 'ax + ay + bx + by',
    condition: '4 Terms',
    difficulty: 2,
    desc: "Splitting the polynomial in half, factoring the GCF from each side, and finding the common binomial."
  },
  {
    id: 'sum_diff_cubes',
    name: 'Sum/Diff of Cubes',
    formula: 'a^3 \\pm b^3',
    condition: '2 Terms (Cubes)',
    difficulty: 3,
    desc: "A specific pattern for cubic binomials. Remember the mnemonic 'SOAP' (Same, Opposite, Always Positive)."
  }
];