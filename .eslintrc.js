module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
  ],
  parserOptions: {
    ecmaVersion: "2017",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["babel", "react", "import", "prettier"],
  rules: {
    "react/jsx-no-bind": ["error", { allowArrowFunctions: true, allowBind: true }],
    "import/no-duplicates": "error",
    'import/named': 'error',
    "prettier/prettier": "error",
    "react/no-typos": "error",
    "react/no-unused-state": "error",
    "array-callback-return": "error",
    "consistent-return": "error",
    "babel/no-invalid-this": "error",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  }
}
