import ElectromagnetismHub from "./_components/ElectromagnetismHub";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "natural.physics.electromagnetism";

export default function ElectromagnetismPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <ElectromagnetismHub
      activeCount={context.activeChildren.length}
      lessons={context.children.map((child) => ({
        id: child.id,
        label: child.label,
        href: child.href,
        description: child.description,
        status: child.status,
      }))}
    />
  );
}
