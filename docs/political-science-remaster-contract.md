# Political Science Root Remaster Contract

## Page job

`/social-science/political-science` is a field hub and compact orientation
lesson. Its primary job is to help a learner locate a political question among
eight direct fields without treating parties, ideologies, states, elections,
or policy positions as the definition of the discipline.

The page should leave one durable model:

> Political outcomes connect actors and preferences to collective decisions
> through rules and institutions; adoption, implementation, and effects are
> separate stages that require separate evidence.

## Preservation inventory

The remaster preserves:

- the fictional five-party, 125-seat assembly;
- the selectable coalition and 63-seat majority threshold;
- all eight existing direct Political Science branches;
- recurring questions about authority, institutions, collective choice, and
  power;
- the dark civic-chamber and amber institutional identity.

The pass removes two unreferenced legacy components: a random animated
red/blue/purple territory canvas and a two-axis ideology compass. The random
territory metaphor implied partisan land control without teaching a political
mechanism; the quadrant reduced political positions to five decorative points.
Neither participated in a live route after the remaster.

## Ontology

The exact direct branches are:

1. Political Theory;
2. Comparative Politics;
3. Political Institutions;
4. Political Behavior & Elections;
5. Public Policy & Administration;
6. International Relations;
7. Political Economy;
8. Political Methodology.

All eight remain planned and inert because their destination pages do not yet
exist. The primary navigation shows every direct peer before supplementary
content. It uses three analytical bands—lenses, governing mechanisms, and
material/cross-border context—but explicitly identifies those bands as visual
groupings rather than hidden curriculum parents.

## Learning and assessment contract

The hub proceeds through:

1. registry-owned direct-child navigation;
2. the preserved coalition-arithmetic instrument;
3. four recurring political questions;
4. a deterministic four-case evidence review;
5. official data and repository boundaries.

The evidence review tests:

- exact coalition arithmetic: `40 + 25 = 65`, so the pair clears the
  `63 / 125` threshold by two seats;
- the institutional translation from vote share to seat share;
- the difference between temporal sequence and causal attribution;
- the difference between formal policy adoption, implementation, uptake, and
  effect.

The checker is deterministic. A numerical majority is described only as
possible; it is not presented as politically plausible, stable, lawful, or
guaranteed to form.

## Representation parity

`politicalScienceModel.ts` owns the five fictional parties, their exact seat
counts and colors, the total, majority formula, coalition calculator, and
hemicycle geometry. The server-rendered background and interactive Parliament
widget consume that same model, so both display the same 125 seats and 63-seat
threshold.

No random number, current time, viewport size, post-hydration drawing, or fake
live result participates in the initial render. The route is server-owned;
only the coalition and evidence-review islands hydrate.

## Vocabulary ownership

The root owns six terms taught across the page:

- Political Science;
- Political Power;
- Political Authority;
- Political Legitimacy;
- Collective Choice;
- Political Representation.

Each of the eight direct branches owns two narrower terms, for 22 unique terms
across the subtree. Stable IDs for Sovereignty, Hegemony, and Gerrymandering
remain unique and move to their narrowest current branch. Curriculum
containment aggregates all terms into Political Science and Social Science
with source-node provenance.

## Source and future repository boundary

The root performs no render-time provider request. It links three official
interfaces and defines future adapters:

- [Congress.gov API](https://api.congress.gov/) for bills, laws, actions,
  votes, committees, members, and other U.S. congressional records;
- [World Bank Indicators API](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392)
  for versioned country-indicator-year series and metadata;
- [V-Dem Dataset](https://www.v-dem.net/data/the-v-dem-dataset/) for versioned
  democracy indicators, indices, codebooks, cautionary notes, and uncertainty.

A future normalized record must retain provider and record identifiers, source
URL, retrieval time, dataset or text version, unit of observation, geography,
time, variable and scale definitions, missingness, uncertainty, pagination,
citation, and license or access context where applicable. Legislative records,
cross-national indicators, modeled expert-coded estimates, and causal claims
remain distinct record types. Provider failure may never be disguised as a
successful live repository.

## Verification contract

Automated checks cover:

- exact eight-branch order and planned status;
- the 125-seat total, 63-seat threshold, two coalition fixtures, duplicate-ID
  handling, and 125 unique hemicycle marks;
- four evidence cases and every answer path;
- 22 unique vocabulary terms and stable-ID preservation;
- direct-child vocabulary aggregation;
- generated HTML ancestry, planned non-link behavior, initial model values,
  source links, vocabulary, and absence of canvas or animation markers;
- TypeScript, touched-file lint, formatting, repository audits, and production
  build.

Rendered desktop, narrower desktop, mobile, keyboard, zoom, coalition, and
assessment states remain in the visual-verification queue while the workspace
browser/server limitation persists.
