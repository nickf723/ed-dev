import { Book, Box, Braces, GitBranch, Hash, List, ShieldAlert, Type, type LucideIcon } from "lucide-react";

export type CodeConcept = {
  id: string;
  category: "PRIMITIVES" | "DATA STRUCTURES" | "CONTROL FLOW" | "MODULARITY";
  title: string;
  desc: string;
  icon: LucideIcon;
  snippet: string;
  output: string;
  memory: { name: string; val: string; type: string }[];
};

export const FUNDAMENTALS_DATA: CodeConcept[] = [
  {
    id: "prim_vars",
    category: "PRIMITIVES",
    title: "Values, Variables & Types",
    desc: "Programs manipulate values. Variables bind names to values, while type systems describe which values and operations are valid; languages differ in how explicitly and when types are checked.",
    icon: Hash,
    snippet: `int health = 100;
string player = "Ready One";
bool is_alive = true;

print(player + " HP: " + health);`,
    output: "> Ready One HP: 100",
    memory: [
      { name: "health", val: "100", type: "int" },
      { name: "player", val: "\"Ready One\"", type: "string" },
      { name: "is_alive", val: "true", type: "bool" },
    ],
  },
  {
    id: "ds_arrays",
    category: "DATA STRUCTURES",
    title: "Sequences / Lists",
    desc: "Ordered collections preserve position. Different languages provide arrays, lists, vectors, or related sequence types with different storage and resizing behavior.",
    icon: List,
    snippet: `string[] inventory = ["Sword", "Shield"];

print("Equipped: " + inventory[0]);
inventory.push("Potion");`,
    output: "> Equipped: Sword",
    memory: [
      { name: "inventory[0]", val: "\"Sword\"", type: "string" },
      { name: "inventory[1]", val: "\"Shield\"", type: "string" },
      { name: "inventory[2]", val: "\"Potion\"", type: "string" },
    ],
  },
  {
    id: "ds_maps",
    category: "DATA STRUCTURES",
    title: "Key–Value Maps",
    desc: "Maps associate keys with values. Hash-table implementations often provide expected constant-time lookup under suitable hashing and load assumptions, while other map structures make different tradeoffs.",
    icon: Book,
    snippet: `map config = {
  "vol": 80,
  "diff": "Hard"
};

print("Volume: " + config["vol"]);`,
    output: "> Volume: 80",
    memory: [
      { name: "key: vol", val: "80", type: "int" },
      { name: "key: diff", val: "\"Hard\"", type: "string" },
    ],
  },
  {
    id: "flow_if",
    category: "CONTROL FLOW",
    title: "Conditionals",
    desc: "Conditional control flow selects which operations execute according to a Boolean condition or another branching rule.",
    icon: GitBranch,
    snippet: `int ammo = 0;

if (ammo > 0) {
  fire();
} else {
  print("Click... Empty.");
  reload();
}`,
    output: "> Click... Empty.",
    memory: [
      { name: "ammo", val: "0", type: "int" },
      { name: "ammo > 0", val: "false", type: "bool" },
    ],
  },
  {
    id: "flow_loop",
    category: "CONTROL FLOW",
    title: "Iteration",
    desc: "Loops repeat operations according to a condition, collection, counter, iterator, event stream, or another source of successive work.",
    icon: Braces,
    snippet: `int i = 3;
while (i > 0) {
  print("T-Minus " + i);
  i--;
}
print("Liftoff");`,
    output: "> T-Minus 3\n> T-Minus 2\n> T-Minus 1\n> Liftoff",
    memory: [
      { name: "i", val: "0", type: "int" },
      { name: "status", val: "\"Liftoff\"", type: "output" },
    ],
  },
  {
    id: "flow_catch",
    category: "CONTROL FLOW",
    title: "Errors & Exceptions",
    desc: "Programs need explicit failure behavior. Exception mechanisms are one way to transfer control when an operation cannot complete normally; they do not eliminate the need to design recovery and validation.",
    icon: ShieldAlert,
    snippet: `try {
  connect_server();
} catch (err) {
  print("Error: " + err);
  print("Offline Mode Active");
}`,
    output: "> Error: connection failed\n> Offline Mode Active",
    memory: [
      { name: "err", val: "\"connection failed\"", type: "error" },
      { name: "state", val: "\"Offline\"", type: "mode" },
    ],
  },
  {
    id: "mod_func",
    category: "MODULARITY",
    title: "Functions",
    desc: "Functions name reusable behavior, accept inputs, create local state, and may return outputs. They provide one of programming's most common abstraction boundaries.",
    icon: Box,
    snippet: `function add(a, b) {
  return a + b;
}

int result = add(10, 5);
print("Sum: " + result);`,
    output: "> Sum: 15",
    memory: [
      { name: "arg: a", val: "10", type: "int" },
      { name: "arg: b", val: "5", type: "int" },
      { name: "result", val: "15", type: "int" },
    ],
  },
  {
    id: "mod_class",
    category: "MODULARITY",
    title: "Objects & Classes",
    desc: "Object-oriented languages can group data and behavior behind object interfaces. Classes are one common mechanism for constructing such objects, not a requirement of programming in general.",
    icon: Type,
    snippet: `class Droid {
  string id;
  constructor(id) { this.id = id; }
}

Droid d1 = new Droid("R2");`,
    output: "> Droid Created: R2",
    memory: [
      { name: "d1", val: "Droid instance", type: "object" },
      { name: "d1.id", val: "\"R2\"", type: "string" },
    ],
  },
];
