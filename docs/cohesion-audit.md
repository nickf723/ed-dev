# Education Station 64 Cohesion Audit

This document tracks site-wide cohesion without flattening subject identity.

The goal is **one educational system with many local vibes**, not one visual template copied across every page.

Use this audit alongside:

- `AGENTS.md`
- `docs/design-docket.md`
- `docs/educational-content-playbook.md`
- `docs/page-planning-template.md`
- `docs/visual-verification-queue.md`

---

## 1. What must stay cohesive

These are global product rules. A page should need a deliberate reason to break them.

### Knowledge structure

- The curriculum registry is the structural source of truth.
- Live routes remain reachable.
- Hubs, units, atomic lessons, reference pages, and tools have different jobs.
- Parent, child, sibling, sequence, and cross-link relationships are semantically distinct.
- Arbitrary module numbers, fake progress systems, and implementation-facing labels are not substitutes for ontology.

### Learning design

- Begin from a learner goal and mental model.
- Chunk around learner questions.
- Guide before sandboxing.
- Prefer meaningful defaults and curated contrasts.
- Keep reference material near the decision it supports.
- Teach rules with their relevant boundaries and exceptions.
- Where membership or validity matters, let learners test valid, invalid, and boundary cases.

### Interface behavior

- Required information meets the readability floor.
- Interactive state changes do not clip, overlap, or unexpectedly move neighboring content.
- Components own their geometry.
- Global layouts do not reach into descendant components to repair one screenshot.
- Borders, scrollbars, focus states, and navigation relationships use the same semantic grammar across the product.

### Shared shell

- Breadcrumbs express ancestry.
- Domain/subject headers use a recognizable family resemblance.
- Persistent navigation does not cover primary content.
- Backgrounds participate without becoming foreground noise.
- Common controls should feel related even when their local styling differs.

---

## 2. What should become more unique with depth

Cohesion should create a stable frame for subject identity, not erase it.

As the learner descends, pages should increasingly specialize through:

- subject-specific spatial organization
- appropriate mathematical/scientific/humanistic representations
- local background motifs
- distinct interaction models
- local accent palettes inside the parent-domain palette
- typography choices when they serve the discipline
- examples, diagrams, reference systems, and motion that belong to the subject

A deep child page should not merely be its parent with a different icon and accent color.

---

## 3. Cohesion dimensions

Every substantial audit should inspect these dimensions separately.

### A. Page job

- Is this a hub, unit, atomic lesson, reference page, or tool?
- Is it doing the correct job for its depth?
- Is a hub trying to teach too much?
- Is an atomic lesson behaving like a directory?

### B. Ontology and navigation

- Are all live children present?
- Are planned destinations clearly disabled?
- Are groupings conceptual rather than arbitrary?
- Does the page expose ancestry, sequence, and decomposition accurately?

### C. Educational flow

- Is there a clear learner question?
- Does the page orient before it asks the learner to manipulate?
- Are explanations chunked into distinct conceptual steps?
- Does the interaction reveal causality rather than novelty?

### D. Representation quality

- Does the visual model encode the real structure?
- Are multiple views coordinated around one object where appropriate?
- Are containment, overlap, transformation, order, and invariance shown honestly?

### E. Density and hierarchy

- Is there one obvious center of gravity?
- Is navigation prominent enough on hubs?
- Are large panels earning their footprint?
- Is whitespace grouping content or abandoning it?

### F. Typography and labels

- Is required information readable?
- Are headings learner-facing?
- Have module codes, debug labels, arbitrary counts, and obvious UI instructions leaked into the page?

### G. Geometry and state safety

- Longest text state
- multiline equation/example state
- selected/unselected states
- error/empty/boundary states
- narrower desktop width
- text zoom

No legitimate instructional state should clip or bleed into another container.

### H. Subject identity

- What makes this page belong to this subject?
- Is that identity semantic or merely a color swap?
- Does it still clearly belong to the larger site?

---

## 4. Audit status vocabulary

Use these labels in this document and the verification queue.

- **Refined**: recently rebuilt under the current design and learning rules and visually reviewed.
- **Structurally refined**: ontology/content/navigation were improved, but the latest state still needs visual verification.
- **Legacy**: predates the current docket/playbook and should receive a deliberate audit before new feature work.
- **Verification required**: recently changed while preview/deployment was unavailable.
- **Planned**: known place in the ontology with no finished page yet.

