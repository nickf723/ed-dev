import assert from "node:assert/strict";
import {
  normalizePubChemPeriodicTable,
  periodicPosition,
} from "../lib/collections/providers/pubchem-elements.mjs";

assert.deepEqual(periodicPosition(1), { x: 1, y: 1, period: 1, group: 1 });
assert.deepEqual(periodicPosition(2), { x: 18, y: 1, period: 1, group: 18 });
assert.deepEqual(periodicPosition(57), { x: 3, y: 9, period: 6, group: 3 });
assert.deepEqual(periodicPosition(72), { x: 4, y: 6, period: 6, group: 4 });
assert.deepEqual(periodicPosition(118), { x: 18, y: 7, period: 7, group: 18 });
assert.throws(() => periodicPosition(119), /1 to 118/);

const payload = {
  Table: {
    Columns: {
      Column: [
        "AtomicNumber",
        "Symbol",
        "Name",
        "AtomicMass",
        "ElectronConfiguration",
        "Electronegativity",
        "StandardState",
        "GroupBlock",
        "YearDiscovered",
      ],
    },
    Row: [
      {
        Cell: [
          "2",
          "He",
          "Helium",
          "4.00260",
          "1s2",
          "",
          "Gas",
          "Noble gas",
          "1868",
        ],
      },
      {
        Cell: [
          "1",
          "H",
          "Hydrogen",
          "1.0080",
          "1s1",
          "2.2",
          "Gas",
          "Nonmetal",
          "1766",
        ],
      },
    ],
  },
};
const records = normalizePubChemPeriodicTable(payload);
assert.deepEqual(
  records.map((record) => record.number),
  [1, 2]
);
assert.equal(records[0].electronegativity, 2.2);
assert.equal(records[1].electronegativity, undefined);
assert.equal(records[1].category, "noble gas");
assert.equal(records[1].source, "PubChem");

console.log("PubChem element adapter tests passed");
