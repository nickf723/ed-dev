import { Braces, GitBranch, Box, Hash, Type, List, ShieldAlert, Book, Terminal } from "lucide-react";

export type CodeConcept = {
  id: string;
  category: 'PRIMITIVES' | 'DATA STRUCTURES' | 'CONTROL FLOW' | 'MODULARITY';
  title: string;
  desc: string;
  icon: any;
  snippet: string;
  output: string;
  memory: { name: string, val: string, type: string }[]; // Visual Memory Stack
  diagramQuery?: string;
};

export const FUNDAMENTALS_DATA: CodeConcept[] = [
  // --- PRIMITIVES ---
  {
    id: "prim_vars",
    category: "PRIMITIVES",
    title: "Variables & Types",
    desc: "Containers for storing data. Statically typed languages require defining the shape (int, float, bool) upfront.",
    icon: Hash,
    snippet: `int health = 100;
string player = "Ready One";
bool is_alive = true;

print(player + " HP: " + health);`,
    output: "> Ready One HP: 100",
    memory: [
        { name: "health", val: "100", type: "int" },
        { name: "player", val: "\"Ready One\"", type: "string" },
        { name: "is_alive", val: "true", type: "bool" }
    ]
  },

  // --- DATA STRUCTURES ---
  {
    id: "ds_arrays",
    category: "DATA STRUCTURES",
    title: "Arrays / Lists",
    desc: "Ordered collections accessible by a numerical index (0-based). Efficient for ordered data.",
    icon: List,
    diagramQuery: "array memory allocation diagram",
    snippet: `string[] inventory = ["Sword", "Shield"];

// Access Index 0
print("Equipped: " + inventory[0]);

inventory.push("Potion");`,
    output: "> Equipped: Sword",
    memory: [
        { name: "inventory[0]", val: "\"Sword\"", type: "string" },
        { name: "inventory[1]", val: "\"Shield\"", type: "string" },
        { name: "inventory[2]", val: "\"Potion\"", type: "string" }
    ]
  },
  {
    id: "ds_maps",
    category: "DATA STRUCTURES",
    title: "Hash Maps",
    desc: "Key-Value pairs. Data is retrieved by a unique key. O(1) lookup time.",
    icon: Book,
    diagramQuery: "hash table key value data structure",
    snippet: `map config = {
    "vol": 80,
    "diff": "Hard"
};

print("Volume: " + config["vol"]);`,
    output: "> Volume: 80",
    memory: [
        { name: "key: vol", val: "80", type: "int" },
        { name: "key: diff", val: "\"Hard\"", type: "string" }
    ]
  },

  // --- CONTROL FLOW ---
  {
    id: "flow_if",
    category: "CONTROL FLOW",
    title: "Conditionals",
    desc: "Branching logic. Code executes only if the boolean condition evaluates to True.",
    icon: GitBranch,
    diagramQuery: "if else flowchart programming logic",
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
        { name: "condition", val: "false", type: "eval" }
    ]
  },
  {
    id: "flow_loop",
    category: "CONTROL FLOW",
    title: "Loops",
    desc: "Iteration. Repeating a block of code while a condition remains true.",
    icon: Braces,
    diagramQuery: "while loop logic flowchart",
    snippet: `int i = 3;
while (i > 0) {
    print("T-Minus " + i);
    i--;
}
print("Liftoff");`,
    output: "> T-Minus 3\n> T-Minus 2\n> T-Minus 1\n> Liftoff",
    memory: [
        { name: "i", val: "0", type: "int" },
        { name: "status", val: "\"Liftoff\"", type: "output" }
    ]
  },
  {
    id: "flow_catch",
    category: "CONTROL FLOW",
    title: "Error Handling",
    desc: "Safety nets. Using Try/Catch blocks prevents the entire program from crashing on error.",
    icon: ShieldAlert,
    diagramQuery: "try catch exception handling diagram",
    snippet: `try {
    connect_server();
} catch (err) {
    print("Error: " + err);
    print("Offline Mode Active");
}`,
    output: "> Error: 404 Not Found\n> Offline Mode Active",
    memory: [
        { name: "err", val: "\"404 Not Found\"", type: "error" },
        { name: "state", val: "\"Offline\"", type: "enum" }
    ]
  },

  // --- MODULARITY ---
  {
    id: "mod_func",
    category: "MODULARITY",
    title: "Functions",
    desc: "Reusable logic. Functions accept arguments, process them, and return a result.",
    icon: Box,
    diagramQuery: "function call stack diagram",
    snippet: `function add(a, b) {
    return a + b;
}

int result = add(10, 5);
print("Sum: " + result);`,
    output: "> Sum: 15",
    memory: [
        { name: "arg: a", val: "10", type: "int" },
        { name: "arg: b", val: "5", type: "int" },
        { name: "return", val: "15", type: "int" }
    ]
  },
  {
    id: "mod_class",
    category: "MODULARITY",
    title: "Classes (OOP)",
    desc: "Blueprints for objects. Encapsulates data (properties) and behavior (methods).",
    icon: Type,
    diagramQuery: "object oriented programming class diagram",
    snippet: `class Droid {
    string id;
    constructor(id) { this.id = id; }
}

Droid d1 = new Droid("R2");`,
    output: "> Droid Created: R2",
    memory: [
        { name: "d1", val: "0x3F2A...", type: "ptr" },
        { name: "d1.id", val: "\"R2\"", type: "string" }
    ]
  }
];