import RootsInterceptsLessonExperience from "../_components/RootsInterceptsLessonExperience";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.quadratics.roots-intercepts";

export default function RootsInterceptsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  if (context.pageKind !== "lesson") throw new Error("Roots & X-Intercepts must be a lesson.");
  return <RootsInterceptsLessonExperience breadcrumbs={context.breadcrumbs} previous={context.previousActiveSibling ? { label: context.previousActiveSibling.label, href: context.previousActiveSibling.href } : undefined} next={context.nextActiveSibling ? { label: context.nextActiveSibling.label, href: context.nextActiveSibling.href } : undefined} unitHref={context.parent?.href ?? "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations"} />;
}
