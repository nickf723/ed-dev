import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
  status: CurriculumNode["status"] = "active",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status,
    children,
  };
}

const preAlgebra = node(
  "formal.mathematics.algebra.pre-algebra",
  "Pre-Algebra",
  "/formal-science/mathematics/algebra/pre-algebra",
  "Integers, order of operations, and the introduction of the variable.",
  [
    node(
      "formal.mathematics.algebra.pre-algebra.integers",
      "Integers & Negatives",
      "/formal-science/mathematics/algebra/pre-algebra/integers",
      "The number line extends both ways. Adding, subtracting, and multiplying negative numbers.",
    ),
    node(
      "formal.mathematics.algebra.pre-algebra.pemdas",
      "Order of Operations",
      "/formal-science/mathematics/algebra/pre-algebra/pemdas",
      "PEMDAS, operation precedence, and unraveling complex expressions.",
    ),
    node(
      "formal.mathematics.algebra.pre-algebra.properties",
      "Number Properties",
      "/formal-science/mathematics/algebra/pre-algebra/properties",
      "Commutative, associative, identity, and distributive properties.",
    ),
    node(
      "formal.mathematics.algebra.pre-algebra.ratios",
      "Ratios & Proportions",
      "/formal-science/mathematics/algebra/pre-algebra/ratios",
      "Scaling, percentages, rates, proportions, and unit price.",
    ),
    node(
      "formal.mathematics.algebra.pre-algebra.fractions",
      "Advanced Fractions",
      "/formal-science/mathematics/algebra/pre-algebra/fractions",
      "Multiplying, dividing, and finding common denominators across complex fractions.",
    ),
    node(
      "formal.mathematics.algebra.pre-algebra.exponents",
      "Exponents",
      "/formal-science/mathematics/algebra/pre-algebra/exponents",
      "Powers, square roots, and scientific notation.",
    ),
    node(
      "formal.mathematics.algebra.pre-algebra.expressions",
      "Expressions",
      "/formal-science/mathematics/algebra/pre-algebra/expressions",
      "Variables and translating verbal relationships into mathematical expressions.",
    ),
    node(
      "formal.mathematics.algebra.pre-algebra.equations",
      "Solving for X",
      "/formal-science/mathematics/algebra/pre-algebra/equations",
      "Inverse operations and solving one- and two-step equations.",
    ),
  ],
);

const integratedAlgebra = node(
  "formal.mathematics.algebra.elementary-algebra",
  "Integrated Algebra",
  "/formal-science/mathematics/algebra/elementary-algebra",
  "Linear equations, inequalities, graphing, functions, and polynomial algebra.",
  [
    node(
      "formal.mathematics.algebra.elementary-algebra.fundamentals",
      "Algebra Fundamentals",
      "/formal-science/mathematics/algebra/elementary-algebra/fundamentals",
      "Real numbers, equality, operation rules, and variable expressions.",
    ),
    node(
      "formal.mathematics.algebra.elementary-algebra.linear-equations",
      "Graphing Linear Equations",
      "/formal-science/mathematics/algebra/elementary-algebra/linear-equations",
      "Slope-intercept form, point-slope form, and graphing lines.",
    ),
    node(
      "formal.mathematics.algebra.elementary-algebra.systems",
      "Systems of Equations",
      "/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations",
      "Solving linear systems with graphing, substitution, and elimination.",
    ),
    node(
      "formal.mathematics.algebra.elementary-algebra.inequalities",
      "Algebraic Inequalities",
      "/formal-science/mathematics/algebra/elementary-algebra/inequalities",
      "Solving and graphing single and compound inequalities.",
    ),
    node(
      "formal.mathematics.algebra.elementary-algebra.quadratics",
      "Quadratic Equations",
      "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations",
      "Parabolas, vertex form, the quadratic formula, and completing the square.",
    ),
    node(
      "formal.mathematics.algebra.elementary-algebra.factoring",
      "Factoring",
      "/formal-science/mathematics/algebra/elementary-algebra/factoring",
      "Greatest common factors, difference of squares, and trinomial decomposition.",
    ),
    node(
      "formal.mathematics.algebra.elementary-algebra.exponents",
      "Exponents",
      "/formal-science/mathematics/algebra/elementary-algebra/exponents",
      "Power rules, exponential behavior, and logarithmic relationships.",
    ),
    node(
      "formal.mathematics.algebra.elementary-algebra.radicals",
      "Radical Expressions",
      "/formal-science/mathematics/algebra/elementary-algebra/radical-expressions",
      "Square roots, cube roots, simplifying radicals, and fractional exponents.",
    ),
    node(
      "formal.mathematics.algebra.elementary-algebra.functions",
      "Functions",
      "/formal-science/mathematics/algebra/elementary-algebra/functions",
      "Domain, range, function notation, composition, and input-output relationships.",
    ),
    node(
      "formal.mathematics.algebra.elementary-algebra.rational",
      "Rational Expressions",
      "/formal-science/mathematics/algebra/elementary-algebra/rational-expressions",
      "Simplifying and operating on algebraic fractions.",
    ),
    node(
      "formal.mathematics.algebra.elementary-algebra.complex",
      "Complex Numbers",
      "/formal-science/mathematics/algebra/elementary-algebra/complex",
      "Imaginary numbers, the complex plane, and arithmetic with complex values.",
    ),
  ],
);

