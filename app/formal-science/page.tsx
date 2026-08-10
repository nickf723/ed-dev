import FormalScienceHub, {
  type FormalHubNode,
} from "./_components/FormalScienceHub";
import { curriculumRegistry } from "@/lib/curriculum/registry";

export default function FormalSciencePage() {
  const formalDomain = curriculumRegistry
    .allDomains()
    .find((domain) => domain.domainId === "formal");

  if (!formalDomain) {
    throw new Error("Formal Science is missing from the curriculum registry.");
  }

  const nodes: FormalHubNode[] = formalDomain.children.map((node) => ({
    id: node.id,
    label: node.label,
    href: node.href,
    description: node.description,
    status: node.status,
    prerequisiteIds: node.prerequisiteIds,
  }));

  return <FormalScienceHub nodes={nodes} />;
}
