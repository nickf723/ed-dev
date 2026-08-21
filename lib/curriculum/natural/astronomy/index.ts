import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
  status: CurriculumNode["status"] = "placeholder"
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "natural",
    status,
    pageKind: children?.length ? "hub" : "unit",
    children,
  };
}

export const ASTRONOMY_CURRICULUM: CurriculumNode = {
  id: "natural.astronomy",
  label: "Astronomy",
  href: "/natural-science/astronomy",
  description:
    "The study of planets, stars, galaxies, cosmic structure, and the observations and models used to understand the universe.",
  domainId: "natural",
  status: "active",
  pageKind: "hub",
  children: [
    node(
      "natural.astronomy.planetary",
      "Planetary Astronomy",
      "/natural-science/astronomy/planetary-astronomy",
      "Planets, moons, small bodies, planetary systems, atmospheres, surfaces, and the formation of worlds.",
      undefined,
      "active"
    ),
    node(
      "natural.astronomy.stellar",
      "Stellar Astronomy",
      "/natural-science/astronomy/stellar-astronomy",
      "Stars from formation through main-sequence life, giant phases, stellar remnants, and explosive death."
    ),
    node(
      "natural.astronomy.galactic",
      "Galactic Astronomy",
      "/natural-science/astronomy/galactic-astronomy",
      "The structure, contents, dynamics, and evolution of galaxies, including the Milky Way."
    ),
    node(
      "natural.astronomy.extragalactic",
      "Extragalactic Astronomy",
      "/natural-science/astronomy/extragalactic-astronomy",
      "Galaxies beyond the Milky Way, galaxy clusters, active galactic nuclei, and large-scale cosmic structure."
    ),
    node(
      "natural.astronomy.cosmology",
      "Cosmology",
      "/natural-science/astronomy/cosmology",
      "The origin, expansion, contents, geometry, and large-scale evolution of the universe."
    ),
    node(
      "natural.astronomy.methods",
      "Astronomical Methods",
      "/natural-science/astronomy/methods",
      "How astronomers turn light, particles, timing, statistics, simulations, and physical theory into evidence about distant objects.",
      [
        node(
          "natural.astronomy.methods.observational",
          "Observational Astronomy",
          "/natural-science/astronomy/methods/observational",
          "Telescopes, detectors, spectra, imaging, time-series data, and the measurement of astronomical signals."
        ),
        node(
          "natural.astronomy.methods.theoretical",
          "Theoretical Astronomy",
          "/natural-science/astronomy/methods/theoretical",
          "Analytical models, numerical simulations, inference, and physical theory used to explain astronomical observations."
        ),
      ]
    ),
  ],
};
