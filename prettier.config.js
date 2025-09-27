import * as prettierPluginTailwindcss from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: [prettierPluginTailwindcss],
};