const linearAlgebra = node(
  "formal.mathematics.algebra.linear-algebra",
  "Linear Algebra",
  "/formal-science/mathematics/algebra/linear-algebra",
  "Vector spaces, linear mappings, eigenvalues, and matrix theory.",
  [
    node(
      "formal.mathematics.algebra.linear-algebra.vectors",
      "Vectors",
      "/formal-science/mathematics/algebra/linear-algebra/vectors",
      "Direction, magnitude, vector operations, and geometric representation.",
    ),
    node(
      "formal.mathematics.algebra.linear-algebra.matrices",
      "Matrices",
      "/formal-science/mathematics/algebra/linear-algebra/matrices",
      "Rectangular arrays that encode systems and transformations.",
    ),
    node(
      "formal.mathematics.algebra.linear-algebra.systems",
      "Linear Systems",
      "/formal-science/mathematics/algebra/linear-algebra/systems",
      "Gaussian elimination, reduced row echelon form, and simultaneous equations.",
    ),
    node(
      "formal.mathematics.algebra.linear-algebra.determinants",
      "Determinants",
      "/formal-science/mathematics/algebra/linear-algebra/determinants",
      "Signed scaling factors, invertibility, and geometric volume.",
    ),
    node(
      "formal.mathematics.algebra.linear-algebra.transformations",
      "Linear Transformations",
      "/formal-science/mathematics/algebra/linear-algebra/transformations",
      "Structure-preserving mappings represented by matrices.",
    ),
    node(
      "formal.mathematics.algebra.linear-algebra.spaces",
      "Vector Spaces",
      "/formal-science/mathematics/algebra/linear-algebra/spaces",
      "Basis, span, dimension, subspaces, and linear independence.",
    ),
    node(
      "formal.mathematics.algebra.linear-algebra.eigen",
      "Eigen Theory",
      "/formal-science/mathematics/algebra/linear-algebra/eigen",
      "Eigenvalues, eigenvectors, and invariant directions.",
    ),
    node(
      "formal.mathematics.algebra.linear-algebra.orthogonality",
      "Orthogonality",
      "/formal-science/mathematics/algebra/linear-algebra/orthogonality",
      "Perpendicularity, projections, orthonormal bases, and Gram-Schmidt.",
    ),
    node(
      "formal.mathematics.algebra.linear-algebra.svd",
      "Singular Value Decomposition",
      "/formal-science/mathematics/algebra/linear-algebra/svd",
      "Factor matrices into orthogonal directions and singular values for compression and analysis.",
    ),
  ],
);

const abstractAlgebra = node(
  "formal.mathematics.algebra.abstract-algebra",
  "Abstract Algebra",
  "/formal-science/mathematics/algebra/abstract-algebra",
  "Algebraic structures such as groups, rings, fields, and modules.",
  [
    node(
      "formal.mathematics.algebra.abstract-algebra.group-theory",
      "Groups",
      "/formal-science/mathematics/algebra/abstract-algebra/group-theory",
      "Reversible structure, symmetry, rotations, reflections, and composition.",
    ),
    node(
      "formal.mathematics.algebra.abstract-algebra.maps",
      "Maps",
      "/formal-science/mathematics/algebra/abstract-algebra/maps",
      "Homomorphisms and other structure-preserving translations between algebraic systems.",
    ),
    node(
      "formal.mathematics.algebra.abstract-algebra.ring-theory",
      "Rings",
      "/formal-science/mathematics/algebra/abstract-algebra/ring-theory",
      "Sets with compatible addition and multiplication operations.",
      undefined,
      "placeholder",
    ),
    node(
      "formal.mathematics.algebra.abstract-algebra.field-theory",
      "Fields",
      "/formal-science/mathematics/algebra/abstract-algebra/field-theory",
      "Rings where nonzero elements support division, providing the scalars of linear algebra.",
    ),
    node(
      "formal.mathematics.algebra.abstract-algebra.vector-spaces",
      "Vector Spaces",
      "/formal-science/mathematics/algebra/abstract-algebra/vector-spaces",
      "Abelian groups equipped with scalar multiplication over a field.",
      undefined,
      "placeholder",
    ),
    node(
      "formal.mathematics.algebra.abstract-algebra.galois-theory",
      "Galois Theory",
      "/formal-science/mathematics/algebra/abstract-algebra/galois-theory",
      "The bridge between group structure and field extensions.",
      undefined,
      "placeholder",
    ),
  ],
);

export const ALGEBRA_CURRICULUM = node(
  "formal.mathematics.algebra",
  "Algebra",
  "/formal-science/mathematics/algebra",
  "The rules for manipulating mathematical symbols and relationships.",
  [preAlgebra, integratedAlgebra, linearAlgebra, abstractAlgebra],
);
