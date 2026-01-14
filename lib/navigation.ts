import { 
  Binary, Atom, Handshake, Hammer, Palette, Link as LinkIcon,
  BookOpen, Gamepad2, Theater
} from "lucide-react";

export const NAVIGATION_DATA = [
  {
    title: "Knowledge Graph",
    items: [
      {
        label: "Formal Science", href: "/formal-science", icon: Binary, domain: "formal",
        children: [
          { label: "Mathematics", href: "/formal-science/mathematics" },
          { label: "Logic", href: "/formal-science/logic" },
          { label: "Computer Science", href: "/formal-science/computer-science" },
          { label: "Systems Science", href: "/formal-science/systems-science" },
          { label: "Data Science", href: "/formal-science/data-science" },
        ]
      },
      {
        label: "Natural Science", href: "/natural-science", icon: Atom, domain: "natural",
        children: [
          { label: "Physics", href: "/natural-science/physics" },
          { label: "Chemistry", href: "/natural-science/chemistry" },
          { label: "Biology", href: "/natural-science/biology" },
          { label: "Earth Science", href: "/natural-science/earth-science" },
          { label: "Astronomy", href: "/natural-science/astronomy" },
        ]
      },
      {
        label: "Social Science", href: "/social-science", icon: Handshake, domain: "social",
        children: [
          { label: "Psychology", href: "/social-science/psychology" },
          { label: "Economics", href: "/social-science/economics" },
          { label: "Sociology", href: "/social-science/sociology" },
          { label: "Political Science", href: "/social-science/political-science" },
          { label: "Anthropology", href: "/social-science/anthropology" },
        ]
      },
      {
        label: "Applied Science", href: "/applied-science", icon: Hammer, domain: "applied",
        children: [
          { label: "Engineering", href: "/applied-science/engineering" },
          { label: "Medicine", href: "/applied-science/medicine" },
          { label: "Architecture", href: "/applied-science/architecture" },
          { label: "Technology", href: "/applied-science/technology" },
        ]
      },
      {
        label: "Humanities", href: "/humanities", icon: Palette, domain: "humanities",
        children: [
          { label: "Philosophy", href: "/humanities/philosophy" },
          { label: "History", href: "/humanities/history" },
          { label: "Literature", href: "/humanities/literature" },
          { label: "Arts", href: "/humanities/arts" },
          { label: "Music", href: "/humanities/music" },
        ]
      },
      {
        label: "Interdisciplines", href: "/interdisciplines", icon: LinkIcon, domain: "inter",
        children: []
      }
    ]
  },
  {
    title: "Meta",
    items: [
      { label: "Glossary", href: "/glossary", icon: BookOpen, domain: "meta" },
      { label: "Stage", href: "/stage", icon: Theater, domain: "meta" },
    ]
  }
];