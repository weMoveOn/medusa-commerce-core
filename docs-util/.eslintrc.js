const path = require("path")

module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      experimentalDecorators: true,
    },
    project: true,
  },
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    curly: ["error", "all"],
    "new-cap": "off",
    "require-jsdoc": "off",
    "no-unused-expressions": "off",
    "no-unused-vars": "off",
    camelcase: "off",
    "no-invalid-this": "off",
    "max-len": [
      "error",
      {
        code: 80,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
      },
    ],
    semi: ["error", "never"],
    quotes: [
      "error",
      "double",
      {
        allowTemplateLiterals: true,
      },
    ],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
      },
    ],
    "object-curly-spacing": ["error", "always"],
    "arrow-parens": ["error", "always"],
    "linebreak-style": 0,
    "no-confusing-arrow": [
      "error",
      {
        allowParens: false,
      },
    ],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-infix-ops": "error",
    "eol-last": ["error", "always"],
  },
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: [
    ".eslintrc.js",
    "dist"
  ],
  overrides: [
    {
      files: ["*.ts", "*.js"],
      plugins: ["@typescript-eslint/eslint-plugin"],
      extends: [
        "plugin:@typescript-eslint/recommended",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: [
          "./tsconfig.json",
          "./packages/scripts/tsconfig.json",
          "./packages/typedoc-config/tsconfig.json",
          "./packages/typedoc-frontmatter-plugin/tsconfig.json",
          "./packages/typedoc-modules-plugin/tsconfig.json",
          "./packages/typedoc-markdown-medusa-plugin/tsconfig.json"
        ]
      },
      rules: {
        "valid-jsdoc": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/keyword-spacing": "error",
        "@typescript-eslint/space-before-function-paren": [
          "error",
          {
            anonymous: "always",
            named: "never",
            asyncArrow: "always",
          },
        ],
        "@typescript-eslint/space-infix-ops": "error",
      },
    }
  ],
}
