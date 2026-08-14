import QuadraticFormulaLessonExperience from "../_components/QuadraticFormulaLessonExperience";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.quadratics.quadratic-formula";

export default function QuadraticFormulaPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  if (context.pageKind !== "lesson") throw new Error("Quadratic Formula & Discriminant must be a lesson.");
  return <QuadraticFormulaLessonExperience breadcrumbs={context.breadcrumbs} previous={context.previousActiveSibling ? { label: context.previousActiveSibling.label, href: context.previousActiveSibling.href } : undefined} next={context.nextActiveSibling ? { label: context.nextActiveSibling.label, href: context.nextActiveSibling.href } : undefined} unitHref={context.parent?.href ?? "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations"} />;
}
