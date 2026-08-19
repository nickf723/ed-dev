import EarthScienceHub from "./EarthScienceHub";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";

const NODE_ID = "natural.earth-science";

export default function EarthSciencePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <EarthScienceHub
      nodes={context.children.map((child: CurriculumNode) => ({
        id: child.id,
        label: child.label,
        href: child.href,
        description: child.description,
        status: child.status ?? "active",
      }))}
    />
  );
}
