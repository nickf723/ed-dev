import ScaleOfNature, {
  type NaturalScienceScaleNode,
} from "./_components/ScaleOfNature";
import { curriculumRegistry } from "@/lib/curriculum/registry";

export default function NaturalSciencesPage() {
  const naturalDomain = curriculumRegistry
    .allDomains()
    .find((domain) => domain.domainId === "natural");

  if (!naturalDomain) {
    throw new Error("Natural Science is missing from the curriculum registry.");
  }

  const nodes: NaturalScienceScaleNode[] = naturalDomain.children.map((node) => ({
    id: node.id,
    label: node.label,
    href: node.href,
    description: node.description,
  }));

  return <ScaleOfNature nodes={nodes} />;
}
