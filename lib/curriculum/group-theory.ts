import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
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
  };
}

export const GROUP_THEORY_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.algebra.abstract-algebra.group-theory",
  label: "Groups",
  href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory",
  description: "Reversible structure, symmetry, rotations, reflections, and composition.",
  domainId: "formal",
  status: "active",
  children: [
    node(
      "formal.mathematics.algebra.abstract-algebra.group-theory.finite-groups",
      "Finite Groups",
      "/formal-science/mathematics/algebra/abstract-algebra/group-theory/finite-groups",
      "Cyclic, dihedral, and Klein groups: finite building blocks of symmetry.",
    ),
    node(
      "formal.mathematics.algebra.abstract-algebra.group-theory.subgroups",
      "Subgroups",
      "/formal-science/mathematics/algebra/abstract-algebra/group-theory/subgroups",
      "Groups contained inside larger groups, including cosets and Lagrange's theorem.",
      "placeholder",
    ),
    node(
      "formal.mathematics.algebra.abstract-algebra.group-theory.quotients",
      "Quotient Groups",
      "/formal-science/mathematics/algebra/abstract-algebra/group-theory/normal-groups",
      "Normal subgroups and the algebra of collapsing symmetry into quotient structure.",
      "placeholder",
    ),
    node(
      "formal.mathematics.algebra.abstract-algebra.group-theory.permutations",
      "Permutations",
      "/formal-science/mathematics/algebra/abstract-algebra/group-theory/permutations",
      "Symmetric groups, shuffling elements, and cycle notation.",
      "placeholder",
    ),
    node(
      "formal.mathematics.algebra.abstract-algebra.group-theory.actions",
      "Group Actions",
      "/formal-science/mathematics/algebra/abstract-algebra/group-theory/actions",
      "How groups act on sets, including orbits, stabilizers, and symmetry in motion.",
      "placeholder",
    ),
    node(
      "formal.mathematics.algebra.abstract-algebra.group-theory.isomorphisms",
      "Isomorphisms",
      "/formal-science/mathematics/algebra/abstract-algebra/group-theory/isomorphisms",
      "Structure-preserving equivalence and theorems showing when groups are fundamentally the same.",
      "placeholder",
    ),
  ],
};
