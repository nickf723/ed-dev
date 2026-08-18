import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "social",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const LAW_CURRICULUM: CurriculumNode = {
  id: "social.law",
  label: "Law",
  href: "/social-science/law",
  description:
    "Study legal institutions, rules, rights, procedures, reasoning, remedies, authority, interpretation, and the social systems through which law is created, contested, applied, and changed.",
  domainId: "social",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "social.law.jurisprudence",
      "Jurisprudence & Legal Systems",
      "/social-science/law/jurisprudence",
      "Legal authority, legitimacy, interpretation, rights, duties, justice, legal traditions, institutions, and competing theories about what law is and how it should operate.",
    ),
    branch(
      "social.law.constitutional",
      "Constitutional & Public Law",
      "/social-science/law/constitutional",
      "Constitutional structure, powers, rights, judicial review, federalism, public institutions, and legal constraints on government action.",
    ),
    branch(
      "social.law.criminal",
      "Criminal Law & Procedure",
      "/social-science/law/criminal",
      "Offenses, culpability, defenses, investigation, prosecution, adjudication, punishment, procedural rights, evidence questions, and the institutions of criminal justice.",
    ),
    branch(
      "social.law.civil-procedure",
      "Civil Procedure & Remedies",
      "/social-science/law/civil-procedure",
      "Jurisdiction, pleadings, discovery, motions, trial, appeal, judgments, injunctions, damages, and the procedural architecture of civil disputes.",
    ),
    branch(
      "social.law.private",
      "Private Law",
      "/social-science/law/private",
      "Contracts, torts, property, obligations, liability, ownership, transactions, compensation, and legal relationships among private parties.",
    ),
    branch(
      "social.law.administrative",
      "Administrative & Regulatory Law",
      "/social-science/law/administrative",
      "Agencies, rulemaking, adjudication, delegated authority, regulation, enforcement, review, public administration, and the legal design of regulatory institutions.",
    ),
    branch(
      "social.law.international-comparative",
      "International & Comparative Law",
      "/social-science/law/international-comparative",
      "Treaties, international institutions, jurisdiction across borders, legal traditions, comparative institutions, human rights, conflict of laws, and transnational legal problems.",
    ),
    branch(
      "social.law.method",
      "Courts, Evidence & Legal Method",
      "/social-science/law/method",
      "Cases, statutes, regulations, precedent, standards of review, evidence, legal research, argument, interpretation, and the methods used to reason from legal authority.",
    ),
  ],
};
