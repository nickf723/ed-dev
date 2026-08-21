# Education Station 64 Site Remaster Audit

This ledger keeps the whole site inside one deliberate remaster program. It complements the Development Constitution, Design Constitution, Cohesion Audit, and Visual Verification Queue.

The goal is not to apply a new skin to every route. It is to bring every page through the same semantic, educational, environmental, and verification gates while preserving the parts that already work.

## Inventory snapshot

Source audit recorded on 2026-08-20:

Refresh this snapshot with `npm run audit:remaster` whenever routes are added, moved, or remastered in bulk.

| Area                 | Route pages |
| -------------------- | ----------: |
| Formal Science       |         144 |
| Natural Science      |          84 |
| Social Science       |          13 |
| Humanities           |          95 |
| Applied Science      |          41 |
| Interdisciplines     |          15 |
| Other product routes |           4 |
| **Total**            |     **396** |

The audit covers every `app/**/page.tsx` route, including dynamic route families. A dynamic route counts as one route module even when it can render many records or lessons.

### Migration signals

These are prompts for review, not automatic defects:

- 178 route modules still declare the whole page as a Client Component.
- 177 route modules use the shared `DomainPageHeader` family.
- 131 route modules resolve curriculum page context directly.
- 62 route modules use the newer `SceneFrame` composition system.
- 245 route modules explicitly import a background or world component.
- 293 route modules contain at least one 6–10 px text token; every occurrence must be classified as decorative telemetry or raised to the readability floor.
- 198 pages still contain a page-local breadcrumb declaration or adapter call and should be reviewed when their branch is remastered.
- 17 route modules contain legacy implementation-themed chrome; the current concentration is in older Mathematics families.
- two route modules use randomness only inside explicit learner actions; static inspection found no page-level render-time randomness in the route modules.

These numbers show why the remaster must be incremental. The site contains several development eras, and global replacement would erase good local work while leaving semantic debt untouched.

## Remaster acceptance contract

Every route eventually passes the following gates.

### Preserve

- Inventory the existing background, navigation topology, useful content, live routes, interactions, and memorable moments.
- Keep successful systems unless the pass explicitly replaces them with something stronger in the same dimensions.

### Tree

- Filesystem route, curriculum node, sidebar ancestry, breadcrumbs, and live/planned states agree.
- Hubs foreground direct children; grandchildren and cross-links remain visibly different.
- Vocabulary is registered at the narrowest teaching node and inherited upward.

### Frame

- The page kind is honest: hub, unit, lesson, reference, or tool.
- Each viewport has one center of gravity.
- Lessons use a readable measure; hubs may use a wider field when navigation requires it.
- Required content grows naturally without clipping or screenshot-specific height patches.
- Major foreground groups are separated by deliberate scenery corridors.

### Field

- One dominant environmental idea is recognizable in a still screenshot.
- Backgrounds are composed scenes, mechanisms, maps, fields, archives, instruments, or other subject-specific worlds—not generic particles, grids, or neon ambience.
- Glass uses local frost and moderate opacity so the world remains visible.
- Dense manipulation creates a quiet pocket without erasing the surrounding environment.
- Reduced motion preserves identity and comprehension.

### Flow

- Navigation pages teach relationships and choice criteria.
- Atomic lessons visibly Explain → Do → Check and include an insightful transfer check plus deterministic practice when appropriate.
- Controls and consequences remain co-visible.
- Reference, repository, and tool pages support a truthful retrieval or performance loop.

### Verify and publish

- Run TypeScript, lint, vocabulary, architecture, readability, applicable data tests, and a production build.
- Inspect desktop, narrower desktop, mobile, interaction, long-copy, boundary, empty, error, and reduced-motion states when a trusted browser is available.
- Queue visual verification honestly when it is not.
- Commit and push one coherent pass to `studio`, verify the remote tree, and confirm Vercel created no development deployment.

## Breathing-room standard

The site should feel inhabited, not tiled.

