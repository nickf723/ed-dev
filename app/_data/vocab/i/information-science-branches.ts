import type { VocabTerm } from "../types";

export const encodingRepresentationVocab: VocabTerm[] = [
  { id: "info-representation", word: "Representation", definition: "A stand-in that preserves selected distinctions of an object, event, idea, or signal in a form a system can handle.", domain: "Encoding & Representation", tags: ["Model", "Symbols"], relatedTerms: ["info-encoding"], isAdult: false },
  { id: "info-encoding", word: "Encoding", definition: "A rule-governed mapping between information and symbols or signals used for storage, processing, or communication.", domain: "Encoding & Representation", tags: ["Symbols", "Mapping"], relatedTerms: ["info-representation", "info-code"], isAdult: false },
  { id: "info-schema", word: "Schema", definition: "A formal specification of allowed fields, types, structures, relationships, and constraints in represented data.", domain: "Encoding & Representation", tags: ["Structure", "Constraints"], relatedTerms: ["info-metadata"], isAdult: false },
  { id: "info-serialization", word: "Serialization", definition: "The conversion of structured information into a sequence or format that can be stored or transmitted and later reconstructed.", domain: "Encoding & Representation", tags: ["Formats", "Transmission"], relatedTerms: ["info-encoding"], isAdult: false },
  { id: "info-interoperability", word: "Interoperability", definition: "The capacity of different systems or communities to exchange information and interpret it consistently enough for a shared task.", domain: "Encoding & Representation", tags: ["Standards", "Exchange"], relatedTerms: ["info-schema"], isAdult: false },
];

export const metadataSemanticsVocab: VocabTerm[] = [
  { id: "info-metadata", word: "Metadata", definition: "Structured information that describes another resource, such as its creator, date, format, subject, provenance, rights, or location.", domain: "Metadata & Semantics", tags: ["Description", "Context"], relatedTerms: ["info-schema", "info-provenance"], isAdult: false },
  { id: "info-descriptive-metadata", word: "Descriptive Metadata", definition: "Metadata intended to support identification, discovery, selection, and interpretation of a resource.", domain: "Metadata & Semantics", tags: ["Discovery", "Description"], relatedTerms: ["info-metadata"], isAdult: false },
  { id: "info-administrative-metadata", word: "Administrative Metadata", definition: "Metadata used to manage a resource, including rights, technical, source, and preservation information.", domain: "Metadata & Semantics", tags: ["Management", "Rights"], relatedTerms: ["info-metadata", "info-preservation-metadata"], isAdult: false },
  { id: "info-semantics", word: "Semantics", definition: "The meaning assigned to symbols, fields, statements, and relationships within an interpretive or formal system.", domain: "Metadata & Semantics", tags: ["Meaning", "Interpretation"], relatedTerms: ["info-context"], isAdult: false },
];

export const informationRetrievalVocab: VocabTerm[] = [
  { id: "info-retrieval", word: "Information Retrieval", definition: "The process of representing, finding, ranking, and evaluating information in response to a query or information need.", domain: "Information Retrieval", tags: ["Search", "Relevance"], relatedTerms: ["info-index", "info-relevance"], isAdult: false },
  { id: "info-index", word: "Index", definition: "A structure that records features and locations of information so a collection can be searched more efficiently.", domain: "Information Retrieval", tags: ["Search", "Structure"], relatedTerms: ["info-retrieval"], isAdult: false },
  { id: "info-query", word: "Query", definition: "A structured expression of a request submitted to an information system.", domain: "Information Retrieval", tags: ["Search", "Interaction"], relatedTerms: ["info-information-need"], isAdult: false },
  { id: "info-relevance", word: "Relevance", definition: "The degree to which a result helps satisfy an information need in a particular task and context.", domain: "Information Retrieval", tags: ["Evaluation", "Use"], relatedTerms: ["info-precision", "info-recall"], isAdult: false },
  { id: "info-precision", word: "Precision", definition: "The proportion of retrieved results judged relevant under a stated evaluation rule.", domain: "Information Retrieval", tags: ["Metric", "Evaluation"], relatedTerms: ["info-recall"], isAdult: false },
  { id: "info-recall", word: "Recall", definition: "The proportion of all relevant items in the evaluated collection that a retrieval system successfully returns.", domain: "Information Retrieval", tags: ["Metric", "Coverage"], relatedTerms: ["info-precision"], isAdult: false },
  { id: "info-ranking", word: "Ranking", definition: "The ordering of candidate results by a stated score, rule, or model.", domain: "Information Retrieval", tags: ["Ordering", "Model"], relatedTerms: ["info-relevance"], isAdult: false },
];

