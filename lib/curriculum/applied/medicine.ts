import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "applied", status: "placeholder", pageKind: "unit" };
}

export const MEDICINE_CURRICULUM: CurriculumNode = {
  id: "applied.medicine",
  label: "Medicine",
  href: "/applied-science/medicine",
  description:
    "Study clinical reasoning, disease mechanisms, diagnosis, treatment, procedures, specialties, evidence, ethics, and longitudinal care while keeping patient context, uncertainty, benefit, harm, and follow-up visible.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    {
      id: "applied.medicine.anatomy-physiology",
      label: "Anatomy & Physiology",
      href: "/applied-science/medicine/anatomy-physiology",
      description: "Connect structure and function across cells, tissues, organs, and interacting body systems as a foundation for clinical reasoning.",
      domainId: "applied",
      status: "active",
      pageKind: "unit",
    },
    planned("applied.medicine.pathology", "Pathology & Disease Mechanisms", "/applied-science/medicine/pathology", "Study how injury, infection, inflammation, degeneration, neoplasia, genetic variation, immune dysfunction, and other mechanisms alter tissues and organ systems."),
    planned("applied.medicine.diagnostics", "Diagnostics & Laboratory Medicine", "/applied-science/medicine/diagnostics", "Use history, examination, laboratory testing, imaging, pathology, monitoring, test characteristics, and pretest context to reduce uncertainty without treating a result as a diagnosis by itself."),
    planned("applied.medicine.pharmacology", "Pharmacology & Therapeutics", "/applied-science/medicine/pharmacology", "Study drug targets, dose-response relationships, pharmacokinetics, pharmacodynamics, interactions, adverse effects, treatment goals, and monitoring."),
    planned("applied.medicine.surgery-procedures", "Surgery & Procedures", "/applied-science/medicine/surgery-procedures", "Study procedural indications, anatomy, technique, anesthesia, sterile practice, perioperative care, complications, recovery, and risk-benefit decisions."),
    planned("applied.medicine.clinical-reasoning", "Clinical Reasoning & Evidence", "/applied-science/medicine/clinical-reasoning", "Build and revise problem representations, differential diagnoses, test strategies, treatment hypotheses, and follow-up plans while tracking uncertainty and evidence quality."),
    planned("applied.medicine.specialties", "Medical Specialties", "/applied-science/medicine/specialties", "Explore how specialties organize expertise around organ systems, life stages, settings, procedures, disease families, and patterns of care."),
    planned("applied.medicine.acute-care", "Emergency & Critical Care", "/applied-science/medicine/acute-care", "Study time-sensitive assessment, stabilization, prioritization, monitoring, resuscitation systems, escalation, and handoff in acute illness and injury."),
    planned("applied.medicine.longitudinal-care", "Primary & Longitudinal Care", "/applied-science/medicine/longitudinal-care", "Study prevention, screening, chronic-disease management, multimorbidity, medication review, continuity, shared decisions, and care across time."),
    planned("applied.medicine.ethics-professionalism", "Medical Ethics & Professionalism", "/applied-science/medicine/ethics-professionalism", "Study informed consent, capacity, confidentiality, uncertainty, conflicts of interest, equity, professional duties, communication, and ethical reasoning in patient care."),
  ],
};
