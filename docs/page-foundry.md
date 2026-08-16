# Page Foundry

Page Foundry is the bounded production queue inside Knowledge Studio.

Run the local site and open:

```text
http://localhost:3000/studio/foundry
```

The regular Studio toolbar also links to it through the **Foundry** tab.

## Purpose

Foundry keeps unattended page production finite and inspectable. Every brief records:

- hierarchy, parent node, route, and page type;
- organizing principle and learner question;
- content boundaries and explicit top-to-bottom hierarchy;
- the primary navigation task, direct children, topology, first viewport, and secondary navigation;
- API or curated data contract;
- an academic-world family;
- environment and interaction metaphors;
- visual topology and primary interaction;
- a vivid semantic background brief;
- recent page patterns that must not be repeated;
- reusable Studio systems the page should extract;
- quality gates, blockers, notes, and commit state.

## Version 2: navigation-first academic worlds

Foundry version 2 prevents the shared neoglass shell from swallowing the identity of individual subjects.

Every page chooses an academic world such as:

```text
living exhibit
 galactic expedition
archive
laboratory
observatory
debate chamber
creative studio
marketplace
field station
workshop
```

The registry lives at:

```text
lib/page-system/academic-worlds.ts
```

Each world defines a promise, environment metaphor, interaction metaphor, preferred topologies, and visual taboos. The complete production rules live in `docs/academic-world-design-contract.md`.

The primary navigation contract is separate from the visual brief. A page cannot compensate for weak hierarchy with a dramatic background.

## Workflow

A page moves through:

```text
queued → briefing → building → extracting → validating → committed → review → released
```

Use **Prepare next 1 / 3 / 5** to create a bounded run command. The command is copied to the clipboard and stored in the queue. It instructs the builder to:

1. verify ontology and direct children;
2. put primary navigation before supporting content;
3. build the declared academic world;
4. make the environment vivid and semantically meaningful;
5. preserve one first-viewport center of gravity;
6. extract reusable systems;
7. validate and commit before continuing.

Foundry never starts a model worker by itself. It prepares the exact work contract for an active ChatGPT/Codex run, preserving human control over cost, scope, and repository changes.

## Backward-compatible migration

The server upgrades saved version-1 briefs in memory by inferring sensible academic-world and navigation defaults. The next save writes the queue in version-2 form, so the existing Foundry ledger remains usable without a manual JSON migration.

## Extraction rule

A page is not complete when its route renders. During the `extracting` stage, decide whether each new topology, background, widget, adapter, card grammar, instrument, or design token should become:

- global;
- domain-wide;
- branch-wide;
- page-specific.

Registered patterns are recorded in the Foundry pattern library and should become Studio options over time.

## Storage and safety

The queue lives at:

```text
content/page-foundry/queue.json
```

Saving validates the normalized queue and creates a timestamped backup in:

```text
.next/studio-backups
```

The Foundry route and write API return 404 outside local development.
