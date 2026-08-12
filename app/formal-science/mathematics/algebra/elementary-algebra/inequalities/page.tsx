import { MoveHorizontal } from "lucide-react";
import ElementaryAlgebraUnitPage from "../_components/ElementaryAlgebraUnitPage";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.inequalities";

const PRESENTATIONS = {
  "formal.mathematics.algebra.elementary-algebra.inequalities.one-variable": {
    step: "01",
    question: "How does solving an inequality produce a region of allowed values instead of one exact answer?",
    specimen: "x < 3 → (−∞, 3)",
    rgb: "56, 189, 248",
  },
  "formal.mathematics.algebra.elementary-algebra.inequalities.compound": {
    step: "02",
    question: "How do AND and OR combine two one-dimensional solution regions?",
    specimen: "intersection · union",
    rgb: "129, 140, 248",
  },
  "formal.mathematics.algebra.elementary-algebra.inequalities.systems": {
    step: "03",
    question: "How do multiple inequalities become overlapping half-planes on a coordinate plane?",
    specimen: "A ∩ B = feasible region",
    rgb: "167, 139, 250",
  },
} as const;

export default function AlgebraicInequalitiesUnitPage() {
  return (
    <ElementaryAlgebraUnitPage
      nodeId={NODE_ID}
      icon={MoveHorizontal}
      eyebrow="Region · Combine · Intersect"
      subtitle="A three-lesson unit on solution regions: begin with one-dimensional inequalities, combine regions with AND or OR, then extend the same logic into overlapping half-planes."
      accentRgb="56, 189, 248"
      throughline="An inequality describes where solutions are allowed to live."
      sequence="one region → compound regions → overlapping half-planes"
      presentations={PRESENTATIONS}
    />
  );
}
