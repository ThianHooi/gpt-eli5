const pluginSortImports = require('@trivago/prettier-plugin-sort-imports')
const pluginTailwindcss = require('prettier-plugin-tailwindcss')

/**
 * @refs  https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31#issuecomment-1195411734
 * @refs  https://github.com/trivago/prettier-plugin-sort-imports/issues/117#issuecomment-1198805533
 */
/** @type {import("prettier").Parser}  */
const bothParser = {
  ...pluginSortImports.parsers.typescript,
  parse: pluginTailwindcss.parsers.typescript.parse,
}

/** @type {import("prettier").Plugin}  */
const mixedPlugin = {
  parsers: {
    typescript: bothParser,
  },
}

module.exports = {
  plugins: [mixedPlugin],
  importOrder: ['(^next$|^next/(.*)$)', '<THIRD_PARTY_MODULES>', '^~/(.*)$', '^[./]'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
}