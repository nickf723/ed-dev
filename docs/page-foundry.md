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
- content boundaries;
- API or curated data contract;
- visual topology and primary interaction;
- a vivid semantic background brief;
- recent page patterns that must not be repeated;
- reusable Studio systems the page should extract;
- quality gates, blockers, notes, and commit state.

## Workflow

A page moves through:

```text
queued → briefing → building → extracting → validating → committed → review → released
```

Use **Prepare next 1 / 3 / 5** to create a bounded run command. The command is copied to the clipboard and stored in the queue. It instructs the builder to commit each page separately, update the queue, and continue immediately through non-blocked items.

Foundry never starts a model worker by itself. It prepares the exact work contract for an active ChatGPT/Codex run, preserving human control over cost, scope, and repository changes.

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

Saving validates the queue and creates a timestamped backup in:

```text
.next/studio-backups
```

The Foundry route and write API return 404 outside local development.