Do not call a page refined simply because it compiles.

---

## 5. Current audit wave: Mathematics

Algebra was the first branch brought through the full cohesion process because it spans branch hubs, units, atomic lessons, reference material, and interactive models. The wave has now advanced into the remaining Mathematics parents.

### Recently refined

- Mathematics hub
- Algebra hub
- Integrated Algebra hub
- Algebra Fundamentals unit
- Expressions & Variables
- Equality & Equations
- Algebraic Properties
- Number Systems
- Graphing Linear Equations
- Systems of Equations

These still return to the visual verification queue whenever later shared changes touch their shell or geometry.

### Structurally refined / verification required

- Algebraic Inequalities
- Systems of Inequalities
- Pre-Algebra hub and its eight-child learning path
- Solving for X and the remaining Pre-Algebra child sweep
- Quadratic Equations unit and its five atomic lessons
- Number Theory hub
- Discrete Mathematics hub
- Set Theory root unit
- Graph Theory root unit
- Combinatorics root unit
- Recursion & Recurrence root unit

The latest work on these pages occurred without a trusted rendered browser pass, so their conceptual structure is intentional but their composition must be checked before they are treated as visually refined.

### Completed scope corrections

- Pre-Algebra now behaves as a learning path from arithmetic structure into symbolic algebra rather than a module dashboard.
- Solving for X centers equality-preserving inverse operations and treats substitution as a check rather than a trick or mastery event.
- The remaining Pre-Algebra lessons preserve their distinct primary instruments while using canonical terminology and semantic continuation.
- Quadratic Equations is an honest five-lesson unit covering patterns and parabolas, vertex form, roots and intercepts, completing the square, and the quadratic formula with discriminant.
- Number Theory is a curriculum-derived hub organized around four integer lenses: multiplicative structure, cyclic structure, integer constraints, and global distribution. Diophantine Equations is the only active child; the other three remain non-clickable planned nodes.
- Number Theory's first sieve-grid background did not meet the memorable-background gate. It has been replaced by a deterministic integer causeway whose prime positions become illuminated landmarks, its formerly continuous atlas slab has been separated into scenery-aware foreground regions, and two unreferenced random-canvas background experiments were removed.
- Discrete Mathematics now behaves as a four-lens hub around one finite specimen: set membership, graph connection, combinatorial arrangement, and recursive construction. Its four live routes come from the curriculum registry, vocabulary is registered at the narrowest nodes, navigation precedes the preserved graph builder, and the former random network/remote-photo implementation world has become a deterministic discrete-structure drafting table.
- Set Theory is now a bounded six-lesson root unit rather than a client-heavy topic panel or an endlessly subdivided taxonomy. Its overview workshop follows Explain → Do → Check: the Venn-operation strength is preserved as a membership scanner with number, library, and disjoint presets; the page teaches four membership regions before notation, distinguishes elements from subsets, adds a real-world transfer check and deterministic generated practice, and contributes difference, empty-set, and disjoint-set vocabulary through the registry. Its random canvas and remote hero were replaced by a deterministic classification conservatory.
- Graph Theory is now a bounded six-lesson root unit rather than a client-heavy algorithm showcase. One canonical seven-vertex campus graph powers its network-drafting background, worked model, degree ledger, BFS/DFS traversal, and connectivity transfer; the former random maze, random constellation, remote hero, implementation chrome, and isolated glossary were removed. The parent graph builder remains available as a distinct construction tool, while the root adds deterministic degree/handshake practice and curriculum-owned vocabulary.
- Recursion & Recurrence is now a bounded six-lesson root unit rather than a whole-page client demo. The stable route is preserved while the learner-facing terminology is corrected. One canonical three-disk Hanoi system coordinates the deterministic recursive-stair world, seven-move register, call/return trace, recurrence ledger, guided/manual workbench, and checks; the old remote hero, joke definition, arbitrary unit code, random canvas loop, implementation labels, and isolated glossary were removed. Deterministic practice and six stable vocabulary terms complete the curriculum bundle.

### Active Mathematics family target

