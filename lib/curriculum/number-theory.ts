import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status,
    pageKind: status === "active" ? undefined : "unit",
  };
}

export const NUMBER_THEORY_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.number-theory",
  label: "Number Theory",
  href: "/formal-science/mathematics/number-theory",
  description:
    "The study of integers through divisibility, prime structure, congruence, integer-constrained equations, and the distribution of arithmetic patterns.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.mathematics.number-theory.primes",
      "Primes & Divisibility",
      "/formal-science/mathematics/number-theory/primes",
      "Prime and composite numbers, divisors, greatest common divisors, unique factorization, multiplicative functions, and the structure built from prime powers.",
    ),
    branch(
      "formal.mathematics.number-theory.modular",
      "Congruences & Modular Arithmetic",
      "/formal-science/mathematics/number-theory/modular",
      "Remainder classes, congruence, inverses, periodic arithmetic, modular equations, and the structures created when integers are identified by a shared remainder.",
    ),
    branch(
      "formal.mathematics.number-theory.diophantine",
      "Diophantine Equations",
      "/formal-science/mathematics/number-theory/diophantine",
      "Equations whose solutions are required to be integers, from linear divisibility conditions to lattice points and historically difficult nonlinear problems.",
      "active",
    ),
    branch(
      "formal.mathematics.number-theory.analytic",
      "Analytic Number Theory",
      "/formal-science/mathematics/number-theory/analytic",
      "The large-scale distribution of primes and arithmetic functions studied with limits, complex analysis, asymptotics, and estimates.",
    ),
  ],
};
