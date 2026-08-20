import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "active",
  children?: readonly CurriculumNode[],
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status,
    pageKind: "hub",
    children,
  };
}

function lesson(id: string, label: string, href: string, description: string): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status: "active",
    pageKind: "lesson",
  };
}

const EUCLIDEAN_CHILDREN: readonly CurriculumNode[] = [
  lesson(
    "formal.mathematics.geometry.euclidean.points-lines",
    "Points, Lines & Planes",
    "/formal-science/mathematics/geometry/euclidean/points-lines",
    "The primitive objects and incidence relationships used to describe flat Euclidean space.",
  ),
  lesson(
    "formal.mathematics.geometry.euclidean.angles-intersections",
    "Angles & Intersections",
    "/formal-science/mathematics/geometry/euclidean/angles-intersections",
    "Angle measure, intersecting lines, parallel structure, and relationships among complementary, supplementary, and vertical angles.",
  ),
  lesson(
    "formal.mathematics.geometry.euclidean.triangle-congruence",
    "Triangle Congruence",
    "/formal-science/mathematics/geometry/euclidean/triangle-congruence",
    "Criteria such as SSS, SAS, ASA, AAS, and HL used to prove when triangles must have identical size and shape.",
  ),
  lesson(
    "formal.mathematics.geometry.euclidean.polygons-circles",
    "Polygons & Circles",
    "/formal-science/mathematics/geometry/euclidean/polygons-circles",
    "Properties of polygons and circles, including angle structure, perimeter, area, chords, arcs, and symmetry.",
  ),
  lesson(
    "formal.mathematics.geometry.euclidean.solids",
    "3D Solids",
    "/formal-science/mathematics/geometry/euclidean/solids",
    "Prisms, pyramids, cylinders, cones, spheres, surface area, volume, and spatial measurement.",
  ),
  lesson(
    "formal.mathematics.geometry.euclidean.logic-proofs",
    "Logic & Proofs",
    "/formal-science/mathematics/geometry/euclidean/logic-proofs",
    "Definitions, postulates, theorems, and deductive arguments that turn diagrams into justified geometric conclusions.",
  ),
  lesson(
    "formal.mathematics.geometry.euclidean.classic-constructions",
    "Classic Constructions",
    "/formal-science/mathematics/geometry/euclidean/classic-constructions",
    "Compass-and-straightedge constructions for bisectors, perpendiculars, polygons, loci, and exact geometric relationships.",
  ),
];

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
    branch(
      "formal.mathematics.geometry.euclidean",
      "Euclidean Geometry",
      "/formal-science/mathematics/geometry/euclidean",
      "Flat-space geometry built from points, lines, angles, congruence, similarity, polygons, circles, solids, constructions, and deductive proof.",
      "active",
      EUCLIDEAN_CHILDREN,
    ),
    branch(
      "formal.mathematics.geometry.trigonometry",
      "Trigonometry",
      "/formal-science/mathematics/geometry/trigonometry",
      "Angle, length, ratio, the unit circle, periodic functions, and the relationships connecting triangles to waves and rotation.",
    ),
    branch(
      "formal.mathematics.geometry.analytic",
      "Analytic Geometry",
      "/formal-science/mathematics/geometry/analytic",
      "Coordinates and equations used to encode geometric objects so algebra can describe position, distance, curves, and transformations.",
      "placeholder",
    ),
    branch(
      "formal.mathematics.geometry.non-euclidean",
      "Non-Euclidean Geometry",
      "/formal-science/mathematics/geometry/non-euclidean",
      "Geometry on curved spaces where Euclid's parallel postulate changes, producing hyperbolic and elliptic geometries with different global behavior.",
    ),
    branch(
      "formal.mathematics.geometry.topology",
      "Topology",
      "/formal-science/mathematics/geometry/topology",
      "The study of continuity, connectedness, holes, boundaries, manifolds, and properties preserved by continuous deformation rather than rigid measurement.",
    ),
    branch(
      "formal.mathematics.geometry.fractal",
      "Fractal Geometry",
      "/formal-science/mathematics/geometry/fractal",
      "Recursive and self-similar geometry in which structure repeats across scales and dimension can extend beyond familiar integer values.",
      "placeholder",
    ),
  ],
};