export const taxonomyOntologyVocab: VocabTerm[] = [
  { id: "info-classification", word: "Classification", definition: "The assignment or arrangement of entities into categories according to stated distinctions and purposes.", domain: "Taxonomy & Ontology", tags: ["Organization", "Categories"], relatedTerms: ["info-taxonomy"], isAdult: false },
  { id: "info-taxonomy", word: "Taxonomy", definition: "A controlled hierarchical arrangement of concepts or categories, usually expressed through broader and narrower relationships.", domain: "Taxonomy & Ontology", tags: ["Hierarchy", "Organization"], relatedTerms: ["info-classification", "info-ontology"], isAdult: false },
  { id: "info-ontology", word: "Ontology", definition: "An explicit formal account of entity types, relationships, properties, and constraints within a domain of discourse.", domain: "Taxonomy & Ontology", tags: ["Semantics", "Relations"], relatedTerms: ["info-taxonomy", "info-triple"], isAdult: false },
  { id: "info-controlled-vocabulary", word: "Controlled Vocabulary", definition: "An authorized set of terms used consistently for description, indexing, or retrieval within a system.", domain: "Taxonomy & Ontology", tags: ["Terms", "Consistency"], relatedTerms: ["info-taxonomy"], isAdult: false },
  { id: "info-facet", word: "Facet", definition: "An independent descriptive dimension whose values can be combined to filter or organize a collection.", domain: "Taxonomy & Ontology", tags: ["Filtering", "Dimensions"], relatedTerms: ["info-classification"], isAdult: false },
];

export const knowledgeGraphsVocab: VocabTerm[] = [
  { id: "info-knowledge-graph", word: "Knowledge Graph", definition: "A graph-structured collection of entities, relationships, and assertions designed for linking, querying, and reuse.", domain: "Knowledge Graphs", tags: ["Graph", "Entities"], relatedTerms: ["info-triple", "info-ontology"], isAdult: false },
  { id: "info-triple", word: "Triple", definition: "A subject–predicate–object statement that represents a relationship in graph data models such as RDF.", domain: "Knowledge Graphs", tags: ["RDF", "Statement"], relatedTerms: ["info-knowledge-graph"], isAdult: false },
  { id: "info-linked-data", word: "Linked Data", definition: "A practice of identifying and connecting data on the web through resolvable identifiers and graph statements.", domain: "Knowledge Graphs", tags: ["Web", "Interoperability"], relatedTerms: ["info-triple"], isAdult: false },
  { id: "info-entity-resolution", word: "Entity Resolution", definition: "The process of deciding whether different records or identifiers refer to the same real or conceptual entity.", domain: "Knowledge Graphs", tags: ["Identity", "Matching"], relatedTerms: ["info-identity"], isAdult: false },
];

