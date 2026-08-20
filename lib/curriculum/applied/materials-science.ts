import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "applied",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const MATERIALS_SCIENCE_CURRICULUM: CurriculumNode = {
  id: "applied.materials-science",
  label: "Materials Science",
  href: "/applied-science/materials-science",
  description:
    "Connect atomic and microstructural organization to material properties, processing, performance, degradation, characterization, and the selection of materials for engineered systems.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "applied.materials-science.structure",
      "Structure & Bonding",
      "/applied-science/materials-science/structure",
      "Atomic bonding, crystal structures, amorphous order, defects, phases, interfaces, grains, and the hierarchy from atomic arrangement to microstructure.",
    ),
    branch(
      "applied.materials-science.properties",
      "Material Properties",
      "/applied-science/materials-science/properties",
      "Mechanical, thermal, electrical, magnetic, optical, chemical, and transport properties and the measurements used to describe them.",
    ),
    branch(
      "applied.materials-science.metals",
      "Metals & Alloys",
      "/applied-science/materials-science/metals",
      "Metallic bonding, alloying, grains, phases, dislocations, strengthening, heat treatment, deformation, corrosion, and metallurgy.",
    ),
    branch(
      "applied.materials-science.ceramics",
      "Ceramics & Glasses",
      "/applied-science/materials-science/ceramics",
      "Crystalline and amorphous inorganic materials, brittleness, thermal stability, ionic and covalent bonding, processing, glass formation, and refractory behavior.",
    ),
    branch(
      "applied.materials-science.polymers",
      "Polymers",
      "/applied-science/materials-science/polymers",
      "Polymer chains, molecular weight, crystallinity, cross-linking, viscoelasticity, thermoplastics, thermosets, elastomers, and polymer processing.",
    ),
    branch(
      "applied.materials-science.composites",
      "Composites",
      "/applied-science/materials-science/composites",
      "Matrices, fibers, particles, interfaces, anisotropy, load transfer, laminates, toughening, and engineered combinations of distinct material phases.",
    ),
    branch(
      "applied.materials-science.functional",
      "Electronic & Functional Materials",
      "/applied-science/materials-science/functional",
      "Semiconducting, dielectric, magnetic, optical, piezoelectric, electrochemical, and other materials whose function depends on controlled electronic or field response.",
    ),
    branch(
      "applied.materials-science.processing-characterization",
      "Processing & Characterization",
      "/applied-science/materials-science/processing-characterization",
      "Casting, forming, sintering, additive manufacturing, heat treatment, microscopy, diffraction, spectroscopy, mechanical testing, and structure-property measurement.",
    ),
  ],
};
