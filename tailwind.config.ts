import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "noise-light":
          "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
      },
      animation: {
        "blob-slow": "blob-float-1 24s ease-in-out infinite",
        "blob-medium": "blob-float-2 32s ease-in-out infinite",
        "blob-fast": "blob-float-3 28s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;