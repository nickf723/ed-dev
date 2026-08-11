import { Network } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import ColliderBackground from "./ColliderBackground";
import InterdisciplinaryMatrix from "./InterdisciplinaryMatrix";
import { CORE_DOMAIN_ORDER, type CoreDomainId, type MatrixAxisSeed } from "./data";

export default function InterdisciplinesPage() {
  const domainOrder = new Map(CORE_DOMAIN_ORDER.map((domainId, index) => [domainId, index]));
  const axes: MatrixAxisSeed[] = curriculumRegistry
    .allDomains()
    .filter((domain) => CORE_DOMAIN_ORDER.includes(domain.domainId as CoreDomainId))
    .sort(
      (a, b) =>
        (domainOrder.get(a.domainId as CoreDomainId) ?? 99) -
        (domainOrder.get(b.domainId as CoreDomainId) ?? 99),
    )
    .flatMap((domain) =>
      domain.children
        .filter((node) => node.status !== "placeholder")
        .map((node) => ({
          id: node.id,
          label: node.label,
          href: node.href,
          domainId: domain.domainId as CoreDomainId,
        })),
    );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050507] text-slate-100 selection:bg-violet-400/25 xl:h-screen xl:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <ColliderBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(167,139,250,0.10),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(34,211,238,0.06),transparent_28%),linear-gradient(to_bottom,rgba(5,5,7,0.22),rgba(5,5,7,0.64))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 py-4 sm:px-6 xl:h-screen xl:min-h-0 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Interdisciplines" },
          ]}
          eyebrow="Connections · Hybrids · Convergence"
          icon={Network}
          title={<span>Interdisciplines</span>}
          subtitle="Explore what happens when the site's core subjects overlap, borrow methods from one another, and form new fields between established disciplines."
          accentRgb="167, 139, 250"
          titleClassName="text-[clamp(3.2rem,5.8vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-white"
          iconClassName="rounded-[18px]"
        />

        <div className="mt-4 flex min-h-0 flex-1">
          <InterdisciplinaryMatrix axes={axes} />
        </div>
      </div>
    </main>
  );
}
