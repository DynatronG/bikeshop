module.exports = {
      root: true,
      env: {
            node: true,
      },
      extends: ["plugin:vue/vue3-essential", "eslint:recommended", "plugin:prettier/recommended"],
      parserOptions: {
            parser: "@babel/eslint-parser",
      },
      rules: {
            indent: ["error", 6, { SwitchCase: 1 }],
            "max-len": ["error", { code: 100 }],
            // quotes: ["error", "avoidEscape"],
            "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
            "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
            "prettier/prettier": ["warn", { endOfLine: "auto" }],
      },
};
