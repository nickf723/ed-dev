import RelativityHub from "./_components/RelativityHub";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "natural.physics.relativity";

export default function RelativityPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <RelativityHub
      branches={context.children.map((child) => ({
        id: child.id,
        label: child.label,
        href: child.href,
        description: child.description,
      }))}
    />
  );
}
