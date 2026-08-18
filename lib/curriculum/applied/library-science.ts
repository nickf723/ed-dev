import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "applied", status: "placeholder", pageKind: "unit" };
}

export const LIBRARY_SCIENCE_CURRICULUM: CurriculumNode = {
  id: "applied.library-science",
  label: "Library Science",
  href: "/applied-science/library-science",
  description:
    "Study how libraries and related institutions select, describe, organize, preserve, provide access to, teach with, and steward collections and information services across communities, formats, technologies, rights, and time.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    planned("applied.library-science.cataloging-metadata", "Cataloging & Metadata", "/applied-science/library-science/cataloging-metadata", "Describe resources through identifiers, names, titles, subjects, relationships, formats, editions, authority control, metadata standards, and records that support discovery and management."),
    planned("applied.library-science.classification-organization", "Classification & Knowledge Organization", "/applied-science/library-science/classification-organization", "Study classification schemes, subject vocabularies, arrangement, notation, facets, browsing structures, bias in organizational systems, and how users navigate collections."),
    planned("applied.library-science.collection-development", "Collection Development & Acquisitions", "/applied-science/library-science/collection-development", "Select, license, acquire, evaluate, retain, deselect, and document resources in relation to community needs, budgets, missions, formats, access, and stewardship obligations."),
    planned("applied.library-science.reference-services", "Reference & Information Services", "/applied-science/library-science/reference-services", "Clarify information needs, choose search strategies and sources, support research, make referrals, teach discovery skills, and provide service without confusing assistance with authority over a user's question."),
    planned("applied.library-science.archives-special-collections", "Archives & Special Collections", "/applied-science/library-science/archives-special-collections", "Study provenance, original order, appraisal, arrangement, description, finding aids, donor or community relationships, access restrictions, rare materials, and special-collections stewardship."),
    planned("applied.library-science.preservation-conservation", "Preservation & Conservation", "/applied-science/library-science/preservation-conservation", "Reduce deterioration and loss through environmental control, housing, handling, conservation treatment, disaster planning, reformatting, digital preservation, documentation, and prioritization."),
    planned("applied.library-science.digital-libraries", "Digital Libraries & Repositories", "/applied-science/library-science/digital-libraries", "Build and sustain digital collections through ingest, metadata, storage, fixity, formats, migration, interfaces, identifiers, rights management, preservation planning, and interoperable repositories."),
    planned("applied.library-science.information-literacy", "Information Literacy & Instruction", "/applied-science/library-science/information-literacy", "Teach people to frame questions, search strategically, evaluate sources and evidence, understand information systems, cite responsibly, recognize uncertainty, and participate critically in information environments."),
    planned("applied.library-science.management-community", "Library Management & Community Services", "/applied-science/library-science/management-community", "Study staffing, spaces, programs, outreach, budgeting, policies, assessment, partnerships, accessibility, technology, governance, and service design in relation to a library's communities and mission."),
    planned("applied.library-science.ethics-access", "Ethics, Access & Intellectual Freedom", "/applied-science/library-science/ethics-access", "Study privacy, confidentiality, intellectual freedom, censorship pressures, copyright, accessibility, cultural stewardship, community authority, equitable access, and ethical tensions in information institutions."),
  ],
};