- Continue to the remaining Mathematics families after rendered verification of the completed Discrete Mathematics root layer.

The Discrete Mathematics parent and all four root units are structurally refined. Their planned direct lessons remain non-clickable until each lesson is substantive; no deeper placeholder taxonomy is required.

### Completed bounded-rotation checkpoint

- Natural Science → Earth Science → Mineralogy

After the coherent Graph Theory pass, production rotated from a Formal Science unit/network world to a Natural Science reference/specimen world. Mineralogy preserves its composition → structure → property → identification throughline while replacing the random shard cloud and isolated four-specimen demo with a deterministic crystal cabinet, a reviewed teaching collection, disciplinary facets, source-linked records, and a co-visible comparison ledger.

### Completed bounded-rotation checkpoint

- Humanities → Literature → Narrative & Fiction

The existing Literature reading room is preserved as a hub instead of being cosmetically replaced. Narrative & Fiction activates the hub's first honest child and bounds the unit at six planned lessons: narrator and perspective; story, plot, and time; character and desire; setting and world; scene, conflict, and structure; genre and convention. A deterministic four-event station story coordinates the background, worked registers, disclosure editor, reader-knowledge ledger, and transfer check. Its curriculum-owned vocabulary aggregates upward into Literature through the first Humanities vocabulary scope.

### Completed bounded-rotation checkpoint

- Formal Science → Mathematics → Discrete Mathematics → Recursion & Recurrence

The return pass preserves Hanoi and the self-similar recursive world while changing the macro-composition to a vertical call/return spine and the interaction to an exact deterministic trace plus legal manual play.

### Completed bounded-rotation checkpoint

- Applied Science → Medicine → Anatomy & Physiology

The parent-first repair preserves the nested structure–function scale, regional scanner, and Skeletal System route while replacing the handwritten partial map with a registry-owned layer of two foundations and the conventional eleven organ systems. Six functional study families teach relationships without adding false hierarchy. The page and its Skeletal child now use deterministic human-study and radiograph worlds instead of random full-screen canvases; Medicine, Anatomy & Physiology, and Skeletal vocabulary aggregate through the first Applied Science vocabulary scope; and a three-case evidence check tests structure–function, region-versus-system, and organization-scale reasoning. Rendered verification remains required.

### Completed bounded-rotation checkpoint

- Social Science → Geography

The consolidation pass preserves the earlier GIS light table, eight bounded direct branches, inhabited globe, population-pyramid instrument, and six spatial-reasoning questions while bringing them into the current contract. The globe is now deterministic server-rendered scenery instead of a measured canvas loop; the layer deck raises instructional text to readable sizes; one shared model owns branches, demographic profiles, cohort shares, and three evidence cases; and Geography contributes the first curriculum-derived Social Science vocabulary scope. The new evidence lab asks learners to separate counts from rates, aggregates from local variation, and spatial association from mechanism. Rendered verification remains required.

### Completed bounded-rotation checkpoint

- Natural Science → Biology → Botany

The consolidation pass preserves the deterministic venation field, stomatal exchange instrument, and root → xylem → leaf → phloem reading order while adding a registry-owned six-branch atlas before the lesson. The numerical model now has one shared testable implementation, and a four-file check combines exact calculation with mechanism, transport-direction, and classification reasoning. Ten Botany terms inherit through Biology and Natural Science. The Animalia-only iNaturalist adapter remains honestly bounded; a future flora atlas requires a plant-specific specimen and provenance contract instead of a relabeled animal search. Rendered verification remains required.

### Completed bounded-rotation checkpoint

- Humanities → Visual Arts

The consolidation pass keeps the pigment world, six-branch practice studio, museum wall, composition experiment, and hue lab while changing the page into a server-rendered child-first hub. One shared model coordinates branch parity, hue arithmetic, and a four-file evidence assessment. Thirteen Visual Arts terms now inherit into Humanities. The Met integration has a pure tested provider adapter, separate provider-total and sample counts, explicit image-rights fields, named source links, partial and rate-limit states, contextual facets, stale-request protection, and a reviewed fallback wall. Rendered verification remains required.

Next, rotate to **Formal Science → Data Science** for a contrasting uncertainty/data audit. Preserve any strong analytical tools while checking whether its child structure, sources, model claims, assessments, and vocabulary distinguish data, evidence, inference, and uncertainty.

