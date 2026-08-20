import type { CollectionSource } from "../schema";
import type { APIElement } from "../../../app/natural-science/chemistry/_components/chemistry-api";

export type PubChemPeriodicTablePayload = {
  Table?: {
    Columns?: { Column?: string[] };
    Row?: { Cell?: string[] }[];
  };
};

export const PUBCHEM_PERIODIC_TABLE_SOURCE: Readonly<CollectionSource>;
export const IUPAC_PERIODIC_TABLE_SOURCE: Readonly<CollectionSource>;
export function normalizePubChemPeriodicTable(
  payload: PubChemPeriodicTablePayload
): APIElement[];
export function normalizePubChemElement(
  columns: string[],
  cells: string[]
): APIElement;
export function periodicPosition(number: number): {
  x: number;
  y: number;
  period: number;
  group: number;
};
