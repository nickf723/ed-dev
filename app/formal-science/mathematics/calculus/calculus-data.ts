import { TrendingUp, Sigma, Layers, Wind, Activity, FunctionSquare, Infinity } from "lucide-react";
import { M } from '../../../../components/Math'

export const CALCULUS_BRANCHES = [
  {
    id: "limits",
    title: "Limits & Continuity",
    level: "Foundation",
    desc: "The behavior of a function as it approaches a specific input. The bedrock upon which all calculus is built.",
    formula: "\\lim_{x \\to a} f(x) = L",
    icon: Infinity,
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    href: "/formal-science/mathematics/calculus/limits"
  },
  {
    id: "differential",
    title: "Differential Calculus",
    level: "Core I",
    desc: "The study of instantaneous rates of change and the slope of curves.",
    formula: "\\frac{d}{dx}f(x)",
    icon: TrendingUp, // Slopes
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    href: "/formal-science/mathematics/calculus/differential"
  },
  {
    id: "integral",
    title: "Integral Calculus",
    level: "Core II",
    desc: "The study of accumulation, area under curves, and the reverse process of differentiation.",
    formula: "\\int f(x) dx",
    icon: Sigma, // Summation
    color: "text-amber-400",
    border: "border-amber-500/30",
    href: "/formal-science/mathematics/calculus/integral"
  }
  ,
  {
    id: "multivariate",
    title: "Multivariate Calculus",
    level: "Core III",
    desc: "Calculus extended to 3D space. Partial derivatives and multiple integrals over surfaces and volumes.",
    formula: "\\frac{\\partial f}{\\partial x}",
    icon: Layers, // Surfaces
    color: "text-purple-400",
    border: "border-purple-500/30",
    href: "/formal-science/mathematics/calculus/multivariate"
  },
  {
    id: "vector",
    title: "Vector Calculus",
    level: "Advanced",
    desc: "Differentiation and integration of vector fields. Essential for electromagnetism and fluid dynamics.",
    formula: "\\nabla \\cdot \\mathbf{F}",
    icon: Wind, // Flow fields
    color: "text-pink-400",
    border: "border-pink-500/30",
    href: "/formal-science/mathematics/calculus/vector"
  },
  {
    id: "diffeq",
    title: "Differential Equations",
    level: "Mastery",
    desc: "Equations involving functions and their derivatives. The language used to model physical reality.",
    formula: "\\frac{dy}{dt} = ky",
    icon: Activity, // Dynamics
    color: "text-red-400",
    border: "border-red-500/30",
    href: "/formal-science/mathematics/calculus/differential-equations"
  }
];