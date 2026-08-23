export type PolymerBenchState = {
  monomers: number;
  bonds: number;
  chains: number;
  freeMonomers: number;
  waterReleased: number;
};

export function maxBonds(monomers: number) {
  return Math.max(0, Math.floor(monomers) - 1);
}

export function getPolymerBenchState(
  monomers: number,
  requestedBonds: number
): PolymerBenchState {
  const safeMonomers = Math.max(1, Math.floor(monomers));
  const bonds = Math.min(
    maxBonds(safeMonomers),
    Math.max(0, Math.floor(requestedBonds))
  );
  const connectedUnits = bonds === 0 ? 0 : bonds + 1;

  return {
    monomers: safeMonomers,
    bonds,
    chains: safeMonomers - bonds,
    freeMonomers: safeMonomers - connectedUnits,
    waterReleased: bonds,
  };
}

export function buildBond(state: PolymerBenchState) {
  return getPolymerBenchState(state.monomers, state.bonds + 1);
}

export function breakBond(state: PolymerBenchState) {
  return getPolymerBenchState(state.monomers, state.bonds - 1);
}

export function waterForCompleteBuild(monomers: number) {
  return maxBonds(monomers);
}

export function waterForHydrolysis(bondsBroken: number) {
  return Math.max(0, Math.floor(bondsBroken));
}
