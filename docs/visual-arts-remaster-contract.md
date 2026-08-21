# Visual Arts Remaster Contract

## Identity and rotation role

Visual Arts is a Humanities navigation hub with a broad visual-analysis lesson, a provider-backed museum collection, and bounded formal tools. It follows the Natural Science Botany pass to change academic world, page rhythm, source grammar, and interaction style without discarding work that is already strong.

The page should feel like an active studio and collection store: pigment fields, irregular work surfaces, framed objects, print impressions, and deliberate intervals. It must not become a generic dashboard, an infinite masonry feed with no teaching purpose, or a claim that color and composition systems reveal universal beauty.

## Bounded direct-child ontology

Visual Arts owns six direct branches:

1. Painting & Drawing
2. Sculpture
3. Photography
4. Printmaking
5. Digital & Media Art
6. Art History

Painting & Drawing and Sculpture are active child studios. The other four remain planned and non-clickable until substantive pages exist. Techniques, movements, artists, periods, tools, and individual works belong within these branches before another direct peer is proposed.

The six-way practice studio is the first major section after the page header. It teaches what each branch can manipulate directly before the root lesson moves into material, form, context, collection records, and formal experiments.

## Overview lesson flow

The root follows a Navigate → Observe → Compare → Model → Check sequence:

1. navigate six registry-owned media and historical branches;
2. observe an object through material, form, and context without collapsing those lenses;
3. compare real collection records with visible source, rights, sample, and fallback state;
4. model composition guides and exact hue-angle relationships as optional analytical tools;
5. assess calculation, formal observation, process inference, and museum-record boundaries.

The page remains an overview. It does not attempt to survey all art history, teach every medium, resolve contested interpretation, or replace object-specific research.

## Deterministic model contract

One shared module owns branch parity, hue arithmetic, and assessment fixtures. Hue values are rounded and normalized into `[0, 359]`. The teaching relationships use fixed offsets:

- complementary: `0°, 180°`;
- analogous: `−30°, 0°, 30°`;
- triadic: `0°, 120°, 240°`;
- split-complementary: `0°, 150°, 210°`.

The color instrument and assessment call the same implementation. These values describe angular relationships in an HSL teaching model. Equal angular distance does not imply equal perceptual distance, balanced composition, beauty, meaning, or emotional response.

## Assessment contract

The evidence lab contains four deterministic files:

- calculate the complement of `18°` as `198°`;
- distinguish inspectable formal relationships from unsupported maker intention or universal viewer response;
- infer a reusable print matrix and edition from repeated contours, variable impressions, and numbering;
- distinguish supplied museum metadata and image-rights status from a complete provenance chain or uncontested interpretation.

Every file supports unanswered, correct, incorrect, changed-answer, switched-file, and reset states. Feedback explains the evidence boundary rather than merely announcing a score.

## Vocabulary ownership

Visual Arts owns thirteen terms currently taught at its root: medium, form, composition, value, hue, saturation, negative space, visual analysis, provenance, edition, chiaroscuro, impasto, and avant-garde.

The terms register at `humanities.visual-arts` and aggregate into the Humanities drawer through curriculum containment. As active child studios receive their own remasters, narrower terms should move to child-owned registrations while remaining inherited by this parent.

## Collection and provider boundary

The museum wall begins with six reviewed local teaching records. A learner may then query The Metropolitan Museum of Art Collection API. The route exposes the provider's total separately from the local sample, normalizes no more than sixteen image-bearing records, caches search and object requests at different intervals, labels partial and rate-limited states, and preserves a stable curated fallback.

The provider adapter owns URL construction, record normalization, source links, image-rights labeling, and missing-field behavior. Department, medium, and image-rights facets filter only the returned sample and appear only when they have at least two available values.

The Met documents that its API provides collection metadata and corresponding high-resolution images for works available under Open Access. The interface still displays each record's supplied public-domain flag rather than extending that status to the physical object, every photograph, a complete ownership history, or an interpretation.

## Source boundary

Provider behavior and field names are checked against the official Met Collection API documentation. Image reuse language is checked against The Met's Open Access policy. Every provider record links back to its object page, and the page links to both official source documents.

Curated descriptions remain local teaching interpretations. HSL panels, composition fields, print plates, and pigment backgrounds are schematic teaching representations.

## Verification gate

Before publication, verify:

- exact six-child registry and practice-studio parity;
- two active child links and four planned non-links;
- canonical ancestry, page kind, and metadata;
- exact hue outputs for negative, wrapped, complementary, analogous, triadic, and split-complementary inputs;
- deterministic verdicts for every assessment option;
- Visual Arts → Humanities vocabulary inheritance with source-node provenance;
- Met query encoding, object URL validation, honest missing fields, public-domain labels, and object source links;
- curated, valid empty, partial, failed, rate-limited, stale-request, facet, reset, and detail-drawer states;
- deterministic first-frame geometry with no random values, viewport measurement, or client-only shell;
- source, model-boundary, assessment, collection, and vocabulary markers in generated HTML;
- no new hydration, console, accessibility, or responsive failures;
- desktop, narrower desktop, mobile, keyboard, reduced-motion, image-failure, and zoomed-text behavior when a trusted browser runtime is available.
