import FundamentalsLessonExperience from "../_components/FundamentalsLessonExperience";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.fundamentals.equality-equations";

export default function EqualityEquationsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  if (context.pageKind !== "lesson") throw new Error("Equality & Equations must be a lesson.");

  return (
    <FundamentalsLessonExperience
      lesson="equality-equations"
      breadcrumbs={context.breadcrumbs}
      previous={context.previousActiveSibling ? { label: context.previousActiveSibling.label, href: context.previousActiveSibling.href } : undefined}
      next={context.nextActiveSibling ? { label: context.nextActiveSibling.label, href: context.nextActiveSibling.href } : undefined}
      unitHref={context.parent?.href ?? "/formal-science/mathematics/algebra/elementary-algebra/fundamentals"}
    />
  );
}
