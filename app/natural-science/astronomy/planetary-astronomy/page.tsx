import { Database, Gauge, Globe2, Orbit, Sigma, Telescope } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import SceneFrame from "@/app/_page-system/scene/SceneFrame";
import Surface from "@/app/_page-system/scene/Surface";
import AstronomyBackground from "./_components/AstronomyBackground";
import OrbitalSandbox from "./_components/OrbitalSandbox";
import ExoplanetCatalog from "./ExoplanetCatalog";
import OrbitEvidenceCheck from "./OrbitEvidenceCheck";

const SEQUENCE = [
  {
    number: "01",
    label: "Model",
    note: "Tune mass and sideways velocity.",
    icon: Gauge,
  },
  {
    number: "02",
    label: "Explain",
    note: "Connect Kepler's pattern to Newton's force.",
    icon: Sigma,
  },
  {
    number: "03",
    label: "Compare",
    note: "Inspect confirmed worlds in NASA's archive.",
    icon: Database,
  },
  {
    number: "04",
    label: "Test",
    note: "Calculate a prediction and defend an inference.",
    icon: Telescope,
  },
];

export default function PlanetaryAstronomyPage() {
  return (
    <SceneFrame
      background={<AstronomyBackground />}
      className="bg-[#020205] text-slate-100 selection:bg-cyan-300/[0.22]"
      maxWidthClassName="max-w-[1540px]"
      headerBackground="rgba(2,5,12,0.68)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Astronomy", href: "/natural-science/astronomy" },
            { label: "Planetary Astronomy" },
          ]}
          eyebrow="Orbits · planetary systems · confirmed worlds"
          icon={Orbit}
          title={<span>Planetary Astronomy</span>}
          subtitle="Build an orbit from gravity and motion, derive the pattern it follows, then compare that model with confirmed planets beyond our Solar System."
          accentRgb="34, 211, 238"
          titleClassName="font-sans text-[clamp(2.8rem,5.6vw,6rem)] font-semibold leading-[0.86] tracking-[-0.065em] text-white"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {SEQUENCE.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="grid grid-cols-[auto_1fr] gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.18] p-4 backdrop-blur-xl"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-200/[0.14] text-cyan-200/60">
                <Icon size={15} />
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-200/45">
                  {step.number} · {step.label}
                </p>
                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  {step.note}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-7" aria-labelledby="orbit-model-title">
        <div className="mb-4 grid gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(260px,420px)] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-cyan-200/55">
              Model · one star + one test planet
            </p>
            <h2
              id="orbit-model-title"
              className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white"
            >
              Find the narrow path between impact and escape.
            </h2>
          </div>
          <p className="text-[12px] leading-6 text-slate-500">
            Change one variable at a time. A durable orbit is evidence that
            gravity keeps bending forward motion without immediately winning it.
          </p>
        </div>
        <OrbitalSandbox />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <Surface
          variant="glass"
          className="rounded-[26px] border-cyan-200/[0.1] p-6 sm:p-7"
        >
          <div className="flex items-center gap-3">
            <Orbit className="text-cyan-300" size={20} />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-200/50">
                Observed pattern
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Kepler describes the orbit.
              </h2>
            </div>
          </div>
          <p className="mt-5 text-[13px] leading-6 text-slate-400">
            Planets follow ellipses with their star at one focus. A line from
            planet to star sweeps equal areas in equal times, so orbital speed
            changes along the path. Across planets orbiting the same star,
            farther paths take disproportionately longer.
          </p>
          <div className="mt-5 rounded-[16px] border border-cyan-200/[0.09] bg-cyan-200/[0.025] px-5 py-4 text-center text-xl text-cyan-50">
            <M display>{"P^2 \\propto a^3"}</M>
          </div>
          <p className="mt-4 text-[11px] leading-5 text-slate-500">
            <M>{"P"}</M> is orbital period; <M>{"a"}</M> is the ellipse&apos;s
            semi-major axis.
          </p>
        </Surface>

        <Surface
          variant="glass"
          className="rounded-[26px] border-amber-200/[0.1] p-6 sm:p-7"
        >
          <div className="flex items-center gap-3">
            <Globe2 className="text-amber-200" size={20} />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-amber-200/50">
                Physical cause
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Newton explains why it bends.
              </h2>
            </div>
          </div>
          <p className="mt-5 text-[13px] leading-6 text-slate-400">
            Every mass attracts every other mass. The force grows with both
            masses and falls with the square of their separation. In the
            sandbox, increasing central mass strengthens the inward
            acceleration; increasing sideways velocity strengthens the tendency
            to escape.
          </p>
          <div className="mt-5 rounded-[16px] border border-amber-200/[0.09] bg-amber-200/[0.025] px-5 py-4 text-center text-xl text-amber-50">
            <M display>{"F = G \\frac{m_1m_2}{r^2}"}</M>
          </div>
          <p className="mt-4 text-[11px] leading-5 text-slate-500">
            The simulation uses scaled units and a simple numerical integrator.
            It teaches the relationship, not mission-grade trajectories.
          </p>
        </Surface>
      </section>

      <div className="mt-8">
        <ExoplanetCatalog />
      </div>

      <div className="mt-8">
        <OrbitEvidenceCheck />
      </div>
    </SceneFrame>
  );
}
