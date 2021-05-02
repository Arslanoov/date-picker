module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "double", {
      "allowTemplateLiterals": true
    }],

    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-empty-function": 0
  }
}
