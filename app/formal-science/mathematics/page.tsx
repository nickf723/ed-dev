import MathematicsHub, {
  type MathematicsHubNode,
} from "./_components/MathematicsHub";
import { curriculumRegistry } from "@/lib/curriculum/registry";

export default function MathematicsPage() {
  const mathematics = curriculumRegistry.getNode("formal.mathematics");

  if (!mathematics) {
    throw new Error("Mathematics is missing from the curriculum registry.");
  }

  const nodes: MathematicsHubNode[] = (mathematics.children ?? []).map((node) => ({
    id: node.id,
    label: node.label,
    href: node.href,
    description: node.description,
    status: node.status,
  }));

  return <MathematicsHub nodes={nodes} />;
}
