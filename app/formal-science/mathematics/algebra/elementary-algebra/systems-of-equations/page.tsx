import { Layers } from "lucide-react";
import ElementaryAlgebraUnitPage from "../_components/ElementaryAlgebraUnitPage";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.systems";

const PRESENTATIONS = {
  "formal.mathematics.algebra.elementary-algebra.systems.solution-types": {
    step: "01",
    question: "What does it mean for two equations to share one solution, no solution, or infinitely many solutions?",
    specimen: "A ∩ B",
    rgb: "6, 182, 212",
  },
  "formal.mathematics.algebra.elementary-algebra.systems.graphing": {
    step: "02",
    question: "How does the intersection of two graphs reveal a system's shared ordered-pair solution?",
    specimen: "two lines → intersection",
    rgb: "16, 185, 129",
  },
  "formal.mathematics.algebra.elementary-algebra.systems.substitution": {
    step: "03",
    question: "How can an equivalent expression replace one variable and reduce a system to one equation?",
    specimen: "y = … → substitute",
    rgb: "249, 115, 22",
  },
  "formal.mathematics.algebra.elementary-algebra.systems.elimination": {
    step: "04",
    question: "How can equivalent equations be combined so one variable disappears without changing the shared solution?",
    specimen: "+ / − → eliminate",
    rgb: "129, 140, 248",
  },
} as const;

export default function SystemsOfEquationsUnitPage() {
  return (
    <ElementaryAlgebraUnitPage
      nodeId={NODE_ID}
      icon={Layers}
      eyebrow="Shared solution · Graph · Substitute · Eliminate"
      subtitle="A four-lesson unit on simultaneous constraints: understand the geometry of shared solutions, then solve the same relationship by graphing, substitution, and elimination."
      accentRgb="6, 182, 212"
      throughline="Different methods should uncover the same shared solution set."
      sequence="classify the system → graph the intersection → substitute → eliminate"
      presentations={PRESENTATIONS}
    />
  );
}