1. Reserve visible subject scenery at outer margins and between major content groups.
2. Break uninterrupted dashboard walls into semantically related objects when continuity is not part of the subject model.
3. Use section rhythm to reset attention after dense atlases, instruments, tables, collections, and assessments.
4. Keep background landmarks or motion visible inside those openings so space feels intentional.
5. Do not create blank voids or use filler cards to manufacture occupancy.
6. On narrow screens, preserve the rhythm through vertical spacing, lighter local surfaces, and normal document flow.

## Audit waves

### Wave 0 · shared contract and known regressions

- Establish this complete inventory and the scenery-corridor standard.
- Replace the rejected Number Theory sieve wallpaper with a stronger integer environment.
- Keep the shared sidebar, vocabulary drawer, Interdisciplines matrix, and collection repositories in the Priority 0 visual queue.

### Wave 1 · Mathematics

- Discrete Mathematics and all four root units—Set Theory, Graph Theory, Combinatorics, and Recursion & Recurrence—are structurally refined and remain queued for rendered verification.
- Then audit Foundations, Linear Algebra, Abstract Algebra, Calculus, Geometry, Statistics, Applied Mathematics, and their live child sequences.
- Preserve the strongest existing instruments; migrate ontology, context, vocabulary, lesson flow, readability, and environment together.

### Wave 2 · Formal Science outside Mathematics

- Logic
- Computer Science
- Information Science
- Data Science
- Systems Science

### Wave 3 · Natural Science

- Physics
- Chemistry
- Biology
- Earth Science
- Astronomy

Use each science's own experimental, spatial, temporal, taxonomic, or field-based grammar rather than importing Mathematics layouts.

### Wave 4 · Social Science

- Psychology
- Economics
- Sociology
- Political Science
- Anthropology
- Linguistics
- Communication Studies
- Geography
- Law

### Wave 5 · Humanities

- Philosophy
- History
- Visual Arts
- Music
- Literature
- Religion
- Languages
- Performing Arts
- Gaming and its repositories
- Culinary Arts
- Sports
- Culture
- Futurology

### Wave 6 · Applied Science

- Engineering
- Technology
- Materials Science
- Industrial Design
- Architecture
- Medicine
- Health Sciences
- Agriculture
- Business
- Education
- Library Science

### Wave 7 · Interdisciplines

Rebuild relationships after canonical pages are strong enough to support precise concept-level links. Interdisciplines remains an atlas over the five branches, not a duplicate curriculum.

## Current target and rotation queue

The Discrete Mathematics parent now derives four live children from a focused curriculum module, contributes node-owned vocabulary, presents direct-child navigation before its graph workshop, and uses a finite-structure drafting table instead of the random network wallpaper and remote server-room hero. Set Theory is now classified and built as a bounded root unit with six direct planned lessons: membership precedes notation in its overview workshop, the preserved Venn-operation idea has become a rule-driven scanner with curated and boundary cases, registry vocabulary replaces the parallel glossary, and transfer plus deterministic generated practice complete the instructional contract. The parent and both rebuilt root units remain queued for rendered verification.

Graph Theory is now a bounded six-lesson root unit. Its graph-building strength remains at the Discrete Mathematics parent, while the root preserves and clarifies pathfinding through a deterministic BFS/DFS traversal on the same seven-vertex graph used by the scenery, worked model, and degree ledger. The client-heavy random constellation, random maze, remote hero, local glossary, and implementation chrome are gone; curriculum context, inherited vocabulary, transfer reasoning, and generated fluency practice now travel as one bundle.

Mineralogy completed the bounded rotation after Graph Theory. Its Earth Science parent exposes it as the Earth-materials branch, and the remaster classifies it as a reference collection, preserves its chemistry → crystal structure → property → identification model, replaces the random shard field with a deterministic specimen-cabinet environment, expands four familiar examples into a reviewed curated collection, and adds search, disciplinary facets, stable record IDs, source links, honest scope, and property comparison.

