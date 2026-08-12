import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import SoftwareHubClient, { type SoftwareSectorNode } from "./SoftwareHubClient";

export default function SoftwarePage() {
  const context = requireCurriculumPageContext("formal.computer-science.software");

  const sectors: SoftwareSectorNode[] = context.children.map((node) => {
    if (!node.description) {
      throw new Error(`Software curriculum node ${node.id} is missing its description.`);
    }

    return {
      id: node.id,
      label: node.label,
      href: node.href,
      description: node.description,
      status: node.status ?? "active",
    };
  });

  return (
    <SoftwareHubClient
      sectors={sectors}
      parentHref={context.parent?.href ?? "/formal-science/computer-science"}
    />
  );
}
