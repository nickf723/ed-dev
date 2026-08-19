import HexGrid, { type HomepageDomainChildren } from "./_homepage/HexGrid";
import HomepageField from "./_homepage/HomepageField";
import { curriculumRegistry } from "@/lib/curriculum/registry";

const DOMAIN_CHILDREN = Object.fromEntries(
  curriculumRegistry.allDomains().map((domain) => [
    domain.domainId,
    domain.children
      .filter((child) => child.status !== "placeholder")
      .map((child) => ({ label: child.label, href: child.href })),
  ]),
) as HomepageDomainChildren;

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020407] text-slate-100 selection:bg-cyan-300/25 lg:h-screen lg:overflow-hidden">
      <HomepageField />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1580px] flex-col px-4 py-5 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-6">
        <header className="relative z-20 shrink-0 border-b border-white/[0.055] pb-4">
          <div className="flex flex-col items-center justify-between gap-3 text-center lg:flex-row lg:text-left">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.20em] text-cyan-100/45">
                ES64 / interactive curriculum atlas
              </div>
              <h1 className="mt-1.5 text-[clamp(2.55rem,4.6vw,4.9rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-[#f7fbff]">
                Education Station <span className="font-mono text-cyan-100">64</span>
              </h1>
            </div>

            <div className="max-w-[450px] lg:text-right">
              <p className="text-[13px] leading-6 text-slate-400 sm:text-[14px]">
                Six primary domains. Hover a field to expose the first layer, then descend through the curriculum by relationship rather than by search box.
              </p>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-700">
                hover → inspect → descend
              </div>
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <HexGrid domainChildren={DOMAIN_CHILDREN} />
        </div>
      </div>
    </main>
  );
}