export const archivesPreservationVocab: VocabTerm[] = [
  { id: "info-archive", word: "Archive", definition: "A body of records preserved because of their continuing evidential, informational, legal, cultural, or institutional value.", domain: "Archives & Preservation", tags: ["Records", "Stewardship"], relatedTerms: ["info-record"], isAdult: false },
  { id: "info-authenticity", word: "Authenticity", definition: "The supported claim that a record is what it purports to be and has not been misleadingly altered.", domain: "Archives & Preservation", tags: ["Trust", "Evidence"], relatedTerms: ["info-fixity"], isAdult: false },
  { id: "info-fixity", word: "Fixity", definition: "Evidence that the bit content of a digital object has remained unchanged, often checked with a cryptographic digest.", domain: "Archives & Preservation", tags: ["Integrity", "Verification"], relatedTerms: ["info-authenticity"], isAdult: false },
  { id: "info-preservation-metadata", word: "Preservation Metadata", definition: "Information a repository records to support the long-term understandability, authenticity, viability, and management of digital materials.", domain: "Archives & Preservation", tags: ["Metadata", "Stewardship"], relatedTerms: ["info-administrative-metadata"], isAdult: false },
  { id: "info-migration", word: "Migration", definition: "The managed transfer of digital content to a newer format, system, or storage environment while preserving significant properties.", domain: "Archives & Preservation", tags: ["Change", "Formats"], relatedTerms: ["info-emulation"], isAdult: false },
  { id: "info-emulation", word: "Emulation", definition: "The recreation of an older computing environment so software or digital objects can be experienced without rewriting their original behavior.", domain: "Archives & Preservation", tags: ["Software", "Preservation"], relatedTerms: ["info-migration"], isAdult: false },
];

export const informationBehaviorVocab: VocabTerm[] = [
  { id: "info-information-need", word: "Information Need", definition: "A recognized or emerging gap between what a person knows and what a situation requires them to understand or do.", domain: "Information Behavior", tags: ["Users", "Context"], relatedTerms: ["info-query"], isAdult: false },
  { id: "info-information-seeking", word: "Information Seeking", definition: "The situated practices through which people look for, encounter, avoid, evaluate, and use information.", domain: "Information Behavior", tags: ["Users", "Practice"], relatedTerms: ["info-information-need"], isAdult: false },
  { id: "info-accessibility", word: "Information Accessibility", definition: "The extent to which people with differing abilities, languages, devices, and contexts can perceive, navigate, understand, and use information.", domain: "Information Behavior", tags: ["Access", "Users"], relatedTerms: ["info-information-seeking"], isAdult: false },
  { id: "info-trust", word: "Information Trust", definition: "A context-dependent judgment that information or its source is reliable enough for a particular purpose.", domain: "Information Behavior", tags: ["Evaluation", "Context"], relatedTerms: ["info-provenance"], isAdult: false },
];

export const bibliometricsVocab: VocabTerm[] = [
  { id: "info-bibliometrics", word: "Bibliometrics", definition: "The quantitative study of publications, citations, authorship, collaboration, and other traces of scholarly communication.", domain: "Bibliometrics", tags: ["Measurement", "Scholarship"], relatedTerms: ["info-citation"], isAdult: false },
  { id: "info-citation", word: "Citation", definition: "A structured reference connecting one work to another source it identifies, discusses, supports, disputes, or builds upon.", domain: "Bibliometrics", tags: ["Reference", "Network"], relatedTerms: ["info-bibliometrics"], isAdult: false },
  { id: "info-indicator", word: "Indicator", definition: "A measured quantity used as a proxy for a broader concept, whose interpretation depends on coverage, incentives, and validity.", domain: "Bibliometrics", tags: ["Metric", "Proxy"], relatedTerms: ["info-selection-bias"], isAdult: false },
  { id: "info-selection-bias", word: "Selection Bias", definition: "Systematic distortion caused when the records included in a collection or analysis differ consequentially from those excluded.", domain: "Bibliometrics", tags: ["Bias", "Coverage"], relatedTerms: ["info-coverage", "info-indicator"], isAdult: false },
];

export const informationScienceBranchVocab = [
  ...encodingRepresentationVocab,
  ...metadataSemanticsVocab,
  ...informationRetrievalVocab,
  ...taxonomyOntologyVocab,
  ...knowledgeGraphsVocab,
  ...archivesPreservationVocab,
  ...informationBehaviorVocab,
  ...bibliometricsVocab,
];
