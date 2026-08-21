import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status: "placeholder",
    pageKind: children?.length ? "hub" : "unit",
    children,
  };
}

export const INFORMATION_SCIENCE_CURRICULUM: CurriculumNode = {
  id: "formal.information-science",
  label: "Information Science",
  href: "/formal-science/information-science",
  description:
    "Study how information is represented, measured, organized, described, preserved, retrieved, related, evaluated, and used across technical and human information systems.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.information-science.information-theory",
      "Information Theory & Coding",
      "/formal-science/information-science/information-theory",
      "Entropy, uncertainty, coding, compression, redundancy, channels, noise, error correction, mutual information, and mathematical limits on communication and representation.",
    ),
    branch(
      "formal.information-science.encoding-representation",
      "Encoding & Representation",
      "/formal-science/information-science/encoding-representation",
      "Symbols, character encodings, formats, schemas, serialization, identifiers, data models, representation choices, interoperability, and the gap between a thing and its encoded description.",
      [
        branch(
          "formal.information-science.metadata-semantics",
          "Metadata & Semantics",
          "/formal-science/information-science/metadata-semantics",
          "Descriptive, structural, administrative, provenance, and preservation metadata; semantic models; standards; identifiers; context; and machine-readable meaning.",
        ),
      ],
    ),
    branch(
      "formal.information-science.information-retrieval",
      "Information Retrieval & Search",
      "/formal-science/information-science/information-retrieval",
      "Indexing, queries, ranking, relevance, lexical and semantic retrieval, vector spaces, evaluation, recommendation, and the tradeoffs involved in finding useful information.",
    ),
    {
      id: "formal.information-science.taxonomy-ontology",
      label: "Taxonomy & Ontology",
      href: "/formal-science/information-science/taxonomy-ontology",
      description:
        "Classification, controlled vocabularies, taxonomies, ontologies, entity types, relationships, constraints, inheritance, and ways of making conceptual structure explicit.",
      domainId: "formal",
      status: "active",
      pageKind: "hub",
      children: [
        branch(
          "formal.information-science.knowledge-graphs",
          "Knowledge Graphs & Linked Data",
          "/formal-science/information-science/knowledge-graphs",
          "Entities, relationships, graph models, linked data, semantic queries, provenance, identity resolution, inference, and networks of structured knowledge.",
        ),
      ],
    },
    branch(
      "formal.information-science.archives-preservation",
      "Archives & Digital Preservation",
      "/formal-science/information-science/archives-preservation",
      "Selection, provenance, authenticity, fixity, storage, migration, emulation, preservation metadata, access, retention, and long-term stewardship of records and digital objects.",
    ),
    branch(
      "formal.information-science.information-behavior",
      "Information Behavior & Interaction",
      "/formal-science/information-science/information-behavior",
      "How people seek, avoid, evaluate, interpret, organize, share, and use information, including interfaces, context, accessibility, uncertainty, trust, and information practices.",
    ),
    branch(
      "formal.information-science.bibliometrics",
      "Bibliometrics & Science of Science",
      "/formal-science/information-science/bibliometrics",
      "Publication and citation networks, indicators, scholarly communication, collaboration, field structure, research evaluation, measurement bias, and quantitative study of knowledge production.",
    ),
  ],
};
