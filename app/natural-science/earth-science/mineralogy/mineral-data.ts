import type {
  CollectionFacetDefinition,
  CollectionProvenance,
  CollectionSource,
} from "@/lib/collections/schema";

export type HardnessBand = "soft" | "medium" | "hard" | "very-hard";
export type GemRelationship =
  | "major-gem"
  | "ornamental-collector"
  | "not-typically-gem";

export type CrystalMotif =
  | "sheet"
  | "blade"
  | "cube"
  | "rhombohedron"
  | "octahedron"
  | "prism"
  | "mass"
  | "block"
  | "pyritohedron"
  | "point"
  | "hex-prism"
  | "barrel";

export type MineralRecord = {
  id: string;
  name: string;
  formula: string;
  formulaAscii: string;
  mineralClass: string;
  mineralClassLabel: string;
  hardness: readonly [number, number];
  hardnessLabel: string;
  hardnessBand: HardnessBand;
  crystalSystem: string;
  crystalSystemLabel: string;
  lusterGroup: string;
  luster: string;
  streak: string;
  cleavage: string;
  fracture: string;
  typicalColors: string;
  diagnosticCue: string;
  significance: string;
  gemRelationship: GemRelationship;
  gemNote: string;
  searchAliases: readonly string[];
  rgb: string;
  motif: CrystalMotif;
  sources: readonly CollectionSource[];
};

const MEC = "Minerals Education Coalition";
const SMITHSONIAN = "Smithsonian National Museum of Natural History";

export const MINERAL_CABINET_REVIEWED_AT = "2026-08-20";

export const MINERAL_CABINET_PROVENANCE: CollectionProvenance = {
  state: "curated",
  reviewedAt: MINERAL_CABINET_REVIEWED_AT,
  version: "1.0",
  note: "A reviewed teaching cabinet, not a complete mineral-species database. Property ranges describe common reference behavior; natural specimens can vary.",
  sources: [
    {
      label: "Minerals Education Coalition mineral database",
      url: "https://mineralseducationcoalition.org/mining-minerals-information/minerals-database/",
      kind: "reference",
      scope:
        "Mineral formulas, classes, hardness, crystal systems, streak, luster, and uses.",
    },
    {
      label: "Smithsonian: Gems and Minerals — Beauties and Building Blocks",
      url: "https://naturalhistory.si.edu/education/teaching-resources/earth-science/gems-and-minerals-beauties-and-building-blocks",
      kind: "reference",
      scope: "Mineral, rock, crystal-face, and gemstone distinctions.",
    },
  ],
};

function mecSource(slug: string, scope: string): CollectionSource {
  return {
    label: MEC,
    url: `https://mineralseducationcoalition.org/minerals-database/${slug}/`,
    kind: "reference",
    scope,
  };
}

function smithsonianSource(path: string, scope: string): CollectionSource {
  return {
    label: SMITHSONIAN,
    url: `https://naturalhistory.si.edu/${path}`,
    kind: "primary",
    scope,
  };
}

