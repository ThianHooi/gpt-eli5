/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    require("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};
