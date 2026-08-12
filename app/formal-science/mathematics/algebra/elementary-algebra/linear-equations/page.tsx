import { TrendingUp } from "lucide-react";
import ElementaryAlgebraUnitPage from "../_components/ElementaryAlgebraUnitPage";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.linear-equations";

const PRESENTATIONS = {
  "formal.mathematics.algebra.elementary-algebra.linear-equations.slope-rate": {
    step: "01",
    question: "What does slope measure, and how does a constant rate of change appear in a graph and table?",
    specimen: "m = Δy / Δx",
    rgb: "45, 212, 191",
  },
  "formal.mathematics.algebra.elementary-algebra.linear-equations.slope-intercept": {
    step: "02",
    question: "How do m and b encode the rate and starting value of a linear relationship?",
    specimen: "y = mx + b",
    rgb: "244, 114, 182",
  },
  "formal.mathematics.algebra.elementary-algebra.linear-equations.graphing-line": {
    step: "03",
    question: "How does one linear equation become the complete straight-line set of ordered-pair solutions?",
    specimen: "(x, y) → line",
    rgb: "96, 165, 250",
  },
  "formal.mathematics.algebra.elementary-algebra.linear-equations.forms-special-cases": {
    step: "04",
    question: "Why can the same line be written in several forms, and what changes for horizontal or vertical lines?",
    specimen: "y=mx+b · y−y₁=m(x−x₁) · Ax+By=C",
    rgb: "129, 140, 248",
  },
} as const;

export default function GraphingLinearEquationsUnitPage() {
  return (
    <ElementaryAlgebraUnitPage
      nodeId={NODE_ID}
      icon={TrendingUp}
      eyebrow="Rate · Form · Graph · Representation"
      subtitle="A four-lesson unit on straight-line relationships: measure constant change, read slope-intercept form, graph the solution set, and translate between useful line forms."
      accentRgb="45, 212, 191"
      throughline="A linear equation is one relationship viewed through several coordinated representations."
      sequence="rate of change → y = mx + b → graph the line → translate forms"
      presentations={PRESENTATIONS}
    />
  );
}
