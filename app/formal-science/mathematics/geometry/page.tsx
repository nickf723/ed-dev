import GeometryHub from "./GeometryHub";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";

const NODE_ID = "formal.mathematics.geometry";

export default function GeometryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <GeometryHub
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
