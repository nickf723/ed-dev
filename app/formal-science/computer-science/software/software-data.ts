import { Terminal, Cpu, Globe, Shield, Layers, Code2 } from "lucide-react";

export const SOFTWARE_SECTORS = [
    {
        id: "fundamentals",
        label: "Programming Fundamentals",
        sub: "Logic / Structures",
        icon: Terminal,
        desc: "The beginnings of programming, covering variables, control flow, functions, and basic data structures.",
        link: "/formal-science/computer-science/software/fundamentals",
        color: "text-green-400",
        border: "border-green-500/50",
        snippet: "x = 10\nif x > 5:\n    print('x is greater than 5')"
    },
  {
    id: "languages",
    label: "Languages & Compilers",
    sub: "Syntax / Semantics",
    icon: Code2,
    desc: "The vocabulary of instructions. From low-level memory management (C, Rust) to high-level abstractions (Python, JS).",
    link: "/formal-science/computer-science/software/languages",
    color: "text-emerald-400",
    border: "border-emerald-500/50",
    snippet: `// RUST
fn main() {
    println!("Hello, World!");
}

# PYTHON
def init():
    print("System Online")`
  },
  {
    id: "algorithms",
    label: "Algorithms & Data",
    sub: "Computational Logic",
    icon: Cpu,
    desc: "The mathematical recipes for efficiency. Sorting, searching, graph traversal, and big-O complexity.",
    link: "/formal-science/computer-science/software/algorithms",
    color: "text-amber-400",
    border: "border-amber-500/50",
    snippet: `// QUICKSORT
function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  // ...optimizing...
  return i + 1;
}`
  },
  {
    id: "web",
    label: "Web Engineering",
    sub: "Distributed Systems",
    icon: Globe,
    desc: "Protocols (HTTP/WS), frontend frameworks, and scalable backend infrastructure.",
    link: "/formal-science/computer-science/software/web",
    color: "text-cyan-400",
    border: "border-cyan-500/50",
    snippet: `<div id="root">
  <Header />
  <App state={loaded} />
</div>

/* CSS */
.matrix { filter: hue-rotate(90deg); }`
  },
  {
    id: "security",
    label: "Cybersecurity",
    sub: "InfoSec / Cryptography",
    icon: Shield,
    desc: "Protecting integrity. Encryption standards (AES, RSA), penetration testing, and secure coding practices.",
    link: "/formal-science/computer-science/software/security",
    color: "text-red-400",
    border: "border-red-500/50",
    snippet: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEA...
-----END PUBLIC KEY-----
> SSH Handshake... [OK]`
  },
  {
    id: "architecture",
    label: "System Architecture",
    sub: "Design Patterns",
    icon: Layers,
    desc: "Blueprints for scalability. Monoliths vs Microservices, Docker containers, and Cloud orchestration.",
    link: "/formal-science/computer-science/software/architecture",
    color: "text-purple-400",
    border: "border-purple-500/50",
    snippet: `FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]`
  }
];