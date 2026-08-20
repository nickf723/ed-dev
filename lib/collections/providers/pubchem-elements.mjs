export const PUBCHEM_PERIODIC_TABLE_SOURCE = Object.freeze({
  label: "PubChem Periodic Table",
  url: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON",
  kind: "provider",
  scope:
    "Element identity, atomic mass, electron configuration, standard state, physical properties, classification, and discovery year",
});

export const IUPAC_PERIODIC_TABLE_SOURCE = Object.freeze({
  label: "IUPAC Periodic Table of Elements",
  url: "https://iupac.org/what-we-do/periodic-table-of-elements/",
  kind: "reference",
  scope:
    "Authoritative element names, symbols, atomic numbers, and standard atomic-weight conventions",
});

export function normalizePubChemPeriodicTable(payload) {
  const columns = payload?.Table?.Columns?.Column;
  const rows = payload?.Table?.Row;
  if (!Array.isArray(columns) || !Array.isArray(rows)) {
    throw new Error(
      "PubChem periodic-table response is missing columns or rows"
    );
  }

  const records = rows.map((row) =>
    normalizePubChemElement(columns, row?.Cell)
  );
  const ids = new Set(records.map((record) => record.number));
  if (ids.size !== records.length)
    throw new Error("PubChem returned duplicate atomic numbers");
  return records.slice().sort((left, right) => left.number - right.number);
}

export function normalizePubChemElement(columns, cells) {
  if (!Array.isArray(cells))
    throw new Error("PubChem element row is missing cells");
  const values = Object.fromEntries(
    columns.map((column, index) => [column, clean(cells[index])])
  );
  const number = integer(values.AtomicNumber);
  const symbol = required(values.Symbol, "symbol");
  const name = required(values.Name, "name");
  const position = periodicPosition(number);

  return {
    id: `element-${number}`,
    number,
    symbol,
    name,
    category: elementalFamily(number, values.GroupBlock),
    atomic_mass: decimal(values.AtomicMass),
    electron_configuration: values.ElectronConfiguration ?? "",
    xpos: position.x,
    ypos: position.y,
    period: position.period,
    group: position.group,
    block: orbitalBlock(number, position.group),
    phase: values.StandardState,
    electronegativity: optionalDecimal(values.Electronegativity),
    atomicRadius: optionalDecimal(values.AtomicRadius),
    ionizationEnergy: optionalDecimal(values.IonizationEnergy),
    electronAffinity: optionalDecimal(values.ElectronAffinity),
    oxidationStates: values.OxidationStates,
    meltingPoint: optionalDecimal(values.MeltingPoint),
    boilingPoint: optionalDecimal(values.BoilingPoint),
    density: optionalDecimal(values.Density),
    yearDiscovered: values.YearDiscovered,
    colorHex: values.CPKHexColor,
    sourceUrl: `https://pubchem.ncbi.nlm.nih.gov/element/${number}`,
    source: "PubChem",
  };
}

export function periodicPosition(number) {
  if (!Number.isInteger(number) || number < 1 || number > 118) {
    throw new Error(
      `Atomic number must be an integer from 1 to 118: ${number}`
    );
  }
  if (number === 1) return { x: 1, y: 1, period: 1, group: 1 };
  if (number === 2) return { x: 18, y: 1, period: 1, group: 18 };
  if (number <= 10) {
    const group = number <= 4 ? number - 2 : number + 8;
    return { x: group, y: 2, period: 2, group };
  }
  if (number <= 18) {
    const group = number <= 12 ? number - 10 : number;
    return { x: group, y: 3, period: 3, group };
  }
  if (number <= 36) return linearPosition(number, 18, 4);
  if (number <= 54) return linearPosition(number, 36, 5);
  if (number <= 56) return linearPosition(number, 54, 6);
  if (number <= 71) return { x: number - 54, y: 9, period: 6, group: 3 };
  if (number <= 86)
    return { x: number - 68, y: 6, period: 6, group: number - 68 };
  if (number <= 88) return linearPosition(number, 86, 7);
  if (number <= 103) return { x: number - 86, y: 10, period: 7, group: 3 };
  return { x: number - 100, y: 7, period: 7, group: number - 100 };
}

function linearPosition(number, offset, period) {
  const group = number - offset;
  return { x: group, y: period, period, group };
}

function orbitalBlock(number, group) {
  if ((number >= 57 && number <= 71) || (number >= 89 && number <= 103))
    return "f";
  if (number === 2 || group <= 2) return "s";
  if (group >= 13) return "p";
  return "d";
}

function elementalFamily(number, providerFamily) {
  if (number >= 57 && number <= 71) return "lanthanide";
  if (number >= 89 && number <= 103) return "actinide";
  return (providerFamily ?? "Unknown family").toLocaleLowerCase();
}

function required(value, label) {
  if (!value) throw new Error(`PubChem element row is missing ${label}`);
  return value;
}

function integer(value) {
  const result = Number.parseInt(value ?? "", 10);
  if (!Number.isInteger(result))
    throw new Error("PubChem element row has an invalid atomic number");
  return result;
}

function decimal(value) {
  const result = Number.parseFloat(value ?? "");
  if (!Number.isFinite(result))
    throw new Error("PubChem element row has an invalid atomic mass");
  return result;
}

function optionalDecimal(value) {
  if (!value) return undefined;
  const result = Number.parseFloat(value);
  return Number.isFinite(result) ? result : undefined;
}

function clean(value) {
  const result = typeof value === "string" ? value.trim() : "";
  return result || undefined;
}
