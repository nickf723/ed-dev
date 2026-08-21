import type { Metadata } from "next";
import BiologyHub, { type BiologyHubNode } from "./_components/BiologyHub";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { BIOLOGY_DIRECT_BRANCH_IDS } from "./biologyModel";

const NODE_ID = "natural.biology";

export const metadata: Metadata = {
  title: "Biology",
  description:
    "Study living systems across molecular, cellular, organismal, evolutionary, and ecological scales.",
};

export default function BiologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Biology must be classified as a navigation hub.");
  }

  const actualIds = context.children.map((child) => child.id);
  if (
    actualIds.length !== BIOLOGY_DIRECT_BRANCH_IDS.length ||
    actualIds.some((id, index) => id !== BIOLOGY_DIRECT_BRANCH_IDS[index])
  ) {
    throw new Error(
      "Biology page branch navigation is out of sync with the curriculum registry."
    );
  }

  const nodes: BiologyHubNode[] = context.children.map((node) => ({
    id: node.id,
    label: node.label,
    href: node.href,
    description: node.description,
    status: node.status,
  }));

  return <BiologyHub nodes={nodes} breadcrumbs={context.breadcrumbs} />;
}
