import VertexFormLessonExperience from "../_components/VertexFormLessonExperience";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.quadratics.vertex-form";

export default function VertexFormPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  if (context.pageKind !== "lesson") throw new Error("Vertex Form & Transformations must be a lesson.");
  return <VertexFormLessonExperience breadcrumbs={context.breadcrumbs} previous={context.previousActiveSibling ? { label: context.previousActiveSibling.label, href: context.previousActiveSibling.href } : undefined} next={context.nextActiveSibling ? { label: context.nextActiveSibling.label, href: context.nextActiveSibling.href } : undefined} unitHref={context.parent?.href ?? "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations"} />;
}
