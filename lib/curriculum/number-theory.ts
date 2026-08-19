import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "active",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status,
    pageKind: "hub",
  };
}

export const NUMBER_THEORY_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.number-theory",
  label: "Number Theory",
  href: "/formal-science/mathematics/number-theory",
  description:
    "The study of integers, divisibility, prime factorization, congruences, integer equations, and arithmetic structures.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.mathematics.number-theory.primes",
      "Primes & Divisibility",
      "/formal-science/mathematics/number-theory/primes",
      "Prime numbers, divisibility, greatest common divisors, unique factorization, prime distribution, and algorithms for arithmetic structure.",
      "placeholder",
    ),
    branch(
      "formal.mathematics.number-theory.modular",
      "Modular Arithmetic",
      "/formal-science/mathematics/number-theory/modular",
      "Congruence classes, arithmetic modulo n, residues, inverses, periodic structure, and theorems such as Fermat's little theorem and Euler's theorem.",
      "placeholder",
    ),
    branch(
      "formal.mathematics.number-theory.diophantine",
      "Diophantine Equations",
      "/formal-science/mathematics/number-theory/diophantine",
      "Equations whose solutions are restricted to integers or other arithmetic domains, from linear gcd criteria to deep nonlinear problems.",
    ),
    branch(
      "formal.mathematics.number-theory.cryptography",
      "Arithmetic Cryptography",
      "/formal-science/mathematics/number-theory/cryptography",
      "Applications of modular arithmetic, finite groups, discrete logarithms, factorization, and related hard problems to cryptographic constructions.",
      "placeholder",
    ),
  ],
};
