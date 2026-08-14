import WavesOpticsHub from "./_components/WavesOpticsHub";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "natural.physics.waves-optics";

export default function WavesOpticsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <WavesOpticsHub
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
