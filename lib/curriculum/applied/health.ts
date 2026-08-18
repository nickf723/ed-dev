import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "applied", status: "placeholder", pageKind: "unit" };
}

export const HEALTH_SCIENCES_CURRICULUM: CurriculumNode = {
  id: "applied.health",
  label: "Health Sciences",
  href: "/applied-science/health",
  description:
    "Study health across people, professions, communities, settings, measurement systems, prevention, rehabilitation, diagnostics, information, and coordinated care without collapsing the field into medicine alone.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    planned("applied.health.nursing", "Nursing & Patient Care", "/applied-science/health/nursing", "Study assessment, monitoring, care planning, patient education, coordination, safety, symptom support, advocacy, and nursing practice across settings."),
    planned("applied.health.public-health", "Public Health & Prevention", "/applied-science/health/public-health", "Study prevention, health promotion, surveillance, community programs, policy implementation, risk communication, preparedness, and population-level health improvement."),
    planned("applied.health.epidemiology-biostatistics", "Epidemiology & Biostatistics", "/applied-science/health/epidemiology-biostatistics", "Measure health patterns, compare groups, evaluate associations and interventions, quantify uncertainty, and understand bias, confounding, sampling, and study design."),
    planned("applied.health.rehabilitation", "Rehabilitation Sciences", "/applied-science/health/rehabilitation", "Study function, mobility, activity, participation, adaptation, recovery, assistive strategies, and coordinated rehabilitation across physical and occupational contexts."),
    planned("applied.health.nutrition-dietetics", "Nutrition & Dietetics", "/applied-science/health/nutrition-dietetics", "Study nutrition assessment, food patterns, metabolism, dietary planning, counseling, food access, clinical nutrition, and population nutrition with attention to evidence and context."),
    planned("applied.health.diagnostic-sciences", "Diagnostic & Laboratory Sciences", "/applied-science/health/diagnostic-sciences", "Study specimen handling, laboratory measurement, imaging workflows, quality control, analytical uncertainty, safety, and the role of diagnostic professionals in care systems."),
    planned("applied.health.respiratory-care", "Respiratory & Cardiopulmonary Care", "/applied-science/health/respiratory-care", "Study cardiopulmonary monitoring, respiratory support technologies, testing workflows, rehabilitation, safety, and collaborative care without substituting for medical diagnosis."),
    planned("applied.health.community-environmental", "Community & Environmental Health", "/applied-science/health/community-environmental", "Study how housing, workplaces, air, water, heat, food environments, transportation, access, and community conditions shape health opportunities and risks."),
    planned("applied.health.informatics-systems", "Health Informatics & Health Systems", "/applied-science/health/informatics-systems", "Study records, data standards, workflows, quality improvement, decision support, scheduling, access, handoffs, interoperability, privacy, and system performance."),
    {
      id: "applied.health.specializations",
      label: "Health Professions Atlas",
      href: "/applied-science/health/specializations",
      description: "Survey specialized health professions, their scopes of practice, common settings, collaborative relationships, training pathways, and distinctive contributions.",
      domainId: "applied",
      status: "active",
      pageKind: "unit",
    },
  ],
};
