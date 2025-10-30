// .prettierrc.mjs
/** @type {import("prettier").Config} */
const config = {
  semi: true,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "es5",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