---

## 6. Site-wide audit waves

After Algebra, proceed by coherent branches rather than random pages.

The complete route inventory and site-wide remaster acceptance criteria now live in `docs/site-remaster-audit.md`. Every route is in scope, but work remains branch-by-branch so ontology, family resemblance, and preserved strengths are repaired together instead of applying a global cosmetic skin.

### Wave 2: Remaining Mathematics · active

- Foundations
- Geometry and descendants: parent developed
- Calculus: parent developed
- Statistics: parent developed
- Number Theory: structurally refined; rendered verification required
- Discrete Mathematics: parent and all four root units structurally refined; rendered verification required
- Applied Mathematics: parent developed
- Linear Algebra
- Abstract Algebra

### Wave 3: Formal Science outside Mathematics

- Logic
- Computer Science
- Information Science
- Data Science
- Systems Science

### Wave 4: Natural Science

Audit field hubs first, then descend branch by branch. Preserve each science's own representational grammar rather than importing Mathematics UI wholesale.

### Wave 5: Social Science

Favor scale, populations, institutions, evidence, networks, maps, timelines, and data representations where they fit the subject.

### Wave 6: Humanities

Preserve stronger editorial/archival/cultural identities while keeping navigation and learning semantics consistent.

### Wave 7: Applied Science

Favor design constraints, workflows, prototypes, systems, decisions, and real-world outputs. Keep Applied's violet identity at the domain level without forcing every child into the same workbench composition.

### Wave 8: Interdisciplines

Re-audit after the five core domains have stronger child structures. Interdisciplinary navigation should connect specific developed concepts, not vague top-level fields.

---

## 7. The anti-homogenization rule

When fixing cohesion, never default to copying a successful page.

Reuse:

- shell behavior
- semantic navigation patterns
- geometry principles
- readability standards
- interaction feedback grammar
- curriculum-driven navigation

Reinvent when useful:

- page composition
- primary model
- background
- local palette
- interaction
- reference system
- diagram language
- information density

The question is not “How do we make this match the previous page?”

The question is:

> **What should feel familiar because it is the same product, and what should feel different because it is different knowledge?**

For normal production, apply this as bounded rotation: finish and publish a coherent bundle, then prefer a contrasting branch or page kind before repeating the same academic world. Record the return target so variety does not become random abandonment.

---

## 8. Audit completion rule

A branch is not cohesion-audited when every page merely shares the same header.

A branch is cohesion-audited when:

- its ontology is coherent
- every live route is preserved
- page depth matches page responsibility
- learning sequences are intentional
- repeated conventions are consistent
- subject-specific models are accurate
- old implementation-facing chrome is removed
- visual states have been rendered and reviewed
- child pages become meaningfully more specialized with depth

The final test is whether the branch feels like **one curriculum designed deliberately over time**, rather than a folder containing pages from different development eras.

---

## 9. Current cohesion checkpoint · Data Science

Data Science keeps one eight-branch root layer: collection and wrangling, exploration, statistical inference, machine learning, engineering, visualization, causal work, and responsible evaluation. These peers describe distinct recurring responsibilities rather than a required pipeline or eight competing definitions of the field.

The root lesson now advances from navigation to a transparent fitted model, then from evaluation discipline to claim distinctions and an evidence audit. One fixed sample appears in the server-rendered workbench and the K-means laboratory; one shared model owns its calculations. The page-level vocabulary is registered to the curriculum node and inherited by Formal Science, so narrower terminology can move into future child units without maintaining a parallel glossary.

The visual grammar is intentionally procedural and inspectable: sparse tables, coordinates, split boundaries, timelines, and audit rails. It keeps the product's header, focus, feedback, and vocabulary conventions while avoiding the pigment, gallery, living-field, globe, and anatomical-plate languages of the preceding rotations.

---

## 10. Current cohesion checkpoint · Materials Science

Materials Science keeps one eight-branch root layer while clearly presenting its two useful axes. Structure, properties, and processing/characterization are cross-cutting lenses; metals, ceramics, polymers, composites, and functional materials are broad material families. The interface does not imply that a material family is a processing method or that the two tracks form one strict sequence.