Combinatorics is the completed Formal Science return pass. Its six planned direct lessons divide the field into building counts and controlling constraints. The remaster preserves its counting vault and cipher-ring strengths while replacing random and remote decoration with a deterministic 12-sequence / six-selection counting world, coordinating one four-token specimen across representations, adding guided explanation, boundaries, transfer, generated fluency, inherited vocabulary, and semantic sibling navigation.

Literature completes the contrasting Humanities pass without discarding its already-strong reading room. Narrative & Fiction is now its first active direct child and a bounded six-lesson unit. One original four-event station story drives the event-thread background, chronological register, plot-order editor, reader-knowledge ledger, and transfer check. Literature vocabulary now aggregates its active child's terms through a Humanities drawer rather than remaining an isolated local glossary. The six deeper narrative lessons remain visibly planned and non-clickable.

Recursion & Recurrence completes the current Discrete Mathematics root layer. The stable `recursion-theory` route remains intact, while the learner-facing name now matches the page's actual introductory scope and a source-linked boundary reserves “recursion theory” for computability theory. Six planned direct lessons bound the unit. One deterministic three-disk Hanoi case powers the recursive stair world, exact seven-move register, descent/return trace, recurrence, guided/manual workbench, transfer check, and generated practice. The remote hero, random canvas loop, joke definition, arbitrary unit code, implementation chrome, and isolated local glossary are gone; curriculum-owned vocabulary now aggregates upward.

Anatomy & Physiology completes the Applied Science rotation. Its focused Medicine curriculum subtree contains two shared foundations and the conventional eleven organ systems as one bounded direct-child layer. Six study families explain why the peers belong together without introducing false parent routes; Skeletal System remains the only active child. The page preserves and strengthens its nested scale and regional scanner, adds a deterministic evidence check, replaces both random anatomy canvases with stable human-study and radiograph plates, derives page context from the registry, and introduces inherited Medicine → Anatomy & Physiology → Skeletal vocabulary scopes.

Geography completes the Social Science rotation by consolidating rather than replacing its already-strong GIS light table, eight bounded direct branches, inhabited globe, population-pyramid instrument, and six-question spatial-reasoning ledger. Its background is now a deterministic server-rendered world instead of a viewport-measured canvas loop; one shared model owns branch parity, demographic profiles, calculated shares, and a three-case evidence lab; the layer deck raises required copy above the tiny-token floor; and curriculum-owned Geography vocabulary now aggregates into the first Social Science drawer. The evidence check distinguishes counts from rates, aggregates from local variation, and spatial association from mechanism.

Botany completes the Natural Science rotation by preserving its strong venation world, stomatal exchange model, and root → xylem → leaf → phloem process while giving them a registry-owned six-branch learning contract. The branch atlas now precedes the overview lesson; one shared module owns the bounded aperture calculation and four evidence files; ten Botany terms aggregate through Biology into Natural Science; and the page explicitly rejects reuse of the Animalia-only iNaturalist adapter. A future flora atlas is reserved for a specimen-grade typed provider contract, while the current page links to real herbarium records and keeps source and model boundaries visible.

Visual Arts completes the Humanities consolidation pass without discarding its successful pigment field, six-way practice studio, museum wall, composition guide, or color lab. Registry breadcrumbs and exact branch parity now frame two active studios and four honest planned peers; the navigation appears before the overview lesson; a shared hue model drives both the lab and a four-file evidence assessment; thirteen terms inherit into Humanities; and the Met route now consumes a pure tested provider adapter with explicit image-rights, sample, provenance, failure, and curated-fallback boundaries.

Data Science completes the Formal Science consolidation pass without reducing the field to machine learning. Its eight existing branches remain a bounded registry-owned map; the page preserves its transparent K-means instrument while moving the fixed sample, objective, transitions, metric arithmetic, branch parity, and assessment fixtures into one tested model. The viewport-measured canvas is replaced by a deterministic server-rendered records → features → model workbench. Eighteen root terms now inherit into Formal Science, and a four-file audit joins exact denominator practice to leakage, test-contamination, and causal-claim boundaries.

