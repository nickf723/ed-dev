# Chemistry Remaster Contract

## Identity and rotation role

Chemistry is a Natural Science navigation hub, reference collection, and introductory lesson about elemental identity, molecular and material arrangement, reaction bookkeeping, measurement, and laboratory boundaries. It follows Economics to change academic world, visual grammar, model language, and assessment style. The page should feel like a representation bench: the learner moves among element records, particle models, symbolic equations, measured properties, and safety decisions without silently treating those views as interchangeable.

The page must not reduce chemistry to colorful atoms, present a ball-and-stick model as literal scale, imply that a balanced equation specifies mechanism or safety, treat a periodic-table value as condition-free truth, identify an unknown by appearance, or make casual handling and disposal recommendations.

## Bounded direct-child ontology

Chemistry owns seven direct branches:

1. General Chemistry
2. Organic Chemistry
3. Inorganic Chemistry
4. Physical Chemistry
5. Analytical Chemistry
6. Biochemistry
7. Quantum Chemistry

General Chemistry and Quantum Chemistry are active. Organic, Inorganic, Physical, Analytical, and Biochemistry remain visible and non-clickable until substantive pages exist. Materials Chemistry, Environmental Chemistry, Medicinal Chemistry, Geochemistry, Polymer Chemistry, and narrower specialties should first be placed within or across these branches rather than added as direct peers without an ontology review.

## Overview lesson flow

The root follows a Navigate → Represent → Reference → Model → Check sequence:

1. navigate all seven branches before extended lesson content;
2. relate elemental identity, molecular or extended structure, and chemical change;
3. search the periodic repository with provider provenance and honest fallback states;
4. rotate fixed molecular coordinates and balance a reaction by elemental counts;
5. assess coefficients, isotopic identity, geometry and polarity, and an unknown-sample safety boundary.

The root does not teach every bonding model, reaction mechanism, analytical method, calculation, hazard class, or chemical family.

## Deterministic model contract

One shared module owns exact branch parity, methane-combustion atom ledgers, balanced-state detection, five fixed molecule records, deterministic axonometric projection, and assessment fixtures.

The reaction instrument models:

- `CH₄ + O₂ → CO₂ + H₂O`;
- coefficients from 1 through 9;
- elemental ledgers for carbon, hydrogen, and oxygen;
- the smallest balanced ratio `1 : 2 : 1 : 2`.

The instrument changes coefficients only. Subscripts remain part of molecular identity. A balanced equation conserves represented elemental counts but does not specify microscopic mechanism, rate, activation energy, heat transfer, phase, equilibrium, yield, reversibility, mixing, pressure, concentration, or hazard.

The molecule instrument uses fixed local coordinates for H₂O, CH₄, CO₂, NH₃, and C₂H₄. A quarter-turn control projects those coordinates into four repeatable views. Colors, radii, bond widths, and distances are schematic and do not form a measured structural dataset.

The server-rendered background shows an element inventory, water geometry, balanced methane ledger, and symbol → particle model → measurement → safety rail without random values, viewport measurement, canvas, animation ownership, or a client-only first frame.

## Periodic repository contract

The existing `/api/chemistry/elements` adapter remains the canonical provider boundary. It requests PubChem's periodic-table endpoint, normalizes identity and property fields, caches complete results, labels partial results, and uses a smaller reviewed local spine when the provider fails or rate-limits. IUPAC remains the naming and atomic-weight reference.

The interface supports name, symbol, atomic number, family, period, and standard-state filtering. It displays record counts, provenance notes, provider errors, fallback scope, valid empty results, retry, reset, and direct PubChem record links where available. The local fallback must never claim to contain all 118 elements.

## Assessment contract

The evidence lab contains four deterministic files:

- balance methane combustion with smallest whole-number coefficients `1, 2, 1, 2` without altering subscripts;
- infer that Carbon-12 and Carbon-14 remain carbon because both have six protons while neutron count changes;
- infer that equal opposing C=O bond dipoles cancel in linear CO₂ while bent water retains a net molecular dipole;
- refuse casual handling, smelling, testing, or drain disposal of an unlabeled clear liquid and defer to the laboratory's unknown-chemical procedure.

Every file supports unanswered, correct, incorrect, changed-answer, switched-file, and reset states. Feedback reconstructs the symbolic, particle, vector, evidence, or safety boundary rather than merely announcing a score.

## Vocabulary ownership

Chemistry owns twenty root terms: matter, element, atom, atomic number, isotope, ion, electron configuration, periodicity, valence electron, chemical bond, molecule, compound, mole, stoichiometry, reactant, product, chemical equation, catalyst, activation energy, and chemical equilibrium.

The terms register at `natural.chemistry` and aggregate into the Natural Science drawer through curriculum containment. As child pages are built, narrower terms should move to their owning child registrations while remaining inherited by this parent.

## Source, representation, and safety boundary

Element identity and provider records are checked against PubChem and IUPAC. Condition-specific thermochemical, spectral, and physical-property context is represented by the NIST Chemistry WebBook. Laboratory-practice boundaries are grounded in OSHA's laboratory safety guidance and the institution-specific chemical-hygiene plan it requires.

The background, atom cells, nuclei, molecular projections, dipole arrows, and reaction ledger are local schematic teaching fixtures. They are not empirical spectra, structures, thermodynamic records, standard operating procedures, safety data sheets, disposal instructions, or permission to handle a substance.

## Verification gate

Before publication, verify:

- exact seven-child registry and branch-atlas parity;
- General and Quantum links active; all five other destinations visibly planned, non-clickable, and omitted from live navigation;
- canonical ancestry, hub classification, and metadata;
- required route navigation and instruction at 11px or larger;
- all five molecule records, four projection views, reset-on-molecule-change behavior, and deterministic coordinates;
- all methane coefficient controls, exact atom ledgers, smallest balanced ratio, changed and unbalanced states;
- exact assessment verdicts and safety feedback;
- Chemistry → Natural Science vocabulary inheritance with source-node provenance;
- complete, partial, cached, rate-limited, failed, empty, retry, reset, and reviewed-fallback periodic repository states;
- deterministic server-rendered first-frame geometry with no root canvas, random values, viewport measurement, or animation loop;
- source, representation-boundary, assessment, background, repository, and vocabulary markers in generated HTML;
- no new hydration, console, accessibility, or responsive failures;
- desktop, narrower desktop, mobile, keyboard, reduced-motion, zoomed-text, API-success, and API-failure behavior when a trusted browser runtime is available.
