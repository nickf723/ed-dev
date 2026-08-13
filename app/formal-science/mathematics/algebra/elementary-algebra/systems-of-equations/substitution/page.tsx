import SubstitutionLessonExperience from "../_components/SubstitutionLessonExperience";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.systems.substitution";

export default function SubstitutionPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  if (context.pageKind !== "lesson") throw new Error("Substitution must be a lesson.");

  return (
    <SubstitutionLessonExperience
      breadcrumbs={context.breadcrumbs}
      previous={context.previousActiveSibling ? { label: context.previousActiveSibling.label, href: context.previousActiveSibling.href } : undefined}
      next={context.nextActiveSibling ? { label: context.nextActiveSibling.label, href: context.nextActiveSibling.href } : undefined}
      unitHref={context.parent?.href ?? "/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations"}
    />
  );
}
