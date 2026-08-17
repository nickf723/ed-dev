export type BondScene = "sharing" | "transfer" | "shape" | "forces";

export type ElementRecord = {
  symbol: string;
  name: string;
  en: number;
  valence: number;
  preferredCharge: number;
  rgb: string;
};

export type PairRecord = {
  id: string;
  left: string;
  right: string;
  label: string;
};

export type CanvasDetail = {
  left: ElementRecord;
  right: ElementRecord;
  deltaEn: number;
  bondOrder: number;
  domains: number;
  lonePairs: number;
  polarity: number;
  temperature: number;
  scene: BondScene;
};

export const ELEMENTS: Record<string, ElementRecord> = {
  H: {
    symbol: "H",
    name: "Hydrogen",
    en: 2.2,
    valence: 1,
    preferredCharge: 1,
    rgb: "241,245,249",
  },
  C: {
    symbol: "C",
    name: "Carbon",
    en: 2.55,
    valence: 4,
    preferredCharge: 0,
    rgb: "148,163,184",
  },
  N: {
    symbol: "N",
    name: "Nitrogen",
    en: 3.04,
    valence: 5,
    preferredCharge: -3,
    rgb: "96,165,250",
  },
  O: {
    symbol: "O",
    name: "Oxygen",
    en: 3.44,
    valence: 6,
    preferredCharge: -2,
    rgb: "248,113,113",
  },
  F: {
    symbol: "F",
    name: "Fluorine",
    en: 3.98,
    valence: 7,
    preferredCharge: -1,
    rgb: "52,211,153",
  },
  Na: {
    symbol: "Na",
    name: "Sodium",
    en: 0.93,
    valence: 1,
    preferredCharge: 1,
    rgb: "250,204,21",
  },
  Mg: {
    symbol: "Mg",
    name: "Magnesium",
    en: 1.31,
    valence: 2,
    preferredCharge: 2,
    rgb: "251,146,60",
  },
  Cl: {
    symbol: "Cl",
    name: "Chlorine",
    en: 3.16,
    valence: 7,
    preferredCharge: -1,
    rgb: "132,204,22",
  },
};

export const PAIRS: PairRecord[] = [
  { id: "h2", left: "H", right: "H", label: "H–H" },
  { id: "co", left: "C", right: "O", label: "C–O" },
  { id: "hf", left: "H", right: "F", label: "H–F" },
  { id: "nacl", left: "Na", right: "Cl", label: "Na–Cl" },
  { id: "mgcl", left: "Mg", right: "Cl", label: "Mg–Cl" },
];

export function classifyBond(deltaEn: number) {
  if (deltaEn < 0.4) {
    return { label: "mostly nonpolar covalent", rgb: "34,211,238" };
  }
  if (deltaEn < 1.7) {
    return { label: "polar covalent continuum", rgb: "192,132,252" };
  }
  return { label: "strong ionic character", rgb: "250,204,21" };
}

export function geometryName(domains: number, lonePairs: number) {
  const map: Record<string, { name: string; angle: string }> = {
    "2-0": { name: "linear", angle: "180°" },
    "3-0": { name: "trigonal planar", angle: "120°" },
    "3-1": { name: "bent", angle: "<120°" },
    "4-0": { name: "tetrahedral", angle: "109.5°" },
    "4-1": { name: "trigonal pyramidal", angle: "~107°" },
    "4-2": { name: "bent", angle: "~104.5°" },
    "5-0": { name: "trigonal bipyramidal", angle: "90° / 120°" },
    "5-1": { name: "seesaw", angle: "distorted" },
    "5-2": { name: "T-shaped", angle: "~90°" },
    "5-3": { name: "linear", angle: "180°" },
    "6-0": { name: "octahedral", angle: "90°" },
    "6-1": { name: "square pyramidal", angle: "~90°" },
    "6-2": { name: "square planar", angle: "90°" },
  };
  return map[`${domains}-${lonePairs}`] ?? {
    name: "domain arrangement",
    angle: "model-dependent",
  };
}

export function geometryDirections(domains: number) {
  const tau = Math.PI * 2;
  if (domains <= 2) return [Math.PI, 0];
  if (domains === 3) {
    return [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6];
  }
  if (domains === 4) {
    return [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6, Math.PI / 2];
  }
  if (domains === 5) {
    return [
      -Math.PI / 2,
      Math.PI / 2,
      0,
      (2 * Math.PI) / 3,
      (4 * Math.PI) / 3,
    ];
  }
  return Array.from(
    { length: 6 },
    (_, index) => (index / 6) * tau - Math.PI / 2,
  );
}

export function resolveScene(value: string | null): BondScene {
  if (value === "transfer" || value === "shape" || value === "forces") {
    return value;
  }
  return "sharing";
}

export function sceneTitle(scene: BondScene) {
  if (scene === "transfer") return "Charge separation and ionic attraction";
  if (scene === "shape") return "Electron domains become molecular geometry";
  if (scene === "forces") {
    return "Molecules organize through intermolecular forces";
  }
  return "Shared electron density becomes a bond";
}

export function sceneMetric(scene: BondScene, detail: CanvasDetail) {
  if (scene === "transfer") {
    return `${detail.left.symbol} → ${detail.right.symbol}`;
  }
  if (scene === "forces") return `${detail.polarity}% polarity`;
  return `${detail.bondOrder} shared pair${detail.bondOrder === 1 ? "" : "s"}`;
}

export function scenePrediction(scene: BondScene, detail: CanvasDetail) {
  if (scene === "transfer") {
    return detail.deltaEn >= 1.7 ? "lattice favored" : "mixed character";
  }
  if (scene === "shape") return `${detail.domains} domains`;
  if (scene === "forces") {
    return detail.temperature > detail.polarity
      ? "thermal motion wins"
      : "attraction organizes";
  }
  return detail.deltaEn < 0.4 ? "balanced density" : "shifted density";
}

export function interpretation(
  scene: BondScene,
  detail: CanvasDetail,
  geometry: string,
  phaseCue: string,
) {
  if (scene === "transfer") {
    return `${detail.left.name} and ${detail.right.name} differ in electronegativity by ${detail.deltaEn.toFixed(2)}. Ionic language is most useful when charge separation and a repeating lattice explain the bulk material better than one isolated pair.`;
  }
  if (scene === "shape") {
    return `${detail.domains} electron domains with ${detail.lonePairs} lone pair${detail.lonePairs === 1 ? "" : "s"} produce an idealized ${geometry} molecular shape. Lone-pair repulsion can compress bond angles away from the perfect domain geometry.`;
  }
  if (scene === "forces") {
    return `Polarity encourages alignment and attraction, while thermal motion disrupts that organization. Under the current settings the network is ${phaseCue}.`;
  }
  return "A bond is not a rigid stick. It is a lower-energy distribution of electron density. Increasing bond order adds density between nuclei, while electronegativity shifts that density toward one atom.";
}

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}
