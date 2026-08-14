import { FunctionSquare } from "lucide-react";
import ElementaryAlgebraUnitPage from "../_components/ElementaryAlgebraUnitPage";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.quadratics";

const PRESENTATIONS = {
  "formal.mathematics.algebra.elementary-algebra.quadratics.patterns-parabolas": {
    step: "01",
    question: "How do constant second differences reveal a quadratic relationship before we graph or solve it?",
    specimen: "constant second Δ",
    rgb: "96, 165, 250",
  },
  "formal.mathematics.algebra.elementary-algebra.quadratics.vertex-form": {
    step: "02",
    question: "How do a, h, and k control the opening, width, and vertex of a parabola?",
    specimen: "y = a(x − h)² + k",
    rgb: "129, 140, 248",
  },
  "formal.mathematics.algebra.elementary-algebra.quadratics.roots-intercepts": {
    step: "03",
    question: "How are roots, zeros, solutions, and x-intercepts different names for the same zero-output event?",
    specimen: "f(r) = 0",
    rgb: "244, 114, 182",
  },
  "formal.mathematics.algebra.elementary-algebra.quadratics.completing-square": {
    step: "04",
    question: "How can we add the exact missing term that turns a quadratic expression into one perfect square?",
    specimen: "x² + bx + (b/2)²",
    rgb: "167, 139, 250",
  },
  "formal.mathematics.algebra.elementary-algebra.quadratics.quadratic-formula": {
    step: "05",
    question: "How does the quadratic formula solve every standard-form quadratic and predict its real-root geometry?",
    specimen: "Δ = b² − 4ac",
    rgb: "34, 211, 238",
  },
} as const;

export default function QuadraticEquationsUnitPage() {
  return (
    <ElementaryAlgebraUnitPage
      nodeId={NODE_ID}
      icon={FunctionSquare}
      eyebrow="Pattern · Shape · Roots · General solution"
      subtitle="A five-lesson unit that connects quadratic tables, parabolic geometry, zero-output solutions, square construction, and the general solving formula."
      accentRgb="96, 165, 250"
      throughline="A quadratic is one relationship viewed through pattern, shape, and solution."
      sequence="detect the pattern → place the vertex → interpret roots → build a square → solve generally"
      presentations={PRESENTATIONS}
    />
  );
}
