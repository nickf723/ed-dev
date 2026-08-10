import { Code2, Cpu, Globe, Layers, Shield, Terminal, type LucideIcon } from "lucide-react";

export type SoftwareSectorPresentation = {
  nodeId: string;
  sub: string;
  icon: LucideIcon;
  color: string;
  border: string;
  snippet: string;
};

/**
 * Visual language for the Software terminal grid.
 * Semantic labels, descriptions, routes, and build status live in the
 * curriculum registry and are joined to this data by the page.
 */
export const SOFTWARE_SECTORS: SoftwareSectorPresentation[] = [
  {
    nodeId: "formal.computer-science.software.fundamentals",
    sub: "Logic / Structures",
    icon: Terminal,
    color: "text-green-400",
    border: "border-green-500/50",
    snippet: "x = 10\nif x > 5:\n    print('x is greater than 5')",
  },
  {
    nodeId: "formal.computer-science.software.languages",
    sub: "Syntax / Semantics",
    icon: Code2,
    color: "text-emerald-400",
    border: "border-emerald-500/50",
    snippet: `// RUST
fn main() {
    println!("Hello, World!");
}

# PYTHON
def init():
    print("System Online")`,
  },
  {
    nodeId: "formal.computer-science.software.algorithms",
    sub: "Computational Logic",
    icon: Cpu,
    color: "text-amber-400",
    border: "border-amber-500/50",
    snippet: `// QUICKSORT
function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  // ...optimizing...
  return i + 1;
}`,
  },
  {
    nodeId: "formal.computer-science.software.web",
    sub: "Distributed Systems",
    icon: Globe,
    color: "text-cyan-400",
    border: "border-cyan-500/50",
    snippet: `<div id="root">
  <Header />
  <App state={loaded} />
</div>

/* CSS */
.matrix { filter: hue-rotate(90deg); }`,
  },
  {
    nodeId: "formal.computer-science.software.security",
    sub: "InfoSec / Cryptography",
    icon: Shield,
    color: "text-red-400",
    border: "border-red-500/50",
    snippet: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEA...
-----END PUBLIC KEY-----
> SSH Handshake... [OK]`,
  },
  {
    nodeId: "formal.computer-science.software.architecture",
    sub: "Design Patterns",
    icon: Layers,
    color: "text-purple-400",
    border: "border-purple-500/50",
    snippet: `FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]`,
  },
];
