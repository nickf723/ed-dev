export type SetTheorySpecimenShape =
  | "circle"
  | "square"
  | "triangle"
  | "hexagon";

export type SetTheoryMembershipAddress = "aOnly" | "both" | "bOnly" | "neither";

export type SetTheorySpecimen = {
  id: string;
  name: string;
  tone: "cyan" | "amber" | "violet";
  shape: SetTheorySpecimenShape;
  address: SetTheoryMembershipAddress;
};

/**
 * The opening model and the page world intentionally share this exact data.
 * Set A is the cyan objects. Set B is the triangles.
 */
export const SET_THEORY_SPECIMENS = [
  {
    id: "cyan-circle",
    name: "cyan circle",
    tone: "cyan",
    shape: "circle",
    address: "aOnly",
  },
  {
    id: "cyan-square",
    name: "cyan square",
    tone: "cyan",
    shape: "square",
    address: "aOnly",
  },
  {
    id: "cyan-triangle",
    name: "cyan triangle",
    tone: "cyan",
    shape: "triangle",
    address: "both",
  },
  {
    id: "amber-triangle",
    name: "amber triangle",
    tone: "amber",
    shape: "triangle",
    address: "bOnly",
  },
  {
    id: "amber-hexagon",
    name: "amber hexagon",
    tone: "amber",
    shape: "hexagon",
    address: "neither",
  },
  {
    id: "violet-circle",
    name: "violet circle",
    tone: "violet",
    shape: "circle",
    address: "neither",
  },
] as const satisfies readonly SetTheorySpecimen[];

export function specimensAtAddress(address: SetTheoryMembershipAddress) {
  return SET_THEORY_SPECIMENS.filter(
    (specimen) => specimen.address === address
  );
}
