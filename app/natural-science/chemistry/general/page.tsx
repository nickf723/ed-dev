import GeneralChemistryHub from "./GeneralChemistryHub";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";

const NODE_ID = "natural.chemistry.general";

export default function GeneralChemistryPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  return (
    <GeneralChemistryHub
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