Materials Science completes the Applied Science consolidation pass while preserving its useful two-track ontology: three cross-cutting lenses and five material families. The mechanical-response lab remains the primary instrument, but its profiles, curves, regimes, branch parity, engineering-stress arithmetic, and assessment fixtures now live in one tested model. Required atlas copy clears the 11px floor; twenty node-owned terms inherit into Applied Science; and a deterministic server-rendered tensile frame and microscope window replace the viewport-measured canvas. The evidence review distinguishes stiffness, strength, and toughness, follows processing through microstructure, and makes service conditions part of selection.

Economics completes the Social Science consolidation pass without reducing the field to money, finance, or a single market diagram. Its seven existing branches remain a bounded registry-owned map; the page preserves its circular-flow topology and supply–demand lab while moving branch parity, linear equations, shift interpretation, GDP arithmetic, and assessment fixtures into one tested model. Twenty root terms now inherit into Social Science, required route copy clears the 11px floor, and a deterministic server-rendered exchange ledger replaces client-owned background motion. The claim review distinguishes an accounting identity, a comparative-static model result, an overall price measure, and a causal estimate.

Chemistry completes the Natural Science consolidation pass without discarding its seven-branch ontology, PubChem/IUPAC periodic repository, molecular geometry viewer, or methane conservation lab. Direct branches now precede the lesson; the hub itself returns to server ownership while small client islands retain element, molecule, equation, and assessment state. One tested model owns branch parity, five fixed molecular specimens, deterministic projection, atom ledgers, and assessment fixtures. Twenty root terms inherit into Natural Science, and a server-rendered representation bench replaces the root viewport canvas. The evidence review separates coefficients from subscripts, proton identity from isotope mass, bond polarity from molecular polarity, and chemical appearance from permission to handle an unknown.

Music completes the Humanities consolidation pass without flattening listening into theory or treating catalog metadata as the music itself. Its five existing branches remain registry-owned; the mixer now exposes every active route directly while keeping two planned branches inert. One tested model owns duration arithmetic, pitch transposition, branch parity, and assessment fixtures. Twenty-four root terms inherit into Humanities, and a deterministic server-rendered listening room replaces the animated root aurora. The evidence review separates score, performance, recording, acoustic signal, and catalog claims while preserving the specialized MusicBrainz repository.

Architecture completes the Applied Science consolidation pass without reducing the discipline to facade style or a floor-plan exercise. Its eight existing fields remain a registry-owned coordination map; the section atlas, scale stack, integration desk, and Vitruvian slabs are preserved. One tested model owns area, drawing-scale, and ramp-run arithmetic, branch parity, and assessment fixtures. Twenty-four root terms inherit into Applied Science, and a deterministic server-rendered architectural sheet replaces the viewport-measured animated canvas. The four-sheet review makes code and accessibility boundaries explicit while teaching exact spatial calculations.

Psychology completes the Social Science evidence pass without reducing the field to cognition, therapy, or a decorative brain metaphor. Its six direct branches now come from a focused curriculum module and precede the preserved perception, attention, and working-memory laboratory. One tested model owns branch parity, fixed score sets, mean arithmetic, and four evidence cases; twenty-four root terms inherit into Social Science. A deterministic observation room replaces the animated viewport canvas, and wall-clock reaction time no longer participates in the initial render. Research-ethics and clinical boundaries are explicit and source-linked.

Earth Science completes the Natural Science field pass by replacing a six-peer display with a more honest five-branch hierarchy. The existing Mineralogy reference collection is now an active child of Geology while retaining its route; Human Geography remains a cross-link. One tested model owns root parity, nesting, a fixed water budget, and four evidence files. Twenty-six root terms combine with descendant Mineralogy vocabulary and inherit into Natural Science. A deterministic ridge-to-coast transect replaces the random animated globe, while the interactive flux ledger and evidence review remain small client islands. Official NASA, USGS, and NOAA portals are linked as future collection sources without fabricating live observations.

