import SlopeRateLessonExperience from "../_components/SlopeRateLessonExperience";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.linear-equations.slope-rate";

export default function SlopeRatePage() {
  const context = requireCurriculumPageContext(NODE_ID);
  if (context.pageKind !== "lesson") {
    throw new Error("Slope & Rate of Change must be a lesson.");
  }

  return (
    <SlopeRateLessonExperience
      breadcrumbs={context.breadcrumbs}
      previous={context.previousActiveSibling ? { label: context.previousActiveSibling.label, href: context.previousActiveSibling.href } : undefined}
      next={context.nextActiveSibling ? { label: context.nextActiveSibling.label, href: context.nextActiveSibling.href } : undefined}
      unitHref={context.parent?.href ?? "/formal-science/mathematics/algebra/elementary-algebra/linear-equations"}
    />
  );
}
