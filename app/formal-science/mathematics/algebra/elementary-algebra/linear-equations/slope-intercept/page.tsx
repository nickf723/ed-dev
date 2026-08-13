import SlopeInterceptLessonExperience from "../_components/SlopeInterceptLessonExperience";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.linear-equations.slope-intercept";

export default function SlopeInterceptPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  if (context.pageKind !== "lesson") {
    throw new Error("Slope-Intercept Form must be a lesson.");
  }

  return (
    <SlopeInterceptLessonExperience
      breadcrumbs={context.breadcrumbs}
      previous={context.previousActiveSibling ? { label: context.previousActiveSibling.label, href: context.previousActiveSibling.href } : undefined}
      next={context.nextActiveSibling ? { label: context.nextActiveSibling.label, href: context.nextActiveSibling.href } : undefined}
      unitHref={context.parent?.href ?? "/formal-science/mathematics/algebra/elementary-algebra/linear-equations"}
    />
  );
}