The root lesson now advances from the two-track atlas through the processing–structure–property–performance relationship, a normalized mechanical-response instrument, selection questions, and a specimen evidence review. One shared module owns the curve math and assessment fixtures; root vocabulary is registered to the curriculum node and inherited by Applied Science.

The visual grammar is physical and test-conditioned: grips, gauge length, applied force, crack cues, microscope fields, grains, defects, service tags, and specimen records. It preserves product-level navigation, focus, feedback, and vocabulary conventions without importing Data Science's tables and split diagrams as the page's identity.

---

## 11. Current cohesion checkpoint · Economics

Economics keeps one seven-branch root layer while distinguishing three kinds of foundation. Microeconomics and Macroeconomics change the scale of the question; Econometrics supplies measurement and identification tools across those scales; Behavioral, International, Public, and Development Economics organize cross-cutting problem areas. The page does not create a finance peer merely because financial examples are familiar.

The root lesson now advances from branch navigation through circular resource and income flows, a normalized supply–demand instrument, and a four-file claim review. One shared module owns the curve math, GDP arithmetic, and assessment fixtures; root vocabulary is registered to the curriculum node and inherited by Social Science.

The visual grammar is institutional and reconciliatory: households, firms, public systems, international exchange, curved flows, receipts, accounts, baskets, and comparison files. It preserves product-level navigation, focus, feedback, and vocabulary conventions without importing Materials Science's test bench or Data Science's fitted-model workbench as the page's identity.

---

## 12. Current cohesion checkpoint · Chemistry

Chemistry keeps one seven-branch root layer. General Chemistry provides the broad foundational sequence; Organic, Inorganic, Physical, Analytical, Biochemistry, and Quantum Chemistry organize major systems, questions, or methods without pretending to be mutually exclusive partitions. General and Quantum are active; the other five remain honest planned destinations.

The root lesson now advances from direct navigation through elements → structures → reactions, a provenance-aware periodic repository, a deterministic molecular projection, a conservation ledger, and a four-file evidence review. One shared module owns the projection, equation arithmetic, and assessment fixtures; root vocabulary is registered to the curriculum node and inherited by Natural Science.

The visual grammar is representational and laboratory-aware: element cells, atomic identity, molecular geometry, bond vectors, chemical equations, measurement records, and safety stops. It preserves product-level navigation, focus, feedback, repositories, and vocabulary conventions without importing Economics' institutional flows or claim receipts as the page's identity.

---

## 13. Current cohesion checkpoint · Music

Music keeps one five-branch root layer. Theory & Composition, Acoustics, Performance & Instrumentation, Music History & Culture, and Recorded Music & Discography separate structural, physical, embodied, contextual, and catalog questions without implying that those dimensions exist alone. Theory, Performance, and Recorded Music are active; Acoustics and History & Culture remain honest planned peers.

The root lesson now advances from direct branch navigation through composition/performance/recording identity, sound/structure/meaning claim layers, and a four-file evidence review. One shared module owns pitch transposition, duration arithmetic, branch parity, and assessment fixtures; root vocabulary is registered to the curriculum node and inherited by Humanities. The existing MusicBrainz collection remains the specialized repository rather than being duplicated on the root.

The visual grammar is temporal and layered: staff lines, pitch events, a fixed signal trace, recording grooves, and mixer channels. It preserves product-level navigation, focus, feedback, repositories, and vocabulary conventions without importing Chemistry's specimen bench or Visual Arts' pigment-and-gallery language as the page's identity.

---

## 14. Current cohesion checkpoint · Architecture

Architecture keeps one eight-branch root layer. Design Studio, Building Technology, Structures, Environmental Systems, Urban & Site, History & Theory, Representation & Fabrication, and Practice/Codes describe coordinated fields rather than eight independent definitions of a building. All remain honest planned destinations while the root provides a substantive orientation lesson.

The root lesson advances from the section-based branch atlas and body-to-city scale stack through a historically bounded Vitruvian question set, an integration desk, and a four-sheet coordination review. One shared module owns area, drawing-scale, and ramp-run arithmetic plus assessment fixtures; root vocabulary is registered to the curriculum node and inherited by Applied Science.