Information Science completes the Formal Science record pass together with its active Taxonomy & Ontology descendant. The root now has seven true direct branches; Metadata is filed under Representation and Knowledge Graphs under Taxonomy/Ontology, so the record inspector, sidebar, tests, and vocabulary inheritance no longer disagree. Existing entropy and vector-search strengths now use one tested model. A bounded Library of Congress protocol demonstrates endpoint, query, field-selection, pagination, rate-limit, provenance, and rights boundaries without adding render-time requests. Fifty-eight narrowly owned terms aggregate through the branch. Deterministic source-to-record and classification-atelier backgrounds replace both animated canvases, including the random taxonomy tree.

History completes the contrasting Humanities source pass without reducing the field to a timeline or a catalog of events. Time, Place, and Theme remain the exact registry-owned root lenses and precede the retained printing-press case. An observe–contextualize–corroborate workshop, BCE/CE interval instrument, and four-file evidence review add source reasoning plus exact practice. One tested model owns astronomical-year conversion, a canonical 57-year boundary fixture, branch parity, and answer fixtures. Thirty-five terms belong to the root or narrowest current lens and aggregate into Humanities. Root motion is disabled, client state remains confined to two deterministic islands, and official Library of Congress, National Archives, Chronicling America, and Smithsonian links define future repository boundaries without pretending to provide a complete archive.

Agriculture completes the Applied Science systems pass without discarding its isometric farm or careful nitrogen-pathway instrument. Nine direct planned branches remain registry-owned, while production/resources banks stay visual groupings rather than false parents. One tested model owns branch parity, three crop-system profiles, pathway arithmetic, and four evidence files. Thirty-six root and branch terms aggregate into Applied Science. A deterministic above/below-ground SVG replaces the viewport animation canvas, and official NASS, NRCS, and ERS links establish scale-, method-, key-, and query-aware public-data boundaries without a render-time fetch.

Sociology completes the Social Science scale pass without reducing society to a decorative network or the emergence model to a real-world causal estimate. Seven direct branches remain planned and registry-owned; micro, meso, macro, and cross-cutting bands stay analytical cues. The Schelling-style lab is now seeded and regression-tested, the random canvas is replaced by a static social field, and the route returns to server ownership. Twenty-nine terms aggregate into Social Science, while Census and BLS links establish dataset-, denominator-, geography-, key-, series-, and revision-aware repository boundaries.

Physics completes the Natural Science measurement pass without reducing the discipline to classical mechanics, modern-physics spectacle, or a wall of equations. Eight direct active branches remain registry-owned; familiar-scale and extended/specialized banks stay analytical cues. The root now teaches define → measure → model → test through an eight-scenario regime instrument, signed one-dimensional practice, exact SI-defining constants, and a four-case evidence review. Thirty-five terms belong to their narrowest current nodes and aggregate into Natural Science. A deterministic laboratory sheet replaces the root's animated overview glow, while NIST constants and atomic spectra links establish exact/measured, uncertainty, version, species, ionization, wavelength, and bibliography boundaries without a render-time fetch.

Philosophy completes the Humanities argument pass without reducing the field to famous thinkers, positions as teams, or one list of abstract definitions. Seven direct branches remain registry-owned; three active routes are linked and four planned peers remain inert. The question matrix now precedes the lesson, one tested argument tree coordinates question, claim, reasons, objection, and reply, and a four-case evidence review tests validity, counterexamples, conditions, and objection targets. Twenty-eight terms belong to their narrowest current nodes and aggregate into Humanities. A static dialectic field replaces background animation, while Stanford Encyclopedia and Crossref links establish current-edition, fixed-archive, bibliographic-metadata, full-text, and argument-evaluation boundaries without a render-time fetch.

The next contrasting target is Applied Science → Education. Audit its direct branches, learning-and-instruction strengths, assessment model, vocabulary ownership, evidence boundaries, and source/repository opportunities without importing Philosophy's argument map or Physics' instrument sheet. Its visual world should express designed learning, feedback, and changing understanding rather than defaulting to a classroom dashboard.

The program advances one coherent page or family at a time. A route leaves the ledger only when its semantic structure, educational job, distinctive world, geometry, verification record, and published `studio` commit all agree.
