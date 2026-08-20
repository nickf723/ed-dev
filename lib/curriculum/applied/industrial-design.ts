import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "applied", status: "placeholder", pageKind: "unit" };
}

export const INDUSTRIAL_DESIGN_CURRICULUM: CurriculumNode = {
  id: "applied.industrial-design",
  label: "Industrial Design",
  href: "/applied-science/industrial-design",
  description:
    "Design physical products around human use by connecting research, ergonomics, form, color/material/finish, prototyping, manufacturing, accessibility, lifecycle thinking, and clear visual communication.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    planned("applied.industrial-design.product-studio", "Product Design Studio", "/applied-science/industrial-design/product-studio", "Frame product opportunities, generate alternatives, iterate form and function, critique proposals, and develop coherent product concepts."),
    planned("applied.industrial-design.human-factors", "Human Factors & Ergonomics", "/applied-science/industrial-design/human-factors", "Study reach, grip, posture, perception, control, feedback, accessibility, anthropometric variation, workload, error, safety, and human-product interaction."),
    planned("applied.industrial-design.cmf", "Color, Material & Finish", "/applied-science/industrial-design/cmf", "Use color, material, texture, gloss, pattern, coating, aging, tactile quality, visual hierarchy, brand language, and finish specifications intentionally."),
    planned("applied.industrial-design.materials-manufacturing", "Materials & Manufacturing", "/applied-science/industrial-design/materials-manufacturing", "Connect material properties and production processes to wall thickness, draft, ribs, split lines, tolerances, fasteners, tooling, cost, finish, and assembly."),
    planned("applied.industrial-design.design-research", "Design Research & User Needs", "/applied-science/industrial-design/design-research", "Observe contexts, interview users, map tasks and journeys, synthesize evidence, test assumptions, identify unmet needs, and distinguish findings from designer interpretation."),
    planned("applied.industrial-design.prototyping", "Prototyping & Modelmaking", "/applied-science/industrial-design/prototyping", "Build sketches, appearance models, foam studies, mockups, rigs, 3D prints, proof-of-concept prototypes, and test artifacts at the fidelity needed for the current question."),
    planned("applied.industrial-design.lifecycle", "Sustainability & Product Lifecycle", "/applied-science/industrial-design/lifecycle", "Consider material sourcing, manufacturing, shipping, energy, durability, repair, upgrade, reuse, disassembly, recycling, take-back, and end-of-life pathways."),
    planned("applied.industrial-design.visualization-cad", "Visualization, CAD & Communication", "/applied-science/industrial-design/visualization-cad", "Communicate geometry and intent through sketching, orthographic views, sections, rendering, CAD, surface modeling, annotation, specification, and design presentations."),
  ],
};
