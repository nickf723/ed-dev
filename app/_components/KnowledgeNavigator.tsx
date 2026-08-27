import Link from "next/link";
import {
  findKnowledgeHostPage,
  graphDescendantCount,
} from "@/app/_data/knowledge-graph";
import {
  navigationForKnowledgeNode,
  navigationForKnowledgeSlug,
} from "@/app/_data/knowledge-navigation";
import {
  knowledgeRelationsFor,
  relationLabel,
} from "@/app/_data/knowledge-relations";
import type { KnowledgeNode } from "@/app/_data/ontology";

export type KnowledgeNavigatorProps =
  | {
      nodeId: string;
      slug?: never;
      compact?: boolean;
      showRelations?: boolean;
      className?: string;
    }
  | {
      nodeId?: never;
      slug: string;
      compact?: boolean;
      showRelations?: boolean;
      className?: string;
    };

/**
 * Graph-driven navigation for gradual migration away from hand-maintained
 * academic navigation. Existing pages can resolve by their current route while
 * graph-native surfaces can resolve by stable ontology id.
 */
export default function KnowledgeNavigator(props: KnowledgeNavigatorProps) {
  const {
    compact = false,
    showRelations = true,
    className = "",
  } = props;
  const context =
    "nodeId" in props && props.nodeId
      ? navigationForKnowledgeNode(props.nodeId)
      : "slug" in props
        ? navigationForKnowledgeSlug(props.slug)
        : undefined;
  if (!context) return null;

  const nodeId = context.current.id;
  const host = findKnowledgeHostPage(nodeId);
  const relations = showRelations ? knowledgeRelationsFor(nodeId) : [];
  const descendants = graphDescendantCount(nodeId);

  return (
    <nav
      aria-label={`Knowledge navigation for ${context.current.label}`}
      className={`rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl ${
        compact ? "p-3" : "p-4 sm:p-5"
      } ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Knowledge path
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-slate-400">
            {context.breadcrumb.map((node, index) => (
              <span key={node.id} className="contents">
                {index ? <span className="text-slate-700">/</span> : null}
                {node.slug ? (
                  <Link href={node.slug} className="transition hover:text-white">
                    {node.label}
                  </Link>
                ) : (
                  <span className="text-slate-500">{node.label}</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-500">
          <span className="rounded-full border border-white/10 px-2 py-1">
            {context.current.kind}
          </span>
          <span className="rounded-full border border-white/10 px-2 py-1">
            {context.current.slug ? "page" : "embedded"}
          </span>
          {descendants ? (
            <span className="rounded-full border border-white/10 px-2 py-1">
              {descendants} below
            </span>
          ) : null}
        </div>
      </div>

      {!context.current.slug && host?.slug ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-white/10 bg-white/[0.025] px-3 py-2.5">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600">
              Taught in
            </div>
            <div className="mt-0.5 text-sm font-medium text-slate-200">{host.label}</div>
          </div>
          <Link
            href={host.slug}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Open page
          </Link>
        </div>
      ) : null}

      <div className={`mt-4 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
        {context.parent ? (
          <section>
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600">
              Parent
            </div>
            <KnowledgeLink node={context.parent} />
          </section>
        ) : null}

        {context.children.length ? (
          <section>
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600">
              Children
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {context.children.map((child) => (
                <KnowledgeChip key={child.id} node={child} />
              ))}
            </div>
          </section>
        ) : null}

        {context.siblings.length ? (
          <section>
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600">
              Siblings
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {context.siblings.map((sibling) => (
                <KnowledgeChip key={sibling.id} node={sibling} />
              ))}
            </div>
          </section>
        ) : null}

        {relations.length ? (
          <section>
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-cyan-200/45">
              Connections
            </div>
            <div className="mt-2 space-y-1.5">
              {relations.map(({ relation, direction, other }) => {
                const destination = other.slug ?? findKnowledgeHostPage(other.id)?.slug;
                const body = (
                  <>
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.11em] text-cyan-200/40">
                      {relationLabel(relation.kind, direction)}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-slate-300">
                      {other.label}
                    </span>
                  </>
                );

                return destination ? (
                  <Link
                    key={`${relation.sourceId}-${relation.kind}-${relation.targetId}`}
                    href={destination}
                    className="block rounded-xl border border-cyan-300/[0.07] bg-cyan-300/[0.02] px-3 py-2 transition hover:bg-cyan-300/[0.05]"
                  >
                    {body}
                  </Link>
                ) : (
                  <div
                    key={`${relation.sourceId}-${relation.kind}-${relation.targetId}`}
                    className="rounded-xl border border-cyan-300/[0.07] bg-cyan-300/[0.02] px-3 py-2"
                  >
                    {body}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </nav>
  );
}

function KnowledgeLink({ node }: { node: KnowledgeNode }) {
  if (node.slug) {
    return (
      <Link
        href={node.slug}
        className="mt-2 block rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
      >
        {node.label}
      </Link>
    );
  }
  return <div className="mt-2 text-sm text-slate-500">{node.label}</div>;
}

function KnowledgeChip({ node }: { node: KnowledgeNode }) {
  const destination = node.slug ?? findKnowledgeHostPage(node.id)?.slug;
  const className = `rounded-full border px-2.5 py-1 text-[11px] transition ${
    node.slug
      ? "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] hover:text-white"
      : "border-dashed border-white/10 text-slate-500 hover:text-slate-300"
  }`;

  return destination ? (
    <Link href={destination} className={className} title={node.slug ? "Routed page" : "Embedded knowledge"}>
      {node.label}
    </Link>
  ) : (
    <span className={className}>{node.label}</span>
  );
}