The visual grammar is spatial and sectional: occupied levels, bays, stairs, voids, site contours, dimensions, daylight rays, load cues, plans, and coordination overlays. It preserves product-level navigation, focus, feedback, and vocabulary conventions without importing Music's mixer or Chemistry's specimen-and-reaction language as the page's identity.

---

## 15. Current cohesion checkpoint · Psychology

Psychology keeps one six-branch root layer. Cognitive, Biological, Developmental, Social & Personality, Clinical & Counseling, and Methods & Measurement are compatible lenses rather than a sequence or six independent definitions of a person. Methods crosses the other five; narrower specialties remain deferred within or across the bounded branches.

The root now advances from direct branch navigation through levels of explanation, the preserved three-scene cognition laboratory, operationalization and causal boundaries, and a four-file evidence review. One tested model owns mean arithmetic, a fixed condition contrast, branch parity, and assessment fixtures. Twenty-four root terms inherit into Social Science, and the lab's wall-clock timer no longer participates in the initial render.

The visual grammar is observational and inferential: masked participant ledgers, condition marks, trial sequences, construct notes, comparison records, and explicit claim boundaries. A deterministic server-rendered observation room replaces the viewport-measured animated canvas without importing Architecture's section drawing or presenting a decorative brain network as an explanation.

---

## 16. Current cohesion checkpoint · Earth Science

Earth Science now keeps five direct branches instead of presenting a specialized material field as a root peer. Geology contains the existing Mineralogy reference route; Hydrology, Meteorology, Physical Geography, and planned Climatology remain direct. Human Geography is preserved as a Social Science cross-link. Climate is presented as cross-system behavior through time rather than another physical layer.

The root advances from the field transect through four cross-system couplings, an interactive watershed ledger, and a four-file evidence review. One tested model owns branch parity, Mineralogy containment, water-budget arithmetic, and answer fixtures. Twenty-six root terms combine with descendant Mineralogy vocabulary and inherit into Natural Science.

The visual grammar is field-based and sectional: ridge, snow, rain, stream, groundwater, coast, strata, fault, and fixed monitoring stations. A deterministic server-rendered ridge-to-coast world replaces the random animated globe, and client ownership is reduced to the flux and assessment islands without importing Psychology's participant ledger or Architecture's building sheet.

---

## 17. Current cohesion checkpoint · Information Science

Information Science now keeps seven direct branches rather than showing nine apparent peers while visually implying an unregistered hierarchy. Metadata & Semantics is nested under Encoding & Representation; Knowledge Graphs & Linked Data is nested under the active Taxonomy & Ontology hub. The record inspector, sidebar tree, root assertions, model tests, and vocabulary aggregation now share that exact containment.

The root advances from registry-owned navigation through empirical symbol entropy, synthetic vector retrieval, a no-render-fetch Library of Congress connector protocol, six system questions, and a four-file claim review. The active child advances from controlled vocabularies through taxonomy and ontology, comparing one fictional game across a category path and five typed relations before a deterministic design challenge. Fifty-eight terms are registered at their narrowest current nodes and aggregate into Information Science and Formal Science.

The root visual grammar is a source-to-record signal desk; the child is a classification atelier with broader/narrower paths and typed graph relations. Deterministic server-rendered SVG/CSS replaces both animated canvas backgrounds, including the randomly regenerated taxonomy tree. Client ownership is limited to the entropy, retrieval, comparison, and assessment islands, with no initial-render randomness, viewport measurement, or wall-clock state.

---

## 18. Current cohesion checkpoint · History

History keeps one three-lens root layer: Time, Place, and Theme. These are organizing coordinates rather than a forced sequence or mutually exclusive partitions. Source method remains at the root because provenance, contextualization, corroboration, perspective, interpretation, archives, and archival silence support every historical specialization.

The root advances from direct lens navigation and the existing printing-press case through an observe–contextualize–corroborate workshop, a BCE/CE interval instrument, a four-file evidence review, and explicit collection boundaries. One tested model owns astronomical-year conversion, elapsed-year arithmetic, exact branch parity, and assessment fixtures. Thirty-five terms are registered at the root or narrowest current lens and aggregate into Humanities.

