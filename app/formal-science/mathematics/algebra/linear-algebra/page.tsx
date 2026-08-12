import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import LinearAlgebraClient, { type LinearAlgebraNode } from "./LinearAlgebraClient";

export default function LinearAlgebraPage() {
  const context = requireCurriculumPageContext("formal.mathematics.algebra.linear-algebra");

  const modules: LinearAlgebraNode[] = context.children.map((node) => ({
    id: node.id,
    label: node.label,
    href: node.href,
    description: node.description ?? "",
    status: node.status ?? "active",
  }));

  return (
    <LinearAlgebraClient
      modules={modules}
      parentHref={context.parent?.href ?? "/formal-science/mathematics/algebra"}
    />
  );
}
