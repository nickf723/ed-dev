import type {
  KnowledgeNode,
  KnowledgeNodeKind,
  KnowledgeNodeStatus,
} from "./ontology";
import { educationStationKnowledgeGraph } from "./knowledge-graph";

export type KnowledgeLayoutNode = {
  id: string;
  label: string;
  slug?: string;
  kind: KnowledgeNodeKind;
  status?: KnowledgeNodeStatus;
  depth: number;
  x: number;
  y: number;
  parentId?: string;
  childIds: string[];
};

export type KnowledgeLayoutEdge = {
  sourceId: string;
  targetId: string;
};

export type KnowledgeTreeLayout = {
  nodes: KnowledgeLayoutNode[];
  edges: KnowledgeLayoutEdge[];
  maxDepth: number;
  leafCount: number;
};

export type KnowledgeLayoutMode = "all" | "routed";

type PositionedNode = {
  node: KnowledgeNode;
  depth: number;
  parentId?: string;
  leafStart: number;
  leafEnd: number;
};

function leafSpan(node: KnowledgeNode): number {
  if (!node.children?.length) return 1;
  return node.children.reduce((sum, child) => sum + leafSpan(child), 0);
}

/**
 * Removes embedded-only leaves for overview layouts while preserving any
 * unrouted ancestor needed to reach a routed descendant. Canonical graph data
 * remains unchanged; this is a renderer projection only.
 */
export function projectKnowledgeTree(
  root: KnowledgeNode,
  mode: KnowledgeLayoutMode = "all",
): KnowledgeNode {
  if (mode === "all") return root;

  const project = (node: KnowledgeNode, keepRoot = false): KnowledgeNode | undefined => {
    const children = (node.children ?? [])
      .map((child) => project(child))
      .filter((child): child is KnowledgeNode => Boolean(child));
    const keep = keepRoot || Boolean(node.slug) || children.length > 0;
    if (!keep) return undefined;

    return {
      ...node,
      ...(children.length ? { children } : { children: undefined }),
    };
  };

  return project(root, true) ?? root;
}

/**
 * Produces a stable left-to-right tree layout in normalized 0..1 coordinates.
 * The Education Station root defaults to a routed overview so the full atlas
 * stays legible; focused subtrees default to complete knowledge detail.
 */
export function layoutKnowledgeTree(
  root: KnowledgeNode = educationStationKnowledgeGraph,
  mode: KnowledgeLayoutMode = root.id === "education-station" ? "routed" : "all",
): KnowledgeTreeLayout {
  const projectedRoot = projectKnowledgeTree(root, mode);
  const positioned: PositionedNode[] = [];
  const edges: KnowledgeLayoutEdge[] = [];
  let nextLeaf = 0;
  let maxDepth = 0;

  function walk(node: KnowledgeNode, depth: number, parentId?: string): [number, number] {
    maxDepth = Math.max(maxDepth, depth);
    const children = node.children ?? [];

    let leafStart: number;
    let leafEnd: number;

    if (!children.length) {
      leafStart = nextLeaf;
      leafEnd = nextLeaf;
      nextLeaf += 1;
    } else {
      const spans = children.map((child) => {
        edges.push({ sourceId: node.id, targetId: child.id });
        return walk(child, depth + 1, node.id);
      });
      leafStart = spans[0][0];
      leafEnd = spans.at(-1)?.[1] ?? leafStart;
    }

    positioned.push({ node, depth, parentId, leafStart, leafEnd });
    return [leafStart, leafEnd];
  }

  walk(projectedRoot, 0);

  const leafCount = Math.max(nextLeaf, leafSpan(projectedRoot));
  const depthDenominator = Math.max(maxDepth, 1);
  const leafDenominator = Math.max(leafCount - 1, 1);

  const nodes = positioned
    .map(({ node, depth, parentId, leafStart, leafEnd }) => ({
      id: node.id,
      label: node.label,
      ...(node.slug ? { slug: node.slug } : {}),
      kind: node.kind,
      ...(node.status ? { status: node.status } : {}),
      depth,
      x: depth / depthDenominator,
      y: ((leafStart + leafEnd) / 2) / leafDenominator,
      ...(parentId ? { parentId } : {}),
      childIds: (node.children ?? []).map((child) => child.id),
    }))
    .sort((a, b) => a.depth - b.depth || a.y - b.y || a.id.localeCompare(b.id));

  return { nodes, edges, maxDepth, leafCount };
}

export function layoutSubtree(
  nodeId: string,
  mode: KnowledgeLayoutMode = "all",
): KnowledgeTreeLayout | undefined {
  const find = (node: KnowledgeNode): KnowledgeNode | undefined => {
    if (node.id === nodeId) return node;
    for (const child of node.children ?? []) {
      const result = find(child);
      if (result) return result;
    }
    return undefined;
  };

  const subtree = find(educationStationKnowledgeGraph);
  return subtree ? layoutKnowledgeTree(subtree, mode) : undefined;
}