The visual grammar is archival and editorial: warm paper light, printing marks, source ledgers, restrained classification colors, and dark reading surfaces. Root motion is disabled, and the client boundary is limited to the interval and assessment islands without random values, viewport reads, effects, timers, or wall-clock state. This preserves the product shell while avoiding Information Science's record pipeline and Earth Science's field transect.

---

## 19. Current cohesion checkpoint · Agriculture

Agriculture keeps one nine-branch root layer while treating its production and resources banks as visual groupings rather than false curriculum parents. Agronomy, soils, horticulture, animal science, aquaculture, forestry/agroforestry, agroecology, engineering/technology, and economics/food systems remain direct planned peers. Root concepts describe the whole-farm system; narrower vocabulary belongs to its branch.

The root advances from direct branch navigation and system layers through the preserved nitrogen instrument, six whole-farm questions, a four-file evidence review, and an official public-data protocol. One tested model owns branch parity, three crop-system fixtures, nitrogen pathway arithmetic, and answer fixtures. Thirty-six terms are registered at the root or narrowest direct branch and aggregate into Applied Science.

The visual grammar is a managed landscape viewed above and below ground: distinct fields, hedgerows, orchard, pasture, protected culture, pond, lane, irrigation, buildings, soil, roots, and nutrient cues. A deterministic server-rendered isometric SVG replaces the viewport-measured animation canvas. Client state is confined to the nitrogen and assessment islands, without importing History's archive surfaces or Information Science's record desk.

---

## 20. Current cohesion checkpoint · Sociology

Sociology keeps seven direct planned branches while using micro, meso, macro, and cross-cutting bands only as analytical scale cues. The root advances from registry-owned navigation and one event across scales through a seeded Schelling-style model, three theoretical lenses, a four-case evidence review, and public-data boundaries. One tested model owns branch parity, exact initial population metrics, seeded movement, count preservation, and answer fixtures; twenty-nine terms aggregate into Social Science.

The visual grammar is relational and scalar: encounters and ties sit above groups and organizations, which sit above an institutional skyline. A deterministic server-rendered field replaces the random drifting-node canvas, the route returns to server ownership, and only the simulation and assessment remain client islands. The page avoids Psychology's participant laboratory, Economics' exchange ledger, and Agriculture's field transect.

---

## 21. Current cohesion checkpoint · Physics

Physics keeps eight direct active branches while using familiar-scale and extended/specialized banks only as model-regime cues. The root advances from registry-owned navigation and a reusable define → measure → model → test cycle through an eight-scenario regime selector, a one-segment coordinate instrument, four exact SI-defining constants, a four-case evidence review, and official reference-data boundaries. One tested model owns branch parity, scenario coverage, signed motion arithmetic, exact-value fixtures, and answer paths; thirty-five narrowly owned terms aggregate into Natural Science.

The visual grammar is metrological rather than generically futuristic: a fixed trajectory, velocity vector, coordinate field, wave trace, interaction response, and unit ruler establish a deterministic laboratory sheet behind open reading corridors. The root stays server-owned while the regime, measurement, and assessment instruments remain small deterministic client islands. It avoids Sociology's scale bands, Agriculture's transect, and the animated shared Physics background still used by specialized descendants.

---

## 22. Current cohesion checkpoint · Philosophy

Philosophy keeps seven direct branches organized by the kinds of questions they investigate: Metaphysics, Epistemology, Philosophy of Mind, Ethics, Political Philosophy, Aesthetics, and Philosophy of Science. Metaphysics, Ethics, and Aesthetics remain active; the other four are honest planned peers. Logic remains a cross-link to Formal Science rather than becoming a false Philosophy child.

The root now puts its question matrix before the overview lesson, then separates a question, claim, reasons, objection, and reply in one inspectable argument. A four-case evidence review distinguishes validity from soundness, counterexample from universal opposite, necessary from sufficient conditions, and an argument-level objection from a personal attack. One tested model owns exact branch parity, the canonical argument tree, and every answer path. Twenty-eight terms are registered at the root or their narrowest current branch and aggregate into Humanities.

The visual grammar is dialogical and editorial: fixed threads cross at junctions, while argument nodes and source trails expose where claims meet reasons and objections. The deterministic server-rendered field has no viewport reads, randomness, effects, timers, or animation loops; client ownership is confined to the question matrix, argument inspector, and evidence review. It avoids Physics' measurement sheet and does not turn positions into decorative teams or famous-name cards.

