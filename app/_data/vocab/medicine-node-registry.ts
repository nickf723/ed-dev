import { anatomyPhysiologyVocab } from "./a/anatomy-physiology";
import { medicineCoreVocab } from "./m/medicine";
import {
  medicineAcuteCareVocab,
  medicineClinicalReasoningVocab,
  medicineDiagnosticsVocab,
  medicineEthicsVocab,
  medicineLongitudinalCareVocab,
  medicinePathologyVocab,
  medicinePharmacologyVocab,
  medicineProceduresVocab,
  medicineSpecialtiesVocab,
} from "./m/medicine-branches";
import { skeletalSystemVocab } from "./s/skeletal-system";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

/**
 * Medicine terms are owned by the narrowest active curriculum node that
 * teaches them. Parent scopes are derived from curriculum containment.
 */
export const MEDICINE_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "applied.medicine",
    terms: medicineCoreVocab,
  },
  {
    nodeId: "applied.medicine.anatomy-physiology",
    terms: anatomyPhysiologyVocab,
  },
  { nodeId: "applied.medicine.pathology", terms: medicinePathologyVocab },
  {
    nodeId: "applied.medicine.diagnostics",
    terms: medicineDiagnosticsVocab,
  },
  {
    nodeId: "applied.medicine.pharmacology",
    terms: medicinePharmacologyVocab,
  },
  {
    nodeId: "applied.medicine.surgery-procedures",
    terms: medicineProceduresVocab,
  },
  {
    nodeId: "applied.medicine.clinical-reasoning",
    terms: medicineClinicalReasoningVocab,
  },
  {
    nodeId: "applied.medicine.specialties",
    terms: medicineSpecialtiesVocab,
  },
  {
    nodeId: "applied.medicine.acute-care",
    terms: medicineAcuteCareVocab,
  },
  {
    nodeId: "applied.medicine.longitudinal-care",
    terms: medicineLongitudinalCareVocab,
  },
  {
    nodeId: "applied.medicine.ethics-professionalism",
    terms: medicineEthicsVocab,
  },
  {
    nodeId: "applied.medicine.anatomy-physiology.skeletal",
    terms: skeletalSystemVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
