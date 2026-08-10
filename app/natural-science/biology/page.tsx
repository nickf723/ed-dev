import BiologyHub, {
  type BiologyHubNode,
} from "./_components/BiologyHub";
import { curriculumRegistry } from "@/lib/curriculum/registry";

export default function BiologyPage() {
  const biology = curriculumRegistry.getNode("natural.biology");

  if (!biology) {
    throw new Error("Biology is missing from the curriculum registry.");
  }

  const nodes: BiologyHubNode[] = (biology.children ?? []).map((node) => ({
    id: node.id,
    label: node.label,
    href: node.href,
    description: node.description,
    status: node.status,
  }));

  return <BiologyHub nodes={nodes} />;
}