export const MINERAL_SPECIMENS: readonly MineralRecord[] = [
  {
    id: "talc",
    name: "Talc",
    formula: "Mg₃Si₄O₁₀(OH)₂",
    formulaAscii: "Mg3Si4O10(OH)2",
    mineralClass: "silicate",
    mineralClassLabel: "Silicate",
    hardness: [1, 1],
    hardnessLabel: "1",
    hardnessBand: "soft",
    crystalSystem: "monoclinic-triclinic",
    crystalSystemLabel: "Monoclinic / triclinic",
    lusterGroup: "pearly",
    luster: "Pearly",
    streak: "White",
    cleavage: "Perfect in one basal direction",
    fracture: "Uneven",
    typicalColors: "White, gray, brown, or greenish",
    diagnosticCue:
      "Extremely soft; thin flakes and a characteristically greasy feel.",
    significance:
      "The softest Mohs reference mineral and an important industrial filler and ceramic material.",
    gemRelationship: "not-typically-gem",
    gemNote:
      "Usually studied as an industrial and rock-forming material rather than a gem.",
    searchAliases: ["soapstone", "mohs 1"],
    rgb: "167, 243, 208",
    motif: "sheet",
    sources: [mecSource("talc", "Reference properties and uses for talc.")],
  },
  {
    id: "gypsum",
    name: "Gypsum",
    formula: "CaSO₄·2H₂O",
    formulaAscii: "CaSO4 2H2O",
    mineralClass: "sulfate",
    mineralClassLabel: "Sulfate",
    hardness: [1.5, 2],
    hardnessLabel: "1.5–2",
    hardnessBand: "soft",
    crystalSystem: "monoclinic",
    crystalSystemLabel: "Monoclinic",
    lusterGroup: "vitreous-pearly",
    luster: "Vitreous to pearly or silky",
    streak: "White",
    cleavage: "Perfect in one direction; distinct in two others",
    fracture: "Uneven to splintery",
    typicalColors: "Colorless or white; impurities add color",
    diagnosticCue:
      "Soft enough to scratch with a fingernail; hydrated calcium sulfate.",
    significance:
      "A common evaporite mineral and the raw material for plaster and wallboard.",
    gemRelationship: "ornamental-collector",
    gemNote:
      "Transparent selenite and fibrous satin spar are collected and carved, but are too soft for most jewelry.",
    searchAliases: ["selenite", "satin spar", "mohs 2", "wallboard"],
    rgb: "224, 231, 255",
    motif: "blade",
    sources: [
      mecSource(
        "gypsum",
        "Reference properties, formation, and uses for gypsum."
      ),
    ],
  },
  {
    id: "halite",
    name: "Halite",
    formula: "NaCl",
    formulaAscii: "NaCl",
    mineralClass: "halide",
    mineralClassLabel: "Halide",
    hardness: [2, 2.5],
    hardnessLabel: "2–2.5",
    hardnessBand: "soft",
    crystalSystem: "isometric",
    crystalSystemLabel: "Isometric",
    lusterGroup: "vitreous",
    luster: "Vitreous",
    streak: "White",
    cleavage: "Perfect cubic cleavage in three directions at 90°",
    fracture: "Conchoidal",
    typicalColors:
      "Colorless or white; also blue, purple, pink, yellow, or gray",
    diagnosticCue:
      "Cubic form and three cleavage directions meet at right angles.",
    significance:
      "Rock salt records evaporation and supplies a biologically and industrially essential compound.",
    gemRelationship: "ornamental-collector",
    gemNote:
      "Attractive crystals are collected, but softness and solubility limit durable gem use.",
    searchAliases: ["salt", "rock salt", "table salt", "mohs 2.5"],
    rgb: "147, 197, 253",
    motif: "cube",
    sources: [
      mecSource("salthalite", "Reference properties and uses for halite."),
    ],
  },
  {
    id: "calcite",
    name: "Calcite",
    formula: "CaCO₃",
    formulaAscii: "CaCO3",
    mineralClass: "carbonate",
    mineralClassLabel: "Carbonate",
    hardness: [3, 3],
    hardnessLabel: "3",
    hardnessBand: "soft",
    crystalSystem: "trigonal",
    crystalSystemLabel: "Trigonal",
    lusterGroup: "vitreous-pearly",
    luster: "Vitreous; pearly on cleavage surfaces",
    streak: "White",
    cleavage: "Perfect rhombohedral cleavage in three directions",
    fracture: "Conchoidal to uneven",
    typicalColors: "Colorless or white; impurities create many colors",
    diagnosticCue:
      "Rhombohedral cleavage and visible effervescence in dilute acid.",
    significance:
      "A major component of limestone and a central recorder of sedimentary, biological, and hydrothermal processes.",
    gemRelationship: "ornamental-collector",
    gemNote:
      "Optical calcite and colorful crystals are collected; softness limits everyday jewelry.",
    searchAliases: ["Iceland spar", "limestone", "acid reaction", "mohs 3"],
    rgb: "125, 211, 252",
    motif: "rhombohedron",
    sources: [
      mecSource("calcite", "Reference properties and uses for calcite."),
    ],
  },
  {
    id: "fluorite",
    name: "Fluorite",
    formula: "CaF₂",
    formulaAscii: "CaF2",
    mineralClass: "halide",
    mineralClassLabel: "Halide",
    hardness: [4, 4],
    hardnessLabel: "4",
    hardnessBand: "medium",
    crystalSystem: "isometric",
    crystalSystemLabel: "Isometric",
    lusterGroup: "vitreous",
    luster: "Vitreous",
    streak: "White",
    cleavage: "Perfect octahedral cleavage in four directions",
    fracture: "Subconchoidal to uneven",
    typicalColors:
      "Colorless in pure form; commonly purple, green, blue, yellow, or multicolored",
    diagnosticCue:
      "Hardness 4 with four perfect cleavage directions that can yield octahedra.",
    significance:
      "The principal ore of fluorine and the mineral that gave fluorescence its name.",
    gemRelationship: "ornamental-collector",
    gemNote:
      "Often cut for collectors or display, but perfect cleavage and moderate hardness require care.",
    searchAliases: ["fluorspar", "fluorescence", "mohs 4"],
    rgb: "192, 132, 252",
    motif: "octahedron",
    sources: [
      mecSource("fluorite", "Reference properties and uses for fluorite."),
    ],
  },
  {
    id: "apatite",
    name: "Apatite",
    formula: "Ca₅(PO₄)₃(F,Cl,OH)",
    formulaAscii: "Ca5(PO4)3(F,Cl,OH)",
    mineralClass: "phosphate",
    mineralClassLabel: "Phosphate",
    hardness: [5, 5],
    hardnessLabel: "5",
    hardnessBand: "medium",
    crystalSystem: "hexagonal",
    crystalSystemLabel: "Hexagonal",
    lusterGroup: "vitreous",
    luster: "Vitreous",
    streak: "White",
    cleavage: "Poor to indistinct",
    fracture: "Conchoidal to uneven",
    typicalColors:
      "Commonly green or blue; also colorless, yellow, violet, pink, or brown",
    diagnosticCue:
      "Mohs 5 reference; hexagonal prisms can resemble several harder gems.",
    significance:
      "A phosphate mineral group important in fertilizers, rocks, and the chemistry of bones and teeth.",
    gemRelationship: "ornamental-collector",
    gemNote:
      "Transparent material can be faceted, but hardness 5 makes apatite vulnerable in jewelry.",
    searchAliases: ["phosphate", "mohs 5", "fertilizer"],
    rgb: "45, 212, 191",
    motif: "hex-prism",
    sources: [
      smithsonianSource(
        "explore/collections/geogallery/10026755",
        "Gem apatite hardness, transparency, color, and gem-use context."
      ),
    ],
  },
  {
    id: "magnetite",
    name: "Magnetite",
    formula: "Fe₃O₄",
    formulaAscii: "Fe3O4",
    mineralClass: "oxide",
    mineralClassLabel: "Oxide",
    hardness: [5.5, 6.5],
    hardnessLabel: "5.5–6.5",
    hardnessBand: "hard",
    crystalSystem: "isometric",
    crystalSystemLabel: "Isometric",
    lusterGroup: "metallic",
    luster: "Metallic to submetallic",
    streak: "Black",
    cleavage: "None",
    fracture: "Uneven",
    typicalColors: "Iron black to gray-black",
    diagnosticCue: "Strong magnetism paired with a black streak.",
    significance:
      "A major iron ore and a mineral record of magnetic and oxidation conditions.",
    gemRelationship: "not-typically-gem",
    gemNote:
      "Usually important as an ore, magnetic specimen, and rock-forming accessory rather than a gem.",
    searchAliases: ["lodestone", "iron oxide", "magnetic", "iron ore"],
    rgb: "148, 163, 184",
    motif: "octahedron",
    sources: [
      mecSource(
        "iron",
        "Reference properties and ore context for magnetite and hematite."
      ),
    ],
  },
  {
    id: "orthoclase",
    name: "Orthoclase",
    formula: "KAlSi₃O₈",
    formulaAscii: "KAlSi3O8",
    mineralClass: "silicate",
    mineralClassLabel: "Silicate",
    hardness: [6, 6.5],
    hardnessLabel: "6–6.5",
    hardnessBand: "hard",
    crystalSystem: "monoclinic",
    crystalSystemLabel: "Monoclinic",
    lusterGroup: "vitreous",
    luster: "Vitreous",
    streak: "White",
    cleavage: "Two good directions meeting near 90°",
    fracture: "Uneven to conchoidal",
    typicalColors: "White, cream, pink, gray, or brown",
    diagnosticCue: "Blocky two-direction cleavage and Mohs hardness near 6.",
    significance:
      "A potassium feldspar and a major constituent of many granites and other felsic rocks.",
    gemRelationship: "major-gem",
    gemNote:
      "Moonstone is an important gem variety associated with feldspar intergrowth and optical scattering.",
    searchAliases: [
      "potassium feldspar",
      "K-feldspar",
      "feldspar",
      "moonstone",
      "gem",
      "mohs 6",
    ],
    rgb: "251, 191, 164",
    motif: "block",
    sources: [
      mecSource(
        "feldspar",
        "Feldspar-group chemistry, hardness, crystal systems, colors, and uses."
      ),
    ],
  },
  {
    id: "pyrite",
    name: "Pyrite",
    formula: "FeS₂",
    formulaAscii: "FeS2",
    mineralClass: "sulfide",
    mineralClassLabel: "Sulfide",
    hardness: [6, 6.5],
    hardnessLabel: "6–6.5",
    hardnessBand: "hard",
    crystalSystem: "isometric",
    crystalSystemLabel: "Isometric",
    lusterGroup: "metallic",
    luster: "Metallic",
    streak: "Greenish-black to brownish-black",
    cleavage: "Poor to indistinct",
    fracture: "Very uneven to conchoidal",
    typicalColors: "Brassy yellow",
    diagnosticCue:
      "Brittle, hard, dark-streaking cubes distinguish it from soft, malleable gold.",
    significance:
      "Earth's most abundant sulfide mineral and a common indicator of ore-forming and reducing environments.",
    gemRelationship: "ornamental-collector",
    gemNote:
      "Cubes, pyritohedra, and sparkling aggregates are prized as collector specimens and decorative material.",
    searchAliases: ["fools gold", "fool's gold", "iron sulfide", "mohs 6.5"],
    rgb: "250, 204, 21",
    motif: "pyritohedron",
    sources: [
      mecSource(
        "pyrite",
        "Reference properties, abundance, ore context, and uses for pyrite."
      ),
      smithsonianSource(
        "explore/collections/geogallery/10026573",
        "Crystal habit and field distinction from gold."
      ),
    ],
  },
  {
    id: "quartz",
    name: "Quartz",
    formula: "SiO₂",
    formulaAscii: "SiO2",
    mineralClass: "silicate",
    mineralClassLabel: "Silicate",
    hardness: [7, 7],
    hardnessLabel: "7",
    hardnessBand: "hard",
    crystalSystem: "trigonal",
    crystalSystemLabel: "Trigonal",
    lusterGroup: "vitreous",
    luster: "Vitreous; may appear waxy or dull in aggregates",
    streak: "White",
    cleavage: "None",
    fracture: "Conchoidal",
    typicalColors:
      "Colorless when pure; amethyst, smoky, rose, citrine, and other varieties occur",
    diagnosticCue: "Hardness 7, no cleavage, and curved conchoidal fracture.",
    significance:
      "One of the most common crustal minerals and a durable component of igneous, metamorphic, and sedimentary rocks.",
    gemRelationship: "major-gem",
    gemNote:
      "Amethyst, citrine, smoky quartz, rose quartz, and other varieties are major gem and ornamental materials.",
    searchAliases: [
      "silica",
      "amethyst",
      "citrine",
      "rose quartz",
      "smoky quartz",
      "gem",
      "mohs 7",
    ],
    rgb: "196, 181, 253",
    motif: "point",
    sources: [
      mecSource(
        "quartz",
        "Reference properties, varieties, occurrence, and uses for quartz."
      ),
    ],
  },
  {
    id: "beryl",
    name: "Beryl",
    formula: "Be₃Al₂Si₆O₁₈",
    formulaAscii: "Be3Al2Si6O18",
    mineralClass: "silicate",
    mineralClassLabel: "Silicate",
    hardness: [7.5, 8],
    hardnessLabel: "7.5–8",
    hardnessBand: "very-hard",
    crystalSystem: "hexagonal",
    crystalSystemLabel: "Hexagonal",
    lusterGroup: "vitreous",
    luster: "Vitreous to resinous",
    streak: "White",
    cleavage: "Imperfect to indistinct basal cleavage",
    fracture: "Conchoidal to uneven",
    typicalColors: "Green, blue, yellow, colorless, pink, and other colors",
    diagnosticCue:
      "Hard hexagonal prisms; color varieties reflect trace chemistry and defects.",
    significance:
      "A beryllium-bearing silicate best known through emerald, aquamarine, and morganite.",
    gemRelationship: "major-gem",
    gemNote:
      "Emerald, aquamarine, heliodor, and morganite are colored gem varieties of beryl.",
    searchAliases: [
      "emerald",
      "aquamarine",
      "morganite",
      "heliodor",
      "gem",
      "mohs 8",
    ],
    rgb: "110, 231, 183",
    motif: "hex-prism",
    sources: [
      mecSource(
        "beryllium",
        "Beryl chemistry, hardness, crystal system, color, occurrence, and gem varieties."
      ),
    ],
  },
  {
    id: "corundum",
    name: "Corundum",
    formula: "Al₂O₃",
    formulaAscii: "Al2O3",
    mineralClass: "oxide",
    mineralClassLabel: "Oxide",
    hardness: [9, 9],
    hardnessLabel: "9",
    hardnessBand: "very-hard",
    crystalSystem: "trigonal",
    crystalSystemLabel: "Trigonal",
    lusterGroup: "adamantine-vitreous",
    luster: "Adamantine to vitreous or pearly",
    streak: "White",
    cleavage: "No true cleavage; parting may be present",
    fracture: "Conchoidal to uneven",
    typicalColors:
      "Colorless, gray, red, blue, yellow, orange, violet, green, or brown",
    diagnosticCue:
      "Mohs hardness 9; colored transparent varieties are ruby and sapphire.",
    significance:
      "An exceptionally hard aluminum oxide used as a gemstone, abrasive, and engineered optical material.",
    gemRelationship: "major-gem",
    gemNote:
      "Ruby is red corundum; gem-quality corundum of other colors is sapphire.",
    searchAliases: ["ruby", "sapphire", "aluminum oxide", "gem", "mohs 9"],
    rgb: "244, 114, 182",
    motif: "barrel",
    sources: [
      mecSource(
        "corundum",
        "Reference properties, gem varieties, geology, and uses for corundum."
      ),
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    formula: "C",
    formulaAscii: "C",
    mineralClass: "native-element",
    mineralClassLabel: "Native element",
    hardness: [10, 10],
    hardnessLabel: "10",
    hardnessBand: "very-hard",
    crystalSystem: "isometric",
    crystalSystemLabel: "Isometric",
    lusterGroup: "adamantine-vitreous",
    luster: "Adamantine",
    streak: "Colorless",
    cleavage: "Perfect octahedral cleavage in four directions",
    fracture: "Conchoidal",
    typicalColors:
      "Commonly yellow, brown, gray, or colorless; rarer colors occur",
    diagnosticCue:
      "Mohs hardness 10 does not mean indestructible: perfect cleavage can still split a crystal.",
    significance:
      "A high-pressure carbon mineral whose hardness and optical behavior support both gem and industrial uses.",
    gemRelationship: "major-gem",
    gemNote:
      "A major gemstone; crystal quality, color, cut, and provenance affect gem use and interpretation.",
    searchAliases: ["carbon", "mohs 10", "kimberlite", "gem"],
    rgb: "219, 234, 254",
    motif: "octahedron",
    sources: [
      mecSource(
        "diamond",
        "Reference properties, formation environments, and uses for diamond."
      ),
      smithsonianSource(
        "education/teaching-resources/earth-science/gems-and-minerals-beauties-and-building-blocks",
        "Mineral, rock, and gem distinctions plus gem-collection context."
      ),
    ],
  },
  {
    id: "sulfur",
    name: "Sulfur",
    formula: "S",
    formulaAscii: "S",
    mineralClass: "native-element",
    mineralClassLabel: "Native element",
    hardness: [1.5, 2.5],
    hardnessLabel: "1.5–2.5",
    hardnessBand: "soft",
    crystalSystem: "orthorhombic",
    crystalSystemLabel: "Orthorhombic",
    lusterGroup: "resinous",
    luster: "Resinous to adamantine or dull",
    streak: "White",
    cleavage: "Poor",
    fracture: "Conchoidal",
    typicalColors: "Bright yellow to yellow-brown",
    diagnosticCue:
      "Unusually low hardness, resinous luster, vivid yellow color, and poor thermal conductivity.",
    significance:
      "A native nonmetal associated with volcanic and evaporite settings and central to industrial chemistry.",
    gemRelationship: "ornamental-collector",
    gemNote:
      "Well-formed crystals are collected, but brittleness and softness prevent ordinary jewelry use.",
    searchAliases: ["native sulfur", "volcanic", "yellow", "mohs 2"],
    rgb: "253, 224, 71",
    motif: "mass",
    sources: [
      mecSource(
        "sulfur",
        "Reference properties, thermal behavior, occurrence, and uses for sulfur."
      ),
    ],
  },
] as const;

export const MINERAL_FACETS: readonly CollectionFacetDefinition<MineralRecord>[] =
  [
    {
      id: "class",
      label: "Chemical class",
      selection: "single",
      options: [
        { id: "silicate", label: "Silicate" },
        { id: "carbonate", label: "Carbonate" },
        { id: "oxide", label: "Oxide" },
        { id: "sulfide", label: "Sulfide" },
        { id: "sulfate", label: "Sulfate" },
        { id: "halide", label: "Halide" },
        { id: "phosphate", label: "Phosphate" },
        { id: "native-element", label: "Native element" },
      ],
      values: (record) => [record.mineralClass],
    },
    {
      id: "hardness",
      label: "Mohs band",
      selection: "single",
      options: [
        { id: "soft", label: "Soft · 1–3" },
        { id: "medium", label: "Medium · 3.5–5" },
        { id: "hard", label: "Hard · 5.5–7" },
        { id: "very-hard", label: "Very hard · 7.5–10" },
      ],
      values: (record) => [record.hardnessBand],
    },
    {
      id: "luster",
      label: "Luster family",
      selection: "single",
      options: [
        { id: "vitreous", label: "Vitreous" },
        { id: "vitreous-pearly", label: "Vitreous / pearly" },
        { id: "pearly", label: "Pearly" },
        { id: "metallic", label: "Metallic" },
        { id: "adamantine-vitreous", label: "Adamantine" },
        { id: "resinous", label: "Resinous" },
      ],
      values: (record) => [record.lusterGroup],
    },
    {
      id: "system",
      label: "Crystal system",
      selection: "single",
      options: [
        { id: "isometric", label: "Isometric" },
        { id: "trigonal", label: "Trigonal" },
        { id: "hexagonal", label: "Hexagonal" },
        { id: "orthorhombic", label: "Orthorhombic" },
        { id: "monoclinic", label: "Monoclinic" },
        { id: "monoclinic-triclinic", label: "Monoclinic / triclinic" },
      ],
      values: (record) => [record.crystalSystem],
    },
    {
      id: "gem",
      label: "Gem relationship",
      selection: "single",
      options: [
        { id: "major-gem", label: "Major gem material" },
        { id: "ornamental-collector", label: "Ornamental / collector" },
        { id: "not-typically-gem", label: "Not typically a gem" },
      ],
      values: (record) => [record.gemRelationship],
    },
  ];

export function mineralSearchText(record: MineralRecord): readonly string[] {
  return [
    record.name,
    record.formula,
    record.formulaAscii,
    record.mineralClassLabel,
    record.hardnessLabel,
    record.crystalSystemLabel,
    record.luster,
    record.streak,
    record.cleavage,
    record.fracture,
    record.typicalColors,
    record.diagnosticCue,
    record.significance,
    ...record.searchAliases,
  ];
}
