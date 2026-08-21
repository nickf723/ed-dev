import type {
  CurriculumNode,
  CurriculumPageKind,
} from "@/lib/curriculum/types";

function planned(
  id: string,
  label: string,
  href: string,
  description: string,
  pageKind: CurriculumPageKind = "unit"
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "applied",
    status: "placeholder",
    pageKind,
  };
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
      description:
        "Connect structure and function across cells, tissues, organs, and interacting body systems as a foundation for clinical reasoning.",
      domainId: "applied",
      status: "active",
      pageKind: "unit",
      children: [
        planned(
          "applied.medicine.anatomy-physiology.organization-language",
          "Body Organization & Anatomical Language",
          "/applied-science/medicine/anatomy-physiology/organization-language",
          "Move from chemical components through cells, tissues, organs, organ systems, and the organism while learning the regional and directional language used to locate human structures.",
          "lesson"
        ),
        planned(
          "applied.medicine.anatomy-physiology.homeostasis",
          "Homeostasis & Feedback",
          "/applied-science/medicine/anatomy-physiology/homeostasis",
          "Explain how receptors, control centers, effectors, and feedback loops keep physiological variables within useful ranges rather than perfectly constant.",
          "lesson"
        ),
        planned(
          "applied.medicine.anatomy-physiology.integumentary",
          "Integumentary System",
          "/applied-science/medicine/anatomy-physiology/integumentary",
          "Study skin and its appendages as a dynamic boundary for protection, sensation, temperature regulation, and interaction with the environment."
        ),
        {
          id: "applied.medicine.anatomy-physiology.skeletal",
          label: "Skeletal System",
          href: "/applied-science/medicine/anatomy-physiology/skeletal",
          description:
            "Study living bone, cartilage, joints, axial and appendicular organization, support, protection, leverage, mineral balance, marrow, and remodeling.",
          domainId: "applied",
          status: "active",
          pageKind: "unit",
        },
        planned(
          "applied.medicine.anatomy-physiology.muscular",
          "Muscular System",
          "/applied-science/medicine/anatomy-physiology/muscular",
          "Connect skeletal muscle architecture, contraction, force, leverage, posture, movement, and heat production across joints and regions."
        ),
        planned(
          "applied.medicine.anatomy-physiology.nervous",
          "Nervous System",
          "/applied-science/medicine/anatomy-physiology/nervous",
          "Study how neural structures detect change, integrate information, generate rapid responses, and coordinate sensation, movement, and organ function."
        ),
        planned(
          "applied.medicine.anatomy-physiology.endocrine",
          "Endocrine System",
          "/applied-science/medicine/anatomy-physiology/endocrine",
          "Study glands, hormones, receptors, and slower distributed control of metabolism, growth, stress responses, reproduction, and homeostasis."
        ),
        planned(
          "applied.medicine.anatomy-physiology.cardiovascular",
          "Cardiovascular System",
          "/applied-science/medicine/anatomy-physiology/cardiovascular",
          "Connect the heart, blood, vessels, pressure, flow, and exchange to the transport needs of every living tissue."
        ),
        planned(
          "applied.medicine.anatomy-physiology.lymphatic-immune",
          "Lymphatic & Immune System",
          "/applied-science/medicine/anatomy-physiology/lymphatic-immune",
          "Study fluid return, lymphatic vessels and organs, immune surveillance, defense, and their close relationship with circulation and tissue spaces."
        ),
        planned(
          "applied.medicine.anatomy-physiology.respiratory",
          "Respiratory System",
          "/applied-science/medicine/anatomy-physiology/respiratory",
          "Connect airways, ventilation, alveolar exchange, blood transport, and neural and chemical regulation of breathing."
        ),
        planned(
          "applied.medicine.anatomy-physiology.digestive",
          "Digestive System",
          "/applied-science/medicine/anatomy-physiology/digestive",
          "Trace ingestion, mechanical and chemical digestion, absorption, motility, accessory-organ contributions, and elimination of undigested material."
        ),
        planned(
          "applied.medicine.anatomy-physiology.urinary",
          "Urinary System",
          "/applied-science/medicine/anatomy-physiology/urinary",
          "Study kidneys and urinary passages as a system for filtration, excretion, fluid and electrolyte balance, acid-base regulation, and blood-pressure control."
        ),
        planned(
          "applied.medicine.anatomy-physiology.reproductive",
          "Reproductive System",
          "/applied-science/medicine/anatomy-physiology/reproductive",
          "Study gamete production, reproductive anatomy, endocrine coordination, fertilization, pregnancy, development, and lactation with appropriate anatomical variation and context."
        ),
      ],
    },
    planned(
      "applied.medicine.pathology",
      "Pathology & Disease Mechanisms",
      "/applied-science/medicine/pathology",
      "Study how injury, infection, inflammation, degeneration, neoplasia, genetic variation, immune dysfunction, and other mechanisms alter tissues and organ systems."
    ),
    planned(
      "applied.medicine.diagnostics",
      "Diagnostics & Laboratory Medicine",
      "/applied-science/medicine/diagnostics",
      "Use history, examination, laboratory testing, imaging, pathology, monitoring, test characteristics, and pretest context to reduce uncertainty without treating a result as a diagnosis by itself."
    ),
    planned(
      "applied.medicine.pharmacology",
      "Pharmacology & Therapeutics",
      "/applied-science/medicine/pharmacology",
      "Study drug targets, dose-response relationships, pharmacokinetics, pharmacodynamics, interactions, adverse effects, treatment goals, and monitoring."
    ),
    planned(
      "applied.medicine.surgery-procedures",
      "Surgery & Procedures",
      "/applied-science/medicine/surgery-procedures",
      "Study procedural indications, anatomy, technique, anesthesia, sterile practice, perioperative care, complications, recovery, and risk-benefit decisions."
    ),
    planned(
      "applied.medicine.clinical-reasoning",
      "Clinical Reasoning & Evidence",
      "/applied-science/medicine/clinical-reasoning",
      "Build and revise problem representations, differential diagnoses, test strategies, treatment hypotheses, and follow-up plans while tracking uncertainty and evidence quality."
    ),
    planned(
      "applied.medicine.specialties",
      "Medical Specialties",
      "/applied-science/medicine/specialties",
      "Explore how specialties organize expertise around organ systems, life stages, settings, procedures, disease families, and patterns of care."
    ),
    planned(
      "applied.medicine.acute-care",
      "Emergency & Critical Care",
      "/applied-science/medicine/acute-care",
      "Study time-sensitive assessment, stabilization, prioritization, monitoring, resuscitation systems, escalation, and handoff in acute illness and injury."
    ),
    planned(
      "applied.medicine.longitudinal-care",
      "Primary & Longitudinal Care",
      "/applied-science/medicine/longitudinal-care",
      "Study prevention, screening, chronic-disease management, multimorbidity, medication review, continuity, shared decisions, and care across time."
    ),
    planned(
      "applied.medicine.ethics-professionalism",
      "Medical Ethics & Professionalism",
      "/applied-science/medicine/ethics-professionalism",
      "Study informed consent, capacity, confidentiality, uncertainty, conflicts of interest, equity, professional duties, communication, and ethical reasoning in patient care."
    ),
  ],
};
