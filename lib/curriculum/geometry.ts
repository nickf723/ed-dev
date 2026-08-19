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
    pageKind: "hub",
  };
}

export const GEOMETRY_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.geometry",
  label: "Geometry",
  href: "/formal-science/mathematics/geometry",
  description:
    "The study of shape, position, distance, angle, curvature, continuity, transformation, and the structures that remain invariant when space changes.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    node(
      "formal.mathematics.geometry.euclidean",
      "Euclidean Geometry",
      "/formal-science/mathematics/geometry/euclidean",
      "Flat-space geometry built from points, lines, angles, congruence, similarity, polygons, circles, solids, constructions, and deductive proof.",
    ),
    node(
      "formal.mathematics.geometry.trigonometry",
      "Trigonometry",
      "/formal-science/mathematics/geometry/trigonometry",
      "Angle, length, ratio, the unit circle, periodic functions, and the relationships connecting triangles to waves and rotation.",
    ),
    node(
      "formal.mathematics.geometry.analytic",
      "Analytic Geometry",
      "/formal-science/mathematics/geometry/analytic",
      "Coordinates and equations used to encode geometric objects so algebra can describe position, distance, curves, and transformations.",
      "placeholder",
    ),
    node(
      "formal.mathematics.geometry.non-euclidean",
      "Non-Euclidean Geometry",
      "/formal-science/mathematics/geometry/non-euclidean",
      "Geometry on curved spaces where Euclid's parallel postulate changes, producing hyperbolic and elliptic geometries with different global behavior.",
    ),
    node(
      "formal.mathematics.geometry.topology",
      "Topology",
      "/formal-science/mathematics/geometry/topology",
      "The study of continuity, connectedness, holes, boundaries, manifolds, and properties preserved by continuous deformation rather than rigid measurement.",
    ),
    node(
      "formal.mathematics.geometry.fractal",
      "Fractal Geometry",
      "/formal-science/mathematics/geometry/fractal",
      "Recursive and self-similar geometry in which structure repeats across scales and dimension can extend beyond familiar integer values.",
      "placeholder",
    ),
  ],
};
