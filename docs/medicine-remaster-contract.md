# Medicine Root Remaster Contract

## Page job

`/applied-science/medicine` is a field hub and compact orientation lesson. Its
primary job is to help a learner locate a medical question among ten direct
fields while keeping patient context, clinical uncertainty, evidence, action,
ethics, and follow-up connected.

The page should leave one durable model:

> Medicine builds a revisable account from a person's context and observed
> findings, uses evidence to compare explanations and actions, and continues
> reasoning through response and follow-up.

The route is educational and never presents its fictional case, scores, test
table, or source records as individual medical advice.

## Preservation inventory

The remaster preserves:

- the deterministic pulse-and-reasoning background;
- the fictional evidence-packet and working-hypothesis laboratory;
- the conceptual body-system lens;
- the active Anatomy & Physiology child and its active Skeletal descendant;
- all ten existing direct Medicine branches;
- the dark teal clinical-record identity.

The pass replaces a narrow 245px branch sidebar with full-width primary
navigation so long field names, descriptions, status, and relationship cues
remain readable. It does not introduce a live patient record, symptom checker,
diagnosis generator, treatment selector, or render-time medical-data request.

## Ontology

The exact direct branches are:

1. Anatomy & Physiology;
2. Pathology & Disease Mechanisms;
3. Diagnostics & Laboratory Medicine;
4. Pharmacology & Therapeutics;
5. Surgery & Procedures;
6. Clinical Reasoning & Evidence;
7. Medical Specialties;
8. Emergency & Critical Care;
9. Primary & Longitudinal Care;
10. Medical Ethics & Professionalism.

Anatomy & Physiology is active. The other nine fields remain planned and inert
because their destination pages do not yet exist. Four visual bands—structure
and mechanism, evidence and explanation, intervention and response, and
settings and commitments—are explicitly task groupings, not hidden curriculum
parents.

## Learning and assessment contract

The hub proceeds through:

1. registry-owned direct-child navigation;
2. the preserved Observe → Interpret → Test → Act → Monitor laboratory;
3. four clinical-reasoning guardrails;
4. a deterministic four-case evidence review;
5. educational and source boundaries.

The evidence review tests:

- sensitivity from the condition-positive row: `90 / (90 + 10) = 90.0%`;
- positive predictive value from the positive-test column:
  `90 / (90 + 45) = 66.7%`;
- the difference between a registered or recruiting study record and evidence
  of safety, effectiveness, completion, approval, or appropriateness;
- follow-up as a plan with goals, possible harms, measures, timing, and rules
  for continuing, changing, escalating, or stopping care.

The numerical table is a fixed teaching sample. It demonstrates denominator
choice and does not describe a real test, disease, prevalence, patient,
diagnosis, prognosis, or treatment decision.

## Representation parity

`medicineModel.ts` owns the exact direct-branch order, five reasoning stages,
five fictional evidence packets, three anonymous hypotheses, support
calculation, fixed diagnostic table, arithmetic functions, and assessment
fixtures. `PulseBackground.tsx` consumes the same reasoning-stage model as the
interactive laboratory.

Duplicate evidence keys are counted once. No random number, current time,
viewport size, post-hydration drawing, or fake live clinical result participates
in the initial render. The route is server-owned; only the two bounded labs and
evidence review hydrate.

## Vocabulary ownership

The Medicine root owns six concepts taught across the page:

- Medicine;
- Clinical Encounter;
- Clinical Problem Representation;
- Clinical Uncertainty;
- Benefit–Harm Balance;
- Clinical Follow-Up.

The nine narrower planned branches own 20 additional terms. Anatomy &
Physiology owns seven and its active Skeletal child owns six, producing 39
unique terms in the Medicine subtree. Stable legacy IDs for Etiology,
Pathogenesis, Diagnosis, Apoptosis, and Pathogen remain unique and move to their
narrowest current branch. Curriculum containment aggregates all terms into
Medicine and Applied Science with source-node provenance.

## Source and future repository boundary

The root performs no render-time provider request. It links three official
interfaces and defines future adapters:

- [ClinicalTrials.gov API](https://clinicaltrials.gov/data-api/api) for
  versioned submitted study records, recruitment status, design, locations,
  and posted results where present;
- [openFDA Drug Label API](https://open.fda.gov/apis/drug/label/) for submitted
  Structured Product Label sections and identifiers;
- [NCBI E-utilities](https://www.ncbi.nlm.nih.gov/home/develop/api/) for PubMed,
  PMC, and other Entrez search, summary, identifier, and record workflows.

A future normalized record must preserve provider and record identifiers,
source URL, retrieval time, version or last-update context, query and fields,
pagination, and source-specific provenance. A study registration, submitted
label, bibliographic record, abstract, evidence synthesis, regulatory decision,
and clinical recommendation remain distinct record types. Provider failure may
never be disguised as a successful live repository, and technical access may
never be presented as medical advice.

## Verification contract

Automated checks cover:

- exact ten-branch order and one-active/nine-planned status;
- the five-stage loop, five evidence packets, deduplicated selection, and fixed
  support fixtures;
- exact sample totals, sensitivity, specificity, predictive value, invalid
  inputs, and formatted output;
- four evidence cases and every answer path;
- 39 unique vocabulary terms, stable-ID preservation, and direct-child
  aggregation;
- generated HTML ancestry, live/planned behavior, model values, assessment,
  source links, vocabulary, safety copy, and absence of canvas, randomness, or
  animation-loop markers;
- TypeScript, touched-file lint, formatting, repository audits, and production
  build.

Rendered desktop, narrower desktop, mobile, keyboard, zoom, reasoning-stage,
evidence-packet, system-lens, and assessment states remain in the visual-
verification queue while the workspace browser/server limitation persists.