---

## 23. Current cohesion checkpoint · Astronomy

Astronomy keeps six direct branches while making their different roles
explicit. Planetary, Stellar, Galactic, Extragalactic, and Cosmology change the
scale of the system; Astronomical Methods crosses every scale. Planetary remains
the only active child. Cosmology is no longer presented as a live destination
without a page, and Methods is no longer omitted from the primary field map.

The root advances from scale navigation through the preserved messenger
laboratory, the preserved lookback comparison, a four-signal evidence review,
and official archive boundaries. One tested model owns branch parity, five
lookback examples, redshift arithmetic, and assessment fixtures. Twenty-four
narrowly owned terms aggregate into Natural Science.

The visual grammar is observational and time-deep: a conceptual light cone,
nested lookback intervals, source marks, detector geometry, wave paths, and
spectral comparison. A deterministic server-rendered field replaces the root
canvas while retaining the existing observatory character. It avoids
Religion's comparative dossier and Computer Science's execution buses while
keeping client state confined to purposeful navigation and evidence islands.

---

## 24. Current cohesion checkpoint · Political Science

Political Science keeps eight direct planned branches while using analytical
lenses, governing mechanisms, and material/cross-border context only as visual
groupings. The root advances from registry-owned navigation through the
preserved 125-seat coalition laboratory, four recurring questions, a four-case
evidence review, and official record/data boundaries. One tested model owns
branch parity, five fictional parties, the 63-seat threshold, hemicycle marks,
coalition arithmetic, and assessment fixtures. Twenty-two narrowly owned terms
aggregate into Social Science.

The visual grammar is institutional and procedural: a civic chamber connects
preferences, seats, a governing threshold, rules, action, delivery, and
outcome. A deterministic server-rendered field replaces the random partisan
territory canvas, and the unused ideology quadrant is removed. The route is
server-owned while the coalition and assessment remain small client islands.
It avoids Astronomy's light cone, Religion's comparative dossier, and the
reduction of political analysis to decorative teams.

---

## 25. Current cohesion checkpoint · Medicine

Medicine keeps ten direct branches while using four clinical-task bands only
as relationship cues. Anatomy & Physiology remains active; Pathology,
Diagnostics, Pharmacology, Procedures, Clinical Reasoning, Specialties, Acute
Care, Longitudinal Care, and Ethics remain honest planned peers. The root
advances from registry-owned navigation through the preserved synthetic
reasoning laboratory, a body-system lens, four safety guardrails, a four-case
evidence review, and official record boundaries. One tested model owns branch
parity, five reasoning stages, evidence weights, exact diagnostic-table
arithmetic, and assessment fixtures. Thirty-nine narrowly owned terms aggregate
through Medicine into Applied Science.

The visual grammar is clinical and revisable: pulse traces, a staged reasoning
loop, evidence packets, anonymous working hypotheses, a conceptual body-system
lens, and explicit follow-up. The deterministic server-rendered field shares
its stage model with the client laboratory; only the bounded reasoning, anatomy,
and review islands hydrate. It avoids Political Science's institutional
chamber, Astronomy's deep-time cone, decorative anatomy as explanation, and any
implication that a fictional model can diagnose or recommend care.

---

## 26. Current cohesion checkpoint · Languages

Languages keeps eight direct planned branches while using language-tradition
and learning/use folios only as relationship cues. The root advances from
registry-owned navigation through a five-stage practice loop, the preserved
multilingual phrase window, the preserved translation-choices studio, six
learning principles, a four-case evidence review, and public catalog/archive
boundaries. One tested model owns branch parity, phrase datasets,
direction-share arithmetic, fixed translation contrasts, and assessment
fixtures. Twenty-two narrowly owned terms aggregate into Humanities.

The visual grammar is communicative and editorial: facing source and target
pages, aligned but nonidentical lines, a translator's margin, direction and
modality rulers, fixed bilingual contrasts, and a cyclical practice register.
A deterministic server-rendered field replaces the viewport canvas while the
phrase, translation, and assessment remain small client islands. It avoids
Medicine's clinical record, Religion's comparative dossier, flags as language
identity, and phrase-table cells as substitutes for people, context, or
culture.
