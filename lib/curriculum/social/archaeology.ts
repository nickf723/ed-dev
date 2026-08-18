import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "social", status: "placeholder", pageKind: "unit" };
}

export const ARCHAEOLOGY_CURRICULUM: CurriculumNode = {
  id: "social.anthropology.archaeology",
  label: "Archaeology",
  href: "/social-science/anthropology/archaeology",
  description:
    "Study past human lives through material remains, spatial context, stratigraphy, dating, scientific analysis, environmental evidence, landscapes, formation processes, interpretation, heritage, and ethical stewardship.",
  domainId: "social",
  status: "active",
  pageKind: "hub",
  children: [
    planned("social.anthropology.archaeology.fieldwork", "Survey, Excavation & Recording", "/social-science/anthropology/archaeology/fieldwork", "Study research design, pedestrian and remote survey, excavation strategies, grids and coordinates, context sheets, drawings, photography, sampling, finds recovery, field notes, and reproducible recording."),
    planned("social.anthropology.archaeology.stratigraphy", "Stratigraphy & Formation Processes", "/social-science/anthropology/archaeology/stratigraphy", "Study layers, interfaces, cuts, fills, deposits, features, superposition, disturbance, reuse, erosion, bioturbation, deposition, post-depositional change, and how archaeological contexts form."),
    planned("social.anthropology.archaeology.dating", "Dating & Chronology", "/social-science/anthropology/archaeology/dating", "Study relative dating, seriation, dendrochronology, radiocarbon, luminescence, archaeomagnetism, calibration, uncertainty, sample selection, and how independent chronological evidence is combined."),
    planned("social.anthropology.archaeology.material-culture", "Material Culture & Technology", "/social-science/anthropology/archaeology/material-culture", "Study artifacts and production through typology, use-wear, chaîne opératoire, ceramics, lithics, metals, glass, textiles, architecture, craft, repair, exchange, consumption, and discard."),
    planned("social.anthropology.archaeology.bioarchaeology", "Bioarchaeology & Human Remains", "/social-science/anthropology/archaeology/bioarchaeology", "Study human skeletal and biomolecular evidence, burial context, paleopathology, diet, mobility, demography, ancient DNA, isotopes, ethics, descendant communities, repatriation, and respectful stewardship."),
    planned("social.anthropology.archaeology.environmental", "Environmental Archaeology", "/social-science/anthropology/archaeology/environmental", "Study plants, animals, soils, sediments, pollen, charcoal, phytoliths, seeds, shells, microremains, climate proxies, subsistence, land use, seasonality, and human-environment relationships."),
    planned("social.anthropology.archaeology.landscape", "Landscape & Spatial Archaeology", "/social-science/anthropology/archaeology/landscape", "Study settlement patterns, routes, visibility, territory, built environments, GIS, remote sensing, geophysics, spatial statistics, regional survey, and how human activity is organized across space."),
    planned("social.anthropology.archaeology.archaeometry", "Archaeometry & Scientific Analysis", "/social-science/anthropology/archaeology/archaeometry", "Apply microscopy, compositional analysis, spectroscopy, isotopes, residues, materials characterization, imaging, geochemistry, and other scientific methods while keeping archaeological questions and sampling limitations explicit."),
    planned("social.anthropology.archaeology.heritage-ethics", "Heritage, Ethics & Public Archaeology", "/social-science/anthropology/archaeology/heritage-ethics", "Study stewardship, ownership, descendant and local communities, repatriation, looting, collecting, museums, preservation, public interpretation, cultural property, law, tourism, access, and the politics of archaeological knowledge."),
  ],
};
