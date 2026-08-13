import CompoundInequalitiesLessonExperience from "../_components/CompoundInequalitiesLessonExperience";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.inequalities.compound";

export default function CompoundInequalitiesPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  if (context.pageKind !== "lesson") {
    throw new Error("Compound Inequalities must be a lesson.");
  }

  return (
    <CompoundInequalitiesLessonExperience
      breadcrumbs={context.breadcrumbs}
      previous={context.previousActiveSibling ? { label: context.previousActiveSibling.label, href: context.previousActiveSibling.href } : undefined}
      next={context.nextActiveSibling ? { label: context.nextActiveSibling.label, href: context.nextActiveSibling.href } : undefined}
      unitHref={context.parent?.href ?? "/formal-science/mathematics/algebra/elementary-algebra/inequalities"}
    />
  );
}
