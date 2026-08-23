# Classroom historical map data

## Physical land layer

`world-land-110m.json` is Natural Earth `ne_110m_land` data. Natural Earth
publishes its raster and vector map data in the public domain.

- Source: <https://github.com/nvkelso/natural-earth-vector>
- Source file: `geojson/ne_110m_land.geojson`
- Retrieved: 2026-08-23

The layer supplies coastlines only. It intentionally does not add modern
political boundaries to the historical lesson.

## Near-period historical layer

`world-1750-near-period.json` is a modified, simplified subset of A. Ourednik's
Historical Basemaps collection. It contains six features selected from the 1715
and 1783 snapshots, simplified for an introductory world-scale interaction.

- Source: <https://github.com/aourednik/historical-basemaps>
- Source snapshots: `geojson/world_1715.geojson` and
  `geojson/world_1783.geojson`
- License: GNU General Public License v3.0
- Modified: 2026-08-23
- Modification: selected six records, renamed them for the Classroom lesson,
  added source metadata, and simplified polygon rings with a
  Ramer–Douglas–Peucker pass.

This is a near-period orientation layer, not an exact political boundary map
for a single date in 1750. The learner-facing map repeats that limitation and
uses broken edges and transparent fills to keep the uncertainty visible.

The rendering component consumes the data through
`lib/maps/historical-map-adapter.ts` so a future provider or reviewed snapshot
can replace it without rewriting the lesson.
