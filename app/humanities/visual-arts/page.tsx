import VisualArtsHub from "./VisualArtsHub";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";

const NODE_ID = "humanities.visual-arts";

export default function VisualArtsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  return (
    <VisualArtsHub
      branches={context.children.map((child: CurriculumNode) => ({
        id: child.id,
        label: child.label,
        href: child.href,
        description: child.description,
        status: child.status ?? "active",
      }))}
    />
  );
}
