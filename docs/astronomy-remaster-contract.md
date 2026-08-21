# Astronomy Root Remaster Contract

## Page job

`/natural-science/astronomy` is a field hub and compact orientation lesson. Its
primary job is to teach the shape of Astronomy well enough that a learner can
choose a direct branch without confusing object scale with observing method.

The page should leave one durable model:

> Astronomy moves outward by system scale, but every scale is known through an
> evidence chain: source → messenger → journey → detector → calibration →
> physical model → bounded claim.

## Preservation inventory

The remaster preserves:

- the outward expedition from Planetary through Cosmology;
- the source → journey → detector signal laboratory;
- visible, radio, X-ray, and gravitational-wave messenger cases;
- the Moon, Sun, Proxima Centauri, Andromeda, and cosmic-microwave-background
  lookback comparison;
- the observatory, deep-space, cyan/violet, and multi-scale identity;
- the existing Planetary Astronomy page and its repository/simulator contract.

The pass replaces only the root viewport canvas. The new deterministic light
cone keeps the expedition identity while removing viewport measurement,
seeded canvas construction, pointer tracking, scroll listeners, and the
animation loop from the root page.

## Ontology

The exact direct branches are:

1. Planetary Astronomy — active;
2. Stellar Astronomy — planned;
3. Galactic Astronomy — planned;
4. Extragalactic Astronomy — planned;
5. Cosmology — planned;
6. Astronomical Methods — planned.

The first five change the physical scale of the system. Astronomical Methods
crosses all five and therefore appears as a transverse evidence rail rather
than a sixth stop on the size axis.

The previous registry marked Cosmology active even though no page exists. The
remaster corrects it to planned. No live route is removed: Planetary Astronomy
remains the only implemented direct child. Observational and Theoretical
Astronomy remain planned children of Methods and are not promoted to root
peers.

## Learning and assessment contract

The hub proceeds through:

1. direct-child navigation by scale plus the cross-cutting Methods rail;
2. the preserved messenger laboratory;
3. the preserved lookback-time comparison;
4. a deterministic four-case evidence review;
5. an official archive and provenance boundary.

The evidence review tests:

- exact redshift arithmetic using `656.30 nm → 721.93 nm`, producing
  `z = 0.100`;
- matching X-ray measurements to a space-based detector;
- comparing visible and radio morphology without flattening different emission
  mechanisms or instrument limits;
- separating a received past state from an unobserved present state.

The checker is deterministic. It distinguishes the measured quantity from a
distance, velocity, or causal interpretation that requires an additional
model.

## Representation parity

`astronomyModel.ts` owns the five lookback examples. The root light-cone field
uses the first four examples as source marks, and the lookback instrument uses
all five with identical labels, colors, distances, and travel-time copy. The
background identifies itself as a conceptual field whose intervals are not to
scale.

The redshift assessment and its header ledger use the same calculation helper.
No random number, current time, viewport size, post-hydration draw, or fake live
measurement participates in the initial render.

## Vocabulary ownership

The root owns six terms taught across the page:

- Astronomy;
- Astronomical Messenger;
- Electromagnetic Spectrum;
- Light-Year;
- Lookback Time;
- Redshift.

Planetary Astronomy retains its eight existing terms. Stellar, Galactic,
Extragalactic, Cosmology, and Methods each own two narrower terms. Stable IDs
for Event Horizon, Cosmic Microwave Background, and Redshift remain unique but
move to the narrowest node currently teaching them. Curriculum containment
aggregates all 24 terms into Astronomy and Natural Science with source-node
provenance.

## Source and future repository boundary

The root performs no render-time provider request. It links three official
interfaces and defines future adapters:

- [MAST API](https://mast.stsci.edu/api/v0/) for missions, observations,
  catalogs, and data products;
- [GWOSC API](https://gwosc.org/api/) for observing runs, event catalogs,
  parameter estimates, strain products, and data-quality context;
- [NASA ADS API](https://ui.adsabs.harvard.edu/help/api/) for bibliographic
  search, metrics, and exports.

A future normalized record must retain stable provider IDs, source URL,
retrieval time, mission/catalog/version context, coordinate/time/wavelength or
detector context where applicable, uncertainty, processing/calibration state,
rights or data-access state, and provider pagination. Observation products,
modeled event parameters, and bibliographic records remain distinct record
types.

MAST results are not unprocessed visual truth; GWOSC parameters are not direct
photographs; ADS metadata and citation counts are not full text or automatic
evidence quality. Provider failure may never be disguised as a successful live
archive.

## Verification contract

Automated checks cover:

- exact branch order and one-active/five-planned status;
- redshift valid, zero, blueshift, and invalid fixtures;
- four evidence cases and every answer path;
- lookback-example parity;
- 24 unique vocabulary terms and stable-ID preservation;
- direct-child vocabulary aggregation;
- generated HTML ancestry, active/planned link behavior, initial model values,
  source links, vocabulary, and absence of a root canvas or animation markers;
- TypeScript, touched-file lint, formatting, repository audits, and production
  build.

Rendered desktop, narrower desktop, mobile, keyboard, zoom, reduced-motion,
scene, signal, lookback, and review states remain in the visual-verification
queue while the workspace browser/server limitation persists.
